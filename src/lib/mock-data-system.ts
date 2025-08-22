/**
 * Mock Data System for Faster SSG Builds
 * Provides realistic mock responses for external APIs during build time
 */

// Mock data interfaces
interface MockLocation {
  id: number;
  name: string;
  address: string;
  phone: string;
  coordinates: { lat: number; lng: number };
  hours: Record<string, string>;
  yelp?: string;
}

interface MockAppointment {
  id: string;
  date: string;
  time: string;
  provider: string;
  service: string;
  available: boolean;
}

interface MockPatient {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  created_at: string;
  updated_at: string;
}

interface MockProgress {
  id: string;
  patient_id: string;
  date: string;
  pain_level: number;
  mobility_score: number;
  notes: string;
  created_at: string;
}

// Enhanced build-time configuration with better detection
const isBuildTime = process.env.NODE_ENV === 'production' && (
  process.env.NEXT_PHASE === 'phase-production-build' ||
  process.env.CI === 'true' ||
  process.env.VERCEL === '1' ||
  process.env.NETLIFY === 'true'
);

const isStaticExport = process.env.NEXT_EXPORT === 'true' || process.env.BUILD_STATIC === 'true';
const useMockData = process.env.USE_MOCK_DATA === 'true' || isBuildTime || isStaticExport;

// Performance tracking for build optimization
const buildPerformanceTracker = {
  mockRequestCount: 0,
  realRequestCount: 0,
  totalMockTime: 0,
  totalRealTime: 0,
  
  trackMockRequest: (duration: number) => {
    buildPerformanceTracker.mockRequestCount++;
    buildPerformanceTracker.totalMockTime += duration;
  },
  
  trackRealRequest: (duration: number) => {
    buildPerformanceTracker.realRequestCount++;
    buildPerformanceTracker.totalRealTime += duration;
  },
  
  getStats: () => ({
    mockRequests: buildPerformanceTracker.mockRequestCount,
    realRequests: buildPerformanceTracker.realRequestCount,
    avgMockTime: buildPerformanceTracker.totalMockTime / (buildPerformanceTracker.mockRequestCount || 1),
    avgRealTime: buildPerformanceTracker.totalRealTime / (buildPerformanceTracker.realRequestCount || 1),
    totalTimeSaved: buildPerformanceTracker.totalRealTime - buildPerformanceTracker.totalMockTime
  }),
  
  reset: () => {
    buildPerformanceTracker.mockRequestCount = 0;
    buildPerformanceTracker.realRequestCount = 0;
    buildPerformanceTracker.totalMockTime = 0;
    buildPerformanceTracker.totalRealTime = 0;
  }
};

// Mock location data for SpineZone clinics
const mockLocations: MockLocation[] = [
  {
    id: 1,
    name: 'SpineZone Downtown San Diego',
    address: '1234 Healing Way, Downtown San Diego, CA 92101',
    phone: '(619) 555-0123',
    coordinates: { lat: 32.7157, lng: -117.1611 },
    hours: {
      monday: '8:00 AM - 6:00 PM',
      tuesday: '8:00 AM - 6:00 PM',
      wednesday: '8:00 AM - 6:00 PM',
      thursday: '8:00 AM - 6:00 PM',
      friday: '8:00 AM - 5:00 PM',
      saturday: '9:00 AM - 2:00 PM',
      sunday: 'Closed'
    },
    yelp: 'https://www.yelp.com/biz/spinezone-downtown-san-diego'
  },
  {
    id: 2,
    name: 'SpineZone La Jolla',
    address: '5678 Wellness Blvd, La Jolla, CA 92037',
    phone: '(858) 555-0124',
    coordinates: { lat: 32.8328, lng: -117.2713 },
    hours: {
      monday: '7:00 AM - 7:00 PM',
      tuesday: '7:00 AM - 7:00 PM',
      wednesday: '7:00 AM - 7:00 PM',
      thursday: '7:00 AM - 7:00 PM',
      friday: '7:00 AM - 6:00 PM',
      saturday: '8:00 AM - 3:00 PM',
      sunday: 'Closed'
    },
    yelp: 'https://www.yelp.com/biz/spinezone-la-jolla'
  },
  {
    id: 3,
    name: 'SpineZone Pacific Beach',
    address: '910 Recovery Ave, Pacific Beach, CA 92109',
    phone: '(858) 555-0125',
    coordinates: { lat: 32.7941, lng: -117.2542 },
    hours: {
      monday: '8:00 AM - 6:00 PM',
      tuesday: '8:00 AM - 6:00 PM',
      wednesday: '8:00 AM - 6:00 PM',
      thursday: '8:00 AM - 6:00 PM',
      friday: '8:00 AM - 5:00 PM',
      saturday: '9:00 AM - 2:00 PM',
      sunday: 'Closed'
    },
    yelp: 'https://www.yelp.com/biz/spinezone-pacific-beach'
  },
  {
    id: 4,
    name: 'SpineZone Hillcrest',
    address: '1122 Therapy St, Hillcrest, CA 92103',
    phone: '(619) 555-0126',
    coordinates: { lat: 32.7488, lng: -117.1692 },
    hours: {
      monday: '8:00 AM - 6:00 PM',
      tuesday: '8:00 AM - 6:00 PM',
      wednesday: '8:00 AM - 6:00 PM',
      thursday: '8:00 AM - 6:00 PM',
      friday: '8:00 AM - 5:00 PM',
      saturday: '9:00 AM - 2:00 PM',
      sunday: 'Closed'
    }
  },
  {
    id: 5,
    name: 'SpineZone Carlsbad',
    address: '2200 Healing Circle, Carlsbad, CA 92008',
    phone: '(760) 555-0127',
    coordinates: { lat: 33.1581, lng: -117.3506 },
    hours: {
      monday: '8:00 AM - 6:00 PM',
      tuesday: '8:00 AM - 6:00 PM',
      wednesday: '8:00 AM - 6:00 PM',
      thursday: '8:00 AM - 6:00 PM',
      friday: '8:00 AM - 5:00 PM',
      saturday: '9:00 AM - 2:00 PM',
      sunday: 'Closed'
    }
  }
];

// Mock providers
const mockProviders = [
  'Dr. Sarah Smith, PT, DPT',
  'Dr. Michael Jones, PT, DPT', 
  'Dr. Lisa Williams, PT, DPT',
  'Dr. David Brown, PT, DPT',
  'Dr. Emily Chen, PT, DPT',
  'Dr. Robert Johnson, PT, DPT'
];

// Mock services
const mockServices = [
  'Free Consultation',
  'Comprehensive Assessment',
  'Manual Therapy',
  'Spinal Decompression',
  'Dry Needling',
  'Exercise Therapy',
  'Sports Rehabilitation',
  'Post-Surgical Recovery'
];

// Utility functions
const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

const randomDate = (start: Date, end: Date): Date => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const randomChoice = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

// Mock data generators
class MockDataGenerator {
  // Generate mock appointment availability
  static generateAppointmentSlots(date: string, locationId?: number): MockAppointment[] {
    const slots: MockAppointment[] = [];
    const timeSlots = [
      '09:00', '10:00', '11:00', '13:00', 
      '14:00', '15:00', '16:00', '17:00'
    ];

    timeSlots.forEach(time => {
      // Randomly make some slots unavailable for realism
      const available = Math.random() > 0.3;
      
      slots.push({
        id: generateId(),
        date,
        time,
        provider: randomChoice(mockProviders),
        service: randomChoice(mockServices),
        available
      });
    });

    return slots;
  }

  // Generate mock patient data
  static generatePatients(count: number = 50): MockPatient[] {
    const patients: MockPatient[] = [];
    const firstNames = ['John', 'Jane', 'Michael', 'Sarah', 'David', 'Lisa', 'Robert', 'Emily', 'James', 'Jessica'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Wilson', 'Moore'];

    for (let i = 0; i < count; i++) {
      const firstName = randomChoice(firstNames);
      const lastName = randomChoice(lastNames);
      const createdDate = randomDate(new Date(2023, 0, 1), new Date());

      patients.push({
        id: generateId(),
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@email.com`,
        full_name: `${firstName} ${lastName}`,
        phone: `(${Math.floor(Math.random() * 900) + 100}) 555-${Math.floor(Math.random() * 9000) + 1000}`,
        created_at: createdDate.toISOString(),
        updated_at: createdDate.toISOString()
      });
    }

    return patients;
  }

  // Generate mock progress entries
  static generateProgressEntries(patientId: string, count: number = 10): MockProgress[] {
    const entries: MockProgress[] = [];
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - (count * 7)); // Start from weeks ago

    for (let i = 0; i < count; i++) {
      const entryDate = new Date(startDate);
      entryDate.setDate(entryDate.getDate() + (i * 7));

      // Simulate improving pain and mobility over time
      const progressFactor = i / count;
      const painLevel = Math.max(1, Math.round(8 - (progressFactor * 6) + (Math.random() * 2 - 1)));
      const mobilityScore = Math.min(10, Math.round(3 + (progressFactor * 6) + (Math.random() * 2 - 1)));

      const notes = [
        'Patient shows good progress with treatment plan',
        'Mild improvement in range of motion',
        'Reduced pain during daily activities',
        'Excellent compliance with exercise program',
        'Some stiffness in the morning, improving throughout day',
        'Patient reports sleeping better',
        'Increased activity tolerance',
        'Good response to manual therapy'
      ];

      entries.push({
        id: generateId(),
        patient_id: patientId,
        date: entryDate.toISOString().split('T')[0],
        pain_level: painLevel,
        mobility_score: mobilityScore,
        notes: randomChoice(notes),
        created_at: entryDate.toISOString()
      });
    }

    return entries;
  }

  // Generate mock Calendly availability response
  static generateCalendlyAvailability(date: string): any {
    const slots = this.generateAppointmentSlots(date);
    
    return {
      data: {
        date,
        available_times: slots.filter(slot => slot.available).map(slot => ({
          time: slot.time,
          provider: slot.provider,
          duration: 30,
          booking_url: `https://calendly.com/spinezone/${slot.id}`
        }))
      },
      meta: {
        total_count: slots.filter(slot => slot.available).length,
        timezone: 'America/Los_Angeles'
      }
    };
  }

  // Generate mock Google Maps geocoding response
  static generateGeocodingResponse(address: string): any {
    const location = mockLocations.find(loc => 
      loc.address.toLowerCase().includes(address.toLowerCase())
    ) || mockLocations[0];

    return {
      results: [
        {
          formatted_address: location.address,
          geometry: {
            location: location.coordinates,
            location_type: 'ROOFTOP',
            viewport: {
              northeast: {
                lat: location.coordinates.lat + 0.01,
                lng: location.coordinates.lng + 0.01
              },
              southwest: {
                lat: location.coordinates.lat - 0.01,
                lng: location.coordinates.lng - 0.01
              }
            }
          },
          place_id: `mock_place_id_${location.id}`,
          types: ['street_address']
        }
      ],
      status: 'OK'
    };
  }

  // Generate mock Supabase response
  static generateSupabaseResponse<T>(data: T[], single: boolean = false): any {
    return {
      data: single ? (data[0] || null) : data,
      error: null,
      count: data.length,
      status: 200,
      statusText: 'OK'
    };
  }
}

// Mock API handlers
export const mockAPIHandlers = {
  // Calendly API mocks
  calendly: {
    getAvailability: (date: string, location?: string) => {
      return MockDataGenerator.generateCalendlyAvailability(date);
    },
    
    createBooking: (bookingData: any) => {
      return {
        data: {
          id: generateId(),
          ...bookingData,
          status: 'confirmed',
          created_at: new Date().toISOString(),
          booking_url: `https://calendly.com/spinezone/${generateId()}`
        }
      };
    }
  },

  // Google Maps API mocks
  maps: {
    geocode: (address: string) => {
      return MockDataGenerator.generateGeocodingResponse(address);
    },
    
    directions: (origin: string, destination: string) => {
      return {
        routes: [
          {
            overview_polyline: { points: 'mock_polyline_data' },
            legs: [
              {
                distance: { text: '5.2 mi', value: 8369 },
                duration: { text: '12 mins', value: 720 },
                start_address: origin,
                end_address: destination
              }
            ]
          }
        ],
        status: 'OK'
      };
    }
  },

  // Supabase API mocks
  supabase: {
    patients: {
      select: (query?: string) => {
        const patients = MockDataGenerator.generatePatients(20);
        return MockDataGenerator.generateSupabaseResponse(patients);
      },
      
      insert: (data: any) => {
        const newPatient = {
          id: generateId(),
          ...data,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        return MockDataGenerator.generateSupabaseResponse([newPatient], true);
      },
      
      update: (id: string, data: any) => {
        const updatedPatient = {
          id,
          ...data,
          updated_at: new Date().toISOString()
        };
        return MockDataGenerator.generateSupabaseResponse([updatedPatient], true);
      }
    },

    appointments: {
      select: (query?: string) => {
        const appointments = [];
        for (let i = 0; i < 15; i++) {
          const date = new Date();
          date.setDate(date.getDate() + Math.floor(Math.random() * 30));
          
          appointments.push({
            id: generateId(),
            patient_id: generateId(),
            appointment_date: date.toISOString().split('T')[0],
            appointment_time: randomChoice(['09:00', '10:00', '11:00', '14:00', '15:00']),
            status: randomChoice(['scheduled', 'completed', 'cancelled']),
            therapist_name: randomChoice(mockProviders),
            treatment_type: randomChoice(mockServices),
            created_at: new Date().toISOString()
          });
        }
        return MockDataGenerator.generateSupabaseResponse(appointments);
      }
    },

    progress: {
      select: (patientId?: string) => {
        const entries = MockDataGenerator.generateProgressEntries(patientId || generateId());
        return MockDataGenerator.generateSupabaseResponse(entries);
      }
    }
  },

  // Vapi AI mocks
  vapi: {
    createCall: () => {
      return {
        call_id: generateId(),
        status: 'initiated',
        assistant_id: 'mock_assistant_id',
        created_at: new Date().toISOString()
      };
    },
    
    getCallStatus: (callId: string) => {
      return {
        call_id: callId,
        status: randomChoice(['active', 'completed', 'failed']),
        duration: Math.floor(Math.random() * 300) + 30, // 30-330 seconds
        cost: Math.round(Math.random() * 10 + 1) / 100 // $0.01-0.11
      };
    }
  }
};

// Enhanced mock response interceptor with build optimization
class MockResponseInterceptor {
  private static enabled = useMockData;
  private static mockDelay = process.env.MOCK_API_DELAY ? parseInt(process.env.MOCK_API_DELAY) : 
    (isBuildTime ? 0 : 100); // No delay during builds for speed
  private static cache = new Map<string, { data: any; timestamp: number; ttl: number }>();
  private static failureRate = parseFloat(process.env.MOCK_FAILURE_RATE || '0.05'); // 5% default failure rate for realistic testing

  static enable(): void {
    this.enabled = true;
    console.log('🎭 Mock data interceptor enabled');
  }

  static disable(): void {
    this.enabled = false;
    console.log('🎭 Mock data interceptor disabled');
  }

  static isEnabled(): boolean {
    return this.enabled;
  }

  static clearCache(): void {
    this.cache.clear();
  }

  static getCacheStats(): { size: number; keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys())
    };
  }

  // Enhanced intercept with caching and performance tracking
  static async intercept<T>(
    url: string, 
    realApiCall: () => Promise<T>,
    mockResponse: () => T,
    options: {
      cache?: boolean;
      cacheTtl?: number;
      allowFailure?: boolean;
    } = {}
  ): Promise<T> {
    const startTime = performance.now();
    const { cache = false, cacheTtl = 5 * 60 * 1000, allowFailure = false } = options;

    if (!this.enabled) {
      const result = await realApiCall();
      buildPerformanceTracker.trackRealRequest(performance.now() - startTime);
      return result;
    }

    // Check cache first
    if (cache) {
      const cacheKey = `mock:${url}`;
      const cached = this.cache.get(cacheKey);
      if (cached && Date.now() - cached.timestamp < cached.ttl) {
        buildPerformanceTracker.trackMockRequest(performance.now() - startTime);
        return cached.data;
      }
    }

    // Simulate realistic failures for testing
    if (allowFailure && Math.random() < this.failureRate) {
      throw new Error(`Mock API failure simulation for: ${url}`);
    }

    // Add realistic delay (only in development, not during build)
    if (this.mockDelay > 0) {
      await new Promise(resolve => setTimeout(resolve, this.mockDelay));
    }

    const mockData = mockResponse();
    
    // Cache the result if requested
    if (cache) {
      const cacheKey = `mock:${url}`;
      this.cache.set(cacheKey, {
        data: mockData,
        timestamp: Date.now(),
        ttl: cacheTtl
      });
    }

    if (process.env.NODE_ENV === 'development' || isBuildTime) {
      console.log(`🎭 Mock response for: ${url}`);
    }

    buildPerformanceTracker.trackMockRequest(performance.now() - startTime);
    return mockData;
  }

  static async interceptConditional<T>(
    condition: boolean,
    realApiCall: () => Promise<T>,
    mockResponse: () => T,
    options: {
      cache?: boolean;
      cacheTtl?: number;
      allowFailure?: boolean;
    } = {}
  ): Promise<T> {
    if (!condition || !this.enabled) {
      const startTime = performance.now();
      const result = await realApiCall();
      buildPerformanceTracker.trackRealRequest(performance.now() - startTime);
      return result;
    }

    return this.intercept(`conditional:${Math.random()}`, realApiCall, mockResponse, options);
  }

  // Batch processing for multiple mock requests (useful for SSG)
  static async batchIntercept<T>(
    requests: Array<{
      key: string;
      realApiCall: () => Promise<T>;
      mockResponse: () => T;
    }>,
    options: {
      concurrent?: boolean;
      cache?: boolean;
    } = {}
  ): Promise<Record<string, T>> {
    const { concurrent = true, cache = true } = options;
    const results: Record<string, T> = {};

    if (concurrent) {
      const promises = requests.map(async req => {
        const result = await this.intercept(
          req.key,
          req.realApiCall,
          req.mockResponse,
          { cache }
        );
        return { key: req.key, result };
      });

      const completed = await Promise.allSettled(promises);
      completed.forEach((promise, index) => {
        if (promise.status === 'fulfilled') {
          results[promise.value.key] = promise.value.result;
        } else {
          console.warn(`Mock batch request failed for ${requests[index].key}:`, promise.reason);
        }
      });
    } else {
      for (const req of requests) {
        try {
          results[req.key] = await this.intercept(
            req.key,
            req.realApiCall,
            req.mockResponse,
            { cache }
          );
        } catch (error) {
          console.warn(`Mock batch request failed for ${req.key}:`, error);
        }
      }
    }

    return results;
  }

  // Generate realistic response times based on service type
  static getRealisticDelay(serviceType: 'database' | 'api' | 'cdn' | 'websocket' = 'api'): number {
    if (isBuildTime) return 0; // No delay during builds

    const baseDelays = {
      database: 50,    // Fast database queries
      api: 200,        // REST API calls
      cdn: 100,        // CDN resources
      websocket: 20    // Real-time connections
    };

    const baseDelay = baseDelays[serviceType];
    const jitter = Math.random() * baseDelay * 0.5; // Add up to 50% jitter
    return Math.round(baseDelay + jitter);
  }
}

// Helper functions for integration
export const withMockFallback = {
  // Calendly integration
  async calendlyRequest<T>(
    url: string, 
    config: any, 
    mockGenerator: () => T
  ): Promise<T> {
    const isCalendlyConfigured = !!process.env.CALENDLY_API_TOKEN;
    
    return MockResponseInterceptor.interceptConditional(
      !isCalendlyConfigured,
      async () => {
        const response = await fetch(url, config);
        return response.json();
      },
      mockGenerator
    );
  },

  // Google Maps integration  
  async mapsRequest<T>(
    url: string,
    mockGenerator: () => T
  ): Promise<T> {
    const isGoogleMapsConfigured = !!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    
    return MockResponseInterceptor.interceptConditional(
      !isGoogleMapsConfigured,
      async () => {
        const response = await fetch(url);
        return response.json();
      },
      mockGenerator
    );
  },

  // Supabase integration
  async supabaseRequest<T>(
    realQuery: () => Promise<T>,
    mockGenerator: () => T
  ): Promise<T> {
    const isSupabaseConfigured = !!(
      process.env.NEXT_PUBLIC_SUPABASE_URL && 
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
    
    return MockResponseInterceptor.interceptConditional(
      !isSupabaseConfigured,
      realQuery,
      mockGenerator
    );
  }
};

// Export location data for static generation
export const staticMockData = {
  locations: mockLocations,
  providers: mockProviders,
  services: mockServices,
  samplePatients: MockDataGenerator.generatePatients(5),
  sampleProgress: MockDataGenerator.generateProgressEntries(generateId(), 5)
};

// Development utilities
if (process.env.NODE_ENV === 'development') {
  (window as any).mockDataDebug = {
    MockDataGenerator,
    mockAPIHandlers,
    MockResponseInterceptor,
    staticMockData,
    isEnabled: () => MockResponseInterceptor.isEnabled(),
    enable: () => MockResponseInterceptor.enable(),
    disable: () => MockResponseInterceptor.disable(),
  };
}

export { MockDataGenerator, MockResponseInterceptor };
export default mockAPIHandlers;