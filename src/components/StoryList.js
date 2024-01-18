/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import FetchStory from '../services/api/apiService';
import ListTable from './ListTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import FilterModal from './FilterModal';

const StoryList = () => {
    const [stories, setStories] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

    const handleEdit = async (storyId) => {
        try {
            const response = await fetch(
                `https://us-central1-fullstack-api-38a4f.cloudfunctions.net/api/api/stories/${storyId}`
            );

            if (response.ok) {
                const storyData = await response.json();
                console.log('Edit story with ID:', storyId, 'Data:', storyData);
            } else {
                console.error('Failed to fetch story data');
            }
        } catch (error) {
            console.error('Error fetching story data:', error);
        }
    };

    const handleDelete = async (storyId) => {
        try {
            const response = await fetch(
                `https://us-central1-fullstack-api-38a4f.cloudfunctions.net/api/api/stories/${storyId}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.ok) {
                const responseData = await response.json();

                if (responseData.success) {
                    setStories((prevStories) => prevStories.filter((story) => story.id !== storyId));
                    console.log('Deleted story with ID:', storyId);
                } else {
                    console.error('Failed to delete story:', responseData.error);
                }
            } else {
                console.error('Failed to delete story');
            }
        } catch (error) {
            console.error('Error deleting story:', error);
        }
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredStories = stories.filter(
        (story) =>
            story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            story.author.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleApplyFilter = (filterValues) => {
        const filteredStories = stories.filter((story) => {
            const matchesCategory = !filterValues.category || story.category === filterValues.category;
            const matchesStatus = !filterValues.status || story.status === filterValues.status;

            return matchesCategory && matchesStatus;
        });

        setStories(filteredStories);
        setIsFilterModalOpen(false);
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex items-center justify-between mb-10 mt-4 mr-12">
                <h2 className="text-3xl font-bold">List Story</h2>
                <div className="flex items-center gap-8">
                    <input
                        type="text"
                        placeholder="Search by writer's name/title story"
                        value={searchQuery}
                        onChange={handleSearch}
                        className="p-2 border border-slate-600 w-96 placeholder-purple-700 "
                    />
                    <FontAwesomeIcon
                        icon={faFilter}
                        className="text-gray-500 cursor-pointer rounded-full p-2 bg-white"
                        onClick={() => setIsFilterModalOpen(true)}
                    />
                    <button className="bg-[#6558F5] text-white font-bold py-2 px-4 rounded-md w-32">
                        <Link to="/story" className="flex items-center justify-center">
                            Add Story
                        </Link>
                    </button>
                </div>
            </div>
            <FetchStory setStories={setStories} />
            <ListTable stories={filteredStories} handleEdit={handleEdit} handleDelete={handleDelete} />
            {isFilterModalOpen && (
                <FilterModal
                    isOpen={isFilterModalOpen}
                    onClose={() => setIsFilterModalOpen(false)}
                    onApplyFilter={handleApplyFilter}
                />
            )}
        </div>
    );
};

export default StoryList;
