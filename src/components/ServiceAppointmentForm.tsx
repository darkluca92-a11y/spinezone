'use client';

import { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Target, 
  CheckCircle, 
  AlertCircle, 
  Loader2, 
  Star,
  Zap,
  Heart
} from 'lucide-react';
import { handleServiceAppointment } from '@/lib/appointment-handlers';

interface ServiceAppointmentFormProps {
  serviceType: 'spinezone-strength' | 'intensive-program' | 'maintenance-program' | 'consultation-only' | 'assessment-only';
  serviceName: string;
  serviceDescription: string;
  duration?: string;
  sessions?: string;
  className?: string;
}

const SERVICE_INFO = {
  'spinezone-strength': {
    icon: Target,
    color: 'blue',
    features: [
      'Comprehensive pain elimination protocol',
      'Advanced manual therapy techniques',
      'Movement pattern correction',
      'Strength and conditioning integration',
      'Tailored for all ages and severity levels'
    ],
    successRate: '90% complete pain elimination'
  },
  'intensive-program': {
    icon: Zap,
    color: 'orange',
    features: [
      'Accelerated treatment protocols',
      'High-intensity rehabilitation',
      'Advanced conditioning techniques',
      'Rapid functional restoration',
      'Sport-specific preparation'
    ],
    successRate: '85% optimal conditioning achieved'
  },
  'maintenance-program': {
    icon: Heart,
    color: 'green',
    features: [
      'Preventive care protocols',
      'Maintenance strengthening',
      'Progress monitoring',
      'Lifestyle optimization',
      'Long-term wellness planning'
    ],
    successRate: '95% long-term success maintenance'
  },
  'consultation-only': {
    icon: CheckCircle,
    color: 'gray',
    features: [
      'Comprehensive evaluation',
      'Treatment plan discussion',
      'Second opinion consultation',
      'Insurance verification',
      'No treatment obligation'
    ],
    successRate: '100% personalized recommendations'
  },
  'assessment-only': {
    icon: Target,
    color: 'purple',
    features: [
      'Detailed pain assessment',
      'Movement analysis',
      'Functional testing',
      'Condition diagnosis',
      'Treatment recommendations'
    ],
    successRate: '100% accurate assessment'
  }
};

export default function ServiceAppointmentForm({
  serviceType,
  serviceName,
  serviceDescription,
  duration,
  sessions,
  className = ''
}: ServiceAppointmentFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    serviceType,
    conditionSeverity: 'moderate',
    treatmentGoals: [] as string[],
    previousExperience: 'never-had-pt',
    preferredDate: '',
    preferredTime: '',
    preferredLocation: 'downtown-san-diego',
    additionalInfo: ''
  });

  const serviceInfo = SERVICE_INFO[serviceType];
  const ServiceIcon = serviceInfo.icon;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'treatmentGoals') {
          (value as string[]).forEach(goal => form.append('treatmentGoals', goal));
        } else {
          form.append(key, value.toString());
        }
      });

      const result = await handleServiceAppointment(form);
      
      if (result.success) {
        setSubmitMessage(`${serviceName} appointment successfully booked! Our program coordinator will contact you within 24 hours.`);
        console.log(`${serviceName} appointment booked successfully:`, result.data);
      } else {
        setSubmitMessage(result.error?.message || 'Unable to book appointment. Please try again.');
        console.error('Service appointment booking error:', result.error?.message || 'Booking failed');
      }
    } catch (error) {
      const errorMsg = 'An error occurred while booking your appointment. Please call (858) 555-0123.';
      setSubmitMessage(errorMsg);
      console.error('Service appointment error:', errorMsg, error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoalToggle = (goal: string) => {
    setFormData(prev => ({
      ...prev,
      treatmentGoals: prev.treatmentGoals.includes(goal)
        ? prev.treatmentGoals.filter(g => g !== goal)
        : [...prev.treatmentGoals, goal]
    }));
  };

  return (
    <div className={`bg-white rounded-xl shadow-lg overflow-hidden ${className}`}>
      {/* Header */}
      <div className={`p-6 ${
        serviceInfo.color === 'blue' ? 'bg-blue-50 border-b border-blue-200' :
        serviceInfo.color === 'orange' ? 'bg-orange-50 border-b border-orange-200' :
        serviceInfo.color === 'green' ? 'bg-green-50 border-b border-green-200' :
        serviceInfo.color === 'purple' ? 'bg-purple-50 border-b border-purple-200' :
        'bg-gray-50 border-b border-gray-200'
      }`}>
        <div className="flex items-center mb-4">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
            serviceInfo.color === 'blue' ? 'bg-blue-100' :
            serviceInfo.color === 'orange' ? 'bg-orange-100' :
            serviceInfo.color === 'green' ? 'bg-green-100' :
            serviceInfo.color === 'purple' ? 'bg-purple-100' :
            'bg-gray-100'
          }`}>
            <ServiceIcon className={`w-6 h-6 ${
              serviceInfo.color === 'blue' ? 'text-blue-600' :
              serviceInfo.color === 'orange' ? 'text-orange-600' :
              serviceInfo.color === 'green' ? 'text-green-600' :
              serviceInfo.color === 'purple' ? 'text-purple-600' :
              'text-gray-600'
            }`} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">{serviceName}</h3>
            {duration && sessions && (
              <p className="text-sm text-gray-600">{duration} • {sessions}</p>
            )}
          </div>
        </div>
        
        <p className="text-gray-700 mb-4">{serviceDescription}</p>
        
        {/* Service Features */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Program Features:</h4>
            <ul className="space-y-1 text-sm">
              {serviceInfo.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className={`p-4 rounded-lg ${
              serviceInfo.color === 'blue' ? 'bg-blue-100' :
              serviceInfo.color === 'orange' ? 'bg-orange-100' :
              serviceInfo.color === 'green' ? 'bg-green-100' :
              serviceInfo.color === 'purple' ? 'bg-purple-100' :
              'bg-gray-100'
            }`}>
              <div className="flex items-center mb-2">
                <Star className={`w-5 h-5 mr-2 ${
                  serviceInfo.color === 'blue' ? 'text-blue-600' :
                  serviceInfo.color === 'orange' ? 'text-orange-600' :
                  serviceInfo.color === 'green' ? 'text-green-600' :
                  serviceInfo.color === 'purple' ? 'text-purple-600' :
                  'text-gray-600'
                }`} />
                <span className="font-semibold text-gray-900">Success Rate</span>
              </div>
              <p className={`text-lg font-bold ${
                serviceInfo.color === 'blue' ? 'text-blue-800' :
                serviceInfo.color === 'orange' ? 'text-orange-800' :
                serviceInfo.color === 'green' ? 'text-green-800' :
                serviceInfo.color === 'purple' ? 'text-purple-800' :
                'text-gray-800'
              }`}>
                {serviceInfo.successRate}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">
          Book Your {serviceName} Appointment
        </h4>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name *
              </label>
              <input
                type="text"
                required
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name *
              </label>
              <input
                type="text"
                required
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              How would you rate your condition severity?
            </label>
            <select
              value={formData.conditionSeverity}
              onChange={(e) => setFormData({ ...formData, conditionSeverity: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="mild">Mild - Minor discomfort, doesn't interfere with daily activities</option>
              <option value="moderate">Moderate - Noticeable pain, some activity limitations</option>
              <option value="severe">Severe - Significant pain, major activity restrictions</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Treatment Goals (Select all that apply) *
            </label>
            <div className="grid md:grid-cols-2 gap-2">
              {[
                { value: 'pain-elimination', label: 'Complete Pain Elimination' },
                { value: 'improved-mobility', label: 'Improved Mobility & Flexibility' },
                { value: 'strength-building', label: 'Strength Building' },
                { value: 'return-to-sports', label: 'Return to Sports/Athletics' },
                { value: 'daily-function', label: 'Better Daily Function' },
                { value: 'injury-prevention', label: 'Injury Prevention' }
              ].map((goal) => (
                <label key={goal.value} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.treatmentGoals.includes(goal.value)}
                    onChange={() => handleGoalToggle(goal.value)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">{goal.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Physical Therapy Experience
            </label>
            <select
              value={formData.previousExperience}
              onChange={(e) => setFormData({ ...formData, previousExperience: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="never-had-pt">Never had physical therapy</option>
              <option value="some-experience">Some experience with physical therapy</option>
              <option value="extensive-experience">Extensive physical therapy experience</option>
            </select>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Date *
              </label>
              <input
                type="date"
                required
                value={formData.preferredDate}
                onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Location *
              </label>
              <select
                value={formData.preferredLocation}
                onChange={(e) => setFormData({ ...formData, preferredLocation: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="downtown-san-diego">Downtown San Diego</option>
                <option value="la-jolla">La Jolla</option>
                <option value="pacific-beach">Pacific Beach</option>
                <option value="hillcrest">Hillcrest</option>
                <option value="mission-valley">Mission Valley</option>
                <option value="chula-vista">Chula Vista</option>
                <option value="carlsbad">Carlsbad</option>
                <option value="encinitas">Encinitas</option>
                <option value="del-mar">Del Mar</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Additional Information (Optional)
            </label>
            <textarea
              rows={3}
              value={formData.additionalInfo}
              onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
              placeholder="Tell us about your specific concerns, previous treatments, or special accommodations needed..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting || formData.treatmentGoals.length === 0}
            className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center ${
              isSubmitting || formData.treatmentGoals.length === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : `${
                    serviceInfo.color === 'blue' ? 'bg-blue-600 hover:bg-blue-700' :
                    serviceInfo.color === 'orange' ? 'bg-orange-600 hover:bg-orange-700' :
                    serviceInfo.color === 'green' ? 'bg-green-600 hover:bg-green-700' :
                    serviceInfo.color === 'purple' ? 'bg-purple-600 hover:bg-purple-700' :
                    'bg-gray-600 hover:bg-gray-700'
                  } text-white`
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Booking {serviceName}...
              </>
            ) : (
              <>
                <Calendar className="w-4 h-4 mr-2" />
                Book {serviceName} Appointment
              </>
            )}
          </button>

          {submitMessage && (
            <div className={`mt-4 p-4 rounded-lg ${
              submitMessage.includes('successfully')
                ? 'bg-green-50 border border-green-200 text-green-800'
                : 'bg-red-50 border border-red-200 text-red-800'
            }`}>
              <div className="flex items-center">
                {submitMessage.includes('successfully') ? (
                  <CheckCircle className="w-5 h-5 mr-2" />
                ) : (
                  <AlertCircle className="w-5 h-5 mr-2" />
                )}
                <p>{submitMessage}</p>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}