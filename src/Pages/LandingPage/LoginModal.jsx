import React, { useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogOverlay, DialogTitle, DialogClose } from '@radix-ui/react-dialog';

const LoginModal = ({ isOpen, onClose, onSwitchToSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
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
              <button onClick={onSwitchToSignup} className="text-green-800 hover:underline">
                Sign Up
              </button>
            </p>
          </div>
          <DialogClose className="absolute top-3 right-3 text-gray-400 hover:text-gray-600" aria-label="Close">
            ✕
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
