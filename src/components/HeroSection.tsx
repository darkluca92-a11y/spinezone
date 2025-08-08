'use client';

import Image from 'next/image';
import { Calendar, CheckCircle } from 'lucide-react';
import OptimizedCTAButton from '@/components/OptimizedCTAButtons';

export default function HeroSection() {
  const handleConsultationClick = () => {
    // In a real implementation, this would open a booking modal or redirect to a booking page
    alert('Booking system would be integrated here. Call (858) 555-0123 to schedule your free consultation!');
  };

  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-green-50 section-padding" aria-labelledby="hero-heading">
      <div className="container-max">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="fade-in">
            <h1 
              id="hero-heading"
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
            >
              <span className="text-blue-600">Heal Naturally:</span>
              <span className="text-gray-900 block mt-2">90% Success Rate</span>
              <span className="text-green-600 text-2xl sm:text-3xl lg:text-4xl block mt-2">
                Without Surgery, Injections, or Opioids
              </span>
              <span className="text-blue-600 text-xl sm:text-2xl lg:text-3xl block mt-2">
                Now for All Joint Pain Including Hips, Shoulders, and Knees
              </span>
            </h1>
            
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              San Diego's premier physical therapy 2025 clinic - specializing in advanced joint pain treatment 
              for back, neck, hip, shoulder, knee pain. Revolutionary non-invasive therapy with 1M+ patient encounters.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-4 bg-white rounded-lg shadow-sm border border-blue-100">
                <div className="text-2xl font-bold text-blue-600 mb-1" aria-label="1 million patient encounters">1M+</div>
                <div className="text-sm text-gray-600">Patient Encounters</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm border border-green-100">
                <div className="text-2xl font-bold text-green-600 mb-1" aria-label="100 thousand plus visits">100K+</div>
                <div className="text-sm text-gray-600">Patient Visits</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm border border-blue-100">
                <div className="text-3xl font-bold text-blue-600 mb-1" aria-label="90 percent success rate">90%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
            </div>

            {/* Joint Pain Expansion Notice */}
            <div className="bg-gradient-to-r from-blue-100 to-green-100 border-l-4 border-blue-600 rounded-lg p-6 mb-8">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">
                    🎉 Now Treating ALL Joint Pain Conditions
                  </h3>
                  <p className="text-blue-700 leading-relaxed">
                    We've expanded our proven spine treatment methods to successfully treat hip pain, shoulder pain, 
                    knee pain, and all joint conditions. Same non-invasive approach, same 90% success rate.
                  </p>
                </div>
              </div>
            </div>
            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row gap-4">
              <OptimizedCTAButton 
                className="w-full sm:w-auto"
                onAnalytics={(variantId, action) => {
                  console.log(`Hero CTA: ${variantId} - ${action}`);
                }}
              />
              <div className="flex items-center text-green-600">
                <CheckCircle className="w-5 h-5 mr-2" aria-hidden="true" />
                <span className="text-sm">No obligation • Insurance accepted</span>
              </div>
            </div>
            
            <p id="consultation-description" className="sr-only">
              Click to schedule your free consultation with our physical therapy experts
            </p>
          </div>

          {/* Hero Image */}
          <div className="relative fade-in lg:fade-in">
            <div className="relative h-96 lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Professional physical therapist helping patient with back rehabilitation exercises in a modern clinic setting"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                quality={85}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            
            {/* Floating testimonial card */}
            <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-lg shadow-lg border border-gray-100 max-w-sm">
              <div className="flex items-center mb-2">
                <div className="flex text-yellow-400" aria-label="5 star rating">
                  {'★'.repeat(5)}
                </div>
              </div>
              <p className="text-sm text-gray-700 italic">
                "After 6 months of chronic back pain, SpineZone got me back to hiking in just 3 weeks!"
              </p>
              <p className="text-xs text-gray-500 mt-2">- Sarah M., Mission Hills</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}