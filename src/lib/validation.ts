import { z } from 'zod';

// Contact form validation schema
export const contactSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes'),
  email: z
    .string()
    .email('Invalid email address')
    .max(255, 'Email must be less than 255 characters'),
  phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^\+?[\d\s\-\(\)]{10,20}$/.test(val),
      'Invalid phone number format'
    ),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters')
});

// Authentication validation schemas
export const signUpSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(12, 'Password must be at least 12 characters'),
  fullName: z
    .string()
    .min(1, 'Full name is required')
    .max(100, 'Full name must be less than 100 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes'),
  phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^\+?[\d\s\-\(\)]{10,20}$/.test(val),
      'Invalid phone number format'
    ),
});

export const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

// Patient data validation
export const patientDataSchema = z.object({
  full_name: z.string().min(1).max(100),
  email: z.string().email(),
  phone: z.string().optional(),
  date_of_birth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
});

// Analytics data validation (anonymized)
export const analyticsSchema = z.object({
  event: z.string().min(1).max(50),
  page: z.string().min(1).max(255),
  timestamp: z.string().datetime(),
  session_id: z.string().uuid(),
});

// API Error types
export interface APIError {
  message: string;
  code?: string;
  statusCode?: number;
  field?: string;
}

// Response types
export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: APIError;
}

// Appointment booking validation schemas
export const appointmentSchema = z.object({
  // Patient Information
  firstName: z
    .string()
    .min(1, 'First name is required')
    .max(50, 'First name must be less than 50 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'First name can only contain letters, spaces, hyphens, and apostrophes'),
  lastName: z
    .string()
    .min(1, 'Last name is required')
    .max(50, 'Last name must be less than 50 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Last name can only contain letters, spaces, hyphens, and apostrophes'),
  email: z
    .string()
    .email('Invalid email address')
    .max(255, 'Email must be less than 255 characters'),
  phone: z
    .string()
    .min(10, 'Phone number is required for appointment booking')
    .regex(/^\+?[\d\s\-\(\)]{10,20}$/, 'Invalid phone number format'),
  dateOfBirth: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Please enter a valid date (YYYY-MM-DD)')
    .optional(),
  
  // Appointment Details
  appointmentType: z.enum([
    'initial-consultation',
    'followup-appointment',
    'assessment',
    'treatment-session',
    'urgent-care',
    'second-opinion',
    'maintenance-check'
  ]),
  preferredDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Please select a valid date'),
  preferredTime: z.enum([
    'morning-early',  // 7-9 AM
    'morning-late',   // 9-11 AM
    'midday',         // 11-1 PM
    'afternoon-early', // 1-3 PM
    'afternoon-late',  // 3-5 PM
    'evening'         // 5-7 PM
  ]),
  alternativeDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Please select a valid alternative date')
    .optional(),
  alternativeTime: z.enum([
    'morning-early',
    'morning-late',
    'midday',
    'afternoon-early',
    'afternoon-late',
    'evening'
  ]).optional(),
  
  // Location & Provider Preferences
  preferredLocation: z.enum([
    'downtown-san-diego',
    'la-jolla',
    'pacific-beach',
    'hillcrest',
    'mission-valley',
    'chula-vista',
    'carlsbad',
    'encinitas',
    'del-mar',
    'any-location'
  ]),
  providerPreference: z.enum([
    'any-provider',
    'male-provider',
    'female-provider',
    'specific-provider'
  ]),
  specificProvider: z.string().optional(),
  
  // Medical Information
  primaryCondition: z.enum([
    'back-pain',
    'neck-pain',
    'shoulder-pain',
    'hip-pain',
    'knee-pain',
    'ankle-pain',
    'multiple-areas',
    'sports-injury',
    'post-surgery',
    'chronic-pain',
    'other'
  ]),
  painLevel: z.number().min(0).max(10),
  symptomDuration: z.enum([
    'less-than-week',
    'one-to-four-weeks',
    'one-to-three-months',
    'three-to-six-months',
    'six-months-to-year',
    'more-than-year'
  ]),
  previousTreatment: z.boolean(),
  currentMedications: z.string().optional(),
  medicalHistory: z.string().optional(),
  
  // Insurance & Payment
  hasInsurance: z.boolean(),
  insuranceProvider: z.string().optional(),
  policyNumber: z.string().optional(),
  paymentMethod: z.enum([
    'insurance',
    'self-pay',
    'workers-comp',
    'auto-insurance',
    'va-benefits'
  ]),
  
  // Additional Information
  urgentCare: z.boolean(),
  transportationNeeds: z.boolean(),
  accessibilityNeeds: z.string().optional(),
  additionalNotes: z.string().max(500, 'Additional notes must be less than 500 characters').optional(),
  
  // Consent & Communication
  communicationMethod: z.enum(['email', 'phone', 'text']),
  marketingConsent: z.boolean(),
  hipaaConsent: z.boolean().refine((val) => val === true, {
    message: 'HIPAA consent is required for appointment booking'
  }),
  treatmentConsent: z.boolean().refine((val) => val === true, {
    message: 'Treatment consent is required for appointment booking'
  })
});

// Treatment journey phase-specific appointment schema
export const phaseAppointmentSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number is required'),
  currentPhase: z.enum(['phase-1', 'phase-2', 'phase-3', 'new-patient']),
  appointmentReason: z.enum([
    'regular-session',
    'progress-assessment',
    'phase-transition',
    'exercise-adjustment',
    'pain-increase',
    'question-consultation'
  ]),
  progressNotes: z.string().max(300, 'Progress notes must be less than 300 characters').optional(),
  preferredDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Please select a valid date'),
  preferredTime: z.string(),
  preferredLocation: z.string()
});

// Service-specific appointment schema
export const serviceAppointmentSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number is required'),
  serviceType: z.enum([
    'spinezone-strength',
    'intensive-program',
    'maintenance-program',
    'consultation-only',
    'assessment-only'
  ]),
  conditionSeverity: z.enum(['mild', 'moderate', 'severe']),
  treatmentGoals: z.array(z.enum([
    'pain-elimination',
    'improved-mobility',
    'strength-building',
    'return-to-sports',
    'daily-function',
    'injury-prevention'
  ])).min(1, 'Please select at least one treatment goal'),
  previousExperience: z.enum([
    'never-had-pt',
    'some-experience',
    'extensive-experience'
  ]),
  preferredDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Please select a valid date'),
  preferredTime: z.string(),
  preferredLocation: z.string(),
  additionalInfo: z.string().max(400, 'Additional information must be less than 400 characters').optional()
});

// Assessment appointment schema
export const assessmentAppointmentSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number is required'),
  
  // Detailed Assessment Information
  primaryConcern: z.string().min(10, 'Please describe your primary concern (minimum 10 characters)'),
  painLevel: z.number().min(0).max(10),
  functionalLimitations: z.array(z.enum([
    'difficulty-walking',
    'trouble-sleeping',
    'cannot-exercise',
    'work-limitations',
    'daily-tasks-difficult',
    'sports-activities-limited',
    'social-activities-limited'
  ])).min(1, 'Please select at least one limitation'),
  symptomPattern: z.enum([
    'constant-pain',
    'intermittent-pain',
    'morning-stiffness',
    'evening-worse',
    'activity-related',
    'weather-related'
  ]),
  treatmentExpectations: z.string().min(10, 'Please share your treatment expectations'),
  
  preferredDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Please select a valid date'),
  preferredTime: z.string(),
  preferredLocation: z.string(),
  urgentAssessment: z.boolean()
});

// Location-based appointment schema
export const locationAppointmentSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number is required'),
  specificLocation: z.string(),
  providerRequest: z.string().optional(),
  appointmentType: z.string(),
  travelDistance: z.enum(['less-than-5', '5-to-10', '10-to-20', 'more-than-20']),
  transportationMethod: z.enum(['driving', 'public-transport', 'walking', 'ride-share', 'other']),
  parkingNeeds: z.boolean(),
  preferredDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Please select a valid date'),
  preferredTime: z.string()
});

// Validation result type
export interface ValidationResult<T> {
  success: boolean;
  data?: T;
  errors?: string[];
}