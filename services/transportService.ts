import { TransportItem } from '../store/slices/favoritesSlice';

// TransportAPI credentials
const TRANSPORT_API_ID = 'ffe089fa';
const TRANSPORT_API_KEY = '48536326681d48200fdbb8a7ec39e1bf';
const TRANSPORT_API_BASE = 'https://transportapi.com/v3/uk';

// Default location for demo (London)
const DEFAULT_LAT = '51.5074';
const DEFAULT_LON = '-0.1278';

// Major London train stations
const TRAIN_STATIONS = ['PAD', 'KGX', 'VIC', 'WAT', 'LST', 'LBG', 'EUS', 'CHX', 'STP'];

export const transportService = {
  getRoutes: async (): Promise<TransportItem[]> => {
    try {
      // Fetch both bus and train routes in parallel
      const [busRoutes, trainRoutes] = await Promise.all([
        fetchBusRoutes(),
        fetchTrainRoutes(),
      ]);
      
      // Combine and return all routes
      const allRoutes = [...busRoutes, ...trainRoutes];
      
      // If no real data available, return fallback mock data
      if (allRoutes.length === 0) {
        console.log('No live data available, using fallback data');
        return getMockRoutes();
      }
      
      return allRoutes;
    } catch (error) {
      console.error('Error fetching routes from TransportAPI:', error);
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
        image: getTransportImage('bus'),
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

// Fetch bus routes with real timetable data
const fetchBusRoutes = async (): Promise<TransportItem[]> => {
  try {
    // First, get bus stops near location
    const busStopsUrl = `${TRANSPORT_API_BASE}/places.json?lat=${DEFAULT_LAT}&lon=${DEFAULT_LON}&type=bus_stop&app_id=${TRANSPORT_API_ID}&app_key=${TRANSPORT_API_KEY}`;
    
    const response = await fetch(busStopsUrl);
    const data = await response.json();
    
    if (!response.ok || !data.member || data.member.length === 0) {
      return [];
    }

    const routes: TransportItem[] = [];
    
    // Get live departure information for each stop
    for (const stop of data.member.slice(0, 10)) {
      try {
        const atcocode = stop.atcocode;
        const departuresUrl = `${TRANSPORT_API_BASE}/bus/stop/${atcocode}/live.json?app_id=${TRANSPORT_API_ID}&app_key=${TRANSPORT_API_KEY}&group=route&limit=3`;
        
        const depResponse = await fetch(departuresUrl);
        const depData = await depResponse.json();
        
        if (depData.departures) {
          // Process departures grouped by route
          for (const routeKey in depData.departures) {
            const departures = depData.departures[routeKey];
            
            if (Array.isArray(departures) && departures.length > 0) {
              const departure = departures[0];
              
              routes.push({
                id: `bus-${departure.line}-${atcocode}-${Date.now()}-${Math.random()}`,
                title: `Bus ${departure.line} to ${departure.direction || 'City Centre'}`,
                description: `${departure.operator_name || 'Bus Service'} - ${stop.locality || 'London'}`,
                image: getTransportImage('bus'),
                status: departure.expected_departure_time ? 'Active' : 'Scheduled',
                type: 'Bus',
                departure: departure.aimed_departure_time || departure.best_departure_estimate || '—',
                arrival: departure.expected_departure_time || '—',
                duration: calculateDuration(
                  departure.aimed_departure_time,
                  departure.expected_departure_time
                ),
                price: Math.round((2.5 + Math.random() * 5) * 100) / 100,
              });
            }
          }
        }
      } catch (err) {
        console.error('Error fetching bus departures:', err);
      }
      
      // Limit API calls
      if (routes.length >= 10) break;
    }
    
    return routes;
  } catch (error) {
    console.error('Error in fetchBusRoutes:', error);
    return [];
  }
};

// Fetch train routes with real timetable data
const fetchTrainRoutes = async (): Promise<TransportItem[]> => {
  try {
    const routes: TransportItem[] = [];
    
    // Fetch live departures from major London stations
    for (const stationCode of TRAIN_STATIONS.slice(0, 3)) {
      try {
        const trainUrl = `${TRANSPORT_API_BASE}/train/station/${stationCode}/live.json?app_id=${TRANSPORT_API_ID}&app_key=${TRANSPORT_API_KEY}&train_status=passenger`;
        
        const response = await fetch(trainUrl);
        const data = await response.json();
        
        if (!response.ok || !data.departures) {
          continue;
        }

        const departures = data.departures.all || [];
        
        for (const departure of departures.slice(0, 5)) {
          const origin = departure.origin_name || data.station_name || 'Unknown';
          const destination = departure.destination_name || 'Unknown';
          const departureTime = departure.aimed_departure_time || departure.expected_departure_time || '—';
          const arrivalTime = departure.aimed_arrival_time || departure.expected_arrival_time || '—';
          
          routes.push({
            id: `train-${departure.service || stationCode}-${Date.now()}-${Math.random()}`,
            title: `Train to ${destination}`,
            description: `${departure.operator_name || 'Train Service'} - Platform ${departure.platform || 'TBA'}`,
            image: getTransportImage('train'),
            status: departure.status === 'ON TIME' ? 'Active' : departure.status || 'Scheduled',
            type: 'Train',
            departure: departureTime,
            arrival: arrivalTime,
            duration: calculateDuration(departureTime, arrivalTime),
            price: Math.round((10 + Math.random() * 25) * 100) / 100,
          });
        }
      } catch (err) {
        console.error(`Error fetching train data for ${stationCode}:`, err);
      }
      
      // Limit API calls
      if (routes.length >= 10) break;
    }
    
    return routes;
  } catch (error) {
    console.error('Error in fetchTrainRoutes:', error);
    return [];
  }
};

// Helper functions
const getTransportImage = (type: string): string => {
  const imageMap: { [key: string]: string } = {
    bus: 'https://res.cloudinary.com/dkqv2vkdk/image/upload/v1763965828/bus_djbo4l.png',
    train: 'https://res.cloudinary.com/dkqv2vkdk/image/upload/v1763965829/train_uokujn.png',
  };
  
  return imageMap[type.toLowerCase()] || 'https://res.cloudinary.com/dkqv2vkdk/image/upload/v1763965828/bus_djbo4l.png';
};

// Helper to format duration
const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours > 0) {
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  }
  return `${mins}m`;
};

// Realistic fallback data with varied durations
const getMockRoutes = (): TransportItem[] => {
  // Bus routes with realistic durations (shorter trips)
  const busRoutes = [
    { dest: 'Oxford Circus', mins: 15, price: 2.80 },
    { dest: 'Piccadilly Circus', mins: 20, price: 2.80 },
    { dest: 'Leicester Square', mins: 18, price: 2.80 },
    { dest: 'Covent Garden', mins: 22, price: 2.80 },
    { dest: 'Tower Bridge', mins: 35, price: 3.20 },
    { dest: 'Camden Town', mins: 25, price: 2.80 },
    { dest: 'Shoreditch', mins: 28, price: 3.20 },
    { dest: 'Greenwich', mins: 45, price: 4.50 },
    { dest: 'Canary Wharf', mins: 40, price: 3.80 },
    { dest: 'Stratford', mins: 38, price: 3.80 },
  ];

  // Train routes with realistic durations (longer trips)
  const trainRoutes = [
    { dest: 'King\'s Cross', mins: 25, price: 12.50 },
    { dest: 'Liverpool Street', mins: 20, price: 11.80 },
    { dest: 'Victoria Station', mins: 18, price: 10.50 },
    { dest: 'Waterloo', mins: 22, price: 11.20 },
    { dest: 'St Pancras', mins: 28, price: 13.00 },
    { dest: 'Paddington', mins: 24, price: 12.00 },
    { dest: 'Heathrow Airport', mins: 55, price: 25.50 },
    { dest: 'Gatwick Airport', mins: 85, price: 32.00 },
    { dest: 'Brighton', mins: 95, price: 28.50 },
    { dest: 'Cambridge', mins: 75, price: 24.00 },
  ];

  const now = new Date();
  
  const busMockData = busRoutes.map((route, index) => {
    const depTime = new Date(now.getTime() + (index * 8 * 60000)); // Every 8 minutes
    const arrTime = new Date(depTime.getTime() + (route.mins * 60000));
    
    return {
      id: `bus-mock-${index}`,
      title: `Bus ${index + 10} to ${route.dest}`,
      description: `Regular bus service to ${route.dest}`,
      image: getTransportImage('bus'),
      status: index < 3 ? 'Active' : 'Scheduled',
      type: 'Bus' as const,
      departure: `${depTime.getHours().toString().padStart(2, '0')}:${depTime.getMinutes().toString().padStart(2, '0')}`,
      arrival: `${arrTime.getHours().toString().padStart(2, '0')}:${arrTime.getMinutes().toString().padStart(2, '0')}`,
      duration: formatDuration(route.mins),
      price: route.price,
    };
  });

  const trainMockData = trainRoutes.map((route, index) => {
    const depTime = new Date(now.getTime() + (index * 12 * 60000)); // Every 12 minutes
    const arrTime = new Date(depTime.getTime() + (route.mins * 60000));
    
    return {
      id: `train-mock-${index}`,
      title: `Train to ${route.dest}`,
      description: `Express train service to ${route.dest}`,
      image: getTransportImage('train'),
      status: index < 3 ? 'Active' : 'Scheduled',
      type: 'Train' as const,
      departure: `${depTime.getHours().toString().padStart(2, '0')}:${depTime.getMinutes().toString().padStart(2, '0')}`,
      arrival: `${arrTime.getHours().toString().padStart(2, '0')}:${arrTime.getMinutes().toString().padStart(2, '0')}`,
      duration: formatDuration(route.mins),
      price: route.price,
    };
  });

  return [...busMockData, ...trainMockData];
};

// Helper function to calculate duration between two times
const calculateDuration = (startTime?: string, endTime?: string): string => {
  if (!startTime || !endTime || startTime === '—' || endTime === '—') {
    return '—';
  }
  
  try {
    const [startHour, startMin] = startTime.split(':').map(Number);
    const [endHour, endMin] = endTime.split(':').map(Number);
    
    let totalMinutes = (endHour * 60 + endMin) - (startHour * 60 + startMin);
    
    // Handle overnight journeys
    if (totalMinutes < 0) {
      totalMinutes += 24 * 60;
    }
    
    const hours = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;
    
    if (hours > 0) {
      return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
    }
    return `${mins}m`;
  } catch {
    return '—';
  }
};