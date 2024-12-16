import React, { useRef } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { LeafIcon } from 'lucide-react';

const Navbar = ({ onGetStartedClick, toggleMenu }) => {

   const loginSectionRef = useRef(null);
 
   const handleGetStartedClick = () => {
     if (loginSectionRef.current) {
       loginSectionRef.current.scrollIntoView({ behavior: 'smooth' });
     }
   };
  return (
    <nav className="fixed w-full z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <LeafIcon className="h-8 w-8 text-green-800" />
          <span className="text-2xl font-bold text-gray-800">SeedStore</span>
        </div>

        <ul className="hidden md:flex space-x-8 items-center">
          <li className="text-gray-600 hover:text-green-600 transition-colors cursor-pointer">Features</li>
          <li className="text-gray-600 hover:text-green-600 transition-colors cursor-pointer">Pricing</li>
          <li className="text-gray-600 hover:text-green-600 transition-colors cursor-pointer">About</li>
        </ul>

        <div className="hidden md:flex items-center space-x-4">
          <button onClick={onGetStartedClick} className="px-4 py-2 bg-green-800 text-white rounded-md hover:bg-green-900 transition-colors">
            Get Started
          </button>
        </div>

        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-600 hover:text-green-600 focus:outline-none">
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
