import Image from 'next/image';
import { User, Award, Calendar, MapPin, Phone, Mail, ExternalLink } from 'lucide-react';

const doctors = [
  {
    name: "Dr. Sarah Mitchell, DPT",
    title: "Lead Physical Therapist & Clinic Director",
    specialization: "Spinal Rehabilitation & Movement Analysis",
    experience: "12 years",
    education: [
      "Doctor of Physical Therapy - USC",
      "Master of Science in Kinesiology - SDSU",
      "Orthopedic Manual Physical Therapy Fellowship"
    ],
    certifications: [
      "Dry Needling Certification",
      "McKenzie Method Certification",
      "APTA Board Certified Specialist"
    ],
    expertise: [
      "Advanced spinal rehabilitation",
      "Movement pattern analysis", 
      "Postural correction",
      "Chronic pain management",
      "Manual therapy techniques"
    ],
    philosophy: "I believe in empowering patients through education and personalized care. Every treatment plan is tailored to the individual's specific needs, goals, and lifestyle.",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    achievements: [
      "Top Physical Therapist Award 2023",
      "1000+ successful spinal treatments",
      "Featured speaker at APTA conferences"
    ]
  },
  {
    name: "Michael Chen, DPT, OCS",
    title: "Orthopedic Specialist",
    specialization: "Sports Medicine & Joint Rehabilitation", 
    experience: "10 years",
    education: [
      "Doctor of Physical Therapy - UCSD",
      "Bachelor of Science in Exercise Science - UCLA",
      "Orthopedic Clinical Specialist Certification"
    ],
    certifications: [
      "Board Certified Orthopedic Specialist",
      "Graston Technique Certification",
      "FMS Level 2 Certification"
    ],
    expertise: [
      "Sports injury rehabilitation",
      "Joint mobilization techniques",
      "Performance optimization",
      "ACL reconstruction recovery",
      "Shoulder impingement treatment"
    ],
    philosophy: "My approach combines evidence-based treatment with performance enhancement, helping athletes and active individuals not just recover, but come back stronger.",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    achievements: [
      "Sports Medicine Excellence Award",
      "Team physical therapist for local sports teams",
      "500+ athletes successfully returned to play"
    ]
  },
  {
    name: "Dr. Amanda Foster, DPT",
    title: "Wellness & Pain Management Specialist",
    specialization: "Chronic Pain & Holistic Wellness",
    experience: "8 years", 
    education: [
      "Doctor of Physical Therapy - Chapman University",
      "Master of Science in Nutrition - Bastyr University",
      "Pain Science Certification"
    ],
    certifications: [
      "Certified Pain Management Specialist",
      "Nutritional Therapy Certification",
      "Mindfulness-Based Stress Reduction"
    ],
    expertise: [
      "Chronic pain management",
      "Nutrition and wellness counseling",
      "Stress and sleep optimization",
      "Holistic treatment approaches",
      "Mind-body pain connections"
    ],
    philosophy: "True healing addresses not just the physical symptoms, but the whole person. I integrate nutrition, lifestyle, and mindfulness practices into comprehensive treatment plans.",
    image: "https://images.unsplash.com/photo-1594824388853-e0d7cc6dee9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    achievements: [
      "Holistic Healthcare Innovation Award",
      "85% success rate in chronic pain cases",
      "Published researcher in pain management"
    ]
  }
];

export default function DoctorProfiles() {
  return (
    <section className="bg-gray-50 section-padding" aria-labelledby="doctors-heading">
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 id="doctors-heading" className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Meet Our Expert Team
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our board-certified specialists combine years of experience with the latest evidence-based treatments to deliver exceptional patient outcomes
          </p>
        </div>

        <div className="space-y-12">
          {doctors.map((doctor, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="grid lg:grid-cols-3 gap-8 p-8">
                {/* Photo and Basic Info */}
                <div className="lg:col-span-1">
                  <div className="relative h-80 lg:h-96 rounded-2xl overflow-hidden mb-6">
                    <Image
                      src={doctor.image}
                      alt={`${doctor.name}, ${doctor.title} at SpineZone`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                  </div>
                  
                  <div className="text-center lg:text-left">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{doctor.name}</h3>
                    <p className="text-blue-600 font-semibold mb-1">{doctor.title}</p>
                    <p className="text-green-600 font-medium mb-4">{doctor.specialization}</p>
                    
                    <div className="flex items-center justify-center lg:justify-start text-gray-600 mb-4">
                      <Calendar className="w-4 h-4 mr-2" aria-hidden="true" />
                      <span>{doctor.experience} Experience</span>
                    </div>
                    
                    <div className="space-y-2">
                      {doctor.achievements.map((achievement, achIndex) => (
                        <div key={achIndex} className="flex items-center justify-center lg:justify-start text-sm">
                          <Award className="w-4 h-4 text-yellow-500 mr-2 flex-shrink-0" aria-hidden="true" />
                          <span className="text-gray-600">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Detailed Information */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Philosophy */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                      <User className="w-4 h-4 mr-2" aria-hidden="true" />
                      Treatment Philosophy
                    </h4>
                    <p className="text-blue-700 italic leading-relaxed">"{doctor.philosophy}"</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Education */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <Award className="w-4 h-4 mr-2" aria-hidden="true" />
                        Education
                      </h4>
                      <ul className="space-y-2">
                        {doctor.education.map((edu, eduIndex) => (
                          <li key={eduIndex} className="text-sm text-gray-700 flex items-start">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 mt-2 flex-shrink-0"></div>
                            {edu}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Certifications */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <Award className="w-4 h-4 mr-2" aria-hidden="true" />
                        Certifications
                      </h4>
                      <ul className="space-y-2">
                        {doctor.certifications.map((cert, certIndex) => (
                          <li key={certIndex} className="text-sm text-gray-700 flex items-start">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2 mt-2 flex-shrink-0"></div>
                            {cert}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Areas of Expertise */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Areas of Expertise</h4>
                    <div className="flex flex-wrap gap-2">
                      {doctor.expertise.map((skill, skillIndex) => (
                        <span key={skillIndex} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Contact Actions */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
                    <button className="btn-primary flex items-center justify-center flex-1">
                      <Calendar className="w-4 h-4 mr-2" aria-hidden="true" />
                      Schedule with {doctor.name.split(' ')[1]}
                    </button>
                    <button className="btn-secondary flex items-center justify-center">
                      <ExternalLink className="w-4 h-4 mr-2" aria-hidden="true" />
                      View Full Bio
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Team CTA */}
        <div className="mt-16 text-center bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">Want to Meet Our Team?</h3>
          <p className="text-xl mb-6 opacity-90 max-w-2xl mx-auto">
            Schedule a consultation to meet our specialists and learn how we can help you achieve your health goals
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors duration-200">
              Schedule Team Consultation
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold py-3 px-8 rounded-lg transition-colors duration-200">
              View All Team Members
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}