import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  PieChart, Pie, Cell, ResponsiveContainer 
} from 'recharts';
import { 
  Package, Leaf, Warehouse, Droplet, Archive, Truck, Filter 
} from 'lucide-react';
import { useNavigate } from 'react-router';

// Dummy data - in a real application, this would come from an API or database
const dummyInventoryData = [
  { name: 'Corn Seeds', total: 5000, processed: 3500, packaged: 2800 },
  { name: 'Wheat Seeds', total: 4200, processed: 3200, packaged: 2500 },
  { name: 'Soybean Seeds', total: 3800, processed: 2900, packaged: 2200 },
];

const dummyWarehouseStatus = [
  { name: 'Storage Space', value: 65 },
  { name: 'Available Space', value: 35 }
];

const COLORS = ['#2ecc71', '#27ae60', '#3498db', '#1abc9c'];

const Home = () => {
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [inventoryData, setInventoryData] = useState(dummyInventoryData);
  const [warehouseStatus, setWarehouseStatus] = useState(dummyWarehouseStatus);

  useEffect(() => {
    const fetchDashboardData = async () => {
        try {
            const res = await fetch('/api/warehousedashboard', {
                method: 'GET',
                credentials: 'include', // Include cookies in the request
            });

            if (res.status === 401) {
                // If unauthorized, redirect to login
                navigate('/warehouselogin');
            } else if (res.ok) {
                const result = await res.json();
                setData(result);
            } else {
                throw new Error('Failed to fetch dashboard data');
            }
        } catch (err) {
            console.error(err);
            setError('An error occurred while fetching the dashboard data.');
        }
    };

    fetchDashboardData();
}, [navigate]);

  return (
    <div className="p-4 bg-white ml-[15%] mt-[-15%]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
        {/* Warehouse Capacity */}
        <div className="bg-green-50 shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Archive className="mr-2 text-green-600" /> Warehouse Capacity
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={warehouseStatus}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#2ecc71"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {warehouseStatus.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Quick Stats */}
        <div className="bg-green-50 shadow-lg rounded-lg p-6 grid grid-cols-2 gap-4">
          <div className="flex items-center bg-white p-4 rounded border border-green-200">
            <Package className="mr-3 text-green-600" />
            <div>
              <p className="font-bold text-lg">12,500</p>
              <p className="text-sm text-gray-600">Total Seeds</p>
            </div>
          </div>
          <div className="flex items-center bg-white p-4 rounded border border-green-200">
            <Droplet className="mr-3 text-green-600" />
            <div>
              <p className="font-bold text-lg">9,600</p>
              <p className="text-sm text-gray-600">Processed Seeds</p>
            </div>
          </div>
          <div className="flex items-center bg-white p-4 rounded border border-green-200">
            <Truck className="mr-3 text-green-600" />
            <div>
              <p className="font-bold text-lg">7,800</p>
              <p className="text-sm text-gray-600">Packaged Seeds</p>
            </div>
          </div>
          <div className="flex items-center bg-white p-4 rounded border border-green-200">
            <Filter className="mr-3 text-green-600" />
            <div>
              <p className="font-bold text-lg">2,900</p>
              <p className="text-sm text-gray-600">Pending Sorting</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Log */}
      <div className="mt-6 bg-green-50 shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-green-800">Recent Activity</h2>
        <div className="space-y-2">
          <div className="flex justify-between border-b border-green-200 pb-2">
            <span>Corn Seeds Batch #2154 - Processed</span>
            <span className="text-sm text-gray-600">2 hours ago</span>
          </div>
          <div className="flex justify-between border-b border-green-200 pb-2">
            <span>Wheat Seeds Batch #1876 - Packaged</span>
            <span className="text-sm text-gray-600">4 hours ago</span>
          </div>
          <div className="flex justify-between border-b border-green-200 pb-2">
            <span>Soybean Seeds Batch #2045 - Sorting Started</span>
            <span className="text-sm text-gray-600">6 hours ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;