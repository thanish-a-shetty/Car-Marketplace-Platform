"use client";

import { useState, useEffect } from 'react';
import CarCard from '../components/CarCard';
import { useComparison } from '../context/ComparisonContext';

interface UsedCar {
  _id: string;
  title: string;
  description: string;
  price: number;
  year: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  images: string[];
  location: string;
  brand: string;
  model: string;
  status: string;
  seller?: any;
}

const UsedCarsPage = () => {
  const { comparisonCars, addToComparison, removeFromComparison } = useComparison();
  const [usedCars, setUsedCars] = useState<UsedCar[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsedCars = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/used-cars`);
        if (!res.ok) throw new Error('Failed to fetch used cars');
        const data = await res.json();
        setUsedCars(data);
      } catch (err: any) {
        setError(err.message || 'Error loading used cars');
      } finally {
        setLoading(false);
      }
    };
    fetchUsedCars();
  }, []);

  return (
    <main className="min-h-screen bg-neutral-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Buy Used Cars</h1>
        </div>
        {loading ? (
          <div className="text-white text-center py-12">Loading used cars...</div>
        ) : error ? (
          <div className="text-red-500 text-center py-12">{error}</div>
        ) : usedCars.length === 0 ? (
          <div className="text-gray-400 text-center py-12">No used cars found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {usedCars.map((car) => (
              <CarCard
                key={car._id}
                car={{
                  id: car._id,
                  name: car.title,
                  image: car.images && car.images.length > 0 ? car.images[0] : '/images/no-car.png',
                  images: car.images || [], // Pass the images array for compatibility
                  type: car.model || '',
                  price: `₹${car.price.toLocaleString()}`,
                  mileage: `${car.mileage} km`,
                  year: car.year,
                  location: car.location,
                  fuelType: car.fuelType,
                  transmission: car.transmission,
                  engine: '',
                  power: '',
                  groundClearance: '',
                  bootSpace: '',
                  keyFeatures: [],
                  safetyFeatures: [],
                  statePrices: {},
                }}
                basePath="/used-cars"
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default UsedCarsPage;