/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: 'https://spinezone-sandiego.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false, // For static exports, we don't need index sitemap
  outDir: './out', // Output directory for static exports
  sourceDir: '.next', // Source directory for build manifest
  trailingSlash: false,
  
  // Enhanced robots.txt configuration for medical/healthcare site
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/private/', '/_next/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/admin/', '/private/', '/_next/'],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/api/', '/admin/', '/private/', '/_next/'],
      }
    ],
    additionalSitemaps: [
      'https://spinezone-sandiego.com/sitemap.xml',
    ],
  },

  // Exclude certain paths from sitemap
  exclude: [
    '/404',
    '/500',
    '/api/*',
    '/admin/*',
    '/private/*',
    '/_next/*',
    '/out/*'
  ],

  // Simplified configuration for reliable builds
  changefreq: 'monthly',
  priority: 0.7,
};

module.exports = config;