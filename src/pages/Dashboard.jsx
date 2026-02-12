import React from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import XPBar from '../components/XPBar';
import StreakCard from '../components/StreakCard';
import ModuleCard from '../components/ModuleCard';
import { BookOpen, Zap, MessageCircle, BarChart as BarChartIcon } from 'lucide-react';

const Dashboard = () => {
    const { userData, currentUser } = useAuth();

    if (!currentUser || !userData) {
        return <div className="container" style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>Loading...</div>;
    }

    const { name, xp, level, currentStreak, longestStreak, accuracy } = userData;

    return (
        <div className="fade-in">
            <Navbar />
            <div className="container" style={{ maxWidth: '800px' }}>
                <h1 style={{ marginBottom: '0.5rem' }}>Hi, {name} 👋</h1>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Ready to learn something new today?</p>

                <XPBar xp={xp} level={level} />

                <StreakCard
                    streak={currentStreak}
                    longestStreak={longestStreak}
                    accuracy={accuracy}
                />

                <h2 style={{ marginBottom: '1rem' }}>Start Learning</h2>
                <div style={{ display: 'grid', gap: '1rem' }}>
                    <ModuleCard
                        title="Vocabulary Quiz"
                        icon={<BookOpen size={24} />}
                        color="#3b82f6"
                        quizType="vocabulary"
                    />
                    <ModuleCard
                        title="Grammar Quiz"
                        icon={<MessageCircle size={24} />}
                        color="#8b5cf6"
                        quizType="grammar"
                    />
                    <ModuleCard
                        title="Rapid Challenge"
                        icon={<Zap size={24} />}
                        color="#f59e0b"
                        quizType="rapid"
                    />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
