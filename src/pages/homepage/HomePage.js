import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BlogPostTile from '../../components/BlogPostTile';
import { useNavigate } from 'react-router-dom';


const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handlePostClick = (id) => {
    navigate(`/posts/${id}`);  
  };

  const gotoLogin = () => {
    navigate('/login');
  }

  const getImageUrl = (imagePath) => {
  return imagePath
    ? `http://127.0.0.1:8000/storage/${imagePath}`
    : 'https://via.placeholder.com/300'; 
  };


  return (
    <div className="p-6 md:p-12 bg-gray-50 min-h-screen">
      <div className="max=w border px-16 py-6 mb-6 flex flex-row place-content-between">
        <h4 className='text-3xl font-bold'> BlogApp </h4>
        <button className='bg-blue-800 hover:bg-blue-700 font-semibold rounded text-white px-8 py-2' onClick={gotoLogin}>
          Login / Signup
        </button>
      </div>

      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Explore Blog Posts</h1>
        <p className="text-lg text-gray-600">Read the latest insights, stories, and news</p>
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        {posts.map((post) => (
          <BlogPostTile
            key={post.id}
            image={getImageUrl(post.cover_image)}
            title={post.post_title}
            body={post.post_body}
            author={post.user?.name || 'Unknown Auther'}
            onClick={() => handlePostClick(post.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
