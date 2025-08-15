import React from 'react';
import { BiLike } from 'react-icons/bi';
import { FaRegComment } from 'react-icons/fa';

const BlogPostTile = ({ image, title, body, author, likes, comments, onClick }) => {
  const getPreview = (text, wordLimit = 20) => {
    const words = text.split(' ');
    return words.length > wordLimit ? words.slice(0, wordLimit).join(' ') + '...' : text;
  };

  return (
    <div onClick={onClick}
      className="bg-white rounded-md md:w-full w-full border border-gray-300 shadow-lg overflow-hidden flex flex-col items-center transition-transform duration-300 ease-in-out hover:-translate-y-1 cursor-pointer">
      <div className="relative p-2 w-full h-[180px]">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover rounded-md"
        />
      </div>

      <div className="p-4 text-center w-full relative">
        <p className="text-lg text-left font-semibold text-gray-800 mb-2">{title}</p>
        <div
          className="text-sm text-justify text-gray-600 mb-2"
          dangerouslySetInnerHTML={{ __html: getPreview(body) }}
        ></div>
        <p className="text-sm text-left text-gray-800 font-medium mb-1">Author: {author}</p>

        <div className="flex justify-start gap-6 text-sm text-gray-600 mt-2">
          <div className="flex items-center gap-2">
            <BiLike size={18} />
            <span>{likes ?? 'N/A'}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaRegComment size={16} />
            <span>{comments ?? 'N/A'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};


export default BlogPostTile;
