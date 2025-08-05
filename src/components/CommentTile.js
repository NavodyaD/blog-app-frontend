const CommentTile = ({ comment_text, username }) => {
  return (
    <div className="border border-gray-400 rounded-lg hover:bg-gray-100 p-4 bg-white mb-6">
      <p className="text-gray-800 font-semibold">@{username}</p>
      <p className="text-gray-700 mt-2">{comment_text}</p>
    </div>
  );
};

export default CommentTile;
