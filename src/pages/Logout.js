import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ToastMessage from '../helper/ToastMessage';

const Logout = () => {
    const history = useHistory();
    useEffect(() => {
        localStorage.clear();
    }, []);
    ToastMessage('Logout Sucessfully!', true);
    history.push('/login');
    return (
        <div>

        </div>
    );
}

export default Logout;
