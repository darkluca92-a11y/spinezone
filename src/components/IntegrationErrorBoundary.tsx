'use client';

import React, { Component, ErrorInfo, ReactNode, memo, useCallback, useState, useEffect } from 'react';
import { AlertCircle, RefreshCw, Wifi, WifiOff, Clock, ExternalLink } from 'lucide-react';

// Error types for different integration failures
export type IntegrationErrorType = 
  | 'network'
  | 'timeout'
  | 'authentication'
  | 'rate_limit'
  | 'server_error'
  | 'parsing_error'
  | 'unknown';

export interface IntegrationError {
  type: IntegrationErrorType;
  service: string;
  message: string;
  originalError?: Error;
  timestamp: Date;
  retryable: boolean;
  userMessage: string;
  actionSuggestion?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: IntegrationError | null;
  errorId: string;
  retryCount: number;
  lastRetry: Date | null;
}

interface IntegrationErrorBoundaryProps {
  children: ReactNode;
  serviceName: string;
  fallbackComponent?: React.ComponentType<{
    error: IntegrationError;
    retry: () => void;
    canRetry: boolean;
  }>;
  maxRetries?: number;
  retryDelay?: number;
  onError?: (error: IntegrationError, errorInfo: ErrorInfo) => void;
  enableLogging?: boolean;
  showDetailedError?: boolean;
}

// Error classification utility
class IntegrationErrorClassifier {
  static classify(error: Error, serviceName: string): IntegrationError {
    const message = error.message.toLowerCase();
    const timestamp = new Date();

    // Network-related errors
    if (message.includes('network') || message.includes('fetch') || message.includes('connection')) {
      return {
        type: 'network',
        service: serviceName,
        message: error.message,
        originalError: error,
        timestamp,
        retryable: true,
        userMessage: `Unable to connect to ${serviceName}. Please check your internet connection.`,
        actionSuggestion: 'Check your internet connection and try again.'
      };
    }

    // Timeout errors
    if (message.includes('timeout') || message.includes('aborted')) {
      return {
        type: 'timeout',
        service: serviceName,
        message: error.message,
        originalError: error,
        timestamp,
        retryable: true,
        userMessage: `${serviceName} is taking longer than expected to respond.`,
        actionSuggestion: 'The service may be busy. Please try again in a moment.'
      };
    }

    // Authentication errors
    if (message.includes('auth') || message.includes('401') || message.includes('unauthorized')) {
      return {
        type: 'authentication',
        service: serviceName,
        message: error.message,
        originalError: error,
        timestamp,
        retryable: false,
        userMessage: `Authentication failed for ${serviceName}.`,
        actionSuggestion: 'Please contact support if this issue persists.'
      };
    }

    // Rate limiting
    if (message.includes('rate limit') || message.includes('429') || message.includes('too many requests')) {
      return {
        type: 'rate_limit',
        service: serviceName,
        message: error.message,
        originalError: error,
        timestamp,
        retryable: true,
        userMessage: `${serviceName} is currently busy.`,
        actionSuggestion: 'Please wait a few moments before trying again.'
      };
    }

    // Server errors
    if (message.includes('500') || message.includes('server') || message.includes('internal')) {
      return {
        type: 'server_error',
        service: serviceName,
        message: error.message,
        originalError: error,
        timestamp,
        retryable: true,
        userMessage: `${serviceName} is experiencing technical difficulties.`,
        actionSuggestion: 'This is a temporary issue. Please try again later.'
      };
    }

    // Parsing errors
    if (message.includes('json') || message.includes('parse') || message.includes('invalid')) {
      return {
        type: 'parsing_error',
        service: serviceName,
        message: error.message,
        originalError: error,
        timestamp,
        retryable: false,
        userMessage: `Received invalid data from ${serviceName}.`,
        actionSuggestion: 'This appears to be a service issue. Please contact support.'
      };
    }

    // Default unknown error
    return {
      type: 'unknown',
      service: serviceName,
      message: error.message,
      originalError: error,
      timestamp,
      retryable: true,
      userMessage: `An unexpected error occurred with ${serviceName}.`,
      actionSuggestion: 'Please try again. If the problem continues, contact support.'
    };
  }
}

// Error reporting utility
class IntegrationErrorReporter {
  private static errors: IntegrationError[] = [];
  private static maxErrors = 100;

  static report(error: IntegrationError, errorInfo?: ErrorInfo): void {
    // Add to local storage
    this.errors.unshift({ ...error });
    if (this.errors.length > this.maxErrors) {
      this.errors = this.errors.slice(0, this.maxErrors);
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.group(`🚨 Integration Error - ${error.service}`);
      console.error('Error:', error);
      if (errorInfo) {
        console.error('Component Stack:', errorInfo.componentStack);
      }
      console.groupEnd();
    }

    // Send to analytics in production
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'integration_error', {
        error_service: error.service,
        error_type: error.type,
        error_message: error.message,
        retryable: error.retryable,
        custom_map: {
          error_id: this.generateErrorId(error)
        }
      });
    }

    // Store in localStorage for debugging
    try {
      const storedErrors = JSON.parse(localStorage.getItem('integration_errors') || '[]');
      storedErrors.unshift({
        ...error,
        timestamp: error.timestamp.toISOString()
      });
      localStorage.setItem('integration_errors', JSON.stringify(storedErrors.slice(0, 50)));
    } catch (e) {
      console.warn('Failed to store error in localStorage:', e);
    }
  }

  static getRecentErrors(): IntegrationError[] {
    return [...this.errors];
  }

  static clearErrors(): void {
    this.errors = [];
    try {
      localStorage.removeItem('integration_errors');
    } catch (e) {
      console.warn('Failed to clear errors from localStorage:', e);
    }
  }

  static getErrorStats(): {
    totalErrors: number;
    errorsByService: Record<string, number>;
    errorsByType: Record<string, number>;
    retryableErrors: number;
  } {
    const stats = {
      totalErrors: this.errors.length,
      errorsByService: {} as Record<string, number>,
      errorsByType: {} as Record<string, number>,
      retryableErrors: 0
    };

    this.errors.forEach(error => {
      // Count by service
      stats.errorsByService[error.service] = (stats.errorsByService[error.service] || 0) + 1;
      
      // Count by type
      stats.errorsByType[error.type] = (stats.errorsByType[error.type] || 0) + 1;
      
      // Count retryable errors
      if (error.retryable) {
        stats.retryableErrors++;
      }
    });

    return stats;
  }

  private static generateErrorId(error: IntegrationError): string {
    return `${error.service}-${error.type}-${error.timestamp.getTime()}`;
  }
}

// Default error fallback component
const DefaultErrorFallback = memo(function DefaultErrorFallback({
  error,
  retry,
  canRetry
}: {
  error: IntegrationError;
  retry: () => void;
  canRetry: boolean;
}) {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const getErrorIcon = () => {
    switch (error.type) {
      case 'network':
        return <WifiOff className="w-12 h-12 text-red-500" />;
      case 'timeout':
        return <Clock className="w-12 h-12 text-orange-500" />;
      default:
        return <AlertCircle className="w-12 h-12 text-red-500" />;
    }
  };

  const getErrorColor = () => {
    switch (error.type) {
      case 'network':
        return 'border-red-200 bg-red-50';
      case 'timeout':
        return 'border-orange-200 bg-orange-50';
      case 'authentication':
        return 'border-yellow-200 bg-yellow-50';
      case 'rate_limit':
        return 'border-purple-200 bg-purple-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  return (
    <div className={`rounded-xl border-2 p-8 text-center ${getErrorColor()}`}>
      <div className="mb-4 flex justify-center">
        {getErrorIcon()}
      </div>
      
      <h3 className="text-xl font-bold text-gray-900 mb-2">
        {error.service} Unavailable
      </h3>
      
      <p className="text-gray-700 mb-4 max-w-md mx-auto">
        {error.userMessage}
      </p>

      {error.actionSuggestion && (
        <p className="text-sm text-gray-600 mb-6 max-w-md mx-auto">
          {error.actionSuggestion}
        </p>
      )}

      {/* Connection status indicator */}
      <div className="flex items-center justify-center mb-4 text-sm">
        {isOnline ? (
          <>
            <Wifi className="w-4 h-4 text-green-500 mr-2" />
            <span className="text-green-600">Internet Connected</span>
          </>
        ) : (
          <>
            <WifiOff className="w-4 h-4 text-red-500 mr-2" />
            <span className="text-red-600">Internet Disconnected</span>
          </>
        )}
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        {canRetry && error.retryable && (
          <button
            onClick={retry}
            disabled={!isOnline && error.type === 'network'}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </button>
        )}
        
        <a
          href="/contact"
          className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          Contact Support
        </a>
      </div>

      {/* Error details for development */}
      {process.env.NODE_ENV === 'development' && (
        <details className="mt-6 text-left">
          <summary className="cursor-pointer text-sm font-medium text-gray-500">
            Technical Details
          </summary>
          <pre className="mt-2 text-xs bg-gray-100 p-3 rounded overflow-x-auto">
            {JSON.stringify(error, null, 2)}
          </pre>
        </details>
      )}
    </div>
  );
});

// Main error boundary component
export class IntegrationErrorBoundary extends Component<
  IntegrationErrorBoundaryProps,
  ErrorBoundaryState
> {
  private retryTimeout?: NodeJS.Timeout;
  
  constructor(props: IntegrationErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorId: '',
      retryCount: 0,
      lastRetry: null
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      errorId: `error-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const integrationError = IntegrationErrorClassifier.classify(error, this.props.serviceName);
    
    this.setState({
      error: integrationError
    });

    // Report the error
    IntegrationErrorReporter.report(integrationError, errorInfo);

    // Call custom error handler
    if (this.props.onError) {
      this.props.onError(integrationError, errorInfo);
    }

    // Log if enabled
    if (this.props.enableLogging !== false) {
      console.error(`Integration Error in ${this.props.serviceName}:`, error, errorInfo);
    }
  }

  componentWillUnmount() {
    if (this.retryTimeout) {
      clearTimeout(this.retryTimeout);
    }
  }

  handleRetry = () => {
    const { maxRetries = 3, retryDelay = 1000 } = this.props;
    
    if (this.state.retryCount >= maxRetries) {
      console.warn(`Max retries (${maxRetries}) reached for ${this.props.serviceName}`);
      return;
    }

    // Exponential backoff
    const delay = retryDelay * Math.pow(2, this.state.retryCount);
    
    this.retryTimeout = setTimeout(() => {
      this.setState({
        hasError: false,
        error: null,
        retryCount: this.state.retryCount + 1,
        lastRetry: new Date()
      });
    }, delay);
  };

  render() {
    if (this.state.hasError && this.state.error) {
      const { maxRetries = 3, fallbackComponent: FallbackComponent } = this.props;
      const canRetry = this.state.retryCount < maxRetries;

      if (FallbackComponent) {
        return (
          <FallbackComponent
            error={this.state.error}
            retry={this.handleRetry}
            canRetry={canRetry}
          />
        );
      }

      return (
        <DefaultErrorFallback
          error={this.state.error}
          retry={this.handleRetry}
          canRetry={canRetry}
        />
      );
    }

    return this.props.children;
  }
}

// Higher-order component for wrapping integrations
export function withIntegrationErrorBoundary<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  serviceName: string,
  options: Partial<IntegrationErrorBoundaryProps> = {}
) {
  const WithErrorBoundary = (props: P) => (
    <IntegrationErrorBoundary serviceName={serviceName} {...options}>
      <WrappedComponent {...props} />
    </IntegrationErrorBoundary>
  );

  WithErrorBoundary.displayName = `withIntegrationErrorBoundary(${WrappedComponent.displayName || WrappedComponent.name})`;
  
  return WithErrorBoundary;
}

// Hook for programmatic error handling
export function useIntegrationErrorHandler(serviceName: string) {
  const handleError = useCallback((error: Error) => {
    const integrationError = IntegrationErrorClassifier.classify(error, serviceName);
    IntegrationErrorReporter.report(integrationError);
    return integrationError;
  }, [serviceName]);

  const getErrorStats = useCallback(() => {
    return IntegrationErrorReporter.getErrorStats();
  }, []);

  const clearErrors = useCallback(() => {
    IntegrationErrorReporter.clearErrors();
  }, []);

  return {
    handleError,
    getErrorStats,
    clearErrors,
    getRecentErrors: IntegrationErrorReporter.getRecentErrors
  };
}

// Service-specific error boundaries
export const CalendlyErrorBoundary = (props: { children: ReactNode }) => (
  <IntegrationErrorBoundary serviceName="Calendly" {...props} />
);

export const GoogleMapsErrorBoundary = (props: { children: ReactNode }) => (
  <IntegrationErrorBoundary serviceName="Google Maps" {...props} />
);

export const VapiErrorBoundary = (props: { children: ReactNode }) => (
  <IntegrationErrorBoundary serviceName="Vapi AI" {...props} />
);

export const SupabaseErrorBoundary = (props: { children: ReactNode }) => (
  <IntegrationErrorBoundary serviceName="Supabase" {...props} />
);

// Export utilities for debugging
export { IntegrationErrorClassifier, IntegrationErrorReporter };

export default IntegrationErrorBoundary;