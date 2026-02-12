import React from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import { User, Zap, Target, Star, Calendar } from 'lucide-react';

const Profile = () => {
    const { userData } = useAuth();

    if (!userData) return <div className="container" style={{ marginTop: '2rem' }}>Loading...</div>;

    const { name, email, xp, level, currentStreak, longestStreak, accuracy, totalAnswered, createdAt } = userData;

    const StatItem = ({ icon, label, value, color }) => (
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ background: color + '20', padding: '0.75rem', borderRadius: '12px', color: color }}>
                {icon}
            </div>
            <div>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{value}</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{label}</div>
            </div>
        </div>
    );

    return (
        <div className="fade-in">
            <Navbar />
            <div className="container" style={{ maxWidth: '800px' }}>
                <div className="card" style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--primary-color)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <User size={40} />
                    </div>
                    <div>
                        <h1 style={{ fontSize: '1.8rem', marginBottom: '0.25rem' }}>{name}</h1>
                        <p style={{ color: 'var(--text-secondary)' }}>{email}</p>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                            Joined: {createdAt ? new Date(createdAt.seconds * 1000).toLocaleDateString() : 'N/A'}
                        </p>
                    </div>
                </div>

                <h2 style={{ marginBottom: '1.5rem' }}>Statistics</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    <StatItem
                        icon={<Star size={24} />}
                        label="Total XP"
                        value={xp}
                        color="#eab308"
                    />
                    <StatItem
                        icon={<Zap size={24} />}
                        label="Current Level"
                        value={level}
                        color="#8b5cf6"
                    />
                    <StatItem
                        icon={<Target size={24} />}
                        label="Accuracy"
                        value={`${typeof accuracy === 'number' ? accuracy.toFixed(1) : 0}%`}
                        color="#22c55e"
                    />
                    <StatItem
                        icon={<Calendar size={24} />}
                        label="Longest Streak"
                        value={`${longestStreak} Days`}
                        color="#ec4899"
                    />
                    <StatItem
                        icon={<Zap size={24} />}
                        label="Total Questions"
                        value={totalAnswered}
                        color="#3b82f6"
                    />
                </div>
            </div>
        </div>
    );
};

export default Profile;
