import dynamic from 'next/dynamic';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import StructuredData from '@/components/StructuredData';
import { generateSEOMetadata } from '@/lib/seo-utils';
import PerformanceOptimizer from '@/components/PerformanceOptimizer';

// Performance-optimized lazy loading with better loading states
const InteractiveAssessment = dynamic(() => import('@/components/InteractiveAssessment'), {
  loading: () => (
    <div className="section-padding bg-gradient-to-br from-blue-50 to-green-50 animate-pulse">
      <div className="container-max">
        <div className="h-12 bg-gray-200 rounded mb-6 w-1/2 mx-auto"></div>
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
          <div className="h-6 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="flex justify-between mt-6">
            <div className="h-10 bg-gray-200 rounded w-20"></div>
            <div className="h-10 bg-gray-200 rounded w-20"></div>
          </div>
        </div>
      </div>
    </div>
  ),
  ssr: false
});

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
  title: 'Free Pain Assessment San Diego 2025 | Physical Therapy Evaluation | SpineZone',
  description: 'Free comprehensive pain assessment & evaluation in San Diego. Get personalized PT treatment recommendations for back pain, neck pain, joint conditions. 90% accuracy rate.',
  keywords: [
    'free pain assessment San Diego 2025',
    'physical therapy evaluation near me',
    'joint pain diagnosis San Diego',
    'spine health assessment',
    'comprehensive PT evaluation',
    'pain assessment La Jolla',
    'spine evaluation Hillcrest',
    'joint assessment Pacific Beach',
    'back pain evaluation San Diego',
    'neck pain assessment 2025'
  ],
  category: 'pain',
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
      
      <Suspense fallback={
        <div className="section-padding bg-gradient-to-br from-blue-50 to-green-50 animate-pulse">
          <div className="container-max">
            <div className="h-12 bg-gray-200 rounded mb-6 w-1/2 mx-auto"></div>
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
              <div className="h-6 bg-gray-200 rounded mb-4"></div>
              <div className="space-y-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-12 bg-gray-200 rounded"></div>
                ))}
              </div>
              <div className="flex justify-between mt-6">
                <div className="h-10 bg-gray-200 rounded w-20"></div>
                <div className="h-10 bg-gray-200 rounded w-20"></div>
              </div>
            </div>
          </div>
        </div>
      }>
        <InteractiveAssessment />
      </Suspense>
      
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