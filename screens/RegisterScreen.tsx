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
import { registerSchema } from '../utils/validation';

interface RegisterScreenProps {
  navigation: any;
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleRegister = async () => {
    try {
      // Validate inputs
      await registerSchema.validate(formData, { abortEarly: false });
      setErrors({});

      setLoading(true);

      // Call register API
      const response = await authService.register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      // Registration successful - show success message
      Alert.alert(
        'Success',
        'Account created successfully! You can now login with your credentials.',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error: any) {
      if (error.name === 'ValidationError') {
        const validationErrors: any = {};
        error.inner.forEach((err: any) => {
          validationErrors[err.path] = err.message;
        });
        setErrors(validationErrors);
      } else {
        const errorMessage = error.response?.data?.message || error.message || 'Registration failed. Please try again.';
        Alert.alert('Registration Failed', errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  const styles = getStyles(isDarkMode);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Feather name="arrow-left" size={24} color={isDarkMode ? '#fff' : '#000'} />
          </TouchableOpacity>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join GoMate today</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Feather name="user" size={20} color={isDarkMode ? '#999' : '#666'} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="First Name"
              placeholderTextColor={isDarkMode ? '#999' : '#999'}
              value={formData.firstName}
              onChangeText={(value) => handleChange('firstName', value)}
            />
          </View>
          {errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}

          <View style={styles.inputContainer}>
            <Feather name="user" size={20} color={isDarkMode ? '#999' : '#666'} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              placeholderTextColor={isDarkMode ? '#999' : '#999'}
              value={formData.lastName}
              onChangeText={(value) => handleChange('lastName', value)}
            />
          </View>
          {errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}

          <View style={styles.inputContainer}>
            <Feather name="at-sign" size={20} color={isDarkMode ? '#999' : '#666'} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor={isDarkMode ? '#999' : '#999'}
              value={formData.username}
              onChangeText={(value) => handleChange('username', value)}
              autoCapitalize="none"
            />
          </View>
          {errors.username && <Text style={styles.errorText}>{errors.username}</Text>}

          <View style={styles.inputContainer}>
            <Feather name="mail" size={20} color={isDarkMode ? '#999' : '#666'} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor={isDarkMode ? '#999' : '#999'}
              value={formData.email}
              onChangeText={(value) => handleChange('email', value)}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

          <View style={styles.inputContainer}>
            <Feather name="lock" size={20} color={isDarkMode ? '#999' : '#666'} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor={isDarkMode ? '#999' : '#999'}
              value={formData.password}
              onChangeText={(value) => handleChange('password', value)}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Feather name={showPassword ? 'eye-off' : 'eye'} size={20} color={isDarkMode ? '#999' : '#666'} />
            </TouchableOpacity>
          </View>
          {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

          <View style={styles.inputContainer}>
            <Feather name="lock" size={20} color={isDarkMode ? '#999' : '#666'} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor={isDarkMode ? '#999' : '#999'}
              value={formData.confirmPassword}
              onChangeText={(value) => handleChange('confirmPassword', value)}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
            />
          </View>
          {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}

          <TouchableOpacity
            style={styles.registerButton}
            onPress={handleRegister}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.registerButtonText}>Register</Text>
            )}
          </TouchableOpacity>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.loginLink}>Login</Text>
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
      padding: 20,
      paddingTop: 60,
    },
    header: {
      marginBottom: 30,
    },
    backButton: {
      marginBottom: 20,
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      color: isDarkMode ? '#fff' : '#000',
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
    registerButton: {
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
    registerButtonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: '600',
    },
    loginContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 20,
    },
    loginText: {
      color: isDarkMode ? '#999' : '#666',
      fontSize: 14,
    },
    loginLink: {
      color: '#00C853',
      fontSize: 14,
      fontWeight: '600',
    },
  });

export default RegisterScreen;
