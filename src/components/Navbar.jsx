import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, BarChart2, User, Home, Award } from 'lucide-react';
import '../styles/global.css';

const Navbar = () => {
    const { logout, currentUser } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error("Failed to log out", error);
        }
    };

    if (!currentUser) return null;

    return (
        <nav style={{ background: 'var(--surface-color)', boxShadow: 'var(--shadow-sm)', padding: '1rem 0', marginBottom: '2rem' }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to="/dashboard" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '1.8rem' }}>🔥</span> FluentFire
                </Link>
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--text-secondary)' }}><Home size={20} /> Dashboard</Link>
                    <Link to="/leaderboard" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--text-secondary)' }}><BarChart2 size={20} /> Leaderboard</Link>
                    <Link to="/profile" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--text-secondary)' }}><User size={20} /> Profile</Link>
                    <button onClick={handleLogout} style={{ color: 'var(--error-color)', display: 'flex', alignItems: 'center', gap: '0.25rem', marginLeft: '1rem' }}>
                        <LogOut size={20} /> Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
