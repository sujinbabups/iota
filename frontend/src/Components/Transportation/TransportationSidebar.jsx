import React from 'react';
import { Link } from 'react-router-dom';
import { IoIosNotifications } from 'react-icons/io';
import { MdDashboard } from 'react-icons/md';

const TransportationSidebar = () => {
  return (
    <div className="w-64 bg-[#3C8D40] text-white h-full p-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Transportation</h1>
      </div>
      <nav>
        <ul>
          <li className="mb-4">
            <Link to="/" className="text-white text-lg flex items-center hover:bg-[#A5D6A7] p-3 rounded-md">
              <MdDashboard className="mr-3" />
              Dashboard
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/notifications" className="text-white text-lg flex items-center hover:bg-[#A5D6A7] p-3 rounded-md">
              <IoIosNotifications className="mr-3" />
              Notifications
            </Link>
          </li>
          {/* Add more navigation links as needed */}
        </ul>
      </nav>
    </div>
  );
};

export default TransportationSidebar;
