import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import { authService } from '../services/authService';
import { setUser } from '../store/slices/authSlice';
import { loginSchema } from '../utils/validation';

interface LoginScreenProps {
  navigation: any;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);

  const handleLogin = async () => {
    try {
      // Validate inputs
      await loginSchema.validate({ username, password }, { abortEarly: false });
      setErrors({});

      setLoading(true);

      // Call login API (use 'emilys' and 'emilyspass' for demo with DummyJSON)
      const response = await authService.login({ username, password });

      // Store user data
      dispatch(setUser(response));

      Alert.alert('Success', 'Logged in successfully!');
    } catch (error: any) {
      if (error.name === 'ValidationError') {
        const validationErrors: any = {};
        error.inner.forEach((err: any) => {
          validationErrors[err.path] = err.message;
        });
        setErrors(validationErrors);
      } else {
        Alert.alert(
          'Login Failed', 
          'Invalid credentials. Please use the demo credentials below.',
          [{ text: 'OK' }]
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const fillDemoCredentials = () => {
    setUsername('emilys');
    setPassword('emilyspass');
  };

  const styles = getStyles(isDarkMode);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Feather name="navigation" size={50} color="#00C853" />
          </View>
          <Text style={styles.title}>GoMate</Text>
          <Text style={styles.subtitle}>Book Your Ride, Anytime</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Feather name="user" size={20} color={isDarkMode ? '#999' : '#666'} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor={isDarkMode ? '#999' : '#999'}
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />
          </View>
          {errors.username && <Text style={styles.errorText}>{errors.username}</Text>}

          <View style={styles.inputContainer}>
            <Feather name="lock" size={20} color={isDarkMode ? '#999' : '#666'} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor={isDarkMode ? '#999' : '#999'}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Feather name={showPassword ? 'eye-off' : 'eye'} size={20} color={isDarkMode ? '#999' : '#666'} />
            </TouchableOpacity>
          </View>
          {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.loginButtonText}>Login</Text>
            )}
          </TouchableOpacity>

          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.registerLink}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const getStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#000' : '#fff',
    },
    scrollContent: {
      flexGrow: 1,
      justifyContent: 'center',
      padding: 20,
    },
    header: {
      alignItems: 'center',
      marginBottom: 40,
    },
    title: {
      fontSize: 36,
      fontWeight: 'bold',
      color: isDarkMode ? '#fff' : '#000',
      marginTop: 10,
    },
    subtitle: {
      fontSize: 16,
      color: isDarkMode ? '#999' : '#666',
      marginTop: 5,
    },
    form: {
      width: '100%',
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: isDarkMode ? '#1C1C1E' : '#F2F2F7',
      borderRadius: 12,
      paddingHorizontal: 15,
      marginBottom: 5,
      height: 56,
    },
    icon: {
      marginRight: 10,
    },
    input: {
      flex: 1,
      fontSize: 16,
      color: isDarkMode ? '#fff' : '#000',
    },
    errorText: {
      color: '#FF3B30',
      fontSize: 12,
      marginBottom: 10,
      marginLeft: 15,
    },
    loginButton: {
      backgroundColor: '#00C853',
      borderRadius: 8,
      height: 52,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
      shadowColor: '#00C853',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 4,
    },
    logoContainer: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: isDarkMode ? '#1a1a1a' : '#f0f9f4',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 16,
    },
    loginButtonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: '600',
    },
    registerContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 20,
    },
    registerText: {
      color: isDarkMode ? '#999' : '#666',
      fontSize: 14,
    },
    registerLink: {
      color: '#00C853',
      fontSize: 14,
      fontWeight: '600',
    },
    demoContainer: {
      marginTop: 30,
      padding: 15,
      backgroundColor: isDarkMode ? '#1C1C1E' : '#F2F2F7',
      borderRadius: 12,
      alignItems: 'center',
    },
    demoTitle: {
      color: isDarkMode ? '#fff' : '#000',
      fontSize: 14,
      fontWeight: '600',
      marginBottom: 8,
    },
    demoText: {
      color: isDarkMode ? '#999' : '#666',
      fontSize: 13,
      marginVertical: 2,
    },
    autofillButton: {
      marginTop: 10,
      backgroundColor: '#00C853',
      paddingHorizontal: 20,
      paddingVertical: 8,
      borderRadius: 6,
    },
    autofillText: {
      color: '#fff',
      fontSize: 12,
      fontWeight: '600',
    },
  });

export default LoginScreen;
