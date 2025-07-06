"use client";
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`;
      console.log('Attempting to log in to:', apiUrl);
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        // Try to parse error message from backend
        let errMsg = 'Login failed.';
        try {
          const errorData = await response.json();
          errMsg = errorData.message || errMsg;
        } catch {}
        throw new Error(errMsg);
      }

      // Expecting user data or token in JSON
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message || 'Login failed.');
      }
      // Store user/token in AuthContext
      login(data.user, data.token || '');
      router.push('/');
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
      console.error('Login error:', err);
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
        {/* Optional: Overlay for better text readability */}
        <div className="absolute inset-0 bg-black opacity-30"></div>
      </div>

      {/* Login Form Container */}
      <div className="relative z-10 p-8 bg-neutral-800 bg-opacity-80 rounded-lg shadow-xl w-full max-w-sm border border-orange-500 ml-20">
        <h1 className="text-3xl font-bold text-center text-orange-500 mb-6 font-['Inter']">
          Login To<br/>CarKraze
        </h1>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500 rounded text-red-500 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
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
          <div className="mb-6">
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
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className={`bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full transition-colors ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login Now'}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-300 text-sm">
            Don't have an account? <Link href="/auth/register" className="text-orange-500 hover:underline">Sign Up</Link>
          </p>
          <Link href="#" className="inline-block align-baseline font-bold text-sm text-orange-500 hover:underline mt-2">
            Forgot Password?
          </Link>
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