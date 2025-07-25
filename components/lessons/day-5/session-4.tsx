"use client";

import { CodeBlock } from "@/components/ui/code-block-new";

export function Day5Session4Content() {
  return (
    <>
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">
            Device Storage & Preferences - Bonus Session 4
          </h1>

          <div className="bg-purple-50 dark:bg-purple-950 p-6 rounded-lg border border-purple-200 dark:border-purple-800 mb-8">
            <h3 className="text-purple-800 dark:text-purple-200 font-semibold mb-4 mt-0">
              🎁 Bonus Session Overview
            </h3>
            <ul className="text-purple-700 dark:text-purple-300 space-y-2 mb-0">
              <li>
                <strong>AsyncStorage Basics</strong> - Store user preferences and app data locally
              </li>
              <li>
                <strong>Settings Management</strong> - Build a simple settings screen with toggles
              </li>
              <li>
                <strong>Data Persistence</strong> - Keep user preferences across app restarts
              </li>
            </ul>
          </div>
        </div>

        <h2>1. Why Learn Device Storage?</h2>
        <p>
          Apps need to remember user preferences—dark mode settings, notification preferences, user data. 
          AsyncStorage lets us save simple data locally on the device, like a tiny database for your app.
        </p>

        <div className="bg-green-50 dark:bg-green-950 p-6 rounded-lg border border-green-200 dark:border-green-800 mb-6">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-3 mt-0">
            ✅ Storage Best Practices:
          </h4>
          <ul className="text-green-700 dark:text-green-300 text-sm space-y-1 mb-0">
            <li><strong>Simple data only</strong> - Store strings, numbers, booleans (not complex objects)</li>
            <li><strong>Handle errors</strong> - Storage operations can fail, always use try/catch</li>
            <li><strong>Keep it lightweight</strong> - Don't store large amounts of data</li>
            <li><strong>User control</strong> - Let users easily reset or clear their data</li>
          </ul>
        </div>

        <h2>2. Installing AsyncStorage</h2>
        <p>
          AsyncStorage provides simple key-value storage that persists across app restarts.
        </p>

        <CodeBlock
          code={`# Install AsyncStorage
npx expo install @react-native-async-storage/async-storage`}
          language="bash"
          filename="terminal"
          title="Installation Command"
        />

        <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800 my-6">
          <h4 className="text-yellow-800 dark:text-yellow-200 font-semibold mb-2 mt-0">
            📱 Development Note
          </h4>
          <p className="text-yellow-700 dark:text-yellow-300 text-sm mb-2">
            AsyncStorage works automatically in development. For production, it's configured automatically with Expo.
            Data persists between app restarts but gets cleared when you uninstall the app.
          </p>
        </div>

        <h2>3. Example 1: Simple Settings Manager</h2>
        <p>
          Let's create a settings screen that saves user preferences to device storage.
        </p>

        <CodeBlock
          code={`import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  Alert,
  SafeAreaView,
  StyleSheet,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define our app settings structure
interface AppSettings {
  darkMode: boolean;
  notifications: boolean;
  soundEnabled: boolean;
  autoSave: boolean;
}

// Default settings when app first launches
const DEFAULT_SETTINGS: AppSettings = {
  darkMode: false,
  notifications: true,
  soundEnabled: true,
  autoSave: true,
};

const STORAGE_KEY = 'app_settings';

export default function SettingsManager(): JSX.Element {
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // Load settings when component mounts
  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async (): Promise<void> => {
    try {
      const savedSettings = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedSettings) {
        const parsedSettings: AppSettings = JSON.parse(savedSettings);
        setSettings(parsedSettings);
        console.log('✅ Settings loaded:', parsedSettings);
      } else {
        console.log('📱 No saved settings, using defaults');
      }
    } catch (error) {
      console.error('❌ Failed to load settings:', error);
      Alert.alert('Error', 'Failed to load your settings. Using defaults.');
    } finally {
      setIsLoading(false);
    }
  };

  const saveSettings = async (newSettings: AppSettings): Promise<void> => {
    try {
      setIsSaving(true);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newSettings));
      setSettings(newSettings);
      console.log('💾 Settings saved:', newSettings);
    } catch (error) {
      console.error('❌ Failed to save settings:', error);
      Alert.alert('Error', 'Failed to save your settings. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const updateSetting = <K extends keyof AppSettings>(
    key: K,
    value: AppSettings[K]
  ): void => {
    const newSettings = { ...settings, [key]: value };
    saveSettings(newSettings);
  };

  const resetSettings = (): void => {
    Alert.alert(
      'Reset Settings',
      'Are you sure you want to reset all settings to default?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => saveSettings(DEFAULT_SETTINGS),
        },
      ]
    );
  };

  const clearAllData = (): void => {
    Alert.alert(
      'Clear All Data',
      'This will remove all app data from your device. Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.clear();
              setSettings(DEFAULT_SETTINGS);
              Alert.alert('Success', 'All app data has been cleared.');
            } catch (error) {
              Alert.alert('Error', 'Failed to clear data.');
            }
          },
        },
      ]
    );
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading settings...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>App Settings</Text>
        <Text style={styles.subtitle}>
          Your preferences are saved automatically
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Appearance</Text>
          
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Dark Mode</Text>
              <Text style={styles.settingDescription}>
                Use dark theme throughout the app
              </Text>
            </View>
            <Switch
              value={settings.darkMode}
              onValueChange={(value) => updateSetting('darkMode', value)}
              disabled={isSaving}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Enable Notifications</Text>
              <Text style={styles.settingDescription}>
                Receive important updates and reminders
              </Text>
            </View>
            <Switch
              value={settings.notifications}
              onValueChange={(value) => updateSetting('notifications', value)}
              disabled={isSaving}
            />
          </View>

          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Sound Effects</Text>
              <Text style={styles.settingDescription}>
                Play sounds for notifications and actions
              </Text>
            </View>
            <Switch
              value={settings.soundEnabled}
              onValueChange={(value) => updateSetting('soundEnabled', value)}
              disabled={isSaving}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data</Text>
          
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Auto-Save</Text>
              <Text style={styles.settingDescription}>
                Automatically save your work
              </Text>
            </View>
            <Switch
              value={settings.autoSave}
              onValueChange={(value) => updateSetting('autoSave', value)}
              disabled={isSaving}
            />
          </View>
        </View>

        <View style={styles.buttonSection}>
          <TouchableOpacity
            style={styles.resetButton}
            onPress={resetSettings}
            disabled={isSaving}
          >
            <Text style={styles.resetButtonText}>🔄 Reset to Defaults</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.clearButton}
            onPress={clearAllData}
            disabled={isSaving}
          >
            <Text style={styles.clearButtonText}>🗑️ Clear All Data</Text>
          </TouchableOpacity>
        </View>

        {isSaving && (
          <View style={styles.savingIndicator}>
            <Text style={styles.savingText}>💾 Saving...</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  section: {
    backgroundColor: 'white',
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 12,
    paddingVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingInfo: {
    flex: 1,
    paddingRight: 15,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
  },
  buttonSection: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    gap: 12,
  },
  resetButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  resetButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  clearButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  clearButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  savingIndicator: {
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    paddingVertical: 12,
    alignItems: 'center',
    marginHorizontal: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  savingText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '500',
  },
});`}
          language="tsx"
          filename="SettingsManager.tsx"
          title="Complete Settings Screen with AsyncStorage"
        />

        <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg border border-green-200 dark:border-green-800 my-6">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-2 mt-0">
            🔧 Key Learning Points
          </h4>
          <div className="text-green-700 dark:text-green-300 text-sm space-y-2">
            <div>• <strong>JSON storage</strong> - Convert objects to strings for storage</div>
            <div>• <strong>Error handling</strong> - Wrap all storage operations in try/catch</div>
            <div>• <strong>Loading states</strong> - Show user feedback during async operations</div>
            <div>• <strong>Default values</strong> - Provide fallbacks when no data exists</div>
          </div>
        </div>

        <h2>4. Example 2: User Preferences Hook</h2>
        <p>
          Let's create a reusable hook for managing user preferences throughout your app.
        </p>

        <CodeBlock
          code={`import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define user preference structure
interface UserPreferences {
  username: string;
  profilePicture: string | null;
  favoriteColor: string;
  dailyGoal: number;
}

const DEFAULT_PREFERENCES: UserPreferences = {
  username: '',
  profilePicture: null,
  favoriteColor: '#007AFF',
  dailyGoal: 3,
};

const PREFERENCES_KEY = 'user_preferences';

// Custom hook for managing user preferences
export function useUserPreferences() {
  const [preferences, setPreferences] = useState<UserPreferences>(DEFAULT_PREFERENCES);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Load preferences on hook initialization
  useEffect(() => {
    loadPreferences();
  }, []);

  const loadPreferences = async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      
      const stored = await AsyncStorage.getItem(PREFERENCES_KEY);
      if (stored) {
        const parsed: UserPreferences = JSON.parse(stored);
        setPreferences(parsed);
        console.log('👤 User preferences loaded');
      }
    } catch (err) {
      const errorMessage = 'Failed to load preferences';
      console.error('❌', errorMessage, err);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
      setIsLoaded(true);
    }
  };

  const savePreferences = async (newPreferences: UserPreferences): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);
      
      await AsyncStorage.setItem(PREFERENCES_KEY, JSON.stringify(newPreferences));
      setPreferences(newPreferences);
      console.log('💾 Preferences saved');
      return true;
    } catch (err) {
      const errorMessage = 'Failed to save preferences';
      console.error('❌', errorMessage, err);
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updatePreference = async <K extends keyof UserPreferences>(
    key: K,
    value: UserPreferences[K]
  ): Promise<boolean> => {
    const newPreferences = { ...preferences, [key]: value };
    return await savePreferences(newPreferences);
  };

  const resetPreferences = async (): Promise<boolean> => {
    return await savePreferences(DEFAULT_PREFERENCES);
  };

  const clearPreferences = async (): Promise<boolean> => {
    try {
      await AsyncStorage.removeItem(PREFERENCES_KEY);
      setPreferences(DEFAULT_PREFERENCES);
      console.log('🗑️ Preferences cleared');
      return true;
    } catch (err) {
      console.error('❌ Failed to clear preferences:', err);
      setError('Failed to clear preferences');
      return false;
    }
  };

  return {
    preferences,
    isLoaded,
    isLoading,
    error,
    updatePreference,
    savePreferences,
    resetPreferences,
    clearPreferences,
    reload: loadPreferences,
  };
}

// Example component using the hook
export default function UserProfile(): JSX.Element {
  const {
    preferences,
    isLoaded,
    isLoading,
    error,
    updatePreference,
    resetPreferences,
  } = useUserPreferences();

  if (!isLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading profile...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>❌ {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Profile</Text>
      
      <View style={styles.profileCard}>
        <Text style={styles.label}>Username:</Text>
        <Text style={styles.value}>
          {preferences.username || 'Not set'}
        </Text>
        
        <Text style={styles.label}>Favorite Color:</Text>
        <View style={[styles.colorPreview, { backgroundColor: preferences.favoriteColor }]} />
        
        <Text style={styles.label}>Daily Goal:</Text>
        <Text style={styles.value}>{preferences.dailyGoal} tasks</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => updatePreference('username', 'Demo User')}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading ? 'Updating...' : 'Set Demo Username'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.resetButton}
        onPress={resetPreferences}
        disabled={isLoading}
      >
        <Text style={styles.resetButtonText}>Reset Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#FF3B30',
    textAlign: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  profileCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  value: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  colorPreview: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resetButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  resetButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});`}
          language="tsx"
          filename="UserPreferences.tsx"
          title="Reusable User Preferences Hook and Component"
        />

        <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800 my-6">
          <h4 className="text-blue-800 dark:text-blue-200 font-semibold mb-2 mt-0">
            🎯 Hook Benefits
          </h4>
          <div className="text-blue-700 dark:text-blue-300 text-sm space-y-2">
            <div>• <strong>Reusability</strong> - Use the same preferences logic anywhere</div>
            <div>• <strong>Type safety</strong> - TypeScript ensures correct data types</div>
            <div>• <strong>Error handling</strong> - Built-in error states and recovery</div>
            <div>• <strong>Loading states</strong> - Track async operations automatically</div>
          </div>
        </div>

        <h2>5. Practice Exercise</h2>
        <p>
          Build your own data storage feature using what you've learned!
        </p>

        <div className="bg-orange-50 dark:bg-orange-950 p-6 rounded-lg border border-orange-200 dark:border-orange-800 mb-6">
          <h4 className="text-orange-800 dark:text-orange-200 font-semibold mb-3 mt-0">
            🎯 Build a Personal Diary App
          </h4>
          <div className="text-orange-700 dark:text-orange-300 space-y-2">
            <div><strong>Goal:</strong> Create a simple diary that saves entries to device storage</div>
            <div className="text-sm space-y-1 mt-2">
              <div>• Use AsyncStorage to save diary entries with dates</div>
              <div>• Create a list view showing all saved entries</div>
              <div>• Add the ability to edit and delete entries</div>
              <div>• Include user settings for font size and theme</div>
              <div>• Handle storage errors and loading states</div>
            </div>
          </div>
        </div>

        <h2>6. Combining Device Features</h2>
        <p>
          Now that you know all the device features, let's see how they work together!
        </p>

        <CodeBlock
          code={`import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';

// Combined example showing all device features
interface AppState {
  hasPhoto: boolean;
  hasLocation: boolean;
  notificationsEnabled: boolean;
  lastUsed: string;
}

export default function DeviceFeaturesDemo(): JSX.Element {
  const [appState, setAppState] = useState<AppState>({
    hasPhoto: false,
    hasLocation: false,
    notificationsEnabled: false,
    lastUsed: '',
  });

  useEffect(() => {
    loadAppState();
    saveLastUsed();
  }, []);

  const loadAppState = async (): Promise<void> => {
    try {
      const stored = await AsyncStorage.getItem('app_state');
      if (stored) {
        setAppState(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load app state:', error);
    }
  };

  const saveAppState = async (newState: AppState): Promise<void> => {
    try {
      await AsyncStorage.setItem('app_state', JSON.stringify(newState));
      setAppState(newState);
    } catch (error) {
      console.error('Failed to save app state:', error);
    }
  };

  const saveLastUsed = async (): Promise<void> => {
    const now = new Date().toLocaleString();
    const newState = { ...appState, lastUsed: now };
    await saveAppState(newState);
  };

  const testCamera = async (): Promise<void> => {
    try {
      const permission = await ImagePicker.requestCameraPermissionsAsync();
      if (!permission.granted) return;

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        quality: 0.8,
      });

      if (!result.canceled) {
        const newState = { ...appState, hasPhoto: true };
        await saveAppState(newState);
        Alert.alert('Success!', 'Photo captured and app state saved');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to access camera');
    }
  };

  const testLocation = async (): Promise<void> => {
    try {
      const permission = await Location.requestForegroundPermissionsAsync();
      if (!permission.granted) return;

      const location = await Location.getCurrentPositionAsync({});
      const newState = { ...appState, hasLocation: true };
      await saveAppState(newState);
      
      Alert.alert(
        'Location Found!',
        \`Lat: \${location.coords.latitude.toFixed(4)}\\nLng: \${location.coords.longitude.toFixed(4)}\`
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to get location');
    }
  };

  const testNotifications = async (): Promise<void> => {
    try {
      const permission = await Notifications.requestPermissionsAsync();
      if (!permission.granted) return;

      await Notifications.scheduleNotificationAsync({
        content: {
          title: '🎉 All Features Working!',
          body: 'Camera, location, storage, and notifications are all set up!',
        },
        trigger: { seconds: 2 },
      });

      const newState = { ...appState, notificationsEnabled: true };
      await saveAppState(newState);
      Alert.alert('Notification Scheduled!', 'Check in 2 seconds');
    } catch (error) {
      Alert.alert('Error', 'Failed to schedule notification');
    }
  };

  const resetAll = async (): Promise<void> => {
    try {
      await AsyncStorage.clear();
      setAppState({
        hasPhoto: false,
        hasLocation: false,
        notificationsEnabled: false,
        lastUsed: '',
      });
      Alert.alert('Reset Complete!', 'All app data cleared');
    } catch (error) {
      Alert.alert('Error', 'Failed to reset app data');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Device Features Demo</Text>
      <Text style={styles.subtitle}>Test all features together</Text>

      <View style={styles.statusSection}>
        <Text style={styles.statusTitle}>Feature Status:</Text>
        <Text style={styles.statusItem}>
          📷 Camera: {appState.hasPhoto ? '✅ Used' : '❌ Not used'}
        </Text>
        <Text style={styles.statusItem}>
          📍 Location: {appState.hasLocation ? '✅ Found' : '❌ Not found'}
        </Text>
        <Text style={styles.statusItem}>
          🔔 Notifications: {appState.notificationsEnabled ? '✅ Enabled' : '❌ Disabled'}
        </Text>
        {appState.lastUsed && (
          <Text style={styles.statusItem}>
            🕒 Last used: {appState.lastUsed}
          </Text>
        )}
      </View>

      <View style={styles.buttonSection}>
        <TouchableOpacity style={styles.button} onPress={testCamera}>
          <Text style={styles.buttonText}>📷 Test Camera</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={testLocation}>
          <Text style={styles.buttonText}>📍 Test Location</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={testNotifications}>
          <Text style={styles.buttonText}>🔔 Test Notifications</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.resetButton} onPress={resetAll}>
          <Text style={styles.resetButtonText}>🔄 Reset All Data</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  statusSection: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  statusItem: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
    fontFamily: 'monospace',
  },
  buttonSection: {
    gap: 12,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resetButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  resetButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});`}
          language="tsx"
          filename="DeviceFeaturesDemo.tsx"
          title="Combined Device Features Demo"
        />

        <h2>7. Session Summary</h2>

        <div className="bg-purple-50 dark:bg-purple-950 p-6 rounded-lg border border-purple-200 dark:border-purple-800">
          <h4 className="text-purple-800 dark:text-purple-200 font-semibold mb-3 mt-0">
            📚 What You Learned:
          </h4>
          <ul className="text-purple-700 dark:text-purple-300 text-sm space-y-1 mb-0">
            <li><strong>AsyncStorage</strong> - Simple device storage for user preferences and app data</li>
            <li><strong>Custom hooks</strong> - Reusable logic for managing stored data</li>
            <li><strong>Settings patterns</strong> - Building user preference interfaces</li>
            <li><strong>Error handling</strong> - Proper storage error management</li>
            <li><strong>Feature integration</strong> - Combining multiple device features together</li>
          </ul>
        </div>
        
        <div className="bg-green-50 dark:bg-green-950 p-6 rounded-lg border border-green-200 dark:border-green-800 mt-6">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-3 mt-0">
            🎉 Day 5 Complete!
          </h4>
          <div className="text-green-700 dark:text-green-300 space-y-2">
            <div>
              <strong>You've mastered:</strong> Camera/Gallery, Location Services, Notifications, and Storage!
            </div>
            <div>
              <strong>Challenge:</strong> Build a complete app that uses all four device features
            </div>
            <div>
              <strong>Next steps:</strong> Combine these features with navigation, forms, and APIs
            </div>
          </div>
        </div>
      </div>
    </>
  );
}