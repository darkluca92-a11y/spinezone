'use client';

import { Calendar, Phone, CheckCircle, Star, Clock, ArrowRight } from 'lucide-react';
import { triggerVapiVoiceCall, MobileVoiceCallButton } from './VapiVoiceIntegration';

interface FinalCTAProps {
  onScheduleClick?: () => void;
  onPhoneClick?: () => void;
}

export default function FinalCTA({ onScheduleClick, onPhoneClick }: FinalCTAProps) {
  const handleScheduleClick = () => {
    if (onScheduleClick) {
      onScheduleClick();
    } else {
      // Direct to phone call for immediate scheduling
      window.location.href = 'tel:+1-858-555-0123';
    }
  };

  const handlePhoneClick = async () => {
    if (onPhoneClick) {
      onPhoneClick();
    } else {
      // Try voice call first, fallback to phone
      const voiceCallStarted = await triggerVapiVoiceCall();
      if (!voiceCallStarted) {
        window.location.href = 'tel:+1-858-555-0123';
      }
    }
  };

  return (
    <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-green-600 text-white section-padding">
      <div className="container-max">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            Take Action Today - Your Pain-Free Life Awaits
          </h2>
          <p className="text-xl sm:text-2xl mb-4 opacity-90 max-w-3xl mx-auto">
            Ready to experience San Diego's premier non-invasive joint pain treatment? 
            Our expert team is here to help you reclaim your active lifestyle.
          </p>
          <p className="text-lg opacity-80 max-w-2xl mx-auto mb-8">
            ⏰ <strong>URGENT:</strong> Only 12 new patient slots remaining this month. Don't wait - schedule your consultation now.
          </p>
        </div>

        {/* Main CTA Buttons */}
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {/* Schedule Button */}
            <div className="bg-white rounded-2xl p-8 text-gray-900 shadow-2xl hover:shadow-3xl transition-shadow duration-300">
              <div className="text-center">
                <Calendar className="w-12 h-12 text-blue-600 mx-auto mb-4" aria-hidden="true" />
                <h3 className="text-2xl font-bold mb-3">Schedule Your Appointment</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Get a comprehensive evaluation and personalized treatment plan
                </p>
                <ul className="text-left space-y-2 mb-8">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" aria-hidden="true" />
                    <span className="text-gray-700">60-minute comprehensive evaluation</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" aria-hidden="true" />
                    <span className="text-gray-700">Personalized treatment plan</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" aria-hidden="true" />
                    <span className="text-gray-700">Insurance verification included</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" aria-hidden="true" />
                    <span className="text-gray-700">No obligation to continue</span>
                  </li>
                </ul>
                <button
                  onClick={handleScheduleClick}
                  className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white hover:from-blue-700 hover:to-green-700 font-bold py-4 px-8 rounded-xl text-lg transition-all duration-200 flex items-center justify-center min-h-[56px] shadow-lg hover:shadow-xl"
                >
                  <Calendar className="w-5 h-5 mr-3" aria-hidden="true" />
                  Book Your Appointment
                  <ArrowRight className="w-5 h-5 ml-3" aria-hidden="true" />
                </button>
                <p className="text-xs text-gray-500 mt-3">Available same-day appointments</p>
              </div>
            </div>

            {/* Call Button */}
            <div className="bg-white rounded-2xl p-8 text-gray-900 shadow-2xl hover:shadow-3xl transition-shadow duration-300">
              <div className="text-center">
                <Phone className="w-12 h-12 text-green-600 mx-auto mb-4" aria-hidden="true" />
                <h3 className="text-2xl font-bold mb-3">Call Now for Immediate Help</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Speak directly with our patient care specialists about your specific needs
                </p>
                <ul className="text-left space-y-2 mb-8">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" aria-hidden="true" />
                    <span className="text-gray-700">Immediate phone appointment scheduling</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" aria-hidden="true" />
                    <span className="text-gray-700">Insurance verification over phone</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" aria-hidden="true" />
                    <span className="text-gray-700">Emergency same-day appointments</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" aria-hidden="true" />
                    <span className="text-gray-700">Immediate symptom assessment</span>
                  </li>
                </ul>
                <MobileVoiceCallButton
                  onClick={handlePhoneClick}
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white hover:from-green-700 hover:to-blue-700 font-bold py-4 px-8 rounded-xl text-lg transition-all duration-200 flex items-center justify-center min-h-[56px] shadow-lg hover:shadow-xl"
                  fullWidth
                  size="large"
                >
                  <Phone className="w-5 h-5 mr-3" aria-hidden="true" />
                  (858) 555-0123
                </MobileVoiceCallButton>
                <p className="text-xs text-gray-500 mt-3">Mon-Fri: 8AM-6PM | Weekends: Emergency Only</p>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <p className="text-white/90 mb-4 text-lg">
              <strong>Ready to Start Your Healing Journey?</strong> Experience San Diego's most trusted physical therapy clinic 
              with 8 convenient locations throughout San Diego County. Advanced non-invasive treatment for spine, hip, knee, shoulder, and neck pain.
            </p>
            <p className="text-white/80 text-sm">
              ✅ Most insurance plans accepted • ✅ No referral needed • ✅ Same-day appointments • ✅ Easy appointment booking
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}