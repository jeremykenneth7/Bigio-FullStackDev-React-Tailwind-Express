import React from 'react';
import { Link } from 'react-router-dom';
import { IoMdHome } from "react-icons/io";
import { TiDownload } from "react-icons/ti";
const Sidebar = () => {
    return (
        <aside className=" text-white h-screen w-1/5 p-4 mt-3 flex flex-col">
            <ul className="flex flex-col">
                <li >
                    <Link to="/" className="flex flex-wrap items-center py-2 px-4 rounded ">
                        <IoMdHome className="text-lg mr-3 text-[#6558F5]" />
                        <div className='text-lg font-medium text-[#6558F5] rounded underline'>Home</div>
                    </Link>
                </li>
                <li>
                    <Link to="/management" className="flex flex-wrap items-center py-2 px-4 rounded ">
                        <TiDownload className="text-lg mr-3 text-[#6558F5]" />
                        <div className='text-lg font-medium text-[#6558F5] rounded underline'>Management Story</div>
                    </Link>
                </li>
            </ul>
        </aside>
    );
};

export default Sidebar;
