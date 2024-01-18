import React, { useState } from 'react';

const FilterModal = ({ isOpen, onClose, onApplyFilter }) => {
    const [category, setCategory] = useState('');
    const [status, setStatus] = useState('');

    const handleApplyFilter = () => {
        onApplyFilter({ category, status });
        onClose();
    };

    const handleReset = () => {
        setCategory(''); 
        setStatus('');  
    };

    return (
        <div className={`fixed top-0 left-0 w-full h-full flex items-center justify-center ${isOpen ? 'block' : 'hidden'}`}>
            <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50"></div>
            <div className="fixed top-1/2 w-1/3 h-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#E3E8ED] p-8 rounded-md shadow-md z-10">
                <h2 className="text-xl font-bold mb-10">Filter</h2>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Category:</label>
                    <select
                        className="mt-1 p-2 border rounded w-full"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">All Categories</option>
                        <option value="Financial">Financial</option>
                        <option value="Technology">Technology</option>
                        <option value="Health">Health</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Status:</label>
                    <select
                        className="mt-1 p-2 border rounded w-full"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="">All Status</option>
                        <option value="Publish">Publish</option>
                        <option value="Draft">Draft</option>
                    </select>
                </div>
                <div className="flex justify-between mt-40">
                    <button
                        className="bg-white  text-gray-700 px-4 py-2 rounded hover:bg-gray-400 mr-6"
                        onClick={handleReset}
                    >
                        Reset
                    </button>
                    <div className='flex items-center'>
                        <button
                            className="bg-white  text-gray-700 px-4 py-2 rounded hover:bg-gray-400 mr-6"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            className="bg-[#6558F5] text-white px-4 py-2 rounded "
                            onClick={handleApplyFilter}
                        >
                            Filter
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterModal;
