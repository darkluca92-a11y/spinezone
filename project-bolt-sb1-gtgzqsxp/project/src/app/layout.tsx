import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import ChatBot from '@/components/ChatBot'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SpineZone - San Diego Physical Therapy 2025 | Leading Joint Pain Treatment',
  description: 'Premier San Diego physical therapy 2025 - Specialized joint pain treatment for hips, shoulders, knees, back, neck. 90% success rate, 1M+ patient encounters, 100,000+ visits. No surgery required.',
  keywords: [
    'San Diego physical therapy',
    'San Diego physical therapy 2025',
    'San Diego joint pain therapy 2025',
    'joint pain treatment San Diego',
    'hip pain treatment San Diego',
    'shoulder pain treatment San Diego', 
    'knee pain treatment San Diego',
    'back pain treatment San Diego',
    'neck pain treatment San Diego',
    'all joint pain treatment',
    'non-invasive pain treatment',
    'physical therapy clinic San Diego',
    'spine treatment San Diego',
    'Rehab United San Diego alternative',
    'pain management San Diego',
    'sports injury rehabilitation San Diego',
    'joint pain therapy 2025'
  ],
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
    canonical: '/',
  },
  openGraph: {
    title: 'SpineZone - San Diego Joint Pain Therapy 2025 | All Joint Pain Treatment',
    description: 'Leading San Diego joint pain therapy 2025. Now treating ALL joint pain - hips, shoulders, knees, back, neck. 90% success rate without surgery, injections, or opioids.',
    url: 'https://spinezone-sandiego.com',
    siteName: 'SpineZone Physical Therapy',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SpineZone Physical Therapy San Diego',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SpineZone - San Diego Joint Pain Therapy 2025',
    description: '90% success rate treating ALL joint pain - hips, shoulders, knees, back, neck. No surgery, injections, or opioids required.',
    images: ['/og-image.jpg'],
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
    'google-site-verification': 'your-google-verification-code'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Structured Data for Local Business */}
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MedicalBusiness",
              "name": "SpineZone Physical Therapy",
              "description": "Leading San Diego physical therapy clinic specializing in non-invasive back, neck, and joint pain treatment",
              "url": "https://spinezone-sandiego.com",
              "telephone": "+1-858-555-0123",
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
              "openingHours": "Mo-Fr 07:00-20:00, Sa 08:00-17:00",
              "priceRange": "$$",
              "paymentAccepted": "Cash, Credit Card, Insurance",
              "currenciesAccepted": "USD"
            })
          }}
        />
        <link rel="canonical" href="https://spinezone-sandiego.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0369a1" />
        {/* Preload critical fonts */}
        <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//images.unsplash.com" />
        <link rel="dns-prefetch" href="//maps.googleapis.com" />
      </head>
      <body className={inter.className}>
        <Header />
        {children}
        <ChatBot />
      </body>
    </html>
  )
}