'use client';

import { useEffect } from 'react';

// Enhanced Web Vitals tracking for SEO performance monitoring
export default function WebVitalsOptimizer() {
  useEffect(() => {
    // Custom Web Vitals tracking using PerformanceObserver
    const trackWebVitals = () => {
      // Track Cumulative Layout Shift (CLS)
      if ('PerformanceObserver' in window) {
        try {
          const clsObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              const layoutShiftEntry = entry as any; // Type assertion for CLS-specific properties
              if (!layoutShiftEntry.hadRecentInput) {
                const cls = layoutShiftEntry.value;
                if (process.env.NODE_ENV === 'development') {
                  console.log('CLS:', cls);
                }
                
                // Send to analytics if available
                if (typeof gtag !== 'undefined') {
                  gtag('event', 'web_vitals', {
                    event_category: 'Web Vitals',
                    event_action: 'CLS',
                    event_value: Math.round(cls * 1000),
                  });
                }
              }
            }
          });
          clsObserver.observe({ type: 'layout-shift', buffered: true });
        } catch (e) {
          console.warn('CLS tracking not supported');
        }

        // Track Largest Contentful Paint (LCP)
        try {
          const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            const lcp = lastEntry.startTime;
            
            if (process.env.NODE_ENV === 'development') {
              console.log('LCP:', lcp);
            }
            
            if (typeof gtag !== 'undefined') {
              gtag('event', 'web_vitals', {
                event_category: 'Web Vitals',
                event_action: 'LCP',
                event_value: Math.round(lcp),
              });
            }
          });
          lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
        } catch (e) {
          console.warn('LCP tracking not supported');
        }

        // Track First Input Delay (FID)
        try {
          const fidObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              const fidEntry = entry as any; // Type assertion for FID-specific properties
              const fid = fidEntry.processingStart - fidEntry.startTime;
              
              if (process.env.NODE_ENV === 'development') {
                console.log('FID:', fid);
              }
              
              if (typeof gtag !== 'undefined') {
                gtag('event', 'web_vitals', {
                  event_category: 'Web Vitals',
                  event_action: 'FID',
                  event_value: Math.round(fid),
                });
              }
            }
          });
          fidObserver.observe({ type: 'first-input', buffered: true });
        } catch (e) {
          console.warn('FID tracking not supported');
        }
      }
    };

    trackWebVitals();

    // Performance optimization techniques
    const optimizeForSEO = () => {
      // Preload critical resources
      const criticalResources = [
        '/spinezone-logo.png',
        'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap'
      ];

      criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        if (resource.includes('font')) {
          link.as = 'style';
        } else if (resource.includes('.png') || resource.includes('.jpg')) {
          link.as = 'image';
        }
        document.head.appendChild(link);
      });

      // Optimize images for better Core Web Vitals
      const images = document.querySelectorAll('img');
      images.forEach(img => {
        if (!img.getAttribute('loading')) {
          // Add lazy loading to non-critical images
          if (img.getBoundingClientRect().top > window.innerHeight) {
            img.setAttribute('loading', 'lazy');
          }
        }
        
        // Add decoding async for better rendering
        if (!img.getAttribute('decoding')) {
          img.setAttribute('decoding', 'async');
        }
      });

      // Preconnect to external domains for better TTFB
      const externalDomains = [
        'https://images.unsplash.com',
        'https://fonts.gstatic.com',
        'https://www.google-analytics.com'
      ];

      externalDomains.forEach(domain => {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = domain;
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
      });
    };

    // Run optimizations after initial load
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', optimizeForSEO);
    } else {
      optimizeForSEO();
    }

  }, []);

  return null; // This component doesn't render anything
}

declare global {
  function gtag(...args: any[]): void;
}