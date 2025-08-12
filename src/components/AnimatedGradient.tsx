'use client';

import React, { memo, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface AnimatedGradientProps {
  variant?: 'hero' | 'stats' | 'accent';
  className?: string;
  children?: React.ReactNode;
  intensity?: 'low' | 'medium' | 'high';
  speed?: 'slow' | 'medium' | 'fast';
}

const AnimatedGradient = memo(function AnimatedGradient({
  variant = 'hero',
  className = '',
  children,
  intensity = 'medium',
  speed = 'medium'
}: AnimatedGradientProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  // Animation duration based on speed
  const duration = {
    slow: 20,
    medium: 15,
    fast: 10
  }[speed];

  // Intensity affects the animation scale and opacity
  const intensityConfig = {
    low: { scale: 0.8, opacity: 0.6 },
    medium: { scale: 1, opacity: 0.8 },
    high: { scale: 1.2, opacity: 1 }
  }[intensity];

  // Different variants for different use cases
  const variantConfig = {
    hero: {
      colors: ['#0369a1', '#059669', '#2563eb', '#16a34a'],
      background: 'from-blue-50 via-white to-green-50'
    },
    stats: {
      colors: ['#1e40af', '#047857', '#0369a1', '#059669'],
      background: 'from-blue-100/50 via-white/80 to-green-100/50'
    },
    accent: {
      colors: ['#2563eb', '#16a34a', '#0369a1', '#059669'],
      background: 'from-blue-200/30 via-white/50 to-green-200/30'
    }
  }[variant];

  useEffect(() => {
    // Optimize performance on mobile by reducing animation complexity
    const isMobile = window.innerWidth < 768;
    if (isMobile && svgRef.current) {
      // Reduce animation complexity on mobile
      const animElements = svgRef.current.querySelectorAll('animate, animateTransform');
      animElements.forEach(elem => {
        elem.setAttribute('dur', `${duration * 1.5}s`);
      });
    }
  }, [duration]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Base gradient background */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br ${variantConfig.background} transition-all duration-1000`}
        style={{ willChange: 'transform' }}
      />
      
      {/* Animated SVG overlay */}
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full opacity-40 will-change-transform"
        viewBox="0 0 1200 800"
        xmlns="http://www.w3.org/2000/svg"
        style={{ mixBlendMode: 'multiply' }}
      >
        <defs>
          {/* Animated gradient definitions */}
          <radialGradient id="grad1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={variantConfig.colors[0]} stopOpacity="0.8">
              <animate
                attributeName="stop-opacity"
                values="0.8;0.3;0.8"
                dur={`${duration}s`}
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="100%" stopColor={variantConfig.colors[1]} stopOpacity="0.3">
              <animate
                attributeName="stop-opacity"
                values="0.3;0.7;0.3"
                dur={`${duration * 1.2}s`}
                repeatCount="indefinite"
              />
            </stop>
          </radialGradient>
          
          <radialGradient id="grad2" cx="20%" cy="80%" r="60%">
            <stop offset="0%" stopColor={variantConfig.colors[2]} stopOpacity="0.6">
              <animate
                attributeName="stop-opacity"
                values="0.6;0.2;0.6"
                dur={`${duration * 0.8}s`}
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="100%" stopColor={variantConfig.colors[3]} stopOpacity="0.4">
              <animate
                attributeName="stop-opacity"
                values="0.4;0.8;0.4"
                dur={`${duration * 1.5}s`}
                repeatCount="indefinite"
              />
            </stop>
          </radialGradient>
          
          <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={variantConfig.colors[0]} stopOpacity="0.5">
              <animate
                attributeName="stop-opacity"
                values="0.5;0.1;0.5"
                dur={`${duration * 2}s`}
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="50%" stopColor={variantConfig.colors[1]} stopOpacity="0.3">
              <animate
                attributeName="stop-opacity"
                values="0.3;0.6;0.3"
                dur={`${duration * 1.3}s`}
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="100%" stopColor={variantConfig.colors[2]} stopOpacity="0.4">
              <animate
                attributeName="stop-opacity"
                values="0.4;0.2;0.4"
                dur={`${duration * 0.9}s`}
                repeatCount="indefinite"
              />
            </stop>
          </linearGradient>
        </defs>
        
        {/* Animated shapes */}
        <motion.circle
          cx="200"
          cy="150"
          r="100"
          fill="url(#grad1)"
          initial={{ scale: intensityConfig.scale, opacity: 0 }}
          animate={{ 
            scale: [intensityConfig.scale, intensityConfig.scale * 1.2, intensityConfig.scale],
            opacity: [0, intensityConfig.opacity, 0],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{
            duration: duration,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.ellipse
          cx="800"
          cy="400"
          rx="150"
          ry="80"
          fill="url(#grad2)"
          initial={{ scale: intensityConfig.scale, opacity: 0 }}
          animate={{ 
            scale: [intensityConfig.scale, intensityConfig.scale * 0.8, intensityConfig.scale],
            opacity: [0, intensityConfig.opacity, 0],
            x: [-30, 20, -30],
            y: [20, -10, 20]
          }}
          transition={{
            duration: duration * 1.3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        
        <motion.rect
          x="400"
          y="600"
          width="300"
          height="150"
          rx="75"
          fill="url(#grad3)"
          initial={{ scale: intensityConfig.scale, opacity: 0 }}
          animate={{ 
            scale: [intensityConfig.scale, intensityConfig.scale * 1.1, intensityConfig.scale],
            opacity: [0, intensityConfig.opacity * 0.7, 0],
            rotate: [0, 5, 0],
            x: [0, -20, 0]
          }}
          transition={{
            duration: duration * 1.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
        />
        
        {/* Additional floating elements for mobile impact */}
        <motion.circle
          cx="1000"
          cy="200"
          r="60"
          fill={variantConfig.colors[1]}
          opacity="0.3"
          animate={{ 
            y: [0, -20, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: duration * 0.7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        
        <motion.circle
          cx="100"
          cy="500"
          r="40"
          fill={variantConfig.colors[3]}
          opacity="0.4"
          animate={{ 
            x: [0, 15, 0],
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{
            duration: duration * 1.1,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />
      </svg>
      
      {/* Content overlay */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Performance optimization: Reduce paint frequency on mobile */}
      <style jsx>{`
        @media (max-width: 768px) {
          svg {
            transform: translateZ(0);
            backface-visibility: hidden;
            perspective: 1000px;
            will-change: transform;
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          svg * {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
});

export default AnimatedGradient;