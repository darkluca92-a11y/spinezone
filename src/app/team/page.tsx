import dynamic from 'next/dynamic';
import type { Metadata } from 'next';
import StructuredData from '@/components/StructuredData';
import { generateSEOMetadata } from '@/lib/seo-utils';

// Lazy load the DoctorProfiles component
const DoctorProfiles = dynamic(() => import('@/components/DoctorProfiles'), {
  loading: () => <div className="section-padding bg-gray-50 animate-pulse h-96" />
});

const Footer = dynamic(() => import('@/components/Footer'), {
  loading: () => <div className="bg-gray-900 text-white animate-pulse h-64" />
});

export const metadata: Metadata = generateSEOMetadata({
  title: 'San Diego Physical Therapy Team 2025 | Expert Therapists & Specialists | SpineZone',
  description: 'Meet San Diego\'s leading physical therapy team with 1M+ patient encounters & 90% success rate. Board-certified specialists in spine, joint & sports medicine at SpineZone.',
  keywords: [
    'San Diego physical therapy team 2025',
    'expert physical therapists San Diego',
    'spine specialists San Diego',
    'sports medicine doctors',
    'joint pain specialists',
    'healthcare professionals San Diego',
    'board-certified therapists',
    'experienced PT team La Jolla',
    'certified spine experts',
    'rehabilitation specialists'
  ],
  category: 'spine',
  location: 'San Diego',
  priority: 'medium'
});

export default function TeamPage() {
  return (
    <main>
      <StructuredData type="team" />
      <DoctorProfiles />
      <Footer />
    </main>
  );
}