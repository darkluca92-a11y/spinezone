import { NextResponse } from 'next/server';
import { getBlogPosts } from '@/lib/blog-data';

export async function GET() {
  const baseUrl = 'https://spinezone-sandiego.com';
  const currentDate = new Date().toISOString();
  
  // Static pages
  const staticPages = [
    { url: '', priority: '1.0', changefreq: 'weekly' },
    { url: '/about', priority: '0.9', changefreq: 'monthly' },
    { url: '/services', priority: '0.9', changefreq: 'monthly' },
    { url: '/locations', priority: '0.8', changefreq: 'monthly' },
    { url: '/contact', priority: '0.8', changefreq: 'monthly' },
    { url: '/blog', priority: '0.7', changefreq: 'weekly' },
    { url: '/patient-portal', priority: '0.6', changefreq: 'monthly' },
  ];

  // Blog posts
  const blogPosts = getBlogPosts();
  const blogPages = blogPosts.map(post => ({
    url: `/blog/${post.slug}`,
    priority: '0.6',
    changefreq: 'monthly',
    lastmod: post.publishDate,
  }));

  const allPages = [...staticPages, ...blogPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod || currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}