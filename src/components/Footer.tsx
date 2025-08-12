import { Phone, MapPin, Clock, Mail, Facebook, Instagram, Linkedin } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white" role="contentinfo">
      <div className="section-padding">
        <div className="container-max">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center mb-4">
                <Image
                  src="/spinezone-logo.svg"
                  alt="SpineZone Logo"
                  width={32}
                  height={32}
                  className="w-8 h-8 mr-3"
                />
                <h3 className="text-2xl font-bold text-blue-400">SpineZone</h3>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                San Diego's premier physical therapy clinic, dedicated to helping you heal naturally without surgery or opioids.
              </p>
              <div className="flex space-x-4">
                <a 
                  href="#" 
                  className="text-gray-400 hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded"
                  aria-label="Follow us on Facebook"
                >
                  <Facebook className="w-5 h-5" aria-hidden="true" />
                </a>
                <a 
                  href="#" 
                  className="text-gray-400 hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded"
                  aria-label="Follow us on Instagram"
                >
                  <Instagram className="w-5 h-5" aria-hidden="true" />
                </a>
                <a 
                  href="#" 
                  className="text-gray-400 hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded"
                  aria-label="Connect with us on LinkedIn"
                >
                  <Linkedin className="w-5 h-5" aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-green-400">Contact Info</h4>
              <div className="space-y-3">
                <div className="flex items-start">
                  <Phone className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <div>
                    <a 
                      href="tel:+1-858-555-0123" 
                      className="hover:text-green-400 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded"
                      aria-label="Call SpineZone at 858-555-0123"
                    >
                      (858) 555-0123
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <div>
                    <a 
                      href="mailto:info@spinezone-sd.com" 
                      className="hover:text-green-400 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded"
                      aria-label="Email SpineZone"
                    >
                      info@spinezone-sd.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <div>
                    <address className="not-italic text-gray-300">
                      1234 Healing Way<br />
                      San Diego, CA 92101
                    </address>
                  </div>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-green-400">Office Hours</h4>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 text-green-400 mr-3" aria-hidden="true" />
                  <span className="text-gray-300">Mon - Fri: 7am - 7pm</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 text-green-400 mr-3" aria-hidden="true" />
                  <span className="text-gray-300">Saturday: 8am - 4pm</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 text-green-400 mr-3" aria-hidden="true" />
                  <span className="text-gray-300">Sunday: Closed</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-green-400">Quick Links</h4>
              <nav aria-label="Footer navigation">
                <ul className="space-y-2">
                  <li>
                    <Link 
                      href="/services" 
                      className="text-gray-300 hover:text-green-400 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded"
                    >
                      Our Services
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/about" 
                      className="text-gray-300 hover:text-green-400 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/contact" 
                      className="text-gray-300 hover:text-green-400 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded"
                    >
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/insurance" 
                      className="text-gray-300 hover:text-green-400 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded"
                    >
                      Insurance
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/privacy" 
                      className="text-gray-300 hover:text-green-400 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              © {new Date().getFullYear()} SpineZone Physical Therapy. All rights reserved. 
              <span className="block mt-2 text-sm">
                Licensed Physical Therapy Clinic in San Diego, California
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}