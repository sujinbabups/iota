import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Lock, Mail, Phone, User, LeafIcon } from 'lucide-react';

const UserRegistration = ({ onClose }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (password !== confirmPassword) {
            return setError('Passwords do not match.');
        }

        try {
            const response = await fetch('/api/user-register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fullName: name,
                    email,
                    phoneNumber: phone,
                    password,
                }),
            });

            const result = await response.json();

            if (response.ok) {
                setSuccess('User registered successfully. Redirecting...');
                setTimeout(() => {
                    window.location.href = '/userlogin';
                }, 2000);
            } else {
                setError(result.message || 'Registration failed.');
            }
        } catch (err) {
            console.error('Error during registration:', err);
            setError('Something went wrong. Please try again later.');
        }
    };

    return (
        <div className="min-h-screen bg-green-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center mb-6">
                    <div className="flex items-center space-x-2 text-center text-3xl font-bold text-green-900">
                        <LeafIcon className="h-8 w-8 text-green-900" />
                        <span>SeedStore</span>
                    </div>
                </div>

                <div className="bg-white py-8 px-4 shadow-xl rounded-lg sm:px-10 border border-green-100">
                    <h2 className="text-center text-2xl font-extrabold text-green-800 mb-6">
                        Create Your Account
                    </h2>

                    {error && <div className="text-red-600 text-center mb-4">{error}</div>}
                    {success && <div className="text-green-600 text-center mb-4">{success}</div>}

                    <form className="space-y-6" onSubmit={handleRegister}>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-green-700">
                                Full Name
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-green-400" />
                                </div>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="pl-10 block w-full pr-3 py-2 border border-green-300 rounded-md leading-5 bg-white placeholder-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                    placeholder="Full Name"
                                />
                            </div>
                        </div>

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
                            <label htmlFor="phone" className="block text-sm font-medium text-green-700">
                                Phone Number
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Phone className="h-5 w-5 text-green-400" />
                                </div>
                                <input
                                    id="phone"
                                    name="phone"
                                    type="text"
                                    required
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="pl-10 block w-full pr-3 py-2 border border-green-300 rounded-md leading-5 bg-white placeholder-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                    placeholder="Phone Number"
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

                        <div>
                            <label htmlFor="confirm-password" className="block text-sm font-medium text-green-700">
                                Confirm Password
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-green-400" />
                                </div>
                                <input
                                    id="confirm-password"
                                    name="confirm-password"
                                    type={showConfirmPassword ? "text" : "password"}
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="pl-10 block w-full pr-10 py-2 border border-green-300 rounded-md leading-5 bg-white placeholder-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                    placeholder="Confirm Password"
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="text-green-400 hover:text-green-500 focus:outline-none focus:text-green-500"
                                    >
                                        {showConfirmPassword ? 'Hide' : 'Show'}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-800 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                                Register
                            </button>
                        </div>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-green-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-green-600">Already have an account?</span>
                            </div>
                        </div>
                        <div className="mt-6">
                            <Link
                                to="/userlogin"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-green-900 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                                Log in
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserRegistration;
