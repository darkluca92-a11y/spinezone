/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
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
      '@supabase/auth-helpers-nextjs'
    ],
    webVitalsAttribution: ['CLS', 'LCP', 'FID', 'FCP', 'TTFB', 'INP'],
    scrollRestoration: true,
    optimizeCss: true,
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  
  // Enhanced compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
    styledComponents: false,
    emotion: false,
    reactRemoveProperties: process.env.NODE_ENV === 'production',
  },
  
  // Bundle analyzer configuration
  ...(process.env.ANALYZE === 'true' ? {
    webpack: (config, { isServer }) => {
      if (!isServer) {
        config.resolve.fallback = {
          ...config.resolve.fallback,
          fs: false,
          net: false,
          tls: false,
        };
      }
      
      // Optimize bundle splitting
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          ...config.optimization.splitChunks,
          cacheGroups: {
            ...config.optimization.splitChunks.cacheGroups,
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
              maxSize: 244000, // 244KB chunks
            },
            common: {
              name: 'common',
              minChunks: 2,
              chunks: 'all',
              enforce: true,
              maxSize: 244000,
            },
          },
        },
      };
      
      // Add bundle analyzer
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
  } : {}),
  
  // Note: redirects, rewrites, and headers are handled by Netlify for static exports
}

export default nextConfig