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
    seedMinTemperature: "",
    seedMaxTemperature: "",
  });

  const [seedImage, setSeedImage] = useState(null); // State for image file

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
      data.append("seedImage", seedImage); // Add the image file
    }

    try {
      const response = await fetch("/addSeed", {
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Replace with your authentication mechanism
        },
      });

      if (response.ok) {
        const result = await response.json();
        alert("Seed registered successfully!");
        console.log("Server response:", result);
      } else {
        const errorResult = await response.json();
        console.error("Error:", errorResult);
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
              <option value="" disabled>
                Select seed type
              </option>
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
            <label htmlFor="price" className="block text-gray-700 font-semibold mb-2">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.seedPrice}
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
              value={formData.seedQuantity}
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
              value={formData.seedExpiryDate}
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
              value={formData.fLocation}
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
            type="te"
            id="contact"
            name="contact"
            value={formData.fContact}
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
                value={formData.seedMinTemperature}
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
                value={formData.seedMaxTemperature}
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
