import { useState, useEffect } from "react";
import { PencilIcon } from "@heroicons/react/24/solid";
import { Card, CardHeader, Typography, CardBody, Chip, Avatar, IconButton, Tooltip } from "@material-tailwind/react";


const TABLE_HEAD = ["Member", "Seed Name", "Seed Type", "Order Status", "Order Date", ""];

export default function OrdersTable() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("/api/orders");
        const data = await response.json();
        console.log(data)
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <Card className="h-full w-full">
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
                <th key={head} className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">{head}</Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <Avatar src={order.userId?.avatar} alt={order.fullName} size="sm" />
                    <div className="flex flex-col">
                      <Typography variant="small" color="blue-gray" className="font-normal">{order.fullName}</Typography>
                      <Typography variant="small" color="blue-gray" className="font-normal opacity-70">{order.email}</Typography>
                    </div>
                  </div>
                </td>
                <td className="p-4">{order.seedName}</td>
                <td className="p-4">{order.seedType}</td>
                <td className="p-4">
                  <Chip variant="ghost" size="sm" value={order.orderStatus} color="blue" />
                </td>
                <td className="p-4">{new Date(order.orderDate).toLocaleDateString()}</td>
                <td className="p-4">
                  <Tooltip content="Edit Order">
                    <IconButton variant="text">
                      <PencilIcon className="h-4 w-4" />
                    </IconButton>
                  </Tooltip>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
}
