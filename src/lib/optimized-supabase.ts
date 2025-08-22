import { createClient, SupabaseClient } from '@supabase/supabase-js'
import React from 'react'

// Enhanced Supabase configuration with performance optimizations
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Check if Supabase credentials are properly configured
const isSupabaseConfigured = supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'your_supabase_project_url' &&
  supabaseAnonKey !== 'your_supabase_anon_key' &&
  supabaseUrl.startsWith('https://')

// Connection pooling and retry configuration
const connectionConfig = {
  db: {
    schema: 'public',
  },
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce' as const,
  },
  realtime: {
    params: {
      eventsPerSecond: 10, // Rate limiting for realtime events
    },
  },
  global: {
    headers: {
      'x-client-info': 'spinezone-web',
    },
  },
}

// Create optimized Supabase client with connection pooling
export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey, connectionConfig)
  : null

export const isSupabaseEnabled = !!supabase

// Connection pool manager
class SupabaseConnectionPool {
  private static instance: SupabaseConnectionPool
  private connections: Map<string, SupabaseClient<any, 'public', any>> = new Map()
  private connectionCount = 0
  private maxConnections = 10
  private retryAttempts = 3
  private retryDelay = 1000

  static getInstance(): SupabaseConnectionPool {
    if (!SupabaseConnectionPool.instance) {
      SupabaseConnectionPool.instance = new SupabaseConnectionPool()
    }
    return SupabaseConnectionPool.instance
  }

  getConnection(key: string = 'default'): SupabaseClient<any, 'public', any> | null {
    if (!isSupabaseConfigured) return null

    if (this.connections.has(key)) {
      return this.connections.get(key)!
    }

    if (this.connectionCount >= this.maxConnections) {
      console.warn('Maximum Supabase connections reached, reusing existing connection')
      return this.connections.values().next().value as SupabaseClient<any, 'public', any> || null
    }

    const connection = createClient(supabaseUrl!, supabaseAnonKey!, connectionConfig)
    this.connections.set(key, connection as SupabaseClient<any, 'public', any>)
    this.connectionCount++

    return connection as SupabaseClient<any, 'public', any>
  }

  closeConnection(key: string): void {
    if (this.connections.has(key)) {
      this.connections.delete(key)
      this.connectionCount--
    }
  }

  closeAllConnections(): void {
    this.connections.clear()
    this.connectionCount = 0
  }

  async executeWithRetry<T>(
    operation: () => Promise<T>,
    attempts: number = this.retryAttempts
  ): Promise<T> {
    try {
      return await operation()
    } catch (error) {
      if (attempts > 1) {
        console.warn(`Supabase operation failed, retrying... (${this.retryAttempts - attempts + 1}/${this.retryAttempts})`)
        await new Promise(resolve => setTimeout(resolve, this.retryDelay))
        return this.executeWithRetry(operation, attempts - 1)
      }
      throw error
    }
  }
}

// Export connection pool instance
export const connectionPool = SupabaseConnectionPool.getInstance()

// Enhanced database types with better TypeScript support
export type Patient = {
  id: string
  email: string
  full_name: string
  phone: string | null
  created_at: string
  updated_at: string
  metadata?: Record<string, any>
}

export type Appointment = {
  id: string
  patient_id: string
  appointment_date: string
  appointment_time: string
  status: 'scheduled' | 'completed' | 'cancelled' | 'no_show'
  therapist_name: string
  treatment_type: string
  location_id?: string
  notes?: string
  created_at: string
  updated_at: string
}

export type ProgressEntry = {
  id: string
  patient_id: string
  date: string
  pain_level: number
  mobility_score: number
  notes: string | null
  exercise_compliance?: number
  goals_met?: boolean
  created_at: string
  updated_at: string
}

export type Location = {
  id: string
  name: string
  address: string
  phone: string
  email?: string
  coordinates: {
    lat: number
    lng: number
  }
  hours: Record<string, string>
  services: string[]
  is_active: boolean
  created_at: string
}

// Enhanced error handling with specific error types
export class SupabaseError extends Error {
  constructor(
    message: string,
    public code?: string,
    public details?: any,
    public hint?: string
  ) {
    super(message)
    this.name = 'SupabaseError'
  }
}

export class ConnectionError extends SupabaseError {
  constructor(message: string = 'Failed to connect to database') {
    super(message, 'CONNECTION_ERROR')
    this.name = 'ConnectionError'
  }
}

export class AuthenticationError extends SupabaseError {
  constructor(message: string = 'Authentication failed') {
    super(message, 'AUTH_ERROR')
    this.name = 'AuthenticationError'
  }
}

export class ValidationError extends SupabaseError {
  constructor(message: string = 'Data validation failed') {
    super(message, 'VALIDATION_ERROR')
    this.name = 'ValidationError'
  }
}

// Optimized query builder with caching
class OptimizedQueryBuilder {
  private cache: Map<string, { data: any; timestamp: number; ttl: number }> = new Map()
  private defaultTTL = 5 * 60 * 1000 // 5 minutes

  private getCacheKey(table: string, query: any): string {
    return `${table}-${JSON.stringify(query)}`
  }

  private isValidCache(cacheEntry: { timestamp: number; ttl: number }): boolean {
    return Date.now() - cacheEntry.timestamp < cacheEntry.ttl
  }

  async cachedQuery<T>(
    table: string,
    queryFn: () => Promise<{ data: T | null; error: any }>,
    ttl: number = this.defaultTTL,
    cacheKey?: string
  ): Promise<{ data: T | null; error: any }> {
    if (!isSupabaseEnabled) {
      return { data: null, error: new ConnectionError('Supabase not configured') }
    }

    const key = cacheKey || this.getCacheKey(table, queryFn.toString())
    const cached = this.cache.get(key)

    if (cached && this.isValidCache(cached)) {
      return { data: cached.data, error: null }
    }

    try {
      const result = await connectionPool.executeWithRetry(queryFn)
      
      if (!result.error && result.data) {
        this.cache.set(key, {
          data: result.data,
          timestamp: Date.now(),
          ttl
        })
      }

      return result
    } catch (error) {
      console.error('Query failed:', error)
      return { data: null, error: new SupabaseError('Query execution failed', 'QUERY_ERROR', error) }
    }
  }

  clearCache(pattern?: string): void {
    if (pattern) {
      for (const key of Array.from(this.cache.keys())) {
        if (key.includes(pattern)) {
          this.cache.delete(key)
        }
      }
    } else {
      this.cache.clear()
    }
  }

  getCacheStats(): { size: number; keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys())
    }
  }
}

export const queryBuilder = new OptimizedQueryBuilder()

// Optimized patient operations with enhanced error handling
export const patientOperations = {
  async create(patientData: Omit<Patient, 'id' | 'created_at' | 'updated_at'>): Promise<{ data: Patient | null; error: any }> {
    if (!isSupabaseEnabled) {
      return { data: null, error: new ConnectionError() }
    }

    try {
      const client = connectionPool.getConnection('patients')
      if (!client) throw new ConnectionError()

      const { data, error } = await client
        .from('patients')
        .insert([{
          ...patientData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])
        .select()
        .single()

      if (error) throw new SupabaseError(error.message, error.code, error.details, error.hint)

      // Clear cache for patient queries
      queryBuilder.clearCache('patients')

      return { data, error: null }
    } catch (error) {
      console.error('Failed to create patient:', error)
      return { data: null, error }
    }
  },

  async getById(id: string): Promise<{ data: Patient | null; error: any }> {
    return queryBuilder.cachedQuery(
      'patients',
      async () => {
        const client = connectionPool.getConnection('patients')
        if (!client) throw new ConnectionError()

        return client
          .from('patients')
          .select('*')
          .eq('id', id)
          .single()
      },
      10 * 60 * 1000, // 10 minute cache
      `patient-${id}`
    )
  },

  async getByEmail(email: string): Promise<{ data: Patient | null; error: any }> {
    return queryBuilder.cachedQuery(
      'patients',
      async () => {
        const client = connectionPool.getConnection('patients')
        if (!client) throw new ConnectionError()

        return client
          .from('patients')
          .select('*')
          .eq('email', email)
          .single()
      },
      5 * 60 * 1000, // 5 minute cache
      `patient-email-${email}`
    )
  },

  async update(id: string, updates: Partial<Patient>): Promise<{ data: Patient | null; error: any }> {
    if (!isSupabaseEnabled) {
      return { data: null, error: new ConnectionError() }
    }

    try {
      const client = connectionPool.getConnection('patients')
      if (!client) throw new ConnectionError()

      const { data, error } = await client
        .from('patients')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single()

      if (error) throw new SupabaseError(error.message, error.code, error.details, error.hint)

      // Clear cache for this patient
      queryBuilder.clearCache(`patient-${id}`)
      queryBuilder.clearCache('patients')

      return { data, error: null }
    } catch (error) {
      console.error('Failed to update patient:', error)
      return { data: null, error }
    }
  }
}

// Optimized appointment operations
export const appointmentOperations = {
  async create(appointmentData: Omit<Appointment, 'id' | 'created_at' | 'updated_at'>): Promise<{ data: Appointment | null; error: any }> {
    if (!isSupabaseEnabled) {
      return { data: null, error: new ConnectionError() }
    }

    try {
      const client = connectionPool.getConnection('appointments')
      if (!client) throw new ConnectionError()

      const { data, error } = await client
        .from('appointments')
        .insert([{
          ...appointmentData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])
        .select()
        .single()

      if (error) throw new SupabaseError(error.message, error.code, error.details, error.hint)

      // Clear cache for appointment queries
      queryBuilder.clearCache('appointments')

      return { data, error: null }
    } catch (error) {
      console.error('Failed to create appointment:', error)
      return { data: null, error }
    }
  },

  async getByPatientId(patientId: string, limit: number = 10): Promise<{ data: Appointment[] | null; error: any }> {
    return queryBuilder.cachedQuery(
      'appointments',
      async () => {
        const client = connectionPool.getConnection('appointments')
        if (!client) throw new ConnectionError()

        return client
          .from('appointments')
          .select('*')
          .eq('patient_id', patientId)
          .order('appointment_date', { ascending: false })
          .limit(limit)
      },
      2 * 60 * 1000, // 2 minute cache
      `appointments-patient-${patientId}-${limit}`
    )
  },

  async getUpcoming(limit: number = 20): Promise<{ data: Appointment[] | null; error: any }> {
    return queryBuilder.cachedQuery(
      'appointments',
      async () => {
        const client = connectionPool.getConnection('appointments')
        if (!client) throw new ConnectionError()

        const today = new Date().toISOString().split('T')[0]

        return client
          .from('appointments')
          .select('*')
          .gte('appointment_date', today)
          .eq('status', 'scheduled')
          .order('appointment_date', { ascending: true })
          .order('appointment_time', { ascending: true })
          .limit(limit)
      },
      1 * 60 * 1000, // 1 minute cache
      `upcoming-appointments-${limit}`
    )
  }
}

// Progress tracking operations
export const progressOperations = {
  async create(progressData: Omit<ProgressEntry, 'id' | 'created_at' | 'updated_at'>): Promise<{ data: ProgressEntry | null; error: any }> {
    if (!isSupabaseEnabled) {
      return { data: null, error: new ConnectionError() }
    }

    try {
      const client = connectionPool.getConnection('progress')
      if (!client) throw new ConnectionError()

      const { data, error } = await client
        .from('progress_entries')
        .insert([{
          ...progressData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])
        .select()
        .single()

      if (error) throw new SupabaseError(error.message, error.code, error.details, error.hint)

      // Clear cache for progress queries
      queryBuilder.clearCache('progress')

      return { data, error: null }
    } catch (error) {
      console.error('Failed to create progress entry:', error)
      return { data: null, error }
    }
  },

  async getByPatientId(patientId: string, limit: number = 50): Promise<{ data: ProgressEntry[] | null; error: any }> {
    return queryBuilder.cachedQuery(
      'progress',
      async () => {
        const client = connectionPool.getConnection('progress')
        if (!client) throw new ConnectionError()

        return client
          .from('progress_entries')
          .select('*')
          .eq('patient_id', patientId)
          .order('date', { ascending: false })
          .limit(limit)
      },
      5 * 60 * 1000, // 5 minute cache
      `progress-patient-${patientId}-${limit}`
    )
  }
}

// Health check and monitoring
export const healthCheck = {
  async checkConnection(): Promise<{ healthy: boolean; latency?: number; error?: any }> {
    if (!isSupabaseEnabled) {
      return { healthy: false, error: new ConnectionError('Supabase not configured') }
    }

    const startTime = Date.now()
    
    try {
      const client = connectionPool.getConnection('health')
      if (!client) throw new ConnectionError()

      const { error } = await client
        .from('patients')
        .select('id')
        .limit(1)

      const latency = Date.now() - startTime

      if (error) {
        return { healthy: false, latency, error: new SupabaseError(error.message, error.code) }
      }

      return { healthy: true, latency }
    } catch (error) {
      return { healthy: false, latency: Date.now() - startTime, error }
    }
  },

  async getMetrics(): Promise<{
    connectionCount: number
    cacheStats: { size: number; keys: string[] }
    isConfigured: boolean
  }> {
    return {
      connectionCount: connectionPool['connectionCount'],
      cacheStats: queryBuilder.getCacheStats(),
      isConfigured: isSupabaseEnabled
    }
  }
}

// Cleanup function for application shutdown
export const cleanup = (): void => {
  connectionPool.closeAllConnections()
  queryBuilder.clearCache()
  console.log('Supabase connections and cache cleared')
}

// React hook for Supabase health monitoring
export const useSupabaseHealth = () => {
  const [health, setHealth] = React.useState<{ healthy: boolean; latency?: number; error?: any }>({ healthy: true })

  React.useEffect(() => {
    const checkHealth = async () => {
      const result = await healthCheck.checkConnection()
      setHealth(result)
    }

    checkHealth()
    const interval = setInterval(checkHealth, 30000) // Check every 30 seconds

    return () => clearInterval(interval)
  }, [])

  return health
}

// Development utilities
if (process.env.NODE_ENV === 'development') {
  (window as any).supabaseDebug = {
    connectionPool,
    queryBuilder,
    healthCheck,
    cleanup,
    operations: {
      patients: patientOperations,
      appointments: appointmentOperations,
      progress: progressOperations
    }
  }
}