import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Address from '../../scdata/deployed_addresses.json';
import ABI from '../../scdata/abi.json';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const SeedCard = ({ seed }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [seedTemperature, setSeedTemperature] = useState(null); 
  const [contract, setContract] = useState(null);
  const [error, setError] = useState('');

  const contractAddress = Address.TempModuleIoTTemperatureStorage;
  const contractABI = ABI.abi;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Function to fetch the stored temperature from the blockchain
  const getBlockchainSeedId = (dbSeedId) => {
    return `seed_${dbSeedId.replace(/[^a-zA-Z0-9]/g, '')}`;
  };
  // const fetchTemperatureFromBlockchain = async () => {
  //   try {
  //     const provider = new ethers.BrowserProvider(window.ethereum);
  //     const signer = await provider.getSigner();
  //     const contract = new ethers.Contract(contractAddress, contractABI, signer);
  //     const [temperature] = await contract.getLatestTemperature(); // Fetching the latest temperature and timestamp
  //     setSeedTemperature(temperature.toString()); // Update the state with fetched temperature
  //   } catch (error) {
  //     console.error("Error fetching temperature:", error);
  //     setSeedTemperature('Error fetching temperature');
  //   }
  // };
  const connectToMetamask = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
       
        const tempContract = new ethers.Contract(contractAddress, contractABI, signer);
        console.log("contract ",tempContract);
        
        setContract(tempContract);
        return tempContract;
      } catch (error) {
        console.error("Connection to Metamask failed:", error);
        setError("Failed to connect to blockchain");
        return null;
      }
    } else {
      setError("No Ethereum browser extension detected!");
      return null;
    }
  };

  // Fetch the temperature when the modal opens
  useEffect(() => {
    if (open) {
      const initializeAndFetch = async () => {
        const contractInstance = await connectToMetamask();
        if (contractInstance) {
          await initializeSeedInBlockchain(contractInstance);
          await fetchTemperatureForSeed(contractInstance);
        }
      };
  
      initializeAndFetch();
    }
  }, [open]);
  
  const initializeSeedInBlockchain = async (contractInstance) => {
    if (!contractInstance) return;

    try {
      const blockchainSeedId = getBlockchainSeedId(seed._id);
      
      // Try to add the seed
      try {
        const tx = await contractInstance.addSeed(blockchainSeedId, seed.seedName);
        await tx.wait();
        console.log("Seed initialized in blockchain");
      } catch (error) {
        // If seed already exists, that's fine
        if (!error.message.includes("Seed already exists")) {
          throw error;
        }
      }
    } catch (error) {
      console.error("Error initializing seed:", error);
      setError("Failed to initialize seed");
    }
  };
  const fetchTemperatureForSeed = async (contractInstance) => {
    if (!contractInstance) return;
  
    try {
      setSeedTemperature('Fetching...');
      const blockchainSeedId = getBlockchainSeedId(seed._id);
      const seedData = await contractInstance.seeds(blockchainSeedId); // Fetch seed data
      setSeedTemperature(seedData.currentTemperature.toString());
    } catch (error) {
      console.error("Error fetching temperature:", error);
      setSeedTemperature('Error fetching temperature');
      setError(error.message);
    }
  };
  
  const handleAddToCart = async () => {
    setLoading(true);
    setMessage('');

    try {
      const token = localStorage.getItem('token');
      const cartItem = {
        seedId: seed._id,
        seedName: seed.seedName,
        seedType: seed.seedType,
        seedPrice: seed.seedPrice,
        seedQuantity: seed.seedQuantity,
        seedExpiryDate: seed.seedExpiryDate,
        seedImage: seed.seedImage,
        farmerName: seed.farmerName,
        fLocation: seed.fLocation,
        fContact: seed.fContact,
        seedMinTemperature: seed.seedMinTemperature,
        seedMaxTemperature: seed.seedMaxTemperature,
      };

      const response = await fetch('/api/addCart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(cartItem),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 409) {
          setMessage(errorData.message);
          return;
        }
        throw new Error(errorData.message || 'Failed to add item to cart.');
      }

      const data = await response.json();
      setMessage('Item added to cart successfully!');
      console.log("data", data);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Card sx={{ boxShadow: 'lg', borderRadius: 'md', maxWidth: 300 }}>
        <AspectRatio ratio="4/3">
          <img
            src={`/api/uploads/${seed.seedImage}`}
            onError={(e) => {
              e.target.src =
                'https://imgs.search.brave.com/7pvnFHMXv_vlLrZ5u4kNWUZKT7CVutxiVoUa1rtPmD4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA5LzAyLzIwLzEy/LzM2MF9GXzkwMjIw/MTI2Ml9zYldESlJG/anRaeDZzdGRIVmgz/RDUyeTUyRDFIU0NS/aC5qcGc';
            }}
            alt={seed.seedName || 'Seed Image'}
            className="rounded-2xl border-solid aspect-square border-[5px] border-stone-50"
          />
        </AspectRatio>
        <CardContent>
          <Typography level="h5" fontWeight="bold">
            {seed.seedName}
          </Typography>
          <Typography level="body2" sx={{ marginBottom: 1 }}>
            Price: ${seed.seedPrice}
          </Typography>
          <Typography level="body2" sx={{ marginBottom: 1 }}>
            Stock: {seed.seedQuantity} available
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2, gap: 2 }}>
            <Button size="sm" variant="solid" color="success" onClick={handleOpen}>
              View Details
            </Button>
            <Button
              size="sm"
              variant="solid"
              color="success"
              onClick={handleAddToCart}
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add to Cart'}
            </Button>
          </Box>
          {message && (
            <Typography color={message.includes('success') ? 'green' : 'red'} sx={{ marginTop: 1 }}>
              {message}
            </Typography>
          )}
        </CardContent>
      </Card>

      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2">
            {seed.seedName}
          </Typography>
          <AspectRatio ratio="4/3">
            <img
              src={`http://localhost:5000/uploads/${seed.seedImage}`}
              onError={(e) => {
                e.target.src =
                  'https://imgs.search.brave.com/7pvnFHMXv_vlLrZ5u4kNWUZKT7CVutxiVoUa1rtPmD4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA5LzAyLzIwLzEy/LzM2MF9GXzkwMjIw/MTI2Ml9zYldESlJG/anRaeDZzdGRIVmgz/RDUyeTUyRDFIU0NS/aC5qcGc';
              }}
              alt={seed.seedName || 'Seed Image'}
              className="rounded-2xl border-solid aspect-square border-[5px] border-stone-50"
            />
          </AspectRatio>
          <Typography sx={{ mt: 2 }}>Type: {seed.seedType}</Typography>
          <Typography>Price: ${seed.seedPrice}</Typography>
          <Typography>Quantity: {seed.seedQuantity} available</Typography>
          <Typography>Expiry Date: {new Date(seed.seedExpiryDate).toLocaleDateString()}</Typography>
          <Typography>Min Temp: {seed.seedMinTemperature}°C</Typography>
          <Typography>Max Temp: {seed.seedMaxTemperature}°C</Typography>
          <Typography>Location: {seed.fLocation}</Typography>
          <Typography>Farmer: {seed.farmerName}</Typography>
          <Typography>Contact: {seed.fContact}</Typography>
          <Typography>
              <span className='text-[green]'>
                Current Temperature: {seedTemperature ? `${seedTemperature}°C` : 'Fetching...'}
              </span>
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <Button variant="outlined" color="error" onClick={handleClose}>
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default SeedCard;
