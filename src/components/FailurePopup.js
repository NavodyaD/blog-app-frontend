import React from 'react';
import { AiOutlineCloseCircle, AiOutlineClose } from 'react-icons/ai';

const FailurePopup = ({ isOpen, message, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="relative bg-white rounded-lg shadow-lg p-6 w-80 text-center">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        >
          <AiOutlineClose size={20} />
        </button>

        <div className="text-red-600 mb-4 flex justify-center">
          <AiOutlineCloseCircle size={50} />
        </div>
        <p className="text-lg text-gray-800 font-medium">{message}</p>
      </div>
    </div>
  );
};

export default FailurePopup;
