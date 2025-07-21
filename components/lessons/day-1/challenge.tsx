"use client";

import { CodeBlock } from "@/components/ui/code-block-new";
import { PasswordProtectedContent } from "@/components/ui/password-protected-content";

export function Day1ChallengeContent() {
  return (
    <>
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">
            Day 1 Challenge: My First React Native App
          </h1>

          <div className="bg-orange-50 dark:bg-orange-950 p-6 rounded-lg border border-orange-200 dark:border-orange-800 mb-8">
            <h3 className="text-orange-800 dark:text-orange-200 font-semibold mb-4 mt-0">
              🎯 Challenge Overview
            </h3>
            <p className="text-orange-700 dark:text-orange-300 mb-4">
              Build your first complete React Native app! This challenge combines everything 
              you learned in Day 1 Sessions 1-4. You'll create a simple <strong>"About Me"</strong> app 
              with two screens that showcases React Native components, state management, and navigation.
            </p>
            <div className="text-orange-700 dark:text-orange-300">
              <h4 className="font-semibold mb-2">What You'll Use:</h4>
              <ul className="space-y-1 mb-0">
                <li><strong>Session 1:</strong> React Native setup and project structure</li>
                <li><strong>Session 2:</strong> Core components (View, Text, TouchableOpacity)</li>
                <li><strong>Session 3:</strong> State management with useState</li>
                <li><strong>Session 4:</strong> Navigation between screens</li>
              </ul>
            </div>
          </div>
        </div>

        <h2>🏗️ What You'll Build</h2>

        <div className="my-6 p-6 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg">
          <div className="max-w-sm mx-auto bg-white dark:bg-slate-800 rounded-lg shadow-md border border-slate-200 dark:border-slate-700 p-6">
            <div className="text-center space-y-4">
              {/* Profile Image */}
              <div className="w-20 h-20 mx-auto bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <span className="text-2xl">👤</span>
              </div>
              
              {/* Name and Info */}
              <div className="space-y-2">
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">John Doe</h2>
                <p className="text-slate-600 dark:text-slate-400">React Native Beginner</p>
              </div>
              
              {/* Interactive Button */}
              <div className="pt-4">
                <div className="bg-blue-500 px-4 py-2 rounded-lg">
                  <span className="text-white font-medium">Say Hello!</span>
                </div>
              </div>
              
              {/* Dynamic Message */}
              <div className="pt-2 border-t border-slate-200 dark:border-slate-600">
                <p className="text-sm text-green-600 dark:text-green-400">
                  Hello! Welcome to my first app! 👋
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-sm text-slate-600 dark:text-slate-400 italic">
              ✨ A simple About Me app with interactive greetings!
            </p>
          </div>
        </div>

        <div className="my-6 p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-3 mt-0">
            📋 App Requirements:
          </h4>
          <ul className="text-green-700 dark:text-green-300 text-sm space-y-2 mb-0">
            <li>• <strong>Home Screen:</strong> Display your name, title, and profile image</li>
            <li>• <strong>Interactive Button:</strong> Changes greeting message when pressed</li>
            <li>• <strong>State Management:</strong> Use useState to track button clicks</li>
            <li>• <strong>Navigation:</strong> Add a button to go to a second "Details" screen</li>
            <li>• <strong>Details Screen:</strong> Show more info about yourself</li>
            <li>• <strong>Styling:</strong> Use StyleSheet for clean, mobile-friendly design</li>
          </ul>
        </div>

        <h2>🚀 Getting Started</h2>

        <div className="my-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
          <h4 className="text-blue-800 dark:text-blue-200 font-semibold mb-3 mt-0">
            📁 File Structure (Session 4 - Navigation):
          </h4>
          <div className="text-blue-700 dark:text-blue-300 text-sm font-mono bg-blue-100 dark:bg-blue-800 p-3 rounded">
            app/<br/>
            ├── index.jsx       ← Home screen<br/>
            ├── details.jsx     ← Details screen<br/>
            └── _layout.jsx     ← Navigation layout
          </div>
          <p className="text-blue-700 dark:text-blue-300 text-sm mt-3">
            Create these three files in your app directory to complete the challenge.
          </p>
        </div>

        <h3>Step 1: Home Screen (app/index.jsx)</h3>
        <div className="my-6 p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <h4 className="text-yellow-800 dark:text-yellow-200 font-semibold mb-3 mt-0">
            🎯 Your Task:
          </h4>
          <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-2 mb-0">
            <li>• Create a home screen component using React Native core components</li>
            <li>• Add a profile section with your name and title</li>
            <li>• Include an avatar/profile image placeholder</li>
            <li>• Add an interactive button that changes messages when pressed</li>
            <li>• Use useState to track the number of button clicks</li>
            <li>• Create an array of different greeting messages</li>
            <li>• Add a navigation link to the details screen</li>
            <li>• Style everything with StyleSheet for a professional look</li>
          </ul>
        </div>

        <div className="my-6 p-4 bg-purple-50 dark:bg-purple-950 rounded-lg border border-purple-200 dark:border-purple-800">
          <h4 className="text-purple-800 dark:text-purple-200 font-semibold mb-3 mt-0">
            💡 Key Components to Use:
          </h4>
          <ul className="text-purple-700 dark:text-purple-300 text-sm space-y-1 mb-0">
            <li>• <code>View</code> - For layout containers</li>
            <li>• <code>Text</code> - For displaying text content</li>
            <li>• <code>TouchableOpacity</code> - For interactive buttons</li>
            <li>• <code>StyleSheet</code> - For component styling</li>
            <li>• <code>useState</code> - For managing button click state</li>
            <li>• <code>Link</code> from expo-router - For navigation</li>
          </ul>
        </div>

        <h3>Step 2: Details Screen (app/details.jsx)</h3>
        <div className="my-6 p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <h4 className="text-yellow-800 dark:text-yellow-200 font-semibold mb-3 mt-0">
            🎯 Your Task:
          </h4>
          <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-2 mb-0">
            <li>• Create a details screen with a header section</li>
            <li>• Add multiple info cards about yourself (goals, fun facts, next steps)</li>
            <li>• Include a back button to return to the home screen</li>
            <li>• Use useRouter hook for navigation</li>
            <li>• Style the cards with shadows and proper spacing</li>
            <li>• Make the content personal and engaging</li>
          </ul>
        </div>

        <div className="my-6 p-4 bg-purple-50 dark:bg-purple-950 rounded-lg border border-purple-200 dark:border-purple-800">
          <h4 className="text-purple-800 dark:text-purple-200 font-semibold mb-3 mt-0">
            💡 Key Components to Use:
          </h4>
          <ul className="text-purple-700 dark:text-purple-300 text-sm space-y-1 mb-0">
            <li>• <code>View</code> - For layout and card containers</li>
            <li>• <code>Text</code> - For headers and content</li>
            <li>• <code>TouchableOpacity</code> - For the back button</li>
            <li>• <code>useRouter</code> from expo-router - For navigation</li>
            <li>• <code>StyleSheet</code> - For card styling and shadows</li>
          </ul>
        </div>

        <h3>Step 3: Navigation Layout (app/_layout.jsx)</h3>
        <div className="my-6 p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <h4 className="text-yellow-800 dark:text-yellow-200 font-semibold mb-3 mt-0">
            🎯 Your Task:
          </h4>
          <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-2 mb-0">
            <li>• Create a root layout component for navigation</li>
            <li>• Set up a Stack navigator with proper screen options</li>
            <li>• Configure header styling (background color, text color)</li>
            <li>• Define screen titles for both index and details screens</li>
            <li>• Make the navigation headers look professional</li>
          </ul>
        </div>

        <div className="my-6 p-4 bg-purple-50 dark:bg-purple-950 rounded-lg border border-purple-200 dark:border-purple-800">
          <h4 className="text-purple-800 dark:text-purple-200 font-semibold mb-3 mt-0">
            💡 Key Components to Use:
          </h4>
          <ul className="text-purple-700 dark:text-purple-300 text-sm space-y-1 mb-0">
            <li>• <code>Stack</code> from expo-router - For navigation structure</li>
            <li>• <code>Stack.Screen</code> - For individual screen configuration</li>
            <li>• Screen options for header styling and titles</li>
          </ul>
        </div>

        <div className="my-6 p-4 bg-indigo-50 dark:bg-indigo-950 rounded-lg border border-indigo-200 dark:border-indigo-800">
          <h4 className="text-indigo-800 dark:text-indigo-200 font-semibold mb-3 mt-0">
            🎨 Styling Guidelines:
          </h4>
          <ul className="text-indigo-700 dark:text-indigo-300 text-sm space-y-2 mb-0">
            <li>• Use a light background color (#f8fafc) for consistency</li>
            <li>• Create rounded avatar containers with background colors</li>
            <li>• Style buttons with padding, border radius, and hover effects</li>
            <li>• Add proper spacing between sections (margin/padding)</li>
            <li>• Use different font weights and sizes for hierarchy</li>
            <li>• Add shadows to cards for depth (shadowColor, shadowOffset, etc.)</li>
            <li>• Use a consistent color scheme throughout the app</li>
          </ul>
        </div>

        <h2>🎉 Testing Your App</h2>

        <div className="my-6 p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-3 mt-0">
            📱 How to Test:
          </h4>
          <ol className="text-green-700 dark:text-green-300 text-sm space-y-2 mb-0">
            <li><strong>1. Run your app:</strong> <code>npx expo start</code></li>
            <li><strong>2. Test the button:</strong> Tap "Say Hello!" multiple times to see different messages</li>
            <li><strong>3. Test navigation:</strong> Tap "Learn More About Me" to go to details screen</li>
            <li><strong>4. Test back navigation:</strong> Use the back button to return to home</li>
            <li><strong>5. Customize:</strong> Change your name, messages, and add personal information</li>
          </ol>
        </div>

        <div className="my-6 p-4 bg-red-50 dark:bg-red-950 rounded-lg border border-red-200 dark:border-red-800">
          <h4 className="text-red-800 dark:text-red-200 font-semibold mb-3 mt-0">
            🐛 Common Issues & Solutions:
          </h4>
          <ul className="text-red-700 dark:text-red-300 text-sm space-y-2 mb-0">
            <li>• <strong>Import errors:</strong> Make sure to import all components from 'react-native'</li>
            <li>• <strong>Navigation not working:</strong> Check that expo-router is properly installed</li>
            <li>• <strong>Styling issues:</strong> Use StyleSheet.create() for all styles</li>
            <li>• <strong>State not updating:</strong> Make sure to use useState hook correctly</li>
            <li>• <strong>File structure:</strong> Ensure files are in the app/ directory with correct names</li>
          </ul>
        </div>

        <PasswordProtectedContent
          password="react-native"
          title="Complete Solution"
          description="Complete the challenge first, then enter the password to see the complete solution!"
          buttonText="🔓 View Complete Solution"
          buttonVariant="outline"
        >
          <div className="mt-4">
            <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800 mb-4">
              <h4 className="text-green-800 dark:text-green-200 font-semibold mb-2 mt-0">
                🎉 Congratulations!
              </h4>
              <p className="text-green-700 dark:text-green-300 text-sm mb-0">
                You've successfully built your first React Native app using all the concepts from Day 1! 
                You've learned components, styling, state management, and navigation. 
                That's a huge accomplishment! 🚀
              </p>
            </div>

            <h3>Complete Solution:</h3>

            <h4>Step 1: Home Screen (app/index.jsx)</h4>
            <CodeBlock
              code={`// app/index.jsx - Your Home Screen
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

export default function HomeScreen() {
  // Session 3: State management with useState
  const [clickCount, setClickCount] = useState(0);
  
  // Different greeting messages based on clicks
  const getGreeting = () => {
    const greetings = [
      "Hello! Welcome to my first app! 👋",
      "Thanks for clicking! 😊",
      "You're awesome! 🌟",
      "Keep exploring! 🚀",
      "You've clicked " + clickCount + " times! 🎉"
    ];
    return greetings[Math.min(clickCount, greetings.length - 1)];
  };

  return (
    <View style={styles.container}>
      {/* Session 2: Core components with styling */}
      
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>👤</Text>
        </View>
        
        <Text style={styles.name}>Your Name Here</Text>
        <Text style={styles.title}>React Native Beginner</Text>
      </View>

      {/* Interactive Section */}
      <View style={styles.interactiveSection}>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => setClickCount(clickCount + 1)}
        >
          <Text style={styles.buttonText}>Say Hello!</Text>
        </TouchableOpacity>
        
        <Text style={styles.greeting}>{getGreeting()}</Text>
      </View>

      {/* Navigation Section */}
      <View style={styles.navigationSection}>
        <Link href="/details" asChild>
          <TouchableOpacity style={styles.linkButton}>
            <Text style={styles.linkButtonText}>Learn More About Me →</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 20,
    justifyContent: 'center',
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  avatar: {
    width: 80,
    height: 80,
    backgroundColor: '#dbeafe',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 32,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    color: '#6b7280',
  },
  interactiveSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  greeting: {
    fontSize: 16,
    color: '#059669',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  navigationSection: {
    alignItems: 'center',
  },
  linkButton: {
    backgroundColor: '#e5e7eb',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
  },
  linkButtonText: {
    color: '#374151',
    fontSize: 14,
    fontWeight: '500',
  },
});`}
              language="jsx"
              filename="app/index.jsx"
              title="Home Screen - Complete Solution"
            />

            <h4>Step 2: Details Screen (app/details.jsx)</h4>
            <CodeBlock
              code={`// app/details.jsx - Your Details Screen
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function DetailsScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>About Me</Text>
        <Text style={styles.subtitle}>Getting to know me better!</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.infoCard}>
          <Text style={styles.cardTitle}>🎯 My Goal</Text>
          <Text style={styles.cardText}>
            Learn React Native and build amazing mobile apps!
          </Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.cardTitle}>💭 Fun Fact</Text>
          <Text style={styles.cardText}>
            This is my very first React Native app. Pretty cool, right?
          </Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.cardTitle}>🚀 Next Steps</Text>
          <Text style={styles.cardText}>
            I'm excited to learn more components, styling, and navigation!
          </Text>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Text style={styles.backButtonText}>← Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  content: {
    flex: 1,
  },
  infoCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 16,
    color: '#6b7280',
    lineHeight: 24,
  },
  backButton: {
    backgroundColor: '#3b82f6',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});`}
              language="jsx"
              filename="app/details.jsx"
              title="Details Screen - Complete Solution"
            />

            <h4>Step 3: Navigation Layout (app/_layout.jsx)</h4>
            <CodeBlock
              code={`// app/_layout.jsx - Basic Navigation Setup
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#3b82f6',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="index" 
        options={{ title: 'My First App' }} 
      />
      <Stack.Screen 
        name="details" 
        options={{ title: 'About Me' }} 
      />
    </Stack>
  );
}`}
              language="jsx"
              filename="app/_layout.jsx"
              title="Navigation Setup - Complete Solution"
            />

            <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800 mt-6">
              <h4 className="text-blue-800 dark:text-blue-200 font-semibold mb-3 mt-0">
                📚 What You've Mastered:
              </h4>
              <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1 mb-0">
                <li>✅ <strong>React Native Project Structure</strong> - Understanding files and folders</li>
                <li>✅ <strong>Core Components</strong> - View, Text, TouchableOpacity, StyleSheet</li>
                <li>✅ <strong>State Management</strong> - useState hook for interactive features</li>
                <li>✅ <strong>Event Handling</strong> - onPress for mobile touch interactions</li>
                <li>✅ <strong>Navigation</strong> - Moving between screens with Expo Router</li>
                <li>✅ <strong>Mobile Styling</strong> - Creating responsive, mobile-friendly designs</li>
                <li>✅ <strong>Component Architecture</strong> - Building reusable, organized code</li>
              </ul>
            </div>
          </div>
        </PasswordProtectedContent>

        <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 rounded-lg border border-blue-200 dark:border-blue-800">
          <h3 className="text-blue-800 dark:text-blue-200 font-semibold mb-4 mt-0">
            🎯 Ready for Day 2?
          </h3>
          <p className="text-blue-700 dark:text-blue-300 mb-4">
            Great job completing Day 1! You now have a solid foundation in React Native. 
            In Day 2, you'll dive deeper into advanced navigation, lists, styling, and building 
            more complex, professional-looking mobile apps.
          </p>
          <p className="text-blue-700 dark:text-blue-300 text-sm font-medium">
            💡 <strong>Pro tip:</strong> Keep experimenting with your app! Try adding more screens, 
            different components, or new interactive features. The best way to learn is by building!
          </p>
        </div>
      </div>
    </>
  );
}