import React, { useState } from "react";

const AddSeed = () => {
  const [formData, setFormData] = useState({
    seedName: "",
    seedType: "",
    seedPrice: "",
    seedQuantity: "",
    seedExpiryDate: "",
    farmerName: "",
    fLocation: "",
    fContact: "",
    seedMinTemperature: "",
    seedMaxTemperature: "",
  });

  const [seedImage, setSeedImage] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setSeedImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });
  
    if (seedImage) {
      data.append("seedImage", seedImage);
    }
  
    try {
      const response = await fetch("/api/addSeed", { 
        method: "POST",
        body: data,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`, 
        },
      });
  
      if (response.ok) {
        const result = await response.json();
        alert("Seed registered successfully!");
        console.log(result);
      } else {
        console.error("Error:", await response.text());
        alert("Error registering seed. Please try again.");
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("A network error occurred. Please try again.");
    }
  };
  

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg ml-[30%] mt-[-10%]">
      <h2 className="text-2xl font-bold mb-6 text-center text-green-700">Seed Registration Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          {/* Seed Name */}
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
          {/* Seed Type */}
          <div className="mb-4">
            <label htmlFor="seedType" className="block text-gray-700 font-semibold mb-2">
              Seed Type
            </label>
            <select
              id="seedType"
              name="seedType"
              value={formData.seedType}
              onChange={handleChange}
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

          {/* Price */}
          <div className="mb-4">
            <label htmlFor="seedPrice" className="block text-gray-700 font-semibold mb-2">
              Price
            </label>
            <input
              type="number"
              id="seedPrice"
              name="seedPrice"
              value={formData.seedPrice}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter seed price"
            />
          </div>

          {/* Quantity */}
          <div className="mb-4">
            <label htmlFor="seedQuantity" className="block text-gray-700 font-semibold mb-2">
              Quantity
            </label>
            <input
              type="number"
              id="seedQuantity"
              name="seedQuantity"
              value={formData.seedQuantity}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter seed quantity"
            />
          </div>

          {/* Expiry Date */}
          <div className="mb-4">
            <label htmlFor="seedExpiryDate" className="block text-gray-700 font-semibold mb-2">
              Expiry Date
            </label>
            <input
              type="date"
              id="seedExpiryDate"
              name="seedExpiryDate"
              value={formData.seedExpiryDate}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Seed Image */}
          <div className="mb-4">
            <label htmlFor="seedImage" className="block text-gray-700 font-semibold mb-2">
              Seed Image
            </label>
            <input
              type="file"
              id="seedImage"
              name="seedImage"
              onChange={handleFileChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        {/* Farmer Details */}
        <div className="grid md:grid-cols-2 gap-4">
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
            <label htmlFor="fLocation" className="block text-gray-700 font-semibold mb-2">
              Location
            </label>
            <input
              type="text"
              id="fLocation"
              name="fLocation"
              value={formData.fLocation}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter farm location"
            />
          </div>

          {/* Contact */}
          <div className="mb-4">
            <label htmlFor="fContact" className="block text-gray-700 font-semibold mb-2">
              Contact Number
            </label>
            <input
              type="text"
              id="fContact"
              name="fContact"
              value={formData.fContact}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter contact number"
            />
          </div>
        </div>

        {/* Temperature Details */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label htmlFor="seedMinTemperature" className="block text-gray-700 font-semibold mb-2">
              Minimum Temperature (°C)
            </label>
            <input
              type="number"
              id="seedMinTemperature"
              name="seedMinTemperature"
              value={formData.seedMinTemperature}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Min temp (°C)"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="seedMaxTemperature" className="block text-gray-700 font-semibold mb-2">
              Maximum Temperature (°C)
            </label>
            <input
              type="number"
              id="seedMaxTemperature"
              name="seedMaxTemperature"
              value={formData.seedMaxTemperature}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Max temp (°C)"
            />
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
