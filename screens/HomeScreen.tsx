import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    FlatList,
    Image,
    RefreshControl,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import { transportService } from '../services/transportService';
import { toggleFavorite, TransportItem } from '../store/slices/favoritesSlice';
import { logout } from '../store/slices/authSlice';

interface HomeScreenProps {
  navigation?: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation: navProp }) => {
  const router = useRouter();
  const navigation = navProp || { navigate: (screen: string, params?: any) => router.push({ pathname: `/${screen}` as any, params }) };

  const [routes, setRoutes] = useState<TransportItem[]>([]);
  const [filteredRoutes, setFilteredRoutes] = useState<TransportItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);
  const favorites = useAppSelector((state) => state.favorites.items);
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchRoutes();
  }, []);

  useEffect(() => {
    filterRoutes();
  }, [searchQuery, routes]);

  const fetchRoutes = async () => {
    try {
      setLoading(true);
      const data = await transportService.getRoutes();
      setRoutes(data);
      setFilteredRoutes(data);
    } catch (error) {
      console.error('Error fetching routes:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const filterRoutes = () => {
    if (!searchQuery.trim()) {
      setFilteredRoutes(routes);
      return;
    }

    const filtered = routes.filter(
      (route) =>
        route.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        route.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        route.type?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredRoutes(filtered);
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchRoutes();
  };

  const isFavorite = (id: string) => {
    return favorites.some((fav) => fav.id === id);
  };

  const handleToggleFavorite = (item: TransportItem) => {
    dispatch(toggleFavorite(item));
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => dispatch(logout()),
        },
      ]
    );
  };

  const renderItem = ({ item }: { item: TransportItem }) => (
    <TouchableOpacity
      style={[styles.card, isDarkMode && styles.cardDark]}
      onPress={() => navigation.navigate('details', { item: JSON.stringify(item) })}
    >
      <Image
        source={{ uri: item.image }}
        style={styles.cardImage}
        resizeMode="cover"
      />
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <View style={styles.cardTitleContainer}>
            <Text style={[styles.cardTitle, isDarkMode && styles.textDark]} numberOfLines={1}>
              {item.title}
            </Text>
            <View style={[styles.statusBadge, getStatusBadgeStyle(item.status)]}>
              <Text style={styles.statusText}>{item.status}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => handleToggleFavorite(item)} style={styles.favoriteButton}>
            <Feather
              name={isFavorite(item.id) ? 'heart' : 'heart'}
              size={22}
              color={isFavorite(item.id) ? '#FF3B30' : isDarkMode ? '#999' : '#666'}
              fill={isFavorite(item.id) ? '#FF3B30' : 'transparent'}
            />
          </TouchableOpacity>
        </View>

        <Text style={[styles.cardDescription, isDarkMode && styles.textSecondaryDark]} numberOfLines={2}>
          {item.description}
        </Text>

        <View style={styles.cardFooter}>
          <View style={styles.infoItem}>
            <Feather name="navigation" size={14} color="#00C853" />
            <Text style={[styles.infoText, isDarkMode && styles.textDark]}>{item.type}</Text>
          </View>
          <View style={styles.infoItem}>
            <Feather name="clock" size={14} color="#666" />
            <Text style={[styles.infoText, isDarkMode && styles.textDark]}>{item.duration}</Text>
          </View>
          <View style={styles.priceTag}>
            <Text style={styles.priceText}>${item.price}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const styles = getStyles(isDarkMode);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.greeting}>Hello, {user?.firstName || 'Traveler'}! 👋</Text>
            <Text style={styles.headerSubtitle}>Where would you like to go?</Text>
          </View>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Feather name="log-out" size={22} color="#FF3B30" />
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <Feather name="search" size={20} color={isDarkMode ? '#999' : '#666'} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search routes or destinations..."
            placeholderTextColor={isDarkMode ? '#999' : '#999'}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Feather name="x" size={20} color={isDarkMode ? '#999' : '#666'} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <FlatList
        data={filteredRoutes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#007AFF" />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Feather name="inbox" size={64} color={isDarkMode ? '#666' : '#999'} />
            <Text style={[styles.emptyText, isDarkMode && styles.textDark]}>No routes found</Text>
          </View>
        }
      />
    </View>
  );
};

const getStatusBadgeStyle = (status?: string) => {
  switch (status) {
    case 'Popular':
      return { backgroundColor: '#34C759' };
    case 'Active':
      return { backgroundColor: '#007AFF' };
    case 'Upcoming':
      return { backgroundColor: '#FF9500' };
    default:
      return { backgroundColor: '#999' };
  }
};

const getStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#000' : '#F2F2F7',
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: isDarkMode ? '#000' : '#F2F2F7',
    },
    header: {
      backgroundColor: isDarkMode ? '#1C1C1E' : '#fff',
      paddingTop: 60,
      paddingHorizontal: 20,
      paddingBottom: 20,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
    },
    headerTop: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    greeting: {
      fontSize: 24,
      fontWeight: 'bold',
      color: isDarkMode ? '#fff' : '#000',
    },
    headerSubtitle: {
      fontSize: 14,
      color: isDarkMode ? '#999' : '#666',
      marginTop: 4,
    },
    logoutButton: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: isDarkMode ? '#2C2C2E' : '#F2F2F7',
      justifyContent: 'center',
      alignItems: 'center',
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: isDarkMode ? '#2C2C2E' : '#F2F2F7',
      borderRadius: 12,
      paddingHorizontal: 15,
      height: 48,
    },
    searchIcon: {
      marginRight: 10,
    },
    searchInput: {
      flex: 1,
      fontSize: 16,
      color: isDarkMode ? '#fff' : '#000',
    },
    listContent: {
      padding: 20,
    },
    card: {
      backgroundColor: '#fff',
      borderRadius: 12,
      marginBottom: 16,
      overflow: 'hidden',
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
    },
    cardDark: {
      backgroundColor: '#1C1C1E',
    },
    cardImage: {
      width: '100%',
      height: 160,
    },
    cardContent: {
      padding: 14,
    },
    cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 8,
    },
    cardTitleContainer: {
      flex: 1,
      marginRight: 10,
    },
    cardTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: '#000',
      marginBottom: 6,
    },
    favoriteButton: {
      padding: 4,
    },
    statusBadge: {
      alignSelf: 'flex-start',
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: 4,
    },
    statusText: {
      color: '#fff',
      fontSize: 11,
      fontWeight: '600',
    },
    cardDescription: {
      fontSize: 13,
      color: '#666',
      marginBottom: 12,
      lineHeight: 18,
    },
    cardFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    infoItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    infoText: {
      fontSize: 13,
      color: '#000',
      fontWeight: '500',
    },
    priceTag: {
      backgroundColor: '#00C853',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 6,
    },
    priceText: {
      color: '#fff',
      fontSize: 14,
      fontWeight: '700',
    },
    textDark: {
      color: '#fff',
    },
    textSecondaryDark: {
      color: '#999',
    },
    emptyContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 60,
    },
    emptyText: {
      fontSize: 16,
      color: '#999',
      marginTop: 16,
    },
  });

export default HomeScreen;
