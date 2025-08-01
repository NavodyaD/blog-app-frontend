import React from 'react';

const BlogPostTile = ({ image, title, body, author, onClick }) => {

  const getPreview = (text, wordLimit = 20) => {
    const words = text.split(' ');
    return words.length > wordLimit ? words.slice(0, wordLimit).join(' ') + '...' : text;
  };

  return (
    <div
      className="bg-white rounded-xl w-[250px] shadow-lg overflow-hidden flex flex-col items-center transition-transform duration-300 ease-in-out hover:-translate-y-1 cursor-pointer"
      onClick={onClick}
    >
      <div className="relative w-full h-[180px]">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover rounded-xl"
        />
      </div>

      <div className="p-4 text-center w-full relative">
        <p className="text-lg font-semibold text-gray-800 mb-2">{title}</p>
        <p className="text-sm text-gray-600 mb-2">{getPreview(body)}</p>
        <p className="text-sm text-gray-500 font-medium">By {author}</p>
      </div>
    </div>
  );
};

export default BlogPostTile;
