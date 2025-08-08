import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Check if Supabase credentials are properly configured
const isSupabaseConfigured = supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'your_supabase_project_url' &&
  supabaseAnonKey !== 'your_supabase_anon_key' &&
  supabaseUrl.startsWith('https://')

// Only create client if properly configured, otherwise use null
export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

export const isSupabaseEnabled = !!supabase

// Database Types
export type Patient = {
  id: string
  email: string
  full_name: string
  phone: string | null
  created_at: string
  updated_at: string
}

export type Appointment = {
  id: string
  patient_id: string
  appointment_date: string
  appointment_time: string
  status: 'scheduled' | 'completed' | 'cancelled'
  therapist_name: string
  treatment_type: string
  created_at: string
}

export type ProgressEntry = {
  id: string
  patient_id: string
  date: string
  pain_level: number
  mobility_score: number
  notes: string | null
  created_at: string
}