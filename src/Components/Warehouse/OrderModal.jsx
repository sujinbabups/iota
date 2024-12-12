import React, { useState } from 'react';
import { X, Check } from 'lucide-react';

// Mock inventory data
const inventoryData = {
  'Wheat': 200,
  'Rice': 300,
  'Corn': 150,
  'Barley': 250
};

const OrderModal = ({ 
  isOpen, 
  onClose, 
  orderDetails,
  onConfirmMatch 
}) => {
  const [matchedQuantity, setMatchedQuantity] = useState(orderDetails.quantity);
  const availableStock = inventoryData[orderDetails.seed] || 0;

  if (!isOpen) return null;

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    setMatchedQuantity(
      isNaN(value) ? 0 : 
      Math.min(value, Math.min(orderDetails.quantity, availableStock))
    );
  };

  const handleConfirm = () => {
    onConfirmMatch(orderDetails.orderId, matchedQuantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-green-800">Match Order</h2>
          <button 
            onClick={onClose} 
            className="text-gray-600 hover:text-gray-900"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="mb-4">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-600">Order Details</p>
              <p className="font-semibold">Order ID: {orderDetails.orderId}</p>
              <p className="font-semibold">Seed: {orderDetails.seed}</p>
              <p className="font-semibold">Ordered Quantity: {orderDetails.quantity}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Available Stock</p>
              <p className="font-semibold text-green-700">
                {orderDetails.seed}: {availableStock} units
              </p>
            </div>
          </div>

          <div>
            <label htmlFor="matchQuantity" className="block text-sm font-medium text-gray-700">
              Matching Quantity
            </label>
            <input 
              type="number" 
              id="matchQuantity"
              value={matchedQuantity}
              onChange={handleQuantityChange}
              min={0}
              max={Math.min(orderDetails.quantity, availableStock)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
            />
            {matchedQuantity > availableStock && (
              <p className="text-red-500 text-xs mt-1">
                Quantity exceeds available stock
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleConfirm}
            disabled={matchedQuantity === 0 || matchedQuantity > availableStock}
            className={`px-4 py-2 rounded-md text-white transition-colors ${
              matchedQuantity === 0 || matchedQuantity > availableStock
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            <Check className="inline-block mr-2 h-5 w-5" />
            Confirm Match
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;