import dynamic from 'next/dynamic';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import ContactForm from '@/components/ContactForm';
import StructuredData from '@/components/StructuredData';
import { generateSEOMetadata } from '@/lib/seo-utils';
import PerformanceOptimizer from '@/components/PerformanceOptimizer';

const Footer = dynamic(() => import('@/components/Footer'), {
  loading: () => (
    <div className="bg-gray-900 text-white animate-pulse">
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

export const metadata: Metadata = generateSEOMetadata({
  title: 'Book Your Evaluation | Physical Therapy Consultation San Diego | SpineZone',
  description: 'Schedule your comprehensive physical therapy evaluation in San Diego. Expert assessment for back pain, neck pain, joint conditions. Free consultation available.',
  keywords: [
    'book evaluation San Diego 2025',
    'physical therapy consultation near me',
    'schedule PT evaluation San Diego',
    'spine therapy consultation',
    'comprehensive PT evaluation',
    'physical therapy booking La Jolla',
    'spine consultation Hillcrest',
    'joint evaluation Pacific Beach',
    'back pain consultation San Diego',
    'neck pain evaluation 2025'
  ],
  category: 'spine',
  location: 'San Diego',
  priority: 'high'
});

export default function AssessmentPage() {
  return (
    <main>
      <PerformanceOptimizer 
        enableCriticalCSS={true}
        enableResourceHints={true}
        enableLayoutOptimization={true}
        enableWebVitalsTracking={true}
        enableMobileOptimizations={true}
      />
      <StructuredData type="assessment" />
      
      {/* Book Evaluation Section */}
      <section className="section-padding bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="container-max">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Book Your <span className="healthcare-text-gradient">Professional Evaluation</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Take the first step towards pain-free living with our comprehensive physical therapy evaluation. 
              Our expert team will assess your condition and create a personalized treatment plan tailored to your needs.
            </p>
            
            {/* Benefits Section */}
            <div className="grid md:grid-cols-3 gap-6 mt-12 mb-12">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Free Consultation</h3>
                <p className="text-gray-600 text-sm">Complimentary initial evaluation with our licensed physical therapists</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Same Day Available</h3>
                <p className="text-gray-600 text-sm">Most appointments available within 24-48 hours across all locations</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h2m8-4V7a2 2 0 00-2-2h-2m0 0V3a2 2 0 00-2-2v0a2 2 0 00-2 2v2m4 0h2m-2 0v4m0 0l-2 2m2-2l2 2" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Personalized Plan</h3>
                <p className="text-gray-600 text-sm">Custom treatment strategy based on your specific condition and goals</p>
              </div>
            </div>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <ContactForm />
          </div>
          
          {/* Contact Information */}
          <div className="text-center mt-12 pt-8 border-t border-gray-200">
            <p className="text-gray-600 mb-4">
              Prefer to speak with someone directly?
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="tel:+1-858-555-0123" 
                className="flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call (858) 555-0123
              </a>
              <span className="text-gray-400">or</span>
              <span className="text-gray-600">Fill out the form above and we'll contact you within 24 hours</span>
            </div>
          </div>
        </div>
      </section>
      
      <Suspense fallback={
        <div className="bg-gray-900 text-white animate-pulse">
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
      }>
        <Footer />
      </Suspense>
    </main>
  );
}