"use client";

import { CodeBlock } from "@/components/ui/code-block-new";

export function Day7Session3Content() {
  return (
    <>
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">
            Debugging - Session 3
          </h1>

          <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg border border-blue-200 dark:border-blue-800 mb-8">
            <h3 className="text-blue-800 dark:text-blue-200 font-semibold mb-4 mt-0">
              🔍 Session Overview
            </h3>
            <ul className="text-blue-700 dark:text-blue-300 space-y-2 mb-0">
              <li>
                <strong>Logs and Console Debugging</strong> - Master console logging patterns and debug output strategies
              </li>
              <li>
                <strong>React Native Debugger</strong> - Use the powerful standalone debugging tool for React Native apps
              </li>
              <li>
                <strong>Network Request Debugging</strong> - Monitor and debug API calls, responses, and network issues
              </li>
              <li>
                <strong>AsyncStorage Debugging</strong> - Inspect and debug local storage data and persistence issues
              </li>
              <li>
                <strong>Dev Menu and Tools</strong> - Navigate development menus and use built-in debugging features
              </li>
              <li>
                <strong>Breakpoint Debugging</strong> - Set and use breakpoints for step-by-step code inspection
              </li>
            </ul>
          </div>
        </div>

        <h2>1. Console Logging and Debug Strategies</h2>

        <h3>Effective Console Logging Patterns</h3>
        <p>
          Strategic console logging is your first line of defense in debugging React Native applications. 
          Well-structured logs provide insights into app flow, data transformations, and error conditions.
        </p>

        <CodeBlock
          code={`// Enhanced logging utility
class DebugLogger {
  static isEnabled = __DEV__;
  
  static log(tag: string, message: any, data?: any) {
    if (!this.isEnabled) return;
    
    const timestamp = new Date().toISOString().slice(11, 23);
    console.log(\`[\${timestamp}] 🔍 \${tag}: \${message}\`, data || '');
  }
  
  static error(tag: string, error: any, context?: any) {
    if (!this.isEnabled) return;
    
    console.error(\`🚨 \${tag}:\`, error);
    if (context) console.error('Context:', context);
    if (error.stack) console.error('Stack:', error.stack);
  }
  
  static network(method: string, url: string, data?: any) {
    if (!this.isEnabled) return;
    
    console.log(\`🌐 \${method} \${url}\`, data);
  }
  
  static performance(label: string, startTime: number) {
    if (!this.isEnabled) return;
    
    const duration = Date.now() - startTime;
    console.log(\`⚡ \${label}: \${duration}ms\`);
  }
  
  static state(component: string, state: any) {
    if (!this.isEnabled) return;
    
    console.log(\`📊 \${component} state:\`, JSON.stringify(state, null, 2));
  }
}

// Usage examples
export default function ProductScreen({ productId }: { productId: string }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const startTime = Date.now();
    DebugLogger.log('ProductScreen', 'Component mounting', { productId });
    
    fetchProduct(productId)
      .then((data) => {
        DebugLogger.performance('Product fetch', startTime);
        setProduct(data);
        DebugLogger.state('ProductScreen', { product: data, loading: false });
      })
      .catch((error) => {
        DebugLogger.error('ProductScreen', error, { productId });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [productId]);
  
  return (
    <View>
      {loading ? <Text>Loading...</Text> : <ProductDetails product={product} />}
    </View>
  );
}`}
          language="typescript"
          filename="utils/debug-logger.ts"
          title="Enhanced Debug Logging System"
        />

        <h3>Component Lifecycle Debugging</h3>
        <CodeBlock
          code={`// Debug hook for component lifecycle
import { useEffect, useRef } from 'react';

export function useDebugLifecycle(componentName: string, props?: any) {
  const renderCount = useRef(0);
  const prevProps = useRef(props);
  
  // Track renders
  renderCount.current++;
  
  // Mount
  useEffect(() => {
    DebugLogger.log(\`\${componentName}\`, 'Component mounted', { 
      renderCount: renderCount.current,
      props 
    });
    
    return () => {
      DebugLogger.log(\`\${componentName}\`, 'Component unmounting');
    };
  }, []);
  
  // Props changes
  useEffect(() => {
    if (prevProps.current !== props) {
      DebugLogger.log(\`\${componentName}\`, 'Props changed', {
        previous: prevProps.current,
        current: props
      });
      prevProps.current = props;
    }
  });
  
  // Render tracking
  useEffect(() => {
    DebugLogger.log(\`\${componentName}\`, \`Render #\${renderCount.current}\`);
  });
}

// Usage in components
export default function UserProfile({ userId }: { userId: string }) {
  useDebugLifecycle('UserProfile', { userId });
  
  const [user, setUser] = useState(null);
  
  // Component logic...
  
  return <View>{/* Component JSX */}</View>;
}`}
          language="typescript"
          filename="hooks/use-debug-lifecycle.ts"
          title="Component Lifecycle Debugging Hook"
        />

        <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800 my-6">
          <h4 className="text-yellow-800 dark:text-yellow-200 font-semibold mb-2 mt-0">
            💡 Logging Best Practices
          </h4>
          <div className="text-yellow-700 dark:text-yellow-300 text-sm space-y-2">
            <div><strong>Use Consistent Tags:</strong> Organize logs with clear component/feature tags</div>
            <div><strong>Include Context:</strong> Always log relevant data and state information</div>
            <div><strong>Performance Timing:</strong> Track slow operations and rendering performance</div>
            <div><strong>Error Context:</strong> Include stack traces and relevant state when logging errors</div>
            <div><strong>Production Safety:</strong> Use __DEV__ checks to prevent production console spam</div>
          </div>
        </div>

        <h2>2. React Native Debugger Setup and Usage</h2>
        <p>
          React Native Debugger is a standalone app that includes React DevTools, Redux DevTools, 
          and Chrome DevTools for comprehensive debugging capabilities.
        </p>

        <h3>Installation and Setup</h3>
        <CodeBlock
          code={`# Install React Native Debugger (standalone app)
# Download from: https://github.com/jhen0409/react-native-debugger/releases

# macOS Installation
brew install --cask react-native-debugger

# Windows Installation  
# Download and install the .exe from GitHub releases

# Linux Installation
# Download AppImage from GitHub releases

# Configure default port (19000 for Expo, 8081 for React Native CLI)
# In React Native Debugger: 
# File > New Window > Set port to 19000 (Expo) or 8081 (React Native CLI)

# Enable debugging in your app
# Expo: Shake device > "Debug with Chrome" or Cmd+D
# React Native CLI: Shake device > "Debug" or Cmd+D`}
          language="bash"
          filename="debugger-setup.sh"
          title="React Native Debugger Installation"
        />

        <h3>Debugger Features and Navigation</h3>
        <CodeBlock
          code={`// Enable Redux DevTools in your app
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk)
    // other store enhancers if any
  )
);

// React DevTools integration - automatic with React Native Debugger

// Network inspection setup
import './utils/network-logger'; // Setup XHR interception

// Component debugging with React DevTools
export default function App() {
  // Components automatically show in React DevTools
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}

// Console commands available in debugger
// $r - currently selected React component
// $s - component state
// $p - component props

// Example debugger usage:
function UserComponent({ userId }) {
  const [user, setUser] = useState(null);
  
  // This will be visible in React DevTools
  useEffect(() => {
    // Set breakpoint here in Sources tab
    fetchUser(userId).then(setUser);
  }, [userId]);
  
  // State changes visible in React DevTools
  const handleUpdate = () => {
    setUser(prev => ({ ...prev, lastUpdated: Date.now() }));
  };
  
  return (
    <View>
      <Text>{user?.name}</Text>
      <Button onPress={handleUpdate} title="Update" />
    </View>
  );
}`}
          language="typescript"
          filename="app-with-debugger.tsx"
          title="React Native Debugger Integration"
        />

        <div className="grid md:grid-cols-2 gap-4 my-6">
          <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg border">
            <h4 className="font-semibold mb-2 mt-0">🔧 Debugger Features:</h4>
            <div className="text-sm space-y-1">
              <div>• React DevTools - component tree inspection</div>
              <div>• Redux DevTools - state management debugging</div>
              <div>• Chrome DevTools - console, sources, network</div>
              <div>• Breakpoint debugging with step-through</div>
              <div>• Live component state editing</div>
            </div>
          </div>
          
          <div className="p-4 bg-green-50 dark:bg-green-900 rounded-lg border">
            <h4 className="font-semibold mb-2 mt-0">⚡ Debugger Shortcuts:</h4>
            <div className="text-sm space-y-1">
              <div>• Cmd+R - Reload app</div>
              <div>• Cmd+D - Open dev menu</div>
              <div>• F8 - Resume/pause execution</div>
              <div>• F10 - Step over function calls</div>
              <div>• F11 - Step into function calls</div>
            </div>
          </div>
        </div>

        <h2>3. Network Request Debugging</h2>
        <p>
          Monitor and debug API calls, track request/response cycles, and identify network-related issues 
          in your React Native application.
        </p>

        <h3>Network Logger Implementation</h3>
        <CodeBlock
          code={`// Network debugging utility
class NetworkDebugger {
  static isEnabled = __DEV__;
  
  static setupXHRInterceptor() {
    if (!this.isEnabled) return;
    
    const originalXHROpen = XMLHttpRequest.prototype.open;
    const originalXHRSend = XMLHttpRequest.prototype.send;
    
    XMLHttpRequest.prototype.open = function(method, url, ...args) {
      this._debugInfo = { method, url, startTime: Date.now() };
      console.log(\`🌐 [\${method}] Starting: \${url}\`);
      return originalXHROpen.apply(this, [method, url, ...args]);
    };
    
    XMLHttpRequest.prototype.send = function(body) {
      const debugInfo = this._debugInfo;
      
      if (body) {
        console.log(\`📤 Request body:\`, body);
      }
      
      this.addEventListener('load', function() {
        const duration = Date.now() - debugInfo.startTime;
        console.log(\`✅ [\${debugInfo.method}] \${this.status} \${debugInfo.url} (\${duration}ms)\`);
        
        try {
          const response = JSON.parse(this.responseText);
          console.log(\`📥 Response:\`, response);
        } catch (e) {
          console.log(\`📥 Response (raw):\`, this.responseText);
        }
      });
      
      this.addEventListener('error', function() {
        const duration = Date.now() - debugInfo.startTime;
        console.error(\`❌ [\${debugInfo.method}] ERROR \${debugInfo.url} (\${duration}ms)\`);
      });
      
      return originalXHRSend.apply(this, [body]);
    };
  }
  
  static setupFetchInterceptor() {
    if (!this.isEnabled) return;
    
    const originalFetch = global.fetch;
    
    global.fetch = async function(url, options = {}) {
      const method = options.method || 'GET';
      const startTime = Date.now();
      
      console.log(\`🌐 [\${method}] Starting: \${url}\`);
      
      if (options.body) {
        console.log(\`📤 Request body:\`, options.body);
      }
      
      try {
        const response = await originalFetch(url, options);
        const duration = Date.now() - startTime;
        
        console.log(\`✅ [\${method}] \${response.status} \${url} (\${duration}ms)\`);
        
        // Clone response to avoid consuming it
        const clonedResponse = response.clone();
        try {
          const responseData = await clonedResponse.json();
          console.log(\`📥 Response:\`, responseData);
        } catch (e) {
          // Not JSON, log as text
          const responseText = await clonedResponse.text();
          console.log(\`📥 Response (raw):\`, responseText);
        }
        
        return response;
      } catch (error) {
        const duration = Date.now() - startTime;
        console.error(\`❌ [\${method}] ERROR \${url} (\${duration}ms)\`, error);
        throw error;
      }
    };
  }
}

// Setup network debugging (call in App.js)
NetworkDebugger.setupXHRInterceptor();
NetworkDebugger.setupFetchInterceptor();`}
          language="typescript"
          filename="utils/network-debugger.ts"
          title="Network Request Interceptor"
        />

        <h3>API Error Debugging</h3>
        <CodeBlock
          code={`// Enhanced API client with debugging
class ApiClient {
  private baseURL: string;
  
  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }
  
  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = \`\${this.baseURL}\${endpoint}\`;
    const startTime = Date.now();
    
    // Log request details
    DebugLogger.network(options.method || 'GET', url, {
      headers: options.headers,
      body: options.body
    });
    
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });
      
      const duration = Date.now() - startTime;
      
      if (!response.ok) {
        const errorText = await response.text();
        DebugLogger.error('ApiClient', \`HTTP \${response.status}\`, {
          url,
          status: response.status,
          statusText: response.statusText,
          error: errorText,
          duration
        });
        
        throw new APIError(response.status, errorText, response.statusText);
      }
      
      const data = await response.json();
      DebugLogger.log('ApiClient', \`Success \${response.status}\`, {
        url,
        duration,
        dataSize: JSON.stringify(data).length
      });
      
      return data;
    } catch (error) {
      const duration = Date.now() - startTime;
      DebugLogger.error('ApiClient', 'Network error', {
        url,
        error: error.message,
        duration
      });
      throw error;
    }
  }
}

class APIError extends Error {
  constructor(
    public status: number,
    public response: string,
    public statusText: string
  ) {
    super(\`API Error \${status}: \${statusText}\`);
    this.name = 'APIError';
  }
}

// Usage with error handling
export const useApiData = <T>(endpoint: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const apiClient = new ApiClient('https://api.example.com');
    
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const result = await apiClient.request<T>(endpoint);
        setData(result);
        
        DebugLogger.log('useApiData', 'Data loaded successfully', {
          endpoint,
          dataKeys: Object.keys(result || {})
        });
      } catch (err) {
        const errorMessage = err instanceof APIError 
          ? \`API Error \${err.status}: \${err.statusText}\`
          : err.message;
          
        setError(errorMessage);
        DebugLogger.error('useApiData', 'Failed to load data', {
          endpoint,
          error: err
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [endpoint]);
  
  return { data, loading, error };
};`}
          language="typescript"
          filename="utils/api-client.ts"
          title="API Client with Debugging"
        />

        <h2>4. AsyncStorage Debugging</h2>
        <p>
          Debug local storage issues, inspect stored data, and monitor storage operations 
          to ensure proper data persistence in your React Native app.
        </p>

        <CodeBlock
          code={`import AsyncStorage from '@react-native-async-storage/async-storage';

// AsyncStorage debugger utility
class StorageDebugger {
  static isEnabled = __DEV__;
  
  // Enhanced AsyncStorage with logging
  static async setItem(key: string, value: string): Promise<void> {
    if (this.isEnabled) {
      console.log(\`💾 AsyncStorage.setItem: \${key}\`, {
        size: value.length,
        preview: value.slice(0, 100) + (value.length > 100 ? '...' : '')
      });
    }
    
    try {
      await AsyncStorage.setItem(key, value);
      
      if (this.isEnabled) {
        console.log(\`✅ AsyncStorage.setItem completed: \${key}\`);
      }
    } catch (error) {
      if (this.isEnabled) {
        console.error(\`❌ AsyncStorage.setItem failed: \${key}\`, error);
      }
      throw error;
    }
  }
  
  static async getItem(key: string): Promise<string | null> {
    if (this.isEnabled) {
      console.log(\`📖 AsyncStorage.getItem: \${key}\`);
    }
    
    try {
      const value = await AsyncStorage.getItem(key);
      
      if (this.isEnabled) {
        console.log(\`✅ AsyncStorage.getItem result: \${key}\`, {
          found: value !== null,
          size: value?.length || 0,
          preview: value?.slice(0, 100) + (value && value.length > 100 ? '...' : '')
        });
      }
      
      return value;
    } catch (error) {
      if (this.isEnabled) {
        console.error(\`❌ AsyncStorage.getItem failed: \${key}\`, error);
      }
      throw error;
    }
  }
  
  static async removeItem(key: string): Promise<void> {
    if (this.isEnabled) {
      console.log(\`🗑️ AsyncStorage.removeItem: \${key}\`);
    }
    
    try {
      await AsyncStorage.removeItem(key);
      
      if (this.isEnabled) {
        console.log(\`✅ AsyncStorage.removeItem completed: \${key}\`);
      }
    } catch (error) {
      if (this.isEnabled) {
        console.error(\`❌ AsyncStorage.removeItem failed: \${key}\`, error);
      }
      throw error;
    }
  }
  
  // Debug utilities
  static async getAllKeys(): Promise<string[]> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      
      if (this.isEnabled) {
        console.log('📋 AsyncStorage.getAllKeys:', keys);
      }
      
      return keys;
    } catch (error) {
      if (this.isEnabled) {
        console.error('❌ AsyncStorage.getAllKeys failed:', error);
      }
      throw error;
    }
  }
  
  static async dumpAllData(): Promise<void> {
    if (!this.isEnabled) return;
    
    try {
      const keys = await AsyncStorage.getAllKeys();
      const values = await AsyncStorage.multiGet(keys);
      
      console.log('🔍 AsyncStorage dump:');
      values.forEach(([key, value]) => {
        console.log(\`  \${key}:\`, {
          size: value?.length || 0,
          value: value
        });
      });
    } catch (error) {
      console.error('❌ AsyncStorage dump failed:', error);
    }
  }
  
  static async clearAll(): Promise<void> {
    if (this.isEnabled) {
      console.log('🧹 AsyncStorage.clear');
    }
    
    try {
      await AsyncStorage.clear();
      
      if (this.isEnabled) {
        console.log('✅ AsyncStorage.clear completed');
      }
    } catch (error) {
      if (this.isEnabled) {
        console.error('❌ AsyncStorage.clear failed:', error);
      }
      throw error;
    }
  }
}

// Storage hook with debugging
export function useAsyncStorage<T>(
  key: string, 
  defaultValue: T
): [T, (value: T) => Promise<void>, boolean] {
  const [state, setState] = useState<T>(defaultValue);
  const [loading, setLoading] = useState(true);
  
  // Load initial value
  useEffect(() => {
    const loadValue = async () => {
      try {
        const stored = await StorageDebugger.getItem(key);
        if (stored !== null) {
          const parsed = JSON.parse(stored);
          setState(parsed);
          DebugLogger.log('useAsyncStorage', \`Loaded \${key}\`, { value: parsed });
        }
      } catch (error) {
        DebugLogger.error('useAsyncStorage', \`Failed to load \${key}\`, error);
      } finally {
        setLoading(false);
      }
    };
    
    loadValue();
  }, [key]);
  
  // Update value
  const setValue = async (newValue: T) => {
    try {
      setState(newValue);
      await StorageDebugger.setItem(key, JSON.stringify(newValue));
      DebugLogger.log('useAsyncStorage', \`Saved \${key}\`, { value: newValue });
    } catch (error) {
      DebugLogger.error('useAsyncStorage', \`Failed to save \${key}\`, error);
      throw error;
    }
  };
  
  return [state, setValue, loading];
}

// Development-only storage inspector component
export function StorageInspector() {
  const [keys, setKeys] = useState<string[]>([]);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [value, setValue] = useState<string | null>(null);
  
  const loadKeys = async () => {
    const allKeys = await StorageDebugger.getAllKeys();
    setKeys(allKeys);
  };
  
  const loadValue = async (key: string) => {
    const storedValue = await StorageDebugger.getItem(key);
    setSelectedKey(key);
    setValue(storedValue);
  };
  
  useEffect(() => {
    loadKeys();
  }, []);
  
  if (!__DEV__) return null;
  
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>AsyncStorage Inspector</Text>
      
      <Button title="Reload Keys" onPress={loadKeys} />
      <Button title="Dump All Data" onPress={() => StorageDebugger.dumpAllData()} />
      <Button title="Clear All" onPress={() => StorageDebugger.clearAll()} />
      
      <FlatList
        data={keys}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => loadValue(item)}>
            <Text style={{ padding: 10, backgroundColor: '#f0f0f0' }}>{item}</Text>
          </TouchableOpacity>
        )}
      />
      
      {selectedKey && (
        <View>
          <Text>Key: {selectedKey}</Text>
          <Text>Value: {value}</Text>
        </View>
      )}
    </View>
  );
}`}
          language="typescript"
          filename="utils/storage-debugger.ts"
          title="AsyncStorage Debugging Utilities"
        />

        <h2>5. Development Menu and Built-in Tools</h2>
        <p>
          Master React Native's built-in development tools and menus to access debugging features, 
          performance monitors, and development utilities.
        </p>

        <div className="grid md:grid-cols-2 gap-4 my-6">
          <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg border">
            <h4 className="font-semibold mb-2 mt-0">📱 Dev Menu Access:</h4>
            <div className="text-sm space-y-1">
              <div>• iOS Simulator: Cmd+D or Device > Shake</div>
              <div>• Android Emulator: Cmd+M or Ctrl+M</div>
              <div>• Physical Device: Shake device</div>
              <div>• Expo: Shake or press 'd' in terminal</div>
              <div>• Custom: DevSettings.openDebugger()</div>
            </div>
          </div>
          
          <div className="p-4 bg-green-50 dark:bg-green-900 rounded-lg border">
            <h4 className="font-semibold mb-2 mt-0">🛠️ Dev Menu Options:</h4>
            <div className="text-sm space-y-1">
              <div>• Reload - Refresh the app</div>
              <div>• Debug - Open Chrome DevTools</div>
              <div>• Perf Monitor - Show performance overlay</div>
              <div>• Inspector - Element inspection tool</div>
              <div>• Fast Refresh - Toggle auto-refresh</div>
            </div>
          </div>
        </div>

        <CodeBlock
          code={`// Custom dev menu additions
import { DevSettings } from 'react-native';

// Add custom developer menu items
if (__DEV__) {
  DevSettings.addMenuItem('Clear AsyncStorage', async () => {
    await AsyncStorage.clear();
    console.log('AsyncStorage cleared');
  });
  
  DevSettings.addMenuItem('Log App State', () => {
    console.log('Current app state:', {
      // Log current app state, user data, etc.
    });
  });
  
  DevSettings.addMenuItem('Simulate Network Error', () => {
    // Trigger network error for testing
    console.log('Simulating network error...');
  });
  
  DevSettings.addMenuItem('Reset to Onboarding', async () => {
    await AsyncStorage.removeItem('onboardingComplete');
    DevSettings.reload();
  });
}

// Performance monitor component
export function PerformanceMonitor() {
  const [fps, setFps] = useState(60);
  const [memory, setMemory] = useState(0);
  
  useEffect(() => {
    if (!__DEV__) return;
    
    const monitor = setInterval(() => {
      // Monitor FPS (simplified)
      const now = performance.now();
      // FPS calculation logic...
      
      // Monitor memory (if available)
      if (global.performance?.memory) {
        setMemory(global.performance.memory.usedJSHeapSize);
      }
    }, 1000);
    
    return () => clearInterval(monitor);
  }, []);
  
  if (!__DEV__) return null;
  
  return (
    <View style={{
      position: 'absolute',
      top: 50,
      right: 10,
      backgroundColor: 'rgba(0,0,0,0.7)',
      padding: 10,
      borderRadius: 5
    }}>
      <Text style={{ color: 'white', fontSize: 12 }}>
        FPS: {fps.toFixed(1)}
      </Text>
      <Text style={{ color: 'white', fontSize: 12 }}>
        Memory: {(memory / 1024 / 1024).toFixed(1)}MB
      </Text>
    </View>
  );
}

// Inspector utilities
export function ElementInspector() {
  const [inspectorVisible, setInspectorVisible] = useState(false);
  
  useEffect(() => {
    if (__DEV__) {
      // Add gesture to toggle inspector
      const subscription = DeviceEventEmitter.addListener('toggleInspector', () => {
        setInspectorVisible(prev => !prev);
      });
      
      return () => subscription?.remove();
    }
  }, []);
  
  if (!__DEV__ || !inspectorVisible) return null;
  
  return (
    <View style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      pointerEvents: 'none'
    }}>
      {/* Inspector overlay */}
      <View style={{
        position: 'absolute',
        bottom: 50,
        left: 10,
        right: 10,
        backgroundColor: 'rgba(0,0,0,0.8)',
        padding: 15,
        borderRadius: 5
      }}>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>
          Element Inspector Active
        </Text>
        <Text style={{ color: 'white', fontSize: 12 }}>
          Tap any element to inspect its properties
        </Text>
      </View>
    </View>
  );
}

// Debug overlay component
export function DebugOverlay() {
  const [visible, setVisible] = useState(__DEV__);
  const [logs, setLogs] = useState<string[]>([]);
  
  useEffect(() => {
    if (!__DEV__) return;
    
    // Capture console logs
    const originalConsoleLog = console.log;
    console.log = (...args) => {
      setLogs(prev => [...prev.slice(-10), args.join(' ')]);
      originalConsoleLog(...args);
    };
    
    return () => {
      console.log = originalConsoleLog;
    };
  }, []);
  
  if (!visible) return null;
  
  return (
    <View style={{
      position: 'absolute',
      bottom: 100,
      left: 10,
      right: 10,
      maxHeight: 200,
      backgroundColor: 'rgba(0,0,0,0.9)',
      borderRadius: 5
    }}>
      <View style={{ 
        flexDirection: 'row', 
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#333'
      }}>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Debug Console</Text>
        <TouchableOpacity onPress={() => setVisible(false)}>
          <Text style={{ color: 'white' }}>✕</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={{ maxHeight: 150, padding: 10 }}>
        {logs.map((log, index) => (
          <Text key={index} style={{ 
            color: 'white', 
            fontSize: 10, 
            fontFamily: 'monospace' 
          }}>
            {log}
          </Text>
        ))}
      </ScrollView>
    </View>
  );
}`}
          language="typescript"
          filename="components/dev-tools.tsx"
          title="Custom Development Tools"
        />

        <h2>6. Breakpoint Debugging and Step-Through</h2>
        <p>
          Use breakpoints effectively to pause execution, inspect variables, and step through code 
          line by line to understand program flow and identify issues.
        </p>

        <CodeBlock
          code={`// Breakpoint debugging techniques
export function ComplexDataProcessor({ data }: { data: any[] }) {
  const [processedData, setProcessedData] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const processData = useCallback(async (inputData: any[]) => {
    setLoading(true);
    
    try {
      // Set breakpoint here to inspect inputData
      debugger; // Browser will pause execution here
      
      const results = [];
      
      for (let i = 0; i < inputData.length; i++) {
        const item = inputData[i];
        
        // Set conditional breakpoint: i === 5
        if (i === 5) {
          debugger; // Only pauses when i equals 5
        }
        
        // Step through data transformation
        const processed = await transformItem(item);
        
        // Inspect processed result
        console.log('Processed item:', processed);
        
        results.push(processed);
      }
      
      // Final result inspection
      debugger; // Pause to inspect final results
      setProcessedData(results);
      
    } catch (error) {
      // Error breakpoint
      debugger; // Pause when error occurs
      console.error('Processing failed:', error);
    } finally {
      setLoading(false);
    }
  }, []);
  
  const transformItem = async (item: any) => {
    // Async operation debugging
    const startTime = Date.now();
    
    try {
      // Simulate API call
      const result = await fetch(\`/api/transform/\${item.id}\`);
      const data = await result.json();
      
      // Set breakpoint to inspect API response
      debugger;
      
      const duration = Date.now() - startTime;
      console.log(\`Transform completed in \${duration}ms\`);
      
      return {
        ...data,
        originalId: item.id,
        processedAt: Date.now()
      };
    } catch (error) {
      // Error handling with debugging
      debugger;
      throw new Error(\`Transform failed for item \${item.id}: \${error.message}\`);
    }
  };
  
  return (
    <View>
      {loading && <Text>Processing...</Text>}
      <FlatList
        data={processedData}
        renderItem={({ item }) => <ProcessedItem item={item} />}
      />
    </View>
  );
}

// Debugging utilities for breakpoints
class BreakpointDebugger {
  // Conditional debugger
  static debugIf(condition: boolean, message?: string) {
    if (condition) {
      if (message) console.log('Debug condition met:', message);
      debugger;
    }
  }
  
  // Debug with context
  static debugWithContext(label: string, context: any) {
    console.log(\`Debug: \${label}\`, context);
    debugger;
  }
  
  // Async debugging
  static async debugAsync<T>(
    label: string, 
    asyncFn: () => Promise<T>
  ): Promise<T> {
    console.log(\`Starting async operation: \${label}\`);
    debugger; // Before async operation
    
    try {
      const result = await asyncFn();
      console.log(\`Async operation completed: \${label}\`, result);
      debugger; // After successful completion
      return result;
    } catch (error) {
      console.error(\`Async operation failed: \${label}\`, error);
      debugger; // On error
      throw error;
    }
  }
  
  // Performance debugging
  static debugPerformance<T>(label: string, fn: () => T): T {
    const startTime = performance.now();
    debugger; // Before operation
    
    const result = fn();
    
    const duration = performance.now() - startTime;
    console.log(\`Performance: \${label} took \${duration.toFixed(2)}ms\`);
    debugger; // After operation with timing
    
    return result;
  }
}

// Usage examples
export function DebuggingExample() {
  const [users, setUsers] = useState([]);
  
  const fetchUsers = async () => {
    // Debug API call
    await BreakpointDebugger.debugAsync('Fetch users', async () => {
      const response = await fetch('/api/users');
      const userData = await response.json();
      
      // Conditional debugging
      BreakpointDebugger.debugIf(
        userData.length === 0, 
        'No users returned from API'
      );
      
      setUsers(userData);
      return userData;
    });
  };
  
  const processUsers = (userList: any[]) => {
    return BreakpointDebugger.debugPerformance('Process users', () => {
      return userList.map(user => ({
        ...user,
        displayName: \`\${user.firstName} \${user.lastName}\`,
        isActive: user.lastLogin > Date.now() - 30 * 24 * 60 * 60 * 1000
      }));
    });
  };
  
  return (
    <View>
      <Button title="Fetch Users" onPress={fetchUsers} />
      <FlatList
        data={processUsers(users)}
        renderItem={({ item }) => (
          <Text>{item.displayName} - {item.isActive ? 'Active' : 'Inactive'}</Text>
        )}
      />
    </View>
  );
}`}
          language="typescript"
          filename="components/breakpoint-debugging.tsx"
          title="Breakpoint Debugging Techniques"
        />

        <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg border border-purple-200 dark:border-purple-800 my-6">
          <h4 className="text-purple-800 dark:text-purple-200 font-semibold mb-2 mt-0">
            🎯 Breakpoint Debugging Tips
          </h4>
          <div className="text-purple-700 dark:text-purple-300 text-sm space-y-2">
            <div><strong>Strategic Placement:</strong> Set breakpoints at key decision points and data transformations</div>
            <div><strong>Conditional Breakpoints:</strong> Use conditions to pause only when specific criteria are met</div>
            <div><strong>Step Through Logic:</strong> Use F10 (step over) and F11 (step into) to follow execution flow</div>
            <div><strong>Inspect Variables:</strong> Hover over variables or use the Variables panel to see current values</div>
            <div><strong>Call Stack Analysis:</strong> Use the Call Stack panel to understand the execution path</div>
            <div><strong>Console Evaluation:</strong> Use the console to evaluate expressions in the current context</div>
          </div>
        </div>

        <h2>7. Hands-On Exercise: Complete Debugging Workflow</h2>
        <p>
          Let's create a comprehensive debugging scenario that combines logs, network monitoring, 
          storage debugging, and breakpoint investigation to solve a realistic app issue.
        </p>

        <div className="bg-orange-50 dark:bg-orange-950 p-6 rounded-lg border border-orange-200 dark:border-orange-800 my-6">
          <h4 className="text-orange-800 dark:text-orange-200 font-semibold mb-3 mt-0">
            🎯 Exercise: Debug Shopping Cart Issue
          </h4>
          <div className="text-orange-700 dark:text-orange-300 space-y-3">
            <div>
              <strong>Scenario:</strong> Users report items disappearing from their shopping cart
              <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                <li>Items added successfully but vanish after app restart</li>
                <li>API calls seem to work but data doesn't persist</li>
                <li>Performance issues during cart operations</li>
                <li>Network requests occasionally fail without clear errors</li>
              </ul>
            </div>
            
            <div>
              <strong>Investigation Steps:</strong>
              <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                <li>Set up comprehensive logging for cart operations</li>
                <li>Monitor network requests and responses</li>
                <li>Debug AsyncStorage persistence issues</li>
                <li>Use breakpoints to trace cart state changes</li>
                <li>Identify and fix the root cause</li>
              </ul>
            </div>
          </div>
        </div>

        <CodeBlock
          code={`// Complete debugging implementation for shopping cart
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, Button, Alert } from 'react-native';

// Enhanced cart store with debugging
class CartStore {
  private static instance: CartStore;
  private cart: CartItem[] = [];
  private listeners: Function[] = [];
  
  static getInstance(): CartStore {
    if (!CartStore.instance) {
      CartStore.instance = new CartStore();
    }
    return CartStore.instance;
  }
  
  async addItem(item: CartItem): Promise<void> {
    const startTime = Date.now();
    
    // Debug logging
    DebugLogger.log('CartStore', 'Adding item to cart', { 
      item, 
      currentCartSize: this.cart.length 
    });
    
    try {
      // Set breakpoint here to inspect item being added
      debugger;
      
      // Check if item already exists
      const existingIndex = this.cart.findIndex(cartItem => cartItem.id === item.id);
      
      if (existingIndex >= 0) {
        // Update quantity
        this.cart[existingIndex].quantity += item.quantity;
        DebugLogger.log('CartStore', 'Updated existing item quantity', {
          itemId: item.id,
          newQuantity: this.cart[existingIndex].quantity
        });
      } else {
        // Add new item
        this.cart.push(item);
        DebugLogger.log('CartStore', 'Added new item to cart', { 
          itemId: item.id,
          newCartSize: this.cart.length 
        });
      }
      
      // Persist to storage with debugging
      await this.persistCart();
      
      // Notify listeners
      this.notifyListeners();
      
      DebugLogger.performance('Add to cart', startTime);
      
    } catch (error) {
      DebugLogger.error('CartStore', 'Failed to add item', { item, error });
      throw error;
    }
  }
  
  private async persistCart(): Promise<void> {
    try {
      const cartData = JSON.stringify(this.cart);
      await StorageDebugger.setItem('shopping-cart', cartData);
      
      DebugLogger.log('CartStore', 'Cart persisted successfully', {
        itemCount: this.cart.length,
        dataSize: cartData.length
      });
      
      // Debug: Verify data was actually saved
      const verifyData = await StorageDebugger.getItem('shopping-cart');
      if (verifyData !== cartData) {
        DebugLogger.error('CartStore', 'Storage verification failed', {
          expected: cartData,
          actual: verifyData
        });
        throw new Error('Cart persistence verification failed');
      }
      
    } catch (error) {
      DebugLogger.error('CartStore', 'Failed to persist cart', error);
      throw error;
    }
  }
  
  async loadCart(): Promise<void> {
    try {
      DebugLogger.log('CartStore', 'Loading cart from storage');
      
      const cartData = await StorageDebugger.getItem('shopping-cart');
      
      if (cartData) {
        // Set breakpoint to inspect loaded data
        debugger;
        
        const parsedCart = JSON.parse(cartData);
        this.cart = parsedCart;
        
        DebugLogger.log('CartStore', 'Cart loaded successfully', {
          itemCount: this.cart.length,
          items: this.cart.map(item => ({ id: item.id, quantity: item.quantity }))
        });
      } else {
        DebugLogger.log('CartStore', 'No cart data found in storage');
        this.cart = [];
      }
      
      this.notifyListeners();
      
    } catch (error) {
      DebugLogger.error('CartStore', 'Failed to load cart', error);
      this.cart = [];
      this.notifyListeners();
    }
  }
  
  private notifyListeners(): void {
    this.listeners.forEach(listener => {
      try {
        listener(this.cart);
      } catch (error) {
        DebugLogger.error('CartStore', 'Listener notification failed', error);
      }
    });
  }
  
  subscribe(listener: (cart: CartItem[]) => void): () => void {
    this.listeners.push(listener);
    
    // Return unsubscribe function
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index >= 0) {
        this.listeners.splice(index, 1);
      }
    };
  }
  
  getCart(): CartItem[] {
    return [...this.cart];
  }
}

// Cart hook with debugging
export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const cartStore = CartStore.getInstance();
  
  useEffect(() => {
    // Load initial cart data
    const loadInitialCart = async () => {
      try {
        await cartStore.loadCart();
      } catch (error) {
        DebugLogger.error('useCart', 'Failed to load initial cart', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadInitialCart();
    
    // Subscribe to cart changes
    const unsubscribe = cartStore.subscribe((updatedCart) => {
      DebugLogger.log('useCart', 'Cart updated via subscription', {
        itemCount: updatedCart.length
      });
      setCart(updatedCart);
    });
    
    return unsubscribe;
  }, []);
  
  const addToCart = useCallback(async (item: CartItem) => {
    try {
      await cartStore.addItem(item);
    } catch (error) {
      DebugLogger.error('useCart', 'Failed to add item to cart', { item, error });
      Alert.alert('Error', 'Failed to add item to cart');
    }
  }, []);
  
  return { cart, addToCart, loading };
}

// Debug cart component
export function DebugCartScreen() {
  const { cart, addToCart, loading } = useCart();
  
  // Debug functions
  const debugDumpCart = async () => {
    const cartStore = CartStore.getInstance();
    const currentCart = cartStore.getCart();
    
    console.log('=== CART DEBUG DUMP ===');
    console.log('Current cart:', currentCart);
    
    // Check storage
    const storedCart = await StorageDebugger.getItem('shopping-cart');
    console.log('Stored cart:', storedCart);
    
    // Dump all storage
    await StorageDebugger.dumpAllData();
  };
  
  const debugClearCart = async () => {
    await StorageDebugger.removeItem('shopping-cart');
    console.log('Cart storage cleared');
  };
  
  const debugAddTestItem = () => {
    const testItem: CartItem = {
      id: \`test-\${Date.now()}\`,
      name: 'Debug Test Item',
      price: 9.99,
      quantity: 1
    };
    
    addToCart(testItem);
  };
  
  if (loading) {
    return <Text>Loading cart...</Text>;
  }
  
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
        Shopping Cart Debug ({cart.length} items)
      </Text>
      
      <FlatList
        data={cart}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1 }}>
            <Text>{item.name} - \${item.price} x {item.quantity}</Text>
          </View>
        )}
      />
      
      <View style={{ marginTop: 20 }}>
        <Button title="Add Test Item" onPress={debugAddTestItem} />
        <Button title="Dump Cart Debug Info" onPress={debugDumpCart} />
        <Button title="Clear Cart Storage" onPress={debugClearCart} />
      </View>
      
      {__DEV__ && <StorageInspector />}
      {__DEV__ && <PerformanceMonitor />}
    </View>
  );
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}`}
          language="typescript"
          filename="components/debug-cart-example.tsx"
          title="Complete Cart Debugging Implementation"
        />

        <div className="bg-green-50 dark:bg-green-950 p-6 rounded-lg border border-green-200 dark:border-green-800">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-3 mt-0">
            🎉 Session 3 Complete!
          </h4>
          <p className="text-green-700 dark:text-green-300 mb-3">
            You've mastered React Native debugging with comprehensive logging, React Native Debugger, 
            network monitoring, AsyncStorage debugging, development tools, and breakpoint debugging techniques.
          </p>
          <p className="text-green-700 dark:text-green-300 mb-0">
            <strong>Next:</strong> Session 4 will cover testing with @testing-library/react-native, 
            unit testing components, mocking APIs and context, and building robust test suites.
          </p>
        </div>
      </div>
    </>
  );
}