/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: 'https://spinezone-sandiego.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false, // For static exports, we don't need index sitemap
  outDir: './out', // Output directory for static exports
  
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

  // Additional paths for comprehensive coverage
  additionalPaths: async (config) => {
    const result = [];
    
    // Blog posts with specific priority and changefreq
    const blogPosts = [
      '/blog/comprehensive-back-pain-treatment-san-diego/',
      '/blog/advanced-neck-pain-relief-cervical-spine-treatment/', 
      '/blog/joint-mobility-restoration-comprehensive-treatment-guide/',
      '/blog/sports-injury-rehabilitation-get-back-in-the-game/'
    ];

    // Service-related pages that might be dynamically generated
    const servicePaths = [
      '/services/',
      '/assessment/',
      '/contact/',
      '/insurance/',
      '/team/',
      '/testimonials/',
      '/about/',
      '/locations/',
      '/patient-portal/',
      '/privacy/',
      '/science/'
    ];

    [...blogPosts, ...servicePaths].forEach(path => {
      result.push({
        loc: path,
        changefreq: path.startsWith('/blog/') ? 'monthly' : 'weekly',
        priority: path.startsWith('/blog/') ? 0.8 : 0.9,
        lastmod: new Date().toISOString(),
      });
    });

    return result;
  },

  // Transform function to customize each URL
  transform: async (config, path) => {
    // Set priorities and change frequencies based on page type
    let priority = 0.7;
    let changefreq = 'monthly';

    // Homepage gets highest priority
    if (path === '/') {
      priority = 1.0;
      changefreq = 'weekly';
    }
    // Key service pages
    else if (['/services', '/assessment', '/contact', '/insurance'].includes(path)) {
      priority = 0.9;
      changefreq = 'weekly';
    }
    // Important informational pages
    else if (['/team', '/testimonials', '/about', '/locations'].includes(path)) {
      priority = 0.8;
      changefreq = 'monthly';
    }
    // Blog posts
    else if (path.startsWith('/blog/')) {
      priority = 0.7;
      changefreq = 'monthly';
    }
    // Other pages
    else {
      priority = 0.6;
      changefreq = 'monthly';
    }

    return {
      loc: path,
      changefreq: changefreq,
      priority: priority,
      lastmod: new Date().toISOString(),
      // Add mobile-specific annotations
      alternateRefs: [
        {
          href: `https://spinezone-sandiego.com${path}`,
          hreflang: 'en-US',
        },
      ],
    };
  },
};

module.exports = config;