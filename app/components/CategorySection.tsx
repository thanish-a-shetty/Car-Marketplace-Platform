import Image from 'next/image';
import Link from 'next/link';

const categories = [
  {
    id: 1,
    image: "https://placehold.co/117x84",
    title: "Find New Cars",
    link: "/new-cars"
  },
  {
    id: 2,
    image: "https://placehold.co/117x84",
    title: "Buy Used Cars",
    link: "/used-cars"
  },
  {
    id: 3,
    image: "https://placehold.co/117x84",
    title: "Sell Your Car",
    link: "/sell-car"
  },
  {
    id: 4,
    image: "https://placehold.co/117x84",
    title: "Compare Cars",
    link: "/compare-cars"
  }
];

const CategorySection = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <div className="w-full h-40 bg-neutral-400 rounded-xl shadow-md p-6">
        <div className="flex justify-between items-center h-full">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={category.link}
              className="flex flex-col items-center gap-2"
            >
              <div className="relative w-28 h-20">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-white text-base font-medium font-['Inter'] leading-normal">
                {category.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySection; 