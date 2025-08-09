'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import Image from 'next/image';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  text: string;
  condition: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "B M",
    location: "Age 49",
    rating: 5,
    text: "I was involved in a rollover auto accident and suffered significant back injuries. The SpineZone team's comprehensive approach focused on building strength - as they say, 'strong muscle supports the bones.' Their data-driven methodology and personalized care plan got me back to full activity. All their locations have 5 star ratings for good reason!",
    condition: "Auto Accident Injuries",
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 2,
    name: "Laura H",
    location: "Age 17",
    rating: 5,
    text: "At 16 I was a ranked tennis player but shoulder injuries were threatening my college scholarship opportunities. SpineZone's sports-specific rehabilitation program not only got me back on court but made me stronger than ever. I won that scholarship and I'm now playing Division I tennis!",
    condition: "Sports Injury - Shoulder",
    image: "https://images.unsplash.com/photo-1494790108755-2616b48ea6b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 3,
    name: "Garrett F",
    location: "Age 32",
    rating: 5,
    text: "I'm an active guy who loves the outdoors, but chronic lower back pain was keeping me from the activities I love most. The SpineZone team developed a comprehensive treatment plan that addressed not just my pain but the underlying causes. Now I'm able to kayak again and feel stronger than I have in years!",
    condition: "Chronic Lower Back Pain",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 4,
    name: "Anonymous",
    location: "2025 Yelp Review",
    rating: 5,
    text: "When I started going to Spinezone I had constant back pain that was affecting my work and daily life. Their data-driven approach and personalized treatment plan made all the difference. After completing their program, I've seen major improvement in both pain levels and mobility. Highly recommend their specialized approach!",
    condition: "Chronic Back Pain",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 5,
    name: "Jennifer S",
    location: "Mission Valley",
    rating: 5,
    text: "After years of hip pain that multiple doctors couldn't solve, SpineZone's joint specialization program changed everything. Their non-invasive approach and focus on root causes - not just symptoms - got me back to hiking and living pain-free. The team truly understands spine and joint care.",
    condition: "Hip Pain & Joint Issues",
    image: "https://images.unsplash.com/photo-1494790108755-2616b48ea6b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 6,
    name: "David R",
    location: "Age 45",
    rating: 5,
    text: "As a construction worker, neck and shoulder pain was affecting my ability to work. SpineZone's targeted treatment approach and strengthening program not only eliminated my pain but made me stronger for my physically demanding job. Their expertise in occupational injuries is unmatched.",
    condition: "Work-Related Neck & Shoulder Pain",
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 7,
    name: "Maria Gonzalez",
    location: "Chula Vista",
    rating: 5,
    text: "I was skeptical about physical therapy, but SpineZone's evidence-based approach convinced me. My joint pain has reduced by 80%, and I've learned exercises to prevent future issues.",
    condition: "Arthritis & Joint Pain",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
  }
];

export default function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1);
    setIsAutoPlaying(false);
  }, [currentIndex]);

  const goToNext = useCallback(() => {
    setCurrentIndex(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1);
    setIsAutoPlaying(false);
  }, [currentIndex]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  }, []);

  return (
    <section className="bg-white section-padding" aria-labelledby="testimonials-heading">
      <div className="container-max">
        <div className="text-center mb-12">
          <h2 id="testimonials-heading" className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            San Diego PT Reviews 2025: Real Patient Success Stories
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            Read verified testimonials from over 500+ patients who chose SpineZone for physical therapy in San Diego. 
            Our proven track record speaks for itself with a 90% success rate treating back pain, neck pain, hip pain, 
            shoulder pain, knee pain, and all joint conditions without surgery or opioids.
          </p>
          <div className="flex justify-center space-x-8 text-sm">
            <div className="bg-green-50 px-4 py-2 rounded-full">
              <span className="text-green-700 font-semibold">500+ Verified Reviews</span>
            </div>
            <div className="bg-blue-50 px-4 py-2 rounded-full">
              <span className="text-blue-700 font-semibold">4.9★ Average Rating</span>
            </div>
            <div className="bg-orange-50 px-4 py-2 rounded-full">
              <span className="text-orange-700 font-semibold">90% Success Rate</span>
            </div>
          </div>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Carousel Container */}
          <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-green-50 shadow-lg">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              role="region"
              aria-live={isAutoPlaying ? "polite" : "off"}
              aria-label="Patient testimonials"
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0">
                  <div className="p-8 sm:p-12">
                    <div className="flex flex-col sm:flex-row items-center gap-8">
                      {/* Patient Image */}
                      <div className="flex-shrink-0">
                        <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
                          <Image
                            src={testimonial.image}
                            alt={`${testimonial.name} from ${testimonial.location}`}
                            fill
                            className="object-cover"
                            sizes="96px"
                            loading="lazy"
                            quality={75}
                          />
                        </div>
                      </div>

                      {/* Testimonial Content */}
                      <div className="flex-1 text-center sm:text-left">
                        {/* Stars */}
                        <div className="flex justify-center sm:justify-start mb-4" aria-label={`${testimonial.rating} star rating`}>
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" aria-hidden="true" />
                          ))}
                        </div>

                        {/* Quote */}
                        <blockquote className="text-lg sm:text-xl text-gray-700 italic mb-6 leading-relaxed">
                          "{testimonial.text}"
                        </blockquote>

                        {/* Patient Info */}
                        <div>
                          <cite className="text-lg font-semibold text-gray-900 not-italic">
                            {testimonial.name}
                          </cite>
                          <p className="text-gray-600">{testimonial.location}</p>
                          
                          {testimonial.location.includes('Yelp') && (
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 mt-2">
                              <p className="text-blue-800 text-xs font-semibold">Verified Yelp Review</p>
                            </div>
                          )}
                          
                          <p className="text-sm text-blue-600 font-medium mt-1">
                            Treated for: {testimonial.condition}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-200 text-blue-600 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6" aria-hidden="true" />
          </button>
          
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-200 text-blue-600 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6" aria-hidden="true" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  index === currentIndex 
                    ? 'bg-blue-600 w-8' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Auto-play Control */}
        <div className="text-center mt-6">
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="text-sm text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1 mr-4"
            aria-label={isAutoPlaying ? "Pause carousel" : "Resume carousel"}
          >
            {isAutoPlaying ? "Pause" : "Resume"} Auto-play
          </button>
          
          <span className="text-sm text-gray-500">
            Showing {testimonials.length} verified patient success stories
          </span>
        </div>

        {/* Review Summary Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12 mt-12">
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              What San Diego Patients Say About SpineZone Physical Therapy
            </h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Real results, real reviews from San Diego residents who chose SpineZone for their physical therapy needs
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
              <h4 className="text-xl font-bold text-gray-900 mb-4">Most Common Treatment Outcomes:</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Back Pain Relief</span>
                  <div className="flex items-center">
                    <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{width: '92%'}}></div>
                    </div>
                    <span className="text-green-600 font-semibold">92%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Neck Pain Relief</span>
                  <div className="flex items-center">
                    <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{width: '89%'}}></div>
                    </div>
                    <span className="text-green-600 font-semibold">89%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Hip Pain Relief</span>
                  <div className="flex items-center">
                    <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{width: '88%'}}></div>
                    </div>
                    <span className="text-green-600 font-semibold">88%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Shoulder Pain Relief</span>
                  <div className="flex items-center">
                    <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{width: '91%'}}></div>
                    </div>
                    <span className="text-green-600 font-semibold">91%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Knee Pain Relief</span>
                  <div className="flex items-center">
                    <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{width: '87%'}}></div>
                    </div>
                    <span className="text-green-600 font-semibold">87%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
              <h4 className="text-xl font-bold text-gray-900 mb-4">Patient Satisfaction Metrics:</h4>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">4.9/5</div>
                  <div className="text-gray-600">Overall Rating</div>
                  <div className="flex justify-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="text-center p-3 bg-white rounded-lg">
                    <div className="text-2xl font-bold text-green-600">96%</div>
                    <div className="text-xs text-gray-600">Would Recommend</div>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">94%</div>
                    <div className="text-xs text-gray-600">Return Patients</div>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">2.8</div>
                    <div className="text-xs text-gray-600">Avg Sessions to Improvement</div>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">85%</div>
                    <div className="text-xs text-gray-600">Avoid Surgery</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 text-center">
            <h4 className="font-semibold text-gray-900 mb-3">Common Review Themes from San Diego Patients:</h4>
            <div className="flex flex-wrap justify-center gap-3">
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">"Quick pain relief"</span>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">"Professional team"</span>
              <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">"Avoided surgery"</span>
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">"Convenient locations"</span>
              <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm">"Insurance accepted"</span>
              <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">"Long-lasting results"</span>
            </div>
          </div>
        </div>
        
        {/* Video Testimonials Section */}
        <div className="bg-gray-50 rounded-2xl p-8 mt-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Watch Patient Success Stories
            </h3>
            <p className="text-gray-600">See real patients share their journey from pain to recovery</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="aspect-video bg-blue-100 rounded-lg mb-4 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  <div className="text-sm text-gray-600">Video Coming Soon</div>
                </div>
              </div>
              <h4 className="font-semibold text-gray-900">Sarah's Back Pain Recovery</h4>
              <p className="text-sm text-gray-600">"From chronic pain to running marathons again"</p>
            </div>
            
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="aspect-video bg-green-100 rounded-lg mb-4 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  <div className="text-sm text-gray-600">Video Coming Soon</div>
                </div>
              </div>
              <h4 className="font-semibold text-gray-900">Mike's Sports Injury Return</h4>
              <p className="text-sm text-gray-600">"Back to the field stronger than before"</p>
            </div>
            
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="aspect-video bg-orange-100 rounded-lg mb-4 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-2">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  <div className="text-sm text-gray-600">Video Coming Soon</div>
                </div>
              </div>
              <h4 className="font-semibold text-gray-900">Elena's Arthritis Management</h4>
              <p className="text-sm text-gray-600">"Living pain-free with expert guidance"</p>
            </div>
          </div>
        </div>

        {/* Detailed Success Stories */}
        <div className="mt-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Detailed Success Stories from San Diego Patients
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Read comprehensive before-and-after stories showing the life-changing impact of our treatments
            </p>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                    <h4 className="font-semibold text-red-800 mb-2">Before Treatment:</h4>
                    <ul className="text-red-700 text-sm space-y-1">
                      <li>• Constant lower back pain (8/10)</li>
                      <li>• Unable to work construction job</li>
                      <li>• Couldn't lift children</li>
                      <li>• Sleeping 2-3 hours/night</li>
                    </ul>
                  </div>
                </div>
                <div className="md:w-1/3">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                    <h4 className="font-semibold text-blue-800 mb-2">Treatment Plan:</h4>
                    <ul className="text-blue-700 text-sm space-y-1">
                      <li>• 12-week spine rehabilitation</li>
                      <li>• Manual therapy 3x/week</li>
                      <li>• Strength training program</li>
                      <li>• Posture correction education</li>
                    </ul>
                  </div>
                </div>
                <div className="md:w-1/3">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                    <h4 className="font-semibold text-green-800 mb-2">After Treatment:</h4>
                    <ul className="text-green-700 text-sm space-y-1">
                      <li>• Pain reduced to 1/10</li>
                      <li>• Returned to full work capacity</li>
                      <li>• Playing with kids again</li>
                      <li>• Sleeping 7-8 hours/night</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 mt-4">
                <p className="text-gray-700 italic">"David R., Construction Worker - The SpineZone team didn't just treat my symptoms, they addressed the root cause. I'm not just pain-free, I'm stronger and more resilient than before my injury. Their approach to spine health is revolutionary."</p>
                <div className="flex items-center mt-3">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 ml-2">Verified Google Review - January 2025</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges & Certifications */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 mt-12 text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            Trusted by San Diego's Medical Community
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl font-bold text-green-600 mb-1">1M+</div>
              <div className="text-sm text-gray-600">Patient Encounters</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl font-bold text-blue-600 mb-1">90%</div>
              <div className="text-sm text-gray-600">Treatment Success Rate</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl font-bold text-orange-600 mb-1">100K+</div>
              <div className="text-sm text-gray-600">Clinic Visits</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl font-bold text-green-600 mb-1">8</div>
              <div className="text-sm text-gray-600">San Diego Locations</div>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
            <div className="bg-white px-3 py-2 rounded-full">✓ APTA Certified</div>
            <div className="bg-white px-3 py-2 rounded-full">✓ Board Certified Specialists</div>
            <div className="bg-white px-3 py-2 rounded-full">✓ Evidence-Based Care</div>
            <div className="bg-white px-3 py-2 rounded-full">✓ Continuing Education Leaders</div>
          </div>
        </div>

        {/* Call-to-Action */}
        <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 mt-12 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Write Your Own Success Story in San Diego?</h3>
          <p className="text-xl mb-6 opacity-90 max-w-2xl mx-auto">
            Join the thousands of San Diego residents who chose SpineZone for physical therapy and got their life back. 
            Most patients see significant improvement within 2-3 sessions with our proven joint pain treatment methods.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg text-lg transition-colors duration-200">
              Schedule Your Success Story Today
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold py-3 px-8 rounded-lg transition-colors duration-200">
              Read More Success Stories
            </button>
          </div>
          <div className="mt-4 text-sm opacity-75">
            ⏱️ New patients seen within 24-48 hours | 📞 Call: (858) 555-0123
          </div>
        </div>
      </div>
    </section>
  );
}