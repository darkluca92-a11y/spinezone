import { useEffect, useRef, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { logAuditEvent, AUDIT_ACTIONS } from '@/lib/audit';

interface SessionTimeoutConfig {
  timeoutMinutes?: number;
  warningMinutes?: number;
  onTimeout?: () => void;
  onWarning?: (remainingMinutes: number) => void;
}

export const useSessionTimeout = ({
  timeoutMinutes = 15,
  warningMinutes = 2,
  onTimeout,
  onWarning
}: SessionTimeoutConfig = {}) => {
  const [isActive, setIsActive] = useState(true);
  const [showWarning, setShowWarning] = useState(false);
  const [remainingTime, setRemainingTime] = useState(timeoutMinutes * 60);
  
  const timeoutRef = useRef<NodeJS.Timeout>();
  const warningRef = useRef<NodeJS.Timeout>();
  const countdownRef = useRef<NodeJS.Timeout>();
  const lastActivityRef = useRef<number>(Date.now());

  const resetTimeout = () => {
    lastActivityRef.current = Date.now();
    setRemainingTime(timeoutMinutes * 60);
    setShowWarning(false);
    
    // Clear existing timeouts
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (warningRef.current) clearTimeout(warningRef.current);
    if (countdownRef.current) clearInterval(countdownRef.current);
    
    if (!isActive) return;
    
    // Set warning timeout
    warningRef.current = setTimeout(() => {
      setShowWarning(true);
      onWarning?.(warningMinutes);
      
      // Start countdown
      let remaining = warningMinutes * 60;
      setRemainingTime(remaining);
      
      countdownRef.current = setInterval(() => {
        remaining -= 1;
        setRemainingTime(remaining);
        
        if (remaining <= 0) {
          handleTimeout();
        }
      }, 1000);
      
    }, (timeoutMinutes - warningMinutes) * 60 * 1000);
    
    // Set session timeout
    timeoutRef.current = setTimeout(() => {
      handleTimeout();
    }, timeoutMinutes * 60 * 1000);
  };

  const handleTimeout = async () => {
    setIsActive(false);
    
    // Log session timeout
    await logAuditEvent({
      action: AUDIT_ACTIONS.LOGOUT,
      resource: 'session',
      ip_address: '127.0.0.1', // Get from request in production
      metadata: { reason: 'session_timeout' }
    });
    
    // Sign out user
    if (supabase) {
      await supabase.auth.signOut();
    }
    
    onTimeout?.();
  };

  const extendSession = () => {
    setShowWarning(false);
    resetTimeout();
  };

  useEffect(() => {
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    
    const resetOnActivity = () => {
      if (isActive && !showWarning) {
        resetTimeout();
      }
    };

    // Add event listeners
    events.forEach(event => {
      document.addEventListener(event, resetOnActivity, true);
    });

    // Initialize timeout
    resetTimeout();

    // Cleanup
    return () => {
      events.forEach(event => {
        document.removeEventListener(event, resetOnActivity, true);
      });
      
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (warningRef.current) clearTimeout(warningRef.current);
      if (countdownRef.current) clearInterval(countdownRef.current);
    };
  }, [isActive, showWarning, timeoutMinutes, warningMinutes]);

  return {
    isActive,
    showWarning,
    remainingTime,
    extendSession,
    resetTimeout
  };
};