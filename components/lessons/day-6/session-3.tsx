"use client";

import { CodeBlock } from "@/components/ui/code-block-new";

export function Day6Session3Content() {
  return (
    <>
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">
            Deep Linking - Session 3
          </h1>

          <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg border border-blue-200 dark:border-blue-800 mb-8">
            <h3 className="text-blue-800 dark:text-blue-200 font-semibold mb-4 mt-0">
              🔗 Session Overview
            </h3>
            <ul className="text-blue-700 dark:text-blue-300 space-y-2 mb-0">
              <li>
                <strong>Add Scheme to app.json</strong> - Configure custom URL schemes for your app
              </li>
              <li>
                <strong>expo-linking Setup</strong> - Implement deep linking with Expo Router integration
              </li>
              <li>
                <strong>Test Links</strong> - Validate deep linking through browser, QR codes, and other apps
              </li>
              <li>
                <strong>URL Structure Design</strong> - Create intuitive and secure deep link patterns
              </li>
              <li>
                <strong>Authentication Integration</strong> - Handle auth flows with deep linking
              </li>
              <li>
                <strong>Universal Links & App Links</strong> - Set up seamless web-to-app transitions
              </li>
            </ul>
          </div>
        </div>

        <h2>1. Understanding Deep Linking</h2>

        <h3>From Web to Mobile Navigation</h3>
        <p>
          Deep linking allows users to navigate directly to specific screens in your app from external sources. 
          Think of it as bookmarks for mobile apps - users can jump directly to content without manual navigation.
        </p>

        <div className="my-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
          <h4 className="text-blue-800 dark:text-blue-200 font-semibold mb-2 mt-0">
            🎯 Deep Linking Use Cases:
          </h4>
          <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1 mb-0">
            <li>
              <strong>Social Sharing:</strong> Share specific content or screens with friends
            </li>
            <li>
              <strong>Email Marketing:</strong> Direct users to promotions or specific features
            </li>
            <li>
              <strong>Push Notifications:</strong> Take users to relevant content from notifications
            </li>
            <li>
              <strong>Cross-Platform Integration:</strong> Link between web and mobile apps
            </li>
            <li>
              <strong>Authentication Flows:</strong> Handle OAuth redirects and magic links
            </li>
          </ul>
        </div>

        <h2>2. Adding Scheme to app.json</h2>
        <p>
          Your app needs a unique URL scheme to handle deep links. This scheme acts as your app's 
          address on the device, similar to how websites have domain names.
        </p>

        <CodeBlock
          code={`{
  "expo": {
    "name": "MyApp",
    "slug": "my-app",
    "scheme": "myapp",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.yourcompany.myapp",
      "associatedDomains": [
        "applinks:myapp.com",
        "applinks:www.myapp.com"
      ]
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#FFFFFF"
      },
      "package": "com.yourcompany.myapp",
      "intentFilters": [
        {
          "action": "VIEW",
          "data": [
            {
              "scheme": "https",
              "host": "myapp.com"
            },
            {
              "scheme": "https", 
              "host": "www.myapp.com"
            }
          ],
          "category": [
            "BROWSABLE",
            "DEFAULT"
          ]
        }
      ]
    },
    "web": {
      "favicon": "./assets/favicon.png"
    }
  }
}`}
          language="json"
          filename="app.json"
          title="Deep Linking Configuration"
        />

        <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800 my-6">
          <h4 className="text-yellow-800 dark:text-yellow-200 font-semibold mb-2 mt-0">
            🔧 Scheme Configuration Tips
          </h4>
          <div className="text-yellow-700 dark:text-yellow-300 text-sm space-y-2">
            <div><strong>Unique Schemes:</strong> Choose schemes that won't conflict with other apps</div>
            <div><strong>Lowercase Only:</strong> Always use lowercase letters for scheme names</div>
            <div><strong>No Special Characters:</strong> Avoid spaces, dots, or special characters</div>
            <div><strong>Brand Consistency:</strong> Use your app name or brand for easy recognition</div>
          </div>
        </div>

        <h3>URL Scheme Examples</h3>
        <CodeBlock
          code={`# Basic scheme examples:
myapp://home
myapp://profile/123
myapp://product/abc-def
myapp://auth/login

# With parameters:
myapp://search?query=react+native
myapp://user/456?tab=posts
myapp://share?url=https://example.com&title=Article

# Nested navigation:
myapp://tabs/shop/category/electronics
myapp://stack/settings/account/privacy

# Authentication flows:
myapp://auth/callback?token=xyz123
myapp://reset-password?email=user@example.com&code=123456`}
          language="text"
          filename="url-schemes.txt"
          title="Deep Link URL Examples"
        />

        <h2>3. expo-linking Setup</h2>
        <p>
          The expo-linking library provides APIs to handle incoming links and create outgoing links. 
          It integrates seamlessly with Expo Router for navigation.
        </p>

        <h3>Installation and Basic Setup</h3>
        <CodeBlock
          code={`# Install expo-linking (usually included with Expo)
npx expo install expo-linking

# Check if already installed
npm list expo-linking

# For bare React Native projects
npm install expo-linking
npx expo install --fix`}
          language="bash"
          filename="terminal"
          title="Installing expo-linking"
        />

        <h3>Basic Linking Implementation</h3>
        <CodeBlock
          code={`import * as Linking from 'expo-linking';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function App() {
  const router = useRouter();

  useEffect(() => {
    // Handle initial URL when app is opened from link
    const getInitialURL = async () => {
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl) {
        handleDeepLink(initialUrl);
      }
    };

    // Handle URLs when app is already open
    const subscription = Linking.addEventListener('url', (event) => {
      handleDeepLink(event.url);
    });

    getInitialURL();

    return () => subscription?.remove();
  }, []);

  const handleDeepLink = (url: string) => {
    console.log('Deep link received:', url);
    
    // Parse the URL
    const parsed = Linking.parse(url);
    console.log('Parsed URL:', parsed);
    
    // Navigate based on the URL
    if (parsed.path) {
      router.push(parsed.path as any);
    }
  };

  return (
    // Your app content
  );
}`}
          language="typescript"
          filename="App.tsx"
          title="Basic Deep Linking Setup"
        />

        <h3>Advanced URL Parsing</h3>
        <CodeBlock
          code={`import * as Linking from 'expo-linking';

// Configure URL parsing with your app's structure
const linking = {
  prefixes: [
    'myapp://',
    'https://myapp.com',
    'https://www.myapp.com'
  ],
  config: {
    screens: {
      Home: '',
      Profile: 'profile/:id',
      Product: 'product/:productId',
      Search: 'search',
      Auth: {
        screens: {
          Login: 'auth/login',
          Register: 'auth/register',
          Callback: 'auth/callback',
        }
      },
      Tabs: {
        screens: {
          Shop: 'shop',
          Cart: 'cart',
          Account: 'account'
        }
      }
    }
  }
};

// Create URLs programmatically
const createDeepLink = (screen: string, params?: any) => {
  return Linking.createURL(screen, params);
};

// Usage examples:
const profileLink = createDeepLink('profile/123');
// Result: myapp://profile/123

const searchLink = createDeepLink('search', { query: 'react native' });
// Result: myapp://search?query=react%20native

// Parse incoming URLs
const parseIncomingURL = (url: string) => {
  const parsed = Linking.parse(url);
  return {
    scheme: parsed.scheme,
    hostname: parsed.hostname,
    path: parsed.path,
    queryParams: parsed.queryParams
  };
};`}
          language="typescript"
          filename="linking-config.ts"
          title="Advanced URL Configuration"
        />

        <h2>4. Expo Router Integration</h2>
        <p>
          Expo Router provides built-in deep linking support that automatically maps URLs to your file-based routing structure.
        </p>

        <CodeBlock
          code={`// app/_layout.tsx - Root layout with linking configuration
import { Stack } from 'expo-router';
import * as Linking from 'expo-linking';

const linking = {
  prefixes: [Linking.createURL('/'), 'myapp://', 'https://myapp.com'],
  config: {
    screens: {
      '(tabs)': {
        screens: {
          index: '',
          shop: 'shop',
          profile: 'profile'
        }
      },
      'product/[id]': 'product/:id',
      'user/[userId]': 'user/:userId',
      'auth/login': 'auth/login',
      'auth/callback': 'auth/callback'
    }
  }
};

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="product/[id]" />
      <Stack.Screen name="user/[userId]" />
      <Stack.Screen name="auth/login" />
      <Stack.Screen name="auth/callback" />
    </Stack>
  );
}`}
          language="typescript"
          filename="app/_layout.tsx"
          title="Expo Router Deep Linking"
        />

        <h3>Dynamic Route Handling</h3>
        <CodeBlock
          code={`// app/product/[id].tsx - Dynamic product page
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

export default function ProductPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadProduct(id);
    }
  }, [id]);

  const loadProduct = async (productId: string) => {
    try {
      // Simulate API call
      const response = await fetch(\`/api/products/\${productId}\`);
      const productData = await response.json();
      
      if (response.ok) {
        setProduct(productData);
      } else {
        // Handle product not found
        router.replace('/404?type=product&id=' + productId);
      }
    } catch (error) {
      console.error('Error loading product:', error);
      router.replace('/error');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
        <Text>Loading product...</Text>
      </View>
    );
  }

  if (!product) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Product not found</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>Product: {product.name}</Text>
      <Text>ID: {id}</Text>
      {/* Product details */}
    </View>
  );
}`}
          language="typescript"
          filename="app/product/[id].tsx"
          title="Dynamic Route with Deep Linking"
        />

        <h2>5. Testing Deep Links</h2>
        <p>
          Testing deep links thoroughly ensures they work correctly across different scenarios and platforms.
        </p>

        <h3>Browser Testing</h3>
        <CodeBlock
          code={`# Test links in browser (for development)
# These will open your development app

# Basic navigation
myapp://home
myapp://profile/123
myapp://search?query=test

# With parameters
myapp://product/abc-123?color=red&size=large
myapp://user/456?tab=posts&filter=recent

# Authentication flows
myapp://auth/callback?token=xyz123&user_id=789

# Testing with development server
exp://192.168.1.100:19000/--/profile/123

# Testing universal links (requires HTTPS setup)
https://myapp.com/product/abc-123
https://www.myapp.com/user/456`}
          language="text"
          filename="browser-testing.txt"
          title="Browser Deep Link Testing"
        />

        <h3>QR Code Testing</h3>
        <CodeBlock
          code={`import * as Linking from 'expo-linking';
import { QRCode } from 'react-native-qrcode-svg';
import { View, Text, Button } from 'react-native';

export default function QRTestScreen() {
  const testLinks = [
    'myapp://home',
    'myapp://profile/123',
    'myapp://product/abc-123',
    'myapp://search?query=react+native'
  ];

  const generateQRCode = (url: string) => {
    return (
      <View style={{ margin: 20, alignItems: 'center' }}>
        <Text style={{ marginBottom: 10 }}>{url}</Text>
        <QRCode
          value={url}
          size={200}
          backgroundColor="white"
          color="black"
        />
        <Button
          title="Test Link"
          onPress={() => Linking.openURL(url)}
        />
      </View>
    );
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>
        Deep Link QR Code Testing
      </Text>
      {testLinks.map((link, index) => (
        <View key={index}>
          {generateQRCode(link)}
        </View>
      ))}
    </View>
  );
}`}
          language="typescript"
          filename="QRTestScreen.tsx"
          title="QR Code Testing Component"
        />

        <h3>Device Testing Methods</h3>
        <div className="grid md:grid-cols-2 gap-4 my-6">
          <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg border">
            <h4 className="font-semibold mb-2 mt-0">📱 iOS Testing:</h4>
            <div className="text-sm space-y-1">
              <div>• Safari browser URL bar</div>
              <div>• Notes app with clickable links</div>
              <div>• Messages app link sharing</div>
              <div>• QR code scanning with Camera app</div>
              <div>• Simulator Device > Device > Open URL</div>
            </div>
          </div>
          
          <div className="p-4 bg-green-50 dark:bg-green-900 rounded-lg border">
            <h4 className="font-semibold mb-2 mt-0">🤖 Android Testing:</h4>
            <div className="text-sm space-y-1">
              <div>• Chrome browser address bar</div>
              <div>• Any text app with link detection</div>
              <div>• ADB command: adb shell am start</div>
              <div>• QR code apps or Google Lens</div>
              <div>• Intent testing with am start command</div>
            </div>
          </div>
        </div>

        <h3>ADB Testing Commands</h3>
        <CodeBlock
          code={`# Android ADB commands for testing deep links

# Basic link testing
adb shell am start \\
  -W -a android.intent.action.VIEW \\
  -d "myapp://home" \\
  com.yourcompany.myapp

# Link with parameters
adb shell am start \\
  -W -a android.intent.action.VIEW \\
  -d "myapp://product/123?color=red" \\
  com.yourcompany.myapp

# Universal link testing
adb shell am start \\
  -W -a android.intent.action.VIEW \\
  -d "https://myapp.com/product/123" \\
  com.yourcompany.myapp

# Test intent filters
adb shell am start \\
  -a android.intent.action.VIEW \\
  -c android.intent.category.BROWSABLE \\
  -d "myapp://search?query=test"

# Check if app handles the intent
adb shell pm query-activities \\
  -a android.intent.action.VIEW \\
  -d "myapp://home"`}
          language="bash"
          filename="adb-testing.sh"
          title="ADB Deep Link Testing"
        />

        <h2>6. Authentication Deep Linking</h2>
        <p>
          Deep linking is crucial for authentication flows, especially OAuth redirects and magic link login.
        </p>

        <CodeBlock
          code={`// Authentication deep link handler
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function AuthCallbackScreen() {
  const router = useRouter();

  useEffect(() => {
    const handleAuthCallback = async () => {
      // Get the URL that opened the app
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl) {
        processAuthCallback(initialUrl);
      }

      // Listen for URLs while app is open
      const subscription = Linking.addEventListener('url', (event) => {
        processAuthCallback(event.url);
      });

      return () => subscription?.remove();
    };

    handleAuthCallback();
  }, []);

  const processAuthCallback = async (url: string) => {
    try {
      const parsed = Linking.parse(url);
      const { queryParams } = parsed;

      if (queryParams?.token && queryParams?.user_id) {
        // Store authentication token
        await AsyncStorage.setItem('auth_token', queryParams.token as string);
        await AsyncStorage.setItem('user_id', queryParams.user_id as string);
        
        // Navigate to home screen
        router.replace('/(tabs)/home');
      } else if (queryParams?.error) {
        // Handle authentication error
        console.error('Auth error:', queryParams.error);
        router.replace('/auth/login?error=auth_failed');
      }
    } catch (error) {
      console.error('Error processing auth callback:', error);
      router.replace('/auth/login?error=callback_failed');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
      <Text>Processing authentication...</Text>
    </View>
  );
}

// OAuth login function
export const startOAuthLogin = async () => {
  const redirectUrl = Linking.createURL('auth/callback');
  const authUrl = \`https://oauth-provider.com/auth?redirect_uri=\${encodeURIComponent(redirectUrl)}&response_type=code&client_id=your-client-id\`;
  
  const result = await WebBrowser.openAuthSessionAsync(authUrl, redirectUrl);
  
  if (result.type === 'success') {
    // The callback will be handled by the deep link listener
    console.log('OAuth flow completed');
  }
};`}
          language="typescript"
          filename="auth-deep-linking.tsx"
          title="Authentication Deep Linking"
        />

        <h2>7. Universal Links and App Links</h2>
        <p>
          Universal Links (iOS) and App Links (Android) provide seamless transitions from web to app 
          without showing browser redirects.
        </p>

        <h3>iOS Universal Links Setup</h3>
        <CodeBlock
          code={`// 1. Add associated domains to app.json
{
  "expo": {
    "ios": {
      "associatedDomains": [
        "applinks:myapp.com",
        "applinks:www.myapp.com"
      ]
    }
  }
}

// 2. Create apple-app-site-association file (serve from your website)
// Place at: https://myapp.com/.well-known/apple-app-site-association
{
  "applinks": {
    "apps": [],
    "details": [
      {
        "appID": "TEAMID.com.yourcompany.myapp",
        "paths": [
          "/product/*",
          "/user/*",
          "/auth/*",
          "NOT /api/*"
        ]
      }
    ]
  }
}

// 3. Test universal links
// These URLs will open your app instead of Safari:
// https://myapp.com/product/123
// https://myapp.com/user/456
// https://myapp.com/auth/login`}
          language="json"
          filename="universal-links.json"
          title="iOS Universal Links Configuration"
        />

        <h3>Android App Links Setup</h3>
        <CodeBlock
          code={`// 1. Add intent filters to app.json
{
  "expo": {
    "android": {
      "intentFilters": [
        {
          "action": "VIEW",
          "autoVerify": true,
          "data": [
            {
              "scheme": "https",
              "host": "myapp.com"
            }
          ],
          "category": [
            "BROWSABLE",
            "DEFAULT"
          ]
        }
      ]
    }
  }
}

// 2. Create assetlinks.json file (serve from your website)
// Place at: https://myapp.com/.well-known/assetlinks.json
[{
  "relation": ["delegate_permission/common.handle_all_urls"],
  "target": {
    "namespace": "android_app",
    "package_name": "com.yourcompany.myapp",
    "sha256_cert_fingerprints": ["YOUR_APP_SHA256_FINGERPRINT"]
  }
}]

// 3. Get your app's SHA256 fingerprint
// keytool -list -v -keystore path/to/keystore.jks -alias your-alias
// or for debug builds:
// keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey`}
          language="json"
          filename="app-links.json"
          title="Android App Links Configuration"
        />

        <h2>8. Hands-On Exercise: Complete Deep Linking Implementation</h2>
        <p>
          Let's build a comprehensive deep linking system with authentication, product browsing, 
          and social sharing capabilities.
        </p>

        <div className="bg-orange-50 dark:bg-orange-950 p-6 rounded-lg border border-orange-200 dark:border-orange-800 my-6">
          <h4 className="text-orange-800 dark:text-orange-200 font-semibold mb-3 mt-0">
            🎯 Exercise: E-commerce Deep Linking System
          </h4>
          <div className="text-orange-700 dark:text-orange-300 space-y-3">
            <div>
              <strong>Phase 1:</strong> Basic Deep Linking Setup
              <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                <li>Configure app scheme and universal links</li>
                <li>Set up Expo Router with deep linking</li>
                <li>Create dynamic routes for products and users</li>
                <li>Test basic navigation with QR codes</li>
              </ul>
            </div>
            
            <div>
              <strong>Phase 2:</strong> Authentication Integration
              <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                <li>Implement OAuth callback handling</li>
                <li>Create magic link login system</li>
                <li>Handle authentication errors gracefully</li>
                <li>Test auth flows on real devices</li>
              </ul>
            </div>

            <div>
              <strong>Phase 3:</strong> Advanced Features
              <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                <li>Add social sharing with deep links</li>
                <li>Implement referral link tracking</li>
                <li>Create QR code generation for products</li>
                <li>Set up analytics for link engagement</li>
              </ul>
            </div>
          </div>
        </div>

        <CodeBlock
          code={`// Complete deep linking implementation
// app/_layout.tsx
import { Stack } from 'expo-router';
import * as Linking from 'expo-linking';
import { useEffect } from 'react';
import { AuthProvider } from '../contexts/AuthContext';

export default function RootLayout() {
  useEffect(() => {
    const subscription = Linking.addEventListener('url', handleDeepLink);
    return () => subscription?.remove();
  }, []);

  const handleDeepLink = (event: { url: string }) => {
    console.log('Deep link received:', event.url);
    // Analytics tracking
    trackLinkEngagement(event.url);
  };

  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="product/[id]" />
        <Stack.Screen name="user/[id]" />
        <Stack.Screen name="auth/login" />
        <Stack.Screen name="auth/callback" />
        <Stack.Screen name="share/[type]/[id]" />
      </Stack>
    </AuthProvider>
  );
}

// utils/linking.ts
export const createShareLink = (type: 'product' | 'user', id: string) => {
  const baseUrl = 'https://myapp.com';
  return \`\${baseUrl}/\${type}/\${id}?ref=share\`;
};

export const createReferralLink = (userId: string) => {
  return \`https://myapp.com/signup?ref=\${userId}\`;
};

export const generateQRCode = (url: string) => {
  return \`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=\${encodeURIComponent(url)}\`;
};`}
          language="typescript"
          filename="deep-linking-system.tsx"
          title="Complete Deep Linking System"
        />

        <h2>9. Analytics and Monitoring</h2>
        <p>
          Track deep link performance and user engagement to optimize your linking strategy.
        </p>

        <CodeBlock
          code={`// Deep link analytics implementation
import * as Analytics from 'expo-analytics';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class DeepLinkAnalytics {
  static async trackLinkOpen(url: string, source?: string) {
    const parsed = Linking.parse(url);
    
    await Analytics.track('deep_link_opened', {
      url,
      path: parsed.path,
      source: source || 'unknown',
      timestamp: new Date().toISOString(),
      queryParams: parsed.queryParams
    });

    // Store for offline analytics
    const linkData = {
      url,
      openedAt: Date.now(),
      source
    };
    
    const existingData = await AsyncStorage.getItem('link_analytics');
    const analytics = existingData ? JSON.parse(existingData) : [];
    analytics.push(linkData);
    
    await AsyncStorage.setItem('link_analytics', JSON.stringify(analytics));
  }

  static async trackConversion(linkUrl: string, conversionType: string) {
    await Analytics.track('deep_link_conversion', {
      originalUrl: linkUrl,
      conversionType,
      timestamp: new Date().toISOString()
    });
  }

  static async getAnalytics() {
    const data = await AsyncStorage.getItem('link_analytics');
    return data ? JSON.parse(data) : [];
  }
}`}
          language="typescript"
          filename="deep-link-analytics.ts"
          title="Deep Link Analytics"
        />

        <div className="bg-green-50 dark:bg-green-950 p-6 rounded-lg border border-green-200 dark:border-green-800">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-3 mt-0">
            🎉 Session 3 Complete!
          </h4>
          <p className="text-green-700 dark:text-green-300 mb-3">
            You've implemented comprehensive deep linking with custom schemes, universal links, 
            authentication integration, and testing strategies. Users can now navigate directly to your app content.
          </p>
          <p className="text-green-700 dark:text-green-300 mb-0">
            <strong>Next:</strong> Session 4 will cover error boundaries, graceful error handling, 
            and building robust fallback systems for production apps.
          </p>
        </div>
      </div>
    </>
  );
}