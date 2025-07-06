"use client";

import { Builder } from "@builder.io/react";
import { BuilderComponent } from "@builder.io/react";
import React, { useState } from "react";
import Header from "./Header";
import CarGrid from "./CarGrid";
import ComparisonSection from "./ComparisonSection";
import { Car } from "./types";

// No more hardcoded initial cars. Cars will be loaded from backend or user selection.

const CarKraze: React.FC = () => {
  // TODO: Fetch cars from backend or context instead of static array
  const [cars, setCars] = useState<Car[]>([]);
  const [comparedCars, setComparedCars] = useState<Car[]>([]);

  // Optionally, fetch car data from backend or context here
  // useEffect(() => { fetchCars(); }, []);

  const handleToggleCompare = (selectedCar: Car) => {
    const updatedCars = cars.map(car => {
      if (car.id === selectedCar.id) {
        return { ...car, isCompared: !car.isCompared };
      }
      return car;
    });

    setCars(updatedCars);
    
    if (selectedCar.isCompared) {
      setComparedCars(comparedCars.filter(car => car.id !== selectedCar.id));
    } else {
      setComparedCars([...comparedCars, selectedCar]);
    }
  };

  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      <Header />
      <CarGrid cars={cars} onToggleCompare={handleToggleCompare} />
      <ComparisonSection comparedCars={comparedCars} />
    </div>
  );
};

// Register custom components for Builder.io
Builder.registerComponent(CarKraze, {
  name: 'CarKraze',
  inputs: [
    {
      name: 'cars',
      type: 'list',
      subFields: [
        { name: 'id', type: 'number' },
        { name: 'name', type: 'string' },
        { name: 'type', type: 'string' },
        { name: 'price', type: 'string' },
        { name: 'engine', type: 'string' },
        { name: 'power', type: 'string' },
        { name: 'mileage', type: 'string' },
        { name: 'clearance', type: 'string' },
        { name: 'bootSpace', type: 'string' },
        { name: 'image', type: 'string' },
        { name: 'features', type: 'list', subFields: [{ name: 'feature', type: 'string' }] },
        { name: 'safety', type: 'list', subFields: [{ name: 'feature', type: 'string' }] }
      ]
    }
  ]
});

export default CarKraze;
