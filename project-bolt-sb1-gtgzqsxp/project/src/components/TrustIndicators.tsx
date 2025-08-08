import { Award, Users, Clock, Shield, CheckCircle, Star } from 'lucide-react';

const trustStats = [
  {
    icon: Award,
    number: "90%",
    label: "Success Rate",
    description: "Non-invasive treatment success"
  },
  {
    icon: Users,
    number: "1M+",
    label: "Patient Encounters",
    description: "Over 100,000 patient visits"
  },
  {
    icon: Award,
    number: "60%",
    label: "Pain Reduction",
    description: "Average pain improvement"
  },
  {
    icon: Shield,
    number: "800+",
    label: "Physician Referrals",
    description: "Trusted by medical community"
  },
  {
    icon: CheckCircle,
    number: "85%",
    label: "Opioid Cessation",
    description: "Patients avoid opioid dependency"
  }
];

const certifications = [
  "American Physical Therapy Association (APTA)",
  "California Physical Therapy Association (CPTA)",
  "Orthopedic Manual Physical Therapy Fellowship",
  "Dry Needling Certification",
  "McKenzie Method Certification",
  "HIPAA Compliant Facility"
];

const awards = [
  "Best Physical Therapy Clinic - San Diego 2023",
  "Top 10 Spine Specialists - San Diego Magazine",
  "Patient Choice Award - Excellence in Care",
  "Healthcare Innovation Award 2022"
];

export default function TrustIndicators() {
  return (
    <section className="bg-white section-padding" aria-labelledby="trust-heading">
      <div className="container-max">
        {/* Trust Statistics */}
        <div className="text-center mb-16">
          <h2 id="trust-heading" className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Trusted by Thousands of Patients
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our track record speaks for itself - delivering exceptional spine care results since 2008
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {trustStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center p-6 bg-gradient-to-br from-blue-50 to-green-50 rounded-xl border border-blue-100">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-blue-600" aria-hidden="true" />
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2" aria-label={`${stat.number} ${stat.label}`}>
                  {stat.number}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{stat.label}</h3>
                <p className="text-sm text-gray-600">{stat.description}</p>
              </div>
            );
          })}
        </div>

        {/* Certifications and Awards */}
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="bg-gray-50 p-8 rounded-2xl">
            <div className="flex items-center mb-6">
              <Shield className="w-8 h-8 text-blue-600 mr-3" aria-hidden="true" />
              <h3 className="text-2xl font-bold text-gray-900">Professional Certifications</h3>
            </div>
            <ul className="space-y-3">
              {certifications.map((cert, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <span className="text-gray-700">{cert}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-8 rounded-2xl border border-yellow-200">
            <div className="flex items-center mb-6">
              <Star className="w-8 h-8 text-orange-600 mr-3" aria-hidden="true" />
              <h3 className="text-2xl font-bold text-gray-900">Awards & Recognition</h3>
            </div>
            <ul className="space-y-3">
              {awards.map((award, index) => (
                <li key={index} className="flex items-start">
                  <Award className="w-5 h-5 text-orange-500 mr-3 mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <span className="text-gray-700">{award}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}