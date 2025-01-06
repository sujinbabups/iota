import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut } from 'lucide-react'


const UserNavbar = () => {
  
  const navigate=useNavigate();
    const warehouseLogout = async () => {
      try {
          const res = await fetch('/api/warehouse-logout');
          if (res.ok) {
              const data = await res.json();
              if (data.redirect) {
                  navigate(data.redirect); 
              }
          } else {
              console.log('Logout failed.');
          }
      } catch (error) {
          console.log('Something went wrong', error);
      }
  };


  return (
    <nav className="w-screen h-20 pt-5 border-b-2 border-gray-200 pt-2 px-5 text-xl bg-green-900 text-white">
      <div className="flex justify-between items-center ">
        <div>IOTA</div>
        <div className="flex items-center gap-5">
          <Link to="/userdashboard/profileform">
            <img src="" alt="profile" />
          </Link>
          <div>username</div>
          <div className="flex items-center">
            <button
              onClick={warehouseLogout}
              className="flex items-center space-x-2 bg-white text-green-900 px-4 py-2 rounded transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;
