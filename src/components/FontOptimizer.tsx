import { memo } from 'react';

// Critical font preloading component for optimal LCP
const FontOptimizer = memo(function FontOptimizer() {
  return (
    <>
      {/* Preload critical fonts for above-the-fold content */}
      <link
        rel="preload"
        href="/_next/static/media/26a46d62cd723877-s.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        href="/_next/static/media/581909926a08bbc8-s.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      
      {/* Font display optimization for custom fonts */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @font-face {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 400 900;
            font-display: swap;
            src: url('/_next/static/media/26a46d62cd723877-s.woff2') format('woff2');
            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
          }
          
          @font-face {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 500;
            font-display: swap;
            src: url('/_next/static/media/581909926a08bbc8-s.woff2') format('woff2');
            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
          }
        `
      }} />
      
      {/* DNS prefetch for external font sources */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      
      {/* Preconnect to critical domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    </>
  );
});

export default FontOptimizer;