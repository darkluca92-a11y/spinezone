'use client';

import { CheckCircle, Star, TrendingUp, Users, Award, Phone, ArrowRight, Calendar, Shield, Zap, Stethoscope } from 'lucide-react';
import { PrimaryContactCTA } from '@/components/ProfessionalContactCTA';
import OptimizedImage from '@/components/OptimizedImage';
import AnimatedGradient from '@/components/AnimatedGradient';
import BentoCard from '@/components/BentoCard';
import { GeometricBackground } from '@/components/ui/shape-landing-hero';
import { StarBorder } from '@/components/ui/star-border';
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
  const [showContactDetails, setShowContactDetails] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Custom StarBorder CTA Component that maintains PrimaryContactCTA functionality
  const StarBorderCTA = () => {
    const handleClick = () => {
      setShowContactDetails(!showContactDetails);
    };

    return (
      <div className="w-full sm:w-auto max-w-xs sm:max-w-none">
        <StarBorder
          as="button"
          color="hsl(197, 90%, 55%)" // Healthcare blue that matches the gradient
          speed="8s" // Professional, not too fast
          className="w-full sm:w-auto transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-3xl"
          onClick={handleClick}
          aria-label="Contact SpineZone to schedule your appointment"
        >
          <div className="flex items-center justify-center py-2 px-4 sm:py-3 sm:px-6 min-h-[48px] sm:min-h-[56px] text-base sm:text-lg font-bold text-gray-900 bg-gradient-to-r from-blue-50 via-teal-50 to-green-50 rounded-[20px] w-full">
            <Calendar className="w-5 h-5 mr-2 text-blue-600" aria-hidden="true" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
              Contact Us to Schedule
            </span>
          </div>
        </StarBorder>

        {/* Enhanced Contact Details Modal */}
        {showContactDetails && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }}
            className="mt-6 p-6 bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl border border-blue-200/50 max-w-md mx-auto"
          >
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Contact SpineZone</h3>
              <p className="text-gray-600">Get professional spine and joint care in San Diego</p>
            </div>

            <div className="grid gap-4">
              {/* Phone Contact */}
              <a
                href="tel:+1-858-555-0123"
                className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg hover:from-blue-100 hover:to-blue-200 transition-all duration-200 group"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center mr-4 group-hover:scale-105 transition-transform shadow-lg">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Call Now</h4>
                  <p className="text-blue-600 font-medium">(858) 555-0123</p>
                  <p className="text-sm text-gray-600">Immediate scheduling & urgent care</p>
                </div>
              </a>

              {/* Trust Indicators */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                <div className="p-3 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Star className="w-5 h-5 text-yellow-500 mr-1" />
                    <span className="font-bold text-gray-900">4.9/5</span>
                  </div>
                  <p className="text-sm text-gray-600">Patient Rating</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg text-center">
                  <div className="flex items-center justify-center mb-1">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-1" />
                    <span className="font-bold text-gray-900">90%</span>
                  </div>
                  <p className="text-sm text-gray-600">Success Rate</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowContactDetails(false)}
              className="mt-4 w-full text-gray-500 hover:text-gray-700 text-sm font-medium transition-colors py-2"
            >
              Close
            </button>
          </motion.div>
        )}
      </div>
    );
  };

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
    <GeometricBackground>
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
              {/* Primary Brand Headline */}
              <h1 
                id="hero-heading"
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black mb-4 leading-none text-rendering-optimized overflow-hidden mobile-text-safe tracking-tight"
              >
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-teal-600 to-green-600 mb-2 drop-shadow-sm">
                  SpineZone
                </span>
              </h1>
              
              {/* Secondary Headlines */}
              <div className="mb-6">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 leading-tight text-gray-900">
                  Heal Naturally
                </h2>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-3">
                  <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
                    90% Success Rate
                  </span>
                  <span className="hidden sm:block text-gray-400 text-2xl">•</span>
                  <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-gray-700">
                    No Surgery Required
                  </span>
                </div>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium text-gray-600 max-w-3xl mx-auto">
                  Without Surgery • Injections • Opioids
                </p>
              </div>
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

            {/* Mobile-Optimized StarBorder CTA */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex justify-center mb-12 px-2 sm:px-0"
            >
              <StarBorderCTA />
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

          {/* Professional Clinic Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
            transition={{ duration: 1.2, delay: 1.2 }}
            className="mb-16 px-2 sm:px-0"
          >
            <div className="text-center mb-8">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 1.4 }}
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3"
              >
                State-of-the-Art Facilities
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 1.5 }}
                className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto"
              >
                Experience healing in our modern, professionally equipped clinic designed for optimal patient care
              </motion.p>
            </div>

            <div className="relative max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.95, y: 30 }}
                transition={{ duration: 1, delay: 1.6 }}
                className="relative group cursor-pointer"
              >
                <div className="relative h-64 sm:h-80 md:h-96 lg:h-[450px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl transform group-hover:scale-[1.02] transition-all duration-700 ease-out">
                  {/* Gradient overlay for professional aesthetic */}
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 via-transparent to-blue-600/10 z-10 group-hover:from-blue-900/20 transition-all duration-500" />
                  
                  <OptimizedImage
                    src="/clinic-interior.jpg"
                    alt="Modern physical therapy clinic interior featuring state-of-the-art blue equipment and professional treatment areas"
                    width={1200}
                    height={800}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out"
                    sizes="(max-width: 480px) 100vw, (max-width: 768px) 90vw, (max-width: 1024px) 80vw, 1200px"
                    quality={90}
                    aspectRatio="3/2"
                  />
                  
                  {/* Professional badge overlay */}
                  <div className="absolute top-4 right-4 z-20 bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center">
                      <Award className="w-5 h-5 text-blue-600 mr-2" />
                      <span className="font-bold text-gray-900 text-sm">Licensed & Certified</span>
                    </div>
                  </div>

                  {/* Equipment highlight badge */}
                  <div className="absolute bottom-4 left-4 z-20 bg-gradient-to-r from-blue-600 to-teal-600 rounded-lg px-4 py-2 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-white mr-2" />
                      <span className="font-semibold text-white text-sm">Advanced Equipment</span>
                    </div>
                  </div>
                </div>

              </motion.div>
            </div>

            {/* Clinic Features Cards - Clean Grid Layout */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.8, delay: 2.0 }}
              className="mt-12 sm:mt-16"
            >
              <div className="text-center mb-8">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                  Why Choose SpineZone
                </h3>
                <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                  Certified excellence in advanced rehabilitation technology
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
                {/* FDA Approved Equipment */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 2.2 }}
                  className="bg-gradient-to-br from-blue-50 via-blue-50 to-teal-50 border border-blue-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg mr-4 flex-shrink-0">
                      <Shield className="w-6 h-6 text-white" aria-hidden="true" />
                    </div>
                    <div>
                      <h4 className="text-lg sm:text-xl font-bold text-gray-900">FDA Approved Equipment</h4>
                      <p className="text-sm text-blue-600 font-medium">Certified & Compliant</p>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                    All treatment modalities meet the highest federal safety and efficacy standards for patient care
                  </p>
                </motion.div>

                {/* Latest Technology */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 2.4 }}
                  className="bg-gradient-to-br from-teal-50 via-teal-50 to-green-50 border border-teal-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg mr-4 flex-shrink-0">
                      <Zap className="w-6 h-6 text-white" aria-hidden="true" />
                    </div>
                    <div>
                      <h4 className="text-lg sm:text-xl font-bold text-gray-900">Latest Technology</h4>
                      <p className="text-sm text-teal-600 font-medium">2024 Equipment</p>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                    Cutting-edge rehabilitation technology for faster, more effective recovery outcomes
                  </p>
                </motion.div>

                {/* Licensed & Certified */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 2.6 }}
                  className="bg-gradient-to-br from-green-50 via-green-50 to-blue-50 border border-green-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-lg mr-4 flex-shrink-0">
                      <Award className="w-6 h-6 text-white" aria-hidden="true" />
                    </div>
                    <div>
                      <h4 className="text-lg sm:text-xl font-bold text-gray-900">Licensed & Certified</h4>
                      <p className="text-sm text-green-600 font-medium">Professional Standards</p>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                    Board-certified therapists with specialized training in advanced treatment methods
                  </p>
                </motion.div>

                {/* Advanced Treatment Methods */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 2.8 }}
                  className="bg-gradient-to-br from-purple-50 via-purple-50 to-blue-50 border border-purple-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg mr-4 flex-shrink-0">
                      <Stethoscope className="w-6 h-6 text-white" aria-hidden="true" />
                    </div>
                    <div>
                      <h4 className="text-lg sm:text-xl font-bold text-gray-900">Advanced Treatment Methods</h4>
                      <p className="text-sm text-purple-600 font-medium">Evidence-Based</p>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                    Innovative non-invasive therapies proven to deliver superior patient outcomes
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero Visual Section */}
          <div className="flex justify-center">
            {/* Hero Image - Enhanced with Overlay */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
              animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : { opacity: 0, scale: 0.9, rotateY: -15 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="relative mt-6 contain-paint max-w-2xl w-full"
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
    </GeometricBackground>
  );
}

// Memoize component to prevent unnecessary re-renders
export default memo(HeroSection);