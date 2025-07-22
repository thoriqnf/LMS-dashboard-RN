"use client";

import { CodeBlock } from "@/components/ui/code-block-new";

export function Day3Session4Content() {
  return (
    <>
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">
            App State & Theming - Session 4
          </h1>

          <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg border border-blue-200 dark:border-blue-800 mb-8">
            <h3 className="text-blue-800 dark:text-blue-200 font-semibold mb-4 mt-0">
              🎨 Session Overview
            </h3>
            <ul className="text-blue-700 dark:text-blue-300 space-y-2 mb-0">
              <li>
                <strong>React Context Basics</strong> - Share theme state across components easily
              </li>
              <li>
                <strong>Simple Theme System</strong> - Create basic light and dark modes
              </li>
              <li>
                <strong>Theme Persistence</strong> - Remember user's theme choice with AsyncStorage
              </li>
              <li>
                <strong>System Integration</strong> - Detect device theme preferences
              </li>
            </ul>
          </div>
        </div>

        <h2>1. Why App Theming Matters</h2>
        <p>
          Users love having control over their app's appearance. A simple theme system that supports 
          light and dark modes makes your app feel modern and professional.
        </p>

        <div className="bg-green-50 dark:bg-green-950 p-6 rounded-lg border border-green-200 dark:border-green-800 mb-6">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-3 mt-0">
            ✅ Benefits of Theming:
          </h4>
          <ul className="text-green-700 dark:text-green-300 text-sm space-y-1 mb-0">
            <li><strong>User choice</strong> - Let users pick their preferred theme</li>
            <li><strong>Better UX</strong> - Consistent colors throughout your app</li>
            <li><strong>System respect</strong> - Follow device theme settings</li>
            <li><strong>Accessibility</strong> - Dark mode helps users with light sensitivity</li>
          </ul>
        </div>

        <h2>2. Basic Theme System with Context</h2>
        <p>
          React Context is perfect for sharing theme state across all your components. Let's build 
          a simple theme system that works with light and dark modes.
        </p>

        <CodeBlock
          code={`import React, { createContext, useContext, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Simple theme definitions
const themes = {
  light: {
    background: '#ffffff',
    surface: '#f5f5f5',
    primary: '#007AFF',
    text: '#000000',
    textSecondary: '#666666',
  },
  dark: {
    background: '#1a1a1a',
    surface: '#333333',
    primary: '#0A84FF',
    text: '#ffffff',
    textSecondary: '#cccccc',
  },
};

// Create theme context
const ThemeContext = createContext({
  theme: themes.light,
  isDarkMode: false,
  toggleTheme: () => {},
});

// Theme provider component
export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load saved theme preference
  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('app_theme');
      if (savedTheme === 'dark') {
        setIsDarkMode(true);
      }
    } catch (error) {
      console.error('Error loading theme:', error);
    }
  };

  const toggleTheme = async () => {
    try {
      const newTheme = !isDarkMode;
      setIsDarkMode(newTheme);
      await AsyncStorage.setItem('app_theme', newTheme ? 'dark' : 'light');
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  const currentTheme = isDarkMode ? themes.dark : themes.light;

  return (
    <ThemeContext.Provider value={{
      theme: currentTheme,
      isDarkMode,
      toggleTheme,
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to use theme
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

// Example themed app
export default function BasicThemedApp() {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
}

function MainApp() {
  const { theme, isDarkMode, toggleTheme } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: theme.background, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', color: theme.text, marginBottom: 30 }}>
        🎨 Theme Demo
      </Text>

      {/* Theme toggle card */}
      <View style={{ 
        backgroundColor: theme.surface, 
        padding: 20, 
        borderRadius: 10, 
        marginBottom: 20 
      }}>
        <Text style={{ fontSize: 18, color: theme.text, marginBottom: 15 }}>
          Theme Settings
        </Text>
        
        <View style={{ 
          flexDirection: 'row', 
          justifyContent: 'space-between', 
          alignItems: 'center' 
        }}>
          <Text style={{ fontSize: 16, color: theme.textSecondary }}>
            Dark Mode
          </Text>
          <Switch
            value={isDarkMode}
            onValueChange={toggleTheme}
          />
        </View>
      </View>

      {/* Sample content card */}
      <View style={{ 
        backgroundColor: theme.surface, 
        padding: 20, 
        borderRadius: 10, 
        marginBottom: 20 
      }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: theme.text, marginBottom: 10 }}>
          Sample Content
        </Text>
        <Text style={{ fontSize: 14, color: theme.textSecondary, marginBottom: 15 }}>
          This content automatically adapts to the current theme. All colors come from our theme object.
        </Text>
        
        <TouchableOpacity 
          style={{ 
            backgroundColor: theme.primary, 
            padding: 12, 
            borderRadius: 8, 
            alignItems: 'center' 
          }}
          onPress={() => console.log('Button pressed!')}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>
            Primary Button
          </Text>
        </TouchableOpacity>
      </View>

      {/* Theme info */}
      <View style={{ 
        backgroundColor: theme.surface, 
        padding: 15, 
        borderRadius: 10 
      }}>
        <Text style={{ fontSize: 14, color: theme.textSecondary }}>
          Current theme: {isDarkMode ? 'Dark' : 'Light'}
        </Text>
        <Text style={{ fontSize: 12, color: theme.textSecondary, marginTop: 5 }}>
          Theme preference is saved automatically
        </Text>
      </View>
    </View>
  );
}`}
          language="jsx"
          filename="BasicThemedApp.jsx"
          title="Simple Theme Context with AsyncStorage"
        />

        <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg border border-blue-200 dark:border-blue-800 mb-6">
          <h4 className="text-blue-800 dark:text-blue-200 font-semibold mb-3 mt-0">
            🔧 Key Theme Concepts:
          </h4>
          <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1 mb-0">
            <li><strong>createContext</strong> - Creates theme context for sharing state</li>
            <li><strong>useContext</strong> - Accesses theme data in any component</li>
            <li><strong>Provider pattern</strong> - Wraps app to share theme state</li>
            <li><strong>Theme objects</strong> - Define colors for light and dark modes</li>
            <li><strong>AsyncStorage</strong> - Persists user's theme choice</li>
          </ul>
        </div>

        <h2>3. System Theme Detection</h2>
        <p>
          Let's enhance our theme system to automatically detect and follow the user's device theme settings 
          using the Appearance API.
        </p>

        <CodeBlock
          code={`import React, { createContext, useContext, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const themes = {
  light: {
    background: '#ffffff',
    surface: '#f5f5f5',
    primary: '#007AFF',
    text: '#000000',
    textSecondary: '#666666',
  },
  dark: {
    background: '#1a1a1a',
    surface: '#333333',
    primary: '#0A84FF',
    text: '#ffffff',
    textSecondary: '#cccccc',
  },
};

// Theme modes
const THEME_MODES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
};

const ThemeContext = createContext({});

export function SystemThemeProvider({ children }) {
  const [themeMode, setThemeMode] = useState(THEME_MODES.SYSTEM);
  const [systemTheme, setSystemTheme] = useState(
    Appearance.getColorScheme() || 'light'
  );

  // Load saved theme preference
  useEffect(() => {
    loadThemeMode();
  }, []);

  // Listen for system theme changes
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setSystemTheme(colorScheme || 'light');
    });

    return () => subscription?.remove();
  }, []);

  const loadThemeMode = async () => {
    try {
      const saved = await AsyncStorage.getItem('theme_mode');
      if (saved) {
        setThemeMode(saved);
      }
    } catch (error) {
      console.error('Error loading theme mode:', error);
    }
  };

  const setTheme = async (mode) => {
    try {
      setThemeMode(mode);
      await AsyncStorage.setItem('theme_mode', mode);
    } catch (error) {
      console.error('Error saving theme mode:', error);
    }
  };

  const getActiveTheme = () => {
    if (themeMode === THEME_MODES.SYSTEM) {
      return systemTheme;
    }
    return themeMode;
  };

  const isDarkMode = getActiveTheme() === 'dark';
  const currentTheme = isDarkMode ? themes.dark : themes.light;

  return (
    <ThemeContext.Provider value={{
      theme: currentTheme,
      isDarkMode,
      themeMode,
      systemTheme,
      setTheme,
      THEME_MODES,
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

export default function SystemThemeApp() {
  return (
    <SystemThemeProvider>
      <SystemMainApp />
    </SystemThemeProvider>
  );
}

function SystemMainApp() {
  const { theme, isDarkMode, themeMode, systemTheme, setTheme, THEME_MODES } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: theme.background, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', color: theme.text, marginBottom: 30 }}>
        🌓 System Theme Demo
      </Text>

      {/* Theme mode selector */}
      <View style={{ 
        backgroundColor: theme.surface, 
        padding: 20, 
        borderRadius: 10, 
        marginBottom: 20 
      }}>
        <Text style={{ fontSize: 18, color: theme.text, marginBottom: 15 }}>
          Theme Mode
        </Text>

        {Object.entries(THEME_MODES).map(([key, mode]) => (
          <TouchableOpacity
            key={mode}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingVertical: 12,
              paddingHorizontal: 15,
              marginBottom: 8,
              backgroundColor: themeMode === mode ? theme.primary + '20' : 'transparent',
              borderRadius: 8,
              borderWidth: 1,
              borderColor: themeMode === mode ? theme.primary : theme.surface,
            }}
            onPress={() => setTheme(mode)}
          >
            <Text style={{ fontSize: 16, color: theme.text }}>
              {mode === 'system' ? '🌓' : mode === 'light' ? '☀️' : '🌙'} {key}
            </Text>
            {themeMode === mode && (
              <Text style={{ color: theme.primary, fontWeight: 'bold' }}>✓</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Theme info */}
      <View style={{ 
        backgroundColor: theme.surface, 
        padding: 20, 
        borderRadius: 10, 
        marginBottom: 20 
      }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: theme.text, marginBottom: 10 }}>
          Theme Information
        </Text>
        <Text style={{ fontSize: 14, color: theme.textSecondary, marginBottom: 5 }}>
          Selected Mode: {themeMode}
        </Text>
        <Text style={{ fontSize: 14, color: theme.textSecondary, marginBottom: 5 }}>
          System Theme: {systemTheme}
        </Text>
        <Text style={{ fontSize: 14, color: theme.textSecondary }}>
          Active Theme: {isDarkMode ? 'Dark' : 'Light'}
        </Text>
      </View>

      {/* Demo content */}
      <View style={{ 
        backgroundColor: theme.surface, 
        padding: 20, 
        borderRadius: 10 
      }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: theme.text, marginBottom: 10 }}>
          📱 System Integration
        </Text>
        <Text style={{ fontSize: 14, color: theme.textSecondary, marginBottom: 15 }}>
          This theme system automatically detects your device's theme settings and can follow them 
          when "SYSTEM" mode is selected.
        </Text>
        
        <View style={{
          backgroundColor: theme.primary,
          padding: 12,
          borderRadius: 8,
          alignItems: 'center',
        }}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>
            Theme Demo Button
          </Text>
        </View>
      </View>
    </View>
  );
}`}
          language="jsx"
          filename="SystemThemeApp.jsx"
          title="System Theme Integration with Appearance API"
        />

        <div className="bg-yellow-50 dark:bg-yellow-950 p-6 rounded-lg border border-yellow-200 dark:border-yellow-800 mb-6">
          <h4 className="text-yellow-800 dark:text-yellow-200 font-semibold mb-3 mt-0">
            💡 System Theme Features:
          </h4>
          <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1 mb-0">
            <li><strong>Appearance API</strong> - Detects device theme automatically</li>
            <li><strong>Change listeners</strong> - Updates theme when device changes</li>
            <li><strong>Three modes</strong> - Light, Dark, or follow System</li>
            <li><strong>Automatic switching</strong> - Respects user's device settings</li>
          </ul>
        </div>

        <h2>4. Hands-On Exercise</h2>
        <p>
          Now it's your turn! Try building a theme system for your own app using the concepts we've learned.
        </p>

        <div className="bg-orange-50 dark:bg-orange-950 p-6 rounded-lg border border-orange-200 dark:border-orange-800 mb-6">
          <h4 className="text-orange-800 dark:text-orange-200 font-semibold mb-3 mt-0">
            🎯 Practice Exercise:
          </h4>
          <ul className="text-orange-700 dark:text-orange-300 text-sm space-y-1 mb-0">
            <li>• Create a theme context with light and dark themes</li>
            <li>• Add theme switching functionality with AsyncStorage</li>
            <li>• Implement system theme detection with Appearance API</li>
            <li>• Build a settings screen where users can choose their theme</li>
            <li>• Test theme persistence across app restarts</li>
            <li>• Make sure all your components use theme colors</li>
          </ul>
        </div>

        <h2>5. Session Summary</h2>

        <div className="bg-green-50 dark:bg-green-950 p-6 rounded-lg border border-green-200 dark:border-green-800 mb-6">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-3 mt-0">
            🎉 What You've Learned:
          </h4>
          <ul className="text-green-700 dark:text-green-300 text-sm space-y-1 mb-0">
            <li>✅ <strong>React Context</strong> - Share theme state across all components</li>
            <li>✅ <strong>Theme Objects</strong> - Define color schemes for light and dark modes</li>
            <li>✅ <strong>Theme Persistence</strong> - Save user preferences with AsyncStorage</li>
            <li>✅ <strong>System Integration</strong> - Detect and follow device theme settings</li>
            <li>✅ <strong>Theme Modes</strong> - Light, dark, and system options</li>
          </ul>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
          <h4 className="text-blue-800 dark:text-blue-200 font-semibold mb-3 mt-0">
            📚 Key Concepts:
          </h4>
          <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1 mb-0">
            <li><strong>React Context</strong> is perfect for sharing theme state globally</li>
            <li><strong>Theme objects</strong> keep all your colors organized and consistent</li>
            <li><strong>Appearance API</strong> helps your app respect system preferences</li>
            <li><strong>AsyncStorage</strong> remembers user choices between app sessions</li>
            <li><strong>Inline styles</strong> make it easy to apply theme colors dynamically</li>
            <li><strong>Provider pattern</strong> gives all components access to theme data</li>
          </ul>
        </div>
      </div>
    </>
  );
}