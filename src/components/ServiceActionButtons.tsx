'use client';

interface ServiceActionButtonsProps {
  className?: string;
}

export default function ServiceActionButtons({ className = "" }: ServiceActionButtonsProps) {
  const handleBookAssessment = () => {
    try {
      const assessmentSection = document.getElementById('booking-assessment-only');
      if (assessmentSection) {
        assessmentSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        console.log('Assessment booking - demo mode');
        alert('Assessment booking would open here. Check console for details.');
      }
    } catch (error) {
      console.error('Assessment booking error:', error);
    }
  };

  const handleCallPhone = () => {
    try {
      // In demo mode, just log the call
      console.log('Phone call initiated:', {
        number: '(858) 555-0123',
        timestamp: new Date().toISOString(),
        action: 'call_phone',
        status: 'demo_mode'
      });
      alert('Demo: Phone call to (858) 555-0123 would initiate here');
    } catch (error) {
      console.error('Phone call error:', error);
    }
  };

  return (
    <div className={`grid grid-cols-2 gap-3 ${className}`}>
      <button 
        onClick={handleBookAssessment}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 text-sm"
      >
        Book Assessment
      </button>
      <button 
        onClick={handleCallPhone}
        className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 text-sm"
      >
        Call (858) 555-0123
      </button>
    </div>
  );
}