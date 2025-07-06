"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useComparison } from '../context/ComparisonContext';

import { useAuth } from '../context/AuthContext';

interface Car {
  id: string | number;
  image: string;
  images?: string[];
  name: string;
  type: string;
  fuelType: string;
  transmission: string;
  price: string; // This will be the average/starting price for the card
  engine: string;
  power: string;
  mileage: string; // Fuel efficiency, e.g., km/l
  kmRun?: string; // Total kilometers run in car's life, e.g., 50000
  groundClearance: string;
  bootSpace: string;
  keyFeatures: string[];
  safetyFeatures: string[];
  statePrices?: { [key: string]: string };
  variants?: {
    [variant: string]: {
      [region: string]: string;
    }
  };
}

interface CarCardProps {
  car: Car;
  basePath?: string; // Add optional basePath prop
}

const CarCard = ({ car, basePath }: CarCardProps) => {
  const { addToComparison, removeFromComparison, isInComparison } = useComparison();
  const [isFavorite, setIsFavorite] = useState(false);
  // For variants
  const [selectedVariant, setSelectedVariant] = useState<string>(car.variants ? Object.keys(car.variants)[0] : '');
  // For regions
  const [selectedRegion, setSelectedRegion] = useState<string>(
    car.variants
      ? Object.keys(car.variants[selectedVariant || Object.keys(car.variants)[0]])[0]
      : car.statePrices
        ? Object.keys(car.statePrices)[0]
        : ''
  );
  const router = useRouter();
  const { user, setShowLoginModal, setRedirectAfterLogin } = useAuth();

  // Guard against undefined car prop
  if (!car) {
    return null;
  }

  // Update region when variant changes
  React.useEffect(() => {
    if (car.variants && selectedVariant) {
      setSelectedRegion(Object.keys(car.variants[selectedVariant])[0]);
    }
  }, [selectedVariant, car.variants]);

  const isCompared = isInComparison(car.id);

  const handleComparisonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      router.push('/login');
      return;
    }

    if (isCompared) {
      removeFromComparison(car.id);
    } else {
      addToComparison(car);
    }
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      router.push('/login');
      return;
    }

    setIsFavorite(!isFavorite);
  };

  // Generate slug for details link
  let carSlug = '';
  if (basePath === '/used-cars' && car.id) {
    carSlug = car.id.toString();
  } else if (car.name) {
    carSlug = car.name.toLowerCase().replace(/\s+/g, '-');
  }

  // Determine the base path for the details link
  const detailsBasePath = basePath || '/cars';

  return (
    <div className="bg-neutral-800 rounded-xl shadow-lg overflow-hidden group border border-neutral-700">
      <div className="relative w-full h-52">
        <Image
          src={Array.isArray(car.images) && car.images.length > 0 ? car.images[0] : (car.image || '/images/no-car.png')}
          alt={car.name || car.title || 'Car image'}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          priority
        />
        <button
          onClick={handleFavoriteClick}
          className="absolute top-4 right-4 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-6 w-6 ${isFavorite ? 'text-red-500' : 'text-white'}`}
            fill={isFavorite ? 'currentColor' : 'none'}
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-semibold font-['Inter'] leading-loose text-white">
              {car.name}
            </h2>
            <p className="text-gray-400 text-sm font-normal font-['Inter'] leading-tight">
              {car.type} • {car.fuelType}
            </p>
          </div>
          {/* Display Average/Starting Price */}
          <p className="text-orange-500 text-lg font-semibold font-['Inter'] leading-normal">
            {car.price}
          </p>
        </div>

        {/* Variant & Region-wise Price Dropdowns */}
        {car.variants ? (
          <div className="mb-4 flex gap-2 items-end">
            <div className="flex-1">
              <label htmlFor={`variant-${car.id}`} className="block text-sm font-medium text-gray-400 mb-2">
                Variant:
              </label>
              <select
                id={`variant-${car.id}`}
                value={selectedVariant || Object.keys(car.variants)[0]}
                onChange={(e) => setSelectedVariant(e.target.value)}
                className="w-full rounded-md border border-gray-600 bg-neutral-700 text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                {Object.keys(car.variants).map((variant) => (
                  <option key={variant} value={variant}>{variant}</option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label htmlFor={`region-${car.id}`} className="block text-sm font-medium text-gray-400 mb-2">
                Region:
              </label>
              <select
                id={`region-${car.id}`}
                value={selectedRegion || Object.keys(car.variants[selectedVariant || Object.keys(car.variants)[0]])[0]}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full rounded-md border border-gray-600 bg-neutral-700 text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                {Object.keys(car.variants[selectedVariant || Object.keys(car.variants)[0]]).map((region) => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <p className="text-white text-base font-medium font-['Inter'] mb-0">
                Price: {car.variants[selectedVariant || Object.keys(car.variants)[0]][selectedRegion || Object.keys(car.variants[selectedVariant || Object.keys(car.variants)[0]])[0]]}
              </p>
            </div>
          </div>
        ) : car.statePrices && Object.keys(car.statePrices).length > 0 && (
          <div className="mb-4">
            <label htmlFor={`region-${car.id}`} className="block text-sm font-medium text-gray-400 mb-2">
              Price in Region:
            </label>
            <select
              id={`region-${car.id}`}
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full rounded-md border border-gray-600 bg-neutral-700 text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              {Object.entries(car.statePrices).map(([state, price]) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
            {selectedRegion && car.statePrices[selectedRegion] && (
              <p className="mt-2 text-white text-base font-medium font-['Inter']">
                Price: {car.statePrices[selectedRegion]}
              </p>
            )}
          </div>
        )}

        <div className="grid grid-cols-2 gap-8 mb-6">
          <div>
            <p className="text-gray-400 text-sm font-normal font-['Inter'] leading-tight mb-1">
              Engine
            </p>
            <p className="text-white text-base font-normal font-['Inter'] leading-normal mb-4">
              {car.engine}
            </p>

            <p className="text-gray-400 text-sm font-normal font-['Inter'] leading-tight mb-1">
              Mileage (km/l)
            </p>
            <p className="text-white text-base font-normal font-['Inter'] leading-normal mb-4">
              {car.mileage}
            </p>

            <p className="text-gray-400 text-sm font-normal font-['Inter'] leading-tight mb-1">
              Kilometer Run
            </p>
            <p className="text-white text-base font-normal font-['Inter'] leading-normal">
              {car.kmRun ? `${car.kmRun} km` : 'N/A'}
            </p>
          </div>

          <div>
            <p className="text-gray-400 text-sm font-normal font-['Inter'] leading-tight mb-1">
              Power
            </p>
            <p className="text-white text-base font-normal font-['Inter'] leading-normal mb-4">
              {car.power}
            </p>

            <p className="text-gray-400 text-sm font-normal font-['Inter'] leading-tight mb-1">
              Ground Clearance
            </p>
            <p className="text-white text-base font-normal font-['Inter'] leading-normal">
              {car.groundClearance}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 mt-12">
          {/* Updated View Details Link */}
          <Link
            href={`${detailsBasePath}/${carSlug}`}
            className="w-full h-12 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors text-sm font-medium font-['Inter'] leading-tight flex items-center justify-center"
          >
            View Details
          </Link>
          <button
            onClick={handleComparisonClick}
            className={`w-full h-12 rounded-md text-sm font-medium font-['Inter'] leading-tight flex items-center justify-center ${
              isCompared
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'border-2 border-orange-500 text-orange-500 hover:bg-orange-500/10'
            } transition-colors`}
          >
            {isCompared ? 'Remove from Compare' : 'Add to Compare'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
