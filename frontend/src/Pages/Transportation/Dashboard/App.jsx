import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../../../Components/Transportation/TransportationNavbar';
import ViewOrder from './ViewOrder';
import ShipmentTracking from './ShipmentTracking';
import Home from './Home';
import Footer from '../../LandingPage/Footer'

const App = () => {
  return (
    <div >
      <Navbar />
      <div>
        <div className='h-[720px]'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/vieworders" element={<ViewOrder />} />
            <Route path="/shipmenttracking" element={<ShipmentTracking />} />
          </Routes>
        </div>
      </div>
      <div> <Footer /></div>
    </div>
  );
};

export default App;
