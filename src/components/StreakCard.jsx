import React from 'react';
import { Flame, Target, Trophy } from 'lucide-react';

const StreakCard = ({ streak, longestStreak, accuracy }) => {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
            <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <div style={{ background: '#fee2e2', padding: '0.75rem', borderRadius: '50%', marginBottom: '0.5rem', color: '#ef4444' }}>
                    <Flame size={24} />
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{streak}</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Day Streak</div>
            </div>

            <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <div style={{ background: '#fef3c7', padding: '0.75rem', borderRadius: '50%', marginBottom: '0.5rem', color: '#d97706' }}>
                    <Trophy size={24} />
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{longestStreak}</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Longest Streak</div>
            </div>

            <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <div style={{ background: '#dcfce7', padding: '0.75rem', borderRadius: '50%', marginBottom: '0.5rem', color: '#16a34a' }}>
                    <Target size={24} />
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{typeof accuracy === 'number' ? accuracy.toFixed(1) : 0}%</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Accuracy</div>
            </div>
        </div>
    );
};

export default StreakCard;
