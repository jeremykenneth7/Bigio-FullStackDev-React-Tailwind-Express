import React from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingBag } from 'react-icons/fi';

const Navbar = () => {
    return (
        <nav className="bg-white p-2 shadow-lg rounded-b-md">
            <Link to="/" className="text-black text-lg font-bold flex items-center p-5">
                <FiShoppingBag className="text-3xl mr-3" />
                <div className='text-2xl font-display'>Storyku</div>
            </Link>
        </nav>
    );
};

export default Navbar;
