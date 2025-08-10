'use client';

import { Suspense, ReactNode } from 'react';

interface SuspenseWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
}

// Loading skeleton for search params components
function SearchParamsLoading() {
  return (
    <div className="animate-pulse">
      <div className="h-6 bg-gray-200 rounded mb-4"></div>
      <div className="h-4 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
    </div>
  );
}

// Generic Suspense wrapper for components using useSearchParams
export function SearchParamsWrapper({ children, fallback }: SuspenseWrapperProps) {
  return (
    <Suspense fallback={fallback || <SearchParamsLoading />}>
      {children}
    </Suspense>
  );
}

// Navigation-specific wrapper
export function NavigationWrapper({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<div className="h-8 bg-gray-100 rounded animate-pulse"></div>}>
      {children}
    </Suspense>
  );
}

// Map-specific wrapper with location loading
export function MapWrapper({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={
      <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-gray-500">Loading map...</div>
      </div>
    }>
      {children}
    </Suspense>
  );
}

// Booking system wrapper with form loading
export function BookingWrapper({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/2"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-12 bg-blue-100 rounded"></div>
        </div>
      </div>
    }>
      {children}
    </Suspense>
  );
}

// Higher-order component for wrapping components with search params
export function withSearchParamsSuspense<T extends object>(
  Component: React.ComponentType<T>, 
  fallback?: ReactNode
) {
  return function WrappedComponent(props: T) {
    return (
      <SearchParamsWrapper fallback={fallback}>
        <Component {...props} />
      </SearchParamsWrapper>
    );
  };
}