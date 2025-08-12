"use client"

import { MenuItem, MenuContainer } from "@/components/ui/fluid-menu"
import { 
  Menu as MenuIcon, 
  X, 
  Home, 
  Stethoscope, 
  Calendar, 
  Users, 
  Phone, 
  ClipboardList,
  CreditCard,
  MessageCircle,
  ChevronRight,
  Star
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"

// Healthcare-focused fluid circular menu for SpineZone
export function SpineZoneFluidMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuItems = [
    {
      icon: <Home size={20} strokeWidth={1.5} />,
      label: "Home",
      href: "/",
      color: "text-blue-600"
    },
    {
      icon: <Stethoscope size={20} strokeWidth={1.5} />,
      label: "Services", 
      href: "/services",
      color: "text-green-600"
    },
    {
      icon: <Calendar size={20} strokeWidth={1.5} />,
      label: "Assessment",
      href: "/assessment", 
      color: "text-purple-600"
    },
    {
      icon: <Users size={20} strokeWidth={1.5} />,
      label: "About & Team",
      href: "/about",
      color: "text-orange-600"
    },
    {
      icon: <Star size={20} strokeWidth={1.5} />,
      label: "Reviews",
      href: "/testimonials",
      color: "text-yellow-600"
    },
    {
      icon: <ClipboardList size={20} strokeWidth={1.5} />,
      label: "Treatment Journey",
      href: "/treatment-journey",
      color: "text-indigo-600"
    },
    {
      icon: <CreditCard size={20} strokeWidth={1.5} />,
      label: "Insurance",
      href: "/insurance",
      color: "text-teal-600"
    },
    {
      icon: <MessageCircle size={20} strokeWidth={1.5} />,
      label: "Contact",
      href: "/contact",
      color: "text-red-600"
    }
  ]

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleMenuItemClick = () => {
    setIsMenuOpen(false)
  }

  return (
    <div className="relative" role="navigation" aria-label="Main menu">
      {/* Menu container with enhanced styling for healthcare */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 to-green-500/20 dark:from-blue-400/20 dark:to-green-400/20 blur-xl -z-10 rounded-full opacity-75" />
        
        <MenuContainer>
          {/* Menu toggle button with animated hamburger/X transition */}
          <MenuItem 
            icon={
              <div className="relative w-6 h-6" aria-hidden="true">
                <div className="absolute inset-0 transition-all duration-300 ease-in-out origin-center opacity-100 scale-100 rotate-0 [div[data-expanded=true]_&]:opacity-0 [div[data-expanded=true]_&]:scale-0 [div[data-expanded=true]_&]:rotate-180">
                  <MenuIcon size={24} strokeWidth={1.5} className="text-blue-600" />
                </div>
                <div className="absolute inset-0 transition-all duration-300 ease-in-out origin-center opacity-0 scale-0 -rotate-180 [div[data-expanded=true]_&]:opacity-100 [div[data-expanded=true]_&]:scale-100 [div[data-expanded=true]_&]:rotate-0">
                  <X size={24} strokeWidth={1.5} className="text-green-600" />
                </div>
              </div>
            }
            onClick={handleMenuToggle}
          />
          
          {/* Navigation menu items with healthcare icons */}
          {menuItems.map((item, index) => (
            <MenuItem 
              key={index}
              icon={
                <Link 
                  href={item.href}
                  className={`flex items-center justify-center w-full h-full transition-colors duration-200 hover:scale-110 ${item.color} hover:bg-white/20 rounded-full`}
                  onClick={handleMenuItemClick}
                  aria-label={`Navigate to ${item.label}`}
                  title={item.label}
                >
                  {item.icon}
                </Link>
              }
            />
          ))}
        </MenuContainer>
      </div>

      {/* Optional: Menu labels overlay for accessibility */}
      {isMenuOpen && (
        <div className="absolute left-20 top-0 hidden lg:block">
          <div className="space-y-12 pt-4">
            {menuItems.map((item, index) => (
              <div 
                key={index}
                className="flex items-center opacity-0 animate-fade-in-delay"
                style={{ 
                  animationDelay: `${(index + 1) * 50}ms`,
                  animationFillMode: 'forwards'
                }}
              >
                <ChevronRight size={16} className="text-gray-400 mr-2" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 bg-white/90 dark:bg-gray-800/90 px-3 py-1 rounded-full shadow-sm">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// Compact version for mobile integration
export function SpineZoneFluidMenuCompact() {
  const menuItems = [
    { icon: <Home size={18} strokeWidth={1.5} />, href: "/", label: "Home" },
    { icon: <Stethoscope size={18} strokeWidth={1.5} />, href: "/services", label: "Services" },
    { icon: <Calendar size={18} strokeWidth={1.5} />, href: "/assessment", label: "Assessment" },
    { icon: <Users size={18} strokeWidth={1.5} />, href: "/about", label: "About" },
    { icon: <MessageCircle size={18} strokeWidth={1.5} />, href: "/contact", label: "Contact" }
  ]

  return (
    <div className="relative scale-75 origin-top-right" role="navigation" aria-label="Compact menu">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/15 to-green-500/15 blur-lg -z-10 rounded-full" />
      
      <MenuContainer>
        <MenuItem 
          icon={
            <div className="relative w-5 h-5" aria-hidden="true">
              <div className="absolute inset-0 transition-all duration-300 ease-in-out origin-center opacity-100 scale-100 rotate-0 [div[data-expanded=true]_&]:opacity-0 [div[data-expanded=true]_&]:scale-0 [div[data-expanded=true]_&]:rotate-180">
                <MenuIcon size={20} strokeWidth={1.5} className="text-blue-600" />
              </div>
              <div className="absolute inset-0 transition-all duration-300 ease-in-out origin-center opacity-0 scale-0 -rotate-180 [div[data-expanded=true]_&]:opacity-100 [div[data-expanded=true]_&]:scale-100 [div[data-expanded=true]_&]:rotate-0">
                <X size={20} strokeWidth={1.5} className="text-green-600" />
              </div>
            </div>
          }
        />
        
        {menuItems.map((item, index) => (
          <MenuItem 
            key={index}
            icon={
              <Link 
                href={item.href}
                className="flex items-center justify-center w-full h-full text-blue-600 hover:text-green-600 transition-colors duration-200 hover:scale-110"
                aria-label={`Navigate to ${item.label}`}
                title={item.label}
              >
                {item.icon}
              </Link>
            }
          />
        ))}
      </MenuContainer>
    </div>
  )
}