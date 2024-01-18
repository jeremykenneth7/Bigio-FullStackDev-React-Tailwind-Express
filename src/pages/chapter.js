import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import AddChapter from '../components/addchapter';

const Story = () => (
    <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex flex-1">
            <Sidebar />
            <div className="flex-1">
                <AddChapter/>
            </div>
        </div>
    </div>
);

export default Story;
