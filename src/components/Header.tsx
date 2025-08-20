'use client';

import { useState } from 'react';
import { Menu, X, Phone, Calendar, MessageCircle, FileText, Bot } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { SpineZoneFluidMenu, SpineZoneFluidMenuCompact } from '@/components/ui/spinezone-fluid-menu';
import TopRightDropdown from '@/components/TopRightDropdown';

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
            <Link href="/" className="flex items-center hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded">
              <Image
                src="/spinezone-logo-correct.png"
                alt="SpineZone Logo - Professional Physical Therapy Clinic"
                width={40}
                height={40}
                className="w-8 h-8 sm:w-10 sm:h-10"
                priority
              />
              <span className="ml-3 text-xl sm:text-2xl font-bold text-blue-600">
                SpineZone
              </span>
            </Link>
            <span className="ml-2 text-sm text-gray-600 hidden lg:inline">
              San Diego Physical Therapy
            </span>
          </div>

          {/* Desktop Navigation - Top Right Dropdown */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Phone CTA - Always visible on desktop */}
            <a 
              href="tel:+1-858-555-0123" 
              className="flex items-center text-green-600 hover:text-green-700 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded px-3 py-2 bg-green-50 hover:bg-green-100"
              aria-label="Call SpineZone at 858-555-0123"
            >
              <Phone className="w-4 h-4 mr-2" aria-hidden="true" />
              <span className="hidden lg:inline">(858) 555-0123</span>
              <span className="lg:hidden">Call</span>
            </a>
            
            {/* Top Right Dropdown Navigation */}
            <TopRightDropdown />
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
              {/* Healthcare Actions Section - Mobile Priority */}
              <div className="mb-4 pb-4 border-b border-gray-200">
                <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Healthcare Actions
                </div>
                <Link 
                  href="/assessment" 
                  className="flex items-center px-3 py-3 text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-semibold rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 min-h-[44px]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Calendar className="w-5 h-5 mr-3" aria-hidden="true" />
                  Book Evaluation
                </Link>
                <a 
                  href="tel:+1-858-555-0123" 
                  className="flex items-center px-3 py-3 text-green-600 hover:text-green-700 hover:bg-green-50 font-semibold rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 min-h-[44px]"
                  onClick={() => setIsMenuOpen(false)}
                  aria-label="Call SpineZone at 858-555-0123"
                >
                  <Phone className="w-5 h-5 mr-3" aria-hidden="true" />
                  Call (858) 555-0123
                </a>
                <button
                  onClick={() => {
                    const chatbot = document.querySelector('[data-chatbot]');
                    if (chatbot) {
                      (chatbot as HTMLElement).click();
                    }
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center px-3 py-3 text-purple-600 hover:text-purple-700 hover:bg-purple-50 font-semibold rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 min-h-[44px] w-full text-left"
                >
                  <MessageCircle className="w-5 h-5 mr-3" aria-hidden="true" />
                  Chat Support
                </button>
                <Link 
                  href="/ai-assistant" 
                  className="flex items-center px-3 py-3 text-orange-600 hover:text-orange-700 hover:bg-orange-50 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 min-h-[44px]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Bot className="w-5 h-5 mr-3" aria-hidden="true" />
                  AI Phone Assistant
                </Link>
                <Link 
                  href="/patient-portal" 
                  className="flex items-center px-3 py-3 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 min-h-[44px]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FileText className="w-5 h-5 mr-3" aria-hidden="true" />
                  Patient Portal
                </Link>
              </div>

              {/* Navigation Section */}
              <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Navigation
              </div>
              <Link 
                href="/" 
                className="block px-3 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 min-h-[44px] flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/services" 
                className="block px-3 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 min-h-[44px] flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link 
                href="/about" 
                className="block px-3 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 min-h-[44px] flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                About & Team
              </Link>
              <Link 
                href="/testimonials" 
                className="block px-3 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 min-h-[44px] flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Reviews
              </Link>
              <Link 
                href="/treatment-journey" 
                className="block px-3 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 min-h-[44px] flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Treatment Journey
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
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}