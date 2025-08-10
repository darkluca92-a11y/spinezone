'use client';

import { useState, useEffect, useContext, createContext, ReactNode } from 'react';
import { Calendar, Phone, ArrowRight, Clock, MapPin, Target } from 'lucide-react';
import { ComprehensiveAppointmentForm, QuickAppointmentForm, PhaseAppointmentForm } from './AppointmentBookingForms';
import CalendlyWidget from './CalendlyWidget';

// CTA Integration Context for managing booking flow state
interface CTAIntegrationContextType {
  bookingMode: 'quick' | 'comprehensive' | 'calendly' | 'phase-specific' | 'service-specific' | 'urgent' | null;
  sourceContext: {
    page?: string;
    section?: string;
    ctaVariant?: string;
    condition?: string;
    service?: string;
    phase?: string;
    location?: string;
  };
  bookingPreferences: {
    appointmentType?: string;
    preferredLocation?: string;
    serviceType?: string;
    condition?: string;
    urgentCare?: boolean;
  };
  openBookingModal: (mode: CTAIntegrationContextType['bookingMode'], context?: CTAIntegrationContextType['sourceContext']) => void;
  closeBookingModal: () => void;
  updateBookingPreferences: (preferences: Partial<CTAIntegrationContextType['bookingPreferences']>) => void;
  trackCTAClick: (ctaData: any) => void;
}

const CTAIntegrationContext = createContext<CTAIntegrationContextType | null>(null);

// Provider component for CTA integration state
export function CTAIntegrationProvider({ children }: { children: ReactNode }) {
  const [bookingMode, setBookingMode] = useState<CTAIntegrationContextType['bookingMode']>(null);
  const [sourceContext, setSourceContext] = useState<CTAIntegrationContextType['sourceContext']>({});
  const [bookingPreferences, setBookingPreferences] = useState<CTAIntegrationContextType['bookingPreferences']>({});

  // Load preferences from session storage
  useEffect(() => {
    const savedPreferences = sessionStorage.getItem('spinezone-booking-preferences');
    if (savedPreferences) {
      try {
        const parsed = JSON.parse(savedPreferences);
        setBookingPreferences(parsed);
      } catch (error) {
        console.log('Failed to parse saved preferences:', error);
      }
    }
  }, []);

  // Save preferences to session storage
  useEffect(() => {
    if (Object.keys(bookingPreferences).length > 0) {
      sessionStorage.setItem('spinezone-booking-preferences', JSON.stringify(bookingPreferences));
    }
  }, [bookingPreferences]);

  const openBookingModal = (mode: CTAIntegrationContextType['bookingMode'], context: CTAIntegrationContextType['sourceContext'] = {}) => {
    console.log('🎯 CTA INTEGRATION - Opening booking modal:');
    console.log(`Mode: ${mode}`);
    console.log('Context:', context);
    
    setBookingMode(mode);
    setSourceContext(context);
    
    // Auto-populate preferences based on context
    if (context.condition) {
      setBookingPreferences(prev => ({ ...prev, condition: context.condition }));
    }
    if (context.service) {
      setBookingPreferences(prev => ({ ...prev, serviceType: context.service }));
    }
    if (context.location) {
      setBookingPreferences(prev => ({ ...prev, preferredLocation: context.location }));
    }
  };

  const closeBookingModal = () => {
    setBookingMode(null);
    setSourceContext({});
  };

  const updateBookingPreferences = (preferences: Partial<CTAIntegrationContextType['bookingPreferences']>) => {
    setBookingPreferences(prev => ({ ...prev, ...preferences }));
  };

  const trackCTAClick = (ctaData: any) => {
    console.log('📊 CTA ANALYTICS TRACKING:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Timestamp:', new Date().toISOString());
    console.log('CTA Data:', ctaData);
    console.log('Source Context:', sourceContext);
    console.log('Current Preferences:', bookingPreferences);
    console.log('User Agent:', navigator.userAgent);
    console.log('Viewport:', `${window.innerWidth}x${window.innerHeight}`);
    console.log('Page URL:', window.location.href);
    console.log('Referrer:', document.referrer || 'Direct');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    // Track conversion funnel step
    const funnelStep = ctaData.variant === 'urgent' ? 'urgent-request' :
                      ctaData.variant === 'phone' ? 'phone-call' :
                      ctaData.bookingType === 'quick' ? 'quick-booking' :
                      ctaData.bookingType === 'comprehensive' ? 'comprehensive-booking' :
                      ctaData.bookingType === 'calendly' ? 'online-scheduling' : 'general-inquiry';

    console.log(`🎯 CONVERSION FUNNEL - Step: ${funnelStep.toUpperCase()}`);
    console.log(`📱 Device Type: ${window.innerWidth < 768 ? 'Mobile' : window.innerWidth < 1024 ? 'Tablet' : 'Desktop'}`);
    
    // Simulate analytics event
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'cta_click', {
        event_category: 'Appointment Booking',
        event_label: funnelStep,
        value: 1,
        custom_map: {
          cta_variant: ctaData.variant,
          source_page: sourceContext.page,
          source_section: sourceContext.section
        }
      });
    }
  };

  return (
    <CTAIntegrationContext.Provider
      value={{
        bookingMode,
        sourceContext,
        bookingPreferences,
        openBookingModal,
        closeBookingModal,
        updateBookingPreferences,
        trackCTAClick
      }}
    >
      {children}
      {/* Global Booking Modal */}
      {bookingMode && <GlobalBookingModal />}
    </CTAIntegrationContext.Provider>
  );
}

// Hook for using CTA integration context
export function useCTAIntegration() {
  const context = useContext(CTAIntegrationContext);
  if (!context) {
    throw new Error('useCTAIntegration must be used within CTAIntegrationProvider');
  }
  return context;
}

// Global booking modal component
function GlobalBookingModal() {
  const { bookingMode, sourceContext, bookingPreferences, closeBookingModal, trackCTAClick } = useCTAIntegration();
  
  const handleBookingSuccess = (data: any) => {
    console.log('✅ Booking completed successfully:', data);
    trackCTAClick({
      action: 'booking_completed',
      bookingType: bookingMode,
      confirmationNumber: data.confirmationNumber,
      ...sourceContext
    });
    closeBookingModal();
  };

  const handleBookingError = (error: string) => {
    console.error('❌ Booking error:', error);
    trackCTAClick({
      action: 'booking_error',
      error,
      bookingType: bookingMode,
      ...sourceContext
    });
  };

  const getModalTitle = () => {
    switch (bookingMode) {
      case 'quick':
        return 'Quick Appointment Request';
      case 'comprehensive':
        return 'Complete Appointment Booking';
      case 'calendly':
        return 'Online Scheduling';
      case 'phase-specific':
        return `${sourceContext.phase} Appointment`;
      case 'service-specific':
        return `${sourceContext.service} Booking`;
      case 'urgent':
        return 'Urgent Appointment Request';
      default:
        return 'Book Appointment';
    }
  };

  if (!bookingMode) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{getModalTitle()}</h2>
              {sourceContext.page && (
                <p className="text-sm text-gray-600 mt-1">
                  From: {sourceContext.page} {sourceContext.section && `→ ${sourceContext.section}`}
                </p>
              )}
            </div>
            <button
              onClick={closeBookingModal}
              className="text-gray-400 hover:text-gray-600 text-2xl font-bold w-8 h-8 flex items-center justify-center"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Context-aware booking form selection */}
          {bookingMode === 'quick' && (
            <QuickAppointmentForm
              onSuccess={handleBookingSuccess}
              onError={handleBookingError}
            />
          )}

          {bookingMode === 'comprehensive' && (
            <ComprehensiveAppointmentForm
              onSuccess={handleBookingSuccess}
              onError={handleBookingError}
            />
          )}

          {bookingMode === 'calendly' && (
            <CalendlyWidget
              serviceType={bookingPreferences.serviceType === 'assessment' ? 'assessment' : 'consultation'}
              preferredLocation={bookingPreferences.preferredLocation}
              onBookingComplete={handleBookingSuccess}
            />
          )}

          {bookingMode === 'phase-specific' && (
            <PhaseAppointmentForm
              phase={sourceContext.phase}
              onSuccess={handleBookingSuccess}
              onError={handleBookingError}
            />
          )}

          {bookingMode === 'urgent' && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <div className="text-center mb-6">
                <Clock className="w-16 h-16 text-red-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-red-800 mb-2">Urgent Care Request</h3>
                <p className="text-red-700">
                  We understand you need immediate attention. Our team will respond within 2 hours.
                </p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="bg-white border border-red-200 rounded-lg p-4">
                  <h4 className="font-semibold text-red-800 mb-2">Same-Day Appointments Available For:</h4>
                  <ul className="text-red-700 space-y-1">
                    <li>• Severe pain increase (8-10 level)</li>
                    <li>• Post-surgery complications</li>
                    <li>• New injury assessment</li>
                    <li>• Emergency consultations</li>
                    <li>• Urgent medication reviews</li>
                  </ul>
                </div>
              </div>

              <div className="grid gap-4">
                <a
                  href="tel:+1-858-555-0123"
                  className="bg-red-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center"
                  onClick={() => trackCTAClick({ action: 'urgent_phone_call', source: 'urgent_modal' })}
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now for Urgent Care
                </a>

                <QuickAppointmentForm
                  onSuccess={(data) => {
                    handleBookingSuccess({ ...data, isUrgent: true });
                  }}
                  onError={handleBookingError}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Enhanced CTA Component with Integration
interface IntegratedCTAProps {
  variant?: 'primary' | 'secondary' | 'phone' | 'urgent' | 'outline' | 'small' | 'calendly';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  fullWidth?: boolean;
  children?: React.ReactNode;
  disabled?: boolean;
  bookingType?: 'quick' | 'comprehensive' | 'calendly' | 'phase-specific' | 'urgent';
  sourceContext?: {
    page?: string;
    section?: string;
    condition?: string;
    service?: string;
    phase?: string;
    location?: string;
  };
  prefilledData?: any;
}

export function IntegratedAppointmentCTA({
  variant = 'primary',
  size = 'medium',
  className = '',
  fullWidth = false,
  children,
  disabled = false,
  bookingType = 'quick',
  sourceContext = {},
  prefilledData = {}
}: IntegratedCTAProps) {
  const { openBookingModal, trackCTAClick, updateBookingPreferences } = useCTAIntegration();

  const handleClick = () => {
    if (disabled) return;

    // Track the CTA click
    trackCTAClick({
      variant,
      size,
      bookingType,
      sourceContext,
      timestamp: Date.now(),
      action: 'cta_clicked'
    });

    // Update preferences with prefilled data
    if (prefilledData && Object.keys(prefilledData).length > 0) {
      updateBookingPreferences(prefilledData);
    }

    // Handle special phone variant
    if (variant === 'phone') {
      trackCTAClick({ action: 'phone_call_initiated', source: sourceContext });
      window.location.href = 'tel:+1-858-555-0123';
      return;
    }

    // Handle urgent variant
    if (variant === 'urgent') {
      openBookingModal('urgent', sourceContext);
      return;
    }

    // Handle calendly variant
    if (variant === 'calendly' || bookingType === 'calendly') {
      openBookingModal('calendly', sourceContext);
      return;
    }

    // Default booking modal based on type
    openBookingModal(bookingType, sourceContext);
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl';
      case 'secondary':
        return 'bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl';
      case 'phone':
        return 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:shadow-xl';
      case 'urgent':
        return 'bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl animate-pulse';
      case 'calendly':
        return 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl';
      case 'outline':
        return 'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white bg-transparent';
      case 'small':
        return 'bg-blue-500 hover:bg-blue-600 text-white text-sm';
      default:
        return 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl';
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return 'py-2 px-4 text-sm min-h-[36px]';
      case 'large':
        return 'py-4 px-8 text-lg min-h-[56px]';
      default:
        return 'py-3 px-6 text-base min-h-[48px]';
    }
  };

  const getContent = () => {
    if (children) return children;
    
    switch (variant) {
      case 'phone':
        return (
          <>
            <Phone className="w-5 h-5 mr-2" aria-hidden="true" />
            Call (858) 555-0123
          </>
        );
      case 'urgent':
        return (
          <>
            <Clock className="w-5 h-5 mr-2" aria-hidden="true" />
            Book Emergency Appointment
          </>
        );
      case 'calendly':
        return (
          <>
            <Calendar className="w-5 h-5 mr-2" aria-hidden="true" />
            Schedule Online
          </>
        );
      case 'small':
        return (
          <>
            <Calendar className="w-4 h-4 mr-1" aria-hidden="true" />
            Book Now
          </>
        );
      default:
        return (
          <>
            <Calendar className="w-5 h-5 mr-2" aria-hidden="true" />
            Schedule Your Appointment
          </>
        );
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`
        ${getVariantStyles()}
        ${getSizeStyles()}
        ${fullWidth ? 'w-full' : ''}
        font-semibold rounded-lg transition-all duration-200 
        hover:scale-105 active:scale-95
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
        flex items-center justify-center
        will-change-transform
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
        ${className}
      `}
      style={{
        WebkitTapHighlightColor: 'transparent',
        touchAction: 'manipulation',
      }}
    >
      {getContent()}
    </button>
  );
}

// Pre-configured integrated CTA variants
export function PrimaryBookingCTA(props: Omit<IntegratedCTAProps, 'variant'>) {
  return <IntegratedAppointmentCTA variant="primary" bookingType="comprehensive" {...props} />;
}

export function QuickBookingCTA(props: Omit<IntegratedCTAProps, 'variant' | 'bookingType'>) {
  return <IntegratedAppointmentCTA variant="secondary" bookingType="quick" {...props} />;
}

export function CalendlyBookingCTA(props: Omit<IntegratedCTAProps, 'variant' | 'bookingType'>) {
  return <IntegratedAppointmentCTA variant="calendly" bookingType="calendly" {...props} />;
}

export function PhoneBookingCTA(props: Omit<IntegratedCTAProps, 'variant'>) {
  return <IntegratedAppointmentCTA variant="phone" {...props} />;
}

export function UrgentBookingCTA(props: Omit<IntegratedCTAProps, 'variant' | 'bookingType'>) {
  return <IntegratedAppointmentCTA variant="urgent" bookingType="urgent" {...props} />;
}

// Floating mobile CTA with integration
export function IntegratedFloatingCTA({ 
  className = '', 
  position = 'bottom-right',
  sourceContext = { page: 'mobile-floating', section: 'floating-cta' },
  ...props 
}: IntegratedCTAProps & { position?: 'bottom-right' | 'bottom-left' | 'bottom-center' }) {
  const getPositionStyles = () => {
    switch (position) {
      case 'bottom-left':
        return 'fixed bottom-4 left-4 z-50';
      case 'bottom-center':
        return 'fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50';
      default:
        return 'fixed bottom-4 right-4 z-50';
    }
  };

  return (
    <div className={`${getPositionStyles()} animate-bounce md:hidden`}>
      <IntegratedAppointmentCTA 
        variant="secondary" 
        size="large" 
        className={`shadow-2xl ${className}`}
        bookingType="quick"
        sourceContext={sourceContext}
        {...props}
      >
        <Calendar className="w-6 h-6 mr-2" aria-hidden="true" />
        Make Appointment
      </IntegratedAppointmentCTA>
    </div>
  );
}

export default CTAIntegrationContext;