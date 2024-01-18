import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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

    return (
        <div className="max-w-4xl mx-auto my-8">
            <button
                onClick={() => navigate(`/edit-story/${storyId}`)}
                className="bg-[#6558F5] text-white font-bold py-2 px-4 rounded-md mb-4"
            >
                Back to Edit Story
            </button>

            <div className="flex space-x-4">
                <div className="flex-1">
                    <label className="block font-bold mb-1">Chapter Title </label>
                    <input
                        type="text"
                        className="w-full p-2 border rounded-md"
                        placeholder="Chapter Title"
                        value={newChapter.chapterTitle}
                        onChange={(e) =>
                            setNewChapter({ ...newChapter, chapterTitle: e.target.value })
                        }
                        required
                    />
                </div>
            </div>

            <div className="mb-5">
                <label className="block font-bold mb-1">Story Chapter</label>
                <ReactQuill
                    modules={quillModules}
                    formats={quillFormats}
                    value={newChapter.storyChapter}
                    onChange={(value) =>
                        setNewChapter({ ...newChapter, storyChapter: value })
                    }
                />
            </div>

            <div className="flex justify-end mb-10">
                <button
                    type="button"
                    onClick={handleSaveChapter}
                    className="bg-[#6558F5] text-white font-bold py-2 px-4 rounded-md"
                >
                    Save Chapter
                </button>
            </div>
        </div>
    );
};

export default Chapter;
