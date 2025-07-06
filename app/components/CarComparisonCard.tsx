import Image from 'next/image';
import Link from 'next/link';

interface CarComparisonCardProps {
  image: string;
  name: string;
  type: string;
  price: string;
  mileage: string;
  engine: string;
  power: string;
  features: string[];
}

const CarComparisonCard = ({
  image,
  name,
  type,
  price,
  mileage,
  engine,
  power,
  features
}: CarComparisonCardProps) => {
  return (
    <div className="w-[588px] h-[514px] bg-white rounded-xl shadow-md">
      <div className="relative w-full h-64">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover rounded-t-xl"
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-semibold font-['Inter'] leading-loose">
              {name}
            </h3>
            <p className="text-black/80 text-sm font-normal font-['Inter'] leading-tight">
              {type}
            </p>
          </div>
          <p className="text-black text-base font-medium font-['Inter'] leading-normal">
            {price}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div>
            <p className="text-black/80 text-sm font-normal font-['Inter'] leading-tight mb-1">
              Mileage
            </p>
            <p className="text-black text-base font-normal font-['Inter'] leading-normal">
              {mileage}
            </p>
          </div>
          <div>
            <p className="text-black/80 text-sm font-normal font-['Inter'] leading-tight mb-1">
              Engine
            </p>
            <p className="text-black text-base font-normal font-['Inter'] leading-normal">
              {engine}
            </p>
          </div>
          <div>
            <p className="text-black/80 text-sm font-normal font-['Inter'] leading-tight mb-1">
              Power
            </p>
            <p className="text-black text-base font-normal font-['Inter'] leading-normal">
              {power}
            </p>
          </div>
        </div>

        <div className="flex gap-3 mb-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="h-6 bg-neutral-100 rounded px-3 flex items-center"
            >
              <span className="text-black text-xs font-normal font-['Inter'] leading-none">
                {feature}
              </span>
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <Link
            href={`/cars/${name.toLowerCase().replace(/\s+/g, '-')}`}
            className="w-64 h-11 rounded-md border border-black flex items-center justify-center"
          >
            <span className="text-black text-sm font-medium font-['Inter'] leading-tight">
              View Details
            </span>
          </Link>
          <button className="w-64 h-11 bg-black rounded-md flex items-center justify-center">
            <span className="text-white text-sm font-medium font-['Inter'] leading-tight">
              Compare
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarComparisonCard; 