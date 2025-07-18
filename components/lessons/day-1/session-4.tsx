"use client";

import { CodeBlock } from "@/components/ui/code-block-new";

export function Day1Session4Content() {
  return (
    <>
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">
            Intro to Expo Router - Session 4
          </h1>

          <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg border border-blue-200 dark:border-blue-800 mb-8">
            <h3 className="text-blue-800 dark:text-blue-200 font-semibold mb-4 mt-0">
              🧭 Session Overview
            </h3>
            <ul className="text-blue-700 dark:text-blue-300 space-y-2 mb-0">
              <li>
                <strong>Transform Single Screen to Multi-Screen</strong> - Turn our contact form into a complete app
              </li>
              <li>
                <strong>File-Based Routing</strong> - Learn how Expo Router works with file structure
              </li>
              <li>
                <strong>Navigation Components</strong> - Master Link, useRouter, and usePathname
              </li>
              <li>
                <strong>Tab Navigation</strong> - Create bottom tabs for main app sections
              </li>
            </ul>
          </div>
        </div>

        <h2>1. What is Expo Router?</h2>
        <p>
          Expo Router is like a GPS for your app - it helps users navigate between different screens. 
          Your file structure becomes your app's navigation structure automatically.
        </p>

        <div className="grid md:grid-cols-2 gap-4 my-6">
          <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border">
            <h4 className="font-semibold mb-2 mt-0">🌐 Website:</h4>
            <div className="text-sm space-y-1">
              <div>• /home - Home page</div>
              <div>• /profile - Profile page</div>
              <div>• Click links to navigate</div>
            </div>
          </div>
          <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
            <h4 className="text-blue-800 dark:text-blue-200 font-semibold mb-2 mt-0">📱 Mobile App:</h4>
            <div className="text-blue-700 dark:text-blue-300 text-sm space-y-1">
              <div>• /home - Home screen</div>
              <div>• /profile - Profile screen</div>
              <div>• Tap buttons to navigate</div>
            </div>
          </div>
        </div>

        <h2>2. File-Based Routing Structure</h2>

        <CodeBlock
          code={`// 📁 File structure becomes your app structure
app/
├── index.tsx          // Home screen (/) - your main page
├── profile.tsx        // Profile screen (/profile)
├── settings.tsx       // Settings screen (/settings)
├── (tabs)/           // Tab group folder
│   ├── home.tsx      // Tab home screen
│   ├── messages.tsx  // Tab messages screen
│   └── _layout.tsx   // Tab layout configuration
└── _layout.tsx       // Root layout wrapper

// When you create these files, Expo Router automatically creates routes:
// app/index.tsx → becomes the "/" route (home screen)
// app/profile.tsx → becomes the "/profile" route
// app/(tabs)/home.tsx → becomes the "/(tabs)/home" route`}
          language="javascript"
          filename="app-structure.txt"
          title="File-Based Routing Structure"
        />

        <h2>3. Example 1: Basic Navigation (Stack Navigation)</h2>

        <h3>Building on Session 3: Adding Navigation</h3>
        <p>
          Remember our contact form from Session 3? Let's transform it into a multi-screen app. 
          Instead of repeating all the form code, I'll show you the key routing parts.
        </p>

        <CodeBlock
          code={`// app/_layout.tsx - Root layout setup
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Contact Us' }} />
      <Stack.Screen name="profile" options={{ title: 'Profile' }} />
      <Stack.Screen name="settings" options={{ title: 'Settings' }} />
    </Stack>
  );
}`}
          language="jsx"
          filename="app/_layout.tsx"
          title="Root Layout Setup"
        />

        <CodeBlock
          code={`// app/index.tsx - Home screen (Key changes from Session 3)
import { Link, useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();
  
  // ... all your contact form logic from Session 3 stays the same ...
  
  // Enhanced submit function WITH navigation
  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      Alert.alert('Success!', 'Your message has been sent.', [
        { text: 'OK', onPress: () => router.push('/profile') } // NEW: Navigate to profile
      ]);
      
      // Clear form...
    }, 2000);
  };
  
  return (
    <View style={styles.container}>
      {/* ... your entire contact form from Session 3 ... */}
      
      {/* NEW: Add navigation button */}
      <Link href="/profile" style={styles.linkButton}>
        <Text style={styles.linkButtonText}>View Profile</Text>
      </Link>
    </View>
  );
}`}
          language="jsx"
          filename="app/index.tsx"
          title="Home Screen - Key Navigation Changes"
        />

        <CodeBlock
          code={`// app/profile.tsx - Profile screen
import { Link, useRouter } from 'expo-router';

export default function ProfileScreen() {
  const router = useRouter();
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Profile</Text>
      
      <View style={styles.profileCard}>
        <Text style={styles.cardTitle}>Welcome!</Text>
        <Text style={styles.profileText}>
          Thank you for using our contact form.
        </Text>
        
        <View style={styles.infoSection}>
          <Text style={styles.infoLabel}>Status:</Text>
          <Text style={styles.infoValue}>Active User</Text>
        </View>
      </View>
      
      {/* Navigation options */}
      <Link href="/" style={styles.linkButton}>
        <Text style={styles.linkButtonText}>Back to Contact Form</Text>
      </Link>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={() => router.back()} // Go back to previous screen
      >
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}`}
          language="jsx"
          filename="app/profile.tsx"
          title="Profile Screen"
        />

        <div className="my-6 p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-2 mt-0">
            🎯 What's New in Example 1:
          </h4>
          <ul className="text-green-700 dark:text-green-300 text-sm space-y-1 mb-0">
            <li><strong>File-Based Routing</strong> - Create files, get automatic routes</li>
            <li><strong>Link Component</strong> - Navigate with <code>&lt;Link href="/profile"&gt;</code></li>
            <li><strong>useRouter Hook</strong> - Navigate programmatically with <code>router.push()</code></li>
            <li><strong>Stack Navigation</strong> - Screens stack on top of each other</li>
          </ul>
        </div>

        <h2>4. Example 2: Tab Navigation</h2>

        <h3>Building on Example 1: Organizing with Tabs</h3>
        <p>
          Most mobile apps use bottom tabs for main navigation. Let's convert our stack navigation 
          into a tab-based structure for better mobile UX.
        </p>

        <CodeBlock
          code={`// app/(tabs)/_layout.tsx - Tab navigation setup
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#666',
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopWidth: 1,
          borderTopColor: '#E1E5E9',
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Contact',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="mail" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: 'Messages',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubbles" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}`}
          language="jsx"
          filename="app/(tabs)/_layout.tsx"
          title="Tab Navigation Layout"
        />

        <CodeBlock
          code={`// app/(tabs)/home.tsx - Contact form in a tab
import { useRouter } from 'expo-router';

export default function HomeTab() {
  const router = useRouter();
  
  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      Alert.alert('Success!', 'Message sent! Check the Messages tab.', [
        { text: 'OK', onPress: () => router.push('/(tabs)/messages') } // Navigate to messages tab
      ]);
      
      // Clear form...
    }, 2000);
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contact Us</Text>
      
      {/* Same contact form from Session 3 - no need to repeat all the code */}
      {/* ... your form fields ... */}
      
      <TouchableOpacity
        style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
        onPress={handleSubmit}
        disabled={isSubmitting}
      >
        <Text style={styles.submitButtonText}>
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}`}
          language="jsx"
          filename="app/(tabs)/home.tsx"
          title="Home Tab - Contact Form"
        />

        <CodeBlock
          code={`// app/(tabs)/messages.tsx - Messages list screen
import { useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';

export default function MessagesTab() {
  const [messages] = useState([
    { id: 1, subject: 'Welcome!', preview: 'Thanks for using our app...', read: false },
    { id: 2, subject: 'Form received', preview: 'We got your message...', read: true },
  ]);
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Messages</Text>
      
      <ScrollView style={styles.messagesList}>
        {messages.map((message) => (
          <TouchableOpacity
            key={message.id}
            style={[
              styles.messageCard,
              !message.read && styles.unreadMessage
            ]}
          >
            <Text style={styles.messageSubject}>{message.subject}</Text>
            <Text style={styles.messagePreview}>{message.preview}</Text>
            {!message.read && (
              <View style={styles.unreadIndicator}>
                <Text style={styles.unreadLabel}>New</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}`}
          language="jsx"
          filename="app/(tabs)/messages.tsx"
          title="Messages Tab"
        />

        <div className="my-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
          <h4 className="text-blue-800 dark:text-blue-200 font-semibold mb-2 mt-0">
            🆕 What's New in Example 2:
          </h4>
          <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1 mb-0">
            <li><strong>Tab Structure</strong> - Organized screens into (tabs) folder</li>
            <li><strong>Bottom Tab Navigation</strong> - Mobile-friendly tab bar with icons</li>
            <li><strong>Tab-Specific Content</strong> - Each tab has its own purpose</li>
            <li><strong>Visual Feedback</strong> - Unread indicators and active states</li>
          </ul>
        </div>

        <h2>5. Example 3: Dynamic Routes</h2>

        <h3>Building on Example 2: Adding Dynamic Routes</h3>
        <p>
          Let's add a message detail screen that shows individual messages. 
          This introduces dynamic routing with parameters.
        </p>

        <CodeBlock
          code={`// app/message/[id].tsx - Dynamic route for message details
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function MessageDetail() {
  const { id } = useLocalSearchParams(); // Get the message ID from the URL
  const router = useRouter();
  
  // Mock message data - in real app, you'd fetch by ID
  const message = {
    id: id,
    subject: 'Welcome to the app!',
    content: 'Thank you for using our contact form application. We hope you enjoy learning React Native with Expo Router!',
    date: '2024-01-15',
    from: 'Support Team'
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.messageHeader}>
        <Text style={styles.messageSubject}>{message.subject}</Text>
        <Text style={styles.messageDate}>{message.date}</Text>
        <Text style={styles.messageFrom}>From: {message.from}</Text>
      </View>
      
      <View style={styles.messageContent}>
        <Text style={styles.messageText}>{message.content}</Text>
      </View>
      
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Text style={styles.backButtonText}>Back to Messages</Text>
      </TouchableOpacity>
    </View>
  );
}`}
          language="jsx"
          filename="app/message/[id].tsx"
          title="Dynamic Message Detail Screen"
        />

        <CodeBlock
          code={`// Update app/(tabs)/messages.tsx - Add navigation to detail
export default function MessagesTab() {
  const router = useRouter();
  
  const handleMessagePress = (messageId) => {
    // Navigate to dynamic route
    router.push(\`/message/\${messageId}\`);
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Messages</Text>
      
      <ScrollView style={styles.messagesList}>
        {messages.map((message) => (
          <TouchableOpacity
            key={message.id}
            style={styles.messageCard}
            onPress={() => handleMessagePress(message.id)} // Navigate to detail
          >
            <Text style={styles.messageSubject}>{message.subject}</Text>
            <Text style={styles.messagePreview}>{message.preview}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}`}
          language="jsx"
          filename="Updated messages.tsx"
          title="Messages Tab with Navigation"
        />

        <div className="my-6 p-4 bg-purple-50 dark:bg-purple-950 rounded-lg border border-purple-200 dark:border-purple-800">
          <h4 className="text-purple-800 dark:text-purple-200 font-semibold mb-2 mt-0">
            🔄 What's New in Example 3:
          </h4>
          <ul className="text-purple-700 dark:text-purple-300 text-sm space-y-1 mb-0">
            <li><strong>Dynamic Routes</strong> - [id].tsx creates routes with parameters</li>
            <li><strong>useLocalSearchParams</strong> - Get URL parameters in your component</li>
            <li><strong>Parameter Navigation</strong> - Navigate to routes with data</li>
            <li><strong>Detail Views</strong> - Show individual item details</li>
          </ul>
        </div>

        <h2>6. Key Navigation Concepts</h2>

        <h3>Navigation Methods Summary</h3>
        <CodeBlock
          code={`// 🧭 Navigation Methods in Expo Router

// 1. Link Component (Declarative)
<Link href="/profile">
  <Text>Go to Profile</Text>
</Link>

// 2. useRouter Hook (Programmatic)
const router = useRouter();
router.push('/profile');        // Navigate to screen
router.push('/(tabs)/home');    // Navigate to tab
router.push('/message/123');    // Navigate with parameter
router.back();                  // Go back
router.replace('/home');        // Replace current screen

// 3. usePathname Hook (Get Current Route)
const pathname = usePathname();
console.log(pathname); // '/profile' or '/(tabs)/home'

// 4. useLocalSearchParams Hook (Get URL Parameters)
const { id } = useLocalSearchParams();
console.log(id); // '123' from /message/123`}
          language="jsx"
          filename="navigation-methods.jsx"
          title="Navigation Methods Summary"
        />

        <h3>File Structure Patterns</h3>
        <CodeBlock
          code={`// 📁 Common routing patterns

// Basic routes
app/index.tsx           → /              (home)
app/profile.tsx         → /profile       (profile)

// Tab groups
app/(tabs)/home.tsx     → /(tabs)/home   (home tab)
app/(tabs)/_layout.tsx  → Tab layout

// Dynamic routes
app/message/[id].tsx    → /message/123   (message detail)
app/user/[id].tsx       → /user/456      (user profile)

// Nested routes
app/settings/account.tsx → /settings/account
app/settings/privacy.tsx → /settings/privacy

// Special files
app/_layout.tsx         → Root layout wrapper
app/+not-found.tsx      → 404 page`}
          language="javascript"
          filename="routing-patterns.txt"
          title="File Structure Patterns"
        />

        <h2>7. Hands-On Exercise</h2>

        <div className="my-6 p-4 bg-orange-50 dark:bg-orange-950 rounded-lg border border-orange-200 dark:border-orange-800">
          <h4 className="text-orange-800 dark:text-orange-200 font-semibold mb-3 mt-0">
            🎯 Your Challenge:
          </h4>
          <p className="text-orange-700 dark:text-orange-300 text-sm mb-3">
            Build a complete tab-based app using your contact form from Session 3:
          </p>
          <ul className="text-orange-700 dark:text-orange-300 text-sm space-y-1 mb-0">
            <li><strong>Step 1</strong> - Create tab structure with 4 tabs: Contact, Profile, Messages, Settings</li>
            <li><strong>Step 2</strong> - Move your contact form to the Contact tab</li>
            <li><strong>Step 3</strong> - Add message detail screen using dynamic routing</li>
            <li><strong>Step 4</strong> - Test navigation between all screens</li>
          </ul>
        </div>

        <h3>🎉 What You've Accomplished</h3>
        <div className="my-6 p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
          <ul className="text-green-700 dark:text-green-300 text-sm space-y-2 mb-0">
            <li><strong>Multi-Screen Architecture</strong> - Transformed single screen into complete app</li>
            <li><strong>File-Based Routing</strong> - Mastered Expo Router's file system approach</li>
            <li><strong>Navigation Patterns</strong> - Used Link, useRouter, and usePathname</li>
            <li><strong>Tab Navigation</strong> - Created intuitive bottom tab navigation</li>
            <li><strong>Dynamic Routes</strong> - Built routes with parameters like [id].tsx</li>
            <li><strong>Progressive Enhancement</strong> - Built complexity incrementally</li>
          </ul>
        </div>

        <div className="my-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
          <h4 className="text-blue-800 dark:text-blue-200 font-semibold mb-3 mt-0">
            🚀 Coming Next - Day 2:
          </h4>
          <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1 mb-0">
            <li>Advanced React hooks (useEffect, useCallback, useMemo)</li>
            <li>Working with APIs and data fetching</li>
            <li>Local storage and data persistence</li>
            <li>Form handling patterns and validation</li>
          </ul>
        </div>

        <p className="text-lg font-semibold text-center mt-8 mb-4">
          You've built a complete multi-screen mobile app! 🎉📱
        </p>
      </div>
    </>
  );
}