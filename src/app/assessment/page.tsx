import dynamic from 'next/dynamic';
import type { Metadata } from 'next';
import StructuredData from '@/components/StructuredData';
import { generateSEOMetadata } from '@/lib/seo-utils';

// Lazy load the InteractiveAssessment component
const InteractiveAssessment = dynamic(() => import('@/components/InteractiveAssessment'), {
  loading: () => <div className="section-padding bg-gradient-to-br from-blue-50 to-green-50 animate-pulse h-96" />
});

const Footer = dynamic(() => import('@/components/Footer'), {
  loading: () => <div className="bg-gray-900 text-white animate-pulse h-64" />
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
      <StructuredData type="assessment" />
      <InteractiveAssessment />
      <Footer />
    </main>
  );
}