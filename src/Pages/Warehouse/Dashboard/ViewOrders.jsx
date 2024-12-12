import React, { useState } from 'react';
import OrderModal from '../../../Components/Warehouse/OrderModal';

const seedDetails = [
  { orderId: 'ORD001', seed: 'Wheat', quantity: 50, paymentStatus: 'Paid' },
  { orderId: 'ORD002', seed: 'Rice', quantity: 100, paymentStatus: 'Pending' },
  { orderId: 'ORD003', seed: 'Corn', quantity: 30, paymentStatus: 'Failed' },
  { orderId: 'ORD004', seed: 'Barley', quantity: 40, paymentStatus: 'Paid' },
];

const ViewOrders = () => {
  const [seeds, setSeeds] = useState(seedDetails);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleMatchOrder = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleConfirmMatch = (orderId, matchedQuantity) => {
    // Update the order in the seeds array
    const updatedSeeds = seeds.map(seed => 
      seed.orderId === orderId 
        ? { ...seed, matchedQuantity, status: 'Matched' } 
        : seed
    );
    setSeeds(updatedSeeds);

    // You can add additional logic here like:
    // - Updating inventory
    // - Sending match confirmation to backend
    console.log(`Order ${orderId} matched with quantity ${matchedQuantity}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-md shadow-lg mt-[-12%]">
      <h2 className="text-2xl font-bold text-center text-green-800 mb-6">All Orders</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-green-300">
          <thead>
            <tr className="text-green-800">
              <th className="px-4 py-2 border border-green-300">Order ID</th>
              <th className="px-4 py-2 border border-green-300">Seed</th>
              <th className="px-4 py-2 border border-green-300">Quantity</th>
              <th className="px-4 py-2 border border-green-300">Payment Status</th>
              <th className="px-4 py-2 border border-green-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {seeds.map((seed, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? 'bg-green-50' : 'bg-white'
                } hover:bg-green-100 transition duration-150`}
              >
                <td className="px-4 py-2 border border-green-300 text-center">{seed.orderId}</td>
                <td className="px-4 py-2 border border-green-300">{seed.seed}</td>
                <td className="px-4 py-2 border border-green-300 text-center">{seed.quantity}</td>
                <td className={`px-4 py-2 border border-green-300 text-center`}>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      seed.paymentStatus === 'Paid'
                        ? 'bg-green-100 text-green-700'
                        : seed.paymentStatus === 'Pending'
                        ? 'bg-green-200 text-green-800'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {seed.paymentStatus}
                  </span>
                </td>
                <td className="px-4 py-2 border border-green-300 text-center">
                  {seed.paymentStatus === 'Paid' && (
                    <button
                      onClick={() => handleMatchOrder(seed)}
                      className="bg-green-800 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-900 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-900 focus:ring-opacity-50"
                    >
                      Match Order
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <OrderModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          orderDetails={selectedOrder}
          onConfirmMatch={handleConfirmMatch}
        />
      )}
    </div>
  );
};

export default ViewOrders;