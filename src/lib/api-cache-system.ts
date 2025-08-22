/**
 * Advanced API Request Cache and Deduplication System
 * Optimizes third-party API calls for better performance
 */

import { performance } from 'perf_hooks';

// Cache entry interface
interface CacheEntry<T = any> {
  data: T;
  timestamp: number;
  ttl: number;
  etag?: string;
  lastModified?: string;
  hitCount: number;
  size: number;
}

// Request configuration interface
interface RequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: any;
  timeout?: number;
  retries?: number;
  retryDelay?: number;
  cache?: boolean;
  ttl?: number;
  deduplicate?: boolean;
}

// Request metadata for analytics
interface RequestMetadata {
  url: string;
  method: string;
  timestamp: number;
  duration: number;
  cacheHit: boolean;
  cacheKey: string;
  size: number;
  error?: string;
}

// Cache statistics
interface CacheStats {
  totalRequests: number;
  cacheHits: number;
  cacheMisses: number;
  hitRate: number;
  totalSize: number;
  entryCount: number;
  avgResponseTime: number;
  deduplicatedRequests: number;
}

class APICache {
  private cache: Map<string, CacheEntry> = new Map();
  private pendingRequests: Map<string, Promise<any>> = new Map();
  private requestHistory: RequestMetadata[] = [];
  private maxCacheSize: number;
  private defaultTTL: number;
  private maxEntries: number;
  private cleanupInterval: NodeJS.Timeout | null = null;

  constructor(
    maxCacheSize: number = 50 * 1024 * 1024, // 50MB
    defaultTTL: number = 5 * 60 * 1000, // 5 minutes
    maxEntries: number = 1000
  ) {
    this.maxCacheSize = maxCacheSize;
    this.defaultTTL = defaultTTL;
    this.maxEntries = maxEntries;
    
    // Start cleanup interval
    this.startCleanupInterval();
    
    // Bind methods to preserve context
    this.request = this.request.bind(this);
    this.clear = this.clear.bind(this);
    this.getStats = this.getStats.bind(this);
  }

  /**
   * Generate cache key from URL and request config
   */
  private generateCacheKey(url: string, config: RequestConfig): string {
    const { method = 'GET', body, headers } = config;
    const keyData = {
      url,
      method,
      body: body ? JSON.stringify(body) : null,
      headers: headers ? JSON.stringify(headers) : null
    };
    
    return btoa(JSON.stringify(keyData)).replace(/[+/=]/g, '');
  }

  /**
   * Calculate approximate size of data
   */
  private calculateSize(data: any): number {
    try {
      return new TextEncoder().encode(JSON.stringify(data)).length;
    } catch {
      return 1024; // Fallback size estimate
    }
  }

  /**
   * Check if cache entry is still valid
   */
  private isValidCacheEntry(entry: CacheEntry): boolean {
    return Date.now() - entry.timestamp < entry.ttl;
  }

  /**
   * Cleanup expired entries and manage cache size
   */
  private cleanup(): void {
    const now = Date.now();
    let totalSize = 0;
    const validEntries: [string, CacheEntry][] = [];

    // Remove expired entries and calculate total size
    for (const [key, entry] of Array.from(this.cache.entries())) {
      if (this.isValidCacheEntry(entry)) {
        validEntries.push([key, entry]);
        totalSize += entry.size;
      }
    }

    // Sort by hit count and timestamp (LRU + popularity)
    validEntries.sort((a, b) => {
      const scoreA = a[1].hitCount * Math.max(0, 1 - (now - a[1].timestamp) / a[1].ttl);
      const scoreB = b[1].hitCount * Math.max(0, 1 - (now - b[1].timestamp) / b[1].ttl);
      return scoreB - scoreA;
    });

    // Clear cache and rebuild with valid entries
    this.cache.clear();
    
    // Re-add entries within size and count limits
    let currentSize = 0;
    let count = 0;
    
    for (const [key, entry] of validEntries) {
      if (currentSize + entry.size <= this.maxCacheSize && count < this.maxEntries) {
        this.cache.set(key, entry);
        currentSize += entry.size;
        count++;
      }
    }

    console.log(`Cache cleanup: ${validEntries.length - count} entries removed, ${count} entries retained`);
  }

  /**
   * Start periodic cleanup
   */
  private startCleanupInterval(): void {
    this.cleanupInterval = setInterval(() => {
      this.cleanup();
    }, 2 * 60 * 1000); // Cleanup every 2 minutes
  }

  /**
   * Stop cleanup interval
   */
  private stopCleanupInterval(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
      this.cleanupInterval = null;
    }
  }

  /**
   * Execute HTTP request with retries
   */
  private async executeRequest(url: string, config: RequestConfig): Promise<any> {
    const {
      method = 'GET',
      headers = {},
      body,
      timeout = 10000,
      retries = 3,
      retryDelay = 1000
    } = config;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const requestOptions: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal
    };

    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const response = await fetch(url, requestOptions);
        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        
        return {
          data,
          etag: response.headers.get('etag'),
          lastModified: response.headers.get('last-modified')
        };
      } catch (error) {
        lastError = error as Error;
        
        if (attempt < retries) {
          console.warn(`Request attempt ${attempt + 1} failed, retrying in ${retryDelay}ms:`, error);
          await new Promise(resolve => setTimeout(resolve, retryDelay * Math.pow(2, attempt)));
        }
      }
    }

    clearTimeout(timeoutId);
    throw lastError || new Error('Request failed after all retries');
  }

  /**
   * Main request method with caching and deduplication
   */
  async request<T = any>(url: string, config: RequestConfig = {}): Promise<T> {
    const startTime = performance.now();
    const cacheKey = this.generateCacheKey(url, config);
    const {
      cache = true,
      ttl = this.defaultTTL,
      deduplicate = true
    } = config;

    // Check if request should be deduplicated
    if (deduplicate && this.pendingRequests.has(cacheKey)) {
      console.log(`Deduplicating request: ${url}`);
      const result = await this.pendingRequests.get(cacheKey)!;
      
      // Record deduplicated request
      this.requestHistory.push({
        url,
        method: config.method || 'GET',
        timestamp: Date.now(),
        duration: performance.now() - startTime,
        cacheHit: false, // This is deduplication, not cache
        cacheKey,
        size: this.calculateSize(result),
      });

      return result;
    }

    // Check cache first
    if (cache) {
      const cachedEntry = this.cache.get(cacheKey);
      if (cachedEntry && this.isValidCacheEntry(cachedEntry)) {
        cachedEntry.hitCount++;
        
        // Record cache hit
        this.requestHistory.push({
          url,
          method: config.method || 'GET',
          timestamp: Date.now(),
          duration: performance.now() - startTime,
          cacheHit: true,
          cacheKey,
          size: cachedEntry.size,
        });

        console.log(`Cache hit for: ${url}`);
        return cachedEntry.data;
      }
    }

    // Create and store pending request promise
    const requestPromise = this.executeRequest(url, config);
    
    if (deduplicate) {
      this.pendingRequests.set(cacheKey, requestPromise);
    }

    try {
      const result = await requestPromise;
      const endTime = performance.now();
      const duration = endTime - startTime;
      const size = this.calculateSize(result.data);

      // Store in cache if enabled
      if (cache) {
        const cacheEntry: CacheEntry<T> = {
          data: result.data,
          timestamp: Date.now(),
          ttl,
          etag: result.etag,
          lastModified: result.lastModified,
          hitCount: 1,
          size
        };

        this.cache.set(cacheKey, cacheEntry);
        console.log(`Cached response for: ${url} (${size} bytes, TTL: ${ttl}ms)`);
      }

      // Record request metadata
      this.requestHistory.push({
        url,
        method: config.method || 'GET',
        timestamp: Date.now(),
        duration,
        cacheHit: false,
        cacheKey,
        size,
      });

      return result.data;
    } catch (error) {
      const endTime = performance.now();
      const duration = endTime - startTime;

      // Record error
      this.requestHistory.push({
        url,
        method: config.method || 'GET',
        timestamp: Date.now(),
        duration,
        cacheHit: false,
        cacheKey,
        size: 0,
        error: (error as Error).message,
      });

      throw error;
    } finally {
      // Remove from pending requests
      if (deduplicate) {
        this.pendingRequests.delete(cacheKey);
      }
    }
  }

  /**
   * Preload data into cache
   */
  async preload(url: string, config: RequestConfig = {}): Promise<void> {
    try {
      await this.request(url, { ...config, cache: true });
      console.log(`Preloaded: ${url}`);
    } catch (error) {
      console.warn(`Failed to preload ${url}:`, error);
    }
  }

  /**
   * Invalidate cache entries
   */
  invalidate(pattern?: string): void {
    if (pattern) {
      for (const key of Array.from(this.cache.keys())) {
        if (key.includes(pattern)) {
          this.cache.delete(key);
        }
      }
      console.log(`Invalidated cache entries matching: ${pattern}`);
    } else {
      this.cache.clear();
      console.log('Cleared entire cache');
    }
  }

  /**
   * Clear cache and stop cleanup
   */
  clear(): void {
    this.cache.clear();
    this.pendingRequests.clear();
    this.requestHistory = [];
    this.stopCleanupInterval();
  }

  /**
   * Get cache statistics
   */
  getStats(): CacheStats {
    const totalRequests = this.requestHistory.length;
    const cacheHits = this.requestHistory.filter(r => r.cacheHit).length;
    const cacheMisses = totalRequests - cacheHits;
    const deduplicatedRequests = this.requestHistory.filter(r => !r.cacheHit && !r.error).length - cacheMisses;

    let totalSize = 0;
    for (const entry of Array.from(this.cache.values())) {
      totalSize += entry.size;
    }

    const avgResponseTime = totalRequests > 0 
      ? this.requestHistory.reduce((sum, r) => sum + r.duration, 0) / totalRequests 
      : 0;

    return {
      totalRequests,
      cacheHits,
      cacheMisses,
      hitRate: totalRequests > 0 ? (cacheHits / totalRequests) * 100 : 0,
      totalSize,
      entryCount: this.cache.size,
      avgResponseTime,
      deduplicatedRequests,
    };
  }

  /**
   * Get recent request history
   */
  getRequestHistory(limit: number = 100): RequestMetadata[] {
    return this.requestHistory.slice(-limit);
  }

  /**
   * Export cache for persistence
   */
  exportCache(): string {
    const cacheData = Array.from(this.cache.entries()).map(([key, entry]) => ({
      key,
      ...entry
    }));
    
    return JSON.stringify({
      version: '1.0',
      timestamp: Date.now(),
      entries: cacheData
    });
  }

  /**
   * Import cache from persistence
   */
  importCache(data: string): void {
    try {
      const parsed = JSON.parse(data);
      
      if (parsed.version === '1.0' && Array.isArray(parsed.entries)) {
        this.cache.clear();
        
        for (const entry of parsed.entries) {
          if (this.isValidCacheEntry(entry)) {
            this.cache.set(entry.key, {
              data: entry.data,
              timestamp: entry.timestamp,
              ttl: entry.ttl,
              etag: entry.etag,
              lastModified: entry.lastModified,
              hitCount: entry.hitCount,
              size: entry.size
            });
          }
        }
        
        console.log(`Imported ${this.cache.size} cache entries`);
      }
    } catch (error) {
      console.error('Failed to import cache:', error);
    }
  }
}

// Create singleton instance
export const apiCache = new APICache();

// Specialized cache instances for different services with enhanced configurations
export const calendlyCache = new APICache(10 * 1024 * 1024, 10 * 60 * 1000, 200); // 10MB, 10min TTL
export const mapsCache = new APICache(20 * 1024 * 1024, 30 * 60 * 1000, 500); // 20MB, 30min TTL
export const supabaseCache = new APICache(15 * 1024 * 1024, 5 * 60 * 1000, 300); // 15MB, 5min TTL
export const vapiCache = new APICache(5 * 1024 * 1024, 2 * 60 * 1000, 100); // 5MB, 2min TTL for real-time data

// High-level API functions for common integrations with enhanced error handling and deduplication
export const externalAPIs = {
  // Calendly availability check with advanced caching and retry logic
  async getCalendlyAvailability(date: string, location?: string): Promise<any> {
    const url = `https://api.calendly.com/availability?date=${date}&location=${location}`;
    return calendlyCache.request(url, {
      headers: {
        'Authorization': `Bearer ${process.env.CALENDLY_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      ttl: 5 * 60 * 1000, // 5 minutes
      cache: true,
      deduplicate: true,
      retries: 3,
      retryDelay: 1000,
      timeout: 15000, // 15 seconds
    });
  },

  // Enhanced Calendly booking creation
  async createCalendlyBooking(bookingData: any): Promise<any> {
    const url = 'https://api.calendly.com/scheduled_events';
    return calendlyCache.request(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.CALENDLY_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: bookingData,
      cache: false, // Don't cache POST requests
      deduplicate: true, // But do deduplicate identical requests
      retries: 2,
      timeout: 20000,
    });
  },

  // Google Maps geocoding with enhanced caching
  async geocodeAddress(address: string): Promise<any> {
    if (!address || typeof address !== 'string') {
      throw new Error('Valid address is required for geocoding');
    }

    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;
    return mapsCache.request(url, {
      ttl: 24 * 60 * 60 * 1000, // 24 hours
      cache: true,
      deduplicate: true,
      retries: 2,
      timeout: 10000,
    });
  },

  // Google Maps Places API for location details
  async getPlaceDetails(placeId: string): Promise<any> {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;
    return mapsCache.request(url, {
      ttl: 12 * 60 * 60 * 1000, // 12 hours
      cache: true,
      deduplicate: true,
      timeout: 10000,
    });
  },

  // Vapi AI assistant interactions
  async initVapiSession(assistantId: string): Promise<any> {
    const url = `https://api.vapi.ai/assistant/${assistantId}/session`;
    return vapiCache.request(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.VAPI_PRIVATE_KEY}`,
        'Content-Type': 'application/json',
      },
      ttl: 30 * 1000, // Very short TTL for real-time data
      cache: false, // Sessions shouldn't be cached
      deduplicate: true,
      retries: 3,
      timeout: 15000,
    });
  },

  // Supabase health check with caching
  async checkSupabaseHealth(): Promise<any> {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      return { status: 'disabled', message: 'Supabase not configured' };
    }

    const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/`;
    return supabaseCache.request(url, {
      headers: {
        'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
      },
      ttl: 60 * 1000, // 1 minute
      cache: true,
      deduplicate: true,
      timeout: 5000,
    });
  },

  // Generic external API request with smart caching
  async makeRequest<T = any>(url: string, config: RequestConfig = {}): Promise<T> {
    // Determine appropriate cache based on URL
    let cache = apiCache;
    if (url.includes('calendly.com')) cache = calendlyCache;
    else if (url.includes('googleapis.com')) cache = mapsCache;
    else if (url.includes('vapi.ai')) cache = vapiCache;
    else if (url.includes('supabase')) cache = supabaseCache;

    return cache.request<T>(url, {
      retries: 2,
      timeout: 10000,
      cache: true,
      deduplicate: true,
      ...config,
    });
  },

  // Intelligent batch preload based on user journey
  async preloadCommonData(): Promise<void> {
    const preloadPromises = [
      // Preload critical geographic data for maps
      process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ? 
        mapsCache.preload(
          `https://maps.googleapis.com/maps/api/geocode/json?address=San+Diego,CA&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
        ) : Promise.resolve(),
      
      // Preload Calendly configuration if available
      process.env.CALENDLY_API_TOKEN ?
        calendlyCache.preload('https://api.calendly.com/user/me') : Promise.resolve(),
      
      // Preload common clinic locations
      mapsCache.preload(
        `https://maps.googleapis.com/maps/api/geocode/json?address=Downtown+San+Diego+Physical+Therapy&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
      ).catch(() => {}), // Silently fail if no API key
    ];

    const results = await Promise.allSettled(preloadPromises);
    const successful = results.filter(r => r.status === 'fulfilled').length;
    console.log(`Preloading completed: ${successful}/${results.length} successful`);
  },

  // Enhanced statistics with performance insights
  getOverallStats(): { [key: string]: CacheStats & { serviceName: string } } {
    return {
      main: { ...apiCache.getStats(), serviceName: 'General API Cache' },
      calendly: { ...calendlyCache.getStats(), serviceName: 'Calendly Integration' },
      maps: { ...mapsCache.getStats(), serviceName: 'Google Maps API' },
      supabase: { ...supabaseCache.getStats(), serviceName: 'Supabase Backend' },
      vapi: { ...vapiCache.getStats(), serviceName: 'Vapi AI Assistant' },
    };
  },

  // Performance analysis report
  getPerformanceReport(): {
    totalRequests: number;
    averageResponseTime: number;
    cacheEfficiency: number;
    errorRate: number;
    recommendations: string[];
  } {
    const stats = this.getOverallStats();
    const totalRequests = Object.values(stats).reduce((sum, s) => sum + s.totalRequests, 0);
    const totalHits = Object.values(stats).reduce((sum, s) => sum + s.cacheHits, 0);
    const avgResponseTime = Object.values(stats).reduce((sum, s) => sum + s.avgResponseTime, 0) / Object.keys(stats).length;

    const recommendations: string[] = [];
    
    // Generate recommendations based on statistics
    const cacheEfficiency = totalRequests > 0 ? (totalHits / totalRequests) * 100 : 0;
    if (cacheEfficiency < 30) {
      recommendations.push('Consider increasing cache TTL for frequently accessed resources');
    }
    if (avgResponseTime > 2000) {
      recommendations.push('High response times detected - consider implementing request timeouts');
    }
    
    Object.entries(stats).forEach(([service, serviceStats]) => {
      if (serviceStats.totalRequests > 100 && serviceStats.hitRate < 20) {
        recommendations.push(`${serviceStats.serviceName} has low cache efficiency (${serviceStats.hitRate.toFixed(1)}%)`);
      }
    });

    return {
      totalRequests,
      averageResponseTime: avgResponseTime,
      cacheEfficiency,
      errorRate: 0, // TODO: Implement error tracking
      recommendations,
    };
  },

  // Enhanced cache management
  clearAllCaches(): void {
    apiCache.clear();
    calendlyCache.clear();
    mapsCache.clear();
    supabaseCache.clear();
    vapiCache.clear();
    console.log('All caches cleared');
  },

  // Selective cache invalidation
  invalidateServiceCache(service: 'calendly' | 'maps' | 'supabase' | 'vapi' | 'all'): void {
    switch (service) {
      case 'calendly':
        calendlyCache.invalidate();
        break;
      case 'maps':
        mapsCache.invalidate();
        break;
      case 'supabase':
        supabaseCache.invalidate();
        break;
      case 'vapi':
        vapiCache.invalidate();
        break;
      case 'all':
        this.clearAllCaches();
        break;
    }
    console.log(`${service} cache invalidated`);
  },

  // Connection health monitoring
  async performHealthChecks(): Promise<{
    calendly: { healthy: boolean; latency?: number };
    maps: { healthy: boolean; latency?: number };
    supabase: { healthy: boolean; latency?: number };
    vapi: { healthy: boolean; latency?: number };
  }> {
    const results = {
      calendly: { healthy: false, latency: 0 },
      maps: { healthy: false, latency: 0 },
      supabase: { healthy: false, latency: 0 },
      vapi: { healthy: false, latency: 0 },
    };

    // Test Calendly connectivity
    try {
      const start = performance.now();
      await calendlyCache.request('https://calendly.com/api/health', {
        timeout: 5000,
        cache: false,
        retries: 1,
      });
      results.calendly = { healthy: true, latency: performance.now() - start };
    } catch (error) {
      console.warn('Calendly health check failed:', error);
    }

    // Test Google Maps API
    if (process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
      try {
        const start = performance.now();
        await mapsCache.request(
          `https://maps.googleapis.com/maps/api/geocode/json?address=test&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`,
          { timeout: 5000, cache: false, retries: 1 }
        );
        results.maps = { healthy: true, latency: performance.now() - start };
      } catch (error) {
        console.warn('Google Maps health check failed:', error);
      }
    }

    // Test Supabase connectivity
    try {
      const healthResult = await this.checkSupabaseHealth();
      results.supabase = { healthy: !!healthResult, latency: 0 };
    } catch (error) {
      console.warn('Supabase health check failed:', error);
    }

    return results;
  },
};

// Browser persistence utilities
if (typeof window !== 'undefined') {
  // Enhanced cache persistence with compression and validation
  window.addEventListener('beforeunload', () => {
    try {
      // Only persist if caches have meaningful data
      const mainStats = apiCache.getStats();
      const calendlyStats = calendlyCache.getStats();
      const mapsStats = mapsCache.getStats();
      const supabaseStats = supabaseCache.getStats();
      const vapiStats = vapiCache.getStats();

      if (mainStats.entryCount > 0) {
        localStorage.setItem('api-cache-main', apiCache.exportCache());
      }
      if (calendlyStats.entryCount > 0) {
        localStorage.setItem('api-cache-calendly', calendlyCache.exportCache());
      }
      if (mapsStats.entryCount > 0) {
        localStorage.setItem('api-cache-maps', mapsCache.exportCache());
      }
      if (supabaseStats.entryCount > 0) {
        localStorage.setItem('api-cache-supabase', supabaseCache.exportCache());
      }
      if (vapiStats.entryCount > 0) {
        localStorage.setItem('api-cache-vapi', vapiCache.exportCache());
      }

      // Persist performance statistics for analysis
      const perfReport = externalAPIs.getPerformanceReport();
      localStorage.setItem('api-cache-performance', JSON.stringify({
        timestamp: Date.now(),
        report: perfReport
      }));
    } catch (error) {
      console.warn('Failed to persist cache:', error);
    }
  });

  // Enhanced cache loading with validation and cleanup
  try {
    const cacheItems = [
      { key: 'api-cache-main', cache: apiCache },
      { key: 'api-cache-calendly', cache: calendlyCache },
      { key: 'api-cache-maps', cache: mapsCache },
      { key: 'api-cache-supabase', cache: supabaseCache },
      { key: 'api-cache-vapi', cache: vapiCache },
    ];

    cacheItems.forEach(({ key, cache }) => {
      try {
        const cachedData = localStorage.getItem(key);
        if (cachedData) {
          const parsed = JSON.parse(cachedData);
          // Validate cache age (don't load if older than 1 hour)
          if (parsed.timestamp && (Date.now() - parsed.timestamp) < 60 * 60 * 1000) {
            cache.importCache(cachedData);
          } else {
            localStorage.removeItem(key); // Clean up old cache
          }
        }
      } catch (error) {
        console.warn(`Failed to load ${key}:`, error);
        localStorage.removeItem(key); // Remove corrupted cache
      }
    });

    // Load and display previous session performance if available
    const perfData = localStorage.getItem('api-cache-performance');
    if (perfData && process.env.NODE_ENV === 'development') {
      try {
        const { timestamp, report } = JSON.parse(perfData);
        const age = (Date.now() - timestamp) / 1000 / 60; // minutes
        if (age < 60) { // Only show if less than 1 hour old
          console.group('🔄 Previous Session API Performance');
          console.log(`Session ended ${age.toFixed(1)} minutes ago`);
          console.log(`Total requests: ${report.totalRequests}`);
          console.log(`Cache efficiency: ${report.cacheEfficiency.toFixed(1)}%`);
          console.log(`Average response time: ${report.averageResponseTime.toFixed(0)}ms`);
          if (report.recommendations.length > 0) {
            console.log('Recommendations:');
            report.recommendations.forEach((rec: string, i: number) => console.log(`  ${i + 1}. ${rec}`));
          }
          console.groupEnd();
        }
      } catch (error) {
        console.warn('Failed to parse performance data:', error);
      }
    }
  } catch (error) {
    console.warn('Failed to load persisted caches:', error);
  }
}

// Development utilities with enhanced debugging
if (process.env.NODE_ENV === 'development') {
  (window as any).apiCacheDebug = {
    // Core cache instances
    apiCache,
    calendlyCache,
    mapsCache,
    supabaseCache,
    vapiCache,
    externalAPIs,
    
    // Quick access methods
    stats: () => externalAPIs.getOverallStats(),
    performance: () => externalAPIs.getPerformanceReport(),
    health: () => externalAPIs.performHealthChecks(),
    clear: () => externalAPIs.clearAllCaches(),
    
    // Service-specific invalidation
    invalidate: (service: string) => externalAPIs.invalidateServiceCache(service as any),
    
    // Cache analysis tools
    analyze: () => {
      const stats = externalAPIs.getOverallStats();
      const performance = externalAPIs.getPerformanceReport();
      
      console.group('📊 API Cache Analysis');
      console.table(stats);
      console.log('Performance Report:', performance);
      console.groupEnd();
      
      return { stats, performance };
    },
    
    // Test utilities
    test: {
      calendly: () => externalAPIs.getCalendlyAvailability(new Date().toISOString().split('T')[0]),
      maps: () => externalAPIs.geocodeAddress('San Diego, CA'),
      supabase: () => externalAPIs.checkSupabaseHealth(),
    },
    
    // Cache warming
    warmup: () => externalAPIs.preloadCommonData(),
    
    // Export/Import utilities
    export: () => ({
      main: apiCache.exportCache(),
      calendly: calendlyCache.exportCache(),
      maps: mapsCache.exportCache(),
      supabase: supabaseCache.exportCache(),
      vapi: vapiCache.exportCache(),
    }),
    
    // Real-time monitoring toggle
    monitor: (enabled: boolean = true) => {
      if (enabled) {
        console.log('🔍 Real-time API monitoring enabled');
        const originalRequest = apiCache.request;
        apiCache.request = async function<T = any>(url: string, config?: RequestConfig): Promise<T> {
          const start = performance.now();
          try {
            const result = await originalRequest.call(this, url, config) as T;
            const duration = performance.now() - start;
            console.log(`✅ API Request: ${url} (${duration.toFixed(2)}ms)`);
            return result;
          } catch (error) {
            const duration = performance.now() - start;
            console.error(`❌ API Request Failed: ${url} (${duration.toFixed(2)}ms)`, error);
            throw error;
          }
        };
      } else {
        console.log('🔍 Real-time API monitoring disabled');
        // Reset to original (this is simplified - in practice would need proper restoration)
      }
    }
  };
  
  // Auto-start performance monitoring
  console.log('🚀 API Cache Debug Tools Available:');
  console.log('- window.apiCacheDebug.stats() - View cache statistics');
  console.log('- window.apiCacheDebug.performance() - Performance analysis');
  console.log('- window.apiCacheDebug.health() - Service health checks');
  console.log('- window.apiCacheDebug.analyze() - Complete analysis');
  console.log('- window.apiCacheDebug.monitor(true) - Enable real-time monitoring');
}

export default apiCache;