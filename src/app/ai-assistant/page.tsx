'use client';

import { useState, useEffect } from 'react';
import { Phone, PhoneOff, Mic, MicOff, Volume2, VolumeX, Loader2 } from 'lucide-react';
import Vapi from '@vapi-ai/web';

export default function AIAssistantPage() {
  const [vapi, setVapi] = useState<Vapi | null>(null);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [volumeLevel, setVolumeLevel] = useState(0);
  const [messages, setMessages] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Initialize Vapi
  useEffect(() => {
    const vapiInstance = new Vapi('265b6773-dcd2-4c2a-9073-a9203a761db2');
    setVapi(vapiInstance);

    // Set up event listeners
    vapiInstance.on('call-start', () => {
      console.log('Call has started');
      setIsCallActive(true);
      setIsLoading(false);
      setError(null);
    });

    vapiInstance.on('call-end', () => {
      console.log('Call has ended');
      setIsCallActive(false);
      setIsLoading(false);
      setCallDuration(0);
    });

    vapiInstance.on('speech-start', () => {
      console.log('Speech has started');
    });

    vapiInstance.on('speech-end', () => {
      console.log('Speech has ended');
    });

    vapiInstance.on('volume-level', (volume: number) => {
      setVolumeLevel(volume);
    });

    vapiInstance.on('message', (message: any) => {
      console.log('Message:', message);
      setMessages(prev => [...prev, message]);
    });

    vapiInstance.on('error', (e: any) => {
      console.error('Vapi error:', e);
      setError(e.message || 'An error occurred during the call');
      setIsLoading(false);
      setIsCallActive(false);
    });

    return () => {
      if (vapiInstance && isCallActive) {
        vapiInstance.stop();
      }
    };
  }, []);

  // Call duration timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCallActive) {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isCallActive]);

  const startCall = async () => {
    if (!vapi) return;
    
    setIsLoading(true);
    setError(null);
    setMessages([]);
    
    try {
      await vapi.start('c60da784-16bf-4c38-b980-07a49ecbc4af');
    } catch (error) {
      console.error('Failed to start call:', error);
      setError('Failed to start call. Please check your microphone permissions.');
      setIsLoading(false);
    }
  };

  const endCall = () => {
    if (vapi) {
      vapi.stop();
    }
  };

  const toggleMute = () => {
    if (vapi) {
      const newMutedState = !isMuted;
      vapi.setMuted(newMutedState);
      setIsMuted(newMutedState);
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Phone Call Assistant
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Talk directly with Riley, our AI-powered healthcare assistant. Get instant answers about 
            appointments, treatments, insurance, and more - all through natural voice conversation.
          </p>
        </div>

        {/* Main Call Interface */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
            
            {/* Call Status */}
            <div className="text-center mb-8">
              {isCallActive && (
                <div className="mb-4">
                  <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full text-green-800 text-sm font-medium">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                    Connected - {formatDuration(callDuration)}
                  </div>
                </div>
              )}

              {/* Volume Indicator */}
              {isCallActive && (
                <div className="mb-6">
                  <div className="flex items-center justify-center space-x-2 text-gray-600 text-sm">
                    <Volume2 className="w-4 h-4" />
                    <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-green-400 to-blue-500 transition-all duration-100"
                        style={{ width: `${Math.min(volumeLevel * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}

              {/* Main Call Button */}
              <div className="relative">
                <button
                  onClick={isCallActive ? endCall : startCall}
                  disabled={isLoading}
                  className={`relative w-24 h-24 rounded-full text-white transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-offset-4 ${
                    isCallActive
                      ? 'bg-red-500 hover:bg-red-600 focus:ring-red-200 animate-pulse'
                      : 'bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 focus:ring-blue-200'
                  } disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
                >
                  {isLoading ? (
                    <Loader2 className="w-8 h-8 mx-auto animate-spin" />
                  ) : isCallActive ? (
                    <PhoneOff className="w-8 h-8 mx-auto" />
                  ) : (
                    <Phone className="w-8 h-8 mx-auto" />
                  )}
                </button>

                {/* Call button label */}
                <p className="mt-4 text-lg font-medium text-gray-700">
                  {isLoading ? 'Connecting...' : isCallActive ? 'End Call' : 'Start Call with Riley'}
                </p>
              </div>
            </div>

            {/* Call Controls */}
            {isCallActive && (
              <div className="flex justify-center space-x-4 mb-8">
                <button
                  onClick={toggleMute}
                  className={`p-3 rounded-full transition-all duration-200 ${
                    isMuted
                      ? 'bg-red-100 text-red-600 hover:bg-red-200'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </button>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            )}

            {/* Instructions */}
            {!isCallActive && (
              <div className="bg-blue-50 rounded-xl p-6 mb-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">How to use Riley:</h3>
                <ul className="text-blue-800 space-y-2 text-sm">
                  <li>• Click "Start Call" to begin your conversation</li>
                  <li>• Allow microphone permissions when prompted</li>
                  <li>• Speak naturally - Riley understands conversational language</li>
                  <li>• Ask about appointments, treatments, insurance, locations, and more</li>
                  <li>• Click "End Call" when you're finished</li>
                </ul>
              </div>
            )}

            {/* Riley Info */}
            <div className="text-center">
              <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-100 to-green-100 rounded-full">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-sm">R</span>
                </div>
                <span className="text-gray-800 font-medium">Riley - Your AI Healthcare Assistant</span>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Natural Conversation</h3>
              <p className="text-gray-600 text-sm">Speak naturally with Riley using your voice, just like a phone call</p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Mic className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Instant Answers</h3>
              <p className="text-gray-600 text-sm">Get immediate responses about treatments, scheduling, and services</p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Volume2 className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">24/7 Available</h3>
              <p className="text-gray-600 text-sm">Riley is available anytime to help with your healthcare questions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}