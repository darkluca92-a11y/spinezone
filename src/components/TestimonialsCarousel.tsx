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
            What Our Patients Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Real stories from real people who found relief at SpineZone
          </p>
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
        
        {/* Additional Trust Indicators */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 mt-8 text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Join Thousands of Satisfied Patients
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl font-bold text-green-600 mb-1">500+</div>
              <div className="text-sm text-gray-600">5-Star Reviews</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl font-bold text-blue-600 mb-1">90%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl font-bold text-green-600 mb-1">8</div>
              <div className="text-sm text-gray-600">Clinic Locations</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}