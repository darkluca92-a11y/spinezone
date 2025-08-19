'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  Calendar, 
  Phone, 
  MessageSquare, 
  MapPin, 
  Clock, 
  ChevronUp,
  X,
  Menu,
  Zap,
  Heart,
  Shield
} from 'lucide-react';
import { useCTAIntegration, IntegratedAppointmentCTA } from './CTAIntegrationSystem';
import { triggerVapiVoiceCall, MobileVoiceCallButton } from './VapiVoiceIntegration';

// Mobile-optimized floating CTA types
type FloatingCTAVariant = 'standard' | 'sticky-header' | 'bottom-bar' | 'fab' | 'slide-up' | 'pulse';

interface MobileCTAProps {
  variant?: FloatingCTAVariant;
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  triggerScroll?: number;
  hideOnPages?: string[];
  showOnMobile?: boolean;
  showOnTablet?: boolean;
  persistAcrossPages?: boolean;
  className?: string;
}

// Hook for mobile viewport detection
function useMobileViewport() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [viewportHeight, setViewportHeight] = useState(0);
  const [safeAreaInsets, setSafeAreaInsets] = useState({ top: 0, bottom: 0 });

  useEffect(() => {
    const checkViewport = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
      setOrientation(width > height ? 'landscape' : 'portrait');
      setViewportHeight(height);
      
      // Detect safe area insets for iOS devices
      const computedStyle = getComputedStyle(document.documentElement);
      setSafeAreaInsets({
        top: parseInt(computedStyle.getPropertyValue('--sat') || '0'),
        bottom: parseInt(computedStyle.getPropertyValue('--sab') || '0')
      });
    };

    checkViewport();
    window.addEventListener('resize', checkViewport);
    window.addEventListener('orientationchange', checkViewport);
    
    return () => {
      window.removeEventListener('resize', checkViewport);
      window.removeEventListener('orientationchange', checkViewport);
    };
  }, []);

  return { isMobile, isTablet, orientation, viewportHeight, safeAreaInsets };
}

// Hook for scroll tracking
function useScrollTracking(threshold: number = 100) {
  const [scrollY, setScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const [isScrolledPast, setIsScrolledPast] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      setScrollY(currentScrollY);
      setScrollDirection(currentScrollY > lastScrollY.current ? 'down' : 'up');
      setIsScrolledPast(currentScrollY > threshold);
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return { scrollY, scrollDirection, isScrolledPast };
}

// Mobile-optimized sticky header CTA
export function MobileStickyHeaderCTA({ 
  className = '',
  priority = 'medium',
  ...props 
}: MobileCTAProps) {
  const { isMobile, safeAreaInsets } = useMobileViewport();
  const { scrollDirection, isScrolledPast } = useScrollTracking(200);
  const { trackCTAClick } = useCTAIntegration();
  const [isVisible, setIsVisible] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  // Hide on scroll down, show on scroll up
  useEffect(() => {
    if (!isMobile) return;
    
    if (scrollDirection === 'down' && isScrolledPast) {
      setIsVisible(false);
      setIsExpanded(false);
    } else if (scrollDirection === 'up') {
      setIsVisible(true);
    }
  }, [scrollDirection, isScrolledPast, isMobile]);

  if (!isMobile) return null;

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
    trackCTAClick({
      action: 'mobile_header_expand',
      expanded: !isExpanded,
      timestamp: Date.now()
    });
  };

  return (
    <div 
      className={`
        fixed top-0 left-0 right-0 z-40 bg-white shadow-lg border-b border-gray-200
        transform transition-transform duration-300
        ${isVisible ? 'translate-y-0' : '-translate-y-full'}
        ${className}
      `}
      style={{ paddingTop: safeAreaInsets.top }}
    >
      <div className="px-4 py-3">
        {!isExpanded ? (
          // Collapsed state
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-red-500" />
              <span className="font-medium text-gray-900 text-sm">Free Consultation</span>
            </div>
            <div className="flex items-center space-x-2">
              <IntegratedAppointmentCTA
                variant="small"
                size="small"
                bookingType="quick"
                sourceContext={{ page: 'mobile-sticky-header', section: 'collapsed' }}
                className="text-xs px-3 py-1.5"
              >
                Book Now
              </IntegratedAppointmentCTA>
              <button
                onClick={handleExpand}
                className="p-1.5 text-gray-500 hover:text-gray-700"
              >
                <Menu className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          // Expanded state
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Get Help Now</h3>
              <button
                onClick={() => setIsExpanded(false)}
                className="p-1.5 text-gray-500 hover:text-gray-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              <IntegratedAppointmentCTA
                variant="small"
                size="small"
                bookingType="quick"
                sourceContext={{ page: 'mobile-sticky-header', section: 'expanded' }}
                className="text-xs py-2 px-2 flex-col"
              >
                <Calendar className="w-4 h-4 mb-1" />
                <span>Book</span>
              </IntegratedAppointmentCTA>
              
              <MobileVoiceCallButton
                onClick={() => {
                  trackCTAClick({ action: 'mobile_header_vapi_call', source: 'expanded' });
                }}
                className="bg-green-600 hover:bg-green-700 text-white text-xs py-2 px-2 rounded-lg font-medium transition-colors flex flex-col items-center justify-center"
                size="small"
                variant="default"
              >
                <Phone className="w-4 h-4 mb-1" />
                <span>Call</span>
              </MobileVoiceCallButton>
              
              <IntegratedAppointmentCTA
                variant="urgent"
                size="small"
                bookingType="urgent"
                sourceContext={{ page: 'mobile-sticky-header', section: 'expanded' }}
                className="text-xs py-2 px-2 flex-col"
              >
                <Zap className="w-4 h-4 mb-1" />
                <span>Urgent</span>
              </IntegratedAppointmentCTA>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Mobile bottom bar CTA
export function MobileBottomBarCTA({ 
  className = '',
  priority = 'medium',
  ...props 
}: MobileCTAProps) {
  const { isMobile, safeAreaInsets } = useMobileViewport();
  const { trackCTAClick } = useCTAIntegration();
  const [isVisible, setIsVisible] = useState(false);

  // Show after scroll
  const { isScrolledPast } = useScrollTracking(300);
  
  useEffect(() => {
    if (isMobile && isScrolledPast) {
      setIsVisible(true);
    }
  }, [isMobile, isScrolledPast]);

  if (!isMobile || !isVisible) return null;

  return (
    <div 
      className={`
        fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg
        ${className}
      `}
      style={{ paddingBottom: safeAreaInsets.bottom }}
    >
      <div className="px-4 py-3">
        <div className="grid grid-cols-3 gap-3">
          <IntegratedAppointmentCTA
            variant="primary"
            size="medium"
            bookingType="comprehensive"
            fullWidth
            sourceContext={{ page: 'mobile-bottom-bar', section: 'main' }}
            className="text-sm py-3"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Book Now
          </IntegratedAppointmentCTA>
          
          <MobileVoiceCallButton
            onClick={() => {
              trackCTAClick({ action: 'mobile_bottom_vapi_call' });
            }}
            className="bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center text-sm"
            size="default"
            variant="default"
          >
            <Phone className="w-4 h-4 mr-2" />
            Call
          </MobileVoiceCallButton>
          
          <IntegratedAppointmentCTA
            variant="secondary"
            size="medium"
            bookingType="quick"
            fullWidth
            sourceContext={{ page: 'mobile-bottom-bar', section: 'quick' }}
            className="text-sm py-3"
          >
            <Zap className="w-4 h-4 mr-2" />
            Quick
          </IntegratedAppointmentCTA>
        </div>
        
        <div className="mt-2 text-center">
          <p className="text-xs text-gray-600">
            ⭐ Free consultation • 90% success rate • Most insurance accepted
          </p>
        </div>
      </div>
    </div>
  );
}

// Floating Action Button (FAB)
export function MobileFloatingActionButton({ 
  className = '',
  priority = 'high',
  ...props 
}: MobileCTAProps) {
  const { isMobile } = useMobileViewport();
  const { scrollDirection, isScrolledPast } = useScrollTracking(150);
  const { trackCTAClick } = useCTAIntegration();
  const [isVisible, setIsVisible] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);

  // Show FAB based on scroll behavior
  useEffect(() => {
    if (!isMobile) return;
    
    if (isScrolledPast && scrollDirection === 'up') {
      setIsVisible(true);
      // Pulse for attention after showing
      setTimeout(() => setIsPulsing(true), 1000);
      setTimeout(() => setIsPulsing(false), 4000);
    } else if (scrollDirection === 'down') {
      setIsVisible(false);
      setIsPulsing(false);
    }
  }, [isMobile, scrollDirection, isScrolledPast]);

  if (!isMobile) return null;

  return (
    <div 
      className={`
        fixed bottom-20 right-4 z-50 
        transform transition-all duration-300
        ${isVisible ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-16 scale-75 opacity-0'}
        ${isPulsing ? 'animate-pulse' : ''}
        ${className}
      `}
    >
      <IntegratedAppointmentCTA
        variant="primary"
        size="large"
        bookingType="quick"
        sourceContext={{ page: 'mobile-fab', section: 'floating' }}
        className="rounded-full w-16 h-16 shadow-2xl hover:shadow-3xl"
      >
        <Calendar className="w-6 h-6" />
      </IntegratedAppointmentCTA>
      
      {/* Tooltip */}
      <div className="absolute -top-12 right-0 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
        Book Free Consultation
        <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
      </div>
    </div>
  );
}

// Slide-up CTA panel
export function MobileSlideUpPanel({ 
  className = '',
  triggerScroll = 500,
  priority = 'medium',
  ...props 
}: MobileCTAProps) {
  const { isMobile } = useMobileViewport();
  const { isScrolledPast } = useScrollTracking(triggerScroll);
  const { trackCTAClick } = useCTAIntegration();
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  // Auto-trigger slide up
  useEffect(() => {
    if (isMobile && isScrolledPast && !hasTriggered) {
      setTimeout(() => {
        setIsExpanded(true);
        setHasTriggered(true);
        trackCTAClick({ action: 'slide_up_triggered', scrollPosition: window.scrollY });
      }, 1000);
    }
  }, [isMobile, isScrolledPast, hasTriggered]);

  // Auto-collapse after 10 seconds
  useEffect(() => {
    if (isExpanded) {
      const timer = setTimeout(() => {
        setIsExpanded(false);
      }, 10000);
      
      return () => clearTimeout(timer);
    }
  }, [isExpanded]);

  if (!isMobile || !hasTriggered) return null;

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
    trackCTAClick({ action: 'slide_up_toggle', expanded: !isExpanded });
  };

  return (
    <div 
      className={`
        fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-blue-600 to-blue-500 text-white
        transform transition-transform duration-500
        ${isExpanded ? 'translate-y-0' : 'translate-y-full'}
        ${className}
      `}
    >
      {/* Collapse handle */}
      <div className="flex justify-center py-2">
        <button
          onClick={toggleExpanded}
          className="bg-white bg-opacity-20 rounded-full p-2"
        >
          <ChevronUp className={`w-4 h-4 transition-transform ${isExpanded ? '' : 'rotate-180'}`} />
        </button>
      </div>

      {/* Content */}
      <div className="px-4 pb-6">
        <div className="text-center mb-4">
          <h3 className="text-lg font-bold mb-1">Ready to Feel Better?</h3>
          <p className="text-blue-100 text-sm">Join 100,000+ patients who found relief</p>
        </div>

        <div className="space-y-3">
          <IntegratedAppointmentCTA
            variant="secondary"
            size="large"
            fullWidth
            bookingType="comprehensive"
            sourceContext={{ page: 'mobile-slide-up', section: 'main' }}
            className="bg-white text-blue-600 hover:bg-gray-100"
          >
            <Calendar className="w-5 h-5 mr-2" />
            Schedule Free Consultation
          </IntegratedAppointmentCTA>

          <div className="grid grid-cols-2 gap-3">
            <MobileVoiceCallButton
              onClick={() => {
                trackCTAClick({ action: 'slide_up_vapi_call' });
              }}
              className="bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center text-sm"
              size="default"
              variant="default"
            >
              <Phone className="w-4 h-4 mr-2" />
              Call Now
            </MobileVoiceCallButton>
            
            <IntegratedAppointmentCTA
              variant="outline"
              size="medium"
              fullWidth
              bookingType="quick"
              sourceContext={{ page: 'mobile-slide-up', section: 'quick' }}
              className="border-white text-white hover:bg-white hover:text-blue-600 text-sm"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Quick Request
            </IntegratedAppointmentCTA>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={() => {
            setIsExpanded(false);
            trackCTAClick({ action: 'slide_up_dismissed' });
          }}
          className="absolute top-2 right-2 text-white text-xl"
        >
          ×
        </button>
      </div>
    </div>
  );
}

// Touch-optimized CTA with haptic feedback simulation
export function TouchOptimizedCTA({ 
  children, 
  onClick, 
  className = '',
  hapticFeedback = true,
  ...props 
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  hapticFeedback?: boolean;
  [key: string]: any;
}) {
  const [isPressed, setIsPressed] = useState(false);
  const { trackCTAClick } = useCTAIntegration();

  const handleTouchStart = () => {
    setIsPressed(true);
    
    // Simulate haptic feedback
    if (hapticFeedback && navigator.vibrate) {
      navigator.vibrate(10);
    }
  };

  const handleTouchEnd = () => {
    setIsPressed(false);
    
    if (onClick) {
      onClick();
      trackCTAClick({ action: 'touch_cta_clicked', hapticUsed: hapticFeedback });
    }
  };

  return (
    <button
      {...props}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleTouchStart}
      onMouseUp={handleTouchEnd}
      className={`
        ${className}
        transition-all duration-150
        ${isPressed ? 'scale-95 shadow-sm' : 'scale-100 shadow-lg'}
        active:scale-95
        touch-manipulation
        select-none
      `}
      style={{
        WebkitTapHighlightColor: 'transparent',
        WebkitUserSelect: 'none',
        userSelect: 'none',
        ...props.style
      }}
    >
      {children}
    </button>
  );
}

// Mobile-optimized quick actions toolbar
export function MobileQuickActionsToolbar({ 
  className = '',
  position = 'bottom-center',
  ...props 
}: MobileCTAProps & { position?: string }) {
  const { isMobile } = useMobileViewport();
  const { trackCTAClick } = useCTAIntegration();

  if (!isMobile) return null;

  const actions = [
    {
      icon: <Phone className="w-5 h-5" />,
      label: 'Call',
      action: () => {
        trackCTAClick({ action: 'toolbar_vapi_call' });
        triggerVapiVoiceCall();
      },
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      label: 'Book',
      action: () => {
        trackCTAClick({ action: 'toolbar_book' });
        // This would trigger the booking modal
      },
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: 'Locations',
      action: () => {
        trackCTAClick({ action: 'toolbar_locations' });
        window.location.href = '/locations';
      },
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      icon: <Zap className="w-5 h-5" />,
      label: 'Urgent',
      action: () => {
        trackCTAClick({ action: 'toolbar_urgent' });
        // This would trigger the urgent booking modal
      },
      color: 'bg-red-500 hover:bg-red-600'
    }
  ];

  return (
    <div className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 ${className}`}>
      <div className="bg-white rounded-full shadow-2xl border border-gray-200 p-2 flex space-x-2">
        {actions.map((action, index) => (
          <TouchOptimizedCTA
            key={index}
            onClick={action.action}
            className={`${action.color} text-white p-3 rounded-full transition-colors`}
            title={action.label}
          >
            {action.icon}
          </TouchOptimizedCTA>
        ))}
      </div>
    </div>
  );
}

// Comprehensive mobile CTA system
export function MobileCTASystem({ 
  variant = 'standard',
  priority = 'medium',
  className = '' 
}: MobileCTAProps) {
  const { isMobile, isTablet } = useMobileViewport();

  if (!isMobile && !isTablet) return null;

  return (
    <>
      {/* Sticky header for high-priority */}
      {(priority === 'high' || priority === 'urgent') && (
        <MobileStickyHeaderCTA priority={priority} />
      )}

      {/* Bottom bar for medium priority */}
      {priority === 'medium' && <MobileBottomBarCTA />}

      {/* FAB for general engagement */}
      <MobileFloatingActionButton priority={priority} />

      {/* Slide-up for high engagement moments */}
      {priority === 'high' && (
        <MobileSlideUpPanel triggerScroll={800} priority={priority} />
      )}

      {/* Quick actions toolbar */}
      <MobileQuickActionsToolbar />
    </>
  );
}

export default MobileCTASystem;