"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

interface CarListing {
  id: number;
  carName: string;
  brand: string;
  year: string;
  price: string;
  mileage: string;
  images?: string[];
  createdAt?: string;
}

const UserListings: React.FC = () => {
  const { user } = useAuth();
  const [listings, setListings] = useState<CarListing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    // Fetch user's listings from backend (replace URL as needed)
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user-listings?email=${user.email}`)
      .then(res => res.json())
      .then(data => {
        setListings(data.listings || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user]);

  if (!user) return null;
  if (loading) return <div className="text-center text-white py-8">Loading your listings...</div>;
  if (listings.length === 0) return <div className="text-center text-gray-400 py-8">You have not listed any cars yet.</div>;

  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold text-white mb-4">Your Listings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {listings.map(listing => (
          <div key={listing.id} className="bg-neutral-800 rounded-xl shadow-md p-4 flex flex-col md:flex-row items-center gap-4">
            <Image
              src={listing.images && listing.images[0] ? listing.images[0] : '/car-placeholder.png'}
              alt={listing.carName}
              width={140}
              height={90}
              className="object-cover rounded-lg"
            />
            <div className="flex-1">
              <h3 className="text-lg font-bold text-orange-400">{listing.brand} {listing.carName} ({listing.year})</h3>
              <p className="text-gray-300 mb-1">Price: <span className="text-white font-semibold">₹{listing.price}</span></p>
              <p className="text-gray-400 text-sm">Mileage: {listing.mileage}</p>
              {listing.createdAt && <p className="text-gray-500 text-xs mt-1">Listed on {new Date(listing.createdAt).toLocaleDateString()}</p>}
              <Link href={`/cars/${listing.id}`} className="inline-block mt-2 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 text-sm font-medium">View Details</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserListings;
