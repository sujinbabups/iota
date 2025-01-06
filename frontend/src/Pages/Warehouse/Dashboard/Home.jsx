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
  const [totalSeed, setTotalSeeds] = useState([]);
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
        if (!response.ok) throw new Error('Failed to fetch recent activities');
        const data = await response.json();
        setActivities(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    const fetchSeedsTypes = async () => {
      try {
        const response = await fetch('/api/seedTypes');
        if (!response.ok) throw new Error('Failed to fetch seed types count');
        const data = await response.json();
        setTypes([{ name: "Seed Types", value: data.seedTypesCount }]);
      } catch (error) {
        console.error(error.message);
      }
    };
    
    const fetchSeedDistribution = async () => {
      try {
        const response = await fetch('/api/seedDistribution');
        if (!response.ok) throw new Error('Failed to fetch seed distribution');
        const data = await response.json();
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
  }, [navigate]);

  const StatCard = ({ icon: Icon, value, label }) => (
    <div className="flex items-center bg-white p-4 rounded border border-green-200">
      <Icon className="mr-3 text-green-600 text-xl flex-shrink-0" />
      <div className="min-w-0">
        <p className="font-bold text-lg truncate">{value}</p>
        <p className="text-sm md:text-lg text-gray-600 truncate">{label}</p>
      </div>
    </div>
  );

  return (
    <div className="p-2 sm:p-4 bg-white w-full max-w-7xl mx-auto mt-4 md:mt-0">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <div className="bg-green-50 shadow-lg rounded-lg p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-semibold mb-4 flex items-center">
            <Archive className="mr-2 text-green-600" /> Seed Distribution
          </h2>
          {seedDistribution.length > 0 ? (
            <div className="h-[250px] md:h-[300px] w-full">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={seedDistribution}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius="80%"
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
            </div>
          ) : (
            <p className="text-center text-gray-600">No seed distribution data available.</p>
          )}
        </div>

        <div className="bg-green-50 shadow-lg rounded-lg p-4 md:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <StatCard 
              icon={FaLeaf} 
              value={seedTypes[0]?.value} 
              label="Seed Types" 
            />
            <StatCard 
              icon={FaBoxOpen} 
              value={totalOrders} 
              label="Orders" 
            />
            <StatCard 
              icon={FaTruck} 
              value={10} 
              label="Transporters" 
            />
            <StatCard 
              icon={FaCheckCircle} 
              value={1000} 
              label="Successful Deliveries" 
            />
          </div>
        </div>
      </div>

      <div className="mt-4 md:mt-6 bg-green-50 shadow-lg rounded-lg p-4 md:p-6">
        <h2 className="text-lg md:text-xl font-semibold mb-4 text-green-800">Recent Activity</h2>
        <div className="space-y-2 max-h-[300px] overflow-y-auto">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row sm:justify-between border-b border-green-200 pb-2"
            >
              <span className="text-sm md:text-base break-words">{activity.activity}</span>
              <span className="text-xs md:text-sm text-gray-600 mt-1 sm:mt-0">
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