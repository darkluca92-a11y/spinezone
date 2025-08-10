import Image from 'next/image';
import { Zap, Heart, Monitor, Leaf, CheckCircle, ArrowRight, Award, Target } from 'lucide-react';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { generateSEOMetadata } from '@/lib/seo-utils';
import StructuredData from '@/components/StructuredData';
import Breadcrumb from '@/components/Breadcrumb';
import { breadcrumbConfigs } from '@/lib/breadcrumb-config';
import PerformanceOptimizer from '@/components/PerformanceOptimizer';

// Lazy load heavy components for better performance
const InternalLinks = dynamic(() => import('@/components/InternalLinks'), {
  loading: () => (
    <div className="section-padding bg-gradient-to-br from-blue-50 to-green-50 animate-pulse">
      <div className="container-max">
        <div className="h-6 bg-gray-200 rounded mb-4 w-1/4"></div>
        <div className="grid md:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-12 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    </div>
  ),
  ssr: false
});

const ServiceAppointmentForm = dynamic(() => import('@/components/ServiceAppointmentForm'), {
  loading: () => (
    <div className="bg-white rounded-2xl shadow-lg p-8 animate-pulse">
      <div className="h-6 bg-gray-200 rounded mb-4 w-1/2"></div>
      <div className="space-y-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-4 bg-gray-200 rounded"></div>
        ))}
      </div>
      <div className="h-10 bg-gray-200 rounded mt-6"></div>
    </div>
  ),
  ssr: false
});

export const metadata: Metadata = generateSEOMetadata({
  title: 'Physical Therapy Services & Appointments | San Diego SpineZone 2025',
  description: 'Comprehensive PT services with online appointment booking. Spine therapy, joint pain treatment, sports injury recovery. Schedule your San Diego appointment today. Same-day availability.',
  keywords: [
    'physical therapy services San Diego 2025',
    'comprehensive joint pain treatment',
    'spine treatment programs',
    'sports injury rehabilitation services',
    'non-invasive pain management',
    'schedule PT services appointment',
    'book physical therapy services San Diego',
    'physical therapy appointment booking',
    'San Diego PT services appointments',
    'online PT appointment scheduling',
    'La Jolla physical therapy services',
    'Hillcrest spine treatment programs',
    'Pacific Beach PT services',
    'intensive rehabilitation programs',
    'maintenance therapy programs'
  ],
  category: 'spine',
  location: 'San Diego',
  priority: 'high'
});

const services = [
  {
    id: 'spinezone-strength',
    icon: Target,
    title: "SpineZone Strength Program",
    subtitle: "10 Weeks • 20 Sessions",
    description: "Our flagship program specifically designed to cure severe back, neck, hip, shoulder, and knee pain without surgery or medications. Data-driven approach with proven results.",
    features: [
      "Comprehensive pain elimination protocol",
      "Advanced manual therapy techniques", 
      "Movement pattern correction",
      "Strength and conditioning integration",
      "Tailored for ages, severity, goals"
    ],
    successRate: "90% complete pain elimination",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    ctaText: "Start Strength Program",
    duration: "10 weeks",
    sessions: "20 sessions",
    target: "Severe pain cases"
  },
  {
    id: 'intensive-program',
    icon: Zap,
    title: "Intensive Program",
    subtitle: "7 Weeks • 14 Sessions", 
    description: "Accelerated rehabilitation program optimal for conditioning and rapid recovery. Perfect for patients seeking intensive, focused treatment for all joint pain conditions.",
    features: [
      "Accelerated treatment protocols",
      "High-intensity rehabilitation",
      "Advanced conditioning techniques",
      "Rapid functional restoration",
      "Sport-specific preparation"
    ],
    successRate: "85% optimal conditioning achieved",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    ctaText: "Start Intensive Program",
    duration: "7 weeks", 
    sessions: "14 sessions",
    target: "Intensive rehabilitation"
  },
  {
    id: 'maintenance-program',
    icon: Heart,
    title: "Maintenance Program", 
    subtitle: "10 Sessions • Post-Program Only",
    description: "Exclusive ongoing care program available only to graduates of our primary programs. Designed for long-term prevention and sustained wellness for all joint conditions.",
    features: [
      "Preventive care protocols",
      "Maintenance strengthening",
      "Progress monitoring",
      "Lifestyle optimization",
      "Long-term wellness planning"
    ],
    successRate: "95% long-term success maintenance",
    image: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    ctaText: "Continue Care Program",
    duration: "Ongoing",
    sessions: "10 sessions",
    target: "Post-program participants only"
  }
];

const comparisonData = [
  {
    metric: "Treatment Success Rate",
    spinezone: "90% complete elimination",
    general: "60% partial improvement", 
    improvement: "50% better outcomes"
  },
  {
    metric: "Data-Driven Oversight",
    spinezone: "Advanced analytics & tracking",
    general: "Basic progress notes",
    improvement: "Precision care"
  },
  {
    metric: "Referral Requirements",
    spinezone: "No referrals required",
    general: "Doctor referral needed",
    improvement: "Immediate access"
  },
  {
    metric: "Insurance Coverage",
    spinezone: "All major plans accepted",
    general: "Limited coverage",
    improvement: "100% accessibility"
  },
  {
    metric: "Treatment Approach",
    spinezone: "Tailored for ages, severity, goals",
    general: "One-size-fits-all protocols",
    improvement: "Personalized care"
  }
];

export default function ServicesPage() {
  return (
    <main>
      <PerformanceOptimizer 
        enableCriticalCSS={true}
        enableResourceHints={true}
        enableLayoutOptimization={true}
        enableWebVitalsTracking={true}
        enableMobileOptimizations={true}
      />
      <StructuredData type="services" />
      
      {/* Breadcrumb Navigation */}
      <section className="bg-white border-b border-gray-100">
        <div className="container-max py-4">
          <Breadcrumb items={breadcrumbConfigs.services} />
        </div>
      </section>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-green-50 section-padding">
        <div className="container-max text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Comprehensive
            <span className="text-blue-600 block">Non-Invasive Treatment</span>
            <span className="text-green-600 text-2xl sm:text-3xl lg:text-4xl block mt-2">
              Specialized Care for Every Need
            </span>
          </h1>
          
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
            Our evidence-based services deliver superior outcomes compared to general PT clinics, 
            focusing on root causes rather than just symptom relief.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="text-center p-4 bg-white rounded-lg shadow-sm border border-blue-100">
              <div className="text-3xl font-bold text-blue-600 mb-1">90%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm border border-green-100">
              <div className="text-3xl font-bold text-green-600 mb-1">85%</div>
              <div className="text-sm text-gray-600">Opioid Reduction</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm border border-blue-100">
              <div className="text-3xl font-bold text-blue-600 mb-1">50%</div>
              <div className="text-sm text-gray-600">Faster Recovery</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-white section-padding">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Our Specialized Treatment Programs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Three comprehensive programs designed to eliminate severe back, neck, hip, shoulder, and knee pain using proven non-invasive methods
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div 
                  key={index}
                  className="bg-gray-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer transform hover:scale-105 viewport-section"
                  style={{ animationDelay: `${index * 150}ms` }}
                  data-viewport-threshold="0.2"
                >
                  <div className="flex flex-col h-full">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={service.image}
                        alt={`${service.title} treatment session at SpineZone`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, 33vw"
                        priority={index === 0} // Priority load first image
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                      />
                      <div className="absolute top-4 right-4">
                        <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                          <span className="text-xs font-semibold text-blue-600">{service.duration}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center mb-4">
                        <div className="p-3 rounded-lg bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                          <Icon className="w-8 h-8" aria-hidden="true" />
                        </div>
                      </div>
                      
                      <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                        {service.title}
                      </h3>
                      
                      <p className="text-green-600 font-semibold mb-3 text-lg">
                        {service.subtitle}
                      </p>
                      
                      <p className="text-gray-600 mb-4 leading-relaxed flex-1">
                        {service.description}
                      </p>
                      
                      <ul className="space-y-2 mb-6">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" aria-hidden="true" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      
                      {/* Program Details */}
                      <div className="grid grid-cols-2 gap-4 mb-4 text-center">
                        <div className="bg-blue-50 rounded-lg p-3">
                          <div className="font-semibold text-blue-600">{service.sessions}</div>
                          <div className="text-xs text-gray-600">Sessions</div>
                        </div>
                        <div className="bg-green-50 rounded-lg p-3">
                          <div className="font-semibold text-green-600">{service.target}</div>
                          <div className="text-xs text-gray-600">Target</div>
                        </div>
                      </div>
                      
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-6">
                        <div className="flex items-center">
                          <Award className="w-4 h-4 text-green-600 mr-2" aria-hidden="true" />
                          <span className="text-green-800 font-semibold text-sm">{service.successRate}</span>
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => {
                          const bookingSection = document.getElementById(`booking-${service.id}`);
                          if (bookingSection) {
                            bookingSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            // Preload the appointment form if not already loaded
                            import('@/components/ServiceAppointmentForm');
                          }
                        }}
                        className="btn-primary w-full flex items-center justify-center group hover:scale-105 active:scale-95 transform transition-all"
                      >
                        {service.ctaText}
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="bg-gray-50 section-padding">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why SpineZone Outperforms General PT Clinics
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our competitive advantages deliver superior outcomes through specialized, data-driven joint and spine care
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden viewport-section" data-viewport-threshold="0.3">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-blue-600 to-green-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left text-lg font-semibold">Competitive Advantage</th>
                    <th className="px-6 py-4 text-center text-lg font-semibold">SpineZone</th>
                    <th className="px-6 py-4 text-center text-lg font-semibold">General PT Clinics</th>
                    <th className="px-6 py-4 text-center text-lg font-semibold">Our Advantage</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, index) => (
                    <tr 
                      key={index} 
                      className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-all transform hover:scale-[1.01]`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <td className="px-6 py-4 font-semibold text-gray-900">{row.metric}</td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
                          {row.spinezone}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-gray-100 text-gray-700">
                          {row.general}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-800">
                          {row.improvement}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-6">
              Data compiled from internal outcomes research and industry benchmarks (2020-2024)
            </p>
            <button className="btn-secondary text-lg">
              View Detailed Outcome Studies
            </button>
          </div>
        </div>
      </section>

      {/* Non-Invasive Treatment Emphasis */}
      <section className="bg-white section-padding">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Why Non-Invasive Treatment Works Better
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4 mt-1">
                    <Zap className="w-6 h-6 text-green-600" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Faster Recovery</h3>
                    <p className="text-gray-600">
                      No surgical downtime means you start healing immediately and return to normal activities 50% faster.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4 mt-1">
                    <Heart className="w-6 h-6 text-blue-600" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Lower Risk</h3>
                    <p className="text-gray-600">
                      Eliminate surgical complications, infections, and adverse medication reactions while achieving lasting results.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4 mt-1">
                    <Target className="w-6 h-6 text-green-600" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Addresses Root Causes</h3>
                    <p className="text-gray-600">
                      Fix underlying movement patterns and muscle imbalances to prevent recurrence, not just treat symptoms.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative viewport-section" data-viewport-threshold="0.3">
              <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Non-invasive physical therapy treatment session showing hands-on care"
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-green-600 section-padding text-white">
        <div className="container-max text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Experience Superior Results?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Choose the proven approach with higher success rates, faster recovery, and lasting results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg text-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600">
              Schedule Your Appointment
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold py-4 px-8 rounded-lg text-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600">
              Compare Our Services
            </button>
          </div>
        </div>
      </section>

      {/* Migrated Section: Don't See Your Condition Listed? */}
      <section className="bg-gray-50 section-padding">
        <div className="container-max">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Don't See Your Condition Listed?
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Our comprehensive evaluation and treatment approach works for any musculoskeletal condition. 
              We specialize in complex cases that other clinics can't solve.
            </p>
            
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">We Treat All Conditions Including:</h3>
                  <div className="grid grid-cols-2 gap-4 text-left">
                    <ul className="space-y-2">
                      <li className="flex items-center text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        Rare spine disorders
                      </li>
                      <li className="flex items-center text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        Complex joint pain
                      </li>
                      <li className="flex items-center text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        Chronic conditions
                      </li>
                      <li className="flex items-center text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        Post-surgical cases
                      </li>
                    </ul>
                    <ul className="space-y-2">
                      <li className="flex items-center text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        Failed previous PT
                      </li>
                      <li className="flex items-center text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        Unexplained pain
                      </li>
                      <li className="flex items-center text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        Movement disorders
                      </li>
                      <li className="flex items-center text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        Athletic injuries
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-blue-600">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Comprehensive Evaluation Includes:</h3>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <Target className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                      <div>
                        <span className="font-semibold text-gray-900">Diagnostic Assessment:</span>
                        <span className="text-gray-700"> Complete movement and postural analysis</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Monitor className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                      <div>
                        <span className="font-semibold text-gray-900">Advanced Testing:</span>
                        <span className="text-gray-700"> Specialized orthopedic and neurological tests</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Award className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                      <div>
                        <span className="font-semibold text-gray-900">Treatment Planning:</span>
                        <span className="text-gray-700"> Evidence-based protocol development</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                      <div>
                        <span className="font-semibold text-gray-900">Progress Monitoring:</span>
                        <span className="text-gray-700"> Ongoing tracking and plan adjustments</span>
                      </div>
                    </li>
                  </ul>
                  
                  <div className="bg-blue-50 rounded-lg p-4 mb-6">
                    <p className="text-blue-800 font-semibold text-center">
                      90% success rate even with complex conditions
                    </p>
                  </div>
                  
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center">
                    Schedule Comprehensive Assessment
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Migrated Section: Treatment Selection Guide */}
      <section className="bg-white section-padding">
        <div className="container-max">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Not Sure Which Treatment is Right for You?
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Our expert team conducts a comprehensive evaluation to determine the optimal treatment plan 
                for your specific condition and goals. We take the guesswork out of recovery.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 lg:p-12">
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Selection Process:</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold mr-4 mt-1 text-sm flex-shrink-0">1</div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Initial Assessment & Examination</h4>
                        <p className="text-gray-600 text-sm">Comprehensive evaluation of your condition, medical history, and functional limitations</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold mr-4 mt-1 text-sm flex-shrink-0">2</div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Movement & Function Assessment</h4>
                        <p className="text-gray-600 text-sm">Advanced testing to identify root causes and movement patterns contributing to pain</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold mr-4 mt-1 text-sm flex-shrink-0">3</div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Personalized Treatment Plan</h4>
                        <p className="text-gray-600 text-sm">Custom protocol designed for your specific needs, lifestyle, and recovery goals</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold mr-4 mt-1 text-sm flex-shrink-0">4</div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Progress Tracking & Adjustments</h4>
                        <p className="text-gray-600 text-sm">Continuous monitoring and plan modifications to ensure optimal outcomes</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="bg-white rounded-xl p-6 shadow-lg">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Assessment Determines:</h3>
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">Which program will work best for you</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">Expected timeline for recovery</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">Specific techniques that will help</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">Home care and prevention strategies</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">Realistic expectations and goals</span>
                      </li>
                    </ul>
                    
                    <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-lg p-4 mb-6">
                      <p className="text-white font-semibold text-center">
                        Most patients know their treatment plan within the first visit
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 text-sm">
                        Book Assessment
                      </button>
                      <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 text-sm">
                        Call (858) 555-0123
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service-Specific Appointment Booking */}
      <section className="bg-white section-padding">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Book Your Program Appointment
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ready to start your treatment? Select your preferred program below and schedule your appointment with our specialized team.
            </p>
          </div>

          <div className="space-y-16">
            {services.map((service, index) => (
              <div key={service.id} id={`booking-${service.id}`} className="scroll-mt-24 viewport-section" data-viewport-threshold="0.1">
                <Suspense fallback={
                  <div className="bg-white rounded-2xl shadow-lg p-8 animate-pulse max-w-4xl mx-auto">
                    <div className="h-8 bg-gray-200 rounded mb-4 w-1/2"></div>
                    <div className="space-y-4">
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className="h-4 bg-gray-200 rounded"></div>
                      ))}
                    </div>
                    <div className="h-10 bg-gray-200 rounded mt-6"></div>
                  </div>
                }>
                  <ServiceAppointmentForm
                    serviceType={service.id as any}
                    serviceName={service.title}
                    serviceDescription={service.description}
                    duration={service.duration}
                    sessions={service.sessions}
                    onSuccess={(data) => {
                      console.log(`${service.title} appointment booked:`, data);
                    }}
                    onError={(error) => {
                      console.error('Service appointment booking error:', error);
                    }}
                    className="max-w-4xl mx-auto"
                  />
                </Suspense>
              </div>
            ))}
          </div>

          {/* Additional Consultation Options */}
          <div className="mt-16 grid md:grid-cols-2 gap-8">
            <div id="booking-consultation-only" className="viewport-section" data-viewport-threshold="0.1">
              <Suspense fallback={
                <div className="bg-white rounded-2xl shadow-lg p-8 animate-pulse">
                  <div className="h-6 bg-gray-200 rounded mb-4 w-1/2"></div>
                  <div className="space-y-3">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="h-4 bg-gray-200 rounded"></div>
                    ))}
                  </div>
                  <div className="h-10 bg-gray-200 rounded mt-4"></div>
                </div>
              }>
                <ServiceAppointmentForm
                  serviceType="consultation-only"
                  serviceName="Free Consultation"
                  serviceDescription="Not sure which program is right for you? Start with our free consultation to get personalized recommendations and create your treatment plan."
                  duration="30 minutes"
                  sessions="Single session"
                  onSuccess={(data) => {
                    console.log('Consultation appointment booked:', data);
                  }}
                  onError={(error) => {
                    console.error('Consultation booking error:', error);
                  }}
                />
              </Suspense>
            </div>

            <div id="booking-assessment-only" className="viewport-section" data-viewport-threshold="0.1">
              <Suspense fallback={
                <div className="bg-white rounded-2xl shadow-lg p-8 animate-pulse">
                  <div className="h-6 bg-gray-200 rounded mb-4 w-1/2"></div>
                  <div className="space-y-3">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="h-4 bg-gray-200 rounded"></div>
                    ))}
                  </div>
                  <div className="h-10 bg-gray-200 rounded mt-4"></div>
                </div>
              }>
                <ServiceAppointmentForm
                  serviceType="assessment-only"
                  serviceName="Comprehensive Assessment"
                  serviceDescription="Get a detailed evaluation of your condition with our comprehensive assessment. Includes movement analysis, pain evaluation, and treatment recommendations."
                  duration="60 minutes"
                  sessions="Single session"
                  onSuccess={(data) => {
                    console.log('Assessment appointment booked:', data);
                  }}
                  onError={(error) => {
                    console.error('Assessment booking error:', error);
                  }}
                />
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      {/* Internal Links for SEO */}
      <Suspense fallback={
        <div className="section-padding bg-gradient-to-br from-blue-50 to-green-50 animate-pulse">
          <div className="container-max">
            <div className="h-6 bg-gray-200 rounded mb-4 w-1/4"></div>
            <div className="grid md:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-12 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      }>
        <InternalLinks currentPage="services" showLocalSEO={true} />
      </Suspense>
    </main>
  );
}