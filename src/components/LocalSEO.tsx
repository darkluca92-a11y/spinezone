'use client';

import Link from 'next/link';
import { MapPin, Clock, Phone, Star } from 'lucide-react';
import { sandiegoNeighborhoods } from '@/lib/seo-utils';

interface LocalSEOProps {
  showNeighborhoods?: boolean;
  showHours?: boolean;
  showContact?: boolean;
  compact?: boolean;
}

// San Diego neighborhood-specific data for local SEO
const neighborhoodData = [
  {
    name: 'La Jolla',
    slug: 'la-jolla',
    description: 'Premier physical therapy clinic serving La Jolla residents with advanced spine and joint pain treatment.',
    specialties: ['Sports Medicine', 'Spine Treatment', 'Luxury Care'],
    distance: '5 miles from downtown',
    zipCodes: ['92037', '92093'],
    landmarks: ['UC San Diego', 'La Jolla Cove', 'Scripps Health']
  },
  {
    name: 'Hillcrest',
    slug: 'hillcrest',
    description: 'Central San Diego location providing comprehensive physical therapy and rehabilitation services.',
    specialties: ['Joint Pain', 'Rehabilitation', 'Manual Therapy'],
    distance: '2 miles from downtown',
    zipCodes: ['92103', '92104'],
    landmarks: ['Balboa Park', 'Hillcrest Medical Center', 'University Heights']
  },
  {
    name: 'Pacific Beach',
    slug: 'pacific-beach',
    description: 'Beachside physical therapy clinic specializing in active lifestyle and sports injury recovery.',
    specialties: ['Sports Injuries', 'Active Recovery', 'Beach Lifestyle'],
    distance: '8 miles from downtown',
    zipCodes: ['92109'],
    landmarks: ['Mission Bay', 'Crystal Pier', 'PB Boardwalk']
  },
  {
    name: 'Mission Valley',
    slug: 'mission-valley',
    description: 'Convenient Mission Valley location with easy access and comprehensive pain management services.',
    specialties: ['Pain Management', 'Convenient Access', 'Modern Facility'],
    distance: '3 miles from downtown',
    zipCodes: ['92108', '92120'],
    landmarks: ['Fashion Valley', 'SDSU', 'Mission Center']
  },
  {
    name: 'Downtown',
    slug: 'downtown',
    description: 'Downtown San Diego physical therapy clinic serving professionals and urban residents.',
    specialties: ['Executive Care', 'Urban Wellness', 'Flexible Scheduling'],
    distance: 'City center',
    zipCodes: ['92101', '92102'],
    landmarks: ['Gaslamp Quarter', 'Seaport Village', 'Petco Park']
  },
  {
    name: 'Point Loma',
    slug: 'point-loma',
    description: 'Point Loma physical therapy services for coastal community residents and military personnel.',
    specialties: ['Military Care', 'Coastal Community', 'Family Therapy'],
    distance: '6 miles from downtown',
    zipCodes: ['92106', '92107'],
    landmarks: ['Sunset Cliffs', 'Liberty Station', 'Ocean Beach']
  }
];

// "Near me" search terms for local SEO
const nearMeTerms = [
  'physical therapy near me',
  'spine treatment near me',
  'back pain doctor near me',
  'joint pain treatment near me',
  'sports injury therapy near me',
  'PT clinic near me San Diego'
];

export default function LocalSEO({ 
  showNeighborhoods = true, 
  showHours = true, 
  showContact = true,
  compact = false 
}: LocalSEOProps) {
  
  if (compact) {
    return (
      <div className="bg-blue-50 py-8">
        <div className="container-max">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Serving All San Diego Communities
            </h3>
            <p className="text-gray-600">
              Convenient locations throughout San Diego County
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            {neighborhoodData.slice(0, 6).map((neighborhood, index) => (
              <Link
                key={index}
                href={`/locations#${neighborhood.slug}`}
                className="inline-flex items-center px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-100 transition-colors duration-200"
              >
                <MapPin className="w-4 h-4 mr-2" />
                {neighborhood.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-600 to-green-600 py-16 text-white">
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            San Diego's Most Trusted Physical Therapy Network
          </h2>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Serving patients across all San Diego neighborhoods with comprehensive physical therapy and pain management services. Find the location nearest you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Neighborhood Coverage */}
          {showNeighborhoods && (
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <MapPin className="w-8 h-8 mr-3" />
                Areas We Serve
              </h3>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {neighborhoodData.map((neighborhood, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-colors duration-200">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-lg">{neighborhood.name}</h4>
                      <span className="text-sm opacity-75">{neighborhood.distance}</span>
                    </div>
                    <p className="text-sm opacity-90 mb-2">{neighborhood.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {neighborhood.zipCodes.map((zip, zipIndex) => (
                        <span key={zipIndex} className="text-xs bg-white/20 px-2 py-1 rounded">
                          {zip}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Near Me Search Terms */}
              <div className="mt-8">
                <h4 className="font-semibold text-lg mb-4">Find Us With:</h4>
                <div className="flex flex-wrap gap-2">
                  {nearMeTerms.map((term, index) => (
                    <span 
                      key={index}
                      className="text-sm bg-white/20 px-3 py-1 rounded-full"
                    >
                      "{term}"
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Contact & Hours */}
          <div className="space-y-8">
            {showContact && (
              <div>
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <Phone className="w-8 h-8 mr-3" />
                  Contact Information
                </h3>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <div className="space-y-4">
                    <div>
                      <p className="font-semibold mb-1">Main Office</p>
                      <p className="opacity-90">1234 Healing Way, Suite 200</p>
                      <p className="opacity-90">San Diego, CA 92101</p>
                    </div>
                    <div>
                      <p className="font-semibold mb-1">Phone</p>
                      <p className="text-xl">(858) 555-0123</p>
                    </div>
                    <div>
                      <p className="font-semibold mb-1">Email</p>
                      <p className="opacity-90">info@spinezone-sandiego.com</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {showHours && (
              <div>
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <Clock className="w-8 h-8 mr-3" />
                  Hours of Operation
                </h3>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="font-medium">Monday - Friday</span>
                      <span>7:00 AM - 8:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Saturday</span>
                      <span>8:00 AM - 5:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Sunday</span>
                      <span>Closed</span>
                    </div>
                    <hr className="border-white/20 my-4" />
                    <div className="text-center">
                      <p className="text-sm opacity-90 mb-2">Emergency appointments available</p>
                      <p className="text-sm font-medium">Same-day scheduling when possible</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Rating Display */}
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <Star className="w-8 h-8 mr-3" />
                Patient Reviews
              </h3>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
                <div className="flex justify-center items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-current text-yellow-400" />
                  ))}
                </div>
                <p className="text-2xl font-bold mb-1">4.9/5</p>
                <p className="opacity-90">Based on 847+ verified patient reviews</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center bg-white text-blue-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg text-lg transition-colors duration-200"
          >
            Find Your Nearest Location
            <MapPin className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>

      {/* Structured Data for Local Business */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "@id": "https://spinezone-sandiego.com/#localbusiness",
            "name": "SpineZone Physical Therapy",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "1234 Healing Way, Suite 200",
              "addressLocality": "San Diego",
              "addressRegion": "CA",
              "postalCode": "92101",
              "addressCountry": "US"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 32.7157,
              "longitude": -117.1611
            },
            "telephone": "+1-858-555-0123",
            "email": "info@spinezone-sandiego.com",
            "url": "https://spinezone-sandiego.com",
            "areaServed": neighborhoodData.map(n => ({
              "@type": "City",
              "name": `${n.name}, San Diego, CA`,
              "description": n.description
            })),
            "serviceArea": {
              "@type": "GeoCircle", 
              "geoMidpoint": {
                "@type": "GeoCoordinates",
                "latitude": 32.7157,
                "longitude": -117.1611
              },
              "geoRadius": "50000"
            }
          })
        }}
      />
    </div>
  );
}

export { neighborhoodData, nearMeTerms };