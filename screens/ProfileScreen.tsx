import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import { logout } from '../store/slices/authSlice';
import { toggleTheme } from '../store/slices/themeSlice';

interface ProfileScreenProps {
  navigation?: any;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation: navProp }) => {
  const router = useRouter();
  const navigation = navProp || router;

  const user = useAppSelector((state) => state.auth.user);
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);
  const favorites = useAppSelector((state) => state.favorites.items);
  const dispatch = useAppDispatch();

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

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  const styles = getStyles(isDarkMode);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
            </Text>
          </View>
        </View>
        <Text style={styles.name}>
          {user?.firstName} {user?.lastName}
        </Text>
        <Text style={styles.username}>@{user?.username}</Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{favorites.length}</Text>
          <Text style={styles.statLabel}>Favorites</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>0</Text>
          <Text style={styles.statLabel}>Trips</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>0</Text>
          <Text style={styles.statLabel}>Reviews</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>

        <View style={styles.menuItem}>
          <View style={styles.menuItemLeft}>
            <Feather name={isDarkMode ? 'moon' : 'sun'} size={22} color="#00C853" />
            <Text style={styles.menuItemText}>Dark Mode</Text>
          </View>
          <Switch
            value={isDarkMode}
            onValueChange={handleToggleTheme}
            trackColor={{ false: '#E5E5EA', true: '#00C853' }}
            thumbColor="#fff"
          />
        </View>

        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuItemLeft}>
            <Feather name="bell" size={22} color="#00C853" />
            <Text style={styles.menuItemText}>Notifications</Text>
          </View>
          <Feather name="chevron-right" size={22} color={isDarkMode ? '#666' : '#999'} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuItemLeft}>
            <Feather name="globe" size={22} color="#00C853" />
            <Text style={styles.menuItemText}>Language</Text>
          </View>
          <View style={styles.menuItemRight}>
            <Text style={styles.menuItemValue}>English</Text>
            <Feather name="chevron-right" size={22} color={isDarkMode ? '#666' : '#999'} />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>

        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuItemLeft}>
            <Feather name="user" size={22} color="#00C853" />
            <Text style={styles.menuItemText}>Edit Profile</Text>
          </View>
          <Feather name="chevron-right" size={22} color={isDarkMode ? '#666' : '#999'} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuItemLeft}>
            <Feather name="lock" size={22} color="#00C853" />
            <Text style={styles.menuItemText}>Change Password</Text>
          </View>
          <Feather name="chevron-right" size={22} color={isDarkMode ? '#666' : '#999'} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuItemLeft}>
            <Feather name="shield" size={22} color="#00C853" />
            <Text style={styles.menuItemText}>Privacy & Security</Text>
          </View>
          <Feather name="chevron-right" size={22} color={isDarkMode ? '#666' : '#999'} />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>

        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuItemLeft}>
            <Feather name="help-circle" size={22} color="#00C853" />
            <Text style={styles.menuItemText}>Help Center</Text>
          </View>
          <Feather name="chevron-right" size={22} color={isDarkMode ? '#666' : '#999'} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuItemLeft}>
            <Feather name="info" size={22} color="#00C853" />
            <Text style={styles.menuItemText}>About</Text>
          </View>
          <Feather name="chevron-right" size={22} color={isDarkMode ? '#666' : '#999'} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Feather name="log-out" size={22} color="#FF3B30" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>GoMate v1.0.0</Text>
      </View>
    </ScrollView>
  );
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
      paddingBottom: 30,
      alignItems: 'center',
    },
    avatarContainer: {
      marginBottom: 16,
    },
    avatar: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: '#00C853',
      justifyContent: 'center',
      alignItems: 'center',
    },
    avatarText: {
      fontSize: 36,
      fontWeight: 'bold',
      color: '#fff',
    },
    name: {
      fontSize: 24,
      fontWeight: 'bold',
      color: isDarkMode ? '#fff' : '#00C853',
      marginBottom: 4,
    },
    username: {
      fontSize: 16,
      color: '#00C853',
      marginBottom: 4,
    },
    email: {
      fontSize: 14,
      color: isDarkMode ? '#999' : '#666',
    },
    statsContainer: {
      flexDirection: 'row',
      backgroundColor: isDarkMode ? '#1C1C1E' : '#fff',
      marginVertical: 16,
      marginHorizontal: 20,
      borderRadius: 12,
      padding: 20,
    },
    statItem: {
      flex: 1,
      alignItems: 'center',
    },
    statValue: {
      fontSize: 24,
      fontWeight: 'bold',
      color: isDarkMode ? '#fff' : '#000',
      marginBottom: 4,
    },
    statLabel: {
      fontSize: 12,
      color: isDarkMode ? '#999' : '#666',
    },
    statDivider: {
      width: 1,
      backgroundColor: isDarkMode ? '#2C2C2E' : '#E5E5EA',
    },
    section: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: '600',
      color: isDarkMode ? '#fff' : '#000',
      marginHorizontal: 20,
      marginBottom: 12,
    },
    menuItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: isDarkMode ? '#1C1C1E' : '#fff',
      paddingVertical: 16,
      paddingHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: isDarkMode ? '#2C2C2E' : '#E5E5EA',
    },
    menuItemLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    menuItemText: {
      fontSize: 16,
      color: isDarkMode ? '#fff' : '#000',
    },
    menuItemRight: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    menuItemValue: {
      fontSize: 16,
      color: isDarkMode ? '#999' : '#666',
    },
    logoutButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: isDarkMode ? '#1C1C1E' : '#fff',
      marginHorizontal: 20,
      marginVertical: 16,
      paddingVertical: 16,
      borderRadius: 12,
      gap: 12,
    },
    logoutText: {
      fontSize: 16,
      fontWeight: '600',
      color: '#FF3B30',
    },
    footer: {
      alignItems: 'center',
      paddingVertical: 20,
    },
    footerText: {
      fontSize: 12,
      color: isDarkMode ? '#666' : '#999',
    },
  });

export default ProfileScreen;
