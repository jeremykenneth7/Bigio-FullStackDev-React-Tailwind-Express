import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { IoChevronBack } from "react-icons/io5";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import CancelModal from './CancelModal';
import * as apiUtils from '../utils/apiUtils'; 

const EditStory = () => {
    const navigate = useNavigate();
    const { storyId } = useParams();
    const [storyData, setStoryData] = useState({
        title: '',
        author: '',
        synopsis: '',
        category: 'Technology',
        storyCover: '',
        tags: [],
        status: 'Publish',
    });

    useEffect(() => {
        const fetchStoryData = async () => {
            try {
                const fetchedStoryData = await apiUtils.getStoryById(storyId);
                setStoryData(fetchedStoryData);
            } catch (error) {
                console.error('Error fetching story data:', error);
            }
        };

        fetchStoryData();
    }, [storyId]);

    const handleInputChange = (e) => {
        const { name, value, type } = e.target;
        setStoryData({
            ...storyData,
            [name]: type === 'file' ? e.target.files[0] : value,
        });
    };

    const handleTagInputChange = (e) => {
        const { value } = e.target;
        setStoryData({
            ...storyData,
            tags: value.split(',').map(tag => tag.trim()),
        });
    };

    const handleCategoryChange = (e) => {
        const { value } = e.target;
        setStoryData({
            ...storyData,
            category: value,
        });
    };

    const handleStatusChange = (e) => {
        const { value } = e.target;
        setStoryData({
            ...storyData,
            status: value,
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            await apiUtils.updateStory(storyId, storyData);
            navigate('/');
        } catch (error) {
            console.error('Error updating story:', error.message);
        }
    };


    const [chapters, setChapters] = useState([]);

    useEffect(() => {
        const fetchChapters = async () => {
            try {
                const response = await fetch(`https://us-central1-fullstack-api-38a4f.cloudfunctions.net/api/api/stories/${storyId}/chapters`);

                if (!response.ok) {
                    throw new Error('Failed to fetch chapters');
                }

                const data = await response.json();
                setChapters(data);
            } catch (error) {
                console.error('Error fetching chapters:', error.message);
            }
        };

        fetchChapters();
    }, [storyId]);


    const handleEditChapter = (id) => {
        console.log(`Editing chapter with ID: ${id}`);
    };

    const handleDeleteChapter = async (chapterId) => {
        try {
            const response = await fetch(
                `https://us-central1-fullstack-api-38a4f.cloudfunctions.net/api/api/stories/${storyId}/chapters/${chapterId}`,
                {
                    method: 'DELETE',
                }
            );

            if (!response.ok) {
                throw new Error(`Failed to delete chapter. Status: ${response.status}`);
            }

            setChapters((prevChapters) => prevChapters.filter((chapter) => chapter.chapterId !== chapterId));

            console.log(`Chapter with ID ${chapterId} deleted successfully`);
        } catch (error) {
            console.error('Error deleting chapter:', error.message);
        }
    };


    useEffect(() => {
        console.log('Story ID:', storyId);
    }, [storyId]);

    const getCurrentDate = () => {
        const currentDate = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = currentDate.toLocaleDateString('en-US', options);
        return formattedDate;
    };

    const [showCancelModal, setShowCancelModal] = useState(false);

    const handleCancelClick = () => {
        setShowCancelModal(true);
    };

    const handleCancelConfirmation = () => {
        setShowCancelModal(false);
        navigate('/');
    };

    const handleCancelModalClose = () => {
        setShowCancelModal(false);
    };

    return (
        <div className="max-w-4xl mx-auto my-8">
            <ul className="flex flex-col">
                <li >
                    <Link to="/" className="flex flex-wrap items-center py-2 rounded ">
                        <IoChevronBack className="text-lg mr-5 text-[#6558F5]" />
                        <div className='text-lg font-medium text-[#6558F5] rounded underline'>List Story</div>
                    </Link>
                </li>
            </ul>

            <h2 className="text-4xl font-bold mb-4 mt-10">Edit Story</h2>
            <form onSubmit={handleFormSubmit}>
                <div className="max-w-4xl mx-auto my-8 bg-white p-8 rounded-md">
                    <div className="flex space-x-4">
                        <div className="flex-1">
                            <label className="block font-bold mb-1">Title  </label>
                            <input type="text" className="w-full p-2 border rounded-md" placeholder='Title' name="title" value={storyData.title} onChange={handleInputChange} required />
                        </div>
                        <div className="flex-1">
                            <label className="block font-bold mb-1">Writer Name  </label>
                            <input type="text" className="w-full p-2 border rounded-md" placeholder='Writer Name' name="author" value={storyData.author} onChange={handleInputChange} required />
                        </div>
                    </div>
                    <div className='mt-5 mb-5'>
                        <label className="block font-bold mb-1">Synopsis</label>
                        <textarea className="w-full p-2 border resize-none"
                            placeholder='Synopsis' name="synopsis" value={storyData.synopsis} onChange={handleInputChange} required />
                    </div>
                    <div className="flex space-x-4 mb-5">
                        <div className="flex-1">
                            <label className="block font-bold mb-1">Category</label>
                            <select name="category" className="w-full p-2 border rounded-md" value={storyData.category} onChange={handleCategoryChange} required >
                                <option value="Technology">Technology</option>
                                <option value="Health">Health</option>
                                <option value="Financial">Financial</option>
                            </select>
                        </div>
                        <div className="flex-1">
                            <label className="block font-bold mb-1">Tags   </label>
                            <input
                                type="text"
                                name="tags"
                                value={storyData.tags.join(', ')}
                                onChange={handleTagInputChange}
                                className='w-full p-2 border rounded-md'
                            />

                        </div>
                    </div>
                    <div className="flex space-x-4 mb-10">
                        <div className="flex-1">
                            <label className="block font-bold mb-1">Cover Image</label>
                            <input type="file" className="w-full p-2 border rounded-md" name="storyCover" onChange={handleInputChange} required />
                        </div>
                        <div className="flex-1">
                            <label className="block font-bold mb-1">Status</label>
                            <select name="status" value={storyData.status} onChange={handleStatusChange} required className="w-full p-2 border rounded-md">
                                <option value="Publish">Publish</option>
                                <option value="Draft">Draft</option>
                            </select>

                        </div>
                    </div>
                    <hr style={{
                        color: '#000000',
                        backgroundColor: '#000000',
                        height: .5,
                        borderColor: '#000000'
                    }} />
                    <div className='flex justify-end mt-10 mb-10'>
                        <button type="cancel" className="bg-[#6558F5] text-white font-bold py-2 px-4 rounded-md">
                            <Link to="/addchapter" className="flex items-center justify-center">
                                Add Chapter
                            </Link>
                        </button>
                    </div>
                    <div>
                        <table className="min-w-full bg-white border border-gray-300">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 border border-slate-600">Title</th>
                                    <th className="py-2 px-4 border border-slate-600">Last Updated</th>
                                    <th className="py-2 px-4 border border-slate-600">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {chapters.map((chapter) => (
                                    <tr key={chapter.chapterId}>
                                        <td className="py-2 px-4 border border-slate-600 text-center">{chapter.chapterTitle}</td>
                                        <td className="py-2 px-4 border border-slate-600 text-center">{getCurrentDate()}</td>
                                        <td className="py-2 px-4 border border-slate-600 text-center">
                                            <button
                                                className="mr-2 text-blue-500 hover:text-blue-700"
                                                onClick={() => handleEditChapter(chapter.id)}
                                            >
                                                <FontAwesomeIcon icon={faEdit} />
                                            </button>
                                            <button
                                                className="text-black-500"
                                                onClick={() => handleDeleteChapter(chapter.id)}
                                            >
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='flex justify-end gap-8'>
                    <button type="cancel" className="bg-white text-[#6558F5] font-bold py-2 px-4 rounded-md">
                        <button type="button" onClick={handleCancelClick} className="bg-white text-[#6558F5] font-bold py-2 px-4 rounded-md">
                            Cancel
                        </button>
                    </button>
                    <button type="submit" className="bg-[#6558F5] text-white font-bold py-2 px-4 rounded-md">
                        Save
                    </button>
                </div>
            </form>
            <CancelModal
                isOpen={showCancelModal}
                onCancel={handleCancelModalClose}
                onConfirm={handleCancelConfirmation}
            />
        </div>
    );
};

export default EditStory;
