'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Calendar, Phone, ArrowRight, X } from 'lucide-react';

interface ScrollTriggeredCTAProps {
  triggerElementId: string;
  triggerThreshold?: number;
  ctaText: string;
  ctaSubtext?: string;
  onScheduleClick?: () => void;
  onPhoneClick?: () => void;
  variant?: 'default' | 'dual';
}

export default function ScrollTriggeredCTA({
  triggerElementId,
  triggerThreshold = 0.5,
  ctaText,
  ctaSubtext,
  onScheduleClick,
  onPhoneClick,
  variant = 'default'
}: ScrollTriggeredCTAProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const handleScheduleClick = useCallback(() => {
    if (onScheduleClick) {
      onScheduleClick();
    } else {
      // Default action - could be analytics tracking
      console.log('Schedule CTA clicked:', ctaText);
      alert('Booking system would be integrated here. Call (858) 555-0123 to schedule!');
    }
    setIsDismissed(true);
  }, [onScheduleClick, ctaText]);

  const handlePhoneClick = useCallback(() => {
    if (onPhoneClick) {
      onPhoneClick();
    } else {
      // Default action - direct call
      window.location.href = 'tel:+1-858-555-0123';
    }
  }, [onPhoneClick]);

  const handleDismiss = useCallback(() => {
    setIsDismissed(true);
  }, []);

  useEffect(() => {
    if (isDismissed) return;

    const targetElement = document.getElementById(triggerElementId);
    if (!targetElement) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= triggerThreshold) {
            setIsVisible(true);
          } else if (entry.intersectionRatio < triggerThreshold * 0.5) {
            setIsVisible(false);
          }
        });
      },
      {
        threshold: [0, triggerThreshold * 0.5, triggerThreshold, 1],
        rootMargin: '0px 0px -20px 0px'
      }
    );

    observerRef.current.observe(targetElement);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [triggerElementId, triggerThreshold, isDismissed]);

  if (isDismissed || !isVisible) {
    return null;
  }

  if (variant === 'dual') {
    return (
      <div className="fixed bottom-4 left-4 right-4 z-50 animate-slide-up">
        <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-xl shadow-2xl p-4 mx-auto max-w-md">
          <button
            onClick={handleDismiss}
            className="absolute top-2 right-2 text-white/70 hover:text-white transition-colors"
            aria-label="Dismiss notification"
          >
            <X className="w-4 h-4" />
          </button>
          
          <div className="text-center mb-4">
            <h3 className="font-bold text-lg mb-1">{ctaText}</h3>
            {ctaSubtext && (
              <p className="text-white/90 text-sm">{ctaSubtext}</p>
            )}
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={handleScheduleClick}
              className="flex-1 bg-white text-blue-600 hover:bg-gray-100 font-semibold py-3 px-4 rounded-lg text-sm transition-colors duration-200 flex items-center justify-center min-h-[44px]"
            >
              <Calendar className="w-4 h-4 mr-2" aria-hidden="true" />
              Book Online
            </button>
            <button
              onClick={handlePhoneClick}
              className="flex-1 border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold py-3 px-4 rounded-lg text-sm transition-colors duration-200 flex items-center justify-center min-h-[44px]"
            >
              <Phone className="w-4 h-4 mr-2" aria-hidden="true" />
              Call Now
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 animate-slide-up">
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-xl shadow-2xl p-4 mx-auto max-w-md">
        <button
          onClick={handleDismiss}
          className="absolute top-2 right-2 text-white/70 hover:text-white transition-colors"
          aria-label="Dismiss notification"
        >
          <X className="w-4 h-4" />
        </button>
        
        <div className="flex items-center">
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-1">{ctaText}</h3>
            {ctaSubtext && (
              <p className="text-white/90 text-sm">{ctaSubtext}</p>
            )}
          </div>
          <button
            onClick={handleScheduleClick}
            className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center ml-4 min-h-[44px]"
          >
            Get Started
            <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}