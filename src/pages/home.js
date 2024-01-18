import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import StoryList from '../components/StoryList';

const Home = () => (
    <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex flex-1">
            <Sidebar />
            <div className="flex-1">
                <StoryList />
            </div>
        </div>
    </div>
);

export default Home;
