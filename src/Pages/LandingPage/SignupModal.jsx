import React, { useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogOverlay, DialogTitle, DialogClose } from '@radix-ui/react-dialog';

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
              <button onClick={onSwitchToLogin} className="text-green-800 hover:underline">
                Login
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

export default SignupModal;
