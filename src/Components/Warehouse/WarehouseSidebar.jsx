import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import { 
  Package, 
  Warehouse, 
  TruckIcon, 
  ListOrdered 
} from 'lucide-react';

const WarehouseSidebar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path 
      ? 'bg-primary/10 text-primary font-semibold' 
      : 'text-gray-600 hover:bg-gray-100';
  };

  const menuItems = [
    {
      to: "/warehousedashboard/addseed",
      label: "Add Seeds",
      icon: Package
    },
    {
      to: "/warehousedashboard/seedlist",
      label: "All Seeds",
      icon: Warehouse
    },
    {
      to: "/warehousedashboard/vieworders",
      label: "View Orders",
      icon: ListOrdered
    },
    {
      to: "/warehousedashboard/transportationdetails",
      label: "Transportation Details",
      icon: TruckIcon
    }
  ];

  return (
    <div className="w-64 bg-white border-r  shadow-sm">
      <div className="p-4 border-b border-green-500">
        <h2 className="text-xl font-bold text-gray-800">Warehouse</h2>
      </div>
      <nav className="p-4 ">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.to}>
              <Link 
                to={item.to} 
                className={` 
                  flex items-center p-2 rounded-lg transition-colors duration-200
                  ${isActive(item.to)}
                `}
              >
                <item.icon className="mr-3 h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default WarehouseSidebar;