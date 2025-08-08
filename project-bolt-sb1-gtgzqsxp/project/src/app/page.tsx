import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import TestimonialsCarousel from '@/components/TestimonialsCarousel';
import ConditionsTreated from '@/components/ConditionsTreated';
import TreatmentOptions from '@/components/TreatmentOptions';
import DoctorProfiles from '@/components/DoctorProfiles';
import TrustIndicators from '@/components/TrustIndicators';
import EducationalResources from '@/components/EducationalResources';
import InsurancePayment from '@/components/InsurancePayment';
import InteractiveAssessment from '@/components/InteractiveAssessment';
import Footer from '@/components/Footer';

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