import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BsCartCheckFill } from "react-icons/bs";
import { MdOutlineDateRange } from "react-icons/md";
import { MdLocalShipping } from "react-icons/md";
import { MdDeliveryDining } from "react-icons/md";
import { LuPackageCheck } from "react-icons/lu";


const TrackingDetails = () => {
  const { id } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrackingDetails = async () => {
      try {
        const response = await fetch(`/api/getorder/${id}`, {
          method: "GET",
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error("Failed to fetch order details");
        }

        setOrderDetails(data.order);
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
              <span className=" absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white dark:bg-gray-700 dark:ring-gray-800">
                <BsCartCheckFill className="h-4 w-4 text-[green]"/>
              </span>
              <h4 className="text-base font-semibold text-gray-900 dark:text-white">
                Order Placed on{" "}
                {new Date(orderDetails.orderDate).toLocaleDateString()}
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Your product is on the way.
              </p>
            </li>
            <li className="mb-10 ml-6">
              <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 ring-8 ring-white dark:bg-primary-900 dark:ring-gray-800">
              <MdOutlineDateRange className="h-4 w-4 text-[green]"/>
              </span>
              <h4 className="text-base font-semibold text-gray-900 dark:text-white">
                Expected Delivery
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                On{" "}
                {(() => {
                  const date = new Date(orderDetails.orderDate);
                  date.setDate(date.getDate() + 3);
                  return date.toLocaleDateString();
                })()}
              </p>
            </li>
            {orderDetails.orderStatus === "In transit" && (
            <>
            <li className="mb-10 ml-6">
              <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 ring-8 ring-white dark:bg-primary-900 dark:ring-gray-800">
              <LuPackageCheck className="h-4 w-4 text-[green]"/>
              </span>
              <h4 className="text-base font-semibold text-gray-900 dark:text-white">
              {(() => {
                  const date = new Date(orderDetails.orderDate);
                  date.setDate(date.getDate() + 1);
                  return date.toLocaleDateString();
                })()}
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Order Packed 
              </p>
            </li>
            <li className="ml-6">
              <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 ring-8 ring-white dark:bg-primary-900 dark:ring-gray-800">
              <MdLocalShipping className="h-4 w-4 text-[green]"/>
              </span>
              <h4 className="text-base font-semibold text-gray-900 dark:text-white">
                {(() => {
                    const date = new Date(orderDetails.orderDate);
                    date.setDate(date.getDate() + 2);
                    return date.toLocaleDateString();
                  })()}
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Shipped To Transporter
              </p>
            </li>
            </>
            )}
            {orderDetails.orderStatus === "Delivered" && (
            <>
            <li className="ml-6 mt-10">
            <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 ring-8 ring-white dark:bg-primary-900 dark:ring-gray-800">
            <MdDeliveryDining className="h-4 w-4 text-[green]"/>

              </span>
              <h4 className="text-base font-semibold text-gray-900 dark:text-white">
                {(() => {
                    const date = new Date(orderDetails.orderDate);
                    date.setDate(date.getDate() + 3);
                    return date.toLocaleDateString();
                  })()}
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Order delivering Today
              </p>
            </li>
            </>
            )}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default TrackingDetails;
