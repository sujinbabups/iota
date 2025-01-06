import React from 'react';

const ShipmentTracking = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen flex justify-center">
      <div className="w-full max-w-5xl bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Shipment Tracking</h1>

        {/* Search Section */}
        <div className="bg-gray-50 shadow-md rounded-lg p-4 mb-6">
          <h2 className="text-xl font-semibold mb-4">Search Shipment</h2>
          <form className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Enter Shipment ID"
              className="w-full p-2 border rounded-md"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Track
            </button>
          </form>
        </div>

        {/* Shipment Details Section */}
        <div className="bg-gray-50 shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Shipment Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 border rounded-md">
              <h3 className="text-sm text-gray-500">Shipment ID</h3>
              <p className="text-lg font-bold">123456789</p>
            </div>
            <div className="p-4 border rounded-md">
              <h3 className="text-sm text-gray-500">Status</h3>
              <p className="text-lg font-bold text-green-500">In Transit</p>
            </div>
            <div className="p-4 border rounded-md">
              <h3 className="text-sm text-gray-500">Estimated Delivery</h3>
              <p className="text-lg font-bold">Jan 10, 2025</p>
            </div>
          </div>
        </div>

        {/* Tracking Timeline Section */}
        <div className="bg-gray-50 shadow-md rounded-lg p-4 mt-6">
          <h2 className="text-xl font-semibold mb-4">Tracking Timeline</h2>
          <ul className="space-y-4">
            <li className="flex items-start gap-4">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                ✓
              </div>
              <div>
                <h4 className="font-bold">Dispatched</h4>
                <p className="text-sm text-gray-500">Jan 4, 2025, 10:00 AM</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold">
                !
              </div>
              <div>
                <h4 className="font-bold">In Transit</h4>
                <p className="text-sm text-gray-500">Jan 5, 2025, 3:00 PM</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-white font-bold">
                -
              </div>
              <div>
                <h4 className="font-bold">Out for Delivery</h4>
                <p className="text-sm text-gray-500">Jan 10, 2025</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ShipmentTracking;
