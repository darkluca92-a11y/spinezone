'use client';

import { Phone, Mail, MapPin, Clock, Shield, CheckCircle, CreditCard, Users, Calendar } from 'lucide-react';
import { useState } from 'react';
import Head from 'next/head';
import InteractiveMap from '@/components/InteractiveMap';

const insuranceProviders = [
  "Blue Cross Blue Shield", "Aetna", "Cigna", "UnitedHealth", "Kaiser Permanente",
  "Anthem", "Humana", "Medicare", "Medicaid", "Tricare", "Workers' Compensation",
  "Auto Insurance Claims", "Sharp Health Plan", "Scripps Health Plan"
];

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');
    
    // Input validation
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;
    
    if (!name.trim() || !email.trim() || !message.trim()) {
      setSubmitMessage('Please fill in all required fields.');
      setIsSubmitting(false);
      return;
    }
    
    try {
      // Demo mode: Simulate form submission for static export
      console.log('DEMO MODE: Contact form submission:', {
        type: 'general_inquiry',
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        subject: formData.get('subject'),
        contactMethod: formData.get('contactMethod'),
        message: formData.get('message'),
      });

      // Simulate async operation
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Always show success message in demo mode
      setSubmitMessage('Thank you for contacting SpineZone! This is a demo - in production, we would respond within 24 hours.');
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      setSubmitMessage('Sorry, there was an error submitting your message. Please call us directly at (858) 555-0123.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Contact SpineZone - San Diego Physical Therapy | Free Consultation</title>
        <meta name="description" content="Contact SpineZone for your free consultation. 10 locations across San Diego & Orange County. Call (858) 555-0123 or book online." />
        <meta name="keywords" content="contact SpineZone, San Diego physical therapy, free consultation, book appointment, physical therapy clinic contact" />
        <meta property="og:title" content="Contact SpineZone - Free Physical Therapy Consultation" />
        <meta property="og:description" content="Contact SpineZone for your free consultation. Expert spine care across San Diego & Orange County." />
        <link rel="canonical" href="https://spinezone-sandiego.com/contact" />
      </Head>
      
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
                    <option value="insurance">Insurance Questions</option>
                    <option value="services">Service Information</option>
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
              
              {/* Enhanced Calendly Widget Placeholder */}
              <div className="bg-gradient-to-br from-blue-50 to-green-50 h-96 rounded-lg border border-gray-200 p-8">
                <div className="text-center h-full flex flex-col justify-center">
                  <Calendar className="w-16 h-16 text-blue-600 mx-auto mb-4" aria-hidden="true" />
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Online Booking System</h4>
                  <p className="text-gray-600 mb-6">
                    Our Calendly integration allows you to book appointments instantly across all San Diego locations
                  </p>
                  
                  {/* Mock Calendar Preview */}
                  <div className="bg-white rounded-lg p-4 mb-6 mx-auto max-w-md">
                    <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2">
                      {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
                        <div key={day} className="font-semibold text-gray-600 p-1">{day}</div>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                      {Array.from({ length: 35 }, (_, i) => {
                        const isAvailable = [4, 5, 6, 11, 12, 13, 18, 19, 20, 25, 26, 27].includes(i);
                        const isSelected = i === 12;
                        return (
                          <div 
                            key={i} 
                            className={`aspect-square text-xs flex items-center justify-center rounded ${
                              isSelected ? 'bg-blue-600 text-white' : 
                              isAvailable ? 'bg-green-100 text-green-800 cursor-pointer hover:bg-green-200' : 
                              'text-gray-400'
                            }`}
                          >
                            {i > 5 && i < 30 ? i - 5 : ''}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => {
                      alert('Demo Mode: In production, this would open the full Calendly booking widget with:\n\n• Real-time availability across 10 locations\n• Provider selection\n• Service type selection\n• Automatic confirmations\n• Calendar integration\n\nFor now, please call (858) 555-0123 to schedule!');
                    }}
                    className="btn-primary mb-3"
                  >
                    Launch Booking System
                  </button>
                  
                  <p className="text-xs text-gray-500">
                    🚀 Demo Mode - Click to see what the full system would include
                  </p>
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
    </>
  );
}