import { useState, useEffect } from "react";

const ShipmentTracking = () => {
  const [orders, setOrders] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [filteredOrder, setFilteredOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("/api/orderstrack");
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const order = orders.find((order) => order._id === searchId);
    setFilteredOrder(order);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex justify-center">
      <div className="w-full max-w-5xl bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Shipment Tracking
        </h1>
        <div className="bg-gray-50 shadow-md rounded-lg p-4 mb-6">
          <h2 className="text-xl font-semibold mb-4">Search Shipment</h2>
          <form className="flex items-center gap-4" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Enter Shipment ID"
              className="w-full p-2 border rounded-md"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Track
            </button>
          </form>
        </div>

        {filteredOrder && (
          <div className="bg-gray-50 shadow-md rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">Shipment Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 border rounded-md">
                <h3 className="text-sm text-gray-500">Shipment ID</h3>
                <p className="text-lg font-bold">{filteredOrder._id}</p>
              </div>
              <div className="p-4 border rounded-md">
                <h3 className="text-sm text-gray-500">Status</h3>
                <p
                  className={`text-lg font-bold ${
                    filteredOrder.status === "In Transit"
                      ? "text-green-500"
                      : "text-gray-500"
                  }`}
                >
                  {filteredOrder.orderStatus}
                </p>
              </div>
              <div className="p-4 border rounded-md">
                <h3 className="text-sm text-gray-500">Estimated Delivery</h3>
                <p className="text-lg font-bold">
                {(() => {
                  const date = new Date(filteredOrder.orderDate);
                  date.setDate(date.getDate() + 3);
                  return date.toLocaleDateString();
                })()}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tracking Timeline Section */}
        {filteredOrder &&
          filteredOrder.timeline &&
          Array.isArray(filteredOrder.timeline) && (
            <div className="bg-gray-50 shadow-md rounded-lg p-4 mt-6">
              <h2 className="text-xl font-semibold mb-4">Tracking Timeline</h2>
              <ul className="space-y-4">
                {filteredOrder.timeline.map((event, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                        event.orderStatus === "Dispatched"
                          ? "bg-green-500"
                          : event.orderStatus === "In Transit"
                          ? "bg-yellow-500"
                          : "bg-gray-300"
                      }`}
                    >
                      {event.orderStatus === "Dispatched"
                        ? "✓"
                        : event.orderStatus === "In Transit"
                        ? "!"
                        : "-"}
                    </div>
                    <div>
                      <h4 className="font-bold">{event.orderStatus}</h4>
                      <p className="text-sm text-gray-500">{event.orderDate}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
      </div>
    </div>
  );
};

export default ShipmentTracking;
