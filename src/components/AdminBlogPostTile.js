import React from 'react';
import { FaTrashAlt, FaCheckCircle } from 'react-icons/fa';

const AdminBlogPostTile = ({
  image,
  title,
  body,
  author,
  postState,
  onPublish,
  onDelete,
  onClick,
}) => {
  const getPreview = (text, wordLimit = 20) => {
    const words = text.split(' ');
    return words.length > wordLimit ? words.slice(0, wordLimit).join(' ') + '...' : text;
  };

  return (
    <div className="bg-white border rounded shadow-sm md:w-[350px] w-full flex flex-col hover:shadow-lg transition">
      <div className="w-full h-[180px] cursor-pointer" onClick={onClick}>
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover rounded-t"
        />
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{title}</h3>
        <span className="text-xs font-medium text-purple-900 uppercase mb-2">{postState}</span>
        <div
          className="text-sm text-gray-600 mb-3"
          dangerouslySetInnerHTML={{ __html: getPreview(body) }}
        ></div>
        <p className="text-xs text-gray-500 font-medium mt-auto">By {author}</p>
      </div>

      <div className="flex justify-between items-center px-4 pb-4 gap-2">
        <button
          onClick={onPublish}
          className="flex items-center gap-2 px-3 py-1 text-sm border border-green-600 text-green-700 hover:bg-green-600 hover:text-white rounded transition"
        >
          <FaCheckCircle size={14} />
          Approve
        </button>
        <button
          onClick={onDelete}
          className="flex items-center gap-2 px-3 py-1 text-sm border border-red-600 text-red-700 hover:bg-red-700 hover:text-white rounded transition"
        >
          <FaTrashAlt size={14} />
          Delete
        </button>
      </div>
    </div>
  );
};

export default AdminBlogPostTile;
