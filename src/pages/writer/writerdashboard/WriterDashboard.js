import React, { useEffect, useState } from 'react';
import axios from 'axios';
import WriterBlogPostTile from '../../../components/WriterBlogPostTile';
import WriterDraftTile from '../../../components/WriterDraftTile';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Footer from '../../../components/Footer';
import BlogPostTile from '../../../components/BlogPostTile';
import { FaBars, FaTimes } from "react-icons/fa";
import { BsPencil } from 'react-icons/bs';
import { FaRegNewspaper } from 'react-icons/fa';
import { RiDraftLine } from 'react-icons/ri';
import { HiOutlineDocumentText } from 'react-icons/hi';
import { FiLogOut } from 'react-icons/fi';
import { MdOutlineNavigateNext } from 'react-icons/md';
import { MdArrowBackIos } from 'react-icons/md';
import ConfirmPopup from '../../../components/ConfirmPopup';
import BlogBannerCarousel from '../../../components/BlogBannerCarousel';
import EngagingPostsSection from '../../../components/EngagingPostsSection';
import { FiSearch } from 'react-icons/fi';
import HeroSection01 from '../../../components/HeroSection01';

const WriterDashboard = () => {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [drafts, setDrafts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('allposts');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [confirmDialog, setConfirmDialog] = useState({ open: false, postId: null });

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);

  const navigate = useNavigate();

  const authToken = localStorage.getItem('token');

  const fetchOwnPosts = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/own-posts', {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setPosts(response.data.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOwnDrafts = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/own-drafts', {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setDrafts(response.data.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const fetchPosts = async (page) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/posts?page=${page}`);
      setAllPosts(response.data.data.data);
      setLastPage(response.data.data.last_page);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchOwnPosts();
    fetchOwnDrafts();
    fetchPosts(currentPage);
  }, [currentPage]);

  const onCreatePost = () => {
    navigate('/create-post');
  };

  const onEditPost = (post) => {
    navigate('/edit-post', { state: { post } });
  };

  const onPostClick = (id) => {
    navigate(`/posts/${id}`);
  };

  const getImageUrl = (imagePath) => {
    return imagePath
      ? `http://127.0.0.1:8000/storage/${imagePath}`
      : 'https://via.placeholder.com/300';
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/posts/search', {
        query: searchQuery,
      });
      setSearchResults(response.data.data);
    } catch (error) {
      console.error('Error searching posts:', error);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults(null);
  };

  const onDeletePost = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/posts/${id}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      toast.success('Post Deleted Succesful!');
      fetchOwnPosts();
      fetchOwnDrafts();
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast.error('Unable to delete post!');
    }
  };

  const onLogout = async () => {
    try {
      await axios.post(
        'http://127.0.0.1:8000/api/writer-logout',
        {},
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      localStorage.removeItem('token');
      toast.success('Logged out successfully!');
      setTimeout(() => {
        window.location.href = '/';
      }, 500);
    } catch (error) {
      console.error('Logout failed:', error.response?.data || error.message);
    }
  };

  const onSaveDraft = async (id) => {
    try {
      await axios.patch(
        `http://127.0.0.1:8000/api/posts/${id}/save`,
        {},
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      toast.success('Post saved and sent for approval!');
      fetchOwnPosts();
      fetchOwnDrafts();
    } catch (error) {
      console.log('Failed to publish post', error);
      toast.error('Failed to send post for approval!');
    }
  };

  return (
    <>
    <div className="max-w-full border px-4 md:px-16 py-4 flex flex-col md:flex-row justify-between">
      <div className="flex w-full items-center justify-between">
        <img
          src="/assets/images/Postly_logo.jpg"
          alt="BlogApp Logo"
          className="h-8 md:h-12 w-auto"
        />
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>
      <div
        className={`${isMenuOpen ? "flex" : "hidden"} md:flex flex-col md:flex-row md:items-center mt-4 md:mt-0 space-y-4 md:space-y-0 md:space-x-6`}
      >
        <button
          className="flex items-center justify-center gap-2 bg-white text-purple-900 border border-purple-900 hover:bg-purple-800 hover:text-white rounded font-semibold px-8 py-2 w-full md:w-auto"
          onClick={onCreatePost}
        >
          <BsPencil size={18} />
          <span className="whitespace-nowrap">Create Blog</span>
        </button>
        <button
          className="flex items-center justify-center gap-2 bg-purple-900 hover:bg-purple-800 font-semibold rounded text-white px-8 py-2 w-full md:w-auto"
          onClick={onLogout}
        >
          <FiLogOut size={18} />
          <span className="whitespace-nowrap">Log Out</span>
        </button>
      </div>
    </div>

    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16 py-8">
      <h1 className="md:text-3xl text-2xl font-bold mb-6 text-left">
        <span className="mr-2 text-yellow-400 text-3xl">👋</span>
        Welcome, Writer!
      </h1>

      <BlogBannerCarousel onCreatePost={onCreatePost} />
      <EngagingPostsSection />
      <HeroSection01 />

      <div className="mb-8">
        <div className="flex space-x-4 md:space-x-8 border-b border-gray-300 mb-6">
          <button
            onClick={() => setActiveTab('posts')}
            className={`pb-2 font-semibold text-sm md:text-lg flex items-center gap-2 ${
              activeTab === 'posts'
                ? 'border-b-2 border-gray-800 text-gray-800'
                : 'text-gray-500 hover:text-gray-600'
            }`}
          >
            <FaRegNewspaper className="text-xl" />
            Your Posts
          </button>
          <button
            onClick={() => setActiveTab('drafts')}
            className={`pb-2 font-semibold text-sm md:text-lg flex items-center gap-2 ${
              activeTab === 'drafts'
                ? 'border-b-2 border-gray-800 text-gray-800'
                : 'text-gray-500 hover:text-gray-600'
            }`}
          >
            <RiDraftLine className="text-xl" />
            Your Drafts
          </button>
          <button
            onClick={() => setActiveTab('allposts')}
            className={`pb-2 font-semibold text-sm md:text-lg flex items-center gap-2 ${
              activeTab === 'allposts'
                ? 'border-b-2 border-gray-800 text-gray-800'
                : 'text-gray-500 hover:text-gray-600'
            }`}
          >
            <HiOutlineDocumentText className="text-xl" />
            All Posts
          </button>
        </div>

        {activeTab === 'posts' && (
          <>
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
                    onDelete={() => setConfirmDialog({ open: true, postId: post.id })}
                    onClick={() => onPostClick(post.id)}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === 'drafts' && (
          <>
            <h2 className="text-2xl font-semibold mb-2">Your Post Drafts</h2>
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
                    onDelete={() => setConfirmDialog({ open: true, postId: post.id })}
                    onSave={() => onSaveDraft(post.id)}
                    onClick={() => onPostClick(post.id)}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === 'allposts' && (
          <>
            <div className="mb-10 text-center">
              <h1 className="text-4xl font-bold text-gray-800 mb-2">Explore Blog Posts</h1>
              <p className="text-lg text-gray-600">Read the latest insights, stories, and news</p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center mb-6 gap-4 w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search posts by title"
                className="border border-gray-500 rounded px-4 py-2 w-full sm:w-80 md:w-3/4"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleSearch}
                  className="bg-purple-900 hover:bg-purple-800 text-white px-6 py-2 rounded flex items-center gap-2"
                >
                  <FiSearch className="text-white" size={18} />
                  Search
                </button>
                {searchResults && (
                  <button
                    onClick={clearSearch}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {(searchResults ?? allPosts).map((post) => (
                <BlogPostTile
                  key={post.id}
                  image={getImageUrl(post.cover_image)}
                  title={post.post_title}
                  body={post.post_body}
                  author={post.user?.name || 'Unknown Author'}
                  likes={post.reactions_count}
                  comments={post.comments_count}
                  onClick={() => onPostClick(post.id)}
                />
              ))}
            </div>
            <div className="flex justify-center items-center mt-10 space-x-4">
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
    </div>
    <Footer />
    </>
  );
};

export default WriterDashboard;
