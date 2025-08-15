import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import FailurePopup from '../../../components/FailurePopup';

const CreatePost = () => {
    const [postTitle, setPostTitle] = useState('');
    const [postBody, setPostBody] = useState('');
    const [coverImage, setCoverImage] = useState('');

    const [draftSuccess, setDraftSuccess] = useState('');
    const [draftError, setDraftError] = useState('');

    const [submitSuccess, setSubmitSuccess] = useState('');
    const [submitError, setSubmitError] = useState('');

    // popup
    const [showFailurePopup, setShowFailurePopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');

    const authToken = localStorage.getItem('token');

    const handleSaveDraft = async (e) => {
        e.preventDefault();

        if (!postTitle || !postBody || !coverImage) {
            setPopupMessage('Please fill out all fields before submitting.');
            setShowFailurePopup(true);
            return;
        }

        try {

            const formData = new FormData();
            formData.append('post_title', postTitle);
            formData.append('post_body', postBody);
            formData.append('cover_image', coverImage);
            formData.append('post_status', 'draft');

            const response = await axios.post('http://127.0.0.1:8000/api/posts', formData, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('BlogPost saved as draft', response.data);
            toast.success('Post saved as a draft');
            setSubmitSuccess('Post submitted successfully');
            setSubmitError('');

            setTimeout(() => {
                window.history.back();
            }, 500);

        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || 'Draft Save Failed';
            console.log('Draft Save Failed', err.response?.data || err.message);
            toast.error(`Draft save failed: ${errorMessage}`);
            setDraftError(err.response?.data?.message || 'Draft Save Failed');
            setDraftSuccess('');
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!postTitle || !postBody || !coverImage) {
            setPopupMessage('Please fill out all fields before submitting.');
            setShowFailurePopup(true);
            return;
        }
        
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
            toast.success('Post submitted for approval!');
            setSubmitSuccess('Post submitted successfully');
            setSubmitError('');

            setTimeout(() => {
                window.history.back();
            }, 500);

        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || 'Draft Save Failed';

            console.log('Draft Save Failed', err.response?.data || err.message);
            toast.error(`Draft save failed: ${errorMessage}`);
            setSubmitError(err.response?.data?.message || 'Draft Save Failed');
            setSubmitSuccess('');
        }
    };


    return (
        <div className="max-h-screen flex items-center justify-center bg-white-100 my-6 md:my-16 mx-4 md:mx-24">
            <FailurePopup
            isOpen={showFailurePopup}
            message={popupMessage}
            onClose={() => setShowFailurePopup(false)}
            />
        <div className="w-full max-w-3/4 bg-white">
            <button
                onClick={() => window.history.back()}
                className="px-4 py-2 my-6 border border-gray-400 text-black rounded hover:bg-gray-200"
            >
                ← Back
            </button>
            <h2 className="text-2xl font-bold text-center mb-2 text-gray-800">Create a Blog Post</h2>
            <h4 className="text-xl font-medium text-center mb-4 text-gray-500">Create a post!</h4>
            
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
                type="file"
                name='image'
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                onChange={(e) => setCoverImage(e.target.files[0])}
                />
            </div>

            <div className='flex md:flex-row flex-col space-x-0 md:space-x-8 my-4'>
                <button
                    className="w-full bg-white border border-purple-900 text-purple-900 py-3 my-2 rounded hover:bg-purple-900 hover:text-white transition duration-200"
                    onClick={handleSaveDraft}
                >
                    Save Draft
                </button>

                <button
                    className="w-full bg-purple-900 text-white py-3 my-2 rounded hover:bg-purple-800 transition duration-200"
                    onClick={handleSubmit}
                >
                    Submit For Approval
                </button>
            </div>
        </div>
        </div>
    );
}

export default CreatePost;