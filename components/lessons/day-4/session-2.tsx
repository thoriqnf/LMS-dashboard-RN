"use client";

import { CodeBlock } from "@/components/ui/code-block-new";

export function Day4Session2Content() {
  return (
    <>
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">
            React Native Auth Logic - Session 2
          </h1>

          <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg border border-blue-200 dark:border-blue-800 mb-8">
            <h3 className="text-blue-800 dark:text-blue-200 font-semibold mb-4 mt-0">
              ⚡ Session Overview
            </h3>
            <ul className="text-blue-700 dark:text-blue-300 space-y-2 mb-0">
              <li>
                <strong>Auth Context</strong> - Global authentication state management
              </li>
              <li>
                <strong>Login Logic</strong> - Handle user authentication with APIs
              </li>
              <li>
                <strong>Token Storage</strong> - Secure token management with AsyncStorage
              </li>
              <li>
                <strong>Session Management</strong> - Check login status and auto-login
              </li>
            </ul>
          </div>
        </div>

        <h2>1. Why Auth Logic Matters</h2>
        <p>
          Good authentication logic keeps users logged in, protects their data, and 
          provides a smooth experience. We'll use React Context and AsyncStorage from Day 3.
        </p>

        <div className="bg-green-50 dark:bg-green-950 p-6 rounded-lg border border-green-200 dark:border-green-800 mb-6">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-3 mt-0">
            ✅ Essential Auth Features:
          </h4>
          <ul className="text-green-700 dark:text-green-300 text-sm space-y-1 mb-0">
            <li><strong>Persistent login</strong> - Stay logged in after app restart</li>
            <li><strong>Secure storage</strong> - Safe token storage</li>
            <li><strong>Global state</strong> - Access user data anywhere</li>
            <li><strong>Auto logout</strong> - Handle expired sessions</li>
          </ul>
        </div>

        <h2>2. Basic Auth Context Setup</h2>
        <p>
          Let's create an authentication context that manages user state globally. 
          This builds on the Context API knowledge from Day 3.
        </p>

        <CodeBlock
          code={`import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create auth context
const AuthContext = createContext({
  user: null,
  isLoading: false,
  login: async () => {},
  logout: async () => {},
  signup: async () => {},
});

// Auth provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already logged in when app starts
  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('auth_token');
      const userData = await AsyncStorage.getItem('user_data');
      
      if (token && userData) {
        // User is logged in
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Error checking login status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setIsLoading(true);
      
      // Simulate API call (replace with your API)
      const response = await fetch('https://your-api.com/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      
      // Store token and user data
      await AsyncStorage.setItem('auth_token', data.token);
      await AsyncStorage.setItem('user_data', JSON.stringify(data.user));
      
      setUser(data.user);
      return { success: true };
      
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name, email, password) => {
    try {
      setIsLoading(true);
      
      // Simulate API call
      const response = await fetch('https://your-api.com/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        throw new Error('Signup failed');
      }

      const data = await response.json();
      
      // Store token and user data
      await AsyncStorage.setItem('auth_token', data.token);
      await AsyncStorage.setItem('user_data', JSON.stringify(data.user));
      
      setUser(data.user);
      return { success: true };
      
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Remove stored data
      await AsyncStorage.removeItem('auth_token');
      await AsyncStorage.removeItem('user_data');
      
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const value = {
    user,
    isLoading,
    login,
    logout,
    signup,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}`}
          language="jsx"
          filename="AuthContext.jsx"
          title="Basic Auth Context Setup"
        />

        <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg border border-blue-200 dark:border-blue-800 mb-6">
          <h4 className="text-blue-800 dark:text-blue-200 font-semibold mb-3 mt-0">
            🔧 Auth Context Features:
          </h4>
          <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1 mb-0">
            <li><strong>Global state</strong> - User data available everywhere</li>
            <li><strong>Persistent login</strong> - Check stored tokens on app start</li>
            <li><strong>Async operations</strong> - Handle login/signup API calls</li>
            <li><strong>Secure storage</strong> - Store tokens safely with AsyncStorage</li>
            <li><strong>Loading states</strong> - Manage loading during auth operations</li>
          </ul>
        </div>

        <h2>3. Using Auth Context in Screens</h2>
        <p>
          Now let's update our login form from Session 1 to use the auth context 
          and handle real authentication logic.
        </p>

        <CodeBlock
          code={`import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useAuth } from './AuthContext';

export default function LoginScreen() {
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    
    const result = await login(email, password);
    
    if (result.success) {
      Alert.alert('Success', 'Welcome back!');
    } else {
      Alert.alert('Login Failed', result.error || 'Please check your credentials');
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
      <Text style={{ fontSize: 24, textAlign: 'center', marginBottom: 30 }}>
        Welcome Back
      </Text>

      <TextInput
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15 }}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 20 }}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity
        style={{ backgroundColor: '#007AFF', padding: 15, alignItems: 'center' }}
        onPress={handleLogin}
        disabled={isLoading}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>
          {isLoading ? 'Signing In...' : 'Sign In'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}`}
          language="jsx"
          filename="LoginScreen.jsx"
          title="Login Screen with Auth Context"
        />

        <h2>4. Protected App Component</h2>
        <p>
          Let's create the main app component that handles authentication flow - 
          showing auth screens for logged out users and main app for logged in users.
        </p>

        <CodeBlock
          code={`import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { AuthProvider, useAuth } from './AuthContext';
import LoginScreen from './LoginScreen';

// Main app for logged in users
function MainApp() {
  const { user, logout } = useAuth();

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
      <Text style={{ fontSize: 20, textAlign: 'center', marginBottom: 20 }}>
        Welcome, {user?.name || 'User'}!
      </Text>
      
      <View style={{ padding: 20, marginBottom: 20 }}>
        <Text>Email: {user?.email}</Text>
        <Text>User ID: {user?.id}</Text>
      </View>

      <TouchableOpacity
        style={{ backgroundColor: 'red', padding: 15, alignItems: 'center' }}
        onPress={logout}
      >
        <Text style={{ color: 'white' }}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

// Check if user is logged in
function AppContent() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return user ? <MainApp /> : <LoginScreen />;
}

// Root app
export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}`}
          language="jsx"
          filename="App.jsx"
          title="Complete Auth Flow App"
        />

        <div className="bg-yellow-50 dark:bg-yellow-950 p-6 rounded-lg border border-yellow-200 dark:border-yellow-800 mb-6">
          <h4 className="text-yellow-800 dark:text-yellow-200 font-semibold mb-3 mt-0">
            💡 Authentication Flow:
          </h4>
          <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1 mb-0">
            <li><strong>App loads</strong> - Check for stored auth token</li>
            <li><strong>Token found</strong> - Show main app immediately</li>
            <li><strong>No token</strong> - Show login screen</li>
            <li><strong>Login success</strong> - Store token, show main app</li>
            <li><strong>Logout</strong> - Clear token, show login screen</li>
          </ul>
        </div>

        <h2>5. Essential Practice</h2>
        <p>
          Try building your own auth system using Context API and AsyncStorage. 
          Start simple and add features as needed.
        </p>

        <div className="bg-orange-50 dark:bg-orange-950 p-6 rounded-lg border border-orange-200 dark:border-orange-800 mb-6">
          <h4 className="text-orange-800 dark:text-orange-200 font-semibold mb-3 mt-0">
            🎯 Quick Practice:
          </h4>
          <ul className="text-orange-700 dark:text-orange-300 text-sm space-y-1 mb-0">
            <li>• Set up AuthContext with login/logout functions</li>
            <li>• Store and check auth tokens with AsyncStorage</li>
            <li>• Create protected routes that require authentication</li>
            <li>• Test the complete login/logout flow</li>
          </ul>
        </div>

        <h2>6. Session Summary</h2>

        <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
          <h4 className="text-blue-800 dark:text-blue-200 font-semibold mb-3 mt-0">
            📚 Auth Logic Essentials:
          </h4>
          <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1 mb-0">
            <li><strong>Auth Context</strong> - Global authentication state management</li>
            <li><strong>Token storage</strong> - Secure token persistence with AsyncStorage</li>
            <li><strong>Session management</strong> - Auto-login and session checking</li>
            <li><strong>Protected routes</strong> - Show content based on auth state</li>
            <li><strong>Login flow</strong> - Complete authentication workflow</li>
          </ul>
        </div>
      </div>
    </>
  );
}