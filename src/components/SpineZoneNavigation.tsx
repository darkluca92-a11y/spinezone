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
  Heart,
  ClipboardList,
  CreditCard,
  Star,
  Activity
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export function SpineZoneNavigation() {
  const router = useRouter()
  const [isExpanded, setIsExpanded] = useState(false)

  const handleNavigation = (path: string) => {
    router.push(path)
    // Close the menu after navigation
    setIsExpanded(false)
  }

  return (
    <div className="fixed top-4 right-4 z-[100]">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 to-green-500/20 blur-2xl -z-10 rounded-full" />
        <MenuContainer>
          <MenuItem 
            icon={
              <div className="relative w-6 h-6">
                <div className="absolute inset-0 transition-all duration-300 ease-in-out origin-center opacity-100 scale-100 rotate-0 [div[data-expanded=true]_&]:opacity-0 [div[data-expanded=true]_&]:scale-0 [div[data-expanded=true]_&]:rotate-180">
                  <MenuIcon size={20} strokeWidth={2} className="text-blue-600" />
                </div>
                <div className="absolute inset-0 transition-all duration-300 ease-in-out origin-center opacity-0 scale-0 -rotate-180 [div[data-expanded=true]_&]:opacity-100 [div[data-expanded=true]_&]:scale-100 [div[data-expanded=true]_&]:rotate-0">
                  <X size={20} strokeWidth={2} className="text-blue-600" />
                </div>
              </div>
            } 
          />
          <MenuItem 
            icon={<Home size={20} strokeWidth={2} className="text-blue-600 hover:text-blue-700" />}
            onClick={() => handleNavigation("/")}
          />
          <MenuItem 
            icon={<Stethoscope size={20} strokeWidth={2} className="text-blue-600 hover:text-blue-700" />}
            onClick={() => handleNavigation("/services")}
          />
          <MenuItem 
            icon={<Calendar size={20} strokeWidth={2} className="text-blue-600 hover:text-blue-700" />}
            onClick={() => handleNavigation("/assessment")}
          />
          <MenuItem 
            icon={<Activity size={20} strokeWidth={2} className="text-blue-600 hover:text-blue-700" />}
            onClick={() => handleNavigation("/treatment-journey")}
          />
          <MenuItem 
            icon={<Users size={20} strokeWidth={2} className="text-blue-600 hover:text-blue-700" />}
            onClick={() => handleNavigation("/team")}
          />
          <MenuItem 
            icon={<Star size={20} strokeWidth={2} className="text-blue-600 hover:text-blue-700" />}
            onClick={() => handleNavigation("/testimonials")}
          />
          <MenuItem 
            icon={<CreditCard size={20} strokeWidth={2} className="text-blue-600 hover:text-blue-700" />}
            onClick={() => handleNavigation("/insurance")}
          />
          <MenuItem 
            icon={<Phone size={20} strokeWidth={2} className="text-blue-600 hover:text-blue-700" />}
            onClick={() => handleNavigation("/contact")}
          />
        </MenuContainer>
      </div>
    </div>
  )
}

// Alternative compact version with fewer items for better UX
export function SpineZoneNavigationCompact() {
  const router = useRouter()
  const [isExpanded, setIsExpanded] = useState(false)

  const handleNavigation = (path: string) => {
    router.push(path)
    setIsExpanded(false)
  }

  return (
    <div className="fixed top-4 right-4 z-[100]">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 to-green-500/20 blur-2xl -z-10 rounded-full" />
        <MenuContainer>
          <MenuItem 
            icon={
              <div className="relative w-6 h-6">
                <div className="absolute inset-0 transition-all duration-300 ease-in-out origin-center opacity-100 scale-100 rotate-0 [div[data-expanded=true]_&]:opacity-0 [div[data-expanded=true]_&]:scale-0 [div[data-expanded=true]_&]:rotate-180">
                  <MenuIcon size={20} strokeWidth={2} className="text-blue-600" />
                </div>
                <div className="absolute inset-0 transition-all duration-300 ease-in-out origin-center opacity-0 scale-0 -rotate-180 [div[data-expanded=true]_&]:opacity-100 [div[data-expanded=true]_&]:scale-100 [div[data-expanded=true]_&]:rotate-0">
                  <X size={20} strokeWidth={2} className="text-blue-600" />
                </div>
              </div>
            } 
          />
          <MenuItem 
            icon={<Home size={20} strokeWidth={2} className="text-blue-600 hover:text-blue-700" />}
            onClick={() => handleNavigation("/")}
          />
          <MenuItem 
            icon={<Stethoscope size={20} strokeWidth={2} className="text-blue-600 hover:text-blue-700" />}
            onClick={() => handleNavigation("/services")}
          />
          <MenuItem 
            icon={<Calendar size={20} strokeWidth={2} className="text-blue-600 hover:text-blue-700" />}
            onClick={() => handleNavigation("/assessment")}
          />
          <MenuItem 
            icon={<Users size={20} strokeWidth={2} className="text-blue-600 hover:text-blue-700" />}
            onClick={() => handleNavigation("/about")}
          />
          <MenuItem 
            icon={<Phone size={20} strokeWidth={2} className="text-blue-600 hover:text-blue-700" />}
            onClick={() => handleNavigation("/contact")}
          />
        </MenuContainer>
      </div>
    </div>
  )
}