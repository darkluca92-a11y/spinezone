'use client';

import { Phone, Mail, MapPin, Clock, Shield, CheckCircle, CreditCard, Users, Calendar, Star } from 'lucide-react';
import { useState, useTransition, useCallback, useMemo, memo } from 'react';
import Head from 'next/head';
import PerformanceOptimizer from '@/components/PerformanceOptimizer';
import InteractiveMap from '@/components/InteractiveMap';
// Removed complex booking components - using simple contact forms only

const insuranceProviders = [
  "Blue Cross Blue Shield", "Aetna", "Cigna", "UnitedHealth", "Kaiser Permanente",
  "Anthem", "Humana", "Medicare", "Medicaid", "Tricare", "Workers' Compensation",
  "Auto Insurance Claims", "Sharp Health Plan", "Scripps Health Plan"
];

// Helper function to categorize inquiry types
function getInquiryType(subject: string) {
  const inquiryTypes = {
    'consultation': {
      type: 'Free Consultation Request',
      category: 'appointment',
      priority: 'high',
      responseTime: 'within 4 hours'
    },
    'appointment': {
      type: 'General Appointment Request',
      category: 'appointment',
      priority: 'high',
      responseTime: 'within 4 hours'
    },
    'urgent-appointment': {
      type: 'Urgent Care Appointment',
      category: 'appointment',
      priority: 'urgent',
      responseTime: 'within 2 hours'
    },
    'spinezone-strength': {
      type: 'SpineZone Strength Program Inquiry',
      category: 'program',
      priority: 'high',
      responseTime: 'within 4 hours'
    },
    'intensive-program': {
      type: 'Intensive Program Inquiry',
      category: 'program',
      priority: 'high',
      responseTime: 'within 4 hours'
    },
    'maintenance-program': {
      type: 'Maintenance Program Inquiry',
      category: 'program',
      priority: 'medium',
      responseTime: 'within 24 hours'
    },
    'assessment': {
      type: 'Comprehensive Assessment Request',
      category: 'appointment',
      priority: 'high',
      responseTime: 'within 4 hours'
    },
    'second-opinion': {
      type: 'Second Opinion Consultation',
      category: 'appointment',
      priority: 'medium',
      responseTime: 'within 24 hours'
    },
    'insurance': {
      type: 'Insurance Inquiry',
      category: 'information',
      priority: 'medium',
      responseTime: 'within 24 hours'
    },
    'services': {
      type: 'Service Information Request',
      category: 'information',
      priority: 'low',
      responseTime: 'within 48 hours'
    }
  };

  return inquiryTypes[subject as keyof typeof inquiryTypes] || {
    type: 'General Inquiry',
    category: 'information',
    priority: 'medium',
    responseTime: 'within 24 hours'
  };
}

// Helper function to generate appropriate response messages
function getResponseMessage(inquiryType: any, name: string) {
  const messages = {
    appointment: {
      urgent: `${name}, your urgent appointment request has been received with highest priority! Our scheduling team will call you within 2 hours to arrange immediate care. For emergency situations, please call (858) 555-0123.`,
      high: `Thank you ${name}! Your appointment request has been prioritized. Our scheduling coordinator will contact you within 4 hours to book your session and verify insurance coverage.`,
      medium: `Hello ${name}! We've received your appointment request. Our team will reach out within 24 hours to schedule your session at your preferred location.`
    },
    program: {
      high: `${name}, thank you for your interest in our specialized program! Our program coordinator will call you within 4 hours to discuss treatment options, expected outcomes, and schedule your initial consultation.`,
      medium: `Hi ${name}! We appreciate your program inquiry. A specialist will contact you within 24 hours to provide detailed information and answer any questions.`
    },
    information: {
      medium: `Thank you ${name}! We've received your inquiry and will respond with detailed information within 24 hours. For immediate assistance, call (858) 555-0123.`,
      low: `Hello ${name}! Your request has been received. We'll send you comprehensive information within 48 hours. Check our FAQ section for immediate answers.`
    }
  };

  const categoryMessages = messages[inquiryType.category as keyof typeof messages];
  if (categoryMessages) {
    return categoryMessages[inquiryType.priority as keyof typeof categoryMessages] || 
           `Thank you ${name}! We've received your inquiry and will respond ${inquiryType.responseTime}.`;
  }
  
  return `Thank you ${name}! We've received your inquiry and will respond ${inquiryType.responseTime}.`;
}

// Performance-optimized Contact Page component
export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleFormSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    startTransition(() => {
      setIsSubmitting(true);
      setSubmitMessage('');
    });
    
    // Input validation
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;
    
    if (!name.trim() || !email.trim() || !message.trim()) {
      startTransition(() => {
        setSubmitMessage('Please fill in all required fields.');
        setIsSubmitting(false);
      });
      return;
    }
    
    if (!email.includes('@') || !email.includes('.')) {
      startTransition(() => {
        setSubmitMessage('Please enter a valid email address.');
        setIsSubmitting(false);
      });
      return;
    }
    
    try {
      // Simulate API call with realistic delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const subject = formData.get('subject') as string || 'consultation';
      const inquiryType = getInquiryType(subject);
      const responseMsg = getResponseMessage(inquiryType, name);
      
      startTransition(() => {
        setSubmitMessage(responseMsg);
        setIsSubmitting(false);
      });
      
      // Reset form
      e.currentTarget.reset();
      
    } catch (error) {
      startTransition(() => {
        setSubmitMessage('An error occurred. Please call (858) 555-0123 for immediate assistance.');
        setIsSubmitting(false);
      });
    }
  }, []);

  // Memoized quick contact actions
  const quickActions = useMemo(() => [
    {
      title: "Call Now",
      subtitle: "Speak with our team",
      action: "tel:+1-858-555-0123",
      icon: Phone,
      color: "bg-green-600 hover:bg-green-700",
      description: "Immediate assistance available"
    },
    {
      title: "Text Us",
      subtitle: "Quick questions",
      action: "sms:+1-858-555-0123",
      icon: Phone,
      color: "bg-blue-600 hover:bg-blue-700",
      description: "Fast response via text"
    },
    {
      title: "Email Us",
      subtitle: "Detailed inquiries",
      action: "mailto:info@spinezone-sd.com",
      icon: Mail,
      color: "bg-purple-600 hover:bg-purple-700",
      description: "Response within 4 hours"
    }
  ], []);

  // Form validation helper
  const validateForm = () => {
    setSubmitMessage('Please fill in all required fields.');
    return false;
  };

  return (
    <div>
      <Head>
        <title>Contact SpineZone - San Diego Physical Therapy | Free Consultation</title>
        <meta name="description" content="Contact SpineZone for your free consultation. 10 locations across San Diego & Orange County. Call (858) 555-0123 or book online." />
        <meta name="keywords" content="contact SpineZone, San Diego physical therapy, free consultation, book appointment, physical therapy clinic contact" />
        <meta property="og:title" content="Contact SpineZone - Free Physical Therapy Consultation" />
        <meta property="og:description" content="Contact SpineZone for your free consultation. Expert spine care across San Diego & Orange County." />
        <link rel="canonical" href="https://spinezone-sandiego.com/contact" />
      </Head>
      
      <PerformanceOptimizer 
        enableCriticalCSS={true}
        enableResourceHints={true}
        enableLayoutOptimization={true}
        enableWebVitalsTracking={true}
        enableMobileOptimizations={true}
      />
      
      <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-green-50 section-padding">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Contact SpineZone
                <span className="text-blue-600 block">Get Your Free</span>
                <span className="text-green-600 block">Consultation Today</span>
              </h1>
              
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Ready to start your healing journey? Contact our expert team for personalized spine care without surgery or opioids.
              </p>

              {/* Quick Contact Info */}
              <div className="space-y-4">
                <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
                  <Phone className="w-6 h-6 text-green-600 mr-4" aria-hidden="true" />
                  <div>
                    <div className="font-semibold text-gray-900">Call Now</div>
                    <a href="tel:+1-858-555-0123" className="text-green-600 font-bold text-lg hover:text-green-700">
                      (858) 555-0123
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
                  <Mail className="w-6 h-6 text-blue-600 mr-4" aria-hidden="true" />
                  <div>
                    <div className="font-semibold text-gray-900">Email Us</div>
                    <a href="mailto:info@spinezone-sd.com" className="text-blue-600 font-semibold hover:text-blue-700">
                      info@spinezone-sd.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
                  <Clock className="w-6 h-6 text-blue-600 mr-4" aria-hidden="true" />
                  <div>
                    <div className="font-semibold text-gray-900">Response Time</div>
                    <div className="text-green-600 font-semibold">Within 24 Hours</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Quick Response Form</h2>
                <p className="text-gray-600">Get a response within 24 hours</p>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <select
                    name="subject"
                    id="subject"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select a subject</option>
                    <option value="consultation">Free Consultation</option>
                    <option value="appointment">Schedule Appointment</option>
                    <option value="urgent-appointment">Urgent Appointment Request</option>
                    <option value="spinezone-strength">SpineZone Strength Program</option>
                    <option value="intensive-program">Intensive Program</option>
                    <option value="maintenance-program">Maintenance Program</option>
                    <option value="assessment">Comprehensive Assessment</option>
                    <option value="insurance">Insurance Questions</option>
                    <option value="services">Service Information</option>
                    <option value="second-opinion">Second Opinion</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="contactMethod" className="block text-sm font-medium text-gray-700 mb-1">
                    Preferred Contact Method
                  </label>
                  <select
                    name="contactMethod"
                    id="contactMethod"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="email">Email</option>
                    <option value="phone">Phone Call</option>
                    <option value="text">Text Message</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    rows={4}
                    required
                    placeholder="Tell us about your pain or condition, and how we can help..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  />
                </div>
                
                <button
                  type="submit"
                  className={`btn-primary w-full ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={isSubmitting}
                  aria-label={isSubmitting ? 'Sending message...' : 'Send message'}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
              
              {/* Form Status Messages */}
              {submitMessage && (
                <div className={`mt-4 p-4 rounded-lg ${
                  submitMessage.includes('Thank you') 
                    ? 'bg-green-50 border border-green-200 text-green-800'
                    : 'bg-red-50 border border-red-200 text-red-800'
                }`}>
                  <p>{submitMessage}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Insurance Information Section */}
      <section className="bg-white section-padding">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Insurance & Payment Information
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We work with most major insurance providers to make your treatment affordable and accessible
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Accepted Insurance */}
            <div className="bg-blue-50 p-8 rounded-2xl">
              <div className="flex items-center mb-6">
                <Shield className="w-8 h-8 text-blue-600 mr-3" aria-hidden="true" />
                <h3 className="text-2xl font-bold text-gray-900">Accepted Insurance</h3>
              </div>
              
              <div className="grid grid-cols-1 gap-2">
                {insuranceProviders.map((provider, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" aria-hidden="true" />
                    <span className="text-gray-700">{provider}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-white rounded-lg border border-blue-200">
                <p className="text-sm text-gray-600">
                  <strong>Don't see your insurance?</strong> Contact us - we may still be able to help with out-of-network benefits or payment plans.
                </p>
              </div>
            </div>

            {/* Coverage Details */}
            <div className="bg-green-50 p-8 rounded-2xl">
              <div className="flex items-center mb-6">
                <CreditCard className="w-8 h-8 text-green-600 mr-3" aria-hidden="true" />
                <h3 className="text-2xl font-bold text-gray-900">Coverage Details</h3>
              </div>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Most Plans Cover:</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Initial evaluation and consultation</li>
                    <li>• Physical therapy sessions</li>
                    <li>• Manual therapy techniques</li>
                    <li>• Exercise therapy programs</li>
                    <li>• Pain management treatment</li>
                  </ul>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Typical Costs:</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Copay: $20-$40 per visit</li>
                    <li>• Deductible: Varies by plan</li>
                    <li>• Out-of-pocket max: Plan dependent</li>
                  </ul>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-gray-900 mb-2">We Handle:</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Prior authorization requests</li>
                    <li>• Insurance verification</li>
                    <li>• Direct billing to your insurance</li>
                    <li>• Payment plan options</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Special Programs */}
            <div className="bg-gray-50 p-8 rounded-2xl">
              <div className="flex items-center mb-6">
                <Users className="w-8 h-8 text-blue-600 mr-3" aria-hidden="true" />
                <h3 className="text-2xl font-bold text-gray-900">Special Programs</h3>
              </div>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-semibold text-blue-600 mb-2">Veterans Benefits</h4>
                  <p className="text-sm text-gray-600">
                    We accept Tricare and VA referrals. Special programs for military personnel and veterans.
                  </p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-semibold text-green-600 mb-2">Workers' Compensation</h4>
                  <p className="text-sm text-gray-600">
                    Specialized treatment for work-related injuries. Direct billing to employers and insurance carriers.
                  </p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-semibold text-blue-600 mb-2">Auto Accident Claims</h4>
                  <p className="text-sm text-gray-600">
                    Comprehensive care for auto accident injuries. We work directly with legal teams and insurance adjusters.
                  </p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-semibold text-green-600 mb-2">Self-Pay Discounts</h4>
                  <p className="text-sm text-gray-600">
                    Competitive rates and flexible payment plans for patients without insurance coverage.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Online Booking Section */}
      <section className="bg-gray-50 section-padding">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Book Your Appointment Online
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Schedule your free consultation at your convenience with our online booking system
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4 mt-1">
                    <Calendar className="w-6 h-6 text-blue-600" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Real-Time Availability</h3>
                    <p className="text-gray-600">
                      See available appointment slots across all 10 locations in real-time and book instantly.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4 mt-1">
                    <CheckCircle className="w-6 h-6 text-green-600" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Instant Confirmation</h3>
                    <p className="text-gray-600">
                      Receive immediate booking confirmation via email and text with appointment reminders.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4 mt-1">
                    <Users className="w-6 h-6 text-blue-600" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Choose Your Specialist</h3>
                    <p className="text-gray-600">
                      Select from our team of expert physical therapists based on your specific needs and location.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Free Consultation Includes:</h4>
                <ul className="space-y-1 text-sm text-green-700">
                  <li>• Comprehensive pain and mobility assessment</li>
                  <li>• Personalized treatment plan discussion</li>
                  <li>• Insurance verification and cost estimate</li>
                  <li>• No obligation - learn your options</li>
                </ul>
              </div>
            </div>

            {/* Calendly Embed Placeholder */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Schedule Online</h3>
                <p className="text-gray-600">Select your preferred date and time</p>
              </div>
              
              {/* Professional Contact Information */}
              <div className="bg-gradient-to-br from-blue-50 to-green-50 h-96 rounded-lg border border-gray-200 p-8">
                <div className="text-center h-full flex flex-col justify-center">
                  <Phone className="w-16 h-16 text-green-600 mx-auto mb-4" aria-hidden="true" />
                  <h4 className="text-2xl font-bold text-gray-900 mb-4">Call for Immediate Scheduling</h4>
                  <a 
                    href="tel:+1-858-555-0123"
                    className="text-4xl font-bold text-green-600 hover:text-green-700 mb-6 transition-colors"
                  >
                    (858) 555-0123
                  </a>
                  
                  <div className="bg-white rounded-lg p-6 mb-6 mx-auto max-w-md">
                    <h5 className="font-semibold text-gray-900 mb-3">Available Hours:</h5>
                    <div className="text-sm text-gray-700 space-y-1">
                      <div>Monday - Friday: 7:00 AM - 7:00 PM</div>
                      <div>Saturday: 8:00 AM - 4:00 PM</div>
                      <div>Sunday: Emergency appointments only</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-green-600 font-semibold">✓ Same-day appointments available</p>
                    <p className="text-blue-600 font-semibold">✓ Free consultation included</p>
                    <p className="text-gray-600">✓ Most insurance plans accepted</p>
                  </div>
                </div>
              </div>
              
              {/* Alternative Booking Options */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-center text-gray-600 mb-4">Prefer to book another way?</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="tel:+1-858-555-0123"
                    className="btn-secondary flex items-center justify-center flex-1"
                  >
                    <Phone className="w-4 h-4 mr-2" aria-hidden="true" />
                    Call Now
                  </a>
                  <a
                    href="mailto:info@spinezone-sd.com?subject=Appointment Request"
                    className="btn-primary flex items-center justify-center flex-1"
                  >
                    <Mail className="w-4 h-4 mr-2" aria-hidden="true" />
                    Email Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Contact and Professional Information */}
      <section className="bg-blue-50 section-padding" id="booking">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Professional Healthcare Contact Information
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Connect with San Diego's leading spine care specialists for immediate assistance
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* Phone Contact */}
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Phone className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Call for Immediate Care</h3>
              <a 
                href="tel:+1-858-555-0123"
                className="text-3xl font-bold text-green-600 hover:text-green-700 block mb-4"
              >
                (858) 555-0123
              </a>
              <p className="text-gray-600 mb-4">Available Mon-Fri 7AM-7PM</p>
              <p className="text-sm text-gray-500">Same-day appointments available</p>
            </div>

            {/* Email Contact */}
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Email Consultation</h3>
              <a 
                href="mailto:appointments@spinezone.com?subject=Healthcare Consultation"
                className="text-lg font-semibold text-blue-600 hover:text-blue-700 block mb-4"
              >
                appointments@spinezone.com
              </a>
              <p className="text-gray-600 mb-4">Response within 24 hours</p>
              <p className="text-sm text-gray-500">Detailed treatment planning</p>
            </div>

            {/* Location Info */}
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Visit Our Clinic</h3>
              <p className="text-lg font-semibold text-gray-700 mb-4">10 San Diego Locations</p>
              <p className="text-gray-600 mb-4">Downtown, La Jolla, Pacific Beach</p>
              <p className="text-sm text-gray-500">Professional healthcare facility</p>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 bg-white p-8 rounded-2xl shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">90%</div>
                <div className="text-gray-700">Success Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">1M+</div>
                <div className="text-gray-700">Patient Encounters</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">10</div>
                <div className="text-gray-700">SD Locations</div>
              </div>
              <div>
                <div className="flex justify-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                </div>
                <div className="text-gray-700">Patient Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Info */}
      <section className="bg-white section-padding">
        <div className="container-max text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
            Visit Our Main Location
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="text-left">
              <div className="bg-blue-50 p-8 rounded-2xl">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">SpineZone Headquarters</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="w-6 h-6 text-blue-600 mr-4 mt-1 flex-shrink-0" aria-hidden="true" />
                    <div>
                      <div className="font-semibold text-gray-900 mb-1">Address</div>
                      <address className="text-gray-700 not-italic">
                        1234 Healing Way, Suite 200<br />
                        San Diego, CA 92101
                      </address>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock className="w-6 h-6 text-blue-600 mr-4 mt-1 flex-shrink-0" aria-hidden="true" />
                    <div>
                      <div className="font-semibold text-gray-900 mb-1">Hours</div>
                      <div className="text-gray-700 space-y-1">
                        <div>Monday - Friday: 7:00 AM - 8:00 PM</div>
                        <div>Saturday: 8:00 AM - 5:00 PM</div>
                        <div>Sunday: Closed</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="w-6 h-6 text-green-600 mr-4 mt-1 flex-shrink-0" aria-hidden="true" />
                    <div>
                      <div className="font-semibold text-gray-900 mb-1">Phone</div>
                      <a href="tel:+1-858-555-0123" className="text-green-600 font-bold text-lg hover:text-green-700">
                        (858) 555-0123
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <InteractiveMap
              locations={[
                {
                  id: 1,
                  name: "SpineZone Downtown San Diego",
                  address: "1234 Healing Way, Suite 200, San Diego, CA 92101",
                  phone: "(858) 555-0123",
                  coordinates: { lat: 32.7157, lng: -117.1611 },
                  hours: {
                    monday: "7:00 AM - 6:00 PM",
                    tuesday: "7:00 AM - 6:00 PM",
                    wednesday: "7:00 AM - 6:00 PM",
                    thursday: "7:00 AM - 6:00 PM",
                    friday: "7:00 AM - 5:00 PM",
                    saturday: "8:00 AM - 2:00 PM",
                    sunday: "Closed"
                  }
                }
              ]}
              className="h-96"
            />
          </div>
        </div>
      </section>
      </main>
    </div>
  );
}