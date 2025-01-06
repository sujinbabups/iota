import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, LogOut } from 'lucide-react';
import TransportationSidebar from './TransportationSidebar';

const TransportationNavbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Function to toggle sidebar visibility
  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Close the sidebar when clicking outside of it
  useEffect(() => {
    const closeSidebarOnClickOutside = (event) => {
      if (isSidebarOpen && !event.target.closest('.sidebar') && !event.target.closest('.sidebar-toggle')) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('click', closeSidebarOnClickOutside);

    return () => {
      document.removeEventListener('click', closeSidebarOnClickOutside);
    };
  }, [isSidebarOpen]);

  return (
    <div>
      {/* Main Navbar */}
      <div className="flex items-center justify-between p-6 shadow-lg" style={{ backgroundColor: 'rgb(20, 83, 45)', color: 'white' }}>
        <div className="flex items-center space-x-6">
          {/* Hamburger Menu Icon */}
          <button
            onClick={handleSidebarToggle}
            className="text-white lg:hidden sidebar-toggle transition-all duration-300 ease-in-out bg-[#A5D6A7] hover:bg-[#3C8D40] px-6 py-3 rounded-lg shadow-lg transform hover:scale-105"
          >
            <Menu className="h-8 w-8" />
          </button>

          {/* Title */}
          <span className="text-2xl font-bold tracking-wide">SeedStore Transportation</span>
        </div>

        <div className="flex items-center space-x-6">
          <Link
            to="/profile"
            className="text-white hover:text-[#A5D6A7] transition-all duration-300 ease-in-out py-2 px-4 rounded-lg shadow-lg transform hover:scale-105 relative group"
          >
            <span className="absolute bottom-0 left-0 w-0 h-1 bg-[#A5D6A7] transition-all duration-300 ease-in-out group-hover:w-full"></span>
            Profile
          </Link>
          <Link
            to="/transportationdashboard/vieworders"
            className="text-white hover:text-[#A5D6A7] transition-all duration-300 ease-in-out py-2 px-4 rounded-lg shadow-lg transform hover:scale-105 relative group"
          >
            <span className="absolute bottom-0 left-0 w-0 h-1 bg-[#A5D6A7] transition-all duration-300 ease-in-out group-hover:w-full"></span>
            Orders
          </Link>
          <Link
            to="/transportationdashboard/shipmenttracking"
            className="text-white hover:text-[#A5D6A7] transition-all duration-300 ease-in-out py-2 px-4 rounded-lg shadow-lg transform hover:scale-105 relative group"
          >
            <span className="absolute bottom-0 left-0 w-0 h-1 bg-[#A5D6A7] transition-all duration-300 ease-in-out group-hover:w-full"></span>
            Shipments Tracking
          </Link>
          <Link
            to="/logout"
            className="flex items-center text-white hover:text-[#A5D6A7] transition-all duration-300 ease-in-out py-2 px-4 rounded-lg shadow-lg transform hover:scale-105 relative group"
          >
            <LogOut className="h-6 w-6 mr-2" />
            Logout
            <span className="absolute bottom-0 left-0 w-0 h-1 bg-[#A5D6A7] transition-all duration-300 ease-in-out group-hover:w-full"></span>
          </Link>
        </div>
      </div>

      {/* Sidebar Component */}
      {isSidebarOpen && (
        <TransportationSidebar handleSidebarToggle={handleSidebarToggle} />
      )}
    </div>
  );
};

export default TransportationNavbar;
