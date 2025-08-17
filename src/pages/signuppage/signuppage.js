import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import { AiOutlineHome } from 'react-icons/ai';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('writer');
  const [showAdminKeyModal, setShowAdminKeyModal] = useState(false);
  const [adminKeyInput, setAdminKeyInput] = useState('');
  const ADMIN_SECRET_KEY = '7878';

  const navigate = useNavigate();

  useEffect(() => {
    Modal.setAppElement('#root');
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
      if (userRole === 'writer') {
        navigate('/writer-dashboard');
      } else if (userRole === 'admin') {
        navigate('/admin-dashboard');
      }
      toast.success('Signup Successful!');
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Signup failed';
      toast.error(`Signup Failed: ${errorMessage}`);
    }
  };

  const handleRoleChange = (e) => {
    const selectedRole = e.target.value;
    if (selectedRole === 'admin') {
      setShowAdminKeyModal(true);
    } else {
      setRole('writer');
    }
  };

  const handleAdminKeyConfirm = () => {
    if (adminKeyInput === ADMIN_SECRET_KEY) {
      setRole('admin');
      setShowAdminKeyModal(false);
      setAdminKeyInput('');
    } else {
      toast.error('Invalid Admin Key!');
    }
  };

  const handleAdminKeyCancel = () => {
    setShowAdminKeyModal(false);
    setAdminKeyInput('');
    setRole('writer');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="flex flex-col border md:flex-row w-full max-w-4xl bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="md:w-1/2 hidden md:block bg-purple-900">
          <img
            src="/assets/svgs/letter-animate.svg"
            alt="Sign Up Visual"
            className="h-4/5 pt-12 w-full object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <a href="/" className="top-4 left-4 text-purple-900 hover:text-gray-700 mb-2">
            <AiOutlineHome size={24} />
          </a>

          <h2 className="text-2xl font-bold text-center mb-3 text-gray-800">Welcome to BlogApp</h2>
          <h4 className="text-xl font-medium text-center mb-6 text-gray-500">Create Account</h4>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">Your Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                minLength={3}
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
                minLength={8}
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Select Role</label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                value={role}
                onChange={handleRoleChange}
              >
                <option value="writer">Writer</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-purple-900 text-white py-2 rounded hover:bg-purple-800 transition duration-200"
            >
              Create Account
            </button>
          </form>

          <p className="text-sm text-gray-600 mt-4 text-center">
            Already have an account?{' '}
            <a href="/login" className="text-blue-900 hover:underline font-medium">
              Login
            </a>
          </p>
        </div>
      </div>

      <Modal
        isOpen={showAdminKeyModal}
        onRequestClose={handleAdminKeyCancel}
        contentLabel="Admin Key Verification"
        className="bg-white p-6 rounded shadow-lg max-w-md mx-auto mt-40 border border-gray-300"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Enter Admin Key</h2>
        <input
          type="password"
          placeholder="Enter Secret Key"
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
          value={adminKeyInput}
          onChange={(e) => setAdminKeyInput(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={handleAdminKeyCancel}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleAdminKeyConfirm}
            className="px-4 py-2 bg-purple-900 text-white rounded hover:bg-blue-700"
          >
            Continue
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default SignUp;
