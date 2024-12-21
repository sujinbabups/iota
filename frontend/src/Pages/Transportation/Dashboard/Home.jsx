import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router';

const Home = () => {
  const navigate=useNavigate()
  
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
      const fetchDashboardData = async () => {
          try {
              const res = await fetch('/api/transporterdashboard', {
                  method: 'GET',
                  credentials: 'include', 
              });
  
              if (res.status === 401) {
                  // If unauthorized, redirect to login
                  navigate('/transportationlogin');
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
    <div>Home</div>
  )
}

export default Home