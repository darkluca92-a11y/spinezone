'use client';

import { useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50" role="banner">
      <nav className="container-max" aria-label="Main navigation">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded">
              SpineZone
            </Link>
            <span className="ml-2 text-sm text-gray-600 hidden sm:inline">
              San Diego Physical Therapy
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1">
              Home
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1">
              About
            </Link>
            <Link href="/services" className="text-gray-700 hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1">
              Services
            </Link>
            <Link href="/treatment-journey" className="text-gray-700 hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1">
              Treatment Journey
            </Link>
            <Link href="/team" className="text-gray-700 hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1">
              Team
            </Link>
            <Link href="/testimonials" className="text-gray-700 hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1">
              Reviews
            </Link>
            <Link href="/assessment" className="text-gray-700 hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1">
              Assessment
            </Link>
            <Link href="/insurance" className="text-gray-700 hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1">
              Insurance
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1">
              Contact
            </Link>
            <a 
              href="tel:+1-858-555-0123" 
              className="flex items-center text-green-600 hover:text-green-700 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded px-2 py-1"
              aria-label="Call SpineZone at 858-555-0123"
            >
              <Phone className="w-4 h-4 mr-1" aria-hidden="true" />
              (858) 555-0123
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" aria-hidden="true" />
            ) : (
              <Menu className="w-6 h-6" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg z-50" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t max-h-screen overflow-y-auto">
              <Link 
                href="/" 
                className="block px-3 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 min-h-[44px] flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/about" 
                className="block px-3 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 min-h-[44px] flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/services" 
                className="block px-3 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 min-h-[44px] flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link 
                href="/treatment-journey" 
                className="block px-3 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 min-h-[44px] flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Treatment Journey
              </Link>
              <Link 
                href="/team" 
                className="block px-3 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 min-h-[44px] flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Team
              </Link>
              <Link 
                href="/testimonials" 
                className="block px-3 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 min-h-[44px] flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Reviews
              </Link>
              <Link 
                href="/assessment" 
                className="block px-3 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 min-h-[44px] flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Assessment Appointment
              </Link>
              <Link 
                href="/insurance" 
                className="block px-3 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 min-h-[44px] flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Insurance & Payment
              </Link>
              <Link 
                href="/contact" 
                className="block px-3 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 min-h-[44px] flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <a 
                href="tel:+1-858-555-0123" 
                className="flex items-center px-3 py-3 text-green-600 hover:text-green-700 hover:bg-green-50 font-semibold rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 min-h-[44px]"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Call SpineZone at 858-555-0123"
              >
                <Phone className="w-4 h-4 mr-2" aria-hidden="true" />
                (858) 555-0123
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}