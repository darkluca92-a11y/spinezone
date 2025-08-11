import type { Metadata } from 'next';
import { Clock, CheckCircle, ArrowRight, Calendar, Users, TrendingUp, Shield, Target } from 'lucide-react';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import OptimizedCTAButton from '@/components/OptimizedCTAButtons';
import TreatmentPhaseButtons from '@/components/TreatmentPhaseButtons';
import { generateSEOMetadata } from '@/lib/seo-utils';
import StructuredData from '@/components/StructuredData';
import PerformanceOptimizer from '@/components/PerformanceOptimizer';

// Client component for download button
const DownloadButton = dynamic(() => import('@/components/DownloadButton'), {
  ssr: false,
  loading: () => <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
});

// Lazy load appointment forms for better initial page load
const PhaseAppointmentForm = dynamic(() => 
  import('@/components/AppointmentBookingForms').then(mod => ({ default: mod.PhaseAppointmentForm })), {
  loading: () => (
    <div className="animate-pulse bg-white rounded-xl shadow-lg p-6">
      <div className="h-6 bg-gray-200 rounded mb-4 w-1/2"></div>
      <div className="space-y-3">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-4 bg-gray-200 rounded w-full"></div>
        ))}
      </div>
      <div className="h-10 bg-gray-200 rounded mt-4"></div>
    </div>
  ),
  ssr: false
});

export const metadata: Metadata = generateSEOMetadata({
  title: 'Physical Therapy Treatment Journey | 3-Phase Recovery Process | SpineZone San Diego',
  description: 'Discover your complete physical therapy treatment journey. 3-phase recovery process with appointment scheduling at each milestone. San Diego\'s trusted PT provider with 90% success rate.',
  keywords: [
    'treatment journey',
    'recovery process',
    'PT phases',
    'physical therapy treatment journey San Diego',
    'San Diego PT recovery process 2025',
    'rehabilitation timeline San Diego',
    'physical therapy phases San Diego',
    'treatment plan San Diego PT',
    'recovery timeline joint pain',
    'physical therapy appointments San Diego',
    'schedule PT appointment phases',
    'book physical therapy treatment journey',
    'appointment scheduling PT phases',
    'San Diego treatment milestones'
  ],
  category: 'spine',
  location: 'San Diego',
  priority: 'high'
});

const treatmentPhases = [
  {
    phase: "Phase 1",
    title: "Pain Relief & Protection", 
    duration: "1-2 weeks",
    timeframe: "Sessions 1-6",
    goals: [
      "Reduce acute pain by 60-80%",
      "Protect injured tissues from further damage", 
      "Restore basic functional movements",
      "Establish baseline measurements"
    ],
    treatments: [
      "Manual therapy and soft tissue mobilization",
      "Pain management techniques",
      "Gentle joint mobilization",
      "Postural education",
      "Home care instructions"
    ],
    expectedOutcomes: "Significant pain reduction and improved sleep quality",
    successMarkers: [
      "Pain level decreased from 8/10 to 3-4/10",
      "Improved ability to perform daily activities",
      "Better sleep quality",
      "Reduced medication dependence"
    ]
  },
  {
    phase: "Phase 2",
    title: "Mobility & Strength",
    duration: "2-4 weeks", 
    timeframe: "Sessions 7-18",
    goals: [
      "Improve range of motion by 70-90%",
      "Build foundational strength", 
      "Address movement dysfunction patterns",
      "Enhance tissue healing"
    ],
    treatments: [
      "Progressive strengthening exercises",
      "Advanced manual therapy techniques",
      "Movement pattern retraining",
      "Functional exercise training",
      "Specialized equipment therapy"
    ],
    expectedOutcomes: "Return to most daily activities and improved function",
    successMarkers: [
      "Near-normal range of motion",
      "Ability to lift and carry without pain",
      "Return to work activities",
      "Improved posture and movement quality"
    ]
  },
  {
    phase: "Phase 3",
    title: "Function & Performance",
    duration: "2-6 weeks",
    timeframe: "Sessions 19-36",
    goals: [
      "Return to full activity levels",
      "Optimize performance and endurance", 
      "Prevent injury recurrence",
      "Establish long-term wellness habits"
    ],
    treatments: [
      "Advanced functional exercises",
      "Sport-specific rehabilitation",
      "High-level strengthening",
      "Injury prevention strategies",
      "Maintenance program development"
    ],
    expectedOutcomes: "Complete return to activities with injury prevention",
    successMarkers: [
      "Full return to sports/activities",
      "No pain with demanding activities",
      "Confidence in movement",
      "Independent maintenance program"
    ]
  }
];

const journeyStats = [
  {
    icon: Users,
    stat: "1M+",
    label: "Patients Treated",
    description: "Successfully guided through our treatment journey"
  },
  {
    icon: TrendingUp,
    stat: "90%",
    label: "Success Rate",
    description: "Patients achieve their recovery goals"
  },
  {
    icon: Clock,
    stat: "6-8",
    label: "Average Weeks",
    description: "From first visit to full recovery"
  },
  {
    icon: Shield,
    stat: "95%",
    label: "Avoid Surgery",
    description: "Patients avoid invasive procedures"
  }
];

const milestones = [
  {
    week: "Week 1",
    milestone: "Initial Assessment Complete",
    description: "Comprehensive evaluation and personalized treatment plan created"
  },
  {
    week: "Week 2", 
    milestone: "Pain Significantly Reduced",
    description: "60-80% pain reduction, improved sleep and daily function"
  },
  {
    week: "Week 4",
    milestone: "Mobility Restored",
    description: "Near-normal range of motion, return to work activities"
  },
  {
    week: "Week 6",
    milestone: "Strength & Function",
    description: "Full functional capacity, confidence in movement"
  },
  {
    week: "Week 8",
    milestone: "Complete Recovery",
    description: "Return to all activities, injury prevention program established"
  }
];

export default function TreatmentJourneyPage() {
  return (
    <main className="min-h-screen bg-white">
      <PerformanceOptimizer 
        enableCriticalCSS={true}
        enableResourceHints={true}
        enableLayoutOptimization={true}
        enableWebVitalsTracking={true}
        enableMobileOptimizations={true}
      />
      <StructuredData type="treatment-journey" />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-green-50 section-padding">
        <div className="container-max">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Your Complete Physical Therapy
              <span className="block text-blue-600 mt-2">Treatment Journey</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Understanding your path to recovery helps set realistic expectations and ensures optimal outcomes. 
              Our systematic 3-phase approach has guided over 1 million patient encounters with a 90% success rate.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <OptimizedCTAButton 
                className="w-full sm:w-auto min-h-[48px]"
              />
              <DownloadButton />
            </div>
          </div>
        </div>
      </section>

      {/* Journey Statistics */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {journeyStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={index} 
                  className="text-center p-6 bg-gray-50 rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300 hover:bg-blue-200">
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.stat}</div>
                  <div className="text-lg font-semibold text-gray-700 mb-2">{stat.label}</div>
                  <div className="text-sm text-gray-600">{stat.description}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Treatment Phases - Detailed */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Three-Phase Recovery Process
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our evidence-based approach ensures optimal recovery at every stage, with clear goals and measurable outcomes
            </p>
          </div>

          <div className="space-y-12">
            {treatmentPhases.map((phase, index) => (
              <div 
                key={index} 
                className="bg-white rounded-2xl p-8 shadow-lg transform transition-all duration-500 hover:shadow-xl viewport-section"
                style={{ animationDelay: `${index * 200}ms` }}
                data-viewport-threshold="0.2"
              >
                <div className="grid lg:grid-cols-2 gap-8">
                  <div>
                    <div className="flex items-center mb-6">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-2xl mr-4">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{phase.phase}</h3>
                        <p className="text-xl text-blue-600 font-semibold">{phase.title}</p>
                        <div className="flex items-center text-gray-600 mt-1">
                          <Clock className="w-4 h-4 mr-2" />
                          <span className="text-sm">{phase.duration} • {phase.timeframe}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Primary Goals:</h4>
                      <ul className="space-y-2">
                        {phase.goals.map((goal, goalIndex) => (
                          <li key={goalIndex} className="flex items-start">
                            <Target className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{goal}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4">
                      <h5 className="font-semibold text-blue-800 mb-2">Expected Outcomes:</h5>
                      <p className="text-blue-700">{phase.expectedOutcomes}</p>
                    </div>
                  </div>

                  <div>
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Key Treatments:</h4>
                      <ul className="space-y-2">
                        {phase.treatments.map((treatment, treatmentIndex) => (
                          <li key={treatmentIndex} className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{treatment}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4">
                      <h5 className="font-semibold text-green-800 mb-2">Success Markers:</h5>
                      <ul className="space-y-1">
                        {phase.successMarkers.map((marker, markerIndex) => (
                          <li key={markerIndex} className="flex items-start">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 mt-2 flex-shrink-0"></div>
                            <span className="text-green-700 text-sm">{marker}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Phase-Specific Appointment Booking */}
                    <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border border-blue-200">
                      <div className="flex items-center justify-between mb-3">
                        <h5 className="font-semibold text-gray-900">Ready for {phase.phase}?</h5>
                        <Calendar className="w-5 h-5 text-blue-600" />
                      </div>
                      <p className="text-sm text-gray-700 mb-4">
                        {index === 0 && "Schedule your initial assessment to begin Phase 1 of your recovery journey."}
                        {index === 1 && "Ready to transition to Phase 2? Book your mobility and strength building sessions."}
                        {index === 2 && "Advance to Phase 3 for high-level functional training and performance optimization."}
                      </p>
                      <TreatmentPhaseButtons 
                        phaseIndex={index}
                        phaseTitle={phase.title}
                        phasePhase={phase.phase}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Phase-Specific Appointment Booking Forms */}
          <div className="mt-16 space-y-12">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Schedule Your Phase-Specific Appointment</h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Select the appropriate booking form based on your current treatment phase or if you're a new patient
              </p>
            </div>

            {/* New Patient Appointment Form */}
            <div id="appointment-form-new-patient" className="bg-white rounded-2xl shadow-lg p-8 viewport-section" data-viewport-threshold="0.1">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">New Patient Assessment</h4>
                <p className="text-gray-600">Start your treatment journey with a comprehensive evaluation</p>
              </div>
              <Suspense fallback={
                <div className="animate-pulse space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              }>
                <PhaseAppointmentForm 
                  phase="new-patient"
                  onSuccess={(data) => {
                    console.log('New patient appointment booked:', data);
                  }}
                  onError={(error) => {
                    console.error('Booking error:', error);
                  }}
                />
              </Suspense>
            </div>

            {/* Phase 1 Appointment Form */}
            <div id="appointment-form-phase-1" className="bg-white rounded-2xl shadow-lg p-8 viewport-section" data-viewport-threshold="0.1">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-red-600" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Phase 1: Pain Relief & Protection</h4>
                <p className="text-gray-600">Focus on reducing acute pain and protecting injured tissues</p>
              </div>
              <Suspense fallback={
                <div className="animate-pulse space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              }>
                <PhaseAppointmentForm 
                  phase="phase-1"
                  onSuccess={(data) => {
                    console.log('Phase 1 appointment booked:', data);
                  }}
                  onError={(error) => {
                    console.error('Booking error:', error);
                  }}
                />
              </Suspense>
            </div>

            {/* Phase 2 Appointment Form */}
            <div id="appointment-form-phase-2" className="bg-white rounded-2xl shadow-lg p-8 viewport-section" data-viewport-threshold="0.1">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-yellow-600" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Phase 2: Mobility & Strength</h4>
                <p className="text-gray-600">Build foundational strength and restore range of motion</p>
              </div>
              <Suspense fallback={
                <div className="animate-pulse space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              }>
                <PhaseAppointmentForm 
                  phase="phase-2"
                  onSuccess={(data) => {
                    console.log('Phase 2 appointment booked:', data);
                  }}
                  onError={(error) => {
                    console.error('Booking error:', error);
                  }}
                />
              </Suspense>
            </div>

            {/* Phase 3 Appointment Form */}
            <div id="appointment-form-phase-3" className="bg-white rounded-2xl shadow-lg p-8 viewport-section" data-viewport-threshold="0.1">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Phase 3: Function & Performance</h4>
                <p className="text-gray-600">Optimize performance and prevent injury recurrence</p>
              </div>
              <Suspense fallback={
                <div className="animate-pulse space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              }>
                <PhaseAppointmentForm 
                  phase="phase-3"
                  onSuccess={(data) => {
                    console.log('Phase 3 appointment booked:', data);
                  }}
                  onError={(error) => {
                    console.error('Booking error:', error);
                  }}
                />
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      {/* Recovery Timeline */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Your Recovery Timeline
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Track your progress with these key milestones throughout your treatment journey
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-200 hidden md:block"></div>
            
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div 
                  key={index} 
                  className="flex items-center transform transition-all duration-500 viewport-section"
                  style={{ animationDelay: `${index * 150}ms` }}
                  data-viewport-threshold="0.3"
                >
                  <div className="flex-shrink-0 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-8 relative z-10 transition-transform duration-300 hover:scale-110">
                    {index + 1}
                  </div>
                  <div className="bg-white rounded-lg p-6 shadow-md flex-1 border-l-4 border-blue-600 hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-center mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{milestone.week}</h3>
                      <span className="mx-2 text-gray-400">•</span>
                      <h4 className="text-lg font-semibold text-blue-600">{milestone.milestone}</h4>
                    </div>
                    <p className="text-gray-700">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Session Frequency & Expectations */}
      <section className="section-padding bg-gradient-to-br from-blue-50 to-green-50">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                What to Expect During Treatment
              </h2>
              <div className="space-y-6">
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Session Frequency</h3>
                  <p className="text-gray-700 mb-4">
                    Initial phase: 2-3 sessions per week for optimal results. As you progress, 
                    frequency reduces to 1-2 sessions per week during later phases.
                  </p>
                  <div className="text-sm text-blue-600 font-semibold">
                    Average: 24-36 total sessions over 6-8 weeks
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Session Duration</h3>
                  <p className="text-gray-700 mb-4">
                    Each session lasts 45-60 minutes, including hands-on treatment, 
                    exercise training, and education components.
                  </p>
                  <div className="text-sm text-blue-600 font-semibold">
                    One-on-one time with your therapist: 30-45 minutes
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Home Program</h3>
                  <p className="text-gray-700 mb-4">
                    Customized exercises and self-care techniques to accelerate 
                    recovery between sessions. Takes 10-15 minutes daily.
                  </p>
                  <div className="text-sm text-blue-600 font-semibold">
                    Includes video demonstrations and progress tracking
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="bg-gradient-to-br from-blue-600 to-green-600 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">Ready to Begin Your Journey?</h3>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-3 text-green-300" />
                    <span>Comprehensive initial assessment</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-3 text-green-300" />
                    <span>Personalized treatment plan</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-3 text-green-300" />
                    <span>Same-day appointments available</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-3 text-green-300" />
                    <span>Most insurance plans accepted</span>
                  </li>
                </ul>
                
                <div className="flex flex-col gap-4">
                  <button className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    Schedule Your Appointment
                  </button>
                  <a 
                    href="/services"
                    className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 inline-block text-center"
                  >
                    Learn About Our Treatments
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section Specific to Treatment Journey */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-12">
            Treatment Journey FAQ
          </h2>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="font-bold text-gray-900 mb-2">How long will my recovery take?</h3>
                <p className="text-gray-700">
                  Most patients see significant improvement in 2-4 weeks and complete recovery in 6-8 weeks. 
                  Your specific timeline depends on condition severity, compliance with treatment, and individual healing factors.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="font-bold text-gray-900 mb-2">What if I'm not improving as expected?</h3>
                <p className="text-gray-700">
                  We continuously monitor your progress and adjust treatment plans as needed. If progress stalls, 
                  we may modify techniques, frequency, or refer for additional imaging or specialist consultation.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="font-bold text-gray-900 mb-2">Will I need to continue therapy indefinitely?</h3>
                <p className="text-gray-700">
                  No. Our goal is to make you independent. Most patients complete active treatment in 6-8 weeks 
                  and continue with a maintenance program they can perform at home.
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="font-bold text-gray-900 mb-2">How do I know if treatment is working?</h3>
                <p className="text-gray-700">
                  We track multiple measures including pain levels, range of motion, strength, and functional 
                  abilities. You should notice improvements in daily activities within the first few weeks.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="font-bold text-gray-900 mb-2">What happens after I complete treatment?</h3>
                <p className="text-gray-700">
                  You'll receive a comprehensive home maintenance program, injury prevention strategies, 
                  and access to our wellness programs. We also offer periodic check-ins to ensure lasting results.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="font-bold text-gray-900 mb-2">Can I speed up my recovery?</h3>
                <p className="text-gray-700">
                  Following your home program, attending all sessions, staying active within prescribed limits, 
                  and maintaining good overall health habits all contribute to faster recovery.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-padding bg-gradient-to-br from-blue-600 to-green-600">
        <div className="container-max text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Start Your Recovery Journey Today
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join over 1 million patients who have successfully completed their treatment journey with SpineZone. 
            Same-day appointments available.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg text-lg transition-colors duration-200 flex items-center justify-center">
              <Calendar className="w-5 h-5 mr-2" />
              Schedule Your Appointment
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold py-4 px-8 rounded-lg text-lg transition-colors duration-200">
              Call (858) 555-0123
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}