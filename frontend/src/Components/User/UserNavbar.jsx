import React from 'react';

const UserNavbar = () => {

  return (
    <nav className='w-screen h-10 border-b-2 border-gray-200 pt-2 px-5 text-xl'>
      <div className='flex justify-between'>
        <div>
          IOTA
        </div>
        <div className='flex gap-5'>
          <div><img src='' alt='profile'/></div>
          <div>username</div> 
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;
