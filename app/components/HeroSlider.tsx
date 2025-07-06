import Image from 'next/image';
import { useState } from 'react';

const slides = [
  {
    id: 1,
    image: "https://placehold.co/1273x500",
    title: "New Hyundai Creta 2024",
    price: "₹10.87 Lakh onwards"
  },
  {
    id: 2,
    image: "https://placehold.co/1273x500",
    title: "Mahindra XUV700",
    price: "₹13.99 Lakh onwards"
  },
  {
    id: 3,
    image: "https://placehold.co/1279x500",
    title: "Tata Nexon EV",
    price: "₹14.74 Lakh onwards"
  }
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full h-[500px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute w-full h-full transition-transform duration-500 ${
            index === currentSlide ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover"
          />
          <div className="absolute bottom-0 w-full h-36 bg-gradient-to-r from-black/0 to-black/80" />
          <div className="absolute bottom-24 left-8 text-white">
            <h2 className="text-3xl font-bold font-['Inter'] leading-[48px]">
              {slide.title}
            </h2>
            <p className="text-lg font-normal font-['Inter'] leading-relaxed">
              {slide.price}
            </p>
          </div>
        </div>
      ))}

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-16 h-20 bg-white/90 rounded-full flex items-center justify-center text-black text-xl"
      >
        ←
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-16 h-20 bg-white/90 rounded-full flex items-center justify-center text-black text-xl"
      >
        →
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`w-2.5 h-2.5 rounded-full ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider; 