import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AdminBlogPostTile from '../../../components/AdminBlogPostTile';

const AdminDashboard = () => {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState();

    const authToken = localStorage.getItem('token');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/posts');
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const onPublishPost = async (id) => {
        try {
            const response = await axios.patch(`http://127.0.0.1:8000/api/posts/${id}/approve`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                }
            })

            console.log("Post published successful!");
            alert("Post published successful!");
            
        } catch (error) {

            console.log("Failed to publish post", error);

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
            alert('Post deleted successful!');
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    }

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
              <h1 className="text-3xl font-bold mb-4 text-center">Welcome, Admin!</h1>
        
              <h2 className="text-2xl font-semibold mb-4">Approve BlogPosts</h2>
        
              {loading ? (
                <p>Loading...</p>
              ) : posts.length === 0 ? (
                <p className="text-gray-500">No posts to approve and publish</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {posts.map((post) => (
                    <AdminBlogPostTile
                      key={post.id}
                      image={post.cover_image}
                      title={post.post_title}
                      body={post.post_body}
                      author={post.user?.name || 'Unknown'}
                      postState={post.post_status}
                      onPublish={() => onPublishPost(post.id)}
                      onDelete={() => onDeletePost(post.id)}
                    />
                  ))}
                </div>
              )}
            </div>
    );
}

export default AdminDashboard;