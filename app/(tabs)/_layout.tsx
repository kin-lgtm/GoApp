import { Feather } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Platform } from 'react-native';
import { useAppSelector } from '../../hooks/redux-hooks';

import FavoritesScreen from '../../screens/FavoritesScreen';
import HomeScreen from '../../screens/HomeScreen';
import ProfileScreen from '../../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function TabLayout() {
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#00C853',
        tabBarInactiveTintColor: isDarkMode ? '#666' : '#999',
        tabBarStyle: {
          backgroundColor: isDarkMode ? '#1C1C1E' : '#fff',
          borderTopColor: isDarkMode ? '#2C2C2E' : '#E5E5EA',
          height: Platform.OS === 'ios' ? 100 : 90,
          paddingBottom: Platform.OS === 'ios' ? 35 : 25,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="home"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="favorites"
        component={FavoritesScreen}
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color, size }) => (
            <Feather name="heart" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
