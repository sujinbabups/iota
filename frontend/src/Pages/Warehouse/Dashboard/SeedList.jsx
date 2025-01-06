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
      if (!response.ok) throw new Error('Failed to fetch seed data');
      const result = await response.json();
      setSeeds(result.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSeed = async (id) => {
    if (window.confirm('Are you sure you want to delete this seed?')) {
      try {
        const response = await fetch(`/api/seeds/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete seed');
        setSeeds(seeds.filter(seed => seed._id !== id));
        alert('Seed deleted successfully.');
      } catch (err) {
        console.error(err.message);
        alert('Failed to delete the seed. Please try again.');
      }
    }
  };

  const handleUpdateSeed = async (updatedSeed) => {
    const formData = new FormData();
    Object.entries(updatedSeed).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      const response = await fetch(`/api/seeds/${updatedSeed._id}`, {
        method: 'PUT',
        body: formData,
      });
      if (!response.ok) throw new Error('Failed to update seed');
      
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
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-gray-500 text-xl animate-pulse">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500 text-xl bg-red-50 p-4 rounded-lg">{error}</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 transition-all duration-300 ease-in-out">
      <div className="mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-green-800">
          Registered Seeds
        </h2>
      </div>
      
      {seeds.length === 0 ? (
        <div className="flex justify-center items-center min-h-[200px] bg-gray-50 rounded-lg">
          <div className="text-gray-500 text-lg sm:text-xl">No seeds registered yet.</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {seeds.map((seed) => (
            <div key={seed._id} className="transition-transform duration-300 ease-in-out hover:-translate-y-1">
              <SeedCard
                seed={seed}
                onDelete={handleDeleteSeed}
                onUpdate={handleUpdateSeed}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SeedList;