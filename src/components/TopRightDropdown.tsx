"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  X, 
  Calendar, 
  Phone, 
  MessageCircle, 
  FileText, 
  Home,
  Stethoscope,
  Users,
  Star,
  ClipboardList,
  CreditCard,
  ChevronRight,
  Menu
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface DropdownProps {
  className?: string;
}

export default function TopRightDropdown({ className }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  // Healthcare action items (high priority)
  const healthcareActions = [
    {
      id: "book-assessment",
      label: "Book Assessment",
      icon: <Calendar className="w-5 h-5" />,
      onClick: () => router.push("/assessment"),
      primary: true,
      color: "text-blue-600 hover:text-blue-700",
      bgColor: "hover:bg-blue-50",
    },
    {
      id: "call-now",
      label: "Call Now",
      icon: <Phone className="w-5 h-5" />,
      onClick: () => window.open("tel:+1-858-555-0123"),
      primary: true,
      color: "text-green-600 hover:text-green-700",
      bgColor: "hover:bg-green-50",
    },
    {
      id: "chat-support",
      label: "Chat Support",
      icon: <MessageCircle className="w-5 h-5" />,
      onClick: () => {
        const chatbot = document.querySelector('[data-chatbot]');
        if (chatbot) {
          (chatbot as HTMLElement).click();
        }
      },
      primary: true,
      color: "text-purple-600 hover:text-purple-700",
      bgColor: "hover:bg-purple-50",
    },
    {
      id: "patient-portal",
      label: "Patient Portal",
      icon: <FileText className="w-5 h-5" />,
      onClick: () => router.push("/patient-portal"),
      primary: false,
      color: "text-indigo-600 hover:text-indigo-700",
      bgColor: "hover:bg-indigo-50",
    },
  ];

  // Navigation items (secondary priority)
  const navigationItems = [
    {
      id: "home",
      label: "Home",
      icon: <Home className="w-5 h-5" />,
      href: "/",
      color: "text-gray-600 hover:text-blue-600",
      bgColor: "hover:bg-gray-50",
    },
    {
      id: "services",
      label: "Services",
      icon: <Stethoscope className="w-5 h-5" />,
      href: "/services",
      color: "text-gray-600 hover:text-blue-600",
      bgColor: "hover:bg-gray-50",
    },
    {
      id: "about",
      label: "About & Team",
      icon: <Users className="w-5 h-5" />,
      href: "/about",
      color: "text-gray-600 hover:text-blue-600",
      bgColor: "hover:bg-gray-50",
    },
    {
      id: "reviews",
      label: "Reviews",
      icon: <Star className="w-5 h-5" />,
      href: "/testimonials",
      color: "text-gray-600 hover:text-blue-600",
      bgColor: "hover:bg-gray-50",
    },
    {
      id: "treatment-journey",
      label: "Treatment Journey",
      icon: <ClipboardList className="w-5 h-5" />,
      href: "/treatment-journey",
      color: "text-gray-600 hover:text-blue-600",
      bgColor: "hover:bg-gray-50",
    },
    {
      id: "insurance",
      label: "Insurance",
      icon: <CreditCard className="w-5 h-5" />,
      href: "/insurance",
      color: "text-gray-600 hover:text-blue-600",
      bgColor: "hover:bg-gray-50",
    },
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const handleItemClick = (item: any) => {
    // Haptic feedback simulation for mobile
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(10); // Short vibration for feedback
    }
    
    if (item.onClick) {
      item.onClick();
    }
    closeDropdown();
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen]);

  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        ref={buttonRef}
        onClick={toggleDropdown}
        className={cn(
          "flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ease-in-out",
          "bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800",
          "shadow-lg hover:shadow-xl focus:shadow-xl",
          "border border-white/20 backdrop-blur-sm",
          "focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2",
          "active:scale-95",
          // Mobile optimizations
          "sm:w-11 sm:h-11 touch-manipulation",
          // Enhanced shadow for professional look
          "shadow-[0_4px_24px_rgba(59,130,246,0.15)] hover:shadow-[0_8px_32px_rgba(59,130,246,0.2)]"
        )}
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0, scale: isOpen ? 0.9 : 1 }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
        >
          <Plus className="w-6 h-6 text-white sm:w-5 sm:h-5" />
        </motion.div>
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ 
              opacity: 0, 
              y: -10, 
              scale: 0.95,
              filter: "blur(4px)" 
            }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              filter: "blur(0px)" 
            }}
            exit={{ 
              opacity: 0, 
              y: -10, 
              scale: 0.95,
              filter: "blur(4px)" 
            }}
            transition={{
              duration: 0.2,
              ease: "easeOut",
            }}
            className={cn(
              "absolute top-full right-0 mt-2",
              // Responsive width - larger on mobile for better thumb reach
              "w-80 sm:w-72 md:w-64",
              // Mobile-first positioning - ensure it fits on screen
              "max-w-[calc(100vw-1rem)] mr-2 sm:mr-0",
              "bg-white/95 backdrop-blur-md",
              "rounded-2xl shadow-xl border border-gray-200/50",
              "py-2 z-50",
              // Professional healthcare styling
              "shadow-[0_8px_32px_rgba(0,0,0,0.08)]",
              // Safe area for mobile devices with notches
              "mb-[env(safe-area-inset-bottom)]"
            )}
            role="menu"
            aria-orientation="vertical"
          >
            {/* Healthcare Actions Section */}
            <div className="px-4 py-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                <Stethoscope className="w-3 h-3" />
                Healthcare Actions
              </div>
              
              <div className="space-y-1">
                {healthcareActions.map((action, index) => (
                  <motion.button
                    key={action.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleItemClick(action)}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 rounded-xl",
                      "text-left transition-all duration-200",
                      "focus:outline-none focus:ring-2 focus:ring-blue-300",
                      action.color,
                      action.bgColor,
                      // Touch-friendly sizing - optimized for thumb reach
                      "min-h-[48px] sm:min-h-[44px] touch-manipulation",
                      // Active state for touch feedback
                      "active:scale-95 active:bg-opacity-80",
                      // Enhanced visual feedback for primary actions
                      action.primary && "font-medium border border-transparent hover:border-current/20",
                      // Better spacing on mobile
                      "px-5 sm:px-4 py-3.5 sm:py-3"
                    )}
                    role="menuitem"
                  >
                    <span className="flex-shrink-0">{action.icon}</span>
                    <span className="flex-1 text-sm font-medium">{action.label}</span>
                    <ChevronRight className="w-4 h-4 opacity-40" />
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gray-200/60 mx-4 my-2" />

            {/* Navigation Section */}
            <div className="px-4 py-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                <Menu className="w-3 h-3" />
                Navigation
              </div>
              
              <div className="space-y-1">
                {navigationItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (healthcareActions.length + index) * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={closeDropdown}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-2.5 rounded-lg",
                        "text-left transition-all duration-200",
                        "focus:outline-none focus:ring-2 focus:ring-blue-300",
                        item.color,
                        item.bgColor,
                        // Touch-friendly sizing - optimized for mobile
                        "min-h-[48px] sm:min-h-[44px] touch-manipulation",
                        // Active state for touch feedback
                        "active:scale-95 active:bg-opacity-80",
                        // Better spacing on mobile
                        "px-5 sm:px-4 py-3 sm:py-2.5"
                      )}
                      role="menuitem"
                    >
                      <span className="flex-shrink-0">{item.icon}</span>
                      <span className="flex-1 text-sm">{item.label}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Quick Contact Section */}
            <div className="h-px bg-gray-200/60 mx-4 my-2" />
            <div className="px-4 py-2">
              <a
                href="tel:+1-858-555-0123"
                onClick={closeDropdown}
                className={cn(
                  "w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl",
                  "bg-gradient-to-r from-green-50 to-blue-50",
                  "border border-green-200/50 hover:border-green-300/50",
                  "text-green-700 hover:text-green-800",
                  "transition-all duration-200",
                  "focus:outline-none focus:ring-2 focus:ring-green-300",
                  "font-semibold text-sm",
                  // Touch-friendly sizing - larger on mobile
                  "min-h-[50px] sm:min-h-[44px] touch-manipulation",
                  // Active state for touch feedback
                  "active:scale-95 active:bg-opacity-80",
                  // Better spacing on mobile
                  "px-6 sm:px-4 py-3.5 sm:py-3"
                )}
              >
                <Phone className="w-4 h-4" />
                Call (858) 555-0123
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}