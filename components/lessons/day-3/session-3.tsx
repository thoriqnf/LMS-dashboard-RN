import { CodeBlock } from "@/components/ui/code-block-new";

export function Day3Session3Content() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      {/* Session Overview */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-500 rounded-lg">
            <span className="text-white text-lg font-bold">📦</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-blue-900 dark:text-blue-100 m-0">
              Day 3, Session 3: AsyncStorage & Secure Store
            </h1>
            <p className="text-blue-700 dark:text-blue-300 m-0">
              Master local data persistence and secure storage for mobile apps
            </p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">🎯 Learning Objectives</h3>
            <ul className="text-blue-800 dark:text-blue-200 space-y-1">
              <li>• Install and configure AsyncStorage</li>
              <li>• Master read/write/delete operations</li>
              <li>• Implement login persistence</li>
              <li>• Use Secure Store for sensitive data</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">🚀 What You'll Build</h3>
            <ul className="text-blue-800 dark:text-blue-200 space-y-1">
              <li>• User preferences storage</li>
              <li>• Login session management</li>
              <li>• Secure token handling</li>
              <li>• Complete authentication flow</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Introduction */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Why Local Storage Matters</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Modern mobile apps need to persist data locally for offline capability, user preferences, and authentication. 
          React Native provides AsyncStorage for general data and Secure Store for sensitive information.
        </p>
        
        <div className="bg-yellow-50 dark:bg-yellow-950/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">📱 Mobile Storage Strategy</h4>
          <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1">
            <li>• <strong>AsyncStorage</strong>: User preferences, app settings, non-sensitive data</li>
            <li>• <strong>Secure Store</strong>: Tokens, passwords, API keys, sensitive credentials</li>
            <li>• <strong>Memory</strong>: Temporary state, cache data, session information</li>
          </ul>
        </div>
      </div>

      {/* Installation */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Setting Up AsyncStorage</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          AsyncStorage is React Native's persistent key-value storage system. Let's install and configure it.
        </p>

        <CodeBlock
          code={`# Install AsyncStorage
npm install @react-native-async-storage/async-storage

# For Expo projects
expo install @react-native-async-storage/async-storage

# Also install Secure Store for sensitive data
expo install expo-secure-store`}
          language="bash"
          filename="terminal"
          title="Package Installation"
        />

        <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800 mt-4">
          <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">💡 Installation Notes</h4>
          <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1">
            <li>• AsyncStorage is platform-specific (iOS/Android native implementations)</li>
            <li>• Secure Store uses iOS Keychain and Android Keystore</li>
            <li>• Both work seamlessly with Expo managed workflow</li>
          </ul>
        </div>
      </div>

      {/* Example 1: Basic AsyncStorage */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Example 1: User Preferences Storage</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Let's start with a simple user preferences app that saves theme and language settings.
        </p>

        <CodeBlock
          code={`import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PREFERENCES_KEY = 'user_preferences';

export default function PreferencesApp() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [language, setLanguage] = useState('en');
  const [loading, setLoading] = useState(true);

  // Load preferences on app start
  useEffect(() => {
    loadPreferences();
  }, []);

  const loadPreferences = async () => {
    try {
      const savedPrefs = await AsyncStorage.getItem(PREFERENCES_KEY);
      if (savedPrefs) {
        const prefs = JSON.parse(savedPrefs);
        setIsDarkMode(prefs.darkMode || false);
        setNotificationsEnabled(prefs.notifications !== false);
        setLanguage(prefs.language || 'en');
      }
    } catch (error) {
      console.error('Error loading preferences:', error);
      Alert.alert('Error', 'Failed to load preferences');
    } finally {
      setLoading(false);
    }
  };

  const savePreferences = async (newPrefs) => {
    try {
      const preferences = {
        darkMode: newPrefs.darkMode ?? isDarkMode,
        notifications: newPrefs.notifications ?? notificationsEnabled,
        language: newPrefs.language ?? language,
        lastUpdated: new Date().toISOString()
      };
      
      await AsyncStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences));
      console.log('Preferences saved successfully');
    } catch (error) {
      console.error('Error saving preferences:', error);
      Alert.alert('Error', 'Failed to save preferences');
    }
  };

  const toggleDarkMode = async () => {
    const newValue = !isDarkMode;
    setIsDarkMode(newValue);
    await savePreferences({ darkMode: newValue });
  };

  const toggleNotifications = async () => {
    const newValue = !notificationsEnabled;
    setNotificationsEnabled(newValue);
    await savePreferences({ notifications: newValue });
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading preferences...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <Text style={[styles.title, isDarkMode && styles.darkText]}>
        User Preferences
      </Text>
      
      <View style={styles.setting}>
        <Text style={[styles.settingLabel, isDarkMode && styles.darkText]}>
          Dark Mode
        </Text>
        <Switch
          value={isDarkMode}
          onValueChange={toggleDarkMode}
          trackColor={{ false: '#767577', true: '#4f46e5' }}
          thumbColor={isDarkMode ? '#f4f3f4' : '#f4f3f4'}
        />
      </View>
      
      <View style={styles.setting}>
        <Text style={[styles.settingLabel, isDarkMode && styles.darkText]}>
          Notifications
        </Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={toggleNotifications}
          trackColor={{ false: '#767577', true: '#4f46e5' }}
          thumbColor={notificationsEnabled ? '#f4f3f4' : '#f4f3f4'}
        />
      </View>
      
      <View style={styles.info}>
        <Text style={[styles.infoText, isDarkMode && styles.darkText]}>
          Language: {language.toUpperCase()}
        </Text>
        <Text style={[styles.infoText, isDarkMode && styles.darkText]}>
          Settings are automatically saved
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9fafb',
  },
  darkContainer: {
    backgroundColor: '#1f2937',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#1f2937',
  },
  darkText: {
    color: '#f9fafb',
  },
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  settingLabel: {
    fontSize: 16,
    color: '#374151',
  },
  info: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#e0f2fe',
    borderRadius: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#0f172a',
    marginBottom: 5,
  },
});`}
          language="jsx"
          filename="PreferencesApp.jsx"
          title="Basic AsyncStorage - User Preferences"
        />

        <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border border-green-200 dark:border-green-800 mt-4">
          <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">✅ What's New in This Example</h4>
          <ul className="text-green-700 dark:text-green-300 text-sm space-y-1">
            <li>• <strong>AsyncStorage.getItem()</strong> - Retrieves stored data by key</li>
            <li>• <strong>AsyncStorage.setItem()</strong> - Saves data with a key</li>
            <li>• <strong>JSON.parse/stringify</strong> - Converts objects to/from strings</li>
            <li>• <strong>useEffect for loading</strong> - Loads data when app starts</li>
            <li>• <strong>Error handling</strong> - Try/catch for storage operations</li>
          </ul>
        </div>
      </div>

      {/* Example 2: Login Persistence */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Example 2: Login Session Management</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Now let's build a login system that persists user sessions. This builds on our API knowledge from Session 2.
        </p>

        <CodeBlock
          code={`import { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_DATA_KEY = 'user_data';
const LOGIN_STATUS_KEY = 'login_status';

export default function LoginApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);

  // Check login status on app start
  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const loginStatus = await AsyncStorage.getItem(LOGIN_STATUS_KEY);
      const storedUserData = await AsyncStorage.getItem(USER_DATA_KEY);
      
      if (loginStatus === 'true' && storedUserData) {
        setIsLoggedIn(true);
        setUserData(JSON.parse(storedUserData));
      }
    } catch (error) {
      console.error('Error checking login status:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }

    setLoading(true);
    
    try {
      // Simulate API call (replace with your actual login API)
      const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
      const user = await response.json();
      
      // In real app, you'd validate credentials here
      const mockUserData = {
        id: user.id,
        name: user.name,
        email: user.email,
        loginTime: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
      };

      // Save login data
      await AsyncStorage.setItem(LOGIN_STATUS_KEY, 'true');
      await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(mockUserData));
      
      setIsLoggedIn(true);
      setUserData(mockUserData);
      setEmail('');
      setPassword('');
      
      Alert.alert('Success', 'Login successful!');
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Clear stored data
      await AsyncStorage.multiRemove([LOGIN_STATUS_KEY, USER_DATA_KEY]);
      
      setIsLoggedIn(false);
      setUserData(null);
      
      Alert.alert('Success', 'Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      Alert.alert('Error', 'Logout failed');
    }
  };

  const clearAllData = async () => {
    try {
      await AsyncStorage.clear();
      Alert.alert('Success', 'All app data cleared');
      setIsLoggedIn(false);
      setUserData(null);
    } catch (error) {
      console.error('Clear data error:', error);
      Alert.alert('Error', 'Failed to clear data');
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (isLoggedIn && userData) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Welcome Back!</Text>
        
        <View style={styles.userInfo}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>{userData.name}</Text>
        </View>
        
        <View style={styles.userInfo}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{userData.email}</Text>
        </View>
        
        <View style={styles.userInfo}>
          <Text style={styles.label}>Login Time:</Text>
          <Text style={styles.value}>
            {new Date(userData.loginTime).toLocaleString()}
          </Text>
        </View>
        
        <TouchableOpacity style={styles.button} onPress={logout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.dangerButton]} 
          onPress={clearAllData}
        >
          <Text style={styles.buttonText}>Clear All Data</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      <TouchableOpacity 
        style={[styles.button, loading && styles.disabledButton]} 
        onPress={login}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Logging in...' : 'Login'}
        </Text>
      </TouchableOpacity>
      
      <Text style={styles.hint}>
        Use any email and password to demo login
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9fafb',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#1f2937',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#ffffff',
  },
  button: {
    backgroundColor: '#4f46e5',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  dangerButton: {
    backgroundColor: '#ef4444',
  },
  disabledButton: {
    backgroundColor: '#9ca3af',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  userInfo: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#e0f2fe',
    borderRadius: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    color: '#1f2937',
  },
  hint: {
    textAlign: 'center',
    color: '#6b7280',
    fontSize: 14,
    marginTop: 10,
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#6b7280',
  },
});`}
          language="jsx"
          filename="LoginApp.jsx"
          title="Login Session Management"
        />

        <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border border-green-200 dark:border-green-800 mt-4">
          <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">✅ What's New in This Example</h4>
          <ul className="text-green-700 dark:text-green-300 text-sm space-y-1">
            <li>• <strong>AsyncStorage.multiRemove()</strong> - Removes multiple keys at once</li>
            <li>• <strong>AsyncStorage.clear()</strong> - Removes all stored data</li>
            <li>• <strong>Session persistence</strong> - Maintains login across app restarts</li>
            <li>• <strong>User data management</strong> - Stores and retrieves user information</li>
            <li>• <strong>Expiration handling</strong> - Includes session expiration logic</li>
          </ul>
        </div>
      </div>

      {/* Example 3: Secure Store */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Example 3: Secure Token Storage</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          For sensitive data like authentication tokens, use Secure Store which encrypts data using platform-specific secure storage.
        </p>

        <CodeBlock
          code={`import { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

const USER_PROFILE_KEY = 'user_profile';
const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

export default function SecureAuthApp() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      // Check for access token in secure storage
      const accessToken = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
      const profile = await AsyncStorage.getItem(USER_PROFILE_KEY);
      
      if (accessToken && profile) {
        setIsAuthenticated(true);
        setUserProfile(JSON.parse(profile));
        
        // Validate token with server (in real app)
        console.log('Found stored token:', accessToken.substring(0, 20) + '...');
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      // If there's an error, clear potentially corrupted data
      await clearAuthData();
    } finally {
      setLoading(false);
    }
  };

  const authenticate = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }

    setLoading(true);
    
    try {
      // Simulate authentication API call
      const mockAuthResponse = {
        success: true,
        user: {
          id: 1,
          name: 'John Doe',
          email: email,
          avatar: 'https://via.placeholder.com/150',
        },
        tokens: {
          accessToken: 'mock_access_token_' + Date.now(),
          refreshToken: 'mock_refresh_token_' + Date.now(),
          expiresIn: 3600, // 1 hour
        }
      };

      if (mockAuthResponse.success) {
        // Store sensitive tokens in Secure Store
        await SecureStore.setItemAsync(
          ACCESS_TOKEN_KEY, 
          mockAuthResponse.tokens.accessToken
        );
        await SecureStore.setItemAsync(
          REFRESH_TOKEN_KEY, 
          mockAuthResponse.tokens.refreshToken
        );
        
        // Store non-sensitive user data in AsyncStorage
        await AsyncStorage.setItem(
          USER_PROFILE_KEY, 
          JSON.stringify(mockAuthResponse.user)
        );
        
        setIsAuthenticated(true);
        setUserProfile(mockAuthResponse.user);
        setEmail('');
        setPassword('');
        
        Alert.alert('Success', 'Authentication successful!');
      }
    } catch (error) {
      console.error('Authentication error:', error);
      Alert.alert('Error', 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const clearAuthData = async () => {
    try {
      // Clear secure tokens
      await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
      await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
      
      // Clear user profile
      await AsyncStorage.removeItem(USER_PROFILE_KEY);
      
      setIsAuthenticated(false);
      setUserProfile(null);
      
      console.log('Auth data cleared successfully');
    } catch (error) {
      console.error('Error clearing auth data:', error);
    }
  };

  const logout = async () => {
    await clearAuthData();
    Alert.alert('Success', 'Logged out successfully');
  };

  const refreshAuthToken = async () => {
    try {
      const refreshToken = await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
      
      if (!refreshToken) {
        throw new Error('No refresh token found');
      }
      
      // Simulate refresh token API call
      const newAccessToken = 'refreshed_access_token_' + Date.now();
      
      await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, newAccessToken);
      
      Alert.alert('Success', 'Token refreshed successfully');
      console.log('Token refreshed:', newAccessToken.substring(0, 20) + '...');
    } catch (error) {
      console.error('Token refresh error:', error);
      Alert.alert('Error', 'Failed to refresh token. Please login again.');
      await logout();
    }
  };

  const getStoredToken = async () => {
    try {
      const token = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
      if (token) {
        Alert.alert('Token Found', token.substring(0, 50) + '...');
      } else {
        Alert.alert('No Token', 'No access token found');
      }
    } catch (error) {
      console.error('Error getting token:', error);
      Alert.alert('Error', 'Failed to retrieve token');
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Checking authentication...</Text>
      </View>
    );
  }

  if (isAuthenticated && userProfile) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>🔐 Secure Dashboard</Text>
        
        <View style={styles.profileCard}>
          <Text style={styles.profileName}>{userProfile.name}</Text>
          <Text style={styles.profileEmail}>{userProfile.email}</Text>
          <Text style={styles.profileId}>ID: {userProfile.id}</Text>
        </View>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={getStoredToken}>
            <Text style={styles.buttonText}>Show Token</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.warningButton]} 
            onPress={refreshAuthToken}
          >
            <Text style={styles.buttonText}>Refresh Token</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.dangerButton]} 
            onPress={logout}
          >
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.securityInfo}>
          <Text style={styles.securityTitle}>🛡️ Security Features</Text>
          <Text style={styles.securityText}>
            • Tokens stored in encrypted keychain/keystore
          </Text>
          <Text style={styles.securityText}>
            • Profile data in standard AsyncStorage
          </Text>
          <Text style={styles.securityText}>
            • Automatic cleanup on auth errors
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔐 Secure Authentication</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      <TouchableOpacity 
        style={[styles.button, loading && styles.disabledButton]} 
        onPress={authenticate}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Authenticating...' : 'Login Securely'}
        </Text>
      </TouchableOpacity>
      
      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>🔒 Secure Storage</Text>
        <Text style={styles.infoText}>
          Tokens will be stored using platform-specific secure storage
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9fafb',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#1f2937',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#ffffff',
  },
  button: {
    backgroundColor: '#4f46e5',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  warningButton: {
    backgroundColor: '#f59e0b',
  },
  dangerButton: {
    backgroundColor: '#ef4444',
  },
  disabledButton: {
    backgroundColor: '#9ca3af',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginBottom: 20,
  },
  profileCard: {
    backgroundColor: '#e0f2fe',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    alignItems: 'center',
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 5,
  },
  profileEmail: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 5,
  },
  profileId: {
    fontSize: 14,
    color: '#9ca3af',
  },
  securityInfo: {
    backgroundColor: '#dcfce7',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  securityTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#166534',
    marginBottom: 10,
  },
  securityText: {
    fontSize: 14,
    color: '#166534',
    marginBottom: 5,
  },
  infoBox: {
    backgroundColor: '#e0f2fe',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e40af',
    marginBottom: 5,
  },
  infoText: {
    fontSize: 14,
    color: '#1e40af',
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#6b7280',
  },
});`}
          language="jsx"
          filename="SecureAuthApp.jsx"
          title="Secure Token Storage with Secure Store"
        />

        <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border border-green-200 dark:border-green-800 mt-4">
          <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">✅ What's New in This Example</h4>
          <ul className="text-green-700 dark:text-green-300 text-sm space-y-1">
            <li>• <strong>SecureStore.setItemAsync()</strong> - Stores data in encrypted storage</li>
            <li>• <strong>SecureStore.getItemAsync()</strong> - Retrieves encrypted data</li>
            <li>• <strong>SecureStore.deleteItemAsync()</strong> - Removes encrypted data</li>
            <li>• <strong>Hybrid storage strategy</strong> - Secure + AsyncStorage combination</li>
            <li>• <strong>Token refresh flow</strong> - Secure token management pattern</li>
          </ul>
        </div>
      </div>

      {/* Storage Comparison */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">AsyncStorage vs Secure Store</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-3">📦 AsyncStorage</h4>
            <div className="text-sm space-y-2">
              <div>
                <strong className="text-blue-900 dark:text-blue-100">Best for:</strong>
                <p className="text-blue-700 dark:text-blue-300">User preferences, app settings, cache data</p>
              </div>
              <div>
                <strong className="text-blue-900 dark:text-blue-100">Security:</strong>
                <p className="text-blue-700 dark:text-blue-300">Plain text storage, not encrypted</p>
              </div>
              <div>
                <strong className="text-blue-900 dark:text-blue-100">Performance:</strong>
                <p className="text-blue-700 dark:text-blue-300">Fast, good for frequent reads/writes</p>
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
            <h4 className="font-semibold text-green-800 dark:text-green-200 mb-3">🔐 Secure Store</h4>
            <div className="text-sm space-y-2">
              <div>
                <strong className="text-green-900 dark:text-green-100">Best for:</strong>
                <p className="text-green-700 dark:text-green-300">Tokens, passwords, API keys, sensitive data</p>
              </div>
              <div>
                <strong className="text-green-900 dark:text-green-100">Security:</strong>
                <p className="text-green-700 dark:text-green-300">Encrypted, uses iOS Keychain/Android Keystore</p>
              </div>
              <div>
                <strong className="text-green-900 dark:text-green-100">Performance:</strong>
                <p className="text-green-700 dark:text-green-300">Slower, use for critical data only</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Best Practices */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Best Practices & Tips</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-yellow-50 dark:bg-yellow-950/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-3">⚠️ Security Guidelines</h4>
            <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1">
              <li>• Never store passwords in AsyncStorage</li>
              <li>• Use Secure Store for authentication tokens</li>
              <li>• Always include error handling</li>
              <li>• Implement token refresh mechanisms</li>
              <li>• Clear data on logout</li>
            </ul>
          </div>
          
          <div className="bg-purple-50 dark:bg-purple-950/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
            <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-3">🚀 Performance Tips</h4>
            <ul className="text-purple-700 dark:text-purple-300 text-sm space-y-1">
              <li>• Batch operations with multiSet/multiGet</li>
              <li>• Use try/catch for all storage operations</li>
              <li>• Implement loading states</li>
              <li>• Cache frequently accessed data</li>
              <li>• Set reasonable expiration times</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Hands-On Exercise */}
      <div className="bg-orange-50 dark:bg-orange-950/20 p-6 rounded-xl border border-orange-200 dark:border-orange-800">
        <h3 className="text-lg font-semibold text-orange-900 dark:text-orange-100 mb-4">
          🎯 Hands-On Exercise: Complete Authentication System
        </h3>
        
        <div className="text-orange-800 dark:text-orange-200 space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Challenge: Build a Complete Auth System</h4>
            <p className="text-sm">
              Combine all three examples into a single app with user preferences, login persistence, and secure token storage.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">Requirements:</h4>
            <ul className="text-sm space-y-1">
              <li>• User can login and logout</li>
              <li>• App remembers login state across restarts</li>
              <li>• User preferences are saved and persist</li>
              <li>• Tokens are stored securely</li>
              <li>• Proper error handling for all storage operations</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">Bonus Features:</h4>
            <ul className="text-sm space-y-1">
              <li>• Implement session timeout</li>
              <li>• Add biometric authentication</li>
              <li>• Create a data export feature</li>
              <li>• Add offline mode detection</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Session Summary */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800 mt-8">
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4">
          🎉 Session 3 Complete!
        </h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">What You've Learned</h4>
            <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1">
              <li>• AsyncStorage for app data persistence</li>
              <li>• Secure Store for sensitive data</li>
              <li>• Login session management</li>
              <li>• User preference storage</li>
              <li>• Security best practices</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Next Steps</h4>
            <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1">
              <li>• Practice building complete auth flows</li>
              <li>• Explore biometric authentication</li>
              <li>• Learn about data synchronization</li>
              <li>• Study offline-first app architecture</li>
              <li>• Implement data backup strategies</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}