import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from "react-icons/fa";
import { FaSeedling } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { MdBorderColor } from "react-icons/md";
import { MdOutlineLocalShipping } from "react-icons/md";

const Sidebar = () => {
  return (
    <div className='border-b-2 border-gray-300 px-5 py-5'>
      <ul className='flex gap-[2%]'>

        <li>
          <Link to="/userdashboard/" className='flex items-center gap-2 '>
            <div>
              <FaHome/>
            </div>
            <div>
              Home
            </div>
          </Link>
        </li>

        <li>
          <Link to="/userdashboard/seedlist" className='flex items-center gap-2'>
            <div>
              <FaSeedling/>
            </div>
            <div>
              Seed List
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
              Order Status
            </div> 
          </Link>
        </li>

        <li>
          <Link to="/userdashboard/shipmentstatus" className='flex items-center gap-2'>
            <div>
              <MdOutlineLocalShipping/>
            </div>
            <div>
              Shipment Status
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
