import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/userdashboard/">
            My Dashboard
          </Link>
        </li>

        <li>
          <Link to="/userdashboard/seedlist">
            Seed List
          </Link>
        </li>

        <li>
          <Link to="/userdashboard/cart">
            Cart Page
          </Link>
        </li>

        <li>
          <Link to="/userdashboard/orderstatus">
              Order Status 
          </Link>
        </li>

        <li>
          <Link to="/userdashboard/shipmentstatus">
              Shipment Status 
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
