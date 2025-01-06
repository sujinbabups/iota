import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Package, Warehouse, TruckIcon, ListOrdered, Menu, X } from 'lucide-react';

const WarehouseSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => 
    location.pathname === path ? 'bg-primary/10 text-primary font-semibold' : 'text-gray-600 hover:bg-gray-100';

  const menuItems = [
    { to: "/warehousedashboard/addseed", label: "Add Seeds", icon: Package },
    { to: "/warehousedashboard/seedlist", label: "All Seeds", icon: Warehouse },
    { to: "/warehousedashboard/vieworders", label: "View Orders", icon: ListOrdered },
    { to: "/warehousedashboard/transportationdetails", label: "Transportation Details", icon: TruckIcon }
  ];

  const MenuItem = ({ item }) => (
    <li>
      <Link 
        to={item.to} 
        className={`flex items-center p-2 rounded-lg transition-colors duration-200 ${isActive(item.to)}`}
        onClick={() => setIsOpen(false)}
      >
        <item.icon className="mr-3 h-5 w-5" />
        <span>{item.label}</span>
      </Link>
    </li>
  );

  return (
    <>
      {/* Mobile Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-md"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-40
        w-64 bg-white border-r shadow-sm
        transform transition-transform duration-200 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-4 border-b border-green-500">
          <Link to='/warehousedashboard' onClick={() => setIsOpen(false)}>
            <h2 className="text-xl font-bold text-gray-800">Warehouse</h2>
          </Link>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map(item => <MenuItem key={item.to} item={item} />)}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default WarehouseSidebar;