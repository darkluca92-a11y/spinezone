// Performance utilities for Core Web Vitals optimization

/**
 * Lazy loading utilities for better LCP and reduced bundle size
 */
export const lazyUtils = {
  // Create intersection observer for lazy loading
  createIntersectionObserver: (
    callback: IntersectionObserverCallback,
    options: IntersectionObserverInit = {}
  ) => {
    const defaultOptions = {
      rootMargin: '100px 0px',
      threshold: [0, 0.1, 0.5, 1],
      ...options,
    };
    
    return new IntersectionObserver(callback, defaultOptions);
  },

  // Lazy load images with WebP/AVIF support
  lazyLoadImage: (
    img: HTMLImageElement,
    sources: { avif?: string; webp?: string; fallback: string }
  ) => {
    const picture = document.createElement('picture');
    
    // AVIF source
    if (sources.avif) {
      const avifSource = document.createElement('source');
      avifSource.srcset = sources.avif;
      avifSource.type = 'image/avif';
      picture.appendChild(avifSource);
    }
    
    // WebP source
    if (sources.webp) {
      const webpSource = document.createElement('source');
      webpSource.srcset = sources.webp;
      webpSource.type = 'image/webp';
      picture.appendChild(webpSource);
    }
    
    // Replace img with picture element
    img.src = sources.fallback;
    picture.appendChild(img);
    
    return picture;
  },

  // Preload critical resources
  preloadResource: (href: string, as: string, type?: string, crossorigin?: boolean) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = as;
    
    if (type) link.type = type;
    if (crossorigin) link.crossOrigin = 'anonymous';
    
    document.head.appendChild(link);
    return link;
  },
};

/**
 * Bundle size optimization utilities
 */
export const bundleUtils = {
  // Dynamic import with error handling
  dynamicImport: async <T>(
    importFn: () => Promise<T>,
    fallback?: T,
    retries: number = 3
  ): Promise<T | undefined> => {
    for (let i = 0; i < retries; i++) {
      try {
        return await importFn();
      } catch (error) {
        console.warn(`Dynamic import failed (attempt ${i + 1}/${retries}):`, error);
        if (i === retries - 1) {
          return fallback;
        }
      }
    }
  },

  // Tree shake unused Lodash functions (example)
  loadLodashFunction: async (functionName: string) => {
    return await import(`lodash/${functionName}`);
  },

  // Load only needed chart types from Recharts
  loadRechartsComponent: async (componentName: string) => {
    return await import(`recharts/es6/component/${componentName}`);
  },
};

/**
 * Core Web Vitals measurement and optimization
 */
export const webVitalsUtils = {
  // Measure and report Core Web Vitals
  measureWebVitals: () => {
    if (typeof window === 'undefined') return;

    // Measure LCP
    const lcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      console.log('LCP:', lastEntry.startTime);
      
      // In production, send to analytics
      if (process.env.NODE_ENV === 'production') {
        // analytics.track('Core Web Vital', { metric: 'LCP', value: lastEntry.startTime });
      }
    });
    
    try {
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
    } catch (e) {
      console.warn('LCP observer not supported');
    }

    // Measure CLS
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (!(entry as any).hadRecentInput) {
          clsValue += (entry as any).value;
        }
      }
      console.log('CLS:', clsValue);
    });
    
    try {
      clsObserver.observe({ type: 'layout-shift', buffered: true });
    } catch (e) {
      console.warn('CLS observer not supported');
    }

    // Measure FID
    const fidObserver = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        const fid = (entry as any).processingStart - entry.startTime;
        console.log('FID:', fid);
      }
    });
    
    try {
      fidObserver.observe({ type: 'first-input', buffered: true });
    } catch (e) {
      console.warn('FID observer not supported');
    }
  },

  // Optimize images for better LCP
  optimizeImageLoading: (selector: string = 'img[data-src]') => {
    const images = document.querySelectorAll(selector) as NodeListOf<HTMLImageElement>;
    
    const imageObserver = lazyUtils.createIntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          const dataSrc = img.dataset.src;
          
          if (dataSrc) {
            img.src = dataSrc;
            img.removeAttribute('data-src');
            img.classList.add('fade-in');
            imageObserver.unobserve(img);
          }
        }
      });
    });
    
    images.forEach((img) => imageObserver.observe(img));
    
    return imageObserver;
  },

  // Prevent layout shifts
  preventLayoutShifts: () => {
    // Set explicit dimensions for images
    const images = document.querySelectorAll('img:not([width]):not([height])') as NodeListOf<HTMLImageElement>;
    images.forEach((img) => {
      if (img.naturalWidth && img.naturalHeight) {
        img.style.aspectRatio = `${img.naturalWidth} / ${img.naturalHeight}`;
      }
    });
    
    // Reserve space for dynamic content
    const dynamicSections = document.querySelectorAll('[data-min-height]') as NodeListOf<HTMLElement>;
    dynamicSections.forEach((section) => {
      const minHeight = section.dataset.minHeight;
      if (minHeight) {
        section.style.minHeight = minHeight;
      }
    });
  },
};

/**
 * Mobile performance optimization utilities
 */
export const mobileUtils = {
  // Detect mobile device
  isMobile: () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  },

  // Optimize for mobile performance
  optimizeMobilePerformance: () => {
    if (!mobileUtils.isMobile()) return;

    // Reduce animation complexity on mobile
    const root = document.documentElement;
    root.style.setProperty('--animation-duration', '0.2s');
    root.style.setProperty('--transition-duration', '0.15s');

    // Optimize scroll performance
    let ticking = false;
    const optimizeScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          // Handle scroll-based optimizations
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', optimizeScroll, { passive: true });

    // Prevent zoom on input focus (iOS)
    const viewport = document.querySelector('meta[name="viewport"]') as HTMLMetaElement;
    if (viewport && /iPhone|iPad|iPod|iOS/.test(navigator.userAgent)) {
      viewport.content = viewport.content + ', user-scalable=no';
    }
  },

  // Optimize touch interactions
  optimizeTouchInteractions: () => {
    // Add touch-action optimization
    const touchElements = document.querySelectorAll('button, a, [role="button"]') as NodeListOf<HTMLElement>;
    touchElements.forEach((element) => {
      element.style.touchAction = 'manipulation';
    });

    // Optimize tap highlights
    const style = document.createElement('style');
    style.textContent = `
      * {
        -webkit-tap-highlight-color: transparent;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }
      
      input, textarea, [contenteditable] {
        -webkit-user-select: auto;
        -khtml-user-select: auto;
        -moz-user-select: auto;
        -ms-user-select: auto;
        user-select: auto;
      }
    `;
    document.head.appendChild(style);
  },
};

/**
 * Resource optimization utilities
 */
export const resourceUtils = {
  // Preconnect to external domains
  preconnectToDomain: (domain: string, crossorigin: boolean = false) => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = domain;
    if (crossorigin) link.crossOrigin = 'anonymous';
    
    document.head.appendChild(link);
  },

  // DNS prefetch for external resources
  dnsPrefetch: (domain: string) => {
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = domain;
    
    document.head.appendChild(link);
  },

  // Prefetch next likely navigation
  prefetchRoute: (route: string) => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = route;
    
    document.head.appendChild(link);
  },

  // Load non-critical CSS asynchronously
  loadCSSAsync: (href: string, media: string = 'all') => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'style';
    link.href = href;
    link.onload = () => {
      link.rel = 'stylesheet';
      link.media = media;
    };
    
    document.head.appendChild(link);
  },
};

/**
 * Cache and service worker utilities
 */
export const cacheUtils = {
  // Register service worker
  registerServiceWorker: async (swPath: string = '/sw.js') => {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register(swPath);
        console.log('Service Worker registered:', registration);
        
        // Handle updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New version available
                console.log('New version available');
                // Show update notification to user
              }
            });
          }
        });
        
        return registration;
      } catch (error) {
        console.error('Service Worker registration failed:', error);
      }
    }
  },

  // Clear old caches
  clearOldCaches: async (currentVersion: string) => {
    if ('caches' in window) {
      const cacheNames = await caches.keys();
      const oldCaches = cacheNames.filter(name => !name.includes(currentVersion));
      
      await Promise.all(oldCaches.map(name => caches.delete(name)));
      console.log('Old caches cleared:', oldCaches);
    }
  },
};

/**
 * Initialize all performance optimizations
 */
export const initializePerformanceOptimizations = () => {
  // Measure Web Vitals
  webVitalsUtils.measureWebVitals();
  
  // Optimize mobile performance
  mobileUtils.optimizeMobilePerformance();
  mobileUtils.optimizeTouchInteractions();
  
  // Prevent layout shifts
  webVitalsUtils.preventLayoutShifts();
  
  // Optimize image loading
  webVitalsUtils.optimizeImageLoading();
  
  // Register service worker
  cacheUtils.registerServiceWorker();
  
  // Preconnect to external domains
  resourceUtils.preconnectToDomain('https://fonts.googleapis.com');
  resourceUtils.preconnectToDomain('https://fonts.gstatic.com', true);
  resourceUtils.dnsPrefetch('https://images.unsplash.com');
  
  console.log('Performance optimizations initialized');
};

/**
 * Performance monitoring and reporting
 */
export const performanceMonitor = {
  // Track custom metrics
  trackMetric: (name: string, value: number, unit: string = 'ms') => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`Performance Metric - ${name}: ${value}${unit}`);
    }
    
    // In production, send to analytics service
    // analytics.track('Performance Metric', { name, value, unit });
  },

  // Measure component render time
  measureComponentRender: (componentName: string, renderFn: () => void) => {
    const start = performance.now();
    renderFn();
    const end = performance.now();
    
    performanceMonitor.trackMetric(`${componentName} Render Time`, end - start);
  },

  // Monitor bundle size
  trackBundleSize: () => {
    if ('performance' in window && 'getEntriesByType' in performance) {
      const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
      
      let totalJSSize = 0;
      let totalCSSSize = 0;
      
      resources.forEach(resource => {
        if (resource.name.endsWith('.js')) {
          totalJSSize += resource.transferSize || 0;
        } else if (resource.name.endsWith('.css')) {
          totalCSSSize += resource.transferSize || 0;
        }
      });
      
      performanceMonitor.trackMetric('Total JS Bundle Size', totalJSSize, 'bytes');
      performanceMonitor.trackMetric('Total CSS Bundle Size', totalCSSSize, 'bytes');
    }
  },
};