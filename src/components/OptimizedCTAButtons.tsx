'use client';

import { useState, useEffect } from 'react';
import { Calendar, Phone, MessageCircle, ArrowRight } from 'lucide-react';

interface CTAVariant {
  id: string;
  text: string;
  style: string;
  icon?: React.ReactNode;
  size: 'small' | 'medium' | 'large';
}

const ctaVariants: CTAVariant[] = [
  // Variant A: Primary Appointment Booking
  {
    id: 'variant-a',
    text: 'Schedule Your Appointment',
    style: 'bg-blue-600 hover:bg-blue-700 text-white',
    icon: <Calendar className="w-5 h-5 mr-2" aria-hidden="true" />,
    size: 'large'
  },
  // Variant B: Urgent Appointment Booking
  {
    id: 'variant-b',
    text: 'Book Appointment Now',
    style: 'bg-green-600 hover:bg-green-700 text-white',
    icon: <ArrowRight className="w-5 h-5 mr-2" aria-hidden="true" />,
    size: 'large'
  },
  // Variant C: Phone Call Focus
  {
    id: 'variant-c',
    text: 'Call (858) 555-0123',
    style: 'bg-orange-500 hover:bg-orange-600 text-white',
    icon: <Phone className="w-5 h-5 mr-2" aria-hidden="true" />,
    size: 'medium'
  },
  // Variant D: Schedule Assessment Appointment
  {
    id: 'variant-d',
    text: 'Schedule Assessment Appointment',
    style: 'bg-purple-600 hover:bg-purple-700 text-white',
    icon: <Calendar className="w-5 h-5 mr-2" aria-hidden="true" />,
    size: 'large'
  }
];

interface OptimizedCTAButtonProps {
  className?: string;
  testGroup?: 'A' | 'B' | 'C' | 'D';
  onAnalytics?: (variantId: string, action: string) => void;
}

export default function OptimizedCTAButton({ 
  className = '', 
  testGroup,
  onAnalytics 
}: OptimizedCTAButtonProps) {
  const [selectedVariant, setSelectedVariant] = useState<CTAVariant>(ctaVariants[0]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // A/B Testing Logic
    if (testGroup) {
      const variantIndex = testGroup.charCodeAt(0) - 65; // Convert A,B,C,D to 0,1,2,3
      setSelectedVariant(ctaVariants[variantIndex] || ctaVariants[0]);
    } else {
      // Random assignment for testing
      const randomVariant = ctaVariants[Math.floor(Math.random() * ctaVariants.length)];
      setSelectedVariant(randomVariant);
      
      // Store variant in localStorage for consistency
      if (typeof window !== 'undefined') {
        const storedVariant = localStorage.getItem('cta_variant');
        if (storedVariant) {
          const variant = ctaVariants.find(v => v.id === storedVariant);
          if (variant) setSelectedVariant(variant);
        } else {
          localStorage.setItem('cta_variant', randomVariant.id);
        }
      }
    }
  }, [testGroup]);

  const handleClick = () => {
    // Prevent double-clicks
    if (loading) return;
    setLoading(true);
    
    // Analytics tracking
    if (onAnalytics) {
      onAnalytics(selectedVariant.id, 'click');
    }
    
    // Google Analytics tracking (if available)
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'cta_click', {
        'variant': selectedVariant.id,
        'button_text': selectedVariant.text
      });
    }
    
    // Default action - open consultation booking
    if (selectedVariant.id === 'variant-c') {
      window.location.href = 'tel:+1-858-555-0123';
    } else {
      // Here you would typically open a booking modal or redirect to booking page
      // For demo - scroll to contact section or open contact page
      const contactSection = document.getElementById('contact-form');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.href = '/contact';
      }
    }
    
    // Reset loading state after a delay
    setTimeout(() => setLoading(false), 1000);
  };

  const getSizeClasses = () => {
    switch (selectedVariant.size) {
      case 'small':
        return 'py-2 px-4 text-sm';
      case 'large':
        return 'py-4 px-8 text-lg';
      default:
        return 'py-3 px-6 text-base';
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`
        ${selectedVariant.style}
        ${getSizeClasses()}
        font-semibold rounded-lg transition-all duration-200 
        hover:scale-105 active:scale-95
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
        flex items-center justify-center
        shadow-lg hover:shadow-xl
        will-change-transform will-change-auto
        gpu-accelerated mobile-touch-optimized mobile-animate
        ${className}
      `}
      aria-label={selectedVariant.text}
      data-variant={selectedVariant.id}
      style={{
        // Enhanced mobile touch performance
        WebkitTapHighlightColor: 'transparent',
        touchAction: 'manipulation',
        willChange: loading ? 'transform, opacity' : 'auto'
      }}
    >
      <span className={`flex items-center justify-center transition-opacity duration-200 ${
        loading ? 'opacity-70' : 'opacity-100'
      }`}>
        {loading ? (
          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-b-transparent mr-2" />
        ) : (
          selectedVariant.icon
        )}
        {selectedVariant.text}
      </span>
    </button>
  );
}

// Hook for A/B Testing Analytics
export function useABTestAnalytics() {
  const trackConversion = (variantId: string, conversionType: string = 'form_submit') => {
    // Track to Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'conversion', {
        'variant': variantId,
        'conversion_type': conversionType
      });
    }
    
    // For demo purposes - log to console instead of API call
    console.log('Conversion Event:', {
      event: 'conversion',
      variant: variantId,
      conversionType,
      timestamp: new Date().toISOString()
    });
  };
  
  const trackEngagement = (variantId: string, engagementType: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'engagement', {
        'variant': variantId,
        'engagement_type': engagementType
      });
    }
  };
  
  return { trackConversion, trackEngagement };
}