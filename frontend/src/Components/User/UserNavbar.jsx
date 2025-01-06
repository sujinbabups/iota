import React from 'react';
import { Link } from 'react-router-dom';

const UserNavbar = () => {

  return (
    <nav className='w-screen h-10 border-b-2 border-gray-200 pt-2 px-5 text-xl'>
      <div className='flex justify-between'>
        <div>
          IOTA
        </div>
        <div className='flex gap-5'>
          <Link to='/userdashboard/profileform'>
            <img src='' alt='profile'/>
          </Link>
          <div>username</div> 
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;
