'use client';

import React, { memo, useEffect, useRef, useState, useMemo } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface BentoCardProps {
  title: string;
  value: string;
  description: string;
  icon?: LucideIcon;
  gradient?: 'blue' | 'green' | 'teal' | 'purple';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  delay?: number;
  showAnimation?: boolean;
  badge?: string;
}

const BentoCard = memo(function BentoCard({
  title,
  value,
  description,
  icon: Icon,
  gradient = 'blue',
  size = 'medium',
  className = '',
  delay = 0,
  showAnimation = true,
  badge
}: BentoCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const controls = useAnimation();
  const [hasAnimated, setHasAnimated] = useState(false);

  // Counter animation for numeric values
  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    if (isInView && !hasAnimated && showAnimation) {
      controls.start('visible');
      setHasAnimated(true);
      
      // Animate the counter if the value contains numbers
      const numericMatch = value.match(/(\d+(?:,\d{3})*(?:\.\d+)?)/);
      if (numericMatch) {
        const numericPart = numericMatch[1];
        const prefix = value.substring(0, value.indexOf(numericPart));
        const suffix = value.substring(value.indexOf(numericPart) + numericPart.length);
        const targetNumber = parseFloat(numericPart.replace(/,/g, ''));
        
        let currentNumber = 0;
        const increment = targetNumber / 50; // 50 steps for smooth animation
        const timer = setInterval(() => {
          currentNumber += increment;
          if (currentNumber >= targetNumber) {
            currentNumber = targetNumber;
            clearInterval(timer);
          }
          
          // Format the number with commas if original had them
          const formattedNumber = numericPart.includes(',') 
            ? Math.round(currentNumber).toLocaleString()
            : Math.round(currentNumber).toString();
          
          setDisplayValue(prefix + formattedNumber + suffix);
        }, 30);
      } else {
        setDisplayValue(value);
      }
    }
  }, [isInView, controls, value, hasAnimated, showAnimation]);

  // Gradient configurations
  const gradientConfigs = {
    blue: {
      card: 'from-blue-50 via-white to-blue-100/50',
      border: 'border-blue-200/50',
      icon: 'text-blue-600',
      value: 'text-blue-700',
      badge: 'bg-blue-100 text-blue-700',
      glow: 'shadow-blue-500/10'
    },
    green: {
      card: 'from-green-50 via-white to-green-100/50',
      border: 'border-green-200/50',
      icon: 'text-green-600',
      value: 'text-green-700',
      badge: 'bg-green-100 text-green-700',
      glow: 'shadow-green-500/10'
    },
    teal: {
      card: 'from-teal-50 via-white to-teal-100/50',
      border: 'border-teal-200/50',
      icon: 'text-teal-600',
      value: 'text-teal-700',
      badge: 'bg-teal-100 text-teal-700',
      glow: 'shadow-teal-500/10'
    },
    purple: {
      card: 'from-purple-50 via-white to-purple-100/50',
      border: 'border-purple-200/50',
      icon: 'text-purple-600',
      value: 'text-purple-700',
      badge: 'bg-purple-100 text-purple-700',
      glow: 'shadow-purple-500/10'
    }
  }[gradient];

  // Size configurations - Mobile optimized
  const sizeConfigs = {
    small: {
      container: 'p-3 sm:p-4 min-h-[100px] sm:min-h-[120px]',
      icon: 'w-6 h-6 sm:w-8 sm:h-8',
      value: 'text-xl sm:text-2xl md:text-3xl',
      title: 'text-xs sm:text-sm',
      description: 'text-xs',
      badge: 'text-xs px-2 py-1'
    },
    medium: {
      container: 'p-4 sm:p-5 md:p-6 min-h-[140px] sm:min-h-[160px]',
      icon: 'w-8 h-8 sm:w-10 sm:h-10',
      value: 'text-2xl sm:text-3xl md:text-4xl',
      title: 'text-sm sm:text-base',
      description: 'text-xs sm:text-sm',
      badge: 'text-xs px-2 py-1 sm:px-3'
    },
    large: {
      container: 'p-6 sm:p-7 md:p-8 min-h-[180px] sm:min-h-[200px]',
      icon: 'w-10 h-10 sm:w-12 sm:h-12',
      value: 'text-3xl sm:text-4xl md:text-5xl',
      title: 'text-base sm:text-lg',
      description: 'text-sm sm:text-base',
      badge: 'text-xs sm:text-sm px-3 py-1 sm:px-4 sm:py-2'
    }
  }[size];

  // Memoized animation variants for performance
  const variants = useMemo(() => ({
    hidden: { 
      opacity: 0, 
      y: 50, 
      scale: 0.8,
      rotateX: -15 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.8,
        delay,
        ease: [0.4, 0.0, 0.2, 1] as [number, number, number, number],
        type: "spring" as const,
        stiffness: 100,
        damping: 15
      }
    }
  }), [delay]);

  // Memoized hover variants for performance
  const hoverVariants = useMemo(() => ({
    hover: {
      scale: 1.05,
      rotateY: 5,
      transition: {
        duration: 0.3,
        ease: "easeOut" as const
      }
    }
  }), []);

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={controls}
      whileHover="hover"
      className={`
        relative overflow-hidden rounded-2xl backdrop-blur-sm
        bg-gradient-to-br ${gradientConfigs.card}
        border ${gradientConfigs.border}
        shadow-xl ${gradientConfigs.glow} hover:shadow-2xl
        transition-all duration-500
        ${sizeConfigs.container}
        ${className}
        cursor-pointer group
        will-change-transform
      `}
      style={{ 
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
    >
      {/* Background pattern - subtle for mobile performance */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <defs>
            <pattern id={`pattern-${gradient}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="2" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill={`url(#pattern-${gradient})`} />
        </svg>
      </div>

      {/* Animated border glow effect */}
      <div className={`
        absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500
        bg-gradient-to-r ${gradientConfigs.card}
        animate-pulse
      `} />

      {/* Badge */}
      {badge && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: delay + 0.3 }}
          className={`
            absolute top-4 right-4 rounded-full font-medium
            ${gradientConfigs.badge} ${sizeConfigs.badge}
          `}
        >
          {badge}
        </motion.div>
      )}

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between">
        {/* Header with icon */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            {Icon && (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ 
                  delay: delay + 0.2,
                  type: "spring",
                  stiffness: 200,
                  damping: 10 
                }}
                className={`
                  p-2 rounded-xl bg-white/60 backdrop-blur-sm
                  ${gradientConfigs.icon} ${sizeConfigs.icon}
                  shadow-lg group-hover:shadow-xl transition-shadow duration-300
                `}
              >
                <Icon className="w-full h-full" />
              </motion.div>
            )}
            <div>
              <motion.h3
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: delay + 0.4 }}
                className={`font-semibold text-gray-800 ${sizeConfigs.title}`}
              >
                {title}
              </motion.h3>
            </div>
          </div>
        </div>

        {/* Value with animated counter */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            delay: delay + 0.6,
            type: "spring",
            stiffness: 300,
            damping: 15
          }}
          className={`
            font-bold ${gradientConfigs.value} ${sizeConfigs.value}
            mb-2 tracking-tight
          `}
        >
          {displayValue}
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delay + 0.8 }}
          className={`text-gray-600 leading-relaxed ${sizeConfigs.description}`}
        >
          {description}
        </motion.p>

        {/* Floating micro-interaction indicator */}
        <motion.div
          className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-current opacity-30"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: delay + 1
          }}
        />
      </div>

      {/* Mobile touch feedback */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-white/20 opacity-0 group-active:opacity-100 transition-opacity duration-150 rounded-2xl" />
    </motion.div>
  );
});

export default BentoCard;