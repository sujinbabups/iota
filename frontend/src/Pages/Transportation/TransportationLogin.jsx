import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { LogIn, Lock, Mail, LeafIcon } from 'lucide-react';

const TransportationLogin = ({ onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [redirectToDashboard, setRedirectToDashboard] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log('Login attempt', { email, password });

        try {
            const response = await fetch('/api/transportation-login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            console.log('Login successful', data);

            // Assuming the backend returns a token or user data
            // You can store this data in localStorage, state, or use it in your app
            localStorage.setItem('authToken', data.token);

            // Set the state to trigger the redirect
            setRedirectToDashboard(true);

            // Close the login modal if onClose is passed
            onClose && onClose();
        } catch (error) {
            console.error('Error logging in:', error);
            alert('Login failed. Please try again.');
        }
    };

    // Redirect to the transportation dashboard after a successful login
    if (redirectToDashboard) {
        return <Navigate to="/transportationdashboard" />;
    }

    return (
        <div className="min-h-screen bg-green-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                {/* Logo Placeholder */}
                <div className="flex justify-center mb-6">
                    <div className="flex items-center space-x-2 text-center text-3xl font-bold text-green-900">
                        <LeafIcon className="h-8 w-8 text-green-900" />
                        <span>SeedStore</span>
                    </div>
                </div>

                <div className="bg-white py-8 px-4 shadow-xl rounded-lg sm:px-10 border border-green-100">
                    <h2 className="text-center text-2xl font-extrabold text-green-800 mb-6">
                        Login to Your<br /> Transportation Account
                    </h2>

                    <form className="space-y-6" onSubmit={handleLogin}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-green-700">
                                Email address
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-green-400" />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-10 block w-full pr-3 py-2 border border-green-300 rounded-md leading-5 bg-white placeholder-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-green-700">
                                Password
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-green-400" />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pl-10 block w-full pr-10 py-2 border border-green-300 rounded-md leading-5 bg-white placeholder-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                    placeholder="Password"
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="text-green-400 hover:text-green-500 focus:outline-none focus:text-green-500"
                                    >
                                        {showPassword ? 'Hide' : 'Show'}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-green-800 focus:ring-green-500 border-green-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-green-900">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <a href="#" className="font-medium text-green-800 hover:text-green-500">
                                    Forgot your password?
                                </a>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-800 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                                <LogIn className="h-5 w-5 mr-2" /> Sign in
                            </button>
                        </div>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-green-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-green-500">
                                    Don't have an account?
                                </span>
                            </div>
                        </div>

                        <div className="mt-4">
                            <Link
                                to="/transportationregistration"
                                className="w-full flex justify-center py-2 px-4 border border-green-800 rounded-md shadow-sm text-sm font-medium text-green-800 hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                                Get SeedStore Transportation Account Now
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransportationLogin;
