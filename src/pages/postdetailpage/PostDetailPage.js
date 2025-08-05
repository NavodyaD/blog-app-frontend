import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CommentTile from '../../components/CommentTile';
import axios from 'axios';


const PostDetailPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  const [comment, setComment] = useState('');
  const [postComments, setPostComments] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(true);

  const [likes, setLikes] = useState(0);
  const [userLiked, setUserLiked] = useState(false);

  const authToken = localStorage.getItem('token');

  useEffect(() => {
    fetchPost();
    getComments();
    fetchReactionData();

  }, [id, authToken]);

  const fetchPost = async () => {
      try {
        const response = await axios.get(`http://127.0.1:8000/api/posts/${id}`);
        setPost(response.data);
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
        setLikes(response.data.count);
        setUserLiked(response.data.userLiked);
      } catch (err) {
        console.error('Error fetching reactions', err);
      }
    };

    const handleReaction = async () => {
      try {
        const response = await axios.post(
          `http://127.0.0.1:8000/api/posts/react/${id}`, {},
          { 
            headers: { 
              Authorization: `Bearer ${authToken}`,
            } 
          }
        );

        if (response.data.status === 'liked') {
          setLikes(prev => prev + 1);
          setUserLiked(true);
        } else {
          setLikes(prev => prev - 1);
          setUserLiked(false);
        }
      } catch (err) {
        console.error('Failed to toggle like', err);
      }
    };


  const getComments = async () => {
    try {

      const response = await axios.get(`http://127.0.0.1:8000/api/comments/${id}`);
      setPostComments(response.data);
      setCommentsLoading(false);

    } catch (error) {
      console.log('Error fetching comments', error.response?.data || error.message);
    }
  }

  const handleCommentSubmit = async () => {
    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/comments`, {
        blog_post_id: id,
        comment_text: comment,
      }, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        }
      });

      console.log('Comment published successfully!', response.data);

    } catch (error) {
      console.log('Comment publish failed', error.response?.data || error.message);
    }
  }

  const getImageUrl = (imagePath) => {
  return imagePath
    ? `http://127.0.0.1:8000/storage/${imagePath}`
    : 'https://via.placeholder.com/300'; 
  };


  if (!post) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-14 w-5/6 mx-auto">
      <button
        onClick={() => window.history.back()}
        className="px-4 py-2 border border-gray-400 text-black rounded hover:bg-gray-100"
      >
        ← Back
      </button>
      <h1 className="text-4xl font-bold mb-8">{post.post_title}</h1>
      <img src={getImageUrl(post.cover_image)} alt="cover" className="mb-4 rounded" />
      <p className="text-md text-gray-800 mb-4">{post.post_body}</p>
      <p className="text-2xl text-gray-500 mb-8">Author: {post.user?.name || 'Unknown'}</p>

      <button
        onClick={handleReaction}
        className={`mt-2 px-3 py-1 rounded ${
          userLiked ? 'bg-red-500 text-white' : 'bg-gray-200 text-black'
        }`}
      >
        {userLiked ? 'Liked' : 'Like'} ({likes})
      </button>
      
      <div className='w-5/6 mb-4'>
        <p className='text-2xl font-bold text-balck-800 mb-4'>Comment your opinion</p>

        <textarea 
          name="message" 
          rows="5" cols="30"
          placeholder="Enter your comment here..."
          className='w-full px-2 py-2 mb-6 border border-black-800 rounded'
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>

        <button onClick={handleCommentSubmit} className='px-6 py-2 text-white rounded bg-blue-800 hover:bg-blue-600'>
          Publish Comment
        </button>
      </div>

      <div className='w-3/4'>
        <p className='text-2xl font-bold text-black-800 mb-4'>User Comments</p>
        
        {commentsLoading ? (
          <p>Comments Loading...</p>
        ) : postComments.length === 0 ? (
          <p>No comments to show</p>
        ) : (
          <div className="justify-center gap-6">
            {postComments.map((comment) => (
              <CommentTile
                key={comment.id}
                username={comment.user?.name || 'Unknown User'}
                comment_text={comment.comment_text}
              />
            ))}
          </div>
        )}
        
      </div>
    </div>
  );
};

export default PostDetailPage;
