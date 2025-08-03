const CommentTile = ({ comment_text, username }) => {
  return (
    <div className="border border-gray-500 rounded-lg p-4 bg-white mb-6">
      <p className="text-gray-800 font-semibold">@{username}</p>
      <p className="text-gray-700 mt-2">{comment_text}</p>
    </div>
  );
};

export default CommentTile;
