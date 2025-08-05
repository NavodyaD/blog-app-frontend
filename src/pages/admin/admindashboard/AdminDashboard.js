import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AdminBlogPostTile from '../../../components/AdminBlogPostTile';
import BlogPostTile from '../../../components/BlogPostTile';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AdminDashboard = () => {

    const [allPosts, setAllPosts] = useState([]);
    const [publishedPosts, setPublishedPosts] = useState([]);
    const [loading, setLoading] = useState();

    const navigate = useNavigate();

    const authToken = localStorage.getItem('token');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/all-posts', {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    }
                });
                setAllPosts(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            } finally {
                setLoading(false);
            }
        };

        const fetchPublishedPosts = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/posts');
            setPublishedPosts(response.data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
        };

        fetchPosts();
        fetchPublishedPosts();
    }, []);

    const getImageUrl = (imagePath) => {
    return imagePath
        ? `http://127.0.0.1:8000/storage/${imagePath}`
        : 'https://via.placeholder.com/300'; 
    };

    const onPublishPost = async (id) => {
        try {
            const response = await axios.patch(
            `http://127.0.0.1:8000/api/posts/${id}/approve`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            }
        );

            console.log("Post published successful!");
            toast.success('Post Published Successful!');
            
        } catch (error) {

            console.log("Failed to publish post", error);
            toast.error('Failed to publish post!');

        }
    }

    const onDeletePost = async (id) => {
        try {
            const response = await axios.delete(`http://127.0.0.1:8000/api/posts/${id}`, {
                headers: {
                    Authorization: `bearer ${authToken}`,
                }
            });
            console.log('Post deleted successful!');
            toast.success('Post Deleted Successful!');
        } catch (error) {
            console.error('Unable to delete post', error);
            toast.error('Unable to delete post!');
        }
    }

    const onLogout = async () => {
        try {
            await axios.post('http://127.0.0.1:8000/api/admin-logout',
                {}, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                }
            });

            localStorage.removeItem('token');
            toast.success('Logged out successful!');
            
            setTimeout(() => {
              window.location.href = '/login';
            }, 2000);

        } catch (error) {
            console.error('Logout failed:', error.response?.data || error.message);
        }
    }

    const onPostClick = (id) => {
        navigate(`/posts/${id}`);
    }

    return (
        <>
        <div className="max=w px-20 py-8 rounded-b-3xl shadow-md shadow-gray-200 flex flex-row place-content-between">
            <h4 className='text-3xl font-bold'> BlogApp </h4>
            <button className='bg-blue-800 hover:bg-blue-700 font-semibold rounded text-white px-8 py-2' onClick={onLogout}>
            Log Out
            </button>
        </div>

        <div className="w-4/5 mx-auto px-4 py-8">

              <h1 className="text-3xl font-bold mb-4 text-center">Welcome, Admin!</h1>
        
              <h2 className='text-2xl font-semibold mt-12 mb-2'>Published BlogPosts</h2>
              <p className='text-gray-500 font-semibold mb-12'>Published BlogPosts on BlogApp</p>
        
              {loading ? (
                <p>Loading...</p>
              ) : allPosts.length === 0 ? (
                <p className="text-gray-500">No posts to approve and publish</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-6">
                  {allPosts.map((post) => (
                    <AdminBlogPostTile
                      key={post.id}
                      image={getImageUrl(post.cover_image)}
                      title={post.post_title}
                      body={post.post_body}
                      author={post.user?.name || 'Unknown'}
                      postState={post.post_status}
                      onPublish={() => onPublishPost(post.id)}
                      onDelete={() => onDeletePost(post.id)}
                      onClick={() => onPostClick(post.id)}
                    />
                  ))}
                </div>
              )}

              <h2 className='text-2xl font-semibold mt-12 mb-2'>Published BlogPosts</h2>
              <p className='text-gray-500 font-semibold mb-12'>Published BlogPosts on BlogApp</p>

              <div className="flex flex-wrap justify-center gap-6">
                    {publishedPosts.map((post) => (
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
        </>
    );
}

export default AdminDashboard;