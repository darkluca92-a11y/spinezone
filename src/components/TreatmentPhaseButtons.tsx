'use client';

import { Calendar } from 'lucide-react';

interface TreatmentPhaseButtonsProps {
  phaseIndex: number;
  phaseTitle: string;
  phasePhase: string;
}

export default function TreatmentPhaseButtons({ 
  phaseIndex, 
  phaseTitle,
  phasePhase 
}: TreatmentPhaseButtonsProps) {
  const handleBookSession = () => {
    try {
      const phaseId = `phase-${phaseIndex + 1}`;
      const formSection = document.getElementById(`appointment-form-${phaseId}`);
      if (formSection) {
        formSection.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
        // Preload the form component if not already loaded
        import('@/components/AppointmentBookingForms').catch(console.error);
      } else {
        console.log(`Appointment form section not found: appointment-form-${phaseId}`);
      }
    } catch (error) {
      console.error('Book session error:', error);
    }
  };

  const handleConsultationRequest = () => {
    try {
      console.log(`📞 PHASE ${phaseIndex + 1} CONSULTATION REQUEST:`);
      console.log(`Patient requesting consultation for ${phaseTitle}`);
      console.log('🏥 Our team will call within 2 hours for phase-specific guidance');
      
      alert(`Phase ${phaseIndex + 1} Consultation Request\n\nOur specialist will call you within 2 hours to discuss:\n• ${phaseTitle} requirements\n• Session frequency and duration\n• Expected outcomes and timeline\n• Insurance coverage details\n\nFor immediate assistance: (858) 555-0123`);
    } catch (error) {
      console.error('Consultation request error:', error);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <button 
        onClick={handleBookSession}
        className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center"
      >
        <Calendar className="w-4 h-4 mr-2" />
        Book {phasePhase} Session
      </button>
      
      <button 
        onClick={handleConsultationRequest}
        className="flex-1 border border-blue-600 text-blue-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-50 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center"
      >
        Get Consultation
      </button>
    </div>
  );
}