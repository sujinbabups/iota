import React, { useState, useEffect } from 'react';
import { FaLeaf, FaBoxOpen, FaTruck, FaCheckCircle } from 'react-icons/fa';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  PieChart, Pie, Cell, ResponsiveContainer 
} from 'recharts';
import { 
  Package, Leaf, Warehouse, Droplet, Archive, Truck, Filter 
} from 'lucide-react';
import { useNavigate } from 'react-router';



const COLORS = ['#2ecc71', '#27ae60', '#3498db', '#1abc9c'];

const Home = () => {
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [activities, setActivities] = useState([]);
  const [seedTypes, setTypes] = useState([]);
  const [totalSeed,setTotalSeeds]=useState([]);
  const [seedDistribution, setSeedDistribution] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);



  useEffect(() => {
    const fetchDashboardData = async () => {
        try {
            const res = await fetch('/api/warehousedashboard', {
                method: 'GET',
                credentials: 'include', 
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

    const fetchActivities = async () => {
      try {
        const response = await fetch('/api/recentActivities'); 
        if (!response.ok) {
          throw new Error('Failed to fetch recent activities');
        }
        const data = await response.json();
        setActivities(data);
      } catch (error) {
        console.error(error.message);
        alert('Failed to load recent activities. Please try again later.');
      }
    };
     const fetchSeedsTypes = async () => {
      try {
        const response = await fetch('/api/seedTypes');
        if (!response.ok) {
          throw new Error('Failed to fetch seed types count');
        }
        const data = await response.json();
        console.log("API response:", data);
    
        // Set the total seed types
        setTypes([{ name: "Seed Types", value: data.seedTypesCount }]);
      } catch (error) {
        console.error(error.message);
      }
    };
    
    const fetchSeedDistribution = async () => {
      try {
        const response = await fetch('/api/seedDistribution');
        if (!response.ok) {
          throw new Error('Failed to fetch seed distribution');
        }
        const data = await response.json();
        console.log("Seed Distribution Response:", data);
  
        setSeedDistribution(data);
      } catch (error) {
        console.error(error.message);
        setError('An error occurred while fetching the seed distribution.');
      }
    };

    const fetchTotalOrders = async () => {
      try {
        const response = await fetch('/api/total-orders'); 
        const data = await response.json(); 
        console.log("order count", data); 
        setTotalOrders(data.totalOrders); 
      } catch (error) {
        console.error('Error fetching total orders:', error);
      }
    };
    
    

    fetchDashboardData();
    fetchActivities();
    fetchSeedsTypes();
    fetchSeedDistribution();
    fetchTotalOrders();

    
},[navigate]);


  return (
    <div className="p-4 bg-white ml-[15%] mt-[-15%]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
      <div className="bg-green-50 shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Archive className="mr-2 text-green-600" /> Seed Distribution
          </h2>
          {seedDistribution.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={seedDistribution}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
              
              labelLine={false}
            >
              {seedDistribution.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        ) : (
          <p className="text-center text-gray-600">No seed distribution data available.</p>
        )}


        </div>


        {/* Quick Stats */}
        <div className="bg-green-50 shadow-lg rounded-lg p-6 grid grid-cols-2 gap-4">
  {/* Seed Types */}
  <div className="flex items-center bg-white p-4 rounded border border-green-200">
    <FaLeaf className="mr-3 text-green-600 text-xl" />
    <div>
      <p className="font-bold text-lg">
        {seedTypes[0]?.value}
      </p>
      <p className="text-lg text-gray-600">Seed Types</p>
    </div>
  </div>

  {/* Orders */}
  <div className="flex items-center bg-white p-4 rounded border border-green-200">
    <FaBoxOpen className="mr-3 text-green-600 text-xl" />
    <div>
      <p className="font-bold text-lg">{totalOrders}</p>
      <p className="text-lg text-gray-600">Orders</p>
    </div>
  </div>

  {/* Transporters */}
  <div className="flex items-center bg-white p-4 rounded border border-green-200">
    <FaTruck className="mr-3 text-green-600 text-xl" />
    <div>
      <p className="font-bold text-lg">10</p>
      <p className="text-lg text-gray-600">Transporters</p>
    </div>
  </div>

  {/* Successful Deliveries */}
  <div className="flex items-center bg-white p-4 rounded border border-green-200">
    <FaCheckCircle className="mr-3 text-green-600 text-xl" />
    <div>
      <p className="font-bold text-lg">1000</p>
      <p className="text-lg text-gray-600">Successful Deliveries</p>
    </div>
  </div>
</div>
      </div>

      <div className="mt-6 bg-green-50 shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4 text-green-800">Recent Activity</h2>
      <div className="space-y-2">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="flex justify-between border-b border-green-200 pb-2"
          >
            <span>{activity.activity}</span>
            <span className="text-sm text-gray-600">
              {new Date(activity.time).toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Home;