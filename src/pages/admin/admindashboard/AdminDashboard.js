import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AdminBlogPostTile from '../../../components/AdminBlogPostTile';
import BlogPostTile from '../../../components/BlogPostTile';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Footer from '../../../components/Footer';

const AdminDashboard = () => {

    const [pendingPosts, setPendingPosts] = useState([]);
    const [publishedPosts, setPublishedPosts] = useState([]);
    const [loading, setLoading] = useState();
    const [insights, setInsights] = useState(null);

    const navigate = useNavigate();

    const authToken = localStorage.getItem('token');

    useEffect(() => {
        fetchPendingPosts();
        fetchPublishedPosts();
        fetchInsights();
    }, []);

    const fetchPendingPosts = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/posts/pending', {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                }
            });
            setPendingPosts(response.data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchInsights = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/admin/insights', {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                }
            });

            setInsights(response.data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    }

    const cards = [
        { title: 'Total Posts', count: insights?.totalPosts ?? 'N/A' },
        { title: 'Published Posts', count: insights?.publishedPosts ?? 'N/A' },
        { title: 'Pending Posts', count: insights?.pendingPosts ?? 'N/A' },
        { title: 'Total Reactions', count: insights?.totalReactions ?? 'N/A' },
        { title: 'Total Comments', count: insights?.totalComments ?? 'N/A' },
    ];

    const fetchPublishedPosts = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/posts');
            setPublishedPosts(response.data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };
   

    const getImageUrl = (imagePath) => {
    return imagePath
        ? `http://127.0.0.1:8000/storage/${imagePath}`
        : ''; 
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

            toast.success('Post Published Successful!');
            console.log("Post published successful!");

            fetchPendingPosts();
            fetchPublishedPosts();
                
        } catch (error) {

            const errorMessage = error.response?.data?.message || error.message || 'Post Approve Failed';
            console.log('Post Approve Failed', error.response?.data || error.message);
            toast.error(`Post Approve Failed: ${errorMessage}`);

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
            const errorMessage = error.response?.data?.message || error.message || 'Post Delete Failed';
            console.log('Post Delete Failed', error.response?.data || error.message);
            toast.error(`Post Delete Failed: ${errorMessage}`);
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
              window.location.href = '/';
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
            <button className='bg-white hover:bg-gray-800 text-gray-800 hover:text-white border border-gray-800 font-semibold rounded px-8 py-2' onClick={onLogout}>
            Log Out
            </button>
        </div>

        <h1 className="text-3xl font-bold my-6 text-center">Welcome, Admin!</h1>

        <div className="mx-20 my-8 bg-white border border-gray-300 rounded-xl overflow-hidden">
            <div className="flex divide-x divide-gray-300">
            {cards.map((card, index) => (
            <div key={index} className="flex-1 text-center p-6">
                <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-2">
                {card.title}
                </h3>
                <p className="text-3xl font-semibold text-gray-800">
                {card.count}
                </p>
            </div>
            ))}
            </div>
        </div>

        <div className="max=w mx-auto px-20 justify-start py-6">
        
              <h2 className='text-2xl font-semibold mt-6 mb-2'>BlogPosts Pending Approval</h2>
              <p className='text-gray-500 font-semibold mb-12'>Approve & Publish Pending BlogPosts</p>
        
              {loading ? (
                <p>Loading...</p>
              ) : pendingPosts.length === 0 ? (
                <p className="text-gray-500">No posts to approve and publish</p>
              ) : (
                <div className="flex flex-wrap justify-start gap-6">
                  {pendingPosts.map((post) => (
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

            <Footer/>
        </>
    );
}

export default AdminDashboard;