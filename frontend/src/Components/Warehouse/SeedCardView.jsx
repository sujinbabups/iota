import React from 'react'
import { MapPin,Leaf,DollarSign,Phone,Weight,Thermometer,CalendarDays } from 'lucide-react';
import { FaTemperatureLow } from "react-icons/fa";

const SeedCardView = ({onEdit,seed,onDelete}) => {

  const formatDate = (isoDate,) => {
  const date = new Date(isoDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

    
  return (
    
    <>
    
    <div className="relative mb-4">
      <div className="absolute top-2 right-2 flex space-x-2">
        <button
          onClick={onEdit}
          className="text-blue-500 hover:text-blue-700 transition-colors bg-white rounded-full p-1 shadow-md"
          title="Edit Seed"
        >
          ✎
        </button>
        <button
          onClick={() => onDelete(seed._id)}
          className="text-red-500 hover:text-red-700 transition-colors bg-white rounded-full p-1 shadow-md"
          title="Delete Seed"
        >
          ✖
        </button>
      </div>
      
      <div className="w-[40%] max-w-full">
      <img
          src={`http://localhost:5000/uploads/${seed.seedImage}`}
          onError={(e) => {
            e.target.src =
              '';
          }}
          alt={seed.seedName || 'Seed Image'}
          className="rounded-2xl border-solid aspect-square border-[5px] border-stone-50"
        />
      </div>

      <h3 className="mt-4 text-center text-xl font-bold text-green-700">{seed.seedName}</h3>
    </div>
    <h3 className="mt-4 text-left text-lg text-green-700">{seed.seedType}</h3>

    <div className="space-y-3">
      <div className="flex items-center text-gray-700">
        <MapPin className="mr-2 text-green-600 w-5 h-5" />
        <span>{seed.fLocation}</span>
      </div>
      <div className="flex items-center text-gray-700">
        <Leaf className="mr-2 text-green-600 w-5 h-5" />
        <span>{seed.farmerName}</span>
      </div>
      <div className="flex items-center text-gray-700">
        <Phone className="mr-2 text-green-600 w-5 h-5" />
        <span>{seed.fContact}</span>
      </div>
      <div className="flex items-center text-gray-700">
        <DollarSign className="mr-2 text-green-600 w-5 h-5" />
        <span>Price: ₹{seed.seedPrice}</span>
      </div>
      <div className="flex items-center text-gray-700">
        <Weight className="mr-2 text-green-600 w-5 h-5" />
        <span>Quantity: {seed.seedQuantity}</span>
      </div>
      <div className="flex items-center text-gray-700">
        <CalendarDays className="mr-2 text-green-600 w-5 h-5" />
        <span>Expiry: {formatDate(seed.seedExpiryDate)}</span>
      </div>
      <div className="flex items-center text-gray-700">
        <Thermometer className="mr-2 text-green-600 w-5 h-5" />
        <span>Temp Range: {seed.seedMinTemperature}°C - {seed.seedMaxTemperature}°C</span>
      </div>
      <div className="flex items-center text-gray-700">
        <FaTemperatureLow className="mr-2 text-green-600 w-5 h-5" />
        <span>Current Temperature: {seed.seedMinTemperature+5}°C</span>
      </div>
    </div>
  </>
  )
}

export default SeedCardView
