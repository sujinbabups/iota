import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../../../Components/Transportation/TransportationNavbar';
// import Sidebar from '../../../Components/Transportation/TransportationSidebar';
import ViewOrder from './ViewOrder';
import OrderStatus from './OrderStatus';
import ShipmentTracking from './ShipmentTracking';
import Home from './Home';
import Footer from '../../LandingPage/Footer'

const App = () => {
  return (
    <div >
      <Navbar />
      <div>
        {/* <Sidebar /> */}
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/vieworder" element={<ViewOrder />} />
            <Route path="/orderstatus" element={<OrderStatus />} />
            <Route path="/shipmenttracking" element={<ShipmentTracking />} />
          </Routes>
        </div>
      </div>
      <div> <Footer /></div>
    </div>
  );
};

export default App;
