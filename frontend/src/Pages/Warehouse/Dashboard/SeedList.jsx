import React, { useEffect, useState } from 'react';
import SeedCard from '../../../Components/Warehouse/SeedCard';

const SeedList = () => {
  const [seeds, setSeeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSeeds();
  }, []);

  const fetchSeeds = async () => {
    try {
      const response = await fetch('/api/allseeds');
      if (!response.ok) {
        throw new Error('Failed to fetch seed data');
      }
      const result = await response.json();
      setSeeds(result.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSeed = async (id) => {
    try {
      const response = await fetch(`/api/seeds/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete seed');
      }

      setSeeds(seeds.filter(seed => seed._id !== id));
      alert('Seed deleted successfully.');
    } catch (err) {
      console.error(err.message);
      alert('Failed to delete the seed. Please try again.');
    }
  };

  const handleUpdateSeed = async (updatedSeed) => {
    const formData = new FormData();
    for (const key in updatedSeed) {
      formData.append(key, updatedSeed[key]);
    }

    try {
      const response = await fetch(`/api/seeds/${updatedSeed._id}`, {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to update seed');
      }

      const result = await response.json();
      setSeeds(seeds.map(seed => 
        seed._id === result.data._id ? result.data : seed
      ));
    } catch (err) {
      console.error(err.message);
      alert('Failed to update the seed. Please try again.');
    }
  };

  if (loading) {
    return <div className="text-center text-gray-500 text-xl">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 text-xl">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-[-15%] ml-64">
      <h2 className="text-3xl font-bold text-center mb-8 text-green-800">Registered Seeds</h2>
      {seeds.length === 0 ? (
        <div className="text-center text-gray-500 text-xl">No seeds registered yet.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {seeds.map((seed) => (
            <SeedCard
              key={seed._id}
              seed={seed}
              onDelete={handleDeleteSeed}
              onUpdate={handleUpdateSeed}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SeedList;