import { CodeBlock } from "@/components/ui/code-block-new";

export function Day3Session4Content() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      {/* Session Overview */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 p-6 rounded-xl border border-purple-200 dark:border-purple-800 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-purple-500 rounded-lg">
            <span className="text-white text-lg font-bold">🎨</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-purple-900 dark:text-purple-100 m-0">
              Day 3, Session 4: App State & Theming
            </h1>
            <p className="text-purple-700 dark:text-purple-300 m-0">
              Build dynamic theming with Context API, Appearance API, and persistent preferences
            </p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">🎯 Learning Objectives</h3>
            <ul className="text-purple-800 dark:text-purple-200 space-y-1">
              <li>• Create Theme Context with Provider pattern</li>
              <li>• Integrate Appearance API for system detection</li>
              <li>• Persist theme preferences with AsyncStorage</li>
              <li>• Build professional theme switching system</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">🚀 What You'll Build</h3>
            <ul className="text-purple-800 dark:text-purple-200 space-y-1">
              <li>• Dynamic light/dark theme system</li>
              <li>• System preference integration</li>
              <li>• Persistent theme storage</li>
              <li>• Smooth theme transitions</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Introduction */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Modern App Theming</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Professional mobile apps need sophisticated theming systems that respect user preferences, integrate with system settings, 
          and provide smooth transitions. We'll build a complete theme management system using React Context, Appearance API, and AsyncStorage.
        </p>
        
        <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
          <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">🎨 Theming Architecture</h4>
          <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1">
            <li>• <strong>Context API</strong>: Global theme state management</li>
            <li>• <strong>Appearance API</strong>: System theme detection and listening</li>
            <li>• <strong>AsyncStorage</strong>: Persistent theme preferences</li>
            <li>• <strong>Dynamic Styles</strong>: Theme-aware component styling</li>
          </ul>
        </div>
      </div>

      {/* Installation */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Setup Required Packages</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          We'll use React Native's built-in Appearance API and AsyncStorage from our previous session for persistence.
        </p>

        <CodeBlock
          code={`# Already installed from previous session
npm install @react-native-async-storage/async-storage

# Expo includes Appearance API by default
# For bare React Native projects, you might need:
# npm install react-native-appearance`}
          language="bash"
          filename="terminal"
          title="Package Dependencies"
        />

        <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border border-green-200 dark:border-green-800 mt-4">
          <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">✅ What We're Using</h4>
          <ul className="text-green-700 dark:text-green-300 text-sm space-y-1">
            <li>• <strong>React Native Appearance</strong>: System theme detection</li>
            <li>• <strong>AsyncStorage</strong>: Theme preference persistence</li>
            <li>• <strong>React Context</strong>: Global theme state management</li>
            <li>• <strong>React Hooks</strong>: useState, useEffect, useContext</li>
          </ul>
        </div>
      </div>

      {/* Example 1: Basic Theme Context */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Example 1: Basic Theme Context</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Let's start with a simple theme context that manages light and dark modes with manual switching.
        </p>

        <CodeBlock
          code={`import React, { createContext, useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Theme definitions
const themes = {
  light: {
    background: '#ffffff',
    surface: '#f8f9fa',
    primary: '#4f46e5',
    secondary: '#6b7280',
    text: '#1f2937',
    textSecondary: '#6b7280',
    border: '#e5e7eb',
    shadow: '#000000',
  },
  dark: {
    background: '#1f2937',
    surface: '#374151',
    primary: '#6366f1',
    secondary: '#9ca3af',
    text: '#f9fafb',
    textSecondary: '#d1d5db',
    border: '#4b5563',
    shadow: '#000000',
  },
};

// Theme context
const ThemeContext = createContext({
  theme: themes.light,
  isDarkMode: false,
  toggleTheme: () => {},
  setTheme: (isDark) => {},
});

// Theme provider component
export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load saved theme preference
  useEffect(() => {
    loadThemePreference();
  }, []);

  const loadThemePreference = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('theme_preference');
      if (savedTheme !== null) {
        setIsDarkMode(savedTheme === 'dark');
      }
    } catch (error) {
      console.error('Error loading theme preference:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveThemePreference = async (isDark) => {
    try {
      await AsyncStorage.setItem('theme_preference', isDark ? 'dark' : 'light');
    } catch (error) {
      console.error('Error saving theme preference:', error);
    }
  };

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    saveThemePreference(newTheme);
  };

  const setTheme = (isDark) => {
    setIsDarkMode(isDark);
    saveThemePreference(isDark);
  };

  const currentTheme = isDarkMode ? themes.dark : themes.light;

  const value = {
    theme: currentTheme,
    isDarkMode,
    toggleTheme,
    setTheme,
    isLoading,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook for using theme
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// Example app component
export default function BasicThemeApp() {
  return (
    <ThemeProvider>
      <ThemedApp />
    </ThemeProvider>
  );
}

function ThemedApp() {
  const { theme, isDarkMode, toggleTheme, isLoading } = useTheme();

  if (isLoading) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Text style={[styles.text, { color: theme.text }]}>Loading theme...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar 
        barStyle={isDarkMode ? 'light-content' : 'dark-content'} 
        backgroundColor={theme.background}
      />
      
      <View style={[styles.header, { backgroundColor: theme.surface }]}>
        <Text style={[styles.title, { color: theme.text }]}>
          Theme Demo
        </Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          Current mode: {isDarkMode ? 'Dark' : 'Light'}
        </Text>
      </View>

      <View style={styles.content}>
        <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border }]}>
          <Text style={[styles.cardTitle, { color: theme.text }]}>
            🎨 Theme System
          </Text>
          <Text style={[styles.cardText, { color: theme.textSecondary }]}>
            This app demonstrates a basic theme system with persistent preferences.
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.primary }]}
          onPress={toggleTheme}
        >
          <Text style={styles.buttonText}>
            Switch to {isDarkMode ? 'Light' : 'Dark'} Mode
          </Text>
        </TouchableOpacity>

        <View style={[styles.infoBox, { backgroundColor: theme.surface, borderColor: theme.border }]}>
          <Text style={[styles.infoTitle, { color: theme.text }]}>
            Theme Colors
          </Text>
          <View style={styles.colorRow}>
            <View style={[styles.colorSwatch, { backgroundColor: theme.primary }]} />
            <Text style={[styles.colorText, { color: theme.textSecondary }]}>Primary</Text>
          </View>
          <View style={styles.colorRow}>
            <View style={[styles.colorSwatch, { backgroundColor: theme.secondary }]} />
            <Text style={[styles.colorText, { color: theme.textSecondary }]}>Secondary</Text>
          </View>
          <View style={styles.colorRow}>
            <View style={[styles.colorSwatch, { backgroundColor: theme.surface }]} />
            <Text style={[styles.colorText, { color: theme.textSecondary }]}>Surface</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 60,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  card: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 16,
    lineHeight: 24,
  },
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoBox: {
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  colorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  colorSwatch: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 10,
  },
  colorText: {
    fontSize: 14,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
  },
});`}
          language="jsx"
          filename="BasicThemeApp.jsx"
          title="Basic Theme Context with Persistence"
        />

        <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border border-green-200 dark:border-green-800 mt-4">
          <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">✅ What's New in This Example</h4>
          <ul className="text-green-700 dark:text-green-300 text-sm space-y-1">
            <li>• <strong>Theme Context</strong> - Global theme state with Provider pattern</li>
            <li>• <strong>Custom Hook</strong> - useTheme hook for accessing theme data</li>
            <li>• <strong>Theme Objects</strong> - Structured color definitions for light/dark modes</li>
            <li>• <strong>Persistent Storage</strong> - AsyncStorage integration for theme preferences</li>
            <li>• <strong>Dynamic Styling</strong> - Theme-aware component styling</li>
          </ul>
        </div>
      </div>

      {/* Example 2: System Theme Integration */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Example 2: System Theme Integration</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Let's enhance our theme system with Appearance API to detect and respond to system theme changes.
        </p>

        <CodeBlock
          code={`import React, { createContext, useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Enhanced theme definitions with more colors
const themes = {
  light: {
    background: '#ffffff',
    surface: '#f8f9fa',
    card: '#ffffff',
    primary: '#4f46e5',
    secondary: '#6b7280',
    accent: '#10b981',
    text: '#1f2937',
    textSecondary: '#6b7280',
    border: '#e5e7eb',
    shadow: '#000000',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
  },
  dark: {
    background: '#0f172a',
    surface: '#1e293b',
    card: '#334155',
    primary: '#6366f1',
    secondary: '#94a3b8',
    accent: '#34d399',
    text: '#f1f5f9',
    textSecondary: '#cbd5e1',
    border: '#475569',
    shadow: '#000000',
    success: '#34d399',
    warning: '#fbbf24',
    error: '#f87171',
  },
};

// Theme modes
const THEME_MODES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
};

// Enhanced theme context
const ThemeContext = createContext({
  theme: themes.light,
  isDarkMode: false,
  themeMode: THEME_MODES.SYSTEM,
  toggleTheme: () => {},
  setThemeMode: (mode) => {},
  systemTheme: 'light',
});

export function EnhancedThemeProvider({ children }) {
  const [themeMode, setThemeMode] = useState(THEME_MODES.SYSTEM);
  const [systemTheme, setSystemTheme] = useState(Appearance.getColorScheme() || 'light');
  const [isLoading, setIsLoading] = useState(true);

  // Load saved theme preference
  useEffect(() => {
    loadThemePreference();
  }, []);

  // Listen to system theme changes
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setSystemTheme(colorScheme || 'light');
    });

    return () => subscription?.remove();
  }, []);

  const loadThemePreference = async () => {
    try {
      const savedThemeMode = await AsyncStorage.getItem('theme_mode');
      if (savedThemeMode && Object.values(THEME_MODES).includes(savedThemeMode)) {
        setThemeMode(savedThemeMode);
      }
    } catch (error) {
      console.error('Error loading theme preference:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveThemePreference = async (mode) => {
    try {
      await AsyncStorage.setItem('theme_mode', mode);
    } catch (error) {
      console.error('Error saving theme preference:', error);
    }
  };

  const setTheme = (mode) => {
    setThemeMode(mode);
    saveThemePreference(mode);
  };

  const toggleTheme = () => {
    const newMode = getEffectiveTheme() === 'dark' ? THEME_MODES.LIGHT : THEME_MODES.DARK;
    setTheme(newMode);
  };

  const getEffectiveTheme = () => {
    if (themeMode === THEME_MODES.SYSTEM) {
      return systemTheme;
    }
    return themeMode;
  };

  const isDarkMode = getEffectiveTheme() === 'dark';
  const currentTheme = isDarkMode ? themes.dark : themes.light;

  const value = {
    theme: currentTheme,
    isDarkMode,
    themeMode,
    systemTheme,
    toggleTheme,
    setThemeMode: setTheme,
    isLoading,
    THEME_MODES,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export default function SystemThemeApp() {
  return (
    <EnhancedThemeProvider>
      <ThemedSystemApp />
    </EnhancedThemeProvider>
  );
}

function ThemedSystemApp() {
  const { 
    theme, 
    isDarkMode, 
    themeMode, 
    systemTheme, 
    toggleTheme, 
    setThemeMode, 
    isLoading, 
    THEME_MODES 
  } = useTheme();

  if (isLoading) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Text style={[styles.text, { color: theme.text }]}>Loading theme...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar 
        barStyle={isDarkMode ? 'light-content' : 'dark-content'} 
        backgroundColor={theme.background}
      />
      
      <View style={[styles.header, { backgroundColor: theme.surface }]}>
        <Text style={[styles.title, { color: theme.text }]}>
          🌓 System Theme Demo
        </Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          Mode: {themeMode} | System: {systemTheme} | Active: {isDarkMode ? 'Dark' : 'Light'}
        </Text>
      </View>

      <View style={styles.content}>
        <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={[styles.cardTitle, { color: theme.text }]}>
            🎨 Theme Settings
          </Text>
          <Text style={[styles.cardText, { color: theme.textSecondary }]}>
            Choose your preferred theme mode. System mode automatically matches your device settings.
          </Text>
        </View>

        <View style={[styles.settingsCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={[styles.settingsTitle, { color: theme.text }]}>
            Theme Mode
          </Text>
          
          {Object.entries(THEME_MODES).map(([key, mode]) => (
            <TouchableOpacity
              key={mode}
              style={[
                styles.settingOption,
                { borderColor: theme.border },
                themeMode === mode && { backgroundColor: theme.primary + '20', borderColor: theme.primary }
              ]}
              onPress={() => setThemeMode(mode)}
            >
              <View style={styles.optionContent}>
                <Text style={[styles.optionText, { color: theme.text }]}>
                  {mode === 'system' ? '🌓' : mode === 'light' ? '☀️' : '🌙'} {key}
                </Text>
                {themeMode === mode && (
                  <View style={[styles.checkmark, { backgroundColor: theme.primary }]}>
                    <Text style={styles.checkmarkText}>✓</Text>
                  </View>
                )}
              </View>
              <Text style={[styles.optionDescription, { color: theme.textSecondary }]}>
                {mode === 'system' ? 'Follow system preference' : 
                 mode === 'light' ? 'Always use light mode' : 'Always use dark mode'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.primary }]}
          onPress={toggleTheme}
        >
          <Text style={styles.buttonText}>
            Quick Toggle ({isDarkMode ? 'Light' : 'Dark'})
          </Text>
        </TouchableOpacity>

        <View style={[styles.infoBox, { backgroundColor: theme.surface, borderColor: theme.border }]}>
          <Text style={[styles.infoTitle, { color: theme.text }]}>
            📱 System Integration
          </Text>
          <Text style={[styles.infoText, { color: theme.textSecondary }]}>
            • Automatically detects system theme changes
          </Text>
          <Text style={[styles.infoText, { color: theme.textSecondary }]}>
            • Remembers your preference across app restarts
          </Text>
          <Text style={[styles.infoText, { color: theme.textSecondary }]}>
            • Smooth transitions between themes
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 60,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 12,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  card: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 16,
    lineHeight: 24,
  },
  settingsCard: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 20,
  },
  settingsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  settingOption: {
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 10,
  },
  optionContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '600',
  },
  optionDescription: {
    fontSize: 14,
  },
  checkmark: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmarkText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoBox: {
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
  },
});`}
          language="jsx"
          filename="SystemThemeApp.jsx"
          title="System Theme Integration with Appearance API"
        />

        <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border border-green-200 dark:border-green-800 mt-4">
          <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">✅ What's New in This Example</h4>
          <ul className="text-green-700 dark:text-green-300 text-sm space-y-1">
            <li>• <strong>Appearance API</strong> - System theme detection and change listening</li>
            <li>• <strong>Theme Modes</strong> - Light, Dark, and System options</li>
            <li>• <strong>Change Listeners</strong> - Automatic response to system theme changes</li>
            <li>• <strong>Enhanced Colors</strong> - Extended color palette for professional theming</li>
            <li>• <strong>Theme Settings UI</strong> - User-friendly theme selection interface</li>
          </ul>
        </div>
      </div>

      {/* Example 3: Complete Theme System */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Example 3: Complete Production Theme System</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Let's create a production-ready theme system with animations, advanced persistence, and comprehensive theming patterns.
        </p>

        <CodeBlock
          code={`import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  StatusBar, 
  Appearance, 
  Animated,
  Dimensions,
  ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Professional theme system with semantic colors
const createTheme = (isDark) => ({
  mode: isDark ? 'dark' : 'light',
  colors: {
    // Background colors
    background: isDark ? '#0f172a' : '#ffffff',
    surface: isDark ? '#1e293b' : '#f8f9fa',
    card: isDark ? '#334155' : '#ffffff',
    overlay: isDark ? '#000000cc' : '#00000066',
    
    // Primary colors
    primary: isDark ? '#6366f1' : '#4f46e5',
    primaryLight: isDark ? '#8b5cf6' : '#7c3aed',
    primaryDark: isDark ? '#4338ca' : '#3730a3',
    
    // Secondary colors
    secondary: isDark ? '#94a3b8' : '#6b7280',
    secondaryLight: isDark ? '#cbd5e1' : '#9ca3af',
    secondaryDark: isDark ? '#64748b' : '#374151',
    
    // Accent colors
    accent: isDark ? '#34d399' : '#10b981',
    accentLight: isDark ? '#6ee7b7' : '#34d399',
    accentDark: isDark ? '#10b981' : '#059669',
    
    // Text colors
    text: isDark ? '#f1f5f9' : '#1f2937',
    textSecondary: isDark ? '#cbd5e1' : '#6b7280',
    textTertiary: isDark ? '#94a3b8' : '#9ca3af',
    textInverse: isDark ? '#1f2937' : '#f1f5f9',
    
    // Border and divider
    border: isDark ? '#475569' : '#e5e7eb',
    divider: isDark ? '#374151' : '#f3f4f6',
    
    // Status colors
    success: isDark ? '#34d399' : '#10b981',
    warning: isDark ? '#fbbf24' : '#f59e0b',
    error: isDark ? '#f87171' : '#ef4444',
    info: isDark ? '#60a5fa' : '#3b82f6',
    
    // Interactive states
    ripple: isDark ? '#ffffff20' : '#00000020',
    disabled: isDark ? '#64748b' : '#9ca3af',
    focus: isDark ? '#6366f1' : '#4f46e5',
  },
  
  // Typography
  typography: {
    h1: { fontSize: 32, fontWeight: 'bold', lineHeight: 40 },
    h2: { fontSize: 24, fontWeight: 'bold', lineHeight: 32 },
    h3: { fontSize: 20, fontWeight: '600', lineHeight: 28 },
    body: { fontSize: 16, fontWeight: '400', lineHeight: 24 },
    caption: { fontSize: 14, fontWeight: '400', lineHeight: 20 },
    label: { fontSize: 12, fontWeight: '500', lineHeight: 16 },
  },
  
  // Spacing
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  
  // Border radius
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
  },
  
  // Shadows
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 8,
    },
  },
});

const THEME_MODES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
};

const ThemeContext = createContext(null);

export function ProductionThemeProvider({ children }) {
  const [themeMode, setThemeMode] = useState(THEME_MODES.SYSTEM);
  const [systemTheme, setSystemTheme] = useState(Appearance.getColorScheme() || 'light');
  const [isLoading, setIsLoading] = useState(true);
  const [themeAnimation] = useState(new Animated.Value(0));

  useEffect(() => {
    loadThemePreference();
  }, []);

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setSystemTheme(colorScheme || 'light');
      animateThemeTransition();
    });
    return () => subscription?.remove();
  }, []);

  const loadThemePreference = async () => {
    try {
      const stored = await AsyncStorage.multiGet([
        'theme_mode',
        'theme_last_changed',
        'theme_system_sync'
      ]);
      
      const [[, savedMode], [, lastChanged], [, systemSync]] = stored;
      
      if (savedMode && Object.values(THEME_MODES).includes(savedMode)) {
        setThemeMode(savedMode);
      }
      
      // Log theme analytics
      console.log('Theme loaded:', {
        mode: savedMode,
        lastChanged: lastChanged ? new Date(lastChanged).toISOString() : null,
        systemSync: systemSync === 'true'
      });
      
    } catch (error) {
      console.error('Error loading theme preference:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveThemePreference = async (mode) => {
    try {
      await AsyncStorage.multiSet([
        ['theme_mode', mode],
        ['theme_last_changed', new Date().toISOString()],
        ['theme_system_sync', (mode === THEME_MODES.SYSTEM).toString()]
      ]);
    } catch (error) {
      console.error('Error saving theme preference:', error);
    }
  };

  const animateThemeTransition = () => {
    Animated.sequence([
      Animated.timing(themeAnimation, {
        toValue: 1,
        duration: 150,
        useNativeDriver: false,
      }),
      Animated.timing(themeAnimation, {
        toValue: 0,
        duration: 150,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const setTheme = (mode) => {
    setThemeMode(mode);
    saveThemePreference(mode);
    animateThemeTransition();
  };

  const getEffectiveTheme = () => {
    if (themeMode === THEME_MODES.SYSTEM) {
      return systemTheme;
    }
    return themeMode;
  };

  const isDarkMode = getEffectiveTheme() === 'dark';
  const theme = createTheme(isDarkMode);

  const value = {
    theme,
    isDarkMode,
    themeMode,
    systemTheme,
    setThemeMode: setTheme,
    isLoading,
    THEME_MODES,
    themeAnimation,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ProductionThemeProvider');
  }
  return context;
}

export default function ProductionThemeApp() {
  return (
    <ProductionThemeProvider>
      <ThemedProductionApp />
    </ProductionThemeProvider>
  );
}

function ThemedProductionApp() {
  const { theme, isDarkMode, themeMode, setThemeMode, isLoading, THEME_MODES, themeAnimation } = useTheme();
  const [activeTab, setActiveTab] = useState('settings');

  if (isLoading) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Text style={[styles.loadingText, { color: theme.colors.text }]}>Loading theme...</Text>
      </View>
    );
  }

  const animatedBackgroundColor = themeAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.colors.background, theme.colors.surface],
  });

  return (
    <Animated.View style={[styles.container, { backgroundColor: animatedBackgroundColor }]}>
      <StatusBar 
        barStyle={isDarkMode ? 'light-content' : 'dark-content'} 
        backgroundColor={theme.colors.background}
      />
      
      <View style={[styles.header, { backgroundColor: theme.colors.surface }]}>
        <Text style={[styles.title, { color: theme.colors.text }, theme.typography.h2]}>
          ⚡ Production Theme System
        </Text>
        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }, theme.typography.caption]}>
          Professional theming with animations and persistence
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Theme Settings Card */}
        <View style={[styles.card, { backgroundColor: theme.colors.card }, theme.shadows.md]}>
          <Text style={[styles.cardTitle, { color: theme.colors.text }, theme.typography.h3]}>
            🎨 Theme Settings
          </Text>
          
          <View style={styles.themeOptions}>
            {Object.entries(THEME_MODES).map(([key, mode]) => (
              <TouchableOpacity
                key={mode}
                style={[
                  styles.themeOption,
                  { 
                    backgroundColor: themeMode === mode ? theme.colors.primary + '20' : theme.colors.surface,
                    borderColor: themeMode === mode ? theme.colors.primary : theme.colors.border,
                  }
                ]}
                onPress={() => setThemeMode(mode)}
              >
                <View style={styles.themeOptionHeader}>
                  <Text style={[styles.themeOptionTitle, { color: theme.colors.text }]}>
                    {mode === 'system' ? '🌓' : mode === 'light' ? '☀️' : '🌙'} {key}
                  </Text>
                  {themeMode === mode && (
                    <View style={[styles.activeIndicator, { backgroundColor: theme.colors.primary }]} />
                  )}
                </View>
                <Text style={[styles.themeOptionDescription, { color: theme.colors.textSecondary }]}>
                  {mode === 'system' ? 'Follows system preference' : 
                   mode === 'light' ? 'Always use light theme' : 'Always use dark theme'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Color Palette Card */}
        <View style={[styles.card, { backgroundColor: theme.colors.card }, theme.shadows.md]}>
          <Text style={[styles.cardTitle, { color: theme.colors.text }, theme.typography.h3]}>
            🎨 Color Palette
          </Text>
          
          <View style={styles.colorGrid}>
            <View style={styles.colorGroup}>
              <Text style={[styles.colorGroupTitle, { color: theme.colors.textSecondary }]}>Primary</Text>
              <View style={styles.colorRow}>
                <View style={[styles.colorSwatch, { backgroundColor: theme.colors.primary }]} />
                <View style={[styles.colorSwatch, { backgroundColor: theme.colors.primaryLight }]} />
                <View style={[styles.colorSwatch, { backgroundColor: theme.colors.primaryDark }]} />
              </View>
            </View>
            
            <View style={styles.colorGroup}>
              <Text style={[styles.colorGroupTitle, { color: theme.colors.textSecondary }]}>Status</Text>
              <View style={styles.colorRow}>
                <View style={[styles.colorSwatch, { backgroundColor: theme.colors.success }]} />
                <View style={[styles.colorSwatch, { backgroundColor: theme.colors.warning }]} />
                <View style={[styles.colorSwatch, { backgroundColor: theme.colors.error }]} />
              </View>
            </View>
          </View>
        </View>

        {/* Theme Info Card */}
        <View style={[styles.card, { backgroundColor: theme.colors.card }, theme.shadows.md]}>
          <Text style={[styles.cardTitle, { color: theme.colors.text }, theme.typography.h3]}>
            📊 Theme Information
          </Text>
          
          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <Text style={[styles.infoLabel, { color: theme.colors.textSecondary }]}>Current Mode</Text>
              <Text style={[styles.infoValue, { color: theme.colors.text }]}>{themeMode}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={[styles.infoLabel, { color: theme.colors.textSecondary }]}>System Theme</Text>
              <Text style={[styles.infoValue, { color: theme.colors.text }]}>{systemTheme}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={[styles.infoLabel, { color: theme.colors.textSecondary }]}>Active Theme</Text>
              <Text style={[styles.infoValue, { color: theme.colors.text }]}>{isDarkMode ? 'Dark' : 'Light'}</Text>
            </View>
          </View>
        </View>

        {/* Features Card */}
        <View style={[styles.card, { backgroundColor: theme.colors.card }, theme.shadows.md]}>
          <Text style={[styles.cardTitle, { color: theme.colors.text }, theme.typography.h3]}>
            ✨ Features
          </Text>
          
          <View style={styles.featuresList}>
            <Text style={[styles.featureItem, { color: theme.colors.textSecondary }]}>
              • System theme detection and auto-switching
            </Text>
            <Text style={[styles.featureItem, { color: theme.colors.textSecondary }]}>
              • Smooth animated transitions between themes
            </Text>
            <Text style={[styles.featureItem, { color: theme.colors.textSecondary }]}>
              • Persistent theme preferences with AsyncStorage
            </Text>
            <Text style={[styles.featureItem, { color: theme.colors.textSecondary }]}>
              • Comprehensive color system with semantic naming
            </Text>
            <Text style={[styles.featureItem, { color: theme.colors.textSecondary }]}>
              • Typography and spacing scales
            </Text>
            <Text style={[styles.featureItem, { color: theme.colors.textSecondary }]}>
              • Shadow and border radius tokens
            </Text>
          </View>
        </View>
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 60,
    alignItems: 'center',
  },
  title: {
    marginBottom: 5,
  },
  subtitle: {
    textAlign: 'center',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  card: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  cardTitle: {
    marginBottom: 16,
  },
  themeOptions: {
    gap: 12,
  },
  themeOption: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
  themeOptionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  themeOptionTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  themeOptionDescription: {
    fontSize: 14,
  },
  activeIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  colorGrid: {
    gap: 16,
  },
  colorGroup: {
    gap: 8,
  },
  colorGroupTitle: {
    fontSize: 14,
    fontWeight: '500',
  },
  colorRow: {
    flexDirection: 'row',
    gap: 8,
  },
  colorSwatch: {
    width: 32,
    height: 32,
    borderRadius: 8,
  },
  infoGrid: {
    gap: 16,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 14,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  featuresList: {
    gap: 8,
  },
  featureItem: {
    fontSize: 14,
    lineHeight: 20,
  },
  loadingText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 100,
  },
});`}
          language="jsx"
          filename="ProductionThemeApp.jsx"
          title="Production-Ready Theme System"
        />

        <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border border-green-200 dark:border-green-800 mt-4">
          <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">✅ What's New in This Example</h4>
          <ul className="text-green-700 dark:text-green-300 text-sm space-y-1">
            <li>• <strong>Semantic Colors</strong> - Comprehensive color system with semantic naming</li>
            <li>• <strong>Design Tokens</strong> - Typography, spacing, shadows, and border radius scales</li>
            <li>• <strong>Animated Transitions</strong> - Smooth theme switching animations</li>
            <li>• <strong>Advanced Persistence</strong> - Multiple AsyncStorage keys for analytics</li>
            <li>• <strong>Production Patterns</strong> - Professional theming architecture</li>
          </ul>
        </div>
      </div>

      {/* Theme System Comparison */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Theme System Evolution</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-3">🎨 Basic Theme</h4>
            <div className="text-sm space-y-2">
              <div>
                <strong className="text-blue-900 dark:text-blue-100">Features:</strong>
                <p className="text-blue-700 dark:text-blue-300">Simple light/dark toggle with persistence</p>
              </div>
              <div>
                <strong className="text-blue-900 dark:text-blue-100">Best for:</strong>
                <p className="text-blue-700 dark:text-blue-300">Simple apps, prototypes, learning</p>
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
            <h4 className="font-semibold text-green-800 dark:text-green-200 mb-3">🌓 System Theme</h4>
            <div className="text-sm space-y-2">
              <div>
                <strong className="text-green-900 dark:text-green-100">Features:</strong>
                <p className="text-green-700 dark:text-green-300">Appearance API integration, system detection</p>
              </div>
              <div>
                <strong className="text-green-900 dark:text-green-100">Best for:</strong>
                <p className="text-green-700 dark:text-green-300">Modern apps, good UX practices</p>
              </div>
            </div>
          </div>
          
          <div className="bg-purple-50 dark:bg-purple-950/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
            <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-3">⚡ Production</h4>
            <div className="text-sm space-y-2">
              <div>
                <strong className="text-purple-900 dark:text-purple-100">Features:</strong>
                <p className="text-purple-700 dark:text-purple-300">Design tokens, animations, analytics</p>
              </div>
              <div>
                <strong className="text-purple-900 dark:text-purple-100">Best for:</strong>
                <p className="text-purple-700 dark:text-purple-300">Production apps, design systems</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Best Practices */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Theme System Best Practices</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-yellow-50 dark:bg-yellow-950/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-3">🎯 Design Principles</h4>
            <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1">
              <li>• Use semantic color names (primary, secondary, success)</li>
              <li>• Implement consistent spacing and typography scales</li>
              <li>• Design for accessibility with proper contrast ratios</li>
              <li>• Test both light and dark themes thoroughly</li>
              <li>• Provide smooth transitions between themes</li>
            </ul>
          </div>
          
          <div className="bg-orange-50 dark:bg-orange-950/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
            <h4 className="font-semibold text-orange-800 dark:text-orange-200 mb-3">⚡ Performance Tips</h4>
            <ul className="text-orange-700 dark:text-orange-300 text-sm space-y-1">
              <li>• Cache theme objects to prevent re-creation</li>
              <li>• Use React.memo for theme-aware components</li>
              <li>• Minimize AsyncStorage operations</li>
              <li>• Pre-load theme preferences on app start</li>
              <li>• Use native animations for smooth transitions</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Hands-On Exercise */}
      <div className="bg-orange-50 dark:bg-orange-950/20 p-6 rounded-xl border border-orange-200 dark:border-orange-800">
        <h3 className="text-lg font-semibold text-orange-900 dark:text-orange-100 mb-4">
          🎯 Hands-On Exercise: Complete Theme System
        </h3>
        
        <div className="text-orange-800 dark:text-orange-200 space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Challenge: Build Your Own Theme System</h4>
            <p className="text-sm">
              Create a complete theme system for a social media app with multiple color schemes and user preferences.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">Requirements:</h4>
            <ul className="text-sm space-y-1">
              <li>• Light, dark, and system theme modes</li>
              <li>• User profile with theme preferences</li>
              <li>• Theme-aware components (cards, buttons, inputs)</li>
              <li>• Smooth animations between theme changes</li>
              <li>• AsyncStorage persistence for all settings</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">Bonus Features:</h4>
            <ul className="text-sm space-y-1">
              <li>• Custom accent color picker</li>
              <li>• High contrast mode for accessibility</li>
              <li>• Theme scheduling (auto dark mode at night)</li>
              <li>• Theme analytics and usage tracking</li>
              <li>• Import/export theme configurations</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Session Summary */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 p-6 rounded-xl border border-purple-200 dark:border-purple-800 mt-8">
        <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-4">
          🎉 Session 4 Complete!
        </h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">What You've Learned</h4>
            <ul className="text-purple-700 dark:text-purple-300 text-sm space-y-1">
              <li>• React Context for global theme management</li>
              <li>• Appearance API for system theme detection</li>
              <li>• AsyncStorage theme persistence patterns</li>
              <li>• Professional theming architecture</li>
              <li>• Smooth theme transitions and animations</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">Next Steps</h4>
            <ul className="text-purple-700 dark:text-purple-300 text-sm space-y-1">
              <li>• Explore advanced Context patterns</li>
              <li>• Learn about design systems and tokens</li>
              <li>• Study accessibility in mobile theming</li>
              <li>• Build custom theme generators</li>
              <li>• Implement theme A/B testing</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}