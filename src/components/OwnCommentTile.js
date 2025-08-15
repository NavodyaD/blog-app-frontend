import { FaCircleUser } from 'react-icons/fa6';
import { MdDelete } from 'react-icons/md';
import { MdOutlineDeleteOutline } from 'react-icons/md';

const OwnCommentTile = ({ comment_id, comment_text, created_at, onDelete }) => {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="mt-1">
        <FaCircleUser className="text-gray-300 text-3xl" />
      </div>

      <div className="flex justify-between items-start border border-purple-400 rounded-lg p-4 bg-purple-50 w-full relative">
        <div className="max-w-2xl">
          <p className="text-gray-800 font-semibold">You</p>
          <p className="text-gray-700 text-md italic">{comment_text}</p>
        </div>

        <div className="flex flex-col items-end gap-1">
          <p className="text-xs text-gray-400">{created_at.slice(0, 10)}</p>
          <button onClick={() => onDelete(comment_id)} title="Delete comment">
            <MdOutlineDeleteOutline size={28} className="text-red-500 border border-red-500 rounded p-1 hover:bg-red-100 hover:text-red-900" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OwnCommentTile;