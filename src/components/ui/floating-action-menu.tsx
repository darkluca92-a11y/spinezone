"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

type FloatingActionMenuProps = {
options: {
  label: string;
  onClick: () => void;
  Icon?: React.ReactNode;
}[];
className?: string;
};

const FloatingActionMenu = ({
options,
className,
}: FloatingActionMenuProps) => {
const [isOpen, setIsOpen] = useState(false);
const menuRef = useRef<HTMLDivElement>(null);
const mainButtonRef = useRef<HTMLButtonElement>(null);

const toggleMenu = () => {
  setIsOpen(!isOpen);
};

// Close menu when clicking outside
useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
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
      mainButtonRef.current?.focus();
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
  <div className={cn("fixed bottom-8 right-8", className)} ref={menuRef}>
    <Button
      ref={mainButtonRef}
      onClick={toggleMenu}
      className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-[0_8px_32px_rgba(59,130,246,0.3)] border border-blue-400/30 backdrop-blur-sm transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300/50 sm:w-14 sm:h-14"
      aria-label={isOpen ? "Close healthcare actions menu" : "Open healthcare actions menu"}
      aria-expanded={isOpen}
      aria-haspopup="menu"
    >
      <motion.div
        animate={{ rotate: isOpen ? 45 : 0 }}
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
    </Button>

    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 10, y: 10, filter: "blur(10px)" }}
          animate={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, x: 10, y: 10, filter: "blur(10px)" }}
          transition={{
            duration: 0.6,
            type: "spring",
            stiffness: 300,
            damping: 20,
            delay: 0.1,
          }}
          className="absolute bottom-20 right-0 mb-2"
          role="menu"
          aria-orientation="vertical"
        >
          <div className="flex flex-col items-end gap-3">
            {options.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.05,
                }}
              >
                <Button
                  onClick={() => {
                    option.onClick();
                    setIsOpen(false);
                  }}
                  size="sm"
                  className="flex items-center gap-3 bg-white/95 hover:bg-white text-blue-700 hover:text-blue-800 shadow-[0_4px_24px_rgba(59,130,246,0.15)] border border-blue-200/50 rounded-xl backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:shadow-[0_8px_32px_rgba(59,130,246,0.2)] focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:ring-offset-2 min-w-[140px] px-4 py-3 sm:min-w-[120px] sm:px-3 sm:py-2"
                  role="menuitem"
                  aria-label={option.label}
                >
                  <span className="text-blue-600 flex-shrink-0">{option.Icon}</span>
                  <span className="font-medium text-sm sm:text-xs whitespace-nowrap">{option.label}</span>
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);
};

export default FloatingActionMenu;
