'use client';

import { useEffect, useState } from 'react';
import { Clock, AlertTriangle } from 'lucide-react';

interface SessionTimeoutModalProps {
  isOpen: boolean;
  remainingTime: number;
  onExtendSession: () => void;
  onSignOut: () => void;
}

export default function SessionTimeoutModal({
  isOpen,
  remainingTime,
  onExtendSession,
  onSignOut
}: SessionTimeoutModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!mounted || !isOpen) {
    return null;
  }

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50"
        aria-hidden="true"
      />
      
      {/* Modal */}
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="session-timeout-title"
      >
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
          {/* Header */}
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mr-3">
              <Clock className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <h2 id="session-timeout-title" className="text-lg font-semibold text-gray-900">
                Session Expiring Soon
              </h2>
              <p className="text-sm text-gray-600">
                For your security, your session will expire in:
              </p>
            </div>
          </div>

          {/* Countdown */}
          <div className="text-center mb-6">
            <div className="text-3xl font-bold text-orange-600 mb-2">
              {formatTime(remainingTime)}
            </div>
            <p className="text-sm text-gray-600">
              Your session will automatically end to protect your health information.
            </p>
          </div>

          {/* Security Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6">
            <div className="flex items-start">
              <AlertTriangle className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs text-blue-800 font-medium">Security Feature</p>
                <p className="text-xs text-blue-700 mt-1">
                  Automatic session timeout helps protect your private health information 
                  in accordance with HIPAA regulations.
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-3">
            <button
              onClick={onExtendSession}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Stay Signed In
            </button>
            <button
              onClick={onSignOut}
              className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-medium hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
            >
              Sign Out Now
            </button>
          </div>

          {/* Additional Info */}
          <p className="text-xs text-gray-500 text-center mt-4">
            Moving your mouse or pressing any key will reset the timer automatically.
          </p>
        </div>
      </div>
    </>
  );
}