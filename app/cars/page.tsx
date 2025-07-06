"use client";

import { useState } from 'react';
import CarCard from '../components/CarCard';
import { useComparison } from '../context/ComparisonContext';

const cars = [
  // Skoda Kushaq
  {
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
    groundClearance: "188mm",
    bootSpace: "385L",
    keyFeatures: [
      "Sunroof",
      "Touchscreen Infotainment",
      "6 Airbags",
      "Cruise Control",
      "Wireless Charging"
    ],
    safetyFeatures: [
      "ABS with EBD",
      "Electronic Stability Control",
      "Hill Hold Control",
      "ISOFIX Child Seat Mounts"
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
    }
  },
  // Tata Curvv
  {
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
    groundClearance: "200mm",
    bootSpace: "400L",
    keyFeatures: [
      "Coupe Design",
      "Panoramic Sunroof",
      "Connected Car Tech",
      "6 Airbags"
    ],
    safetyFeatures: [
      "ABS with EBD",
      "ESC",
      "Rear Parking Sensors",
      "ISOFIX Child Seat Mounts"
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
    }
  },
  // Toyota Yaris
  {
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
    groundClearance: "175mm",
    bootSpace: "476L",
    keyFeatures: [
      "7 Airbags",
      "Touchscreen Infotainment",
      "Climate Control",
      "Rear Camera"
    ],
    safetyFeatures: [
      "ABS with EBD",
      "Vehicle Stability Control",
      "Hill Start Assist",
      "ISOFIX Child Seat Mounts"
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
    }
  },
  // Hyundai Verna
  {
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
    groundClearance: "170mm",
    bootSpace: "480L",
    keyFeatures: [
      "Ventilated Seats",
      "Digital Cluster",
      "Sunroof",
      "6 Airbags"
    ],
    safetyFeatures: [
      "ABS with EBD",
      "ESC",
      "Rear Parking Sensors",
      "ISOFIX Child Seat Mounts"
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
    }
  },
  // Skoda Slavia
  {
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
    groundClearance: "179mm",
    bootSpace: "521L",
    keyFeatures: [
      "Wireless Charging",
      "Sunroof",
      "6 Airbags",
      "Cruise Control"
    ],
    safetyFeatures: [
      "ABS with EBD",
      "ESC",
      "Hill Hold Control",
      "ISOFIX Child Seat Mounts"
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
    }
  },
  {
    id: 1,
    image: "/images/cars/creta.jpg",
    name: "Hyundai Creta",
    type: "SUV",
    fuelType: "Petrol",
    transmission: "Manual",
    price: "₹14,50,000",
    mileage: "16.8 kmpl",
    engine: "1.5L",
    power: "113 bhp",
    groundClearance: "190mm",
    bootSpace: "433L",
    keyFeatures: [
      "Smart Hybrid",
      "Head-up Display",
      "Smart Play Studio",
      "Auto AC"
    ],
    safetyFeatures: [
      "Dual Airbags",
      "ABS with EBD",
      "ISOFIX",
      "Impact Sensing"
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
    }
  },
  {
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
    groundClearance: "209mm",
    bootSpace: "382L",
    keyFeatures: [
      "Electric Sunroof",
      "Air Purifier",
      "Connected Car Tech",
      "Multi Drive Modes"
    ],
    safetyFeatures: [
      "5 Star NCAP",
      "6 Airbags",
      "ESP",
      "Traction Control"
    ],
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
    }
  },
  {
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
    groundClearance: "170mm",
    bootSpace: "318L",
    keyFeatures: [
      "Smart Hybrid",
      "Head-up Display",
      "Smart Play Studio",
      "Auto AC"
    ],
    safetyFeatures: [
      "Dual Airbags",
      "ABS with EBD",
      "ISOFIX",
      "Impact Sensing"
    ],
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
    }
  }
];

const carTypes = ["All", "SUV", "Compact SUV", "Premium Hatchback"];
const fuelTypes = ["All", "Petrol", "Diesel"];
const transmissionTypes = ["All", "Manual", "Automatic"];
const priceRanges = [
  "All",
  "Under ₹5 Lakh",
  "₹5-10 Lakh",
  "₹10-15 Lakh",
  "Above ₹15 Lakh"
];

const regions = [
  "All",
  "North",
  "South",
  "East",
  "West",
  "Central",
  "Northeast",
  "Union Territories"
];

export default function CarsPage() {
  const { comparisonCars } = useComparison();
  const [selectedType, setSelectedType] = useState("All");
  const [selectedFuelType, setSelectedFuelType] = useState("All");
  const [selectedTransmission, setSelectedTransmission] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState("All");
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [sortBy, setSortBy] = useState("name");

  const getPriceRange = (price: string) => {
    const numericPrice = parseInt(price.replace(/[^0-9]/g, ""));
    if (numericPrice < 500000) return "Under ₹5 Lakh";
    if (numericPrice < 1000000) return "₹5-10 Lakh";
    if (numericPrice < 1500000) return "₹10-15 Lakh";
    return "Above ₹15 Lakh";
  };

  const filteredCars = cars
    .filter(car => selectedType === "All" || car.type === selectedType)
    .filter(car => selectedFuelType === "All" || car.fuelType === selectedFuelType)
    .filter(car => selectedTransmission === "All" || car.transmission === selectedTransmission)
    .filter(car => selectedPriceRange === "All" || getPriceRange(car.price) === selectedPriceRange)
    .sort((a, b) => {
      switch (sortBy) {
        case "price":
          return parseInt(a.price.replace(/[^0-9]/g, "")) - parseInt(b.price.replace(/[^0-9]/g, ""));
        case "mileage":
          return parseFloat(b.mileage) - parseFloat(a.mileage);
        case "name":
        default:
          return a.name.localeCompare(b.name);
      }
    });

  return (
    <main className="min-h-screen bg-neutral-900 relative">
      {/* Background Image Container */}
      <div 
        className="fixed inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("/images/car-sunset.jpg.jpg")',
        }}
      >
        <div className="absolute inset-0 bg-black/70" /> {/* Darker overlay for better content visibility */}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8 pt-24">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold font-['Inter'] leading-9 text-white">
            Available Cars
          </h1>
          {comparisonCars.length > 0 && (
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-300">
                {comparisonCars.length} car{comparisonCars.length > 1 ? 's' : ''} selected for comparison
              </span>
              <a
                href="/compare"
                className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
              >
                Compare Now
              </a>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Car Type
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full rounded-md border border-gray-600 bg-neutral-800 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              {carTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Fuel Type
            </label>
            <select
              value={selectedFuelType}
              onChange={(e) => setSelectedFuelType(e.target.value)}
              className="w-full rounded-md border border-gray-600 bg-neutral-800 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              {fuelTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Transmission
            </label>
            <select
              value={selectedTransmission}
              onChange={(e) => setSelectedTransmission(e.target.value)}
              className="w-full rounded-md border border-gray-600 bg-neutral-800 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              {transmissionTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Price Range
            </label>
            <select
              value={selectedPriceRange}
              onChange={(e) => setSelectedPriceRange(e.target.value)}
              className="w-full rounded-md border border-gray-600 bg-neutral-800 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              {priceRanges.map(range => (
                <option key={range} value={range}>{range}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Sort By
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full md:w-48 rounded-md border border-gray-600 bg-neutral-800 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="name">Name</option>
            <option value="price">Price</option>
            <option value="mileage">Mileage</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>

        {filteredCars.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              No cars found matching your criteria
            </p>
          </div>
        )}
      </div>
    </main>
  );
} 