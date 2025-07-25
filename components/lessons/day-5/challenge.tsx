"use client";

import { CodeBlock } from "@/components/ui/code-block-new";

export function Day5ChallengeContent() {
  return (
    <>
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg self-start">
            <div className="h-5 w-5 sm:h-6 sm:w-6 text-white">🏆</div>
          </div>
          <div>
            <h1 className="m-0 text-xl sm:text-2xl">Complete Device Features App Challenge</h1>
            <p className="text-muted-foreground m-0 text-sm sm:text-base">
              Build a comprehensive app that combines camera, location, notifications, and storage features
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 p-4 sm:p-6 rounded-lg border border-orange-200 dark:border-orange-800 mb-6">
          <h3 className="flex items-center gap-2 mt-0 mb-4 text-base sm:text-lg">
            🎯 Challenge Objectives
          </h3>
          <ul className="space-y-2 mb-0">
            <li className="flex items-start gap-2">
              <span className="text-orange-600 mt-0.5">📱</span>
              <span className="text-sm sm:text-base"><strong>Photo Diary:</strong> Capture images with location data and timestamps</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-600 mt-0.5">⚙️</span>
              <span className="text-sm sm:text-base"><strong>Settings Screen:</strong> User preferences stored with AsyncStorage</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-600 mt-0.5">📍</span>
              <span className="text-sm sm:text-base"><strong>Location Reminders:</strong> Smart notifications based on user location</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-600 mt-0.5">💾</span>
              <span className="text-sm sm:text-base"><strong>Export Feature:</strong> Save and backup all user data</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-600 mt-0.5">🚀</span>
              <span className="text-sm sm:text-base"><strong>Bonus:</strong> Photo sharing and cloud backup integration</span>
            </li>
          </ul>
        </div>

        <h3 className="flex items-center gap-2 text-base sm:text-lg">
          💻 Starter Code Template
        </h3>

        <CodeBlock
          code={`// Day 5 Challenge: Complete Device Features App
// Combine camera, location, notifications, and storage

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';

// Configure notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Define your data structures
interface DiaryEntry {
  id: string;
  text: string;
  imageUri?: string;
  location?: {
    latitude: number;
    longitude: number;
    address?: string;
  };
  timestamp: number;
}

interface UserSettings {
  notificationsEnabled: boolean;
  locationTracking: boolean;
  reminderTime: string;
  autoBackup: boolean;
  username: string;
}

interface AppState {
  entries: DiaryEntry[];
  settings: UserSettings;
  currentLocation: any;
}

export default function DeviceFeaturesApp(): JSX.Element {
  // State management
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [settings, setSettings] = useState<UserSettings>({
    notificationsEnabled: true,
    locationTracking: true,
    reminderTime: '18:00',
    autoBackup: false,
    username: '',
  });
  const [currentLocation, setCurrentLocation] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  // TODO: Implement your app features here!
  
  // 1. Photo Diary Features
  const capturePhoto = async (): Promise<void> => {
    // TODO: Implement camera capture with location tagging
    // - Request camera permissions
    // - Launch camera or image picker
    // - Get current location if enabled
    // - Create diary entry with photo and location
    // - Save to AsyncStorage
  };

  // 2. Settings Management
  const updateSettings = async (newSettings: UserSettings): Promise<void> => {
    // TODO: Implement settings persistence
    // - Update state
    // - Save to AsyncStorage
    // - Apply new settings (notifications, etc.)
  };

  // 3. Location-Based Reminders
  const scheduleLocationReminder = async (): Promise<void> => {
    // TODO: Implement smart location reminders
    // - Check current location
    // - Schedule notifications based on location
    // - Respect user preferences
  };

  // 4. Data Export
  const exportData = async (): Promise<void> => {
    // TODO: Implement data export feature
    // - Collect all diary entries
    // - Include user settings
    // - Create exportable format (JSON)
    // - Provide sharing options
  };

  // 5. Data Loading and Persistence
  useEffect(() => {
    loadUserData();
    setupNotifications();
  }, []);

  const loadUserData = async (): Promise<void> => {
    // TODO: Load saved data from AsyncStorage
    // - Load diary entries
    // - Load user settings
    // - Apply loaded settings
  };

  const setupNotifications = async (): Promise<void> => {
    // TODO: Set up notification system
    // - Request permissions
    // - Schedule daily reminders if enabled
    // - Handle notification interactions
  };

  // Your UI implementation
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>My Device Features App</Text>
        
        {/* TODO: Build your app interface */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Photo Diary</Text>
          {/* Photo capture and gallery display */}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          {/* Settings toggles and preferences */}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location & Reminders</Text>
          {/* Location display and reminder controls */}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data Export</Text>
          {/* Export and backup features */}
        </View>
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  section: {
    backgroundColor: 'white',
    margin: 15,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
});`}
          language="tsx"
          filename="DeviceFeaturesApp.tsx"
          title="Complete Device Features App Challenge"
        />

        <div className="bg-blue-50 dark:bg-blue-950 p-4 sm:p-6 rounded-lg border border-blue-200 dark:border-blue-800 mb-6">
          <h4 className="text-blue-800 dark:text-blue-200 font-semibold mb-3 mt-0 text-sm sm:text-base">
            💡 Implementation Tips
          </h4>
          <ul className="text-blue-700 dark:text-blue-300 text-xs sm:text-sm space-y-2 mb-0">
            <li>• <strong>Start Simple:</strong> Build each feature independently, then integrate</li>
            <li>• <strong>Permission Handling:</strong> Always check permissions before using device features</li>
            <li>• <strong>Error Handling:</strong> Wrap all async operations in try/catch blocks</li>
            <li>• <strong>User Experience:</strong> Show loading states and provide clear feedback</li>
            <li>• <strong>Data Persistence:</strong> Save data frequently and handle app state changes</li>
            <li>• <strong>Testing:</strong> Test on both iOS and Android simulators/devices</li>
          </ul>
        </div>

        <div className="bg-green-50 dark:bg-green-950 p-4 sm:p-6 rounded-lg border border-green-200 dark:border-green-800 mb-6">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-3 mt-0 text-sm sm:text-base">
            🏗️ Suggested Implementation Order
          </h4>
          <ol className="text-green-700 dark:text-green-300 text-xs sm:text-sm space-y-2 mb-0 list-decimal list-inside">
            <li><strong>Settings Screen:</strong> Build AsyncStorage foundation first</li>
            <li><strong>Photo Capture:</strong> Add camera functionality with basic storage</li>
            <li><strong>Location Integration:</strong> Enhance photos with location data</li>
            <li><strong>Notification System:</strong> Add reminders and location-based alerts</li>
            <li><strong>Data Export:</strong> Complete the app with backup functionality</li>
            <li><strong>Polish & Test:</strong> Refine UX and test all features together</li>
          </ol>
        </div>

        <div className="bg-purple-50 dark:bg-purple-950 p-4 sm:p-6 rounded-lg border border-purple-200 dark:border-purple-800">
          <h4 className="text-purple-800 dark:text-purple-200 font-semibold mb-3 mt-0 text-sm sm:text-base">
            🎯 Evaluation Criteria
          </h4>
          <div className="text-purple-700 dark:text-purple-300 text-xs sm:text-sm space-y-2">
            <div><strong>Functionality (40%):</strong> All device features work correctly</div>
            <div><strong>Integration (25%):</strong> Features work together seamlessly</div>
            <div><strong>User Experience (20%):</strong> Intuitive interface and smooth interactions</div>
            <div><strong>Code Quality (15%):</strong> Clean, well-organized TypeScript code</div>
            <div className="mt-3 pt-3 border-t border-purple-200 dark:border-purple-700">
              <strong>Bonus Points:</strong> Creative features, excellent error handling, or cloud integration
            </div>
          </div>
        </div>
      </div>
    </>
  );
}