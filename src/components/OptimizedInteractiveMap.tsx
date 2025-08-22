'use client';

import { Wrapper, Status } from '@googlemaps/react-wrapper';
import { useCallback, useRef, useEffect, useState, ReactElement, useMemo, memo } from 'react';
import { MapPin, Phone, Clock, ExternalLink, AlertCircle } from 'lucide-react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

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
  map: any;
  location: ClinicLocation;
  onClick?: (location: ClinicLocation) => void;
  isSelected?: boolean;
}

// Performance-optimized loading skeleton
const MapLoadingSkeleton = memo(function MapLoadingSkeleton() {
  return (
    <div className="relative bg-gray-100 rounded-2xl overflow-hidden shadow-lg animate-pulse">
      <div className="h-full min-h-[400px] bg-gradient-to-br from-gray-200 to-gray-300 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-32 mx-auto mb-2"></div>
            <div className="h-3 bg-gray-300 rounded w-24 mx-auto"></div>
          </div>
        </div>
        {/* Simulate map markers */}
        <div className="absolute top-1/4 left-1/3 w-6 h-6 bg-blue-400 rounded-full opacity-50"></div>
        <div className="absolute top-1/2 right-1/3 w-6 h-6 bg-blue-400 rounded-full opacity-50"></div>
        <div className="absolute bottom-1/3 left-1/2 w-6 h-6 bg-blue-400 rounded-full opacity-50"></div>
      </div>
    </div>
  );
});

// Error fallback component
const MapErrorFallback = memo(function MapErrorFallback({ 
  onRetry, 
  showDetails = false 
}: { 
  onRetry?: () => void; 
  showDetails?: boolean; 
}) {
  return (
    <div className="relative bg-gray-50 rounded-2xl overflow-hidden shadow-lg border-2 border-dashed border-gray-300">
      <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center p-8">
        <AlertCircle className="w-16 h-16 text-gray-400 mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Map Unavailable</h3>
        <p className="text-gray-600 mb-4 max-w-md">
          The interactive map is temporarily unavailable. You can still view our clinic locations below.
        </p>
        {showDetails && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4 text-sm text-yellow-800">
            <p><strong>For Developers:</strong> Check Google Maps API configuration and network connectivity.</p>
          </div>
        )}
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            Retry Loading Map
          </button>
        )}
      </div>
    </div>
  );
});

// Optimized marker component with error handling
const OptimizedMarker = memo(function OptimizedMarker({ 
  position, 
  map, 
  location, 
  onClick, 
  isSelected 
}: MarkerProps) {
  const [marker, setMarker] = useState<any>(null);
  const [infoWindow, setInfoWindow] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!map || marker || typeof window === 'undefined') return;

    try {
      const google = (window as any).google;
      if (!google?.maps) {
        setError('Google Maps not loaded');
        return;
      }

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
        optimized: true, // Enable marker optimization
      });

      // Create optimized info window
      const newInfoWindow = new google.maps.InfoWindow({
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
        disableAutoPan: false,
        maxWidth: 300,
      });

      // Add optimized click listener
      const clickListener = newMarker.addListener('click', () => {
        // Close other info windows
        if (infoWindow) {
          infoWindow.close();
        }
        newInfoWindow.open(map, newMarker);
        if (onClick) {
          onClick(location);
        }
      });

      setMarker(newMarker);
      setInfoWindow(newInfoWindow);

      // Cleanup function
      return () => {
        if (clickListener) {
          google.maps.event.removeListener(clickListener);
        }
        if (newMarker) {
          newMarker.setMap(null);
        }
        if (newInfoWindow) {
          newInfoWindow.close();
        }
      };
    } catch (err) {
      console.error('Error creating marker:', err);
      setError('Failed to create marker');
    }
  }, [map, position, location, onClick]);

  // Update marker appearance when selection changes
  useEffect(() => {
    if (!marker || typeof window === 'undefined') return;

    try {
      const google = (window as any).google;
      if (!google?.maps) return;

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
        setTimeout(() => {
          if (marker) {
            marker.setAnimation(null);
          }
        }, 2000);
      }
    } catch (err) {
      console.error('Error updating marker:', err);
    }
  }, [marker, isSelected]);

  if (error) {
    console.warn(`Marker error for ${location.name}:`, error);
  }

  return null;
});

// Main optimized map component
const OptimizedMap = memo(function OptimizedMap({ 
  center, 
  zoom, 
  locations, 
  onLocationSelect, 
  selectedLocationId 
}: MapProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Optimized map initialization
  useEffect(() => {
    if (!ref.current || map || typeof window === 'undefined') return;

    const initMap = async () => {
      try {
        const google = (window as any).google;
        if (!google?.maps) {
          throw new Error('Google Maps API not loaded');
        }

        const mapOptions = {
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
          gestureHandling: 'cooperative', // Better mobile UX
          clickableIcons: false, // Reduce unnecessary interactions
          disableDoubleClickZoom: false,
          draggable: true,
          scrollwheel: true,
          panControl: false,
          rotateControl: false,
          scaleControl: true,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
        };

        const newMap = new google.maps.Map(ref.current, mapOptions);
        
        // Wait for map to be fully loaded
        google.maps.event.addListenerOnce(newMap, 'idle', () => {
          setIsLoading(false);
        });

        setMap(newMap);
        setError(null);
      } catch (err) {
        console.error('Error initializing map:', err);
        setError('Failed to initialize map');
        setIsLoading(false);
      }
    };

    initMap();
  }, [center, zoom]);

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

  if (error) {
    return <MapErrorFallback onRetry={() => window.location.reload()} />;
  }

  return (
    <>
      <div ref={ref} style={{ width: '100%', height: '100%', minHeight: '400px' }} />
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}
      {map && !isLoading &&
        locations.map((location) => (
          <OptimizedMarker
            key={`marker-${location.id}`}
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

// Optimized render function for different loading states
function render(status: Status): ReactElement {
  switch (status) {
    case Status.LOADING:
      return <MapLoadingSkeleton />;
    case Status.FAILURE:
      return (
        <MapErrorFallback 
          showDetails={process.env.NODE_ENV === 'development'}
          onRetry={() => window.location.reload()}
        />
      );
    default:
      return <></>;
  }
}

// Main interactive map component with performance optimizations
interface OptimizedInteractiveMapProps {
  locations: ClinicLocation[];
  selectedLocationId?: number;
  onLocationSelect?: (location: ClinicLocation) => void;
  className?: string;
}

export default function OptimizedInteractiveMap({ 
  locations, 
  selectedLocationId, 
  onLocationSelect,
  className = ''
}: OptimizedInteractiveMapProps) {
  const [retryCount, setRetryCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  
  // Use intersection observer to only load map when visible
  const { isIntersecting, setTarget: mapRef } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '100px'
  });

  // Calculate center point from all locations - memoized for performance
  const center = useMemo(() => {
    if (locations.length === 0) {
      return { lat: 32.7157, lng: -117.1611 }; // San Diego default
    }
    
    return locations.reduce(
      (acc, location) => ({
        lat: acc.lat + location.coordinates.lat / locations.length,
        lng: acc.lng + location.coordinates.lng / locations.length,
      }),
      { lat: 0, lng: 0 }
    );
  }, [locations]);

  // Only initialize map when it becomes visible
  useEffect(() => {
    if (isIntersecting && !isVisible) {
      setIsVisible(true);
    }
  }, [isIntersecting, isVisible]);

  const handleRetry = useCallback(() => {
    setRetryCount(prev => prev + 1);
    setIsVisible(false);
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  // Fallback when no API key is provided
  if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
    return (
      <div ref={mapRef} className={`relative bg-gray-100 rounded-2xl overflow-hidden shadow-lg ${className}`}>
        <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center p-8">
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
    <div ref={mapRef} className={`relative bg-gray-100 rounded-2xl overflow-hidden shadow-lg ${className}`}>
      {!isVisible ? (
        <MapLoadingSkeleton />
      ) : (
        <Wrapper
          apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}
          render={render}
          libraries={['places']}
          version="weekly" // Use latest stable version
          language="en"
          region="US"
        >
          <OptimizedMap
            key={`map-${retryCount}`} // Force remount on retry
            center={center}
            zoom={9}
            locations={locations}
            onLocationSelect={onLocationSelect}
            selectedLocationId={selectedLocationId}
          />
        </Wrapper>
      )}
    </div>
  );
}

// Optimized location card component
export const OptimizedLocationDetailsCard = memo(function OptimizedLocationDetailsCard({ 
  location 
}: { 
  location: ClinicLocation 
}) {
  const currentDayName = useMemo(() => {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    return days[new Date().getDay()];
  }, []);
  
  const directionsUrl = useMemo(() => 
    `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(location.address)}`,
    [location.address]
  );

  const phoneUrl = useMemo(() => `tel:${location.phone}`, [location.phone]);
  
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
              href={phoneUrl}
              className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
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
          <span className="font-medium capitalize">{currentDayName}: </span>
          <span className={location.hours[currentDayName] === 'Closed' ? 'text-red-600' : 'text-green-600'}>
            {location.hours[currentDayName]}
          </span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t">
        <div className="flex space-x-3">
          <a
            href={directionsUrl}
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
              title="View on Yelp"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
});