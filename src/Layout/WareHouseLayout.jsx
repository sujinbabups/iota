import React, { useState } from 'react';
import { 
    Package, Leaf, Warehouse, Droplet, Archive, Truck, Filter, Plus, X
  } from 'lucide-react';
import { Outlet } from 'react-router-dom'

const WareHouseLayout = () => {
    const [selectedFilter, setSelectedFilter] = useState('all');

  return (
    <>    <div className="p-4 bg-gray-100 min-h-screen">
    <div className="mb-6 flex justify-between items-center">
      <h1 className="text-3xl font-bold text-gray-800 flex items-center font-serif">
        <Warehouse className="mr-3" /> Seed Warehouse Dashboard
      </h1>
      <div className="flex items-center space-x-2">
        <button 
         className={`font-serif px-3 py-1 rounded ${selectedFilter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
         onClick={() => setSelectedFilter('all')}
        >
         All Seeds
        </button>

        <button 
          className={`font-serif px-3 py-1 rounded ${selectedFilter === 'register' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setSelectedFilter('register')}
        >
          Register Seed
        </button>
        <button 
          className={`font-serif px-3 py-1 rounded ${selectedFilter === 'processed' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setSelectedFilter('processed')}
        >
          Processed
        </button>
        <button 
          className={`font-serif px-3 py-1 rounded ${selectedFilter === 'packaged' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setSelectedFilter('packaged')}
        >
          Packaged
        </button>
        <button 
          className={`font-serif px-3 py-1 rounded ${selectedFilter === 'readytoSell' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setSelectedFilter('readytoSell')}
        >
          Ready to Sell
        </button>
      </div>
    </div>
    </div>
    <Outlet/>

    </>

    
  )
}

export default WareHouseLayout
