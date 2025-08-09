import dynamic from 'next/dynamic';
import type { Metadata } from 'next';
import HeroSection from '@/components/HeroSection';
import TrustIndicators from '@/components/TrustIndicators';
import ScrollTriggeredCTA from '@/components/ScrollTriggeredCTA';
import StructuredData from '@/components/StructuredData';
import { generateSEOMetadata } from '@/lib/seo-utils';
import PerformanceOptimizer from '@/components/PerformanceOptimizer';

export const metadata: Metadata = generateSEOMetadata({
  title: 'San Diego Physical Therapy 2025 | Joint Pain Treatment | SpineZone - 90% Success Rate',
  description: 'San Diego\'s #1 physical therapy clinic for joint pain treatment 2025. 90% success rate, 1M+ patient encounters. Specializing in back pain, neck pain, hip pain, shoulder pain, knee pain without surgery.',
  keywords: [
    'physical therapy consultation San Diego',
    'free pain assessment',
    'joint pain treatment San Diego 2025',
    'spine therapy San Diego 2025',
    'sports injury rehabilitation',
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

// Optimized lazy loading with better loading states and error boundaries
const ConditionsTreated = dynamic(() => import('@/components/ConditionsTreated'), {
  loading: () => <div className="section-padding bg-gray-50 lazy-section critical-resource" data-min-height="400px" />,
  ssr: false
});

const TreatmentOptions = dynamic(() => import('@/components/TreatmentOptions'), {
  loading: () => <div className="section-padding bg-white lazy-section critical-resource" data-min-height="400px" />,
  ssr: false
});

const LocalSEO = dynamic(() => import('@/components/LocalSEO'), {
  loading: () => <div className="bg-gradient-to-br from-blue-600 to-green-600 lazy-section critical-resource" data-min-height="400px" />,
  ssr: false
});

const FAQSection = dynamic(() => import('@/components/FAQSection'), {
  loading: () => <div className="section-padding bg-gray-50 lazy-section critical-resource" data-min-height="400px" />,
  ssr: false
});

const InternalLinks = dynamic(() => import('@/components/InternalLinks'), {
  loading: () => <div className="section-padding bg-gradient-to-br from-blue-50 to-green-50 lazy-section critical-resource" data-min-height="400px" />,
  ssr: false
});

const FinalCTA = dynamic(() => import('@/components/FinalCTA'), {
  loading: () => <div className="section-padding bg-gradient-to-br from-blue-600 to-green-600 lazy-section critical-resource" data-min-height="300px" />,
  ssr: false
});

const Footer = dynamic(() => import('@/components/Footer'), {
  loading: () => <div className="bg-gray-900 text-white lazy-section critical-resource" data-min-height="250px" />,
  ssr: false
});

export default function Home() {
  return (
    <main>
      <PerformanceOptimizer />
      <StructuredData type="homepage" />
      <HeroSection />
      <TrustIndicators />
      
      <div id="conditions-section">
        <ConditionsTreated />
      </div>
      
      <div id="treatments-section">
        <TreatmentOptions />
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
      
      {/* Scroll-triggered CTAs */}
      <ScrollTriggeredCTA
        triggerElementId="conditions-section"
        triggerThreshold={0.5}
        ctaText="Find Treatment for My Condition"
        ctaSubtext="Get personalized care for your specific condition"
      />
      
      <ScrollTriggeredCTA
        triggerElementId="treatments-section"
        triggerThreshold={0.75}
        ctaText="Start My Treatment Plan"
        ctaSubtext="Begin your recovery journey today"
      />
    </main>
  );
}