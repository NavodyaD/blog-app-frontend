import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CommentTile from '../../components/CommentTile';
import axios from 'axios';
import Footer from '../../components/Footer';
import { toast } from 'react-toastify';
import { BiLike } from 'react-icons/bi';
import { BiSolidLike } from 'react-icons/bi';
import AuthPopup from '../../components/AuthPopup';
import FailurePopup from '../../components/FailurePopup';
import OwnCommentTile from '../../components/OwnCommentTile';

const PostDetailPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  const [comment, setComment] = useState('');
  const [postComments, setPostComments] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(true);

  const [likes, setLikes] = useState(0);
  const [userLiked, setUserLiked] = useState(false);
  const [showAuthPopup, setShowAuthPopup] = useState(false);

  const [showFailurePopup, setShowFailurePopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  const [ownComments, setOwnComments] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const authToken = localStorage.getItem('token');

  useEffect(() => {
    fetchPost();
    getComments();
    fetchReactionData();
    
    if (authToken) {
      getCurrentUser();
      getOwnComments();
    }
  }, [id, authToken]);

  const fetchPost = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/posts/${id}`);
      setPost(response.data.data); 
    } catch (error) {
      console.error('Error fetching post:', error);
    }
  };

  const fetchReactionData = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/posts/reactions/${id}`, {
        headers: { 
          Authorization: `Bearer ${authToken}` 
        },
      });
      setLikes(response.data.data.count); 
      setUserLiked(response.data.data.userLiked);
    } catch (err) {
      console.error('Error fetching reactions', err);
    }
  };

  const handleReaction = async () => {
    if (!authToken) {
      setShowAuthPopup(true);
      return;
    }

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/posts/react/${id}`, {},
        { 
          headers: { Authorization: `Bearer ${authToken}` }
        }
      );

      if (response.data.data.status === 'liked') {
        setLikes(prev => prev + 1);
        setUserLiked(true);
      } else {
        setLikes(prev => prev - 1);
        setUserLiked(false);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Reaction failed';
      console.log('Reaction Failed', err.response?.data || err.message);
      toast.error(`Reaction failed: ${errorMessage}`);
    }
  };

  const getComments = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/comments/${id}`);
      setPostComments(response.data.data); 
      setCommentsLoading(false);
    } catch (error) {
      console.log('Error fetching comments', error.response?.data || error.message);
    }
  };

  const handleCommentSubmit = async () => {
    if (!authToken) {
      setShowAuthPopup(true);
      return;
    }

    if (!comment) {
      setPopupMessage('Please enter a comment to publish.');
      setShowFailurePopup(true);
      return;
    }

    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/comments`, {
        blog_post_id: id,
        comment_text: comment,
      }, {
        headers: { Authorization: `Bearer ${authToken}` }
      });

      console.log('Comment published successfully!', response.data.data);
      toast.success('Comment published successfully!');
      getComments();
      setComment('');
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Comment submit failed';
      console.log('Comment Submit Failed', error.response?.data || error.message);
      toast.error(`Comment submit failed: ${errorMessage}`);
    }
  };

  const getCurrentUser = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/current-user`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      setCurrentUser(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log('Failed to fetch current user:', error.message);
    }
  };

  const getOwnComments = async () => {
    if (!authToken) return;

    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/user/comments`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      setOwnComments(response.data.data);
    } catch (error) {
      console.log('Failed to fetch own comments:', error.message);
    }
  };

  const deleteComment = async (commentId) => {
    if (!authToken) return;

    try {
      await axios.delete(`http://127.0.0.1:8000/api/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      toast.success('Comment deleted successfully!');
      getComments();
    } catch (error) {
      console.log('Delete failed:', error.message);
      toast.error('Failed to delete comment');
    }
  };

  const getImageUrl = (imagePath) => {
    return imagePath
      ? `http://127.0.0.1:8000/storage/${imagePath}`
      : ''; 
  };

  if (!post) return <div className="p-6">Loading...</div>;

  return (
    <>
      <FailurePopup
        isOpen={showFailurePopup}
        message={popupMessage}
        onClose={() => setShowFailurePopup(false)}
      />
      <AuthPopup isOpen={showAuthPopup} onClose={() => setShowAuthPopup(false)} />

      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-14 py-8">
        
        <button
          onClick={() => window.history.back()}
          className="px-4 py-2 border border-gray-400 text-black rounded hover:bg-gray-100 mb-6"
        >
          ← Back
        </button>

        <h1 className="text-3xl sm:text-4xl font-bold mb-6">{post.post_title}</h1>

        <img
          src={getImageUrl(post.cover_image)}
          alt="cover"
          className="mb-6 rounded-2xl w-full max-h-96 object-cover"
        />

        <div
          className="text-base sm:text-lg text-gray-800 mb-6"
          dangerouslySetInnerHTML={{ __html: post.post_body }}
        ></div>

        <p className="text-gray-500 mb-8">Author: {post.user?.name || 'Unknown Author'}</p>

        <hr className="border border-gray-200 mb-6" />

        <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <p className="font-semibold text-base sm:text-lg">
            If you're interested in the post, make a like reaction!
          </p>
          <button
            onClick={handleReaction}
            className={`flex items-center gap-2 px-6 py-3 font-semibold text-base rounded transition-colors duration-200 ${
              userLiked
                ? 'bg-green-700 text-white'
                : 'bg-white border border-gray-400 text-black'
            }`}
          >
            {userLiked ? (
              <BiSolidLike size={20} className="text-white" />
            ) : (
              <BiLike size={20} className="text-black" />
            )}
            {likes} Reactions
          </button>
        </div>

        <hr className="border border-gray-200 mb-6" />

        <div className="w-full mb-10">
          <p className="text-xl font-bold text-black mb-4">Comment your opinion</p>

          {authToken && (
            <textarea
              name="message"
              rows="5"
              placeholder="Enter your comment here..."
              className="w-full px-3 py-2 mb-4 border border-gray-400 rounded"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              minLength={3}
              maxLength={250}
            ></textarea>
          )}

          <button
            onClick={handleCommentSubmit}
            className="px-6 py-2 text-white rounded bg-purple-900 hover:bg-purple-800"
          >
            Publish Comment
          </button>
        </div>

        <div className="w-full mb-8">
          <p className="text-xl font-bold text-black mb-4">User Comments</p>

          {commentsLoading ? (
            <p>Comments Loading...</p>
          ) : postComments.length === 0 ? (
            <p>No comments to show</p>
          ) : (
            <div className="flex flex-col gap-4">
              {postComments.map((comment) =>
                currentUser?.id === comment.user?.id ? (
                  <OwnCommentTile
                    key={comment.id}
                    comment_id={comment.id}
                    comment_text={comment.comment_text}
                    created_at={comment.created_at}
                    onDelete={deleteComment}
                  />
                ) : (
                  <CommentTile
                    key={comment.id}
                    comment_id={comment.id}
                    username={comment.user?.name || 'Unknown User'}
                    comment_text={comment.comment_text}
                    created_at={comment.created_at}
                  />
                )
              )}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default PostDetailPage;
