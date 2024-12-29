import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SeedCard from '../../../Components/User/SeedCard';
import { useNavigate } from 'react-router-dom';

const SeedList = () => {
  const navigate = useNavigate();
  const [seeds, setSeeds] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSeeds = async () => {
      try {
        const res = await fetch('/api/allseeds', {
          method: 'GET',
          credentials: 'include', 
        });

        if (res.status === 401) {
          navigate('/userlogin'); 
        } else if (res.ok) {
          const result = await res.json();
          setSeeds(result.data); 
          console.log(seeds); 
        } else if (res.status === 404) {
          setError('No seeds found.');
        } else {
          throw new Error('Failed to fetch seeds.');
        }
      } catch (err) {
        console.error(err);
        setError('An error occurred while fetching the seed data.');
      }
    };

    fetchSeeds();
  }, [navigate]);

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" sx={{ marginBottom: 4, fontWeight: 'bold' }}>
        Our Seed Collection
      </Typography>
      {error && (
        <Typography color="error" sx={{ marginBottom: 4 }}>
          {error}
        </Typography>
      )}
      <Grid container spacing={3}>
        {seeds.map((seed) => (
          <Grid item xs={12} sm={4} md={2.4} key={seed._id}>
            <SeedCard seed={seed} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SeedList;
