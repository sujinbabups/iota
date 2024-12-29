import React from 'react';
import { Save, X, MapPin, Leaf, Phone, DollarSign, Weight, CalendarDays, Thermometer } from 'lucide-react';

const SeedEditForm = ({ editedSeed, handleInputChange, handleSave, handleCancel, formatDate }) => {

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSave();
      }}
      className="space-y-4"
    >
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

      <div className="mb-4">
            <label htmlFor="seedType" className="block text-gray-700 font-semibold mb-2">
              Seed Type
            </label>
            <select
              id="seedType"
              name="seedType"
              value={editedSeed.seedType}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="" disabled>Select seed type</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Heirloom">Heirloom</option>
              <option value="Genetically Modified">Genetically Modified</option>
              <option value="Cereal">Cereal</option>
              <option value="Oil">Oil</option>
              <option value="Vegetable">Vegetable</option>
              <option value="Fruit">Fruit</option>
              <option value="Fodder">Fodder</option>
              <option value="Monocot">Monocot</option>
              <option value="Dicot">Dicot</option>
              <option value="Kharif">Kharif</option>
              <option value="Rabi">Rabi</option>
              <option value="Zaid">Zaid</option>
              <option value="Organic">Organic</option>
              <option value="Treated">Treated</option>
              <option value="Biofortified">Biofortified</option>
              <option value="Fast-Germinating">Fast-Germinating</option>
              <option value="Slow-Germinating">Slow-Germinating</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="seedImage" className="block text-gray-700 font-semibold mb-2">
              Seed Image
            </label>
            <input
              type="file"
              id="seedImage"
              name="seedImage"
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

      <div className="space-y-3">
        <div className="flex items-center text-gray-700">
          <MapPin className="mr-2 text-green-600 w-5 h-5" />
          <input
            type="text"
            name="fLocation"
            value={editedSeed.fLocation}
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
            name="fContact"
            value={editedSeed.fContact}
            onChange={handleInputChange}
            className="w-full border-b border-green-500 focus:outline-none"
            required
          />
        </div>
        <div className="flex items-center text-gray-700">
          <DollarSign className="mr-2 text-green-600 w-5 h-5" />
          <input
            type="number"
            name="seedPrice"
            value={editedSeed.seedPrice}
            onChange={handleInputChange}
            className="w-full border-b border-green-500 focus:outline-none"
            required
          />
        </div>
        <div className="flex items-center text-gray-700">
          <Weight className="mr-2 text-green-600 w-5 h-5" />
          <input
            type="number"
            name="seedQuantity"
            value={editedSeed.seedQuantity}
            onChange={handleInputChange}
            className="w-full border-b border-green-500 focus:outline-none"
            required
          />
        </div>
        <div className="flex items-center text-gray-700">
          <CalendarDays className="mr-2 text-green-600 w-5 h-5" />
          <input
            type="date"
            name="seedExpiryDate"
            value={formatDate(editedSeed.seedExpiryDate)}
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
              name="seedMinTemperature"
              value={editedSeed.seedMinTemperature}
              onChange={handleInputChange}
              className="w-1/2 border-b border-green-500 focus:outline-none"
              required
            />
            <span>°C -</span>
            <input
              type="number"
              name="seedMaxTemperature"
              value={editedSeed.seedMaxTemperature}
              onChange={handleInputChange}
              className="w-1/2 border-b border-green-500 focus:outline-none"
              required
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default SeedEditForm;
