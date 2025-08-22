import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import '../styles/navigation.css'
import Header from '@/components/Header'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import ChatBot from '@/components/ChatBot'
import FontOptimizer from '@/components/FontOptimizer'
import ResourceHints from '@/components/ResourceHints'
import ScriptOptimizer from '@/components/ScriptOptimizer'
import WebVitalsOptimizer from '@/components/WebVitalsOptimizer'
import { 
  generateSEOMetadata, 
  generateLocalBusinessSchema, 
  generateAppointmentBookingSchema,
  generateHealthcareServiceSchema,
  generateOrganizationSchema,
  generateMedicalProcedureSchema,
  generateFAQSchema
} from '@/lib/seo-utils'
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
        {/* Critical CSS inline for LCP optimization */}
        <style dangerouslySetInnerHTML={{
          __html: `
            :root{--primary-blue:#0369a1;--primary-green:#059669;--light-blue:#e0f2fe;--light-green:#ecfdf5;--dark-blue:#1e40af;--dark-green:#047857;--animation-duration:0.3s;--transition-duration:0.2s;--transition-timing:cubic-bezier(0.4,0.0,0.2,1)}html{scroll-behavior:smooth;text-rendering:optimizeLegibility;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}body{margin:0;padding:0;color:#111827;font-family:system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;background-color:#ffffff;overflow-x:hidden;touch-action:manipulation}.hero-section{min-height:100vh;display:flex;align-items:center;background:linear-gradient(135deg,#e0f2fe 0%,#ecfdf5 100%)}.hero-title{font-size:3rem;font-weight:800;line-height:1.1;margin-bottom:1.5rem;color:#111827}.hero-description{font-size:1.25rem;line-height:1.6;margin-bottom:2rem;color:#374151;max-width:42rem}@media (max-width:768px){.hero-title{font-size:2.25rem}.hero-description{font-size:1.125rem}}
          `
        }} />
        
        {/* Performance optimization components */}
        <FontOptimizer />
        <ResourceHints />
        
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
        
        {/* Healthcare Service Schema for Medical SEO */}
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateHealthcareServiceSchema())
          }}
        />
        
        {/* Organization Schema for Brand Authority */}
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateOrganizationSchema())
          }}
        />
        
        {/* Medical Procedure Schema for Treatment Authority */}
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateMedicalProcedureSchema())
          }}
        />
        
        {/* FAQ Schema for Featured Snippets */}
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateFAQSchema())
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
        
        {/* Critical resource hints for Core Web Vitals optimization */}
        <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        
        {/* Preload critical CSS for LCP optimization */}
        <link rel="preload" href="/critical.css" as="style" />
        <noscript><link rel="stylesheet" href="/critical.css" /></noscript>
        
        {/* Preload above-the-fold content for better LCP */}
        <link rel="preload" href="/spinezone-logo.png" as="image" type="image/png" />
        
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
        
        {/* Smart prefetching for SEO and UX */}
        <link rel="prefetch" href="/services" />
        <link rel="prefetch" href="/assessment" />
        <link rel="prefetch" href="/contact" />
        <link rel="prefetch" href="/locations" />
        <link rel="prefetch" href="/treatment-journey" />
        
        {/* Preload key images for better Core Web Vitals */}
        <link 
          rel="preload" 
          href="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=75&fm=avif" 
          as="image" 
          type="image/avif"
          media="(max-width: 768px)"
        />
        
        {/* Enhanced DNS prefetch for external resources and SEO tools */}
        <link rel="dns-prefetch" href="//images.unsplash.com" />
        <link rel="dns-prefetch" href="//maps.googleapis.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//unpkg.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//connect.facebook.net" />
        <link rel="dns-prefetch" href="//platform.twitter.com" />
        <link rel="dns-prefetch" href="//www.linkedin.com" />
        
        {/* SEO and Social Media Preconnects */}
        <link rel="preconnect" href="https://www.google.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://search.google.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://schema.org" crossOrigin="anonymous" />
        
        
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
          
          {/* ChatBot positioned at bottom-right */}
          <ChatBot />
          
          {/* Performance optimization scripts */}
          <ScriptOptimizer />
          
          {/* Web Vitals monitoring for SEO */}
          <WebVitalsOptimizer />
          
          {/* Simple, professional healthcare layout */}
        </ErrorBoundary>
      </body>
    </html>
  )
}