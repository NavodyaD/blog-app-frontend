import React, { useEffect, useState } from 'react';
import axios from 'axios';
import WriterBlogPostTile from '../../../components/WriterBlogPostTile';
import { useNavigate } from 'react-router-dom';

const WriterDashboard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const authToken = localStorage.getItem('token');

  const fetchOwnPosts = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/own-posts', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOwnPosts();
  }, []);

  const onCreatePost = () => {
    navigate('/create-post');
  }

  const onEditPost = (post) => {
    navigate('/edit-post', { state: { post } });
  };

  const onPostClick = (id) => {
    navigate(`/posts/${id}`);
  }

  const onDeletePost = async (id) => {
    try {
        const response = await axios.delete(`http://127.0.0.1:8000/api/posts/${id}`, {
        headers: {
            Authorization: `Bearer ${authToken}`,
        }
    });

    console.log('Post Deleted Successfully!');
    alert('Post Deleted Successfully!');
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4 text-center">Welcome, Writer!</h1>

      <div className="flex justify-center mb-8">
        <button
          onClick={onCreatePost}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded shadow"
        >
          Create Blog
        </button>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Your Blog Posts</h2>

      {loading ? (
        <p>Loading...</p>
      ) : posts.length === 0 ? (
        <p className="text-gray-500">You have no created any blog posts yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <WriterBlogPostTile
              key={post.id}
              image={post.cover_image}
              title={post.post_title}
              body={post.post_body}
              author={post.user?.name || 'Unknown'}
              postState={post.post_status}
              onEdit={() => onEditPost(post)}
              onDelete={() => onDeletePost(post.id)}
              onClick={() => onPostClick(post.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default WriterDashboard;
