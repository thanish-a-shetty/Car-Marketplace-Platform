"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface CarDetail {
  id: number;
  image: string;
  name: string;
  type: string;
  fuelType: string;
  price: string;
  mileage: string;
  engine: string;
  power: string;
  transmission: string;
  seating?: string;
  bootSpace?: string;
  colors: string[];
  features: string[];
  statePrices?: { [key: string]: string };
  variants?: {
    [variant: string]: {
      [region: string]: string;
    }
  };
  groundClearance?: string;
}

// This would typically come from an API or database
const carDetails: { [key: string]: CarDetail } = {
  // Skoda Kushaq
  "skoda-kushaq": {
    id: 4,
    image: "/images/16_skoda_kushaq_wp.jpg",
    name: "Skoda Kushaq",
    type: "SUV",
    fuelType: "Petrol",
    transmission: "Manual/Automatic",
    price: "₹11,59,000",
    mileage: "17.7 kmpl",
    engine: "1.0L TSI",
    power: "113 bhp",
    seating: "5",
    bootSpace: "385L",
    colors: ["Orange", "White", "Silver", "Red"],
    features: [
      "Sunroof",
      "Touchscreen Infotainment",
      "6 Airbags",
      "Cruise Control",
      "Wireless Charging"
    ],
    variants: {
      "Active": {
        "Delhi": "₹11,59,000",
        "Mumbai": "₹11,79,000",
        "Bangalore": "₹12,09,000",
        "Chandigarh": "₹11,65,000",
        "Puducherry": "₹11,75,000"
      },
      "Style": {
        "Delhi": "₹13,20,000",
        "Mumbai": "₹13,40,000",
        "Bangalore": "₹13,60,000",
        "Chandigarh": "₹13,25,000",
        "Puducherry": "₹13,30,000"
      }
    },
    groundClearance: "188mm"
  },
  // Tata Curvv
  "tata-curvv": {
    id: 5,
    image: "/images/tata curv.jpeg",
    name: "Tata Curvv",
    type: "SUV Coupe",
    fuelType: "Petrol/Diesel",
    transmission: "Manual/Automatic",
    price: "₹12,00,000",
    mileage: "18.5 kmpl (expected)",
    engine: "1.2L Turbo Petrol",
    power: "125 bhp",
    seating: "5",
    bootSpace: "400L",
    colors: ["Bronze", "Blue", "Black"],
    features: [
      "Coupe Design",
      "Panoramic Sunroof",
      "Connected Car Tech",
      "6 Airbags"
    ],
    variants: {
      "Base": {
        "Delhi": "₹12,00,000",
        "Mumbai": "₹12,20,000",
        "Bangalore": "₹12,50,000",
        "Chandigarh": "₹12,10,000",
        "Puducherry": "₹12,15,000"
      },
      "Top": {
        "Delhi": "₹13,10,000",
        "Mumbai": "₹13,30,000",
        "Bangalore": "₹13,60,000",
        "Chandigarh": "₹13,20,000",
        "Puducherry": "₹13,25,000"
      }
    },
    groundClearance: "200mm"
  },
  // Toyota Yaris
  "toyota-yaris": {
    id: 6,
    image: "/images/toyota yaris.png",
    name: "Toyota Yaris",
    type: "Sedan",
    fuelType: "Petrol",
    transmission: "Manual/Automatic",
    price: "₹9,00,000",
    mileage: "17.1 kmpl",
    engine: "1.5L Petrol",
    power: "107 bhp",
    seating: "5",
    bootSpace: "476L",
    colors: ["White", "Silver", "Grey", "Red"],
    features: [
      "7 Airbags",
      "Touchscreen Infotainment",
      "Climate Control",
      "Rear Camera"
    ],
    variants: {
      "J": {
        "Delhi": "₹9,00,000",
        "Mumbai": "₹9,20,000",
        "Bangalore": "₹9,50,000",
        "Chandigarh": "₹9,10,000",
        "Puducherry": "₹9,15,000"
      },
      "V": {
        "Delhi": "₹10,10,000",
        "Mumbai": "₹10,30,000",
        "Bangalore": "₹10,60,000",
        "Chandigarh": "₹10,20,000",
        "Puducherry": "₹10,25,000"
      }
    },
    groundClearance: "175mm"
  },
  // Hyundai Verna
  "hyundai-verna": {
    id: 7,
    image: "/images/verna.jpg",
    name: "Hyundai Verna",
    type: "Sedan",
    fuelType: "Petrol/Diesel",
    transmission: "Manual/Automatic",
    price: "₹10,90,000",
    mileage: "18.6 kmpl",
    engine: "1.5L Petrol",
    power: "115 bhp",
    seating: "5",
    bootSpace: "480L",
    colors: ["Black", "White", "Blue", "Grey"],
    features: [
      "Ventilated Seats",
      "Digital Cluster",
      "Sunroof",
      "6 Airbags"
    ],
    variants: {
      "S": {
        "Delhi": "₹10,90,000",
        "Mumbai": "₹11,10,000",
        "Bangalore": "₹11,30,000",
        "Chandigarh": "₹10,95,000",
        "Puducherry": "₹11,00,000"
      },
      "SX (O)": {
        "Delhi": "₹12,00,000",
        "Mumbai": "₹12,20,000",
        "Bangalore": "₹12,40,000",
        "Chandigarh": "₹12,05,000",
        "Puducherry": "₹12,10,000"
      }
    },
    groundClearance: "170mm"
  },
  // Skoda Slavia
  "skoda-slavia": {
    id: 8,
    image: "/images/slavia.jpg",
    name: "Skoda Slavia",
    type: "Sedan",
    fuelType: "Petrol",
    transmission: "Manual/Automatic",
    price: "₹11,39,000",
    mileage: "18.7 kmpl",
    engine: "1.0L TSI Petrol",
    power: "115 bhp",
    seating: "5",
    bootSpace: "521L",
    colors: ["Red", "White", "Silver", "Blue"],
    features: [
      "Wireless Charging",
      "Sunroof",
      "6 Airbags",
      "Cruise Control"
    ],
    variants: {
      "Active": {
        "Delhi": "₹11,39,000",
        "Mumbai": "₹11,59,000",
        "Bangalore": "₹11,89,000",
        "Chandigarh": "₹11,45,000",
        "Puducherry": "₹11,50,000"
      },
      "Style": {
        "Delhi": "₹13,49,000",
        "Mumbai": "₹13,69,000",
        "Bangalore": "₹13,99,000",
        "Chandigarh": "₹13,55,000",
        "Puducherry": "₹13,60,000"
      }
    },
    groundClearance: "179mm"
  },
  "hyundai-creta": {
    id: 1,
    image: "/images/hyundai-creta-4k-sunset-2024-cars-su2.jpg",
    name: "Hyundai Creta",
    type: "SUV",
    fuelType: "Petrol",
    price: "₹14,50,000",
    mileage: "16.8 kmpl",
    engine: "1.5L",
    power: "113 bhp",
    transmission: "Manual",
    seating: "5",
    bootSpace: "433L",
    colors: ["White", "Black", "Silver", "Blue"],
    features: [
      "Sunroof",
      "Leather Seats",
      "Apple CarPlay",
      "Android Auto",
      "Cruise Control",
      "Parking Sensors"
    ],
    variants: {
      "E": {
        "Delhi": "₹14,50,000",
        "Mumbai": "₹15,20,000",
        "Bangalore": "₹14,80,000",
        "Chandigarh": "₹14,65,000",
        "Puducherry": "₹14,70,000"
      },
      "SX (O)": {
        "Delhi": "₹16,20,000",
        "Mumbai": "₹16,90,000",
        "Bangalore": "₹16,50,000",
        "Chandigarh": "₹16,35,000",
        "Puducherry": "₹16,40,000"
      }
    },
    groundClearance: "190mm"
  },
  "tata-nexon": {
    id: 2,
    image: "/images/cars/nexon.jpg",
    name: "Tata Nexon",
    type: "Compact SUV",
    fuelType: "Diesel",
    transmission: "Automatic",
    price: "₹9,60,000",
    mileage: "21.5 kmpl",
    engine: "1.5L",
    power: "108 bhp",
    colors: [],
    features: [],
     variants: {
      "XM": {
        "Delhi": "₹9,60,000",
        "Mumbai": "₹10,00,000",
        "Bangalore": "₹9,80,000",
        "Chandigarh": "₹9,75,000",
        "Puducherry": "₹9,80,000"
      },
      "XZA Plus": {
        "Delhi": "₹11,10,000",
        "Mumbai": "₹11,50,000",
        "Bangalore": "₹11,30,000",
        "Chandigarh": "₹11,25,000",
        "Puducherry": "₹11,30,000"
      }
    },
    groundClearance: "209mm"
  },
  "maruti-baleno": {
    id: 3,
    image: "/images/cars/baleno.jpg",
    name: "Maruti Baleno",
    type: "Premium Hatchback",
    fuelType: "Petrol",
    transmission: "Manual",
    price: "₹8,90,000",
    mileage: "22.3 kmpl",
    engine: "1.2L",
    power: "88 bhp",
    colors: [],
    features: [],
     variants: {
      "Sigma": {
        "Delhi": "₹8,90,000",
        "Mumbai": "₹9,30,000",
        "Bangalore": "₹9,10,000",
        "Chandigarh": "₹9,05,000",
        "Puducherry": "₹9,10,000"
      },
      "Alpha": {
        "Delhi": "₹10,20,000",
        "Mumbai": "₹10,60,000",
        "Bangalore": "₹10,40,000",
        "Chandigarh": "₹10,35,000",
        "Puducherry": "₹10,40,000"
      }
    },
    groundClearance: "170mm"
  }
};

export default function CarDetailsPage({ params }: { params: { slug: string } }) {
  const [selectedVariant, setSelectedVariant] = useState<string>(() => {
    const car = carDetails[params.slug];
    return car.variants ? Object.keys(car.variants)[0] : '';
  });
  const [selectedRegion, setSelectedRegion] = useState<string>(() => {
    const car = carDetails[params.slug];
    if (car.variants && Object.keys(car.variants).length > 0) {
      const variant = Object.keys(car.variants)[0];
      return Object.keys(car.variants[variant])[0];
    } else if (car.statePrices && Object.keys(car.statePrices).length > 0) {
      return Object.keys(car.statePrices)[0];
    }
    return '';
  });

  // Update region when variant changes
  useEffect(() => {
    const car = carDetails[params.slug];
    if (car.variants && selectedVariant) {
      setSelectedRegion(Object.keys(car.variants[selectedVariant])[0]);
    }
  }, [selectedVariant, params.slug]);

  const car: CarDetail | undefined = carDetails[params.slug];

  useEffect(() => {
    if (car && car.statePrices) {
      setSelectedRegion(Object.keys(car.statePrices)[0]);
    }
  }, [car]);

  if (!car) {
    return (
      <main className="min-h-screen bg-neutral-100">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold">Car not found</h1>
          <Link href="/cars" className="text-blue-600 hover:underline">
            Back to cars
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Link href="/cars" className="text-blue-600 hover:underline mb-6 inline-block">
          ← Back to cars
        </Link>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="relative w-full h-96">
            <Image
              src={car.image}
              alt={car.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="p-8">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h1 className="text-3xl font-bold font-['Inter'] leading-tight mb-2">
                  {car.name}
                </h1>
                <p className="text-black/80 text-lg font-normal font-['Inter']">
                  {car.type} • {car.fuelType}
                </p>
              </div>
              <p className="text-2xl font-semibold font-['Inter']">
                {car.price}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
              <div>
                <p className="text-black/80 text-sm font-normal font-['Inter'] mb-1">
                  Engine
                </p>
                <p className="text-black text-base font-medium font-['Inter']">
                  {car.engine}
                </p>
              </div>
              <div>
                <p className="text-black/80 text-sm font-normal font-['Inter'] mb-1">
                  Power
                </p>
                <p className="text-black text-base font-medium font-['Inter']">
                  {car.power}
                </p>
              </div>
              <div>
                <p className="text-black/80 text-sm font-normal font-['Inter'] mb-1">
                  Mileage
                </p>
                <p className="text-black text-base font-medium font-['Inter']">
                  {car.mileage}
                </p>
              </div>
              {car.transmission && (
              <div>
                <p className="text-black/80 text-sm font-normal font-['Inter'] mb-1">
                  Transmission
                </p>
                <p className="text-black text-base font-medium font-['Inter']">
                  {car.transmission}
                </p>
              </div>
              )}
               {car.seating && (
                <div>
                  <p className="text-black/80 text-sm font-normal font-['Inter'] mb-1">
                    Seating
                  </p>
                  <p className="text-black text-base font-medium font-['Inter']">
                    {car.seating}
                  </p>
                </div>
              )}
              {car.bootSpace && (
                <div>
                  <p className="text-black/80 text-sm font-normal font-['Inter'] mb-1">
                    Boot Space
                  </p>
                  <p className="text-black text-base font-medium font-['Inter']">
                    {car.bootSpace}
                  </p>
                </div>
              )}
               {car.groundClearance && (
                <div>
                  <p className="text-black/80 text-sm font-normal font-['Inter'] mb-1">
                    Ground Clearance
                  </p>
                  <p className="text-black text-base font-medium font-['Inter']">
                    {car.groundClearance}
                  </p>
                </div>
              )}

            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold font-['Inter'] mb-4">
                Available Colors
              </h2>
              <div className="flex gap-4">
                {car.colors.map((color) => (
                  <div
                    key={color}
                    className="w-8 h-8 rounded-full border border-gray-200"
                    style={{ backgroundColor: color.toLowerCase() }}
                  />
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold font-['Inter'] mb-4">
                Key Features
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {car.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-2 text-black/80"
                  >
                    <span className="w-2 h-2 bg-blue-600 rounded-full" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            {/* Variant & Region-wise Price Filter */}
            {car.variants ? (
              <div className="mb-8">
                <h2 className="text-xl font-semibold font-['Inter'] mb-4">
                  Variant & Region-wise Price
                </h2>
                <div className="flex items-center gap-4">
                  <label htmlFor="variant-select" className="text-black/80 text-base font-normal font-['Inter']">
                    Select Variant:
                  </label>
                  <select
                    id="variant-select"
                    value={selectedVariant}
                    onChange={(e) => setSelectedVariant(e.target.value)}
                    className="rounded-md border border-gray-300 bg-white px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    {Object.keys(car.variants).map((variant) => (
                      <option key={variant} value={variant}>{variant}</option>
                    ))}
                  </select>
                  <label htmlFor="region-select" className="text-black/80 text-base font-normal font-['Inter']">
                    Select Region:
                  </label>
                  <select
                    id="region-select"
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="rounded-md border border-gray-300 bg-white px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    {Object.keys(car.variants[selectedVariant]).map((region) => (
                      <option key={region} value={region}>{region}</option>
                    ))}
                  </select>
                </div>
                <div className="mt-4 text-black text-lg font-semibold font-['Inter']">
                  Price for {selectedVariant} in {selectedRegion}: {car.variants[selectedVariant][selectedRegion]}
                </div>
              </div>
            ) : car.statePrices && Object.keys(car.statePrices).length > 0 && (
              <div className="mb-8">
              <h2 className="text-xl font-semibold font-['Inter'] mb-4">
                  Region-wise Price
              </h2>
                <div className="flex items-center gap-4">
                  <label htmlFor="region-select" className="text-black/80 text-base font-normal font-['Inter']">
                    Select Region:
                  </label>
                  <select
                    id="region-select"
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="rounded-md border border-gray-300 bg-white px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                {Object.entries(car.statePrices).map(([state, price]) => (
                      <option key={state} value={state}>
                      {state}
                      </option>
                    ))}
                  </select>
                </div>
                {selectedRegion && car.statePrices[selectedRegion] && (
                  <div className="mt-4 text-black text-lg font-semibold font-['Inter']">
                    Price in {selectedRegion}: {car.statePrices[selectedRegion]}
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      </div>
    </main>
  );
} 