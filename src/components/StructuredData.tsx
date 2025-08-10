'use client';

import Head from 'next/head';
import { sandiegoNeighborhoods } from '@/lib/seo-utils';

interface StructuredDataProps {
  type: 'homepage' | 'team' | 'testimonials' | 'assessment' | 'insurance' | 'services' | 'blog' | 'treatment-journey';
}

export default function StructuredData({ type }: StructuredDataProps) {
  const baseOrganization = {
    "@type": "MedicalBusiness",
    "@id": "https://spinezone-sandiego.com/#organization",
    "name": "SpineZone Physical Therapy",
    "alternateName": "SpineZone PT San Diego",
    "url": "https://spinezone-sandiego.com",
    "logo": "https://spinezone-sandiego.com/logo.png",
    "image": [
      "https://spinezone-sandiego.com/images/clinic-exterior.jpg",
      "https://spinezone-sandiego.com/images/treatment-room.jpg",
      "https://spinezone-sandiego.com/images/team-photo.jpg"
    ],
    "description": "San Diego's premier physical therapy clinic specializing in joint pain treatment, spine rehabilitation, and sports medicine with 90% success rate. Serving all San Diego neighborhoods since 2015.",
    "telephone": "+1-858-555-0123",
    "email": "info@spinezone-sandiego.com",
    "foundingDate": "2015",
    "slogan": "Pain-Free Living Through Advanced Physical Therapy",
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
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "07:00",
        "closes": "20:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Saturday"],
        "opens": "08:00",
        "closes": "17:00"
      }
    ],
    "priceRange": "$$",
    "paymentAccepted": ["Cash", "Credit Card", "Insurance", "HSA", "FSA", "CareCredit"],
    "currenciesAccepted": "USD",
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 32.7157,
        "longitude": -117.1611
      },
      "geoRadius": "50000"
    },
    "areaServed": sandiegoNeighborhoods,
    "medicalSpecialty": [
      "Physical Therapy",
      "Sports Medicine", 
      "Pain Management",
      "Rehabilitation Medicine",
      "Orthopedic Therapy",
      "Manual Therapy",
      "Spine Rehabilitation"
    ],
    "hasCredential": [
      "California Physical Therapy Board Licensed",
      "American Physical Therapy Association Member",
      "Orthopedic Section APTA Member"
    ],
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
    ]
  };

  const getStructuredData = () => {
    switch (type) {
      case 'homepage':
        return {
          "@context": "https://schema.org",
          "@graph": [
            {
              ...baseOrganization,
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Physical Therapy Services 2025",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "MedicalTherapy",
                      "name": "SpineZone Strength Program",
                      "description": "10-week comprehensive spine treatment program for severe back and neck pain",
                      "category": "Physical Therapy",
                      "provider": { "@id": "https://spinezone-sandiego.com/#organization" }
                    },
                    "priceSpecification": {
                      "@type": "PriceSpecification",
                      "priceCurrency": "USD",
                      "price": "Contact for pricing"
                    }
                  },
                  {
                    "@type": "Offer", 
                    "itemOffered": {
                      "@type": "MedicalTherapy",
                      "name": "Joint Pain Treatment",
                      "description": "Comprehensive treatment for hip, knee, shoulder, and all joint pain conditions",
                      "category": "Physical Therapy",
                      "provider": { "@id": "https://spinezone-sandiego.com/#organization" }
                    },
                    "priceSpecification": {
                      "@type": "PriceSpecification",
                      "priceCurrency": "USD",
                      "price": "Contact for pricing"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "MedicalTherapy",
                      "name": "Sports Injury Rehabilitation",
                      "description": "Specialized sports medicine and injury recovery programs",
                      "category": "Sports Medicine",
                      "provider": { "@id": "https://spinezone-sandiego.com/#organization" }
                    }
                  }
                ]
              },
              "knows": {
                "@type": "MedicalCondition",
                "name": ["Back Pain", "Neck Pain", "Hip Pain", "Knee Pain", "Shoulder Pain", "Joint Pain", "Sports Injuries"]
              }
            },
            {
              "@type": "WebSite",
              "@id": "https://spinezone-sandiego.com/#website",
              "url": "https://spinezone-sandiego.com",
              "name": "SpineZone Physical Therapy San Diego",
              "description": "San Diego's #1 physical therapy clinic for joint pain treatment 2025 - 90% success rate, non-invasive methods",
              "publisher": {
                "@id": "https://spinezone-sandiego.com/#organization"
              },
              "potentialAction": [
                {
                  "@type": "SearchAction",
                  "target": {
                    "@type": "EntryPoint",
                    "urlTemplate": "https://spinezone-sandiego.com/search?q={search_term_string}"
                  },
                  "query-input": "required name=search_term_string"
                }
              ],
              "mainEntity": {
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "Do you accept insurance for physical therapy in San Diego?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes, we accept all major insurance plans with a 98% acceptance rate. We also offer CareCredit and flexible payment options."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What conditions do you treat at SpineZone?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "We specialize in treating all joint pain conditions including back pain, neck pain, hip pain, knee pain, shoulder pain, and sports injuries using non-invasive methods."
                    }
                  }
                ]
              }
            }
          ]
        };

      case 'team':
        return {
          "@context": "https://schema.org",
          ...baseOrganization,
          "employee": [
            {
              "@type": "Person",
              "name": "Dr. Sarah Mitchell",
              "jobTitle": "Lead Physical Therapist & Clinic Director",
              "description": "Board-certified physical therapist specializing in spinal rehabilitation with 12 years experience",
              "hasCredential": [
                "Doctor of Physical Therapy - USC",
                "Orthopedic Manual Physical Therapy Fellowship",
                "Dry Needling Certification"
              ]
            },
            {
              "@type": "Person", 
              "name": "Michael Chen",
              "jobTitle": "Orthopedic Specialist",
              "description": "Board-certified orthopedic specialist with 10 years experience in sports medicine",
              "hasCredential": [
                "Doctor of Physical Therapy - UCSD",
                "Board Certified Orthopedic Specialist"
              ]
            },
            {
              "@type": "Person",
              "name": "Dr. Amanda Foster",
              "jobTitle": "Wellness & Pain Management Specialist", 
              "description": "Pain management specialist with 8 years experience in chronic pain treatment",
              "hasCredential": [
                "Doctor of Physical Therapy - Chapman University",
                "Certified Pain Management Specialist"
              ]
            }
          ]
        };

      case 'testimonials':
        return {
          "@context": "https://schema.org",
          ...baseOrganization,
          "review": [
            {
              "@type": "Review",
              "reviewRating": {
                "@type": "Rating", 
                "ratingValue": 5,
                "bestRating": 5
              },
              "author": {
                "@type": "Person",
                "name": "B.M."
              },
              "reviewBody": "After my rollover auto accident, I couldn't walk without pain. SpineZone's strength-based approach got me back to full activity.",
              "datePublished": "2025-01-01"
            },
            {
              "@type": "Review",
              "reviewRating": {
                "@type": "Rating",
                "ratingValue": 5, 
                "bestRating": 5
              },
              "author": {
                "@type": "Person",
                "name": "Laura H."
              },
              "reviewBody": "SpineZone's sports-specific rehabilitation program saved my tennis career and college scholarship.",
              "datePublished": "2024-12-15"
            }
          ],
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": 4.9,
            "reviewCount": 500,
            "bestRating": 5,
            "worstRating": 1
          }
        };

      case 'services':
        return {
          "@context": "https://schema.org",
          "@type": "MedicalWebPage",
          "name": "San Diego Physical Therapy Services 2025",
          "description": "Comprehensive physical therapy services including spine treatment, joint pain therapy, and sports medicine in San Diego",
          "url": "https://spinezone-sandiego.com/services",
          "mainEntity": {
            "@type": "MedicalBusiness",
            "@id": "https://spinezone-sandiego.com/#organization"
          },
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Physical Therapy Treatment Programs",
            "itemListElement": [
              {
                "@type": "Offer",
                "name": "SpineZone Strength Program",
                "description": "10-week comprehensive program for severe back, neck, hip, shoulder, and knee pain",
                "category": "Physical Therapy Programs"
              },
              {
                "@type": "Offer",
                "name": "Intensive Program",
                "description": "7-week accelerated rehabilitation for rapid recovery and conditioning",
                "category": "Intensive Rehabilitation"
              },
              {
                "@type": "Offer",
                "name": "Maintenance Program",
                "description": "Ongoing preventive care for program graduates",
                "category": "Maintenance Care"
              }
            ]
          }
        };

      case 'assessment':
        return {
          "@context": "https://schema.org",
          "@type": "MedicalWebPage",
          "name": "Free San Diego Pain Assessment 2025",
          "description": "Comprehensive pain assessment tool for back pain, neck pain, and joint conditions with 90% accuracy rate",
          "url": "https://spinezone-sandiego.com/assessment",
          "mainEntity": {
            "@type": "MedicalTest",
            "name": "Pain Assessment Questionnaire",
            "description": "Evidence-based pain evaluation with 90% accuracy rate used by 10,000+ patients",
            "usedToDiagnose": [
              "Back Pain",
              "Neck Pain", 
              "Hip Pain",
              "Shoulder Pain",
              "Knee Pain",
              "Joint Pain",
              "Sports Injuries",
              "Chronic Pain"
            ],
            "medicalSpecialty": "Physical Therapy"
          },
          "provider": {
            "@id": "https://spinezone-sandiego.com/#organization"
          },
          "potentialAction": {
            "@type": "ConsumeAction",
            "target": "https://spinezone-sandiego.com/assessment",
            "actionStatus": "PotentialActionStatus"
          }
        };

      case 'insurance':
        return {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "San Diego Physical Therapy Insurance Coverage 2025",
          "description": "Comprehensive insurance and payment information for physical therapy in San Diego - 98% acceptance rate",
          "url": "https://spinezone-sandiego.com/insurance", 
          "mainEntity": {
            "@type": "FinancialService",
            "name": "Physical Therapy Insurance Services",
            "description": "98% insurance acceptance rate with comprehensive billing services and flexible payment options",
            "serviceType": "Healthcare Insurance and Billing",
            "provider": {
              "@id": "https://spinezone-sandiego.com/#organization"
            },
            "paymentAccepted": ["Insurance", "CareCredit", "HSA", "FSA", "Payment Plans", "Cash", "Credit Card"]
          },
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://spinezone-sandiego.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Insurance",
                "item": "https://spinezone-sandiego.com/insurance"
              }
            ]
          }
        };

      default:
        return baseOrganization;
    }
  };

  const structuredData = getStructuredData();

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
    </Head>
  );
}