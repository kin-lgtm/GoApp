import { Feather, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import { toggleFavorite, TransportItem } from '../store/slices/favoritesSlice';

interface FavoritesScreenProps {
  navigation?: any;
}

const FavoritesScreen: React.FC<FavoritesScreenProps> = ({ navigation: navProp }) => {
  const router = useRouter();
  const navigation = navProp || { navigate: (screen: string, params?: any) => router.push({ pathname: `/${screen}` as any, params }) };

  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);
  const favorites = useAppSelector((state) => state.favorites.items);
  const dispatch = useAppDispatch();

  const handleToggleFavorite = (item: TransportItem) => {
    dispatch(toggleFavorite(item));
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
          <TouchableOpacity onPress={() => handleToggleFavorite(item)}>
            <MaterialIcons name="favorite" size={22} color="#00C853" />
          </TouchableOpacity>
        </View>

        <Text style={[styles.cardDescription, isDarkMode && styles.textSecondaryDark]} numberOfLines={2}>
          {item.description}
        </Text>

        <View style={styles.cardFooter}>
          <View style={styles.footerLeft}>
            <View style={styles.infoItem}>
              <Feather name={getTransportIcon(item.type)} size={14} color="#00C853" />
              <Text style={[styles.infoText, isDarkMode && styles.textDark]}>{item.type}</Text>
            </View>
            <View style={styles.infoItem}>
              <Feather name="clock" size={14} color="#666" />
              <Text style={[styles.infoText, isDarkMode && styles.textDark]}>{item.duration}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={[styles.priceText, isDarkMode && styles.textDark]}>${item.price}</Text>
            </View>
          </View>
          <TouchableOpacity 
            style={styles.viewButton}
            onPress={() => navigation.navigate('details', { item: JSON.stringify(item) })}
          >
            <Text style={styles.viewButtonText}>View Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  const styles = getStyles(isDarkMode);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Favorites</Text>
        <Text style={styles.subtitle}>{favorites.length} saved routes</Text>
      </View>

      <FlatList
        data={favorites}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Feather name="heart" size={64} color={isDarkMode ? '#666' : '#999'} />
            <Text style={[styles.emptyText, isDarkMode && styles.textDark]}>No favorites yet</Text>
            <Text style={[styles.emptySubtext, isDarkMode && styles.textSecondaryDark]}>
              Start adding routes to your favorites!
            </Text>
          </View>
        }
      />
    </View>
  );
};

const getTransportIcon = (type?: string): any => {
  const typeStr = type?.toLowerCase() || '';
  if (typeStr.includes('train')) return 'navigation';
  if (typeStr.includes('bus')) return 'truck';
  if (typeStr.includes('metro') || typeStr.includes('subway')) return 'zap';
  if (typeStr.includes('tram')) return 'minus';
  if (typeStr.includes('ferry') || typeStr.includes('boat')) return 'anchor';
  if (typeStr.includes('flight') || typeStr.includes('plane')) return 'send';
  if (typeStr.includes('taxi') || typeStr.includes('cab')) return 'navigation-2';
  if (typeStr.includes('bike') || typeStr.includes('bicycle')) return 'circle';
  return 'navigation'; // Default
};

const getStatusBadgeStyle = (status?: string) => {
  switch (status) {
    case 'Popular':
      return { backgroundColor: '#00C853' };
    case 'Active':
      return { backgroundColor: '#00A843' };
    case 'Upcoming':
      return { backgroundColor: '#00E863' };
    default:
      return { backgroundColor: '#008F43' };
  }
};

const getStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
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
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      color: isDarkMode ? '#fff' : '#00C853',
    },
    subtitle: {
      fontSize: 14,
      color: isDarkMode ? '#999' : '#666',
      marginTop: 4,
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
    footerLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
      flex: 1,
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
    priceText: {
      color: '#00C853',
      fontSize: 14,
      fontWeight: '700',
    },
    viewButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#00C853',
    },
    viewButtonText: {
      color: '#00C853',
      fontSize: 13,
      fontWeight: '600',
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
      paddingVertical: 100,
    },
    emptyText: {
      fontSize: 20,
      fontWeight: '600',
      color: '#000',
      marginTop: 16,
    },
    emptySubtext: {
      fontSize: 14,
      color: '#666',
      marginTop: 8,
    },
  });

export default FavoritesScreen;
