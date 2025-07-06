import Image from 'next/image';
import Link from 'next/link';

interface CarDetailsProps {
  image: string;
  name: string;
  type: string;
  fuelType: string;
  engine: string;
  power: string;
  torque: string;
  transmission: string;
  colors: string[];
  features: string[];
  statePrices: {
    state: string;
    price: string;
  }[];
  mileage?: string; // Fuel efficiency (km/l)
  kmRun?: string;   // Total kilometers run
}

const CarDetails = ({
  image,
  name,
  type,
  fuelType,
  engine,
  power,
  torque,
  transmission,
  colors,
  features,
  statePrices,
  mileage,
  kmRun
}: CarDetailsProps) => {
  return (
    <div className="min-h-screen bg-neutral-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Link
          href="/cars"
          className="inline-block text-black/80 text-sm font-normal font-['Inter'] leading-tight mb-4"
        >
          ← Back to Cars
        </Link>

        <div className="bg-white rounded-xl shadow-md p-8">
          <div className="grid grid-cols-2 gap-8">
            {/* Left Column */}
            <div>
              <div className="relative w-full h-72 mb-8">
                <Image
                  src={image}
                  alt={name}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>

              <h1 className="text-3xl font-bold font-['Inter'] leading-10 mb-4">
                {name}
              </h1>

              <div className="flex gap-3 mb-8">
                <div className="h-7 bg-neutral-100 rounded px-3 flex items-center">
                  <span className="text-black text-sm font-normal font-['Inter'] leading-tight">
                    {type}
                  </span>
                </div>
                <div className="h-7 bg-neutral-100 rounded px-3 flex items-center">
                  <span className="text-black text-sm font-normal font-['Inter'] leading-tight">
                    {fuelType}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                  <p className="text-black/80 text-sm font-normal font-['Inter'] leading-tight mb-1">
                    Engine
                  </p>
                  <p className="text-black text-base font-medium font-['Inter'] leading-normal mb-4">
                    {engine}
                  </p>

                  <p className="text-black/80 text-sm font-normal font-['Inter'] leading-tight mb-1">
                    Torque
                  </p>
                  <p className="text-black text-base font-medium font-['Inter'] leading-normal mb-4">
                    {torque}
                  </p>

                  <p className="text-black/80 text-sm font-normal font-['Inter'] leading-tight mb-1">
  Mileage
</p>
<p className="text-black text-base font-medium font-['Inter'] leading-normal mb-4">
  {mileage ? `${mileage} km` : 'N/A'}
</p>
                </div>

                <div>
                  <p className="text-black/80 text-sm font-normal font-['Inter'] leading-tight mb-1">
                    Power
                  </p>
                  <p className="text-black text-base font-medium font-['Inter'] leading-normal mb-4">
                    {power}
                  </p>

                  <p className="text-black/80 text-sm font-normal font-['Inter'] leading-tight mb-1">
                    Transmission
                  </p>
                  <p className="text-black text-base font-medium font-['Inter'] leading-normal">
                    {transmission}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div>
              <div className="mb-8">
                <h2 className="text-base font-semibold font-['Inter'] leading-normal mb-4">
                  Available Colors
                </h2>
                <div className="flex gap-3">
                  {colors.map((color, index) => (
                    <div
                      key={index}
                      className="h-7 bg-neutral-100 rounded px-3 flex items-center"
                    >
                      <span className="text-black text-sm font-normal font-['Inter'] leading-tight">
                        {color}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-base font-semibold font-['Inter'] leading-normal mb-4">
                  Key Features
                </h2>
                <ul className="space-y-4">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-black rounded-full" />
                      <span className="text-black text-sm font-normal font-['Inter'] leading-tight">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-base font-semibold font-['Inter'] leading-normal mb-4">
                  State-wise Prices
                </h2>
                <div className="space-y-2">
                  {statePrices.map((statePrice, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-2 border-b border-neutral-200"
                    >
                      <span className="text-black text-sm font-normal font-['Inter'] leading-tight">
                        {statePrice.state}
                      </span>
                      <span className="text-black text-sm font-medium font-['Inter'] leading-tight">
                        {statePrice.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails; 