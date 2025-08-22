'use client';

import dynamic from 'next/dynamic';
import { ComponentType, ReactNode } from 'react';

// Enhanced dynamic import options
interface OptimizedDynamicOptions {
  loading?: ComponentType<any> | (() => ReactNode);
  ssr?: boolean;
  preloadDistance?: number;
  priority?: 'high' | 'medium' | 'low';
  chunkName?: string;
  retryAttempts?: number;
  retryDelay?: number;
}

// Performance-optimized loading components
export const createOptimizedLoadingComponent = (
  height: string = '200px',
  className: string = '',
  variant: 'skeleton' | 'spinner' | 'placeholder' = 'skeleton'
) => {
  const LoadingComponent = () => {
    switch (variant) {
      case 'spinner':
        return (
          <div className={`flex items-center justify-center ${className}`} style={{ height }}>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        );
      
      case 'placeholder':
        return (
          <div className={`bg-gray-100 rounded-lg ${className}`} style={{ height }}>
            <div className="animate-pulse bg-gray-200 w-full h-full rounded-lg"></div>
          </div>
        );
      
      case 'skeleton':
      default:
        return (
          <div className={`animate-pulse ${className}`} style={{ height }}>
            <div className="space-y-4 p-4">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            </div>
          </div>
        );
    }
  };

  LoadingComponent.displayName = `OptimizedLoading_${variant}`;
  return LoadingComponent;
};

// Preloader utility for critical components
export const preloadComponent = async (
  importFn: () => Promise<{ default: ComponentType<any> }>,
  retryAttempts: number = 3,
  retryDelay: number = 1000
): Promise<void> => {
  for (let attempt = 1; attempt <= retryAttempts; attempt++) {
    try {
      await importFn();
      return;
    } catch (error) {
      console.warn(`Preload attempt ${attempt} failed:`, error);
      if (attempt === retryAttempts) {
        throw error;
      }
      await new Promise(resolve => setTimeout(resolve, retryDelay * attempt));
    }
  }
};

// Optimized dynamic import factory
export const createOptimizedDynamic = <T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  options: OptimizedDynamicOptions = {}
) => {
  const {
    loading = createOptimizedLoadingComponent(),
    ssr = false,
    priority = 'medium',
    chunkName,
    retryAttempts = 3,
    retryDelay = 1000,
  } = options;

  // Add retry logic to import function
  const retryImportFn = async () => {
    for (let attempt = 1; attempt <= retryAttempts; attempt++) {
      try {
        return await importFn();
      } catch (error) {
        if (attempt === retryAttempts) {
          console.error('Dynamic import failed after retries:', error);
          throw error;
        }
        await new Promise(resolve => setTimeout(resolve, retryDelay * attempt));
      }
    }
    throw new Error('Dynamic import failed');
  };

  // Create dynamic component with enhanced options
  const DynamicComponent = dynamic(retryImportFn, {
    loading: loading ? (typeof loading === 'function' ? loading as any : () => loading as ReactNode) : undefined,
    ssr,
  });

  // Add preloading based on priority
  if (typeof window !== 'undefined') {
    switch (priority) {
      case 'high':
        // Preload immediately
        requestIdleCallback(() => preloadComponent(importFn).catch(console.warn));
        break;
      case 'medium':
        // Preload after initial render
        setTimeout(() => preloadComponent(importFn).catch(console.warn), 1000);
        break;
      case 'low':
        // Preload only on user interaction
        let hasPreloaded = false;
        const preloadOnInteraction = () => {
          if (hasPreloaded) return;
          hasPreloaded = true;
          preloadComponent(importFn).catch(console.warn);
          document.removeEventListener('mousemove', preloadOnInteraction);
          document.removeEventListener('keydown', preloadOnInteraction);
        };
        document.addEventListener('mousemove', preloadOnInteraction);
        document.addEventListener('keydown', preloadOnInteraction);
        break;
    }
  }

  return DynamicComponent;
};

// Specific optimized components for the SpineZone app
export const OptimizedContactForm = createOptimizedDynamic(
  () => import('@/components/ContactForm'),
  {
    loading: createOptimizedLoadingComponent('500px', 'max-w-2xl mx-auto', 'skeleton'),
    ssr: false,
    priority: 'medium',
    chunkName: 'contact-form',
  }
);

export const OptimizedConditionsTreated = createOptimizedDynamic(
  () => import('@/components/ConditionsTreated'),
  {
    loading: createOptimizedLoadingComponent('400px', 'section-padding bg-gray-50', 'skeleton'),
    ssr: false,
    priority: 'medium',
    chunkName: 'conditions-treated',
  }
);

export const OptimizedLocalSEO = createOptimizedDynamic(
  () => import('@/components/LocalSEO'),
  {
    loading: createOptimizedLoadingComponent('400px', 'bg-gradient-to-br from-blue-600 to-green-600', 'placeholder'),
    ssr: false,
    priority: 'low',
    chunkName: 'local-seo',
  }
);

export const OptimizedFinalCTA = createOptimizedDynamic(
  () => import('@/components/FinalCTA'),
  {
    loading: createOptimizedLoadingComponent('300px', 'section-padding', 'placeholder'),
    ssr: false,
    priority: 'low',
    chunkName: 'final-cta',
  }
);

export const OptimizedFooter = createOptimizedDynamic(
  () => import('@/components/Footer'),
  {
    loading: createOptimizedLoadingComponent('250px', 'bg-gray-900 text-white', 'skeleton'),
    ssr: false,
    priority: 'low',
    chunkName: 'footer',
  }
);

// Intersection-based dynamic loading
export const createIntersectionDynamic = <T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  options: OptimizedDynamicOptions & { rootMargin?: string } = {}
) => {
  const {
    rootMargin = '50px',
    loading = createOptimizedLoadingComponent(),
    ...dynamicOptions
  } = options;

  return createOptimizedDynamic(importFn, {
    ...dynamicOptions,
    loading,
  });
};

// Bundle analysis helper
export const analyzeBundleSize = () => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    const entries = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
    const jsChunks = entries.filter(entry => 
      entry.name.includes('.js') && entry.name.includes('chunk')
    );
    
    console.group('Bundle Analysis');
    jsChunks.forEach(chunk => {
      console.log(`${chunk.name}: ${(chunk.transferSize / 1024).toFixed(2)}KB`);
    });
    console.groupEnd();
  }
};

// Critical resource preloader
export const preloadCriticalResources = () => {
  if (typeof window !== 'undefined') {
    const criticalComponents = [
      () => import('@/components/HeroSection'),
      () => import('@/components/OptimizedImage'),
    ];

    criticalComponents.forEach(importFn => {
      requestIdleCallback(() => preloadComponent(importFn).catch(console.warn));
    });
  }
};