import React from 'react';
import FeatureTag from './FeatureTag';
import { Car } from './types';

interface ComparisonSectionProps {
  comparedCars: Car[];
}

const ComparisonSection: React.FC<ComparisonSectionProps> = ({ comparedCars }) => {
  if (comparedCars.length === 0) {
    return null;
  }

  return (
    <section className="mt-12">
      <h2 className="mb-6 text-2xl font-bold">Detailed Comparison</h2>
      <div className="p-6 bg-white rounded-xl shadow-sm">
        <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
          {comparedCars.map((car) => (
            <article key={car.id}>
              <img
                className="object-cover mb-4 w-full rounded-lg h-[200px]"
                src={car.image}
                alt={car.name}
              />
              <h3 className="mb-4 text-xl font-semibold">{car.name}</h3>
              <div className="py-4 border-b border-neutral-200">
                <p className="mb-1 text-sm text-black text-opacity-80">
                  Boot Space
                </p>
                <p className="text-base">{car.bootSpace}</p>
              </div>
              <div className="py-4 border-b border-neutral-200">
                <p className="mb-2 text-sm font-medium">Key Features:</p>
                <div className="flex flex-wrap gap-2">
                  {car.features.map((feature, index) => (
                    <FeatureTag key={index} text={feature} />
                  ))}
                </div>
              </div>
              <div className="py-4">
                <p className="mb-2 text-sm font-medium">
                  Safety Features:
                </p>
                <div className="flex flex-wrap gap-2">
                  {car.safety.map((feature, index) => (
                    <FeatureTag key={index} text={feature} />
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
