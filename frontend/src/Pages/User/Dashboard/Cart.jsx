import React, { useState, useEffect } from 'react';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/getCart', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch cart items.');
        }

        const data = await response.json();
        setCartItems(data.cartItems.map((item) => ({ ...item, count: 1 })));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const handleQuantityChange = (id, change) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id
          ? {
              ...item,
              count: Math.max(
                1,
                Math.min(item.seedQuantity, item.count + change)
              ),
            }
          : item
      )
    );
  };

  const handleSaveOrder = async () => {
    try {
      const userId = localStorage.getItem('userId'); // Assuming `userId` is stored in localStorage.
      if (!userId) {
        alert('User not authenticated. Please log in.');
        return;
      }

      const orderData = {
        userId,
        items: cartItems.map((item) => ({
          seedId: item._id,
          seedName: item.seedName,
          seedType: item.seedType,
          seedPrice: item.seedPrice,
          seedQuantity: item.count,
          availableStock: item.seedQuantity,
          currentTemperature: item.seedTemperature,
        })),
      };

      const response = await fetch('/api/saveOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error('Failed to save order.');
      }

      const result = await response.json();
      alert('Order saved successfully!');
      console.log('Order saved:', result);
    } catch (err) {
      console.error('Error saving order:', err);
      alert('Failed to save order.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.count * item.seedPrice,
    0
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-xl font-bold text-gray-900">My Cart</h1>
            <a href="/" className="text-indigo-600 hover:text-indigo-800">
              Back to Shop
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white shadow rounded-lg p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Items in Your Cart
              </h2>
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between border-b border-gray-200 pb-4 mb-4"
                >
                  <div className="flex items-center">
                    <img
                      src={`/api/uploads/${item.seedImage}`}
                      onError={(e) => {
                        e.target.src =
                          'https://imgs.search.brave.com/7pvnFHMXv_vlLrZ5u4kNWUZKT7CVutxiVoUa1rtPmD4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA5LzAyLzIwLzEy/LzM2MF9GXzkwMjIw/MTI2Ml9zYldESlJG/anRaeDZzdGRIVmgz/RDUyeTUyRDFIU0NS/aC5qcGc';
                      }}
                      alt={item.seedName || 'Seed Image'}
                      className="w-[150px] rounded-2xl border-solid aspect-square border-[5px] border-stone-50"
                    />
                    <div className="ml-4">
                      <h3 className="text-2xl font-medium text-gray-900">
                        {item.seedName}
                      </h3>
                      <p className="text-sm text-gray-500">{item.seedType}</p>
                      <div className="text-red-500 mt-6">
                        Available stocks: {item.seedQuantity}
                      </div>
                      <div className="text-green-500">
                        Current Temperature: {item.seedTemperature}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center">
                      <button
                        onClick={() => handleQuantityChange(item._id, -1)}
                        className="px-2 py-1 bg-gray-200 rounded-md text-gray-700 hover:bg-gray-300"
                        disabled={item.count === 1}
                      >
                        -
                      </button>
                      <span className="px-4">{item.count}</span>
                      <button
                        onClick={() => handleQuantityChange(item._id, 1)}
                        className="px-2 py-1 bg-gray-200 rounded-md text-gray-700 hover:bg-gray-300"
                        disabled={item.count >= item.seedQuantity}
                      >
                        +
                      </button>
                    </div>
                    <p className="text-sm text-gray-900 font-medium mt-2">
                      ${item.count * item.seedPrice}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="bg-white shadow rounded-lg p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Order Summary
              </h2>
              <div className="flex justify-between text-sm text-gray-900">
                <p>Subtotal</p>
                <p>${subtotal.toFixed(2)}</p>
              </div>
              <button
                onClick={handleSaveOrder}
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg mt-4 hover:bg-indigo-700"
              >
                Save Order
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CartPage;
