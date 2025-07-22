"use client";

import { CodeBlock } from "@/components/ui/code-block-new";

export function Day3ChallengeContent() {
  return (
    <>
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">
            React Query Essentials - Session 5
          </h1>

          <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg border border-blue-200 dark:border-blue-800 mb-8">
            <h3 className="text-blue-800 dark:text-blue-200 font-semibold mb-4 mt-0">
              ⚡ Session Overview
            </h3>
            <ul className="text-blue-700 dark:text-blue-300 space-y-2 mb-0">
              <li>
                <strong>Quick Setup</strong> - Install and configure React Query
                in minutes
              </li>
              <li>
                <strong>useQuery Hook</strong> - Replace manual fetch with one
                simple hook
              </li>
              <li>
                <strong>Automatic Features</strong> - Caching, loading states,
                and error handling built-in
              </li>
            </ul>
          </div>
        </div>

        <h2>1. Why Use React Query?</h2>
        <p>
          Remember all the useState and useEffect code from Session 2? React
          Query replaces that complexity with one simple hook that handles
          everything automatically.
        </p>

        <div className="bg-yellow-50 dark:bg-yellow-950 p-6 rounded-lg border border-yellow-200 dark:border-yellow-800 mb-6">
          <h4 className="text-yellow-800 dark:text-yellow-200 font-semibold mb-3 mt-0">
            💡 Before vs After:
          </h4>
          <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1 mb-0">
            <li>
              <strong>Before</strong> - 20+ lines: useState, useEffect,
              try/catch, loading states
            </li>
            <li>
              <strong>With React Query</strong> - 5 lines: useQuery hook handles
              everything!
            </li>
            <li>
              <strong>Bonus</strong> - Automatic caching, background updates,
              retry logic
            </li>
          </ul>
        </div>

        <h2>2. Essential Setup (2 minutes)</h2>

        <CodeBlock
          code={`# Install React Query
npm install @tanstack/react-query`}
          language="bash"
          filename="terminal"
          title="Quick Install"
        />

        <CodeBlock
          code={`import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create query client (do this once)
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <YourApp />
    </QueryClientProvider>
  );
}`}
          language="jsx"
          filename="App.jsx"
          title="Basic Setup - Wrap Your App"
        />

        <h2>3. Your First useQuery - Replace All That Code!</h2>
        <p>
          Here's the same user fetching from Session 2, but with React Query.
          Notice how much simpler it becomes:
        </p>

        <CodeBlock
          code={`import React from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useQuery } from '@tanstack/react-query';

// Your API function (same as before)
const fetchUsers = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  if (!response.ok) throw new Error('Failed to fetch');
  return response.json();
};

export default function UsersList() {
  // ✨ This ONE hook replaces all the manual state management!
  const { data: users = [], isLoading, error, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  // Loading - handled automatically
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={{ marginTop: 10 }}>Loading...</Text>
      </View>
    );
  }

  // Error - handled automatically
  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'red', marginBottom: 20 }}>Error: {error.message}</Text>
        <TouchableOpacity 
          style={{ backgroundColor: '#007AFF', padding: 15, borderRadius: 8 }}
          onPress={() => refetch()}
        >
          <Text style={{ color: 'white' }}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Success - show data
  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#f5f5f5' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
        Users ({users.length})
      </Text>

      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ 
            padding: 15, 
            marginBottom: 10, 
            backgroundColor: 'white', 
            borderRadius: 8 
          }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.name}</Text>
            <Text style={{ color: '#666' }}>{item.email}</Text>
          </View>
        )}
        refreshing={isLoading}
        onRefresh={refetch}
      />
    </View>
  );
}`}
          language="jsx"
          filename="UsersList.jsx"
          title="useQuery - Replace All Manual State Management"
        />

        <div className="bg-green-50 dark:bg-green-950 p-6 rounded-lg border border-green-200 dark:border-green-800 mb-6">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-3 mt-0">
            🚀 What useQuery Gives You:
          </h4>
          <ul className="text-green-700 dark:text-green-300 text-sm space-y-1 mb-0">
            <li>
              <strong>data</strong> - Your fetched data (empty array/object by
              default)
            </li>
            <li>
              <strong>isLoading</strong> - True when first loading
            </li>
            <li>
              <strong>error</strong> - Any error that occurred
            </li>
            <li>
              <strong>refetch</strong> - Function to refresh data
            </li>
            <li>
              <strong>Automatic caching</strong> - Visit screen again = instant
              load!
            </li>
          </ul>
        </div>

        <h2>4. Essential Query Keys</h2>
        <p>
          Query keys tell React Query how to cache your data. Simple rule:
          unique key = separate cache.
        </p>

        <CodeBlock
          code={`// Static data - simple key
const { data } = useQuery({
  queryKey: ['users'],
  queryFn: fetchUsers,
});

// Dynamic data - include parameters in key
const { data } = useQuery({
  queryKey: ['user', userId],
  queryFn: () => fetchUser(userId),
});

// Each unique key gets its own cache entry
// ['users'] - cached separately
// ['user', '1'] - cached separately  
// ['user', '2'] - cached separately`}
          language="jsx"
          filename="QueryKeys.jsx"
          title="Query Keys - Simple Rule"
        />

        <h2>5. Essential Practice</h2>
        <p>
          Try this: Replace one of your manual fetch calls with useQuery and see
          the difference!
        </p>

        <div className="bg-orange-50 dark:bg-orange-950 p-6 rounded-lg border border-orange-200 dark:border-orange-800 mb-6">
          <h4 className="text-orange-800 dark:text-orange-200 font-semibold mb-3 mt-0">
            🎯 Quick Practice:
          </h4>
          <ul className="text-orange-700 dark:text-orange-300 text-sm space-y-1 mb-0">
            <li>• Install React Query and wrap your app</li>
            <li>• Replace one fetch call with useQuery</li>
            <li>• Test the automatic caching (navigate away and back)</li>
            <li>• Try pull-to-refresh with refetch</li>
          </ul>
        </div>

        <h2>6. Session Summary</h2>

        <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
          <h4 className="text-blue-800 dark:text-blue-200 font-semibold mb-3 mt-0">
            📚 React Query Essentials:
          </h4>
          <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1 mb-0">
            <li>
              <strong>QueryClientProvider</strong> - Wrap your app once
            </li>
            <li>
              <strong>useQuery</strong> - Replace manual fetch logic
            </li>
            <li>
              <strong>Query keys</strong> - Unique keys for separate caching
            </li>
            <li>
              <strong>Automatic features</strong> - Caching, loading, errors,
              retries
            </li>
            <li>
              <strong>Better UX</strong> - Instant loads from cache + fresh data
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
