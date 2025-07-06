import React from 'react';
import CarCard from './CarCard';
import { Car } from './types';

interface CarGridProps {
  cars: Car[];
  onToggleCompare: (car: Car) => void;
}

const CarGrid: React.FC<CarGridProps> = ({ cars, onToggleCompare }) => {
  return (
    <section className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
      {cars.map((car) => (
        <CarCard
          key={car.id}
          car={car}
          onToggleCompare={onToggleCompare}
        />
      ))}
    </section>
  );
};

export default CarGrid;
