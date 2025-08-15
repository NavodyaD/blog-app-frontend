import React from 'react';
import { MdDeleteOutline } from 'react-icons/md';
import { FaRegEdit } from 'react-icons/fa';
import { IoMdSend } from 'react-icons/io';

const WriterDraftTile = ({
  image,
  title,
  body,
  author,
  postState,
  onEdit,
  onDelete,
  onSave,
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
        <p className="text-sm text-left text-blue-800 font-semibold uppercase mb-2">{postState}</p>
        <div
          className="text-sm text-justify text-gray-600 mb-2"
          dangerouslySetInnerHTML={{ __html: getPreview(body) }}
        ></div>
        <p className="text-sm text-left text-gray-800 font-medium">By {author}</p>
      </div>

      <div className="flex justify-between w-full px-4 pb-4 mt-auto gap-2">
        <button
          onClick={onEdit}
          className="flex items-center gap-x-2 border border-gray-300 text-gray-800 text-sm px-3 py-2 hover:bg-blue-800 hover:text-white rounded-lg transition"
        >
          <FaRegEdit size={16} />
          Edit
        </button>

        <button
          onClick={onDelete}
          className="flex items-center gap-x-2 text-gray-800 border border-gray-300 text-sm px-3 py-2 rounded-lg hover:bg-red-800 hover:text-white transition"
        >
          <MdDeleteOutline size={18} />
          Delete
        </button>
      </div>

      <button
        onClick={onSave}
        className="flex items-center justify-center gap-x-2 mt-2 mb-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-400 rounded-lg text-sm text-gray-800 transition"
      >
        <IoMdSend size={18} />
        Submit for Approval
      </button>
    </div>
  );
};

export default WriterDraftTile;
