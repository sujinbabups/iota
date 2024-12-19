import React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

const seedData = [
  {
    id: 1,
    name: 'Tomato Seeds',
    price: '$5.00',
    stock: 15,
    image: 'https://images.unsplash.com/photo-1523475496153-3b1d115dba29?auto=format&fit=crop&w=500&h=500&q=60',
  },
  {
    id: 2,
    name: 'Carrot Seeds',
    price: '$3.50',
    stock: 10,
    image: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=500&h=500&q=60',
  },
  {
    id: 3,
    name: 'Spinach Seeds',
    price: '$4.20',
    stock: 20,
    image: 'https://images.unsplash.com/photo-1598454446475-8744a3d9ec7f?auto=format&fit=crop&w=500&h=500&q=60',
  },
  {
    id: 4,
    name: 'Bell Pepper Seeds',
    price: '$6.00',
    stock: 5,
    image: 'https://images.unsplash.com/photo-1600573475677-1ec14ff6ebfd?auto=format&fit=crop&w=500&h=500&q=60',
  },
];

function SeedCard({ seed, onAddToCart }) {
  return (
    <Card sx={{ width: 250, maxWidth: '100%', maxHeight: 300, boxShadow: 'lg' }}>
      <CardOverflow>
        <AspectRatio sx={{ minWidth: 197 }}>
          <img src={seed.image} alt={seed.name} loading="lazy" />
        </AspectRatio>
      </CardOverflow>
      <CardContent>
        <Typography level="body-xs">Seed Variety</Typography>
        <Typography level="title-md" sx={{ mt: 1, fontWeight: 'bold' }}>
          {seed.name}
        </Typography>
        <Typography level="body-sm" sx={{ mt: 1 }}>
          Price: <b>{seed.price}</b>
        </Typography>
        <Typography level="body-sm">Stock: <b>{seed.stock}</b></Typography>
      </CardContent>
      <CardOverflow>
        <Button
          variant="solid"
          style={{ backgroundColor: '#9e2424', color: 'white' }}
          size="lg"
          onClick={() => onAddToCart(seed)}
        >
          Add to Cart
        </Button>
      </CardOverflow>
    </Card>
  );
}

export default function SeedListPage({ onAddToCart }) {
  return (
    <Box sx={{ paddingLeft: '40px', paddingTop: '40px', paddingBottom: '20px' }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '20px' }}>
        Our Seed Collection
      </Typography>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 6, sm: 10, md: 14 }}>
        {seedData.map((seed) => (
          <Grid item xs={2} key={seed.id}>
            <SeedCard seed={seed} onAddToCart={onAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
