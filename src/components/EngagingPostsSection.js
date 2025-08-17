import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BiLike } from 'react-icons/bi';
import { FaRegComment, FaFireAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const EngagingPostTile = ({ title, image, author, likes, comments, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white border border-gray-200 rounded-md shadow-sm p-3 mb-4 cursor-pointer sm:flex-col md:flex-col lg:flex-row hover:shadow-md transition flex gap-4"
    >
      <div className="md:h-35 md:w-35 lg:h-40 lg:w-40 w-24 h-24 flex-shrink-0 overflow-hidden rounded">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>

      <div className="flex flex-col justify-between flex-grow">
        <div>
          <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-1">{title}</h3>
          <p className="text-sm text-gray-600 mb-2">Author: {author}</p>
        </div>

        <div className="flex items-center gap-4 text-gray-600 text-sm mt-1">
          <div className="flex items-center gap-1">
            <BiLike size={16} />
            {likes}
          </div>
          <div className="flex items-center gap-1">
            <FaRegComment size={14} />
            {comments}
          </div>
        </div>
      </div>
    </div>
  );
};

const EngagingPostsSection = () => {
  const [topLikedPosts, setTopLikedPosts] = useState([]);
  const [topCommentedPosts, setTopCommentedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchEngagingPosts = async () => {
    try {
      const [likedRes, commentedRes] = await Promise.all([
        axios.get('http://127.0.0.1:8000/api/admin/insights/top-liked'),
        axios.get('http://127.0.0.1:8000/api/admin/insights/top-commented'),
      ]);

      setTopLikedPosts(likedRes.data.data);
      setTopCommentedPosts(commentedRes.data.data);
    } catch (error) {
      console.error('Error fetching engaging posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEngagingPosts();
  }, []);

  const getImageUrl = (imagePath) => {
    return imagePath
      ? `http://127.0.0.1:8000/storage/${imagePath}`
      : 'https://via.placeholder.com/300';
  };

  const onPostClick = (id) => navigate(`/posts/${id}`);

  if (loading) {
    return <div className="text-center py-10 text-gray-600">Loading engaging posts...</div>;
  }

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center gap-2">
        <FaFireAlt className="text-red-600" /> Most Engaging Posts
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-indigo-50 border border-indigo-200 rounded-lg py-4 px-4 md:px-8">
          <h3 className="text-lg font-semibold text-indigo-700 mb-1">Most Popular Posts</h3>
          <h3 className="text-sm font-semibold text-indigo-700 mb-4 flex items-center gap-2">
            <FaRegComment className="text-indigo-600" size={16} />
            Top Liked
          </h3>
          {topLikedPosts.map((post) => (
            <EngagingPostTile
              key={post.id}
              title={post.post_title}
              image={getImageUrl(post.cover_image)}
              author={post.user?.name || 'Unknown'}
              likes={post.reactions_count ?? 0}
              comments={post.comments_count ?? 0}
              onClick={() => onPostClick(post.id)}
            />
          ))}
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-yellow-700 mb-1">Most Engaged Posts</h3>
          <h3 className="text-sm font-semibold text-yellow-700 mb-4 flex items-center gap-2">
            <FaRegComment className="text-yellow-600" size={16} />
            Top Commented
          </h3>
          {topCommentedPosts.map((post) => (
            <EngagingPostTile
              key={post.id}
              title={post.post_title}
              image={getImageUrl(post.cover_image)}
              author={post.user?.name || 'Unknown'}
              likes={post.reactions_count ?? 0}
              comments={post.comments_count ?? 0}
              onClick={() => onPostClick(post.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EngagingPostsSection;
