import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import StoryDetail from '../components/storydetail';

const Management = () => (
    <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex flex-1">
            <Sidebar />
            <div className="flex-1">
                <StoryDetail />
            </div>
        </div>
    </div>
);

export default Management;
