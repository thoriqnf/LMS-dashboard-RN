"use client";

import { CodeBlock } from "@/components/ui/code-block-new";

export function Day6Session4Content() {
  return (
    <>
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">
            Fallbacks & Error Handling - Session 4
          </h1>

          <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg border border-blue-200 dark:border-blue-800 mb-8">
            <h3 className="text-blue-800 dark:text-blue-200 font-semibold mb-4 mt-0">
              🛡️ Session Overview
            </h3>
            <ul className="text-blue-700 dark:text-blue-300 space-y-2 mb-0">
              <li>
                <strong>Error Boundaries for Screens</strong> - Catch and handle React component errors gracefully
              </li>
              <li>
                <strong>Graceful Handling of Bad Routes</strong> - Manage invalid URLs and missing screens
              </li>
              <li>
                <strong>Global Error UI Pattern</strong> - Consistent error presentation across the app
              </li>
              <li>
                <strong>Network Error Recovery</strong> - Handle offline states and API failures
              </li>
              <li>
                <strong>User-Friendly Error Messages</strong> - Transform technical errors into helpful guidance
              </li>
              <li>
                <strong>Error Reporting & Analytics</strong> - Track and monitor production errors
              </li>
            </ul>
          </div>
        </div>

        <h2>1. Understanding Error Types in React Native</h2>

        <h3>From Crashes to Grace</h3>
        <p>
          Production apps must handle errors gracefully instead of crashing. A good error handling strategy 
          turns potentially frustrating experiences into opportunities to guide users back on track.
        </p>

        <div className="my-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
          <h4 className="text-blue-800 dark:text-blue-200 font-semibold mb-2 mt-0">
            🚨 Common Error Categories:
          </h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <strong className="text-red-600">JavaScript Errors</strong>
              <ul className="mt-2 space-y-1 text-blue-700 dark:text-blue-300">
                <li>• Component render failures</li>
                <li>• Undefined variable access</li>
                <li>• Type errors and null references</li>
                <li>• Async operation failures</li>
              </ul>
            </div>
            <div>
              <strong className="text-orange-600">Navigation Errors</strong>
              <ul className="mt-2 space-y-1 text-blue-700 dark:text-blue-300">
                <li>• Invalid route parameters</li>
                <li>• Missing screens or deep links</li>
                <li>• Authentication redirect loops</li>
                <li>• State inconsistencies</li>
              </ul>
            </div>
            <div>
              <strong className="text-purple-600">Network Errors</strong>
              <ul className="mt-2 space-y-1 text-blue-700 dark:text-blue-300">
                <li>• API endpoint failures</li>
                <li>• Timeout and connectivity issues</li>
                <li>• Server errors (5xx responses)</li>
                <li>• Offline state handling</li>
              </ul>
            </div>
            <div>
              <strong className="text-green-600">Data Errors</strong>
              <ul className="mt-2 space-y-1 text-blue-700 dark:text-blue-300">
                <li>• Malformed API responses</li>
                <li>• Storage read/write failures</li>
                <li>• Data validation errors</li>
                <li>• Cache inconsistencies</li>
              </ul>
            </div>
          </div>
        </div>

        <h2>2. Error Boundaries for Screens</h2>
        <p>
          Error boundaries catch JavaScript errors in component trees and display fallback UIs 
          instead of crashing the entire app.
        </p>

        <CodeBlock
          code={`import React, { Component, ReactNode } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: string | null;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: (error: Error, retry: () => void) => ReactNode;
  onError?: (error: Error, errorInfo: string) => void;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
      errorInfo: null
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      error,
      errorInfo: errorInfo.componentStack
    });

    // Log error to analytics or crash reporting
    console.error('Error Boundary caught an error:', error, errorInfo);
    
    // Call custom error handler
    if (this.props.onError) {
      this.props.onError(error, errorInfo.componentStack);
    }
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback && this.state.error) {
        return this.props.fallback(this.state.error, this.handleRetry);
      }

      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>Something went wrong</Text>
          <Text style={styles.errorMessage}>
            We're sorry, but something unexpected happened. Please try again.
          </Text>
          
          {__DEV__ && this.state.error && (
            <View style={styles.debugInfo}>
              <Text style={styles.debugTitle}>Debug Info:</Text>
              <Text style={styles.debugText}>{this.state.error.toString()}</Text>
              {this.state.errorInfo && (
                <Text style={styles.debugText}>{this.state.errorInfo}</Text>
              )}
            </View>
          )}
          
          <TouchableOpacity style={styles.retryButton} onPress={this.handleRetry}>
            <Text style={styles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  errorMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  debugInfo: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    width: '100%',
  },
  debugTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  debugText: {
    fontSize: 12,
    fontFamily: 'monospace',
    color: '#666',
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});`}
          language="typescript"
          filename="ErrorBoundary.tsx"
          title="Comprehensive Error Boundary"
        />

        <h3>Using Error Boundaries with Expo Router</h3>
        <CodeBlock
          code={`// app/_layout.tsx - Wrap your app with error boundaries
import { Stack } from 'expo-router';
import { ErrorBoundary } from '../components/ErrorBoundary';

export default function RootLayout() {
  return (
    <ErrorBoundary 
      onError={(error, errorInfo) => {
        // Send error to analytics
        console.error('App Error:', error, errorInfo);
      }}
      fallback={(error, retry) => (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
          <Text style={{ fontSize: 20, marginBottom: 10 }}>Oops! Something went wrong</Text>
          <Text style={{ marginBottom: 20, textAlign: 'center' }}>
            The app encountered an unexpected error. Don't worry, your data is safe.
          </Text>
          <TouchableOpacity 
            onPress={retry}
            style={{ backgroundColor: '#007AFF', padding: 15, borderRadius: 8 }}
          >
            <Text style={{ color: 'white', fontWeight: 'bold' }}>Restart App</Text>
          </TouchableOpacity>
        </View>
      )}
    >
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="[...missing]" options={{ title: 'Page Not Found' }} />
      </Stack>
    </ErrorBoundary>
  );
}

// app/(tabs)/_layout.tsx - Screen-level error boundaries
import { Tabs } from 'expo-router';
import { ErrorBoundary } from '../../components/ErrorBoundary';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen 
        name="index" 
        options={{ title: 'Home' }}
      />
      <Tabs.Screen 
        name="profile" 
        options={{ title: 'Profile' }}
      />
    </Tabs>
  );
}

// Wrap individual screens that might fail
export function ProfileScreenWithBoundary() {
  return (
    <ErrorBoundary fallback={(error, retry) => (
      <ProfileErrorFallback error={error} onRetry={retry} />
    )}>
      <ProfileScreen />
    </ErrorBoundary>
  );
}`}
          language="typescript"
          filename="error-boundary-integration.tsx"
          title="Error Boundary Integration"
        />

        <h2>3. Graceful Handling of Bad Routes</h2>
        <p>
          Invalid URLs and missing screens should show helpful error pages instead of crashing or showing blank screens.
        </p>

        <CodeBlock
          code={`// app/[...missing].tsx - Catch-all route for 404 errors
import { useRouter, usePathname } from 'expo-router';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';

export default function NotFoundScreen() {
  const router = useRouter();
  const pathname = usePathname();
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    // Generate helpful suggestions based on the attempted route
    generateSuggestions(pathname);
  }, [pathname]);

  const generateSuggestions = (path: string) => {
    const suggestions: string[] = [];
    
    // Common route suggestions
    if (path.includes('profile')) {
      suggestions.push('/(tabs)/profile', '/auth/login');
    } else if (path.includes('product')) {
      suggestions.push('/(tabs)/shop', '/(tabs)/search');
    } else if (path.includes('user')) {
      suggestions.push('/(tabs)/profile', '/auth/login');
    } else {
      suggestions.push('/(tabs)', '/(tabs)/home', '/(tabs)/search');
    }
    
    setSuggestions(suggestions);
  };

  const handleSuggestionPress = (route: string) => {
    router.replace(route as any);
  };

  const handleGoHome = () => {
    router.replace('/(tabs)');
  };

  const handleGoBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/(tabs)');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>🔍</Text>
        <Text style={styles.title}>Page Not Found</Text>
        <Text style={styles.subtitle}>
          Sorry, we couldn't find the page you're looking for.
        </Text>
        
        <Text style={styles.urlText}>
          Attempted URL: {pathname}
        </Text>

        {suggestions.length > 0 && (
          <View style={styles.suggestionsContainer}>
            <Text style={styles.suggestionsTitle}>Try these instead:</Text>
            {suggestions.map((suggestion, index) => (
              <TouchableOpacity
                key={index}
                style={styles.suggestionButton}
                onPress={() => handleSuggestionPress(suggestion)}
              >
                <Text style={styles.suggestionText}>{suggestion}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={styles.actions}>
          <TouchableOpacity style={styles.primaryButton} onPress={handleGoHome}>
            <Text style={styles.primaryButtonText}>Go Home</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.secondaryButton} onPress={handleGoBack}>
            <Text style={styles.secondaryButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emoji: {
    fontSize: 64,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  urlText: {
    fontSize: 14,
    fontFamily: 'monospace',
    color: '#999',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 6,
    marginBottom: 30,
  },
  suggestionsContainer: {
    width: '100%',
    marginBottom: 30,
  },
  suggestionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  suggestionButton: {
    backgroundColor: '#e8f4f8',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#d0e9f0',
  },
  suggestionText: {
    color: '#0066cc',
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'monospace',
  },
  actions: {
    flexDirection: 'row',
    gap: 15,
  },
  primaryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  secondaryButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
});`}
          language="typescript"
          filename="app/[...missing].tsx"
          title="404 Not Found Screen"
        />

        <h3>Route Validation and Protection</h3>
        <CodeBlock
          code={`// utils/route-validator.ts
export class RouteValidator {
  private static validRoutes = [
    '/(tabs)',
    '/(tabs)/home',
    '/(tabs)/shop',
    '/(tabs)/profile',
    '/product/[id]',
    '/user/[id]',
    '/auth/login',
    '/auth/register'
  ];

  static isValidRoute(pathname: string): boolean {
    // Check exact matches
    if (this.validRoutes.includes(pathname)) {
      return true;
    }

    // Check dynamic routes
    return this.validRoutes.some(route => {
      if (route.includes('[')) {
        const pattern = route.replace(/\[.*?\]/g, '[^/]+');
        const regex = new RegExp(\`^\${pattern}$\`);
        return regex.test(pathname);
      }
      return false;
    });
  }

  static validateAndRedirect(pathname: string, router: any) {
    if (!this.isValidRoute(pathname)) {
      console.warn(\`Invalid route attempted: \${pathname}\`);
      router.replace('/[...missing]');
      return false;
    }
    return true;
  }

  static sanitizeRoute(pathname: string): string {
    // Remove potentially harmful characters
    return pathname.replace(/[<>\"']/g, '');
  }
}

// app/(tabs)/profile/[userId].tsx - Protected dynamic route
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { RouteValidator } from '../../../utils/route-validator';

export default function UserProfileScreen() {
  const { userId } = useLocalSearchParams<{ userId: string }>();
  const router = useRouter();
  const [isValidUser, setIsValidUser] = useState<boolean | null>(null);

  useEffect(() => {
    validateUser(userId);
  }, [userId]);

  const validateUser = async (id: string) => {
    try {
      // Validate user ID format
      if (!id || !/^[a-zA-Z0-9]+$/.test(id)) {
        setIsValidUser(false);
        return;
      }

      // Check if user exists
      const response = await fetch(\`/api/users/\${id}\`);
      if (response.ok) {
        setIsValidUser(true);
      } else if (response.status === 404) {
        setIsValidUser(false);
      } else {
        throw new Error('Failed to validate user');
      }
    } catch (error) {
      console.error('User validation error:', error);
      setIsValidUser(false);
    }
  };

  if (isValidUser === null) {
    return <LoadingScreen />;
  }

  if (isValidUser === false) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>User not found</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <UserProfileContent userId={userId} />
  );
}`}
          language="typescript"
          filename="route-validation.tsx"
          title="Route Validation and Protection"
        />

        <h2>4. Global Error UI Pattern</h2>
        <p>
          Consistent error presentation across your app helps users understand what happened and what they can do about it.
        </p>

        <CodeBlock
          code={`// components/GlobalErrorHandler.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface ErrorInfo {
  id: string;
  type: 'network' | 'validation' | 'permission' | 'unknown';
  title: string;
  message: string;
  actions?: Array<{
    label: string;
    action: () => void;
    style?: 'primary' | 'secondary' | 'destructive';
  }>;
  dismissible?: boolean;
}

interface ErrorContextType {
  showError: (error: Omit<ErrorInfo, 'id'>) => void;
  dismissError: (id: string) => void;
  dismissAllErrors: () => void;
}

const ErrorContext = createContext<ErrorContextType | null>(null);

export function GlobalErrorProvider({ children }: { children: ReactNode }) {
  const [errors, setErrors] = useState<ErrorInfo[]>([]);

  const showError = (error: Omit<ErrorInfo, 'id'>) => {
    const newError: ErrorInfo = {
      ...error,
      id: Date.now().toString(),
      dismissible: error.dismissible ?? true
    };
    
    setErrors(prev => [...prev, newError]);
  };

  const dismissError = (id: string) => {
    setErrors(prev => prev.filter(error => error.id !== id));
  };

  const dismissAllErrors = () => {
    setErrors([]);
  };

  return (
    <ErrorContext.Provider value={{ showError, dismissError, dismissAllErrors }}>
      {children}
      {errors.map(error => (
        <ErrorModal
          key={error.id}
          error={error}
          onDismiss={() => dismissError(error.id)}
        />
      ))}
    </ErrorContext.Provider>
  );
}

export function useErrorHandler() {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error('useErrorHandler must be used within GlobalErrorProvider');
  }
  return context;
}

function ErrorModal({ error, onDismiss }: { error: ErrorInfo; onDismiss: () => void }) {
  const getErrorIcon = (type: ErrorInfo['type']) => {
    switch (type) {
      case 'network': return '🌐';
      case 'validation': return '⚠️';
      case 'permission': return '🔒';
      default: return '❌';
    }
  };

  const getErrorColor = (type: ErrorInfo['type']) => {
    switch (type) {
      case 'network': return '#FF9500';
      case 'validation': return '#FF3B30';
      case 'permission': return '#007AFF';
      default: return '#8E8E93';
    }
  };

  return (
    <Modal
      visible={true}
      transparent
      animationType="fade"
      onRequestClose={error.dismissible ? onDismiss : undefined}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={[styles.header, { borderTopColor: getErrorColor(error.type) }]}>
            <Text style={styles.icon}>{getErrorIcon(error.type)}</Text>
            <Text style={styles.title}>{error.title}</Text>
          </View>
          
          <Text style={styles.message}>{error.message}</Text>
          
          <View style={styles.actions}>
            {error.actions?.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.actionButton,
                  action.style === 'primary' && styles.primaryButton,
                  action.style === 'destructive' && styles.destructiveButton
                ]}
                onPress={() => {
                  action.action();
                  onDismiss();
                }}
              >
                <Text style={[
                  styles.actionText,
                  action.style === 'primary' && styles.primaryText,
                  action.style === 'destructive' && styles.destructiveText
                ]}>
                  {action.label}
                </Text>
              </TouchableOpacity>
            )) || (
              <TouchableOpacity
                style={styles.actionButton}
                onPress={onDismiss}
              >
                <Text style={styles.actionText}>OK</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: '100%',
    maxWidth: 340,
  },
  header: {
    alignItems: 'center',
    marginBottom: 15,
    borderTopWidth: 3,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    paddingTop: 15,
  },
  icon: {
    fontSize: 32,
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  message: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#007AFF',
  },
  destructiveButton: {
    backgroundColor: '#FF3B30',
  },
  actionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  primaryText: {
    color: '#fff',
  },
  destructiveText: {
    color: '#fff',
  },
});`}
          language="typescript"
          filename="GlobalErrorHandler.tsx"
          title="Global Error UI System"
        />

        <h3>Error Handler Usage Examples</h3>
        <CodeBlock
          code={`// Using the global error handler throughout your app
import { useErrorHandler } from '../components/GlobalErrorHandler';

export function useApiCall() {
  const { showError } = useErrorHandler();

  const makeApiCall = async (url: string) => {
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        if (response.status === 401) {
          showError({
            type: 'permission',
            title: 'Authentication Required',
            message: 'Please log in to continue accessing this content.',
            actions: [
              {
                label: 'Log In',
                action: () => router.push('/auth/login'),
                style: 'primary'
              },
              {
                label: 'Cancel',
                action: () => {},
                style: 'secondary'
              }
            ]
          });
        } else if (response.status >= 500) {
          showError({
            type: 'network',
            title: 'Server Error',
            message: 'Our servers are experiencing issues. Please try again later.',
            actions: [
              {
                label: 'Retry',
                action: () => makeApiCall(url),
                style: 'primary'
              }
            ]
          });
        }
        throw new Error(\`HTTP \${response.status}\`);
      }
      
      return await response.json();
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('fetch')) {
        showError({
          type: 'network',
          title: 'Connection Error',
          message: 'Please check your internet connection and try again.',
          actions: [
            {
              label: 'Retry',
              action: () => makeApiCall(url),
              style: 'primary'
            }
          ]
        });
      }
      throw error;
    }
  };

  return { makeApiCall };
}

// Form validation errors
export function useFormValidation() {
  const { showError } = useErrorHandler();

  const validateForm = (data: any) => {
    const errors: string[] = [];
    
    if (!data.email) errors.push('Email is required');
    if (!data.password) errors.push('Password is required');
    
    if (errors.length > 0) {
      showError({
        type: 'validation',
        title: 'Form Validation Error',
        message: errors.join(', ')
      });
      return false;
    }
    
    return true;
  };

  return { validateForm };
}`}
          language="typescript"
          filename="error-handler-usage.ts"
          title="Error Handler Usage Examples"
        />

        <h2>5. Network Error Recovery</h2>
        <p>
          Network errors are common in mobile apps. Implement robust retry mechanisms and offline state handling.
        </p>

        <CodeBlock
          code={`// utils/network-recovery.ts
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class NetworkRecovery {
  private static retryAttempts = new Map<string, number>();
  private static maxRetries = 3;
  private static retryDelays = [1000, 2000, 4000]; // Progressive delays

  static async fetchWithRetry(
    url: string, 
    options: RequestInit = {},
    customRetries?: number
  ): Promise<Response> {
    const requestId = \`\${options.method || 'GET'}-\${url}\`;
    const maxAttempts = customRetries || this.maxRetries;
    let lastError: Error;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      try {
        // Check network connectivity
        const netInfo = await NetInfo.fetch();
        if (!netInfo.isConnected) {
          throw new Error('No internet connection');
        }

        const response = await fetch(url, {
          ...options,
          timeout: 10000 // 10 second timeout
        });

        // Reset retry count on success
        this.retryAttempts.delete(requestId);
        return response;

      } catch (error) {
        lastError = error as Error;
        
        // Don't retry on client errors (4xx)
        if (error instanceof Response && error.status >= 400 && error.status < 500) {
          throw error;
        }

        // Don't retry on last attempt
        if (attempt === maxAttempts - 1) {
          break;
        }

        // Wait before retrying
        await this.delay(this.retryDelays[attempt] || 4000);
        
        console.log(\`Retrying request \${requestId}, attempt \${attempt + 2}/\${maxAttempts}\`);
      }
    }

    // All retries failed
    this.retryAttempts.set(requestId, maxAttempts);
    throw lastError!;
  }

  private static delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  static async cacheResponse(key: string, data: any): Promise<void> {
    try {
      await AsyncStorage.setItem(\`cache_\${key}\`, JSON.stringify({
        data,
        timestamp: Date.now()
      }));
    } catch (error) {
      console.warn('Failed to cache response:', error);
    }
  }

  static async getCachedResponse(key: string, maxAge: number = 3600000): Promise<any> {
    try {
      const cached = await AsyncStorage.getItem(\`cache_\${key}\`);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < maxAge) {
          return data;
        }
      }
    } catch (error) {
      console.warn('Failed to get cached response:', error);
    }
    return null;
  }

  static createOfflineQueue() {
    const queue: Array<{ url: string; options: RequestInit; timestamp: number }> = [];
    
    return {
      add: (url: string, options: RequestInit) => {
        queue.push({ url, options, timestamp: Date.now() });
      },
      
      process: async () => {
        const results = [];
        
        for (const item of queue) {
          try {
            const response = await this.fetchWithRetry(item.url, item.options);
            results.push({ success: true, response });
          } catch (error) {
            results.push({ success: false, error });
          }
        }
        
        queue.length = 0; // Clear queue
        return results;
      },
      
      size: () => queue.length
    };
  }
}`}
          language="typescript"
          filename="network-recovery.ts"
          title="Network Error Recovery System"
        />

        <h3>Offline State Management</h3>
        <CodeBlock
          code={`// hooks/useOfflineManager.ts
import { useState, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { useErrorHandler } from '../components/GlobalErrorHandler';

export function useOfflineManager() {
  const [isOffline, setIsOffline] = useState(false);
  const [wasOffline, setWasOffline] = useState(false);
  const { showError, dismissAllErrors } = useErrorHandler();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      const offline = !state.isConnected;
      
      if (offline && !isOffline) {
        // Just went offline
        setWasOffline(true);
        showError({
          type: 'network',
          title: 'You\'re Offline',
          message: 'Some features may not work until you reconnect.',
          dismissible: false
        });
      } else if (!offline && isOffline && wasOffline) {
        // Just came back online
        dismissAllErrors();
        showError({
          type: 'network',
          title: 'Back Online!',
          message: 'Your connection has been restored.',
          actions: [
            {
              label: 'Sync Now',
              action: () => syncOfflineData(),
              style: 'primary'
            }
          ]
        });
      }
      
      setIsOffline(offline);
    });

    return unsubscribe;
  }, [isOffline, wasOffline]);

  const syncOfflineData = async () => {
    // Implement your offline data sync logic
    console.log('Syncing offline data...');
  };

  return {
    isOffline,
    wasOffline,
    syncOfflineData
  };
}

// components/OfflineIndicator.tsx
import { View, Text, StyleSheet } from 'react-native';
import { useOfflineManager } from '../hooks/useOfflineManager';

export function OfflineIndicator() {
  const { isOffline } = useOfflineManager();

  if (!isOffline) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>📵 You're offline</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FF9500',
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});`}
          language="typescript"
          filename="offline-management.ts"
          title="Offline State Management"
        />

        <h2>6. Error Reporting and Analytics</h2>
        <p>
          Track errors in production to identify patterns and fix issues before they affect more users.
        </p>

        <CodeBlock
          code={`// utils/error-reporting.ts
import * as Analytics from 'expo-analytics';
import * as Device from 'expo-device';
import * as Application from 'expo-application';

interface ErrorReport {
  error: Error;
  context: string;
  userAgent: string;
  deviceInfo: any;
  timestamp: string;
  userId?: string;
  additionalData?: any;
}

export class ErrorReporter {
  private static userId: string | null = null;
  private static isEnabled = true;

  static setUserId(userId: string) {
    this.userId = userId;
  }

  static disable() {
    this.isEnabled = false;
  }

  static async reportError(
    error: Error, 
    context: string = 'unknown',
    additionalData?: any
  ) {
    if (!this.isEnabled) return;

    try {
      const deviceInfo = await this.getDeviceInfo();
      
      const report: ErrorReport = {
        error: {
          name: error.name,
          message: error.message,
          stack: error.stack
        } as Error,
        context,
        userAgent: \`\${Application.applicationName}/\${Application.nativeApplicationVersion}\`,
        deviceInfo,
        timestamp: new Date().toISOString(),
        userId: this.userId,
        additionalData
      };

      // Send to analytics
      await Analytics.track('error_reported', {
        error_name: error.name,
        error_message: error.message,
        context,
        device_model: deviceInfo.modelName,
        os_version: deviceInfo.osVersion,
        app_version: deviceInfo.appVersion,
        user_id: this.userId
      });

      // Log locally for debugging
      console.error('Error Report:', report);

      // Store locally for later upload if offline
      await this.storeErrorLocally(report);

    } catch (reportingError) {
      console.error('Failed to report error:', reportingError);
    }
  }

  private static async getDeviceInfo() {
    return {
      modelName: Device.modelName,
      osName: Device.osName,
      osVersion: Device.osVersion,
      platformApiLevel: Device.platformApiLevel,
      deviceType: Device.deviceType,
      isDevice: Device.isDevice,
      appVersion: Application.nativeApplicationVersion,
      buildVersion: Application.nativeBuildVersion
    };
  }

  private static async storeErrorLocally(report: ErrorReport) {
    try {
      const existingErrors = await AsyncStorage.getItem('stored_errors');
      const errors = existingErrors ? JSON.parse(existingErrors) : [];
      
      errors.push(report);
      
      // Keep only last 50 errors
      if (errors.length > 50) {
        errors.splice(0, errors.length - 50);
      }
      
      await AsyncStorage.setItem('stored_errors', JSON.stringify(errors));
    } catch (error) {
      console.warn('Failed to store error locally:', error);
    }
  }

  static async uploadStoredErrors() {
    try {
      const storedErrors = await AsyncStorage.getItem('stored_errors');
      if (!storedErrors) return;

      const errors = JSON.parse(storedErrors);
      
      // Upload to your error tracking service
      await fetch('https://your-error-tracking-service.com/batch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ errors })
      });

      // Clear stored errors after successful upload
      await AsyncStorage.removeItem('stored_errors');
      
    } catch (error) {
      console.warn('Failed to upload stored errors:', error);
    }
  }
}

// Global error handler setup
export function setupGlobalErrorHandling() {
  // Handle unhandled promise rejections
  const originalHandler = ErrorUtils.getGlobalHandler();
  
  ErrorUtils.setGlobalHandler((error, isFatal) => {
    ErrorReporter.reportError(error, isFatal ? 'fatal' : 'non-fatal');
    originalHandler(error, isFatal);
  });

  // Handle unhandled promise rejections
  const rejectionTracking = require('promise/setimmediate/rejection-tracking');
  rejectionTracking.enable({
    allRejections: true,
    onUnhandled: (id: string, error: Error) => {
      ErrorReporter.reportError(error, 'unhandled_promise_rejection');
    }
  });
}`}
          language="typescript"
          filename="error-reporting.ts"
          title="Error Reporting and Analytics"
        />

        <h2>7. Hands-On Exercise: Complete Error Handling System</h2>
        <p>
          Build a comprehensive error handling system that covers all aspects of error management 
          in a production React Native app.
        </p>

        <div className="bg-orange-50 dark:bg-orange-950 p-6 rounded-lg border border-orange-200 dark:border-orange-800 my-6">
          <h4 className="text-orange-800 dark:text-orange-200 font-semibold mb-3 mt-0">
            🎯 Exercise: Production-Ready Error System
          </h4>
          <div className="text-orange-700 dark:text-orange-300 space-y-3">
            <div>
              <strong>Phase 1:</strong> Error Boundaries and 404 Handling
              <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                <li>Implement error boundaries for all major app sections</li>
                <li>Create a comprehensive 404 page with route suggestions</li>
                <li>Add route validation and sanitization</li>
                <li>Test error scenarios and recovery flows</li>
              </ul>
            </div>
            
            <div>
              <strong>Phase 2:</strong> Global Error Management
              <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                <li>Set up global error context and UI patterns</li>
                <li>Implement network error recovery with retry logic</li>
                <li>Add offline state management and sync</li>
                <li>Create consistent error messaging system</li>
              </ul>
            </div>

            <div>
              <strong>Phase 3:</strong> Error Reporting and Analytics
              <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                <li>Integrate error reporting with analytics</li>
                <li>Set up local error storage for offline scenarios</li>
                <li>Implement user-friendly error feedback</li>
                <li>Test error handling across different network conditions</li>
              </ul>
            </div>
          </div>
        </div>

        <CodeBlock
          code={`// Complete error handling setup
// app/_layout.tsx - Root level error handling
import { Stack } from 'expo-router';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { GlobalErrorProvider } from '../components/GlobalErrorHandler';
import { setupGlobalErrorHandling, ErrorReporter } from '../utils/error-reporting';
import { useEffect } from 'react';

// Initialize global error handling
setupGlobalErrorHandling();

export default function RootLayout() {
  useEffect(() => {
    // Set up error reporting
    ErrorReporter.setUserId('user-123'); // Set actual user ID
    
    // Upload any stored errors when app starts
    ErrorReporter.uploadStoredErrors().catch(console.error);
  }, []);

  return (
    <GlobalErrorProvider>
      <ErrorBoundary
        onError={(error, errorInfo) => {
          ErrorReporter.reportError(error, 'error_boundary', { errorInfo });
        }}
      >
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="[...missing]" options={{ title: 'Page Not Found' }} />
        </Stack>
      </ErrorBoundary>
    </GlobalErrorProvider>
  );
}

// Example usage in a screen
import { useErrorHandler } from '../components/GlobalErrorHandler';
import { NetworkRecovery } from '../utils/network-recovery';

export default function ExampleScreen() {
  const { showError } = useErrorHandler();

  const loadData = async () => {
    try {
      const response = await NetworkRecovery.fetchWithRetry('/api/data');
      const data = await response.json();
      
      // Cache successful response
      await NetworkRecovery.cacheResponse('data', data);
      
      return data;
    } catch (error) {
      // Try to get cached data
      const cached = await NetworkRecovery.getCachedResponse('data');
      if (cached) {
        showError({
          type: 'network',
          title: 'Using Cached Data',
          message: 'Showing cached data due to connection issues.'
        });
        return cached;
      }
      
      // Show error if no cached data
      showError({
        type: 'network',
        title: 'Failed to Load Data',
        message: 'Please check your connection and try again.',
        actions: [
          {
            label: 'Retry',
            action: () => loadData(),
            style: 'primary'
          }
        ]
      });
      
      throw error;
    }
  };

  return (
    // Your screen content
  );
}`}
          language="typescript"
          filename="complete-error-system.tsx"
          title="Complete Error Handling Setup"
        />

        <div className="bg-green-50 dark:bg-green-950 p-6 rounded-lg border border-green-200 dark:border-green-800">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-3 mt-0">
            🎉 Session 4 Complete!
          </h4>
          <p className="text-green-700 dark:text-green-300 mb-3">
            You've built a comprehensive error handling system with boundaries, graceful fallbacks, 
            global error management, network recovery, and production-ready error reporting.
          </p>
          <p className="text-green-700 dark:text-green-300 mb-0">
            <strong>Next:</strong> Day 6 Challenge will combine all Next.js fundamentals 
            into a comprehensive project showcasing professional React Native development.
          </p>
        </div>
      </div>
    </>
  );
}