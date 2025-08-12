import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');

        if (token && role) {
            if (role === 'writer') {
                navigate('/writer-dashboard', { replace: true });
            } else if (role === 'admin') {
                navigate('/admin-dashboard', { replace: true });
            }
        }
    }, [navigate]);

    return <h2>You are not authorized to view this page.</h2>;
};

export default Unauthorized;
