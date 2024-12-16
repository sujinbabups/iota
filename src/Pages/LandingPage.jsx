import React, { useRef, useState } from 'react';
import { 
  Bars3Icon, 
  XMarkIcon, 
  TruckIcon 
} from '@heroicons/react/24/outline';
import { LeafIcon, Link } from 'lucide-react';
import { LiaWarehouseSolid } from "react-icons/lia";



import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogOverlay,
  DialogTitle,
  DialogClose,
} from '@radix-ui/react-dialog';

const LoginModal = ({ isOpen, onClose, onSwitchToSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Implement login logic here
    console.log('Login attempt', { email, password });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="fixed inset-0 bg-black bg-opacity-50" />
      <DialogContent className="fixed inset-0 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-md p-6 max-w-md w-full">
          <DialogTitle className="text-xl font-bold mb-4">Login</DialogTitle>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="flex justify-between items-center">
              <button
                type="submit"
                className="w-full bg-green-800 text-white py-2 rounded-md hover:bg-green-800 transition-colors"
              >
                Login
              </button>
            </div>
          </form>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <button 
                onClick={onSwitchToSignup} 
                className="text-green-800 hover:underline"
              >
                Sign Up
              </button>
            </p>
          </div>
          <DialogClose 
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            aria-label="Close"
          >
            ✕
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const SignupModal = ({ isOpen, onClose, onSwitchToLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    // Implement signup logic here
    console.log('Signup attempt', { email, password });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="fixed inset-0 bg-black bg-opacity-50" />
      <DialogContent className="fixed inset-0 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-md p-6 max-w-md w-full">
          <DialogTitle className="text-xl font-bold mb-4">Sign Up</DialogTitle>
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label htmlFor="signup-email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="signup-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label htmlFor="signup-password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="signup-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-green-800 text-white py-2 rounded-md hover:bg-green-800 transition-colors"
              >
                Sign Up
              </button>
            </div>
          </form>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <button 
                onClick={onSwitchToLogin} 
                className="text-green-800 hover:underline"
              >
                Login
              </button>
            </p>
          </div>
          <DialogClose 
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            aria-label="Close"
          >
            ✕
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  const loginSectionRef = useRef(null);

  const handleGetStartedClick = () => {
    if (loginSectionRef.current) {
      loginSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.log("loginSectionRef is not available");
    }
  };
  

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const openLoginModal = () => {
    setIsSignupModalOpen(false);
    setIsLoginModalOpen(true);
  };

  const openSignupModal = () => {
    setIsLoginModalOpen(false);
    setIsSignupModalOpen(true);
  };

  const closeModals = () => {
    setIsLoginModalOpen(false);
    setIsSignupModalOpen(false);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <LeafIcon className="h-8 w-8 text-green-800" />
            <span className="text-2xl font-bold text-gray-800">SeedStore</span>
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-8 items-center">
            <li className="text-gray-600 hover:text-green-600 transition-colors cursor-pointer">Features</li>
            <li className="text-gray-600 hover:text-green-600 transition-colors cursor-pointer">Pricing</li>
            <li className="text-gray-600 hover:text-green-600 transition-colors cursor-pointer">About</li>
          </ul>

          {/* Login Button */}
          <div className="hidden md:flex items-center space-x-4">
            {/* <button 
              onClick={openLoginModal}
              className="px-4 py-2 text-green-600 hover:bg-green-50 rounded-md transition-colors"
            >
              Login
            </button> */}
           
            <button onClick={handleGetStartedClick}
              
              className="px-4 py-2 bg-green-800 text-white rounded-md hover:bg-green-900 transition-colors"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu} 
              className="text-gray-600 hover:text-green-600 focus:outline-none"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-lg">
            <ul className="px-4 pt-2 pb-4 space-y-2">
              <li className="text-gray-600 hover:text-green-600 cursor-pointer py-2 border-b">Features</li>
              <li className="text-gray-600 hover:text-green-600 cursor-pointer py-2 border-b">Pricing</li>
              <li className="text-gray-600 hover:text-green-600 cursor-pointer py-2 border-b">About</li>
              <li className="pt-2">
                <button 
                  onClick={openLoginModal}
                  className="w-full mb-2 px-4 py-2 text-green-600 hover:bg-green-50 rounded-md transition-colors"
                >
                  Login
                </button>
                <button 
                  onClick={openSignupModal}
                  className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  Get Started
                </button>
              </li>
            </ul>
          </div>
        )}
      </nav>

      {/* Login and Signup Modals */}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={closeModals}
        onSwitchToSignup={openSignupModal}
      />
      <SignupModal 
        isOpen={isSignupModalOpen}
        onClose={closeModals}
        onSwitchToLogin={openLoginModal}
      />

      {/* Hero Section */}
      <header className="pt-24 pb-16 bg-gradient-to-br from-green-50 to-white">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
              Efficient Seed Transportation <br />
              <span className="text-green-900">Simplified</span>
            </h1>
            <p className="text-gray-600 text-lg">
              Revolutionize your seed logistics with our cutting-edge transportation management platform.
            </p>
            <div className="flex space-x-4">
              <button 
                onClick={openSignupModal}
                className="px-6 py-3 bg-green-900 text-white rounded-md hover:bg-green-800 transition-colors"
              >
                Start Your Journey
              </button>
              <button className="px-6 py-3 border border-green-600 text-green-900 rounded-md hover:bg-green-50 transition-colors">
                Learn More
              </button>
            </div>
          </div>
          <div className="hidden md:block">
            <TruckIcon className="w-full max-w-md mx-auto text-green-800" />
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 bg-white" id='loginSection' ref={loginSectionRef}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Your Gateway to Seamless Operations
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div onClick={openLoginModal} className="bg-green-50 p-6 rounded-lg text-center hover:shadow-lg transition-shadow cursor-pointer">
              <LeafIcon className="h-12 w-12 mx-auto text-green-900 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                Farmers
              </h3>
              <p className="text-gray-600">
                Minimize carbon footprint with optimized routing and eco-friendly practices.
              </p>
            </div>
            <div onClick={openLoginModal} className="bg-green-50 p-6 rounded-lg text-center hover:shadow-lg transition-shadow cursor-pointer">
              <LiaWarehouseSolid className="h-12 w-12 mx-auto text-green-900 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                WareHouse
              </h3>
              <p className="text-gray-600">
                Monitor your seed shipments with precision and transparency.
              </p>
            </div>
            <div onClick={openLoginModal} className="bg-green-50 p-6 rounded-lg text-center hover:shadow-lg transition-shadow cursor-pointer">
              <TruckIcon className="h-12 w-12 mx-auto text-green-900 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                Transporters
              </h3>
              <p className="text-gray-600">
                Ensure the safety of your valuable seed shipments throughout transit.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="bg-gray-100 py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center space-x-4 mb-6">
            <a href="#" className="text-gray-600 hover:text-green-600">Privacy Policy</a>
            <a href="#" className="text-gray-600 hover:text-green-600">Terms of Service</a>
            <a href="#" className="text-gray-600 hover:text-green-600">Contact</a>
          </div>
          <p className="text-gray-500">
            © 2024 SeedStore. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;