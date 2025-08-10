'use client';

import { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, User, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';

interface CalendlyWidgetProps {
  serviceType?: 'consultation' | 'assessment' | 'treatment' | 'followup';
  preferredLocation?: string;
  className?: string;
  onBookingComplete?: (bookingData: any) => void;
}

interface TimeSlot {
  time: string;
  display: string;
  available: boolean;
  provider?: string;
}

interface CalendarDay {
  date: Date;
  dayNumber: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  hasAvailability: boolean;
  slots: TimeSlot[];
}

const DEMO_PROVIDERS = [
  { id: 'sarah-smith', name: 'Dr. Sarah Smith, PT, DPT', specialties: ['Spine Care', 'Sports Medicine'] },
  { id: 'michael-jones', name: 'Dr. Michael Jones, PT, DPT', specialties: ['Orthopedic', 'Manual Therapy'] },
  { id: 'lisa-williams', name: 'Dr. Lisa Williams, PT, DPT', specialties: ['Neurological', 'Balance'] },
  { id: 'david-brown', name: 'Dr. David Brown, PT, DPT', specialties: ['Spine Care', 'Dry Needling'] }
];

const DEMO_LOCATIONS = [
  { id: 'downtown', name: 'Downtown San Diego', address: '1234 Healing Way, San Diego, CA 92101' },
  { id: 'la-jolla', name: 'La Jolla', address: '5678 Wellness Blvd, La Jolla, CA 92037' },
  { id: 'pacific-beach', name: 'Pacific Beach', address: '910 Recovery Ave, Pacific Beach, CA 92109' },
  { id: 'hillcrest', name: 'Hillcrest', address: '1122 Therapy St, Hillcrest, CA 92103' }
];

const SERVICE_TYPES = {
  consultation: { name: 'Free Consultation', duration: '30 minutes', color: 'blue' },
  assessment: { name: 'Comprehensive Assessment', duration: '60 minutes', color: 'green' },
  treatment: { name: 'Treatment Session', duration: '45 minutes', color: 'blue' },
  followup: { name: 'Follow-up Session', duration: '30 minutes', color: 'gray' }
};

export default function CalendlyWidget({ 
  serviceType = 'consultation', 
  preferredLocation = 'downtown',
  className = '',
  onBookingComplete 
}: CalendlyWidgetProps) {
  const [currentView, setCurrentView] = useState<'calendar' | 'times' | 'form' | 'confirmation'>('calendar');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<TimeSlot | null>(null);
  const [selectedProvider, setSelectedProvider] = useState(DEMO_PROVIDERS[0]);
  const [selectedLocation, setSelectedLocation] = useState(
    DEMO_LOCATIONS.find(loc => loc.id === preferredLocation) || DEMO_LOCATIONS[0]
  );
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [bookingForm, setBookingForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    notes: ''
  });

  const service = SERVICE_TYPES[serviceType];

  // Generate demo calendar data
  const generateCalendarDays = (): CalendarDay[] => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days: CalendarDay[] = [];
    const today = new Date();

    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      
      const isCurrentMonth = date.getMonth() === month;
      const isToday = date.toDateString() === today.toDateString();
      const isFuture = date >= today;
      const isWeekend = date.getDay() === 0 || date.getDay() === 6;
      
      // Generate demo availability (skip weekends, random availability for weekdays)
      const hasAvailability = isCurrentMonth && isFuture && !isWeekend && Math.random() > 0.3;
      
      const slots: TimeSlot[] = hasAvailability ? generateTimeSlots(date) : [];

      days.push({
        date,
        dayNumber: date.getDate(),
        isCurrentMonth,
        isToday,
        isSelected: selectedDate?.toDateString() === date.toDateString(),
        hasAvailability,
        slots
      });
    }

    return days;
  };

  const generateTimeSlots = (date: Date): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    const availableSlots = [
      { time: '09:00', display: '9:00 AM' },
      { time: '10:00', display: '10:00 AM' },
      { time: '11:00', display: '11:00 AM' },
      { time: '13:00', display: '1:00 PM' },
      { time: '14:00', display: '2:00 PM' },
      { time: '15:00', display: '3:00 PM' },
      { time: '16:00', display: '4:00 PM' },
      { time: '17:00', display: '5:00 PM' }
    ];

    availableSlots.forEach(slot => {
      // Randomly make some slots unavailable for demo realism
      const available = Math.random() > 0.4;
      if (available || slots.length < 3) { // Ensure at least 3 slots per day
        slots.push({
          ...slot,
          available: true,
          provider: DEMO_PROVIDERS[Math.floor(Math.random() * DEMO_PROVIDERS.length)].name
        });
      }
    });

    return slots.slice(0, 6); // Limit to 6 slots per day
  };

  const calendarDays = generateCalendarDays();

  const handleDateSelect = (day: CalendarDay) => {
    if (day.hasAvailability && day.isCurrentMonth) {
      setSelectedDate(day.date);
      setCurrentView('times');
    }
  };

  const handleTimeSelect = (slot: TimeSlot) => {
    setSelectedTime(slot);
    setCurrentView('form');
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Demo booking confirmation
    console.log('📅 CALENDLY DEMO BOOKING CONFIRMED:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`Service: ${service.name}`);
    console.log(`Date: ${selectedDate?.toLocaleDateString()}`);
    console.log(`Time: ${selectedTime?.display}`);
    console.log(`Duration: ${service.duration}`);
    console.log(`Provider: ${selectedProvider.name}`);
    console.log(`Location: ${selectedLocation.name}`);
    console.log(`Patient: ${bookingForm.firstName} ${bookingForm.lastName}`);
    console.log(`Email: ${bookingForm.email}`);
    console.log(`Phone: ${bookingForm.phone}`);
    if (bookingForm.notes) {
      console.log(`Notes: ${bookingForm.notes}`);
    }
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✅ Confirmation email would be sent to patient');
    console.log('📱 SMS reminder would be sent 24 hours before appointment');
    console.log('🏥 Calendar invitation would be sent to patient and provider');
    
    if (onBookingComplete) {
      onBookingComplete({
        service: service.name,
        date: selectedDate,
        time: selectedTime?.display,
        provider: selectedProvider.name,
        location: selectedLocation.name,
        patient: bookingForm
      });
    }
    
    setCurrentView('confirmation');
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  return (
    <div className={`bg-white rounded-xl shadow-lg max-w-2xl mx-auto ${className}`}>
      {/* Header */}
      <div className="border-b border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900">{service.name}</h3>
            <p className="text-sm text-gray-600">{service.duration} • {selectedLocation.name}</p>
          </div>
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            service.color === 'blue' ? 'bg-blue-100 text-blue-800' :
            service.color === 'green' ? 'bg-green-100 text-green-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {serviceType === 'consultation' ? 'FREE' : 'Covered by Insurance'}
          </div>
        </div>
        
        {/* Progress indicator */}
        <div className="mt-4 flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${currentView === 'calendar' ? 'bg-blue-600' : 'bg-gray-300'}`} />
          <div className={`w-3 h-3 rounded-full ${currentView === 'times' ? 'bg-blue-600' : 'bg-gray-300'}`} />
          <div className={`w-3 h-3 rounded-full ${currentView === 'form' ? 'bg-blue-600' : 'bg-gray-300'}`} />
          <div className={`w-3 h-3 rounded-full ${currentView === 'confirmation' ? 'bg-green-600' : 'bg-gray-300'}`} />
        </div>
      </div>

      <div className="p-6">
        {/* Calendar View */}
        {currentView === 'calendar' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-lg font-semibold text-gray-900">Select Date</h4>
              <div className="flex items-center space-x-2">
                <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-lg">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-lg font-medium">
                  {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </span>
                <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-lg">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="p-2 text-center text-sm font-medium text-gray-600">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((day, index) => (
                <button
                  key={index}
                  onClick={() => handleDateSelect(day)}
                  disabled={!day.hasAvailability || !day.isCurrentMonth}
                  className={`
                    aspect-square flex items-center justify-center text-sm relative rounded-lg
                    ${day.isCurrentMonth 
                      ? day.hasAvailability 
                        ? 'hover:bg-blue-50 cursor-pointer text-gray-900' 
                        : 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-300 cursor-not-allowed'
                    }
                    ${day.isToday ? 'bg-blue-100 font-semibold' : ''}
                    ${day.isSelected ? 'bg-blue-600 text-white' : ''}
                  `}
                >
                  {day.dayNumber}
                  {day.hasAvailability && (
                    <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-green-500 rounded-full" />
                  )}
                </button>
              ))}
            </div>

            <div className="mt-4 flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                Available appointments
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-gray-300 rounded-full mr-2" />
                No availability
              </div>
            </div>
          </div>
        )}

        {/* Time Selection View */}
        {currentView === 'times' && selectedDate && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-900">Select Time</h4>
                <p className="text-sm text-gray-600">
                  {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </p>
              </div>
              <button 
                onClick={() => setCurrentView('calendar')}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Change Date
              </button>
            </div>

            <div className="space-y-3">
              {calendarDays
                .find(day => day.date.toDateString() === selectedDate.toDateString())
                ?.slots.map((slot, index) => (
                <button
                  key={index}
                  onClick={() => handleTimeSelect(slot)}
                  className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                >
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 text-gray-500 mr-3" />
                    <div className="text-left">
                      <div className="font-medium text-gray-900">{slot.display}</div>
                      <div className="text-sm text-gray-600">{service.duration}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">with</div>
                    <div className="text-sm font-medium text-gray-900">{slot.provider}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Form View */}
        {currentView === 'form' && selectedDate && selectedTime && (
          <div>
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Booking Details</h4>
              <div className="bg-blue-50 rounded-lg p-4 space-y-2">
                <div className="flex items-center text-sm">
                  <Calendar className="w-4 h-4 text-blue-600 mr-2" />
                  {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                  at {selectedTime.display}
                </div>
                <div className="flex items-center text-sm">
                  <Clock className="w-4 h-4 text-blue-600 mr-2" />
                  {service.duration}
                </div>
                <div className="flex items-center text-sm">
                  <MapPin className="w-4 h-4 text-blue-600 mr-2" />
                  {selectedLocation.name}
                </div>
                <div className="flex items-center text-sm">
                  <User className="w-4 h-4 text-blue-600 mr-2" />
                  {selectedTime.provider}
                </div>
              </div>
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={bookingForm.firstName}
                    onChange={(e) => setBookingForm({ ...bookingForm, firstName: e.target.value })}
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
                    value={bookingForm.lastName}
                    onChange={(e) => setBookingForm({ ...bookingForm, lastName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={bookingForm.email}
                  onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
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
                  value={bookingForm.phone}
                  onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Notes (Optional)
                </label>
                <textarea
                  rows={3}
                  value={bookingForm.notes}
                  onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  placeholder="Tell us about your condition or any special requirements..."
                />
              </div>

              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setCurrentView('times')}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Confirmation View */}
        {currentView === 'confirmation' && (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            
            <h4 className="text-xl font-bold text-gray-900 mb-2">Booking Confirmed!</h4>
            <p className="text-gray-600 mb-6">
              Your appointment has been successfully scheduled. You'll receive a confirmation email shortly.
            </p>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 text-left">
              <h5 className="font-semibold text-green-800 mb-3">Appointment Details:</h5>
              <div className="space-y-2 text-sm">
                <div><strong>Service:</strong> {service.name}</div>
                <div><strong>Date:</strong> {selectedDate?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</div>
                <div><strong>Time:</strong> {selectedTime?.display}</div>
                <div><strong>Duration:</strong> {service.duration}</div>
                <div><strong>Provider:</strong> {selectedTime?.provider}</div>
                <div><strong>Location:</strong> {selectedLocation.name}</div>
                <div><strong>Patient:</strong> {bookingForm.firstName} {bookingForm.lastName}</div>
              </div>
            </div>

            <div className="text-sm text-gray-600 mb-6">
              <p className="mb-2">📧 Confirmation email sent to {bookingForm.email}</p>
              <p className="mb-2">📱 SMS reminder will be sent to {bookingForm.phone}</p>
              <p>📅 Calendar invitation attached to confirmation email</p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
              <p className="font-medium mb-2">What to bring to your appointment:</p>
              <ul className="text-left space-y-1">
                <li>• Valid photo ID</li>
                <li>• Insurance card (if applicable)</li>
                <li>• List of current medications</li>
                <li>• Previous imaging results (if available)</li>
                <li>• Comfortable clothing for movement assessment</li>
              </ul>
            </div>

            <div className="mt-6 text-sm text-gray-500">
              <p>Need to reschedule? Reply to your confirmation email or call (858) 555-0123</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}