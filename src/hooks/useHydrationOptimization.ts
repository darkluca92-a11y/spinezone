'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { usePerformance } from '@/contexts/PerformanceContext';

// Hydration state interface
interface HydrationState {
  isHydrated: boolean;
  isMounted: boolean;
  hasHydrationMismatch: boolean;
  suppressHydrationWarning: boolean;
}

// Custom hook for optimized hydration
export function useHydrationOptimization() {
  const { setHydrated } = usePerformance();
  const [hydrationState, setHydrationState] = useState<HydrationState>({
    isHydrated: false,
    isMounted: false,
    hasHydrationMismatch: false,
    suppressHydrationWarning: false,
  });

  const hydrationTimeoutRef = useRef<NodeJS.Timeout>();
  const performanceMarkRef = useRef<string>();

  // Memoized hydration completion handler
  const handleHydrationComplete = useCallback(() => {
    setHydrationState(prev => ({
      ...prev,
      isHydrated: true,
    }));
    setHydrated(true);

    // Performance marking
    if (performanceMarkRef.current) {
      performance.mark('hydration-complete');
      performance.measure('hydration-duration', performanceMarkRef.current, 'hydration-complete');
    }

    // Clear timeout
    if (hydrationTimeoutRef.current) {
      clearTimeout(hydrationTimeoutRef.current);
    }
  }, [setHydrated]);

  // Effect for hydration optimization
  useEffect(() => {
    // Mark hydration start
    performanceMarkRef.current = 'hydration-start';
    performance.mark('hydration-start');

    setHydrationState(prev => ({
      ...prev,
      isMounted: true,
    }));

    // Detect hydration mismatch
    const handleError = (event: ErrorEvent) => {
      if (event.message.includes('hydration') || event.message.includes('mismatch')) {
        console.warn('Hydration mismatch detected:', event.message);
        setHydrationState(prev => ({
          ...prev,
          hasHydrationMismatch: true,
          suppressHydrationWarning: true,
        }));
      }
    };

    window.addEventListener('error', handleError);

    // Hydration timeout fallback
    hydrationTimeoutRef.current = setTimeout(() => {
      console.warn('Hydration timeout - forcing completion');
      handleHydrationComplete();
    }, 3000);

    // Detect when React has hydrated
    const observer = new MutationObserver(() => {
      // Check if React has attached event listeners (indication of hydration)
      const hasReactProps = document.querySelector('[data-reactroot]') !== null;
      const hasEventListeners = document.body.onclick !== null || 
                               document.body.onkeydown !== null ||
                               document.querySelector('[onclick]') !== null;
      
      if (hasReactProps || hasEventListeners) {
        handleHydrationComplete();
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['data-reactroot', 'onclick', 'onkeydown'],
    });

    // Immediate hydration check for fast connections
    requestAnimationFrame(() => {
      if (document.readyState === 'complete') {
        setTimeout(handleHydrationComplete, 100);
      }
    });

    return () => {
      window.removeEventListener('error', handleError);
      observer.disconnect();
      if (hydrationTimeoutRef.current) {
        clearTimeout(hydrationTimeoutRef.current);
      }
    };
  }, [handleHydrationComplete]);

  return hydrationState;
}

// Hook for preventing hydration mismatches
export function useHydrationSafeValue<T>(
  serverValue: T,
  clientValue: T,
  delay: number = 0
): T {
  const [value, setValue] = useState<T>(serverValue);
  const { isHydrated } = useHydrationOptimization();

  useEffect(() => {
    if (isHydrated) {
      if (delay > 0) {
        const timeout = setTimeout(() => {
          setValue(clientValue);
        }, delay);
        return () => clearTimeout(timeout);
      } else {
        setValue(clientValue);
      }
    }
  }, [isHydrated, clientValue, delay]);

  return value;
}

// Hook for SSR-safe dynamic content
export function useSSRSafeContent<T>(
  content: T | (() => T),
  fallback?: T
): T | undefined {
  const [safeContent, setSafeContent] = useState<T | undefined>(fallback);
  const { isHydrated, isMounted } = useHydrationOptimization();

  useEffect(() => {
    if (isHydrated && isMounted) {
      const resolvedContent = typeof content === 'function' ? (content as () => T)() : content;
      setSafeContent(resolvedContent);
    }
  }, [isHydrated, isMounted, content]);

  return safeContent;
}

// Hook for progressive enhancement
export function useProgressiveEnhancement() {
  const { isHydrated, isMounted } = useHydrationOptimization();
  
  return {
    isEnhanced: isHydrated && isMounted,
    shouldShowInteractive: isHydrated,
    shouldShowAnimations: isHydrated,
    shouldPreloadResources: isHydrated,
  };
}

// Hook for hydration-aware class names
export function useHydrationAwareClassName(
  baseClassName: string,
  hydratedClassName?: string,
  fallbackClassName?: string
): string {
  const { isHydrated, hasHydrationMismatch } = useHydrationOptimization();
  
  let className = baseClassName;
  
  if (hasHydrationMismatch && fallbackClassName) {
    className += ` ${fallbackClassName}`;
  } else if (isHydrated && hydratedClassName) {
    className += ` ${hydratedClassName}`;
  }
  
  return className;
}

// Hook for safe DOM measurements
export function useSafeDOMMeasurement<T>(
  measureFn: () => T,
  dependencies: any[] = []
): T | null {
  const [measurement, setMeasurement] = useState<T | null>(null);
  const { isHydrated } = useHydrationOptimization();

  useEffect(() => {
    if (isHydrated && typeof window !== 'undefined') {
      try {
        const result = measureFn();
        setMeasurement(result);
      } catch (error) {
        console.warn('DOM measurement failed:', error);
      }
    }
  }, [isHydrated, measureFn, ...dependencies]);

  return measurement;
}