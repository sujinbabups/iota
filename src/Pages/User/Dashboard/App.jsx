import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../../../Components/User/UserNavbar';
import Sidebar from '../../../Components/User/UserSidebar';
import OrderStatus from './OrderStatus';
import ShipmentStatus from './ShipmentStatus';
import SeedList from './SeedList';
import Cart from './Cart';
import Home from './UserHomePage';

const App = () => {
  return (
    <div>
      <Navbar />
      <div>
        <Sidebar />
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/seedlist" element={<SeedList />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orderstatus" element={<OrderStatus />} />
            <Route path="/shipmentstatus" element={<ShipmentStatus />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
