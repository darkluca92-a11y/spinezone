'use client';

import { lazy, Suspense, ComponentType } from 'react';

// Lazy load Framer Motion components to reduce initial bundle size
const AnimatedGradient = lazy(() => import('./AnimatedGradient'));
const AnimatedGradientDemo = lazy(() => import('./AnimatedGradientDemo'));
const BentoCard = lazy(() => import('./BentoCard'));
const PatientDashboard = lazy(() => import('./PatientDashboard'));

// Lazy load UI components with heavy animations
const FloatingActionMenu = lazy(() => import('./ui/floating-action-menu'));
const GeometricBackground = lazy(() => 
  import('./ui/shape-landing-hero').then(module => ({
    default: module.GeometricBackground
  }))
);

// Minimal loading placeholder for animations (invisible to user)
const AnimationLoader = () => (
  <div className="animate-pulse bg-transparent" style={{ minHeight: '1px' }} />
);

// Optimized HOC for animation components
function withAnimationSuspense<T extends object>(
  LazyComponent: ComponentType<T>,
  displayName: string,
  minHeight?: string
) {
  const WrappedComponent = (props: T) => (
    <Suspense fallback={
      <div 
        className="bg-transparent" 
        style={{ minHeight: minHeight || '1px' }}
      />
    }>
      <LazyComponent {...props} />
    </Suspense>
  );
  
  WrappedComponent.displayName = `LazyAnimation${displayName}`;
  return WrappedComponent;
}

// Export lazy animation components
export const LazyAnimatedGradient = withAnimationSuspense(
  AnimatedGradient,
  'AnimatedGradient',
  '200px'
);

export const LazyAnimatedGradientDemo = withAnimationSuspense(
  AnimatedGradientDemo,
  'AnimatedGradientDemo',
  '300px'
);

export const LazyBentoCard = withAnimationSuspense(
  BentoCard,
  'BentoCard',
  '200px'
);

export const LazyPatientDashboard = withAnimationSuspense(
  PatientDashboard,
  'PatientDashboard',
  '400px'
);

export const LazyFloatingActionMenu = withAnimationSuspense(
  FloatingActionMenu,
  'FloatingActionMenu',
  '50px'
);

export const LazyGeometricBackground = withAnimationSuspense(
  GeometricBackground,
  'GeometricBackground',
  '500px'
);

// Preload functions for critical animations
export const preloadCriticalAnimations = () => {
  // Preload only essential animations for above-the-fold content
  const imports = [
    () => import('./ui/shape-landing-hero'),
    () => import('./AnimatedGradient'),
  ];
  
  return Promise.all(imports.map(importFn => importFn()));
};

export const preloadSecondaryAnimations = () => {
  // Preload secondary animations after critical path
  const imports = [
    () => import('./BentoCard'),
    () => import('./ui/floating-action-menu'),
    () => import('./PatientDashboard'),
  ];
  
  return Promise.all(imports.map(importFn => importFn()));
};