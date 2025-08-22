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
  
  // Enhanced description with local SEO elements and compelling CTAs
  const enhancedDescription = description.length > 140 ? 
    `${description.substring(0, 140)}... ${location} | Call (858) 555-0123 | Same-day appointments available` :
    `${description} ${location} clinic | Call (858) 555-0123 | Free consultation | Same-day appointments available`;

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
    },
    "sameAs": [
      "https://facebook.com/spinezonesd",
      "https://instagram.com/spinezonesd",
      "https://linkedin.com/company/spinezone",
      "https://twitter.com/spinezonesd"
    ],
    "knowsAbout": [
      "Physical Therapy",
      "Spine Treatment",
      "Joint Pain Relief",
      "Sports Injury Rehabilitation",
      "Manual Therapy",
      "Pain Management",
      "Non-invasive Treatment",
      "Orthopedic Rehabilitation"
    ],
    "memberOf": {
      "@type": "Organization",
      "name": "American Physical Therapy Association"
    },
    "accreditedBy": {
      "@type": "Organization",
      "name": "Commission on Accreditation in Physical Therapy Education"
    }
  };
}

// Generate comprehensive healthcare service schema
export function generateHealthcareServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HealthcareService",
    "@id": "https://spinezone-sandiego.com/#healthcareservice",
    "name": "Physical Therapy Services",
    "alternateName": "PT Services San Diego",
    "description": "Comprehensive physical therapy services specializing in spine treatment, joint pain relief, and sports injury rehabilitation without surgery",
    "url": "https://spinezone-sandiego.com/services",
    "serviceType": "Physical Therapy",
    "medicalSpecialty": [
      "Physical Therapy",
      "Sports Medicine",
      "Pain Management",
      "Rehabilitation Medicine",
      "Orthopedic Therapy",
      "Manual Therapy"
    ],
    "availableService": [
      {
        "@type": "MedicalTherapy",
        "name": "Spine Treatment Therapy",
        "description": "Non-invasive spine and back pain treatment using advanced therapeutic techniques",
        "code": {
          "@type": "MedicalCode",
          "code": "97110",
          "codingSystem": "CPT"
        }
      },
      {
        "@type": "MedicalTherapy",
        "name": "Joint Pain Therapy",
        "description": "Comprehensive joint mobility restoration for hips, knees, shoulders, and all major joints",
        "code": {
          "@type": "MedicalCode",
          "code": "97112",
          "codingSystem": "CPT"
        }
      },
      {
        "@type": "MedicalTherapy",
        "name": "Sports Injury Rehabilitation",
        "description": "Specialized rehabilitation for athletic injuries and return-to-sport training",
        "code": {
          "@type": "MedicalCode",
          "code": "97116",
          "codingSystem": "CPT"
        }
      },
      {
        "@type": "MedicalTherapy",
        "name": "Manual Therapy",
        "description": "Hands-on therapeutic techniques for pain relief and mobility improvement",
        "code": {
          "@type": "MedicalCode",
          "code": "97140",
          "codingSystem": "CPT"
        }
      }
    ],
    "provider": {
      "@type": "MedicalBusiness",
      "@id": "https://spinezone-sandiego.com/#medicalbusiness"
    },
    "areaServed": {
      "@type": "City",
      "name": "San Diego",
      "addressRegion": "CA",
      "addressCountry": "US"
    },
    "hoursAvailable": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "07:00",
      "closes": "20:00"
    },
    "availableChannel": [
      {
        "@type": "ServiceChannel",
        "servicePhone": "+1-858-555-0123",
        "serviceUrl": "https://spinezone-sandiego.com/contact"
      }
    ]
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

// Generate organization schema for enhanced brand visibility
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "@id": "https://spinezone-sandiego.com/#organization",
    "name": "SpineZone Physical Therapy",
    "alternateName": "SpineZone PT San Diego",
    "legalName": "SpineZone Physical Therapy Inc.",
    "url": "https://spinezone-sandiego.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://spinezone-sandiego.com/spinezone-logo.png",
      "width": 300,
      "height": 100
    },
    "description": "San Diego's leading physical therapy clinic specializing in non-invasive spine, joint, and sports injury treatment with 90% success rate and over 1 million patient encounters.",
    "foundingDate": "2015",
    "founder": {
      "@type": "Person",
      "name": "Dr. Sarah Martinez, PT, DPT"
    },
    "employee": [
      {
        "@type": "Person",
        "name": "Dr. Sarah Martinez",
        "jobTitle": "Director of Physical Therapy",
        "qualifications": "Doctor of Physical Therapy (DPT), Board Certified"
      }
    ],
    "hasCredential": [
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "License",
        "recognizedBy": {
          "@type": "Organization",
          "name": "California Physical Therapy Board"
        }
      }
    ],
    "awards": [
      "Best Physical Therapy Clinic San Diego 2023",
      "Top Healthcare Provider Award 2024",
      "Excellence in Patient Care 2024"
    ],
    "makesOffer": {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Free Physical Therapy Consultation",
        "description": "Complimentary initial assessment and treatment plan consultation"
      },
      "price": "0",
      "priceCurrency": "USD"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+1-858-555-0123",
        "contactType": "customer service",
        "areaServed": "US-CA",
        "availableLanguage": ["en", "es"]
      },
      {
        "@type": "ContactPoint",
        "email": "info@spinezone-sandiego.com",
        "contactType": "customer service"
      }
    ]
  };
}

// Generate medical procedure schema for specific treatments
export function generateMedicalProcedureSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    "@id": "https://spinezone-sandiego.com/#medicaltreatment",
    "name": "Non-Invasive Physical Therapy Treatment",
    "alternateName": "Conservative Physical Therapy",
    "description": "Evidence-based physical therapy treatment for spine, joint, and sports injuries without surgery, injections, or opioids",
    "procedureType": "Therapeutic",
    "bodyLocation": [
      "Spine",
      "Back",
      "Neck",
      "Shoulders",
      "Hips",
      "Knees",
      "All Joints"
    ],
    "preparation": "Initial consultation and movement assessment",
    "followup": "Progress monitoring and treatment plan adjustments",
    "howPerformed": "Manual therapy techniques, therapeutic exercises, and advanced rehabilitation equipment",
    "status": "StandardOfCare",
    "contraindication": "Acute fractures, infections, or conditions requiring surgical intervention",
    "expectedPrognosis": "90% of patients experience significant pain relief and improved function",
    "medicationUsed": "None - drug-free treatment approach",
    "seriousAdverseOutcome": "Extremely rare with conservative treatment"
  };
}

// Generate FAQ schema for common healthcare questions
export function generateFAQSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://spinezone-sandiego.com/#faq",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Do I need a referral for physical therapy in San Diego?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No referral required in California. You can directly schedule a physical therapy appointment at SpineZone for evaluation and treatment."
        }
      },
      {
        "@type": "Question",
        "name": "How long does physical therapy treatment take to work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most patients see improvement within 2-4 sessions. Our comprehensive approach achieves 90% success rate in pain relief and function restoration."
        }
      },
      {
        "@type": "Question",
        "name": "What conditions does SpineZone treat without surgery?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We treat back pain, neck pain, joint pain, sports injuries, arthritis, sciatica, herniated discs, and all musculoskeletal conditions using non-invasive methods."
        }
      },
      {
        "@type": "Question",
        "name": "Does insurance cover physical therapy appointments?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, most insurance plans cover physical therapy. We accept major insurance providers and offer flexible payment options including HSA/FSA."
        }
      },
      {
        "@type": "Question",
        "name": "Can I schedule same-day physical therapy appointments?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we offer same-day appointments for urgent cases. Call (858) 555-0123 or book online for immediate scheduling."
        }
      }
    ]
  };
}