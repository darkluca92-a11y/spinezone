import { Heart, Shield, Activity, Zap, CheckCircle, ArrowRight, Clock } from 'lucide-react';
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

const treatmentPhases = [
  {
    phase: "Phase 1",
    title: "Pain Relief & Protection",
    duration: "1-2 weeks",
    goals: ["Reduce acute pain", "Protect injured tissues", "Restore basic function"],
    treatments: ["Manual therapy", "Pain management", "Gentle mobilization"]
  },
  {
    phase: "Phase 2", 
    title: "Mobility & Strength",
    duration: "2-4 weeks",
    goals: ["Improve range of motion", "Build foundational strength", "Address movement patterns"],
    treatments: ["Progressive exercises", "Manual therapy", "Movement training"]
  },
  {
    phase: "Phase 3",
    title: "Function & Performance",
    duration: "2-6 weeks",
    goals: ["Return to activities", "Optimize performance", "Prevent recurrence"],
    treatments: ["Advanced exercises", "Functional training", "Sport-specific prep"]
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
        <div className="text-center mb-16">
          <h2 id="treatments-heading" className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Comprehensive Treatment Options
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
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
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-2" aria-hidden="true" />
                      <span>{treatment.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Treatment Phases */}
        <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 lg:p-12 mb-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Your Treatment Journey
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our systematic, phase-based approach ensures optimal recovery at every stage of your healing process
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {treatmentPhases.map((phase, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold mr-3">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900">{phase.phase}</h4>
                    <p className="text-blue-600 font-semibold">{phase.title}</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center text-sm text-gray-600 mb-3">
                    <Clock className="w-4 h-4 mr-2" aria-hidden="true" />
                    <span>Duration: {phase.duration}</span>
                  </div>
                  
                  <h5 className="font-semibold text-gray-900 mb-2">Primary Goals:</h5>
                  <ul className="space-y-1 mb-4">
                    {phase.goals.map((goal, goalIndex) => (
                      <li key={goalIndex} className="flex items-start text-sm">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2 mt-2"></div>
                        <span className="text-gray-700">{goal}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <h5 className="font-semibold text-gray-900 mb-2">Key Treatments:</h5>
                  <div className="flex flex-wrap gap-2">
                    {phase.treatments.map((treatment, treatmentIndex) => (
                      <span key={treatmentIndex} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        {treatment}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Treatment Selection CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 lg:p-12 text-white text-center">
          <h3 className="text-2xl sm:text-3xl font-bold mb-4">
            Not Sure Which Treatment is Right for You?
          </h3>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Our expert team will conduct a comprehensive evaluation to determine the optimal treatment plan for your specific condition and goals
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg text-lg transition-colors duration-200 flex items-center justify-center">
              Schedule Free Evaluation
              <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold py-4 px-8 rounded-lg text-lg transition-colors duration-200">
              Learn More About Treatments
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}