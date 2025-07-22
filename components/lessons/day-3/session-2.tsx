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
                <strong>Basic fetch API</strong> - Learn HTTP requests with native fetch function
              </li>
              <li>
                <strong>Loading & Error States</strong> - Handle async operations with user feedback
              </li>
              <li>
                <strong>useEffect Integration</strong> - Fetch data on component mount
              </li>
              <li>
                <strong>Simple Axios Example</strong> - Introduction to axios library
              </li>
            </ul>
          </div>
        </div>

        <h2>1. Why API Integration Matters</h2>
        <p>
          Remember the forms from Session 1? We handled data locally. Now let's connect to real APIs 
          to fetch data from servers, making your apps dynamic and connected.
        </p>

        <div className="bg-green-50 dark:bg-green-950 p-6 rounded-lg border border-green-200 dark:border-green-800 mb-6">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-3 mt-0">
            ✅ What APIs Give You:
          </h4>
          <ul className="text-green-700 dark:text-green-300 text-sm space-y-1 mb-0">
            <li><strong>Real data</strong> - Get current information from servers</li>
            <li><strong>User content</strong> - Load user profiles and personalized data</li>
            <li><strong>Dynamic apps</strong> - Apps that change and update with new content</li>
            <li><strong>Data sharing</strong> - Multiple users can see the same information</li>
          </ul>
        </div>

        <h2>2. Basic API Fetching with useEffect</h2>
        <p>
          Let's start simple - fetch a list of users from a free API and display them 
          with loading states and error handling.
        </p>

        <CodeBlock
          code={`import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch users from API
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);

      // Using native fetch API
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      const userData = await response.json();
      setUsers(userData);
      
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when component mounts
  useEffect(() => {
    fetchUsers();
  }, []); // Empty array = run once on mount

  // Render individual user
  const renderUser = ({ item }) => (
    <View style=\\{{ padding: 15, marginBottom: 10, backgroundColor: 'white', borderRadius: 8 }}>
      <Text style=\\{{ fontSize: 16, fontWeight: 'bold' }}>{item.name}</Text>
      <Text style=\\{{ color: '#666' }}>{item.email}</Text>
      <Text style=\\{{ color: '#666' }}>{item.company.name}</Text>
    </View>
  );

  // Loading state
  if (loading) {
    return (
      <View style=\\{{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style=\\{{ marginTop: 10 }}>Loading users...</Text>
      </View>
    );
  }

  // Error state
  if (error) {
    return (
      <View style=\\{{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <Text style=\\{{ fontSize: 18, color: 'red', marginBottom: 20 }}>Oops! {error}</Text>
        <TouchableOpacity 
          style=\\{{ backgroundColor: '#007AFF', padding: 15, borderRadius: 8 }}
          onPress={fetchUsers}
        >
          <Text style=\\{{ color: 'white' }}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Success state - show users
  return (
    <View style=\\{{ flex: 1, padding: 20, backgroundColor: '#f5f5f5' }}>
      <Text style=\\{{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
        Users ({users.length})
      </Text>

      <FlatList
        data={users}
        renderItem={renderUser}
        keyExtractor={(item) => item.id.toString()}
        refreshing={loading}
        onRefresh={fetchUsers}
      />
    </View>
  );
}`}
          language="typescript"
          filename="UserList.tsx"
          title="Simple API Data Fetching with useEffect"
        />

        <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg border border-blue-200 dark:border-blue-800 mb-6">
          <h4 className="text-blue-800 dark:text-blue-200 font-semibold mb-3 mt-0">
            🔧 Key API Concepts:
          </h4>
          <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1 mb-0">
            <li><strong>useEffect</strong> - Fetch data when component mounts</li>
            <li><strong>async/await</strong> - Handle promises cleanly</li>
            <li><strong>try/catch</strong> - Proper error handling</li>
            <li><strong>Loading states</strong> - Show feedback during requests</li>
            <li><strong>Error states</strong> - Handle failures gracefully</li>
            <li><strong>Pull to refresh</strong> - Let users refresh data</li>
          </ul>
        </div>

        <h2>3. Using Axios for API Calls</h2>
        <p>
          Axios is a popular library that makes API calls easier than fetch. 
          Let's see a simple example of using axios to fetch posts.
        </p>

        <CodeBlock
          code={`// First install axios: npm install axios

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';

export default function PostsList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch posts using axios
  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);

      // Using axios - cleaner than fetch
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
      
      // Axios automatically parses JSON
      setPosts(response.data);
      
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when component mounts
  useEffect(() => {
    fetchPosts();
  }, []);

  // Render individual post
  const renderPost = ({ item }) => (
    <View style=\\{{ padding: 15, marginBottom: 10, backgroundColor: 'white', borderRadius: 8 }}>
      <Text style=\\{{ fontSize: 16, fontWeight: 'bold', marginBottom: 5 }}>
        {item.title}
      </Text>
      <Text style=\\{{ color: '#666' }} numberOfLines={2}>
        {item.body}
      </Text>
    </View>
  );

  if (loading) {
    return (
      <View style=\\{{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style=\\{{ marginTop: 10 }}>Loading posts...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style=\\{{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <Text style=\\{{ fontSize: 18, color: 'red', marginBottom: 20 }}>{error}</Text>
        <TouchableOpacity 
          style=\\{{ backgroundColor: '#007AFF', padding: 15, borderRadius: 8 }}
          onPress={fetchPosts}
        >
          <Text style=\\{{ color: 'white' }}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style=\\{{ flex: 1, padding: 20, backgroundColor: '#f5f5f5' }}>
      <Text style=\\{{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
        Posts ({posts.length})
      </Text>

      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id.toString()}
        refreshing={loading}
        onRefresh={fetchPosts}
      />
    </View>
  );
}`}
          language="typescript"
          filename="PostsList.tsx"
          title="Simple API Integration with Axios"
        />

        <div className="bg-yellow-50 dark:bg-yellow-950 p-6 rounded-lg border border-yellow-200 dark:border-yellow-800 mb-6">
          <h4 className="text-yellow-800 dark:text-yellow-200 font-semibold mb-3 mt-0">
            💡 Why Choose Axios:
          </h4>
          <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1 mb-0">
            <li><strong>Automatic JSON parsing</strong> - No need to call .json() like with fetch</li>
            <li><strong>Better error handling</strong> - More detailed error information</li>
            <li><strong>Request/response interceptors</strong> - Add headers or log requests globally</li>
            <li><strong>Built-in timeout support</strong> - Prevent hanging requests</li>
            <li><strong>Wide compatibility</strong> - Works in older browsers</li>
          </ul>
        </div>

        <h2>4. Hands-On Exercise</h2>
        <p>
          Now it's time to practice! Try building your own data fetching component that combines 
          what you've learned about APIs.
        </p>

        <div className="bg-orange-50 dark:bg-orange-950 p-6 rounded-lg border border-orange-200 dark:border-orange-800 mb-6">
          <h4 className="text-orange-800 dark:text-orange-200 font-semibold mb-3 mt-0">
            🎯 Practice Exercise:
          </h4>
          <ul className="text-orange-700 dark:text-orange-300 text-sm space-y-1 mb-0">
            <li>• Create a component that fetches data from a public API</li>
            <li>• Add loading states with ActivityIndicator</li>
            <li>• Handle errors and show retry buttons</li>
            <li>• Implement pull-to-refresh functionality</li>
            <li>• Try both fetch and axios approaches</li>
            <li>• Display the data in a clean, readable format</li>
          </ul>
        </div>

        <h2>5. Session Summary</h2>

        <div className="bg-green-50 dark:bg-green-950 p-6 rounded-lg border border-green-200 dark:border-green-800 mb-6">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-3 mt-0">
            🎉 What You've Learned:
          </h4>
          <ul className="text-green-700 dark:text-green-300 text-sm space-y-1 mb-0">
            <li>✅ <strong>Basic API Fetching</strong> - Using fetch to get data from servers</li>
            <li>✅ <strong>Loading States</strong> - Showing loading indicators during requests</li>
            <li>✅ <strong>Error Handling</strong> - Handling failed requests gracefully</li>
            <li>✅ <strong>useEffect Integration</strong> - Fetching data when components mount</li>
            <li>✅ <strong>Axios Basics</strong> - Using axios for cleaner API calls</li>
            <li>✅ <strong>Pull to Refresh</strong> - Letting users refresh data</li>
          </ul>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
          <h4 className="text-blue-800 dark:text-blue-200 font-semibold mb-3 mt-0">
            📚 Key Concepts:
          </h4>
          <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1 mb-0">
            <li><strong>useEffect</strong> is perfect for fetching data when components load</li>
            <li><strong>async/await</strong> makes API calls easier to read and write</li>
            <li><strong>try/catch</strong> is essential for handling API errors</li>
            <li><strong>Loading states</strong> keep users informed about what's happening</li>
            <li><strong>Error states</strong> help users understand and retry failed requests</li>
            <li><strong>Inline styling</strong> keeps code simple and focused on logic</li>
          </ul>
        </div>
      </div>
    </>
  );
}