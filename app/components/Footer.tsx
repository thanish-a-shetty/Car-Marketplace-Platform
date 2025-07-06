import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <div className="space-y-2">
              <p className="text-gray-400">Email: thanisha.cs23@bmsce.ac.in</p>
              <p className="text-gray-400">Email: sushmithakl.cs23@bmsce.ac.in</p>
              <p className="text-gray-400">Email: tanmayvasishta.cs23@bmsce.ac.in</p>
              <p className="text-gray-400">Phone: +91 7795893390</p>
              <p className="text-gray-400">Address: Bangalore, India</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/cars" className="text-gray-400 hover:text-orange-500 transition-colors block">
                Search Cars
              </Link>
              <Link href="/compare" className="text-gray-400 hover:text-orange-500 transition-colors block">
                Compare Cars
              </Link>
              <Link href="/emi-calculator" className="text-gray-400 hover:text-orange-500 transition-colors block">
                EMI Calculator
              </Link>
              <Link href="/sell-car" className="text-gray-400 hover:text-orange-500 transition-colors block">
                Sell Car
              </Link>
            </div>
          </div>

          {/* About */}
          <div>
            <h3 className="text-xl font-semibold mb-4">About CarKraze</h3>
            <p className="text-gray-400">
              Your trusted platform for buying and selling cars. We provide the best deals and a seamless car buying experience.
            </p>
          </div>
        </div>

        <div className="border-t border-neutral-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} CarKraze. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 