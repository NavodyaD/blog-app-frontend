import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';


const PostDetailPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://127.0.1:8000/api/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [id]);

  if (!post) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-14 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">{post.post_title}</h1>
      <img src={post.cover_image} alt="cover" className="mb-4 rounded" />
      <p className="text-md text-gray-800 mb-4">{post.post_body}</p>
      <p className="text-2xl text-gray-500">Author: {post.user?.name || 'Unknown'}</p>
    </div>
  );
};

export default PostDetailPage;
