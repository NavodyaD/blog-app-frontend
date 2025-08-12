import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('writer');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

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
            const response = await axios.post('http://127.0.0.1:8000/api/register', {
                name,
                email,
                password,
                role,
            });

            const { token, role: userRole } = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem('role', userRole);

            if(role === 'writer') {
                navigate('/writer-dashboard');
            } else if (role === 'admin') {
                navigate('/admin-dashboard');
            }

            console.log('SignUp Successfull!', response.data);
            toast.success('Signup Succesful!');
            setSuccess('Signup Success');
            setError('');
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || 'Signup failed';
            console.log('Signup Failed', err.response?.data || err.message);
            toast.error(`Signup Failed: ${errorMessage}`);
            setError(err.response?.data?.message || 'Signup Failed');
            setSuccess('');
        }
    }

    return (
        <div className="min-h-screen bg-white flex items-center justify-center bg-gray-100 px-4">
        <div className="w-full max-w-md border border-gray-300 bg-white p-8 rounded shadow">
            <h2 className="text-2xl font-bold text-center mb-3 text-gray-800">Welcome to BlogApp</h2>
            <h4 className="text-xl font-medium text-center mb-6 text-gray-500">Create Account</h4>
            <form onSubmit={handleSubmit} className="space-y-4">
            
            <div>
                <label className='block text-gray-700 mb-1'> Your Name</label>
                <input 
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                />
            </div>
            
            <div>
                <label className="block text-gray-700 mb-1">Your Email</label>
                <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
            </div>

            <div>
                <label className="block text-gray-700 mb-1">Your Password</label>
                <input
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
            </div>

            <div>
                <label className="block text-gray-700 mb-1">Select Role</label>
                <select
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                >
                <option value="writer">Writer</option>
                <option value="admin">Admin</option>
                </select>
            </div>

            <button
                type="submit"
                className="w-full bg-blue-900 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
            >
                Create Account
            </button>
            </form>
            <p className="text-sm text-gray-600 mt-4">
            Already have an account?{' '}
            <a href="/login" className="text-blue-900 hover:underline font-medium"> Login </a>
            </p>

        </div>
        </div>
    );
}

export default SignUp;