import React, { useEffect, useState } from 'react'
import { MapPin,Leaf,DollarSign,Phone,Weight,Thermometer,CalendarDays } from 'lucide-react';
import { FaTemperatureLow } from "react-icons/fa";
import { ethers } from "ethers";
import Address from '../../scdata/deployed_addresses.json';
import ABI from '../../scdata/abi.json'
const SeedCardView = ({onEdit,seed,onDelete}) => {

  const formatDate = (isoDate,) => {
  const date = new Date(isoDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
const contractAddress=Address.TempModuleIoTTemperatureStorage;
const contractABI=ABI.abi;

const [signer, setSigner] = useState(null);
const [provider, setProvider] = useState(null);

async function connectToMetamask() {
  if (typeof window.ethereum !== "undefined") {
    try {
      // Request account access
      await window.ethereum.request({ method: "eth_requestAccounts" });

      // Create a new BrowserProvider instance (ethers 6.x)
      const provider = new ethers.BrowserProvider(window.ethereum);

      // Get the connected account
      const signer = await provider.getSigner();
      const address = await signer.getAddress(); // Ensure we use this method correctly in ethers v6.x

      console.log("Connected account:", address);
      return { provider, signer };
    } catch (error) {
      console.error("Connection to Metamask failed:", error);
      return { provider: null, signer: null }; // Return nulls if there is an error
    }
  } else {
    console.error("No Ethereum browser extension detected!");
    return { provider: null, signer: null };
  }
}

useEffect(() => {
  connectToMetamask(); 
}, []);


async function storeTemperatureWithBrowserProvider(currentTemperature) {
  const { provider, signer } = await connectToMetamask();

  if (provider && signer) {
    try {
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      // Send the transaction
      const tx = await contract.storeTemperature(currentTemperature + 5);
      console.log("Transaction submitted:", tx.hash);

      // Wait for confirmation
      const receipt = await tx.wait();
      console.log("Transaction confirmed:", receipt);
    } catch (error) {
      console.error("Error sending transaction:", error);
    }
  } else {
    console.error("Signer or provider is not available");
  }
}



const handleStoreTemperature = () => {
  const currentTemperature = seed.seedMinTemperature; // Fetch the actual current temperature
  storeTemperatureWithBrowserProvider(currentTemperature);
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
          <span>Current Temperature: {seed.seedMinTemperature + 5}°C</span>
          <button
            onClick={handleStoreTemperature}
            className="ml-2 px-3 py-1 bg-green-500 text-white rounded"
          >
            Store Temperature
          </button>
        </div>
    </div>
  </>
  )
}

export default SeedCardView
