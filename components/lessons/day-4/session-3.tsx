import { CodeBlock } from "@/components/ui/code-block-new";

export function Day4Session3Content() {
  return (
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
                <strong>Protected Routes</strong> - Secure screens with authentication guards
              </li>
              <li>
                <strong>Shared Layouts</strong> - Create reusable auth protection wrappers
              </li>
              <li>
                <strong>Dynamic Redirects</strong> - Route users based on authentication state
              </li>
              <li>
                <strong>Role-Based Access</strong> - Control access with user permissions
              </li>
              <li>
                <strong>Route Security Patterns</strong> - Implement enterprise-grade navigation security
              </li>
              <li>
                <strong>Expo Router Integration</strong> - Leverage file-based routing for auth
              </li>
            </ul>
          </div>
        </div>

      {/* Introduction */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Navigation Guards Architecture</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Navigation guards are essential for securing mobile applications. They control access to routes based on 
          authentication status, user roles, and other business logic. We'll implement a comprehensive guard system using Expo Router.
        </p>
        
        <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
          <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">🛡️ Guard System Components</h4>
          <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1">
            <li>• <strong>Protected Routes</strong>: File-based routing with authentication checks</li>
            <li>• <strong>Shared Layouts</strong>: Wrapper components for consistent auth protection</li>
            <li>• <strong>Route Guards</strong>: Hooks and HOCs for access control</li>
            <li>• <strong>Dynamic Redirects</strong>: Smart routing based on auth state</li>
          </ul>
        </div>
      </div>

      {/* Expo Router Structure */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Expo Router File Structure</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Let's set up a proper file structure for protected routes using Expo Router's conventions.
        </p>

        <CodeBlock
          code={`// App directory structure for protected routes
app/
├── _layout.tsx                    // Root layout with auth provider
├── (auth)/                        // Auth routes group
│   ├── _layout.tsx               // Auth layout wrapper
│   ├── login.tsx                 // Login screen
│   ├── register.tsx              // Register screen
│   └── forgot-password.tsx       // Password reset
├── (protected)/                   // Protected routes group
│   ├── _layout.tsx               // Protected layout with guards
│   ├── (tabs)/                   // Tabbed navigation
│   │   ├── _layout.tsx           // Tab layout
│   │   ├── home.tsx              // Home tab
│   │   ├── profile.tsx           // Profile tab
│   │   └── settings.tsx          // Settings tab
│   ├── modal.tsx                 // Modal routes
│   └── [id]/                     // Dynamic routes
│       └── details.tsx           // Detail screens
├── (admin)/                       // Admin-only routes
│   ├── _layout.tsx               // Admin guard layout
│   ├── dashboard.tsx             // Admin dashboard
│   └── users.tsx                 // User management
└── index.tsx                     // Root redirect logic

// Route protection patterns
const ROUTE_PATTERNS = {
  public: ['/', '/auth/login', '/auth/register'],
  protected: ['/home', '/profile', '/settings'],
  admin: ['/admin/dashboard', '/admin/users'],
  guest: ['/auth/login', '/auth/register']
};

// Route group configurations
const ROUTE_GROUPS = {
  '(auth)': {
    requiresAuth: false,
    redirectIfAuth: '/home',
    layout: 'AuthLayout'
  },
  '(protected)': {
    requiresAuth: true,
    redirectIfNotAuth: '/auth/login',
    layout: 'ProtectedLayout'
  },
  '(admin)': {
    requiresAuth: true,
    requiresRole: 'admin',
    redirectIfNotAuth: '/auth/login',
    redirectIfNotAuthorized: '/home',
    layout: 'AdminLayout'
  }
};`}
          language="typescript"
          filename="app/structure.ts"
          title="Expo Router Protected Structure"
        />

        <div className="bg-yellow-50 dark:bg-yellow-950/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800 mt-4">
          <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">📁 File Structure Benefits</h4>
          <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1">
            <li>• <strong>Route Groups</strong>: Organize routes by authentication requirement</li>
            <li>• <strong>Shared Layouts</strong>: Consistent auth checking across route groups</li>
            <li>• <strong>Convention-based</strong>: File structure defines routing behavior</li>
            <li>• <strong>Nested Protection</strong>: Hierarchical auth requirements</li>
          </ul>
        </div>
      </div>

      {/* Example 1: Basic Protected Layout */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Example 1: Basic Protected Layout</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Let's create a basic protected layout that wraps authenticated routes and handles automatic redirects.
        </p>

        <CodeBlock
          code={`// app/(protected)/_layout.tsx
import { useEffect } from 'react';
import { useRouter, useSegments } from 'expo-router';
import { Slot } from 'expo-router';
import { useAuth } from '../../contexts/AuthContext';
import { View, Text, ActivityIndicator } from 'react-native';

export default function ProtectedLayout() {
  const { isAuthenticated, loading, user } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (loading) return; // Wait for auth to initialize

    if (!isAuthenticated) {
      // Store the intended route for redirect after login
      const currentRoute = '/' + segments.join('/');
      
      // Redirect to login with return path
      router.replace({
        pathname: '/auth/login',
        params: { returnUrl: currentRoute }
      });
    }
  }, [isAuthenticated, loading, segments, router]);

  // Show loading while auth is initializing
  if (loading) {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f9fafb'
      }}>
        <ActivityIndicator size="large" color="#4f46e5" />
        <Text style={{ marginTop: 16, color: '#6b7280' }}>
          Checking authentication...
        </Text>
      </View>
    );
  }

  // Don't render content if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  // Render protected content
  return (
    <View style={{ flex: 1 }}>
      {/* Optional: Add common protected layout elements */}
      <ProtectedHeader user={user} />
      <Slot />
      <ProtectedFooter />
    </View>
  );
}

// Protected header component
function ProtectedHeader({ user }) {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.replace('/auth/login');
  };

  return (
    <View style={{
      backgroundColor: '#4f46e5',
      padding: 16,
      paddingTop: 50,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <View>
        <Text style={{ color: '#ffffff', fontSize: 18, fontWeight: 'bold' }}>
          Welcome, {user?.name}
        </Text>
        <Text style={{ color: '#e0e7ff', fontSize: 14 }}>
          {user?.email}
        </Text>
      </View>
      
      <TouchableOpacity onPress={handleLogout}>
        <Text style={{ color: '#ffffff', fontSize: 14 }}>
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
}

// Protected footer component
function ProtectedFooter() {
  return (
    <View style={{
      backgroundColor: '#f9fafb',
      padding: 16,
      borderTopWidth: 1,
      borderTopColor: '#e5e7eb'
    }}>
      <Text style={{ color: '#6b7280', fontSize: 12, textAlign: 'center' }}>
        Protected Area - Authenticated Users Only
      </Text>
    </View>
  );
}

// Enhanced auth guard hook
export function useProtectedRoute(requiredRole = null) {
  const { isAuthenticated, loading, user } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (loading) return;

    if (!isAuthenticated) {
      const currentRoute = '/' + segments.join('/');
      router.replace({
        pathname: '/auth/login',
        params: { returnUrl: currentRoute }
      });
      return;
    }

    // Check role-based access
    if (requiredRole && user?.role !== requiredRole) {
      router.replace('/unauthorized');
      return;
    }
  }, [isAuthenticated, loading, user, requiredRole, segments, router]);

  return {
    isAuthenticated,
    loading,
    user,
    hasRequiredRole: requiredRole ? user?.role === requiredRole : true
  };
}

// Usage in protected screens
// app/(protected)/(tabs)/home.tsx
export default function HomeScreen() {
  const { loading, user } = useProtectedRoute();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
        Home Screen
      </Text>
      <Text style={{ fontSize: 16, color: '#6b7280' }}>
        Welcome to your secure dashboard, {user?.name}!
      </Text>
    </View>
  );
}`}
          language="typescript"
          filename="app/(protected)/_layout.tsx"
          title="Basic Protected Layout"
        />

        <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border border-green-200 dark:border-green-800 mt-4">
          <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">✅ What's New in This Example</h4>
          <ul className="text-green-700 dark:text-green-300 text-sm space-y-1">
            <li>• <strong>Protected Layout</strong> - Wraps all protected routes with auth checking</li>
            <li>• <strong>Automatic Redirects</strong> - Redirects to login with return URL</li>
            <li>• <strong>Loading States</strong> - Shows loading while auth initializes</li>
            <li>• <strong>Shared Components</strong> - Common header/footer for protected area</li>
            <li>• <strong>Role-based Access</strong> - Optional role checking in routes</li>
          </ul>
        </div>
      </div>

      {/* Example 2: Advanced Route Guards */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Example 2: Advanced Route Guards with Permissions</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Let's create a sophisticated guard system that handles roles, permissions, and complex access patterns.
        </p>

        <CodeBlock
          code={`// services/RouteGuardService.ts
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'expo-router';

// Permission definitions
export const PERMISSIONS = {
  READ_USERS: 'read:users',
  WRITE_USERS: 'write:users',
  DELETE_USERS: 'delete:users',
  READ_ADMIN: 'read:admin',
  WRITE_ADMIN: 'write:admin',
  READ_ANALYTICS: 'read:analytics',
  MANAGE_SETTINGS: 'manage:settings'
};

// Role definitions with permissions
export const ROLES = {
  USER: {
    name: 'user',
    permissions: [PERMISSIONS.READ_USERS]
  },
  MODERATOR: {
    name: 'moderator',
    permissions: [
      PERMISSIONS.READ_USERS,
      PERMISSIONS.WRITE_USERS,
      PERMISSIONS.READ_ANALYTICS
    ]
  },
  ADMIN: {
    name: 'admin',
    permissions: [
      PERMISSIONS.READ_USERS,
      PERMISSIONS.WRITE_USERS,
      PERMISSIONS.DELETE_USERS,
      PERMISSIONS.READ_ADMIN,
      PERMISSIONS.WRITE_ADMIN,
      PERMISSIONS.READ_ANALYTICS,
      PERMISSIONS.MANAGE_SETTINGS
    ]
  }
};

// Route protection configurations
export const ROUTE_GUARDS = {
  '/admin/dashboard': {
    requiresAuth: true,
    requiresRole: 'admin',
    requiresPermissions: [PERMISSIONS.READ_ADMIN],
    redirectIfNotAuthorized: '/unauthorized'
  },
  '/admin/users': {
    requiresAuth: true,
    requiresRole: ['admin', 'moderator'],
    requiresPermissions: [PERMISSIONS.READ_USERS],
    redirectIfNotAuthorized: '/unauthorized'
  },
  '/settings': {
    requiresAuth: true,
    requiresPermissions: [PERMISSIONS.MANAGE_SETTINGS],
    redirectIfNotAuthorized: '/home'
  }
};

// Advanced route guard hook
export function useAdvancedRouteGuard(guardConfig) {
  const { isAuthenticated, loading, user } = useAuth();
  const router = useRouter();

  const checkPermissions = (requiredPermissions) => {
    if (!requiredPermissions || !user) return false;

    const userRole = ROLES[user.role?.toUpperCase()];
    if (!userRole) return false;

    return requiredPermissions.every(permission =>
      userRole.permissions.includes(permission)
    );
  };

  const checkRole = (requiredRoles) => {
    if (!requiredRoles || !user) return false;

    const rolesArray = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];
    return rolesArray.includes(user.role);
  };

  const guardResult = {
    isAuthenticated,
    loading,
    user,
    isAuthorized: true,
    reason: null
  };

  // Check authentication
  if (!loading && guardConfig.requiresAuth && !isAuthenticated) {
    guardResult.isAuthorized = false;
    guardResult.reason = 'not_authenticated';
    
    router.replace({
      pathname: '/auth/login',
      params: { returnUrl: router.pathname }
    });
    
    return guardResult;
  }

  // Check role requirements
  if (guardConfig.requiresRole && !checkRole(guardConfig.requiresRole)) {
    guardResult.isAuthorized = false;
    guardResult.reason = 'insufficient_role';
    
    router.replace(guardConfig.redirectIfNotAuthorized || '/unauthorized');
    return guardResult;
  }

  // Check permission requirements
  if (guardConfig.requiresPermissions && !checkPermissions(guardConfig.requiresPermissions)) {
    guardResult.isAuthorized = false;
    guardResult.reason = 'insufficient_permissions';
    
    router.replace(guardConfig.redirectIfNotAuthorized || '/unauthorized');
    return guardResult;
  }

  return guardResult;
}

// Higher-order component for route protection
export function withRouteGuard(Component, guardConfig) {
  return function GuardedComponent(props) {
    const { loading, isAuthorized } = useAdvancedRouteGuard(guardConfig);

    if (loading) {
      return (
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f9fafb'
        }}>
          <ActivityIndicator size="large" color="#4f46e5" />
          <Text style={{ marginTop: 16, color: '#6b7280' }}>
            Checking permissions...
          </Text>
        </View>
      );
    }

    if (!isAuthorized) {
      return null; // Will redirect via hook
    }

    return <Component {...props} />;
  };
}

// Permission checker component
export function PermissionGate({ children, permissions, fallback = null }) {
  const { user } = useAuth();

  const hasPermission = () => {
    if (!permissions || !user) return false;

    const userRole = ROLES[user.role?.toUpperCase()];
    if (!userRole) return false;

    const requiredPermissions = Array.isArray(permissions) ? permissions : [permissions];
    return requiredPermissions.every(permission =>
      userRole.permissions.includes(permission)
    );
  };

  if (hasPermission()) {
    return children;
  }

  return fallback;
}

// Usage examples

// Admin dashboard with HOC
const AdminDashboard = withRouteGuard(
  function AdminDashboardScreen() {
    return (
      <View style={{ flex: 1, padding: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
          Admin Dashboard
        </Text>
        <Text style={{ color: '#6b7280', marginTop: 10 }}>
          Welcome to the admin area!
        </Text>
      </View>
    );
  },
  ROUTE_GUARDS['/admin/dashboard']
);

// Settings screen with hook
export default function SettingsScreen() {
  const { loading, user } = useAdvancedRouteGuard({
    requiresAuth: true,
    requiresPermissions: [PERMISSIONS.MANAGE_SETTINGS],
    redirectIfNotAuthorized: '/home'
  });

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
        Settings
      </Text>
      
      {/* Permission-based UI rendering */}
      <PermissionGate permissions={[PERMISSIONS.WRITE_ADMIN]}>
        <View style={{
          backgroundColor: '#fef3c7',
          padding: 16,
          borderRadius: 8,
          marginBottom: 16
        }}>
          <Text style={{ fontWeight: 'bold', color: '#92400e' }}>
            Admin Settings
          </Text>
          <Text style={{ color: '#92400e', marginTop: 4 }}>
            You have admin privileges
          </Text>
        </View>
      </PermissionGate>

      <PermissionGate 
        permissions={[PERMISSIONS.DELETE_USERS]}
        fallback={
          <View style={{
            backgroundColor: '#fee2e2',
            padding: 16,
            borderRadius: 8,
            marginBottom: 16
          }}>
            <Text style={{ color: '#dc2626' }}>
              Limited Access - Contact admin for more permissions
            </Text>
          </View>
        }
      >
        <View style={{
          backgroundColor: '#dcfce7',
          padding: 16,
          borderRadius: 8,
          marginBottom: 16
        }}>
          <Text style={{ fontWeight: 'bold', color: '#166534' }}>
            Full Access
          </Text>
          <Text style={{ color: '#166534', marginTop: 4 }}>
            You have full administrative permissions
          </Text>
        </View>
      </PermissionGate>
    </View>
  );
}`}
          language="typescript"
          filename="services/RouteGuardService.ts"
          title="Advanced Route Guards with Permissions"
        />

        <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border border-green-200 dark:border-green-800 mt-4">
          <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">✅ What's New in This Example</h4>
          <ul className="text-green-700 dark:text-green-300 text-sm space-y-1">
            <li>• <strong>Permission System</strong> - Granular access control with permissions</li>
            <li>• <strong>Role-based Access</strong> - Multiple roles with different permission sets</li>
            <li>• <strong>HOC Pattern</strong> - Higher-order component for route protection</li>
            <li>• <strong>Permission Gates</strong> - Conditional UI rendering based on permissions</li>
            <li>• <strong>Advanced Guards</strong> - Complex guard configurations</li>
          </ul>
        </div>
      </div>

      {/* Example 3: Dynamic Layout System */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Example 3: Dynamic Layout System with Route-based Guards</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Let's create a sophisticated layout system that adapts based on user roles and provides different experiences for different user types.
        </p>

        <CodeBlock
          code={`// app/_layout.tsx - Root layout with dynamic routing
import { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { AuthProvider } from '../contexts/AuthContext';
import { RouteGuardProvider } from '../contexts/RouteGuardContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <RouteGuardProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(protected)" />
          <Stack.Screen name="(admin)" />
          <Stack.Screen name="unauthorized" />
        </Stack>
      </RouteGuardProvider>
    </AuthProvider>
  );
}

// contexts/RouteGuardContext.tsx - Route guard context
import { createContext, useContext, useEffect } from 'react';
import { useRouter, useSegments } from 'expo-router';
import { useAuth } from './AuthContext';

const RouteGuardContext = createContext({});

export function RouteGuardProvider({ children }) {
  const { isAuthenticated, loading, user } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === '(auth)';
    const inProtectedGroup = segments[0] === '(protected)';
    const inAdminGroup = segments[0] === '(admin)';

    // Handle authentication-based routing
    if (!isAuthenticated) {
      if (inProtectedGroup || inAdminGroup) {
        router.replace('/auth/login');
      }
    } else {
      // User is authenticated
      if (inAuthGroup) {
        // Redirect based on user role
        if (user?.role === 'admin') {
          router.replace('/admin/dashboard');
        } else {
          router.replace('/home');
        }
      }
      
      // Check admin access
      if (inAdminGroup && user?.role !== 'admin') {
        router.replace('/unauthorized');
      }
    }
  }, [isAuthenticated, loading, user, segments, router]);

  return (
    <RouteGuardContext.Provider value={{}}>
      {children}
    </RouteGuardContext.Provider>
  );
}

// app/(admin)/_layout.tsx - Admin layout
export default function AdminLayout() {
  const { isAuthenticated, loading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!isAuthenticated) {
      router.replace('/auth/login');
      return;
    }

    if (user?.role !== 'admin') {
      router.replace('/unauthorized');
      return;
    }
  }, [isAuthenticated, loading, user, router]);

  if (loading) {
    return <LoadingScreen message="Checking admin access..." />;
  }

  if (!isAuthenticated || user?.role !== 'admin') {
    return null;
  }

  return (
    <View style={{ flex: 1 }}>
      <AdminHeader user={user} />
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <AdminSidebar />
        <View style={{ flex: 1 }}>
          <Slot />
        </View>
      </View>
    </View>
  );
}

// Admin header component
function AdminHeader({ user }) {
  const { logout } = useAuth();
  const router = useRouter();

  return (
    <View style={{
      backgroundColor: '#dc2626',
      padding: 16,
      paddingTop: 50,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <View>
        <Text style={{ color: '#ffffff', fontSize: 18, fontWeight: 'bold' }}>
          Admin Panel
        </Text>
        <Text style={{ color: '#fca5a5', fontSize: 14 }}>
          Welcome, {user.name}
        </Text>
      </View>
      
      <View style={{ flexDirection: 'row', gap: 16 }}>
        <TouchableOpacity 
          onPress={() => router.push('/home')}
          style={{
            backgroundColor: '#b91c1c',
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 4
          }}
        >
          <Text style={{ color: '#ffffff', fontSize: 12 }}>
            User View
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={logout}>
          <Text style={{ color: '#ffffff', fontSize: 14 }}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Admin sidebar component
function AdminSidebar() {
  const router = useRouter();
  const [activeRoute, setActiveRoute] = useState('/admin/dashboard');

  const menuItems = [
    { title: 'Dashboard', route: '/admin/dashboard', icon: '📊' },
    { title: 'Users', route: '/admin/users', icon: '👥' },
    { title: 'Analytics', route: '/admin/analytics', icon: '📈' },
    { title: 'Settings', route: '/admin/settings', icon: '⚙️' }
  ];

  return (
    <View style={{
      width: 200,
      backgroundColor: '#f9fafb',
      borderRightWidth: 1,
      borderRightColor: '#e5e7eb',
      padding: 16
    }}>
      <Text style={{
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#374151'
      }}>
        Admin Menu
      </Text>
      
      {menuItems.map((item) => (
        <TouchableOpacity
          key={item.route}
          onPress={() => {
            setActiveRoute(item.route);
            router.push(item.route);
          }}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 12,
            marginBottom: 8,
            borderRadius: 6,
            backgroundColor: activeRoute === item.route ? '#dbeafe' : 'transparent'
          }}
        >
          <Text style={{ fontSize: 16, marginRight: 8 }}>{item.icon}</Text>
          <Text style={{
            fontSize: 14,
            color: activeRoute === item.route ? '#1d4ed8' : '#6b7280'
          }}>
            {item.title}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

// Dynamic route redirect component
// app/index.tsx
export default function RootRedirect() {
  const { isAuthenticated, loading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!isAuthenticated) {
      router.replace('/auth/login');
    } else {
      // Route based on user role
      switch (user?.role) {
        case 'admin':
          router.replace('/admin/dashboard');
          break;
        case 'moderator':
          router.replace('/moderator/dashboard');
          break;
        default:
          router.replace('/home');
      }
    }
  }, [isAuthenticated, loading, user, router]);

  if (loading) {
    return <LoadingScreen message="Determining your access level..." />;
  }

  return null;
}

// Unauthorized page
// app/unauthorized.tsx
export default function UnauthorizedScreen() {
  const router = useRouter();
  const { user, logout } = useAuth();

  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: '#f9fafb'
    }}>
      <Text style={{ fontSize: 64, marginBottom: 20 }}>🚫</Text>
      
      <Text style={{
        fontSize: 24,
        fontWeight: 'bold',
        color: '#dc2626',
        marginBottom: 8,
        textAlign: 'center'
      }}>
        Access Denied
      </Text>
      
      <Text style={{
        fontSize: 16,
        color: '#6b7280',
        textAlign: 'center',
        marginBottom: 32
      }}>
        You don't have permission to access this area.
        {user?.role && \` Your role: \${user.role}\`}
      </Text>
      
      <View style={{ flexDirection: 'row', gap: 16 }}>
        <TouchableOpacity
          onPress={() => router.push('/home')}
          style={{
            backgroundColor: '#4f46e5',
            paddingHorizontal: 20,
            paddingVertical: 12,
            borderRadius: 6
          }}
        >
          <Text style={{ color: '#ffffff', fontSize: 16 }}>
            Go Home
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          onPress={logout}
          style={{
            backgroundColor: '#dc2626',
            paddingHorizontal: 20,
            paddingVertical: 12,
            borderRadius: 6
          }}
        >
          <Text style={{ color: '#ffffff', fontSize: 16 }}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Loading screen component
function LoadingScreen({ message = 'Loading...' }) {
  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f9fafb'
    }}>
      <ActivityIndicator size="large" color="#4f46e5" />
      <Text style={{ marginTop: 16, color: '#6b7280' }}>
        {message}
      </Text>
    </View>
  );
}`}
          language="typescript"
          filename="app/layouts/DynamicLayout.tsx"
          title="Dynamic Layout System with Route Guards"
        />

        <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border border-green-200 dark:border-green-800 mt-4">
          <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">✅ What's New in This Example</h4>
          <ul className="text-green-700 dark:text-green-300 text-sm space-y-1">
            <li>• <strong>Dynamic Layouts</strong> - Different layouts for different user roles</li>
            <li>• <strong>Route Guard Context</strong> - Centralized guard logic</li>
            <li>• <strong>Admin Interface</strong> - Complete admin layout with sidebar</li>
            <li>• <strong>Role-based Routing</strong> - Automatic routing based on user role</li>
            <li>• <strong>Unauthorized Handler</strong> - Dedicated page for access denied</li>
          </ul>
        </div>
      </div>

      {/* Route Guard Patterns */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Route Guard Patterns</h2>
        
        <div className="bg-gray-50 dark:bg-gray-950/20 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
          <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">🛡️ Guard Implementation Patterns</h4>
          <div className="text-sm space-y-2">
            <div className="flex items-start gap-2">
              <span className="text-orange-500 font-mono">1.</span>
              <span className="text-gray-700 dark:text-gray-300">
                <strong>Layout-based Guards</strong> - Protection at the layout level with automatic redirects
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-orange-500 font-mono">2.</span>
              <span className="text-gray-700 dark:text-gray-300">
                <strong>HOC Pattern</strong> - Higher-order components for individual route protection
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-orange-500 font-mono">3.</span>
              <span className="text-gray-700 dark:text-gray-300">
                <strong>Hook-based Guards</strong> - Custom hooks for flexible guard logic
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-orange-500 font-mono">4.</span>
              <span className="text-gray-700 dark:text-gray-300">
                <strong>Permission Gates</strong> - Conditional rendering based on user permissions
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-orange-500 font-mono">5.</span>
              <span className="text-gray-700 dark:text-gray-300">
                <strong>Dynamic Routing</strong> - Role-based routing with automatic redirects
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Best Practices */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Navigation Guard Best Practices</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-3">🔒 Security Principles</h4>
            <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1">
              <li>• Never rely on client-side guards alone</li>
              <li>• Always validate on the server side</li>
              <li>• Use consistent guard patterns across routes</li>
              <li>• Implement proper error handling</li>
              <li>• Log security events for monitoring</li>
            </ul>
          </div>
          
          <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
            <h4 className="font-semibold text-green-800 dark:text-green-200 mb-3">⚡ Performance Tips</h4>
            <ul className="text-green-700 dark:text-green-300 text-sm space-y-1">
              <li>• Cache user permissions in context</li>
              <li>• Use lazy loading for protected routes</li>
              <li>• Implement efficient guard checking</li>
              <li>• Minimize redirect cycles</li>
              <li>• Use proper loading states</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Integration Guide */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Integration with Previous Sessions</h2>
        
        <div className="bg-purple-50 dark:bg-purple-950/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
          <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-3">🔗 Building on Previous Work</h4>
          <div className="text-purple-700 dark:text-purple-300 text-sm space-y-2">
            <div>
              <strong>Session 1 (Auth UI):</strong> Login/signup screens, form validation
            </div>
            <div>
              <strong>Session 2 (Auth Logic):</strong> Token management, session handling
            </div>
            <div>
              <strong>Session 3 (Navigation Guards):</strong> Route protection, permission systems
            </div>
            <div>
              <strong>Complete System:</strong> Full authentication with secure routing
            </div>
          </div>
        </div>
      </div>

      {/* Hands-On Exercise */}
      <div className="bg-orange-50 dark:bg-orange-950/20 p-6 rounded-xl border border-orange-200 dark:border-orange-800">
        <h3 className="text-lg font-semibold text-orange-900 dark:text-orange-100 mb-4">
          🎯 Hands-On Exercise: Complete Guard System
        </h3>
        
        <div className="text-orange-800 dark:text-orange-200 space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Challenge: Multi-role Application</h4>
            <p className="text-sm">
              Create a complete application with multiple user roles and sophisticated route protection.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">Requirements:</h4>
            <ul className="text-sm space-y-1">
              <li>• User, Moderator, and Admin roles</li>
              <li>• Permission-based route protection</li>
              <li>• Dynamic layouts for different roles</li>
              <li>• Proper unauthorized handling</li>
              <li>• Navigation guards at multiple levels</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">Bonus Features:</h4>
            <ul className="text-sm space-y-1">
              <li>• Feature flagging system</li>
              <li>• Time-based access control</li>
              <li>• IP-based restrictions</li>
              <li>• Audit logging for security events</li>
              <li>• Progressive permissions unlock</li>
            </ul>
          </div>
        </div>
      </div>

        <div className="bg-green-50 dark:bg-green-950 p-6 rounded-lg border border-green-200 dark:border-green-800">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-3 mt-0">
            🎉 Session 3 Complete!
          </h4>
          <p className="text-green-700 dark:text-green-300 mb-3">
            You've built comprehensive navigation guards with protected routes, shared layouts, 
            role-based access control, and dynamic redirects. These patterns secure entire app flows.
          </p>
          <p className="text-green-700 dark:text-green-300 mb-0">
            <strong>Next:</strong> Session 4 will focus on keyboard & input UX, 
            professional form handling, and accessibility patterns.
          </p>
        </div>
    </div>
  );
}