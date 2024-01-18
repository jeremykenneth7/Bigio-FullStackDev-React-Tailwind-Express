import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { IoChevronBack } from "react-icons/io5";
import CancelModal from './CancelModal';

const Chapter = () => {
    const navigate = useNavigate();
    const { storyId } = useParams();
    const [newChapter, setNewChapter] = useState({
        chapterTitle: '',
        storyChapter: '',
        lastUpdated: '19',
    });

    const handleSaveChapter = async () => {
        try {
            const currentDate = new Date();
            const formattedDate = currentDate.toISOString();
            const response = await fetch(
                `https://us-central1-fullstack-api-38a4f.cloudfunctions.net/api/api/stories/${storyId}/chapters`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        ...newChapter,
                        lastUpdated: formattedDate,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error('Failed to save chapter');
            }

            navigate(`/editstory/${storyId}`);
        } catch (error) {
            console.error('Error saving chapter:', error.message);
        }
    };



    const quillModules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ['clean'],
        ],
    };

    const quillFormats = [
        'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'code-block',
    ];

    const [showCancelModal, setShowCancelModal] = useState(false);

    const handleCancelClick = () => {
        setShowCancelModal(true);
    };

    const handleCancelConfirmation = () => {
        setShowCancelModal(false);
        navigate('/addstory');
    };

    const handleCancelModalClose = () => {
        setShowCancelModal(false);
    };

    return (
        <div className="max-w-4xl mx-auto my-8">
            <ul className="flex flex-row">
                <li >
                    <Link to="/" className="flex flex-wrap items-center py-2 rounded ">
                        <IoChevronBack className="text-lg mr-5 text-[#6558F5]" />
                        <div className='text-lg font-medium mr-5 text-[#6558F5] rounded underline'>List Story</div>
                    </Link>
                </li>
                <li >
                    <Link to="/story" className="flex flex-wrap items-center py-2 rounded ">
                        <IoChevronBack className="text-lg mr-5 text-[#6558F5]" />
                        <div className='text-lg font-medium text-[#6558F5] rounded underline'>Add Story</div>
                    </Link>
                </li>
            </ul>
            <h2 className="text-4xl font-bold mb-4 mt-10">Add Chapter</h2>
            <div className="max-w-4xl mx-auto my-8 bg-white p-8 rounded-md">
                <div className="flex-1">
                    <label className="block font-bold mb-">Title </label>
                    <input
                        type="text"
                        className="w-full p-2 border rounded-md mb-8"
                        placeholder="Title"
                        value={newChapter.chapterTitle}
                        onChange={(e) =>
                            setNewChapter({ ...newChapter, chapterTitle: e.target.value })
                        }
                        required
                    />
                </div>
                <div className="mb-12 ">
                    <label className="block font-bold mb-1 ">Story</label>
                    <ReactQuill
                        modules={quillModules}
                        formats={quillFormats}
                        value={newChapter.storyChapter}
                        onChange={(value) =>
                            setNewChapter({ ...newChapter, storyChapter: value })
                        }
                        style={{ height: '400px' }}
                    />
                </div>
            </div>


            <div className='flex justify-end gap-8'>
                <button type="cancel" className="bg-white text-[#6558F5] font-bold py-2 px-4 rounded-md">
                    <button type="button" onClick={handleCancelClick} className="bg-white text-[#6558F5] font-bold py-2 px-4 rounded-md">
                        Cancel
                    </button>
                </button>
                <button
                    type="button"
                    onClick={handleSaveChapter}
                    className="bg-[#6558F5] text-white font-bold py-2 px-4 rounded-md"
                >
                    Save
                </button>
            </div>
            <CancelModal
                isOpen={showCancelModal}
                onCancel={handleCancelModalClose}
                onConfirm={handleCancelConfirmation}
            />
        </div>
    );
};

export default Chapter;
