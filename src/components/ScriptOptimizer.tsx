'use client';

import { useEffect, memo, useState, useCallback } from 'react';
import Script from 'next/script';

// Script loading configurations for external integrations
interface ExternalScript {
  id: string;
  src: string;
  strategy: 'eager' | 'lazy' | 'idle' | 'interaction';
  priority: 'critical' | 'high' | 'normal' | 'low';
  defer?: boolean;
  async?: boolean;
  crossOrigin?: string;
  integrity?: string;
  condition?: () => boolean;
  onLoad?: () => void;
  onError?: () => void;
}

const EXTERNAL_SCRIPTS: ExternalScript[] = [
  // Google Maps - Load on interaction for better performance
  {
    id: 'google-maps',
    src: `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places&callback=initGoogleMaps`,
    strategy: 'interaction',
    priority: 'high',
    defer: true,
    condition: () => !!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    onLoad: () => {
      console.log('✅ Google Maps API loaded');
      (window as any).googleMapsReady = true;
    },
    onError: () => {
      console.error('❌ Google Maps API failed to load');
      (window as any).googleMapsError = true;
    }
  },
  
  // Calendly Widget - Load lazily when needed
  {
    id: 'calendly-widget',
    src: 'https://assets.calendly.com/assets/external/widget.js',
    strategy: 'lazy',
    priority: 'normal',
    async: true,
    crossOrigin: 'anonymous',
    onLoad: () => {
      console.log('✅ Calendly widget loaded');
      (window as any).calendlyLoaded = true;
    },
    onError: () => console.error('❌ Calendly widget failed to load')
  },

  // Vapi AI - Load on interaction
  {
    id: 'vapi-sdk',
    src: 'https://cdn.vapi.ai/web/v1/web-sdk.js',
    strategy: 'interaction',
    priority: 'normal',
    async: true,
    crossOrigin: 'anonymous',
    condition: () => !!process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY,
    onLoad: () => {
      console.log('✅ Vapi AI SDK loaded');
      (window as any).vapiReady = true;
    },
    onError: () => console.error('❌ Vapi AI SDK failed to load')
  },

  // Analytics - Load when idle
  {
    id: 'google-analytics',
    src: `https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`,
    strategy: 'idle',
    priority: 'low',
    async: true,
    condition: () => !!process.env.NEXT_PUBLIC_GA_ID && process.env.NODE_ENV === 'production',
    onLoad: () => {
      // Initialize GA after loading
      (window as any).dataLayer = (window as any).dataLayer || [];
      function gtag(...args: any[]) { (window as any).dataLayer.push(arguments); }
      (window as any).gtag = gtag;
      gtag('js', new Date());
      gtag('config', process.env.NEXT_PUBLIC_GA_ID);
      console.log('✅ Google Analytics initialized');
    }
  }
];

// Performance-optimized script loading component
const ScriptOptimizer = memo(function ScriptOptimizer() {
  const [hasInteracted, setHasInteracted] = useState(false);
  const [loadedScripts, setLoadedScripts] = useState<Set<string>>(new Set());
  
  // Track user interaction for lazy loading
  useEffect(() => {
    const handleInteraction = () => {
      setHasInteracted(true);
      // Remove listeners after first interaction
      ['mousedown', 'touchstart', 'keydown', 'scroll'].forEach(event => {
        document.removeEventListener(event as keyof DocumentEventMap, handleInteraction);
      });
    };

    ['mousedown', 'touchstart', 'keydown', 'scroll'].forEach(event => {
      document.addEventListener(event as keyof DocumentEventMap, handleInteraction, { passive: true, once: true });
    });

    return () => {
      ['mousedown', 'touchstart', 'keydown', 'scroll'].forEach(event => {
        document.removeEventListener(event as keyof DocumentEventMap, handleInteraction);
      });
    };
  }, []);
  
  // Enhanced script preloading with intelligent prioritization
  useEffect(() => {
    const preloadCriticalScripts = () => {
      // Preload high-priority external scripts
      EXTERNAL_SCRIPTS
        .filter(script => script.priority === 'high' && (!script.condition || script.condition()))
        .forEach(script => {
          const link = document.createElement('link');
          link.rel = 'preload';
          link.as = 'script';
          link.href = script.src;
          if (script.crossOrigin) link.crossOrigin = script.crossOrigin;
          document.head.appendChild(link);
        });

      // Preload critical chunks
      const criticalChunks = [
        '/_next/static/chunks/framework.js',
        '/_next/static/chunks/main.js',
        '/_next/static/chunks/pages/_app.js',
      ];
      
      criticalChunks.forEach(src => {
        if (!document.querySelector(`link[href="${src}"]`)) {
          const link = document.createElement('link');
          link.rel = 'preload';
          link.as = 'script';
          link.href = src;
          document.head.appendChild(link);
        }
      });
    };

    const preloadNonCriticalScripts = () => {
      const nonCriticalChunks = [
        '/_next/static/chunks/framer-motion.js',
        '/_next/static/chunks/appointments.js',
        '/_next/static/chunks/animations.js',
      ];
      
      nonCriticalChunks.forEach(src => {
        if (!document.querySelector(`link[href="${src}"]`)) {
          const link = document.createElement('link');
          link.rel = 'prefetch'; // Use prefetch for non-critical resources
          link.as = 'script';
          link.href = src;
          document.head.appendChild(link);
        }
      });
    };
    
    // Load critical scripts immediately
    preloadCriticalScripts();
    
    // Use requestIdleCallback for non-critical scripts
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(preloadNonCriticalScripts, { timeout: 3000 });
    } else {
      setTimeout(preloadNonCriticalScripts, 2000);
    }
  }, []);

  // Handle script loading based on strategy
  const shouldLoadScript = useCallback((script: ExternalScript): boolean => {
    // Check if already loaded
    if (loadedScripts.has(script.id)) return false;
    
    // Check condition
    if (script.condition && !script.condition()) return false;

    // Check strategy
    switch (script.strategy) {
      case 'eager': return true;
      case 'interaction': return hasInteracted;
      case 'lazy': return true; // Will be loaded via Script component
      case 'idle': return true; // Will be loaded via Script component
      default: return true;
    }
  }, [hasInteracted, loadedScripts]);

  const handleScriptLoad = useCallback((scriptId: string) => {
    setLoadedScripts(prev => {
      const newSet = new Set(prev);
      newSet.add(scriptId);
      return newSet;
    });
  }, []);

  // Initialize Google Maps callback
  useEffect(() => {
    (window as any).initGoogleMaps = () => {
      console.log('🗺️ Google Maps initialized');
      (window as any).googleMapsInitialized = true;
    };
  }, []);

  return (
    <>
      {/* Enhanced Service Worker registration with better error handling */}
      <Script
        id="sw-registration"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            if ('serviceWorker' in navigator && 'caches' in window) {
              window.addEventListener('load', async () => {
                try {
                  const registration = await navigator.serviceWorker.register('/sw.js', {
                    scope: '/',
                    updateViaCache: 'none'
                  });
                  
                  console.log('✅ Service Worker registered:', registration.scope);
                  
                  // Handle updates
                  registration.addEventListener('updatefound', () => {
                    console.log('🔄 Service Worker update found');
                  });
                  
                } catch (error) {
                  console.warn('❌ Service Worker registration failed:', error);
                }
              });
            }
          `,
        }}
      />

      {/* Dynamically load external scripts based on strategy */}
      {EXTERNAL_SCRIPTS.map(script => {
        if (!shouldLoadScript(script)) return null;

        const getNextScriptStrategy = () => {
          switch (script.strategy) {
            case 'eager': return 'beforeInteractive';
            case 'interaction': return hasInteracted ? 'afterInteractive' : undefined;
            case 'lazy': return 'lazyOnload';
            case 'idle': return 'lazyOnload';
            default: return 'afterInteractive';
          }
        };

        const strategy = getNextScriptStrategy();
        if (!strategy) return null;

        return (
          <Script
            key={script.id}
            id={script.id}
            src={script.src}
            strategy={strategy as any}
            defer={script.defer}
            onLoad={() => {
              handleScriptLoad(script.id);
              if (script.onLoad) script.onLoad();
            }}
            onError={() => {
              console.error(`❌ Failed to load script: ${script.id}`);
              if (script.onError) script.onError();
            }}
            {...(script.crossOrigin && { crossOrigin: script.crossOrigin as 'anonymous' | 'use-credentials' })}
            {...(script.integrity && { integrity: script.integrity })}
          />
        );
      })}
      
      {/* Enhanced performance monitoring with Core Web Vitals */}
      <Script
        id="performance-monitor"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            // Enhanced Core Web Vitals reporting
            const vitalsReporter = (metric) => {
              // Report to console in development
              if (${process.env.NODE_ENV === 'development'}) {
                console.log('📊 Web Vital:', metric.name, Math.round(metric.value), metric.rating);
              }
              
              // Report to analytics in production
              if (typeof gtag !== 'undefined' && ${process.env.NODE_ENV === 'production'}) {
                gtag('event', 'web_vitals', {
                  event_category: 'Web Vitals',
                  event_label: metric.name,
                  value: Math.round(metric.value),
                  rating: metric.rating,
                  non_interaction: true,
                });
              }

              // Store for performance dashboard
              if (!window.performanceMetrics) window.performanceMetrics = {};
              window.performanceMetrics[metric.name] = {
                value: metric.value,
                rating: metric.rating,
                timestamp: Date.now()
              };
            };
            
            // Monitor resource loading performance
            const monitorResourcePerformance = () => {
              const observer = new PerformanceObserver((list) => {
                list.getEntries().forEach(entry => {
                  if (entry.name.includes('calendly.com') || 
                      entry.name.includes('googleapis.com') || 
                      entry.name.includes('vapi.ai')) {
                    
                    const duration = entry.responseEnd - entry.startTime;
                    console.log('🔗 External Resource:', {
                      name: entry.name.split('/').pop(),
                      domain: new URL(entry.name).hostname,
                      duration: Math.round(duration),
                      size: entry.transferSize || 0
                    });

                    // Report slow external resources
                    if (duration > 3000 && typeof gtag !== 'undefined') {
                      gtag('event', 'slow_external_resource', {
                        resource_url: entry.name,
                        duration: Math.round(duration)
                      });
                    }
                  }
                });
              });
              
              try {
                observer.observe({ entryTypes: ['resource'] });
              } catch (e) {
                console.warn('Performance monitoring not available:', e);
              }
            };
            
            // Load web-vitals library dynamically
            const loadWebVitals = async () => {
              try {
                const webVitals = await import('https://unpkg.com/web-vitals@3/dist/web-vitals.js');
                webVitals.getCLS(vitalsReporter);
                webVitals.getFID(vitalsReporter);
                webVitals.getLCP(vitalsReporter);
                webVitals.getFCP(vitalsReporter);
                webVitals.getTTFB(vitalsReporter);
                webVitals.getINP(vitalsReporter);
                
                // Start resource monitoring
                monitorResourcePerformance();
                
                console.log('✅ Performance monitoring initialized');
              } catch (err) {
                console.warn('Performance monitoring failed to load:', err);
              }
            };
            
            // Load after critical rendering
            if (document.readyState === 'complete') {
              loadWebVitals();
            } else {
              window.addEventListener('load', loadWebVitals);
            }
          `,
        }}
      />
      
      {/* Modern browser feature detection and polyfills */}
      <Script
        id="feature-detection"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            // Feature detection and polyfill loading
            const missingFeatures = [];
            
            if (!('IntersectionObserver' in window)) {
              missingFeatures.push('IntersectionObserver');
            }
            if (!('ResizeObserver' in window)) {
              missingFeatures.push('ResizeObserver');
            }
            if (!('fetch' in window)) {
              missingFeatures.push('fetch');
            }
            
            // Load polyfills if needed
            if (missingFeatures.length > 0) {
              const polyfillScript = document.createElement('script');
              polyfillScript.src = 'https://polyfill.io/v3/polyfill.min.js?features=' + 
                missingFeatures.join(',');
              polyfillScript.async = true;
              polyfillScript.onload = () => {
                console.log('✅ Polyfills loaded for:', missingFeatures);
              };
              document.head.appendChild(polyfillScript);
            }
          `,
        }}
      />
      
      {/* Integration health monitoring script */}
      <Script
        id="integration-monitor"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            // Monitor third-party integration health
            window.integrationHealthCheck = () => {
              const services = {
                'Google Maps': () => typeof google !== 'undefined' && google.maps,
                'Calendly': () => typeof window.Calendly !== 'undefined',
                'Vapi AI': () => typeof window.Vapi !== 'undefined'
              };
              
              const results = {};
              Object.entries(services).forEach(([name, check]) => {
                try {
                  results[name] = check() ? 'loaded' : 'not loaded';
                } catch (error) {
                  results[name] = 'error: ' + error.message;
                }
              });
              
              console.table(results);
              return results;
            };
            
            // Auto-check after page load in development
            if (${process.env.NODE_ENV === 'development'}) {
              setTimeout(() => {
                console.log('🔍 Integration Health Check:');
                window.integrationHealthCheck();
              }, 5000);
            }
          `,
        }}
      />

      {/* Development-only script loading debugger */}
      {process.env.NODE_ENV === 'development' && (
        <Script
          id="script-debug"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              // Debug script loading performance
              window.scriptLoadingDebug = {
                loadedScripts: ${JSON.stringify(Array.from(loadedScripts))},
                hasUserInteracted: ${hasInteracted},
                externalScripts: ${JSON.stringify(EXTERNAL_SCRIPTS.map(s => ({
                  id: s.id,
                  strategy: s.strategy,
                  priority: s.priority
                })))},
                
                getStats: () => {
                  const allScripts = document.querySelectorAll('script[src]');
                  const external = Array.from(allScripts).filter(s => 
                    s.src.startsWith('http') && !s.src.includes(location.hostname)
                  );
                  
                  return {
                    totalScripts: allScripts.length,
                    externalScripts: external.length,
                    loadedExternalScripts: ${Array.from(loadedScripts).length},
                    hasUserInteracted: ${hasInteracted}
                  };
                }
              };
              
              console.log('🚀 Script Loading Debug Tools Available');
              console.log('- window.scriptLoadingDebug.getStats()');
              console.log('- window.integrationHealthCheck()');
            `,
          }}
        />
      )}
    </>
  );
});

export default ScriptOptimizer;