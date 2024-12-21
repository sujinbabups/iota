import React, { useState } from 'react';

const AddSeed = () => {
  const [formData, setFormData] = useState({
    seedName: '',
    price: '',
    quantity:'',
    expiryDate: '',
    farmerName: '',
    location: '',
    contact: '',
    minTemperature: '',
    maxTemperature: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to a backend service
    console.log('Seed Registration Submitted:', formData);
    alert('Seed Registration Submitted!');
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg ml-[30%] mt-[-10%]">
      <h2 className="text-2xl font-bold mb-6 text-center text-green-700">Seed Registration Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Seed Details Section */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label htmlFor="seedName" className="block text-gray-700 font-semibold mb-2">
              Seed Name
            </label>
            <input
              type="text"
              id="seedName"
              name="seedName"
              value={formData.seedName}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter seed name"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="price" className="block text-gray-700 font-semibold mb-2">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter seed price"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="quantity" className="block text-gray-700 font-semibold mb-2">
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter seed quantity"
            />
          </div>

        <div className="mb-4">
          <label htmlFor="expiryDate" className="block text-gray-700 font-semibold mb-2">
            Expiry Date
          </label>
          <input
            type="date"
            id="expiryDate"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="mb-4">
            <label htmlFor="seedImage" className="block text-gray-700 font-semibold mb-2">
              Seed Image
            </label>
            <input
              type="file"
              id="seedImage"
              name="seedImage"
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
    </div>


        {/* Farmer Details Section */}
        <div className="grid md:grid-cols-2 gap-4">
        <h3 className='font-semibold'>Farmer Details</h3> <br />

          <div className="mb-4">
            <label htmlFor="farmerName" className="block text-gray-700 font-semibold mb-2">
              Farmer Name
            </label>
            <input
              type="text"
              id="farmerName"
              name="farmerName"
              value={formData.farmerName}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter farmer's name"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="location" className="block text-gray-700 font-semibold mb-2">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter farm location"
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="contact" className="block text-gray-700 font-semibold mb-2">
            Contact Number
          </label>
          <input
            type="tel"
            id="contact"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter contact number"
          />
        </div>

        {/* Temperature Details Section */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label htmlFor="minTemperature" className="block text-gray-700 font-semibold mb-2">
              Minimum Temperature
            </label>
            <div className="flex items-center">
              <input
                type="number"
                id="minTemperature"
                name="minTemperature"
                value={formData.minTemperature}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Min temp (°C)"
              />
              <span className="ml-2 text-gray-600">°C</span>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="maxTemperature" className="block text-gray-700 font-semibold mb-2">
              Maximum Temperature
            </label>
            <div className="flex items-center">
              <input
                type="number"
                id="maxTemperature"
                name="maxTemperature"
                value={formData.maxTemperature}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Max temp (°C)"
              />
              <span className="ml-2 text-gray-600">°C</span>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center mt-6">
          <button
            type="submit"
            className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            Register Seed
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSeed;