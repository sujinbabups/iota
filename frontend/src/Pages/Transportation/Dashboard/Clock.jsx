import React, { useState, useEffect } from 'react';

const Clock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isDaytime, setIsDaytime] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      const hours = now.getHours();
      setIsDaytime(hours >= 6 && hours < 18); // Daytime from 6 AM to 6 PM
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const DayIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className="w-12 h-12 fill-yellow-400">
      <circle cx="32" cy="32" r="12" />
      <line x1="32" y1="4" x2="32" y2="16" stroke="yellow" strokeWidth="2" />
      <line x1="32" y1="4" x2="40" y2="10" stroke="yellow" strokeWidth="2" />
      <line x1="32" y1="4" x2="24" y2="10" stroke="yellow" strokeWidth="2" />
      <line x1="32" y1="32" x2="32" y2="24" stroke="yellow" strokeWidth="2" />
      {/* Add more elements for sun rays */}
    </svg>
  );

  const NightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className="w-12 h-12 fill-gray-400">
      <path d="M32 16a16 16 0 1 0 0 32 16 16 0 0 1 0-32z" />
    </svg>
  );

  return (
    <div
      className={`rounded-lg p-6 shadow-sm text-center transition-all duration-300 ${
        isDaytime ? 'bg-blue-100 text-gray-800' : 'bg-gray-800 text-white'
      } border border-gray-300`}
    >
      <div className="flex justify-center items-center mb-4">
        {isDaytime ? <DayIcon /> : <NightIcon />}
      </div>
      <h2 className="text-sm font-medium">{isDaytime ? 'Good Morning/Afternoon' : 'Good Evening/Night'}</h2>
      <p className="text-2xl font-semibold">{currentTime.toLocaleTimeString()}</p>
    </div>
  );
};

export default Clock;
