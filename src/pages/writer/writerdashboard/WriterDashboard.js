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
    <div className="max=w border px-4 md:px-16 py-4 flex flex-col md:flex-row place-content-between">
      <h4 className="text-3xl font-bold md:my-4 text-left">BlogApp</h4>
      <div className="flex sm:flex-row my-4 sm:space-y-0 space-x-4 sm:space-x-6 w-full sm:w-auto">
        <button
          className="bg-white text-gray-800 border border-gray-800 hover:bg-gray-800 hover:text-white rounded font-semibold px-8 py-2 w-full sm:w-auto"
          onClick={onCreatePost}
        >
          Create Blog
        </button>
        <button
          className="bg-gray-800 hover:bg-gray-900 font-semibold rounded text-white px-8 py-2 w-full sm:w-auto"
          onClick={onLogout}
        >
          Log Out
        </button>
      </div>
    </div>

    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-20 py-8">

      <h1 className="md:text-3xl text-2xl font-bold mb-4 text-center">Welcome, Writer!</h1>

      <div className="w-full border border-gray-300 px-2 sm:px-10 py-6 flex flex-col sm:flex-row items-center sm:items-center justify-between gap-4 mb-10 rounded">
        <div className="flex flex-col">
          <h4 className="md:text-2xl text-xl font-bold mb-1">Get started with writing blogs.</h4>
          <p>Submit posts for approval</p>
        </div>
        <button
          onClick={onCreatePost}
          className="border border-black rounded text-black font-semibold hover:bg-gray-800 hover:text-white px-6 py-2 shadow"
        >
          + Create Blog
        </button>
      </div>

      <h2 className="text-2xl font-semibold mb-2">Your Blog Posts</h2>
      <p className="font-semibold text-gray-500 mb-10">Blog posts written by you</p>

      {loading ? (
        <p>Loading...</p>
      ) : posts.length === 0 ? (
        <p className="text-gray-500">You haven't created any blog posts yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

      <h2 className="text-2xl font-semibold mb-2 mt-12">Your Post Drafts</h2>
      <p className="font-semibold text-gray-500 mb-10">Submit drafts for approval</p>

      {drafts.length === 0 ? (
        <p className="text-gray-500">You have not created drafts yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

      <div className="py-10">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Explore Blog Posts</h1>
          <p className="text-lg text-gray-600">Read the latest insights, stories, and news</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allPosts.map((post) => (
            <BlogPostTile
              key={post.id}
              image={getImageUrl(post.cover_image)}
              title={post.post_title}
              body={post.post_body}
              author={post.user?.name || 'Unknown Author'}
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
