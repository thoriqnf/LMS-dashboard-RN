"use client";

import { CodeBlock } from "@/components/ui/code-block-new";

export function Day4Session3Content() {
  return (
    <>
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">
            Navigation Guards - Session 3
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
                <strong>Route Guards</strong> - Check user permissions before navigation
              </li>
              <li>
                <strong>Auto-Redirect</strong> - Redirect users based on their auth status
              </li>
              <li>
                <strong>Loading States</strong> - Handle authentication checks gracefully
              </li>
            </ul>
          </div>
        </div>

        <h2>1. Why Navigation Guards Matter</h2>
        <p>
          Navigation guards protect your app by controlling who can access which screens. 
          They build on the auth logic from Session 2 to create secure, user-friendly navigation.
        </p>

        <div className="bg-green-50 dark:bg-green-950 p-6 rounded-lg border border-green-200 dark:border-green-800 mb-6">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-3 mt-0">
            ✅ Guard Benefits:
          </h4>
          <ul className="text-green-700 dark:text-green-300 text-sm space-y-1 mb-0">
            <li><strong>Security</strong> - Prevent unauthorized access</li>
            <li><strong>Better UX</strong> - Smart redirects based on user state</li>
            <li><strong>Clean code</strong> - Centralized access control logic</li>
            <li><strong>Flexibility</strong> - Easy to modify permissions</li>
          </ul>
        </div>

        <h2>2. Basic Route Protection</h2>
        <p>
          Let's create a simple route guard that checks authentication status 
          and redirects users appropriately.
        </p>

        <CodeBlock
          code={`import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useAuth } from '../auth/AuthContext';
import LoginScreen from '../auth/LoginScreen';

// Basic protected route component
export function ProtectedRoute({ children }) {
  const { user, isLoading } = useAuth();

  // Show loading while checking auth
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 10 }}>Checking authentication...</Text>
      </View>
    );
  }

  // Show login if not authenticated
  if (!user) {
    return <LoginScreen />;
  }

  // Show protected content if authenticated
  return children;
}

// Usage in your main app
function App() {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <MainAppContent />
      </ProtectedRoute>
    </AuthProvider>
  );
}`}
          language="jsx"
          filename="ProtectedRoute.jsx"
          title="Basic Route Protection"
        />

        <h2>3. Role-Based Navigation Guards</h2>
        <p>
          For more complex apps, you might need different access levels. 
          Let's create role-based guards that check user permissions.
        </p>

        <CodeBlock
          code={`import React from 'react';
import { View, Text } from 'react-native';
import { useAuth } from '../auth/AuthContext';

// Role-based route guard
export function RoleGuard({ children, requiredRole }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
        <Text>Checking permissions...</Text>
      </View>
    );
  }

  // Check if user has required role
  const hasPermission = user && user.role === requiredRole;

  if (!hasPermission) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <Text style={{ fontSize: 18, textAlign: 'center', marginBottom: 10 }}>
          Access Denied
        </Text>
        <Text style={{ textAlign: 'center', color: '#666' }}>
          You don't have permission to access this screen.
        </Text>
      </View>
    );
  }

  return children;
}

// Usage examples
function AdminPanel() {
  return (
    <RoleGuard requiredRole="admin">
      <AdminDashboard />
    </RoleGuard>
  );
}

function ModeratorTools() {
  return (
    <RoleGuard requiredRole="moderator">
      <ModerationPanel />
    </RoleGuard>
  );
}`}
          language="jsx"
          filename="RoleGuards.jsx"
          title="Role-Based Route Guards"
        />

        <h2>4. Complete Navigation System</h2>
        <p>
          Let's put it all together with a complete navigation system that handles 
          different user states and provides smooth transitions.
        </p>

        <CodeBlock
          code={`import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useAuth } from '../auth/AuthContext';

// Main navigation component
export function AppNavigation() {
  const { user, isLoading } = useAuth();

  // Show loading screen while checking authentication
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 16 }}>Loading...</Text>
      </View>
    );
  }

  // Show different screens based on auth status
  if (user) {
    // User is logged in - show main app
    return <MainApp />;
  } else {
    // User not logged in - show auth screens
    return <AuthScreens />;
  }
}

function MainApp() {
  const { user } = useAuth();
  
  return (
    <View style={{ flex: 1 }}>
      <Text>Welcome, {user?.name}!</Text>
      {/* Your main app content */}
    </View>
  );
}

function AuthScreens() {
  return (
    <View style={{ flex: 1 }}>
      <LoginScreen />
    </View>
  );
}

// Root app component
export default function App() {
  return (
    <AuthProvider>
      <AppNavigation />
    </AuthProvider>
  );
}`}
          language="jsx"
          filename="AppNavigation.jsx"
          title="Complete Navigation System"
        />

        <div className="bg-yellow-50 dark:bg-yellow-950 p-6 rounded-lg border border-yellow-200 dark:border-yellow-800 mb-6">
          <h4 className="text-yellow-800 dark:text-yellow-200 font-semibold mb-3 mt-0">
            💡 Navigation Best Practices:
          </h4>
          <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1 mb-0">
            <li><strong>Loading states</strong> - Always show feedback while checking auth</li>
            <li><strong>Conditional rendering</strong> - Use guards to control screen access</li>
            <li><strong>Smooth transitions</strong> - Handle auth state changes gracefully</li>
            <li><strong>Clear feedback</strong> - Show users why they can't access something</li>
          </ul>
        </div>

        <h2>5. Essential Practice</h2>
        <p>
          Try building your own navigation guards using the auth system from Session 2. 
          Start with basic protection and add role-based guards as needed.
        </p>

        <div className="bg-orange-50 dark:bg-orange-950 p-6 rounded-lg border border-orange-200 dark:border-orange-800 mb-6">
          <h4 className="text-orange-800 dark:text-orange-200 font-semibold mb-3 mt-0">
            🎯 Quick Practice:
          </h4>
          <ul className="text-orange-700 dark:text-orange-300 text-sm space-y-1 mb-0">
            <li>• Create a ProtectedRoute component</li>
            <li>• Add role-based access to admin features</li>
            <li>• Implement loading states during auth checks</li>
            <li>• Test navigation with different user types</li>
          </ul>
        </div>

        <h2>6. Session Summary</h2>

        <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
          <h4 className="text-blue-800 dark:text-blue-200 font-semibold mb-3 mt-0">
            📚 Navigation Guards Essentials:
          </h4>
          <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1 mb-0">
            <li><strong>Protected routes</strong> - Control access based on authentication</li>
            <li><strong>Role-based guards</strong> - Handle different permission levels</li>
            <li><strong>Smart navigation</strong> - Automatic redirects based on user state</li>
            <li><strong>Loading states</strong> - Smooth user experience during checks</li>
            <li><strong>Security</strong> - Prevent unauthorized screen access</li>
          </ul>
        </div>
      </div>
    </>
  );
}