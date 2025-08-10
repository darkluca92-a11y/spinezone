'use client';

import { Heart, Shield, Activity, Zap, ArrowRight, Calendar } from 'lucide-react';
import Link from 'next/link';
import AppointmentCTA from './AppointmentCTAVariants';

const treatmentOverviews = [
  {
    title: "Manual Therapy",
    icon: Heart,
    color: "blue",
    description: "Hands-on techniques to restore mobility and reduce pain",
    keyBenefits: ["Immediate pain relief", "Improved mobility", "Enhanced circulation"],
    ctaText: "Book Manual Therapy"
  },
  {
    title: "Advanced Therapies",
    icon: Zap,
    color: "purple",
    description: "Cutting-edge treatments for optimal healing",
    keyBenefits: ["Accelerated healing", "Reduced inflammation", "Nerve regeneration"],
    ctaText: "Schedule Advanced Treatment"
  },
  {
    title: "Exercise Therapy",
    icon: Activity,
    color: "green",
    description: "Targeted exercises for strength and stability",
    keyBenefits: ["Long-term stability", "Injury prevention", "Functional improvement"],
    ctaText: "Start Exercise Program"
  },
  {
    title: "Holistic Wellness",
    icon: Shield,
    color: "orange",
    description: "Comprehensive approach to whole-body health",
    keyBenefits: ["Overall wellness", "Lifestyle improvements", "Sustained results"],
    ctaText: "Book Wellness Appointment"
  }
];

const getColorClasses = (color: string) => {
  const colors = {
    blue: { bg: "bg-blue-50", icon: "bg-blue-100 text-blue-600", accent: "text-blue-600", border: "border-blue-200", button: "bg-blue-600 hover:bg-blue-700" },
    green: { bg: "bg-green-50", icon: "bg-green-100 text-green-600", accent: "text-green-600", border: "border-green-200", button: "bg-green-600 hover:bg-green-700" },
    purple: { bg: "bg-purple-50", icon: "bg-purple-100 text-purple-600", accent: "text-purple-600", border: "border-purple-200", button: "bg-purple-600 hover:bg-purple-700" },
    orange: { bg: "bg-orange-50", icon: "bg-orange-100 text-orange-600", accent: "text-orange-600", border: "border-orange-200", button: "bg-orange-600 hover:bg-orange-700" }
  };
  return colors[color as keyof typeof colors];
};

export default function TreatmentOverviewCards() {
  return (
    <section className="bg-white section-padding" aria-labelledby="treatments-overview-heading">
      <div className="container-max">
        <div className="text-center mb-12">
          <h2 id="treatments-overview-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Treatment Options Overview
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our comprehensive treatment approaches designed to address your specific condition and recovery goals
          </p>
        </div>

        {/* Treatment Overview Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {treatmentOverviews.map((treatment, index) => {
            const Icon = treatment.icon;
            const colors = getColorClasses(treatment.color);
            
            return (
              <div key={index} className={`${colors.bg} ${colors.border} border rounded-xl p-6 hover:shadow-lg transition-all duration-300 flex flex-col h-full`}>
                <div className="flex items-center mb-4">
                  <div className={`p-3 rounded-lg ${colors.icon} mr-3`}>
                    <Icon className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{treatment.title}</h3>
                </div>
                
                <p className="text-gray-600 mb-4 flex-grow">{treatment.description}</p>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Key Benefits:</h4>
                  <ul className="space-y-1">
                    {treatment.keyBenefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <AppointmentCTA 
                  variant="primary"
                  size="small"
                  fullWidth={true}
                  className="mt-auto"
                >
                  <Calendar className="w-4 h-4 mr-2 inline" />
                  {treatment.ctaText}
                </AppointmentCTA>
              </div>
            );
          })}
        </div>

        {/* Learn More About Complete Treatment Process */}
        <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-8 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Want to Understand Your Complete Recovery Process?
          </h3>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            Learn about our systematic 3-phase treatment approach and what to expect at every step of your recovery journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/treatment-journey"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-colors duration-200 flex items-center justify-center"
            >
              View Complete Treatment Journey
              <ArrowRight className="w-5 h-5 ml-2" aria-hidden="true" />
            </Link>
            <AppointmentCTA 
              variant="secondary"
              size="large"
            >
              <Calendar className="w-5 h-5 mr-2" aria-hidden="true" />
              Schedule Your Appointment
            </AppointmentCTA>
          </div>
        </div>
      </div>
    </section>
  );
}