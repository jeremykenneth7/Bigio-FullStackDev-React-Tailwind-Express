import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { IoChevronBack } from "react-icons/io5";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import CancelModal from './CancelModal';
import * as apiUtils from '../utils/apiUtils';

const StoryDetail = () => {
    const navigate = useNavigate();
    const { storyId } = useParams();
    const [storyData, setStoryData] = useState({
        title: "",
        author: "",
        synopsis: "",
        category: 'Technology',
        storyCover: '',
        tags: [],
        status: 'Publish',
    });
    const [chapters, setChapters] = useState([]);

    useEffect(() => {
        fetchStory();
        fetchChapters();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [storyId]);

    const fetchStory = async () => {
        try {
            const data = await apiUtils.getStoryById(storyId);
            setStoryData(data);
        } catch (error) {
            console.error('Error fetching story:', error.message);
        }
    };

    const fetchChapters = async () => {
        try {
            const data = await apiUtils.getChaptersByStoryId(storyId);
            setChapters(data);
        } catch (error) {
            console.error('Error fetching chapters:', error.message);
        }
    };

    const [showCancelModal, setShowCancelModal] = useState(false);

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
                <li>
                    <Link to="/" className="flex flex-wrap items-center py-2 rounded ">
                        <IoChevronBack className="text-lg mr-5 text-[#6558F5]" />
                        <div className='text-lg font-medium text-[#6558F5] rounded underline'>List Story</div>
                    </Link>
                </li>
            </ul>

            <h2 className="text-4xl font-bold mb-4 mt-10">Story Detail</h2>
            <form>
                <div className="max-w-4xl mx-auto my-8 bg-white p-8 rounded-md">
                    <div className="flex space-x-4">
                        <div className="flex-1">
                            <label className="block font-bold mb-1">Title </label>
                            <input type="text" className="w-full p-2 border rounded-md" value={storyData.title} readOnly />
                        </div>
                        <div className="flex-1">
                            <label className="block font-bold mb-1">Writer Name </label>
                            <input type="text" className="w-full p-2 border rounded-md" value={storyData.author} readOnly />
                        </div>
                    </div>
                    <div className='mt-5 mb-5'>
                        <label className="block font-bold mb-1">Synopsis</label>
                        <textarea className="w-full p-2 border resize-none" value={storyData.synopsis} readOnly />
                    </div>
                    <div className="flex space-x-4 mb-5">
                        <div className="flex-1">
                            <label className="block font-bold mb-1">Category</label>
                            <input type="text" className="w-full p-2 border rounded-md" value={storyData.category} readOnly />
                        </div>
                        <div className="flex-1">
                            <label className="block font-bold mb-1">Tags </label>
                            <input type="text" value={storyData.tags.join(', ')} className='w-full p-2 border rounded-md' readOnly />
                        </div>
                    </div>
                    <div className="flex space-x-4 mb-10">
                        <div className="flex-1">
                            <label className="block font-bold mb-1">Cover Image</label>
                            <input type="text" className="w-full p-2 border rounded-md" value={storyData.storyCover} readOnly />
                        </div>
                        <div className="flex-1">
                            <label className="block font-bold mb-1">Status</label>
                            <input type="text" value={storyData.status} className="w-full p-2 border rounded-md" readOnly />
                        </div>
                    </div>
                    <hr style={{
                        color: '#000000',
                        backgroundColor: '#000000',
                        height: .5,
                        borderColor: '#000000'
                    }} />
                    <div className='flex justify-end mt-10 mb-10'>
                        <button
                            className="bg-[#6558F5] text-white font-bold py-2 px-4 rounded-md mr-2"
                            onClick={() => navigate("/addchapter")}
                            disabled
                        >
                            Add Chapter
                        </button>
                    </div>
                    <div>
                        <table className="min-w-full bg-white border border-gray-300 mb-10">
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
                                        <td className="py-2 px-4 border border-slate-600 text-center">
                                            {chapter.lastUpdated && chapter.lastUpdated.toDate && typeof chapter.lastUpdated.toDate === 'function'
                                                ? chapter.lastUpdated.toDate().toLocaleString()
                                                : 'N/A'}
                                        </td>
                                        <td className="py-2 px-4 border border-slate-600 text-center">
                                            <button
                                                className="text-black-500"
                                                disabled
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
                
            </form>
           
            <div className='flex justify-end mt-10 mb-10'>
            <button
                type="button"
                className="bg-white text-[#6558F5] font-bold py-2 px-4 rounded-md mr-5"
                disabled // Disable the button
            >
                Cancel
            </button>

            <button
                type="submit"
                className="bg-[#6558F5] text-white font-bold py-2 px-4 rounded-md"
                disabled // Disable the button
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

export default StoryDetail;
