import { TransportItem } from '../store/slices/favoritesSlice';

// TransportAPI credentials
const TRANSPORT_API_ID = '24be61e9';
const TRANSPORT_API_KEY = '5aa8f192fab126e1d6fef370e5b2bc8d';
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

      const routes: TransportItem[] = data.member.slice(0, 20).map((stop: any, index: number) => ({
        id: stop.atcocode || `stop-${index}`,
        title: `${getTransportType(index)} to ${stop.name || 'Unknown Destination'}`,
        description: `${stop.description || 'Public transport route'} - ${stop.locality || 'Local area'}`,
        image: getTransportImage(index),
        status: index < 5 ? 'Popular' : index < 12 ? 'Active' : 'Upcoming',
        type: getTransportType(index),
        departure: getDepartureTime(index),
        arrival: getArrivalTime(index),
        duration: getDuration(index),
        price: Math.round((5 + Math.random() * 15) * 100) / 100,
      }));
      
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
    'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400', // Bus
    'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=400', // Train
    'https://images.unsplash.com/photo-1581262177000-8c619cf0ca3c?w=400', // Metro/Subway
    'https://images.unsplash.com/photo-1605128258273-37290ea0196c?w=400', // Ferry
    'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400', // Tram
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
