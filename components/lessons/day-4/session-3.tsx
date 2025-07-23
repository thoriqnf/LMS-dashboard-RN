"use client";

import { CodeBlock } from "@/components/ui/code-block-new";

export function Day4Session3Content() {
  return (
    <>
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">
            Navigation Guards & Security - Session 3
          </h1>

          <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg border border-blue-200 dark:border-blue-800 mb-8">
            <h3 className="text-blue-800 dark:text-blue-200 font-semibold mb-4 mt-0">
              🛡️ Session Overview
            </h3>
            <ul className="text-blue-700 dark:text-blue-300 space-y-2 mb-0">
              <li>
                <strong>Protected Routes</strong> - Control access to screens based on authentication
              </li>
              <li>
                <strong>Navigation Guards</strong> - Smart redirects and access control
              </li>
              <li>
                <strong>Session Management</strong> - Handle token expiry and auto-logout
              </li>
              <li>
                <strong>Complete App Flow</strong> - Secure navigation throughout the app
              </li>
            </ul>
          </div>
        </div>

        <h2>1. Why Navigation Guards Matter</h2>
        <p>
          Navigation guards secure your app by controlling access to screens. 
          They build on our authentication system from Sessions 1 & 2 to create seamless, secure user experiences.
        </p>

        <div className="bg-green-50 dark:bg-green-950 p-6 rounded-lg border border-green-200 dark:border-green-800 mb-6">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-3 mt-0">
            ✅ Guard Benefits:
          </h4>
          <ul className="text-green-700 dark:text-green-300 text-sm space-y-1 mb-0">
            <li><strong>Security</strong> - Prevent unauthorized access to protected screens</li>
            <li><strong>Better UX</strong> - Smart redirects based on authentication state</li>
            <li><strong>Clean code</strong> - Centralized access control logic</li>
            <li><strong>Token safety</strong> - Handle expired sessions gracefully</li>
          </ul>
        </div>

        <h2>2. Basic Protected Route Component</h2>
        <p>
          Let's create a route guard that works with our AuthContext from Session 2.
        </p>

        <CodeBlock
          code={`import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useAuth } from './AuthContext';

export function ProtectedRoute({ children, fallback = null }) {
  const { user, isLoading } = useAuth();

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text style={styles.loadingText}>Checking authentication...</Text>
      </View>
    );
  }

  // Show fallback or nothing if not authenticated
  if (!user) {
    return fallback;
  }

  // Show protected content if authenticated
  return children;
}

// Enhanced version with redirect handling
export function ProtectedScreen({ children, requireAuth = true, redirectTo = null }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  const isAuthenticated = !!user;

  // If auth is required but user is not authenticated
  if (requireAuth && !isAuthenticated) {
    return redirectTo || (
      <View style={styles.accessDeniedContainer}>
        <Text style={styles.accessDeniedTitle}>Authentication Required</Text>
        <Text style={styles.accessDeniedText}>
          Please log in to access this screen.
        </Text>
      </View>
    );
  }

  // If user is authenticated but shouldn't be (like auth screens)
  if (!requireAuth && isAuthenticated && redirectTo) {
    return redirectTo;
  }

  return children;
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6b7280',
  },
  accessDeniedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#f8f9fa',
  },
  accessDeniedTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 12,
    textAlign: 'center',
  },
  accessDeniedText: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 24,
  },
});`}
          language="jsx"
          filename="ProtectedRoute.jsx"
          title="Protected Route Components"
        />

        <h2>3. Session Expiry Handler</h2>
        <p>
          Let's add session management to handle token expiry and auto-logout.
        </p>

        <CodeBlock
          code={`import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useAuth } from './AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function SessionManager({ children }) {
  const { user, logout } = useAuth();
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    if (user) {
      // Check token validity periodically
      const interval = setInterval(checkTokenValidity, 60000); // Check every minute
      return () => clearInterval(interval);
    }
  }, [user]);

  const checkTokenValidity = async () => {
    if (isChecking) return;
    
    try {
      setIsChecking(true);
      const token = await AsyncStorage.getItem('auth_token');
      
      if (!token) {
        await handleSessionExpired();
        return;
      }

      // Verify token with backend
      const response = await fetch('http://localhost:3001/users', {
        headers: {
          'Authorization': \`Bearer \${token}\`,
        },
      });

      if (response.status === 401) {
        await handleSessionExpired();
      }
    } catch (error) {
      console.error('Token validation error:', error);
      // Don't logout on network errors, just log the issue
    } finally {
      setIsChecking(false);
    }
  };

  const handleSessionExpired = async () => {
    Alert.alert(
      'Session Expired',
      'Your session has expired. Please log in again.',
      [
        {
          text: 'OK',
          onPress: async () => {
            await logout();
          },
        },
      ],
      { cancelable: false }
    );
  };

  return children;
}

// Enhanced AuthContext with session management
export function AuthProvider({ children }) {
  // ... (existing AuthProvider code from Session 2)
  
  // Add session timeout warning
  const [sessionWarningShown, setSessionWarningShown] = useState(false);

  useEffect(() => {
    if (user && !sessionWarningShown) {
      // Show warning 5 minutes before token expires (assuming 1 hour tokens)
      const warningTimer = setTimeout(() => {
        Alert.alert(
          'Session Expiring Soon',
          'Your session will expire in 5 minutes. Continue using the app to stay logged in.',
          [{ text: 'OK' }]
        );
        setSessionWarningShown(true);
      }, 55 * 60 * 1000); // 55 minutes

      return () => clearTimeout(warningTimer);
    }
  }, [user, sessionWarningShown]);

  // Reset warning when user logs out
  useEffect(() => {
    if (!user) {
      setSessionWarningShown(false);
    }
  }, [user]);

  // ... (rest of AuthProvider implementation)
}`}
          language="jsx"
          filename="SessionManager.jsx"
          title="Session Management & Token Validation"
        />

        <h2>4. Complete App Navigation System</h2>
        <p>
          Now let's create the complete navigation system that brings everything together.
        </p>

        <CodeBlock
          code={`import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { AuthProvider, useAuth } from './AuthContext';
import { SessionManager } from './SessionManager';
import { ProtectedScreen } from './ProtectedRoute';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import UserProfile from './UserProfile';

// Main app content for authenticated users
function MainAppContent() {
  const { user } = useAuth();
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome back, {user?.name}!</Text>
        <Text style={styles.statusText}>You're successfully authenticated</Text>
      </View>
      
      <View style={styles.content}>
        <UserProfile />
      </View>
    </SafeAreaView>
  );
}

// Authentication screens for non-authenticated users
function AuthScreens() {
  const [currentScreen, setCurrentScreen] = useState('login');

  if (currentScreen === 'signup') {
    return (
      <SignupScreen 
        onNavigateToLogin={() => setCurrentScreen('login')}
      />
    );
  }

  return (
    <LoginScreen 
      onNavigateToSignup={() => setCurrentScreen('signup')}
    />
  );
}

// Main navigation logic
function AppNavigation() {
  const { user, isLoading } = useAuth();

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading your app...</Text>
      </View>
    );
  }

  // Show different content based on auth status
  return (
    <View style={styles.appContainer}>
      <ProtectedScreen 
        requireAuth={true}
        redirectTo={<AuthScreens />}
      >
        <MainAppContent />
      </ProtectedScreen>
    </View>
  );
}

// Root app component with providers
export default function App() {
  return (
    <AuthProvider>
      <SessionManager>
        <AppNavigation />
      </SessionManager>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: 'white',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  statusText: {
    fontSize: 14,
    color: '#10b981',
    fontWeight: '500',
  },
  content: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  loadingText: {
    fontSize: 18,
    color: '#6b7280',
    marginTop: 16,
  },
});`}
          language="jsx"
          filename="App.jsx"
          title="Complete App with Navigation Guards"
        />

        <h2>5. Advanced Route Protection</h2>
        <p>
          For more complex apps, you might need role-based access or multiple protection levels.
        </p>

        <CodeBlock
          code={`import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useAuth } from './AuthContext';

// Role-based access control
export function RoleGuard({ children, allowedRoles = [], fallback = null }) {
  const { user } = useAuth();

  if (!user) {
    return fallback || <AccessDeniedScreen reason="authentication" />;
  }

  const userRole = user.role || 'user';
  const hasAccess = allowedRoles.length === 0 || allowedRoles.includes(userRole);

  if (!hasAccess) {
    return fallback || <AccessDeniedScreen reason="permission" userRole={userRole} />;
  }

  return children;
}

// Permission-based access control
export function PermissionGuard({ children, requiredPermissions = [], fallback = null }) {
  const { user } = useAuth();

  if (!user) {
    return fallback || <AccessDeniedScreen reason="authentication" />;
  }

  const userPermissions = user.permissions || [];
  const hasAllPermissions = requiredPermissions.every(permission => 
    userPermissions.includes(permission)
  );

  if (!hasAllPermissions) {
    return fallback || (
      <AccessDeniedScreen 
        reason="permission" 
        missing={requiredPermissions.filter(p => !userPermissions.includes(p))}
      />
    );
  }

  return children;
}

// Access denied screen component
function AccessDeniedScreen({ reason, userRole, missing }) {
  const { logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Would you like to logout and try with a different account?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: () => logout()
        }
      ]
    );
  };

  const getMessage = () => {
    switch (reason) {
      case 'authentication':
        return 'You need to be logged in to access this feature.';
      case 'permission':
        if (missing && missing.length > 0) {
          return \`You need the following permissions: \${missing.join(', ')}\`;
        }
        return \`Your role (\${userRole}) doesn't have permission to access this feature.\`;
      default:
        return 'Access denied.';
    }
  };

  return (
    <View style={styles.accessDeniedContainer}>
      <Text style={styles.accessDeniedIcon}>🚫</Text>
      <Text style={styles.accessDeniedTitle}>Access Restricted</Text>
      <Text style={styles.accessDeniedMessage}>{getMessage()}</Text>
      
      {reason === 'permission' && (
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Try Different Account</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

// Usage examples
export function AdminScreen() {
  return (
    <RoleGuard allowedRoles={['admin']}>
      <View style={styles.screen}>
        <Text style={styles.screenTitle}>Admin Dashboard</Text>
        <Text>Only admins can see this content.</Text>
      </View>
    </RoleGuard>
  );
}

export function ModeratorScreen() {
  return (
    <RoleGuard allowedRoles={['admin', 'moderator']}>
      <View style={styles.screen}>
        <Text style={styles.screenTitle}>Moderation Tools</Text>
        <Text>Admins and moderators can see this content.</Text>
      </View>
    </RoleGuard>
  );
}

export function UserManagementScreen() {
  return (
    <PermissionGuard requiredPermissions={['manage_users', 'view_analytics']}>
      <View style={styles.screen}>
        <Text style={styles.screenTitle}>User Management</Text>
        <Text>Requires specific permissions to access.</Text>
      </View>
    </PermissionGuard>
  );
}

const styles = StyleSheet.create({
  accessDeniedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#f8f9fa',
  },
  accessDeniedIcon: {
    fontSize: 48,
    marginBottom: 20,
  },
  accessDeniedTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
    textAlign: 'center',
  },
  accessDeniedMessage: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
  },
  logoutButton: {
    backgroundColor: '#ef4444',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  screen: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
});`}
          language="jsx"
          filename="AdvancedGuards.jsx"
          title="Role & Permission-Based Guards"
        />

        <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg border border-green-200 dark:border-green-800 my-6">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-2 mt-0">
            🎯 What We've Built
          </h4>
          <div className="text-green-700 dark:text-green-300 text-sm space-y-2">
            <div><strong>Protected Routes:</strong> Secure access control throughout the app</div>
            <div><strong>Session Management:</strong> Handle token expiry and auto-logout</div>
            <div><strong>Role-Based Access:</strong> Different permissions for different users</div>
            <div><strong>Complete Flow:</strong> Seamless navigation from auth to main app</div>
          </div>
        </div>

        <h2>6. Security Best Practices</h2>
        
        <div className="grid md:grid-cols-2 gap-4 my-6">
          <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg border">
            <h4 className="font-semibold mb-3 mt-0">🔒 Security Tips</h4>
            <div className="text-sm space-y-2">
              <div>• Never store sensitive data in plain text</div>
              <div>• Validate tokens on both client and server</div>
              <div>• Use secure HTTP headers in production</div>
              <div>• Implement proper session timeout</div>
              <div>• Log security events for monitoring</div>
            </div>
          </div>
          
          <div className="p-4 bg-green-50 dark:bg-green-900 rounded-lg border">
            <h4 className="font-semibold mb-3 mt-0">⚡ Performance Tips</h4>
            <div className="text-sm space-y-2">
              <div>• Cache authentication state</div>
              <div>• Minimize authentication checks</div>
              <div>• Use loading states for better UX</div>
              <div>• Implement smart token refresh</div>
              <div>• Optimize guard component renders</div>
            </div>
          </div>
        </div>

        <h2>7. Testing Your Guards</h2>
        <p>
          Here's how to test your navigation guards to ensure they work correctly.
        </p>

        <CodeBlock
          code={`// Simple guard testing scenarios

// Test 1: Authenticated user access
console.log('Testing authenticated access...');
// 1. Login with valid credentials
// 2. Navigate to protected screens
// 3. Verify access is granted

// Test 2: Unauthenticated user redirect
console.log('Testing unauthenticated redirect...');
// 1. Logout or clear tokens
// 2. Try to access protected screens
// 3. Verify redirect to login

// Test 3: Token expiry handling
console.log('Testing token expiry...');
// 1. Manually expire token in AsyncStorage
// 2. Try to use protected features
// 3. Verify auto-logout triggers

// Test 4: Role-based access
console.log('Testing role-based access...');
// 1. Login as different user roles
// 2. Try to access role-restricted screens
// 3. Verify proper access control

// Test 5: Session management
console.log('Testing session management...');
// 1. Leave app open for extended time
// 2. Check session warning appears
// 3. Verify graceful session expiry

// Manual testing checklist:
/*
✅ Login redirects to main app
✅ Logout redirects to auth screens
✅ Protected routes block unauthenticated users
✅ Role guards work correctly
✅ Session expiry triggers logout
✅ Loading states show during auth checks
✅ Error messages are user-friendly
✅ Token validation happens periodically
*/`}
          language="javascript"
          filename="testing-guards.js"
          title="Testing Navigation Guards"
        />

        <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800 my-6">
          <h4 className="text-blue-800 dark:text-blue-200 font-semibold mb-2 mt-0">
            🚀 Complete Authentication System
          </h4>
          <div className="text-blue-700 dark:text-blue-300 text-sm space-y-2">
            <div>Congratulations! You now have a complete authentication system:</div>
            <div><strong>Session 1:</strong> Professional UI forms with json-server-auth backend</div>
            <div><strong>Session 2:</strong> Real authentication with JWT tokens and global state</div>
            <div><strong>Session 3:</strong> Secure navigation guards and session management</div>
          </div>
        </div>

        <h2>8. Key Takeaways</h2>
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 p-6 rounded-lg border border-blue-200 dark:border-blue-800 my-6">
          <ul className="space-y-2 mb-0 text-blue-800 dark:text-blue-200">
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span><strong>Navigation guards</strong> provide centralized access control and security</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span><strong>Session management</strong> handles token expiry gracefully</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span><strong>Role-based access</strong> enables granular permission control</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span><strong>Loading states</strong> improve user experience during auth checks</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span><strong>Security practices</strong> protect both user data and app integrity</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}