const WriterDraftTile = ({
  image, 
  title, 
  body, 
  author, 
  postState, 
  onEdit, 
  onDelete,
  onSave,
  onClick}) => {

    const getPreview = (text, wordLimit = 20) => {
        const words = text.split(' ');
        return words.length > wordLimit ? words.slice(0, wordLimit).join(' ') + '...' : text;
    };

    return (
        <div className="bg-white rounded-xl w-[300px] pb-6 shadow-lg overflow-hidden flex flex-col items-center transition-transform duration-300 ease-in-out hover:-translate-y-1">
        <div className="relative w-full h-[180px]" onClick={onClick}>
            <img
            src={image}
            alt={title}
            className="w-full h-full object-cover rounded-xl"
            />
        </div>

        <div className="p-4 text-center w-full relative">
            <p className="text-lg text-left font-semibold text-gray-800 mb-1">{title}</p>
            <p className="text-sm text-left text-blue-800 font-semibold mb-2">{postState}</p>
            <div
            className="text-sm text-justify text-gray-600 mb-2"
            dangerouslySetInnerHTML={{ __html: getPreview(body) }}
            ></div>
            <p className="text-sm text-left text-gray-800 font-medium">By {author}</p>
        </div>

        <div className="flex justify-between w-full px-4 pb-4 mt-auto gap-2">
            <button
            onClick={onEdit}
            className="border border-blue-800 text-blue-800 text-sm px-4 py-1 hover:bg-blue-800 hover:text-white rounded transition"
            >
            Edit Post
            </button>
            <button
            onClick={onDelete}
            className="text-red-800 border border-red-800 text-sm px-4 py-1 rounded hover:bg-red-800 hover:text-white transition"
            >
            Delete Post
            </button>
        </div>

        <button
            onClick={onSave}
            className="w-4/5 bg-white border border-gray-800 text-gray-900 text-sm px-4 py-1 rounded hover:bg-gray-200 transition"
        >
            Submit For Approve
        </button>

        </div>
    );
}

export default WriterDraftTile;