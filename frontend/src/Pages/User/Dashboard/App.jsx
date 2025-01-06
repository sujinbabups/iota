import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '../../../Components/User/UserNavbar';
import Sidebar from '../../../Components/User/UserSidebar';
import OrderStatus from './OrderStatus';
import ShipmentStatus from './ShipmentStatus';
import SeedList from './SeedList';
import Cart from './Cart';
import ProfilePage from './Profile';

const App = () => {

  return (
    <>
      <Navbar />
      <div className="">
        <Sidebar />
        <div className="bg-gray-200 h-screen w-full p-4">
          <Routes>
            <Route path="/" element={<SeedList />} />
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/orderstatus" element={<OrderStatus />} />
            <Route path="/shipmentstatus/:id" element={<ShipmentStatus />} />
            <Route path="/profileform" element={<ProfilePage />} />            
          </Routes>
        </div>
      </div>
      </>
  );
};

export default App;
