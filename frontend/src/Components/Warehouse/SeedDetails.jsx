import React from 'react';
import { MapPin, Leaf, Phone, DollarSign, CalendarDays, Weight, Thermometer } from 'lucide-react';

const SeedDetails = ({ seed, onEdit, onDelete }) => {
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  return (
    <div>
      <div className="relative mb-4">
        <div className="absolute top-2 right-2 flex space-x-2">
          <button onClick={onEdit} className="text-blue-500 hover:text-blue-700">✎</button>
          <button onClick={() => onDelete(seed._id)} className="text-red-500 hover:text-red-700">✖</button>
        </div>
        <img
          src={`http://localhost:5000/uploads/${seed.seedImage}`}
          alt={seed.seedName || 'Seed Image'}
          onError={(e) => (e.target.src = 'fallback-url')}
          className="rounded-2xl"
        />
        <h3 className="text-xl">{seed.seedName}</h3>
      </div>
      <div className="details">
        <div><MapPin /> {seed.fLocation}</div>
        <div><Leaf /> {seed.farmerName}</div>
        <div><Phone /> {seed.fContact}</div>
        <div><DollarSign /> Price: ₹{seed.seedPrice}</div>
        <div><Weight /> Quantity: {seed.seedQuantity}kg</div>
        <div><CalendarDays /> Expiry: {formatDate(seed.seedExpiryDate)}</div>
        <div><Thermometer /> Temp Range: {seed.seedMinTemperature}°C - {seed.seedMaxTemperature}°C</div>
      </div>
    </div>
  );
};

export default SeedDetails;
