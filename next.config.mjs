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
  
  // Experimental performance features
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      'recharts',
      '@googlemaps/react-wrapper',
    ],
    webVitalsAttribution: ['CLS', 'LCP', 'FID', 'FCP', 'TTFB'],
    scrollRestoration: true,
  },
  
  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
    styledComponents: false,
  },
  
  // Note: redirects, rewrites, and headers are handled by Netlify for static exports
}

export default nextConfig