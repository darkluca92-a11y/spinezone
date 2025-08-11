'use client';

import { ArrowRight } from 'lucide-react';

interface ServiceScrollButtonProps {
  serviceId: string;
  ctaText: string;
  className?: string;
}

export default function ServiceScrollButton({ 
  serviceId, 
  ctaText, 
  className = "" 
}: ServiceScrollButtonProps) {
  const handleClick = () => {
    try {
      const bookingSection = document.getElementById(`booking-${serviceId}`);
      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Preload the appointment form if not already loaded
        import('@/components/ServiceAppointmentForm').catch(console.error);
      } else {
        console.warn(`Booking section not found: booking-${serviceId}`);
      }
    } catch (error) {
      console.error('Scroll button error:', error);
    }
  };

  return (
    <button 
      onClick={handleClick}
      className={`btn-primary w-full flex items-center justify-center group hover:scale-105 active:scale-95 transform transition-all ${className}`}
    >
      {ctaText}
      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
    </button>
  );
}