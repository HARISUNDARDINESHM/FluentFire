import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { collection, getDocs, doc, updateDoc, increment, serverTimestamp, getDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import { CheckCircle, XCircle, ArrowRight, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { seedQuestions } from '../utils/seedQuestions';

const Quiz = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQIndex, setCurrentQIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [quizFinished, setQuizFinished] = useState(false);
    const [loading, setLoading] = useState(true);
    const [searchParams] = useSearchParams();
    const quizType = searchParams.get('type');
    const { userData, currentUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuestions = async () => {
            // Seed questions first if needed
            await seedQuestions();

            const querySnapshot = await getDocs(collection(db, "questions"));
            let allQuestions = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            // Fetch user's answered questions
            let answeredIds = [];
            if (currentUser) {
                const userDoc = await getDoc(doc(db, "users", currentUser.uid));
                if (userDoc.exists()) {
                    answeredIds = userDoc.data().answeredQuestions || [];
                }
            }

            // Filter out answered questions
            let availableQuestions = allQuestions.filter(q => !answeredIds.includes(q.id));

            // If ran out of questions, maybe show a message or reset? 
            // For now, let's just reuse them but prioritize unanswered if logic was more complex.
            // Or if user wants "do not repeat", we strictly show available.
            // If 0 available, maybe clear history or just show randoms again?
            // "do not repeat" implies strictness. 
            if (availableQuestions.length === 0 && allQuestions.length > 0) {
                // Reset history or just show all again?
                // Let's fallback to showing all but maybe warn. 
                // Or better yet, pure random if exhausted.
                availableQuestions = allQuestions;
            }

            // Filter by type if provided
            if (quizType && quizType !== 'rapid') {
                availableQuestions = availableQuestions.filter(q => q.type === quizType);
                // Handle case where specific type is exhausted
                if (availableQuestions.length === 0) {
                    const allOfType = allQuestions.filter(q => q.type === quizType);
                    availableQuestions = allOfType;
                }
            }

            // Shuffle and take 10
            const shuffled = availableQuestions.sort(() => 0.5 - Math.random()).slice(0, 10);
            setQuestions(shuffled);
            setLoading(false);
        };

        fetchQuestions();
    }, [quizType, currentUser]); // Added currentUser dependency

    // ... (rest of code)

    const finishQuiz = async () => {
        setQuizFinished(true);
        if (!currentUser) return;

        const earnedXP = score * 10;
        const newTotalXP = (userData.xp || 0) + earnedXP;
        const newLevel = Math.floor(newTotalXP / 100) + 1; // +1 because level starts at 1
        const totalAnswered = (userData.totalAnswered || 0) + questions.length;
        const existingCorrect = ((userData.accuracy || 0) / 100) * (userData.totalAnswered || 0);
        const newAccuracy = ((existingCorrect + score) / totalAnswered) * 100;

        // Get IDs of questions just answered
        const newAnsweredIds = questions.map(q => q.id);

        await updateDoc(doc(db, "users", currentUser.uid), {
            xp: increment(earnedXP),
            level: newLevel,
            totalAnswered: increment(questions.length),
            accuracy: newAccuracy,
            lastLoginDate: serverTimestamp(),
            // Append new IDs to the array. 
            // Firestore arrayUnion is perfect here.
            answeredQuestions: arrayUnion(...newAnsweredIds)
        });

        if (newLevel > userData.level) {
            confetti({
                particleCount: 200,
                spread: 100,
                origin: { y: 0.6 }
            });
        }
    };

    if (loading) return <div className="container" style={{ textAlign: 'center', marginTop: '4rem' }}>Loading Quiz...</div>;

    if (questions.length === 0) return <div className="container" style={{ textAlign: 'center', marginTop: '4rem' }}>No questions found.</div>;

    if (quizFinished) {
        return (
            <div className="fade-in">
                <Navbar />
                <div className="container" style={{ maxWidth: '600px', textAlign: 'center' }}>
                    <div className="card">
                        <h1 style={{ marginBottom: '1rem' }}>Quiz Complete! 🎉</h1>
                        <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--primary-color)', marginBottom: '1rem' }}>
                            {score} / {questions.length}
                        </div>
                        <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>You earned <strong>{score * 10} XP</strong></p>

                        <div style={{ display: 'grid', gap: '1rem' }}>
                            <button className="btn btn-primary" onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
                            <button className="btn btn-secondary" onClick={() => window.location.reload()}>Play Again <RotateCcw size={18} /></button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const currentQ = questions[currentQIndex];
    const isCorrect = selectedOption === currentQ.correctAnswer;

    return (
        <div className="fade-in">
            <Navbar />
            <div className="container" style={{ maxWidth: '700px' }}>
                <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                    <span>Question {currentQIndex + 1} / {questions.length}</span>
                    <span>Score: {score}</span>
                </div>

                {/* Progress Bar */}
                <div style={{ width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '4px', marginBottom: '2rem' }}>
                    <div style={{ width: `${((currentQIndex + 1) / questions.length) * 100}%`, height: '100%', background: 'var(--primary-color)', borderRadius: '4px', transition: 'width 0.3s' }} />
                </div>

                <div className="card" style={{ marginBottom: '2rem' }}>
                    <h2 style={{ marginBottom: '1.5rem', fontSize: '1.3rem' }}>{currentQ.question}</h2>

                    <div style={{ display: 'grid', gap: '1rem' }}>
                        {currentQ.options.map((option, idx) => {
                            let bgColor = '#f8fafc';
                            let borderColor = '#e2e8f0';
                            let textColor = 'var(--text-color)';

                            if (showFeedback) {
                                if (option === currentQ.correctAnswer) {
                                    bgColor = '#dcfce7';
                                    borderColor = '#22c55e';
                                    textColor = '#166534';
                                } else if (option === selectedOption) {
                                    bgColor = '#fee2e2';
                                    borderColor = '#ef4444';
                                    textColor = '#991b1b';
                                }
                            }

                            return (
                                <button
                                    key={idx}
                                    onClick={() => handleOptionClick(option)}
                                    disabled={showFeedback}
                                    style={{
                                        padding: '1rem',
                                        borderRadius: '12px',
                                        border: `2px solid ${borderColor}`,
                                        background: bgColor,
                                        color: textColor,
                                        textAlign: 'left',
                                        fontSize: '1rem',
                                        fontWeight: 500,
                                        cursor: showFeedback ? 'default' : 'pointer',
                                        transition: 'all 0.2s',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}
                                >
                                    {option}
                                    {showFeedback && option === currentQ.correctAnswer && <CheckCircle size={20} />}
                                    {showFeedback && option === selectedOption && option !== currentQ.correctAnswer && <XCircle size={20} />}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {showFeedback && (
                    <div className="card fade-in" style={{ borderLeft: `6px solid ${isCorrect ? 'var(--success-color)' : 'var(--error-color)'}`, marginBottom: '2rem' }}>
                        <h3 style={{ color: isCorrect ? 'var(--success-color)' : 'var(--error-color)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            {isCorrect ? 'Excellent! You\'re on fire 🔥' : 'Nice try! Keep going 💪'}
                        </h3>
                        <p style={{ marginTop: '0.5rem', color: 'var(--text-secondary)' }}>{currentQ.explanation}</p>
                        <div style={{ marginTop: '1.5rem', textAlign: 'right' }}>
                            <button className="btn btn-primary" onClick={handleNext}>
                                {currentQIndex < questions.length - 1 ? 'Next Question' : 'See Results'} <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Quiz;
