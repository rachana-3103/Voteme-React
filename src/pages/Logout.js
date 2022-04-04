import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ToastMessage from '../helper/ToastMessage';

const Logout = () => {
    const navigate = useNavigate();
    useEffect(() => {
        localStorage.clear();
    }, []);
    ToastMessage('Logout Sucessfully!', true);
    navigate('/login');
    return (
        <div>

        </div>
    );
}

export default Logout;
