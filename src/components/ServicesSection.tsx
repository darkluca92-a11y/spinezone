import Image from 'next/image';
import { Heart, Shield, Activity, Users } from 'lucide-react';

import Link from 'next/link';

const services = [
  {
    icon: Heart,
    title: "Back Pain Treatment",
    description: "Comprehensive spinal rehabilitation using advanced techniques to address herniated discs, sciatica, and chronic back pain without surgery.",
    image: "https://images.unsplash.com/photo-aNhgU8ilNoY?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    learnMoreUrl: "/blog/comprehensive-back-pain-treatment-san-diego"
  },
  {
    icon: Shield,
    title: "Neck Pain Relief",
    description: "Specialized treatment for cervical spine issues, whiplash, and chronic neck pain using manual therapy and targeted exercises.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    learnMoreUrl: "/blog/advanced-neck-pain-relief-cervical-spine-treatment"
  },
  {
    icon: Activity,
    title: "Joint Mobility",
    description: "Restore full range of motion and reduce joint stiffness through hands-on therapy, dry needling, and movement correction.",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    learnMoreUrl: "/blog/joint-mobility-restoration-comprehensive-treatment-guide"
  },
  {
    icon: Users,
    title: "Sports Injury Recovery",
    description: "Get back in the game faster with sport-specific rehabilitation programs designed for athletes of all levels.",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    learnMoreUrl: "/blog/sports-injury-rehabilitation-get-back-in-the-game"
  }
];

export default function ServicesSection() {
  return (
    <section className="bg-gray-50 section-padding" aria-labelledby="services-heading">
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 id="services-heading" className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            San Diego Physical Therapy 2025: Advanced Joint Pain Treatment
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Leading San Diego physical therapy 2025 specializing in comprehensive joint pain treatment. Evidence-based care for hips, shoulders, knees, back, and neck. 1M+ patient encounters, 100K+ visits.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div 
                key={index}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
                tabIndex={0}
                role="article"
                aria-labelledby={`service-${index}-title`}
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={`${service.title} therapy session showing professional treatment`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"></div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="p-2 rounded-lg bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                      <Icon className="w-6 h-6" aria-hidden="true" />
                    </div>
                  </div>
                  
                  <h3 id={`service-${index}-title`} className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <Link 
                    href={service.learnMoreUrl}
                    className="inline-block mt-4 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-300"
                  >
                    Learn more →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Start Your Healing Journey?
          </h3>
          <p className="text-lg text-gray-600 mb-6">
            Schedule your free consultation today and take the first step toward a pain-free life.
          </p>
          <button className="btn-primary text-lg">
            Schedule Free Consultation
          </button>
        </div>
      </div>
    </section>
  );
}