"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout, loading, userImage } = useAuth();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 bg-neutral-900 border-b border-neutral-800 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center text-white text-xl font-bold">
  <Image src="/images/logo.jpg" alt="Karcraze Logo" width={36} height={36} className="rounded-full mr-2 border-2 border-orange-500 bg-white object-cover" />
  CarKraze
</Link>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-4">
                <Link
  href="/cars"
  className={`${isActive('/cars') ? 'bg-[#F97316] text-black' : 'text-[#F97316] hover:bg-[#F97316] hover:text-black'} px-3 py-2 rounded-md text-sm font-medium transition-all duration-200`}
>
  New Cars
</Link>
                <Link
  href="/used-cars"
  className={`${isActive('/used-cars') ? 'bg-[#F97316] text-black' : 'text-[#F97316] hover:bg-[#F97316] hover:text-black'} px-3 py-2 rounded-md text-sm font-medium transition-all duration-200`}
>
  Buy Used Cars
</Link>
<Link
  href="/sell-car"
  className={`${isActive('/sell-car') ? 'bg-[#F97316] text-black' : 'text-[#F97316] hover:bg-[#F97316] hover:text-black'} px-3 py-2 rounded-md text-sm font-medium transition-all duration-200`}
>
  Sell Used Cars
</Link>
                <Link
  href="/compare"
  className={`${isActive('/compare') ? 'bg-[#F97316] text-black' : 'text-[#F97316] hover:bg-[#F97316] hover:text-black'} px-3 py-2 rounded-md text-sm font-medium transition-all duration-200`}
>
  Compare
</Link>
                <Link
  href="/emi-calculator"
  className={`${isActive('/emi-calculator') ? 'bg-[#F97316] text-black' : 'text-[#F97316] hover:bg-[#F97316] hover:text-black'} px-3 py-2 rounded-md text-sm font-medium transition-all duration-200`}
>
  EMI Calculator
</Link>
              </div>
            </div>
          </div>

          <div className="flex items-center">
            {loading ? null : user ? (
              <>
                <Link href="/profile" className="flex items-center gap-2 text-[#F97316] px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:bg-[#F97316] group">
                  <img
                    src={userImage || "/user-icon.svg"}
                    alt="Profile"
                    width={32}
                    height={32}
                    className="rounded-full bg-neutral-800 object-cover w-8 h-8 border-2 border-[#F97316]"
                  />
                  <span className="ml-2 font-semibold text-[#F97316] group-hover:text-black transition-all duration-200 max-w-xs truncate">{user.name || user.email}</span>
                </Link>
                <button
                  onClick={logout}
                  className="ml-4 bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded-md text-sm font-medium border border-orange-500 hover:border-orange-600 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Sign in
              </Link>
            )}

          </div>
        </div>
      </div>
    </nav>
  );
}