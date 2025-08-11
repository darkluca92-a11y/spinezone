'use client';

import { MapPin, Clock, Phone, Mail, Search, Star, ExternalLink, Calendar } from 'lucide-react';
import { useState } from 'react';
import Head from 'next/head';
import InteractiveMap, { LocationDetailsCard } from '@/components/InteractiveMap';
import LocationAppointmentForm from '@/components/LocationAppointmentForm';

const clinicLocations = [
  {
    id: 1,
    name: "SpineZone Carlsbad",
    address: "6005 Hidden Valley Rd Suite 100, Carlsbad, CA 92011",
    phone: "(760) 517-7165",
    zipCode: "92011",
    city: "Carlsbad",
    hours: {
      monday: "9:00 AM - 6:00 PM",
      tuesday: "7:00 AM - 4:00 PM", 
      wednesday: "9:00 AM - 6:00 PM",
      thursday: "7:00 AM - 4:00 PM",
      friday: "7:00 AM - 4:00 PM",
      saturday: "Closed",
      sunday: "Closed"
    },
    yelp: "https://www.yelp.com/biz/spinezone-oceanside",
    coordinates: { lat: 33.1280, lng: -117.3197 }
  },
  {
    id: 2,
    name: "SpineZone Del Mar",
    address: "12865 Pointe Del Mar Way Suite 190, Del Mar, CA 92014",
    phone: "(858) 704-2713",
    zipCode: "92014",
    city: "Del Mar",
    hours: {
      monday: "7:00 AM - 5:30 PM",
      tuesday: "7:00 AM - 5:30 PM",
      wednesday: "7:00 AM - 5:30 PM", 
      thursday: "7:00 AM - 5:30 PM",
      friday: "7:00 AM - 6:00 PM",
      saturday: "Closed",
      sunday: "Closed"
    },
    yelp: "http://www.yelp.com/biz/spinezone-del-mar-del-mar",
    coordinates: { lat: 32.9595, lng: -117.2661 }
  },
  {
    id: 3,
    name: "SpineZone Grossmont",
    address: "8866 Navajo Rd, San Diego, CA 92119",
    phone: "(619) 771-1030",
    zipCode: "92119",
    city: "San Diego",
    hours: {
      monday: "7:00 AM - 4:00 PM",
      tuesday: "9:00 AM - 6:00 PM",
      wednesday: "7:00 AM - 4:00 PM",
      thursday: "9:00 AM - 6:00 PM", 
      friday: "7:00 AM - 4:00 PM",
      saturday: "Closed",
      sunday: "Closed"
    },
    yelp: "http://www.yelp.com/biz/spinezone-la-mesa-la-mesa-3",
    coordinates: { lat: 32.7738, lng: -117.0431 }
  },
  {
    id: 4,
    name: "SpineZone Lake Forest",
    address: "23161 Lake Center Dr Suite 120, Lake Forest, CA 92630",
    phone: "(949) 676-9226",
    zipCode: "92630",
    city: "Lake Forest",
    hours: {
      monday: "Closed",
      tuesday: "9:00 AM - 6:00 PM",
      wednesday: "7:00 AM - 4:00 PM",
      thursday: "9:00 AM - 6:00 PM",
      friday: "7:00 AM - 4:00 PM",
      saturday: "Closed", 
      sunday: "Closed"
    },
    yelp: null,
    coordinates: { lat: 33.6472, lng: -117.6931 }
  },
  {
    id: 5,
    name: "SpineZone Mission Valley",
    address: "7525 Metropolitan Dr Suite 306, San Diego, CA 92108",
    phone: "(619) 693-3973",
    zipCode: "92108",
    city: "San Diego",
    hours: {
      monday: "8:00 AM - 5:00 PM",
      tuesday: "8:00 AM - 5:00 PM",
      wednesday: "8:00 AM - 5:00 PM",
      thursday: "8:00 AM - 5:00 PM",
      friday: "8:00 AM - 5:00 PM",
      saturday: "Closed",
      sunday: "Closed"
    },
    yelp: "http://www.yelp.com/biz/spinezone-mission-valley-san-diego",
    coordinates: { lat: 32.7683, lng: -117.1566 }
  },
  {
    id: 6,
    name: "SpineZone Rancho Bernardo", 
    address: "11838 Bernardo Plaza Ct Suite 101, San Diego, CA 92128",
    phone: "(858) 381-3858",
    zipCode: "92128",
    city: "San Diego",
    hours: {
      monday: "7:00 AM - 6:00 PM",
      tuesday: "7:00 AM - 4:00 PM",
      wednesday: "7:00 AM - 6:00 PM",
      thursday: "7:00 AM - 4:00 PM",
      friday: "7:00 AM - 4:00 PM",
      saturday: "Closed",
      sunday: "Closed"
    },
    yelp: "https://www.yelp.com/biz/spinezone-san-diego-9",
    coordinates: { lat: 33.0208, lng: -117.1106 }
  },
  {
    id: 7,
    name: "SpineZone San Marcos",
    address: "405 N Twin Oaks Valley Rd Suite 111, San Marcos, CA 92069",
    phone: "(760) 653-2683",
    zipCode: "92069", 
    city: "San Marcos",
    hours: {
      monday: "9:00 AM - 6:00 PM",
      tuesday: "7:00 AM - 4:00 PM",
      wednesday: "7:00 AM - 4:00 PM",
      thursday: "9:00 AM - 6:00 PM",
      friday: "7:00 AM - 4:00 PM",
      saturday: "Closed",
      sunday: "Closed"
    },
    yelp: "https://www.yelp.com/biz/spinezone-san-marcos",
    coordinates: { lat: 33.1434, lng: -117.1661 }
  },
  {
    id: 8,
    name: "SpineZone Santa Ana",
    address: "400 N Tustin Ave Suite 140, Santa Ana, CA 92705",
    phone: "(657) 284-1399",
    zipCode: "92705",
    city: "Santa Ana",
    hours: {
      monday: "7:00 AM - 7:00 PM",
      tuesday: "7:00 AM - 7:00 PM",
      wednesday: "7:00 AM - 7:00 PM", 
      thursday: "7:00 AM - 7:00 PM",
      friday: "7:00 AM - 7:00 PM",
      saturday: "Closed",
      sunday: "Closed"
    },
    yelp: "https://www.yelp.com/biz/spinezone-santa-ana-santa-ana-3",
    coordinates: { lat: 33.7528, lng: -117.8672 }
  }
];

export default function LocationsPage() {
  const [submissionStates, setSubmissionStates] = useState<{[key: number]: {isSubmitting: boolean, message: string}}>({});
  const [searchZip, setSearchZip] = useState('');
  const [filteredLocations, setFilteredLocations] = useState(clinicLocations);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  
  const handleLocationSelect = (location: any) => {
    setSelectedLocation(location);
    // Smooth scroll to location details
    const element = document.getElementById('location-details');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleZipSearch = (zipCode: string) => {
    setSearchZip(zipCode);
    if (!zipCode.trim()) {
      setFilteredLocations(clinicLocations);
      return;
    }
    
    // Filter by exact zip match or partial match
    const filtered = clinicLocations.filter(clinic => 
      clinic.zipCode.includes(zipCode.trim())
    );
    setFilteredLocations(filtered);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>, clinicId: number) => {
    e.preventDefault();
    setSubmissionStates(prev => ({ ...prev, [clinicId]: { isSubmitting: true, message: '' }}));
    
    const formData = new FormData(e.currentTarget);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'clinic_contact',
          clinicId,
          name: formData.get('name'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          appointmentDate: formData.get('appointmentDate'),
          appointmentTime: formData.get('appointmentTime'),
          message: formData.get('message'),
        }),
      });
      
      if (response.ok) {
        setSubmissionStates(prev => ({ ...prev, [clinicId]: { isSubmitting: false, message: 'Thank you! Your appointment request has been submitted. We will contact you within 24 hours.' }}));
        (e.target as HTMLFormElement).reset();
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      setSubmissionStates(prev => ({ ...prev, [clinicId]: { isSubmitting: false, message: 'Sorry, there was an error submitting your request. Please call us directly.' }}));
    }
  };

  return (
    <>
      <Head>
        <title>SpineZone Locations - 8 Physical Therapy Clinics Across San Diego & Orange County</title>
        <meta name="description" content="Find a SpineZone physical therapy clinic near you. 8 convenient locations across San Diego and Orange County with expert spine specialists." />
        <meta name="keywords" content="SpineZone locations, San Diego physical therapy clinics, Orange County PT, spine treatment locations" />
        <meta property="og:title" content="SpineZone Locations - Physical Therapy Clinics" />
        <meta property="og:description" content="8 convenient SpineZone locations across San Diego and Orange County." />
        <link rel="canonical" href="https://spinezone-sandiego.com/locations" />
      </Head>
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-green-50 section-padding">
          <div className="container-max text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Find Your Nearest
              <span className="text-blue-600 block">SpineZone Location</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
              8 convenient clinic locations across San Diego and Orange County, each staffed with expert spine specialists ready to help you heal naturally.
            </p>
            
            {/* Zip Code Search */}
            <div className="max-w-md mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" aria-hidden="true" />
                <input
                  type="text"
                  placeholder="Search by ZIP code"
                  value={searchZip}
                  onChange={(e) => handleZipSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              {searchZip && filteredLocations.length === 0 && (
                <p className="text-red-600 text-sm mt-2">No locations found for ZIP code "{searchZip}". Showing all locations.</p>
              )}
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-blue-600 mb-1">8</div>
                <div className="text-sm text-gray-600">Clinic Locations</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-green-600 mb-1">6 Days</div>
                <div className="text-sm text-gray-600">Extended Hours</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-blue-600 mb-1">24hr</div>
                <div className="text-sm text-gray-600">Response Time</div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Map Section */}
        <section className="bg-white section-padding">
          <div className="container-max">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Interactive Clinic Map
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Explore our locations across San Diego and Orange County
              </p>
            </div>

            {/* Interactive Google Maps */}
            <div className="grid lg:grid-cols-3 gap-8 mb-12">
              <div className="lg:col-span-2">
                <InteractiveMap
                  locations={filteredLocations}
                  selectedLocationId={selectedLocation?.id}
                  onLocationSelect={handleLocationSelect}
                  className="h-96 lg:h-[500px]"
                />
              </div>
              
              <div id="location-details" className="lg:col-span-1">
                {selectedLocation ? (
                  <LocationDetailsCard location={selectedLocation} />
                ) : (
                  <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Select a Location
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Click on any marker on the map to view clinic details, hours, and get directions.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Clinic Locations Grid */}
        <section className="bg-gray-50 section-padding">
          <div className="container-max">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                All Clinic Locations
              </h2>
              <p className="text-xl text-gray-600">
                Choose your preferred location and schedule your appointment
              </p>
              {searchZip && filteredLocations.length > 0 && (
                <p className="text-blue-600 mt-2">
                  Showing {filteredLocations.length} location{filteredLocations.length !== 1 ? 's' : ''} for ZIP code "{searchZip}"
                </p>
              )}
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {(searchZip ? filteredLocations : clinicLocations).map((clinic) => {
                const clinicState = submissionStates[clinic.id] || { isSubmitting: false, message: '' };
                return (
                  <div key={clinic.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                    <div className="p-8">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-2xl font-bold text-gray-900">{clinic.name}</h3>
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                          {clinic.zipCode}
                        </span>
                      </div>
                      
                      {/* Address and Contact Info */}
                      <div className="space-y-3 mb-6">
                        <div className="flex items-start">
                          <MapPin className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" aria-hidden="true" />
                          <address className="text-gray-700 not-italic">{clinic.address}</address>
                        </div>
                        
                        <div className="flex items-center">
                          <Phone className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" aria-hidden="true" />
                          <a 
                            href={`tel:${clinic.phone}`}
                            className="text-green-600 hover:text-green-700 font-semibold"
                          >
                            {clinic.phone}
                          </a>
                        </div>
                        
                        {clinic.yelp && (
                          <div className="flex items-center">
                            <Star className="w-5 h-5 text-yellow-500 mr-3 flex-shrink-0" aria-hidden="true" />
                            <a 
                              href={clinic.yelp}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-700 font-semibold flex items-center"
                            >
                              View Yelp Reviews
                              <ExternalLink className="w-4 h-4 ml-1" aria-hidden="true" />
                            </a>
                          </div>
                        )}
                        
                        <div className="flex items-start">
                          <Clock className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" aria-hidden="true" />
                          <div className="text-gray-700">
                            <div className="grid grid-cols-2 gap-x-4 text-sm">
                              <div>Monday: {clinic.hours.monday}</div>
                              <div>Thursday: {clinic.hours.thursday}</div>
                              <div>Tuesday: {clinic.hours.tuesday}</div>
                              <div>Friday: {clinic.hours.friday}</div>
                              <div>Wednesday: {clinic.hours.wednesday}</div>
                              <div className="col-span-2 mt-1">
                                <strong>Weekend:</strong> {clinic.hours.saturday} / {clinic.hours.sunday}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Contact Form */}
                      <div className="bg-gray-50 p-6 rounded-lg">
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Schedule an Appointment</h4>
                        <form onSubmit={(e) => handleFormSubmit(e, clinic.id)} className="space-y-4">
                          <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                              <label htmlFor={`name-${clinic.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                                Name *
                              </label>
                              <input
                                type="text"
                                name="name"
                                id={`name-${clinic.id}`}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>
                            <div>
                              <label htmlFor={`email-${clinic.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                                Email *
                              </label>
                              <input
                                type="email"
                                name="email"
                                id={`email-${clinic.id}`}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label htmlFor={`phone-${clinic.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                              Phone
                            </label>
                            <input
                              type="tel"
                              name="phone"
                              id={`phone-${clinic.id}`}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                          
                          <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                              <label htmlFor={`date-${clinic.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                                Preferred Date
                              </label>
                              <input
                                type="date"
                                name="appointmentDate"
                                id={`date-${clinic.id}`}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>
                            <div>
                              <label htmlFor={`time-${clinic.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                                Preferred Time
                              </label>
                              <select
                                name="appointmentTime"
                                id={`time-${clinic.id}`}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              >
                                <option value="">Select Time</option>
                                <option value="morning">Morning (7AM-11AM)</option>
                                <option value="afternoon">Afternoon (12PM-4PM)</option>
                                <option value="evening">Evening (5PM-7PM)</option>
                              </select>
                            </div>
                          </div>
                          
                          <div>
                            <label htmlFor={`message-${clinic.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                              Message
                            </label>
                            <textarea
                              name="message"
                              id={`message-${clinic.id}`}
                              rows={3}
                              placeholder="Tell us about your pain or condition..."
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                            />
                          </div>
                          
                          <button
                            type="submit"
                            className={`btn-primary w-full ${clinicState.isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={clinicState.isSubmitting}
                            aria-label={clinicState.isSubmitting ? 'Submitting request...' : 'Request appointment'}
                          >
                            {clinicState.isSubmitting ? 'Submitting...' : 'Request Appointment'}
                          </button>
                        </form>
                        
                        {/* Form Status Message */}
                        {clinicState.message && (
                          <div className={`mt-4 p-3 rounded-lg ${
                            clinicState.message.includes('Thank you') 
                              ? 'bg-green-50 border border-green-200 text-green-800'
                              : 'bg-red-50 border border-red-200 text-red-800'
                          }`}>
                            <p className="text-sm">{clinicState.message}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Show all locations button when filtered */}
            {searchZip && (
              <div className="text-center mt-12">
                <button 
                  onClick={() => {
                    setSearchZip('');
                    setFilteredLocations(clinicLocations);
                  }}
                  className="btn-secondary"
                >
                  Show All Locations
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Location-Specific Booking Forms */}
        <section className="bg-white section-padding">
          <div className="container-max">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Book at Your Preferred Location
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Select a location below to book your appointment with location-specific scheduling, directions, and parking information.
              </p>
            </div>

            <div className="space-y-12">
              {clinicLocations.slice(0, 5).map((location) => (
                <div key={location.id} id={`booking-location-${location.id}`} className="scroll-mt-24">
                  <LocationAppointmentForm
                    locationId={location.name.toLowerCase().replace('spinezone ', '').replace(/\s+/g, '-')}
                    locationName={location.name}
                    locationAddress={location.address}
                    locationPhone={location.phone}
                    className="max-w-4xl mx-auto"
                  />
                </div>
              ))}
            </div>

            {/* Additional Locations Info */}
            <div className="mt-16 bg-blue-50 rounded-2xl p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">More Locations Available</h3>
                <p className="text-gray-600">
                  We have additional locations throughout San Diego County. Contact us to find the most convenient location for you.
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-8 h-8 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">10+ Locations</h4>
                  <p className="text-sm text-gray-600">Convenient locations across San Diego and Orange County</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Flexible Scheduling</h4>
                  <p className="text-sm text-gray-600">Extended hours and weekend appointments available</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Phone className="w-8 h-8 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Personal Service</h4>
                  <p className="text-sm text-gray-600">Dedicated location coordinators to assist with your needs</p>
                </div>
              </div>
              
              <div className="text-center mt-6">
                <a
                  href="tel:+1-858-555-0123"
                  className="bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call for Location Assistance
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-green-600 section-padding text-white">
          <div className="container-max text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Can't Find a Convenient Location?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              We're rapidly expanding across Southern California. Contact us to learn about upcoming locations or explore our online therapy programs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg text-lg transition-colors duration-200">
                Explore Online Programs
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}