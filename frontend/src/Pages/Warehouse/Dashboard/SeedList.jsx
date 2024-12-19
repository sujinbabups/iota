import React, { useState } from 'react';
import { Thermometer, MapPin, Phone, CalendarDays, Leaf, DollarSign, Edit, Save, X,Weight } from 'lucide-react';

// Sample initial seed data
const initialSeeds = [
  {
    id: 1,
    seedName: 'Wheat Variety A',
    price: 150,
    quantity:100,
    expiryDate: '2025-12-31',
    farmerName: 'John Doe',
    location: 'Punjab, India',
    contact: '+91 9876543210',
    minTemperature: 15,
    maxTemperature: 28
  },
  {
    id: 2,
    seedName: 'Corn Hybrid X',
    price: 200,
    quantity:120,
    expiryDate: '2024-06-30',
    farmerName: 'Sarah Smith',
    location: 'Maharashtra, India',
    contact: '+91 8765432109',
    minTemperature: 18,
    maxTemperature: 32
  },
  {
    id: 3,
    seedName: 'Rice Premium',
    price: 180,
    quantity:15,
    expiryDate: '2025-05-15',
    farmerName: 'Rajesh Kumar',
    location: 'Tamil Nadu, India',
    contact: '+91 7654321098',
    minTemperature: 20,
    maxTemperature: 35
  }
];

const SeedCard = ({ seed, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedSeed, setEditedSeed] = useState({ ...seed });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedSeed(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    onUpdate(editedSeed);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedSeed({ ...seed });
    setIsEditing(false);
  };

  const renderViewMode = () => (
    <>
      <div className="flex justify-between items-center mb-4 ">
        <h3 className="text-xl font-bold text-green-700">{seed.seedName}</h3>
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setIsEditing(true)}
            className="text-blue-500 hover:text-blue-700 transition-colors"
            title="Edit Seed"
          >
            <Edit className="w-5 h-5" />
          </button>
          <button 
            onClick={() => onDelete(seed.id)}
            className="text-red-500 hover:text-red-700 transition-colors"
            title="Delete Seed"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>


      <div className="space-y-3">
        <div className="flex items-center text-gray-700">
          <MapPin className="mr-2 text-green-600 w-5 h-5" />
          <span>{seed.location}</span>
        </div>
        
        <div className="flex items-center text-gray-700">
          <Leaf className="mr-2 text-green-600 w-5 h-5" />
          <span>{seed.farmerName}</span>
        </div>
        
        <div className="flex items-center text-gray-700">
          <Phone className="mr-2 text-green-600 w-5 h-5" />
          <span>{seed.contact}</span>
        </div>
        
        <div className="flex items-center text-gray-700">
          <DollarSign className="mr-2 text-green-600 w-5 h-5" />
          <span>Price: ₹{seed.price}</span>
        </div>

        <div className="flex items-center text-gray-700">
          <Weight className="mr-2 text-green-600 w-5 h-5" />
          <span>Quantity: ₹{seed.quantity}</span>
        </div>
        
        <div className="flex items-center text-gray-700">
          <CalendarDays className="mr-2 text-green-600 w-5 h-5" />
          <span>Expiry: {seed.expiryDate}</span>
        </div>
        
        <div className="flex items-center text-gray-700">
          <Thermometer className="mr-2 text-green-600 w-5 h-5" />
          <span>Temp Range: {seed.minTemperature}°C - {seed.maxTemperature}°C</span>
        </div>
      </div>
    </>
  );

  const renderEditMode = () => (
    <form onSubmit={(e) => {
      e.preventDefault();
      handleSave();
    }} className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          name="seedName"
          value={editedSeed.seedName}
          onChange={handleInputChange}
          className="text-xl font-bold text-green-700 w-full border-b border-green-500 focus:outline-none"
          required
        />
        <div className="flex items-center space-x-2">
          <button 
            type="submit"
            className="text-green-500 hover:text-green-700 transition-colors"
            title="Save Changes"
          >
            <Save className="w-5 h-5" />
          </button>
          <button 
            type="button"
            onClick={handleCancel}
            className="text-red-500 hover:text-red-700 transition-colors"
            title="Cancel Edit"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center text-gray-700">
          <MapPin className="mr-2 text-green-600 w-5 h-5" />
          <input
            type="text"
            name="location"
            value={editedSeed.location}
            onChange={handleInputChange}
            className="w-full border-b border-green-500 focus:outline-none"
            required
          />
        </div>
        
        <div className="flex items-center text-gray-700">
          <Leaf className="mr-2 text-green-600 w-5 h-5" />
          <input
            type="text"
            name="farmerName"
            value={editedSeed.farmerName}
            onChange={handleInputChange}
            className="w-full border-b border-green-500 focus:outline-none"
            required
          />
        </div>
        
        <div className="flex items-center text-gray-700">
          <Phone className="mr-2 text-green-600 w-5 h-5" />
          <input
            type="tel"
            name="contact"
            value={editedSeed.contact}
            onChange={handleInputChange}
            className="w-full border-b border-green-500 focus:outline-none"
            required
          />
        </div>
        
        <div className="flex items-center text-gray-700">
          <DollarSign className="mr-2 text-green-600 w-5 h-5" />
          <input
            type="number"
            name="price"
            value={editedSeed.price}
            onChange={handleInputChange}
            className="w-full border-b border-green-500 focus:outline-none"
            required
          />
        </div>

        <div className="flex items-center text-gray-700">
          <DollarSign className="mr-2 text-green-600 w-5 h-5" />
          <input
            type="number"
            name="price"
            value={editedSeed.quantity}
            onChange={handleInputChange}
            className="w-full border-b border-green-500 focus:outline-none"
            required
          />
        </div>
        
        <div className="flex items-center text-gray-700">
          <CalendarDays className="mr-2 text-green-600 w-5 h-5" />
          <input
            type="date"
            name="expiryDate"
            value={editedSeed.expiryDate}
            onChange={handleInputChange}
            className="w-full border-b border-green-500 focus:outline-none"
            required
          />
        </div>
        
        <div className="flex items-center text-gray-700">
          <Thermometer className="mr-2 text-green-600 w-5 h-5" />
          <div className="flex space-x-2 w-full">
            <input
              type="number"
              name="minTemperature"
              value={editedSeed.minTemperature}
              onChange={handleInputChange}
              className="w-1/2 border-b border-green-500 focus:outline-none"
              required
            />
            <span>°C -</span>
            <input
              type="number"
              name="maxTemperature"
              value={editedSeed.maxTemperature}
              onChange={handleInputChange}
              className="w-1/2 border-b border-green-500 focus:outline-none"
              required
            />
            <span>°C</span>
          </div>
        </div>
      </div>
    </form>
  );

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300 ">
      {isEditing ? renderEditMode() : renderViewMode()}
    </div>
  );
};

const SeedDisplay = () => {
  const [seeds, setSeeds] = useState(initialSeeds);

  const handleDeleteSeed = (id) => {
    setSeeds(prevSeeds => prevSeeds.filter(seed => seed.id !== id));
  };

  const handleUpdateSeed = (updatedSeed) => {
    setSeeds(prevSeeds => 
      prevSeeds.map(seed => 
        seed.id === updatedSeed.id ? updatedSeed : seed
      )
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 ml-[15%] mt-[-15%] ">
      <h2 className="text-3xl font-bold text-center mb-8 text-green-800">Registered Seeds</h2>
      
      {seeds.length === 0 ? (
        <div className="text-center text-gray-500 text-xl">
          No seeds registered yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {seeds.map(seed => (
            <SeedCard
              key={seed.id} 
              seed={seed} 
              onDelete={handleDeleteSeed}
              onUpdate={handleUpdateSeed}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SeedDisplay;