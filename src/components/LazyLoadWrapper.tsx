'use client';

import { ReactNode, memo, useMemo, useCallback } from 'react';
import { useLazyLoad } from '@/hooks/useIntersectionObserver';

interface LazyLoadWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
  className?: string;
  minHeight?: string;
  preloadDistance?: string;
  placeholder?: ReactNode;
}

// Optimized lazy loading wrapper with minimal layout shift
const LazyLoadWrapper = memo(function LazyLoadWrapper({
  children,
  fallback,
  className = '',
  minHeight = '100px',
  preloadDistance = '200px',
  placeholder,
}: LazyLoadWrapperProps) {
  const { shouldLoad, ref } = useLazyLoad(preloadDistance);

  // Memoized default placeholder to prevent recreation
  const defaultPlaceholder = useMemo(() => (
    <div 
      className={`bg-gray-50 animate-pulse ${className}`}
      style={{ minHeight }}
      aria-label="Loading content..."
    />
  ), [className, minHeight]);

  // Memoized placeholder selection to optimize render path
  const selectedPlaceholder = useMemo(() => 
    placeholder || fallback || defaultPlaceholder, 
    [placeholder, fallback, defaultPlaceholder]
  );

  return (
    <div ref={ref} className={className} style={{ minHeight }}>
      {shouldLoad ? children : selectedPlaceholder}
    </div>
  );
});

export default LazyLoadWrapper;

// Specialized wrapper for sections
export const LazySectionWrapper = memo(function LazySectionWrapper({
  children,
  className = '',
  sectionHeight = '400px',
}: {
  children: ReactNode;
  className?: string;
  sectionHeight?: string;
}) {
  // Memoized placeholder to prevent recreation
  const sectionPlaceholder = useMemo(() => (
    <section 
      className={`bg-transparent ${className}`}
      style={{ minHeight: sectionHeight }}
      aria-label="Loading section content"
    />
  ), [className, sectionHeight]);

  return (
    <LazyLoadWrapper
      className={className}
      minHeight={sectionHeight}
      preloadDistance="300px"
      placeholder={sectionPlaceholder}
    >
      {children}
    </LazyLoadWrapper>
  );
});

// Specialized wrapper for cards/components
export const LazyCardWrapper = memo(function LazyCardWrapper({
  children,
  className = '',
  cardHeight = '200px',
}: {
  children: ReactNode;
  className?: string;
  cardHeight?: string;
}) {
  // Memoized card placeholder to prevent recreation
  const cardPlaceholder = useMemo(() => (
    <div 
      className={`bg-gray-100 rounded-lg animate-pulse ${className}`}
      style={{ minHeight: cardHeight }}
      aria-label="Loading card content"
    />
  ), [className, cardHeight]);

  return (
    <LazyLoadWrapper
      className={className}
      minHeight={cardHeight}
      preloadDistance="150px"
      placeholder={cardPlaceholder}
    >
      {children}
    </LazyLoadWrapper>
  );
});

// Wrapper for below-fold forms
export const LazyFormWrapper = memo(function LazyFormWrapper({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  // Memoized form placeholder to prevent recreation
  const formPlaceholder = useMemo(() => (
    <div className={`bg-white rounded-lg border shadow-sm p-6 ${className}`}>
      <div className="animate-pulse space-y-4">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-10 bg-gray-200 rounded"></div>
        <div className="h-10 bg-gray-200 rounded"></div>
        <div className="h-10 bg-gray-200 rounded w-1/3"></div>
      </div>
    </div>
  ), [className]);

  return (
    <LazyLoadWrapper
      className={className}
      minHeight="500px"
      preloadDistance="250px"
      placeholder={formPlaceholder}
    >
      {children}
    </LazyLoadWrapper>
  );
});