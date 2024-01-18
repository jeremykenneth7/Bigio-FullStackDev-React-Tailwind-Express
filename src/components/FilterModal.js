import React, { useState, useEffect } from 'react';

const FilterModal = ({ isOpen, onClose, onApplyFilters, selectedFilters}) => {
    const [selectedCategory, setSelectedCategory] = useState(selectedFilters?.categories?.length > 0 ? selectedFilters.categories[0] : 'Financial');
    const [selectedStatus, setSelectedStatus] = useState(selectedFilters?.status?.length > 0 ? selectedFilters.status[0] : 'Publish');

    
    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const handleStatusChange = (e) => {
        setSelectedStatus(e.target.value);
    };

    const resetFilters = () => {
        setSelectedCategory(selectedFilters.categories.length > 0 ? selectedFilters.categories[0] : 'Financial');
        setSelectedStatus(selectedFilters.status.length > 0 ? selectedFilters.status[0] : 'Publish');
    };

    useEffect(() => {
        console.log('selectedFilters:', selectedFilters);
        console.log('selectedCategory:', selectedCategory);
        console.log('selectedStatus:', selectedStatus);
    }, [selectedFilters, selectedCategory, selectedStatus]);


    useEffect(() => {
        setSelectedCategory(selectedFilters.categories.length > 0 ? selectedFilters.categories[0] : 'Financial');
        setSelectedStatus(selectedFilters.status.length > 0 ? selectedFilters.status[0] : 'Publish');
    }, [selectedFilters]);

    return (
        <div className={`fixed inset-0 flex items-center justify-center ${isOpen ? 'visible' : 'invisible'}`}>
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="z-10 bg-[#E3E8ED] p-8 rounded-md w-1/4">
                {/* Modal content */}
                <div>
                    <h3 className="text-2xl font-bold mb-10">Filter</h3>
                    <h4 className="text-lg font-bold mb-3">Category </h4>
                    <div className="relative w-full lg:max-w-sm mb-10">
                        <select
                            className="w-full p-2.5 text-black bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600"
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                        >
                            <option value="Financial">Financial</option>
                            <option value="Technology">Technology</option>
                            <option value="Health">Health</option>
                        </select>
                    </div>
                    <h4 className="text-lg font-bold mb-3">Status </h4>
                    <div className="relative w-full lg:max-w-sm mb-10">
                        <select
                            className="w-full p-2.5 text-black bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600"
                            value={selectedStatus}
                            onChange={handleStatusChange}
                        >
                            <option value="Publish">Publish</option>
                            <option value="Draft">Draft</option>
                        </select>
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-white text-white font-bold py-2 px-6 rounded-md mr-2 mt-10"
                            onClick={resetFilters}
                        >
                            <div className='text-gray-700'>Reset</div>
                        </button>
                        <div className="flex items-center gap-3">
                            <button
                                className="bg-white text-gray-700 font-bold py-2 px-6 rounded-md mr-2 mt-10"
                                onClick={() => {
                                    onClose();
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-[#6558F5] text-white font-bold py-2 px-6 rounded-md mt-10"
                                onClick={onApplyFilters}
                            >
                                Filter
                            </button></div>
                    </div>
                </div>
                <button className="absolute top-0 right-0 m-4 text-gray-500" onClick={onClose}>
                    X
                </button>
            </div>
        </div>
    );
};

export default FilterModal;
