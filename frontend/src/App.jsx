import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TransportationLogin from './Pages/Transportation/TransportationLogin'
import TransportationRegistration from './Pages/Transportation/TransportationRegistration'
import UserLogin from './Pages/User/UserLogin'
import UserRegistration from './Pages/User/UserRegistration'
import WarehouseLogin from './Pages/Warehouse/WarehouseLogin';
import WarehouseRegistration from './Pages/Warehouse/WarehouseRegistration';

import UserDashboard from "./Pages/User/Dashboard/App"
import WarehouseDashboard from './Pages/Warehouse/Dashboard/App'
import TransporationDashboard from './Pages/Transportation/Dashboard/App'
import LandingPage from './Pages/LandingPage/LandingPage';

const App = () => {
  
  return (
    
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/transportationlogin' element={<TransportationLogin/>} />
        <Route path='/transportationregistration' element={<TransportationRegistration/>} />
        <Route path='/userlogin' element={<UserLogin/>} />
        <Route path='/userregistration' element={<UserRegistration />} />
        <Route path='/warehouselogin' element={<WarehouseLogin />} />
        <Route path='/warehouseregistration' element={<WarehouseRegistration/>} />

        <Route path='/userdashboard/*' element={<UserDashboard/>} />
        <Route path='/warehousedashboard/*' element={<WarehouseDashboard/>} />
        <Route path='/transporationdashboard/*' element={<TransporationDashboard/>} />

        
      </Routes>
    </Router>
  );
}

export default App;
