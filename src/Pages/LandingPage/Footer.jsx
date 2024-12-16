import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-12">
      <div className="container mx-auto px-4 text-center">
        <div className="flex justify-center space-x-4 mb-6">
          <a href="#" className="text-gray-600 hover:text-green-600">Privacy Policy</a>
          <a href="#" className="text-gray-600 hover:text-green-600">Terms of Service</a>
          <a href="#" className="text-gray-600 hover:text-green-600">Contact</a>
        </div>
        <p className="text-gray-600">&copy; 2024 SeedStore. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
