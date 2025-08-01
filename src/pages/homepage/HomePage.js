import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BlogPostTile from '../../components/BlogPostTile';


const HomePage = () => {
  const [posts, setPosts] = useState([]);

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

  const handlePostClick = (slug) => {
    console.log(`Navigate to post: ${slug}`);
  };

  return (
    <div className="p-6 md:p-12 bg-gray-50 min-h-screen">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Explore Blog Posts</h1>
        <p className="text-lg text-gray-600">Read the latest insights, stories, and news</p>
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        {posts.map((post) => (
          <BlogPostTile
            key={post.id}
            image={post.cover_image}
            title={post.post_title}
            body={post.post_body}
            author={post.user?.name || 'Unknown Auther'}
            onClick={() => handlePostClick(post.post_slug)}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
