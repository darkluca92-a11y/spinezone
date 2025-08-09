import dynamic from 'next/dynamic';
import type { Metadata } from 'next';
import StructuredData from '@/components/StructuredData';
import { generateSEOMetadata } from '@/lib/seo-utils';

// Lazy load the TestimonialsCarousel component
const TestimonialsCarousel = dynamic(() => import('@/components/TestimonialsCarousel'), {
  loading: () => <div className="section-padding bg-white animate-pulse h-96" />
});

const Footer = dynamic(() => import('@/components/Footer'), {
  loading: () => <div className="bg-gray-900 text-white animate-pulse h-64" />
});

export const metadata: Metadata = generateSEOMetadata({
  title: 'San Diego Physical Therapy Reviews 2025 | Patient Testimonials | SpineZone',
  description: 'Read 500+ verified San Diego physical therapy reviews & patient success stories. 90% success rate, 4.9★ rating. Real testimonials from SpineZone patients who achieved pain relief.',
  keywords: [
    'San Diego physical therapy reviews 2025',
    'patient testimonials San Diego',
    'PT success stories',
    'SpineZone reviews',
    'back pain recovery testimonials',
    'joint pain treatment reviews',
    'verified patient reviews',
    'physical therapy ratings San Diego',
    '5-star PT clinic reviews',
    'patient success stories'
  ],
  category: 'spine',
  location: 'San Diego',
  priority: 'medium'
});

export default function TestimonialsPage() {
  return (
    <main>
      <StructuredData type="testimonials" />
      <TestimonialsCarousel />
      <Footer />
    </main>
  );
}