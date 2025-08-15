import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import AdminBlogPostTile from '../../../components/AdminBlogPostTile';
import BlogPostTile from '../../../components/BlogPostTile';
import Footer from '../../../components/Footer';

import { BiLike } from 'react-icons/bi';
import { FaPen, FaCheck, FaRegClock, FaBookOpen, FaHeart, FaComment, FaRegComment, FaUserShield } from 'react-icons/fa';
import { MdOutlineNavigateNext, MdArrowBackIos, MdLogout } from 'react-icons/md';
import ConfirmPopup from '../../../components/ConfirmPopup';

const AdminDashboard = () => {
  const [insights, setInsights] = useState({});
  const [pendingPosts, setPendingPosts] = useState([]);
  const [publishedPosts, setPublishedPosts] = useState([]);

  const [activeTab, setActiveTab] = useState('pending');
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const [topLiked, setTopLiked] = useState([]);
  const [topCommented, setTopCommented] = useState([]);
  const [confirmDialog, setConfirmDialog] = useState({ open: false, postId: null });

  // New Admin creation form states
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [admins, setAdmins] = useState([]);
  const [adminKey, setAdminKey] = useState('');
  const [deleteEmail, setDeleteEmail] = useState("");
  const [deleteKey, setDeleteKey] = useState("");

  const navigate = useNavigate();
  const authToken = localStorage.getItem('token');

  useEffect(() => {
    fetchInsights();
    fetchPendingPosts();
    fetchPublishedPosts(currentPage);
    fetchTopLikedPosts(setTopLiked);
    fetchTopCommentedPosts(setTopCommented);
    fetchAdmins();
  }, [currentPage]);

  const fetchInsights = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/admin/insights', {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setInsights(response.data);
    } catch (err) {
      console.error('Insights fetch error', err);
    }
  };

  const fetchPendingPosts = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/posts/pending', {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setPendingPosts(response.data);
    } catch (err) {
      console.error('Pending fetch error', err);
    }
  };

  const fetchPublishedPosts = async (page = 1) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/posts?page=${page}`);
      setPublishedPosts(response.data.data);
      setLastPage(response.data.last_page);
    } catch (err) {
      console.error('Published fetch error', err);
    }
  };

  const getImageUrl = (imagePath) =>
    imagePath ? `http://127.0.0.1:8000/storage/${imagePath}` : '';

  const onPublishPost = async (id) => {
    try {
      await axios.patch(`http://127.0.0.1:8000/api/posts/${id}/approve`, {}, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      toast.success('Post published!');
      fetchPendingPosts();
      fetchPublishedPosts(currentPage);
    } catch (err) {
      toast.error('Failed to publish post.');
    }
  };

  const onDeletePost = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/posts/${id}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      toast.success('Post deleted!');
      fetchPendingPosts();
      fetchPublishedPosts(currentPage);
    } catch (err) {
      toast.error('Failed to delete post.');
    }
  };

  const onLogout = async () => {
    try {
      await axios.post('http://127.0.0.1:8000/api/admin-logout', {}, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      localStorage.removeItem('token');
      toast.success('Logged out!');
      setTimeout(() => (window.location.href = '/'), 1000);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchTopLikedPosts = async (setTopLiked) => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/admin/insights/top-liked');
      setTopLiked(response.data);
    } catch (err) {
      console.error('Top liked posts fetch error', err);
    }
  };

  const fetchTopCommentedPosts = async (setTopCommented) => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/admin/insights/top-commented');
      setTopCommented(response.data);
    } catch (err) {
      console.error('Top commented posts fetch error', err);
    }
  };

  const onPostClick = (id) => navigate(`/posts/${id}`);

  const handleAddAdmin = async (e) => {
    e.preventDefault();
    if (!adminEmail || !adminPassword || !adminKey) {
      toast.error('Please fill in all fields.');
      return;
    }

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/admin/register',
        {
          name: 'Admin User',
          email: adminEmail,
          password: adminPassword,
          role: 'admin',
          admin_key: adminKey,
        },
        { headers: { Authorization: `Bearer ${authToken}` } }
      );

      toast.success('New admin created successfully!');
      setAdminEmail('');
      setAdminPassword('');
      setAdminKey('');
      fetchAdmins();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create admin.');
    }
  };

  const fetchAdmins = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/admin/list', {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      setAdmins(res.data);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to fetch admins.');
    }
  };

  const handleDeleteAdmin = async (e) => {
    e.preventDefault();

    if (!deleteEmail || !deleteKey) {
      toast.error('Please fill in all fields.');
      return;
    }

    try {
      await axios.post(
        'http://127.0.0.1:8000/api/admin/delete',
        {
          email: deleteEmail,
          admin_key: deleteKey,
        },
        { headers: { Authorization: `Bearer ${authToken}` } }
      );

      toast.success('Admin deleted successfully!');
      setDeleteEmail('');
      setDeleteKey('');
      fetchAdmins();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error deleting admin.');
    }
  };


  const insightCards = [
    { icon: <FaBookOpen />, label: 'Total Posts', count: insights.totalPosts },
    { icon: <FaCheck />, label: 'Published', count: insights.publishedPosts },
    { icon: <FaRegClock />, label: 'Pending', count: insights.pendingPosts },
    { icon: <FaHeart />, label: 'Reactions', count: insights.totalReactions },
    { icon: <FaComment />, label: 'Comments', count: insights.totalComments },
  ];

  return (
    <>
      <div className="flex items-center justify-between px-6 md:px-16 py-4 border-b">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <button
          onClick={onLogout}
          className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
        >
          <MdLogout /> Log Out
        </button>
      </div>

      {/* Insights */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 px-6 md:px-20 py-4">
        {insightCards.map((card, idx) => (
          <div key={idx} className="bg-white border rounded p-4 text-center">
            <div className="text-xl mb-2 text-gray-600">{card.icon}</div>
            <div className="text-sm text-gray-500">{card.label}</div>
            <div className="text-lg font-bold">{card.count ?? 0}</div>
          </div>
        ))}
      </div>

      <section className="px-4 md:px-20 py-6">
        <h2 className="text-xl font-bold mb-6">Admin Management</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Add Admin */}
          <form
            onSubmit={handleAddAdmin}
            className="bg-white border border-gray-300 rounded-lg p-5 shadow-sm"
          >
            <h3 className="text-lg font-semibold mb-4">Add New Admin</h3>
            <input
              type="email"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
              placeholder="New admin email"
              className="w-full border border-gray-300 rounded px-3 py-2 mb-3"
            />
            <input
              type="password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              placeholder="New admin password"
              minLength={8}
              className="w-full border border-gray-300 rounded px-3 py-2 mb-3"
            />
            <input
              type="text"
              value={adminKey}
              onChange={(e) => setAdminKey(e.target.value)}
              placeholder="Secret admin key"
              className="w-full border border-red-300 bg-red-50 rounded px-3 py-2 mb-4"
            />
            <button
              type="submit"
              className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-700"
            >
              Create Admin
            </button>
          </form>

          {/* List of Admins */}
          <div className="bg-white border border-gray-300 rounded-lg p-5 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Current Admins</h3>
            <ul>
              {admins.map((admin) => (
                <li key={admin.email} className="flex items-center border border-gray-300 rounded px-2 py-1 mb-3">
                  <FaUserShield className="text-gray-700 mr-2" />
                  <div>
                    <p className="font-medium">{admin.name}</p>
                    <p className="text-sm text-gray-500">{admin.email}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Delete Admin */}
          <form
            onSubmit={handleDeleteAdmin}
            className="bg-white border border-gray-300 rounded-lg p-5 shadow-sm"
          >
            <h3 className="text-lg font-semibold mb-4">Delete Admin</h3>
            <input
              type="email"
              value={deleteEmail}
              onChange={(e) => setDeleteEmail(e.target.value)}
              placeholder="Admin email to delete"
              className="w-full border border-gray-300 rounded px-3 py-2 mb-3"
            />
            <input
              type="text"
              value={deleteKey}
              onChange={(e) => setDeleteKey(e.target.value)}
              placeholder="Admin key"
              className="w-full border border-red-300 bg-red-50 rounded px-3 py-2 mb-4"
            />
            <button
              type="submit"
              className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-500"
            >
              Delete Admin
            </button>
          </form>
        </div>
      </section>

      {/* Top Insights */}
      <section className="px-6 md:px-20 py-4">
        <h2 className="text-lg font-semibold mb-2">Top Insights</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-300 rounded-lg p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">🔥 Most Liked Posts</h3>
            <ol className="space-y-4">
              {topLiked.map((post, index) => (
                <li
                  key={post.id}
                  className="flex flex-col gap-1 border-b pb-3 border-gray-200 last:border-b-0"
                >
                  <p className="text-md font-medium text-gray-900">
                    {index + 1}. {post.post_title}
                  </p>
                  <div className="flex items-center text-sm text-gray-600 gap-4">
                    <span className="flex items-center gap-1">
                      <BiLike size={18} className="text-purple-800" />
                      {post.reactions_count} Likes
                    </span>
                    <span className="flex items-center gap-1">
                      <FaRegComment size={16} className="text-gray-800" />
                      {post.comments_count} Comments
                    </span>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="bg-white border border-gray-300 rounded-lg p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">💬 Most Commented Posts</h3>
            <ol className="space-y-4">
              {topCommented.map((post, index) => (
                <li
                  key={post.id}
                  className="flex flex-col gap-1 border-b pb-3 border-gray-200 last:border-b-0"
                >
                  <p className="text-md font-medium text-gray-900">
                    {index + 1}. {post.post_title}
                  </p>
                  <div className="flex items-center text-sm text-gray-600 gap-4">
                    <span className="flex items-center gap-1">
                      <BiLike size={18} className="text-purple-800" />
                      {post.reactions_count} Likes
                    </span>
                    <span className="flex items-center gap-1">
                      <FaRegComment size={16} className="text-gray-800" />
                      {post.comments_count} Comments
                    </span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="flex space-x-4 px-6 md:px-20 mt-6">
        <button
          onClick={() => setActiveTab('pending')}
          className={`px-4 py-2 rounded ${activeTab === 'pending' ? 'bg-gray-800 text-white' : 'bg-gray-200'}`}
        >
          Pending Posts
        </button>
        <button
          onClick={() => setActiveTab('published')}
          className={`px-4 py-2 rounded ${activeTab === 'published' ? 'bg-gray-800 text-white' : 'bg-gray-200'}`}
        >
          Published Posts
        </button>
      </div>

      {/* Posts List */}
      <div className="px-6 md:px-20 py-6">
        {activeTab === 'pending' ? (
          <>
            {pendingPosts.length === 0 ? (
              <p className="text-gray-500">No pending posts.</p>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {pendingPosts.map((post) => (
                  <AdminBlogPostTile
                    key={post.id}
                    image={getImageUrl(post.cover_image)}
                    title={post.post_title}
                    body={post.post_body}
                    author={post.user?.name || 'Unknown'}
                    postState={post.post_status}
                    onPublish={() => onPublishPost(post.id)}
                    onDelete={() => setConfirmDialog({ open: true, postId: post.id })}
                    onClick={() => onPostClick(post.id)}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <>
            {publishedPosts.length === 0 ? (
              <p className="text-gray-500">No published posts.</p>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {publishedPosts.map((post) => (
                  <BlogPostTile
                    key={post.id}
                    image={getImageUrl(post.cover_image)}
                    title={post.post_title}
                    body={post.post_body}
                    likes={post.reactions_count}
                    comments={post.comments_count}
                    author={post.user?.name || 'Unknown'}
                    onClick={() => onPostClick(post.id)}
                  />
                ))}
              </div>
            )}

            <div className="flex justify-center items-center mt-8 space-x-4">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="w-28 flex items-center text-md justify-center gap-2 px-4 py-2 bg-gray-300 text-black rounded disabled:opacity-50"
              >
                <MdArrowBackIos size={14} /> Previous
              </button>

              <span className="text-lg font-medium">{currentPage}</span>

              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, lastPage))}
                disabled={currentPage === lastPage}
                className="w-28 flex items-center text-md justify-center gap-2 px-4 py-2 bg-gray-800 text-white rounded disabled:opacity-50"
              >
                Next <MdOutlineNavigateNext size={20} />
              </button>
            </div>
          </>
        )}
      </div>

      <ConfirmPopup
        isOpen={confirmDialog.open}
        message="Are you sure you want to delete this post?"
        onCancel={() => setConfirmDialog({ open: false, postId: null })}
        onConfirm={() => {
          onDeletePost(confirmDialog.postId);
          setConfirmDialog({ open: false, postId: null });
        }}
      />

      <Footer />
    </>
  );
};

export default AdminDashboard;
