import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const TrackingDetails = () => {
  const { id } = useParams(); // Get the order ID from the route parameter
  const [orderDetails, setOrderDetails] = useState(null); // State for order details
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchTrackingDetails = async () => {
      console.log("Fetching order with ID:", id); 
      try {
        const response = await fetch(`/api/getorder/${id}`, {
          method: "GET",
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error("Failed to fetch order details");
        }

        console.log("Received order data:", data);  // Log the data
        setOrderDetails(data.order); // Assuming 'data.order' contains the order details
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrackingDetails();
  }, [id]);

  if (loading) {
    return <p>Loading tracking details...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!orderDetails) {
    return <p>No order details found.</p>;
  }
  
  return (
    <div className="container mx-auto mt-10 max-w-4xl px-4">
      <div className="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Order Tracking
          </h3>
            <ol className="relative mt-6 border-l border-gray-200 dark:border-gray-700">
            <li className="mb-10 ml-6">
              <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white dark:bg-gray-700 dark:ring-gray-800">
                <svg
                  className="h-4 w-4 text-gray-500 dark:text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M4 12l8-8 8 8M6 10.5V19a1 1 0 001 1h3v-3a1 1 0 011-1h2a1 1 0 011 1v3h3a1 1 0 001-1v-8.5" />
                </svg>
              </span>
              <h4 className="text-base font-semibold text-gray-900 dark:text-white">
                Estimated delivery: {new Date(orderDetails.orderDate).toLocaleDateString()}

              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Your product is on the way.
              </p>
            </li>
            <li className="mb-10 ml-6">
              <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 ring-8 ring-white dark:bg-primary-900 dark:ring-gray-800">
                <svg
                  className="h-4 w-4 text-primary-700 dark:text-primary-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 11.917L9.724 16.5 19 7.5" />
                </svg>
              </span>
              <h4 className="text-base font-semibold text-gray-900 dark:text-white">
                Today
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Out for delivery.
              </p>
            </li>
            <li className="mb-10 ml-6">
              <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 ring-8 ring-white dark:bg-primary-900 dark:ring-gray-800">
                <svg
                  className="h-4 w-4 text-primary-700 dark:text-primary-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 11.917L9.724 16.5 19 7.5" />
                </svg>
              </span>
              <h4 className="text-base font-semibold text-gray-900 dark:text-white">
                23 Nov 2023, 15:15
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Arrived at courier's warehouse.
              </p>
            </li>
            <li className="ml-6">
              <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 ring-8 ring-white dark:bg-primary-900 dark:ring-gray-800">
                <svg
                  className="h-4 w-4 text-primary-700 dark:text-primary-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 11.917L9.724 16.5 19 7.5" />
                </svg>
              </span>
              <h4 className="text-base font-semibold text-gray-900 dark:text-white">
                19 Nov 2023, 10:47
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Payment accepted - VISA Credit Card.
              </p>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default TrackingDetails;

