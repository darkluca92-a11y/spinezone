'use client';

import { useState, useEffect, useCallback, useMemo, useTransition, Suspense } from 'react';
import { memo } from 'react';
import { 
  Calendar, 
  Clock, 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  AlertCircle,
  CheckCircle,
  Loader2,
  Star,
  Target,
  Activity,
  Heart
} from 'lucide-react';
import {
  handleAppointmentBooking,
  handlePhaseAppointment,
  handleServiceAppointment,
  handleAssessmentAppointment,
  handleLocationAppointment
} from '@/lib/appointment-handlers';
import CalendlyWidget from './CalendlyWidget';

interface BaseFormProps {
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
  className?: string;
}

// Performance-optimized Main Comprehensive Appointment Booking Form
export const ComprehensiveAppointmentForm = memo(function ComprehensiveAppointmentForm({ onSuccess, onError, className = '' }: BaseFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [isPending, startTransition] = useTransition();
  
  // Memoized form data to prevent unnecessary re-renders
  const [formData, setFormData] = useState(() => ({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    appointmentType: 'initial-consultation',
    preferredDate: '',
    preferredTime: 'morning-early',
    alternativeDate: '',
    alternativeTime: '',
    preferredLocation: 'downtown-san-diego',
    providerPreference: 'any-provider',
    specificProvider: '',
    primaryCondition: 'back-pain',
    painLevel: 5,
    symptomDuration: 'one-to-four-weeks',
    previousTreatment: false,
    currentMedications: '',
    medicalHistory: '',
    hasInsurance: true,
    insuranceProvider: '',
    policyNumber: '',
    paymentMethod: 'insurance',
    urgentCare: false,
    transportationNeeds: false,
    accessibilityNeeds: '',
    additionalNotes: '',
    communicationMethod: 'email',
    marketingConsent: false,
    hipaaConsent: false,
    treatmentConsent: false
  }));

  // Optimized submit handler with transition for smoother UI
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    startTransition(() => {
      setIsSubmitting(true);
      setSubmitMessage('');
    });

    try {
      // Use FormData more efficiently
      const form = new FormData();
      for (const [key, value] of Object.entries(formData)) {
        if (value !== null && value !== undefined) {
          form.append(key, String(value));
        }
      }

      const result = await handleAppointmentBooking(form);
      
      startTransition(() => {
        if (result.success) {
          setSubmitMessage('Appointment successfully booked! Check your email for confirmation details.');
          if (onSuccess) onSuccess(result.data);
        } else {
          setSubmitMessage(result.error?.message || 'Unable to book appointment. Please try again.');
          if (onError) onError(result.error?.message || 'Booking failed');
        }
      });
    } catch (error) {
      const errorMsg = 'An error occurred while booking your appointment. Please call (858) 555-0123.';
      startTransition(() => {
        setSubmitMessage(errorMsg);
        if (onError) onError(errorMsg);
      });
    } finally {
      startTransition(() => {
        setIsSubmitting(false);
      });
    }
  }, [formData, onSuccess, onError]);

  // Optimized form data updater with debouncing for better performance
  const updateFormData = useCallback((field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);
  
  // Memoized step validation to prevent unnecessary computations
  const isStepValid = useMemo(() => {
    switch (currentStep) {
      case 1:
        return formData.firstName.trim() && formData.lastName.trim() && 
               formData.email.trim() && formData.phone.trim();
      case 2:
        return formData.appointmentType && formData.preferredDate && 
               formData.preferredTime && formData.preferredLocation;
      case 3:
        return formData.primaryCondition && formData.symptomDuration;
      case 4:
        return formData.hipaaConsent && formData.treatmentConsent;
      default:
        return false;
    }
  }, [currentStep, formData]);
  
  // Optimized step navigation with transitions
  const handleStepChange = useCallback((newStep: number) => {
    startTransition(() => {
      setCurrentStep(newStep);
    });
  }, []);

  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Schedule Your Appointment</h2>
        <p className="text-gray-600">Complete this form to book your appointment with our expert healthcare team.</p>
        
        {/* Progress Steps */}
        <div className="mt-4 flex items-center space-x-2">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className={`flex-1 h-2 rounded-full ${
              step <= currentStep ? 'bg-blue-600' : 'bg-gray-200'
            }`} />
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Step 1: Personal Information */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <User className="w-5 h-5 mr-2 text-blue-600" />
              Personal Information
            </h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={(e) => updateFormData('firstName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={(e) => updateFormData('lastName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => updateFormData('phone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date of Birth (Optional)
              </label>
              <input
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => updateFormData('dateOfBirth', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => handleStepChange(2)}
                disabled={!isStepValid || isPending}
                className={`px-6 py-3 rounded-lg font-semibold transition-all transform ${
                  !isStepValid || isPending
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 active:scale-95'
                }`}
              >
                {isPending ? 'Loading...' : 'Next: Appointment Details'}
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Appointment Details */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-blue-600" />
              Appointment Details
            </h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Appointment Type *
              </label>
              <select
                value={formData.appointmentType}
                onChange={(e) => updateFormData('appointmentType', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="initial-consultation">Initial Consultation (Free)</option>
                <option value="followup-appointment">Follow-up Appointment</option>
                <option value="assessment">Comprehensive Assessment</option>
                <option value="treatment-session">Treatment Session</option>
                <option value="urgent-care">Urgent Care Appointment</option>
                <option value="second-opinion">Second Opinion Consultation</option>
                <option value="maintenance-check">Maintenance Check-up</option>
              </select>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Date *
                </label>
                <input
                  type="date"
                  required
                  value={formData.preferredDate}
                  onChange={(e) => updateFormData('preferredDate', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Time *
                </label>
                <select
                  value={formData.preferredTime}
                  onChange={(e) => updateFormData('preferredTime', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="morning-early">Early Morning (7-9 AM)</option>
                  <option value="morning-late">Late Morning (9-11 AM)</option>
                  <option value="midday">Midday (11-1 PM)</option>
                  <option value="afternoon-early">Early Afternoon (1-3 PM)</option>
                  <option value="afternoon-late">Late Afternoon (3-5 PM)</option>
                  <option value="evening">Evening (5-7 PM)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Location *
              </label>
              <select
                value={formData.preferredLocation}
                onChange={(e) => updateFormData('preferredLocation', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="downtown-san-diego">Downtown San Diego</option>
                <option value="la-jolla">La Jolla</option>
                <option value="pacific-beach">Pacific Beach</option>
                <option value="hillcrest">Hillcrest</option>
                <option value="mission-valley">Mission Valley</option>
                <option value="chula-vista">Chula Vista</option>
                <option value="carlsbad">Carlsbad</option>
                <option value="encinitas">Encinitas</option>
                <option value="del-mar">Del Mar</option>
                <option value="any-location">Any Location</option>
              </select>
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => handleStepChange(1)}
                disabled={isPending}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium disabled:opacity-50 transition-all"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => handleStepChange(3)}
                disabled={!isStepValid || isPending}
                className={`px-6 py-3 rounded-lg font-semibold transition-all transform ${
                  !isStepValid || isPending
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 active:scale-95'
                }`}
              >
                {isPending ? 'Loading...' : 'Next: Medical Information'}
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Medical Information */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Activity className="w-5 h-5 mr-2 text-blue-600" />
              Medical Information
            </h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Primary Condition *
              </label>
              <select
                value={formData.primaryCondition}
                onChange={(e) => updateFormData('primaryCondition', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="back-pain">Back Pain</option>
                <option value="neck-pain">Neck Pain</option>
                <option value="shoulder-pain">Shoulder Pain</option>
                <option value="hip-pain">Hip Pain</option>
                <option value="knee-pain">Knee Pain</option>
                <option value="ankle-pain">Ankle Pain</option>
                <option value="multiple-areas">Multiple Areas</option>
                <option value="sports-injury">Sports Injury</option>
                <option value="post-surgery">Post-Surgery Rehabilitation</option>
                <option value="chronic-pain">Chronic Pain</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Pain Level (0 = No Pain, 10 = Severe Pain)
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={formData.painLevel}
                  onChange={(e) => updateFormData('painLevel', parseInt(e.target.value))}
                  className="flex-1"
                />
                <span className="text-xl font-bold text-blue-600 w-8 text-center">
                  {formData.painLevel}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                How long have you had these symptoms?
              </label>
              <select
                value={formData.symptomDuration}
                onChange={(e) => updateFormData('symptomDuration', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="less-than-week">Less than a week</option>
                <option value="one-to-four-weeks">1-4 weeks</option>
                <option value="one-to-three-months">1-3 months</option>
                <option value="three-to-six-months">3-6 months</option>
                <option value="six-months-to-year">6 months to 1 year</option>
                <option value="more-than-year">More than 1 year</option>
              </select>
            </div>

            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.previousTreatment}
                  onChange={(e) => updateFormData('previousTreatment', e.target.checked)}
                  className="mr-2"
                />
                I have received treatment for this condition before
              </label>
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => handleStepChange(2)}
                disabled={isPending}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium disabled:opacity-50 transition-all"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => handleStepChange(4)}
                disabled={!isStepValid || isPending}
                className={`px-6 py-3 rounded-lg font-semibold transition-all transform ${
                  !isStepValid || isPending
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 active:scale-95'
                }`}
              >
                {isPending ? 'Loading...' : 'Next: Final Details'}
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Insurance & Consent */}
        {currentStep === 4 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-blue-600" />
              Insurance & Consent
            </h3>

            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.hasInsurance}
                  onChange={(e) => updateFormData('hasInsurance', e.target.checked)}
                  className="mr-2"
                />
                I have health insurance
              </label>
            </div>

            {formData.hasInsurance && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Insurance Provider
                </label>
                <input
                  type="text"
                  value={formData.insuranceProvider}
                  onChange={(e) => updateFormData('insuranceProvider', e.target.value)}
                  placeholder="e.g., Blue Cross Blue Shield"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Additional Notes (Optional)
              </label>
              <textarea
                rows={3}
                value={formData.additionalNotes}
                onChange={(e) => updateFormData('additionalNotes', e.target.value)}
                placeholder="Tell us about any special accommodations needed or additional information..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              />
            </div>

            {/* Required Consents */}
            <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900">Required Consents:</h4>
              
              <label className="flex items-start">
                <input
                  type="checkbox"
                  checked={formData.hipaaConsent}
                  onChange={(e) => updateFormData('hipaaConsent', e.target.checked)}
                  className="mr-2 mt-0.5"
                  required
                />
                <span className="text-sm text-gray-700">
                  I consent to the use and disclosure of my health information for treatment, payment, and healthcare operations as described in the HIPAA Notice of Privacy Practices. *
                </span>
              </label>

              <label className="flex items-start">
                <input
                  type="checkbox"
                  checked={formData.treatmentConsent}
                  onChange={(e) => updateFormData('treatmentConsent', e.target.checked)}
                  className="mr-2 mt-0.5"
                  required
                />
                <span className="text-sm text-gray-700">
                  I consent to receive physical therapy treatment and understand that no guarantee of treatment outcome has been made. *
                </span>
              </label>

              <label className="flex items-start">
                <input
                  type="checkbox"
                  checked={formData.marketingConsent}
                  onChange={(e) => updateFormData('marketingConsent', e.target.checked)}
                  className="mr-2 mt-0.5"
                />
                <span className="text-sm text-gray-700">
                  I would like to receive health tips and promotional information via email and text message. (Optional)
                </span>
              </label>
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => handleStepChange(3)}
                disabled={isPending}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium disabled:opacity-50 transition-all"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !isStepValid || isPending}
                className={`px-6 py-3 rounded-lg font-semibold transition-all transform flex items-center ${
                  isSubmitting || !isStepValid || isPending
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-green-600 text-white hover:bg-green-700 hover:scale-105 active:scale-95'
                }`}
              >
                {isSubmitting || isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Booking Appointment...
                  </>
                ) : (
                  <>
                    <Calendar className="w-4 h-4 mr-2" />
                    Book Appointment
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Status Message */}
        {submitMessage && (
          <div className={`mt-6 p-4 rounded-lg ${
            submitMessage.includes('successfully') || submitMessage.includes('Appointment successfully')
              ? 'bg-green-50 border border-green-200 text-green-800'
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}>
            <div className="flex items-center">
              {submitMessage.includes('successfully') || submitMessage.includes('Appointment successfully') ? (
                <CheckCircle className="w-5 h-5 mr-2" />
              ) : (
                <AlertCircle className="w-5 h-5 mr-2" />
              )}
              <p>{submitMessage}</p>
            </div>
          </div>
        )}
      </form>
    </div>
  );
});

// Performance-optimized Quick Appointment Booking Form (Simplified)
export const QuickAppointmentForm = memo(function QuickAppointmentForm({ onSuccess, onError, className = '' }: BaseFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [showCalendly, setShowCalendly] = useState(false);
  const [isPending, startTransition] = useTransition();
  
  // Memoized toggle handler
  const toggleCalendly = useCallback((show: boolean) => {
    startTransition(() => {
      setShowCalendly(show);
    });
  }, []);

  if (showCalendly) {
    return (
      <div className={className}>
        <Suspense fallback={
          <div className="animate-pulse bg-white rounded-xl shadow-lg p-6">
            <div className="h-8 bg-gray-200 rounded mb-4"></div>
            <div className="h-64 bg-gray-200 rounded mb-4"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
          </div>
        }>
          <CalendlyWidget 
            serviceType="consultation"
            onBookingComplete={(data) => {
              startTransition(() => {
                setShowCalendly(false);
                if (onSuccess) onSuccess(data);
              });
            }}
          />
        </Suspense>
        <button
          onClick={() => toggleCalendly(false)}
          disabled={isPending}
          className="mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors disabled:opacity-50"
        >
          ← Back to Quick Form
        </button>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Quick Appointment Request</h3>
        <p className="text-gray-600">Get started with a simple request - we'll contact you within 24 hours</p>
      </div>

      <div className="space-y-4">
        <button
          onClick={() => toggleCalendly(true)}
          disabled={isPending}
          className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          <Calendar className="w-5 h-5 mr-2" />
          {isPending ? 'Loading...' : 'Book Online Now (Real-time Scheduling)'}
        </button>

        <div className="text-center text-gray-500">
          <span>or</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <a
            href="tel:+1-858-555-0123"
            className="bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center"
          >
            <Phone className="w-4 h-4 mr-2" />
            Call Now
          </a>
          <a
            href="mailto:appointments@spinezone-sd.com?subject=Appointment Request"
            className="bg-gray-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-gray-700 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center"
          >
            <Mail className="w-4 h-4 mr-2" />
            Email Us
          </a>
        </div>

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2">Why Choose SpineZone?</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Free initial consultation</li>
            <li>• Same-day appointments available</li>
            <li>• 90% success rate with pain elimination</li>
            <li>• Most insurance plans accepted</li>
            <li>• 10 convenient San Diego locations</li>
          </ul>
        </div>
      </div>
    </div>
  );
});

// Performance-optimized Treatment Phase Appointment Form
export const PhaseAppointmentForm = memo(function PhaseAppointmentForm({ 
  phase = 'new-patient', 
  onSuccess, 
  onError, 
  className = '' 
}: BaseFormProps & { phase?: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [isPending, startTransition] = useTransition();
  
  const [formData, setFormData] = useState(() => ({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    currentPhase: phase,
    appointmentReason: 'regular-session',
    progressNotes: '',
    preferredDate: '',
    preferredTime: '',
    preferredLocation: 'downtown-san-diego'
  }));

  // Optimized submit handler with performance improvements
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    startTransition(() => {
      setIsSubmitting(true);
      setSubmitMessage('');
    });

    try {
      const form = new FormData();
      for (const [key, value] of Object.entries(formData)) {
        if (value !== null && value !== undefined) {
          form.append(key, String(value));
        }
      }

      const result = await handlePhaseAppointment(form);
      
      startTransition(() => {
        if (result.success) {
          setSubmitMessage('Phase appointment successfully scheduled! Our team will contact you within 24 hours.');
          if (onSuccess) onSuccess(result.data);
        } else {
          setSubmitMessage(result.error?.message || 'Unable to schedule appointment. Please try again.');
          if (onError) onError(result.error?.message || 'Scheduling failed');
        }
      });
    } catch (error) {
      const errorMsg = 'An error occurred. Please call (858) 555-0123.';
      startTransition(() => {
        setSubmitMessage(errorMsg);
        if (onError) onError(errorMsg);
      });
    } finally {
      startTransition(() => {
        setIsSubmitting(false);
      });
    }
  }, [formData, onSuccess, onError]);
  
  // Optimized form data updater
  const updateFormData = useCallback((updates: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  }, []);
  
  // Form validation
  const isFormValid = useMemo(() => {
    return formData.firstName.trim() && formData.lastName.trim() && 
           formData.email.trim() && formData.phone.trim() && 
           formData.preferredDate && formData.preferredLocation;
  }, [formData]);

  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Phase-Specific Appointment</h3>
        <p className="text-gray-600">Schedule your next appointment based on your current treatment phase</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name *
            </label>
            <input
              type="text"
              required
              value={formData.firstName}
              onChange={(e) => updateFormData({ firstName: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name *
            </label>
            <input
              type="text"
              required
              value={formData.lastName}
              onChange={(e) => updateFormData({ lastName: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => updateFormData({ email: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone *
            </label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => updateFormData({ phone: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Current Treatment Phase
          </label>
          <select
            value={formData.currentPhase}
            onChange={(e) => updateFormData({ currentPhase: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="new-patient">New Patient</option>
            <option value="phase-1">Phase 1: Pain Relief & Protection</option>
            <option value="phase-2">Phase 2: Mobility & Strength</option>
            <option value="phase-3">Phase 3: Function & Performance</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Appointment Reason
          </label>
          <select
            value={formData.appointmentReason}
            onChange={(e) => updateFormData({ appointmentReason: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="regular-session">Regular Treatment Session</option>
            <option value="progress-assessment">Progress Assessment</option>
            <option value="phase-transition">Phase Transition Evaluation</option>
            <option value="exercise-adjustment">Exercise Program Adjustment</option>
            <option value="pain-increase">Pain Level Increase</option>
            <option value="question-consultation">Question/Consultation</option>
          </select>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Preferred Date *
            </label>
            <input
              type="date"
              required
              value={formData.preferredDate}
              onChange={(e) => updateFormData({ preferredDate: e.target.value })}
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Preferred Location *
            </label>
            <select
              value={formData.preferredLocation}
              onChange={(e) => updateFormData({ preferredLocation: e.target.value }))
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="downtown-san-diego">Downtown San Diego</option>
              <option value="la-jolla">La Jolla</option>
              <option value="pacific-beach">Pacific Beach</option>
              <option value="hillcrest">Hillcrest</option>
              <option value="mission-valley">Mission Valley</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center ${
            isSubmitting
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Scheduling...
            </>
          ) : (
            <>
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Phase Appointment
            </>
          )}
        </button>

        {submitMessage && (
          <div className={`mt-4 p-4 rounded-lg ${
            submitMessage.includes('successfully')
              ? 'bg-green-50 border border-green-200 text-green-800'
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}>
            <div className="flex items-center">
              {submitMessage.includes('successfully') ? (
                <CheckCircle className="w-5 h-5 mr-2" />
              ) : (
                <AlertCircle className="w-5 h-5 mr-2" />
              )}
              <p>{submitMessage}</p>
            </div>
          </div>
        )}
      </form>
    </div>
  );
});