'use client';

import { lazy, Suspense, ComponentType } from 'react';
import { Loader2 } from 'lucide-react';

// Performance-optimized lazy loading with proper error boundaries
const ComprehensiveAppointmentForm = lazy(() => 
  import('./AppointmentBookingForms').then(module => ({
    default: module.ComprehensiveAppointmentForm
  }))
);

const PhaseAppointmentForm = lazy(() => 
  import('./AppointmentBookingForms').then(module => ({
    default: module.PhaseAppointmentForm
  }))
);

// Note: Only available forms are ComprehensiveAppointmentForm, QuickAppointmentForm, and PhaseAppointmentForm
// ServiceAppointmentForm, AssessmentAppointmentForm, and LocationAppointmentForm are not available in the current codebase

const QuickAppointmentForm = lazy(() => 
  import('./AppointmentBookingForms').then(module => ({
    default: module.QuickAppointmentForm
  }))
);

// Optimized loading component with minimal bundle impact
const AppointmentFormLoader = () => (
  <div className="flex items-center justify-center min-h-[400px] bg-gray-50 rounded-lg">
    <div className="flex flex-col items-center space-y-4">
      <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      <p className="text-sm text-gray-600">Loading appointment form...</p>
    </div>
  </div>
);

// HOC for wrapping lazy components with optimized suspense
function withLazySuspense<T extends object>(
  LazyComponent: ComponentType<T>,
  displayName: string
) {
  const WrappedComponent = (props: T) => (
    <Suspense fallback={<AppointmentFormLoader />}>
      <LazyComponent {...props} />
    </Suspense>
  );
  
  WrappedComponent.displayName = `Lazy${displayName}`;
  return WrappedComponent;
}

// Export lazy-loaded components with suspense wrappers
export const LazyComprehensiveAppointmentForm = withLazySuspense(
  ComprehensiveAppointmentForm,
  'ComprehensiveAppointmentForm'
);

export const LazyPhaseAppointmentForm = withLazySuspense(
  PhaseAppointmentForm,
  'PhaseAppointmentForm'
);

export const LazyQuickAppointmentForm = withLazySuspense(
  QuickAppointmentForm,
  'QuickAppointmentForm'
);

// Preload functions for critical forms
export const preloadComprehensiveForm = () => {
  const componentImport = () => import('./AppointmentBookingForms');
  return componentImport();
};

export const preloadQuickForm = () => {
  const componentImport = () => import('./AppointmentBookingForms');
  return componentImport();
};

// Default export for most common use case
export default LazyComprehensiveAppointmentForm;