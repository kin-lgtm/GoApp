import { TransportItem } from '../store/slices/favoritesSlice';

// TransportAPI credentials
const TRANSPORT_API_ID = 'ffe089fa';
const TRANSPORT_API_KEY = '48536326681d48200fdbb8a7ec39e1bf';
const TRANSPORT_API_BASE = 'https://transportapi.com/v3/uk';

// Default location for demo (London)
const DEFAULT_LAT = '51.5074';
const DEFAULT_LON = '-0.1278';

export const transportService = {
  getRoutes: async (): Promise<TransportItem[]> => {
    try {
      // Fetch bus stops near default location
      const busStopsUrl = `${TRANSPORT_API_BASE}/places.json?lat=${DEFAULT_LAT}&lon=${DEFAULT_LON}&type=bus_stop&app_id=${TRANSPORT_API_ID}&app_key=${TRANSPORT_API_KEY}`;
      
      const response = await fetch(busStopsUrl);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error('Failed to fetch routes from TransportAPI');
      }
      
      // Transform TransportAPI data into transport items
      if (!data.member || data.member.length === 0) {
        // Fallback to mock data if no results
        return getMockRoutes();
      }

      const routes: TransportItem[] = data.member.slice(0, 20).map((stop: any, index: number) => {
        // Clean up stop name - remove "Stop A/B/C" labels
        const cleanName = (stop.name || 'Unknown Destination')
          .replace(/Stop [A-Z]$/i, '')
          .replace(/\s+$/, '')
          .trim();
        
        const locality = stop.locality || 'London';
        
        return {
          id: stop.atcocode || `stop-${index}`,
          title: `${getTransportType(index)} to ${cleanName || locality}`,
          description: `${stop.description || 'Public transport route'} - ${locality}`,
          image: getTransportImage(index),
          status: index < 5 ? 'Popular' : index < 12 ? 'Active' : 'Upcoming',
          type: getTransportType(index),
          departure: getDepartureTime(index),
          arrival: getArrivalTime(index),
          duration: getDuration(index),
          price: Math.round((5 + Math.random() * 15) * 100) / 100,
        };
      });
      
      return routes;
    } catch (error) {
      console.error('Error fetching routes from TransportAPI:', error);
      // Return mock data as fallback
      return getMockRoutes();
    }
  },

  getRouteById: async (id: string): Promise<TransportItem> => {
    try {
      const routes = await transportService.getRoutes();
      const route = routes.find(r => r.id === id);
      
      if (route) {
        return route;
      }
      
      // Fallback
      return {
        id,
        title: 'Transport Route',
        description: 'Route details from TransportAPI',
        image: getTransportImage(0),
        status: 'Active',
        type: 'Bus',
        departure: '09:00',
        arrival: '10:30',
        duration: '1h 30m',
        price: 12.50,
      };
    } catch (error) {
      console.error('Error fetching route details:', error);
      throw error;
    }
  },
};

// Fallback mock data
const getMockRoutes = (): TransportItem[] => {
  const destinations = [
    'Oxford Street', 'Piccadilly Circus', 'Leicester Square', 'Covent Garden',
    'Tower Bridge', 'Big Ben', 'Buckingham Palace', 'Hyde Park',
    'King\'s Cross', 'Liverpool Street', 'Victoria Station', 'Waterloo',
    'Camden Town', 'Shoreditch', 'Greenwich', 'Canary Wharf',
    'Heathrow Airport', 'Gatwick Airport', 'St Pancras', 'Paddington'
  ];

  return destinations.map((destination, index) => ({
    id: `route-${index}`,
    title: `${getTransportType(index)} to ${destination}`,
    description: `Regular service to ${destination}. Comfortable journey with all amenities.`,
    image: getTransportImage(index),
    status: index < 5 ? 'Popular' : index < 12 ? 'Active' : 'Upcoming',
    type: getTransportType(index),
    departure: getDepartureTime(index),
    arrival: getArrivalTime(index),
    duration: getDuration(index),
    price: Math.round((5 + Math.random() * 15) * 100) / 100,
  }));
};

// Helper functions to generate transport-related data
const getTransportType = (index: number): string => {
  const types = ['Bus', 'Train', 'Metro', 'Ferry', 'Tram'];
  return types[index % types.length];
};

const getTransportImage = (index: number): string => {
  const images = [
    'https://res.cloudinary.com/dkqv2vkdk/image/upload/v1763965828/bus_djbo4l.png',
    'https://res.cloudinary.com/dkqv2vkdk/image/upload/v1763965829/train_uokujn.png',
    'https://res.cloudinary.com/dkqv2vkdk/image/upload/v1763965828/metro_mpib6d.png',
    'https://res.cloudinary.com/dkqv2vkdk/image/upload/v1763965827/ferry_phh5jd.png',
    'https://res.cloudinary.com/dkqv2vkdk/image/upload/v1763965829/tram_g0jbo4.png',
  ];
  return images[index % images.length];
};

const getStatus = (rating: number): string => {
  if (rating >= 4.5) return 'Popular';
  if (rating >= 4.0) return 'Active';
  return 'Upcoming';
};

const getDepartureTime = (index: number): string => {
  const hour = 8 + (index % 12);
  return `${hour.toString().padStart(2, '0')}:00`;
};

const getArrivalTime = (index: number): string => {
  const hour = 9 + (index % 12);
  return `${hour.toString().padStart(2, '0')}:30`;
};

const getDuration = (index: number): string => {
  const minutes = 30 + (index % 5) * 15;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
};
