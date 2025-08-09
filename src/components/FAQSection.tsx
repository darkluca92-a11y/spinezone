'use client';

import { useState } from 'react';
import { ChevronDown, ChevronRight, HelpCircle } from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
  category?: string;
  featured?: boolean;
  keywords?: string[];
}

interface FAQSectionProps {
  title?: string;
  faqs: FAQ[];
  showCategories?: boolean;
  maxVisible?: number;
  structured?: boolean;
}

// Comprehensive FAQ data optimized for featured snippets
const defaultFAQs: FAQ[] = [
  {
    question: "What conditions does SpineZone Physical Therapy treat in San Diego?",
    answer: "SpineZone specializes in treating all types of joint pain including back pain, neck pain, hip pain, knee pain, shoulder pain, and sports injuries. We use non-invasive methods with a 90% success rate, serving patients throughout San Diego including La Jolla, Hillcrest, Pacific Beach, and Mission Valley.",
    category: "Services",
    featured: true,
    keywords: ["conditions treated", "San Diego physical therapy", "joint pain", "non-invasive"]
  },
  {
    question: "Do you accept insurance for physical therapy in San Diego?",
    answer: "Yes, we accept all major insurance plans with a 98% acceptance rate. We also offer CareCredit financing, HSA/FSA payments, and flexible payment plans. Our billing team will verify your coverage before your first appointment.",
    category: "Insurance",
    featured: true,
    keywords: ["insurance coverage", "San Diego PT", "payment options"]
  },
  {
    question: "How long is a typical physical therapy treatment program at SpineZone?",
    answer: "Treatment length varies by condition and program. Our SpineZone Strength Program is 10 weeks (20 sessions), our Intensive Program is 7 weeks (14 sessions), and our Maintenance Program offers ongoing care. Most patients see significant improvement within 4-6 weeks.",
    category: "Treatment",
    featured: true,
    keywords: ["treatment duration", "program length", "physical therapy timeline"]
  },
  {
    question: "What makes SpineZone different from other physical therapy clinics in San Diego?",
    answer: "SpineZone achieves 90% success rates through data-driven treatment, personalized care programs, and specialized expertise. Unlike general PT clinics, we focus exclusively on joint and spine conditions with advanced manual therapy techniques and no referral requirements.",
    category: "About",
    featured: true,
    keywords: ["SpineZone difference", "90% success rate", "specialized treatment"]
  },
  {
    question: "Where are SpineZone locations in San Diego?",
    answer: "We serve multiple San Diego neighborhoods including La Jolla, Hillcrest, Pacific Beach, Mission Valley, Downtown San Diego, and Point Loma. Our main office is at 1234 Healing Way, Suite 200, San Diego, CA 92101. Call (858) 555-0123 for location details.",
    category: "Locations",
    featured: true,
    keywords: ["San Diego locations", "physical therapy near me", "SpineZone addresses"]
  },
  {
    question: "Is physical therapy painful?",
    answer: "Physical therapy should not be painful. Our approach focuses on gradual improvement and pain reduction. You may experience mild discomfort during exercises, but we adjust techniques to your comfort level. Most patients report decreased pain after the first few sessions.",
    category: "Treatment",
    keywords: ["PT pain level", "comfortable treatment", "pain reduction"]
  },
  {
    question: "How soon can I schedule an appointment?",
    answer: "We offer same-day scheduling when possible and typically have appointments available within 24-48 hours. Emergency appointments are available for acute injuries. Call (858) 555-0123 or use our online booking system for fastest scheduling.",
    category: "Scheduling",
    keywords: ["appointment scheduling", "same-day PT", "quick booking"]
  },
  {
    question: "Do I need a doctor's referral for physical therapy?",
    answer: "No referral is required. California allows direct access to physical therapists, so you can schedule directly with SpineZone. However, some insurance plans may require a referral for coverage - our team will help verify your specific requirements.",
    category: "Access",
    keywords: ["no referral needed", "direct access", "California PT laws"]
  },
  {
    question: "What should I bring to my first physical therapy appointment?",
    answer: "Bring a photo ID, insurance card, list of current medications, any recent imaging results (X-rays, MRI), and wear comfortable clothing that allows access to the treatment area. Arrive 15 minutes early to complete paperwork.",
    category: "First Visit",
    keywords: ["first appointment", "what to bring", "preparation"]
  },
  {
    question: "How effective is physical therapy for chronic pain?",
    answer: "Physical therapy is highly effective for chronic pain management. Our patients experience an average 85% reduction in pain levels within 8-12 weeks. We focus on addressing root causes rather than just symptoms, leading to lasting pain relief without medications.",
    category: "Effectiveness",
    keywords: ["chronic pain treatment", "PT effectiveness", "pain reduction"]
  }
];

export default function FAQSection({
  title = "Frequently Asked Questions",
  faqs = defaultFAQs,
  showCategories = true,
  maxVisible = 10,
  structured = true
}: FAQSectionProps) {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set([0])); // First item open by default
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showAll, setShowAll] = useState(false);

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  // Get unique categories
  const uniqueCategories = faqs.map(faq => faq.category).filter(Boolean) as string[];
  const categories = ['All', ...Array.from(new Set(uniqueCategories))];
  
  // Filter FAQs by category
  const filteredFAQs = selectedCategory === 'All' 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedCategory);
  
  // Limit visible FAQs
  const visibleFAQs = showAll ? filteredFAQs : filteredFAQs.slice(0, maxVisible);
  const hasMore = filteredFAQs.length > maxVisible;

  // Featured FAQs for schema
  const featuredFAQs = faqs.filter(faq => faq.featured);

  return (
    <section className="bg-gray-50 py-16">
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
              <HelpCircle className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              {title}
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get answers to the most common questions about physical therapy services at SpineZone San Diego. 
            Can't find what you're looking for? Contact us directly.
          </p>
        </div>

        {/* Category Filter */}
        {showCategories && categories.length > 2 && (
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {visibleFAQs.map((faq, index) => (
              <div 
                key={index}
                className={`bg-white rounded-xl shadow-sm border transition-all duration-200 ${
                  openItems.has(index) ? 'border-blue-200 shadow-md' : 'border-gray-200'
                }`}
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 py-5 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset rounded-xl"
                  aria-expanded={openItems.has(index)}
                >
                  <div className="flex items-center justify-between">
                    <h3 className={`text-lg font-semibold pr-4 ${
                      openItems.has(index) ? 'text-blue-600' : 'text-gray-900'
                    }`}>
                      {faq.question}
                    </h3>
                    <div className={`flex-shrink-0 transition-transform duration-200 ${
                      openItems.has(index) ? 'transform rotate-90' : ''
                    }`}>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </button>
                
                <div className={`overflow-hidden transition-all duration-300 ${
                  openItems.has(index) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="px-6 pb-5">
                    <p className="text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                    
                    {/* Keywords for SEO (hidden) */}
                    {faq.keywords && (
                      <div className="sr-only">
                        Keywords: {faq.keywords.join(', ')}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Show More Button */}
          {hasMore && !showAll && (
            <div className="text-center mt-8">
              <button
                onClick={() => setShowAll(true)}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Show All Questions
                <ChevronDown className="w-5 h-5 ml-2" />
              </button>
            </div>
          )}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Still Have Questions?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Our expert team is here to help you understand your treatment options and answer any specific questions about your condition.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Contact Our Team
              </a>
              <a
                href="tel:+1-858-555-0123"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors duration-200"
              >
                Call (858) 555-0123
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Structured Data for FAQs */}
      {structured && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": featuredFAQs.map(faq => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.answer
                }
              }))
            })
          }}
        />
      )}
    </section>
  );
}

export { defaultFAQs };