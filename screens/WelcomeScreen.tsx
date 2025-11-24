import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { useAppSelector } from '../hooks/redux-hooks';

interface WelcomeScreenProps {
  navigation?: any;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation: navProp }) => {
  const router = useRouter();
  const navigation = navProp || { navigate: (screen: string) => router.push(`/${screen}` as any) };
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);

  const styles = getStyles(isDarkMode);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/images/logo.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>

        <View style={styles.descriptionContainer}>
          <Text style={styles.title}>Welcome to GoMate</Text>
          <Text style={styles.subtitle}>
            Your trusted companion for seamless travel experiences
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.startButton}
          onPress={() => navigation.navigate('login')}
        >
          <Text style={styles.startButtonText}>Get Started</Text>
          <Feather name="arrow-right" size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.footerText}>
          Join thousands of happy travelers today
        </Text>
      </View>
    </View>
  );
};

const getStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#000' : '#F2F2F7',
      justifyContent: 'space-between',
    },
    content: {
      flex: 1,
      paddingHorizontal: 30,
      paddingTop: 100,
      alignItems: 'center',
      justifyContent: 'center',
    },
    logoContainer: {
      alignItems: 'center',
      marginBottom: 60,
    },
    logoImage: {
      width: 180,
      height: 180,
    },
    logoText: {
      fontSize: 42,
      fontWeight: 'bold',
      color: '#00C853',
      letterSpacing: 1,
    },
    descriptionContainer: {
      alignItems: 'center',
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      color: isDarkMode ? '#fff' : '#00C853',
      marginBottom: 16,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 18,
      color: '#999',
      marginBottom: 24,
      textAlign: 'center',
      fontWeight: '600',
    },
    description: {
      fontSize: 16,
      color: isDarkMode ? '#999' : '#bbbbbbff',
      textAlign: 'center',
      lineHeight: 26,
      paddingHorizontal: 20,
    },
    featuresContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
      marginTop: 20,
    },
    feature: {
      alignItems: 'center',
      gap: 8,
    },
    featureText: {
      fontSize: 12,
      color: isDarkMode ? '#fff' : '#000',
      fontWeight: '600',
    },
    footer: {
      paddingHorizontal: 30,
      paddingBottom: 50,
      alignItems: 'center',
    },
    startButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#00C853',
      width: '100%',
      paddingVertical: 18,
      borderRadius: 12,
      gap: 10,
      shadowColor: '#00C853',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 4,
      marginBottom: 16,
    },
    startButtonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: '700',
    },
    footerText: {
      fontSize: 13,
      color: isDarkMode ? '#999' : '#666',
      textAlign: 'center',
    },
  });

export default WelcomeScreen;
