import dynamic from 'next/dynamic';
import HeroSection from '@/components/HeroSection';
import TrustIndicators from '@/components/TrustIndicators';

// Lazy load non-critical components for better performance
const ServicesSection = dynamic(() => import('@/components/ServicesSection'), {
  loading: () => <div className="section-padding bg-gray-50 animate-pulse h-96" />
});

const TestimonialsCarousel = dynamic(() => import('@/components/TestimonialsCarousel'), {
  loading: () => <div className="section-padding bg-white animate-pulse h-96" />
});

const ConditionsTreated = dynamic(() => import('@/components/ConditionsTreated'), {
  loading: () => <div className="section-padding bg-gray-50 animate-pulse h-96" />
});

const TreatmentOptions = dynamic(() => import('@/components/TreatmentOptions'), {
  loading: () => <div className="section-padding bg-white animate-pulse h-96" />
});

const DoctorProfiles = dynamic(() => import('@/components/DoctorProfiles'), {
  loading: () => <div className="section-padding bg-gray-50 animate-pulse h-96" />
});

const EducationalResources = dynamic(() => import('@/components/EducationalResources'), {
  loading: () => <div className="section-padding bg-white animate-pulse h-96" />
});

const InsurancePayment = dynamic(() => import('@/components/InsurancePayment'), {
  loading: () => <div className="section-padding bg-gray-50 animate-pulse h-96" />
});

const InteractiveAssessment = dynamic(() => import('@/components/InteractiveAssessment'), {
  loading: () => <div className="section-padding bg-white animate-pulse h-96" />
});

const Footer = dynamic(() => import('@/components/Footer'), {
  loading: () => <div className="bg-gray-900 text-white animate-pulse h-64" />
});

export default function Home() {
  return (
    <main>
      <HeroSection />
      <TrustIndicators />
      <ConditionsTreated />
      <ServicesSection />
      <TreatmentOptions />
      <TestimonialsCarousel />
      <DoctorProfiles />
      <InteractiveAssessment />
      <EducationalResources />
      <InsurancePayment />
      <Footer />
    </main>
  );
}