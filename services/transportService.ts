import { TransportItem } from '../store/slices/favoritesSlice';

// Mock transport data based on DummyJSON products
// In a real app, you could use TransportAPI or similar
export const transportService = {
  getRoutes: async (): Promise<TransportItem[]> => {
    try {
      // Using DummyJSON products and transforming them into transport routes
      const response = await fetch('https://dummyjson.com/products?limit=20');
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error('Failed to fetch routes');
      }
      
      // Transform products into transport items
      const routes: TransportItem[] = data.products.map((product: any, index: number) => ({
        id: product.id.toString(),
        title: `${getTransportType(index)} to ${product.title}`,
        description: product.description,
        image: product.thumbnail,
        status: getStatus(product.rating),
        type: getTransportType(index),
        departure: getDepartureTime(index),
        arrival: getArrivalTime(index),
        duration: getDuration(index),
        price: product.price,
      }));
      
      return routes;
    } catch (error) {
      console.error('Error fetching routes:', error);
      throw error;
    }
  },

  getRouteById: async (id: string): Promise<TransportItem> => {
    try {
      const response = await fetch(`https://dummyjson.com/products/${id}`);
      const product = await response.json();
      
      if (!response.ok) {
        throw new Error('Failed to fetch route details');
      }
      
      return {
        id: product.id.toString(),
        title: `${getTransportType(parseInt(id))} to ${product.title}`,
        description: product.description,
        image: product.thumbnail,
        status: getStatus(product.rating),
        type: getTransportType(parseInt(id)),
        departure: getDepartureTime(parseInt(id)),
        arrival: getArrivalTime(parseInt(id)),
        duration: getDuration(parseInt(id)),
        price: product.price,
      };
    } catch (error) {
      console.error('Error fetching route details:', error);
      throw error;
    }
  },
};

// Helper functions to generate transport-related data
const getTransportType = (index: number): string => {
  const types = ['Bus', 'Train', 'Metro', 'Ferry', 'Tram'];
  return types[index % types.length];
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
  return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
};
