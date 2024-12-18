import React from 'react';
import { Box, Typography } from '@mui/material';

const OrderStatus = ({ order }) => {
  return (
    <Box sx={{ padding: '40px' }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '20px' }}>
        Order Status
      </Typography>
      {order ? (
        <>
          <Typography>Order ID: {order.id}</Typography>
          <Typography>Total Items: {order.items.length}</Typography>
          <Typography>Total Amount: ₹{order.total}</Typography>
          <Typography>Status: {order.status}</Typography>
          <Typography>Items:</Typography>
          <ul>
            {order.items.map((item) => (
              <li key={item.id}>
                {item.name} - Quantity: {item.quantity}, Total: ₹{item.total}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <Typography variant="body1">No recent order found.</Typography>
      )}
    </Box>
  );
};

export default OrderStatus;
