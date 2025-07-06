"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    // Client-side validation
    if (!name.trim()) {
      setError('Name is required');
      setIsLoading(false);
      return;
    }
    if (!email.trim()) {
      setError('Email is required');
      setIsLoading(false);
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError('Invalid email format');
      setIsLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSuccess('Account created! Redirecting to login...');
        setTimeout(() => router.push('/auth/signin'), 1500);
      } else {
        setError(data.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-start relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/car-sunset.jpg.jpg"
          alt="Car Sunset Background"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay for better text readability (match login) */}
        <div className="absolute inset-0 bg-black opacity-30"></div>
      </div>

      {/* Register Form Container */}
      <div className="relative z-10 p-8 bg-neutral-800 bg-opacity-80 rounded-lg shadow-xl w-full max-w-sm border border-orange-500 ml-20">
        <h1 className="text-3xl font-bold text-center text-orange-500 mb-6 font-['Inter']">
          Create Account<br/>CarKraze
        </h1>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500 rounded text-red-500 text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-3 bg-green-500/10 border border-green-500 rounded text-green-500 text-sm">
            {success}
          </div>
        )}

        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-300 text-sm font-bold mb-2">Full Name</label>
            <div className="flex items-center bg-neutral-700 rounded-md pr-2">
              <input
                type="text"
                id="name"
                className="flex-grow bg-neutral-700 text-white rounded-md py-2 px-3 leading-tight focus:outline-none focus:shadow-outline border border-neutral-600"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-300 text-sm font-bold mb-2">Email Address</label>
            <div className="flex items-center bg-neutral-700 rounded-md pr-2">
              <input
                type="email"
                id="email"
                className="flex-grow bg-neutral-700 text-white rounded-md py-2 px-3 leading-tight focus:outline-none focus:shadow-outline border border-neutral-600"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-300 text-sm font-bold mb-2">Password</label>
            <div className="flex items-center bg-neutral-700 rounded-md pr-2">
              <input
                type="password"
                id="password"
                className="flex-grow bg-neutral-700 text-white rounded-md py-2 px-3 leading-tight focus:outline-none focus:shadow-outline border border-neutral-600"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-gray-300 text-sm font-bold mb-2">Confirm Password</label>
            <div className="flex items-center bg-neutral-700 rounded-md pr-2">
              <input
                type="password"
                id="confirmPassword"
                className="flex-grow bg-neutral-700 text-white rounded-md py-2 px-3 leading-tight focus:outline-none focus:shadow-outline border border-neutral-600"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className={`bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full transition-colors ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-300 text-sm">
            Already have an account? <Link href="/auth/signin" className="text-orange-500 hover:underline">Sign In</Link>
          </p>
          <p className="mt-4 text-gray-300 text-sm">
            <Link href="/" className="text-orange-500 hover:underline">
              ← Back to Home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
} 