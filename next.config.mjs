/** @type {import('next').NextConfig} */
const nextConfig = {
  // Temporarily disable static export to avoid event handler serialization issues
  // output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  distDir: 'out',
  
  // Image optimization configuration
  images: {
    unoptimized: true, // Required for static export
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/photo-*',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year
  },
  
  // Comprehensive performance optimizations
  swcMinify: true,
  compress: true,
  poweredByHeader: false,
  generateEtags: false, // Handled by Netlify CDN
  reactStrictMode: true,
  
  // Enhanced experimental performance features
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      'recharts',
      '@googlemaps/react-wrapper',
      '@supabase/supabase-js',
      '@supabase/auth-helpers-nextjs',
      'framer-motion'
    ],
    webVitalsAttribution: ['CLS', 'LCP', 'FID', 'FCP', 'TTFB', 'INP'],
    scrollRestoration: true,
    // Critical path optimization
    forceSwcTransforms: true,
    // Disabled optimizeCss due to 'critters' module dependency issues in Netlify build environment
    // optimizeCss: true,
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  
  // Static page generation timeout for heavy pages - increased for complex components
  staticPageGenerationTimeout: 180, // 3 minutes for complex SSG pages with multiple forms
  
  // Enhanced compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
    styledComponents: false,
    emotion: false,
    reactRemoveProperties: process.env.NODE_ENV === 'production',
  },
  
  // Enhanced webpack configuration for performance
  webpack: (config, { isServer, dev }) => {
    // Client-side optimizations
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    
    // Production optimizations
    if (!dev) {
      // Optimize bundle splitting for better caching
      config.optimization.splitChunks = {
        ...config.optimization.splitChunks,
        cacheGroups: {
          ...config.optimization.splitChunks.cacheGroups,
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            maxSize: 200000, // 200KB chunks for better loading
            priority: 10,
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            enforce: true,
            maxSize: 200000,
            priority: 5,
          },
          // Separate chunk for heavy components
          appointments: {
            test: /[\\/]components[\\/](.*AppointmentForm|.*Appointment.*)\\.tsx?$/,
            name: 'appointments',
            chunks: 'all',
            priority: 15,
          },
        },
      };
    }
    
    // Add bundle analyzer only when needed
    if (process.env.ANALYZE === 'true') {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
      config.plugins.push(new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false,
        reportFilename: isServer ? '../analyze/server.html' : '../analyze/client.html',
      }));
    }
    
    return config;
  },
  
  // Enhanced output configuration for Netlify
  env: {
    NEXT_TELEMETRY_DISABLED: '1',
  },
  
  // Note: redirects, rewrites, and headers are handled by Netlify for static exports
}

export default nextConfig