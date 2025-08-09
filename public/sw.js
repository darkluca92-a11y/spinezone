// Enhanced Service Worker for Performance Optimization
const CACHE_VERSION = '1.3.0';
const STATIC_CACHE_NAME = `spinezone-static-v${CACHE_VERSION}`;
const DYNAMIC_CACHE_NAME = `spinezone-dynamic-v${CACHE_VERSION}`;
const IMAGE_CACHE_NAME = `spinezone-images-v${CACHE_VERSION}`;

// Critical resources that should be cached immediately for LCP optimization
const CRITICAL_ASSETS = [
  '/',
  '/manifest.json',
  // These will be updated dynamically based on build output
];

// Routes to pre-cache for better navigation performance
const IMPORTANT_ROUTES = [
  '/services',
  '/assessment', 
  '/contact',
  '/about',
  '/team',
  '/testimonials',
  '/insurance',
];

// Cache size limits to prevent storage bloat
const CACHE_LIMITS = {
  [STATIC_CACHE_NAME]: 50,
  [DYNAMIC_CACHE_NAME]: 100,
  [IMAGE_CACHE_NAME]: 200,
};

// Cache expiry times (in milliseconds)
const CACHE_EXPIRY = {
  static: 30 * 24 * 60 * 60 * 1000, // 30 days
  dynamic: 7 * 24 * 60 * 60 * 1000, // 7 days
  images: 14 * 24 * 60 * 60 * 1000, // 14 days
};

// Install service worker
self.addEventListener('install', event => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .catch(error => {
        console.error('Service Worker: Cache addAll failed:', error);
      })
  );
  
  // Skip waiting to activate immediately
  self.skipWaiting();
});

// Activate service worker
self.addEventListener('activate', event => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== STATIC_CACHE_NAME && cacheName !== DYNAMIC_CACHE_NAME) {
              console.log('Service Worker: Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // Take control immediately
      self.clients.claim()
    ])
  );
});

// Fetch event handler
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-HTTP(S) requests
  if (!url.protocol.startsWith('http')) {
    return;
  }
  
  // Skip POST requests and other non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  event.respondWith(handleFetch(request));
});

// Handle fetch requests with appropriate caching strategy
async function handleFetch(request) {
  const url = new URL(request.url);
  
  try {
    // API requests - Network first
    if (url.pathname.startsWith('/api/')) {
      return await networkFirst(request, DYNAMIC_CACHE_NAME);
    }
    
    // Images - Cache first
    if (request.destination === 'image') {
      return await cacheFirst(request, DYNAMIC_CACHE_NAME);
    }
    
    // Static assets - Cache first
    if (
      request.destination === 'script' ||
      request.destination === 'style' ||
      request.destination === 'font' ||
      url.pathname.includes('/_next/static/')
    ) {
      return await cacheFirst(request, STATIC_CACHE_NAME);
    }
    
    // HTML pages - Network first with fallback
    if (
      request.destination === 'document' ||
      request.headers.get('Accept')?.includes('text/html')
    ) {
      return await networkFirst(request, DYNAMIC_CACHE_NAME);
    }
    
    // Default strategy - Network first
    return await networkFirst(request, DYNAMIC_CACHE_NAME);
    
  } catch (error) {
    console.error('Service Worker: Fetch failed:', error);
    
    // Return offline fallback for HTML pages
    if (request.destination === 'document') {
      return caches.match('/offline.html') || new Response('Offline - Please check your connection');
    }
    
    throw error;
  }
}

// Network first caching strategy
async function networkFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  
  try {
    // Try network first
    const networkResponse = await fetch(request);
    
    // Cache successful responses
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    // Network failed, try cache
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    throw error;
  }
}

// Cache first strategy
async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    // Return cached version immediately
    // Update cache in background
    fetch(request).then(networkResponse => {
      if (networkResponse.ok) {
        cache.put(request, networkResponse.clone());
      }
    }).catch(() => {
      // Ignore network errors for background updates
    });
    
    return cachedResponse;
  }
  
  // No cache, fetch from network
  const networkResponse = await fetch(request);
  
  if (networkResponse.ok) {
    cache.put(request, networkResponse.clone());
  }
  
  return networkResponse;
}

// Background sync for offline form submissions
self.addEventListener('sync', event => {
  if (event.tag === 'contact-form-sync') {
    event.waitUntil(syncContactForms());
  }
});

async function syncContactForms() {
  // Handle offline form submissions when back online
  const cache = await caches.open(DYNAMIC_CACHE_NAME);
  const requests = await cache.keys();
  
  const offlineSubmissions = requests.filter(request => 
    request.url.includes('/api/contact') && request.method === 'POST'
  );
  
  for (const request of offlineSubmissions) {
    try {
      await fetch(request);
      await cache.delete(request);
    } catch (error) {
      console.error('Failed to sync offline form:', error);
    }
  }
}

// Push notification handler
self.addEventListener('push', event => {
  if (event.data) {
    const data = event.data.json();
    
    const options = {
      body: data.body || 'SpineZone Physical Therapy update',
      icon: '/icons/icon-192x192.png',
      badge: '/icons/badge-72x72.png',
      tag: 'spinezone-notification',
      actions: [
        {
          action: 'view',
          title: 'View',
          icon: '/icons/view-action.png'
        },
        {
          action: 'dismiss',
          title: 'Dismiss'
        }
      ]
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title || 'SpineZone PT', options)
    );
  }
});

// Notification click handler
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  if (event.action === 'view') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Clean up old caches periodically
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'CLEANUP_CACHES') {
    event.waitUntil(cleanupOldCaches());
  }
});

async function cleanupOldCaches() {
  const cacheNames = await caches.keys();
  const oldCaches = cacheNames.filter(name => 
    name !== STATIC_CACHE_NAME && 
    name !== DYNAMIC_CACHE_NAME
  );
  
  await Promise.all(oldCaches.map(name => caches.delete(name)));
}