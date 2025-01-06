import React, { useState, useEffect } from "react";
import CancelOrder from "../../../Components/Warehouse/CancelOrder";
import TransitOrderModal from "../../../Components/Warehouse/TransitOrderModel";

const ViewOrders = () => {
  const [seeds, setSeeds] = useState([]); // Dynamic order details
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isTransitModalOpen, setIsTransitModalOpen] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch orders on component mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("/api/getOrder"); // Ensure this matches your API endpoint
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("data ", data);

        setSeeds(data.orderData || []); // Safely set seeds as an array
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleCancelOrder = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleTransitOrder = (order) => {
    setSelectedOrder(order);
    setIsTransitModalOpen(true);
  };

  const updateOrderStatus = async (orderId, transporter) => {
    try {
      const response = await fetch(`/api/updateOrderStatus/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          transporterId: transporter._id,
          name: `${transporter.firstName} ${transporter.lastName}`,
          phoneNumber: transporter.phoneNumber,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update order: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Order updated successfully:", data);

      // Update the order status in the UI
      setSeeds((prevSeeds) =>
        prevSeeds.map((seed) =>
          seed._id === orderId
            ? { ...seed, orderStatus: "Dispatched", transporter }
            : seed
        )
      );

      alert("Order updated successfully!");
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Failed to update order. Please try again.");
    }
  };

  return (
    <div className="w-[900px] mx-auto p-6 bg-white rounded-md shadow-lg mt-[5%] ml-[15%]">
      <h2 className="text-2xl font-bold text-center text-green-800 mb-6">
        All Orders
      </h2>
      {loading ? (
        <p className="text-center text-green-800">Loading orders...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-green-300">
            <thead>
              <tr className="text-green-800">
                <th className="px-4 py-2 border border-green-300">Order ID</th>
                <th className="px-4 py-2 border border-green-300">Seed</th>
                <th className="px-4 py-2 border border-green-300">Quantity</th>
                <th className="px-4 py-2 border border-green-300">
                  Order Status
                </th>
                <th className="px-4 py-2 border border-green-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(seeds) && seeds.length > 0 ? (
                seeds.map((seed, index) => (
                  <tr
                    key={seed._id}
                    className={`${
                      index % 2 === 0 ? "bg-green-50" : "bg-white"
                    } hover:bg-green-100`}
                  >
                    <td className="px-4 py-2 border border-green-300 text-center">
                      {seed._id}
                    </td>
                    <td className="px-4 py-2 border border-green-300">
                      {seed.seedType}
                    </td>
                    <td className="px-4 py-2 border border-green-300 text-center">
                      {seed.seedQuantity}
                    </td>
                    <td
                      className={`px-4 py-2 border border-green-300 text-center`}
                    >
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          seed.orderStatus === "Order has placed"
                            ? "bg-green-100 text-green-700"
                            : seed.orderStatus === "Dispatched"
                            ? "bg-green-200 text-green-800"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {seed.orderStatus}
                      </span>
                    </td>
                    {seed.orderStatus === "Order has placed" ||
                    seed.orderStatus === "Dispatched" ? (
                      <td className="px-4 py-2 border border-green-300 text-center">
                        <div className="flex gap-4 justify-center">
                          <button
                            onClick={() => handleCancelOrder(seed)}
                            className="bg-yellow-300 text-black px-2 py-2 rounded-md shadow-md hover:bg-yellow-400 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-900 focus:ring-opacity-50"
                          >
                            Cancel Order
                          </button>
                          <button
                            onClick={() => handleTransitOrder(seed)}
                            className="bg-green-700 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-800 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-900 focus:ring-opacity-50"
                          >
                            Transit Order
                          </button>
                        </div>
                      </td>
                    ) : (
                      <td className="px-4 py-2 border border-green-300 text-center text-[green]">
                        Order {seed.orderStatus}
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-green-800 py-4">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {isModalOpen && (
        <CancelOrder
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          orderDetails={selectedOrder}

        />
      )}
      {isTransitModalOpen && (
        <TransitOrderModal
          isOpen={isTransitModalOpen}
          onClose={() => setIsTransitModalOpen(false)}
          orderDetails={selectedOrder}
          onTransitOrder={updateOrderStatus}
        />
      )}
    </div>
  );
};

export default ViewOrders;
