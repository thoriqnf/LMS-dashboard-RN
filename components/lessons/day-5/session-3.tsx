"use client";

import { CodeBlock } from "@/components/ui/code-block-new";

export function Day5Session3Content() {
  return (
    <>
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">
            Simple Notifications - Session 3
          </h1>

          <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg border border-blue-200 dark:border-blue-800 mb-8">
            <h3 className="text-blue-800 dark:text-blue-200 font-semibold mb-4 mt-0">
              🔔 Session Overview
            </h3>
            <ul className="text-blue-700 dark:text-blue-300 space-y-2 mb-0">
              <li>
                <strong>Notification Setup</strong> - Install expo-notifications and basic configuration
              </li>
              <li>
                <strong>Permission Handling</strong> - Request notification permissions properly
              </li>
              <li>
                <strong>Local Notifications</strong> - Schedule simple notifications that work offline
              </li>
            </ul>
          </div>
        </div>

        <h2>1. Understanding Mobile Notifications</h2>
        <p>
          Mobile notifications are messages that appear on a user's device to provide timely information, even when your app isn't actively open. 
          They're essential for user engagement and keeping your app useful throughout the day.
        </p>

        <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg border border-blue-200 dark:border-blue-800 mb-6">
          <h4 className="text-blue-800 dark:text-blue-200 font-semibold mb-3 mt-0">
            📱 Types of Notifications
          </h4>
          <div className="text-blue-700 dark:text-blue-300 text-sm space-y-3">
            <div>
              <strong>Local Notifications:</strong> Scheduled by your app, work offline, perfect for reminders and alarms
            </div>
            <div>
              <strong>Push Notifications:</strong> Sent from a server, require internet, used for messages and updates
            </div>
            <div>
              <strong>Today's Focus:</strong> We'll build local notifications - they're simpler and don't need server setup
            </div>
          </div>
        </div>

        <h2>2. Expo Notifications Theory</h2>
        <p>
          Expo provides a unified notification system that works consistently across iOS and Android. 
          Behind the scenes, it handles the complex platform differences for you.
        </p>

        <div className="bg-green-50 dark:bg-green-950 p-6 rounded-lg border border-green-200 dark:border-green-800 mb-6">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-3 mt-0">
            🔧 How Expo Notifications Work
          </h4>
          <div className="text-green-700 dark:text-green-300 text-sm space-y-2">
            <div><strong>1. Permission Request:</strong> Ask user for notification access (required on both platforms)</div>
            <div><strong>2. Schedule or Send:</strong> Create notification with title, body, and trigger time</div>
            <div><strong>3. System Delivery:</strong> iOS/Android handles showing the notification to user</div>
            <div><strong>4. User Interaction:</strong> User taps notification → your app receives the event</div>
          </div>
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800 my-6">
          <h4 className="text-yellow-800 dark:text-yellow-200 font-semibold mb-2 mt-0">
            🏗️ Expo Account Setup (For Push Notifications)
          </h4>
          <div className="text-yellow-700 dark:text-yellow-300 text-sm space-y-2">
            <p><strong>For Local Notifications:</strong> No Expo account setup needed! Everything works locally.</p>
            <p><strong>For Push Notifications (Advanced):</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Create account at <code>expo.dev</code></li>
              <li>Run <code>expo login</code> in your project</li>
              <li>Configure push notification credentials</li>
              <li>Set up server to send notifications</li>
            </ul>
            <p><strong>Today's Focus:</strong> Local notifications only - no account needed!</p>
          </div>
        </div>

        <div className="bg-green-50 dark:bg-green-950 p-6 rounded-lg border border-green-200 dark:border-green-800 mb-6">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-3 mt-0">
            ✅ Notification Best Practices:
          </h4>
          <ul className="text-green-700 dark:text-green-300 text-sm space-y-1 mb-0">
            <li><strong>Ask permission first</strong> - Always request before sending notifications</li>
            <li><strong>Be helpful</strong> - Only send notifications that provide real value</li>
            <li><strong>Respect choices</strong> - Make it easy to disable notifications</li>
            <li><strong>Clear messages</strong> - Write clear, actionable notification text</li>
            <li><strong>Timing matters</strong> - Don't spam users with too many notifications</li>
          </ul>
        </div>

        <h2>3. Installing Notifications</h2>
        <p>
          Let's install expo-notifications and understand the complete setup process for both development and production.
        </p>

        <CodeBlock
          code={`# Install notification library
npx expo install expo-notifications`}
          language="bash"
          filename="terminal"
          title="Installation Command"
        />

        <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800 my-6">
          <h4 className="text-blue-800 dark:text-blue-200 font-semibold mb-2 mt-0">
            📋 What Gets Installed
          </h4>
          <div className="text-blue-700 dark:text-blue-300 text-sm space-y-2">
            <div>• <strong>expo-notifications:</strong> Unified API for local and push notifications</div>
            <div>• <strong>Platform handlers:</strong> iOS and Android native notification managers</div>
            <div>• <strong>Permission system:</strong> Cross-platform permission requests</div>
            <div>• <strong>Scheduling engine:</strong> Local notification timing and delivery</div>
          </div>
        </div>

        <h2>4. Basic Configuration</h2>
        <p>
          For local notifications, minimal setup is required. Let's configure the notification handler in your app.
        </p>

        <CodeBlock
          code={`// App.js or App.tsx - Basic notification configuration
import * as Notifications from 'expo-notifications';

// Configure how notifications appear when app is open
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,    // Show notification popup
    shouldPlaySound: true,    // Play notification sound
    shouldSetBadge: false,    // Don't show badge number
  }),
});

export default function App() {
  // Your app component
  return (
    // Your app JSX
  );
}`}
          language="javascript"
          filename="App.js"
          title="Basic App Configuration"
        />

        <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg border border-green-200 dark:border-green-800 my-6">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-2 mt-0">
            🎯 Configuration Options Explained
          </h4>
          <div className="text-green-700 dark:text-green-300 text-sm space-y-2">
            <div>• <strong>shouldShowAlert:</strong> Display notification when app is open</div>
            <div>• <strong>shouldPlaySound:</strong> Play sound for notifications</div>
            <div>• <strong>shouldSetBadge:</strong> Show number badge on app icon (iOS)</div>
          </div>
        </div>

        <h2>5. Production Configuration (Optional)</h2>
        <p>
          For production apps, you can customize notification appearance and behavior.
        </p>

        <CodeBlock
          code={`// app.config.js - Production configuration
export default {
  expo: {
    name: "Your App Name",
    slug: "your-app-slug",
    plugins: [
      [
        "expo-notifications",
        {
          // Custom notification icon (must be 96x96px, white/transparent)
          icon: "./assets/notification-icon.png",
          
          // Notification color theme (Android)
          color: "#ffffff",
          
          // Default notification sound (optional)
          sounds: ["./assets/notification-sound.wav"],
          
          // iOS specific settings
          mode: "production"  // or "development"
        }
      ]
    ]
  }
};`}
          language="javascript"
          filename="app.config.js"
          title="Advanced Production Setup"
        />

        <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800 my-6">
          <h4 className="text-yellow-800 dark:text-yellow-200 font-semibold mb-2 mt-0">
            📱 Development vs Production
          </h4>
          <div className="text-yellow-700 dark:text-yellow-300 text-sm space-y-2">
            <div><strong>Development Mode:</strong></div>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Works automatically with Expo Go</li>
              <li>No configuration needed</li>
              <li>All notifications appear immediately</li>
            </ul>
            <div><strong>Production Mode:</strong></div>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Requires app.config.js configuration</li>
              <li>Custom icons and sounds</li>
              <li>Build with <code>expo build</code> or EAS Build</li>
            </ul>
          </div>
        </div>

        <h2>6. Example 1: Notification Sender</h2>
        <p>
          Now let's build a practical component that demonstrates local notifications with proper setup.
        </p>

        <CodeBlock
          code={`import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  TextInput,
  StyleSheet,
} from 'react-native';
import * as Notifications from 'expo-notifications';

// Configure how notifications appear when app is open
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

interface NotificationData {
  title: string;
  body: string;
}

export default function NotificationSender(): JSX.Element {
  const [title, setTitle] = useState<string>('Hello!');
  const [message, setMessage] = useState<string>('This is a test notification');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lastNotification, setLastNotification] = useState<any>(null);
  
  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();

  useEffect(() => {
    // Listen for notifications when app is open
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setLastNotification(notification);
      console.log('📱 Notification received:', notification);
    });

    // Listen for when user taps notification
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('👆 Notification tapped:', response);
      Alert.alert(
        'Notification Tapped!',
        \`You tapped: "\${response.notification.request.content.title}"\`,
        [{ text: 'OK' }]
      );
    });

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(notificationListener.current);
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  const requestPermission = async (): Promise<boolean> => {
    try {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      
      if (finalStatus !== 'granted') {
        Alert.alert(
          'Permission Needed',
          'Please allow notifications to use this feature.',
          [{ text: 'OK' }]
        );
        return false;
      }

      return true;
    } catch (error) {
      console.error('Permission error:', error);
      return false;
    }
  };

  const sendNotificationNow = async (): Promise<void> => {
    const hasPermission = await requestPermission();
    if (!hasPermission) return;

    try {
      setIsLoading(true);
      
      await Notifications.scheduleNotificationAsync({
        content: {
          title: title,
          body: message,
          sound: 'default',
          data: { 
            type: 'immediate',
            sentAt: new Date().toISOString()
          },
        },
        trigger: null, // Send immediately
      });

      Alert.alert('Sent!', 'Check your notification panel');
    } catch (error) {
      console.error('Send error:', error);
      Alert.alert('Error', 'Failed to send notification');
    } finally {
      setIsLoading(false);
    }
  };

  const sendDelayedNotification = async (seconds: number): Promise<void> => {
    const hasPermission = await requestPermission();
    if (!hasPermission) return;

    try {
      setIsLoading(true);
      
      await Notifications.scheduleNotificationAsync({
        content: {
          title: \`⏰ \${title}\`,
          body: \`Delayed message: \${message}\`,
          sound: 'default',
          data: { 
            type: 'delayed',
            delay: seconds
          },
        },
        trigger: {
          seconds: seconds,
        },
      });

      Alert.alert(
        'Scheduled!', 
        \`Notification will arrive in \${seconds} seconds\`
      );
    } catch (error) {
      console.error('Schedule error:', error);
      Alert.alert('Error', 'Failed to schedule notification');
    } finally {
      setIsLoading(false);
    }
  };

  const clearAllNotifications = async (): Promise<void> => {
    try {
      await Notifications.cancelAllScheduledNotificationsAsync();
      Alert.alert('Cleared!', 'All scheduled notifications canceled');
    } catch (error) {
      console.error('Clear error:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Send Notifications</Text>
        
        <View style={styles.inputSection}>
          <Text style={styles.label}>Notification Title:</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Enter title..."
          />
          
          <Text style={styles.label}>Message:</Text>
          <TextInput
            style={[styles.input, styles.messageInput]}
            value={message}
            onChangeText={setMessage}
            placeholder="Enter your message..."
            multiline
            numberOfLines={3}
          />
        </View>

        <View style={styles.buttonSection}>
          <TouchableOpacity
            style={[styles.button, styles.primaryButton, isLoading && styles.buttonDisabled]}
            onPress={sendNotificationNow}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? 'Sending...' : '🔔 Send Now'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={() => sendDelayedNotification(5)}
            disabled={isLoading}
          >
            <Text style={styles.secondaryButtonText}>⏱️ Send in 5 seconds</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={() => sendDelayedNotification(30)}
            disabled={isLoading}
          >
            <Text style={styles.secondaryButtonText}>⏰ Send in 30 seconds</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.dangerButton]}
            onPress={clearAllNotifications}
          >
            <Text style={styles.buttonText}>❌ Clear All Scheduled</Text>
          </TouchableOpacity>
        </View>

        {lastNotification && (
          <View style={styles.lastNotificationSection}>
            <Text style={styles.sectionTitle}>Last Notification Received:</Text>
            <View style={styles.notificationCard}>
              <Text style={styles.notificationTitle}>
                {lastNotification.request.content.title}
              </Text>
              <Text style={styles.notificationBody}>
                {lastNotification.request.content.body}
              </Text>
              <Text style={styles.notificationTime}>
                {new Date(lastNotification.date).toLocaleTimeString()}
              </Text>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  inputSection: {
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
  input: {
    backgroundColor: '#f8f8f8',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
    marginBottom: 16,
  },
  messageInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  buttonSection: {
    gap: 12,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#007AFF',
  },
  secondaryButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  dangerButton: {
    backgroundColor: '#FF3B30',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  lastNotificationSection: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  notificationCard: {
    backgroundColor: '#f0f7ff',
    padding: 15,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  notificationBody: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
  },
});`}
          language="tsx"
          filename="NotificationSender.tsx"
          title="Simple Notification Sender Component"
        />

        <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg border border-green-200 dark:border-green-800 my-6">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-2 mt-0">
            🔧 Key Learning Points
          </h4>
          <div className="text-green-700 dark:text-green-300 text-sm space-y-2">
            <div>• <strong>Permission handling</strong> - Always request before sending notifications</div>
            <div>• <strong>Immediate vs delayed</strong> - Send now or schedule for later</div>
            <div>• <strong>Event listeners</strong> - Detect when notifications are received or tapped</div>
            <div>• <strong>TypeScript interfaces</strong> - Define data structures for type safety</div>
          </div>
        </div>

        <h2>7. Example 2: Reminder Manager</h2>
        <p>
          Let's create a simple reminder app that schedules notifications for later.
        </p>

        <CodeBlock
          code={`import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  TextInput,
  StyleSheet,
  ScrollView,
} from 'react-native';
import * as Notifications from 'expo-notifications';

interface Reminder {
  id: string;
  title: string;
  scheduledFor: Date;
}

export default function ReminderManager(): JSX.Element {
  const [reminderText, setReminderText] = useState<string>('');
  const [minutes, setMinutes] = useState<string>('5');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const requestPermission = async (): Promise<boolean> => {
    try {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      
      return finalStatus === 'granted';
    } catch (error) {
      return false;
    }
  };

  const scheduleReminder = async (): Promise<void> => {
    if (!reminderText.trim()) {
      Alert.alert('Missing reminder', 'Please enter what to remind you about');
      return;
    }

    const minutesNum = parseInt(minutes);
    if (isNaN(minutesNum) || minutesNum < 1) {
      Alert.alert('Invalid time', 'Please enter a valid number of minutes');
      return;
    }

    const hasPermission = await requestPermission();
    if (!hasPermission) {
      Alert.alert('Permission needed', 'Please allow notifications');
      return;
    }

    try {
      setIsLoading(true);
      
      const scheduledDate = new Date();
      scheduledDate.setMinutes(scheduledDate.getMinutes() + minutesNum);
      
      await Notifications.scheduleNotificationAsync({
        content: {
          title: '⏰ Reminder',
          body: reminderText.trim(),
          sound: 'default',
          data: { 
            type: 'reminder',
            originalText: reminderText.trim(),
            scheduledFor: scheduledDate.toISOString()
          },
        },
        trigger: {
          seconds: minutesNum * 60,
        },
      });

      Alert.alert(
        'Reminder Set!',
        \`I'll remind you "\${reminderText.trim()}" in \${minutesNum} minute\${minutesNum === 1 ? '' : 's'}\`,
        [{ text: 'OK' }]
      );
      
      setReminderText('');
    } catch (error) {
      console.error('Schedule error:', error);
      Alert.alert('Error', 'Failed to schedule reminder');
    } finally {
      setIsLoading(false);
    }
  };

  const quickReminders = [
    { text: 'Take a break', minutes: 5 },
    { text: 'Drink water', minutes: 30 },
    { text: 'Check messages', minutes: 60 },
    { text: 'Stand up and stretch', minutes: 90 },
  ];

  const scheduleQuickReminder = async (text: string, mins: number): Promise<void> => {
    const hasPermission = await requestPermission();
    if (!hasPermission) {
      Alert.alert('Permission needed', 'Please allow notifications');
      return;
    }

    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: '⏰ Quick Reminder',
          body: text,
          sound: 'default',
          data: { type: 'quick_reminder' },
        },
        trigger: {
          seconds: mins * 60,
        },
      });

      Alert.alert('Set!', \`Reminder in \${mins} minutes\`);
    } catch (error) {
      Alert.alert('Error', 'Failed to set reminder');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>Reminder Manager</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Custom Reminder</Text>
          
          <Text style={styles.label}>What should I remind you about?</Text>
          <TextInput
            style={styles.input}
            value={reminderText}
            onChangeText={setReminderText}
            placeholder="e.g., Call mom, Take medicine..."
            multiline
            numberOfLines={2}
          />
          
          <Text style={styles.label}>In how many minutes?</Text>
          <TextInput
            style={styles.timeInput}
            value={minutes}
            onChangeText={setMinutes}
            placeholder="5"
            keyboardType="numeric"
          />
          
          <TouchableOpacity
            style={[styles.button, styles.primaryButton, isLoading && styles.buttonDisabled]}
            onPress={scheduleReminder}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? 'Setting...' : '⏰ Set Reminder'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Reminders</Text>
          {quickReminders.map((reminder, index) => (
            <TouchableOpacity
              key={index}
              style={styles.quickButton}
              onPress={() => scheduleQuickReminder(reminder.text, reminder.minutes)}
            >
              <Text style={styles.quickButtonText}>{reminder.text}</Text>
              <Text style={styles.quickButtonTime}>{reminder.minutes}min</Text>
            </TouchableOpacity>
          ))}
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
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f8f8f8',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
    marginBottom: 16,
    textAlignVertical: 'top',
  },
  timeInput: {
    backgroundColor: '#f8f8f8',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
    width: 100,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#007AFF',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  quickButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f0f7ff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  quickButtonText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  quickButtonTime: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: 'bold',
  },
});`}
          language="tsx"
          filename="ReminderManager.tsx"
          title="Simple Reminder App Component"
        />

        <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800 my-6">
          <h4 className="text-blue-800 dark:text-blue-200 font-semibold mb-2 mt-0">
            🎯 Reminder Features
          </h4>
          <div className="text-blue-700 dark:text-blue-300 text-sm space-y-2">
            <div>• <strong>Custom reminders</strong> - Set your own reminder text and timing</div>
            <div>• <strong>Quick presets</strong> - Common reminders with preset times</div>
            <div>• <strong>Input validation</strong> - Check for valid reminder text and timing</div>
            <div>• <strong>User feedback</strong> - Clear confirmation when reminders are set</div>
          </div>
        </div>

        <h2>8. Practice Exercise</h2>
        <p>
          Now it's your turn! Build a notification feature using what you've learned.
        </p>

        <div className="bg-orange-50 dark:bg-orange-950 p-6 rounded-lg border border-orange-200 dark:border-orange-800 mb-6">
          <h4 className="text-orange-800 dark:text-orange-200 font-semibold mb-3 mt-0">
            🎯 Build a Study Timer
          </h4>
          <div className="text-orange-700 dark:text-orange-300 space-y-2">
            <div><strong>Goal:</strong> Create a simple study timer that sends break reminders</div>
            <div className="text-sm space-y-1 mt-2">
              <div>• Use NotificationSender to create a basic timer interface</div>
              <div>• Add buttons for common study intervals (25min, 45min, 60min)</div>
              <div>• Send encouraging break reminder notifications</div>
              <div>• Show a countdown until the next notification</div>
              <div>• Handle permissions and errors properly</div>
            </div>
          </div>
        </div>

        <h2>9. Session Summary</h2>

        <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
          <h4 className="text-blue-800 dark:text-blue-200 font-semibold mb-3 mt-0">
            📚 What You Learned:
          </h4>
          <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1 mb-0">
            <li><strong>expo-notifications</strong> - Simple notification system for React Native</li>
            <li><strong>Permission patterns</strong> - How to request and handle notification permissions</li>
            <li><strong>Scheduling</strong> - Send notifications immediately or schedule for later</li>
            <li><strong>Event handling</strong> - Listen for notification events and user interactions</li>
            <li><strong>User experience</strong> - Build helpful, respectful notification features</li>
          </ul>
        </div>
        
        <div className="bg-green-50 dark:bg-green-950 p-6 rounded-lg border border-green-200 dark:border-green-800 mt-6">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-3 mt-0">
            🚀 Next Steps
          </h4>
          <div className="text-green-700 dark:text-green-300 space-y-2">
            <div>
              <strong>Bonus Session:</strong> Device storage and user preferences (AsyncStorage)
            </div>
            <div>
              <strong>Challenge:</strong> Combine images, location, and notifications in one app
            </div>
            <div>
              <strong>Advanced topics:</strong> Push notifications from servers, rich media notifications
            </div>
          </div>
        </div>
      </div>
    </>
  );
}