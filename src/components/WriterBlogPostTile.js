import React from 'react';

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
    <div className="bg-white rounded-xl w-[250px] shadow-lg overflow-hidden flex flex-col items-center transition-transform duration-300 ease-in-out hover:-translate-y-1">
      <div className="relative w-full h-[180px]" onClick={onClick}>
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover rounded-xl"
        />
      </div>

      <div className="p-4 text-center w-full relative">
        <p className="text-lg font-semibold text-gray-800 mb-1">{title}</p>
        <p className="text-sm text-blue-800 font-semibold mb-2">{postState}</p>
        <p className="text-sm text-gray-600 mb-2">{getPreview(body)}</p>
        <p className="text-sm text-gray-500 font-medium">By {author}</p>
      </div>

      <div className="flex justify-between w-full px-4 pb-4 mt-auto gap-2">
        <button
          onClick={onEdit}
          className="bg-blue-800 text-white text-sm px-4 py-1 rounded hover:bg-blue-600 transition"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="bg-red-700 text-white text-sm px-4 py-1 rounded hover:bg-red-600 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default WriterBlogPostTile;
