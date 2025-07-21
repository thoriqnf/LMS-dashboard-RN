"use client";

import { CodeBlock } from "@/components/ui/code-block-new";

export function Day2Session1Content() {
  return (
    <>
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">
            Expo Router Deep Dive - Session 1
          </h1>

          <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg border border-blue-200 dark:border-blue-800 mb-8">
            <h3 className="text-blue-800 dark:text-blue-200 font-semibold mb-4 mt-0">
              🚀 Session Overview
            </h3>
            <ul className="text-blue-700 dark:text-blue-300 space-y-2 mb-0">
              <li>
                <strong>Advanced Layout Patterns</strong> - Master stack and tab layout configurations
              </li>
              <li>
                <strong>Modal Routes</strong> - Implement overlay navigation and presentation styles
              </li>
              <li>
                <strong>Route Parameters</strong> - Advanced useLocalSearchParams patterns
              </li>
              <li>
                <strong>Navigation Actions</strong> - Programmatic navigation and state management
              </li>
            </ul>
          </div>
        </div>

        <h2>1. What You Need to Know First</h2>

        <div className="bg-yellow-50 dark:bg-yellow-950 p-6 rounded-lg border border-yellow-200 dark:border-yellow-800 mb-6">
          <h4 className="text-yellow-800 dark:text-yellow-200 font-semibold mb-3 mt-0">
            📋 Prerequisites from Day 1
          </h4>
          <p className="text-yellow-700 dark:text-yellow-300 text-sm mb-3">
            This session builds on Day 1 Session 4 (Intro to Expo Router). Make sure you understand:
          </p>
          <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1 mb-0">
            <li>• File-based routing (app/index.jsx creates routes)</li>
            <li>• Basic navigation with Link and useRouter</li>
            <li>• Tab navigation with (tabs) folder</li>
            <li>• Dynamic routes with [id].jsx files</li>
          </ul>
        </div>

        <h2>2. Navigation Fundamentals: Building Your Mental Model</h2>

        <h3>Think of Navigation Like Building Directions</h3>
        <p>
          Before diving into advanced features, let's understand what navigation really means in mobile apps. 
          Think of app navigation like giving directions in a building:
        </p>

        <div className="my-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
          <h4 className="text-blue-800 dark:text-blue-200 font-semibold mb-2 mt-0">
            🏢 Navigation is like building directions:
          </h4>
          <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1 mb-0">
            <li>
              <strong>Screens = Rooms</strong> - Each screen is like a room in a building
            </li>
            <li>
              <strong>Routes = Hallways</strong> - Routes connect rooms and tell you how to get there
            </li>
            <li>
              <strong>Navigation = GPS</strong> - Navigation helps users move between rooms smoothly
            </li>
            <li>
              <strong>Parameters = Room Numbers</strong> - Parameters tell you which specific room to go to
            </li>
          </ul>
        </div>

        <h3>Basic Navigation Concepts</h3>
        <p>
          Let's start with simple navigation concepts before getting into advanced patterns. 
          Every navigation system has these basic elements:
        </p>

        <div className="grid md:grid-cols-2 gap-4 my-6">
          <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
            <h4 className="text-green-800 dark:text-green-200 font-semibold mb-2 mt-0">✅ What Users See:</h4>
            <div className="text-green-700 dark:text-green-300 text-sm space-y-1">
              <div>• Buttons that take them to new screens</div>
              <div>• Back buttons to return where they came from</div>
              <div>• Tabs to switch between main sections</div>
              <div>• Smooth transitions between screens</div>
            </div>
          </div>
          <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg border border-purple-200 dark:border-purple-800">
            <h4 className="text-purple-800 dark:text-purple-200 font-semibold mb-2 mt-0">🔧 What Developers Build:</h4>
            <div className="text-purple-700 dark:text-purple-300 text-sm space-y-1">
              <div>• Route definitions (which files handle which screens)</div>
              <div>• Navigation logic (how to move between screens)</div>
              <div>• Layout configurations (how screens look and behave)</div>
              <div>• Parameter passing (how to send data between screens)</div>
            </div>
          </div>
        </div>

        <h3>Simple Navigation Example</h3>
        <p>
          Let's start with a basic example that shows navigation fundamentals before we get into advanced patterns:
        </p>

        <CodeBlock
          code={`// app/index.jsx - Your home screen
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Link, useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Navigation Basics!</Text>
      <Text style={styles.subtitle}>
        Choose how you want to navigate to the profile screen:
      </Text>
      
      {/* Method 1: Using Link component (declarative) */}
      <Link href="/profile" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>
            Go to Profile (Using Link)
          </Text>
        </TouchableOpacity>
      </Link>
      
      {/* Method 2: Using router.push (programmatic) */}
      <TouchableOpacity 
        style={[styles.button, styles.secondaryButton]}
        onPress={() => router.push('/profile')}
      >
        <Text style={styles.buttonText}>
          Go to Profile (Using Router)
        </Text>
      </TouchableOpacity>
      
      {/* Method 3: Navigation with data */}
      <TouchableOpacity 
        style={[styles.button, styles.accentButton]}
        onPress={() => router.push('/profile?name=John&age=25')}
      >
        <Text style={styles.buttonText}>
          Go to Profile with Data
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#2c3e50',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#7f8c8d',
    lineHeight: 22,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 15,
    minWidth: 250,
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: '#34C759',
  },
  accentButton: {
    backgroundColor: '#FF3B30',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});`}
          language="jsx"
          filename="app/index.jsx"
          title="Basic Navigation Examples"
        />

        <CodeBlock
          code={`// app/profile.jsx - Your profile screen
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function ProfileScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  // Extract parameters (if any were passed)
  const name = params.name || 'Guest';
  const age = params.age || 'Unknown';
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Screen</Text>
      
      {/* Show data that was passed via navigation */}
      <View style={styles.infoBox}>
        <Text style={styles.infoLabel}>Name:</Text>
        <Text style={styles.infoValue}>{name}</Text>
      </View>
      
      <View style={styles.infoBox}>
        <Text style={styles.infoLabel}>Age:</Text>
        <Text style={styles.infoValue}>{age}</Text>
      </View>
      
      {/* Navigation buttons */}
      <TouchableOpacity 
        style={styles.button}
        onPress={() => router.back()}
      >
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.button, styles.homeButton]}
        onPress={() => router.push('/')}
      >
        <Text style={styles.buttonText}>Go to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#2c3e50',
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    minWidth: 250,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#495057',
  },
  infoValue: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 15,
    minWidth: 250,
    alignItems: 'center',
  },
  homeButton: {
    backgroundColor: '#34C759',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});`}
          language="jsx"
          filename="app/profile.jsx"
          title="Profile Screen with Parameter Handling"
        />

        <div className="bg-green-50 dark:bg-green-950 p-6 rounded-lg border border-green-200 dark:border-green-800 mb-6">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-3 mt-0">
            🎯 Understanding the Basics
          </h4>
          <ul className="text-green-700 dark:text-green-300 text-sm space-y-1 mb-0">
            <li><strong>Link component</strong> - Like an anchor tag, declarative navigation</li>
            <li><strong>router.push()</strong> - Programmatic navigation, like window.location</li>
            <li><strong>router.back()</strong> - Go back to previous screen</li>
            <li><strong>Parameters</strong> - Pass data between screens using query strings</li>
            <li><strong>useLocalSearchParams</strong> - Access parameters in the destination screen</li>
          </ul>
        </div>

        <h2>3. Building on Day 1: From Basic to Advanced</h2>
        <p>
          Now that we understand navigation fundamentals, let's connect this to what you learned in Day 1 Session 4, 
          and then dive deeper into advanced patterns that make your app feel truly professional.
        </p>

        <div className="grid md:grid-cols-2 gap-4 my-6">
          <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border">
            <h4 className="font-semibold mb-2 mt-0">📱 Day 1 Foundation:</h4>
            <div className="text-sm space-y-1">
              <div>• Basic file-based routing</div>
              <div>• Simple tab navigation</div>
              <div>• Basic Link and useRouter</div>
              <div>• Dynamic routes [id].jsx</div>
            </div>
          </div>
          <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
            <h4 className="text-blue-800 dark:text-blue-200 font-semibold mb-2 mt-0">🚀 Day 2 Advanced:</h4>
            <div className="text-blue-700 dark:text-blue-300 text-sm space-y-1">
              <div>• Custom layout configurations</div>
              <div>• Modal presentation styles</div>
              <div>• Complex parameter handling</div>
              <div>• Advanced navigation patterns</div>
            </div>
          </div>
        </div>

        <h2>4. Example 1: Advanced Layout Patterns</h2>

        <h3>Building on Your Tab App: Custom Layout Options</h3>
        <p>
          Remember our tab app from Day 1? Let's enhance it with advanced layout configurations, 
          custom headers, and professional navigation patterns.
        </p>

        <CodeBlock
          code={`// app/_layout.jsx - Advanced root layout with custom options
import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  
  return (
    <Stack
      screenOptions={{
        // Custom header styling
        headerStyle: {
          backgroundColor: colorScheme === 'dark' ? '#1a1a1a' : '#ffffff',
        },
        headerTintColor: colorScheme === 'dark' ? '#ffffff' : '#000000',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 18,
        },
        // Custom animations
        animation: 'slide_from_right',
        // Hide header back button text on iOS
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen 
        name="index" 
        options={{ 
          title: 'Contact Us',
          headerShown: false, // Hide header for home screen
        }} 
      />
      <Stack.Screen 
        name="profile" 
        options={{ 
          title: 'Profile',
          presentation: 'card', // Card presentation style
        }} 
      />
      <Stack.Screen 
        name="settings" 
        options={{ 
          title: 'Settings',
          headerRight: () => (
            <TouchableOpacity onPress={() => alert('Save settings')}>
              <Text style={{ color: '#007AFF', fontWeight: 'bold' }}>Save</Text>
            </TouchableOpacity>
          ),
        }} 
      />
      <Stack.Screen 
        name="(tabs)" 
        options={{ headerShown: false }} // Hide header for tab navigator
      />
    </Stack>
  );
}`}
          language="jsx"
          filename="app/_layout.jsx"
          title="Advanced Root Layout Configuration"
        />

        <CodeBlock
          code={`// app/(tabs)/_layout.jsx - Dynamic tab configuration
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'react-native';
import { Platform } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  
  // Dynamic tab bar styling based on theme
  const tabBarStyle = {
    backgroundColor: colorScheme === 'dark' ? '#1a1a1a' : '#ffffff',
    borderTopWidth: 1,
    borderTopColor: colorScheme === 'dark' ? '#333333' : '#e1e5e9',
    paddingBottom: Platform.OS === 'ios' ? 20 : 0, // Handle iPhone safe area
    height: Platform.OS === 'ios' ? 80 : 60,
  };
  
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: colorScheme === 'dark' ? '#666666' : '#999999',
        tabBarStyle: tabBarStyle,
        // Custom tab bar label styling
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        // Header configuration for all tabs
        headerStyle: {
          backgroundColor: colorScheme === 'dark' ? '#1a1a1a' : '#ffffff',
        },
        headerTintColor: colorScheme === 'dark' ? '#ffffff' : '#000000',
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Contact',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons 
              name={focused ? 'mail' : 'mail-outline'} 
              size={size} 
              color={color} 
            />
          ),
          // Custom header for this tab
          headerTitle: 'Contact Form',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons 
              name={focused ? 'person' : 'person-outline'} 
              size={size} 
              color={color} 
            />
          ),
          // Add badge to profile tab
          tabBarBadge: 1,
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: 'Messages',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons 
              name={focused ? 'chatbubbles' : 'chatbubbles-outline'} 
              size={size} 
              color={color} 
            />
          ),
          // Dynamic badge based on unread messages
          tabBarBadge: 3,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons 
              name={focused ? 'settings' : 'settings-outline'} 
              size={size} 
              color={color} 
            />
          ),
        }}
      />
    </Tabs>
  );
}`}
          language="jsx"
          filename="app/(tabs)/_layout.jsx"
          title="Dynamic Tab Layout with Theme Support"
        />

        <div className="my-6 p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-2 mt-0">
            🎯 Advanced Layout Features:
          </h4>
          <ul className="text-green-700 dark:text-green-300 text-sm space-y-1 mb-0">
            <li><strong>Theme Integration</strong> - Dynamic styling based on dark/light mode</li>
            <li><strong>Platform-Specific</strong> - Different styles for iOS vs Android</li>
            <li><strong>Custom Header Actions</strong> - Buttons and interactive elements</li>
            <li><strong>Tab Bar Badges</strong> - Dynamic notification indicators</li>
            <li><strong>Focused States</strong> - Different icons for active/inactive tabs</li>
          </ul>
        </div>

        <h2>5. Example 2: Modal Routes and Presentation</h2>

        <h3>Building on Your App: Adding Modal Screens</h3>
        <p>
          Modal routes are perfect for forms, settings, or any content that should overlay the current screen. 
          Let's add modal functionality to your existing app.
        </p>

        <CodeBlock
          code={`// app/modal/edit-profile.jsx - Modal screen for editing profile
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function EditProfileModal() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  
  const handleSave = () => {
    // Save profile logic here
    alert('Profile updated!');
    router.back(); // Close modal
  };
  
  return (
    <View style={styles.container}>
      {/* Modal Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.cancelButton}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Edit Profile</Text>
        <TouchableOpacity onPress={handleSave}>
          <Text style={styles.saveButton}>Save</Text>
        </TouchableOpacity>
      </View>
      
      {/* Modal Content */}
      <View style={styles.content}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
          />
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e5e9',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cancelButton: {
    color: '#666',
    fontSize: 16,
  },
  saveButton: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e1e5e9',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: 'white',
  },
});`}
          language="jsx"
          filename="app/modal/edit-profile.jsx"
          title="Modal Screen for Profile Editing"
        />

        <CodeBlock
          code={`// Update app/_layout.jsx to include modal routes
export default function RootLayout() {
  return (
    <Stack screenOptions={{ /* ... existing options ... */ }}>
      {/* ... existing screens ... */}
      
      {/* Modal Routes */}
      <Stack.Screen
        name="modal/edit-profile"
        options={{
          presentation: 'modal', // Present as modal
          headerShown: false, // Hide default header (we have custom one)
        }}
      />
      <Stack.Screen
        name="modal/message-compose"
        options={{
          presentation: 'fullScreenModal', // Full screen modal
          title: 'New Message',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Text style={{ color: '#007AFF' }}>Cancel</Text>
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
}`}
          language="jsx"
          filename="Updated _layout.jsx"
          title="Modal Route Configuration"
        />

        <CodeBlock
          code={`// Update app/(tabs)/profile.jsx to open modal
import { useRouter } from 'expo-router';

export default function ProfileTab() {
  const router = useRouter();
  
  const openEditProfile = () => {
    router.push('/modal/edit-profile');
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Profile</Text>
      
      <View style={styles.profileCard}>
        <Text style={styles.cardTitle}>Welcome!</Text>
        <Text style={styles.profileText}>
          Your profile information and settings.
        </Text>
      </View>
      
      {/* NEW: Button to open modal */}
      <TouchableOpacity 
        style={styles.editButton}
        onPress={openEditProfile}
      >
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
}`}
          language="jsx"
          filename="Updated profile.jsx"
          title="Opening Modal from Tab Screen"
        />

        <div className="my-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
          <h4 className="text-blue-800 dark:text-blue-200 font-semibold mb-2 mt-0">
            🆕 Modal Route Features:
          </h4>
          <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1 mb-0">
            <li><strong>presentation: 'modal'</strong> - Slides up from bottom, shows previous screen</li>
            <li><strong>presentation: 'fullScreenModal'</strong> - Takes full screen, hides previous screen</li>
            <li><strong>Custom Headers</strong> - Cancel/Save buttons, custom styling</li>
            <li><strong>Modal Navigation</strong> - router.back() to close, router.push() to open</li>
          </ul>
        </div>

        <h2>6. Example 3: Advanced Parameter Handling</h2>

        <h3>Building on Your App: Complex Parameter Patterns</h3>
        <p>
          Let's enhance your message detail screen with advanced parameter handling, 
          validation, and complex data passing patterns.
        </p>

        <CodeBlock
          code={`// app/message/[id].jsx - Advanced parameter handling
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

export default function MessageDetail() {
  const params = useLocalSearchParams();
  const router = useRouter();
  
  // Extract and validate parameters
  const messageId = Array.isArray(params.id) ? params.id[0] : params.id;
  const messageType = Array.isArray(params.type) ? params.type[0] : params.type;
  const fromTab = Array.isArray(params.from) ? params.from[0] : params.from;
  
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Validate required parameters
    if (!messageId) {
      alert('Invalid message ID');
      router.back();
      return;
    }
    
    // Load message data based on ID and type
    loadMessage(messageId, messageType);
  }, [messageId, messageType]);
  
  const loadMessage = async (id, type = 'inbox') => {
    setLoading(true);
    
    // Simulate API call with parameters
    try {
      const messageData = await fetchMessage(id, type);
      setMessage(messageData);
    } catch (error) {
      alert('Failed to load message');
      router.back();
    } finally {
      setLoading(false);
    }
  };
  
  const handleReply = () => {
    // Navigate with complex parameters
    router.push({
      pathname: '/modal/message-compose',
      params: {
        replyTo: messageId,
        recipient: message.from,
        subject: \`Re: \${message.subject}\`,
        originalMessage: message.content,
        returnTo: fromTab || 'messages',
      },
    });
  };
  
  const handleDelete = () => {
    // Navigate back with result parameters
    router.push({
      pathname: \`/(tabs)/\${fromTab || 'messages'}\`,
      params: {
        deleted: messageId,
        action: 'delete',
        timestamp: Date.now(),
      },
    });
  };
  
  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading message...</Text>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.messageHeader}>
        <Text style={styles.messageSubject}>{message.subject}</Text>
        <Text style={styles.messageFrom}>From: {message.from}</Text>
        <Text style={styles.messageDate}>{message.date}</Text>
        <Text style={styles.messageType}>Type: {messageType}</Text>
      </View>
      
      <View style={styles.messageContent}>
        <Text style={styles.messageText}>{message.content}</Text>
      </View>
      
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.replyButton} onPress={handleReply}>
          <Text style={styles.replyButtonText}>Reply</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}`}
          language="jsx"
          filename="app/message/[id].jsx"
          title="Advanced Parameter Handling"
        />

        <CodeBlock
          code={`// app/(tabs)/messages.jsx - Enhanced navigation with parameters
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

export default function MessagesTab() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  // Handle return parameters from message detail
  useEffect(() => {
    if (params.deleted) {
      // Message was deleted, remove from list
      handleMessageDeleted(params.deleted);
    }
    if (params.action === 'sent') {
      // Message was sent, show success
      showSuccessMessage('Message sent successfully!');
    }
  }, [params]);
  
  const handleMessagePress = (messageId, messageType = 'inbox') => {
    // Navigate with detailed parameters
    router.push({
      pathname: \`/message/\${messageId}\`,
      params: {
        type: messageType,
        from: 'messages', // Tell detail screen where we came from
        timestamp: Date.now(),
      },
    });
  };
  
  const handleComposeMessage = () => {
    // Navigate to compose with preset parameters
    router.push({
      pathname: '/modal/message-compose',
      params: {
        mode: 'new',
        returnTo: 'messages',
        defaultSubject: '',
      },
    });
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
        <TouchableOpacity 
          style={styles.composeButton}
          onPress={handleComposeMessage}
        >
          <Text style={styles.composeButtonText}>Compose</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.messagesList}>
        {messages.map((message) => (
          <TouchableOpacity
            key={message.id}
            style={styles.messageCard}
            onPress={() => handleMessagePress(message.id, message.type)}
          >
            <Text style={styles.messageSubject}>{message.subject}</Text>
            <Text style={styles.messagePreview}>{message.preview}</Text>
            <Text style={styles.messageType}>{message.type}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}`}
          language="jsx"
          filename="Enhanced messages.jsx"
          title="Complex Parameter Navigation"
        />

        <div className="my-6 p-4 bg-purple-50 dark:bg-purple-950 rounded-lg border border-purple-200 dark:border-purple-800">
          <h4 className="text-purple-800 dark:text-purple-200 font-semibold mb-2 mt-0">
            🔄 Advanced Parameter Features:
          </h4>
          <ul className="text-purple-700 dark:text-purple-300 text-sm space-y-1 mb-0">
            <li><strong>Parameter Validation</strong> - Check for required params, handle missing values</li>
            <li><strong>Complex Objects</strong> - Pass structured data between screens</li>
            <li><strong>Return Parameters</strong> - Send data back to previous screen</li>
            <li><strong>Parameter Types</strong> - Handle arrays, objects, and nested data</li>
            <li><strong>Navigation Context</strong> - Track where user came from for better UX</li>
          </ul>
        </div>

        <h2>7. Navigation Actions Deep Dive</h2>

        <h3>Professional Navigation Patterns</h3>
        <CodeBlock
          code={`// Advanced navigation patterns and actions
import { useRouter, usePathname } from 'expo-router';

export default function NavigationHelper() {
  const router = useRouter();
  const pathname = usePathname();
  
  // Advanced navigation actions
  const navigationActions = {
    // Replace current screen (can't go back)
    replaceWith: (path, params = {}) => {
      router.replace({ pathname: path, params });
    },
    
    // Push multiple screens in sequence
    navigateSequence: async (paths) => {
      for (const path of paths) {
        await router.push(path);
      }
    },
    
    // Navigate to specific tab with parameters
    navigateToTab: (tabName, params = {}) => {
      router.push({
        pathname: \`/(tabs)/\${tabName}\`,
        params: {
          ...params,
          navigatedFrom: pathname,
          timestamp: Date.now(),
        },
      });
    },
    
    // Smart back navigation
    smartBack: () => {
      if (router.canGoBack()) {
        router.back();
      } else {
        // Fallback to home if no back history
        router.push('/(tabs)/home');
      }
    },
    
    // Navigate with confirmation
    navigateWithConfirmation: (path, message = 'Are you sure?') => {
      Alert.alert(
        'Confirm Navigation',
        message,
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'OK', onPress: () => router.push(path) },
        ]
      );
    },
    
    // Navigate and reset stack
    resetToHome: () => {
      router.dismissAll(); // Close all modals
      router.push('/(tabs)/home');
    },
  };
  
  return navigationActions;
}`}
          language="jsx"
          filename="navigation-patterns.jsx"
          title="Advanced Navigation Patterns"
        />

        <h2>8. Hands-On Exercise</h2>

        <div className="my-6 p-4 bg-orange-50 dark:bg-orange-950 rounded-lg border border-orange-200 dark:border-orange-800">
          <h4 className="text-orange-800 dark:text-orange-200 font-semibold mb-3 mt-0">
            🎯 Your Advanced Challenge:
          </h4>
          <p className="text-orange-700 dark:text-orange-300 text-sm mb-3">
            Enhance your Day 1 tab app with these advanced features:
          </p>
          <ul className="text-orange-700 dark:text-orange-300 text-sm space-y-1 mb-0">
            <li><strong>Step 1</strong> - Add theme support and custom layout options</li>
            <li><strong>Step 2</strong> - Create an edit profile modal with proper presentation</li>
            <li><strong>Step 3</strong> - Implement complex parameter passing between screens</li>
            <li><strong>Step 4</strong> - Add advanced navigation actions and error handling</li>
            <li><strong>Step 5</strong> - Test all modal interactions and parameter flows</li>
          </ul>
        </div>

        <h3>🎉 What You've Mastered</h3>
        <div className="my-6 p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
          <ul className="text-green-700 dark:text-green-300 text-sm space-y-2 mb-0">
            <li><strong>Advanced Layouts</strong> - Custom styling, theme support, platform-specific options</li>
            <li><strong>Modal Navigation</strong> - Professional modal patterns and presentations</li>
            <li><strong>Complex Parameters</strong> - Validation, complex objects, return values</li>
            <li><strong>Navigation Actions</strong> - Professional navigation patterns and error handling</li>
            <li><strong>User Experience</strong> - Smooth transitions, proper feedback, intuitive flow</li>
          </ul>
        </div>

        <div className="my-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
          <h4 className="text-blue-800 dark:text-blue-200 font-semibold mb-3 mt-0">
            🚀 Coming Next - Session 2:
          </h4>
          <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1 mb-0">
            <li>React Native hooks (useEffect, useCallback, useMemo)</li>
            <li>Advanced state management patterns</li>
            <li>Component lifecycle and optimization</li>
            <li>Performance monitoring and debugging</li>
          </ul>
        </div>

        <p className="text-lg font-semibold text-center mt-8 mb-4">
          You're now a pro at advanced React Native navigation! 🚀📱
        </p>
      </div>
    </>
  );
}