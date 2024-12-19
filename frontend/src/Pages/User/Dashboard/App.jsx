import React,{useState} from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../../../Components/User/UserNavbar';
import Sidebar from '../../../Components/User/UserSidebar';
import OrderStatus from './OrderStatus';
import ShipmentStatus from './ShipmentStatus';
import SeedList from './SeedList';
import Cart from './Cart';
import Home from './UserHomePage';

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [order, setOrder] = useState(null);

  const handleAddToCart = (item) => {
    setCartItems((prevCart) => [...prevCart, item]);
  };

  const handleRemoveFromCart = (itemId) => {
    setCartItems((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  const handlePlaceOrder = (orderDetails) => {
    const totalAmount = orderDetails.reduce((total, item) => total + parseFloat(item.total), 0).toFixed(2);
    const newOrder = {
      id: `ORD-${Date.now()}`,
      items: orderDetails,
      total: totalAmount,
      status: 'Processing',
    };
    setOrder(newOrder);
    setCartItems([]); // Clear the cart
  };


  return (
    <div>
      <Navbar />
      <div>
        <Sidebar />
        <div className='bg-gray-200 h-screen'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/seedlist" element={<SeedList onAddToCart={handleAddToCart} />} />
            <Route
              path="/cart"
              element={<Cart cartItems={cartItems} onRemoveFromCart={handleRemoveFromCart} onPlaceOrder={handlePlaceOrder} />}
            />
            <Route path="/orderstatus" element={<OrderStatus order={order} />} />
            <Route path="/shipmentstatus" element={<ShipmentStatus />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
