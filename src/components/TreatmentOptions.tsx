'use client';

import { Heart, Shield, Activity, Zap, CheckCircle, ArrowRight, Calendar } from 'lucide-react';
import Image from 'next/image';

const treatmentCategories = [
  {
    title: "Manual Therapy",
    icon: Heart,
    color: "blue",
    description: "Hands-on techniques to restore mobility and reduce pain",
    techniques: [
      "Spinal manipulation and mobilization",
      "Soft tissue mobilization",
      "Myofascial release therapy",
      "Trigger point therapy",
      "Joint mobilization techniques"
    ],
    benefits: ["Immediate pain relief", "Improved mobility", "Enhanced circulation"],
    duration: "30-60 minutes per session"
  },
  {
    title: "Advanced Therapies",
    icon: Zap,
    color: "purple",
    description: "Cutting-edge treatments for optimal healing",
    techniques: [
      "Dry needling therapy",
      "Electrical stimulation",
      "Ultrasound therapy",
      "Cold laser therapy",
      "Spinal decompression"
    ],
    benefits: ["Accelerated healing", "Reduced inflammation", "Nerve regeneration"],
    duration: "20-45 minutes per session"
  },
  {
    title: "Exercise Therapy",
    icon: Activity,
    color: "green",
    description: "Targeted exercises for strength and stability",
    techniques: [
      "Core stabilization programs",
      "Postural correction exercises",
      "Functional movement training",
      "Sport-specific rehabilitation",
      "Home exercise programs"
    ],
    benefits: ["Long-term stability", "Injury prevention", "Functional improvement"],
    duration: "45-60 minutes per session"
  },
  {
    title: "Holistic Wellness",
    icon: Shield,
    color: "orange",
    description: "Comprehensive approach to whole-body health",
    techniques: [
      "Nutritional counseling",
      "Stress management techniques",
      "Sleep optimization strategies",
      "Ergonomic assessments",
      "Lifestyle modification coaching"
    ],
    benefits: ["Overall wellness", "Lifestyle improvements", "Sustained results"],
    duration: "60-90 minutes per session"
  }
];


const getColorClasses = (color: string) => {
  const colors = {
    blue: { bg: "bg-blue-50", icon: "bg-blue-100 text-blue-600", accent: "text-blue-600", border: "border-blue-200" },
    green: { bg: "bg-green-50", icon: "bg-green-100 text-green-600", accent: "text-green-600", border: "border-green-200" },
    purple: { bg: "bg-purple-50", icon: "bg-purple-100 text-purple-600", accent: "text-purple-600", border: "border-purple-200" },
    orange: { bg: "bg-orange-50", icon: "bg-orange-100 text-orange-600", accent: "text-orange-600", border: "border-orange-200" }
  };
  return colors[color as keyof typeof colors];
};

export default function TreatmentOptions() {
  return (
    <section className="bg-white section-padding" aria-labelledby="treatments-heading">
      <div className="container-max">
        <div className="text-center mb-12 sm:mb-16">
          <h2 id="treatments-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Comprehensive Treatment Options
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            We offer a complete spectrum of evidence-based treatments, from traditional manual therapy to cutting-edge technologies, all designed to achieve optimal outcomes
          </p>
        </div>

        {/* Treatment Categories */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {treatmentCategories.map((treatment, index) => {
            const Icon = treatment.icon;
            const colors = getColorClasses(treatment.color);
            
            return (
              <div key={index} className={`${colors.bg} ${colors.border} border rounded-2xl p-8 hover:shadow-lg transition-all duration-300`}>
                <div className="flex items-center mb-6">
                  <div className={`p-3 rounded-lg ${colors.icon} mr-4`}>
                    <Icon className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{treatment.title}</h3>
                    <p className="text-gray-600">{treatment.description}</p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Techniques Include:</h4>
                    <ul className="space-y-2">
                      {treatment.techniques.map((technique, techIndex) => (
                        <li key={techIndex} className="flex items-start text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" aria-hidden="true" />
                          <span className="text-gray-700">{technique}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Key Benefits:</h4>
                    <ul className="space-y-2 mb-4">
                      {treatment.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-center text-sm">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                          <span className="text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="flex items-center text-sm text-gray-600 mb-4">
                      <Calendar className="w-4 h-4 mr-2" aria-hidden="true" />
                      <span>{treatment.duration}</span>
                    </div>
                    
                    <button className={`w-full ${colors.icon.includes('blue') ? 'bg-blue-600 hover:bg-blue-700' : 
                      colors.icon.includes('green') ? 'bg-green-600 hover:bg-green-700' : 
                      colors.icon.includes('purple') ? 'bg-purple-600 hover:bg-purple-700' : 
                      'bg-orange-600 hover:bg-orange-700'} text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 text-sm`}>
                      Schedule {treatment.title} Appointment
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Treatment Journey CTA - Link to new dedicated page */}
        <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-8 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Explore Our Complete Treatment Process
          </h3>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            Understand your complete recovery journey with our systematic 3-phase approach. 
            See exactly what to expect from your first visit to full recovery.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-colors duration-200 flex items-center justify-center">
              View Treatment Journey
              <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
            </button>
            <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-colors duration-200 flex items-center justify-center">
              <Calendar className="w-4 h-4 mr-2" aria-hidden="true" />
              Make an Appointment
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}