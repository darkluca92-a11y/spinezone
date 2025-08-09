import dynamic from 'next/dynamic';
import type { Metadata } from 'next';
import StructuredData from '@/components/StructuredData';
import { generateSEOMetadata } from '@/lib/seo-utils';

// Lazy load the InsurancePayment component
const InsurancePayment = dynamic(() => import('@/components/InsurancePayment'), {
  loading: () => <div className="section-padding bg-gray-50 animate-pulse h-96" />
});

const Footer = dynamic(() => import('@/components/Footer'), {
  loading: () => <div className="bg-gray-900 text-white animate-pulse h-64" />
});

export const metadata: Metadata = generateSEOMetadata({
  title: 'San Diego Physical Therapy Insurance 2025 | Healthcare Financing | SpineZone',
  description: 'San Diego physical therapy insurance coverage & financing options. 98% insurance acceptance rate, 0% financing, CareCredit, flexible payment plans. Check your coverage now.',
  keywords: [
    'San Diego PT insurance 2025',
    'physical therapy insurance coverage',
    'healthcare financing San Diego',
    'workers compensation therapy',
    'auto insurance PT claims',
    'CareCredit physical therapy',
    'PT payment plans San Diego',
    'insurance accepted therapists',
    'affordable physical therapy',
    'HSA FSA accepted San Diego'
  ],
  category: 'spine',
  location: 'San Diego',
  priority: 'high'
});

export default function InsurancePage() {
  return (
    <main>
      <StructuredData type="insurance" />
      <InsurancePayment />
      <Footer />
    </main>
  );
}