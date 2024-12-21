import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SeedCard from '../../../Components/User/SeedCard';

const seedData = [
  {
    id: 1,
    name: 'Tomato Seeds',
    price: 5.00, // Changed from "$5.00" to 5.00
    stock: 15,
    image: 'https://images.unsplash.com/photo-1523475496153-3b1d115dba29?auto=format&fit=crop&w=500&h=500&q=60',
  },
  {
    id: 2,
    name: 'Carrot Seeds',
    price: 3.50, // Changed from "$3.50" to 3.50
    stock: 10,
    image: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=500&h=500&q=60',
  },
  {
    id: 3,
    name: 'Spinach Seeds',
    price: 4.20, // Changed from "$4.20" to 4.20
    stock: 20,
    image: 'https://images.unsplash.com/photo-1598454446475-8744a3d9ec7f?auto=format&fit=crop&w=500&h=500&q=60',
  },
  {
    id: 4,
    name: 'Bell Pepper Seeds',
    price: 6.00, // Changed from "$6.00" to 6.00
    stock: 5,
    image: 'https://images.unsplash.com/photo-1600573475677-1ec14ff6ebfd?auto=format&fit=crop&w=500&h=500&q=60',
  },
  {
    id: 5,
    name: 'Cucumber Seeds',
    price: 2.75, // Changed from "$2.75" to 2.75
    stock: 18,
    image: 'https://images.unsplash.com/photo-1589927986089-3581230e9794?auto=format&fit=crop&w=500&h=500&q=60',
  },
  {
    id: 6,
    name: 'Lettuce Seeds',
    price: 3.90, // Changed from "$3.90" to 3.90
    stock: 12,
    image: 'https://images.unsplash.com/photo-1606755962774-4624cde22559?auto=format&fit=crop&w=500&h=500&q=60',
  },
];


const SeedList = ({ onAddToCart }) => {
  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" sx={{ marginBottom: 4, fontWeight: 'bold' }}>
        Our Seed Collection
      </Typography>
      <Grid container spacing={3}>
        {seedData.map((seed) => (
          <Grid item xs={12} sm={4} md={2.4} key={seed.id}>
            <SeedCard seed={seed} onAddToCart={onAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SeedList;
