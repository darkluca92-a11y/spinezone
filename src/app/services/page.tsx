import Image from 'next/image';
import { Zap, Heart, Monitor, Leaf, CheckCircle, ArrowRight, Award, Target } from 'lucide-react';
import type { Metadata } from 'next';
import { generateSEOMetadata } from '@/lib/seo-utils';
import StructuredData from '@/components/StructuredData';
import Breadcrumb from '@/components/Breadcrumb';
import { breadcrumbConfigs } from '@/lib/breadcrumb-config';
import InternalLinks from '@/components/InternalLinks';

export const metadata: Metadata = generateSEOMetadata({
  title: 'San Diego Physical Therapy Services 2025 | Advanced Joint Pain Treatment | SpineZone',
  description: 'Comprehensive San Diego physical therapy 2025 services: Advanced joint pain treatment for back, neck, hips, shoulders, knees. 90% success rate, proven non-invasive methods.',
  keywords: [
    'physical therapy services San Diego 2025',
    'comprehensive joint pain treatment',
    'spine treatment programs',
    'sports injury rehabilitation services',
    'non-invasive pain management',
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
                  className="bg-gray-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer transform hover:scale-105"
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
                      
                      <button className="btn-primary w-full flex items-center justify-center group">
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

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
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
                    <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors`}>
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
            
            <div className="relative">
              <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Non-invasive physical therapy treatment session showing hands-on care"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
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
              Schedule Free Consultation
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold py-4 px-8 rounded-lg text-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600">
              Compare Our Services
            </button>
          </div>
        </div>
      </section>

      {/* Internal Links for SEO */}
      <InternalLinks currentPage="services" showLocalSEO={true} />
    </main>
  );
}