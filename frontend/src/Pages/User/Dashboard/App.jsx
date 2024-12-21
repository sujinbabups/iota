import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '../../../Components/User/UserNavbar';
import Sidebar from '../../../Components/User/UserSidebar';
import OrderStatus from './OrderStatus';
import ShipmentStatus from './ShipmentStatus';
import SeedList from './SeedList';
import Cart from './Cart';
import Home from './UserHomePage';

const App = () => {
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (seed) => {
    setCartItems((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === seed.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === seed.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...seed, quantity: 1 }];
      }
    });
  };

  const handleUpdateCart = (id, quantity) => {
    setCartItems((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleRemoveFromCart = (id) => {
    setCartItems((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  return (
    <>
      <Navbar />
      <div className="">
        <Sidebar />
        <div className="bg-gray-200 h-screen w-full p-4">
          <Routes>
            <Route
              path="/"
              element={<SeedList onAddToCart={handleAddToCart} />}
            />
            <Route
              path="/cart"
              element={
                <Cart
                  cartItems={cartItems}
                  onUpdateCart={handleUpdateCart}
                  onRemoveFromCart={handleRemoveFromCart}
                />
              }
            />
            <Route path="/orderstatus" element={<OrderStatus />} />
            <Route path="/shipmentstatus" element={<ShipmentStatus />} />
          </Routes>
        </div>
      </div>
      </>
  );
};

export default App;
