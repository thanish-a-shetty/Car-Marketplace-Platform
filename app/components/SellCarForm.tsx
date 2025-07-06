"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface FormData {
  carName: string;
  brand: string;
  year: string;
  price: string;
  mileage: string;
  kmRun: string;
  fuelType: string;
  transmission: string;
  owner: string;
  location: string;
  description: string;
  images: File[];
  contactNumber: string;
  email: string;
}

export default function SellCarForm() {
  const [formData, setFormData] = useState<FormData>({
    carName: '',
    brand: '',
    year: '',
    price: '',
    mileage: '',
    kmRun: '',
    fuelType: '',
    transmission: '',
    owner: '',
    location: '',
    description: '',
    images: [],
    contactNumber: '',
    email: '',
  });

  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...files]
      }));

      // Create preview URLs
      const newPreviewUrls = files.map(file => URL.createObjectURL(file));
      setPreviewImages(prev => [...prev, ...newPreviewUrls]);
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
    setPreviewImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const data = new window.FormData();
      data.append('carName', formData.carName);
      data.append('brand', formData.brand);
      data.append('year', formData.year);
      data.append('price', formData.price);
      data.append('mileage', formData.mileage);
      data.append('kmRun', formData.kmRun);
      data.append('fuelType', formData.fuelType);
      data.append('transmission', formData.transmission);
      data.append('owner', formData.owner);
      data.append('location', formData.location);
      data.append('description', formData.description);
      data.append('contactNumber', formData.contactNumber);
      data.append('email', formData.email);
      formData.images.forEach((img) => data.append('images', img));

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/sell-car`, {
        method: 'POST',
        body: data,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Failed to submit listing');
      }

      setSubmitSuccess(true);
      // Reset form after successful submission
      setFormData({
        carName: '',
        brand: '',
        year: '',
        price: '',
        mileage: '',
        kmRun: '',
        fuelType: '',
        transmission: '',
        owner: '',
        location: '',
        description: '',
        images: [],
        contactNumber: '',
        email: '',
      });
      setPreviewImages([]);
    } catch (error: any) {
      setErrorMessage(error.message || 'Error submitting form');
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-neutral-800 rounded-2xl shadow-xl p-8 border border-neutral-700">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Sell Your Car</h1>
          <p className="text-gray-300">Fill in the details below to list your car for sale</p>
        </div>

        {errorMessage && (
          <div className="mb-4 text-center">
            <span className="text-red-500 font-semibold">{errorMessage}</span>
          </div>
        )}
        {submitSuccess ? (
          <div className="text-center py-8">
            <div className="mb-4">
              <svg className="mx-auto h-12 w-12 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-white mb-2">Listing Submitted Successfully!</h2>
            <p className="text-gray-300 mb-6">Your car has been listed for sale. We'll review it shortly.</p>
            <Link 
              href="/cars" 
              className="inline-block px-6 py-3 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
            >
              Browse Cars
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Car Name
                </label>
                <input
                  type="text"
                  name="carName"
                  value={formData.carName}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-md bg-neutral-700 border-neutral-600 text-white shadow-sm focus:border-orange-500 focus:ring-orange-500"
                  placeholder="e.g., Hyundai Creta"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Brand
                </label>
                <select
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-md bg-neutral-700 border-neutral-600 text-white shadow-sm focus:border-orange-500 focus:ring-orange-500"
                >
                  <option value="">Select Brand</option>
                  <option value="Hyundai">Hyundai</option>
                  <option value="Tata">Tata</option>
                  <option value="Maruti">Maruti</option>
                  <option value="Mahindra">Mahindra</option>
                  <option value="Toyota">Toyota</option>
                  <option value="Honda">Honda</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Year of Manufacture
                </label>
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  required
                  min="1990"
                  max={new Date().getFullYear()}
                  className="w-full rounded-md bg-neutral-700 border-neutral-600 text-white shadow-sm focus:border-orange-500 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Price (₹)
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  min="0"
                  className="w-full rounded-md bg-neutral-700 border-neutral-600 text-white shadow-sm focus:border-orange-500 focus:ring-orange-500"
                  placeholder="e.g., 500000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Mileage (km)
                </label>
                <input
                  type="number"
                  name="mileage"
                  value={formData.mileage}
                  onChange={handleInputChange}
                  required
                  min="0"
                  className="w-full rounded-md bg-neutral-700 border-neutral-600 text-white shadow-sm focus:border-orange-500 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Kilometers Run
                </label>
                <input
                  type="number"
                  name="kmRun"
                  value={formData.kmRun}
                  onChange={handleInputChange}
                  required
                  min="0"
                  className="w-full rounded-md bg-neutral-700 border-neutral-600 text-white shadow-sm focus:border-orange-500 focus:ring-orange-500"
                  placeholder="e.g., 45000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Fuel Type
                </label>
                <select
                  name="fuelType"
                  value={formData.fuelType}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-md bg-neutral-700 border-neutral-600 text-white shadow-sm focus:border-orange-500 focus:ring-orange-500"
                >
                  <option value="">Select Fuel Type</option>
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                  <option value="CNG">CNG</option>
                  <option value="Electric">Electric</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Transmission
                </label>
                <select
                  name="transmission"
                  value={formData.transmission}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-md bg-neutral-700 border-neutral-600 text-white shadow-sm focus:border-orange-500 focus:ring-orange-500"
                >
                  <option value="">Select Transmission</option>
                  <option value="Manual">Manual</option>
                  <option value="Automatic">Automatic</option>
                  <option value="AMT">AMT</option>
                  <option value="CVT">CVT</option>
                  <option value="DCT">DCT</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Number of Owners
                </label>
                <select
                  name="owner"
                  value={formData.owner}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-md bg-neutral-700 border-neutral-600 text-white shadow-sm focus:border-orange-500 focus:ring-orange-500"
                >
                  <option value="">Select Number of Owners</option>
                  <option value="1">1st Owner</option>
                  <option value="2">2nd Owner</option>
                  <option value="3">3rd Owner</option>
                  <option value="4+">4th Owner or More</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-md bg-neutral-700 border-neutral-600 text-white shadow-sm focus:border-orange-500 focus:ring-orange-500"
                  placeholder="e.g., Mumbai, Maharashtra"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full rounded-md bg-neutral-700 border-neutral-600 text-white shadow-sm focus:border-orange-500 focus:ring-orange-500"
                  placeholder="Describe your car's condition, features, and any other relevant details..."
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Car Images
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-600 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-400">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-neutral-700 rounded-md font-medium text-orange-500 hover:text-orange-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-orange-500"
                      >
                        <span>Upload files</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          multiple
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-400">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
                {previewImages.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {previewImages.map((url, index) => (
                      <div key={index} className="relative">
                        <Image
                          src={url}
                          alt={`Preview ${index + 1}`}
                          width={200}
                          height={200}
                          className="rounded-lg object-cover w-full h-32"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Contact Number
                </label>
                <input
                  type="tel"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-md bg-neutral-700 border-neutral-600 text-white shadow-sm focus:border-orange-500 focus:ring-orange-500"
                  placeholder="e.g., 9876543210"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-md bg-neutral-700 border-neutral-600 text-white shadow-sm focus:border-orange-500 focus:ring-orange-500"
                  placeholder="e.g., john@example.com"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Listing'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
} 