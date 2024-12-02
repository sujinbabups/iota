import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../../../Components/Warehouse/WarehouseNabvar';
import Sidebar from '../../../Components/Warehouse/WarehouseSidebar';
import SeedList from './SeedList';
import AddSeed from './AddSeed';
import ViewOrders from './ViewOrders';
import TransportationDetails from './TransportationDetails';
import Home from './Home';


const App = () => {
  return (
    <div>
      <Navbar />
      <div>
        <Sidebar />
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/addseed" element={<AddSeed/>} />
            <Route path="/seedlist" element={<SeedList />} />
            <Route path="/vieworders" element={<ViewOrders />} />
            <Route path="/transportationdetails" element={<TransportationDetails />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
