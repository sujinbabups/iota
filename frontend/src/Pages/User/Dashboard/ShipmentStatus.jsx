import React from "react";

const TrackingDetails = () => {
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
                Estimated delivery: 24 Nov 2023
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

