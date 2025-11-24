import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import { restoreSession, setLoading } from '../store/slices/authSlice';
import { loadFavorites } from '../store/slices/favoritesSlice';
import { setTheme } from '../store/slices/themeSlice';

import { ActivityIndicator, StyleSheet, View } from 'react-native';
import DetailsScreen from '../screens/DetailsScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import { TransportItem } from '../store/slices/favoritesSlice';
import BottomTabNavigator from './BottomTabNavigator';

export type RootStackParamList = {
  Main: undefined;
  Details: { item: TransportItem };
  Login: undefined;
  Register: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const isLoading = useAppSelector((state) => state.auth.isLoading);
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Restore session on app load
    const restoreUserSession = async () => {
      try {
        const [userString, favoritesString, themeString] = await Promise.all([
          AsyncStorage.getItem('user'),
          AsyncStorage.getItem('favorites'),
          AsyncStorage.getItem('theme'),
        ]);

        if (userString) {
          const user = JSON.parse(userString);
          dispatch(restoreSession(user));
        } else {
          dispatch(setLoading(false));
        }

        if (favoritesString) {
          const favorites = JSON.parse(favoritesString);
          dispatch(loadFavorites(favorites));
        }

        if (themeString) {
          dispatch(setTheme(themeString === 'dark'));
        }
      } catch (error) {
        console.error('Error restoring session:', error);
        dispatch(setLoading(false));
      }
    };

    restoreUserSession();
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={[styles.loadingContainer, isDarkMode && styles.loadingContainerDark]}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return isAuthenticated ? (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={BottomTabNavigator} />
      <Stack.Screen 
        name="Details" 
        component={DetailsScreen}
        options={{
          presentation: 'card',
          gestureEnabled: true,
        }}
      />
    </Stack.Navigator>
  ) : (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
  },
  loadingContainerDark: {
    backgroundColor: '#000',
  },
});

export default AppNavigator;
