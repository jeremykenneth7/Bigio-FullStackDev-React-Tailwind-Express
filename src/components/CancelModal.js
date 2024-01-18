import React from 'react';

const CancelModal = ({ isOpen, onCancel, onConfirm }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-md">
                <p className="mb-4">Are you sure you want to cancel adding the story without saving the data?</p>
                <div className="flex justify-end">
                    <button className="bg-[#6558F5] text-white font-bold py-2 px-4 mr-2 rounded-md" onClick={onConfirm}>
                        Yes
                    </button>
                    <button className="bg-white text-[#6558F5] font-bold py-2 px-4 rounded-md" onClick={onCancel}>
                        No
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CancelModal;
