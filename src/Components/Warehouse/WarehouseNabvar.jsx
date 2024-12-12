import React from 'react'
import { Link } from 'react-router-dom'
import { LogOut } from 'lucide-react'

const WarehouseNavbar = () => {


  return (
    <nav className="bg-green-900 text-white p-4 flex justify-between items-center shadow-md">
      <div className="flex items-center">
        <Link 
          to="/warehousedashboard" 
          className="text-2xl font-bold hover:text-blue-200 transition-colors"
        >
          Warehouse Management
        </Link>
      </div>
      <Link to="/">
      <div className="flex items-center">
        <button 
         
          className="flex items-center space-x-2 bg-white text-green-900 px-4 py-2 rounded transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
      </Link>
    </nav>
  )
}

export default WarehouseNavbar