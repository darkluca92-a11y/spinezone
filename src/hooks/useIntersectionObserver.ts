'use client';

import { useEffect, useRef, useState, useCallback, useMemo } from 'react';

interface UseIntersectionObserverProps {
  threshold?: number | number[];
  root?: Element | null;
  rootMargin?: string;
  freezeOnceVisible?: boolean;
}

interface IntersectionObserverEntry {
  isIntersecting: boolean;
  intersectionRatio: number;
  target: Element;
}

export function useIntersectionObserver({
  threshold = 0.1,
  root = null,
  rootMargin = '0px 0px 200px 0px', // Load 200px before coming into view
  freezeOnceVisible = true,
}: UseIntersectionObserverProps = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const targetRef = useRef<Element | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Memoized callback to prevent recreation
  const setTarget = useCallback((node: Element | null) => {
    // Clean up previous observer
    if (observerRef.current && targetRef.current) {
      observerRef.current.unobserve(targetRef.current);
    }
    
    targetRef.current = node;
    
    // Start observing new target if available
    if (node && observerRef.current) {
      observerRef.current.observe(node);
    }
  }, []);

  // Memoized observer callback for performance
  const handleIntersection = useCallback(([entry]: IntersectionObserverEntry[]) => {
    const isElementIntersecting = entry.isIntersecting;
    
    setIsIntersecting(isElementIntersecting);
    
    if (isElementIntersecting && !hasBeenVisible) {
      setHasBeenVisible(true);
      
      // Freeze observation after first visibility if enabled
      if (freezeOnceVisible && observerRef.current && targetRef.current) {
        observerRef.current.unobserve(targetRef.current);
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    }
  }, [hasBeenVisible, freezeOnceVisible]);

  // Memoized observer options
  const observerOptions = useMemo(() => ({
    threshold,
    root,
    rootMargin,
  }), [threshold, root, rootMargin]);

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    // Check if IntersectionObserver is supported
    if (!window.IntersectionObserver) {
      setIsIntersecting(true);
      setHasBeenVisible(true);
      return;
    }

    // Create observer only if not frozen or not yet visible
    if (!freezeOnceVisible || !hasBeenVisible) {
      observerRef.current = new IntersectionObserver(handleIntersection, observerOptions);
      observerRef.current.observe(target);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [handleIntersection, observerOptions, freezeOnceVisible, hasBeenVisible]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, []);

  return {
    isIntersecting: freezeOnceVisible ? hasBeenVisible : isIntersecting,
    hasBeenVisible,
    setTarget,
  };
}

// Custom hook for lazy loading with preloading
export function useLazyLoad(preloadDistance = '200px') {
  const { isIntersecting, setTarget } = useIntersectionObserver({
    threshold: 0,
    rootMargin: `0px 0px ${preloadDistance} 0px`,
    freezeOnceVisible: true,
  });

  return {
    shouldLoad: isIntersecting,
    ref: setTarget,
  };
}

// Hook for progressive image loading
export function useProgressiveImage(src: string, placeholder?: string) {
  const [currentSrc, setCurrentSrc] = useState(placeholder || '');
  const [isLoaded, setIsLoaded] = useState(false);
  const { shouldLoad, ref } = useLazyLoad();

  useEffect(() => {
    if (!shouldLoad || !src) return;

    const img = new Image();
    img.onload = () => {
      setCurrentSrc(src);
      setIsLoaded(true);
    };
    img.src = src;
  }, [shouldLoad, src]);

  return {
    src: currentSrc,
    isLoaded,
    ref,
  };
}