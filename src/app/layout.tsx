import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import '../styles/navigation.css'
import Header from '@/components/Header'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { DesktopVoiceCallButton } from '@/components/VapiVoiceIntegration'
import { generateSEOMetadata, generateLocalBusinessSchema, generateAppointmentBookingSchema } from '@/lib/seo-utils'
// Removed complex booking integrations - using simple contact system

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = generateSEOMetadata({
  title: 'Physical Therapy Appointments San Diego 2025 | SpineZone',
  description: 'Schedule your physical therapy appointment in San Diego. Expert joint pain treatment, spine therapy, sports injury recovery. Book online or call (858) 555-0123. Same-day appointments available.',
  keywords: [
    'San Diego physical therapy appointments 2025',
    'schedule physical therapy appointment San Diego',
    'book PT appointment San Diego',
    'San Diego joint pain appointments',
    'physical therapy booking San Diego',
    'spine therapy appointments',
    'sports injury appointments San Diego',
    'make PT appointment online',
    'physical therapy consultation San Diego',
    'free pain assessment',
    'La Jolla physical therapy',
    'Hillcrest spine treatment',
    'Pacific Beach PT',
    'Mission Valley therapy',
    'Downtown San Diego PT'
  ],
  category: 'spine',
  location: 'San Diego',
  isHomePage: true,
  priority: 'high'
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Enhanced Structured Data for Local Business */}
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateLocalBusinessSchema())
          }}
        />

        {/* Appointment Booking Schema for Enhanced Search Visibility */}
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateAppointmentBookingSchema())
          }}
        />
        
        {/* Website Schema */}
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "https://spinezone-sandiego.com/#website",
              "url": "https://spinezone-sandiego.com",
              "name": "SpineZone Physical Therapy San Diego",
              "description": "San Diego's leading physical therapy clinic for joint pain, spine treatment, and sports injury rehabilitation",
              "publisher": {
                "@type": "MedicalBusiness",
                "@id": "https://spinezone-sandiego.com/#medicalbusiness"
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
              "sameAs": [
                "https://facebook.com/spinezonesd",
                "https://instagram.com/spinezonesd",
                "https://linkedin.com/company/spinezone"
              ]
            })
          }}
        />

        {/* Breadcrumb Schema for Homepage */}
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://spinezone-sandiego.com"
                }
              ]
            })
          }}
        />
        <link rel="canonical" href="https://spinezone-sandiego.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#0369a1" />
        <meta name="color-scheme" content="light" />
        
        {/* Safe area insets for devices with notches */}
        <style dangerouslySetInnerHTML={{
          __html: `
            :root {
              --sat: env(safe-area-inset-top);
              --sar: env(safe-area-inset-right);
              --sab: env(safe-area-inset-bottom);
              --sal: env(safe-area-inset-left);
            }
          `
        }} />
        
        {/* Mobile Web App Capable */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="SpineZone PT" />
        
        {/* Microsoft Tile */}
        <meta name="msapplication-TileColor" content="#0369a1" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* Performance hints */}
        <meta httpEquiv="x-dns-prefetch-control" content="on" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Critical resource hints */}
        <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        
        {/* Hero image preload for LCP optimization */}
        <link 
          rel="preload" 
          href="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=85&fm=avif" 
          as="image" 
          type="image/avif"
        />
        <link 
          rel="preload" 
          href="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=85&fm=webp" 
          as="image" 
          type="image/webp"
        />
        <link 
          rel="preload" 
          href="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=85" 
          as="image"
        />
        
        <link rel="prefetch" href="/services" />
        <link rel="prefetch" href="/assessment" />
        <link rel="prefetch" href="/contact" />
        
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//images.unsplash.com" />
        <link rel="dns-prefetch" href="//maps.googleapis.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//unpkg.com" />
        
        {/* Vapi Web SDK for Voice Calls */}
        <script
          src="https://cdn.jsdelivr.net/npm/@vapi-ai/web@latest/dist/index.umd.js"
          async
          type="text/javascript"
        />
        
        {/* Favicon and icons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={inter.className}>
        <ErrorBoundary>
          <Header />
          {children}
          
          {/* Desktop Voice Call Button - Hidden on mobile */}
          <div className="hidden md:block">
            <DesktopVoiceCallButton />
          </div>
          
          {/* Simple, professional healthcare layout */}
        </ErrorBoundary>
      </body>
    </html>
  )
}