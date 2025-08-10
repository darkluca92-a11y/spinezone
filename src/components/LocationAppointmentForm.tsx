'use client';

import { useState } from 'react';
import { 
  MapPin, 
  Clock, 
  Car, 
  Phone, 
  CheckCircle, 
  AlertCircle, 
  Loader2,
  Navigation
} from 'lucide-react';
import { handleLocationAppointment } from '@/lib/appointment-handlers';

interface LocationAppointmentFormProps {
  locationId: string;
  locationName: string;
  locationAddress: string;
  locationPhone?: string;
  availableServices?: string[];
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
  className?: string;
}

const LOCATION_INFO = {
  'downtown-san-diego': {
    features: ['Full service clinic', 'Parking available', 'Public transit accessible', 'Wheelchair accessible'],
    specialties: ['Spine care', 'Sports medicine', 'Manual therapy'],
    hours: 'Mon-Fri: 7AM-8PM, Sat: 8AM-5PM',
    parking: true,
    publicTransit: true
  },
  'la-jolla': {
    features: ['Specialized spine center', 'Free parking', 'Ocean view facility', 'Premium amenities'],
    specialties: ['Advanced spine treatment', 'Dry needling', 'Aquatic therapy'],
    hours: 'Mon-Fri: 7AM-7PM, Sat: 8AM-4PM',
    parking: true,
    publicTransit: false
  },
  'pacific-beach': {
    features: ['Beachside location', 'Sports medicine focus', 'Street parking', 'Bike-friendly'],
    specialties: ['Sports injuries', 'Surfing injuries', 'Beach volleyball therapy'],
    hours: 'Mon-Fri: 6AM-7PM, Sat: 7AM-3PM',
    parking: false,
    publicTransit: true
  },
  'hillcrest': {
    features: ['Central location', 'Medical district', 'Validated parking', 'Easy freeway access'],
    specialties: ['Geriatric care', 'Chronic pain', 'Post-surgical rehab'],
    hours: 'Mon-Fri: 8AM-6PM, Sat: 9AM-2PM',
    parking: true,
    publicTransit: true
  },
  'mission-valley': {
    features: ['Shopping center location', 'Ample parking', 'Family-friendly', 'Extended hours'],
    specialties: ['Family care', 'Pediatric therapy', 'Women\'s health'],
    hours: 'Mon-Fri: 7AM-9PM, Sat: 8AM-6PM, Sun: 10AM-4PM',
    parking: true,
    publicTransit: true
  }
};

export default function LocationAppointmentForm({
  locationId,
  locationName,
  locationAddress,
  locationPhone = '(858) 555-0123',
  availableServices = [],
  onSuccess,
  onError,
  className = ''
}: LocationAppointmentFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specificLocation: locationName,
    providerRequest: '',
    appointmentType: 'consultation',
    travelDistance: 'less-than-5',
    transportationMethod: 'driving',
    parkingNeeds: false,
    preferredDate: '',
    preferredTime: ''
  });

  const locationInfo = LOCATION_INFO[locationId as keyof typeof LOCATION_INFO] || LOCATION_INFO['downtown-san-diego'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        form.append(key, value.toString());
      });

      const result = await handleLocationAppointment(form);
      
      if (result.success) {
        setSubmitMessage(`Appointment successfully booked at ${locationName}! Our team will contact you within 24 hours with detailed directions and parking information.`);
        if (onSuccess) onSuccess(result.data);
      } else {
        setSubmitMessage(result.error?.message || 'Unable to book appointment. Please try again.');
        if (onError) onError(result.error?.message || 'Booking failed');
      }
    } catch (error) {
      const errorMsg = `Error booking appointment at ${locationName}. Please call ${locationPhone}.`;
      setSubmitMessage(errorMsg);
      if (onError) onError(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`bg-white rounded-xl shadow-lg overflow-hidden ${className}`}>
      {/* Location Header */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2">{locationName}</h3>
            <div className="flex items-start mb-3">
              <MapPin className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-sm opacity-90">{locationAddress}</span>
            </div>
            <div className="flex items-center mb-3">
              <Clock className="w-5 h-5 mr-2" />
              <span className="text-sm opacity-90">{locationInfo.hours}</span>
            </div>
            <div className="flex items-center">
              <Phone className="w-5 h-5 mr-2" />
              <span className="text-sm opacity-90">{locationPhone}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Location Features */}
      <div className="p-6 bg-gray-50 border-b">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Location Features:</h4>
            <ul className="space-y-2">
              {locationInfo.features.map((feature, index) => (
                <li key={index} className="flex items-center text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Specialties:</h4>
            <ul className="space-y-2">
              {locationInfo.specialties.map((specialty, index) => (
                <li key={index} className="flex items-center text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0" />
                  {specialty}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Booking Form */}
      <div className="p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">
          Book Appointment at {locationName}
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
              Appointment Type *
            </label>
            <select
              value={formData.appointmentType}
              onChange={(e) => setFormData({ ...formData, appointmentType: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="consultation">Free Consultation</option>
              <option value="assessment">Comprehensive Assessment</option>
              <option value="treatment">Treatment Session</option>
              <option value="followup">Follow-up Appointment</option>
              <option value="urgent">Urgent Care</option>
            </select>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                How far will you travel? *
              </label>
              <select
                value={formData.travelDistance}
                onChange={(e) => setFormData({ ...formData, travelDistance: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="less-than-5">Less than 5 miles</option>
                <option value="5-to-10">5-10 miles</option>
                <option value="10-to-20">10-20 miles</option>
                <option value="more-than-20">More than 20 miles</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                How will you get here? *
              </label>
              <select
                value={formData.transportationMethod}
                onChange={(e) => setFormData({ ...formData, transportationMethod: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="driving">Driving</option>
                <option value="public-transport">Public Transportation</option>
                <option value="walking">Walking</option>
                <option value="ride-share">Uber/Lyft</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          {locationInfo.parking && (
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.parkingNeeds}
                  onChange={(e) => setFormData({ ...formData, parkingNeeds: e.target.checked })}
                  className="mr-2"
                />
                <Car className="w-4 h-4 mr-2 text-blue-600" />
                I need parking assistance or have special parking requirements
              </label>
            </div>
          )}

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
                Preferred Time
              </label>
              <input
                type="time"
                value={formData.preferredTime}
                onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Specific Provider Request (Optional)
            </label>
            <input
              type="text"
              value={formData.providerRequest}
              onChange={(e) => setFormData({ ...formData, providerRequest: e.target.value })}
              placeholder="e.g., Dr. Smith, or request male/female provider"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Transportation/Access Information */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h5 className="font-semibold text-blue-800 mb-2 flex items-center">
              <Navigation className="w-4 h-4 mr-2" />
              Getting to {locationName}
            </h5>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-700">
              <div>
                <strong>Parking:</strong> {locationInfo.parking ? 'Available' : 'Street parking only'}
              </div>
              <div>
                <strong>Public Transit:</strong> {locationInfo.publicTransit ? 'Accessible' : 'Limited options'}
              </div>
            </div>
            <p className="text-xs text-blue-600 mt-2">
              Detailed directions and parking information will be provided after booking confirmation.
            </p>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center ${
              isSubmitting
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Booking at {locationName}...
              </>
            ) : (
              <>
                <MapPin className="w-4 h-4 mr-2" />
                Book Appointment at {locationName}
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

        {/* Quick Actions */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={`tel:${locationPhone}`}
              className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center text-sm"
            >
              <Phone className="w-4 h-4 mr-2" />
              Call {locationName}
            </a>
            <button
              onClick={() => {
                console.log(`🗺️ DIRECTIONS REQUEST: ${locationName}`);
                console.log(`📍 Address: ${locationAddress}`);
                console.log('🚗 Providing navigation assistance');
                alert(`Directions to ${locationName}\n\n📍 ${locationAddress}\n\n${locationInfo.parking ? '🅿️ Parking available' : '🚗 Street parking only'}\n${locationInfo.publicTransit ? '🚌 Public transit accessible' : '🚗 Limited public transit'}\n\nDetailed directions with real-time traffic will be sent to your phone after booking.`);
              }}
              className="flex-1 border border-blue-600 text-blue-600 py-2 px-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center text-sm"
            >
              <Navigation className="w-4 h-4 mr-2" />
              Get Directions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}