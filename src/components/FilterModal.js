import React, { useState } from 'react';

const FilterModal = ({ isOpen, onClose, onApplyFilter }) => {
    const [category, setCategory] = useState('');
    const [status, setStatus] = useState('');

    const handleApplyFilter = () => {
        onApplyFilter({ category, status });
        onClose();
    };

    return (
        <div className={`filter-modal ${isOpen ? 'open' : ''}`}>
            <div className="filter-content">
                <h2>Filter Stories</h2>
                <div>
                    <label>Category:</label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="">All Categories</option>
                        <option value="Financial">Financial</option>
                        <option value="Technology">Technology</option>
                        <option value="Health">Health</option>
                    </select>
                </div>
                <div>
                    <label>Status:</label>
                    <select value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="">All Status</option>
                        <option value="Publish">Publish</option>
                        <option value="Draft">Draft</option>
                    </select>
                </div>
                <div className="filter-actions">
                    <button onClick={handleApplyFilter}>Apply Filter</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default FilterModal;
