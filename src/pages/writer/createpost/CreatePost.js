import axios from 'axios';
import React, { useState } from 'react';

const CreatePost = () => {
    const [postTitle, setPostTitle] = useState('');
    const [postBody, setPostBody] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [postStatus, setPostStatus] = useState('');

    const [draftSuccess, setDraftSuccess] = useState('');
    const [draftError, setDraftError] = useState('');

    const [submitSuccess, setSubmitSuccess] = useState('');
    const [submitError, setSubmitError] = useState('');

    const authToken = localStorage.getItem('token');

    const handleSaveDraft = async (e) => {
        e.preventDefault();

        try {

            const response = await axios.post('http://127.0.0.1:8000/api/posts',
            {
                post_title: postTitle,
                post_body: postBody,
                cover_image: coverImage,
                post_status: 'draft',
            },
            {
                headers: {
                Authorization: `Bearer ${authToken}`,
                },
            }
            );

            console.log('BlogPost Saved as a Draft', response.data);
            alert('Post Draft Saved');
            setDraftSuccess('Post Draft Saved!');
            setDraftError('');

        } catch (err) {
            console.log('Draft Save Failed', err.response?.data || err.message);
            setDraftError(err.response?.data?.message || 'Draft Save Failed');
            setDraftSuccess('');
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('post_title', postTitle);
            formData.append('post_body', postBody);
            formData.append('cover_image', coverImage);
            formData.append('post_status', 'pending');

            const response = await axios.post('http://127.0.0.1:8000/api/posts', formData, {
            headers: {
                Authorization: `Bearer ${authToken}`,
                'Content-Type': 'multipart/form-data',
            },
            });

            console.log('BlogPost submitted for approval', response.data);
            alert('Post submitted for approval');
            setSubmitSuccess('Post submitted successfully');
            setSubmitError('');

        } catch (err) {
            console.log('Draft submit Failed', err.response?.data || err.message);
            setSubmitError(err.response?.data?.message || 'Draft Save Failed');
            setSubmitSuccess('');
        }
    };


    return (
        <div className="max-h-screen flex items-center justify-center bg-white-100 px-4">
        <div className="w-full max-w-3/4 bg-white p-16 rounded shadow">
            <h2 className="text-2xl font-bold text-center mb-3 text-gray-800">Create a Blog Post</h2>
            <h4 className="text-xl font-medium text-center mb-6 text-gray-500">Create a post!</h4>
            
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

            <div>
                <label className="block text-gray-700 mb-1">Post Body</label>
                <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                value={postBody}
                onChange={(e) => setPostBody(e.target.value)}
                required
                />
            </div>

            <div>
                <label className="block text-gray-700 mb-1">Cover Image</label>
                @csrf
                <input
                type="file"
                name='image'
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                onChange={(e) => setCoverImage(e.target.files[0])}
                />
            </div>

            <button
                className="w-full bg-blue-900 text-white py-2 my-4 rounded hover:bg-blue-700 transition duration-200"
                onClick={handleSaveDraft}
            >
                Save Draft
            </button>

            <button
                className="w-full bg-blue-900 text-white py-2 my-4 rounded hover:bg-blue-700 transition duration-200"
                onClick={handleSubmit}
            >
                Submit For Approval
            </button>
        </div>
        </div>
    );
}

export default CreatePost;