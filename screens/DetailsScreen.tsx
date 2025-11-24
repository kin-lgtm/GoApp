import { Feather } from '@expo/vector-icons';
import React from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import { toggleFavorite, TransportItem } from '../store/slices/favoritesSlice';

interface DetailsScreenProps {
  navigation: any;
  route: {
    params: {
      item: TransportItem;
    };
  };
}

const DetailsScreen: React.FC<DetailsScreenProps> = ({ navigation, route }) => {
  const { item } = route.params;
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);
  const favorites = useAppSelector((state) => state.favorites.items);
  const dispatch = useAppDispatch();

  const isFavorite = favorites.some((fav) => fav.id === item.id);

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(item));
  };

  const styles = getStyles(isDarkMode);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: item.image }}
            style={styles.image}
            resizeMode="cover"
          />
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Feather name="arrow-left" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={handleToggleFavorite}
          >
            <Feather
              name={isFavorite ? 'heart' : 'heart'}
              size={24}
              color={isFavorite ? '#FF3B30' : '#fff'}
              fill={isFavorite ? '#FF3B30' : 'transparent'}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.titleContainer}>
              <Text style={[styles.title, isDarkMode && styles.textDark]}>{item.title}</Text>
              <View style={[styles.statusBadge, getStatusBadgeStyle(item.status)]}>
                <Text style={styles.statusText}>{item.status}</Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, isDarkMode && styles.textDark]}>Route Information</Text>
            <View style={styles.infoCard}>
              <View style={styles.infoRow}>
                <View style={styles.infoItem}>
                  <Feather name="navigation" size={20} color="#00C853" />
                  <View style={styles.infoTextContainer}>
                    <Text style={[styles.infoLabel, isDarkMode && styles.textSecondaryDark]}>Type</Text>
                    <Text style={[styles.infoValue, isDarkMode && styles.textDark]}>{item.type}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.infoRow}>
                <View style={styles.infoItem}>
                  <Feather name="clock" size={20} color="#00C853" />
                  <View style={styles.infoTextContainer}>
                    <Text style={[styles.infoLabel, isDarkMode && styles.textSecondaryDark]}>Duration</Text>
                    <Text style={[styles.infoValue, isDarkMode && styles.textDark]}>{item.duration}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.infoRow}>
                <View style={styles.infoItem}>
                  <Feather name="map-pin" size={20} color="#34C759" />
                  <View style={styles.infoTextContainer}>
                    <Text style={[styles.infoLabel, isDarkMode && styles.textSecondaryDark]}>Departure</Text>
                    <Text style={[styles.infoValue, isDarkMode && styles.textDark]}>{item.departure}</Text>
                  </View>
                </View>
                <View style={styles.infoItem}>
                  <Feather name="map-pin" size={20} color="#FF3B30" />
                  <View style={styles.infoTextContainer}>
                    <Text style={[styles.infoLabel, isDarkMode && styles.textSecondaryDark]}>Arrival</Text>
                    <Text style={[styles.infoValue, isDarkMode && styles.textDark]}>{item.arrival}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, isDarkMode && styles.textDark]}>Description</Text>
            <Text style={[styles.description, isDarkMode && styles.textSecondaryDark]}>
              {item.description}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, isDarkMode && styles.textDark]}>Amenities</Text>
            <View style={styles.amenitiesContainer}>
              <View style={styles.amenityItem}>
                <Feather name="wifi" size={24} color="#00C853" />
                <Text style={[styles.amenityText, isDarkMode && styles.textDark]}>WiFi</Text>
              </View>
              <View style={styles.amenityItem}>
                <Feather name="coffee" size={24} color="#00C853" />
                <Text style={[styles.amenityText, isDarkMode && styles.textDark]}>Refreshments</Text>
              </View>
              <View style={styles.amenityItem}>
                <Feather name="shield" size={24} color="#00C853" />
                <Text style={[styles.amenityText, isDarkMode && styles.textDark]}>Safe Travel</Text>
              </View>
              <View style={styles.amenityItem}>
                <Feather name="zap" size={24} color="#00C853" />
                <Text style={[styles.amenityText, isDarkMode && styles.textDark]}>Fast</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.priceContainer}>
          <Text style={[styles.priceLabel, isDarkMode && styles.textSecondaryDark]}>Price</Text>
          <Text style={[styles.price, isDarkMode && styles.textDark]}>${item.price}</Text>
        </View>
        <TouchableOpacity style={styles.bookButton}>
          <Text style={styles.bookButtonText}>Book Now</Text>
          <Feather name="arrow-right" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
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
    imageContainer: {
      position: 'relative',
    },
    image: {
      width: '100%',
      height: 300,
    },
    backButton: {
      position: 'absolute',
      top: 50,
      left: 20,
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    favoriteButton: {
      position: 'absolute',
      top: 50,
      right: 20,
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    content: {
      padding: 20,
    },
    header: {
      marginBottom: 20,
    },
    titleContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#000',
      flex: 1,
      marginRight: 10,
    },
    statusBadge: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 8,
    },
    statusText: {
      color: '#fff',
      fontSize: 12,
      fontWeight: '600',
    },
    section: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: '#000',
      marginBottom: 12,
    },
    infoCard: {
      backgroundColor: isDarkMode ? '#1C1C1E' : '#fff',
      borderRadius: 12,
      padding: 16,
    },
    infoRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    infoItem: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    infoTextContainer: {
      marginLeft: 12,
    },
    infoLabel: {
      fontSize: 12,
      color: '#666',
      marginBottom: 2,
    },
    infoValue: {
      fontSize: 16,
      fontWeight: '600',
      color: '#000',
    },
    divider: {
      height: 1,
      backgroundColor: isDarkMode ? '#2C2C2E' : '#E5E5EA',
      marginVertical: 12,
    },
    description: {
      fontSize: 16,
      color: '#666',
      lineHeight: 24,
    },
    amenitiesContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 16,
    },
    amenityItem: {
      alignItems: 'center',
      width: '22%',
    },
    amenityText: {
      fontSize: 12,
      color: '#000',
      marginTop: 8,
      textAlign: 'center',
    },
    footer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: isDarkMode ? '#1C1C1E' : '#fff',
      padding: 20,
      borderTopWidth: 1,
      borderTopColor: isDarkMode ? '#2C2C2E' : '#E5E5EA',
    },
    priceContainer: {
      flex: 1,
    },
    priceLabel: {
      fontSize: 14,
      color: '#666',
      marginBottom: 4,
    },
    price: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#000',
    },
    bookButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#00C853',
      paddingHorizontal: 24,
      paddingVertical: 16,
      borderRadius: 8,
      gap: 8,
      shadowColor: '#00C853',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 4,
    },
    bookButtonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: '700',
    },
    textDark: {
      color: '#fff',
    },
    textSecondaryDark: {
      color: '#999',
    },
  });

export default DetailsScreen;
