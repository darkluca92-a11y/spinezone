'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Heart, 
  Target, 
  Activity,
  AlertTriangle,
  CheckCircle,
  Phone,
  Mail,
  ArrowRight,
  Shield
} from 'lucide-react';
import { useCTAIntegration } from './CTAIntegrationSystem';
import { ComprehensiveAppointmentForm, QuickAppointmentForm, PhaseAppointmentForm } from './AppointmentBookingForms';
import CalendlyWidget from './CalendlyWidget';

// Appointment routing types
type AppointmentRoute = 
  | 'quick-consultation'
  | 'comprehensive-booking' 
  | 'urgent-care'
  | 'assessment-focused'
  | 'service-specific'
  | 'location-specific'
  | 'phase-continuation'
  | 'second-opinion'
  | 'follow-up'
  | 'emergency-triage';

interface RoutingContext {
  source: string;
  condition?: string;
  service?: string;
  location?: string;
  phase?: string;
  urgencyLevel?: 'low' | 'medium' | 'high' | 'urgent';
  patientType?: 'new' | 'returning' | 'referred';
  appointmentHistory?: any[];
  preferences?: any;
}

interface RoutingDecision {
  route: AppointmentRoute;
  priority: number;
  reason: string;
  recommended: boolean;
  fallbacks: AppointmentRoute[];
}

// Smart appointment routing logic
export class AppointmentRouter {
  private static instance: AppointmentRouter;
  
  static getInstance(): AppointmentRouter {
    if (!AppointmentRouter.instance) {
      AppointmentRouter.instance = new AppointmentRouter();
    }
    return AppointmentRouter.instance;
  }

  // Analyze context and determine best routing
  analyzeRouting(context: RoutingContext): RoutingDecision {
    console.log('🎯 APPOINTMENT ROUTING ANALYSIS:');
    console.log('Context:', context);

    let route: AppointmentRoute = 'comprehensive-booking';
    let priority = 5;
    let reason = 'Default comprehensive booking';
    let recommended = true;
    const fallbacks: AppointmentRoute[] = ['quick-consultation'];

    // Emergency/Urgent routing
    if (context.urgencyLevel === 'urgent' || context.source.includes('urgent')) {
      route = 'urgent-care';
      priority = 10;
      reason = 'Urgent care needed - immediate attention required';
      fallbacks.push('emergency-triage');
      console.log('🚨 URGENT ROUTING: Emergency care pathway');
    }
    
    // Assessment-focused routing
    else if (context.source.includes('assessment') || context.service === 'assessment') {
      route = 'assessment-focused';
      priority = 8;
      reason = 'Assessment requested - comprehensive evaluation needed';
      fallbacks.push('comprehensive-booking', 'quick-consultation');
      console.log('📋 ASSESSMENT ROUTING: Evaluation pathway');
    }
    
    // Service-specific routing
    else if (context.service && context.service !== 'general') {
      route = 'service-specific';
      priority = 7;
      reason = `Service-specific booking for ${context.service}`;
      fallbacks.push('comprehensive-booking', 'quick-consultation');
      console.log(`🎯 SERVICE ROUTING: ${context.service} pathway`);
    }
    
    // Phase continuation routing
    else if (context.phase && context.patientType === 'returning') {
      route = 'phase-continuation';
      priority = 8;
      reason = `Continuing ${context.phase} treatment`;
      fallbacks.push('follow-up', 'comprehensive-booking');
      console.log(`🔄 PHASE ROUTING: ${context.phase} continuation`);
    }
    
    // Location-specific routing
    else if (context.location && context.source.includes('location')) {
      route = 'location-specific';
      priority = 6;
      reason = `Location-specific booking for ${context.location}`;
      fallbacks.push('comprehensive-booking', 'quick-consultation');
      console.log(`📍 LOCATION ROUTING: ${context.location} pathway`);
    }
    
    // Quick consultation routing (mobile, time-sensitive)
    else if (context.source.includes('mobile') || context.source.includes('quick')) {
      route = 'quick-consultation';
      priority = 6;
      reason = 'Quick consultation requested - streamlined booking';
      fallbacks.push('comprehensive-booking');
      console.log('⚡ QUICK ROUTING: Fast-track pathway');
    }
    
    // Second opinion routing
    else if (context.source.includes('second-opinion')) {
      route = 'second-opinion';
      priority = 7;
      reason = 'Second opinion consultation requested';
      fallbacks.push('comprehensive-booking', 'assessment-focused');
      console.log('👥 SECOND OPINION ROUTING: Expert consultation pathway');
    }

    const decision: RoutingDecision = {
      route,
      priority,
      reason,
      recommended,
      fallbacks
    };

    console.log('✅ ROUTING DECISION:', decision);
    return decision;
  }

  // Get routing recommendations based on context
  getRecommendations(context: RoutingContext): Array<{
    route: AppointmentRoute;
    title: string;
    description: string;
    estimatedTime: string;
    priority: number;
  }> {
    const recommendations = [];

    // Base recommendations
    const routeInfo = {
      'quick-consultation': {
        title: 'Quick Consultation Request',
        description: 'Fast appointment request - we\'ll call you back within 4 hours',
        estimatedTime: '2 minutes',
        priority: 6
      },
      'comprehensive-booking': {
        title: 'Complete Appointment Booking',
        description: 'Detailed form for comprehensive care planning and scheduling',
        estimatedTime: '5-8 minutes',
        priority: 8
      },
      'urgent-care': {
        title: 'Urgent Care Appointment',
        description: 'Same-day appointments available - response within 2 hours',
        estimatedTime: '3 minutes',
        priority: 10
      },
      'assessment-focused': {
        title: 'Comprehensive Assessment',
        description: '60-minute evaluation with personalized treatment recommendations',
        estimatedTime: '6 minutes',
        priority: 8
      },
      'service-specific': {
        title: 'Service-Specific Booking',
        description: 'Specialized appointment for your specific treatment program',
        estimatedTime: '4 minutes',
        priority: 7
      },
      'location-specific': {
        title: 'Location-Based Booking',
        description: 'Appointment at your preferred location with local team',
        estimatedTime: '3 minutes',
        priority: 6
      },
      'second-opinion': {
        title: 'Second Opinion Consultation',
        description: 'Expert medical review and alternative treatment recommendations',
        estimatedTime: '5 minutes',
        priority: 7
      },
      'phase-continuation': {
        title: 'Treatment Phase Continuation',
        description: 'Continue your current treatment plan with next appointment',
        estimatedTime: '3 minutes',
        priority: 6
      },
      'follow-up': {
        title: 'Follow-up Appointment',
        description: 'Check-in appointment to monitor progress and adjust treatment',
        estimatedTime: '2 minutes',
        priority: 5
      },
      'emergency-triage': {
        title: 'Emergency Triage Assessment',
        description: 'Urgent care evaluation for immediate medical attention',
        estimatedTime: '4 minutes',
        priority: 10
      }
    };

    // Add context-appropriate recommendations
    const decision = this.analyzeRouting(context);
    
    // Primary recommendation
    recommendations.push({
      route: decision.route,
      ...routeInfo[decision.route],
      priority: decision.priority
    });

    // Add fallback recommendations
    decision.fallbacks.forEach(fallback => {
      if (routeInfo[fallback]) {
        recommendations.push({
          route: fallback,
          ...routeInfo[fallback]
        });
      }
    });

    return recommendations.sort((a, b) => (b.priority || 0) - (a.priority || 0));
  }
}

// Routing selection component
interface AppointmentRoutingSelectorProps {
  context: RoutingContext;
  onRouteSelected: (route: AppointmentRoute) => void;
  className?: string;
}

export function AppointmentRoutingSelector({ 
  context, 
  onRouteSelected, 
  className = '' 
}: AppointmentRoutingSelectorProps) {
  const router = AppointmentRouter.getInstance();
  const recommendations = router.getRecommendations(context);
  const primaryRecommendation = recommendations[0];

  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Choose Your Booking Experience</h3>
        <p className="text-gray-600">
          Based on your needs, we recommend the best appointment type for you
        </p>
      </div>

      {/* Primary Recommendation */}
      <div className="mb-6">
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 relative">
          <div className="absolute -top-2 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
            RECOMMENDED
          </div>
          <div className="pt-2">
            <h4 className="font-semibold text-blue-900 mb-2">{primaryRecommendation.title}</h4>
            <p className="text-blue-800 mb-3">{primaryRecommendation.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-blue-600">
                ⏱️ Takes about {primaryRecommendation.estimatedTime}
              </span>
              <button
                onClick={() => onRouteSelected(primaryRecommendation.route)}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Select This Option
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Other Options */}
      <div className="space-y-3">
        <h4 className="font-medium text-gray-900">Other Available Options:</h4>
        {recommendations.slice(1).map((recommendation, index) => (
          <button
            key={index}
            onClick={() => onRouteSelected(recommendation.route)}
            className="w-full p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-left"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="font-medium text-gray-900">{recommendation.title}</div>
                <div className="text-sm text-gray-600 mt-1">{recommendation.description}</div>
                <div className="text-xs text-gray-500 mt-1">
                  ⏱️ {recommendation.estimatedTime}
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 ml-4" />
            </div>
          </button>
        ))}
      </div>

      {/* Emergency Contact */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h4 className="font-semibold text-red-800 mb-2">Need Immediate Help?</h4>
          <div className="flex flex-col sm:flex-row gap-2">
            <a
              href="tel:+1-858-555-0123"
              className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center justify-center"
            >
              <Phone className="w-4 h-4 mr-2" />
              Call (858) 555-0123
            </a>
            <button
              onClick={() => onRouteSelected('emergency-triage')}
              className="border border-red-600 text-red-600 px-4 py-2 rounded-lg font-medium hover:bg-red-50 transition-colors flex items-center justify-center"
            >
              <AlertTriangle className="w-4 h-4 mr-2" />
              Emergency Triage
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Route-specific form renderer
interface RouteFormRendererProps {
  route: AppointmentRoute;
  context: RoutingContext;
  onSuccess: (data: any) => void;
  onError: (error: string) => void;
  onBack: () => void;
  className?: string;
}

export function RouteFormRenderer({ 
  route, 
  context, 
  onSuccess, 
  onError, 
  onBack,
  className = '' 
}: RouteFormRendererProps) {
  const { trackCTAClick } = useCTAIntegration();

  // Track form rendering
  useEffect(() => {
    trackCTAClick({
      action: 'form_rendered',
      route,
      context,
      timestamp: Date.now()
    });
  }, [route, context]);

  const getRouteTitle = () => {
    switch (route) {
      case 'quick-consultation':
        return 'Quick Consultation Request';
      case 'comprehensive-booking':
        return 'Complete Appointment Booking';
      case 'urgent-care':
        return 'Urgent Care Request';
      case 'assessment-focused':
        return 'Comprehensive Assessment Booking';
      case 'service-specific':
        return `${context.service || 'Service'} Appointment`;
      case 'phase-continuation':
        return `${context.phase || 'Treatment'} Phase Appointment`;
      case 'location-specific':
        return `${context.location || 'Location'} Appointment`;
      case 'second-opinion':
        return 'Second Opinion Consultation';
      case 'emergency-triage':
        return 'Emergency Triage Assessment';
      default:
        return 'Appointment Booking';
    }
  };

  const renderRouteSpecificForm = () => {
    switch (route) {
      case 'quick-consultation':
        return (
          <QuickAppointmentForm
            onSuccess={onSuccess}
            onError={onError}
            className={className}
          />
        );

      case 'comprehensive-booking':
        return (
          <ComprehensiveAppointmentForm
            onSuccess={onSuccess}
            onError={onError}
            className={className}
          />
        );

      case 'urgent-care':
        return (
          <div className="space-y-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <AlertTriangle className="w-6 h-6 text-red-600 mr-3" />
                <h3 className="text-lg font-semibold text-red-800">Urgent Care Protocol</h3>
              </div>
              
              <div className="space-y-3 mb-6">
                <p className="text-red-700">
                  <strong>Response Time:</strong> Within 2 hours
                </p>
                <p className="text-red-700">
                  <strong>Same-Day Availability:</strong> Emergency slots reserved
                </p>
                <p className="text-red-700">
                  <strong>Priority Conditions:</strong> Severe pain (8-10), post-surgery issues, new injuries
                </p>
              </div>

              <div className="grid gap-3">
                <a
                  href="tel:+1-858-555-0123"
                  className="bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call for Immediate Help
                </a>
                <p className="text-center text-red-600 text-sm">
                  Or complete the form below for urgent callback
                </p>
              </div>
            </div>
            
            <QuickAppointmentForm
              onSuccess={(data) => onSuccess({ ...data, urgentCare: true })}
              onError={onError}
              className={className}
            />
          </div>
        );

      case 'assessment-focused':
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">Comprehensive Assessment</h3>
              <div className="space-y-2 text-blue-700">
                <p>• 60-minute detailed evaluation</p>
                <p>• Personalized treatment plan</p>
                <p>• Movement and strength analysis</p>
                <p>• Pain pattern assessment</p>
                <p>• Goal-setting session</p>
              </div>
            </div>
            
            <ComprehensiveAppointmentForm
              onSuccess={(data) => onSuccess({ ...data, appointmentType: 'assessment' })}
              onError={onError}
              className={className}
            />
          </div>
        );

      case 'phase-continuation':
        return (
          <PhaseAppointmentForm
            phase={context.phase}
            onSuccess={onSuccess}
            onError={onError}
            className={className}
          />
        );

      case 'emergency-triage':
        return (
          <div className="bg-red-50 border-2 border-red-300 rounded-xl p-6">
            <div className="text-center mb-6">
              <AlertTriangle className="w-16 h-16 text-red-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-red-800 mb-2">Emergency Triage</h3>
              <p className="text-red-700">
                This form is for emergencies requiring immediate medical attention
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="bg-white border border-red-200 rounded-lg p-4">
                <h4 className="font-semibold text-red-800 mb-2">Emergency Situations Include:</h4>
                <ul className="text-red-700 space-y-1 text-sm">
                  <li>• Severe pain (9-10/10) that appeared suddenly</li>
                  <li>• Loss of sensation or movement in limbs</li>
                  <li>• Post-surgical complications</li>
                  <li>• Severe injury from accident</li>
                  <li>• Signs of serious neurological problems</li>
                </ul>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-800 text-sm">
                  <strong>Note:</strong> For life-threatening emergencies, please call 911 immediately.
                </p>
              </div>
            </div>

            <div className="grid gap-3">
              <a
                href="tel:911"
                className="bg-red-700 text-white py-3 px-6 rounded-lg font-bold hover:bg-red-800 transition-colors flex items-center justify-center"
              >
                <Phone className="w-5 h-5 mr-2" />
                CALL 911 - Life Threatening
              </a>
              <a
                href="tel:+1-858-555-0123"
                className="bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call SpineZone Emergency Line
              </a>
            </div>
          </div>
        );

      default:
        return (
          <ComprehensiveAppointmentForm
            onSuccess={onSuccess}
            onError={onError}
            className={className}
          />
        );
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header with back button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{getRouteTitle()}</h2>
          <p className="text-gray-600 mt-1">
            Routed from: {context.source}
            {context.condition && ` • Condition: ${context.condition.replace('-', ' ')}`}
            {context.service && ` • Service: ${context.service}`}
          </p>
        </div>
        <button
          onClick={onBack}
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          ← Change Option
        </button>
      </div>

      {/* Route-specific form */}
      {renderRouteSpecificForm()}
    </div>
  );
}

// Main appointment routing component
interface AppointmentRoutingSystemProps {
  initialContext?: Partial<RoutingContext>;
  onBookingComplete?: (data: any) => void;
  className?: string;
}

export function AppointmentRoutingSystem({ 
  initialContext = {},
  onBookingComplete,
  className = '' 
}: AppointmentRoutingSystemProps) {
  const searchParams = useSearchParams();
  const { trackCTAClick } = useCTAIntegration();
  const [currentRoute, setCurrentRoute] = useState<AppointmentRoute | null>(null);
  const [context, setContext] = useState<RoutingContext>({
    source: 'routing-system',
    ...initialContext
  });

  // Parse URL parameters for routing context
  useEffect(() => {
    if (!searchParams) return;
    
    const urlContext: Partial<RoutingContext> = {
      condition: searchParams.get('condition') || undefined,
      service: searchParams.get('service') || undefined,
      location: searchParams.get('location') || undefined,
      phase: searchParams.get('phase') || undefined,
      urgencyLevel: (searchParams.get('urgent') === 'true' ? 'urgent' : 
                    searchParams.get('priority') as RoutingContext['urgencyLevel']) || 'medium',
      patientType: (searchParams.get('returning') === 'true' ? 'returning' : 'new'),
      source: searchParams.get('source') || context.source
    };

    setContext(prev => ({ ...prev, ...urlContext }));
    
    // Auto-route if specific parameters indicate urgency
    if (urlContext.urgencyLevel === 'urgent') {
      setCurrentRoute('urgent-care');
    }
  }, [searchParams]);

  const handleRouteSelection = (route: AppointmentRoute) => {
    console.log(`🎯 Route selected: ${route}`);
    trackCTAClick({
      action: 'route_selected',
      route,
      context,
      timestamp: Date.now()
    });
    
    setCurrentRoute(route);
  };

  const handleBookingSuccess = (data: any) => {
    trackCTAClick({
      action: 'booking_success',
      route: currentRoute,
      context,
      confirmationNumber: data.confirmationNumber,
      timestamp: Date.now()
    });
    
    if (onBookingComplete) {
      onBookingComplete({ ...data, route: currentRoute, context });
    }
  };

  const handleBookingError = (error: string) => {
    trackCTAClick({
      action: 'booking_error',
      route: currentRoute,
      context,
      error,
      timestamp: Date.now()
    });
    
    console.error('Booking error:', error);
  };

  const handleBack = () => {
    setCurrentRoute(null);
  };

  return (
    <div className={`max-w-4xl mx-auto ${className}`}>
      {currentRoute ? (
        <RouteFormRenderer
          route={currentRoute}
          context={context}
          onSuccess={handleBookingSuccess}
          onError={handleBookingError}
          onBack={handleBack}
        />
      ) : (
        <AppointmentRoutingSelector
          context={context}
          onRouteSelected={handleRouteSelection}
        />
      )}
    </div>
  );
}

export default AppointmentRoutingSystem;