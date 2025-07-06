"use client";

import CarComparison from '../components/CarComparison';
import { useComparison } from '../context/ComparisonContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ComparePage() {
  const { comparisonCars } = useComparison();
  const router = useRouter();

  useEffect(() => {
    if (comparisonCars.length === 0) {
      router.push('/cars');
    }
  }, [comparisonCars, router]);

  if (comparisonCars.length === 0) {
    return null;
  }

  return (
    <main className="min-h-screen bg-neutral-900 relative">
      {/* Background Image Container */}
      <div 
        className="fixed inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("/images/cars-bg.jpg")',
        }}
      >
        <div className="absolute inset-0 bg-black/70" /> {/* Darker overlay for better content visibility */}
      </div>

      <div className="relative z-10 pt-24">
        <CarComparison cars={comparisonCars} />
      </div>
    </main>
  );
} 