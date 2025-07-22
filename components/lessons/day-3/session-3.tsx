"use client";

import { CodeBlock } from "@/components/ui/code-block-new";

export function Day3Session3Content() {
  return (
    <>
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">
            AsyncStorage & Secure Store - Session 3
          </h1>

          <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg border border-blue-200 dark:border-blue-800 mb-8">
            <h3 className="text-blue-800 dark:text-blue-200 font-semibold mb-4 mt-0">
              📦 Session Overview
            </h3>
            <ul className="text-blue-700 dark:text-blue-300 space-y-2 mb-0">
              <li>
                <strong>AsyncStorage Basics</strong> - Store user preferences and app data locally
              </li>
              <li>
                <strong>Secure Store</strong> - Keep sensitive data like tokens safe and encrypted
              </li>
              <li>
                <strong>Login Persistence</strong> - Remember user login across app sessions
              </li>
              <li>
                <strong>Data Management</strong> - Load, save, and clear stored data properly
              </li>
            </ul>
          </div>
        </div>

        <h2>1. Why Local Storage Matters</h2>
        <p>
          Mobile apps need to remember things - user preferences, login status, and settings. 
          React Native gives us two main tools: AsyncStorage for general data and Secure Store for sensitive information.
        </p>

        <div className="bg-green-50 dark:bg-green-950 p-6 rounded-lg border border-green-200 dark:border-green-800 mb-6">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-3 mt-0">
            ✅ Storage Types:
          </h4>
          <ul className="text-green-700 dark:text-green-300 text-sm space-y-1 mb-0">
            <li><strong>AsyncStorage</strong> - User preferences, settings, non-sensitive data</li>
            <li><strong>Secure Store</strong> - Passwords, tokens, API keys, sensitive data</li>
            <li><strong>Memory (useState)</strong> - Temporary data that doesn't need to persist</li>
          </ul>
        </div>

        <h2>2. Setting Up AsyncStorage</h2>
        <p>
          AsyncStorage is a simple key-value storage system. Let's install it and see how it works.
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

        <h2>3. Basic AsyncStorage Example</h2>
        <p>
          Let's build a simple preferences app that remembers user settings like dark mode.
        </p>

        <CodeBlock
          code={`import React, { useState, useEffect } from 'react';
import { View, Text, Switch, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingsApp() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  // Load settings when app starts
  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const savedSettings = await AsyncStorage.getItem('user_settings');
      if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        setDarkMode(settings.darkMode || false);
        setNotifications(settings.notifications !== false);
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const saveSettings = async (newSettings) => {
    try {
      const settings = {
        darkMode: newSettings.darkMode ?? darkMode,
        notifications: newSettings.notifications ?? notifications,
        savedAt: new Date().toISOString()
      };
      
      await AsyncStorage.setItem('user_settings', JSON.stringify(settings));
      console.log('Settings saved!');
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  const toggleDarkMode = () => {
    const newValue = !darkMode;
    setDarkMode(newValue);
    saveSettings({ darkMode: newValue });
  };

  const toggleNotifications = () => {
    const newValue = !notifications;
    setNotifications(newValue);
    saveSettings({ notifications: newValue });
  };

  const clearAllSettings = async () => {
    try {
      await AsyncStorage.removeItem('user_settings');
      setDarkMode(false);
      setNotifications(true);
      console.log('Settings cleared!');
    } catch (error) {
      console.error('Error clearing settings:', error);
    }
  };

  return (
    <View style=\\{{ flex: 1, padding: 20, backgroundColor: darkMode ? '#333' : '#f5f5f5' }}>
      <Text style=\\{{ fontSize: 24, fontWeight: 'bold', marginBottom: 30, color: darkMode ? 'white' : 'black' }}>
        Settings
      </Text>
      
      <View style=\\{{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, padding: 15, backgroundColor: darkMode ? '#555' : 'white', borderRadius: 8 }}>
        <Text style=\\{{ fontSize: 16, color: darkMode ? 'white' : 'black' }}>Dark Mode</Text>
        <Switch value={darkMode} onValueChange={toggleDarkMode} />
      </View>
      
      <View style=\\{{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30, padding: 15, backgroundColor: darkMode ? '#555' : 'white', borderRadius: 8 }}>
        <Text style=\\{{ fontSize: 16, color: darkMode ? 'white' : 'black' }}>Notifications</Text>
        <Switch value={notifications} onValueChange={toggleNotifications} />
      </View>
      
      <TouchableOpacity 
        style=\\{{ backgroundColor: 'red', padding: 15, borderRadius: 8 }}
        onPress={clearAllSettings}
      >
        <Text style=\\{{ color: 'white', textAlign: 'center', fontSize: 16 }}>Clear Settings</Text>
      </TouchableOpacity>
    </View>
  );
}`}
          language="jsx"
          filename="SettingsApp.jsx"
          title="Simple AsyncStorage Example"
        />

        <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg border border-blue-200 dark:border-blue-800 mb-6">
          <h4 className="text-blue-800 dark:text-blue-200 font-semibold mb-3 mt-0">
            🔧 Key AsyncStorage Functions:
          </h4>
          <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1 mb-0">
            <li><strong>AsyncStorage.getItem()</strong> - Load data by key</li>
            <li><strong>AsyncStorage.setItem()</strong> - Save data with a key</li>
            <li><strong>AsyncStorage.removeItem()</strong> - Delete data by key</li>
            <li><strong>JSON.parse/stringify</strong> - Convert objects to/from strings</li>
            <li><strong>useEffect</strong> - Load data when app starts</li>
          </ul>
        </div>

        <h2>4. Using Secure Store for Sensitive Data</h2>
        <p>
          For passwords, tokens, and sensitive information, we need Secure Store which encrypts data 
          using your device's secure keychain.
        </p>

        <CodeBlock
          code={`import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Check if user is already logged in
  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const token = await SecureStore.getItemAsync('userToken');
      if (token) {
        setIsLoggedIn(true);
        console.log('User is logged in with token');
      }
    } catch (error) {
      console.error('Error checking login:', error);
    }
  };

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please enter username and password');
      return;
    }

    try {
      // Simulate login - normally you'd call your API here
      const mockToken = 'secure_token_' + Date.now();
      
      // Store sensitive token in Secure Store
      await SecureStore.setItemAsync('userToken', mockToken);
      
      // Store non-sensitive user info in AsyncStorage
      await AsyncStorage.setItem('userInfo', JSON.stringify({
        username: username,
        loginTime: new Date().toISOString()
      }));
      
      setIsLoggedIn(true);
      setUsername('');
      setPassword('');
      
      Alert.alert('Success', 'Login successful!');
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'Login failed');
    }
  };

  const handleLogout = async () => {
    try {
      // Remove secure token
      await SecureStore.deleteItemAsync('userToken');
      
      // Remove user info
      await AsyncStorage.removeItem('userInfo');
      
      setIsLoggedIn(false);
      Alert.alert('Success', 'Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const showStoredToken = async () => {
    try {
      const token = await SecureStore.getItemAsync('userToken');
      if (token) {
        Alert.alert('Token Found', token.substring(0, 30) + '...');
      } else {
        Alert.alert('No Token', 'No token found');
      }
    } catch (error) {
      console.error('Error getting token:', error);
    }
  };

  if (isLoggedIn) {
    return (
      <View style=\\{{ flex: 1, padding: 20, justifyContent: 'center' }}>
        <Text style=\\{{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 40 }}>
          🔐 Welcome Back!
        </Text>
        
        <TouchableOpacity 
          style=\\{{ backgroundColor: '#007AFF', padding: 15, borderRadius: 8, marginBottom: 15 }}
          onPress={showStoredToken}
        >
          <Text style=\\{{ color: 'white', textAlign: 'center', fontSize: 16 }}>Show Token</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style=\\{{ backgroundColor: 'red', padding: 15, borderRadius: 8 }}
          onPress={handleLogout}
        >
          <Text style=\\{{ color: 'white', textAlign: 'center', fontSize: 16 }}>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style=\\{{ flex: 1, padding: 20, justifyContent: 'center' }}>
      <Text style=\\{{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 30 }}>
        🔐 Secure Login
      </Text>
      
      <TextInput
        style=\\{{ borderWidth: 1, borderColor: '#ccc', padding: 15, marginBottom: 15, borderRadius: 8 }}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      
      <TextInput
        style=\\{{ borderWidth: 1, borderColor: '#ccc', padding: 15, marginBottom: 20, borderRadius: 8 }}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      <TouchableOpacity 
        style=\\{{ backgroundColor: '#007AFF', padding: 15, borderRadius: 8 }}
        onPress={handleLogin}
      >
        <Text style=\\{{ color: 'white', textAlign: 'center', fontSize: 16 }}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}`}
          language="jsx"
          filename="SecureLoginApp.jsx"
          title="Simple Secure Store Example"
        />

        <div className="bg-yellow-50 dark:bg-yellow-950 p-6 rounded-lg border border-yellow-200 dark:border-yellow-800 mb-6">
          <h4 className="text-yellow-800 dark:text-yellow-200 font-semibold mb-3 mt-0">
            💡 Storage Strategy:
          </h4>
          <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1 mb-0">
            <li><strong>AsyncStorage</strong> - User preferences, settings, non-sensitive data</li>
            <li><strong>Secure Store</strong> - Passwords, tokens, API keys, sensitive data</li>
            <li><strong>Always encrypt</strong> sensitive information using Secure Store</li>
            <li><strong>Clear on logout</strong> to protect user privacy</li>
          </ul>
        </div>

        <h2>5. Hands-On Exercise</h2>
        <p>
          Now it's time to practice! Try building your own app that combines AsyncStorage and Secure Store.
        </p>

        <div className="bg-orange-50 dark:bg-orange-950 p-6 rounded-lg border border-orange-200 dark:border-orange-800 mb-6">
          <h4 className="text-orange-800 dark:text-orange-200 font-semibold mb-3 mt-0">
            🎯 Practice Exercise:
          </h4>
          <ul className="text-orange-700 dark:text-orange-300 text-sm space-y-1 mb-0">
            <li>• Create an app with user settings that persist</li>
            <li>• Add a login system that remembers the user</li>
            <li>• Store sensitive data (tokens) in Secure Store</li>
            <li>• Store regular data (preferences) in AsyncStorage</li>
            <li>• Add proper error handling for all storage operations</li>
            <li>• Include logout functionality that clears all data</li>
          </ul>
        </div>

        <h2>6. Session Summary</h2>

        <div className="bg-green-50 dark:bg-green-950 p-6 rounded-lg border border-green-200 dark:border-green-800 mb-6">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-3 mt-0">
            🎉 What You've Learned:
          </h4>
          <ul className="text-green-700 dark:text-green-300 text-sm space-y-1 mb-0">
            <li>✅ <strong>AsyncStorage</strong> - Store and retrieve user preferences locally</li>
            <li>✅ <strong>Secure Store</strong> - Keep sensitive data encrypted and safe</li>
            <li>✅ <strong>Data Persistence</strong> - Remember user data across app sessions</li>
            <li>✅ <strong>Storage Strategy</strong> - Choose the right storage for different data types</li>
            <li>✅ <strong>Error Handling</strong> - Handle storage failures gracefully</li>
          </ul>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
          <h4 className="text-blue-800 dark:text-blue-200 font-semibold mb-3 mt-0">
            📚 Key Concepts:
          </h4>
          <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1 mb-0">
            <li><strong>AsyncStorage</strong> is perfect for user preferences and settings</li>
            <li><strong>Secure Store</strong> protects sensitive data with encryption</li>
            <li><strong>useEffect</strong> loads data when your app starts</li>
            <li><strong>JSON.stringify/parse</strong> converts objects for storage</li>
            <li><strong>Error handling</strong> prevents crashes when storage fails</li>
            <li><strong>Clean logout</strong> removes all stored user data</li>
          </ul>
        </div>

      </div>
    </>
  );
}