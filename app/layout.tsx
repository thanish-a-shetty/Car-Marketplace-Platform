"use client";

import { Inter } from 'next/font/google';
import './globals.css'
import { ComparisonProvider } from './context/ComparisonContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { usePathname } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();
  const hideNavbar =
    pathname === '/auth/signin' ||
    pathname === '/auth/register' ||
    pathname === '/login' ||
    pathname === '/register';

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ComparisonProvider>
            {!hideNavbar && <Navbar />}
            <main className="min-h-screen bg-neutral-900">
              {children}
            </main>
            <Footer />
          </ComparisonProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
