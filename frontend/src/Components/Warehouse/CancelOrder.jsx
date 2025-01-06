import React, { useState, useEffect } from "react";
import { X, Check } from "lucide-react";

const CancelOrder = ({ isOpen, onClose, orderDetails }) => {
  const [matchedQuantity, setMatchedQuantity] = useState(orderDetails.quantity);
  const [seeds, setSeeds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSeeds();
  }, []);

  const fetchSeeds = async () => {
    try {
      const response = await fetch("/api/allseeds");
      if (!response.ok) {
        throw new Error("Failed to fetch seed data");
      }
      const result = await response.json();
      setSeeds(result.data);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  // Find available stock for the current order
  const availableStock =
    seeds.find((seed) => seed._id === orderDetails.seedId)?.seedQuantity || 0;

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    setMatchedQuantity(
      isNaN(value)
        ? 0
        : Math.min(value, Math.min(orderDetails.quantity, availableStock || 0))
    );
  };

  const handleCancelOrder = async () => {
    try {
      if (!orderDetails._id) {
        throw new Error("Order ID is missing");
      }

      const response = await fetch(`/api/orders/${orderDetails._id}/cancel`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderStatus: "Cancelled" }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to cancel the order");
      }

      alert("Order has been cancelled successfully");
      onClose();
    } catch (err) {
      console.error(err.message);
      alert("Error cancelling the order. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-green-800">Cancel Order</h2>
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
              <p className="font-semibold">Seed: {orderDetails.seedName}</p>
              <p className="font-semibold">
                Ordered Quantity: {orderDetails.seedQuantity}
              </p>
              <p className="font-semibold">Price: {orderDetails.seedPrice}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Available Stock</p>
              <p className="font-bold text-green-800"> {availableStock}</p>
              {availableStock !== undefined ? (
                availableStock < orderDetails.seedQuantity ? (
                  <p className="font-semibold text-red-700">
                    Ordered stock not available
                  </p>
                ) : (
                  <p className="font-semibold text-green-700">
                    {availableStock} units
                  </p>
                )
              ) : (
                <p className="font-semibold text-gray-500">Loading...</p>
              )}
            </div>
          </div>

          <div>
            <input
              type="number"
              id="matchQuantity"
              value={matchedQuantity}
              onChange={handleQuantityChange}
              min={0}
              max={Math.min(
                Number(orderDetails.quantity) || 0,
                Number(availableStock) || 0
              )}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
            />
            {matchedQuantity > (availableStock || 0) && (
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
            onClick={handleCancelOrder}
            disabled={
              matchedQuantity === 0 || matchedQuantity > (availableStock || 0)
            }
            className={`px-4 py-2 rounded-md text-white transition-colors ${
              matchedQuantity === 0 || matchedQuantity > (availableStock || 0)
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            <Check className="inline-block mr-2 h-5 w-5" />
            Cancel Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelOrder;
