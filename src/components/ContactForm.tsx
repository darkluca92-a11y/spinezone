'use client';

import { useState, useRef } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Loader2 
} from 'lucide-react';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  location?: string;
  message?: string;
}

type FormState = 'idle' | 'loading' | 'success' | 'error';

const LOCATIONS = [
  { value: '', label: 'Select Preferred Location' },
  { value: 'carlsbad', label: 'Carlsbad' },
  { value: 'del-mar', label: 'Del Mar' },
  { value: 'grossmont', label: 'Grossmont' },
  { value: 'mission-valley', label: 'Mission Valley' },
  { value: 'rancho-bernardo', label: 'Rancho Bernardo' },
  { value: 'san-marcos', label: 'San Marcos' },
  { value: 'lake-forest', label: 'Lake Forest (OC)' },
  { value: 'santa-ana', label: 'Santa Ana (OC)' },
  { value: 'any-location', label: 'Any Location' }
];

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [formState, setFormState] = useState<FormState>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  // Phone number formatting
  const formatPhoneNumber = (value: string): string => {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return value;
  };

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Full name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter your full name';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else {
      const cleaned = formData.phone.replace(/\D/g, '');
      if (cleaned.length !== 10) {
        newErrors.phone = 'Please enter a valid 10-digit phone number';
      }
    }

    // Location validation
    if (!formData.location) {
      newErrors.location = 'Please select a preferred location';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Please tell us about your condition or how we can help';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Please provide more details (at least 10 characters)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleInputChange = (field: keyof FormData, value: string) => {
    let processedValue = value;
    
    if (field === 'phone') {
      processedValue = formatPhoneNumber(value);
    }

    setFormData(prev => ({
      ...prev,
      [field]: processedValue
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Focus on first error field
      const firstErrorField = Object.keys(errors)[0];
      const element = formRef.current?.querySelector(`[name="${firstErrorField}"]`) as HTMLElement;
      element?.focus();
      return;
    }

    setFormState('loading');

    try {
      // Simulate API call - replace with actual form submission logic
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would typically make an API call to submit the form
      console.log('Form submitted:', formData);
      
      setFormState('success');
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          location: '',
          message: ''
        });
        setFormState('idle');
      }, 3000);
      
    } catch (error) {
      console.error('Form submission error:', error);
      setFormState('error');
      
      // Reset error state after 5 seconds
      setTimeout(() => {
        setFormState('idle');
      }, 5000);
    }
  };

  return (
    <div className="healthcare-card max-w-2xl mx-auto p-6 sm:p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold healthcare-text-gradient mb-3">
          Contact SpineZone
        </h2>
        <p className="text-gray-600 leading-relaxed">
          Take the first step towards pain-free living. Our expert team is ready to help you with a personalized treatment plan.
        </p>
        <div className="flex items-center justify-center mt-4 space-x-6 text-sm text-gray-500">
          <div className="flex items-center">
            <CheckCircle2 className="w-4 h-4 text-green-600 mr-1" />
            Free Consultation
          </div>
          <div className="flex items-center">
            <CheckCircle2 className="w-4 h-4 text-green-600 mr-1" />
            Insurance Accepted
          </div>
        </div>
      </div>

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6" noValidate>
        {/* Full Name Field */}
        <div>
          <label 
            htmlFor="fullName" 
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Full Name <span className="text-red-500" aria-label="required">*</span>
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" aria-hidden="true" />
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              className={`w-full pl-11 pr-4 py-3 border rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.fullName 
                  ? 'border-red-300 bg-red-50' 
                  : 'border-gray-300 bg-white hover:border-gray-400'
              }`}
              placeholder="Enter your full name"
              aria-invalid={!!errors.fullName}
              aria-describedby={errors.fullName ? 'fullName-error' : undefined}
              disabled={formState === 'loading'}
              autoComplete="name"
            />
          </div>
          {errors.fullName && (
            <div id="fullName-error" className="mt-2 flex items-center text-sm text-red-600" role="alert">
              <AlertCircle className="w-4 h-4 mr-1 flex-shrink-0" aria-hidden="true" />
              {errors.fullName}
            </div>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label 
            htmlFor="email" 
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Email Address <span className="text-red-500" aria-label="required">*</span>
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" aria-hidden="true" />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={`w-full pl-11 pr-4 py-3 border rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.email 
                  ? 'border-red-300 bg-red-50' 
                  : 'border-gray-300 bg-white hover:border-gray-400'
              }`}
              placeholder="your.email@example.com"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
              disabled={formState === 'loading'}
              autoComplete="email"
            />
          </div>
          {errors.email && (
            <div id="email-error" className="mt-2 flex items-center text-sm text-red-600" role="alert">
              <AlertCircle className="w-4 h-4 mr-1 flex-shrink-0" aria-hidden="true" />
              {errors.email}
            </div>
          )}
        </div>

        {/* Phone Field */}
        <div>
          <label 
            htmlFor="phone" 
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Phone Number <span className="text-red-500" aria-label="required">*</span>
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" aria-hidden="true" />
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className={`w-full pl-11 pr-4 py-3 border rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.phone 
                  ? 'border-red-300 bg-red-50' 
                  : 'border-gray-300 bg-white hover:border-gray-400'
              }`}
              placeholder="(555) 123-4567"
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? 'phone-error' : undefined}
              disabled={formState === 'loading'}
              autoComplete="tel"
            />
          </div>
          {errors.phone && (
            <div id="phone-error" className="mt-2 flex items-center text-sm text-red-600" role="alert">
              <AlertCircle className="w-4 h-4 mr-1 flex-shrink-0" aria-hidden="true" />
              {errors.phone}
            </div>
          )}
        </div>

        {/* Location Preference Field */}
        <div>
          <label 
            htmlFor="location" 
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Preferred Location <span className="text-red-500" aria-label="required">*</span>
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" aria-hidden="true" />
            <select
              id="location"
              name="location"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              className={`w-full pl-11 pr-10 py-3 border rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none bg-white ${
                errors.location 
                  ? 'border-red-300 bg-red-50' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              aria-invalid={!!errors.location}
              aria-describedby={errors.location ? 'location-error' : undefined}
              disabled={formState === 'loading'}
            >
              {LOCATIONS.map((loc) => (
                <option key={loc.value} value={loc.value}>
                  {loc.label}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          {errors.location && (
            <div id="location-error" className="mt-2 flex items-center text-sm text-red-600" role="alert">
              <AlertCircle className="w-4 h-4 mr-1 flex-shrink-0" aria-hidden="true" />
              {errors.location}
            </div>
          )}
        </div>

        {/* Message Field */}
        <div>
          <label 
            htmlFor="message" 
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Message/Comments <span className="text-red-500" aria-label="required">*</span>
          </label>
          <div className="relative">
            <MessageSquare className="absolute left-3 top-4 w-5 h-5 text-gray-400" aria-hidden="true" />
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              rows={4}
              className={`w-full pl-11 pr-4 py-3 border rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-vertical ${
                errors.message 
                  ? 'border-red-300 bg-red-50' 
                  : 'border-gray-300 bg-white hover:border-gray-400'
              }`}
              placeholder="Please describe your condition, symptoms, or how we can help you. Include any specific areas of pain or mobility concerns."
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? 'message-error' : undefined}
              disabled={formState === 'loading'}
            />
          </div>
          {errors.message && (
            <div id="message-error" className="mt-2 flex items-center text-sm text-red-600" role="alert">
              <AlertCircle className="w-4 h-4 mr-1 flex-shrink-0" aria-hidden="true" />
              {errors.message}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={formState === 'loading' || formState === 'success'}
            className={`w-full flex items-center justify-center py-4 px-6 rounded-lg font-semibold text-white transition-all duration-300 min-h-[52px] ${
              formState === 'loading' || formState === 'success'
                ? 'bg-gray-400 cursor-not-allowed'
                : 'professional-cta hover:scale-[1.02] active:scale-98'
            }`}
            aria-describedby={formState === 'success' ? 'success-message' : formState === 'error' ? 'error-message' : undefined}
          >
            {formState === 'loading' && (
              <>
                <Loader2 className="w-5 h-5 mr-3 animate-spin" aria-hidden="true" />
                Sending Message...
              </>
            )}
            {formState === 'success' && (
              <>
                <CheckCircle2 className="w-5 h-5 mr-3 text-green-200" aria-hidden="true" />
                Message Sent Successfully!
              </>
            )}
            {formState === 'idle' && (
              <>
                <Send className="w-5 h-5 mr-3" aria-hidden="true" />
                Send Message & Get Started
              </>
            )}
            {formState === 'error' && (
              <>
                <AlertCircle className="w-5 h-5 mr-3" aria-hidden="true" />
                Try Again
              </>
            )}
          </button>
        </div>

        {/* Status Messages */}
        {formState === 'success' && (
          <div id="success-message" className="p-4 bg-green-50 border border-green-200 rounded-lg" role="alert">
            <div className="flex items-start">
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" aria-hidden="true" />
              <div>
                <h4 className="font-semibold text-green-800 mb-1">Thank you for reaching out!</h4>
                <p className="text-green-700 text-sm">
                  We've received your message and will contact you within 24 hours to schedule your consultation. 
                  If you need immediate assistance, please call us at <strong>(858) 555-0123</strong>.
                </p>
              </div>
            </div>
          </div>
        )}

        {formState === 'error' && (
          <div id="error-message" className="p-4 bg-red-50 border border-red-200 rounded-lg" role="alert">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" aria-hidden="true" />
              <div>
                <h4 className="font-semibold text-red-800 mb-1">Message could not be sent</h4>
                <p className="text-red-700 text-sm">
                  Please try again or call us directly at <strong>(858) 555-0123</strong> to schedule your appointment.
                </p>
              </div>
            </div>
          </div>
        )}
      </form>

      {/* Additional Contact Information */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-4">
            Prefer to call? We're here to help!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-6">
            <a 
              href="tel:+1-858-555-0123" 
              className="flex items-center text-green-600 hover:text-green-700 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded px-3 py-2"
              aria-label="Call SpineZone at 858-555-0123"
            >
              <Phone className="w-4 h-4 mr-2" aria-hidden="true" />
              (858) 555-0123
            </a>
            <div className="text-sm text-gray-500">
              Monday - Friday, 8AM - 6PM
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}