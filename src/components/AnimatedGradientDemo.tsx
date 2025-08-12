'use client';

import React, { memo, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import BentoCard from './BentoCard';
import AnimatedGradient from './AnimatedGradient';
import { 
  Users, 
  TrendingUp, 
  Award, 
  Clock, 
  MapPin, 
  Star,
  CheckCircle,
  Activity,
  type LucideIcon
} from 'lucide-react';

interface MedicalStat {
  id: string;
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
  gradient: 'blue' | 'green' | 'teal' | 'purple';
  badge?: string;
  size?: 'small' | 'medium' | 'large';
}

interface AnimatedGradientDemoProps {
  variant?: 'hero' | 'section' | 'compact';
  className?: string;
  showTitle?: boolean;
  maxCards?: number;
  layout?: 'grid' | 'bento' | 'masonry';
}

const MEDICAL_STATISTICS: MedicalStat[] = [
  {
    id: 'success-rate',
    title: 'Success Rate',
    value: '90%',
    description: 'Patients achieve significant pain relief without surgery',
    icon: TrendingUp,
    gradient: 'blue',
    badge: 'Proven',
    size: 'large'
  },
  {
    id: 'patients-treated',
    title: 'Patient Encounters',
    value: '1,000,000+',
    description: 'Lives improved through non-invasive therapy',
    icon: Users,
    gradient: 'green',
    badge: 'Milestone',
    size: 'large'
  },
  {
    id: 'patient-visits',
    title: 'Patient Visits',
    value: '100,000+',
    description: 'Successful treatment sessions completed',
    icon: Activity,
    gradient: 'teal',
    size: 'medium'
  },
  {
    id: 'years-experience',
    title: 'Years of Excellence',
    value: '15+',
    description: 'Dedicated to advanced physical therapy',
    icon: Award,
    gradient: 'purple',
    size: 'medium'
  },
  {
    id: 'avg-recovery',
    title: 'Average Recovery',
    value: '3-6 weeks',
    description: 'Most patients see significant improvement',
    icon: Clock,
    gradient: 'blue',
    size: 'small'
  },
  {
    id: 'locations',
    title: 'San Diego Locations',
    value: '5+',
    description: 'Convenient locations throughout the city',
    icon: MapPin,
    gradient: 'green',
    size: 'small'
  },
  {
    id: 'satisfaction',
    title: 'Patient Satisfaction',
    value: '4.9/5',
    description: 'Based on 1,000+ verified reviews',
    icon: Star,
    gradient: 'teal',
    badge: 'Rated',
    size: 'medium'
  },
  {
    id: 'non-surgical',
    title: 'Non-Surgical Success',
    value: '95%',
    description: 'Cases resolved without invasive procedures',
    icon: CheckCircle,
    gradient: 'purple',
    badge: 'Revolutionary',
    size: 'medium'
  }
];

const AnimatedGradientDemo = memo(function AnimatedGradientDemo({
  variant = 'hero',
  className = '',
  showTitle = true,
  maxCards = 8,
  layout = 'bento'
}: AnimatedGradientDemoProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [visibleStats, setVisibleStats] = useState<MedicalStat[]>([]);

  useEffect(() => {
    if (isInView) {
      // Show stats based on maxCards limit
      const stats = MEDICAL_STATISTICS.slice(0, maxCards);
      setVisibleStats(stats);
    }
  }, [isInView, maxCards]);

  // Layout configurations
  const layoutConfigs = {
    grid: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6',
    bento: 'grid-cols-2 md:grid-cols-4 gap-3 md:gap-4',
    masonry: 'columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4'
  };

  // Variant-specific configurations
  const variantConfigs = {
    hero: {
      padding: 'py-12 md:py-16',
      title: 'text-3xl md:text-4xl lg:text-5xl',
      subtitle: 'text-lg md:text-xl',
      intensity: 'high' as const,
      speed: 'medium' as const
    },
    section: {
      padding: 'py-8 md:py-12',
      title: 'text-2xl md:text-3xl',
      subtitle: 'text-base md:text-lg',
      intensity: 'medium' as const,
      speed: 'slow' as const
    },
    compact: {
      padding: 'py-6 md:py-8',
      title: 'text-xl md:text-2xl',
      subtitle: 'text-sm md:text-base',
      intensity: 'low' as const,
      speed: 'fast' as const
    }
  }[variant];

  // Custom bento grid layout for optimal visual impact
  const getBentoGridClass = (index: number, total: number) => {
    if (layout !== 'bento') return '';
    
    // Mobile-first responsive bento layout
    const patterns = {
      // Pattern for 8 cards - optimized for mobile impact
      8: [
        'col-span-2 md:col-span-2', // Success rate - hero position
        'col-span-2 md:col-span-2', // Patients treated - hero position  
        'col-span-1 md:col-span-1', // Patient visits
        'col-span-1 md:col-span-1', // Years experience
        'col-span-1 md:col-span-1', // Average recovery
        'col-span-1 md:col-span-1', // Locations
        'col-span-2 md:col-span-2', // Satisfaction - emphasis
        'col-span-2 md:col-span-2', // Non-surgical success - emphasis
      ],
      6: [
        'col-span-2 md:col-span-2',
        'col-span-2 md:col-span-2',
        'col-span-1 md:col-span-1',
        'col-span-1 md:col-span-1',
        'col-span-2 md:col-span-2',
        'col-span-2 md:col-span-2'
      ],
      4: [
        'col-span-2 md:col-span-2',
        'col-span-2 md:col-span-2',
        'col-span-2 md:col-span-2',
        'col-span-2 md:col-span-2'
      ]
    };

    return patterns[total as keyof typeof patterns]?.[index] || 'col-span-1';
  };

  return (
    <AnimatedGradient
      variant="stats"
      intensity={variantConfigs.intensity}
      speed={variantConfigs.speed}
      className={`relative ${variantConfigs.padding} ${className}`}
    >
      <div ref={ref} className="container-max relative z-10">
        {/* Title Section */}
        {showTitle && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: [0.4, 0.0, 0.2, 1] }}
            className="text-center mb-8 md:mb-12"
          >
            <h2 className={`font-bold text-gray-900 mb-4 ${variantConfigs.title}`}>
              Proven Results That
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
                Speak for Themselves
              </span>
            </h2>
            <p className={`text-gray-600 max-w-3xl mx-auto leading-relaxed ${variantConfigs.subtitle}`}>
              Over 1 million patient encounters and a 90% success rate prove our revolutionary 
              approach to pain relief works without surgery, injections, or opioids.
            </p>
          </motion.div>
        )}

        {/* Statistics Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className={`
            grid ${layoutConfigs[layout]}
            ${layout === 'masonry' ? '' : 'auto-rows-fr'}
          `}
        >
          {visibleStats.map((stat, index) => (
            <div
              key={stat.id}
              className={`
                ${layout === 'bento' ? getBentoGridClass(index, visibleStats.length) : ''}
                ${layout === 'masonry' ? 'break-inside-avoid mb-4' : ''}
              `}
            >
              <BentoCard
                title={stat.title}
                value={stat.value}
                description={stat.description}
                icon={stat.icon}
                gradient={stat.gradient}
                size={stat.size}
                badge={stat.badge}
                delay={index * 0.1}
                showAnimation={isInView}
                className={`
                  h-full w-full
                  hover:z-10 relative
                  transition-all duration-300
                `}
              />
            </div>
          ))}
        </motion.div>

        {/* Bottom CTA Enhancement for Mobile Impact */}
        {variant === 'hero' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-center mt-8 md:mt-12"
          >
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/80 backdrop-blur-sm border border-blue-200/50 shadow-lg">
              <Star className="w-5 h-5 text-yellow-500 mr-2" />
              <span className="text-sm md:text-base font-medium text-gray-700">
                Join thousands who found relief without surgery
              </span>
              <CheckCircle className="w-5 h-5 text-green-600 ml-2" />
            </div>
          </motion.div>
        )}
      </div>

      {/* Mobile-optimized floating particles for extra visual impact */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/30 rounded-full"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 1.5,
              ease: "easeInOut"
            }}
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`
            }}
          />
        ))}
      </div>
    </AnimatedGradient>
  );
});

export default AnimatedGradientDemo;