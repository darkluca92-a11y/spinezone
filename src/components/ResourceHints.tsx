import { memo } from 'react';

// Performance optimization component for resource hints and preloading
const ResourceHints = memo(function ResourceHints() {
  return (
    <>
      {/* Critical resource preloading */}
      <link rel="preload" href="/_next/static/css/275ed64cc4367444.css" as="style" />
      <link rel="preload" href="/_next/static/chunks/main-009c5e60c95ecccb.js" as="script" />
      <link rel="preload" href="/_next/static/chunks/framework-8e0e0f4a6b83a956.js" as="script" />
      
      {/* DNS prefetch for external services */}
      <link rel="dns-prefetch" href="//images.unsplash.com" />
      <link rel="dns-prefetch" href="//calendly.com" />
      <link rel="dns-prefetch" href="//maps.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      
      {/* Preconnect to critical third-party domains */}
      <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://calendly.com" crossOrigin="anonymous" />
      
      {/* Prefetch critical pages for faster navigation */}
      <link rel="prefetch" href="/services" />
      <link rel="prefetch" href="/assessment" />
      <link rel="prefetch" href="/contact" />
      <link rel="prefetch" href="/about" />
      
      {/* Module preload for critical components */}
      <link 
        rel="modulepreload" 
        href="/_next/static/chunks/react-vendor.js"
      />
      
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
      
      {/* Critical stylesheets with optimized loading */}
      <style dangerouslySetInnerHTML={{
        __html: `
          /* Inline critical CSS to eliminate render-blocking */
          .hero-section {
            min-height: 100vh;
            display: flex;
            align-items: center;
            background: linear-gradient(135deg, #e0f2fe 0%, #ecfdf5 100%);
          }
          
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
        `
      }} />
    </>
  );
});

export default ResourceHints;