import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login', {
                email,
                password
            });

            const { token, role } = response.data;

            // Store token and role
            localStorage.setItem('token', token);
            localStorage.setItem('role', role);

            // nav to dashboard based on role
            if (role === 'writer') {
                navigate('/writer-dashboard');
            } else if (role === 'admin') {
                navigate('/admin-dashboard');
            }

            console.log('Login success', response.data);
            toast.success('Login successful!');

            setSuccess('Login Successful');
            setError('');

        } catch (err) {
            console.log('Login Failed', err.response?.data || err.message);
            toast.error('Login failed!');
        }
    }
    
    return (
        <div className="min-h-screen flex items-center justify-center bg-white-100 px-4">
        <div className="w-full max-w-md bg-white p-8 rounded shadow">
            <h2 className="text-2xl font-bold text-center mb-3 text-gray-800">Welcome back!</h2>
            <h4 className="text-xl font-medium text-center mb-6 text-gray-500">Login</h4>
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
                className="w-full bg-blue-900 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
            >
                Login
            </button>
            </form>

            <p className="text-sm text-gray-600 mt-4">
            Need to create an account?{' '}
            <a href="/signup" className="text-blue-900 hover:underline font-medium"> SignUp </a>
            </p>
        </div>
        </div>
    );
}

export default Login;
