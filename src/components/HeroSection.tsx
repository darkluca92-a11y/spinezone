'use client';

import { CheckCircle, Star, TrendingUp, Users, Award, Phone, ArrowRight } from 'lucide-react';
import { PrimaryContactCTA } from '@/components/ProfessionalContactCTA';
import OptimizedImage from '@/components/OptimizedImage';
import AnimatedGradient from '@/components/AnimatedGradient';
import BentoCard from '@/components/BentoCard';
import { memo, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

// Pre-generate optimized image URLs for better LCP
const HERO_IMAGE_URLS = {
  avif: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=85&fm=avif',
  webp: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=85&fm=webp',
  fallback: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=85',
  blur: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k='
};

function HeroSection() {
  const [isVisible, setIsVisible] = useState(true);
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Mobile-first hero stats for immediate impact
  const heroStats = [
    {
      id: 'success-rate',
      title: 'Success Rate',
      value: '90%',
      description: 'Patients achieve significant pain relief',
      icon: TrendingUp,
      gradient: 'blue' as const,
      badge: 'Proven'
    },
    {
      id: 'patients',
      title: 'Patients Helped',
      value: '1M+',
      description: 'Lives improved without surgery',
      icon: Users,
      gradient: 'green' as const,
      badge: 'Milestone'
    },
    {
      id: 'rating',
      title: 'Patient Rating',
      value: '4.9★',
      description: 'Verified patient reviews',
      icon: Star,
      gradient: 'teal' as const,
      badge: 'Rated'
    },
    {
      id: 'experience',
      title: 'Years Experience',
      value: '15+',
      description: 'Advanced therapy expertise',
      icon: Award,
      gradient: 'purple' as const
    }
  ];

  return (
    <AnimatedGradient
      variant="hero"
      intensity="high"
      speed="medium"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      <section 
        ref={ref}
        className="w-full py-8 md:py-16 gpu-accelerated"
        aria-labelledby="hero-heading"
      >
        <div className="container-max relative z-10 px-4 sm:px-6 lg:px-8 mobile-container-safe">
          {/* Mobile-First Hero Content */}
          <div className="text-center mb-8 md:mb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, ease: [0.4, 0.0, 0.2, 1] }}
            >
              <h1 
                id="hero-heading"
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight text-rendering-optimized overflow-hidden mobile-text-safe"
              >
                <span className="block text-gray-900 mb-2">Heal Naturally</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-teal-600 to-green-600 mb-3">
                  90% Success Rate
                </span>
                <span className="block text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold text-gray-700">
                  Without Surgery • Injections • Opioids
                </span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed px-2 sm:px-0 mobile-text-safe"
            >
              San Diego's #1 rated physical therapy clinic. Revolutionary non-invasive therapy 
              for <strong>all joint pain</strong> including spine, hips, shoulders, and knees.
              <span className="block mt-2 text-green-600 font-semibold">
                1M+ patient encounters • Same-day appointments available
              </span>
            </motion.p>

            {/* Mobile-Optimized CTA */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex justify-center mb-12 px-2 sm:px-0"
            >
              <PrimaryContactCTA 
                className="w-full sm:w-auto min-h-[48px] sm:min-h-[56px] px-6 sm:px-8 text-base sm:text-lg font-bold bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 transform hover:scale-105 transition-all duration-300 shadow-2xl max-w-xs sm:max-w-none"
                showContactInfo={true}
              />
            </motion.div>
          </div>

          {/* Revolutionary Stats Grid - Mobile Impact */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12 px-2 sm:px-0"
          >
            {heroStats.map((stat, index) => (
              <BentoCard
                key={stat.id}
                title={stat.title}
                value={stat.value}
                description={stat.description}
                icon={stat.icon}
                gradient={stat.gradient}
                badge={stat.badge}
                size="medium"
                delay={0.8 + index * 0.1}
                showAnimation={isInView}
                className="hover:scale-105 transition-transform duration-300"
              />
            ))}
          </motion.div>

          {/* Hero Visual Section */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Urgency Notice - Mobile Optimized */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="lg:order-1"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 rounded-2xl blur-xl opacity-30 animate-pulse" />
                <div className="relative bg-gradient-to-r from-red-50 via-orange-50 to-yellow-50 border-l-4 sm:border-l-6 border-red-500 rounded-2xl p-4 sm:p-6 shadow-2xl backdrop-blur-sm mx-2 sm:mx-0">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <motion.div
                        animate={{ 
                          rotate: [0, 10, -10, 0],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center"
                      >
                        <span className="text-white font-bold text-lg">!</span>
                      </motion.div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-base sm:text-lg md:text-xl font-bold text-red-800 mb-2">
                        🚨 URGENT: Only 12 New Patient Slots Remaining
                      </h3>
                      <p className="text-red-700 leading-relaxed text-xs sm:text-sm md:text-base mb-4">
                        Revolutionary expansion to treat <strong>ALL joint pain</strong> - spine, hips, shoulders, knees. 
                        Same 90% success rate, same non-invasive approach. Limited availability this month.
                      </p>
                      <div className="flex items-center text-red-600 font-semibold">
                        <CheckCircle className="w-5 h-5 mr-2" />
                        <span>Same-day appointments available</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Hero Image - Enhanced with Overlay */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
              animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : { opacity: 0, scale: 0.9, rotateY: -15 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="lg:order-2 relative mt-6 lg:mt-0 contain-paint"
            >
              <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] xl:h-[600px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-500 mx-2 sm:mx-0">
                {/* Gradient overlay for better text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 via-transparent to-green-900/20 z-10" />
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
                
                {/* Success badge overlay */}
                <div className="absolute top-4 left-4 z-20 bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-500 mr-2" />
                    <span className="font-bold text-gray-900">4.9/5 Rating</span>
                  </div>
                </div>
              </div>
              
              {/* Enhanced floating testimonial */}
              {isVisible && (
                <motion.div
                  initial={{ opacity: 0, y: 20, x: -20 }}
                  animate={{ opacity: 1, y: 0, x: 0 }}
                  transition={{ duration: 0.8, delay: 1.5 }}
                  className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 md:-bottom-8 md:-left-8 bg-gradient-to-br from-white via-blue-50 to-green-50 p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl shadow-2xl border border-blue-200/50 max-w-[280px] sm:max-w-xs md:max-w-sm backdrop-blur-sm"
                >
                  <div className="flex items-center mb-3">
                    <div className="flex text-yellow-400 text-base mr-2" aria-label="5 star rating">
                      {'★'.repeat(5)}
                    </div>
                    <span className="text-sm font-semibold text-gray-600">5.0</span>
                  </div>
                  <p className="text-xs sm:text-sm md:text-base text-gray-800 font-medium mb-2">
                    "SpineZone got me back to hiking in just 3 weeks after 6 months of chronic pain!"
                  </p>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                      S
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-semibold text-gray-700">Sarah M.</p>
                      <p className="text-xs text-gray-500">Mission Hills</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </AnimatedGradient>
  );
}

// Memoize component to prevent unnecessary re-renders
export default memo(HeroSection);