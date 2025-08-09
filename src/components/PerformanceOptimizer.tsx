'use client';

import { useEffect, useRef, useCallback } from 'react';

interface PerformanceOptimizerProps {
  enableCriticalCSS?: boolean;
  enableResourceHints?: boolean;
  enableLayoutOptimization?: boolean;
  enableWebVitalsTracking?: boolean;
  enableMobileOptimizations?: boolean;
}

export default function PerformanceOptimizer({ 
  enableCriticalCSS = true,
  enableResourceHints = true,
  enableLayoutOptimization = true,
  enableWebVitalsTracking = true,
  enableMobileOptimizations = true
}: PerformanceOptimizerProps) {
  
  const performanceObserver = useRef<PerformanceObserver | null>(null);
  const intersectionObserver = useRef<IntersectionObserver | null>(null);

  const trackWebVitals = useCallback(() => {
    if (!enableWebVitalsTracking || typeof window === 'undefined') return;

    // Track Core Web Vitals
    const vitalsToTrack = ['CLS', 'FID', 'FCP', 'LCP', 'TTFB', 'INP'];
    
    // Use PerformanceObserver for more accurate tracking
    if ('PerformanceObserver' in window) {
      try {
        performanceObserver.current = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            // Log performance metrics (in production, send to analytics)
            if (process.env.NODE_ENV === 'development') {
              console.log(`Performance: ${entry.name}`, entry);
            }
            
            // Track specific Web Vitals
            if (entry.entryType === 'layout-shift' && !(entry as any).hadRecentInput) {
              // Track CLS
              console.log(`CLS: ${(entry as any).value}`);
            } else if (entry.entryType === 'largest-contentful-paint') {
              // Track LCP
              console.log(`LCP: ${entry.startTime}ms`);
            } else if (entry.entryType === 'first-input') {
              // Track FID
              console.log(`FID: ${(entry as any).processingStart - entry.startTime}ms`);
            }
          });
        });

        // Observe different performance entry types
        const entryTypes = ['largest-contentful-paint', 'layout-shift', 'first-input', 'navigation', 'paint'];
        entryTypes.forEach(type => {
          try {
            performanceObserver.current?.observe({ type, buffered: true });
          } catch (e) {
            console.warn(`Could not observe ${type}:`, e);
          }
        });
      } catch (error) {
        console.warn('PerformanceObserver not fully supported:', error);
      }
    }
  }, [enableWebVitalsTracking]);

  const optimizeMobilePerformance = useCallback(() => {
    if (!enableMobileOptimizations) return;

    // Detect mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
      // Optimize touch scrolling
      document.documentElement.style.setProperty('-webkit-overflow-scrolling', 'touch');
      
      // Prevent zoom on input focus for iOS
      const metaViewport = document.querySelector('meta[name="viewport"]') as HTMLMetaElement;
      if (metaViewport) {
        metaViewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover';
      }
      
      // Optimize scroll performance
      let scrollTimeout: NodeJS.Timeout;
      const optimizeScroll = () => {
        document.body.style.pointerEvents = 'none';
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          document.body.style.pointerEvents = 'auto';
        }, 150);
      };
      
      window.addEventListener('scroll', optimizeScroll, { passive: true });
      
      // Reduce animation complexity on mobile
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (!mediaQuery.matches) {
        document.documentElement.style.setProperty('--animation-duration', '0.2s');
      }
    }
  }, [enableMobileOptimizations]);

  useEffect(() => {
    // Optimize Core Web Vitals and layout
    if (enableLayoutOptimization) {
      // Prevent layout shifts by setting explicit dimensions
      const images = document.querySelectorAll('img[src]') as NodeListOf<HTMLImageElement>;
      images.forEach(img => {
        if (!img.getAttribute('width') || !img.getAttribute('height')) {
          img.style.aspectRatio = 'auto';
          img.style.height = 'auto';
        }
        
        // Add loading states to prevent CLS
        if (!img.complete) {
          img.style.backgroundColor = '#f3f4f6';
          img.addEventListener('load', () => {
            img.style.backgroundColor = 'transparent';
          }, { once: true });
        }
      });

      // Optimize font loading to prevent FOUT/FOIT
      if ('fonts' in document) {
        // Load fonts with font-display: swap equivalent
        document.fonts.ready.then(() => {
          document.body.classList.add('fonts-loaded');
          // Trigger reflow to ensure proper font rendering
          document.body.offsetHeight;
        });

        // Preload critical font variations
        const fontPreloads = [
          { family: 'Inter', weight: '400' },
          { family: 'Inter', weight: '600' },
          { family: 'Inter', weight: '700' }
        ];

        fontPreloads.forEach(({ family, weight }) => {
          const font = new FontFace(family, `url('/fonts/inter-var.woff2')`, {
            weight,
            display: 'swap'
          });
          document.fonts.add(font);
          font.load();
        });
      }
    }

    // Enhanced resource hints and preloading
    if (enableResourceHints) {
      const criticalResources = [
        { href: '/fonts/inter-var.woff2', as: 'font', type: 'font/woff2' },
        { href: 'https://fonts.googleapis.com', as: 'preconnect' },
        { href: 'https://fonts.gstatic.com', as: 'preconnect', crossorigin: true },
        { href: 'https://images.unsplash.com', as: 'dns-prefetch' },
      ];

      criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = resource.as === 'preconnect' || resource.as === 'dns-prefetch' ? resource.as : 'preload';
        if (resource.as !== 'preconnect' && resource.as !== 'dns-prefetch') {
          link.as = resource.as;
        }
        link.href = resource.href;
        
        if (resource.type) {
          link.type = resource.type;
        }
        
        if (resource.crossorigin || resource.as === 'font') {
          link.crossOrigin = 'anonymous';
        }
        
        document.head.appendChild(link);
      });

      // Preload next likely navigation targets
      const navigationTargets = ['/services', '/assessment', '/contact'];
      navigationTargets.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = href;
        document.head.appendChild(link);
      });
    }

    // Enhanced intersection observer for lazy loading
    const observerOptions = {
      rootMargin: '100px 0px',
      threshold: [0, 0.1, 0.5]
    };

    intersectionObserver.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement;
          
          // Handle lazy images
          if (element.tagName === 'IMG' && element.dataset.src) {
            const img = element as HTMLImageElement;
            const dataSrc = img.dataset.src;
            if (dataSrc) {
              img.src = dataSrc;
              img.removeAttribute('data-src');
              img.classList.add('fade-in');
            }
          }
          
          // Handle lazy sections
          if (element.classList.contains('lazy-section')) {
            element.classList.add('loaded');
          }
          
          intersectionObserver.current?.unobserve(element);
        }
      });
    }, observerOptions);

    // Observe lazy elements
    const lazyElements = document.querySelectorAll('[data-src], .lazy-section');
    lazyElements.forEach(element => intersectionObserver.current?.observe(element));

    // Initialize performance tracking
    trackWebVitals();
    
    // Initialize mobile optimizations
    optimizeMobilePerformance();

    // Cleanup
    return () => {
      performanceObserver.current?.disconnect();
      intersectionObserver.current?.disconnect();
    };
  }, [enableLayoutOptimization, enableResourceHints, trackWebVitals, optimizeMobilePerformance]);

  // Critical CSS injection for above-the-fold content
  const criticalCSS = enableCriticalCSS ? `
    <style id="critical-css">
      /* Above-the-fold critical styles */
      .hero-section {
        background: linear-gradient(135deg, #f0f9ff 0%, #ecfdf5 100%);
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .container-max {
        max-width: 1280px;
        margin: 0 auto;
        padding: 0 1rem;
      }
      
      .btn-primary {
        background: linear-gradient(135deg, #2563eb, #16a34a);
        color: white;
        padding: 1rem 2rem;
        border-radius: 0.5rem;
        font-weight: 600;
        border: none;
        cursor: pointer;
        transition: transform 0.2s ease;
      }
      
      .btn-primary:hover {
        transform: translateY(-2px);
      }
      
      /* Prevent layout shift */
      img {
        height: auto;
        max-width: 100%;
      }
      
      /* Optimize font rendering */
      body {
        font-family: 'Inter', system-ui, -apple-system, sans-serif;
        font-display: swap;
      }
      
      .fonts-loaded {
        font-family: 'Inter var', system-ui, -apple-system, sans-serif;
      }
      
      /* Loading states */
      .loading-skeleton {
        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
        background-size: 200% 100%;
        animation: loading 1.5s infinite;
      }
      
      @keyframes loading {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }
      
      /* Mobile optimizations */
      @media (max-width: 768px) {
        .hero-section {
          min-height: 80vh;
          padding: 2rem 0;
        }
        
        .container-max {
          padding: 0 0.75rem;
        }
      }
    </style>
  ` : '';

  return (
    <>
      {enableCriticalCSS && (
        <div dangerouslySetInnerHTML={{ __html: criticalCSS }} />
      )}
      
      {/* Performance monitoring script */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            // Core Web Vitals monitoring
            if ('web-vital' in window) {
              import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
                getCLS(console.log);
                getFID(console.log);
                getFCP(console.log);
                getLCP(console.log);
                getTTFB(console.log);
              });
            }
            
            // Optimize scroll performance
            let ticking = false;
            function updateScrollPosition() {
              // Batch scroll-based animations
              if (!ticking) {
                requestAnimationFrame(() => {
                  // Handle scroll-based effects here
                  ticking = false;
                });
                ticking = true;
              }
            }
            
            window.addEventListener('scroll', updateScrollPosition, { passive: true });
            
            // Service Worker registration for caching
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                  .then(registration => console.log('SW registered'))
                  .catch(error => console.log('SW registration failed'));
              });
            }
          `
        }}
      />
    </>
  );
}

// Performance utility functions
export const performanceUtils = {
  // Lazy load images
  lazyLoadImage: (img: HTMLImageElement, src: string) => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            img.src = src;
            img.classList.remove('loading-skeleton');
            observer.unobserve(img);
          }
        });
      },
      { rootMargin: '50px 0px' }
    );
    
    observer.observe(img);
  },

  // Preload critical resources
  preloadResource: (href: string, as: 'script' | 'style' | 'image' | 'font') => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = as;
    link.href = href;
    if (as === 'font') {
      link.crossOrigin = 'anonymous';
    }
    document.head.appendChild(link);
  },

  // Optimize third-party scripts
  loadScriptAsync: (src: string, callback?: () => void) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.defer = true;
    if (callback) {
      script.onload = callback;
    }
    document.head.appendChild(script);
  },

  // Measure performance
  measurePerformance: (name: string, fn: () => void) => {
    const start = performance.now();
    fn();
    const end = performance.now();
    console.log(`${name} took ${end - start} milliseconds`);
  }
};