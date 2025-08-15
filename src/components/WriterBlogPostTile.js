import React from 'react';
import { MdDeleteOutline } from 'react-icons/md';
import { FaRegEdit } from 'react-icons/fa';

const WriterBlogPostTile = ({ 
  image, 
  title, 
  body, 
  author, 
  postState, 
  onEdit, 
  onDelete,
  onClick,
}) => {

  const getPreview = (text, wordLimit = 20) => {
    const words = text.split(' ');
    return words.length > wordLimit ? words.slice(0, wordLimit).join(' ') + '...' : text;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-md md:w-full w-full shadow-lg overflow-hidden flex flex-col items-center transition-transform duration-300 ease-in-out hover:-translate-y-1">
      <div className="relative w-full p-2 h-[180px]" onClick={onClick}>
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover rounded-md"
        />
      </div>

      <div className="p-4 text-center w-full relative">
        <p className="text-lg text-left font-semibold text-gray-800 mb-1">{title}</p>
        <p className="text-sm text-center px-2 py-1 bg-gray-50 border border-gray-200 text-gray-800 font-bold uppercase mb-2">{postState}</p>
        <div
          className="text-sm text-justify text-gray-600 mb-2"
          dangerouslySetInnerHTML={{ __html: getPreview(body) }}
        ></div>
        <p className="text-sm text-left text-gray-800 font-medium">Author: {author}</p>
      </div>

      <div className="flex justify-between w-full px-4 pb-4 mt-auto gap-2">
        <button
          onClick={onEdit}
          className="flex items-center gap-x-2 border border-gray-300 text-gray-800 text-sm px-3 py-2 hover:bg-blue-200 hover:text-blue-800 hover:border-blue-800 rounded-lg transition"
        >
          <FaRegEdit size={16} />
          Edit
        </button>

        <button
          onClick={onDelete}
          className="flex items-center gap-x-2 text-gray-800 border border-gray-300 text-sm px-3 py-2 rounded-lg hover:bg-red-200 hover:text-red-800 hover:border-red-800 transition"
        >
          <MdDeleteOutline size={18} />
          Delete
        </button>
      </div>
    </div>
  );
};

export default WriterBlogPostTile;
