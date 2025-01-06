import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { FaCartShopping } from "react-icons/fa6";
import { MdBorderColor } from "react-icons/md";
import { MdOutlineLocalShipping } from "react-icons/md";

const Sidebar = () => {
  return (
    <div className='border-b-2 -mt-2 border-gray-300 px-5 py-5 bg-green-700 text-white'>
      <ul className='flex gap-[2%]'>

        {/* <li>
          <Link to="/userdashboard/" className='flex items-center gap-2 '>
            <div>
              <FaHome/>
            </div>
            <div>
              Home
            </div>
          </Link>
        </li> */}

        <li>
          <Link to="/userdashboard/" className='flex items-center gap-2'>
            <div>
            <FaHome/>
            </div>
            <div>
              Home
            </div>
          </Link>
        </li>

        <li>
          <Link to="/userdashboard/profileform" className='flex items-center gap-2'>
            <div>
              <CgProfile/>
            </div>
            <div>
              Profile
            </div>
          </Link>
        </li>

        <li>
          <Link to="/userdashboard/cart" className='flex items-center gap-2'>
            <div>
              <FaCartShopping/>
            </div>
            <div>
              Cart Page
            </div>
          </Link>
        </li>

        <li>
          <Link to="/userdashboard/orderstatus" className='flex items-center gap-2'>
            <div>
              <MdBorderColor/>
            </div>
            <div>
              My Orders
            </div> 
          </Link>
        </li>

      </ul>
    </div>
  );
};

export default Sidebar;
