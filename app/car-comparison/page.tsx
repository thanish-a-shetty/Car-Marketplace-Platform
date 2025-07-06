"use client";

export default function CarComparisonPage() {
  return (
    <main className="min-h-screen w-screen overflow-hidden bg-neutral-900 relative">
      {/* Background Image Container */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("/images/login-bg.jpg")',
        }}
      >
        <div className="absolute inset-0 bg-black/60" /> {/* Darker overlay for better content visibility */}
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen w-full">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-white mb-8">Compare Cars</h1>
          
          {/* Add your car comparison content here */}
          <div className="bg-zinc-900/90 backdrop-blur-sm rounded-2xl p-6 border border-orange-500">
            <p className="text-white">Car comparison content will go here...</p>
          </div>
        </div>
      </div>
    </main>
  );
} 