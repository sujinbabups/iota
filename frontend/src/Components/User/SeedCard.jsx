import React, { useState } from 'react';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';


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

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
        paymentPrice: seed.seedPrice * seed.seedQuantity, 
        paymentStatus: 'Not Paid',
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
          <Typography><span className='text-[green]'>Current Temperature {seed.seedTemperature}</span></Typography>
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
