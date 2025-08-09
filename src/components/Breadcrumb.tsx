'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href: string;
  current?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  return (
    <nav 
      className={`flex items-center space-x-2 text-sm text-gray-600 ${className}`}
      aria-label="Breadcrumb navigation"
    >
      <div className="flex items-center">
        <Link 
          href="/" 
          className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
          aria-label="Go to homepage"
        >
          <Home className="w-4 h-4 mr-1" aria-hidden="true" />
          <span className="sr-only">Home</span>
        </Link>
      </div>
      
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          <ChevronRight className="w-4 h-4 text-gray-400 mx-2" aria-hidden="true" />
          {item.current ? (
            <span 
              className="text-gray-900 font-medium"
              aria-current="page"
            >
              {item.label}
            </span>
          ) : (
            <Link 
              href={item.href}
              className="text-blue-600 hover:text-blue-800 transition-colors duration-200 hover:underline"
            >
              {item.label}
            </Link>
          )}
        </div>
      ))}
      
      {/* Structured Data for Breadcrumbs */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://spinezone-sandiego.com"
              },
              ...items.map((item, index) => ({
                "@type": "ListItem",
                "position": index + 2,
                "name": item.label,
                "item": `https://spinezone-sandiego.com${item.href}`
              }))
            ]
          })
        }}
      />
    </nav>
  );
}

