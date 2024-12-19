import React, { useState, useRef } from 'react';
// import LoginModal from './LoginModal';
import Navbar from './Navbar';
import FeatureCard from './FeatureCard';
import Footer from './Footer';
import { TruckIcon } from '@heroicons/react/24/outline';


const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  const featureCardRef = useRef(null);

  const scrollToFeatureCard = () => {
    featureCardRef.current?.scrollIntoView({ behavior: 'smooth' });
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
      <Navbar onGetStartedClick={scrollToFeatureCard} toggleMenu={toggleMenu} openLoginModal={openLoginModal} openSignupModal={openSignupModal} />
      <div className="py-16 bg-white" id="loginSection" >
       
      </div>
          {/* Hero Section */}
          <header className="pt-20 pb-16 bg-gradient-to-br from-green-50 to-white">
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
      <br /><br />

      <div className="container mx-auto px-4">
          <FeatureCard featureCardRef={featureCardRef} />
        </div>

   <br /><br />
      <Footer />
    </div>
  );
};

export default LandingPage;
