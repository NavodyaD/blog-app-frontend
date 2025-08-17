import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BlogPostTile from '../../components/BlogPostTile';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';
import { FaBars, FaTimes } from "react-icons/fa";
import { FiLogIn } from 'react-icons/fi';
import { MdOutlineNavigateNext } from 'react-icons/md';
import { MdArrowBackIos } from 'react-icons/md';
import { BsPencil, BsCheckCircle, BsClock, BsLightning } from 'react-icons/bs';
import { IoLogInOutline } from 'react-icons/io5';
import { FiSearch } from 'react-icons/fi';
import EngagingPostsSection from '../../components/EngagingPostsSection';
import HeroSection01 from '../../components/HeroSection01';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);

  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage]);

  const fetchPosts = async (page) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/posts?page=${page}`);

      setPosts(response.data.data.data);
      setLastPage(response.data.data.last_page);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handlePostClick = (id) => {
    navigate(`/posts/${id}`);  
  };

  const gotoLogin = () => {
    navigate('/login');
  }

  const gotoSignup = () => {
    navigate('/signup');
  }

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

  const getImageUrl = (imagePath) => {
  return imagePath
    ? `http://127.0.0.1:8000/storage/${imagePath}`
    : 'https://via.placeholder.com/300'; 
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
            className={`${
              isMenuOpen ? "flex" : "hidden"
            } md:flex flex-col md:flex-row md:items-center mt-4 md:mt-0 space-y-4 md:space-y-0 md:space-x-6`}
          >
            <button
              className="flex items-center justify-center gap-2 bg-white text-purple-900 border border-purple-800 hover:bg-purple-900 hover:text-white rounded font-semibold px-8 py-2 w-full md:w-auto"
              onClick={gotoLogin}
            >
              <FiLogIn size={18} />
              <span className="whitespace-nowrap">Login</span>
            </button>
            <button
              className="flex items-center justify-center gap-2 bg-purple-900 hover:bg-purple-800 font-semibold rounded text-white px-8 py-2 w-full md:w-auto"
              onClick={gotoSignup}
            >
              <IoLogInOutline size={22}/>
              <span className="whitespace-nowrap">Sign Up</span>
            </button>
          </div>
    </div>
    
    <div
      className="w-full bg-cover border border-gray-300 rounded-b-xl md:rounded-b-3xl bg-center md:px-28 px-4 md sm:px-10 py-12 md:pt-20 flex flex-col items-start justify-between gap-6"
      style={{
        backgroundImage: "url('/assets/images/landing_banner.jpg')",
        minHeight: '380px',
      }}
    >
    <div className="text-white text-left">
        <h4 className="text-2xl md:text-3xl font-bold mb-4">
          Share Your Words with the World.
        </h4>

        <ul className="space-y-4 md:text-lg text-sm md:text-base">
          <li className="flex items-center gap-4">
            <BsPencil className="text-white" />
            Write engaging blog posts
          </li>
          <li className="flex items-center gap-4">
            <BsCheckCircle className="text-white" />
            Submit for approval easily
          </li>
          <li className="flex items-center gap-4">
            <BsLightning className="text-white" />
            Gain interactions
          </li>
        </ul>
    </div>

      <div className="flex gap-4 mt-6">
        <button
          onClick={gotoLogin}
          className="flex items-center justify-center gap-2 px-6 py-2 bg-white text-purple-900 font-semibold rounded hover:bg-gray-200 transition"
        >
          <FiLogIn size={18} />
          Login
        </button>
        <button
          onClick={gotoSignup}
          className="px-6 py-2 bg-transparent border border-white text-white hover:text-purple-900 font-semibold rounded hover:bg-white transition"
        >
          Sign Up
        </button>
      </div>
    </div>
    <div className="bg-white py-6 md:px-24 px-4 bg-gray-50 justify-around min-h-screen">

      <EngagingPostsSection />

      <div className="mb-10 text-center">
        <h1 className="md:text-4xl text-2xl font-bold text-gray-800 mb-2">Explore Blog Posts</h1>
        <p className="md:text-lg text-md text-gray-600">Read the latest insights, stories, and news</p>
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
        {(searchResults ?? posts).map((post) => (
          <BlogPostTile
            key={post.id}
            image={getImageUrl(post.cover_image)}
            title={post.post_title}
            body={post.post_body}
            author={post.user?.name || 'Unknown Author'}
            likes={post.reactions_count}
            comments={post.comments_count}
            onClick={() => handlePostClick(post.id)}
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
  
    </div>

    <HeroSection01 />

    <Footer />
    </>
  );
};

export default HomePage;
