'use client';

import { useState, useEffect, useCallback } from 'react';
import { 
  AlertTriangle, 
  RefreshCw, 
  Phone, 
  Mail, 
  CheckCircle, 
  XCircle,
  WiFiOff,
  Server,
  Clock,
  Shield,
  ArrowRight,
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { useCTAIntegration } from './CTAIntegrationSystem';

// Error types for booking system
export type BookingErrorType = 
  | 'network_error'
  | 'server_error'
  | 'validation_error'
  | 'calendly_unavailable'
  | 'form_submission_failed'
  | 'timeout_error'
  | 'rate_limit_exceeded'
  | 'service_unavailable'
  | 'appointment_conflict'
  | 'payment_error'
  | 'unknown_error';

interface BookingError {
  type: BookingErrorType;
  message: string;
  code?: string;
  details?: any;
  timestamp: number;
  recoverable: boolean;
  userAction?: string;
}

interface ErrorHandlerProps {
  error?: BookingError | null;
  onRetry?: () => void;
  onFallback?: (fallbackType: string) => void;
  onDismiss?: () => void;
  showFallbacks?: boolean;
  className?: string;
}

// Hook for error detection and handling
export function useBookingErrorHandler() {
  const [currentError, setCurrentError] = useState<BookingError | null>(null);
  const [errorHistory, setErrorHistory] = useState<BookingError[]>([]);
  const [retryCount, setRetryCount] = useState(0);
  const { trackCTAClick } = useCTAIntegration();

  // Create error from various sources
  const createError = useCallback((
    type: BookingErrorType, 
    message: string, 
    details?: any
  ): BookingError => {
    const error: BookingError = {
      type,
      message,
      details,
      timestamp: Date.now(),
      recoverable: true, // Default to recoverable
      code: `${type.toUpperCase()}_${Date.now()}`
    };

    // Determine if error is recoverable based on type
    switch (type) {
      case 'network_error':
      case 'timeout_error':
      case 'server_error':
        error.recoverable = true;
        error.userAction = 'Please check your internet connection and try again.';
        break;
      case 'calendly_unavailable':
        error.recoverable = true;
        error.userAction = 'Online booking is temporarily unavailable. Please call us or try again later.';
        break;
      case 'rate_limit_exceeded':
        error.recoverable = true;
        error.userAction = 'Too many requests. Please wait a moment before trying again.';
        break;
      case 'appointment_conflict':
        error.recoverable = true;
        error.userAction = 'This appointment slot is no longer available. Please select a different time.';
        break;
      case 'validation_error':
        error.recoverable = true;
        error.userAction = 'Please check your information and try again.';
        break;
      case 'payment_error':
        error.recoverable = true;
        error.userAction = 'Payment processing failed. Please try a different payment method.';
        break;
      case 'service_unavailable':
        error.recoverable = false;
        error.userAction = 'This service is temporarily unavailable. Please contact us directly.';
        break;
      default:
        error.recoverable = true;
        error.userAction = 'An unexpected error occurred. Please try again or contact support.';
    }

    return error;
  }, []);

  // Handle different error scenarios
  const handleError = useCallback((error: BookingError) => {
    console.error('🔥 BOOKING ERROR DETECTED:');
    console.error('Type:', error.type);
    console.error('Message:', error.message);
    console.error('Details:', error.details);
    console.error('Recoverable:', error.recoverable);
    
    setCurrentError(error);
    setErrorHistory(prev => [error, ...prev].slice(0, 10)); // Keep last 10 errors
    
    // Track error for analytics
    trackCTAClick({
      action: 'error_occurred',
      errorType: error.type,
      errorMessage: error.message,
      retryCount,
      timestamp: error.timestamp
    });
    
    // Auto-retry for certain error types (with exponential backoff)
    if (error.recoverable && retryCount < 3) {
      const retryDelay = Math.pow(2, retryCount) * 1000; // 1s, 2s, 4s
      setTimeout(() => {
        setRetryCount(prev => prev + 1);
        console.log(`🔄 Auto-retrying... Attempt ${retryCount + 1}`);
      }, retryDelay);
    }
  }, [retryCount, trackCTAClick]);

  // Clear current error
  const clearError = useCallback(() => {
    setCurrentError(null);
    setRetryCount(0);
  }, []);

  // Retry last failed action
  const retryLastAction = useCallback(() => {
    if (currentError) {
      trackCTAClick({
        action: 'error_retry',
        errorType: currentError.type,
        retryAttempt: retryCount + 1
      });
      setRetryCount(prev => prev + 1);
      setCurrentError(null);
    }
  }, [currentError, retryCount, trackCTAClick]);

  return {
    currentError,
    errorHistory,
    retryCount,
    createError,
    handleError,
    clearError,
    retryLastAction
  };
}

// Professional error display component
export function BookingErrorDisplay({ 
  error, 
  onRetry, 
  onFallback, 
  onDismiss,
  showFallbacks = true,
  className = '' 
}: ErrorHandlerProps) {
  const { trackCTAClick } = useCTAIntegration();
  const [isRetrying, setIsRetrying] = useState(false);
  const [fallbacksVisible, setFallbacksVisible] = useState(false);

  const handleRetry = async () => {
    if (!onRetry || isRetrying) return;
    
    setIsRetrying(true);
    trackCTAClick({ 
      action: 'error_retry_clicked', 
      errorType: error?.type,
      timestamp: Date.now()
    });
    
    try {
      await onRetry();
    } finally {
      setTimeout(() => setIsRetrying(false), 1000);
    }
  };

  const handleFallback = (fallbackType: string) => {
    trackCTAClick({ 
      action: 'fallback_selected', 
      fallbackType,
      originalError: error?.type 
    });
    onFallback?.(fallbackType);
  };

  const getErrorIcon = () => {
    switch (error?.type) {
      case 'network_error':
        return <WiFiOff className="w-6 h-6 text-orange-600" />;
      case 'server_error':
        return <Server className="w-6 h-6 text-red-600" />;
      case 'timeout_error':
        return <Clock className="w-6 h-6 text-yellow-600" />;
      case 'calendly_unavailable':
        return <ExternalLink className="w-6 h-6 text-blue-600" />;
      default:
        return <AlertTriangle className="w-6 h-6 text-red-600" />;
    }
  };

  const getErrorTitle = () => {
    switch (error?.type) {
      case 'network_error':
        return 'Connection Problem';
      case 'server_error':
        return 'Server Temporarily Unavailable';
      case 'timeout_error':
        return 'Request Timed Out';
      case 'calendly_unavailable':
        return 'Online Booking Unavailable';
      case 'validation_error':
        return 'Information Required';
      case 'appointment_conflict':
        return 'Appointment Unavailable';
      case 'rate_limit_exceeded':
        return 'Please Wait';
      default:
        return 'Booking Issue';
    }
  };

  const getSeverityColor = () => {
    switch (error?.type) {
      case 'server_error':
      case 'service_unavailable':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'network_error':
      case 'timeout_error':
        return 'bg-orange-50 border-orange-200 text-orange-800';
      case 'calendly_unavailable':
      case 'appointment_conflict':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'rate_limit_exceeded':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  if (!error) return null;

  return (
    <div className={`rounded-lg border-2 p-6 ${getSeverityColor()} ${className}`}>
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-4">
          {getErrorIcon()}
        </div>
        
        <div className="flex-1">
          <h3 className="font-semibold text-lg mb-2">{getErrorTitle()}</h3>
          <p className="mb-4">{error.message}</p>
          
          {error.userAction && (
            <p className="text-sm mb-4 font-medium">{error.userAction}</p>
          )}

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3 mb-4">
            {error.recoverable && onRetry && (
              <button
                onClick={handleRetry}
                disabled={isRetrying}
                className="bg-white border border-gray-300 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 disabled:opacity-50 flex items-center"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isRetrying ? 'animate-spin' : ''}`} />
                {isRetrying ? 'Retrying...' : 'Try Again'}
              </button>
            )}
            
            {showFallbacks && (
              <button
                onClick={() => setFallbacksVisible(!fallbacksVisible)}
                className="bg-white border border-gray-300 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 flex items-center"
              >
                <Shield className="w-4 h-4 mr-2" />
                Other Options
                <ArrowRight className={`w-4 h-4 ml-2 transform transition-transform ${fallbacksVisible ? 'rotate-90' : ''}`} />
              </button>
            )}
            
            {onDismiss && (
              <button
                onClick={onDismiss}
                className="text-gray-600 hover:text-gray-800 font-medium px-2"
              >
                Dismiss
              </button>
            )}
          </div>

          {/* Fallback options */}
          {fallbacksVisible && showFallbacks && (
            <div className="border-t pt-4 space-y-3">
              <h4 className="font-medium mb-3">Alternative Ways to Book:</h4>
              
              <div className="grid gap-3">
                <button
                  onClick={() => handleFallback('phone')}
                  className="bg-white border border-gray-300 p-4 rounded-lg hover:border-green-300 hover:bg-green-50 flex items-center text-left"
                >
                  <Phone className="w-5 h-5 text-green-600 mr-3" />
                  <div>
                    <div className="font-medium">Call Our Team</div>
                    <div className="text-sm text-gray-600">(858) 555-0123 • Available now</div>
                  </div>
                </button>
                
                <button
                  onClick={() => handleFallback('email')}
                  className="bg-white border border-gray-300 p-4 rounded-lg hover:border-blue-300 hover:bg-blue-50 flex items-center text-left"
                >
                  <Mail className="w-5 h-5 text-blue-600 mr-3" />
                  <div>
                    <div className="font-medium">Email Request</div>
                    <div className="text-sm text-gray-600">We'll respond within 4 hours</div>
                  </div>
                </button>
                
                <button
                  onClick={() => handleFallback('text')}
                  className="bg-white border border-gray-300 p-4 rounded-lg hover:border-purple-300 hover:bg-purple-50 flex items-center text-left"
                >
                  <MessageSquare className="w-5 h-5 text-purple-600 mr-3" />
                  <div>
                    <div className="font-medium">Text Message</div>
                    <div className="text-sm text-gray-600">Quick response via SMS</div>
                  </div>
                </button>
                
                {error.type === 'calendly_unavailable' && (
                  <button
                    onClick={() => handleFallback('form')}
                    className="bg-white border border-gray-300 p-4 rounded-lg hover:border-orange-300 hover:bg-orange-50 flex items-center text-left"
                  >
                    <CheckCircle className="w-5 h-5 text-orange-600 mr-3" />
                    <div>
                      <div className="font-medium">Detailed Form</div>
                      <div className="text-sm text-gray-600">Complete booking form instead</div>
                    </div>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Dismiss button */}
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="flex-shrink-0 ml-4 text-gray-400 hover:text-gray-600"
          >
            <XCircle className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}

// Global error boundary wrapper
export function BookingErrorBoundary({ 
  children, 
  fallbackComponent,
  onError 
}: { 
  children: React.ReactNode;
  fallbackComponent?: React.ComponentType<{ error: BookingError; onRetry: () => void }>;
  onError?: (error: BookingError) => void;
}) {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState<BookingError | null>(null);
  const { createError } = useBookingErrorHandler();

  useEffect(() => {
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error('Unhandled promise rejection:', event.reason);
      const bookingError = createError('unknown_error', 
        'An unexpected error occurred while processing your request.',
        { originalError: event.reason }
      );
      
      setError(bookingError);
      setHasError(true);
      onError?.(bookingError);
    };

    const handleError = (event: ErrorEvent) => {
      console.error('Global error:', event.error);
      const bookingError = createError('unknown_error',
        'A technical error occurred. Please try again.',
        { originalError: event.error }
      );
      
      setError(bookingError);
      setHasError(true);
      onError?.(bookingError);
    };

    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    window.addEventListener('error', handleError);

    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
      window.removeEventListener('error', handleError);
    };
  }, [createError, onError]);

  const handleRetry = () => {
    setHasError(false);
    setError(null);
  };

  if (hasError && error) {
    if (fallbackComponent) {
      const FallbackComponent = fallbackComponent;
      return <FallbackComponent error={error} onRetry={handleRetry} />;
    }

    return (
      <BookingErrorDisplay
        error={error}
        onRetry={handleRetry}
        onDismiss={() => setHasError(false)}
        showFallbacks={true}
      />
    );
  }

  return <>{children}</>;
}

// Professional maintenance mode component
export function MaintenanceMode({ 
  title = "Booking System Maintenance",
  message = "Our online booking system is temporarily unavailable for maintenance. We'll be back shortly!",
  estimatedTime = "15 minutes",
  showAlternatives = true,
  className = ""
}: {
  title?: string;
  message?: string;
  estimatedTime?: string;
  showAlternatives?: boolean;
  className?: string;
}) {
  const { trackCTAClick } = useCTAIntegration();

  return (
    <div className={`bg-blue-50 border border-blue-200 rounded-xl p-8 text-center ${className}`}>
      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <RefreshCw className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
      
      <h3 className="text-xl font-bold text-blue-900 mb-3">{title}</h3>
      <p className="text-blue-800 mb-4">{message}</p>
      
      <div className="bg-white border border-blue-200 rounded-lg p-4 mb-6">
        <p className="text-sm text-blue-700">
          <strong>Estimated completion:</strong> {estimatedTime}
        </p>
        <p className="text-sm text-blue-700 mt-1">
          <strong>Current status:</strong> Updates in progress...
        </p>
      </div>

      {showAlternatives && (
        <div className="space-y-3">
          <h4 className="font-semibold text-blue-900 mb-3">Need immediate help?</h4>
          
          <div className="grid gap-3">
            <a
              href="tel:+1-858-555-0123"
              className="bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center"
              onClick={() => trackCTAClick({ action: 'maintenance_phone_call' })}
            >
              <Phone className="w-5 h-5 mr-2" />
              Call (858) 555-0123
            </a>
            
            <a
              href="mailto:appointments@spinezone-sd.com?subject=Appointment Request - Online Booking Unavailable"
              className="bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
              onClick={() => trackCTAClick({ action: 'maintenance_email' })}
            >
              <Mail className="w-5 h-5 mr-2" />
              Email Appointment Request
            </a>
          </div>
          
          <p className="text-sm text-blue-700 mt-4">
            Our team is available 7 days a week to help you schedule your appointment
          </p>
        </div>
      )}
    </div>
  );
}

// Service status indicator
export function ServiceStatusIndicator({ 
  status = 'operational', 
  className = '' 
}: { 
  status?: 'operational' | 'degraded' | 'maintenance' | 'outage';
  className?: string;
}) {
  const getStatusConfig = () => {
    switch (status) {
      case 'operational':
        return {
          color: 'text-green-600',
          bgColor: 'bg-green-100',
          icon: <CheckCircle className="w-4 h-4" />,
          text: 'All systems operational'
        };
      case 'degraded':
        return {
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-100',
          icon: <AlertTriangle className="w-4 h-4" />,
          text: 'Some delays possible'
        };
      case 'maintenance':
        return {
          color: 'text-blue-600',
          bgColor: 'bg-blue-100',
          icon: <RefreshCw className="w-4 h-4" />,
          text: 'Scheduled maintenance'
        };
      case 'outage':
        return {
          color: 'text-red-600',
          bgColor: 'bg-red-100',
          icon: <XCircle className="w-4 h-4" />,
          text: 'Service temporarily unavailable'
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div className={`inline-flex items-center px-3 py-1.5 rounded-full ${config.bgColor} ${config.color} ${className}`}>
      {config.icon}
      <span className="ml-2 text-sm font-medium">{config.text}</span>
    </div>
  );
}

export default BookingErrorDisplay;