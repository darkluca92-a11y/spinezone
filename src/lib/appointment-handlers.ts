'use client';

import { 
  appointmentSchema, 
  phaseAppointmentSchema, 
  serviceAppointmentSchema, 
  assessmentAppointmentSchema,
  locationAppointmentSchema,
  type APIResponse 
} from './validation';

// Demo appointment availability data
const DEMO_AVAILABILITY = {
  'downtown-san-diego': [
    { date: '2025-08-12', times: ['morning-early', 'morning-late', 'afternoon-early'] },
    { date: '2025-08-13', times: ['midday', 'afternoon-late', 'evening'] },
    { date: '2025-08-14', times: ['morning-early', 'afternoon-early', 'evening'] },
    { date: '2025-08-15', times: ['morning-late', 'midday', 'afternoon-late'] }
  ],
  'la-jolla': [
    { date: '2025-08-12', times: ['morning-late', 'midday', 'afternoon-early'] },
    { date: '2025-08-13', times: ['morning-early', 'afternoon-late'] },
    { date: '2025-08-14', times: ['midday', 'evening'] },
    { date: '2025-08-15', times: ['morning-early', 'morning-late', 'afternoon-early'] }
  ],
  'pacific-beach': [
    { date: '2025-08-12', times: ['afternoon-early', 'evening'] },
    { date: '2025-08-13', times: ['morning-early', 'morning-late', 'midday'] },
    { date: '2025-08-14', times: ['afternoon-late', 'evening'] },
    { date: '2025-08-15', times: ['morning-early', 'midday', 'afternoon-early'] }
  ]
};

// Demo provider data
const DEMO_PROVIDERS = {
  'downtown-san-diego': [
    { id: 'dr-smith', name: 'Dr. Sarah Smith, PT, DPT', specialties: ['spine', 'sports'] },
    { id: 'dr-jones', name: 'Dr. Michael Jones, PT, DPT', specialties: ['orthopedic', 'geriatric'] },
    { id: 'dr-williams', name: 'Dr. Lisa Williams, PT, DPT', specialties: ['neurological', 'pediatric'] }
  ],
  'la-jolla': [
    { id: 'dr-brown', name: 'Dr. David Brown, PT, DPT', specialties: ['spine', 'manual'] },
    { id: 'dr-davis', name: 'Dr. Jennifer Davis, PT, DPT', specialties: ['sports', 'women-health'] }
  ],
  'pacific-beach': [
    { id: 'dr-miller', name: 'Dr. Robert Miller, PT, DPT', specialties: ['spine', 'aquatic'] },
    { id: 'dr-wilson', name: 'Dr. Amanda Wilson, PT, DPT', specialties: ['orthopedic', 'vestibular'] }
  ]
};

// Time slot mapping for user-friendly display
const TIME_SLOTS = {
  'morning-early': '7:00 AM - 9:00 AM',
  'morning-late': '9:00 AM - 11:00 AM',
  'midday': '11:00 AM - 1:00 PM',
  'afternoon-early': '1:00 PM - 3:00 PM',
  'afternoon-late': '3:00 PM - 5:00 PM',
  'evening': '5:00 PM - 7:00 PM'
};

// Location mapping for user-friendly display
const LOCATION_NAMES = {
  'downtown-san-diego': 'SpineZone Downtown San Diego',
  'la-jolla': 'SpineZone La Jolla',
  'pacific-beach': 'SpineZone Pacific Beach',
  'hillcrest': 'SpineZone Hillcrest',
  'mission-valley': 'SpineZone Mission Valley',
  'chula-vista': 'SpineZone Chula Vista',
  'carlsbad': 'SpineZone Carlsbad',
  'encinitas': 'SpineZone Encinitas',
  'del-mar': 'SpineZone Del Mar',
  'any-location': 'Any Available Location'
};

// Appointment types for user-friendly display
const APPOINTMENT_TYPES = {
  'initial-consultation': 'Initial Consultation (Free)',
  'followup-appointment': 'Follow-up Appointment',
  'assessment': 'Comprehensive Assessment',
  'treatment-session': 'Treatment Session',
  'urgent-care': 'Urgent Care Appointment',
  'second-opinion': 'Second Opinion Consultation',
  'maintenance-check': 'Maintenance Check-up'
};

// Service types for user-friendly display
const SERVICE_TYPES = {
  'spinezone-strength': 'SpineZone Strength Program (10 weeks)',
  'intensive-program': 'Intensive Program (7 weeks)',
  'maintenance-program': 'Maintenance Program (Ongoing)',
  'consultation-only': 'Consultation Only',
  'assessment-only': 'Assessment Only'
};

/**
 * Simulates appointment availability check
 */
export async function checkAvailability(location: string, date: string): Promise<string[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const locationAvailability = DEMO_AVAILABILITY[location as keyof typeof DEMO_AVAILABILITY] || [];
  const dayAvailability = locationAvailability.find(slot => slot.date === date);
  
  return dayAvailability ? dayAvailability.times : [];
}

/**
 * Simulates provider lookup for location
 */
export async function getProvidersForLocation(location: string): Promise<typeof DEMO_PROVIDERS['downtown-san-diego']> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return DEMO_PROVIDERS[location as keyof typeof DEMO_PROVIDERS] || [];
}

/**
 * Main appointment booking handler with comprehensive demo functionality
 */
export async function handleAppointmentBooking(formData: FormData): Promise<APIResponse> {
  console.log('🏥 APPOINTMENT BOOKING SYSTEM - Demo Mode');
  
  try {
    // Extract and parse form data
    const rawData = Object.fromEntries(formData.entries());
    
    // Convert specific fields to appropriate types
    const processedData = {
      ...rawData,
      painLevel: rawData.painLevel ? parseInt(rawData.painLevel as string, 10) : 0,
      previousTreatment: rawData.previousTreatment === 'true',
      hasInsurance: rawData.hasInsurance === 'true',
      urgentCare: rawData.urgentCare === 'true',
      transportationNeeds: rawData.transportationNeeds === 'true',
      marketingConsent: rawData.marketingConsent === 'true',
      hipaaConsent: rawData.hipaaConsent === 'true',
      treatmentConsent: rawData.treatmentConsent === 'true'
    };
    
    // Validate the appointment data
    const validation = appointmentSchema.safeParse(processedData);
    
    if (!validation.success) {
      console.log('❌ Appointment validation failed:', validation.error.issues);
      return {
        success: false,
        error: {
          message: 'Please check your form entries and try again.',
          statusCode: 400,
          code: 'VALIDATION_ERROR'
        }
      };
    }
    
    const appointmentData = validation.data;
    
    // Simulate appointment booking process
    console.log('✅ Appointment request validated successfully');
    console.log('📅 Processing appointment booking...');
    
    // Log comprehensive appointment details
    console.log(`
🏥 APPOINTMENT REQUEST DETAILS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Patient: ${appointmentData.firstName} ${appointmentData.lastName}
Email: ${appointmentData.email}
Phone: ${appointmentData.phone}
Type: ${APPOINTMENT_TYPES[appointmentData.appointmentType]}
Condition: ${appointmentData.primaryCondition.replace('-', ' ').toUpperCase()}
Pain Level: ${appointmentData.painLevel}/10
Duration: ${appointmentData.symptomDuration.replace('-', ' ')}
Location: ${LOCATION_NAMES[appointmentData.preferredLocation] || appointmentData.preferredLocation}
Preferred Date: ${appointmentData.preferredDate}
Preferred Time: ${TIME_SLOTS[appointmentData.preferredTime]}
Payment: ${appointmentData.paymentMethod.replace('-', ' ').toUpperCase()}
Urgent Care: ${appointmentData.urgentCare ? 'YES' : 'NO'}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `);
    
    // Check availability simulation
    console.log('🔍 Checking appointment availability...');
    const availableTimes = await checkAvailability(appointmentData.preferredLocation, appointmentData.preferredDate);
    
    if (!availableTimes.includes(appointmentData.preferredTime)) {
      console.log('⚠️ Preferred time slot not available, checking alternatives...');
      
      if (appointmentData.alternativeDate && appointmentData.alternativeTime) {
        const altTimes = await checkAvailability(appointmentData.preferredLocation, appointmentData.alternativeDate);
        if (altTimes.includes(appointmentData.alternativeTime)) {
          console.log(`✅ Alternative appointment slot confirmed: ${appointmentData.alternativeDate} at ${TIME_SLOTS[appointmentData.alternativeTime]}`);
        }
      }
    } else {
      console.log(`✅ Preferred appointment slot confirmed: ${appointmentData.preferredDate} at ${TIME_SLOTS[appointmentData.preferredTime]}`);
    }
    
    // Provider assignment simulation
    console.log('👩‍⚕️ Assigning healthcare provider...');
    const providers = await getProvidersForLocation(appointmentData.preferredLocation);
    const assignedProvider = providers[0] || { name: 'Available Provider', specialties: ['General PT'] };
    console.log(`✅ Provider assigned: ${assignedProvider.name}`);
    
    // Insurance verification simulation
    if (appointmentData.hasInsurance && appointmentData.insuranceProvider) {
      console.log('🛡️ Verifying insurance coverage...');
      console.log(`✅ Insurance verified: ${appointmentData.insuranceProvider}`);
      console.log('💰 Estimated copay: $25-$40 per visit');
    }
    
    // Generate confirmation details
    const confirmationNumber = `SZ${Date.now().toString(36).toUpperCase()}${Math.random().toString(36).substr(2, 3).toUpperCase()}`;
    
    console.log(`
🎉 APPOINTMENT SUCCESSFULLY BOOKED!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Confirmation #: ${confirmationNumber}
📧 Email confirmation sent to: ${appointmentData.email}
📱 SMS reminder sent to: ${appointmentData.phone}
🏥 Location: ${LOCATION_NAMES[appointmentData.preferredLocation] || appointmentData.preferredLocation}
👩‍⚕️ Provider: ${assignedProvider.name}
📅 Date & Time: ${appointmentData.preferredDate} at ${TIME_SLOTS[appointmentData.preferredTime]}

NEXT STEPS:
• You'll receive a confirmation email within 5 minutes
• Text reminders will be sent 24 hours and 2 hours before
• Please arrive 15 minutes early for paperwork
• Bring your insurance card and a valid ID
• Our team will call you within 24 hours to confirm details

QUESTIONS? Call us at (858) 555-0123
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `);
    
    // Return success response
    return {
      success: true,
      data: {
        confirmationNumber,
        appointmentDate: appointmentData.preferredDate,
        appointmentTime: TIME_SLOTS[appointmentData.preferredTime],
        location: LOCATION_NAMES[appointmentData.preferredLocation] || appointmentData.preferredLocation,
        provider: assignedProvider.name,
        message: 'Your appointment has been successfully booked! Check your email and phone for confirmation details.'
      }
    };
    
  } catch (error) {
    console.error('💥 Appointment booking error:', error);
    return {
      success: false,
      error: {
        message: 'We encountered an issue booking your appointment. Please call (858) 555-0123 for immediate assistance.',
        statusCode: 500,
        code: 'BOOKING_ERROR'
      }
    };
  }
}

/**
 * Phase-specific appointment booking handler
 */
export async function handlePhaseAppointment(formData: FormData): Promise<APIResponse> {
  console.log('🔄 TREATMENT JOURNEY - Phase Appointment Booking');
  
  try {
    const rawData = Object.fromEntries(formData.entries());
    const validation = phaseAppointmentSchema.safeParse(rawData);
    
    if (!validation.success) {
      return {
        success: false,
        error: {
          message: 'Please check your form entries and try again.',
          statusCode: 400
        }
      };
    }
    
    const appointmentData = validation.data;
    const confirmationNumber = `PH${Date.now().toString(36).toUpperCase()}`;
    
    console.log(`
📋 PHASE APPOINTMENT SCHEDULED:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Patient: ${appointmentData.firstName} ${appointmentData.lastName}
Current Phase: ${appointmentData.currentPhase.replace('-', ' ').toUpperCase()}
Reason: ${appointmentData.appointmentReason.replace('-', ' ')}
Date: ${appointmentData.preferredDate}
Location: ${appointmentData.preferredLocation}
Confirmation #: ${confirmationNumber}

📞 Our team will contact you within 24 hours to confirm appointment details
📧 Email confirmation sent with progress tracking information
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `);
    
    return {
      success: true,
      data: {
        confirmationNumber,
        message: 'Phase-specific appointment booked successfully! Your care team will contact you within 24 hours.'
      }
    };
    
  } catch (error) {
    console.error('Phase appointment error:', error);
    return {
      success: false,
      error: {
        message: 'Unable to book phase appointment. Please call (858) 555-0123.',
        statusCode: 500
      }
    };
  }
}

/**
 * Service-specific appointment booking handler
 */
export async function handleServiceAppointment(formData: FormData): Promise<APIResponse> {
  console.log('🎯 SERVICE-SPECIFIC APPOINTMENT BOOKING');
  
  try {
    const rawData = Object.fromEntries(formData.entries());
    
    // Handle treatmentGoals array
    const processedData = {
      ...rawData,
      treatmentGoals: formData.getAll('treatmentGoals')
    };
    
    const validation = serviceAppointmentSchema.safeParse(processedData);
    
    if (!validation.success) {
      return {
        success: false,
        error: {
          message: 'Please check your form entries and try again.',
          statusCode: 400
        }
      };
    }
    
    const appointmentData = validation.data;
    const confirmationNumber = `SV${Date.now().toString(36).toUpperCase()}`;
    
    console.log(`
🎯 SERVICE APPOINTMENT BOOKED:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Patient: ${appointmentData.firstName} ${appointmentData.lastName}
Service: ${SERVICE_TYPES[appointmentData.serviceType]}
Condition Severity: ${appointmentData.conditionSeverity.toUpperCase()}
Treatment Goals: ${appointmentData.treatmentGoals.join(', ').replace(/-/g, ' ')}
Experience Level: ${appointmentData.previousExperience.replace('-', ' ')}
Date: ${appointmentData.preferredDate}
Location: ${appointmentData.preferredLocation}
Confirmation #: ${confirmationNumber}

✅ Personalized treatment plan will be created based on your goals
📞 Program coordinator will call within 24 hours to discuss details
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `);
    
    return {
      success: true,
      data: {
        confirmationNumber,
        serviceType: SERVICE_TYPES[appointmentData.serviceType],
        message: 'Service appointment booked! Our program coordinator will contact you within 24 hours.'
      }
    };
    
  } catch (error) {
    console.error('Service appointment error:', error);
    return {
      success: false,
      error: {
        message: 'Unable to book service appointment. Please call (858) 555-0123.',
        statusCode: 500
      }
    };
  }
}

/**
 * Assessment-specific appointment booking handler
 */
export async function handleAssessmentAppointment(formData: FormData): Promise<APIResponse> {
  console.log('📋 COMPREHENSIVE ASSESSMENT APPOINTMENT');
  
  try {
    const rawData = Object.fromEntries(formData.entries());
    
    // Handle functionalLimitations array and other fields
    const processedData = {
      ...rawData,
      functionalLimitations: formData.getAll('functionalLimitations'),
      painLevel: parseInt(rawData.painLevel as string, 10),
      urgentAssessment: rawData.urgentAssessment === 'true'
    };
    
    const validation = assessmentAppointmentSchema.safeParse(processedData);
    
    if (!validation.success) {
      return {
        success: false,
        error: {
          message: 'Please check your form entries and try again.',
          statusCode: 400
        }
      };
    }
    
    const appointmentData = validation.data;
    const confirmationNumber = `AS${Date.now().toString(36).toUpperCase()}`;
    
    console.log(`
📋 COMPREHENSIVE ASSESSMENT SCHEDULED:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Patient: ${appointmentData.firstName} ${appointmentData.lastName}
Primary Concern: ${appointmentData.primaryConcern}
Pain Level: ${appointmentData.painLevel}/10
Functional Limitations: ${appointmentData.functionalLimitations.join(', ').replace(/-/g, ' ')}
Symptom Pattern: ${appointmentData.symptomPattern.replace('-', ' ')}
Date: ${appointmentData.preferredDate}
Location: ${appointmentData.preferredLocation}
Urgent Assessment: ${appointmentData.urgentAssessment ? 'YES' : 'NO'}
Confirmation #: ${confirmationNumber}

📝 Comprehensive 60-minute evaluation scheduled
🎯 Personalized treatment recommendations will be provided
📞 Assessment coordinator will call within 4 hours to confirm
${appointmentData.urgentAssessment ? '🚨 URGENT - Priority scheduling confirmed' : ''}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `);
    
    return {
      success: true,
      data: {
        confirmationNumber,
        isUrgent: appointmentData.urgentAssessment,
        message: appointmentData.urgentAssessment 
          ? 'Urgent assessment appointment scheduled! Our team will contact you within 4 hours.'
          : 'Comprehensive assessment appointment scheduled! Our team will contact you within 24 hours.'
      }
    };
    
  } catch (error) {
    console.error('Assessment appointment error:', error);
    return {
      success: false,
      error: {
        message: 'Unable to book assessment appointment. Please call (858) 555-0123.',
        statusCode: 500
      }
    };
  }
}

/**
 * Location-specific appointment booking handler
 */
export async function handleLocationAppointment(formData: FormData): Promise<APIResponse> {
  console.log('📍 LOCATION-SPECIFIC APPOINTMENT BOOKING');
  
  try {
    const rawData = Object.fromEntries(formData.entries());
    
    const processedData = {
      ...rawData,
      parkingNeeds: rawData.parkingNeeds === 'true'
    };
    
    const validation = locationAppointmentSchema.safeParse(processedData);
    
    if (!validation.success) {
      return {
        success: false,
        error: {
          message: 'Please check your form entries and try again.',
          statusCode: 400
        }
      };
    }
    
    const appointmentData = validation.data;
    const confirmationNumber = `LOC${Date.now().toString(36).toUpperCase()}`;
    
    console.log(`
📍 LOCATION APPOINTMENT CONFIRMED:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Patient: ${appointmentData.firstName} ${appointmentData.lastName}
Specific Location: ${appointmentData.specificLocation}
Travel Distance: ${appointmentData.travelDistance.replace('-', ' ')} miles
Transportation: ${appointmentData.transportationMethod.replace('-', ' ')}
Parking Needed: ${appointmentData.parkingNeeds ? 'YES' : 'NO'}
Date: ${appointmentData.preferredDate}
Confirmation #: ${confirmationNumber}

🚗 ${appointmentData.parkingNeeds ? 'Free parking reserved for your visit' : 'No parking arrangements needed'}
📞 Location coordinator will call within 24 hours with specific directions
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `);
    
    return {
      success: true,
      data: {
        confirmationNumber,
        parkingIncluded: appointmentData.parkingNeeds,
        message: 'Location-specific appointment confirmed! You\'ll receive detailed directions and parking information.'
      }
    };
    
  } catch (error) {
    console.error('Location appointment error:', error);
    return {
      success: false,
      error: {
        message: 'Unable to book location appointment. Please call (858) 555-0123.',
        statusCode: 500
      }
    };
  }
}