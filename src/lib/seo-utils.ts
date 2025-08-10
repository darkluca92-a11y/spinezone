import type { Metadata } from 'next';

// San Diego neighborhoods for local SEO
export const sandiegoNeighborhoods = [
  'La Jolla', 'Hillcrest', 'Pacific Beach', 'Mission Valley', 'Downtown San Diego',
  'Gaslamp Quarter', 'Balboa Park', 'Point Loma', 'Ocean Beach', 'Mission Beach',
  'Del Mar', 'Carmel Valley', 'Scripps Ranch', 'Rancho Bernardo', 'Poway'
];

// 2025 trending keywords for healthcare/PT
export const trendingKeywords2025 = [
  'AI-assisted therapy',
  'telehealth physical therapy',
  'precision rehabilitation',
  'biomechanical analysis 2025',
  'non-invasive pain relief 2025',
  'holistic wellness approach',
  'movement optimization',
  'functional medicine integration'
];

// Primary service keywords
export const serviceKeywords = {
  spine: [
    'spine treatment San Diego',
    'spinal therapy 2025',
    'back pain relief',
    'herniated disc treatment',
    'sciatica treatment',
    'lumbar spine therapy'
  ],
  joints: [
    'joint pain therapy San Diego 2025',
    'arthritis treatment',
    'joint mobility restoration',
    'hip pain treatment San Diego',
    'knee pain therapy',
    'shoulder rehabilitation'
  ],
  sports: [
    'sports injury rehabilitation San Diego',
    'athletic performance enhancement',
    'sports medicine 2025',
    'injury prevention training',
    'return to sport therapy'
  ],
  pain: [
    'chronic pain management San Diego',
    'pain-free living 2025',
    'opioid-free treatment',
    'natural pain relief',
    'comprehensive pain assessment'
  ]
};

// High-intent conversion keywords (appointment-focused)
export const conversionKeywords = [
  'physical therapy consultation San Diego',
  'free pain assessment',
  'PT evaluation near me',
  'spine treatment consultation',
  'joint pain diagnosis',
  'therapy appointment San Diego',
  'pain relief consultation 2025',
  'schedule PT appointment San Diego',
  'book physical therapy appointment',
  'San Diego PT appointment booking',
  'same day physical therapy appointments',
  'urgent PT appointments San Diego',
  'online physical therapy scheduling'
];

interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  category?: keyof typeof serviceKeywords;
  location?: string;
  isHomePage?: boolean;
  priority?: 'high' | 'medium' | 'low';
}

export function generateSEOMetadata(config: SEOConfig): Metadata {
  const {
    title,
    description,
    keywords = [],
    category,
    location = 'San Diego',
    isHomePage = false,
    priority = 'medium'
  } = config;

  // Build comprehensive keyword array
  let allKeywords = [...keywords];
  
  // Add category-specific keywords
  if (category && serviceKeywords[category]) {
    allKeywords.push(...serviceKeywords[category]);
  }

  // Add location-based keywords
  const locationKeywords = [
    `${location} physical therapy 2025`,
    `${location} PT clinic`,
    `physical therapy near me`,
    `${location} joint pain treatment`,
    `${location} spine therapy`
  ];
  allKeywords.push(...locationKeywords);

  // Add trending 2025 keywords
  allKeywords.push(...trendingKeywords2025.slice(0, 3));

  // Add conversion keywords for high-priority pages
  if (priority === 'high') {
    allKeywords.push(...conversionKeywords.slice(0, 4));
  }

  // Remove duplicates and limit to 25 keywords for optimal SEO
  const uniqueKeywords = Array.from(new Set(allKeywords)).slice(0, 25);

  // Generate OpenGraph title with location and year
  const ogTitle = `${title} | SpineZone ${location} 2025`;
  
  // Enhanced description with local SEO elements
  const enhancedDescription = `${description} Located in ${location}, serving all surrounding areas. Book your consultation today!`;

  return {
    title,
    description: enhancedDescription,
    keywords: uniqueKeywords,
    authors: [{ name: 'SpineZone Physical Therapy' }],
    creator: 'SpineZone Physical Therapy',
    publisher: 'SpineZone Physical Therapy',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL('https://spinezone-sandiego.com'),
    alternates: {
      canonical: isHomePage ? '/' : undefined,
    },
    openGraph: {
      title: ogTitle,
      description: enhancedDescription,
      url: 'https://spinezone-sandiego.com',
      siteName: 'SpineZone Physical Therapy',
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: `SpineZone Physical Therapy ${location}`,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: enhancedDescription.slice(0, 160), // Twitter description limit
      images: ['/og-image.jpg'],
      site: '@SpineZoneSD',
      creator: '@SpineZoneSD',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'your-google-verification-code',
    },
    other: {
      'google-site-verification': 'your-google-verification-code',
      'geo.region': 'US-CA',
      'geo.placename': location,
      'geo.position': '32.7157;-117.1611', // San Diego coordinates
      'ICBM': '32.7157, -117.1611'
    }
  };
}

// Generate local business structured data
export function generateLocalBusinessSchema(pageName?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "@id": "https://spinezone-sandiego.com/#medicalbusiness",
    "name": "SpineZone Physical Therapy",
    "alternateName": "SpineZone PT San Diego",
    "description": "Leading San Diego physical therapy clinic specializing in non-invasive spine, joint, and sports injury treatment with 90% success rate",
    "url": "https://spinezone-sandiego.com",
    "telephone": "+1-858-555-0123",
    "email": "info@spinezone-sandiego.com",
    "foundingDate": "2015",
    "currenciesAccepted": "USD",
    "paymentAccepted": "Cash, Credit Card, Insurance, HSA, FSA",
    "priceRange": "$$",
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
      "latitude": "32.7157",
      "longitude": "-117.1611"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "07:00",
        "closes": "20:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "08:00",
        "closes": "17:00"
      }
    ],
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "32.7157",
        "longitude": "-117.1611"
      },
      "geoRadius": "50000"
    },
    "areaServed": sandiegoNeighborhoods,
    "medicalSpecialty": [
      "Physical Therapy",
      "Sports Medicine", 
      "Pain Management",
      "Rehabilitation Medicine",
      "Orthopedic Therapy"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Physical Therapy Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "MedicalTherapy",
            "name": "Spine Treatment",
            "description": "Comprehensive spine and back pain treatment"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "MedicalTherapy",
            "name": "Joint Pain Therapy",
            "description": "All joint pain treatment including hips, knees, shoulders"
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "847",
      "bestRating": "5",
      "worstRating": "1"
    }
  };
}

// Generate appointment booking schema for enhanced search visibility
export function generateAppointmentBookingSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "@id": "https://spinezone-sandiego.com/#appointmentbooking",
    "name": "SpineZone Physical Therapy",
    "url": "https://spinezone-sandiego.com",
    "telephone": "+1-858-555-0123",
    "hasOfferCatalog": {
      "@type": "OfferCatalog", 
      "name": "Physical Therapy Appointment Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "@id": "https://spinezone-sandiego.com/#appointment-consultation",
          "name": "Physical Therapy Consultation Appointment",
          "description": "Schedule your initial physical therapy consultation appointment in San Diego",
          "url": "https://spinezone-sandiego.com/assessment",
          "availability": "InStock",
          "priceRange": "$100-200",
          "validFrom": "2025-01-01",
          "validThrough": "2025-12-31",
          "areaServed": {
            "@type": "City",
            "name": "San Diego",
            "addressRegion": "CA",
            "addressCountry": "US"
          },
          "availableAtOrFrom": {
            "@type": "Place",
            "name": "SpineZone Physical Therapy",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "1234 Healing Way, Suite 200",
              "addressLocality": "San Diego", 
              "addressRegion": "CA",
              "postalCode": "92101"
            }
          }
        },
        {
          "@type": "Offer",
          "@id": "https://spinezone-sandiego.com/#appointment-treatment",
          "name": "Physical Therapy Treatment Appointment",
          "description": "Book ongoing physical therapy treatment sessions in San Diego",
          "url": "https://spinezone-sandiego.com/services",
          "availability": "InStock",
          "priceRange": "$150-300", 
          "validFrom": "2025-01-01",
          "validThrough": "2025-12-31",
          "areaServed": {
            "@type": "City",
            "name": "San Diego",
            "addressRegion": "CA",
            "addressCountry": "US"
          }
        },
        {
          "@type": "Offer",
          "@id": "https://spinezone-sandiego.com/#appointment-journey",
          "name": "Treatment Journey Program Appointment",
          "description": "Schedule appointments for our 3-phase treatment journey program",
          "url": "https://spinezone-sandiego.com/treatment-journey",
          "availability": "InStock",
          "priceRange": "$1500-3000",
          "validFrom": "2025-01-01", 
          "validThrough": "2025-12-31",
          "areaServed": {
            "@type": "City",
            "name": "San Diego",
            "addressRegion": "CA", 
            "addressCountry": "US"
          }
        }
      ]
    },
    "potentialAction": [
      {
        "@type": "ReserveAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://spinezone-sandiego.com/assessment",
          "inLanguage": "en-US",
          "actionPlatform": [
            "http://schema.org/DesktopWebPlatform",
            "http://schema.org/MobileWebPlatform"
          ]
        },
        "result": {
          "@type": "Reservation",
          "name": "Physical Therapy Appointment Reservation"
        }
      },
      {
        "@type": "ScheduleAction", 
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://spinezone-sandiego.com/services",
          "inLanguage": "en-US"
        },
        "object": {
          "@type": "Event",
          "name": "Physical Therapy Treatment Session"
        }
      }
    ]
  };
}