'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  onLoad?: () => void;
  onError?: () => void;
  lazy?: boolean;
  aspectRatio?: string;
  webpSrc?: string;
  avifSrc?: string;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  sizes = '(max-width: 480px) 100vw, (max-width: 768px) 90vw, (max-width: 1024px) 70vw, (max-width: 1200px) 50vw, 33vw',
  quality = 85,
  placeholder = 'empty',
  blurDataURL,
  onLoad,
  onError,
  lazy = true,
  aspectRatio,
  webpSrc,
  avifSrc,
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(!lazy || priority);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazy || priority || isInView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.1,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [lazy, priority, isInView]);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    setHasError(true);
    onError?.();
  }, [onError]);

  // Generate responsive srcset for different formats with mobile-optimized breakpoints
  const generateSrcSet = (baseSrc: string, format: string = '') => {
    if (!width || !height) return baseSrc;
    
    const formatSuffix = format ? `&fm=${format}` : '';
    // Mobile-first responsive breakpoints
    const breakpoints = [
      { scale: 0.3, width: 320 },   // Small mobile
      { scale: 0.5, width: 480 },   // Mobile
      { scale: 0.75, width: 768 },  // Tablet
      { scale: 1, width: 1024 },    // Desktop
      { scale: 1.5, width: 1200 },  // Large desktop
      { scale: 2, width: 1920 },    // Retina/4K
    ];
    
    return breakpoints
      .map(({ scale, width: minWidth }) => {
        const scaledWidth = Math.round(width * scale);
        const scaledHeight = Math.round(height * scale);
        // Optimize quality for mobile (lower quality for smaller images)
        const mobileQuality = scale <= 0.75 ? Math.max(70, quality - 10) : quality;
        return `${baseSrc}?w=${scaledWidth}&h=${scaledHeight}&q=${mobileQuality}${formatSuffix} ${scaledWidth}w`;
      })
      .join(', ');
  };

  // Create optimized URLs for different formats
  const getOptimizedSrc = (format?: string) => {
    if (!width || !height) return src;
    const formatParam = format ? `&fm=${format}` : '';
    return `${src}?w=${width}&h=${height}&q=${quality}${formatParam}`;
  };

  const containerStyle = {
    aspectRatio: aspectRatio || (width && height ? `${width} / ${height}` : undefined),
  };

  const imageProps = {
    ref: imgRef,
    alt,
    onLoad: handleLoad,
    onError: handleError,
    className: `${className} transition-opacity duration-300 ${
      isLoaded ? 'opacity-100' : 'opacity-0'
    }`,
    style: {
      objectFit: 'cover' as const,
      width: '100%',
      height: '100%',
    },
    sizes,
    loading: priority ? 'eager' as const : 'lazy' as const,
    decoding: 'async' as const,
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden bg-gray-200 ${className}`}
      style={containerStyle}
    >
      {/* Placeholder blur effect */}
      {placeholder === 'blur' && blurDataURL && !isLoaded && (
        <div
          className="absolute inset-0 bg-cover bg-center filter blur-sm scale-110"
          style={{ backgroundImage: `url(${blurDataURL})` }}
        />
      )}

      {/* Loading placeholder */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse">
          <div className="w-8 h-8 bg-gray-300 rounded" />
        </div>
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-500">
          <span className="text-sm">Image failed to load</span>
        </div>
      )}

      {/* Actual image with multiple formats */}
      {isInView && !hasError && (
        <picture>
          {/* AVIF format - best compression */}
          {avifSrc && (
            <source
              srcSet={generateSrcSet(avifSrc, 'avif')}
              sizes={sizes}
              type="image/avif"
            />
          )}
          
          {/* WebP format - good compression, wide support */}
          {webpSrc && (
            <source
              srcSet={generateSrcSet(webpSrc, 'webp')}
              sizes={sizes}
              type="image/webp"
            />
          )}
          
          {/* Fallback to original format */}
          <img
            {...imageProps}
            src={getOptimizedSrc()}
            srcSet={generateSrcSet(src)}
          />
        </picture>
      )}
    </div>
  );
}

// Hook for preloading critical images
export function usePreloadImage(src: string, priority: boolean = false) {
  useEffect(() => {
    if (!priority) return;

    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, [src, priority]);
}

// Utility function to generate responsive image URLs
export function generateResponsiveImageUrls(
  baseSrc: string,
  width: number,
  height: number
) {
  return {
    avif: `${baseSrc}?w=${width}&h=${height}&fm=avif&q=85`,
    webp: `${baseSrc}?w=${width}&h=${height}&fm=webp&q=85`,
    original: `${baseSrc}?w=${width}&h=${height}&q=85`,
    blur: `${baseSrc}?w=${Math.round(width * 0.1)}&h=${Math.round(height * 0.1)}&blur=20&q=20`,
  };
}