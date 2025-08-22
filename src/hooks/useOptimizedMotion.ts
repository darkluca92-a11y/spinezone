'use client';

import { useMemo, useRef, useCallback, useEffect, useState } from 'react';
import { useInView, Variants, Transition, useAnimation, MotionValue } from 'framer-motion';
import { usePerformance } from '@/contexts/PerformanceContext';

// Optimized animation presets
interface OptimizedAnimationPresets {
  fadeIn: Variants;
  slideInUp: Variants;
  slideInLeft: Variants;
  slideInRight: Variants;
  scaleIn: Variants;
  staggerChildren: Variants;
  slideInDown: Variants;
}

// Performance-aware animation config
interface AnimationConfig {
  duration?: number;
  delay?: number;
  ease?: "linear" | "easeIn" | "easeOut" | "easeInOut" | "circIn" | "circOut" | "circInOut" | "backIn" | "backOut" | "backInOut" | "anticipate" | [number, number, number, number];
  stiffness?: number;
  damping?: number;
  mass?: number;
  reduce?: boolean; // Reduce animations on low-end devices
}

// GPU-accelerated transform properties
const GPU_ACCELERATED_PROPERTIES = [
  'translateX',
  'translateY',
  'translateZ',
  'scale',
  'scaleX',
  'scaleY',
  'rotateX',
  'rotateY',
  'rotateZ',
  'opacity',
];

// Create optimized animation variants
export const createOptimizedVariants = (config: AnimationConfig = {}): OptimizedAnimationPresets => {
  const {
    duration = 0.6,
    delay = 0,
    ease = [0.4, 0.0, 0.2, 1],
    stiffness = 100,
    damping = 15,
    mass = 1,
    reduce = false,
  } = config;

  // Reduced motion for performance
  const baseTransition: Transition = reduce
    ? { duration: 0.2, ease: 'easeOut' }
    : Array.isArray(ease)
    ? {
        duration,
        delay,
        ease: ease as [number, number, number, number],
      }
    : {
        duration,
        delay,
        ease: ease as any,
        type: 'spring',
        stiffness,
        damping,
        mass,
      };

  return {
    fadeIn: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: baseTransition,
      },
    },
    slideInUp: {
      hidden: {
        opacity: 0,
        y: reduce ? 20 : 60,
        scale: reduce ? 1 : 0.95,
      },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: baseTransition,
      },
    },
    slideInLeft: {
      hidden: {
        opacity: 0,
        x: reduce ? -20 : -60,
      },
      visible: {
        opacity: 1,
        x: 0,
        transition: baseTransition,
      },
    },
    slideInRight: {
      hidden: {
        opacity: 0,
        x: reduce ? 20 : 60,
      },
      visible: {
        opacity: 1,
        x: 0,
        transition: baseTransition,
      },
    },
    slideInDown: {
      hidden: {
        opacity: 0,
        y: reduce ? -20 : -60,
      },
      visible: {
        opacity: 1,
        y: 0,
        transition: baseTransition,
      },
    },
    scaleIn: {
      hidden: {
        opacity: 0,
        scale: reduce ? 0.9 : 0.8,
      },
      visible: {
        opacity: 1,
        scale: 1,
        transition: baseTransition,
      },
    },
    staggerChildren: {
      hidden: {},
      visible: {
        transition: {
          staggerChildren: reduce ? 0.05 : 0.1,
          delayChildren: delay,
        },
      },
    },
  };
};

// Hook for optimized motion with performance monitoring
export function useOptimizedMotion(
  animationType: keyof OptimizedAnimationPresets = 'fadeIn',
  config: AnimationConfig = {}
) {
  const ref = useRef<HTMLElement>(null);
  const { state } = usePerformance();
  const controls = useAnimation();
  
  // Detect reduced motion preference
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // Performance-aware configuration
  const optimizedConfig = useMemo(() => ({
    ...config,
    reduce: prefersReducedMotion || !state.criticalResourcesLoaded,
  }), [config, prefersReducedMotion, state.criticalResourcesLoaded]);

  // Memoized variants to prevent recreation
  const variants = useMemo(
    () => createOptimizedVariants(optimizedConfig),
    [optimizedConfig]
  );

  // Intersection observer for performance
  const isInView = useInView(ref, {
    once: true,
    amount: 0.1,
    margin: '0px 0px -100px 0px',
  });

  // Animation trigger
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return {
    ref,
    variants: variants[animationType],
    controls,
    isInView,
    animate: isInView ? 'visible' : 'hidden',
  };
}

// Hook for staggered animations
export function useStaggeredAnimation(
  items: any[],
  animationType: keyof OptimizedAnimationPresets = 'slideInUp',
  staggerDelay: number = 0.1
) {
  const containerRef = useRef<HTMLElement>(null);
  const { state } = usePerformance();
  
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  const optimizedStaggerDelay = prefersReducedMotion ? 0.02 : staggerDelay;

  const containerVariants = useMemo(() => ({
    hidden: {},
    visible: {
      transition: {
        staggerChildren: optimizedStaggerDelay,
        delayChildren: 0.1,
      },
    },
  }), [optimizedStaggerDelay]);

  const itemVariants = useMemo(() => {
    const baseVariants = createOptimizedVariants({
      reduce: prefersReducedMotion || !state.criticalResourcesLoaded,
    });
    return baseVariants[animationType];
  }, [animationType, prefersReducedMotion, state.criticalResourcesLoaded]);

  const isInView = useInView(containerRef, {
    once: true,
    amount: 0.1,
  });

  return {
    containerRef,
    containerVariants,
    itemVariants,
    isInView,
    animate: isInView ? 'visible' : 'hidden',
  };
}

// Hook for scroll-triggered animations
export function useScrollAnimation(
  threshold: number = 0.1,
  triggerOnce: boolean = true
) {
  const ref = useRef<HTMLElement>(null);
  const controls = useAnimation();
  
  const isInView = useInView(ref, {
    amount: threshold,
    once: triggerOnce,
  });

  const variants = useMemo(() => createOptimizedVariants(), []);

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    } else if (!triggerOnce) {
      controls.start('hidden');
    }
  }, [isInView, controls, triggerOnce]);

  return {
    ref,
    controls,
    variants: variants.fadeIn,
    isInView,
  };
}

// Hook for hover animations with performance optimization
export function useHoverAnimation(
  config: AnimationConfig = {}
) {
  const { reduce = false } = config;
  
  const hoverVariants = useMemo(() => ({
    hover: {
      scale: reduce ? 1.02 : 1.05,
      transition: {
        duration: reduce ? 0.1 : 0.2,
        ease: 'easeOut',
      },
    },
    tap: {
      scale: reduce ? 0.98 : 0.95,
      transition: {
        duration: 0.1,
        ease: 'easeOut',
      },
    },
  }), [reduce]);

  return hoverVariants;
}

// Hook for performance-aware layout animations
export function useLayoutAnimation() {
  const { state } = usePerformance();
  
  return useMemo(() => ({
    layout: state.criticalResourcesLoaded,
    layoutDependency: state.criticalResourcesLoaded,
    transition: {
      layout: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
  }), [state.criticalResourcesLoaded]);
}

// Hook for optimized exit animations
export function useExitAnimation(
  animationType: keyof OptimizedAnimationPresets = 'fadeIn'
) {
  const variants = useMemo(() => {
    const baseVariants = createOptimizedVariants({ reduce: true });
    const selectedVariant = baseVariants[animationType];
    
    return {
      ...selectedVariant,
      exit: selectedVariant.hidden,
    };
  }, [animationType]);

  return variants;
}

// Performance monitoring for animations
export function useAnimationPerformance(componentName: string) {
  const startTimeRef = useRef<number>(0);
  
  const onAnimationStart = useCallback(() => {
    startTimeRef.current = performance.now();
  }, []);

  const onAnimationComplete = useCallback(() => {
    if (startTimeRef.current > 0) {
      const duration = performance.now() - startTimeRef.current;
      
      // Log performance in development
      if (process.env.NODE_ENV === 'development') {
        console.log(`Animation ${componentName} took ${duration.toFixed(2)}ms`);
        
        // Warn if animation is too slow
        if (duration > 100) {
          console.warn(`Slow animation detected in ${componentName}: ${duration.toFixed(2)}ms`);
        }
      }
      
      startTimeRef.current = 0;
    }
  }, [componentName]);

  return {
    onAnimationStart,
    onAnimationComplete,
  };
}

// Utility for creating GPU-accelerated styles
export function createGPUAcceleratedStyle(transform: string = ''): React.CSSProperties {
  return {
    willChange: 'transform, opacity',
    transform: `translate3d(0, 0, 0) ${transform}`,
    backfaceVisibility: 'hidden',
    perspective: 1000,
  };
}

// Hook for conditional animations based on device capabilities
export function useConditionalAnimation() {
  const [canAnimate, setCanAnimate] = useState(true);
  
  useEffect(() => {
    // Check device capabilities
    const checkDeviceCapabilities = () => {
      const ua = navigator.userAgent;
      const isLowEndDevice = /Android.*Chrome\/[.0-9]*\s+Mobile/i.test(ua) &&
                           !/Chrome\/(?:6[5-9]|[7-9][0-9]|[1-9][0-9]{2})/i.test(ua);
      
      const hasReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const hasLowMemory = (navigator as any).deviceMemory && (navigator as any).deviceMemory < 4;
      
      setCanAnimate(!isLowEndDevice && !hasReducedMotion && !hasLowMemory);
    };

    checkDeviceCapabilities();
  }, []);

  return canAnimate;
}