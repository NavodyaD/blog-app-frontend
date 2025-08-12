import React from 'react';

const BlogPostTile = ({ image, title, body, author, onClick }) => {

  const getPreview = (text, wordLimit = 20) => {
    const words = text.split(' ');
    return words.length > wordLimit ? words.slice(0, wordLimit).join(' ') + '...' : text;
  };

  return (
    <div
      className="bg-white rounded-md md:w-[300px] w-full border border-gray-300 shadow-lg overflow-hidden flex flex-col items-center transition-transform duration-300 ease-in-out hover:-translate-y-1 cursor-pointer">
      <div className="relative p-2 w-full h-[180px]" onClick={onClick}>
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
        <p className="text-sm text-left text-gray-800 font-medium">Author: {author}</p>
      </div>
    </div>
  );
};

export default BlogPostTile;
