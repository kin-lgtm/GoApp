import AsyncStorage from '@react-native-async-storage/async-storage';

const MOCK_USERS_KEY = 'mock_users';

interface MockUser {
  id: number;
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export const mockAuthService = {
  // Store registered users locally
  registerUser: async (userData: Omit<MockUser, 'id'>) => {
    try {
      const usersString = await AsyncStorage.getItem(MOCK_USERS_KEY);
      const users: MockUser[] = usersString ? JSON.parse(usersString) : [];
      
      // Check if username already exists
      if (users.find(u => u.username === userData.username)) {
        throw new Error('Username already exists');
      }
      
      const newUser: MockUser = {
        ...userData,
        id: Date.now(),
      };
      
      users.push(newUser);
      await AsyncStorage.setItem(MOCK_USERS_KEY, JSON.stringify(users));
      
      return newUser;
    } catch (error) {
      throw error;
    }
  },
  
  // Login with locally stored users
  loginUser: async (username: string, password: string) => {
    try {
      const usersString = await AsyncStorage.getItem(MOCK_USERS_KEY);
      const users: MockUser[] = usersString ? JSON.parse(usersString) : [];
      
      const user = users.find(u => u.username === username && u.password === password);
      
      if (!user) {
        return null; // Not found in local users
      }
      
      // Return user without password
      const { password: _, ...userWithoutPassword } = user;
      return {
        ...userWithoutPassword,
        accessToken: 'mock_token_' + user.id,
      };
    } catch (error) {
      console.error('Mock login error:', error);
      return null;
    }
  },
};
