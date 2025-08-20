'use client';

import { Phone, Mail, MapPin, Clock, Calendar, Star, CheckCircle } from 'lucide-react';
import { useState } from 'react';

interface SimpleContactCTAProps {
  variant?: 'primary' | 'secondary' | 'phone' | 'urgent' | 'outline' | 'small';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  fullWidth?: boolean;
  children?: React.ReactNode;
  showContactInfo?: boolean;
  contactContext?: string;
}

export function SimpleContactCTA({
  variant = 'primary',
  size = 'medium',
  className = '',
  fullWidth = false,
  children,
  showContactInfo = false,
  contactContext = 'general'
}: SimpleContactCTAProps) {
  const [showDetails, setShowDetails] = useState(false);

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl';
      case 'secondary':
        return 'bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl';
      case 'phone':
        return 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:shadow-xl';
      case 'urgent':
        return 'bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl';
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
            Urgent Care - Call Now
          </>
        );
      case 'small':
        return (
          <>
            <Phone className="w-4 h-4 mr-1" aria-hidden="true" />
            Contact
          </>
        );
      default:
        return (
          <>
            <Calendar className="w-5 h-5 mr-2" aria-hidden="true" />
            Contact Us to Schedule
          </>
        );
    }
  };

  const handleClick = () => {
    if (variant === 'phone' || variant === 'urgent') {
      window.location.href = 'tel:+1-858-555-0123';
    } else if (showContactInfo) {
      setShowDetails(!showDetails);
    } else {
      window.location.href = 'tel:+1-858-555-0123';
    }
  };

  return (
    <div className={className}>
      <button
        onClick={handleClick}
        className={`
          ${getVariantStyles()}
          ${getSizeStyles()}
          ${fullWidth ? 'w-full' : ''}
          font-semibold rounded-lg transition-all duration-200 
          hover:scale-105 active:scale-95
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
          flex items-center justify-center
          will-change-transform
        `}
        style={{
          WebkitTapHighlightColor: 'transparent',
          touchAction: 'manipulation',
        }}
      >
        {getContent()}
      </button>

      {/* Contact Details Modal/Dropdown */}
      {showDetails && showContactInfo && (
        <div className="mt-4 p-6 bg-white rounded-xl shadow-lg border border-gray-200">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Contact SpineZone</h3>
            <p className="text-gray-600">Get professional spine and joint care in San Diego</p>
          </div>

          <div className="grid gap-4">
            {/* Phone Contact */}
            <a
              href="tel:+1-858-555-0123"
              className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors group"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4 group-hover:scale-105 transition-transform">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Call Now</h4>
                <p className="text-blue-600 font-medium">(858) 555-0123</p>
                <p className="text-sm text-gray-600">Immediate scheduling & urgent care</p>
              </div>
            </a>

            {/* Email Contact */}
            <a
              href="mailto:appointments@spinezone.com?subject=Appointment Request"
              className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors group"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mr-4 group-hover:scale-105 transition-transform">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Email Us</h4>
                <p className="text-green-600 font-medium">appointments@spinezone.com</p>
                <p className="text-sm text-gray-600">24-hour response guaranteed</p>
              </div>
            </a>

            {/* Location Info */}
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <div className="flex-shrink-0 w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center mr-4">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">10 San Diego Locations</h4>
                <p className="text-gray-600 text-sm">Downtown, La Jolla, Pacific Beach, Hillcrest & More</p>
              </div>
            </div>

            {/* Hours */}
            <div className="flex items-center p-4 bg-orange-50 rounded-lg">
              <div className="flex-shrink-0 w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mr-4">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Extended Hours</h4>
                <p className="text-orange-600 font-medium">Mon-Fri: 7AM-7PM | Sat: 8AM-4PM</p>
                <p className="text-sm text-gray-600">Same-day appointments available</p>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-center mb-1">
                  <Star className="w-5 h-5 text-yellow-500 mr-1" />
                  <span className="font-bold text-gray-900">4.9/5</span>
                </div>
                <p className="text-sm text-gray-600">Patient Rating</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="flex items-center justify-center mb-1">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-1" />
                  <span className="font-bold text-gray-900">90%</span>
                </div>
                <p className="text-sm text-gray-600">Success Rate</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowDetails(false)}
            className="mt-4 w-full text-gray-500 hover:text-gray-700 text-sm font-medium transition-colors"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}

// Pre-configured contact CTA variants for easy use
export function PrimaryContactCTA(props: Omit<SimpleContactCTAProps, 'variant'>) {
  return <SimpleContactCTA variant="primary" showContactInfo={true} {...props} />;
}

export function PhoneContactCTA(props: Omit<SimpleContactCTAProps, 'variant'>) {
  return <SimpleContactCTA variant="phone" {...props} />;
}

export function UrgentContactCTA(props: Omit<SimpleContactCTAProps, 'variant'>) {
  return <SimpleContactCTA variant="urgent" {...props} />;
}

export function QuickContactCTA(props: Omit<SimpleContactCTAProps, 'variant'>) {
  return <SimpleContactCTA variant="secondary" size="medium" showContactInfo={true} {...props} />;
}

// Simple floating mobile CTA
export function FloatingContactCTA({ 
  className = '', 
  position = 'bottom-right' 
}: { 
  className?: string; 
  position?: 'bottom-right' | 'bottom-left' | 'bottom-center' 
}) {
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
    <div className={`${getPositionStyles()} md:hidden`}>
      <SimpleContactCTA 
        variant="secondary" 
        size="large" 
        className={`shadow-2xl animate-bounce ${className}`}
      >
        <Phone className="w-6 h-6 mr-2" aria-hidden="true" />
        Call Now
      </SimpleContactCTA>
    </div>
  );
}

export default SimpleContactCTA;