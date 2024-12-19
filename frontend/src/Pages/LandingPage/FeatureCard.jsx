import React from 'react';
import { FaLeaf, FaTruck } from 'react-icons/fa';
import { LiaWarehouseSolid } from 'react-icons/lia';
import { Link } from 'react-router-dom';

const FeatureCard = ({ featureCardRef }) => {
  return (
    <div ref={featureCardRef} className="grid md:grid-cols-3 gap-8">
        <Link to='/userlogin' >
      <div className="bg-green-50 p-6 rounded-lg text-center hover:shadow-lg transition-shadow cursor-pointer">
        <FaLeaf className="h-12 w-12 mx-auto text-green-900 mb-4" />
        <h3 className="text-xl font-semibold mb-2 text-gray-800">Farmers</h3>
        <p className="text-gray-600">Minimize carbon footprint with optimized routing and eco-friendly practices.</p>
      </div>
      </Link>
      <Link to='/warehouselogin'>
      <div className="bg-green-50 p-6 rounded-lg text-center hover:shadow-lg transition-shadow cursor-pointer">
        <LiaWarehouseSolid className="h-12 w-12 mx-auto text-green-900 mb-4" />
        <h3 className="text-xl font-semibold mb-2 text-gray-800">WareHouse</h3>
        <p className="text-gray-600">Monitor your seed shipments with precision and transparency.</p>
      </div>
      </Link>
      <Link to='/transportationlogin'>
      <div className="bg-green-50 p-6 rounded-lg text-center hover:shadow-lg transition-shadow cursor-pointer">
        <FaTruck className="h-12 w-12 mx-auto text-green-900 mb-4" />
        <h3 className="text-xl font-semibold mb-2 text-gray-800">Transporters</h3>
        <p className="text-gray-600">Ensure the safety of your valuable seed shipments throughout transit.</p>
      </div>
      </Link>
    </div>
  );
};

export default FeatureCard;
