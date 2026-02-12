import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const ModuleCard = ({ title, icon, color, quizType }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/quiz?type=${quizType}`);
    };

    return (
        <div className="card" onClick={handleClick} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ background: color, width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                    {icon}
                </div>
                <h3 style={{ fontSize: '1.1rem' }}>{title}</h3>
            </div>
            <div style={{ color: '#cbd5e1' }}>
                <ChevronRight size={24} />
            </div>
        </div>
    );
};

export default ModuleCard;
