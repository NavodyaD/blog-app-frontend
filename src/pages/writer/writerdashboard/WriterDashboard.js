import React, { useEffect, useState } from 'react';
import axios from 'axios';
import WriterBlogPostTile from '../../../components/WriterBlogPostTile';
import WriterDraftTile from '../../../components/WriterDraftTile';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const WriterDashboard = () => {
  const [posts, setPosts] = useState([]);
  const [drafts, setDrafts] = useState([]);
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

  const fetchOwnDrafts = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/own-drafts', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      setDrafts(response.data);

    } catch (error) {
        console.error('Error fetching posts:', error);
    }
  }

  useEffect(() => {
    fetchOwnPosts();
    fetchOwnDrafts();
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

  const getImageUrl = (imagePath) => {
  return imagePath
    ? `http://127.0.0.1:8000/storage/${imagePath}`
    : 'https://via.placeholder.com/300'; 
  };

  const onDeletePost = async (id) => {
    try {
        const response = await axios.delete(`http://127.0.0.1:8000/api/posts/${id}`, {
        headers: {
            Authorization: `Bearer ${authToken}`,
        }
    });

    console.log('Post Deleted Successfully!');
    toast.success('Post Deleted Succesful!');

    } catch (error) {
        console.error('Error fetching posts:', error);
        toast.error('Unable to delete post!');
    }
  }

    const onLogout = async () => {
        try {
            await axios.post('http://127.0.0.1:8000/api/writer-logout', 
                {}, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                }
            });

            localStorage.removeItem('token');
            toast.success('Logged out successfully!');

            setTimeout(() => {
              window.location.href = '/login';
            }, 2000);

        } catch (error) {
            console.error('Logout failed:', error.response?.data || error.message);
        }
    }

  const onSaveDraft = async (id) => {
    try {
      const response = await axios.patch(`http://127.0.0.1:8000/api/posts/${id}/save`, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });

      console.log("Post submitted successful!");
      alert("Post submitted successful!");

    } catch (error) {
      console.log("Failed to publish post", error);
    }
  }

  return (
    <div className="w-4/5 mx-auto px-4 py-8">

      <div className="max=w border border-gray-300 px-16 py-6 mb-6 flex flex-row place-content-between">
          <h4 className='text-3xl font-bold'> BlogApp </h4>
          <button className='bg-blue-800 hover:bg-blue-700 font-semibold rounded text-white px-8 py-2' onClick={onLogout}>
              Log Out
          </button>
      </div>

      <h1 className="text-3xl font-bold mb-4 text-center">Welcome, Writer!</h1>

      <div className='w-full border border-gray-300 px-16 py-6 flex flex-row place-content-between mb-10'>
          <div className='flex flex-col'>
            <h4 className='text-2xl font-bold mb-1'> Get start with writing blogs. </h4>
            <p>Submit posts for approval</p>
          </div>
        <button
          onClick={onCreatePost}
          className="h-3/4 border border-black rounded text-black font-semibold hover:bg-gray-800 hover:text-white px-6 py-2 shadow"
        >
          Create Blog
        </button>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Your Blog Posts</h2>
      <p className='font-semibold text-gray-500 mb-10'>Writed BlogPosts by you</p>

      {loading ? (
        <p>Loading...</p>
      ) : posts.length === 0 ? (
        <p className="text-gray-500">You have no created any blog posts yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <WriterBlogPostTile
              key={post.id}
              image={getImageUrl(post.cover_image)}
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

      <h2 className="text-2xl font-semibold mb-2 mt-8">Your Post Drafts</h2>
      <p className='font-semibold text-gray-500 mb-10'>Submit drafts for approval</p>

      {drafts.length === 0 ? (
        <p className="text-gray-500">You have not created drafts yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {drafts.map((post) => (
            <WriterDraftTile
              key={post.id}
              image={getImageUrl(post.cover_image)}
              title={post.post_title}
              body={post.post_body}
              author={post.user?.name || 'Unknown'}
              postState={post.post_status}
              onEdit={() => onEditPost(post)}
              onDelete={() => onDeletePost(post.id)}
              onSave={() => onSaveDraft(post.id)}
              onClick={() => onPostClick(post.id)}
            />
          ))}
        </div>
      )}

    </div>
  );
};

export default WriterDashboard;
