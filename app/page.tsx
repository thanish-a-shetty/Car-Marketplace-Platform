"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from './components/Navbar';

const heroSlides = [
  {
    id: 1,
    image: '/images/hero1.jpg',
    title: 'Find Your Dream Car',
    description: 'Explore our extensive collection of premium vehicles',
  },
  {
    id: 2,
    image: '/images/hero2.jpg',
    title: 'Best Deals on Wheels',
    description: 'Get amazing deals on your favorite cars',
  },
  {
    id: 4,
    image: '/images/slider-lambo-rear.jpg.jpg',
    title: 'Vast Selection',
    description: 'Browse thousands of new and used cars',
  },
  {
    id: 5,
    image: '/images/slider-mustang-city.jpg.jpeg',
    title: 'Easy Comparison',
    description: 'Compare features and prices side-by-side',
  },
  {
    id: 6,
    image: '/images/slider-lambo-side.jpg.jpeg',
    title: 'Sell Your Car Easily',
    description: 'List your car and reach potential buyers',
  },
];

const features = [
  {
    id: 1,
    icon: '🚗',
    title: 'Wide Selection',
    description: 'Choose from thousands of verified cars',
  },
  {
    id: 2,
    icon: '💰',
    title: 'Best Prices',
    description: 'Get the best deals with our price match guarantee',
  },
  {
    id: 3,
    icon: '🔍',
    title: 'Easy Search',
    description: 'Find your perfect car with our advanced filters',
  },
  {
    id: 4,
    icon: '🛡️',
    title: 'Verified Listings',
    description: 'All cars are thoroughly inspected and verified',
  },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isManualControl, setIsManualControl] = useState(false);

  useEffect(() => {
    // Only start interval if not manually controlled
    if (!isManualControl) {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
    }
  }, [currentSlide, isManualControl]); // Re-run effect if isManualControl changes

  const handleManualNav = (newIndex: number) => {
    setCurrentSlide(newIndex);
    setIsManualControl(true); // Set manual control flag
    // You could add a timeout here to switch back to auto after inactivity if desired
    // But for now, it stays manual after first click
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Navbar />
      
      {/* Hero Section with Slider */}
      <div className="relative h-[600px] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="relative h-full">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white max-w-3xl px-4">
                  <h1 className="text-5xl font-bold mb-4 animate-fade-in">
                    {slide.title}
                  </h1>
                  <p className="text-xl mb-8 animate-fade-in">
                    {slide.description}
                  </p>
                  <Link
                    href="/cars"
                    className="btn-primary text-lg px-8 py-4 animate-fade-in"
                  >
                    Explore Cars
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Slider Navigation */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => handleManualNav(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide
                  ? 'bg-white scale-125'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        {/* Left/Right Navigation Buttons */}
        <button
          onClick={() => handleManualNav((currentSlide - 1 + heroSlides.length) % heroSlides.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl z-10 transition-colors"
          aria-label="Previous Slide"
        >
          &#8592;
        </button>
        <button
          onClick={() => handleManualNav((currentSlide + 1) % heroSlides.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl z-10 transition-colors"
          aria-label="Next Slide"
        >
          &#8594;
        </button>
      </div>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            Why Choose CarKraze?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div
                key={feature.id}
                className="bg-white rounded-xl p-6 shadow-soft transition-shadow duration-300 transform hover:scale-105 hover:shadow-strong"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Find Your Perfect Car?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of satisfied customers who found their dream car with us
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/cars"
              className="bg-orange-500 text-white text-lg px-8 py-4 rounded-lg font-medium shadow hover:bg-orange-600 hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            >
              Browse Cars
            </Link>
            <Link
              href="/sell-car"
              className="bg-orange-500 text-white text-lg px-8 py-4 rounded-lg font-medium shadow hover:bg-orange-600 hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            >
              Sell Your Car
            </Link>
            <Link
              href="/login"
              className="bg-orange-500 text-white text-lg px-8 py-4 rounded-lg font-medium shadow hover:bg-orange-600 hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            >
              Login
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}