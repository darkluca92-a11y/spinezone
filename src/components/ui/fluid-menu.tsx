"use client"

import React, { useState } from "react"
import { ChevronDown } from "lucide-react"

interface MenuProps {
  trigger: React.ReactNode
  children: React.ReactNode
  align?: "left" | "right"
  showChevron?: boolean
}

export function Menu({ trigger, children, align = "left", showChevron = true }: MenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative inline-block text-left">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer inline-flex items-center"
        role="button"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {trigger}
        {showChevron && (
          <ChevronDown className="ml-2 -mr-1 h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" />
        )}
      </div>

      {isOpen && (
        <div
          className={`absolute ${align === "right" ? "right-0" : "left-0"} mt-2 w-56 rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black dark:ring-gray-700 ring-opacity-9 focus:outline-none z-50`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          <div className="py-1" role="none">
            {children}
          </div>
        </div>
      )}
    </div>
  )
}

interface MenuItemProps {
  children?: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  icon?: React.ReactNode
  isActive?: boolean
  href?: string
}

export function MenuItem({ children, onClick, disabled = false, icon, isActive = false, href }: MenuItemProps) {
  const handleClick = () => {
    if (href) {
      window.location.href = href
    }
    if (onClick) {
      onClick()
    }
  }

  return (
    <button
      className={`relative block w-full h-16 text-center group transition-all duration-200 hover:bg-blue-50 dark:hover:bg-gray-700
        ${disabled ? "text-gray-400 dark:text-gray-500 cursor-not-allowed" : "text-gray-600 dark:text-gray-300 hover:text-blue-600"}
        ${isActive ? "bg-blue-50 text-blue-600" : ""}
      `}
      role="menuitem"
      onClick={handleClick}
      disabled={disabled}
    >
      <span className="flex items-center justify-center h-full">
        {icon && (
          <span className="h-6 w-6 transition-all duration-200 group-hover:[&_svg]:stroke-[2.5]">
            {icon}
          </span>
        )}
        {children}
      </span>
    </button>
  )
}

export function MenuContainer({ children }: { children: React.ReactNode }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const childrenArray = React.Children.toArray(children)

  const handleToggle = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className="relative w-[64px]" data-expanded={isExpanded}>
      <div className="relative">
        <div 
          className="relative w-16 h-16 bg-white dark:bg-gray-800 cursor-pointer rounded-full group will-change-transform z-50 shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300 hover:scale-105"
          onClick={handleToggle}
        >
          {childrenArray[0]}
        </div>
        {childrenArray.slice(1).map((child, index) => (
          <div 
            key={index} 
            className="absolute top-0 left-0 w-16 h-16 bg-white dark:bg-gray-800 will-change-transform shadow-lg border border-blue-100"
            style={{
              transform: `translateY(${isExpanded ? (index + 1) * 72 : 0}px)`,
              opacity: isExpanded ? 1 : 0,
              zIndex: 40 - index,
              clipPath: index === childrenArray.length - 2 
                ? "circle(50% at 50% 50%)" 
                : "circle(50% at 50% 55%)",
              transition: `transform 300ms cubic-bezier(0.4, 0, 0.2, 1), opacity 300ms`,
              backfaceVisibility: 'hidden',
              perspective: 1000,
              WebkitFontSmoothing: 'antialiased'
            }}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  )
}