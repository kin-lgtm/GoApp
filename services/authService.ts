import AsyncStorage from '@react-native-async-storage/async-storage';
import { mockAuthService } from './mockAuth';

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export const authService = {
  // Using DummyJSON for authentication with fallback to local mock users
  login: async (credentials: LoginCredentials) => {
    try {
      console.log('Attempting login with:', credentials);
      
      // First try mock users (locally registered)
      const mockUser = await mockAuthService.loginUser(credentials.username, credentials.password);
      if (mockUser) {
        console.log('Login successful with mock user:', mockUser);
        return mockUser;
      }
      
      // Then try DummyJSON API
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Invalid credentials');
      }
      
      console.log('Login successful with DummyJSON:', data);
      return data;
    } catch (error: any) {
      console.error('Login error:', error.message);
      throw error;
    }
  },

  // Registration - stores users locally
  register: async (data: RegisterData) => {
    try {
      const user = await mockAuthService.registerUser(data);
      console.log('User registered successfully:', user);
      return user;
    } catch (error: any) {
      console.error('Registration error:', error.message);
      throw error;
    }
  },

  getCurrentUser: async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      const response = await fetch('https://dummyjson.com/auth/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to get user');
      }
      
      return data;
    } catch (error: any) {
      console.error('Get user error:', error.message);
      throw error;
    }
  },
};
