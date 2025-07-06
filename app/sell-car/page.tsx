import SellCarForm from '../components/SellCarForm';

export default function SellCarPage() {
  return (
    <main className="min-h-screen bg-neutral-900 relative">
      {/* Background Image Container */}
      <div 
        className="fixed inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("/images/cars-bg.jpg")',
        }}
      >
        <div className="absolute inset-0 bg-black/70" /> {/* Darker overlay for better content visibility */}
      </div>

      <div className="relative z-10 pt-24">
        <SellCarForm />
      </div>
    </main>
  );
} 