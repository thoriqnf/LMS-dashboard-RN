import { CodeBlock } from "@/components/ui/code-block-new";

export function Day4Session1Content() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">
            React Native Auth UI - Session 1
          </h1>

          <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg border border-blue-200 dark:border-blue-800 mb-8">
            <h3 className="text-blue-800 dark:text-blue-200 font-semibold mb-4 mt-0">
              🔐 Session Overview
            </h3>
            <ul className="text-blue-700 dark:text-blue-300 space-y-2 mb-0">
              <li>
                <strong>Basic Login Screen</strong> - Create login with email/password validation
              </li>
              <li>
                <strong>Advanced Signup Screen</strong> - Build registration with password strength
              </li>
              <li>
                <strong>Complete Auth System</strong> - Integrate splash screen with session management
              </li>
              <li>
                <strong>reqres.in API Integration</strong> - Connect to real mock authentication service
              </li>
              <li>
                <strong>Professional UI Components</strong> - Design polished authentication interfaces
              </li>
              <li>
                <strong>Form Validation Patterns</strong> - Implement real-time validation feedback
              </li>
            </ul>
          </div>
        </div>

      {/* Introduction */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Modern Authentication UI</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Professional mobile apps need robust authentication systems with intuitive UI, real-time validation, and seamless API integration. 
          We'll build a complete auth flow using React Native best practices and a real mock API.
        </p>
        
        <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
          <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">🔐 Auth Flow Components</h4>
          <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1">
            <li>• <strong>Splash Screen</strong>: Auto-login detection and app initialization</li>
            <li>• <strong>Login Screen</strong>: Email/password with real-time validation</li>
            <li>• <strong>Signup Screen</strong>: Comprehensive registration with validation</li>
            <li>• <strong>API Integration</strong>: reqres.in for realistic authentication testing</li>
          </ul>
        </div>
      </div>

      {/* Mock API Setup */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Mock API Setup (reqres.in)</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          We'll use reqres.in, a hosted REST API for testing and prototyping. It provides realistic responses for authentication endpoints.
        </p>

        <CodeBlock
          code={`// API Configuration
const API_BASE_URL = 'https://reqres.in/api';

// Authentication endpoints
const AUTH_ENDPOINTS = {
  login: \`\${API_BASE_URL}/login\`,
  register: \`\${API_BASE_URL}/register\`,
  users: \`\${API_BASE_URL}/users\`,
};

// Test credentials for reqres.in
const TEST_CREDENTIALS = {
  email: 'eve.holt@reqres.in',
  password: 'cityslicka'
};

// API helper functions
const apiRequest = async (endpoint, options = {}) => {
  try {
    const response = await fetch(endpoint, {
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Request failed');
    }
    
    return data;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};

export { API_BASE_URL, AUTH_ENDPOINTS, TEST_CREDENTIALS, apiRequest };`}
          language="javascript"
          filename="api/config.js"
          title="API Configuration"
        />

        <div className="bg-yellow-50 dark:bg-yellow-950/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800 mt-4">
          <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">📋 reqres.in Test Data</h4>
          <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1">
            <li>• <strong>Login Email</strong>: eve.holt@reqres.in</li>
            <li>• <strong>Login Password</strong>: cityslicka</li>
            <li>• <strong>Register Email</strong>: eve.holt@reqres.in</li>
            <li>• <strong>Register Password</strong>: pistol</li>
          </ul>
        </div>
      </div>

      {/* Example 1: Basic Login Screen */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Example 1: Basic Login Screen</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Let's start with a clean login screen that includes email/password fields, validation, and API integration.
        </p>

        <CodeBlock
          code={`import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform
} from 'react-native';

export default function LoginScreen({ navigation }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  const handleLogin = async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      const response = await fetch('https://reqres.in/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        Alert.alert('Success', 'Login successful!', [
          { text: 'OK', onPress: () => navigation.navigate('Home') }
        ]);
      } else {
        Alert.alert('Error', data.error || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to your account</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email Address</Text>
            <TextInput
              style={[
                styles.input,
                errors.email && styles.inputError
              ]}
              placeholder="Enter your email"
              value={formData.email}
              onChangeText={(text) => handleInputChange('email', text)}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            {errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={[
                styles.input,
                errors.password && styles.inputError
              ]}
              placeholder="Enter your password"
              value={formData.password}
              onChangeText={(text) => handleInputChange('password', text)}
              secureTextEntry
            />
            {errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
          </View>

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text style={styles.buttonText}>Sign In</Text>
            )}
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.linkText}>Sign up here</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.testCredentials}>
          <Text style={styles.testTitle}>Test Credentials:</Text>
          <Text style={styles.testText}>Email: eve.holt@reqres.in</Text>
          <Text style={styles.testText}>Password: cityslicka</Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  form: {
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#ffffff',
  },
  inputError: {
    borderColor: '#ef4444',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 12,
    marginTop: 4,
  },
  button: {
    backgroundColor: '#4f46e5',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  footerText: {
    fontSize: 14,
    color: '#6b7280',
  },
  linkText: {
    fontSize: 14,
    color: '#4f46e5',
    fontWeight: '600',
  },
  testCredentials: {
    padding: 16,
    backgroundColor: '#e0f2fe',
    borderRadius: 8,
    marginTop: 16,
  },
  testTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 8,
  },
  testText: {
    fontSize: 12,
    color: '#475569',
    marginBottom: 2,
  },
});`}
          language="jsx"
          filename="LoginScreen.jsx"
          title="Basic Login Screen with Validation"
        />

        <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border border-green-200 dark:border-green-800 mt-4">
          <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">✅ What's New in This Example</h4>
          <ul className="text-green-700 dark:text-green-300 text-sm space-y-1">
            <li>• <strong>Form Validation</strong> - Real-time email and password validation</li>
            <li>• <strong>Error States</strong> - Visual feedback for validation errors</li>
            <li>• <strong>Loading States</strong> - ActivityIndicator during API calls</li>
            <li>• <strong>KeyboardAvoidingView</strong> - Proper keyboard handling</li>
            <li>• <strong>reqres.in Integration</strong> - Real API authentication</li>
          </ul>
        </div>
      </div>

      {/* Example 2: Advanced Signup Screen */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Example 2: Advanced Signup Screen</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Now let's create a comprehensive signup screen with multiple fields, password strength indicators, and enhanced validation.
        </p>

        <CodeBlock
          code={`import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';

export default function SignupScreen({ navigation }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    feedback: []
  });

  // Password strength calculation
  const calculatePasswordStrength = (password) => {
    let score = 0;
    const feedback = [];
    
    if (password.length >= 8) {
      score += 1;
    } else {
      feedback.push('At least 8 characters');
    }
    
    if (/[a-z]/.test(password)) {
      score += 1;
    } else {
      feedback.push('Lowercase letter');
    }
    
    if (/[A-Z]/.test(password)) {
      score += 1;
    } else {
      feedback.push('Uppercase letter');
    }
    
    if (/[0-9]/.test(password)) {
      score += 1;
    } else {
      feedback.push('Number');
    }
    
    if (/[^A-Za-z0-9]/.test(password)) {
      score += 1;
    } else {
      feedback.push('Special character');
    }
    
    return { score, feedback };
  };

  useEffect(() => {
    if (formData.password) {
      setPasswordStrength(calculatePasswordStrength(formData.password));
    }
  }, [formData.password]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (passwordStrength.score < 3) {
      newErrors.password = 'Password is too weak';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  const handleSignup = async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      const response = await fetch('https://reqres.in/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          first_name: formData.firstName,
          last_name: formData.lastName
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        Alert.alert(
          'Success', 
          'Account created successfully!',
          [
            { 
              text: 'Sign In', 
              onPress: () => navigation.navigate('Login') 
            }
          ]
        );
      } else {
        Alert.alert('Error', data.error || 'Registration failed');
      }
    } catch (error) {
      console.error('Signup error:', error);
      Alert.alert('Error', 'Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrengthColor = (score) => {
    if (score <= 2) return '#ef4444';
    if (score <= 3) return '#f59e0b';
    return '#10b981';
  };

  const getPasswordStrengthText = (score) => {
    if (score <= 2) return 'Weak';
    if (score <= 3) return 'Fair';
    return 'Strong';
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Join us and get started</Text>
          </View>

          <View style={styles.form}>
            <View style={styles.row}>
              <View style={[styles.inputGroup, styles.halfWidth]}>
                <Text style={styles.label}>First Name</Text>
                <TextInput
                  style={[
                    styles.input,
                    errors.firstName && styles.inputError
                  ]}
                  placeholder="First name"
                  value={formData.firstName}
                  onChangeText={(text) => handleInputChange('firstName', text)}
                  autoCapitalize="words"
                />
                {errors.firstName && (
                  <Text style={styles.errorText}>{errors.firstName}</Text>
                )}
              </View>

              <View style={[styles.inputGroup, styles.halfWidth]}>
                <Text style={styles.label}>Last Name</Text>
                <TextInput
                  style={[
                    styles.input,
                    errors.lastName && styles.inputError
                  ]}
                  placeholder="Last name"
                  value={formData.lastName}
                  onChangeText={(text) => handleInputChange('lastName', text)}
                  autoCapitalize="words"
                />
                {errors.lastName && (
                  <Text style={styles.errorText}>{errors.lastName}</Text>
                )}
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                style={[
                  styles.input,
                  errors.email && styles.inputError
                ]}
                placeholder="Enter your email"
                value={formData.email}
                onChangeText={(text) => handleInputChange('email', text)}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
              {errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={[
                  styles.input,
                  errors.password && styles.inputError
                ]}
                placeholder="Create a password"
                value={formData.password}
                onChangeText={(text) => handleInputChange('password', text)}
                secureTextEntry
              />
              {formData.password && (
                <View style={styles.passwordStrength}>
                  <View style={styles.strengthHeader}>
                    <Text style={styles.strengthLabel}>Password Strength: </Text>
                    <Text style={[
                      styles.strengthValue,
                      { color: getPasswordStrengthColor(passwordStrength.score) }
                    ]}>
                      {getPasswordStrengthText(passwordStrength.score)}
                    </Text>
                  </View>
                  <View style={styles.strengthBar}>
                    <View 
                      style={[
                        styles.strengthFill,
                        { 
                          width: \`\${(passwordStrength.score / 5) * 100}%\`,
                          backgroundColor: getPasswordStrengthColor(passwordStrength.score)
                        }
                      ]}
                    />
                  </View>
                  {passwordStrength.feedback.length > 0 && (
                    <Text style={styles.strengthFeedback}>
                      Missing: {passwordStrength.feedback.join(', ')}
                    </Text>
                  )}
                </View>
              )}
              {errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Confirm Password</Text>
              <TextInput
                style={[
                  styles.input,
                  errors.confirmPassword && styles.inputError
                ]}
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChangeText={(text) => handleInputChange('confirmPassword', text)}
                secureTextEntry
              />
              {errors.confirmPassword && (
                <Text style={styles.errorText}>{errors.confirmPassword}</Text>
              )}
            </View>

            <TouchableOpacity
              style={[styles.button, loading && styles.buttonDisabled]}
              onPress={handleSignup}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <Text style={styles.buttonText}>Create Account</Text>
              )}
            </TouchableOpacity>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.linkText}>Sign in here</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.testCredentials}>
            <Text style={styles.testTitle}>Test Credentials:</Text>
            <Text style={styles.testText}>Email: eve.holt@reqres.in</Text>
            <Text style={styles.testText}>Password: pistol</Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 24,
    minHeight: '100%',
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  form: {
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  inputGroup: {
    marginBottom: 20,
  },
  halfWidth: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#ffffff',
  },
  inputError: {
    borderColor: '#ef4444',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 12,
    marginTop: 4,
  },
  passwordStrength: {
    marginTop: 8,
  },
  strengthHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  strengthLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  strengthValue: {
    fontSize: 12,
    fontWeight: '600',
  },
  strengthBar: {
    height: 4,
    backgroundColor: '#e5e7eb',
    borderRadius: 2,
    marginBottom: 4,
  },
  strengthFill: {
    height: '100%',
    borderRadius: 2,
  },
  strengthFeedback: {
    fontSize: 11,
    color: '#6b7280',
  },
  button: {
    backgroundColor: '#4f46e5',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  footerText: {
    fontSize: 14,
    color: '#6b7280',
  },
  linkText: {
    fontSize: 14,
    color: '#4f46e5',
    fontWeight: '600',
  },
  testCredentials: {
    padding: 16,
    backgroundColor: '#e0f2fe',
    borderRadius: 8,
    marginTop: 16,
  },
  testTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 8,
  },
  testText: {
    fontSize: 12,
    color: '#475569',
    marginBottom: 2,
  },
});`}
          language="jsx"
          filename="SignupScreen.jsx"
          title="Advanced Signup Screen with Password Strength"
        />

        <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border border-green-200 dark:border-green-800 mt-4">
          <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">✅ What's New in This Example</h4>
          <ul className="text-green-700 dark:text-green-300 text-sm space-y-1">
            <li>• <strong>Multi-field Form</strong> - Name, email, password, confirmation fields</li>
            <li>• <strong>Password Strength</strong> - Visual indicator with requirements</li>
            <li>• <strong>Row Layout</strong> - First/last name in a responsive row</li>
            <li>• <strong>ScrollView</strong> - Proper scrolling for longer forms</li>
            <li>• <strong>Enhanced Validation</strong> - Password matching and strength requirements</li>
          </ul>
        </div>
      </div>

      {/* Example 3: Complete Auth System */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Example 3: Complete Auth System with Splash Screen</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Let's create a complete authentication system with a splash screen that checks for existing sessions and navigates accordingly.
        </p>

        <CodeBlock
          code={`import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ActivityIndicator,
  Animated,
  Dimensions
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

export default function SplashScreen({ navigation }) {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0.8));
  const [loadingText, setLoadingText] = useState('Initializing...');

  useEffect(() => {
    startAnimations();
    checkAuthStatus();
  }, []);

  const startAnimations = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const checkAuthStatus = async () => {
    try {
      setLoadingText('Checking authentication...');
      
      // Simulate loading delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const userToken = await AsyncStorage.getItem('userToken');
      const userProfile = await AsyncStorage.getItem('userProfile');
      
      if (userToken && userProfile) {
        setLoadingText('Welcome back!');
        await new Promise(resolve => setTimeout(resolve, 1000));
        navigation.replace('Home');
      } else {
        setLoadingText('Redirecting to login...');
        await new Promise(resolve => setTimeout(resolve, 1000));
        navigation.replace('Login');
      }
    } catch (error) {
      console.error('Auth check error:', error);
      setLoadingText('Error occurred. Redirecting...');
      await new Promise(resolve => setTimeout(resolve, 1500));
      navigation.replace('Login');
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View 
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }]
          }
        ]}
      >
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>🔐</Text>
          <Text style={styles.appName}>SecureApp</Text>
          <Text style={styles.tagline}>Your secure authentication solution</Text>
        </View>
        
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4f46e5" />
          <Text style={styles.loadingText}>{loadingText}</Text>
        </View>
      </Animated.View>
      
      <View style={styles.footer}>
        <Text style={styles.version}>Version 1.0.0</Text>
      </View>
    </View>
  );
}

// Complete Auth Navigation Component
export function AuthNavigator() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const profile = await AsyncStorage.getItem('userProfile');
      
      if (token && profile) {
        setIsAuthenticated(true);
        setUserProfile(JSON.parse(profile));
      }
    } catch (error) {
      console.error('Auth check error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (userData) => {
    try {
      await AsyncStorage.setItem('userToken', userData.token);
      await AsyncStorage.setItem('userProfile', JSON.stringify(userData.user));
      setIsAuthenticated(true);
      setUserProfile(userData.user);
    } catch (error) {
      console.error('Login storage error:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.multiRemove(['userToken', 'userProfile']);
      setIsAuthenticated(false);
      setUserProfile(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (isLoading) {
    return <SplashScreen />;
  }

  if (isAuthenticated) {
    return <HomeScreen user={userProfile} onLogout={handleLogout} />;
  }

  return <AuthStack onLogin={handleLogin} />;
}

// Home Screen Component
function HomeScreen({ user, onLogout }) {
  return (
    <View style={styles.homeContainer}>
      <View style={styles.homeHeader}>
        <Text style={styles.homeTitle}>Welcome, {user?.first_name}!</Text>
        <Text style={styles.homeSubtitle}>You're successfully authenticated</Text>
      </View>
      
      <View style={styles.homeContent}>
        <View style={styles.profileCard}>
          <Text style={styles.profileTitle}>Profile Information</Text>
          <Text style={styles.profileText}>Name: {user?.first_name} {user?.last_name}</Text>
          <Text style={styles.profileText}>Email: {user?.email}</Text>
          <Text style={styles.profileText}>ID: {user?.id}</Text>
        </View>
        
        <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Auth Stack Component
function AuthStack({ onLogin }) {
  const [currentScreen, setCurrentScreen] = useState('Login');
  
  const navigation = {
    navigate: (screen) => setCurrentScreen(screen),
    replace: (screen) => setCurrentScreen(screen),
  };

  const handleLoginSuccess = (userData) => {
    onLogin(userData);
  };

  if (currentScreen === 'Login') {
    return (
      <LoginScreen 
        navigation={navigation} 
        onLoginSuccess={handleLoginSuccess} 
      />
    );
  }
  
  if (currentScreen === 'Signup') {
    return <SignupScreen navigation={navigation} />;
  }
  
  return <LoginScreen navigation={navigation} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4f46e5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  logo: {
    fontSize: 80,
    marginBottom: 20,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: '#e0e7ff',
    textAlign: 'center',
  },
  loadingContainer: {
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#e0e7ff',
    marginTop: 16,
  },
  footer: {
    position: 'absolute',
    bottom: 40,
  },
  version: {
    fontSize: 12,
    color: '#c7d2fe',
  },
  homeContainer: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  homeHeader: {
    padding: 24,
    paddingTop: 80,
    backgroundColor: '#4f46e5',
    alignItems: 'center',
  },
  homeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  homeSubtitle: {
    fontSize: 16,
    color: '#e0e7ff',
  },
  homeContent: {
    flex: 1,
    padding: 24,
  },
  profileCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  profileText: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 8,
  },
  logoutButton: {
    backgroundColor: '#ef4444',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});`}
          language="jsx"
          filename="AuthSystem.jsx"
          title="Complete Authentication System"
        />

        <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border border-green-200 dark:border-green-800 mt-4">
          <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">✅ What's New in This Example</h4>
          <ul className="text-green-700 dark:text-green-300 text-sm space-y-1">
            <li>• <strong>Splash Screen</strong> - Animated loading with auth status checking</li>
            <li>• <strong>Auto-login</strong> - Checks AsyncStorage for existing sessions</li>
            <li>• <strong>Navigation Flow</strong> - Complete auth state management</li>
            <li>• <strong>Animations</strong> - Smooth fade and scale animations</li>
            <li>• <strong>Session Management</strong> - Persistent authentication state</li>
          </ul>
        </div>
      </div>

      {/* Auth Flow Architecture */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Authentication Flow Architecture</h2>
        
        <div className="bg-gray-50 dark:bg-gray-950/20 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
          <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">🔄 Complete Auth Flow</h4>
          <div className="text-sm space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-blue-500">1.</span>
              <span className="text-gray-700 dark:text-gray-300">
                <strong>Splash Screen</strong> - Check AsyncStorage for existing token
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-blue-500">2.</span>
              <span className="text-gray-700 dark:text-gray-300">
                <strong>Auth Check</strong> - Validate token and redirect accordingly
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-blue-500">3.</span>
              <span className="text-gray-700 dark:text-gray-300">
                <strong>Login/Signup</strong> - User authentication with API
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-blue-500">4.</span>
              <span className="text-gray-700 dark:text-gray-300">
                <strong>Session Storage</strong> - Save token and profile to AsyncStorage
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-blue-500">5.</span>
              <span className="text-gray-700 dark:text-gray-300">
                <strong>Home Screen</strong> - Protected content with logout option
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Best Practices */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Auth UI Best Practices</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-3">🎨 UI/UX Guidelines</h4>
            <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1">
              <li>• Use clear, descriptive labels for form fields</li>
              <li>• Provide real-time validation feedback</li>
              <li>• Show loading states during API calls</li>
              <li>• Use proper keyboard types for inputs</li>
              <li>• Implement proper error handling</li>
            </ul>
          </div>
          
          <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
            <h4 className="font-semibold text-green-800 dark:text-green-200 mb-3">🔒 Security Practices</h4>
            <ul className="text-green-700 dark:text-green-300 text-sm space-y-1">
              <li>• Store tokens in secure storage (AsyncStorage for demo)</li>
              <li>• Implement proper session timeout</li>
              <li>• Use HTTPS for all API communications</li>
              <li>• Validate all inputs on both client and server</li>
              <li>• Implement proper logout functionality</li>
            </ul>
          </div>
        </div>
      </div>

      {/* API Integration Tips */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">API Integration Tips</h2>
        
        <div className="bg-yellow-50 dark:bg-yellow-950/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-3">📡 reqres.in Usage</h4>
          <div className="text-yellow-700 dark:text-yellow-300 text-sm space-y-2">
            <div>
              <strong>Login Endpoint:</strong> POST https://reqres.in/api/login
              <br />
              <code className="bg-yellow-100 dark:bg-yellow-900 px-2 py-1 rounded">
                {"{ \"email\": \"eve.holt@reqres.in\", \"password\": \"cityslicka\" }"}
              </code>
            </div>
            <div>
              <strong>Register Endpoint:</strong> POST https://reqres.in/api/register
              <br />
              <code className="bg-yellow-100 dark:bg-yellow-900 px-2 py-1 rounded">
                {"{ \"email\": \"eve.holt@reqres.in\", \"password\": \"pistol\" }"}
              </code>
            </div>
            <div>
              <strong>Success Response:</strong>
              <br />
              <code className="bg-yellow-100 dark:bg-yellow-900 px-2 py-1 rounded">
                {"{ \"token\": \"QpwL5tke4Pnpja7X4\" }"}
              </code>
            </div>
          </div>
        </div>
      </div>

      {/* Hands-On Exercise */}
      <div className="bg-orange-50 dark:bg-orange-950/20 p-6 rounded-xl border border-orange-200 dark:border-orange-800">
        <h3 className="text-lg font-semibold text-orange-900 dark:text-orange-100 mb-4">
          🎯 Hands-On Exercise: Enhanced Auth System
        </h3>
        
        <div className="text-orange-800 dark:text-orange-200 space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Challenge: Build a Complete Auth App</h4>
            <p className="text-sm">
              Create a full authentication system combining all three examples with additional features.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">Requirements:</h4>
            <ul className="text-sm space-y-1">
              <li>• Splash screen with auto-login detection</li>
              <li>• Login and signup screens with validation</li>
              <li>• Profile screen with user information</li>
              <li>• Logout functionality with session cleanup</li>
              <li>• Error handling for all network requests</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">Bonus Features:</h4>
            <ul className="text-sm space-y-1">
              <li>• Password reset functionality</li>
              <li>• Social login options (mock implementations)</li>
              <li>• Biometric authentication</li>
              <li>• Remember me functionality</li>
              <li>• Session timeout handling</li>
            </ul>
          </div>
        </div>
      </div>

        <div className="bg-green-50 dark:bg-green-950 p-6 rounded-lg border border-green-200 dark:border-green-800">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-3 mt-0">
            🎉 Session 1 Complete!
          </h4>
          <p className="text-green-700 dark:text-green-300 mb-3">
            You've built professional authentication screens with real-time validation, API integration, and session management. 
            These patterns form the foundation for secure mobile applications.
          </p>
          <p className="text-green-700 dark:text-green-300 mb-0">
            <strong>Next:</strong> Session 2 will dive into authentication logic with JWT tokens, 
            Expo Router navigation, and advanced state management patterns.
          </p>
        </div>
    </div>
  );
}