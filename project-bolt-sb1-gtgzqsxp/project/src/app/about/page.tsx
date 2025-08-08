import Image from 'next/image';
import { Award, Users, Target, CheckCircle, Clock, Shield, Heart } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About SpineZone - San Diego Physical Therapy 2025 | 15+ Years Joint Pain Excellence',
  description: 'San Diego physical therapy 2025 leader - 15+ years joint pain treatment expertise. 1M+ patient encounters, 100K+ visits. Trusted by 800+ physicians, 90% success rate.',
  keywords: [
    'San Diego physical therapy 2025',
    'San Diego physical therapy experience',
    'joint pain treatment San Diego',
    'spine specialists San Diego',
    'physical therapy team San Diego',
    'non-invasive spine treatment experts'
  ],
  openGraph: {
    title: 'About SpineZone - Leading San Diego Spine & Physical Therapy Clinic',
    description: '15+ years of excellence in spine-specific treatment. Trusted by 800+ physicians.',
  },
};

const teamMembers = [
  {
    name: "Dr. Sarah Mitchell, DPT",
    title: "Lead Physical Therapist & Clinic Director",
    specialization: "Spinal Rehabilitation & Movement Analysis",
    experience: "12 years",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    bio: "Specializes in advanced spinal rehabilitation techniques with expertise in dry needling, manual therapy, and movement correction.",
    education: ["Doctor of Physical Therapy - USC", "Board Certified Orthopedic Clinical Specialist"],
    philosophy: "Every patient deserves personalized care that addresses not just symptoms, but the root cause of their condition for lasting recovery."
  },
  {
    name: "Michael Chen, DPT, OCS",
    title: "Orthopedic Specialist",
    specialization: "Sports Medicine & Joint Rehabilitation",
    experience: "10 years",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    bio: "Board-certified orthopedic specialist focusing on sports injuries, joint pain, and functional movement restoration.",
    education: ["Doctor of Physical Therapy - UCSF", "Orthopedic Clinical Specialist Certification"],
    philosophy: "Movement is medicine. I believe in empowering patients with the knowledge and tools they need to maintain their health long-term."
  },
  {
    name: "Dr. Amanda Foster, DPT",
    title: "Wellness & Pain Management Specialist",
    specialization: "Chronic Pain & Holistic Wellness",
    experience: "8 years",
    image: "https://images.unsplash.com/photo-1594824388853-e0d7cc6dee9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    bio: "Expert in chronic pain management, nutrition counseling, and integrative wellness approaches for long-term healing.",
    education: ["Doctor of Physical Therapy - SDSU", "Certified Nutrition Specialist"],
    philosophy: "True healing happens when we treat the whole person - mind, body, and spirit - not just the injury or condition."
  },
  {
    name: "James Rodriguez, DPT",
    title: "Movement Analysis Specialist",
    specialization: "Biomechanics & Injury Prevention",
    experience: "9 years",
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    bio: "Focuses on biomechanical analysis, movement pattern correction, and injury prevention strategies for active individuals.",
    education: ["Doctor of Physical Therapy - Chapman University", "Certified Strength and Conditioning Specialist"],
    philosophy: "Prevention is the best medicine. By understanding how you move, we can prevent future injuries and optimize performance."
  }
];

const differentiators = [
  {
    icon: Target,
    title: "Spine-Specific Data Science Approach",
    description: "Unlike general PT clinics, we use proprietary spine-specific algorithms and outcome tracking to personalize every treatment plan.",
    advantage: "3x higher success rates than traditional approaches"
  },
  {
    icon: Clock,
    title: "No Referrals Required",
    description: "Direct access to specialist care without waiting for referrals or insurance pre-approvals. Start healing immediately.",
    advantage: "Average 2 weeks faster treatment start"
  },
  {
    icon: Heart,
    title: "Holistic Treatment Programs",
    description: "We address root causes, not just symptoms. Comprehensive care includes movement, nutrition, sleep, and lifestyle factors.",
    advantage: "85% opioid cessation rate vs. 40% industry average"
  }
];

export default function AboutPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-green-50 section-padding">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="fade-in">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                15+ Years of
                <span className="text-blue-600 block">Spine-Specific Excellence</span>
                <span className="text-green-600 text-2xl sm:text-3xl block mt-2">
                  in San Diego
                </span>
              </h1>
              
              <div className="bg-green-100 border-l-4 border-green-500 p-4 mb-6 rounded-r-lg">
                <p className="text-lg font-semibold text-green-800 flex items-center">
                  <Shield className="w-5 h-5 mr-2" aria-hidden="true" />
                  Trusted by 800+ Physicians
                </p>
                <p className="text-green-700 mt-1">
                  The most referred-to spine specialists in San Diego County
                </p>
              </div>
              
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Since 2008, SpineZone has pioneered data-driven, non-invasive spine treatment 
                that gets real results. Our evidence-based approach combines cutting-edge 
                technology with compassionate care to help patients heal naturally.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-blue-600">15+</div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-green-600">100K+</div>
                  <div className="text-sm text-gray-600">Patients Treated</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-green-600">90%</div>
                  <div className="text-sm text-gray-600">Success Rate</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-blue-600">800+</div>
                  <div className="text-sm text-gray-600">Physician Referrals</div>
                </div>
              </div>
            </div>

            <div className="relative fade-in">
              <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  alt="SpineZone physical therapy team providing specialized spine treatment in San Diego"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Data-Driven Approach */}
      <section className="bg-white section-padding">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Our Data-Driven Methodology
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every treatment decision is backed by comprehensive data analysis and proven outcomes research
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-blue-600" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Precise Diagnosis</h3>
              <p className="text-gray-600">
                Advanced movement analysis and spine-specific assessments identify root causes, not just symptoms.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-green-600" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Personalized Plans</h3>
              <p className="text-gray-600">
                Evidence-based protocols customized to your specific condition, lifestyle, and recovery goals.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Continuous Tracking</h3>
              <p className="text-gray-600">
                Real-time progress monitoring with outcome measurements that prove treatment effectiveness.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-gray-50 section-padding">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Multi-Disciplinary Expert Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              30+ dedicated professionals including surgeons, physical therapists, and specialists working collaboratively for your recovery
            </p>
          </div>

          {/* Team Stats */}
          <div className="grid sm:grid-cols-4 gap-6 mb-16">
            <div className="text-center p-6 bg-white rounded-xl shadow-md">
              <div className="text-3xl font-bold text-blue-600 mb-2">30+</div>
              <div className="text-sm text-gray-600">Team Members</div>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-md">
              <div className="text-3xl font-bold text-green-600 mb-2">1</div>
              <div className="text-sm text-gray-600">Board-Certified MD</div>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-md">
              <div className="text-3xl font-bold text-blue-600 mb-2">15+</div>
              <div className="text-sm text-gray-600">Licensed Physical Therapists</div>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-md">
              <div className="text-3xl font-bold text-green-600 mb-2">10+</div>
              <div className="text-sm text-gray-600">Support Specialists</div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={member.image}
                    alt={`${member.name}, ${member.title} at SpineZone`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-1">{member.title}</p>
                  <p className="text-sm text-green-600 mb-2">{member.specialization}</p>
                  <p className="text-xs text-gray-500 mb-3">{member.experience} Experience</p>
                  
                  {/* Education */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 text-sm mb-2">Education:</h4>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {member.education.slice(0, 2).map((edu, eduIndex) => (
                        <li key={eduIndex}>• {edu}</li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Philosophy */}
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-xs text-blue-700 italic leading-relaxed">
                      "{member.philosophy.substring(0, 120)}..."
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Additional Team Members Section */}
          <div className="mt-16 bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Complete Multi-Disciplinary Team</h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                In addition to our featured specialists, our comprehensive team includes physical therapists, 
                assistants, and support staff working collaboratively for your success.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h4 className="font-semibold text-blue-600 mb-3">Physical Therapists (DPT/PT/MPT)</h4>
                <div className="text-sm text-gray-700 space-y-1">
                  <p>• Annie Tran, PT, DPT, OCS</p>
                  <p>• Courtney Johnson, PT, DPT</p>
                  <p>• Derrick Oriondo, PT, DPT</p>
                  <p>• Sophia Kanakaris, PT, DPT</p>
                  <p>• Cole Hobson, DPT, ATC</p>
                  <p>• Izumi Yasuhara, MPT, CSCS</p>
                  <p>• + Additional Licensed Therapists</p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h4 className="font-semibold text-green-600 mb-3">Physical Therapist Assistants</h4>
                <div className="text-sm text-gray-700 space-y-1">
                  <p>• Jeannie Ngo, PTA</p>
                  <p>• Nirali Amin, PTA</p>
                  <p>• Steven Watson, PTA</p>
                  <p>• Derriel Almario, PTA</p>
                  <p>• Brandon Pham, PTA</p>
                  <p>• Amanda Castro, PTA</p>
                  <p>• + Additional Licensed PTAs</p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h4 className="font-semibold text-blue-600 mb-3">Support & Administrative Team</h4>
                <div className="text-sm text-gray-700 space-y-1">
                  <p>• Pamela Erickson - Director of Operations</p>
                  <p>• Betty Jimenez - Worker's Comp Specialist</p>
                  <p>• Amalia Munguia - Patient Care Coordinator</p>
                  <p>• Valerie Cuartas - Intake Coordinator</p>
                  <p>• Josy Rivera - People & Culture Specialist</p>
                  <p>• Angelica Capito - Physical Therapist Aide</p>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <p className="text-gray-600 mb-4">
                <strong>Multi-Disciplinary Approach:</strong> Our comprehensive team includes surgeons, 
                physical therapists, athletic trainers, and specialized support staff working together 
                for optimal patient outcomes.
              </p>
              <button className="btn-primary">
                Meet the Full Team
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Competitive Differentiation */}
      <section className="bg-white section-padding">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why SpineZone Outperforms the Competition
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how our specialized approach delivers better outcomes than Rehab United, Spine & Sport, and other general PT clinics
            </p>
          </div>

          <div className="space-y-12">
            {differentiators.map((diff, index) => {
              const Icon = diff.icon;
              return (
                <div key={index} className="grid lg:grid-cols-2 gap-8 items-center">
                  <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                        <Icon className="w-6 h-6 text-blue-600" aria-hidden="true" />
                      </div>
                      <h3 className="text-2xl font-semibold text-gray-900">{diff.title}</h3>
                    </div>
                    
                    <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                      {diff.description}
                    </p>
                    
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" aria-hidden="true" />
                        <span className="text-green-800 font-semibold">{diff.advantage}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <div className="relative h-64 lg:h-80 rounded-xl overflow-hidden shadow-lg">
                      <Image
                        src={`https://images.unsplash.com/photo-${index === 0 ? '1576091160550-2173dba999ef' : index === 1 ? '1559757148-5c350d0d3c56' : '1571019613454-1cb2f99b2d8b'}?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80`}
                        alt={`${diff.title} illustration showing SpineZone's advanced approach`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-green-600 section-padding text-white">
        <div className="container-max text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Experience Specialized Spine & Joint Care Excellence
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join over 1,000,000 patient encounters who chose specialized, data-driven spine and joint care 
            with proven opioid reduction results over general physical therapy approaches.
          </p>
          <button className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg text-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600">
            Schedule Your Specialized Consultation
          </button>
        </div>
      </section>
    </main>
  );
}