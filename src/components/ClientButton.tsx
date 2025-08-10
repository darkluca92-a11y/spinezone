'use client';

import { ReactNode } from 'react';

interface ClientButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
}

export default function ClientButton({ 
  children, 
  className = '', 
  onClick,
  type = 'button',
  disabled = false,
  variant = 'primary'
}: ClientButtonProps) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      // Default action for buttons without specific handlers
      console.log('Button clicked - demo mode');
    }
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      className={className}
    >
      {children}
    </button>
  );
}