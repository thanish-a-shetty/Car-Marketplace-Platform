"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

// Define the UsedCar interface, matching the backend UsedCar model
interface UsedCarDetail {
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
  seller?: {
    _id: string;
    username: string;
    email: string;
    phone?: string;
  };
  buyer?: {
    _id: string;
    username: string;
    email: string;
    phone?: string;
  } | null;
  createdAt: string;
  condition?: string;
  kilometersRun?: number;
}

// Sample Used Car Data (This should ideally come from an API in a real application)
// Using the same data structure as the list page for consistency
const usedCarDetails: { [key: string]: UsedCarDetail } = {
    "tata-nexon": {
    id: 101,
    image: "/images/cars/nexon.jpg",
    name: "Tata Nexon",
    type: "Compact SUV",
    price: "₹7,50,000",
    mileage: "45,000 km",
    year: 2019,
    location: "Mumbai",
    fuelType: "Diesel",
    transmission: "Manual",
    statePrices: {
        "Mumbai": "₹7,50,000",
        "Pune": "₹7,40,000",
        "Bangalore": "₹7,80,000"
    }
  },
  "hyundai-creta": {
    id: 102,
    image: "/images/hyundai-creta-4k-sunset-2024-cars-su2.jpg",
    name: "Hyundai Creta",
    type: "SUV",
    price: "₹10,20,000",
    mileage: "30,000 km",
    year: 2020,
    location: "Delhi",
    fuelType: "Petrol",
    transmission: "Automatic",
    statePrices: {
        "Delhi": "₹10,20,000",
        "Jaipur": "₹10,00,000",
        "Chandigarh": "₹10,30,000"
    }
  },
    "maruti-baleno": {
    id: 103,
    image: "/images/cars/baleno.jpg",
    name: "Maruti Baleno",
    type: "Premium Hatchback",
    price: "₹5,80,000",
    mileage: "60,000 km",
    year: 2017,
    location: "Chennai",
    fuelType: "Petrol",
    transmission: "Manual",
    statePrices: {
        "Chennai": "₹5,80,000",
        "Bangalore": "₹6,00,000",
        "Hyderabad": "₹5,70,000"
    }
  }
};

export default function UsedCarDetailsPage({ params }: { params: { slug: string } }) {
  const [car, setCar] = useState<UsedCarDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchCarDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log(`Attempting to fetch car details for slug: ${params.slug}`);
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/used-cars/${params.slug}`);
        if (!res.ok) {
          if (res.status === 404) {
            throw new Error('Car not found');
          } else {
            const errorText = await res.text();
            console.error(`API Error: ${res.status} - ${errorText}`);
            throw new Error(`Failed to fetch car details: ${res.statusText}`);
          }
        }
        const data: UsedCarDetail = await res.json();
        console.log('Fetched car data:', data);

        // Construct full image URLs if images exist
        const imagesWithFullUrl = data.images?.map(imagePath => {
          // Clean the image path: remove leading slash or 'uploads/' if present
          let cleanedPath = imagePath.replace(/^\/+/, '').replace(/^uploads\//, '');
          // Construct the full URL
          return `http://localhost:5000/uploads/${cleanedPath}`;
        }) || []; // Ensure it's always an array

        setCar({
            ...data,
            images: imagesWithFullUrl
        });

        if (imagesWithFullUrl.length > 0) {
          setSelectedImage(imagesWithFullUrl[0]); // Set the first image as selected initially
        }
      } catch (err: any) {
        console.error('Error fetching car details:', err);
        setError(err.message || 'Error loading car details');
      } finally {
        setLoading(false);
      }
    };

    if (params.slug) {
        fetchCarDetails();
    }
  }, [params.slug]);

  if (loading) {
    return (
      <main className="min-h-screen bg-neutral-900 pt-16">
        <div className="max-w-7xl mx-auto px-4 py-8 text-white text-center">
          Loading car details...
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-neutral-900 pt-16">
        <div className="max-w-7xl mx-auto px-4 py-8 text-red-500 text-center">
          {error}
        </div>
      </main>
    );
  }

  if (!car) {
    return (
      <main className="min-h-screen bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 py-8 text-white">
          <h1 className="text-2xl font-bold">Used Car not found</h1>
          <Link href="/used-cars" className="text-blue-600 hover:underline">
            Back to Used Cars
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-900 text-white pt-16">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Link href="/used-cars" className="text-blue-400 hover:underline mb-6 inline-block">
          ← Back to Used Cars
        </Link>

        {car && (
          <div className="bg-neutral-800 rounded-xl shadow-md overflow-hidden">
            <div className="relative w-full h-96">
              {selectedImage ? (
                <Image
                  src={selectedImage}
                  alt={car.title || 'Used Car'}
                  fill
                  className="object-cover rounded-xl"
                />
              ) : (
                 <div className="w-full h-full flex items-center justify-center bg-neutral-700 text-gray-400 rounded-xl">
                    No Image Available
                 </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {car.images && car.images.length > 1 && (
              <div className="mt-4 flex gap-4 overflow-x-auto">
                {car.images.map((image, index) => (
                  <div
                    key={index}
                    className={`relative w-24 h-16 cursor-pointer rounded-md overflow-hidden ${selectedImage === image ? 'border-2 border-orange-500' : ''}`}
                    onClick={() => setSelectedImage(image)}
                  >
                    <Image
                      src={image}
                      alt={`${car.title || 'Used Car'} - Image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            <div className="p-8">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h1 className="text-3xl font-bold font-['Inter'] leading-tight mb-2">
                    {car.title || 'N/A'}
                  </h1>
                   <p className="text-gray-400 text-lg font-normal font-['Inter']">
                    {car.brand || 'N/A'} {car.model || 'N/A'}
                  </p>
                </div>
                <p className="text-orange-500 text-2xl font-semibold font-['Inter']">
                  {car.price !== undefined && car.price !== null ? `₹${car.price.toLocaleString()}` : 'N/A'}
                </p>
              </div>

               {/* Key Details Section */}
               <div className="mb-8 p-6 bg-neutral-700 rounded-xl">
                   <h2 className="text-xl font-semibold font-['Inter'] mb-4 text-white">Key Details</h2>
                   <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-gray-300">
                       <div>
                           <p className="text-sm font-normal font-['Inter'] mb-1">Year of Manufacture</p>
                           <p className="text-base font-medium font-['Inter'] text-white">{car.year || 'N/A'}</p>
                       </div>
                       <div>
                           <p className="text-sm font-normal font-['Inter'] mb-1">Mileage</p>
                           <p className="text-base font-medium font-['Inter'] text-white">{typeof car.mileage === 'number' ? `${car.mileage} km` : 'N/A'}</p>
                       </div>
                       <div>
                           <p className="text-sm font-normal font-['Inter'] mb-1">Kilometers Run</p>
                           <p className="text-base font-medium font-['Inter'] text-white">{typeof car.kilometersRun === 'number' ? `${car.kilometersRun} km` : 'N/A'}</p>
                       </div>
                       {car.fuelType && (
                            <div>
                                <p className="text-sm font-normal font-['Inter'] mb-1">Fuel Type</p>
                                <p className="text-base font-medium font-['Inter'] text-white">{car.fuelType}</p>
                            </div>
                       )}
                        {car.transmission && (
                            <div>
                                <p className="text-sm font-normal font-['Inter'] mb-1">Transmission</p>
                                <p className="text-base font-medium font-['Inter'] text-white">{car.transmission}</p>
                            </div>
                        )}
                        {car.condition && (
                            <div>
                                <p className="text-sm font-normal font-['Inter'] mb-1">Condition</p>
                                <p className="text-base font-medium font-['Inter'] text-white">{car.condition}</p>
                            </div>
                        )}
                         <div>
                           <p className="text-sm font-normal font-['Inter'] mb-1">Location</p>
                           <p className="text-base font-medium font-['Inter'] text-white">{car.location || 'N/A'}</p>
                       </div>
                   </div>
               </div>

              {car.description && (
                 <div className="mb-8">
                  <h2 className="text-xl font-semibold font-['Inter'] mb-4">
                    Description
                  </h2>
                  <p className="text-gray-400 text-base font-normal font-['Inter']">
                    {car.description}
                  </p>
                 </div>
              )}

              {/* Seller Contact Details (Explicit Fields) */}
              {(car.seller?.phone || car.seller?.email) && (
                  <div className="mb-8 p-6 bg-neutral-700 rounded-xl">
                      <h2 className="text-xl font-semibold font-['Inter'] mb-4 text-white">Contact Seller</h2>
                      <div className="text-gray-300 grid grid-cols-1 md:grid-cols-2 gap-4">
                          {car.seller?.phone && (
                              <p className="text-base font-normal font-['Inter']">
                                  Contact No.: <span className="font-medium text-white">{car.seller.phone}</span>
                              </p>
                          )}
                           {car.seller?.email && (
                              <p className="text-base font-normal font-['Inter']">
                                  Seller Email: <span className="font-medium text-white">{car.seller.email}</span>
                              </p>
                           )}
                      </div>
                  </div>
              )}

              {/* Seller Information */}
              {car.seller && (
                <div className="mb-8 p-6 bg-neutral-700 rounded-xl">
                  <h2 className="text-xl font-semibold font-['Inter'] mb-4 text-white">Seller Information</h2>
                  <div className="text-gray-300 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <p className="text-base font-normal font-['Inter']">
                        Name: <span className="font-medium text-white">{car.seller.username || 'N/A'}</span>
                      </p>
                      <p className="text-base font-normal font-['Inter']">
                        Email: <span className="font-medium text-white">{car.seller.email || 'N/A'}</span>
                      </p>
                      {car.seller.phone && (
                        <p className="text-base font-normal font-['Inter']">
                          Phone: <span className="font-medium text-white">{car.seller.phone}</span>
                        </p>
                      )}
                   </div>
                </div>
              )}

              {/* Region-wise Price Filter - This might not be applicable for used cars in the same way as new cars, 
                   but keeping the structure in case you want to adapt it. */}
              {/* {car.statePrices && Object.keys(car.statePrices).length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold font-['Inter'] mb-4">
                    Region-wise Price
                  </h2>
                  <div className="flex items-center gap-4">
                    <label htmlFor="region-select" className="text-gray-400 text-base font-normal font-['Inter']">
                      Select Region:
                    </label>
                    <select
                      id="region-select"
                      value={selectedRegion}
                      onChange={(e) => setSelectedRegion(e.target.value)}
                      className="rounded-md border border-gray-600 bg-neutral-700 text-white px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      {Object.entries(car.statePrices).map(([state, price]) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                  </div>
                  {selectedRegion && car.statePrices[selectedRegion] && (
                    <div className="mt-4 text-white text-lg font-semibold font-['Inter']">
                      Price in {selectedRegion}: {car.statePrices[selectedRegion]}
                    </div>
                  )}
                </div>
              )} */}

            </div>
          </div>
        )}
      </div>
    </main>
  );
} 