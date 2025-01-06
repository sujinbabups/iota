import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Clock from './Clock';

const mapContainerStyle = {
  width: '100%',
  height: '300px',
};

const center = {
  lat: 37.7749,
  lng: -122.4194,
};

const statistics = [
  { title: 'Total Vehicles', count: 120, bgColor: 'bg-blue-100', textColor: 'text-blue-600', borderColor: 'border-blue-300' },
  { title: 'In Progress', count: 32, bgColor: 'bg-green-100', textColor: 'text-green-600', borderColor: 'border-green-300' },
  { title: 'Completed', count: 85, bgColor: 'bg-yellow-100', textColor: 'text-yellow-600', borderColor: 'border-yellow-300' },
  { title: 'Pending', count: 18, bgColor: 'bg-red-100', textColor: 'text-red-600', borderColor: 'border-red-300' },
];

const Home = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="w-full max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">

        {/* Clock Component */}
        <div className="mb-6">
          <Clock />
        </div>

        {/* Statistics Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
          {statistics.map(({ title, count, bgColor, textColor, borderColor }) => (
            <div key={title} className={`${bgColor} ${borderColor} rounded-lg p-4 shadow-lg`}>
              <h2 className={`text-sm font-medium ${textColor}`}>{title}</h2>
              <p className={`text-xl font-semibold ${textColor.replace('600', '900')}`}>{count}</p>
            </div>
          ))}
        </div>

        {/* Google Map Section */}
        <div>
          <h2 className="text-lg font-medium text-gray-800 mb-4">Live Tracking</h2>
          <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={center}
              zoom={12}
            >
              <Marker position={center} />
            </GoogleMap>
          </LoadScript>
        </div>
      </div>a
    </div>
  );
};

export default Home;
