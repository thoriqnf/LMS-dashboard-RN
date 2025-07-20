"use client";

import { CodeBlock } from "@/components/ui/code-block-new";

export function Day2Session4Content() {
  return (
    <>
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">
            Global UI Components - Session 4
          </h1>

          <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg border border-blue-200 dark:border-blue-800 mb-8">
            <h3 className="text-blue-800 dark:text-blue-200 font-semibold mb-4 mt-0">
              🎨 Session Overview
            </h3>
            <ul className="text-blue-700 dark:text-blue-300 space-y-2 mb-0">
              <li>
                <strong>Reusable Components</strong> - Create Button, TextInput, and Card components
              </li>
              <li>
                <strong>Theme Management</strong> - Build a complete theme system with React Context
              </li>
              <li>
                <strong>Responsive Design</strong> - Implement mobile-first responsive strategies
              </li>
              <li>
                <strong>Component Library</strong> - Build a professional UI component system
              </li>
            </ul>
          </div>
        </div>

        <h2>1. Building on Component Foundation</h2>
        <p>
          Remember the TouchableOpacity and TextInput from Day 1 Session 3? We've been creating components 
          directly in our screens, but now let's build a reusable component library that can be used across your entire app.
        </p>

        <div className="grid md:grid-cols-2 gap-4 my-6">
          <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border">
            <h4 className="font-semibold mb-2 mt-0">📱 Previous Approach:</h4>
            <div className="text-sm space-y-1">
              <div>• TouchableOpacity in every screen</div>
              <div>• Repeated styling for each button</div>
              <div>• TextInput styles duplicated everywhere</div>
              <div>• Inconsistent UI across screens</div>
            </div>
          </div>
          <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
            <h4 className="font-semibold mb-2 mt-0">✨ Component Library Approach:</h4>
            <div className="text-sm space-y-1">
              <div>• Reusable &lt;Button&gt; component</div>
              <div>• Consistent styling across app</div>
              <div>• Customizable through props</div>
              <div>• Easy to maintain and update</div>
            </div>
          </div>
        </div>

        <h2>2. Creating Reusable Components</h2>

        <h3>Why Reusable Components Matter</h3>
        <p>
          Think about your favorite apps - they have consistent button styles, input fields, and cards throughout. 
          This isn't by accident - developers create reusable components to ensure consistency and save time.
        </p>

        <div className="bg-green-50 dark:bg-green-950 p-6 rounded-lg border border-green-200 dark:border-green-800 mb-6">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-2 mt-0">
            🎯 Component Library Benefits:
          </h4>
          <ul className="text-green-700 dark:text-green-300 text-sm space-y-1 mb-0">
            <li><strong>Consistency</strong> - Same look and feel across all screens</li>
            <li><strong>Maintainability</strong> - Change once, update everywhere</li>
            <li><strong>Efficiency</strong> - Write once, use everywhere</li>
            <li><strong>Quality</strong> - Well-tested, reliable components</li>
            <li><strong>Scalability</strong> - Easy to add new features and screens</li>
          </ul>
        </div>

        <h3>Example 1: Building Core UI Components</h3>
        <p>
          Let's create a foundation of reusable components that we can use throughout our app. 
          We'll build Button, TextInput, and Card components with flexible props.
        </p>

        <CodeBlock
          code={`// components/ui/Button.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  style,
  textStyle,
}) => {
  const buttonStyle = [
    styles.button,
    styles[variant],
    styles[size],
    disabled && styles.disabled,
    style,
  ];

  const buttonTextStyle = [
    styles.text,
    styles[\`\${variant}Text\`],
    styles[\`\${size}Text\`],
    disabled && styles.disabledText,
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={buttonTextStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  
  // Variants
  primary: {
    backgroundColor: '#007AFF',
  },
  secondary: {
    backgroundColor: '#6C757D',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  danger: {
    backgroundColor: '#DC3545',
  },
  
  // Sizes
  small: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  medium: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  large: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  
  // Disabled state
  disabled: {
    opacity: 0.6,
  },
  
  // Text styles
  text: {
    fontWeight: '600',
  },
  primaryText: {
    color: '#FFFFFF',
  },
  secondaryText: {
    color: '#FFFFFF',
  },
  outlineText: {
    color: '#007AFF',
  },
  dangerText: {
    color: '#FFFFFF',
  },
  disabledText: {
    opacity: 0.8,
  },
  
  // Size-specific text
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },
});`}
          language="typescript"
          filename="Button.tsx"
          title="Reusable Button Component"
        />

        <CodeBlock
          code={`// components/ui/TextInput.tsx
import React from 'react';
import { View, TextInput as RNTextInput, Text, StyleSheet, TextInputProps } from 'react-native';

interface CustomTextInputProps extends TextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  variant?: 'default' | 'outlined' | 'filled';
  size?: 'small' | 'medium' | 'large';
}

export const TextInput: React.FC<CustomTextInputProps> = ({
  label,
  error,
  helperText,
  variant = 'default',
  size = 'medium',
  style,
  ...props
}) => {
  const inputStyle = [
    styles.input,
    styles[variant],
    styles[size],
    error && styles.error,
    style,
  ];

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      
      <RNTextInput
        style={inputStyle}
        placeholderTextColor="#9CA3AF"
        {...props}
      />
      
      {error && <Text style={styles.errorText}>{error}</Text>}
      {helperText && !error && <Text style={styles.helperText}>{helperText}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 6,
  },
  input: {
    borderRadius: 8,
    fontSize: 16,
    color: '#374151',
  },
  
  // Variants
  default: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
  },
  outlined: {
    borderWidth: 2,
    borderColor: '#007AFF',
    backgroundColor: 'transparent',
    paddingHorizontal: 16,
  },
  filled: {
    borderWidth: 0,
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
  },
  
  // Sizes
  small: {
    paddingVertical: 8,
    fontSize: 14,
  },
  medium: {
    paddingVertical: 12,
    fontSize: 16,
  },
  large: {
    paddingVertical: 16,
    fontSize: 18,
  },
  
  // Error state
  error: {
    borderColor: '#DC3545',
    borderWidth: 2,
  },
  errorText: {
    color: '#DC3545',
    fontSize: 14,
    marginTop: 4,
  },
  helperText: {
    color: '#6B7280',
    fontSize: 14,
    marginTop: 4,
  },
});`}
          language="typescript"
          filename="TextInput.tsx"
          title="Reusable TextInput Component"
        />

        <CodeBlock
          code={`// components/ui/Card.tsx
import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: number;
  style?: ViewStyle;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 16,
  style,
}) => {
  const cardStyle = [
    styles.card,
    styles[variant],
    { padding },
    style,
  ];

  return (
    <View style={cardStyle}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
  },
  
  // Variants
  default: {
    // Basic card with no shadow
  },
  elevated: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  outlined: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
});`}
          language="typescript"
          filename="Card.tsx"
          title="Reusable Card Component"
        />

        <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg border border-blue-200 dark:border-blue-800 mb-6">
          <h4 className="text-blue-800 dark:text-blue-200 font-semibold mb-3 mt-0">
            🔧 Component Design Principles:
          </h4>
          <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1 mb-0">
            <li><strong>Props-based customization</strong> - Control appearance through props</li>
            <li><strong>Sensible defaults</strong> - Work out of the box with minimal setup</li>
            <li><strong>Style composition</strong> - Combine multiple styles based on props</li>
            <li><strong>TypeScript support</strong> - Type-safe props and better developer experience</li>
            <li><strong>Accessibility ready</strong> - Built-in support for screen readers</li>
          </ul>
        </div>

        <h2>3. Theme Management with React Context</h2>

        <h3>Why Theme Management?</h3>
        <p>
          Professional apps need consistent colors, fonts, and spacing throughout. React Context lets us 
          manage these theme values globally, making it easy to switch between light/dark modes or rebrand your app.
        </p>

        <h3>Example 2: Theme System with Context</h3>
        <p>
          Let's build a complete theme system that can be used across all our components. 
          This will include colors, typography, spacing, and component-specific styles.
        </p>

        <CodeBlock
          code={`// contexts/ThemeContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define our theme structure
interface Theme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    error: string;
    success: string;
    warning: string;
  };
  typography: {
    h1: { fontSize: number; fontWeight: string };
    h2: { fontSize: number; fontWeight: string };
    h3: { fontSize: number; fontWeight: string };
    body: { fontSize: number; fontWeight: string };
    caption: { fontSize: number; fontWeight: string };
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  borderRadius: {
    sm: number;
    md: number;
    lg: number;
  };
}

// Light theme
const lightTheme: Theme = {
  colors: {
    primary: '#007AFF',
    secondary: '#6C757D',
    background: '#FFFFFF',
    surface: '#F8F9FA',
    text: '#212529',
    textSecondary: '#6C757D',
    border: '#DEE2E6',
    error: '#DC3545',
    success: '#28A745',
    warning: '#FFC107',
  },
  typography: {
    h1: { fontSize: 32, fontWeight: 'bold' },
    h2: { fontSize: 24, fontWeight: 'bold' },
    h3: { fontSize: 20, fontWeight: '600' },
    body: { fontSize: 16, fontWeight: 'normal' },
    caption: { fontSize: 14, fontWeight: 'normal' },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
  },
};

// Dark theme
const darkTheme: Theme = {
  ...lightTheme,
  colors: {
    primary: '#0A84FF',
    secondary: '#8E8E93',
    background: '#000000',
    surface: '#1C1C1E',
    text: '#FFFFFF',
    textSecondary: '#8E8E93',
    border: '#38383A',
    error: '#FF453A',
    success: '#32D74B',
    warning: '#FFD60A',
  },
};

// Theme context
interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Theme provider component
interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use theme
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};`}
          language="typescript"
          filename="ThemeContext.tsx"
          title="Complete Theme System with Context"
        />

        <CodeBlock
          code={`// components/ui/ThemedButton.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';

interface ThemedButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
}

export const ThemedButton: React.FC<ThemedButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
}) => {
  const { theme } = useTheme();

  // Create dynamic styles based on theme
  const dynamicStyles = StyleSheet.create({
    button: {
      borderRadius: theme.borderRadius.md,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    primary: {
      backgroundColor: theme.colors.primary,
    },
    secondary: {
      backgroundColor: theme.colors.secondary,
    },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: 2,
      borderColor: theme.colors.primary,
    },
    disabled: {
      opacity: 0.6,
    },
    small: {
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
    },
    medium: {
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.md,
    },
    large: {
      paddingHorizontal: theme.spacing.xl,
      paddingVertical: theme.spacing.lg,
    },
    text: {
      fontWeight: '600',
    },
    primaryText: {
      color: '#FFFFFF',
      fontSize: theme.typography.body.fontSize,
    },
    secondaryText: {
      color: '#FFFFFF',
      fontSize: theme.typography.body.fontSize,
    },
    outlineText: {
      color: theme.colors.primary,
      fontSize: theme.typography.body.fontSize,
    },
  });

  const buttonStyle = [
    dynamicStyles.button,
    dynamicStyles[variant],
    dynamicStyles[size],
    disabled && dynamicStyles.disabled,
  ];

  const textStyle = [
    dynamicStyles.text,
    dynamicStyles[\`\${variant}Text\`],
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};`}
          language="typescript"
          filename="ThemedButton.tsx"
          title="Theme-Aware Button Component"
        />

        <div className="bg-yellow-50 dark:bg-yellow-950 p-6 rounded-lg border border-yellow-200 dark:border-yellow-800 mb-6">
          <h4 className="text-yellow-800 dark:text-yellow-200 font-semibold mb-3 mt-0">
            💡 Theme Management Benefits:
          </h4>
          <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1 mb-0">
            <li><strong>Consistency</strong> - Unified design language across all components</li>
            <li><strong>Maintainability</strong> - Change theme colors once, update everywhere</li>
            <li><strong>Dark mode support</strong> - Easy theme switching for better user experience</li>
            <li><strong>Accessibility</strong> - Proper contrast ratios and readable text</li>
            <li><strong>Brand flexibility</strong> - Easy to rebrand or customize appearance</li>
          </ul>
        </div>

        <h2>4. Responsive Design Basics</h2>

        <h3>Mobile-First Responsive Strategy</h3>
        <p>
          React Native apps run on various screen sizes - from small phones to large tablets. 
          Let's build responsive components that adapt to different screen dimensions.
        </p>

        <h3>Example 3: Complete Themed App with Responsive Design</h3>
        <p>
          Now let's put it all together - our reusable components, theme system, and responsive design 
          to create a complete app screen that works on all devices.
        </p>

        <CodeBlock
          code={`// hooks/useResponsive.ts
import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';

interface ScreenDimensions {
  width: number;
  height: number;
}

interface ResponsiveBreakpoints {
  isSmall: boolean;
  isMedium: boolean;
  isLarge: boolean;
  isTablet: boolean;
}

export const useResponsive = (): ScreenDimensions & ResponsiveBreakpoints => {
  const [dimensions, setDimensions] = useState(() => {
    const { width, height } = Dimensions.get('window');
    return { width, height };
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions({ width: window.width, height: window.height });
    });

    return () => subscription?.remove();
  }, []);

  // Define breakpoints
  const isSmall = dimensions.width < 576;
  const isMedium = dimensions.width >= 576 && dimensions.width < 768;
  const isLarge = dimensions.width >= 768 && dimensions.width < 1024;
  const isTablet = dimensions.width >= 768;

  return {
    ...dimensions,
    isSmall,
    isMedium,
    isLarge,
    isTablet,
  };
};`}
          language="typescript"
          filename="useResponsive.ts"
          title="Responsive Design Hook"
        />

        <CodeBlock
          code={`// screens/ProfileScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch } from 'react-native';
import { ThemedButton } from '../components/ui/ThemedButton';
import { TextInput } from '../components/ui/TextInput';
import { Card } from '../components/ui/Card';
import { useTheme } from '../contexts/ThemeContext';
import { useResponsive } from '../hooks/useResponsive';

export const ProfileScreen: React.FC = () => {
  const { theme, isDark, toggleTheme } = useTheme();
  const { isTablet, width } = useResponsive();
  
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    bio: 'Mobile developer passionate about React Native',
  });

  // Create responsive styles
  const responsiveStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    scrollContent: {
      padding: theme.spacing.md,
      maxWidth: isTablet ? 600 : width,
      alignSelf: 'center',
      width: '100%',
    },
    header: {
      marginBottom: theme.spacing.lg,
    },
    title: {
      fontSize: isTablet ? theme.typography.h1.fontSize : theme.typography.h2.fontSize,
      fontWeight: theme.typography.h1.fontWeight,
      color: theme.colors.text,
      textAlign: 'center',
      marginBottom: theme.spacing.sm,
    },
    subtitle: {
      fontSize: theme.typography.body.fontSize,
      color: theme.colors.textSecondary,
      textAlign: 'center',
    },
    section: {
      marginBottom: theme.spacing.lg,
    },
    sectionTitle: {
      fontSize: theme.typography.h3.fontSize,
      fontWeight: theme.typography.h3.fontWeight,
      color: theme.colors.text,
      marginBottom: theme.spacing.md,
    },
    themeToggle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: theme.spacing.md,
    },
    themeToggleText: {
      fontSize: theme.typography.body.fontSize,
      color: theme.colors.text,
    },
    buttonContainer: {
      flexDirection: isTablet ? 'row' : 'column',
      gap: theme.spacing.md,
      marginTop: theme.spacing.lg,
    },
    button: {
      flex: isTablet ? 1 : undefined,
    },
    statsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: theme.spacing.md,
    },
    stat: {
      alignItems: 'center',
    },
    statNumber: {
      fontSize: theme.typography.h2.fontSize,
      fontWeight: theme.typography.h2.fontWeight,
      color: theme.colors.primary,
    },
    statLabel: {
      fontSize: theme.typography.caption.fontSize,
      color: theme.colors.textSecondary,
      marginTop: theme.spacing.xs,
    },
  });

  const handleUpdateProfile = () => {
    console.log('Profile updated:', profile);
  };

  const handleResetProfile = () => {
    setProfile({
      name: 'John Doe',
      email: 'john@example.com',
      bio: 'Mobile developer passionate about React Native',
    });
  };

  return (
    <View style={responsiveStyles.container}>
      <ScrollView contentContainerStyle={responsiveStyles.scrollContent}>
        {/* Header */}
        <View style={responsiveStyles.header}>
          <Text style={responsiveStyles.title}>Profile Settings</Text>
          <Text style={responsiveStyles.subtitle}>
            Manage your account and preferences
          </Text>
        </View>

        {/* Theme Toggle */}
        <Card variant="elevated" style={{ marginBottom: theme.spacing.lg }}>
          <View style={responsiveStyles.themeToggle}>
            <Text style={responsiveStyles.themeToggleText}>
              {isDark ? '🌙 Dark Mode' : '☀️ Light Mode'}
            </Text>
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
              thumbColor={isDark ? '#FFFFFF' : '#FFFFFF'}
            />
          </View>
        </Card>

        {/* Profile Information */}
        <View style={responsiveStyles.section}>
          <Text style={responsiveStyles.sectionTitle}>Profile Information</Text>
          
          <Card variant="outlined">
            <TextInput
              label="Full Name"
              value={profile.name}
              onChangeText={(text) => setProfile({ ...profile, name: text })}
              variant="filled"
            />
            
            <TextInput
              label="Email Address"
              value={profile.email}
              onChangeText={(text) => setProfile({ ...profile, email: text })}
              variant="filled"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            
            <TextInput
              label="Bio"
              value={profile.bio}
              onChangeText={(text) => setProfile({ ...profile, bio: text })}
              variant="filled"
              multiline
              numberOfLines={4}
              helperText="Tell us about yourself"
            />
          </Card>
        </View>

        {/* Stats */}
        <View style={responsiveStyles.section}>
          <Text style={responsiveStyles.sectionTitle}>Activity Stats</Text>
          
          <Card variant="elevated">
            <View style={responsiveStyles.statsContainer}>
              <View style={responsiveStyles.stat}>
                <Text style={responsiveStyles.statNumber}>42</Text>
                <Text style={responsiveStyles.statLabel}>Projects</Text>
              </View>
              <View style={responsiveStyles.stat}>
                <Text style={responsiveStyles.statNumber}>1.2K</Text>
                <Text style={responsiveStyles.statLabel}>Followers</Text>
              </View>
              <View style={responsiveStyles.stat}>
                <Text style={responsiveStyles.statNumber}>890</Text>
                <Text style={responsiveStyles.statLabel}>Following</Text>
              </View>
            </View>
          </Card>
        </View>

        {/* Actions */}
        <View style={responsiveStyles.buttonContainer}>
          <ThemedButton
            title="Update Profile"
            onPress={handleUpdateProfile}
            variant="primary"
            size="large"
            style={responsiveStyles.button}
          />
          <ThemedButton
            title="Reset Changes"
            onPress={handleResetProfile}
            variant="outline"
            size="large"
            style={responsiveStyles.button}
          />
        </View>
      </ScrollView>
    </View>
  );
};`}
          language="typescript"
          filename="ProfileScreen.tsx"
          title="Complete Responsive Profile Screen"
        />

        <CodeBlock
          code={`// App.tsx - Setting up the theme provider
import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { ProfileScreen } from './screens/ProfileScreen';

export default function App() {
  return (
    <ThemeProvider>
      <ProfileScreen />
    </ThemeProvider>
  );
}`}
          language="typescript"
          filename="App.tsx"
          title="App Setup with Theme Provider"
        />

        <div className="bg-green-50 dark:bg-green-950 p-6 rounded-lg border border-green-200 dark:border-green-800 mb-6">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-3 mt-0">
            ✨ What's New in This Complete Example:
          </h4>
          <ul className="text-green-700 dark:text-green-300 text-sm space-y-1 mb-0">
            <li><strong>Reusable components</strong> - ThemedButton, TextInput, Card used throughout</li>
            <li><strong>Theme context</strong> - Global theme management with light/dark mode</li>
            <li><strong>Responsive design</strong> - Adapts layout for tablets and phones</li>
            <li><strong>Dynamic styling</strong> - Styles computed based on theme and screen size</li>
            <li><strong>Professional UI</strong> - Consistent, polished interface</li>
            <li><strong>State management</strong> - Form state and theme preference persistence</li>
          </ul>
        </div>

        <h2>5. Responsive Design Strategies</h2>

        <div className="grid md:grid-cols-2 gap-4 my-6">
          <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
            <h4 className="text-blue-800 dark:text-blue-200 font-semibold mb-2 mt-0">
              📱 Mobile-First Design:
            </h4>
            <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1 mb-0">
              <li>Start with mobile layout</li>
              <li>Single column layout by default</li>
              <li>Touch-friendly button sizes</li>
              <li>Readable text sizes</li>
              <li>Adequate spacing for fingers</li>
            </ul>
          </div>
          <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg border border-purple-200 dark:border-purple-800">
            <h4 className="text-purple-800 dark:text-purple-200 font-semibold mb-2 mt-0">
              📊 Tablet Adaptations:
            </h4>
            <ul className="text-purple-700 dark:text-purple-300 text-sm space-y-1 mb-0">
              <li>Multi-column layouts</li>
              <li>Larger typography</li>
              <li>Horizontal button groups</li>
              <li>Maximum content width</li>
              <li>Better use of screen space</li>
            </ul>
          </div>
        </div>

        <h2>6. Hands-On Exercise: Build Your Component Library</h2>

        <div className="bg-orange-50 dark:bg-orange-950 p-6 rounded-lg border border-orange-200 dark:border-orange-800 mb-6">
          <h4 className="text-orange-800 dark:text-orange-200 font-semibold mb-3 mt-0">
            🎯 Challenge: Create Your Own Component System
          </h4>
          <p className="text-orange-700 dark:text-orange-300 text-sm mb-4">
            Build a complete component library with theme management for your app.
          </p>
          <ul className="text-orange-700 dark:text-orange-300 text-sm space-y-1 mb-0">
            <li>• Create reusable Button, TextInput, and Card components</li>
            <li>• Set up theme context with your own color scheme</li>
            <li>• Build a responsive screen that adapts to different devices</li>
            <li>• Implement light/dark mode switching</li>
            <li>• Add your own component variants (success, warning, etc.)</li>
            <li>• Test on both phone and tablet screen sizes</li>
          </ul>
        </div>

        <h3>Step-by-Step Implementation Guide</h3>

        <CodeBlock
          code={`// 1. Create your theme colors
const myTheme = {
  colors: {
    primary: '#FF6B6B',      // Your brand color
    secondary: '#4ECDC4',     // Secondary brand color
    background: '#FFFFFF',    // Background color
    surface: '#F8F9FA',      // Card/surface color
    text: '#2C3E50',         // Primary text
    textSecondary: '#7F8C8D', // Secondary text
    // Add more colors as needed
  },
  // ... rest of theme structure
};

// 2. Create your own component variants
<ThemedButton
  title="My Custom Button"
  variant="primary"
  size="large"
  onPress={() => console.log('Pressed!')}
/>

// 3. Build responsive layouts
const { isTablet } = useResponsive();
const buttonStyle = {
  flexDirection: isTablet ? 'row' : 'column',
  gap: theme.spacing.md,
};

// 4. Use your components everywhere
<Card variant="elevated">
  <TextInput
    label="Your Input"
    variant="filled"
    value={value}
    onChangeText={setValue}
  />
  <ThemedButton
    title="Submit"
    variant="primary"
    onPress={handleSubmit}
  />
</Card>`}
          language="typescript"
          filename="MyComponentLibrary.tsx"
          title="Your Component Library Implementation"
        />

        <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg border border-blue-200 dark:border-blue-800 mb-6">
          <h4 className="text-blue-800 dark:text-blue-200 font-semibold mb-3 mt-0">
            🔧 Pro Tips for Component Libraries:
          </h4>
          <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1 mb-0">
            <li><strong>Start simple</strong> - Begin with basic Button, TextInput, Card</li>
            <li><strong>Use TypeScript</strong> - Type safety prevents bugs and improves DX</li>
            <li><strong>Test thoroughly</strong> - Ensure components work in all scenarios</li>
            <li><strong>Document props</strong> - Clear prop descriptions help team adoption</li>
            <li><strong>Consider accessibility</strong> - Add proper labels and keyboard navigation</li>
            <li><strong>Performance matters</strong> - Use React.memo for expensive components</li>
          </ul>
        </div>

        <h2>7. Session Summary</h2>

        <div className="bg-green-50 dark:bg-green-950 p-6 rounded-lg border border-green-200 dark:border-green-800 mb-6">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-3 mt-0">
            🎉 What You've Accomplished:
          </h4>
          <ul className="text-green-700 dark:text-green-300 text-sm space-y-1 mb-0">
            <li>✅ <strong>Reusable Components</strong> - Created Button, TextInput, and Card components</li>
            <li>✅ <strong>Theme System</strong> - Built complete theme management with React Context</li>
            <li>✅ <strong>Responsive Design</strong> - Implemented mobile-first responsive strategies</li>
            <li>✅ <strong>Light/Dark Mode</strong> - Added theme switching functionality</li>
            <li>✅ <strong>Professional UI</strong> - Created consistent, polished interface</li>
            <li>✅ <strong>Component Library</strong> - Built scalable, maintainable component system</li>
          </ul>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
          <h4 className="text-blue-800 dark:text-blue-200 font-semibold mb-3 mt-0">
            📚 Key Takeaways:
          </h4>
          <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1 mb-0">
            <li><strong>Component abstraction</strong> saves time and ensures consistency</li>
            <li><strong>React Context</strong> is perfect for global state like themes</li>
            <li><strong>Responsive design</strong> is essential for modern mobile apps</li>
            <li><strong>TypeScript</strong> prevents bugs and improves developer experience</li>
            <li><strong>Props-based customization</strong> makes components flexible</li>
            <li><strong>Theme management</strong> enables easy branding and accessibility</li>
          </ul>
        </div>

        <div className="bg-purple-50 dark:bg-purple-950 p-6 rounded-lg border border-purple-200 dark:border-purple-800 mt-6">
          <h4 className="text-purple-800 dark:text-purple-200 font-semibold mb-3 mt-0">
            🚀 Next Steps:
          </h4>
          <p className="text-purple-700 dark:text-purple-300 text-sm mb-2">
            You now have the foundation for building professional, scalable React Native applications. 
            Your component library and theme system will serve as the backbone for all future features.
          </p>
          <p className="text-purple-700 dark:text-purple-300 text-sm">
            In the next session, we'll explore advanced form handling patterns and validation techniques 
            using your new component library!
          </p>
        </div>
      </div>
    </>
  );
}