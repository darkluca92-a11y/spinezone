import { memo, useEffect } from 'react';

// Enhanced Resource Hints component for optimal third-party integration performance
const EnhancedResourceHints = memo(function EnhancedResourceHints() {
  
  // Dynamic resource hint injection for runtime optimization
  useEffect(() => {
    const addResourceHint = (rel: string, href: string, as?: string, type?: string, crossorigin?: boolean) => {
      // Check if hint already exists
      if (document.querySelector(`link[rel="${rel}"][href="${href}"]`)) return;
      
      const link = document.createElement('link');
      link.rel = rel;
      link.href = href;
      if (as) link.as = as;
      if (type) (link as any).type = type;
      if (crossorigin) link.crossOrigin = 'anonymous';
      
      document.head.appendChild(link);
    };

    // Add runtime-specific hints
    addResourceHint('dns-prefetch', '//api.calendly.com');
    addResourceHint('dns-prefetch', '//widget.calendly.com');
    addResourceHint('dns-prefetch', '//assets.calendly.com');
    addResourceHint('dns-prefetch', '//vapi.ai');
    addResourceHint('dns-prefetch', '//api.vapi.ai');
    
    // Conditionally add hints based on configuration
    if (process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
      addResourceHint('preconnect', 'https://maps.googleapis.com', undefined, undefined, true);
      addResourceHint('preconnect', 'https://maps.gstatic.com', undefined, undefined, true);
      addResourceHint('dns-prefetch', '//khms0.googleapis.com');
      addResourceHint('dns-prefetch', '//khms1.googleapis.com');
    }
    
    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      addResourceHint('preconnect', process.env.NEXT_PUBLIC_SUPABASE_URL, undefined, undefined, true);
      addResourceHint('dns-prefetch', process.env.NEXT_PUBLIC_SUPABASE_URL);
    }
  }, []);

  return (
    <>
      {/* Critical first-party resource preloading */}
      <link rel="preload" href="/_next/static/css/275ed64cc4367444.css" as="style" />
      <link rel="preload" href="/_next/static/chunks/main-009c5e60c95ecccb.js" as="script" />
      <link rel="preload" href="/_next/static/chunks/framework-8e0e0f4a6b83a956.js" as="script" />
      
      {/* Enhanced DNS prefetch for all external services */}
      <link rel="dns-prefetch" href="//images.unsplash.com" />
      <link rel="dns-prefetch" href="//calendly.com" />
      <link rel="dns-prefetch" href="//widget.calendly.com" />
      <link rel="dns-prefetch" href="//assets.calendly.com" />
      <link rel="dns-prefetch" href="//api.calendly.com" />
      <link rel="dns-prefetch" href="//maps.googleapis.com" />
      <link rel="dns-prefetch" href="//maps.gstatic.com" />
      <link rel="dns-prefetch" href="//khms0.googleapis.com" />
      <link rel="dns-prefetch" href="//khms1.googleapis.com" />
      <link rel="dns-prefetch" href="//khms2.googleapis.com" />
      <link rel="dns-prefetch" href="//khms3.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      <link rel="dns-prefetch" href="//vapi.ai" />
      <link rel="dns-prefetch" href="//api.vapi.ai" />
      <link rel="dns-prefetch" href="//cdn.vapi.ai" />
      
      {/* Conditional Supabase prefetch */}
      {process.env.NEXT_PUBLIC_SUPABASE_URL && (
        <link rel="dns-prefetch" href={`//${new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname}`} />
      )}
      
      {/* High-priority preconnect to critical third-party domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
      
      {/* Calendly optimization */}
      <link rel="preconnect" href="https://calendly.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://widget.calendly.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://assets.calendly.com" crossOrigin="anonymous" />
      
      {/* Google Maps optimization - only if API key exists */}
      {process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY && (
        <>
          <link rel="preconnect" href="https://maps.googleapis.com" crossOrigin="anonymous" />
          <link rel="preconnect" href="https://maps.gstatic.com" crossOrigin="anonymous" />
        </>
      )}
      
      {/* Vapi AI optimization */}
      <link rel="preconnect" href="https://vapi.ai" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://api.vapi.ai" crossOrigin="anonymous" />
      
      {/* Supabase optimization - only if configured */}
      {process.env.NEXT_PUBLIC_SUPABASE_URL && (
        <link rel="preconnect" href={process.env.NEXT_PUBLIC_SUPABASE_URL} crossOrigin="anonymous" />
      )}
      
      {/* Prefetch critical pages for faster navigation */}
      <link rel="prefetch" href="/services" />
      <link rel="prefetch" href="/assessment" />
      <link rel="prefetch" href="/contact" />
      <link rel="prefetch" href="/about" />
      <link rel="prefetch" href="/locations" />
      <link rel="prefetch" href="/ai-assistant" />
      
      {/* Module preload for critical components */}
      <link rel="modulepreload" href="/_next/static/chunks/react-vendor.js" />
      <link rel="modulepreload" href="/_next/static/chunks/polyfills.js" />
      
      {/* Early hints for above-the-fold images */}
      <link 
        rel="preload" 
        href="/spinezone-logo-correct.png" 
        as="image" 
        type="image/png"
      />
      
      {/* Service Worker registration hint */}
      <link rel="preload" href="/sw.js" as="script" />
      
      {/* Manifest preload for PWA */}
      <link rel="preload" href="/manifest.json" as="fetch" crossOrigin="anonymous" />
      
      {/* Third-party script preloading hints */}
      <link rel="preload" href="https://widget.calendly.com/widget.js" as="script" crossOrigin="anonymous" />
      
      {/* Google Maps API preload - conditional */}
      {process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY && (
        <link 
          rel="preload" 
          href={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
          as="script" 
          crossOrigin="anonymous" 
        />
      )}
      
      {/* Font optimization with preload and display swap */}
      <link
        rel="preload"
        href="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      
      {/* Critical inline CSS to eliminate render-blocking */}
      <style dangerouslySetInnerHTML={{
        __html: `
          /* Inline critical CSS to eliminate render-blocking */
          .hero-section {
            min-height: 100vh;
            display: flex;
            align-items: center;
            background: linear-gradient(135deg, #e0f2fe 0%, #ecfdf5 100%);
          }
          
          /* Loading placeholder animations */
          .loading-placeholder {
            background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
            background-size: 200% 100%;
            animation: loading 1.5s infinite;
          }
          
          @keyframes loading {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }
          
          /* Optimize font loading with font-display: swap */
          @font-face {
            font-family: 'fallback-font';
            font-display: swap;
          }
          
          /* Third-party widget optimization */
          .calendly-widget {
            contain: layout style paint;
          }
          
          .google-map {
            contain: layout style paint;
            will-change: transform;
          }
          
          /* Intersection observer optimization */
          .lazy-load {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.3s ease, transform 0.3s ease;
          }
          
          .lazy-load.loaded {
            opacity: 1;
            transform: translateY(0);
          }
          
          /* Animation performance optimization */
          .performance-optimized {
            will-change: auto;
            backface-visibility: hidden;
            perspective: 1000px;
          }
          
          /* Mobile-specific optimizations */
          @media (max-width: 768px) {
            .hero-section {
              min-height: 80vh;
            }
            
            /* Reduce animation complexity on mobile */
            * {
              animation-duration: 0.2s !important;
              transition-duration: 0.15s !important;
            }
          }
          
          /* Preload spinner for external resources */
          .external-resource-loading {
            position: relative;
          }
          
          .external-resource-loading::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 20px;
            height: 20px;
            margin: -10px 0 0 -10px;
            border: 2px solid #f3f3f3;
            border-top: 2px solid #3b82f6;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }
          
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          /* Error boundary styling */
          .integration-error {
            background: #fef2f2;
            border: 1px solid #fecaca;
            border-radius: 8px;
            padding: 16px;
            margin: 8px 0;
          }
          
          .integration-error h3 {
            color: #dc2626;
            margin: 0 0 8px 0;
            font-size: 16px;
            font-weight: 600;
          }
          
          .integration-error p {
            color: #991b1b;
            margin: 0;
            font-size: 14px;
          }
          
          /* Connection status indicators */
          .connection-status {
            display: inline-flex;
            align-items: center;
            padding: 4px 8px;
            border-radius: 12px;
            font-size: 12px;
            font-weight: 500;
          }
          
          .connection-status.connected {
            background: #d1fae5;
            color: #065f46;
          }
          
          .connection-status.connecting {
            background: #fef3c7;
            color: #92400e;
          }
          
          .connection-status.disconnected {
            background: #fee2e2;
            color: #991b1b;
          }
          
          /* Performance monitoring badge (development only) */
          ${process.env.NODE_ENV === 'development' ? `
          .perf-monitor {
            position: fixed;
            top: 10px;
            right: 10px;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 8px 12px;
            border-radius: 6px;
            font-family: monospace;
            font-size: 11px;
            z-index: 9999;
            pointer-events: none;
          }
          ` : ''}
        `
      }} />
      
      {/* Resource timing observer for monitoring third-party performance */}
      <script dangerouslySetInnerHTML={{
        __html: `
          if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
              const entries = list.getEntries();
              entries.forEach((entry) => {
                if (entry.name.includes('calendly.com') || 
                    entry.name.includes('googleapis.com') || 
                    entry.name.includes('vapi.ai') ||
                    entry.name.includes('supabase.co')) {
                  const duration = entry.responseEnd - entry.startTime;
                  console.log('External Resource Performance:', {
                    name: entry.name,
                    duration: Math.round(duration),
                    size: entry.transferSize || 0,
                    type: entry.initiatorType
                  });
                  
                  // Report to analytics in production
                  if (typeof gtag !== 'undefined') {
                    gtag('event', 'resource_timing', {
                      resource_name: entry.name,
                      resource_duration: Math.round(duration),
                      resource_size: entry.transferSize || 0
                    });
                  }
                }
              });
            });
            
            try {
              observer.observe({ entryTypes: ['resource'] });
            } catch (e) {
              console.warn('Performance observer not supported:', e);
            }
          }
        `
      }} />
      
      {/* Early error handler for third-party scripts */}
      <script dangerouslySetInnerHTML={{
        __html: `
          window.addEventListener('error', function(e) {
            if (e.filename && (
              e.filename.includes('calendly.com') ||
              e.filename.includes('googleapis.com') ||
              e.filename.includes('vapi.ai')
            )) {
              console.warn('Third-party script error:', e.filename, e.message);
              
              // Report to error tracking service
              if (typeof gtag !== 'undefined') {
                gtag('event', 'exception', {
                  description: 'Third-party script error: ' + e.filename,
                  fatal: false
                });
              }
            }
          });
        `
      }} />
    </>
  );
});

export default EnhancedResourceHints;