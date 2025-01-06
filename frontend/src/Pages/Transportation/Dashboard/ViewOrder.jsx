import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  Chip,
  Avatar,
  IconButton,
  Tooltip,
  Button,
} from "@material-tailwind/react";

const TABLE_HEAD = [
  "User",
  "Address",
  "Seed Name",
  "Seed Type",
  "Seed Quantity",
  "Seed Price",
  "Order Date",
  "Action",
  "",
];

export default function OrdersTable() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("/api/orders");
        const data = await response.json();
        console.log(data);
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleDeliveryClick = async (id) => {
    try {
      const response = await fetch(`/api/orders/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "Out for Delivery" }),
      });
  
      if (response.ok) {
        const updatedOrder = await response.json();
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === updatedOrder._id ? updatedOrder : order
          )
        );
      } else {
        console.error("Error updating order status");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };
  

  return (
    <Card className="h-full w-full px-8 py-5">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Orders list
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all orders
            </Typography>
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td className="">
                  <div className="flex items-center gap-3">
                    <Avatar
                      src={order.userId?.avatar}
                      alt={order.fullName}
                      size="sm"
                    />
                    <div className="flex flex-col">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {order.email}
                      </Typography>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal opacity-70"
                      >
                        {order.phoneNumber}
                      </Typography>
                    </div>
                  </div>
                </td>
                <td className="pl-4">{order.address}</td>
                <td className="pl-4">{order.seedName}</td>
                <td className="pl-4">{order.seedType}</td>
                <td className="pl-4">{order.seedQuantity}</td>
                <td className="pl-4">{order.seedPrice}</td>
                <td className="p-4">
                  {new Date(order.orderDate).toLocaleDateString()}
                </td>
                <td className="p-4">
                  {order.orderStatus !== "Out for Delivery"&& order.orderStatus !== "Cancelled" && (
                    <Button
                      size="sm"
                      color="green"
                      onClick={() => handleDeliveryClick(order._id)}
                    >
                      Delivery
                    </Button>
                  )}
                  {order.orderStatus === "Out for Delivery" && (
                    <Chip color="red" size="sm" value="Delivered" className="w-[80px] p-2"/>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
}
