'use client';

import { useState, useEffect, useCallback } from 'react';
import { Phone, PhoneCall, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';

// Vapi Configuration
const VAPI_CONFIG = {
  publicKey: '265b6773-dcd2-4c2a-9073-a9203a761db2',
  assistantId: 'c60da784-16bf-4c38-b980-07a49ecbc4af',
  assistant: {
    name: 'Riley',
    voice: {
      provider: 'openai',
      voiceId: 'alloy'
    },
    model: {
      provider: 'openai',
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are Riley, the friendly appointment scheduling assistant for SpineZone Physical Therapy in San Diego.

Your role is to:
1. Help patients schedule appointments at SpineZone
2. Answer basic questions about services (physical therapy, spine treatment, joint pain, sports injuries)
3. Provide clinic information (10 locations across San Diego and Orange County)
4. Collect patient information for appointments
5. Explain insurance acceptance and coverage

Key Information:
- SpineZone specializes in non-invasive physical therapy
- 90% success rate without surgery, injections, or opioids
- Most insurance accepted including Medicare, Blue Cross, Aetna, Cigna
- Same-day appointments available for urgent cases
- 15+ years of experience, 1M+ patient encounters
- Locations: La Jolla, Hillcrest, Pacific Beach, Mission Valley, Downtown SD, and more

Keep responses concise, friendly, and focused on helping schedule appointments. If you can't help with something, offer to transfer to a human staff member.

Always be warm, professional, and healthcare-focused. Don't mention that you're AI - you're Riley from SpineZone.`
        }
      ]
    }
  }
};

// Define call status types
type CallStatus = 'idle' | 'connecting' | 'connected' | 'disconnecting' | 'error';

// Vapi instance management
class VapiManager {
  private static instance: any = null;
  private static initPromise: Promise<any> | null = null;

  static async getInstance() {
    if (this.instance) {
      return this.instance;
    }

    if (this.initPromise) {
      return this.initPromise;
    }

    this.initPromise = new Promise((resolve, reject) => {
      // Check if Vapi is already loaded
      if (typeof window !== 'undefined' && (window as any).Vapi) {
        this.instance = new (window as any).Vapi(VAPI_CONFIG.publicKey);
        resolve(this.instance);
        return;
      }

      // Wait for script to load
      const checkVapi = () => {
        if (typeof window !== 'undefined' && (window as any).Vapi) {
          try {
            this.instance = new (window as any).Vapi(VAPI_CONFIG.publicKey);
            resolve(this.instance);
          } catch (error) {
            console.error('Failed to initialize Vapi:', error);
            reject(error);
          }
        } else {
          setTimeout(checkVapi, 100);
        }
      };

      // Start checking after a short delay to allow script loading
      setTimeout(checkVapi, 100);

      // Timeout after 10 seconds
      setTimeout(() => {
        reject(new Error('Vapi SDK failed to load'));
      }, 10000);
    });

    return this.initPromise;
  }

  static reset() {
    this.instance = null;
    this.initPromise = null;
  }
}

// Voice call hook
export function useVapiVoiceCall() {
  const [callStatus, setCallStatus] = useState<CallStatus>('idle');
  const [isVapiLoaded, setIsVapiLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);

  // Initialize Vapi
  useEffect(() => {
    const initializeVapi = async () => {
      try {
        await VapiManager.getInstance();
        setIsVapiLoaded(true);
      } catch (error) {
        console.error('Failed to initialize Vapi:', error);
        setError('Voice calling is currently unavailable');
        setIsVapiLoaded(false);
      }
    };

    initializeVapi();
  }, []);

  // Start voice call
  const startCall = useCallback(async () => {
    if (!isVapiLoaded) {
      setError('Voice calling is not available');
      return false;
    }

    try {
      setCallStatus('connecting');
      setError(null);

      const vapi = await VapiManager.getInstance();
      
      await vapi.start({
        assistantId: VAPI_CONFIG.assistantId,
        assistant: VAPI_CONFIG.assistant
      });

      setCallStatus('connected');
      return true;
    } catch (error) {
      console.error('Failed to start call:', error);
      setError('Failed to start voice call');
      setCallStatus('error');
      
      // Reset to idle after error
      setTimeout(() => {
        if (callStatus === 'error') {
          setCallStatus('idle');
          setError(null);
        }
      }, 3000);
      
      return false;
    }
  }, [isVapiLoaded, callStatus]);

  // End voice call
  const endCall = useCallback(async () => {
    try {
      setCallStatus('disconnecting');
      
      const vapi = await VapiManager.getInstance();
      await vapi.stop();
      
      setCallStatus('idle');
      setIsMuted(false);
    } catch (error) {
      console.error('Failed to end call:', error);
      setCallStatus('idle');
      setIsMuted(false);
    }
  }, []);

  // Toggle mute
  const toggleMute = useCallback(async () => {
    try {
      const vapi = await VapiManager.getInstance();
      if (isMuted) {
        await vapi.unmute();
      } else {
        await vapi.mute();
      }
      setIsMuted(!isMuted);
    } catch (error) {
      console.error('Failed to toggle mute:', error);
    }
  }, [isMuted]);

  // Set volume
  const setCallVolume = useCallback(async (newVolume: number) => {
    try {
      const vapi = await VapiManager.getInstance();
      await vapi.setVolume(newVolume);
      setVolume(newVolume);
    } catch (error) {
      console.error('Failed to set volume:', error);
    }
  }, []);

  return {
    callStatus,
    isVapiLoaded,
    error,
    isMuted,
    volume,
    startCall,
    endCall,
    toggleMute,
    setCallVolume
  };
}

// Desktop Voice Call Button Component
export function DesktopVoiceCallButton({ 
  className = '',
  size = 'default' 
}: { 
  className?: string;
  size?: 'small' | 'default' | 'large';
}) {
  const { callStatus, isVapiLoaded, error, startCall, endCall } = useVapiVoiceCall();

  const handleClick = async () => {
    if (callStatus === 'idle') {
      const success = await startCall();
      if (!success && error) {
        // Fallback to phone call if voice call fails
        window.location.href = 'tel:+1-858-555-0123';
      }
    } else if (callStatus === 'connected') {
      await endCall();
    }
  };

  const sizeClasses = {
    small: 'w-12 h-12',
    default: 'w-16 h-16',
    large: 'w-20 h-20'
  };

  const iconSizes = {
    small: 'w-5 h-5',
    default: 'w-6 h-6',
    large: 'w-8 h-8'
  };

  const getButtonContent = () => {
    switch (callStatus) {
      case 'connecting':
        return (
          <div className="animate-spin">
            <Phone className={iconSizes[size]} />
          </div>
        );
      case 'connected':
        return <PhoneCall className={`${iconSizes[size]} animate-pulse`} />;
      case 'disconnecting':
        return (
          <div className="animate-bounce">
            <Phone className={iconSizes[size]} />
          </div>
        );
      case 'error':
        return <Phone className={`${iconSizes[size]} text-red-500`} />;
      default:
        return <Phone className={iconSizes[size]} />;
    }
  };

  const getButtonText = () => {
    switch (callStatus) {
      case 'connecting':
        return 'Connecting...';
      case 'connected':
        return 'End Call';
      case 'disconnecting':
        return 'Ending...';
      case 'error':
        return 'Call Failed - Tap to Retry';
      default:
        return 'Call Now - Free Consultation';
    }
  };

  const getButtonStyles = () => {
    const base = 'transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95';
    
    switch (callStatus) {
      case 'connected':
        return `${base} bg-red-500 hover:bg-red-600`;
      case 'error':
        return `${base} bg-orange-500 hover:bg-orange-600`;
      default:
        return `${base} bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700`;
    }
  };

  return (
    <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
      <button
        onClick={handleClick}
        disabled={callStatus === 'connecting' || callStatus === 'disconnecting'}
        className={`
          ${sizeClasses[size]} 
          ${getButtonStyles()}
          text-white rounded-full flex items-center justify-center
          disabled:opacity-70 disabled:cursor-not-allowed
          focus:outline-none focus:ring-4 focus:ring-green-300 focus:ring-offset-2
          voice-call-button
        `}
        aria-label={getButtonText()}
        title={getButtonText()}
      >
        {getButtonContent()}
      </button>

      {/* Tooltip */}
      <div className="absolute bottom-20 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap">
          {getButtonText()}
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="absolute bottom-20 right-0 bg-red-100 border border-red-300 text-red-700 px-3 py-2 rounded-lg text-sm max-w-xs">
          {error}
        </div>
      )}
    </div>
  );
}

// Mobile Voice Call Button Component
export function MobileVoiceCallButton({ 
  children,
  className = '',
  variant = 'default',
  size = 'default',
  fullWidth = false,
  onClick: customOnClick,
  ...props 
}: {
  children?: React.ReactNode;
  className?: string;
  variant?: 'default' | 'outline' | 'text';
  size?: 'small' | 'default' | 'large';
  fullWidth?: boolean;
  onClick?: () => void;
  [key: string]: any;
}) {
  const { callStatus, isVapiLoaded, error, startCall, endCall } = useVapiVoiceCall();

  const handleClick = async () => {
    // Call custom onClick if provided
    if (customOnClick) {
      customOnClick();
    }

    if (callStatus === 'idle') {
      const success = await startCall();
      if (!success && error) {
        // Fallback to phone call if voice call fails
        window.location.href = 'tel:+1-858-555-0123';
      }
    } else if (callStatus === 'connected') {
      await endCall();
    }
  };

  const getButtonText = () => {
    if (children) return children;
    
    switch (callStatus) {
      case 'connecting':
        return 'Connecting...';
      case 'connected':
        return 'End Call';
      case 'disconnecting':
        return 'Ending...';
      case 'error':
        return 'Call Failed';
      default:
        return 'Call Now';
    }
  };

  const getButtonStyles = () => {
    const sizeClasses = {
      small: 'px-3 py-1.5 text-sm',
      default: 'px-4 py-2 text-base',
      large: 'px-6 py-3 text-lg'
    };

    const baseClasses = `
      ${sizeClasses[size]}
      ${fullWidth ? 'w-full' : ''}
      font-semibold rounded-lg transition-all duration-300
      disabled:opacity-70 disabled:cursor-not-allowed
      focus:outline-none focus:ring-4 focus:ring-offset-2
      touch-manipulation select-none
    `;

    switch (variant) {
      case 'outline':
        return `${baseClasses} border-2 border-green-500 text-green-600 hover:bg-green-50 focus:ring-green-300`;
      case 'text':
        return `${baseClasses} text-green-600 hover:bg-green-50 focus:ring-green-300`;
      default:
        const statusStyles = {
          connected: 'bg-red-500 hover:bg-red-600 focus:ring-red-300',
          error: 'bg-orange-500 hover:bg-orange-600 focus:ring-orange-300',
          default: 'bg-green-500 hover:bg-green-600 focus:ring-green-300'
        };
        
        const currentStyle = callStatus === 'connected' ? statusStyles.connected :
                           callStatus === 'error' ? statusStyles.error :
                           statusStyles.default;
        
        return `${baseClasses} text-white ${currentStyle}`;
    }
  };

  return (
    <button
      {...props}
      onClick={handleClick}
      disabled={callStatus === 'connecting' || callStatus === 'disconnecting'}
      className={`${getButtonStyles()} mobile-voice-button ${className}`}
      aria-label={typeof getButtonText() === 'string' ? getButtonText() as string : 'Call Now'}
    >
      <div className="flex items-center justify-center">
        {callStatus === 'connecting' && (
          <div className="animate-spin mr-2">
            <Phone className="w-4 h-4" />
          </div>
        )}
        {callStatus === 'connected' && (
          <PhoneCall className="w-4 h-4 mr-2 animate-pulse" />
        )}
        {(callStatus === 'idle' || callStatus === 'error') && (
          <Phone className="w-4 h-4 mr-2" />
        )}
        {getButtonText()}
      </div>
    </button>
  );
}

// Voice Call Manager - Global function to start calls from anywhere
export const triggerVapiVoiceCall = async (): Promise<boolean> => {
  try {
    const vapi = await VapiManager.getInstance();
    
    await vapi.start({
      assistantId: VAPI_CONFIG.assistantId,
      assistant: VAPI_CONFIG.assistant
    });
    
    return true;
  } catch (error) {
    console.error('Failed to start voice call:', error);
    
    // Fallback to phone call
    if (typeof window !== 'undefined') {
      window.location.href = 'tel:+1-858-555-0123';
    }
    
    return false;
  }
};

export default { DesktopVoiceCallButton, MobileVoiceCallButton, useVapiVoiceCall, triggerVapiVoiceCall };