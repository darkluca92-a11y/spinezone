'use client';

import { Wrapper, Status } from '@googlemaps/react-wrapper';
import { useCallback, useRef, useEffect, useState, ReactElement, useMemo, memo } from 'react';
import { MapPin, Phone, Clock, ExternalLink } from 'lucide-react';

interface ClinicLocation {
  id: number;
  name: string;
  address: string;
  phone: string;
  coordinates: { lat: number; lng: number };
  hours: Record<string, string>;
  yelp?: string | null;
}

interface MapProps {
  center: { lat: number; lng: number };
  zoom: number;
  locations: ClinicLocation[];
  onLocationSelect?: (location: ClinicLocation) => void;
  selectedLocationId?: number;
}

interface MarkerProps {
  position: { lat: number; lng: number };
  map: any; // Use any instead of google.maps.Map for static export compatibility
  location: ClinicLocation;
  onClick?: (location: ClinicLocation) => void;
  isSelected?: boolean;
}

// Custom marker component
const Marker = memo(function Marker({ position, map, location, onClick, isSelected }: MarkerProps) {
  const [marker, setMarker] = useState<any>();

  useEffect(() => {
    if (!marker && typeof window !== 'undefined' && (window as any).google) {
      const google = (window as any).google;
      const newMarker = new google.maps.Marker({
        position,
        map,
        title: location.name,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: isSelected ? 12 : 8,
          fillColor: isSelected ? '#10B981' : '#3B82F6',
          fillOpacity: 1,
          strokeWeight: 2,
          strokeColor: '#ffffff',
        },
        animation: isSelected ? google.maps.Animation.BOUNCE : undefined,
      });

      // Create info window
      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div style="padding: 12px; max-width: 280px; font-family: system-ui, sans-serif;">
            <h3 style="margin: 0 0 8px 0; color: #1F2937; font-size: 16px; font-weight: 600;">
              ${location.name}
            </h3>
            <div style="color: #6B7280; font-size: 14px; margin-bottom: 8px;">
              <div style="display: flex; align-items: center; margin-bottom: 4px;">
                <svg width="16" height="16" style="margin-right: 6px;" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                </svg>
                ${location.address}
              </div>
              <div style="display: flex; align-items: center;">
                <svg width="16" height="16" style="margin-right: 6px;" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                ${location.phone}
              </div>
            </div>
            <button 
              onclick="window.dispatchEvent(new CustomEvent('selectClinic', { detail: ${location.id} }))"
              style="
                background: #3B82F6; 
                color: white; 
                border: none; 
                padding: 6px 12px; 
                border-radius: 6px; 
                font-size: 13px; 
                cursor: pointer;
                font-weight: 500;
              "
            >
              View Details
            </button>
          </div>
        `,
      });

      // Add click listener to marker
      newMarker.addListener('click', () => {
        infoWindow.open(map, newMarker);
        if (onClick) {
          onClick(location);
        }
      });

      setMarker(newMarker);
    }

    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker, position, map, location, onClick]);

  useEffect(() => {
    if (marker && typeof window !== 'undefined' && (window as any).google) {
      const google = (window as any).google;
      marker.setIcon({
        path: google.maps.SymbolPath.CIRCLE,
        scale: isSelected ? 12 : 8,
        fillColor: isSelected ? '#10B981' : '#3B82F6',
        fillOpacity: 1,
        strokeWeight: 2,
        strokeColor: '#ffffff',
      });
      
      if (isSelected) {
        marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(() => marker.setAnimation(null), 2000);
      }
    }
  }, [marker, isSelected]);

  return null;
});

// Main map component
const Map = memo(function Map({ center, zoom, locations, onLocationSelect, selectedLocationId }: MapProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>();

  useEffect(() => {
    if (ref.current && !map && typeof window !== 'undefined' && (window as any).google) {
      const google = (window as any).google;
      const newMap = new google.maps.Map(ref.current, {
        center,
        zoom,
        styles: [
          {
            featureType: 'poi.business',
            stylers: [{ visibility: 'off' }],
          },
          {
            featureType: 'poi.medical',
            stylers: [{ visibility: 'off' }],
          },
        ],
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
        zoomControl: true,
      });

      setMap(newMap);
    }
  }, [ref, map, center, zoom]);

  // Listen for custom clinic selection events
  useEffect(() => {
    const handleSelectClinic = (event: CustomEvent) => {
      const locationId = event.detail;
      const location = locations.find(loc => loc.id === locationId);
      if (location && onLocationSelect) {
        onLocationSelect(location);
      }
    };

    window.addEventListener('selectClinic', handleSelectClinic as EventListener);
    return () => {
      window.removeEventListener('selectClinic', handleSelectClinic as EventListener);
    };
  }, [locations, onLocationSelect]);

  return (
    <>
      <div ref={ref} style={{ width: '100%', height: '100%' }} />
      {map &&
        locations.map((location) => (
          <Marker
            key={location.id}
            position={location.coordinates}
            map={map}
            location={location}
            onClick={onLocationSelect}
            isSelected={selectedLocationId === location.id}
          />
        ))}
    </>
  );
});

// Render function for different loading states
function render(status: Status): ReactElement {
  switch (status) {
    case Status.LOADING:
      return (
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      );
    case Status.FAILURE:
      return (
        <div className="flex flex-col items-center justify-center h-full text-center p-6">
          <MapPin className="w-12 h-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Map Loading Error</h3>
          <p className="text-gray-600 mb-4">
            Unable to load the interactive map. Please check your internet connection.
          </p>
          <p className="text-sm text-gray-500">
            You can still view our clinic locations in the list below.
          </p>
        </div>
      );
    default:
      return <></>;
  }
}

// Main interactive map component
interface InteractiveMapProps {
  locations: ClinicLocation[];
  selectedLocationId?: number;
  onLocationSelect?: (location: ClinicLocation) => void;
  className?: string;
}

export default function InteractiveMap({ 
  locations, 
  selectedLocationId, 
  onLocationSelect,
  className = ''
}: InteractiveMapProps) {
  // Calculate center point from all locations - memoized for performance
  const center = useMemo(() => locations.reduce(
    (acc, location) => ({
      lat: acc.lat + location.coordinates.lat / locations.length,
      lng: acc.lng + location.coordinates.lng / locations.length,
    }),
    { lat: 0, lng: 0 }
  ), [locations]);

  // Fallback when no API key is provided
  if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
    return (
      <div className={`relative bg-gray-100 rounded-2xl overflow-hidden shadow-lg ${className}`}>
        <div className="flex flex-col items-center justify-center h-full text-center p-8">
          <MapPin className="w-16 h-16 text-blue-600 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Interactive Map
          </h3>
          <p className="text-gray-600 mb-6">
            Our interactive map with all clinic locations will appear here once the Google Maps API is configured.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>For Developers:</strong> Add your Google Maps API key to the environment variables to enable the interactive map.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative bg-gray-100 rounded-2xl overflow-hidden shadow-lg ${className}`}>
      <Wrapper
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}
        render={render}
        libraries={['places']}
      >
        <Map
          center={center}
          zoom={9}
          locations={locations}
          onLocationSelect={onLocationSelect}
          selectedLocationId={selectedLocationId}
        />
      </Wrapper>
    </div>
  );
}

// Location card component for selected location details
export function LocationDetailsCard({ location }: { location: ClinicLocation }) {
  const dayNames = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  const currentDayName = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][new Date().getDay()];
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-1">{location.name}</h3>
          <div className="flex items-center text-gray-600 mb-2">
            <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="text-sm">{location.address}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
            <a 
              href={`tel:${location.phone}`} 
              className="text-blue-600 hover:text-blue-700 font-medium text-sm"
            >
              {location.phone}
            </a>
          </div>
        </div>
      </div>

      <div className="border-t pt-4">
        <div className="flex items-center mb-3">
          <Clock className="w-4 h-4 mr-2 text-gray-500" />
          <span className="font-medium text-gray-900 text-sm">Today's Hours</span>
        </div>
        <div className="text-sm text-gray-600">
          <span className="font-medium">{currentDayName}: </span>
          <span className={location.hours[currentDayName] === 'Closed' ? 'text-red-600' : 'text-green-600'}>
            {location.hours[currentDayName]}
          </span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t">
        <div className="flex space-x-3">
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(location.address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            Get Directions
          </a>
          {location.yelp && (
            <a
              href={location.yelp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}