"use client";

import { useComparison } from '../context/ComparisonContext';
import Image from 'next/image';
import Link from 'next/link';

interface Car {
  id: number;
  image: string;
  name: string;
  type: string;
  fuelType: string;
  price: string;
  engine: string;
  power: string;
  mileage: string;
  groundClearance: string;
  bootSpace: string;
  keyFeatures: string[];
  safetyFeatures: string[];
}

interface CarComparisonProps {
  cars: Car[];
}

const CarComparison = ({ cars }: CarComparisonProps) => {
  const { removeFromComparison } = useComparison();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold font-['Inter'] leading-9 text-white">
          Detailed Comparison
        </h1>
        <Link
          href="/cars"
          className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
        >
          Back to Cars
        </Link>
      </div>

      {/* Car Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {cars.map((car) => (
          <div
            key={car.id}
            className="bg-neutral-800 rounded-xl shadow-lg overflow-hidden border border-neutral-700"
          >
            <div className="relative w-full h-52">
              <Image
                src={car.image}
                alt={car.name}
                fill
                className="object-cover"
              />
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
                <p className="text-orange-500 text-base font-medium font-['Inter'] leading-normal">
                  {car.price}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8 mb-6">
                <div>
                  <p className="text-gray-400 text-sm font-normal font-['Inter'] leading-tight mb-1">
                    Engine
                  </p>
                  <p className="text-white text-base font-normal font-['Inter'] leading-normal mb-4">
                    {car.engine}
                  </p>

                  <p className="text-gray-400 text-sm font-normal font-['Inter'] leading-tight mb-1">
                    Mileage
                  </p>
                  <p className="text-white text-base font-normal font-['Inter'] leading-normal">
                    {car.mileage}
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

              <button
                onClick={() => removeFromComparison(car.id)}
                className="w-full h-12 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm font-medium font-['Inter'] leading-tight"
              >
                Remove from Comparison
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Comparison Section */}
      <div className="bg-neutral-800 rounded-xl shadow-lg p-6 border border-neutral-700">
        <h2 className="text-xl font-semibold mb-6 text-white">Detailed Specifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map((car) => (
            <div key={car.id}>
              <div className="relative w-full h-48 mb-8">
                <Image
                  src={car.image}
                  alt={car.name}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>

              <h2 className="text-xl font-semibold font-['Inter'] leading-loose mb-4 text-white">
                {car.name}
              </h2>

              <div className="space-y-4">
                <div className="border-b border-neutral-700 pb-4">
                  <p className="text-gray-400 text-sm font-normal font-['Inter'] leading-tight">
                    Price in Maharashtra
                  </p>
                  <p className="text-orange-500 text-base font-medium font-['Inter'] leading-normal">
                    {car.price}
                  </p>
                </div>

                <div className="border-b border-neutral-700 pb-4">
                  <p className="text-gray-400 text-sm font-normal font-['Inter'] leading-tight">
                    Engine & Power
                  </p>
                  <p className="text-white text-base font-normal font-['Inter'] leading-normal">
                    {car.engine} • {car.power}
                  </p>
                </div>

                <div className="border-b border-neutral-700 pb-4">
                  <p className="text-gray-400 text-sm font-normal font-['Inter'] leading-tight">
                    Mileage
                  </p>
                  <p className="text-white text-base font-normal font-['Inter'] leading-normal">
                    {car.mileage}
                  </p>
                </div>

                <div className="border-b border-neutral-700 pb-4">
                  <p className="text-gray-400 text-sm font-normal font-['Inter'] leading-tight">
                    Ground Clearance
                  </p>
                  <p className="text-white text-base font-normal font-['Inter'] leading-normal">
                    {car.groundClearance}
                  </p>
                </div>

                <div className="border-b border-neutral-700 pb-4">
                  <p className="text-gray-400 text-sm font-normal font-['Inter'] leading-tight">
                    Boot Space
                  </p>
                  <p className="text-white text-base font-normal font-['Inter'] leading-normal">
                    {car.bootSpace}
                  </p>
                </div>

                <div>
                  <p className="text-white text-sm font-medium font-['Inter'] leading-tight mb-4">
                    Key Features:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {Array.isArray(car.keyFeatures) && car.keyFeatures.length > 0 ? (
                      car.keyFeatures.map((feature, idx) => (
                        <div
                          key={idx}
                          className="h-6 bg-neutral-700 rounded px-3 flex items-center"
                        >
                          <span className="text-white text-xs font-normal font-['Inter'] leading-none">
                            {feature}
                          </span>
                        </div>
                      ))
                    ) : (
                      <span className="text-gray-400 text-xs">No key features listed</span>
                    )}
                  </div>
                </div>

                <div>
                  <p className="text-white text-sm font-medium font-['Inter'] leading-tight mb-4">
                    Safety Features:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {Array.isArray(car.safetyFeatures) && car.safetyFeatures.length > 0 ? (
                      car.safetyFeatures.map((feature, idx) => (
                        <div
                          key={idx}
                          className="h-6 bg-neutral-700 rounded px-3 flex items-center"
                        >
                          <span className="text-white text-xs font-normal font-['Inter'] leading-none">
                            {feature}
                          </span>
                        </div>
                      ))
                    ) : (
                      <span className="text-gray-400 text-xs">No safety features listed</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarComparison; 