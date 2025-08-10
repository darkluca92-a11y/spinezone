'use client';

import { Calendar, CheckCircle } from 'lucide-react';
import OptimizedCTAButton from '@/components/OptimizedCTAButtons';
import OptimizedImage from '@/components/OptimizedImage';
import { memo, useEffect, useState } from 'react';

// Pre-generate optimized image URLs for better LCP
const HERO_IMAGE_URLS = {
  avif: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=85&fm=avif',
  webp: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=85&fm=webp',
  fallback: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=85',
  blur: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k='
};

function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts for better perceived performance
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleAppointmentClick = () => {
    // In a real implementation, this would open a booking modal or redirect to a booking page
    alert('Booking system would be integrated here. Call (858) 555-0123 to schedule your appointment!');
  };

  return (
    <section 
      className={`relative bg-gradient-to-br from-blue-50 to-green-50 section-padding gpu-accelerated ${
        isVisible ? 'fade-in' : 'opacity-0'
      }`} 
      aria-labelledby="hero-heading"
    >
      <div className="container-max">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div className="contain-layout">
            <h1 
              id="hero-heading"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight text-rendering-optimized"
            >
              <span className="text-blue-600 will-change-opacity">Heal Naturally:</span>
              <span className="text-gray-900 block mt-1 sm:mt-2 will-change-opacity">90% Success Rate</span>
              <span className="text-green-600 text-lg sm:text-xl md:text-2xl lg:text-3xl block mt-1 sm:mt-2 will-change-opacity">
                Without Surgery, Injections, or Opioids
              </span>
              <span className="text-blue-600 text-base sm:text-lg md:text-xl lg:text-2xl block mt-1 sm:mt-2 will-change-opacity">
                Now for All Joint Pain Including Hips, Shoulders, and Knees
              </span>
            </h1>
            
            <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-4 sm:mb-6 leading-relaxed">
              San Diego's #1 rated physical therapy 2025 clinic specializing in advanced joint pain treatment. 
              Get proven relief for back pain, neck pain, hip pain, shoulder pain, and knee pain without surgery, 
              injections, or opioids. Revolutionary non-invasive therapy with 1M+ patient encounters and 90% success rate.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 sm:grid-cols-3 gap-3 sm:gap-6 mb-6 sm:mb-8">
              <div className="text-center p-3 sm:p-4 bg-white rounded-lg shadow-sm border border-blue-100">
                <div className="text-lg sm:text-2xl font-bold text-blue-600 mb-1" aria-label="1 million patient encounters">1M+</div>
                <div className="text-xs sm:text-sm text-gray-600">Patient Encounters</div>
              </div>
              <div className="text-center p-3 sm:p-4 bg-white rounded-lg shadow-sm border border-green-100">
                <div className="text-lg sm:text-2xl font-bold text-green-600 mb-1" aria-label="100 thousand plus visits">100K+</div>
                <div className="text-xs sm:text-sm text-gray-600">Patient Visits</div>
              </div>
              <div className="text-center p-3 sm:p-4 bg-white rounded-lg shadow-sm border border-blue-100">
                <div className="text-xl sm:text-3xl font-bold text-blue-600 mb-1" aria-label="90 percent success rate">90%</div>
                <div className="text-xs sm:text-sm text-gray-600">Success Rate</div>
              </div>
            </div>

            {/* Joint Pain Expansion Notice */}
            <div className="bg-gradient-to-r from-blue-100 to-green-100 border-l-4 border-blue-600 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-base sm:text-lg font-semibold text-blue-800 mb-2">
                    🎉 URGENT: Limited New Patient Openings This Month
                  </h3>
                  <p className="text-blue-700 leading-relaxed text-sm sm:text-base">
                    We've expanded to treat ALL joint pain conditions including hip pain, shoulder pain, knee pain, 
                    and spine conditions. Same proven non-invasive approach, same 90% success rate. Book now - only 
                    12 new patient slots remaining this month.
                  </p>
                </div>
              </div>
            </div>
            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row gap-4">
              <OptimizedCTAButton 
                className="w-full sm:w-auto min-h-[48px]"
                onAnalytics={(variantId, action) => {
                  console.log(`Hero CTA: ${variantId} - ${action}`);
                }}
              />
              <div className="flex items-center justify-center sm:justify-start text-green-600">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" aria-hidden="true" />
                <span className="text-xs sm:text-sm">Same-day appointments • Most insurance accepted • Easy scheduling</span>
              </div>
            </div>
            
            <p id="appointment-description" className="sr-only">
              Click to schedule your appointment with our physical therapy experts
            </p>
          </div>

          {/* Hero Image - Optimized for LCP */}
          <div className={`relative mt-6 lg:mt-0 contain-paint ${isVisible ? 'fade-in' : 'opacity-0'}`}>
            <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] xl:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
              <OptimizedImage
                src={HERO_IMAGE_URLS.fallback}
                avifSrc={HERO_IMAGE_URLS.avif}
                webpSrc={HERO_IMAGE_URLS.webp}
                alt="Professional physical therapist helping patient with back rehabilitation exercises in a modern clinic setting"
                width={1000}
                height={600}
                className="object-cover w-full h-full"
                priority
                sizes="(max-width: 480px) 100vw, (max-width: 768px) 90vw, (max-width: 1024px) 70vw, (max-width: 1200px) 50vw, 600px"
                quality={85}
                placeholder="blur"
                blurDataURL={HERO_IMAGE_URLS.blur}
                aspectRatio="5/3"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent will-change-opacity"></div>
            </div>
            
            {/* Floating testimonial card - Lazy loaded for better performance */}
            {isVisible && (
              <div className="hidden sm:block absolute -bottom-4 -left-4 bg-white p-3 sm:p-4 rounded-lg shadow-lg border border-gray-100 max-w-xs sm:max-w-sm gpu-accelerated">
                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-400 text-sm" aria-label="5 star rating">
                    {'★'.repeat(5)}
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-gray-700 italic">
                  "After 6 months of chronic back pain, SpineZone got me back to hiking in just 3 weeks!"
                </p>
                <p className="text-xs text-gray-500 mt-2">- Sarah M., Mission Hills</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// Memoize component to prevent unnecessary re-renders
export default memo(HeroSection);