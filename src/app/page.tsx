import dynamic from 'next/dynamic';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import HeroSection from '@/components/HeroSection';
import { FloatingContactCTA, QuickContactCTA } from '@/components/ProfessionalContactCTA';

// Lazy load ContactForm for better performance
const ContactForm = dynamic(() => import('@/components/ContactForm'), {
  loading: () => (
    <div className="bg-white rounded-lg border shadow-sm p-6 animate-pulse">
      <div className="space-y-4">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-10 bg-gray-200 rounded"></div>
        <div className="h-10 bg-gray-200 rounded"></div>
        <div className="h-10 bg-gray-200 rounded w-1/3"></div>
      </div>
    </div>
  ),
  ssr: false
});

export const metadata: Metadata = {
  title: 'SpineZone Physical Therapy - Expert Spine & Joint Care in San Diego',
  description: 'Professional physical therapy services in San Diego. Expert treatment for spine, joint pain, and sports injuries. Schedule your consultation today.',
};

// Performance-optimized lazy loading with viewport-based loading and preloading
const ConditionsTreated = dynamic(() => import('@/components/ConditionsTreated'), {
  loading: () => (
    <div className="section-padding bg-gray-50 animate-pulse" style={{ minHeight: '400px' }}>
      <div className="container-max">
        <div className="h-8 bg-gray-200 rounded mb-4 w-1/3"></div>
        <div className="grid md:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-24 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    </div>
  ),
  ssr: false
});


const LocalSEO = dynamic(() => import('@/components/LocalSEO'), {
  loading: () => (
    <div className="bg-gradient-to-br from-blue-600 to-green-600 animate-pulse" style={{ minHeight: '400px' }}>
      <div className="section-padding">
        <div className="container-max">
          <div className="h-8 bg-blue-300/30 rounded mb-4 w-1/3"></div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="h-32 bg-blue-300/30 rounded"></div>
            <div className="h-32 bg-blue-300/30 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  ),
  ssr: false
});


const FinalCTA = dynamic(() => import('@/components/FinalCTA'), {
  loading: () => (
    <div className="section-padding bg-gradient-to-br from-blue-600 to-green-600 animate-pulse" style={{ minHeight: '300px' }}>
      <div className="container-max text-center">
        <div className="h-10 bg-blue-300/30 rounded mb-4 w-1/2 mx-auto"></div>
        <div className="h-6 bg-blue-300/30 rounded mb-6 w-2/3 mx-auto"></div>
        <div className="h-12 bg-blue-300/30 rounded w-48 mx-auto"></div>
      </div>
    </div>
  ),
  ssr: false
});

const Footer = dynamic(() => import('@/components/Footer'), {
  loading: () => (
    <div className="bg-gray-900 text-white animate-pulse" style={{ minHeight: '250px' }}>
      <div className="section-padding">
        <div className="container-max">
          <div className="grid md:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i}>
                <div className="h-6 bg-gray-700 rounded mb-4 w-3/4"></div>
                <div className="space-y-2">
                  {[...Array(4)].map((_, j) => (
                    <div key={j} className="h-4 bg-gray-700 rounded w-1/2"></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ),
  ssr: false
});

export default function Home() {
  return (
    <main>
      {/* Above-the-fold critical content */}
      <HeroSection />
      
      {/* Below-the-fold content */}
      <Suspense fallback={<div className="h-96 animate-pulse bg-gray-100"></div>}>
        <ConditionsTreated />
      </Suspense>
      
      <Suspense fallback={<div className="h-96 animate-pulse bg-blue-100"></div>}>
        <LocalSEO />
      </Suspense>
      
      {/* Contact Form Section */}
      <section className="section-padding bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Schedule Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">Free Consultation</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Take the first step towards pain-free living. Fill out the form below and our team 
              will contact you within 24 hours to schedule your personalized evaluation.
            </p>
          </div>
          <div className="max-w-2xl mx-auto">
            <Suspense fallback={<div className="h-96 animate-pulse bg-white rounded-lg"></div>}>
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </section>
      
      <Suspense fallback={<div className="h-72 animate-pulse bg-blue-100"></div>}>
        <FinalCTA />
      </Suspense>
      
      <Suspense fallback={<div className="h-64 animate-pulse bg-gray-800"></div>}>
        <Footer />
      </Suspense>
      
      {/* Contact CTAs */}
      <div className="fixed bottom-20 left-4 z-40 hidden md:block">
        <QuickContactCTA />
      </div>
      
      <FloatingContactCTA 
        position="bottom-left"
        className="shadow-2xl"
      />
    </main>
  );
}