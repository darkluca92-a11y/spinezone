'use client';

// Performance optimization utility for intelligent preloading
class PerformancePreloader {
  private preloadedComponents = new Set<string>();
  private preloadPromises = new Map<string, Promise<any>>();
  private userInteracted = false;
  private idleTimer: NodeJS.Timeout | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.setupUserInteractionListeners();
      this.setupIdlePreloading();
    }
  }

  private setupUserInteractionListeners() {
    const interactionEvents = ['mousedown', 'touchstart', 'keydown'];
    
    const handleFirstInteraction = () => {
      this.userInteracted = true;
      this.preloadCriticalComponents();
      
      // Remove listeners after first interaction
      interactionEvents.forEach(event => {
        document.removeEventListener(event, handleFirstInteraction);
      });
    };

    interactionEvents.forEach(event => {
      document.addEventListener(event, handleFirstInteraction, { passive: true } as AddEventListenerOptions);
    });
  }

  private setupIdlePreloading() {
    // Preload after user becomes idle
    const resetIdleTimer = () => {
      if (this.idleTimer) {
        clearTimeout(this.idleTimer);
      }
      
      this.idleTimer = setTimeout(() => {
        if (!this.userInteracted) {
          this.preloadSecondaryComponents();
        }
      }, 2000); // 2 seconds of inactivity
    };

    ['scroll', 'mousemove', 'keypress', 'touchmove'].forEach(event => {
      document.addEventListener(event, resetIdleTimer, { passive: true } as AddEventListenerOptions);
    });

    // Initial timer
    resetIdleTimer();
  }

  private async preloadCriticalComponents() {
    console.log('[Preloader] Loading critical components after user interaction');
    
    // Preload appointment forms (most likely to be needed)
    this.preloadComponent('appointment-forms', () => 
      import('@/components/AppointmentBookingForms')
    );
    
    // Preload contact form
    this.preloadComponent('contact-form', () => 
      import('@/components/ContactForm')
    );
  }

  private async preloadSecondaryComponents() {
    console.log('[Preloader] Loading secondary components during idle time');
    
    // Preload animation components
    this.preloadComponent('animations', () => 
      import('@/components/LazyAnimationComponents')
    );
    
    // Preload heavy UI components
    this.preloadComponent('patient-dashboard', () => 
      import('@/components/PatientDashboard')
    );
  }

  private preloadComponent(key: string, importFn: () => Promise<any>) {
    if (this.preloadedComponents.has(key)) {
      return this.preloadPromises.get(key);
    }

    this.preloadedComponents.add(key);
    const promise = importFn().catch(error => {
      console.warn(`[Preloader] Failed to preload ${key}:`, error);
      this.preloadedComponents.delete(key);
    });

    this.preloadPromises.set(key, promise);
    return promise;
  }

  // Public API for manual preloading
  public preloadAppointmentForms() {
    return this.preloadComponent('appointment-forms', () => 
      import('@/components/AppointmentBookingForms')
    );
  }

  public preloadAnimations() {
    return this.preloadComponent('animations', () => 
      import('@/components/LazyAnimationComponents')
    );
  }

  public preloadFormComponents() {
    return Promise.all([
      this.preloadComponent('contact-form', () => import('@/components/ContactForm')),
      this.preloadComponent('assessment-form', () => import('@/components/InteractiveAssessment'))
    ]);
  }

  // Intelligent preloading based on user behavior
  public preloadBasedOnRoute(pathname: string) {
    switch (pathname) {
      case '/':
        // Home page - preload contact form and basic components
        this.preloadFormComponents();
        break;
      case '/services':
        // Services page - preload appointment forms
        this.preloadAppointmentForms();
        break;
      case '/assessment':
        // Assessment page - preload interactive components
        this.preloadComponent('assessment', () => import('@/components/InteractiveAssessment'));
        break;
      case '/contact':
        // Contact page - preload all form components
        this.preloadFormComponents();
        this.preloadAppointmentForms();
        break;
      default:
        // Default - preload essentials
        this.preloadFormComponents();
    }
  }

  // Performance monitoring
  public getPreloadedComponents() {
    return Array.from(this.preloadedComponents);
  }

  public isComponentPreloaded(key: string) {
    return this.preloadedComponents.has(key);
  }
}

// Singleton instance
const performancePreloader = typeof window !== 'undefined' ? new PerformancePreloader() : null;

export default performancePreloader;

// Hook for React components
export function usePerformancePreloader() {
  return {
    preloader: performancePreloader,
    preloadAppointmentForms: () => performancePreloader?.preloadAppointmentForms(),
    preloadAnimations: () => performancePreloader?.preloadAnimations(),
    preloadFormComponents: () => performancePreloader?.preloadFormComponents(),
    preloadBasedOnRoute: (pathname: string) => performancePreloader?.preloadBasedOnRoute(pathname),
  };
}

// Utility functions for manual preloading
export const preloadCriticalResources = () => {
  if (typeof window === 'undefined') return;

  // Preload critical fonts
  const fontLink = document.createElement('link');
  fontLink.rel = 'preload';
  fontLink.href = '/_next/static/media/26a46d62cd723877-s.woff2';
  fontLink.as = 'font';
  fontLink.type = 'font/woff2';
  fontLink.crossOrigin = 'anonymous';
  document.head.appendChild(fontLink);

  // Preload critical images
  const heroImage = new Image();
  heroImage.src = '/spinezone-logo-correct.png';

  // Prefetch important pages
  const prefetchPages = ['/services', '/assessment', '/contact'];
  prefetchPages.forEach(page => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = page;
    document.head.appendChild(link);
  });
};

export const preloadFramerMotion = () => {
  if (typeof window === 'undefined') return;
  
  return import('framer-motion').catch(error => {
    console.warn('[Preloader] Failed to preload framer-motion:', error);
  });
};