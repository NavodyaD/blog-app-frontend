import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const WriterEditPost = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const editingPost = location.state?.post;

  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [postStatus, setPostStatus] = useState('');

  const [updateSuccess, setUpdateSuccess] = useState('');
  const [updateError, setUpdateError] = useState('');

  const authToken = localStorage.getItem('token');

  useEffect(() => {
    if (!editingPost) {
      navigate('/');
      return;
    }

    setPostTitle(editingPost.post_title || '');
    setPostBody(editingPost.post_body || '');
    setCoverImage(editingPost.cover_image || '');
    setPostStatus(editingPost.post_status || '');
  }, [editingPost, navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.patch(
        `http://127.0.0.1:8000/api/posts/${editingPost.id}`,
        {
          post_title: postTitle,
          post_body: postBody,
          cover_image: coverImage,
          post_status: postStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      console.log('Post updated successfully', response.data);
      setUpdateSuccess('Post updated successfully!');
      setUpdateError('');
      toast.success('Post updated successful!');
      navigate('/writer-dashboard');
    } catch (err) {
      console.error('Post update failed', err.response?.data || err.message);
      toast.error('Failed to update post!');
      setUpdateError(err.response?.data?.message || 'Post update failed.');
      setUpdateSuccess('');
    }
  };

  return (
    <div className="max-h-screen flex items-center justify-center bg-white-100 px-4">
      <div className="w-full max-w-3/4 bg-white p-16 rounded shadow">
        <button
          onClick={() => window.history.back()}
          className="px-4 py-2 border border-gray-400 text-black rounded hover:bg-gray-100"
        >
          ← Back
        </button>
        <h2 className="text-2xl font-bold text-center mb-3 text-gray-800">Edit Blog Post</h2>
        <h4 className="text-xl font-medium text-center mb-6 text-gray-500">Modify your post</h4>

        <div>
          <label className="block text-gray-700 mb-1">Post Title</label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
            required
          />
        </div>

        <div className="my-4">
          <label className="block text-gray-700 mb-1">Post Body</label>
          <div className="border border-gray-300 rounded">
            <CKEditor
              editor={ClassicEditor}
              data={postBody}
              onChange={(event, editor) => {
                const data = editor.getData();
                setPostBody(data);
              }}
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Cover Image</label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
          />
        </div>

        <button
          className="w-full bg-green-700 text-white py-2 my-4 rounded hover:bg-green-600 transition duration-200"
          onClick={handleUpdate}
        >
          Update Post
        </button>

        {updateSuccess && <p className="text-green-600">{updateSuccess}</p>}
        {updateError && <p className="text-red-600">{updateError}</p>}
      </div>
    </div>
  );
};

export default WriterEditPost;
