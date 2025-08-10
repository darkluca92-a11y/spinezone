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

    // Detect mobile device with more comprehensive check
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
                     (window.innerWidth <= 768 && 'ontouchstart' in window);
    const isSlowDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
    
    if (isMobile) {
      // Enhanced touch scrolling optimization
      document.documentElement.style.setProperty('-webkit-overflow-scrolling', 'touch');
      document.documentElement.style.setProperty('scroll-behavior', 'smooth');
      
      // Prevent zoom on input focus for iOS with better viewport handling
      const metaViewport = document.querySelector('meta[name="viewport"]') as HTMLMetaElement;
      if (metaViewport) {
        metaViewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover, interactive-widget=resizes-content';
      }
      
      // Advanced scroll performance optimization
      let scrollTimeout: NodeJS.Timeout;
      let isScrolling = false;
      
      const optimizeScroll = () => {
        if (!isScrolling) {
          isScrolling = true;
          document.body.classList.add('is-scrolling');
          requestAnimationFrame(() => {
            // Batch DOM updates during scroll
            const scrollTop = window.pageYOffset;
            document.documentElement.style.setProperty('--scroll-y', `${scrollTop}px`);
          });
        }
        
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          isScrolling = false;
          document.body.classList.remove('is-scrolling');
        }, 150);
      };
      
      window.addEventListener('scroll', optimizeScroll, { passive: true });
      
      // Touch interaction optimizations
      const optimizeTouchInteractions = () => {
        // Add touch-action optimization for better scroll performance
        const touchElements = document.querySelectorAll('button, a, [role="button"], .btn, .cta');
        touchElements.forEach(el => {
          (el as HTMLElement).style.touchAction = 'manipulation';
        });
        
        // Optimize button hover states for touch
        const style = document.createElement('style');
        style.textContent = `
          @media (hover: none) and (pointer: coarse) {
            button:hover, .btn:hover, a:hover {
              transform: none;
            }
            .hover\:scale-105:hover {
              transform: none;
            }
          }
        `;
        document.head.appendChild(style);
      };
      
      // Reduce animation complexity based on device performance
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (!mediaQuery.matches && !isSlowDevice) {
        document.documentElement.style.setProperty('--animation-duration', '0.2s');
        document.documentElement.style.setProperty('--transition-timing', 'cubic-bezier(0.4, 0.0, 0.2, 1)');
      } else {
        // Disable complex animations on slow devices
        document.documentElement.style.setProperty('--animation-duration', '0s');
        document.documentElement.style.setProperty('--transition-duration', '0.1s');
      }
      
      // Memory and battery optimizations for mobile
      const optimizeMobileResources = () => {
        // Limit concurrent network requests on mobile
        const originalFetch = window.fetch;
        let activeRequests = 0;
        const maxConcurrentRequests = isMobile ? 4 : 8;
        
        window.fetch = async (...args) => {
          while (activeRequests >= maxConcurrentRequests) {
            await new Promise(resolve => setTimeout(resolve, 50));
          }
          activeRequests++;
          try {
            return await originalFetch(...args);
          } finally {
            activeRequests--;
          }
        };
        
        // Optimize image loading for mobile
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
          if (img.hasAttribute('data-mobile-optimized')) return;
          
          const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                const image = entry.target as HTMLImageElement;
                // Reduce image quality slightly on mobile for faster loading
                if (image.src.includes('unsplash.com')) {
                  const url = new URL(image.src);
                  url.searchParams.set('q', '75'); // Reduce quality from default 80 to 75
                  image.src = url.toString();
                }
                image.setAttribute('data-mobile-optimized', 'true');
                observer.unobserve(image);
              }
            });
          }, { rootMargin: '50px' });
          
          observer.observe(img);
        });
      };
      
      // Apply mobile-specific optimizations
      optimizeTouchInteractions();
      optimizeMobileResources();
      
      // Core Web Vitals specific optimizations for mobile
      const optimizeCoreWebVitals = () => {
        // Optimize LCP by prioritizing above-the-fold images
        const heroImages = document.querySelectorAll('img[data-priority], .hero img, section:first-child img');
        heroImages.forEach(img => {
          (img as HTMLImageElement).loading = 'eager';
          (img as HTMLImageElement).fetchPriority = 'high';
        });
        
        // Optimize CLS by ensuring layout stability
        const preventLayoutShift = () => {
          const observer = new ResizeObserver(entries => {
            // Minimize layout shifts during dynamic content loading
            entries.forEach(entry => {
              if (entry.target.classList.contains('lazy-section')) {
                entry.target.setAttribute('data-stable-size', 'true');
              }
            });
          });
          
          document.querySelectorAll('.lazy-section').forEach(el => {
            observer.observe(el);
          });
        };
        
        preventLayoutShift();
      };
      
      // Apply Core Web Vitals optimizations after DOM is ready
      if (document.readyState === 'complete') {
        optimizeCoreWebVitals();
      } else {
        window.addEventListener('load', optimizeCoreWebVitals);
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
      
      /* Enhanced mobile optimizations */
      @media (max-width: 768px) {
        .hero-section {
          min-height: 80vh;
          padding: 2rem 0;
        }
        
        .container-max {
          padding: 0 0.75rem;
        }
        
        /* Optimize scroll performance */
        .is-scrolling {
          pointer-events: none;
        }
        
        .is-scrolling * {
          animation-play-state: paused;
        }
        
        /* Touch-optimized button sizing */
        button, .btn, a[role="button"] {
          min-height: 44px;
          min-width: 44px;
          touch-action: manipulation;
        }
        
        /* Reduce animation complexity on mobile */
        @media (prefers-reduced-motion: no-preference) {
          * {
            animation-duration: var(--animation-duration, 0.2s) !important;
            transition-duration: var(--transition-duration, 0.2s) !important;
          }
        }
        
        /* Optimize for mobile viewport */
        .viewport-section {
          will-change: transform;
        }
        
        /* Prevent horizontal scroll issues */
        body {
          overflow-x: hidden;
        }
        
        /* Optimize form inputs for mobile */
        input, textarea, select {
          font-size: 16px; /* Prevent zoom on iOS */
          border-radius: 8px;
          padding: 12px;
        }
        
        /* Mobile-specific loading states */
        .loading-skeleton {
          animation-duration: 1s;
        }
      }
      
      /* High DPI mobile displays */
      @media (max-width: 768px) and (-webkit-min-device-pixel-ratio: 2) {
        .hero-section {
          background-size: cover;
          background-attachment: scroll; /* Better performance than fixed */
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
            // Enhanced Core Web Vitals monitoring with mobile focus
            if (typeof window !== 'undefined') {
              const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
              
              import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB, onINP }) => {
                const logMetric = (metric) => {
                  // Log with mobile context for better debugging
                  console.log(`${metric.name}: ${metric.value} (${isMobile ? 'Mobile' : 'Desktop'})`);
                  
                  // Send to analytics in production
                  if (typeof gtag !== 'undefined') {
                    gtag('event', metric.name, {
                      value: metric.value,
                      metric_id: metric.id,
                      custom_parameter_device: isMobile ? 'mobile' : 'desktop'
                    });
                  }
                };
                
                getCLS(logMetric);
                getFID(logMetric);
                getFCP(logMetric);
                getLCP(logMetric);
                getTTFB(logMetric);
                
                // Monitor Interaction to Next Paint for mobile responsiveness
                if (onINP) {
                  onINP(logMetric);
                }
              });
            }
            
            // Enhanced scroll performance optimization
            let ticking = false;
            let scrollTimeout;
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            
            function updateScrollPosition() {
              if (!ticking) {
                requestAnimationFrame(() => {
                  // Update scroll-based effects with mobile optimizations
                  const scrollY = window.pageYOffset;
                  
                  // Only update CSS custom properties if needed
                  if (scrollY % 10 === 0 || !isMobile) {
                    document.documentElement.style.setProperty('--scroll-y', scrollY + 'px');
                  }
                  
                  // Handle viewport sections visibility for mobile
                  const viewportSections = document.querySelectorAll('.viewport-section');
                  viewportSections.forEach(section => {
                    const rect = section.getBoundingClientRect();
                    const threshold = parseFloat(section.dataset.viewportThreshold || '0.1');
                    const isVisible = rect.top < window.innerHeight * (1 - threshold) && 
                                    rect.bottom > window.innerHeight * threshold;
                    
                    if (isVisible && !section.classList.contains('in-viewport')) {
                      section.classList.add('in-viewport');
                    }
                  });
                  
                  ticking = false;
                });
                ticking = true;
              }
            }
            
            // Throttle scroll events more aggressively on mobile
            const scrollThrottle = isMobile ? 16 : 8; // 60fps vs 120fps
            let lastScrollTime = 0;
            
            function throttledScrollHandler() {
              const now = Date.now();
              if (now - lastScrollTime >= scrollThrottle) {
                updateScrollPosition();
                lastScrollTime = now;
              }
            }
            
            window.addEventListener('scroll', throttledScrollHandler, { passive: true });
            
            // Enhanced Service Worker registration with mobile optimizations
            if ('serviceWorker' in navigator && 'caches' in window) {
              window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                  .then(registration => {
                    console.log('SW registered');
                    
                    // Pre-cache critical resources for mobile
                    if ('connection' in navigator) {
                      const connection = navigator.connection;
                      if (connection && connection.effectiveType && 
                          ['4g', 'wifi'].includes(connection.effectiveType)) {
                        // Pre-cache on good connections
                        caches.open('spinezone-mobile-v1').then(cache => {
                          cache.addAll([
                            '/',
                            '/services',
                            '/assessment',
                            '/contact',
                            '/treatment-journey'
                          ]);
                        });
                      }
                    }
                  })
                  .catch(error => console.log('SW registration failed'));
              });
            }
            
            // Mobile-specific resource hints
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
              // Prefetch likely next pages on mobile with good connection
              if ('connection' in navigator && navigator.connection) {
                const connection = navigator.connection;
                if (connection.effectiveType === '4g' || connection.type === 'wifi') {
                  const prefetchPages = ['/services', '/assessment', '/contact'];
                  prefetchPages.forEach(page => {
                    const link = document.createElement('link');
                    link.rel = 'prefetch';
                    link.href = page;
                    document.head.appendChild(link);
                  });
                }
              }
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