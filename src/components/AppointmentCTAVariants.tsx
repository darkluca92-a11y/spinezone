'use client';

import { Calendar, Phone, ArrowRight, Clock } from 'lucide-react';

interface AppointmentCTAProps {
  variant?: 'primary' | 'secondary' | 'phone' | 'urgent' | 'outline' | 'small';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  onClick?: () => void;
  fullWidth?: boolean;
  children?: React.ReactNode;
  disabled?: boolean;
}

export default function AppointmentCTA({
  variant = 'primary',
  size = 'medium',
  className = '',
  onClick,
  fullWidth = false,
  children,
  disabled = false
}: AppointmentCTAProps) {
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    } else if (!disabled) {
      // Enhanced appointment booking behavior with demo logging
      console.log('🏥 APPOINTMENT CTA CLICKED:');
      console.log(`Button variant: ${variant}`);
      console.log(`Button size: ${size}`);
      console.log('Redirecting to comprehensive contact page with booking forms');
      
      // Demo: Show appointment options
      if (variant === 'urgent') {
        console.log('🚨 URGENT APPOINTMENT REQUEST');
        console.log('Priority routing to same-day scheduling');
        alert('Urgent Appointment Request\n\nYou will be redirected to our priority booking system.\n\n• Same-day appointments available\n• Our team responds within 2 hours\n• Emergency consultations prioritized\n\nClick OK to continue to urgent booking...');
      }
      
      // Navigate to contact page with enhanced booking system
      window.location.href = '/contact#booking';
    }
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

// Pre-configured appointment CTA variants for common use cases
export function PrimaryAppointmentCTA({ className = '', ...props }: Omit<AppointmentCTAProps, 'variant'>) {
  return <AppointmentCTA variant="primary" className={className} {...props} />;
}

export function SecondaryAppointmentCTA({ className = '', ...props }: Omit<AppointmentCTAProps, 'variant'>) {
  return <AppointmentCTA variant="secondary" className={className} {...props} />;
}

export function PhoneAppointmentCTA({ className = '', ...props }: Omit<AppointmentCTAProps, 'variant'>) {
  const handlePhoneClick = () => {
    window.location.href = 'tel:+1-858-555-0123';
  };
  
  return (
    <AppointmentCTA 
      variant="phone" 
      onClick={handlePhoneClick} 
      className={className} 
      {...props} 
    />
  );
}

export function UrgentAppointmentCTA({ className = '', ...props }: Omit<AppointmentCTAProps, 'variant'>) {
  return <AppointmentCTA variant="urgent" className={className} {...props} />;
}

export function OutlineAppointmentCTA({ className = '', ...props }: Omit<AppointmentCTAProps, 'variant'>) {
  return <AppointmentCTA variant="outline" className={className} {...props} />;
}

export function SmallAppointmentCTA({ className = '', ...props }: Omit<AppointmentCTAProps, 'variant'>) {
  return <AppointmentCTA variant="small" size="small" className={className} {...props} />;
}

// Mobile-optimized floating CTA for sticky/floating appointment buttons
export function FloatingAppointmentCTA({ 
  className = '', 
  position = 'bottom-right',
  ...props 
}: AppointmentCTAProps & { position?: 'bottom-right' | 'bottom-left' | 'bottom-center' }) {
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
      <AppointmentCTA 
        variant="secondary" 
        size="large" 
        className={`shadow-2xl ${className}`} 
        {...props}
      >
        <Calendar className="w-6 h-6 mr-2" aria-hidden="true" />
        Make Appointment
      </AppointmentCTA>
    </div>
  );
}