"use client";

import { CodeBlock } from "@/components/ui/code-block-new";

export function Day5Session3Content() {
  return (
    <>
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">
            Notifications - Session 3
          </h1>

          <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg border border-blue-200 dark:border-blue-800 mb-8">
            <h3 className="text-blue-800 dark:text-blue-200 font-semibold mb-4 mt-0">
              🔔 Session Overview
            </h3>
            <ul className="text-blue-700 dark:text-blue-300 space-y-2 mb-0">
              <li>
                <strong>expo-notifications Setup</strong> - Install and configure notification services
              </li>
              <li>
                <strong>Push Token Generation</strong> - Get device push notification tokens for remote notifications
              </li>
              <li>
                <strong>Local Notification Triggers</strong> - Schedule and trigger notifications locally
              </li>
              <li>
                <strong>Push Notification Testing</strong> - Send and receive test push notifications effectively
              </li>
            </ul>
          </div>
        </div>

        <h2>1. Building Engaging Notification Systems</h2>
        <p>
          Notifications are crucial for user engagement and app retention—from reminders to real-time updates to 
          promotional messages. Let's build professional notification experiences that respect user preferences, 
          handle permissions gracefully, and provide both local and push notification capabilities.
        </p>

        <div className="grid md:grid-cols-2 gap-4 my-6">
          <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border">
            <h4 className="font-semibold mb-2 mt-0">📱 What We'll Build:</h4>
            <div className="text-sm space-y-1">
              <div>• Local notification scheduling</div>
              <div>• Push notification tokens</div>
              <div>• Interactive notification handling</div>
              <div>• Notification permission management</div>
              <div>• Custom notification categories</div>
            </div>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-900 rounded-lg border">
            <h4 className="font-semibold mb-2 mt-0">🎯 Key Features:</h4>
            <div className="text-sm space-y-1">
              <div>• Rich notification content</div>
              <div>• Sound and vibration control</div>
              <div>• Notification actions and responses</div>
              <div>• Background notification handling</div>
              <div>• Cross-platform compatibility</div>
            </div>
          </div>
        </div>

        <h2>2. Setting Up expo-notifications</h2>
        <p>
          First, let's install and configure expo-notifications. This powerful library handles both local 
          and push notifications with a unified API across iOS and Android platforms.
        </p>

        <CodeBlock
          code={`# Install expo-notifications
npx expo install expo-notifications

# For device testing with real push notifications
npx expo install expo-device expo-constants`}
          language="bash"
          filename="terminal"
          title="Installation"
        />

        <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800 my-6">
          <h4 className="text-yellow-800 dark:text-yellow-200 font-semibold mb-2 mt-0">
            📱 App Configuration
          </h4>
          <p className="text-yellow-700 dark:text-yellow-300 text-sm mb-2">
            Add notification configuration to your app.json or app.config.js:
          </p>
          <CodeBlock
            code={`{
  "expo": {
    "plugins": [
      [
        "expo-notifications",
        {
          "icon": "./assets/notification-icon.png",
          "color": "#ffffff",
          "sounds": ["./assets/notification-sound.wav"],
          "mode": "production"
        }
      ]
    ],
    "notification": {
      "icon": "./assets/notification-icon.png",
      "color": "#000000",
      "androidMode": "default",
      "androidCollapsedTitle": "#{unread_notifications} new notifications"
    }
  }
}`}
            language="json"
            filename="app.json"
            title="Notification Configuration"
        />
        </div>

        <h2>3. Example 1: Basic Local Notifications</h2>
        <p>
          Let's start with local notifications that can be scheduled and triggered without requiring 
          internet connectivity. These are perfect for reminders, alarms, and app-specific alerts.
        </p>

        <CodeBlock
          code={`import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  ScrollView,
  TextInput,
  Switch,
} from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

// Configure how notifications are handled when app is in foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function BasicLocalNotifications() {
  const [notificationTitle, setNotificationTitle] = useState('Hello!');
  const [notificationBody, setNotificationBody] = useState('This is a test notification');
  const [enableSound, setEnableSound] = useState(true);
  const [permissionStatus, setPermissionStatus] = useState(null);
  const [notification, setNotification] = useState(false);
  
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    // Check initial permission status
    checkPermissionStatus();

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
      console.log('Notification received:', notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('Notification response:', response);
      Alert.alert(
        'Notification Tapped',
        \`You tapped on: "\${response.notification.request.content.title}"\`,
        [{ text: 'OK' }]
      );
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const checkPermissionStatus = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    setPermissionStatus(status);
  };

  const requestPermissions = async () => {
    if (!Device.isDevice) {
      Alert.alert(
        'Simulator Detected',
        'Push notifications don\\'t work on simulator. Use a physical device.',
        [{ text: 'OK' }]
      );
      return false;
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    
    if (finalStatus !== 'granted') {
      Alert.alert(
        'Permission Required',
        'Notification permissions are required to send you alerts.',
        [{ text: 'OK' }]
      );
      return false;
    }

    setPermissionStatus(finalStatus);
    return true;
  };

  const scheduleImmediateNotification = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    try {
      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: notificationTitle,
          body: notificationBody,
          sound: enableSound ? 'default' : false,
          badge: 1,
          data: { 
            type: 'immediate',
            timestamp: new Date().toISOString() 
          },
        },
        trigger: null, // Immediate notification
      });

      Alert.alert(
        'Notification Scheduled',
        \`Immediate notification sent! ID: \${notificationId}\`,
        [{ text: 'OK' }]
      );
    } catch (error) {
      console.error('Error scheduling notification:', error);
      Alert.alert('Error', 'Failed to schedule notification.');
    }
  };

  const scheduleDelayedNotification = async (seconds) => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    try {
      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: \`⏰ Delayed Notification\`,
          body: \`This notification was scheduled \${seconds} seconds ago!\`,
          sound: enableSound ? 'default' : false,
          badge: 1,
          data: { 
            type: 'delayed',
            scheduledFor: seconds,
            timestamp: new Date().toISOString() 
          },
        },
        trigger: {
          seconds: seconds,
        },
      });

      Alert.alert(
        'Notification Scheduled',
        \`Notification will arrive in \${seconds} seconds. ID: \${notificationId}\`,
        [{ text: 'OK' }]
      );
    } catch (error) {
      console.error('Error scheduling delayed notification:', error);
      Alert.alert('Error', 'Failed to schedule delayed notification.');
    }
  };

  const scheduleRepeatingNotification = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    try {
      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: '🔄 Daily Reminder',
          body: 'This is your daily reminder to check the app!',
          sound: enableSound ? 'default' : false,
          badge: 1,
          data: { 
            type: 'repeating',
            interval: 'daily',
            timestamp: new Date().toISOString() 
          },
        },
        trigger: {
          seconds: 60, // Start in 1 minute for demo
          repeats: true,
        },
      });

      Alert.alert(
        'Repeating Notification Set',
        \`Daily notification scheduled! ID: \${notificationId}\\n\\nFirst notification in 1 minute, then every minute (for demo).\`,
        [{ text: 'OK' }]
      );
    } catch (error) {
      console.error('Error scheduling repeating notification:', error);
      Alert.alert('Error', 'Failed to schedule repeating notification.');
    }
  };

  const cancelAllNotifications = async () => {
    try {
      await Notifications.cancelAllScheduledNotificationsAsync();
      Alert.alert(
        'Notifications Canceled',
        'All scheduled notifications have been canceled.',
        [{ text: 'OK' }]
      );
    } catch (error) {
      console.error('Error canceling notifications:', error);
      Alert.alert('Error', 'Failed to cancel notifications.');
    }
  };

  const clearBadge = async () => {
    try {
      await Notifications.setBadgeCountAsync(0);
      Alert.alert('Badge Cleared', 'App badge count reset to 0.');
    } catch (error) {
      console.error('Error clearing badge:', error);
    }
  };

  const getPermissionStatusColor = () => {
    switch (permissionStatus) {
      case 'granted': return '#4CAF50';
      case 'denied': return '#F44336';
      case 'undetermined': return '#FF9800';
      default: return '#9E9E9E';
    }
  };

  const getPermissionStatusText = () => {
    switch (permissionStatus) {
      case 'granted': return 'Granted';
      case 'denied': return 'Denied';
      case 'undetermined': return 'Not Requested';
      default: return 'Unknown';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Local Notifications</Text>
        
        {/* Permission Status */}
        <View style={styles.statusContainer}>
          <Text style={styles.statusLabel}>Permission Status:</Text>
          <View style={[styles.statusBadge, { backgroundColor: getPermissionStatusColor() }]}>
            <Text style={styles.statusText}>{getPermissionStatusText()}</Text>
          </View>
        </View>

        {/* Notification Content Settings */}
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Notification Content</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Title:</Text>
            <TextInput
              style={styles.textInput}
              value={notificationTitle}
              onChangeText={setNotificationTitle}
              placeholder="Enter notification title"
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Message:</Text>
            <TextInput
              style={[styles.textInput, styles.textArea]}
              value={notificationBody}
              onChangeText={setNotificationBody}
              placeholder="Enter notification message"
              multiline
              numberOfLines={3}
            />
          </View>

          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Enable Sound</Text>
            <Switch
              value={enableSound}
              onValueChange={setEnableSound}
              trackColor={{ false: '#ccc', true: '#4CAF50' }}
              thumbColor={enableSound ? '#fff' : '#f4f3f4'}
            />
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonSection}>
          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={scheduleImmediateNotification}
          >
            <Text style={styles.buttonText}>🔔 Send Now</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={() => scheduleDelayedNotification(5)}
          >
            <Text style={styles.secondaryButtonText}>⏱️ Send in 5s</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={() => scheduleDelayedNotification(30)}
          >
            <Text style={styles.secondaryButtonText}>⏰ Send in 30s</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.warningButton]}
            onPress={scheduleRepeatingNotification}
          >
            <Text style={styles.buttonText}>🔄 Daily Reminder</Text>
          </TouchableOpacity>
        </View>

        {/* Management Buttons */}
        <View style={styles.managementSection}>
          <TouchableOpacity
            style={[styles.button, styles.infoButton]}
            onPress={clearBadge}
          >
            <Text style={styles.buttonText}>🏷️ Clear Badge</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.dangerButton]}
            onPress={cancelAllNotifications}
          >
            <Text style={styles.buttonText}>❌ Cancel All</Text>
          </TouchableOpacity>
        </View>

        {/* Last Notification Display */}
        {notification && (
          <View style={styles.lastNotificationSection}>
            <Text style={styles.sectionTitle}>Last Received Notification</Text>
            <View style={styles.notificationCard}>
              <Text style={styles.notificationTitle}>
                {notification.request.content.title}
              </Text>
              <Text style={styles.notificationBody}>
                {notification.request.content.body}
              </Text>
              <Text style={styles.notificationTime}>
                Received: {new Date(notification.date).toLocaleTimeString()}
              </Text>
            </View>
          </View>
        )}

        {/* Tips Section */}
        <View style={styles.tipsSection}>
          <Text style={styles.tipsTitle}>💡 Notification Tips</Text>
          <Text style={styles.tipText}>• Test on physical device for best results</Text>
          <Text style={styles.tipText}>• Notifications work even when app is closed</Text>
          <Text style={styles.tipText}>• Users can disable notifications in device settings</Text>
          <Text style={styles.tipText}>• Badge count shows unread notifications</Text>
          <Text style={styles.tipText}>• Tapping notifications opens the app</Text>
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
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  statusLabel: {
    fontSize: 16,
    color: '#666',
    marginRight: 10,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  statusText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  settingsSection: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
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
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#f8f8f8',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  switchLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  buttonSection: {
    marginBottom: 20,
  },
  managementSection: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  primaryButton: {
    backgroundColor: '#007AFF',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  warningButton: {
    backgroundColor: '#FF9800',
  },
  infoButton: {
    backgroundColor: '#17A2B8',
    flex: 1,
  },
  dangerButton: {
    backgroundColor: '#DC3545',
    flex: 1,
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
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  notificationCard: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  notificationBody: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
  tipsSection: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  tipText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
    lineHeight: 20,
  },
});`}
          language="jsx"
          filename="BasicLocalNotifications.jsx"
          title="Local Notification System"
        />

        <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg border border-green-200 dark:border-green-800 my-6">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-2 mt-0">
            🔧 Key Features Explained
          </h4>
          <div className="text-green-700 dark:text-green-300 text-sm space-y-2">
            <div><strong>Permission Management:</strong> Request and check notification permissions with user-friendly messaging</div>
            <div><strong>Scheduling Options:</strong> Immediate, delayed, and repeating notifications with flexible timing</div>
            <div><strong>Rich Content:</strong> Custom titles, messages, sounds, and badge counts</div>
            <div><strong>Interactive Handling:</strong> Respond to user interactions with notifications</div>
            <div><strong>Background Support:</strong> Notifications work even when app is closed or backgrounded</div>
          </div>
        </div>

        <h2>4. Example 2: Push Notification System</h2>
        <p>
          Now let's implement push notifications that can be sent from a server to your app. 
          We'll get the push token and create a system for testing remote notifications.
        </p>

        <CodeBlock
          code={`import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Clipboard,
} from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';

// Configure notification handling
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function PushNotificationSystem() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [testMessage, setTestMessage] = useState('Hello from push notifications!');
  const [testTitle, setTestTitle] = useState('Test Push Notification');
  
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync();

    // Listen for incoming notifications
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
      console.log('Push notification received:', notification);
    });

    // Listen for notification interactions
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('Push notification response:', response);
      
      // Handle different notification actions
      const { notification, actionIdentifier } = response;
      const data = notification.request.content.data;
      
      Alert.alert(
        'Push Notification Tapped',
        \`Action: \${actionIdentifier}\\nData: \${JSON.stringify(data, null, 2)}\`,
        [{ text: 'OK' }]
      );
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const registerForPushNotificationsAsync = async () => {
    let token;

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      
      if (finalStatus !== 'granted') {
        Alert.alert(
          'Push Notifications Disabled',
          'Failed to get push token for push notification! Make sure you have enabled notifications.',
          [{ text: 'OK' }]
        );
        return;
      }
      
      token = (await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig?.extra?.eas?.projectId,
      })).data;
      
      console.log('Expo Push Token:', token);
      setExpoPushToken(token);
    } else {
      Alert.alert(
        'Simulator Detected',
        'Must use physical device for Push Notifications. Expo Push Tokens don\\'t work on simulators.',
        [{ text: 'OK' }]
      );
    }

    return token;
  };

  const sendPushNotification = async (expoPushToken, title, message) => {
    const pushMessage = {
      to: expoPushToken,
      sound: 'default',
      title: title,
      body: message,
      data: { 
        type: 'test_push',
        timestamp: new Date().toISOString(),
        customData: 'This is custom data that can be used by your app' 
      },
      badge: 1,
      priority: 'high',
      channelId: 'default',
    };

    try {
      setIsLoading(true);
      
      const response = await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Accept-encoding': 'gzip, deflate',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pushMessage),
      });

      const responseData = await response.json();
      console.log('Push notification response:', responseData);
      
      if (responseData.data && responseData.data[0].status === 'ok') {
        Alert.alert(
          'Push Sent Successfully!',
          \`Push notification sent to your device. Check your notification panel!\`,
          [{ text: 'OK' }]
        );
      } else {
        Alert.alert(
          'Push Failed',
          \`Failed to send push notification: \${responseData.data?.[0]?.message || 'Unknown error'}\`,
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error('Error sending push notification:', error);
      Alert.alert(
        'Error',
        'Failed to send push notification. Check your internet connection.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  const testPushNotification = () => {
    if (!expoPushToken) {
      Alert.alert(
        'No Push Token',
        'Push token not available. Make sure you\\'re using a physical device and have granted notification permissions.',
        [{ text: 'OK' }]
      );
      return;
    }

    Alert.alert(
      'Send Test Push?',
      \`This will send a push notification to this device.\\n\\nTitle: "\${testTitle}"\\nMessage: "\${testMessage}"\`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Send Push', 
          onPress: () => sendPushNotification(expoPushToken, testTitle, testMessage)
        },
      ]
    );
  };

  const copyTokenToClipboard = () => {
    if (!expoPushToken) {
      Alert.alert('No Token', 'Push token not available.');
      return;
    }

    Clipboard.setString(expoPushToken);
    Alert.alert(
      'Token Copied!',
      'Push token copied to clipboard. You can use this token to send push notifications from your server.',
      [{ text: 'OK' }]
    );
  };

  const sendTestPushFromServer = () => {
    Alert.alert(
      'Test from Server',
      \`To test from your server, send a POST request to:\\n\\nhttps://exp.host/--/api/v2/push/send\\n\\nWith this token and message payload.\`,
      [
        { text: 'Copy Token', onPress: copyTokenToClipboard },
        { text: 'OK' },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Push Notifications</Text>
        
        {/* Push Token Section */}
        <View style={styles.tokenSection}>
          <Text style={styles.sectionTitle}>🔑 Expo Push Token</Text>
          {expoPushToken ? (
            <View style={styles.tokenContainer}>
              <Text style={styles.tokenText} numberOfLines={3}>
                {expoPushToken}
              </Text>
              <TouchableOpacity 
                style={styles.copyButton}
                onPress={copyTokenToClipboard}
              >
                <Text style={styles.copyButtonText}>📋 Copy</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.noTokenContainer}>
              <Text style={styles.noTokenText}>
                {Device.isDevice 
                  ? 'Requesting push token...' 
                  : 'Push tokens only work on physical devices'
                }
              </Text>
            </View>
          )}
        </View>

        {/* Test Message Configuration */}
        <View style={styles.configSection}>
          <Text style={styles.sectionTitle}>📝 Test Message</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Title:</Text>
            <TextInput
              style={styles.textInput}
              value={testTitle}
              onChangeText={setTestTitle}
              placeholder="Enter push notification title"
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Message:</Text>
            <TextInput
              style={[styles.textInput, styles.textArea]}
              value={testMessage}
              onChangeText={setTestMessage}
              placeholder="Enter push notification message"
              multiline
              numberOfLines={3}
            />
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonSection}>
          <TouchableOpacity
            style={[styles.button, styles.primaryButton, (!expoPushToken || isLoading) && styles.buttonDisabled]}
            onPress={testPushNotification}
            disabled={!expoPushToken || isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              <Text style={styles.buttonText}>🚀 Send Test Push</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={sendTestPushFromServer}
          >
            <Text style={styles.secondaryButtonText}>🖥️ Test from Server</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.infoButton]}
            onPress={() => registerForPushNotificationsAsync()}
          >
            <Text style={styles.buttonText}>🔄 Refresh Token</Text>
          </TouchableOpacity>
        </View>

        {/* Last Push Notification */}
        {notification && (
          <View style={styles.lastPushSection}>
            <Text style={styles.sectionTitle}>📬 Last Push Notification</Text>
            <View style={styles.pushCard}>
              <Text style={styles.pushTitle}>
                {notification.request.content.title}
              </Text>
              <Text style={styles.pushBody}>
                {notification.request.content.body}
              </Text>
              <Text style={styles.pushTime}>
                Received: {new Date(notification.date).toLocaleString()}
              </Text>
              {notification.request.content.data && (
                <View style={styles.pushDataContainer}>
                  <Text style={styles.pushDataTitle}>Data:</Text>
                  <Text style={styles.pushDataText}>
                    {JSON.stringify(notification.request.content.data, null, 2)}
                  </Text>
                </View>
              )}
            </View>
          </View>
        )}

        {/* Server Integration Guide */}
        <View style={styles.guideSection}>
          <Text style={styles.sectionTitle}>🛠️ Server Integration</Text>
          <View style={styles.guideContent}>
            <Text style={styles.guideStep}>1. Copy your push token above</Text>
            <Text style={styles.guideStep}>2. Send POST to: https://exp.host/--/api/v2/push/send</Text>
            <Text style={styles.guideStep}>3. Include token and message in request body</Text>
            <Text style={styles.guideStep}>4. Handle responses and delivery receipts</Text>
          </View>
          
          <TouchableOpacity 
            style={styles.guideButton}
            onPress={() => Alert.alert(
              'Sample Code',
              \`fetch('https://exp.host/--/api/v2/push/send', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    to: 'YOUR_PUSH_TOKEN',
    title: 'Hello!',
    body: 'Your message here',
    data: { custom: 'data' },
  }),
});\`,
              [{ text: 'OK' }]
            )}
          >
            <Text style={styles.guideButtonText}>📄 View Sample Code</Text>
          </TouchableOpacity>
        </View>

        {/* Tips Section */}
        <View style={styles.tipsSection}>
          <Text style={styles.tipsTitle}>💡 Push Notification Tips</Text>
          <Text style={styles.tipText}>• Test on physical device only</Text>
          <Text style={styles.tipText}>• Push tokens can change between app updates</Text>
          <Text style={styles.tipText}>• Rate limits apply to Expo's push service</Text>
          <Text style={styles.tipText}>• Include meaningful data for app navigation</Text>
          <Text style={styles.tipText}>• Handle notification permissions gracefully</Text>
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
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  tokenSection: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
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
  },
  tokenContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  tokenText: {
    flex: 1,
    fontSize: 12,
    fontFamily: 'monospace',
    color: '#495057',
    marginRight: 10,
  },
  copyButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  copyButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  noTokenContainer: {
    backgroundColor: '#fff3cd',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ffeaa7',
  },
  noTokenText: {
    color: '#856404',
    textAlign: 'center',
    fontSize: 14,
  },
  configSection: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#f8f8f8',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  buttonSection: {
    marginBottom: 20,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  primaryButton: {
    backgroundColor: '#007AFF',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  infoButton: {
    backgroundColor: '#17A2B8',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
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
  lastPushSection: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pushCard: {
    backgroundColor: '#e8f4fd',
    padding: 15,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  pushTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  pushBody: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  pushTime: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
    marginBottom: 8,
  },
  pushDataContainer: {
    backgroundColor: '#f8f9fa',
    padding: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
  pushDataTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#495057',
    marginBottom: 4,
  },
  pushDataText: {
    fontSize: 11,
    fontFamily: 'monospace',
    color: '#6c757d',
  },
  guideSection: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  guideContent: {
    marginBottom: 15,
  },
  guideStep: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    paddingLeft: 15,
    position: 'relative',
  },
  guideButton: {
    backgroundColor: '#28a745',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  guideButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  tipsSection: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  tipText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
    lineHeight: 20,
  },
});`}
          language="jsx"
          filename="PushNotificationSystem.jsx"
          title="Complete Push Notification System"
        />

        <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg border border-purple-200 dark:border-purple-800 my-6">
          <h4 className="text-purple-800 dark:text-purple-200 font-semibold mb-2 mt-0">
            🚀 Push Notification Features
          </h4>
          <div className="text-purple-700 dark:text-purple-300 text-sm space-y-2">
            <div><strong>Expo Push Token:</strong> Unique device identifier for sending push notifications</div>
            <div><strong>Server Integration:</strong> Direct HTTP API for sending notifications from your backend</div>
            <div><strong>Rich Data:</strong> Include custom data payloads for app navigation and context</div>
            <div><strong>Interactive Testing:</strong> Send test notifications directly from the app</div>
            <div><strong>Response Handling:</strong> Process user interactions and notification taps</div>
          </div>
        </div>

        <h2>5. Example 3: Advanced Notification Manager</h2>
        <p>
          Let's create a comprehensive notification management system that handles both local and push notifications, 
          provides user preferences, and includes analytics for notification engagement.
        </p>

        <CodeBlock
          code={`import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  ScrollView,
  Switch,
  FlatList,
} from 'react-native';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NOTIFICATION_PREFERENCES_KEY = 'notification_preferences';
const NOTIFICATION_HISTORY_KEY = 'notification_history';

// Configure notification categories with actions
Notifications.setNotificationCategoryAsync('reminder', [
  {
    identifier: 'snooze',
    buttonTitle: 'Snooze 5min',
    options: { opensAppToForeground: false },
  },
  {
    identifier: 'complete',
    buttonTitle: 'Mark Done',
    options: { opensAppToForeground: true },
  },
]);

Notifications.setNotificationHandler({
  handleNotification: async (notification) => {
    // Custom logic based on notification type
    const notificationType = notification.request.content.data?.type;
    
    return {
      shouldShowAlert: true,
      shouldPlaySound: notificationType !== 'silent',
      shouldSetBadge: true,
    };
  },
});

export default function AdvancedNotificationManager() {
  const [preferences, setPreferences] = useState({
    enableNotifications: true,
    enableSounds: true,
    enableReminders: true,
    enablePromotions: false,
    quietHoursEnabled: false,
    quietHoursStart: '22:00',
    quietHoursEnd: '08:00',
  });
  
  const [notificationHistory, setNotificationHistory] = useState([]);
  const [scheduledNotifications, setScheduledNotifications] = useState([]);
  
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    loadPreferences();
    loadNotificationHistory();
    loadScheduledNotifications();

    // Set up listeners
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      addToHistory(notification, 'received');
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      const { notification, actionIdentifier } = response;
      
      addToHistory(notification, 'interacted', { action: actionIdentifier });
      
      // Handle different actions
      if (actionIdentifier === 'snooze') {
        snoozeNotification(notification);
      } else if (actionIdentifier === 'complete') {
        markNotificationComplete(notification);
      }
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const loadPreferences = async () => {
    try {
      const stored = await AsyncStorage.getItem(NOTIFICATION_PREFERENCES_KEY);
      if (stored) {
        setPreferences(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load preferences:', error);
    }
  };

  const savePreferences = async (newPreferences) => {
    try {
      await AsyncStorage.setItem(NOTIFICATION_PREFERENCES_KEY, JSON.stringify(newPreferences));
      setPreferences(newPreferences);
    } catch (error) {
      console.error('Failed to save preferences:', error);
    }
  };

  const loadNotificationHistory = async () => {
    try {
      const stored = await AsyncStorage.getItem(NOTIFICATION_HISTORY_KEY);
      if (stored) {
        setNotificationHistory(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load history:', error);
    }
  };

  const loadScheduledNotifications = async () => {
    try {
      const scheduled = await Notifications.getAllScheduledNotificationsAsync();
      setScheduledNotifications(scheduled);
    } catch (error) {
      console.error('Failed to load scheduled notifications:', error);
    }
  };

  const addToHistory = async (notification, type, metadata = {}) => {
    const entry = {
      id: Date.now().toString(),
      type,
      title: notification.request.content.title,
      body: notification.request.content.body,
      data: notification.request.content.data,
      timestamp: new Date().toISOString(),
      metadata,
    };

    const newHistory = [entry, ...notificationHistory].slice(0, 50); // Keep last 50
    setNotificationHistory(newHistory);
    
    try {
      await AsyncStorage.setItem(NOTIFICATION_HISTORY_KEY, JSON.stringify(newHistory));
    } catch (error) {
      console.error('Failed to save history:', error);
    }
  };

  const scheduleReminderNotification = async (title, body, delayMinutes = 5) => {
    if (!preferences.enableNotifications || !preferences.enableReminders) {
      Alert.alert('Notifications Disabled', 'Please enable notifications and reminders in settings.');
      return;
    }

    try {
      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          sound: preferences.enableSounds ? 'default' : false,
          categoryIdentifier: 'reminder',
          data: { 
            type: 'reminder',
            scheduledAt: new Date().toISOString(),
            originalDelay: delayMinutes 
          },
        },
        trigger: {
          seconds: delayMinutes * 60,
        },
      });

      Alert.alert(
        'Reminder Scheduled',
        \`Reminder will arrive in \${delayMinutes} minutes.\`,
        [{ text: 'OK' }]
      );
      
      loadScheduledNotifications(); // Refresh list
    } catch (error) {
      console.error('Failed to schedule reminder:', error);
      Alert.alert('Error', 'Failed to schedule reminder.');
    }
  };

  const snoozeNotification = async (notification) => {
    const originalData = notification.request.content.data;
    
    await Notifications.scheduleNotificationAsync({
      content: {
        title: \`⏰ \${notification.request.content.title}\`,
        body: notification.request.content.body,
        sound: preferences.enableSounds ? 'default' : false,
        data: { 
          ...originalData,
          snoozed: true,
          snoozeCount: (originalData?.snoozeCount || 0) + 1 
        },
      },
      trigger: {
        seconds: 300, // 5 minutes
      },
    });

    Alert.alert('Snoozed', 'Reminder snoozed for 5 minutes.');
  };

  const markNotificationComplete = (notification) => {
    Alert.alert(
      'Marked Complete',
      \`"\${notification.request.content.title}" has been marked as complete.\`,
      [{ text: 'OK' }]
    );
  };

  const togglePreference = (key) => {
    const newPreferences = { ...preferences, [key]: !preferences[key] };
    savePreferences(newPreferences);
  };

  const clearHistory = async () => {
    Alert.alert(
      'Clear History',
      'Are you sure you want to clear all notification history?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            setNotificationHistory([]);
            await AsyncStorage.removeItem(NOTIFICATION_HISTORY_KEY);
          },
        },
      ]
    );
  };

  const cancelAllScheduled = async () => {
    Alert.alert(
      'Cancel All Notifications',
      'Are you sure you want to cancel all scheduled notifications?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Cancel All',
          style: 'destructive',
          onPress: async () => {
            await Notifications.cancelAllScheduledNotificationsAsync();
            setScheduledNotifications([]);
            Alert.alert('Success', 'All scheduled notifications canceled.');
          },
        },
      ]
    );
  };

  const getEngagementStats = () => {
    const received = notificationHistory.filter(item => item.type === 'received').length;
    const interacted = notificationHistory.filter(item => item.type === 'interacted').length;
    const engagementRate = received > 0 ? ((interacted / received) * 100).toFixed(1) : 0;
    
    return { received, interacted, engagementRate };
  };

  const renderHistoryItem = ({ item }) => (
    <View style={styles.historyItem}>
      <View style={styles.historyHeader}>
        <Text style={styles.historyTitle}>{item.title}</Text>
        <Text style={styles.historyType}>
          {item.type === 'received' ? '📥' : '👆'} {item.type}
        </Text>
      </View>
      <Text style={styles.historyBody}>{item.body}</Text>
      <Text style={styles.historyTime}>
        {new Date(item.timestamp).toLocaleString()}
      </Text>
      {item.metadata?.action && (
        <Text style={styles.historyAction}>
          Action: {item.metadata.action}
        </Text>
      )}
    </View>
  );

  const stats = getEngagementStats();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Notification Manager</Text>
          <Text style={styles.subtitle}>
            {scheduledNotifications.length} scheduled • {notificationHistory.length} in history
          </Text>
        </View>

        {/* Engagement Stats */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>📊 Engagement Stats</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{stats.received}</Text>
              <Text style={styles.statLabel}>Received</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{stats.interacted}</Text>
              <Text style={styles.statLabel}>Interacted</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{stats.engagementRate}%</Text>
              <Text style={styles.statLabel}>Engagement</Text>
            </View>
          </View>
        </View>

        {/* Preferences */}
        <View style={styles.preferencesSection}>
          <Text style={styles.sectionTitle}>⚙️ Notification Preferences</Text>
          
          <View style={styles.preferenceItem}>
            <Text style={styles.preferenceLabel}>Enable Notifications</Text>
            <Switch
              value={preferences.enableNotifications}
              onValueChange={() => togglePreference('enableNotifications')}
            />
          </View>
          
          <View style={styles.preferenceItem}>
            <Text style={styles.preferenceLabel}>Enable Sounds</Text>
            <Switch
              value={preferences.enableSounds}
              onValueChange={() => togglePreference('enableSounds')}
              disabled={!preferences.enableNotifications}
            />
          </View>
          
          <View style={styles.preferenceItem}>
            <Text style={styles.preferenceLabel}>Reminder Notifications</Text>
            <Switch
              value={preferences.enableReminders}
              onValueChange={() => togglePreference('enableReminders')}
              disabled={!preferences.enableNotifications}
            />
          </View>
          
          <View style={styles.preferenceItem}>
            <Text style={styles.preferenceLabel}>Promotional Notifications</Text>
            <Switch
              value={preferences.enablePromotions}
              onValueChange={() => togglePreference('enablePromotions')}
              disabled={!preferences.enableNotifications}
            />
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsSection}>
          <Text style={styles.sectionTitle}>⚡ Quick Actions</Text>
          
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => scheduleReminderNotification('Test Reminder', 'This is a test reminder with actions', 0.1)}
          >
            <Text style={styles.actionButtonText}>🔔 Test Reminder (5s)</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => scheduleReminderNotification('Daily Standup', 'Time for your daily team standup!', 1)}
          >
            <Text style={styles.actionButtonText}>📅 Schedule Meeting (1min)</Text>
          </TouchableOpacity>
          
          <View style={styles.actionRow}>
            <TouchableOpacity
              style={[styles.actionButton, styles.secondaryButton]}
              onPress={cancelAllScheduled}
            >
              <Text style={styles.secondaryButtonText}>❌ Cancel All</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.actionButton, styles.secondaryButton]}
              onPress={clearHistory}
            >
              <Text style={styles.secondaryButtonText}>🗑️ Clear History</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Notification History */}
        <View style={styles.historySection}>
          <Text style={styles.sectionTitle}>📝 Recent Activity</Text>
          {notificationHistory.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No notification activity yet</Text>
              <Text style={styles.emptySubtext}>
                Send a test notification to see activity here
              </Text>
            </View>
          ) : (
            <FlatList
              data={notificationHistory.slice(0, 10)} // Show recent 10
              renderItem={renderHistoryItem}
              keyExtractor={(item) => item.id}
              style={styles.historyList}
              scrollEnabled={false}
            />
          )}
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
  header: {
    padding: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  statsSection: {
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  preferencesSection: {
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
  preferenceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  preferenceLabel: {
    fontSize: 16,
    color: '#333',
  },
  actionsSection: {
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
  actionButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#007AFF',
    flex: 1,
    marginHorizontal: 5,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  historySection: {
    margin: 15,
  },
  emptyState: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 8,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
    textAlign: 'center',
  },
  historyList: {
    maxHeight: 400,
  },
  historyItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  historyTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  historyType: {
    fontSize: 12,
    color: '#666',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  historyBody: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  historyTime: {
    fontSize: 12,
    color: '#999',
    marginBottom: 3,
  },
  historyAction: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '500',
  },
});`}
          language="jsx"
          filename="AdvancedNotificationManager.jsx"
          title="Complete Notification Management System"
        />

        <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800 my-6">
          <h4 className="text-blue-800 dark:text-blue-200 font-semibold mb-2 mt-0">
            💼 Enterprise Features
          </h4>
          <div className="text-blue-700 dark:text-blue-300 text-sm space-y-2">
            <div><strong>User Preferences:</strong> Granular notification controls with persistent settings</div>
            <div><strong>Interactive Actions:</strong> Custom notification buttons for snooze, complete, etc.</div>
            <div><strong>Analytics Tracking:</strong> Engagement metrics and notification history</div>
            <div><strong>Smart Scheduling:</strong> Context-aware notification timing and frequency</div>
            <div><strong>Category Management:</strong> Organized notification types with different behaviors</div>
          </div>
        </div>

        <h2>6. Hands-On Exercise: Personal Notification Assistant</h2>
        <p>
          Now it's your turn! Create a personal notification assistant app that combines local scheduling, 
          push notifications, and smart management features to help users stay organized and productive.
        </p>

        <div className="bg-orange-50 dark:bg-orange-950 p-6 rounded-lg border border-orange-200 dark:border-orange-800 my-6">
          <h4 className="text-orange-800 dark:text-orange-200 font-semibold mb-3 mt-0">
            🎯 Exercise: Smart Reminder System
          </h4>
          <div className="text-orange-700 dark:text-orange-300 space-y-3">
            <div>
              <strong>Core Requirements:</strong>
              <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                <li>Create custom reminders with titles, notes, and timing</li>
                <li>Support multiple reminder types (tasks, meetings, medications, etc.)</li>
                <li>Location-based reminders that trigger near specific places</li>
                <li>Smart scheduling with snooze and reschedule options</li>
                <li>Push notification integration for remote reminders</li>
                <li>Analytics dashboard showing reminder completion rates</li>
              </ul>
            </div>
            
            <div>
              <strong>Bonus Features:</strong>
              <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                <li>Voice notes for reminders using expo-av</li>
                <li>Photo attachments for visual reminders</li>
                <li>Recurring reminder patterns (daily, weekly, monthly)</li>
                <li>Smart suggestions based on usage patterns</li>
                <li>Integration with calendar events</li>
                <li>Shared reminders with family or team members</li>
              </ul>
            </div>
          </div>
        </div>

        <CodeBlock
          code={`// Starter template for your reminder assistant app
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

const REMINDERS_KEY = 'user_reminders';

export default function SmartReminderSystem() {
  const [reminders, setReminders] = useState([]);
  const [categories, setCategories] = useState(['Personal', 'Work', 'Health', 'Shopping']);

  useEffect(() => {
    loadReminders();
    setupNotificationListeners();
  }, []);

  const loadReminders = async () => {
    try {
      // TODO: Load reminders from AsyncStorage
    } catch (error) {
      console.error('Failed to load reminders:', error);
    }
  };

  const setupNotificationListeners = () => {
    // TODO: Set up notification received and response listeners
  };

  const createReminder = async (reminderData) => {
    try {
      // TODO: Create reminder with notification scheduling
    } catch (error) {
      console.error('Failed to create reminder:', error);
    }
  };

  const scheduleReminderNotification = async (reminder) => {
    try {
      // TODO: Schedule notification based on reminder settings
    } catch (error) {
      console.error('Failed to schedule notification:', error);
    }
  };

  const renderReminderItem = ({ item }) => {
    // TODO: Render reminder with actions (complete, snooze, edit)
    return (
      <View style={styles.reminderItem}>
        <Text style={styles.reminderTitle}>{item.title}</Text>
        <Text style={styles.reminderTime}>
          {new Date(item.scheduledTime).toLocaleString()}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Smart Reminders</Text>
        {/* TODO: Add create reminder button */}
      </View>

      <FlatList
        data={reminders}
        renderItem={renderReminderItem}
        keyExtractor={(item) => item.id}
        // TODO: Add empty state and categorization
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  reminderItem: {
    backgroundColor: 'white',
    padding: 15,
    marginHorizontal: 15,
    marginBottom: 10,
    borderRadius: 8,
  },
  reminderTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  reminderTime: {
    fontSize: 14,
    color: '#666',
  },
  // Add your custom styles here
});`}
          language="jsx"
          filename="SmartReminderExercise.jsx"
          title="Exercise Starter Template"
        />

        <h2>7. Best Practices & Guidelines</h2>

        <div className="grid md:grid-cols-2 gap-4 my-6">
          <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg border">
            <h4 className="font-semibold mb-3 mt-0">📱 User Experience</h4>
            <div className="text-sm space-y-2">
              <div>• Request permissions with clear value proposition</div>
              <div>• Provide granular notification preferences</div>
              <div>• Use meaningful titles and actionable content</div>
              <div>• Respect user's quiet hours and preferences</div>
              <div>• Allow easy opt-out and customization</div>
            </div>
          </div>
          
          <div className="p-4 bg-green-50 dark:bg-green-900 rounded-lg border">
            <h4 className="font-semibold mb-3 mt-0">🔒 Privacy & Security</h4>
            <div className="text-sm space-y-2">
              <div>• Store push tokens securely on your server</div>
              <div>• Don't include sensitive data in notifications</div>
              <div>• Use HTTPS for all notification API calls</div>
              <div>• Implement proper rate limiting</div>
              <div>• Provide clear privacy policy</div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border my-6">
          <h4 className="font-semibold mb-3 mt-0">📱 Platform-Specific Guidelines</h4>
          <div className="space-y-4">
            <div>
              <strong className="text-blue-600">iOS Guidelines:</strong>
              <div className="text-sm mt-1 space-y-1">
                <div>• Follow Apple's Human Interface Guidelines for notifications</div>
                <div>• Use notification categories for interactive actions</div>
                <div>• Respect iOS notification grouping and threading</div>
                <div>• Handle notification permissions gracefully</div>
              </div>
            </div>
            
            <div>
              <strong className="text-green-600">Android Guidelines:</strong>
              <div className="text-sm mt-1 space-y-1">
                <div>• Use notification channels for categorization</div>
                <div>• Support Android's notification importance levels</div>
                <div>• Handle background app limitations properly</div>
                <div>• Use appropriate notification icons and colors</div>
              </div>
            </div>
          </div>
        </div>

        <h2>8. Key Takeaways</h2>
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 p-6 rounded-lg border border-blue-200 dark:border-blue-800 my-6">
          <ul className="space-y-2 mb-0 text-blue-800 dark:text-blue-200">
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span><strong>expo-notifications</strong> provides unified local and push notification capabilities</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span><strong>Permission management</strong> is critical for notification delivery and user trust</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span><strong>Push tokens</strong> enable server-to-device communication for real-time updates</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span><strong>Interactive notifications</strong> improve engagement through actionable content</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span><strong>User preferences</strong> and analytics enable personalized notification experiences</span>
            </li>
          </ul>
        </div>

        <div className="bg-green-50 dark:bg-green-950 p-6 rounded-lg border border-green-200 dark:border-green-800">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-3 mt-0">
            🚀 Next Steps
          </h4>
          <div className="text-green-700 dark:text-green-300 space-y-2">
            <div>
              <strong>Advanced features:</strong> Rich media notifications, custom sounds, and notification extensions
            </div>
            <div>
              <strong>Server integration:</strong> Build robust backend systems for push notification delivery
            </div>
            <div>
              <strong>Analytics:</strong> Implement comprehensive notification tracking and optimization
            </div>
            <div>
              <strong>Personalization:</strong> Machine learning for optimal notification timing and content
            </div>
          </div>
        </div>
      </div>
    </>
  );
}