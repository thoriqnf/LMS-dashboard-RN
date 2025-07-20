import { CodeBlock } from "@/components/ui/code-block-new";

export function Day4Session2Content() {
  return (
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
                <strong>JWT Token Simulation</strong> - Create and validate authentication tokens
              </li>
              <li>
                <strong>Advanced State Management</strong> - Handle authentication state with Context
              </li>
              <li>
                <strong>Expo Router Integration</strong> - Navigate with authentication guards
              </li>
              <li>
                <strong>Multi-stage Splash Logic</strong> - Build async initialization sequences
              </li>
              <li>
                <strong>Session Management</strong> - Implement timeout and refresh patterns
              </li>
              <li>
                <strong>Token Storage & Security</strong> - Handle secure token persistence
              </li>
            </ul>
          </div>
        </div>

      {/* Introduction */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Authentication Logic Architecture</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          While UI handles the visual aspects, authentication logic manages the complex state, navigation, and security patterns 
          that make auth systems work. We'll build production-ready authentication logic using modern React Native patterns.
        </p>
        
        <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
          <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">⚡ Auth Logic Components</h4>
          <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1">
            <li>• <strong>Token Management</strong>: JWT simulation, storage, and validation</li>
            <li>• <strong>Navigation Logic</strong>: Expo Router integration with auth guards</li>
            <li>• <strong>Splash Logic</strong>: Async auth checking with useEffect patterns</li>
            <li>• <strong>Session Management</strong>: Timeout handling and auto-logout</li>
          </ul>
        </div>
      </div>

      {/* JWT Token Simulation */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">JWT Token Simulation</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Let's create a realistic JWT token simulation system that mimics production authentication patterns.
        </p>

        <CodeBlock
          code={`// JWT Token Simulation System
import AsyncStorage from '@react-native-async-storage/async-storage';

// Token structure simulation
const createJWTToken = (payload, expiresIn = 3600) => {
  const header = {
    alg: 'HS256',
    typ: 'JWT'
  };
  
  const now = Math.floor(Date.now() / 1000);
  const tokenPayload = {
    ...payload,
    iat: now, // issued at
    exp: now + expiresIn, // expires in seconds
    iss: 'auth-service', // issuer
    sub: payload.userId || payload.id, // subject
  };
  
  // Simulate JWT structure (header.payload.signature)
  const encodedHeader = btoa(JSON.stringify(header));
  const encodedPayload = btoa(JSON.stringify(tokenPayload));
  const signature = btoa(\`mock-signature-\${Date.now()}\`);
  
  return \`\${encodedHeader}.\${encodedPayload}.\${signature}\`;
};

// Token validation and parsing
const parseJWTToken = (token) => {
  try {
    if (!token || typeof token !== 'string') {
      return null;
    }
    
    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }
    
    const [header, payload, signature] = parts;
    
    const decodedHeader = JSON.parse(atob(header));
    const decodedPayload = JSON.parse(atob(payload));
    
    return {
      header: decodedHeader,
      payload: decodedPayload,
      signature,
      raw: token
    };
  } catch (error) {
    console.error('Token parsing error:', error);
    return null;
  }
};

// Token validation
const validateToken = (token) => {
  const parsed = parseJWTToken(token);
  
  if (!parsed) {
    return { valid: false, reason: 'Invalid token format' };
  }
  
  const now = Math.floor(Date.now() / 1000);
  
  if (parsed.payload.exp < now) {
    return { valid: false, reason: 'Token expired' };
  }
  
  if (parsed.payload.iat > now) {
    return { valid: false, reason: 'Token not yet valid' };
  }
  
  return { valid: true, payload: parsed.payload };
};

// Token storage keys
const TOKEN_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_PROFILE: 'user_profile',
  TOKEN_EXPIRY: 'token_expiry'
};

// Token storage service
class TokenStorageService {
  static async storeTokens(accessToken, refreshToken = null, userProfile = null) {
    try {
      const storage = [
        [TOKEN_KEYS.ACCESS_TOKEN, accessToken],
        [TOKEN_KEYS.TOKEN_EXPIRY, Date.now().toString()]
      ];
      
      if (refreshToken) {
        storage.push([TOKEN_KEYS.REFRESH_TOKEN, refreshToken]);
      }
      
      if (userProfile) {
        storage.push([TOKEN_KEYS.USER_PROFILE, JSON.stringify(userProfile)]);
      }
      
      await AsyncStorage.multiSet(storage);
      return true;
    } catch (error) {
      console.error('Token storage error:', error);
      return false;
    }
  }
  
  static async getAccessToken() {
    try {
      const token = await AsyncStorage.getItem(TOKEN_KEYS.ACCESS_TOKEN);
      
      if (!token) {
        return null;
      }
      
      const validation = validateToken(token);
      
      if (!validation.valid) {
        console.log('Token validation failed:', validation.reason);
        await this.clearTokens();
        return null;
      }
      
      return token;
    } catch (error) {
      console.error('Token retrieval error:', error);
      return null;
    }
  }
  
  static async getUserProfile() {
    try {
      const profileJson = await AsyncStorage.getItem(TOKEN_KEYS.USER_PROFILE);
      return profileJson ? JSON.parse(profileJson) : null;
    } catch (error) {
      console.error('Profile retrieval error:', error);
      return null;
    }
  }
  
  static async clearTokens() {
    try {
      await AsyncStorage.multiRemove([
        TOKEN_KEYS.ACCESS_TOKEN,
        TOKEN_KEYS.REFRESH_TOKEN,
        TOKEN_KEYS.USER_PROFILE,
        TOKEN_KEYS.TOKEN_EXPIRY
      ]);
      return true;
    } catch (error) {
      console.error('Token clearing error:', error);
      return false;
    }
  }
  
  static async refreshTokenIfNeeded() {
    try {
      const token = await AsyncStorage.getItem(TOKEN_KEYS.ACCESS_TOKEN);
      
      if (!token) {
        return { success: false, reason: 'No token found' };
      }
      
      const parsed = parseJWTToken(token);
      
      if (!parsed) {
        return { success: false, reason: 'Invalid token' };
      }
      
      const now = Math.floor(Date.now() / 1000);
      const timeToExpiry = parsed.payload.exp - now;
      
      // Refresh if token expires in less than 5 minutes
      if (timeToExpiry < 300) {
        console.log('Token needs refresh');
        
        // Simulate refresh token API call
        const newToken = createJWTToken({
          userId: parsed.payload.sub,
          email: parsed.payload.email,
          name: parsed.payload.name
        });
        
        await this.storeTokens(newToken);
        
        return { success: true, token: newToken };
      }
      
      return { success: true, token };
    } catch (error) {
      console.error('Token refresh error:', error);
      return { success: false, reason: 'Refresh failed' };
    }
  }
}

export { createJWTToken, parseJWTToken, validateToken, TokenStorageService };`}
          language="javascript"
          filename="services/TokenService.js"
          title="JWT Token Simulation System"
        />

        <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border border-green-200 dark:border-green-800 mt-4">
          <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">✅ Token System Features</h4>
          <ul className="text-green-700 dark:text-green-300 text-sm space-y-1">
            <li>• <strong>JWT Structure</strong> - Realistic header.payload.signature format</li>
            <li>• <strong>Token Validation</strong> - Expiration and format checking</li>
            <li>• <strong>Storage Service</strong> - Secure AsyncStorage integration</li>
            <li>• <strong>Auto-refresh</strong> - Token refresh before expiration</li>
          </ul>
        </div>
      </div>

      {/* Example 1: Basic Auth State Management */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Example 1: Auth State Management</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Let's create a comprehensive authentication state management system using React Context and our token service.
        </p>

        <CodeBlock
          code={`import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { TokenStorageService, createJWTToken, validateToken } from './TokenService';

// Auth context
const AuthContext = createContext({
  isAuthenticated: false,
  user: null,
  loading: true,
  login: async () => {},
  logout: async () => {},
  checkAuthStatus: async () => {},
  refreshToken: async () => {},
});

// Auth provider component
export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Session timeout handling
  const sessionTimeoutRef = useRef(null);
  const lastActivityRef = useRef(Date.now());
  
  // Session timeout duration (15 minutes)
  const SESSION_TIMEOUT = 15 * 60 * 1000;
  
  // Initialize auth state
  useEffect(() => {
    initializeAuth();
    setupActivityTracking();
    
    return () => {
      if (sessionTimeoutRef.current) {
        clearTimeout(sessionTimeoutRef.current);
      }
    };
  }, []);
  
  const initializeAuth = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Check for existing valid token
      const token = await TokenStorageService.getAccessToken();
      
      if (token) {
        const userProfile = await TokenStorageService.getUserProfile();
        
        if (userProfile) {
          setIsAuthenticated(true);
          setUser(userProfile);
          
          // Setup session timeout
          resetSessionTimeout();
          
          console.log('Auth initialized successfully');
        } else {
          await TokenStorageService.clearTokens();
        }
      }
    } catch (error) {
      console.error('Auth initialization error:', error);
      setError('Authentication initialization failed');
      await TokenStorageService.clearTokens();
    } finally {
      setLoading(false);
    }
  };
  
  const login = async (credentials) => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulate login API call
      const response = await fetch('https://reqres.in/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Login failed');
      }
      
      const data = await response.json();
      
      // Create our simulated JWT token
      const userProfile = {
        id: Date.now(),
        email: credentials.email,
        name: credentials.email.split('@')[0],
        avatar: \`https://ui-avatars.com/api/?name=\${credentials.email.split('@')[0]}&background=4f46e5&color=fff\`,
        loginTime: new Date().toISOString(),
      };
      
      const jwtToken = createJWTToken({
        userId: userProfile.id,
        email: userProfile.email,
        name: userProfile.name,
      });
      
      // Store tokens and profile
      await TokenStorageService.storeTokens(jwtToken, data.token, userProfile);
      
      setIsAuthenticated(true);
      setUser(userProfile);
      
      // Setup session timeout
      resetSessionTimeout();
      
      return { success: true, user: userProfile };
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };
  
  const logout = async () => {
    try {
      setLoading(true);
      
      // Clear session timeout
      if (sessionTimeoutRef.current) {
        clearTimeout(sessionTimeoutRef.current);
      }
      
      // Clear stored tokens
      await TokenStorageService.clearTokens();
      
      setIsAuthenticated(false);
      setUser(null);
      setError(null);
      
      console.log('Logout successful');
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      setError('Logout failed');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };
  
  const checkAuthStatus = async () => {
    try {
      const token = await TokenStorageService.getAccessToken();
      
      if (!token) {
        if (isAuthenticated) {
          setIsAuthenticated(false);
          setUser(null);
        }
        return false;
      }
      
      const validation = validateToken(token);
      
      if (!validation.valid) {
        await logout();
        return false;
      }
      
      // Update last activity
      lastActivityRef.current = Date.now();
      resetSessionTimeout();
      
      return true;
    } catch (error) {
      console.error('Auth status check error:', error);
      return false;
    }
  };
  
  const refreshToken = async () => {
    try {
      const result = await TokenStorageService.refreshTokenIfNeeded();
      
      if (result.success) {
        // Update last activity
        lastActivityRef.current = Date.now();
        resetSessionTimeout();
        
        return { success: true };
      } else {
        await logout();
        return { success: false, reason: result.reason };
      }
    } catch (error) {
      console.error('Token refresh error:', error);
      await logout();
      return { success: false, reason: 'Refresh failed' };
    }
  };
  
  const resetSessionTimeout = () => {
    if (sessionTimeoutRef.current) {
      clearTimeout(sessionTimeoutRef.current);
    }
    
    sessionTimeoutRef.current = setTimeout(() => {
      console.log('Session timeout - logging out');
      logout();
    }, SESSION_TIMEOUT);
  };
  
  const setupActivityTracking = () => {
    // Track user activity to reset session timeout
    const handleActivity = () => {
      if (isAuthenticated) {
        lastActivityRef.current = Date.now();
        resetSessionTimeout();
      }
    };
    
    // In a real app, you'd track various user interactions
    // For simulation, we'll just track periodic checks
    const activityInterval = setInterval(() => {
      if (isAuthenticated) {
        const timeSinceActivity = Date.now() - lastActivityRef.current;
        
        if (timeSinceActivity > SESSION_TIMEOUT) {
          console.log('Session timeout due to inactivity');
          logout();
        }
      }
    }, 60000); // Check every minute
    
    return () => clearInterval(activityInterval);
  };
  
  const value = {
    isAuthenticated,
    user,
    loading,
    error,
    login,
    logout,
    checkAuthStatus,
    refreshToken,
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook for using auth context
export function useAuth() {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}

// Auth status component for debugging
export function AuthStatusDebug() {
  const { isAuthenticated, user, loading, error } = useAuth();
  
  if (loading) {
    return <div>Loading auth status...</div>;
  }
  
  return (
    <div style={{ padding: 10, backgroundColor: '#f0f0f0', margin: 10 }}>
      <h3>Auth Status (Debug)</h3>
      <p>Authenticated: {isAuthenticated ? 'Yes' : 'No'}</p>
      <p>User: {user ? user.email : 'None'}</p>
      <p>Error: {error || 'None'}</p>
    </div>
  );
}`}
          language="jsx"
          filename="contexts/AuthContext.jsx"
          title="Authentication State Management"
        />

        <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border border-green-200 dark:border-green-800 mt-4">
          <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">✅ What's New in This Example</h4>
          <ul className="text-green-700 dark:text-green-300 text-sm space-y-1">
            <li>• <strong>Auth Context</strong> - Global authentication state management</li>
            <li>• <strong>Session Timeout</strong> - Automatic logout after inactivity</li>
            <li>• <strong>Token Refresh</strong> - Automatic token refresh before expiration</li>
            <li>• <strong>Error Handling</strong> - Comprehensive error state management</li>
            <li>• <strong>Activity Tracking</strong> - Monitor user activity for session management</li>
          </ul>
        </div>
      </div>

      {/* Example 2: Expo Router Navigation Logic */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Example 2: Expo Router Auth Navigation</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Now let's implement Expo Router integration with protected routes and navigation guards.
        </p>

        <CodeBlock
          code={`import { useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

// Auth guard hook for protected routes
export function useAuthGuard() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const segments = useSegments();
  
  useEffect(() => {
    if (loading) return; // Wait for auth to initialize
    
    const inAuthGroup = segments[0] === '(auth)';
    const inProtectedGroup = segments[0] === '(protected)';
    
    if (!isAuthenticated && inProtectedGroup) {
      // Redirect to auth if not authenticated and trying to access protected route
      router.replace('/auth/login');
    } else if (isAuthenticated && inAuthGroup) {
      // Redirect to home if authenticated and trying to access auth routes
      router.replace('/home');
    }
  }, [isAuthenticated, loading, segments, router]);
  
  return { isAuthenticated, loading };
}

// Protected route wrapper
export function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace('/auth/login');
    }
  }, [isAuthenticated, loading, router]);
  
  if (loading) {
    return (
      <div style={{ 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        padding: 20 
      }}>
        <div>Loading...</div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return null; // Will redirect via useEffect
  }
  
  return children;
}

// Deep linking handler with auth
export function useAuthDeepLink() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  
  const handleDeepLink = (url) => {
    if (loading) return;
    
    try {
      const urlObject = new URL(url);
      const path = urlObject.pathname;
      
      // Check if the deep link requires authentication
      const protectedPaths = ['/profile', '/settings', '/dashboard'];
      const requiresAuth = protectedPaths.some(protectedPath => 
        path.startsWith(protectedPath)
      );
      
      if (requiresAuth && !isAuthenticated) {
        // Store intended destination and redirect to login
        router.replace(\`/auth/login?redirect=\${encodeURIComponent(path)}\`);
      } else if (!requiresAuth || isAuthenticated) {
        // Navigate to the intended destination
        router.replace(path);
      }
    } catch (error) {
      console.error('Deep link handling error:', error);
      // Fallback to home or login
      router.replace(isAuthenticated ? '/home' : '/auth/login');
    }
  };
  
  return { handleDeepLink };
}

// Navigation service for auth-aware navigation
export class AuthNavigationService {
  static router = null;
  
  static setRouter(router) {
    this.router = router;
  }
  
  static async navigateToAuth(screen = 'login') {
    if (this.router) {
      await this.router.replace(\`/auth/\${screen}\`);
    }
  }
  
  static async navigateToProtected(screen = 'home') {
    if (this.router) {
      await this.router.replace(\`/\${screen}\`);
    }
  }
  
  static async navigateWithAuthCheck(path, requiresAuth = true) {
    if (!this.router) return;
    
    const { isAuthenticated } = useAuth();
    
    if (requiresAuth && !isAuthenticated) {
      await this.navigateToAuth('login');
    } else if (!requiresAuth && isAuthenticated) {
      await this.navigateToProtected();
    } else {
      await this.router.replace(path);
    }
  }
}

// Root layout with auth routing
export function RootLayout() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    // Set up navigation service
    AuthNavigationService.setRouter(router);
  }, [router]);
  
  // Auth guard logic
  useAuthGuard();
  
  if (loading) {
    return <SplashScreen />;
  }
  
  return (
    <div style={{ flex: 1 }}>
      {isAuthenticated ? (
        <ProtectedStack />
      ) : (
        <AuthStack />
      )}
    </div>
  );
}

// Auth stack for unauthenticated users
function AuthStack() {
  return (
    <div>
      {/* Auth routes would be rendered here */}
      <div>Auth Stack - Login/Signup</div>
    </div>
  );
}

// Protected stack for authenticated users
function ProtectedStack() {
  return (
    <div>
      {/* Protected routes would be rendered here */}
      <div>Protected Stack - Home/Profile/Settings</div>
    </div>
  );
}

// Splash screen component
function SplashScreen() {
  return (
    <div style={{ 
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center',
      backgroundColor: '#4f46e5',
      color: '#ffffff'
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>⚡</div>
        <h2>Loading...</h2>
        <p>Checking authentication status</p>
      </div>
    </div>
  );
}

// Example usage in app entry point
export default function App() {
  return (
    <AuthProvider>
      <RootLayout />
    </AuthProvider>
  );
}`}
          language="jsx"
          filename="navigation/AuthNavigation.jsx"
          title="Expo Router Auth Navigation"
        />

        <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border border-green-200 dark:border-green-800 mt-4">
          <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">✅ What's New in This Example</h4>
          <ul className="text-green-700 dark:text-green-300 text-sm space-y-1">
            <li>• <strong>Auth Guards</strong> - Automatic route protection based on auth state</li>
            <li>• <strong>Deep Link Handling</strong> - Authentication-aware deep link navigation</li>
            <li>• <strong>Navigation Service</strong> - Centralized auth-aware navigation</li>
            <li>• <strong>Route Segments</strong> - Dynamic routing based on auth status</li>
            <li>• <strong>Protected Routes</strong> - Wrapper component for authenticated content</li>
          </ul>
        </div>
      </div>

      {/* Example 3: Advanced Splash Screen Logic */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Example 3: Advanced Splash Screen with Async Logic</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Let's create a sophisticated splash screen that handles complex authentication checks, token refresh, and smooth transitions.
        </p>

        <CodeBlock
          code={`import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ActivityIndicator, 
  Animated, 
  Dimensions,
  Platform 
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../contexts/AuthContext';
import { TokenStorageService } from '../services/TokenService';

const { width, height } = Dimensions.get('window');

export default function AdvancedSplashScreen() {
  const [loadingStage, setLoadingStage] = useState('initializing');
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  
  const router = useRouter();
  const { checkAuthStatus, refreshToken } = useAuth();
  
  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  
  // Loading stages
  const LOADING_STAGES = {
    INITIALIZING: 'initializing',
    CHECKING_AUTH: 'checking_auth',
    VALIDATING_TOKEN: 'validating_token',
    REFRESHING_TOKEN: 'refreshing_token',
    LOADING_PROFILE: 'loading_profile',
    FINALIZING: 'finalizing',
    NAVIGATING: 'navigating',
    ERROR: 'error'
  };
  
  const STAGE_MESSAGES = {
    [LOADING_STAGES.INITIALIZING]: 'Starting up...',
    [LOADING_STAGES.CHECKING_AUTH]: 'Checking authentication...',
    [LOADING_STAGES.VALIDATING_TOKEN]: 'Validating session...',
    [LOADING_STAGES.REFRESHING_TOKEN]: 'Refreshing credentials...',
    [LOADING_STAGES.LOADING_PROFILE]: 'Loading profile...',
    [LOADING_STAGES.FINALIZING]: 'Almost ready...',
    [LOADING_STAGES.NAVIGATING]: 'Welcome back!',
    [LOADING_STAGES.ERROR]: 'Something went wrong...'
  };
  
  useEffect(() => {
    startSplashSequence();
  }, []);
  
  const startSplashSequence = async () => {
    try {
      // Start entrance animations
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
      
      // Start auth check sequence
      await performAuthCheck();
      
    } catch (error) {
      console.error('Splash sequence error:', error);
      setError('Failed to initialize application');
      setLoadingStage(LOADING_STAGES.ERROR);
    }
  };
  
  const performAuthCheck = async () => {
    const stages = [
      { stage: LOADING_STAGES.INITIALIZING, duration: 500, progress: 10 },
      { stage: LOADING_STAGES.CHECKING_AUTH, duration: 800, progress: 25 },
      { stage: LOADING_STAGES.VALIDATING_TOKEN, duration: 600, progress: 50 },
      { stage: LOADING_STAGES.REFRESHING_TOKEN, duration: 700, progress: 75 },
      { stage: LOADING_STAGES.LOADING_PROFILE, duration: 500, progress: 90 },
      { stage: LOADING_STAGES.FINALIZING, duration: 300, progress: 100 },
    ];
    
    for (const { stage, duration, progress } of stages) {
      setLoadingStage(stage);
      
      // Animate progress
      Animated.timing(progressAnim, {
        toValue: progress,
        duration: duration * 0.8,
        useNativeDriver: false,
      }).start();
      
      // Perform actual auth logic based on stage
      await performStageLogic(stage);
      
      // Wait for stage completion
      await new Promise(resolve => setTimeout(resolve, duration));
    }
    
    // Navigate based on auth result
    await navigateToDestination();
  };
  
  const performStageLogic = async (stage) => {
    switch (stage) {
      case LOADING_STAGES.CHECKING_AUTH:
        // Check if tokens exist
        const hasToken = await TokenStorageService.getAccessToken();
        if (!hasToken) {
          // Skip token-related stages if no token
          setLoadingStage(LOADING_STAGES.FINALIZING);
          setProgress(100);
          return;
        }
        break;
        
      case LOADING_STAGES.VALIDATING_TOKEN:
        // Validate existing token
        const isValid = await checkAuthStatus();
        if (!isValid) {
          setLoadingStage(LOADING_STAGES.FINALIZING);
          setProgress(100);
          return;
        }
        break;
        
      case LOADING_STAGES.REFRESHING_TOKEN:
        // Refresh token if needed
        const refreshResult = await refreshToken();
        if (!refreshResult.success) {
          console.log('Token refresh failed:', refreshResult.reason);
        }
        break;
        
      case LOADING_STAGES.LOADING_PROFILE:
        // Load user profile
        const profile = await TokenStorageService.getUserProfile();
        if (!profile) {
          console.log('No user profile found');
        }
        break;
        
      default:
        // Default stage logic
        break;
    }
  };
  
  const navigateToDestination = async () => {
    setLoadingStage(LOADING_STAGES.NAVIGATING);
    
    // Final navigation delay for smooth transition
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check final auth state
    const isAuthenticated = await checkAuthStatus();
    
    if (isAuthenticated) {
      router.replace('/home');
    } else {
      router.replace('/auth/login');
    }
  };
  
  const retryInitialization = async () => {
    setError(null);
    setLoadingStage(LOADING_STAGES.INITIALIZING);
    setProgress(0);
    
    // Reset animations
    progressAnim.setValue(0);
    
    await performAuthCheck();
  };
  
  const renderLoadingIndicator = () => {
    if (loadingStage === LOADING_STAGES.ERROR) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>⚠️</Text>
          <Text style={styles.errorMessage}>{error}</Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={retryInitialization}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      );
    }
    
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ffffff" />
        <Text style={styles.loadingText}>
          {STAGE_MESSAGES[loadingStage]}
        </Text>
        
        {/* Progress bar */}
        <View style={styles.progressBarContainer}>
          <Animated.View 
            style={[
              styles.progressBar,
              {
                width: progressAnim.interpolate({
                  inputRange: [0, 100],
                  outputRange: ['0%', '100%'],
                  extrapolate: 'clamp',
                }),
              }
            ]}
          />
        </View>
        
        <Text style={styles.progressText}>
          {Math.round(progress)}% Complete
        </Text>
      </View>
    );
  };
  
  return (
    <View style={styles.container}>
      <Animated.View 
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }]
          }
        ]}
      >
        {/* Logo section */}
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>⚡</Text>
          <Text style={styles.appName}>SecureApp</Text>
          <Text style={styles.tagline}>
            Professional Authentication
          </Text>
        </View>
        
        {/* Loading section */}
        {renderLoadingIndicator()}
        
        {/* Debug info (only in development) */}
        {__DEV__ && (
          <View style={styles.debugContainer}>
            <Text style={styles.debugText}>
              Stage: {loadingStage}
            </Text>
            <Text style={styles.debugText}>
              Progress: {Math.round(progress)}%
            </Text>
          </View>
        )}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4f46e5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.8,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  logo: {
    fontSize: 80,
    marginBottom: 20,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: '#e0e7ff',
    textAlign: 'center',
  },
  loadingContainer: {
    alignItems: 'center',
    minHeight: 120,
  },
  loadingText: {
    fontSize: 16,
    color: '#e0e7ff',
    marginTop: 16,
    textAlign: 'center',
  },
  progressBarContainer: {
    width: 200,
    height: 4,
    backgroundColor: '#6366f1',
    borderRadius: 2,
    marginTop: 20,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    color: '#c7d2fe',
    marginTop: 8,
  },
  errorContainer: {
    alignItems: 'center',
    minHeight: 120,
  },
  errorText: {
    fontSize: 48,
    marginBottom: 16,
  },
  errorMessage: {
    fontSize: 16,
    color: '#fecaca',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  retryButtonText: {
    color: '#4f46e5',
    fontSize: 16,
    fontWeight: '600',
  },
  debugContainer: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 8,
  },
  debugText: {
    color: '#ffffff',
    fontSize: 12,
    textAlign: 'center',
  },
});`}
          language="jsx"
          filename="screens/AdvancedSplashScreen.jsx"
          title="Advanced Splash Screen with Async Logic"
        />

        <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border border-green-200 dark:border-green-800 mt-4">
          <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">✅ What's New in This Example</h4>
          <ul className="text-green-700 dark:text-green-300 text-sm space-y-1">
            <li>• <strong>Multi-stage Loading</strong> - Sequential auth checks with progress tracking</li>
            <li>• <strong>Animated Progress</strong> - Visual feedback for each auth stage</li>
            <li>• <strong>Error Recovery</strong> - Retry mechanism for failed auth checks</li>
            <li>• <strong>Debug Mode</strong> - Development-only debug information</li>
            <li>• <strong>Smooth Transitions</strong> - Professional animations between states</li>
          </ul>
        </div>
      </div>

      {/* Auth Logic Architecture */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Complete Auth Logic Flow</h2>
        
        <div className="bg-gray-50 dark:bg-gray-950/20 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
          <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">🔄 Authentication Logic Sequence</h4>
          <div className="text-sm space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-indigo-500 font-mono">1.</span>
              <span className="text-gray-700 dark:text-gray-300">
                <strong>App Launch</strong> - Advanced splash screen with animated progress
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-indigo-500 font-mono">2.</span>
              <span className="text-gray-700 dark:text-gray-300">
                <strong>Token Check</strong> - Validate existing JWT tokens from AsyncStorage
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-indigo-500 font-mono">3.</span>
              <span className="text-gray-700 dark:text-gray-300">
                <strong>Token Refresh</strong> - Automatic refresh if token expires soon
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-indigo-500 font-mono">4.</span>
              <span className="text-gray-700 dark:text-gray-300">
                <strong>Route Guard</strong> - Expo Router navigation based on auth state
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-indigo-500 font-mono">5.</span>
              <span className="text-gray-700 dark:text-gray-300">
                <strong>Session Management</strong> - Activity tracking and timeout handling
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Best Practices */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Auth Logic Best Practices</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-3">🔐 Security Patterns</h4>
            <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1">
              <li>• Store tokens securely in AsyncStorage</li>
              <li>• Implement automatic token refresh</li>
              <li>• Use session timeouts for security</li>
              <li>• Validate tokens before API calls</li>
              <li>• Clear sensitive data on logout</li>
            </ul>
          </div>
          
          <div className="bg-purple-50 dark:bg-purple-950/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
            <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-3">⚡ Performance Tips</h4>
            <ul className="text-purple-700 dark:text-purple-300 text-sm space-y-1">
              <li>• Cache auth state to reduce API calls</li>
              <li>• Use optimistic updates for better UX</li>
              <li>• Implement proper loading states</li>
              <li>• Batch auth-related operations</li>
              <li>• Use native animations for smooth transitions</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Integration Guide */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Integration with Session 1</h2>
        
        <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
          <h4 className="font-semibold text-green-800 dark:text-green-200 mb-3">🔗 Combining UI and Logic</h4>
          <div className="text-green-700 dark:text-green-300 text-sm space-y-2">
            <div>
              <strong>Session 1 (UI):</strong> Login/Signup screens, form validation, API integration
            </div>
            <div>
              <strong>Session 2 (Logic):</strong> Token management, navigation guards, session handling
            </div>
            <div>
              <strong>Combined Result:</strong> Complete authentication system with professional UI and robust logic
            </div>
          </div>
        </div>
      </div>

      {/* Hands-On Exercise */}
      <div className="bg-orange-50 dark:bg-orange-950/20 p-6 rounded-xl border border-orange-200 dark:border-orange-800">
        <h3 className="text-lg font-semibold text-orange-900 dark:text-orange-100 mb-4">
          🎯 Hands-On Exercise: Complete Auth System
        </h3>
        
        <div className="text-orange-800 dark:text-orange-200 space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Challenge: Integrate UI and Logic</h4>
            <p className="text-sm">
              Combine the auth UI from Session 1 with the logic patterns from Session 2 to create a complete authentication system.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">Requirements:</h4>
            <ul className="text-sm space-y-1">
              <li>• Advanced splash screen with multi-stage loading</li>
              <li>• JWT token simulation and validation</li>
              <li>• Protected routes with Expo Router</li>
              <li>• Session management with timeout</li>
              <li>• Automatic token refresh</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">Bonus Features:</h4>
            <ul className="text-sm space-y-1">
              <li>• Biometric authentication integration</li>
              <li>• Offline mode detection</li>
              <li>• Push notification token handling</li>
              <li>• Social login with deep linking</li>
              <li>• Admin role-based access control</li>
            </ul>
          </div>
        </div>
      </div>

        <div className="bg-green-50 dark:bg-green-950 p-6 rounded-lg border border-green-200 dark:border-green-800">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-3 mt-0">
            🎉 Session 2 Complete!
          </h4>
          <p className="text-green-700 dark:text-green-300 mb-3">
            You've mastered authentication logic with JWT tokens, state management, Expo Router navigation, 
            and multi-stage splash screens. These patterns enable sophisticated auth flows.
          </p>
          <p className="text-green-700 dark:text-green-300 mb-0">
            <strong>Next:</strong> Session 3 will focus on navigation guards, protected routes, 
            and role-based access control for secure app architecture.
          </p>
        </div>
    </div>
  );
}