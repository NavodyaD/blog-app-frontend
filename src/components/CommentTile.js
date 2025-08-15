import { FaRegUserCircle } from 'react-icons/fa';
import { FaCircleUser } from 'react-icons/fa6';

const CommentTile = ({ comment_text, username, created_at }) => {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="mt-1">
        <FaCircleUser className="text-gray-300 text-3xl" />
      </div>

      <div className='flex md:flex-row sm:flex-row flex-col justify-between border border-gray-400 rounded-lg hover:bg-gray-100 p-4 bg-white w-full'>
        <div className="md:max-w-2xl sm:max-w-lg">
          <p className="text-gray-800 font-semibold">{username}</p>
          <p className="text-gray-700 text-md italic">{comment_text}</p>
        </div>

        <p className="text-xs text-gray-400">{created_at.slice(0, 10)}</p>
      </div>
    </div>
  );
};

export default CommentTile;
