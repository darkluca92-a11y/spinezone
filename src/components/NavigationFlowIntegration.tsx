'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, MapPin, Calendar, Users, Target, CheckCircle } from 'lucide-react';
import { useCTAIntegration } from './CTAIntegrationSystem';

// Deep linking parameter interface
interface DeepLinkParams {
  appointmentType?: string;
  service?: string;
  condition?: string;
  location?: string;
  phase?: string;
  urgentCare?: boolean;
  provider?: string;
  source?: string;
}

// Navigation flow step interface
interface FlowStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  isCompleted: boolean;
  isCurrent: boolean;
}

// Hook for managing navigation flows
export function useNavigationFlow() {
  const router = useRouter();
  const { updateBookingPreferences, openBookingModal, trackCTAClick } = useCTAIntegration();
  
  // Parse URL parameters for deep linking - client-side only
  const parseDeepLinkParams = (): DeepLinkParams => {
    const params: DeepLinkParams = {};
    
    // Only access URL parameters on client side
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      params.appointmentType = searchParams.get('appointment') || undefined;
      params.service = searchParams.get('service') || undefined;
      params.condition = searchParams.get('condition') || undefined;
      params.location = searchParams.get('location') || undefined;
      params.phase = searchParams.get('phase') || undefined;
      params.urgentCare = searchParams.get('urgent') === 'true';
      params.provider = searchParams.get('provider') || undefined;
      params.source = searchParams.get('source') || undefined;
    }
    
    return params;
  };

  // Navigate with context preservation
  const navigateWithContext = (path: string, context: any = {}) => {
    console.log('🧭 NAVIGATION FLOW:');
    console.log(`Navigating to: ${path}`);
    console.log('Context:', context);
    
    // Track navigation event
    trackCTAClick({
      action: 'navigation',
      destination: path,
      context,
      timestamp: Date.now()
    });

    // Build query parameters
    const params = new URLSearchParams();
    Object.entries(context).forEach(([key, value]) => {
      if (value) params.set(key, String(value));
    });

    const url = params.toString() ? `${path}?${params.toString()}` : path;
    router.push(url);
  };

  // Deep link to specific booking flow
  const deepLinkToBooking = (params: DeepLinkParams) => {
    console.log('🔗 DEEP LINK TO BOOKING:');
    console.log('Parameters:', params);
    
    // Update booking preferences
    updateBookingPreferences({
      appointmentType: params.appointmentType,
      preferredLocation: params.location,
      serviceType: params.service,
      condition: params.condition,
      urgentCare: params.urgentCare
    });

    // Determine booking type
    const bookingType = params.urgentCare ? 'urgent' :
                       params.service ? 'service-specific' :
                       params.phase ? 'phase-specific' : 'comprehensive';

    // Open appropriate booking modal
    openBookingModal(bookingType, {
      page: 'deep-link',
      condition: params.condition,
      service: params.service,
      phase: params.phase,
      location: params.location
    });
  };

  // Homepage → Treatment Journey → Booking flow
  const startTreatmentJourney = (condition?: string, service?: string) => {
    navigateWithContext('/treatment-journey', {
      condition,
      service,
      source: 'homepage-treatment-cards'
    });
  };

  // Services → Assessment → Booking flow
  const startServiceAssessment = (service: string, condition?: string) => {
    navigateWithContext('/assessment', {
      service,
      condition,
      source: 'services-page',
      intent: 'service-specific'
    });
  };

  // Locations → Provider → Booking flow
  const startLocationBooking = (location: string, provider?: string) => {
    navigateWithContext('/contact', {
      location,
      provider,
      source: 'locations-page',
      booking: 'true'
    });
  };

  // Assessment → Results → Treatment flow
  const completeAssessmentFlow = (results: any) => {
    navigateWithContext('/treatment-journey', {
      assessmentCompleted: 'true',
      recommendations: JSON.stringify(results.recommendations),
      source: 'assessment-completion'
    });
  };

  return {
    parseDeepLinkParams,
    navigateWithContext,
    deepLinkToBooking,
    startTreatmentJourney,
    startServiceAssessment,
    startLocationBooking,
    completeAssessmentFlow
  };
}

// Navigation flow progress component
interface NavigationFlowProgressProps {
  currentPath: string;
  steps: FlowStep[];
  onStepClick?: (step: FlowStep) => void;
  className?: string;
}

export function NavigationFlowProgress({ 
  currentPath, 
  steps, 
  onStepClick,
  className = '' 
}: NavigationFlowProgressProps) {
  return (
    <div className={`bg-white rounded-lg shadow-sm p-6 ${className}`}>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Your Journey with SpineZone</h3>
        <p className="text-gray-600">Follow your personalized treatment path</p>
      </div>

      <div className="space-y-4">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className={`
              flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center
              ${step.isCompleted ? 'bg-green-100 text-green-600' :
                step.isCurrent ? 'bg-blue-100 text-blue-600' :
                'bg-gray-100 text-gray-400'}
            `}>
              {step.isCompleted ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                step.icon
              )}
            </div>

            <div className="ml-4 flex-1">
              <button
                onClick={() => onStepClick?.(step)}
                disabled={!step.isCompleted && !step.isCurrent}
                className={`
                  text-left w-full group
                  ${(step.isCompleted || step.isCurrent) ? 'cursor-pointer' : 'cursor-default'}
                `}
              >
                <div className={`
                  font-medium
                  ${step.isCompleted ? 'text-green-800' :
                    step.isCurrent ? 'text-blue-800' :
                    'text-gray-500'}
                  ${(step.isCompleted || step.isCurrent) ? 'group-hover:underline' : ''}
                `}>
                  {step.title}
                </div>
                <div className={`
                  text-sm
                  ${step.isCompleted ? 'text-green-600' :
                    step.isCurrent ? 'text-blue-600' :
                    'text-gray-400'}
                `}>
                  {step.description}
                </div>
              </button>
            </div>

            {step.isCurrent && (
              <div className="ml-4 flex-shrink-0">
                <ArrowRight className="w-5 h-5 text-blue-600" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Cross-page context transfer component
interface ContextTransferProps {
  children: React.ReactNode;
  preserveContext?: boolean;
  transferKeys?: string[];
}

export function CrossPageContextTransfer({ 
  children, 
  preserveContext = true,
  transferKeys = ['condition', 'service', 'location', 'phase', 'urgentCare', 'source']
}: ContextTransferProps) {
  const { parseDeepLinkParams } = useNavigationFlow();
  const { updateBookingPreferences } = useCTAIntegration();
  const [contextLoaded, setContextLoaded] = useState(false);

  // Load context from URL parameters on mount
  useEffect(() => {
    if (!preserveContext || contextLoaded) return;

    const deepLinkParams = parseDeepLinkParams();
    console.log('🔄 CONTEXT TRANSFER - Loading from URL:', deepLinkParams);

    // Filter params based on transferKeys
    const filteredContext = Object.fromEntries(
      Object.entries(deepLinkParams).filter(([key]) => transferKeys.includes(key))
    );

    if (Object.keys(filteredContext).length > 0) {
      updateBookingPreferences(filteredContext);
      console.log('✅ Context transferred:', filteredContext);
    }

    setContextLoaded(true);
  }, [preserveContext, contextLoaded, transferKeys]);

  return <>{children}</>;
}

// Breadcrumb navigation with context
interface ContextualBreadcrumbProps {
  items: Array<{
    label: string;
    path: string;
    context?: any;
  }>;
  currentPage: string;
  className?: string;
}

export function ContextualBreadcrumb({ items, currentPage, className = '' }: ContextualBreadcrumbProps) {
  const { navigateWithContext } = useNavigationFlow();

  return (
    <nav className={`flex items-center space-x-2 text-sm ${className}`}>
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          <button
            onClick={() => navigateWithContext(item.path, item.context)}
            className="text-blue-600 hover:text-blue-700 hover:underline"
          >
            {item.label}
          </button>
          {index < items.length - 1 && (
            <ArrowRight className="w-4 h-4 mx-2 text-gray-400" />
          )}
        </div>
      ))}
      <ArrowRight className="w-4 h-4 mx-2 text-gray-400" />
      <span className="text-gray-900 font-medium">{currentPage}</span>
    </nav>
  );
}

// Smart navigation suggestions based on context
interface SmartNavigationProps {
  currentContext: any;
  className?: string;
}

export function SmartNavigation({ currentContext, className = '' }: SmartNavigationProps) {
  const { navigateWithContext } = useNavigationFlow();
  const { openBookingModal, trackCTAClick } = useCTAIntegration();

  const getNavigationSuggestions = () => {
    const suggestions = [];

    // If user has condition but no service, suggest services
    if (currentContext.condition && !currentContext.service) {
      suggestions.push({
        title: 'Explore Treatment Options',
        description: `See specialized treatments for ${currentContext.condition.replace('-', ' ')}`,
        action: () => navigateWithContext('/services', { condition: currentContext.condition }),
        icon: <Target className="w-5 h-5" />
      });
    }

    // If user has service but no location, suggest locations
    if (currentContext.service && !currentContext.location) {
      suggestions.push({
        title: 'Find Nearby Locations',
        description: 'Choose from 10 convenient San Diego locations',
        action: () => navigateWithContext('/locations', { service: currentContext.service }),
        icon: <MapPin className="w-5 h-5" />
      });
    }

    // If user has both condition and service, suggest booking
    if (currentContext.condition && currentContext.service) {
      suggestions.push({
        title: 'Book Your Appointment',
        description: 'Schedule your personalized treatment session',
        action: () => {
          trackCTAClick({ action: 'smart_navigation_booking', context: currentContext });
          openBookingModal('comprehensive', { 
            page: 'smart-navigation', 
            ...currentContext 
          });
        },
        icon: <Calendar className="w-5 h-5" />
      });
    }

    // If user completed assessment, suggest treatment journey
    if (currentContext.assessmentCompleted) {
      suggestions.push({
        title: 'Start Your Treatment Journey',
        description: 'Begin your personalized recovery plan',
        action: () => navigateWithContext('/treatment-journey', { 
          assessmentCompleted: 'true',
          ...currentContext 
        }),
        icon: <ArrowRight className="w-5 h-5" />
      });
    }

    return suggestions;
  };

  const suggestions = getNavigationSuggestions();

  if (suggestions.length === 0) return null;

  return (
    <div className={`bg-blue-50 border border-blue-200 rounded-lg p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-blue-900 mb-4">
        Recommended Next Steps
      </h3>
      
      <div className="space-y-3">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={suggestion.action}
            className="w-full flex items-center p-4 bg-white border border-blue-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-left"
          >
            <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
              {suggestion.icon}
            </div>
            <div className="flex-1">
              <div className="font-medium text-gray-900">{suggestion.title}</div>
              <div className="text-sm text-gray-600">{suggestion.description}</div>
            </div>
            <ArrowRight className="w-5 h-5 text-blue-600 flex-shrink-0 ml-4" />
          </button>
        ))}
      </div>
    </div>
  );
}

// Flow completion tracker
export function FlowCompletionTracker({ 
  flowId, 
  completedSteps, 
  totalSteps,
  onComplete 
}: {
  flowId: string;
  completedSteps: string[];
  totalSteps: string[];
  onComplete?: () => void;
}) {
  const completionPercentage = (completedSteps.length / totalSteps.length) * 100;
  const isCompleted = completedSteps.length === totalSteps.length;

  useEffect(() => {
    if (isCompleted && onComplete) {
      console.log(`🎉 Flow completed: ${flowId}`);
      onComplete();
    }
  }, [isCompleted, flowId, onComplete]);

  return (
    <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold text-gray-900">Progress Tracker</h4>
        <span className="text-sm font-medium text-blue-600">
          {completedSteps.length} of {totalSteps.length} steps
        </span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
        <div 
          className="bg-gradient-to-r from-blue-600 to-green-600 h-2 rounded-full transition-all duration-500"
          style={{ width: `${completionPercentage}%` }}
        />
      </div>
      
      <div className="text-sm text-gray-600">
        {isCompleted ? (
          <span className="text-green-600 font-medium">
            ✅ Journey completed! Ready for treatment.
          </span>
        ) : (
          `${Math.round(completionPercentage)}% complete - Keep going!`
        )}
      </div>
    </div>
  );
}

export default useNavigationFlow;