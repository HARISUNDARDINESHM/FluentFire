import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import { Trophy, Medal, Crown } from 'lucide-react';

const Leaderboard = () => {
    const [leaders, setLeaders] = useState([]);
    const [loading, setLoading] = useState(true);
    const { currentUser } = useAuth();

    useEffect(() => {
        const fetchLeaderboard = async () => {
            const q = query(collection(db, "users"), orderBy("xp", "desc"), limit(10));
            const querySnapshot = await getDocs(q);
            const users = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setLeaders(users);
            setLoading(false);
        };

        fetchLeaderboard();
    }, []);

    const getRankIcon = (index) => {
        if (index === 0) return <Crown size={24} color="#eab308" fill="#eab308" />;
        if (index === 1) return <Medal size={24} color="#94a3b8" fill="#94a3b8" />;
        if (index === 2) return <Medal size={24} color="#b45309" fill="#b45309" />;
        return <span style={{ fontWeight: 'bold', width: '24px', textAlign: 'center' }}>{index + 1}</span>;
    };

    return (
        <div className="fade-in">
            <Navbar />
            <div className="container" style={{ maxWidth: '600px' }}>
                <h1 style={{ textAlign: 'center', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    <Trophy size={32} color="var(--warning-color)" /> Leaderboard
                </h1>

                <div className="card" style={{ padding: '0' }}>
                    {loading ? (
                        <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>
                    ) : (
                        <div>
                            {leaders.map((user, index) => (
                                <div
                                    key={user.id}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: '1rem 1.5rem',
                                        borderBottom: index < leaders.length - 1 ? '1px solid #f1f5f9' : 'none',
                                        background: currentUser && user.id === currentUser.uid ? '#eff6ff' : 'transparent',
                                        transition: 'background 0.2s'
                                    }}
                                >
                                    <div style={{ marginRight: '1rem', width: '30px', display: 'flex', justifyContent: 'center' }}>
                                        {getRankIcon(index)}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: '600' }}>{user.name}</div>
                                        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Level {user.level}</div>
                                    </div>
                                    <div style={{ fontWeight: 'bold', color: 'var(--primary-color)' }}>
                                        {user.xp} XP
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Leaderboard;
