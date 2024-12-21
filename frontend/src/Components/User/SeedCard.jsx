import React from 'react';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/material/Box';

const SeedCard = ({ seed, onAddToCart }) => {
  return (
    <Card sx={{ boxShadow: 'lg', borderRadius: 'md', maxWidth: 300 }}>
      <AspectRatio ratio="4/3">
        <img src={seed.image} alt={seed.name} loading="lazy" />
      </AspectRatio>
      <CardContent>
        <Typography level="h5" fontWeight="bold">
          {seed.name}
        </Typography>
        <Typography level="body2" sx={{ marginBottom: 1 }}>
          Price: {seed.price}
        </Typography>
        <Typography level="body2" sx={{ marginBottom: 1 }}>
          Stock: {seed.stock} available
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
          <Button
            size="sm"
            variant="solid"
            color="success"
            onClick={() => onAddToCart(seed)}
          >
            Add to Cart
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SeedCard;
