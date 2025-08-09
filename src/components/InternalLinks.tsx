'use client';

import Link from 'next/link';
import { ArrowRight, Star, MapPin } from 'lucide-react';

interface InternalLinksProps {
  currentPage?: string;
  showLocalSEO?: boolean;
}

// SEO-optimized internal linking structure
const internalLinkGroups = {
  services: [
    {
      title: 'Our Treatment Programs',
      links: [
        { href: '/services', text: 'All Physical Therapy Services', priority: 'high' },
        { href: '/assessment', text: 'Free Pain Assessment', priority: 'high' },
        { href: '/team', text: 'Meet Our Expert Team', priority: 'medium' }
      ]
    }
  ],
  patientResources: [
    {
      title: 'Patient Resources',
      links: [
        { href: '/insurance', text: 'Insurance & Payment Options', priority: 'high' },
        { href: '/testimonials', text: 'Patient Success Stories', priority: 'medium' },
        { href: '/patient-portal', text: 'Patient Portal Access', priority: 'medium' },
        { href: '/locations', text: 'Find Our Locations', priority: 'medium' }
      ]
    }
  ],
  about: [
    {
      title: 'About SpineZone',
      links: [
        { href: '/about', text: 'About Our Clinic', priority: 'medium' },
        { href: '/science', text: 'Our Treatment Philosophy', priority: 'low' },
        { href: '/blog', text: 'Latest Health Articles', priority: 'low' }
      ]
    }
  ],
  localSEO: [
    {
      title: 'San Diego Area Locations',
      links: [
        { href: '/locations', text: 'La Jolla Physical Therapy', priority: 'high', isLocal: true },
        { href: '/locations', text: 'Hillcrest Spine Treatment', priority: 'high', isLocal: true },
        { href: '/locations', text: 'Pacific Beach PT Clinic', priority: 'high', isLocal: true },
        { href: '/locations', text: 'Mission Valley Therapy', priority: 'medium', isLocal: true },
        { href: '/locations', text: 'Downtown San Diego PT', priority: 'medium', isLocal: true }
      ]
    }
  ]
};

// Priority keywords for anchor text optimization
const keywordPhrases = {
  high: [
    'San Diego physical therapy 2025',
    'joint pain treatment San Diego',
    'free pain assessment',
    'spine therapy San Diego',
    'comprehensive physical therapy services'
  ],
  medium: [
    'physical therapy insurance coverage',
    'patient testimonials San Diego',
    'expert physical therapists',
    'sports injury rehabilitation'
  ],
  local: [
    'La Jolla physical therapy clinic',
    'Hillcrest spine treatment center',
    'Pacific Beach PT services',
    'Mission Valley therapy clinic'
  ]
};

export default function InternalLinks({ currentPage = '', showLocalSEO = true }: InternalLinksProps) {
  // Filter out current page from links
  const filterCurrentPage = (links: any[]) => 
    links.filter(link => !link.href.includes(currentPage));

  return (
    <div className="bg-gradient-to-br from-blue-50 to-green-50 py-16">
      <div className="container-max">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Explore Our Comprehensive Services
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover all the ways SpineZone can help you achieve pain-free living through our specialized treatments and expert care.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Primary Services Links */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                <Star className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Treatment Programs</h3>
            </div>
            <div className="space-y-3">
              {filterCurrentPage(internalLinkGroups.services[0].links).map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-blue-50 transition-colors duration-200 group"
                >
                  <span className="text-gray-700 group-hover:text-blue-600 font-medium">
                    {link.text}
                  </span>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-200" />
                </Link>
              ))}
            </div>
          </div>

          {/* Patient Resources Links */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                <Star className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Patient Resources</h3>
            </div>
            <div className="space-y-3">
              {filterCurrentPage(internalLinkGroups.patientResources[0].links).map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-green-50 transition-colors duration-200 group"
                >
                  <span className="text-gray-700 group-hover:text-green-600 font-medium">
                    {link.text}
                  </span>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-green-600 group-hover:translate-x-1 transition-all duration-200" />
                </Link>
              ))}
            </div>
          </div>

          {/* Local SEO Links or About Links */}
          {showLocalSEO ? (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">San Diego Locations</h3>
              </div>
              <div className="space-y-3">
                {internalLinkGroups.localSEO[0].links.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-blue-50 transition-colors duration-200 group"
                  >
                    <span className="text-gray-700 group-hover:text-blue-600 font-medium">
                      {link.text}
                    </span>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-200" />
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  <Star className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Learn More</h3>
              </div>
              <div className="space-y-3">
                {filterCurrentPage(internalLinkGroups.about[0].links).map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-green-50 transition-colors duration-200 group"
                  >
                    <span className="text-gray-700 group-hover:text-green-600 font-medium">
                      {link.text}
                    </span>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-green-600 group-hover:translate-x-1 transition-all duration-200" />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Call to Action with High-Value Internal Links */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Start Your Recovery Journey?</h3>
            <p className="text-lg mb-6 opacity-90">
              Take our free pain assessment or schedule a consultation with San Diego's leading physical therapy team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/assessment"
                className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 inline-flex items-center"
              >
                Free Pain Assessment
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                href="/contact"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 inline-flex items-center"
              >
                Schedule Consultation
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Export individual link groups for use in other components
export { internalLinkGroups, keywordPhrases };