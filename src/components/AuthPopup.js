import React from 'react';
import { useNavigate } from 'react-router-dom';

const AuthPopup = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-80 text-center shadow-lg">
        <h2 className="text-xl font-bold mb-4">Login Required</h2>
        <p className="mb-6">Please log in to like, comment and write blogposts.</p>

        <div className="flex justify-center gap-4">
          <button
            onClick={handleLogin}
            className="px-4 py-2 bg-purple-900 text-white rounded hover:bg-purple-700"
          >
            Login
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPopup;
