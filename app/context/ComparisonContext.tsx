"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

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

interface ComparisonContextType {
  comparisonCars: Car[];
  addToComparison: (car: Car) => void;
  removeFromComparison: (carId: number) => void;
  clearComparison: () => void;
  isInComparison: (carId: number) => boolean;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

export function ComparisonProvider({ children }: { children: React.ReactNode }) {
  const [comparisonCars, setComparisonCars] = useState<Car[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load comparison cars from localStorage on mount
  useEffect(() => {
    try {
      const savedCars = localStorage.getItem('comparisonCars');
      if (savedCars) {
        setComparisonCars(JSON.parse(savedCars));
      }
    } catch (error) {
      console.error('Error loading comparison cars from localStorage:', error);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Save comparison cars to localStorage whenever they change
  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem('comparisonCars', JSON.stringify(comparisonCars));
      } catch (error) {
        console.error('Error saving comparison cars to localStorage:', error);
      }
    }
  }, [comparisonCars, isInitialized]);

  const addToComparison = (car: Car) => {
    if (!car || !car.id) {
      console.error('Invalid car object:', car);
      return;
    }

    if (comparisonCars.length >= 3) {
      alert('You can compare up to 3 cars at a time');
      return;
    }

    if (!isInComparison(car.id)) {
      setComparisonCars(prev => [...prev, car]);
    }
  };

  const removeFromComparison = (carId: number) => {
    if (!carId) {
      console.error('Invalid car ID:', carId);
      return;
    }

    setComparisonCars(prev => prev.filter(car => car.id !== carId));
  };

  const clearComparison = () => {
    setComparisonCars([]);
  };

  const isInComparison = (carId: number) => {
    if (!carId) {
      console.error('Invalid car ID:', carId);
      return false;
    }

    return comparisonCars.some(car => car.id === carId);
  };

  if (!isInitialized) {
    return null; // or a loading spinner
  }

  return (
    <ComparisonContext.Provider
      value={{
        comparisonCars,
        addToComparison,
        removeFromComparison,
        clearComparison,
        isInComparison,
      }}
    >
      {children}
    </ComparisonContext.Provider>
  );
}

export function useComparison() {
  const context = useContext(ComparisonContext);
  if (context === undefined) {
    throw new Error('useComparison must be used within a ComparisonProvider');
  }
  return context;
} 