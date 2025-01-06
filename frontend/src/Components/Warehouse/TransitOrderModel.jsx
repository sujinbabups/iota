import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

const TransitOrderModal = ({ isOpen, onClose, orderDetails, onTransitOrder }) => {
  const [transporters, setTransporters] = useState([]);
  const [selectedTransporter, setSelectedTransporter] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransporters = async () => {
      try {
        const response = await fetch("/api/transporters");
        if (!response.ok) {
          throw new Error("Failed to fetch transporters");
        }
        const data = await response.json();
        setTransporters(data.transporters || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching transporters:", error);
        setLoading(false);
      }
    };

    fetchTransporters();
  }, []);

  const handleTransitOrder = () => {
    if (!selectedTransporter) {
      alert("Please select a transporter.");
      return;
    }
  
    const transporter = transporters.find((t) => t._id === selectedTransporter);
    if (!transporter) {
      alert("Invalid transporter selected.");
      return;
    }
  
    onTransitOrder(orderDetails._id, transporter);
    onClose();
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-green-800">Transit Order</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-900">
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="mb-4">
          <p className="font-semibold">Order ID: {orderDetails?._id}</p>
          <p className="font-semibold">Seed: {orderDetails?.seedName}</p>
          <p className="font-semibold">Quantity: {orderDetails?.seedQuantity}</p>
        </div>
        <div className="mb-4">
          <label htmlFor="transporter" className="block font-medium text-gray-700">
            Select Transporter
          </label>
          {loading ? (
            <p>Loading transporters...</p>
          ) : (
            <select
              id="transporter"
              value={selectedTransporter}
              onChange={(e) => setSelectedTransporter(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            >
              <option value="" disabled>
                -- Select Transporter --
              </option>
              {transporters.map((transporter) => (
                <option key={transporter._id} value={transporter._id}>
                  {`${transporter.firstName} ${transporter.lastName} - ${transporter.phoneNumber}`}
                </option>
              ))}
            </select>
          )}
        </div>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleTransitOrder}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Transit Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransitOrderModal;
