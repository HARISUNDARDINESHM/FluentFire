import React from 'react';

const XPBar = ({ xp, level }) => {
    // Level N requires N * 100 XP (simplified formula from req: level = floor(xp / 100))
    // Current level progress: xp % 100
    // Display: Level X   [======....]  XP/100

    const progress = xp % 100;

    return (
        <div className="card" style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Level {level}</span>
                <span style={{ color: 'var(--text-secondary)' }}>{progress} / 100 XP</span>
            </div>
            <div style={{ width: '100%', height: '12px', background: '#e2e8f0', borderRadius: '6px', overflow: 'hidden' }}>
                <div
                    style={{
                        width: `${progress}%`,
                        height: '100%',
                        background: 'linear-gradient(90deg, var(--primary-color), var(--secondary-color))',
                        borderRadius: '6px',
                        transition: 'width 0.5s ease-out'
                    }}
                />
            </div>
        </div>
    );
};

export default XPBar;
