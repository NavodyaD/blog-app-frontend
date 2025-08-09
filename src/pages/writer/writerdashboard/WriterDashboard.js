import React, { useEffect, useState } from 'react';
import axios from 'axios';
import WriterBlogPostTile from '../../../components/WriterBlogPostTile';
import WriterDraftTile from '../../../components/WriterDraftTile';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Footer from '../../../components/Footer';
import BlogPostTile from '../../../components/BlogPostTile';

const WriterDashboard = () => {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
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

  const fetchPosts = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/posts');
        setAllPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

  useEffect(() => {
    fetchOwnPosts();
    fetchOwnDrafts();
    fetchPosts();
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

    fetchOwnPosts();
    fetchOwnDrafts();

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
              window.location.href = '/';
            }, 2000);

        } catch (error) {
            console.error('Logout failed:', error.response?.data || error.message);
        }
    }

  const onSaveDraft = async (id) => {
    try {
      const response = await axios.patch(`http://127.0.0.1:8000/api/posts/${id}/save`, {}, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });

      console.log("Post submitted successful!");
      toast.success('Post saved and sent for approval!');

      fetchOwnPosts();
      fetchOwnDrafts();

    } catch (error) {
      console.log("Failed to publish post", error);
      toast.error('Failed to send post for approval!');
    }
  }

  return (
    <>
    <div className="max=w px-20 py-8 rounded-b-3xl shadow-md shadow-gray-300 flex flex-row place-content-between">
        <h4 className='text-3xl font-bold'> BlogApp </h4>
        <div className='flex flex-row space-x-6'>
          <button className='bg-white text-gray-800 border border-gray-800 hover:bg-gray-800 hover:text-white rounded font-semibold px-8 py-2' onClick={onCreatePost}>
            Create Blog
          </button>
          <button className='bg-gray-800 hover:bg-gray-800 font-semibold rounded text-white px-8 py-2' onClick={onLogout}>
              Log Out
          </button>
        </div>
    </div>

    <div className="max=w mx-auto px-16 py-8">

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
          + Create Blog
        </button>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Your Blog Posts</h2>
      <p className='font-semibold text-gray-500 mb-10'>Writed BlogPosts by you</p>

      {loading ? (
        <p>Loading...</p>
      ) : posts.length === 0 ? (
        <p className="text-gray-500">You have no created any blog posts yet.</p>
      ) : (
        <div className="flex flex-wrap justify-start gap-5">
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
        <div className="flex flex-wrap justify-start gap-6">
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
      
      <div className="py-6 justify-start min-h-screen">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Explore Blog Posts</h1>
          <p className="text-lg text-gray-600">Read the latest insights, stories, and news</p>
        </div>

        <div className="flex flex-wrap justify-start gap-6">
          {allPosts.map((post) => (
            <BlogPostTile
              key={post.id}
              image={getImageUrl(post.cover_image)}
              title={post.post_title}
              body={post.post_body}
              author={post.user?.name || 'Unknown Auther'}
              onClick={() => onPostClick(post.id)}
            />
          ))}
        </div>
      </div>

    </div>

    <Footer />
    </>
  );
};

export default WriterDashboard;
