import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AiOutlineHome } from 'react-icons/ai';
import FailurePopup from '../../components/FailurePopup';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');

        if (token && role) {
            if (role === 'writer') {
                navigate('/writer-dashboard');
            } else if (role === 'admin') {
                navigate('/admin-dashboard');
            }
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login', {
                email,
                password
            });

            const { token, role } = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem('role', role);

            if (role === 'writer') {
                navigate('/writer-dashboard');
            } else if (role === 'admin') {
                navigate('/admin-dashboard');
            }

            toast.success('Login Successful!');
            setError('');
            setIsPopupOpen(false);

        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || 'Login failed';
            console.log('Login Failed', err.response?.data || err.message);
            setError(errorMessage);
            setIsPopupOpen(true);
            //toast.error(`Login failed: ${errorMessage}`);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-white px-4">
            <div className="flex flex-col md:flex-row w-full border max-w-4xl bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="md:w-1/2 hidden md:block bg-purple-900">
                    <img
                        src="/assets/svgs/diary-animate.svg"
                        alt="Login Visual"
                        className="h-4/5 pt-16 self-center w-full object-cover"
                    />
                </div>

                <div className="w-full md:w-1/2 p-8 md:py-16 flex flex-col justify-center">
                    <a href="/" className="top-4 left-4 text-purple-900 hover:text-gray-700 mb-2">
                        <AiOutlineHome size={24} />
                    </a>

                    <img
                        src="/assets/images/Postly_logo.jpg"
                        alt="BlogApp Logo"
                        className="h-8 md:h-12 w-auto mx-auto mb-4"
                    />
                    <h2 className="text-2xl font-bold text-left mb-1 text-gray-800">Welcome back!</h2>
                    <h4 className="text-xl font-medium text-left mb-6 text-gray-500">Login</h4>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 mb-1">Password</label>
                            <input
                                type="password"
                                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-purple-900 text-white py-2 rounded hover:bg-purple-800 transition duration-200"
                        >
                            Login
                        </button>
                    </form>

                    <p className="text-sm text-gray-600 mt-4 text-center">
                        Need to create an account?{' '}
                        <a href="/signup" className="text-gray-800 hover:underline font-medium">
                            Sign Up
                        </a>
                    </p>
                </div>
            </div>

            <FailurePopup
                isOpen={isPopupOpen}
                message={error}
                onClose={() => setIsPopupOpen(false)}
            />
        </div>
    );
}

export default Login;
