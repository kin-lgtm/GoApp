import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import 'react-native-reanimated';
import { Provider } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import { store } from '../store';
import { setLoading } from '../store/slices/authSlice';
import { loadFavorites } from '../store/slices/favoritesSlice';
import { setTheme } from '../store/slices/themeSlice';

function RootLayoutNav() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const isLoading = useAppSelector((state) => state.auth.isLoading);
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);
  const dispatch = useAppDispatch();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    // Restore preferences but NOT session (require login every time)
    const restoreUserSession = async () => {
      try {
        const [favoritesString, themeString] = await Promise.all([
          AsyncStorage.getItem('favorites'),
          AsyncStorage.getItem('theme'),
        ]);

        // Don't restore user session - always require login
        dispatch(setLoading(false));

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

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!isAuthenticated && !inAuthGroup) {
      router.replace('/(auth)/welcome' as any);
    } else if (isAuthenticated && inAuthGroup) {
      router.replace('/(tabs)' as any);
    }
  }, [isAuthenticated, segments, isLoading]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: isDarkMode ? '#000' : '#F2F2F7' }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <RootLayoutNav />
    </Provider>
  );
}

