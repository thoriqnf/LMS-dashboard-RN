"use client";

import { CodeBlock } from "@/components/ui/code-block-new";

export function Day3Session2Content() {
  return (
    <>
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">
            Fetching API Data - Session 2
          </h1>

          <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg border border-blue-200 dark:border-blue-800 mb-8">
            <h3 className="text-blue-800 dark:text-blue-200 font-semibold mb-4 mt-0">
              🌐 Session Overview
            </h3>
            <ul className="text-blue-700 dark:text-blue-300 space-y-2 mb-0">
              <li>
                <strong>fetch & axios</strong> - Master HTTP requests with native fetch and axios library
              </li>
              <li>
                <strong>Loading & Error States</strong> - Handle async operations with proper user feedback
              </li>
              <li>
                <strong>useEffect Integration</strong> - Fetch data on component mount and dependency changes
              </li>
              <li>
                <strong>Retry Logic</strong> - Implement robust error recovery and retry mechanisms
              </li>
            </ul>
          </div>
        </div>

        <h2>1. Building on Your Forms Foundation</h2>
        <p>
          Remember the registration form from Session 1? We collected user data and submitted it locally. 
          Now let's connect our apps to real APIs - fetching data from servers, handling loading states, 
          and gracefully managing errors.
        </p>

        <div className="grid md:grid-cols-2 gap-4 my-6">
          <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border">
            <h4 className="font-semibold mb-2 mt-0">📱 Previous Approach:</h4>
            <div className="text-sm space-y-1">
              <div>• Local form submission only</div>
              <div>• Static data in components</div>
              <div>• No loading states</div>
              <div>• No error handling</div>
            </div>
          </div>
          <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
            <h4 className="font-semibold mb-2 mt-0">✨ API Integration:</h4>
            <div className="text-sm space-y-1">
              <div>• Real server communication</div>
              <div>• Dynamic data fetching</div>
              <div>• Professional loading states</div>
              <div>• Robust error handling</div>
            </div>
          </div>
        </div>

        <h2>2. Understanding API Data Fetching</h2>

        <h3>Why API Integration Matters</h3>
        <p>
          Modern apps are dynamic - they fetch user profiles, load content, submit forms to servers, 
          and sync data across devices. API integration is what makes your app feel alive and connected.
        </p>

        <div className="bg-green-50 dark:bg-green-950 p-6 rounded-lg border border-green-200 dark:border-green-800 mb-6">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-2 mt-0">
            🎯 API Integration Benefits:
          </h4>
          <ul className="text-green-700 dark:text-green-300 text-sm space-y-1 mb-0">
            <li><strong>Real-time data</strong> - Always show current, up-to-date information</li>
            <li><strong>User personalization</strong> - Fetch data specific to each user</li>
            <li><strong>Data persistence</strong> - Store user data on secure servers</li>
            <li><strong>Collaboration</strong> - Multiple users can share and interact with data</li>
            <li><strong>Scalability</strong> - Handle large amounts of data efficiently</li>
          </ul>
        </div>

        <h3>Example 1: Basic Data Fetching with useEffect</h3>
        <p>
          Let's start with the fundamentals - fetching a list of users from a public API 
          and displaying them with proper loading states and error handling.
        </p>

        <CodeBlock
          code={`import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  ActivityIndicator,
  TouchableOpacity,
  Alert
} from 'react-native';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
  };
}

export default function UserList() {
  // State for data, loading, and errors
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch users from API
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);

      // Using native fetch API
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      
      // Check if response is ok
      if (!response.ok) {
        throw new Error(\`HTTP error! status: \${response.status}\`);
      }

      // Parse JSON data
      const userData: User[] = await response.json();
      setUsers(userData);
      
    } catch (err) {
      console.error('Error fetching users:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when component mounts
  useEffect(() => {
    fetchUsers();
  }, []); // Empty dependency array = run once on mount

  // Retry function for error recovery
  const handleRetry = () => {
    fetchUsers();
  };

  // Render individual user item
  const renderUser = ({ item }: { item: User }) => (
    <View style={styles.userCard}>
      <Text style={styles.userName}>{item.name}</Text>
      <Text style={styles.userEmail}>{item.email}</Text>
      <Text style={styles.userPhone}>{item.phone}</Text>
      <Text style={styles.userCompany}>{item.company.name}</Text>
      <Text style={styles.userCatchPhrase}>"{item.company.catchPhrase}"</Text>
    </View>
  );

  // Loading state
  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading users...</Text>
      </View>
    );
  }

  // Error state
  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorTitle}>😕 Oops! Something went wrong</Text>
        <Text style={styles.errorMessage}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
          <Text style={styles.retryButtonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Success state - show data
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Users Directory</Text>
      <Text style={styles.subtitle}>
        Loaded {users.length} users from API
      </Text>

      <FlatList
        data={users}
        renderItem={renderUser}
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
        showsVerticalScrollIndicator={false}
        // Add pull-to-refresh
        refreshing={loading}
        onRefresh={fetchUsers}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 20,
  },
  list: {
    flex: 1,
  },
  userCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#007AFF',
    marginBottom: 4,
  },
  userPhone: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 4,
  },
  userCompany: {
    fontSize: 14,
    fontWeight: '600',
    color: '#28a745',
    marginBottom: 4,
  },
  userCatchPhrase: {
    fontSize: 12,
    color: '#6c757d',
    fontStyle: 'italic',
  },
  
  // Loading state styles
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6c757d',
  },
  
  // Error state styles
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#dc3545',
    marginBottom: 12,
    textAlign: 'center',
  },
  errorMessage: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});`}
          language="typescript"
          filename="UserList.tsx"
          title="Basic API Data Fetching with useEffect"
        />

        <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg border border-blue-200 dark:border-blue-800 mb-6">
          <h4 className="text-blue-800 dark:text-blue-200 font-semibold mb-3 mt-0">
            🔧 API Fetching Fundamentals:
          </h4>
          <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1 mb-0">
            <li><strong>useEffect</strong> - Fetch data when component mounts</li>
            <li><strong>async/await</strong> - Handle promises cleanly</li>
            <li><strong>try/catch</strong> - Proper error handling</li>
            <li><strong>Loading states</strong> - Show feedback during requests</li>
            <li><strong>Error states</strong> - Graceful error recovery</li>
            <li><strong>Response validation</strong> - Check HTTP status codes</li>
          </ul>
        </div>

        <h2>3. Advanced API Integration with Axios</h2>

        <h3>Why Axios Over Fetch?</h3>
        <p>
          While fetch is built into JavaScript, axios provides better features for production apps: 
          automatic JSON parsing, request/response interceptors, timeout handling, and better error handling.
        </p>

        <h3>Example 2: Professional API Integration with Axios</h3>
        <p>
          Let's build a complete posts management system using axios with advanced features like 
          request timeouts, retry logic, and proper error categorization.
        </p>

        <CodeBlock
          code={`// First, install axios: npm install axios

import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
  Alert
} from 'react-native';
import axios, { AxiosError } from 'axios';

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface User {
  id: number;
  name: string;
  email: string;
}

// Create axios instance with default config
const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(\`Making \${config.method?.toUpperCase()} request to \${config.url}\`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log(\`Response received: \${response.status}\`);
    return response;
  },
  (error) => {
    console.error('Response error:', error);
    return Promise.reject(error);
  }
);

export default function PostsManager() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  // Categorize different types of errors
  const categorizeError = (error: AxiosError | Error): string => {
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') {
        return 'Request timed out. Please check your connection.';
      }
      if (error.response) {
        // Server responded with error status
        const status = error.response.status;
        if (status >= 500) {
          return 'Server error. Please try again later.';
        }
        if (status >= 400) {
          return 'Bad request. Please check your input.';
        }
        return \`HTTP error: \${status}\`;
      }
      if (error.request) {
        // Network error
        return 'Network error. Please check your internet connection.';
      }
    }
    return error.message || 'An unexpected error occurred.';
  };

  // Fetch posts and users concurrently
  const fetchData = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);

      // Make concurrent API calls
      const [postsResponse, usersResponse] = await Promise.all([
        api.get<Post[]>('/posts'),
        api.get<User[]>('/users'),
      ]);

      setPosts(postsResponse.data);
      setUsers(usersResponse.data);
      setRetryCount(0); // Reset retry count on success

    } catch (err) {
      console.error('Error fetching data:', err);
      const errorMessage = categorizeError(err as AxiosError);
      setError(errorMessage);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Retry with exponential backoff
  const retryWithBackoff = async () => {
    const delay = Math.min(1000 * Math.pow(2, retryCount), 30000); // Max 30 seconds
    
    Alert.alert(
      'Retrying...',
      \`Attempting to reconnect in \${delay / 1000} seconds\`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Retry Now', 
          onPress: () => {
            setRetryCount(prev => prev + 1);
            fetchData();
          }
        }
      ]
    );

    setTimeout(() => {
      setRetryCount(prev => prev + 1);
      fetchData();
    }, delay);
  };

  // Fetch data on mount
  useEffect(() => {
    fetchData();
  }, []);

  // Get user name for a post
  const getUserName = (userId: number): string => {
    const user = users.find(u => u.id === userId);
    return user?.name || 'Unknown User';
  };

  // Delete a post
  const deletePost = async (postId: number) => {
    try {
      Alert.alert(
        'Delete Post',
        'Are you sure you want to delete this post?',
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Delete', 
            style: 'destructive',
            onPress: async () => {
              // Optimistically remove from UI
              setPosts(prev => prev.filter(p => p.id !== postId));
              
              try {
                await api.delete(\`/posts/\${postId}\`);
                Alert.alert('Success', 'Post deleted successfully');
              } catch (err) {
                // Revert optimistic update on error
                fetchData();
                Alert.alert('Error', 'Failed to delete post');
              }
            }
          }
        ]
      );
    } catch (err) {
      console.error('Error deleting post:', err);
    }
  };

  // Render post item
  const renderPost = ({ item }: { item: Post }) => (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        <Text style={styles.postAuthor}>{getUserName(item.userId)}</Text>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deletePost(item.id)}
        >
          <Text style={styles.deleteButtonText}>🗑️</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.postTitle}>{item.title}</Text>
      <Text style={styles.postBody} numberOfLines={3}>
        {item.body}
      </Text>
      <View style={styles.postFooter}>
        <Text style={styles.postId}>Post #{item.id}</Text>
      </View>
    </View>
  );

  // Loading state
  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading posts...</Text>
        <Text style={styles.loadingSubtext}>
          Fetching {users.length > 0 ? 'posts' : 'users and posts'}
        </Text>
      </View>
    );
  }

  // Error state
  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorTitle}>😕 Connection Error</Text>
        <Text style={styles.errorMessage}>{error}</Text>
        <Text style={styles.retryInfo}>
          Retry attempts: {retryCount}/5
        </Text>
        <View style={styles.errorActions}>
          <TouchableOpacity style={styles.retryButton} onPress={() => fetchData()}>
            <Text style={styles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.autoRetryButton} onPress={retryWithBackoff}>
            <Text style={styles.autoRetryButtonText}>Auto Retry</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Success state
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Posts Feed</Text>
      <Text style={styles.subtitle}>
        {posts.length} posts from {users.length} users
      </Text>

      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => fetchData(true)}
            colors={['#007AFF']}
            tintColor="#007AFF"
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No posts found</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 20,
  },
  list: {
    flex: 1,
  },
  postCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  postAuthor: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
  },
  deleteButton: {
    padding: 4,
  },
  deleteButtonText: {
    fontSize: 16,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
    textTransform: 'capitalize',
  },
  postBody: {
    fontSize: 14,
    color: '#6c757d',
    lineHeight: 20,
    marginBottom: 8,
  },
  postFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  postId: {
    fontSize: 12,
    color: '#adb5bd',
  },
  
  // Loading state styles
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6c757d',
  },
  loadingSubtext: {
    marginTop: 8,
    fontSize: 14,
    color: '#adb5bd',
  },
  
  // Error state styles
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#dc3545',
    marginBottom: 12,
    textAlign: 'center',
  },
  errorMessage: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 24,
  },
  retryInfo: {
    fontSize: 14,
    color: '#adb5bd',
    marginBottom: 20,
  },
  errorActions: {
    flexDirection: 'row',
    gap: 12,
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  autoRetryButton: {
    backgroundColor: '#28a745',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  autoRetryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  
  // Empty state styles
  emptyState: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#6c757d',
  },
});`}
          language="typescript"
          filename="PostsManager.tsx"
          title="Advanced API Integration with Axios"
        />

        <div className="bg-yellow-50 dark:bg-yellow-950 p-6 rounded-lg border border-yellow-200 dark:border-yellow-800 mb-6">
          <h4 className="text-yellow-800 dark:text-yellow-200 font-semibold mb-3 mt-0">
            💡 Axios Advanced Features:
          </h4>
          <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1 mb-0">
            <li><strong>Request interceptors</strong> - Log requests and add headers automatically</li>
            <li><strong>Response interceptors</strong> - Handle errors and responses globally</li>
            <li><strong>Timeout handling</strong> - Prevent requests from hanging indefinitely</li>
            <li><strong>Concurrent requests</strong> - Use Promise.all for multiple API calls</li>
            <li><strong>Error categorization</strong> - Distinguish between network, server, and client errors</li>
            <li><strong>Optimistic updates</strong> - Update UI immediately, revert on error</li>
          </ul>
        </div>

        <h2>4. Complete Data Fetching System with Caching</h2>

        <h3>Production-Ready API Integration</h3>
        <p>
          Let's build a complete data fetching system with caching, request deduplication, 
          and advanced retry logic that you'd use in production apps.
        </p>

        <h3>Example 3: Enterprise-Grade Data Fetching</h3>
        <p>
          This example demonstrates a complete data fetching solution with caching, 
          request deduplication, exponential backoff, and memory management.
        </p>

        <CodeBlock
          code={`import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl
} from 'react-native';
import axios, { AxiosError, CancelToken } from 'axios';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiry: number;
}

// Cache manager class
class CacheManager {
  private cache = new Map<string, CacheEntry<any>>();
  private readonly DEFAULT_TTL = 5 * 60 * 1000; // 5 minutes

  set<T>(key: string, data: T, ttl: number = this.DEFAULT_TTL): void {
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      expiry: Date.now() + ttl
    };
    this.cache.set(key, entry);
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry || Date.now() > entry.expiry) {
      this.cache.delete(key);
      return null;
    }
    return entry.data;
  }

  clear(): void {
    this.cache.clear();
  }

  getSize(): number {
    return this.cache.size;
  }
}

// Request deduplication manager
class RequestManager {
  private pendingRequests = new Map<string, Promise<any>>();

  async request<T>(key: string, requestFn: () => Promise<T>): Promise<T> {
    // If request is already pending, return the existing promise
    if (this.pendingRequests.has(key)) {
      return this.pendingRequests.get(key)!;
    }

    // Create new request
    const requestPromise = requestFn()
      .finally(() => {
        // Remove from pending requests when completed
        this.pendingRequests.delete(key);
      });

    // Store pending request
    this.pendingRequests.set(key, requestPromise);
    
    return requestPromise;
  }

  cancelAll(): void {
    this.pendingRequests.clear();
  }
}

// Global instances
const cacheManager = new CacheManager();
const requestManager = new RequestManager();

// API client with retry logic
const apiClient = axios.create({
  baseURL: 'https://fakestoreapi.com',
  timeout: 15000,
});

// Retry utility with exponential backoff
const retryWithBackoff = async <T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> => {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === maxRetries) {
        throw error;
      }
      
      const delay = baseDelay * Math.pow(2, attempt);
      console.log(\`Retry attempt \${attempt + 1}/\${maxRetries + 1} in \${delay}ms\`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  throw new Error('Max retries exceeded');
};

export default function ProductCatalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Refs for cleanup
  const cancelTokenRef = useRef<CancelToken>();
  const mountedRef = useRef(true);

  // Fetch products with caching and deduplication
  const fetchProducts = useCallback(async (category: string = 'all', isRefresh = false) => {
    const cacheKey = \`products-\${category}\`;
    
    // Check cache first (skip cache on refresh)
    if (!isRefresh) {
      const cachedProducts = cacheManager.get<Product[]>(cacheKey);
      if (cachedProducts) {
        console.log('Using cached products');
        setProducts(cachedProducts);
        setLoading(false);
        return;
      }
    }

    // Create cancel token for this request
    const source = axios.CancelToken.source();
    cancelTokenRef.current = source.token;

    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);

      // Use request manager to deduplicate requests
      const fetchFn = async () => {
        const url = category === 'all' 
          ? '/products' 
          : \`/products/category/\${category}\`;
        
        return retryWithBackoff(
          () => apiClient.get<Product[]>(url, { cancelToken: source.token }),
          3,
          1000
        );
      };

      const response = await requestManager.request(cacheKey, fetchFn);
      
      if (!mountedRef.current) return;

      // Cache the results
      cacheManager.set(cacheKey, response.data, 5 * 60 * 1000); // 5 minutes
      
      setProducts(response.data);
      
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log('Request cancelled');
        return;
      }
      
      if (!mountedRef.current) return;
      
      console.error('Error fetching products:', err);
      
      const errorMessage = axios.isAxiosError(err)
        ? err.response?.data?.message || err.message
        : 'An unexpected error occurred';
      
      setError(errorMessage);
      
    } finally {
      if (mountedRef.current) {
        setLoading(false);
        setRefreshing(false);
      }
    }
  }, []);

  // Fetch categories
  const fetchCategories = useCallback(async () => {
    const cacheKey = 'categories';
    const cachedCategories = cacheManager.get<string[]>(cacheKey);
    
    if (cachedCategories) {
      setCategories(['all', ...cachedCategories]);
      return;
    }

    try {
      const response = await apiClient.get<string[]>('/products/categories');
      const categoryList = ['all', ...response.data];
      
      cacheManager.set(cacheKey, response.data, 10 * 60 * 1000); // 10 minutes
      setCategories(categoryList);
      
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  }, []);

  // Handle category change
  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
    fetchProducts(category);
  }, [fetchProducts]);

  // Initial data fetch
  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, [fetchCategories, fetchProducts]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      mountedRef.current = false;
      if (cancelTokenRef.current) {
        cancelTokenRef.current.cancel?.('Component unmounted');
      }
      requestManager.cancelAll();
    };
  }, []);

  // Render product item
  const renderProduct = ({ item }: { item: Product }) => (
    <TouchableOpacity style={styles.productCard}>
      <Text style={styles.productTitle} numberOfLines={2}>
        {item.title}
      </Text>
      <Text style={styles.productPrice}>\${item.price}</Text>
      <Text style={styles.productCategory}>{item.category}</Text>
      <View style={styles.productRating}>
        <Text style={styles.ratingText}>
          ⭐ {item.rating.rate} ({item.rating.count} reviews)
        </Text>
      </View>
      <Text style={styles.productDescription} numberOfLines={3}>
        {item.description}
      </Text>
    </TouchableOpacity>
  );

  // Render category filter
  const renderCategory = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={[
        styles.categoryChip,
        selectedCategory === item && styles.categoryChipSelected
      ]}
      onPress={() => handleCategoryChange(item)}
    >
      <Text style={[
        styles.categoryText,
        selectedCategory === item && styles.categoryTextSelected
      ]}>
        {item.charAt(0).toUpperCase() + item.slice(1)}
      </Text>
    </TouchableOpacity>
  );

  // Loading state
  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading products...</Text>
        <Text style={styles.cacheInfo}>
          Cache size: {cacheManager.getSize()} entries
        </Text>
      </View>
    );
  }

  // Error state
  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorTitle}>😕 Failed to load products</Text>
        <Text style={styles.errorMessage}>{error}</Text>
        <TouchableOpacity 
          style={styles.retryButton} 
          onPress={() => fetchProducts(selectedCategory)}
        >
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.clearCacheButton} 
          onPress={() => {
            cacheManager.clear();
            fetchProducts(selectedCategory);
          }}
        >
          <Text style={styles.clearCacheButtonText}>Clear Cache & Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Product Catalog</Text>
      <Text style={styles.subtitle}>
        {products.length} products • Cache: {cacheManager.getSize()} entries
      </Text>

      {/* Category Filter */}
      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item) => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryList}
        contentContainerStyle={styles.categoryListContent}
      />

      {/* Products List */}
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        style={styles.productList}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => fetchProducts(selectedCategory, true)}
            colors={['#007AFF']}
            tintColor="#007AFF"
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>
              No products found in {selectedCategory} category
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  
  // Category styles
  categoryList: {
    maxHeight: 50,
    marginBottom: 20,
  },
  categoryListContent: {
    paddingHorizontal: 20,
  },
  categoryChip: {
    backgroundColor: '#e9ecef',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  categoryChipSelected: {
    backgroundColor: '#007AFF',
  },
  categoryText: {
    fontSize: 14,
    color: '#6c757d',
    fontWeight: '500',
  },
  categoryTextSelected: {
    color: '#ffffff',
  },
  
  // Product styles
  productList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  productCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#28a745',
    marginBottom: 4,
  },
  productCategory: {
    fontSize: 14,
    color: '#007AFF',
    marginBottom: 8,
    textTransform: 'capitalize',
  },
  productRating: {
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 14,
    color: '#6c757d',
  },
  productDescription: {
    fontSize: 14,
    color: '#6c757d',
    lineHeight: 20,
  },
  
  // Loading styles
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6c757d',
  },
  cacheInfo: {
    marginTop: 8,
    fontSize: 14,
    color: '#adb5bd',
  },
  
  // Error styles
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#dc3545',
    marginBottom: 12,
    textAlign: 'center',
  },
  errorMessage: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  retryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  clearCacheButton: {
    backgroundColor: '#6c757d',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  clearCacheButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  
  // Empty state
  emptyState: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
  },
});`}
          language="typescript"
          filename="ProductCatalog.tsx"
          title="Enterprise-Grade Data Fetching System"
        />

        <div className="bg-green-50 dark:bg-green-950 p-6 rounded-lg border border-green-200 dark:border-green-800 mb-6">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-3 mt-0">
            ✨ What's New in Enterprise System:
          </h4>
          <ul className="text-green-700 dark:text-green-300 text-sm space-y-1 mb-0">
            <li><strong>Caching system</strong> - Cache API responses to reduce network calls</li>
            <li><strong>Request deduplication</strong> - Prevent duplicate requests for same data</li>
            <li><strong>Exponential backoff</strong> - Progressive retry delays for failed requests</li>
            <li><strong>Memory management</strong> - Proper cleanup to prevent memory leaks</li>
            <li><strong>Cancel tokens</strong> - Cancel in-flight requests on component unmount</li>
            <li><strong>Optimistic updates</strong> - Update UI immediately, revert on failure</li>
          </ul>
        </div>

        <h2>5. Hands-On Exercise: Complete API Integration</h2>

        <div className="bg-orange-50 dark:bg-orange-950 p-6 rounded-lg border border-orange-200 dark:border-orange-800 mb-6">
          <h4 className="text-orange-800 dark:text-orange-200 font-semibold mb-3 mt-0">
            🎯 Challenge: Build a Complete Data-Driven App
          </h4>
          <p className="text-orange-700 dark:text-orange-300 text-sm mb-4">
            Create a full-featured app that fetches, displays, and manages data from a real API.
          </p>
          <ul className="text-orange-700 dark:text-orange-300 text-sm space-y-1 mb-0">
            <li>• Implement both fetch and axios approaches</li>
            <li>• Add comprehensive loading and error states</li>
            <li>• Include retry logic with exponential backoff</li>
            <li>• Implement caching for better performance</li>
            <li>• Add pull-to-refresh functionality</li>
            <li>• Handle different types of API errors gracefully</li>
          </ul>
        </div>

        <h3>Step-by-Step Implementation Guide</h3>

        <CodeBlock
          code={`// Your complete API integration implementation
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';

export default function MyDataApp() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  // Create your API client
  const api = axios.create({
    baseURL: 'https://your-api-endpoint.com',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Fetch data with error handling
  const fetchData = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);

      const response = await api.get('/your-endpoint');
      setData(response.data);
      
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load data. Please try again.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  // Retry with exponential backoff
  const retryWithBackoff = useCallback(async (attempt = 0) => {
    const delay = Math.min(1000 * Math.pow(2, attempt), 30000);
    
    setTimeout(() => {
      fetchData();
    }, delay);
  }, [fetchData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Render your data
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text style={styles.itemDescription}>{item.description}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => fetchData()}>
          <Text style={styles.retryButtonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        refreshing={refreshing}
        onRefresh={() => fetchData(true)}
      />
    </View>
  );
}`}
          language="typescript"
          filename="MyDataApp.tsx"
          title="Your Complete API Integration"
        />

        <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg border border-blue-200 dark:border-blue-800 mb-6">
          <h4 className="text-blue-800 dark:text-blue-200 font-semibold mb-3 mt-0">
            🔧 Pro Tips for API Integration:
          </h4>
          <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1 mb-0">
            <li><strong>Always handle errors</strong> - Network requests can fail in many ways</li>
            <li><strong>Show loading states</strong> - Keep users informed during requests</li>
            <li><strong>Cache strategically</strong> - Reduce network calls for better performance</li>
            <li><strong>Use timeouts</strong> - Prevent requests from hanging indefinitely</li>
            <li><strong>Implement retry logic</strong> - Gracefully handle temporary failures</li>
            <li><strong>Clean up resources</strong> - Cancel requests when components unmount</li>
          </ul>
        </div>

        <h2>6. Session Summary</h2>

        <div className="bg-green-50 dark:bg-green-950 p-6 rounded-lg border border-green-200 dark:border-green-800 mb-6">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-3 mt-0">
            🎉 What You've Accomplished:
          </h4>
          <ul className="text-green-700 dark:text-green-300 text-sm space-y-1 mb-0">
            <li>✅ <strong>API Integration</strong> - Mastered both fetch and axios for HTTP requests</li>
            <li>✅ <strong>Loading States</strong> - Implemented proper loading indicators and feedback</li>
            <li>✅ <strong>Error Handling</strong> - Built robust error handling with categorization</li>
            <li>✅ <strong>Retry Logic</strong> - Added exponential backoff for failed requests</li>
            <li>✅ <strong>Caching System</strong> - Implemented data caching for performance</li>
            <li>✅ <strong>Memory Management</strong> - Proper cleanup to prevent memory leaks</li>
          </ul>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
          <h4 className="text-blue-800 dark:text-blue-200 font-semibold mb-3 mt-0">
            📚 Key Takeaways:
          </h4>
          <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1 mb-0">
            <li><strong>useEffect</strong> is perfect for data fetching on component mount</li>
            <li><strong>Axios</strong> provides better features than fetch for production apps</li>
            <li><strong>Error handling</strong> should be comprehensive and user-friendly</li>
            <li><strong>Loading states</strong> are essential for good user experience</li>
            <li><strong>Caching</strong> reduces network usage and improves performance</li>
            <li><strong>Cleanup</strong> prevents memory leaks and unwanted side effects</li>
          </ul>
        </div>

        <div className="bg-purple-50 dark:bg-purple-950 p-6 rounded-lg border border-purple-200 dark:border-purple-800 mt-6">
          <h4 className="text-purple-800 dark:text-purple-200 font-semibold mb-3 mt-0">
            🚀 Next Steps:
          </h4>
          <p className="text-purple-700 dark:text-purple-300 text-sm mb-2">
            You now have the skills to build data-driven applications that communicate with real APIs. 
            These patterns form the foundation of modern mobile app development.
          </p>
          <p className="text-purple-700 dark:text-purple-300 text-sm">
            In the next session, we'll explore custom hooks to extract and reuse this API logic 
            across different components!
          </p>
        </div>
      </div>
    </>
  );
}