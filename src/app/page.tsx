import dynamic from 'next/dynamic';
import type { Metadata } from 'next';
import HeroSection from '@/components/HeroSection';
import { FloatingContactCTA, QuickContactCTA } from '@/components/ProfessionalContactCTA';
import StructuredData from '@/components/StructuredData';
// Removed complex navigation integrations - using simple layout
import { generateSEOMetadata } from '@/lib/seo-utils';
import PerformanceOptimizer from '@/components/PerformanceOptimizer';

export const metadata: Metadata = generateSEOMetadata({
  title: 'Physical Therapy Appointments San Diego 2025 | SpineZone - 90% Success Rate',
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
    'how to schedule physical therapy appointment San Diego',
    'best physical therapy appointments La Jolla',
    'urgent physical therapy appointments San Diego',
    'same day PT appointments near me',
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
});

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

const TreatmentOverviewCards = dynamic(() => import('@/components/TreatmentOverviewCards'), {
  loading: () => (
    <div className="section-padding bg-white animate-pulse" style={{ minHeight: '400px' }}>
      <div className="container-max">
        <div className="h-8 bg-gray-200 rounded mb-4 w-1/2 mx-auto"></div>
        <div className="grid md:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-gray-100 rounded-xl p-6">
              <div className="h-6 bg-gray-200 rounded mb-3"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
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

const FAQSection = dynamic(() => import('@/components/FAQSection'), {
  loading: () => (
    <div className="section-padding bg-gray-50 animate-pulse" style={{ minHeight: '400px' }}>
      <div className="container-max">
        <div className="h-8 bg-gray-200 rounded mb-6 w-1/3 mx-auto"></div>
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg p-6">
              <div className="h-5 bg-gray-200 rounded mb-2 w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
  ssr: false
});

const InternalLinks = dynamic(() => import('@/components/InternalLinks'), {
  loading: () => (
    <div className="section-padding bg-gradient-to-br from-blue-50 to-green-50 animate-pulse" style={{ minHeight: '300px' }}>
      <div className="container-max">
        <div className="h-6 bg-gray-200 rounded mb-4 w-1/4"></div>
        <div className="grid md:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-12 bg-gray-200 rounded"></div>
          ))}
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
      <PerformanceOptimizer 
        enableCriticalCSS={true}
        enableResourceHints={true}
        enableLayoutOptimization={true}
        enableWebVitalsTracking={true}
        enableMobileOptimizations={true}
      />
      <StructuredData type="homepage" />
      
      {/* Above-the-fold critical content */}
      <HeroSection />
      
        {/* Below-the-fold lazy-loaded content */}
        <div id="conditions-section" className="viewport-section" data-viewport-threshold="0.3">
          <ConditionsTreated />
        </div>
        
        <div id="treatments-section" className="viewport-section" data-viewport-threshold="0.3">
          <TreatmentOverviewCards />
        </div>
      
      {/* Local SEO Component for San Diego neighborhoods */}
      <LocalSEO 
        showNeighborhoods={true}
        showHours={true}
        showContact={true}
      />
      
      {/* FAQ Section for Featured Snippets */}
      <FAQSection 
        title="Physical Therapy FAQ - San Diego 2025"
        faqs={[]}
        showCategories={true}
        maxVisible={8}
        structured={true}
      />
      
      {/* Internal Links for SEO */}
      <InternalLinks 
        currentPage="home" 
        showLocalSEO={true} 
      />
      
      <FinalCTA />
      <Footer />
      
      {/* Simple Contact CTAs for Professional Presentation */}
      <div className="fixed bottom-20 right-4 z-40 hidden md:block">
        <QuickContactCTA 
          className="shadow-2xl animate-pulse"
        />
      </div>
      
      {/* Mobile Floating CTA - Professional Contact */}
      <FloatingContactCTA 
        position="bottom-right"
        className="shadow-2xl"
      />
      
      {/* Professional healthcare presentation complete */}
    </main>
  );
}