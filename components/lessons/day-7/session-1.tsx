"use client";

import { CodeBlock } from "@/components/ui/code-block-new";

export function Day7Session1Content() {
  return (
    <>
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">
            Animations - Session 1
          </h1>

          <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg border border-blue-200 dark:border-blue-800 mb-8">
            <h3 className="text-blue-800 dark:text-blue-200 font-semibold mb-4 mt-0">
              ✨ Session Overview
            </h3>
            <ul className="text-blue-700 dark:text-blue-300 space-y-2 mb-0">
              <li>
                <strong>Basic react-native-reanimated</strong> - Modern animation library setup and fundamentals
              </li>
              <li>
                <strong>Transitions</strong> - Smooth state changes and property animations
              </li>
              <li>
                <strong>Opacity Animations</strong> - Fade in/out effects and visibility controls
              </li>
              <li>
                <strong>Position Animations</strong> - Movement, scaling, and transformation effects
              </li>
              <li>
                <strong>Use with Gestures</strong> - Interactive animations triggered by user input
              </li>
              <li>
                <strong>Performance Optimization</strong> - 60fps animations running on UI thread
              </li>
            </ul>
          </div>
        </div>

        <h2>1. What You Need to Know First</h2>

        <div className="bg-yellow-50 dark:bg-yellow-950 p-6 rounded-lg border border-yellow-200 dark:border-yellow-800 mb-6">
          <h4 className="text-yellow-800 dark:text-yellow-200 font-semibold mb-3 mt-0">
            📋 Prerequisites from Previous Days
          </h4>
          <p className="text-yellow-700 dark:text-yellow-300 text-sm mb-3">
            This is an advanced session that builds on previous knowledge. Make sure you understand:
          </p>
          <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1 mb-0">
            <li>• React Native components and styling (Days 1-2)</li>
            <li>• useState hook and state management (Day 1, Day 3)</li>
            <li>• TouchableOpacity and user interactions (Days 1-3)</li>
            <li>• Component lifecycle and useEffect (if covered in previous sessions)</li>
          </ul>
        </div>

        <h2>2. Animation Fundamentals: Understanding Motion</h2>

        <h3>What Are Animations and Why Do We Need Them?</h3>
        <p>
          Before diving into advanced animation libraries, let's understand what animations are and why they matter in mobile apps. 
          Think of animations like choreography in a dance:
        </p>

        <div className="my-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
          <h4 className="text-blue-800 dark:text-blue-200 font-semibold mb-2 mt-0">
            💃 Animations are like choreography:
          </h4>
          <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1 mb-0">
            <li>
              <strong>Without Animation = Teleportation</strong> - Things just appear and disappear suddenly
            </li>
            <li>
              <strong>With Animation = Smooth Movement</strong> - Things move naturally and logically
            </li>
            <li>
              <strong>Good Animation = Professional Feel</strong> - Users understand what's happening
            </li>
            <li>
              <strong>Bad Animation = Confusing Experience</strong> - Too fast, too slow, or jerky movement
            </li>
          </ul>
        </div>

        <h3>Types of Animations in Mobile Apps</h3>
        <p>
          Let's explore the different types of animations you see in mobile apps every day:
        </p>

        <div className="grid md:grid-cols-2 gap-4 my-6">
          <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
            <h4 className="text-green-800 dark:text-green-200 font-semibold mb-2 mt-0">✅ Common Animations:</h4>
            <div className="text-green-700 dark:text-green-300 text-sm space-y-1">
              <div>• <strong>Fade In/Out</strong> - Elements appear or disappear smoothly</div>
              <div>• <strong>Slide In/Out</strong> - Elements move from one position to another</div>
              <div>• <strong>Scale</strong> - Elements grow or shrink (button press feedback)</div>
              <div>• <strong>Rotation</strong> - Elements spin (loading indicators)</div>
              <div>• <strong>Color Changes</strong> - Background or text color transitions</div>
            </div>
          </div>
          <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg border border-purple-200 dark:border-purple-800">
            <h4 className="text-purple-800 dark:text-purple-200 font-semibold mb-2 mt-0">🎯 Why Animations Matter:</h4>
            <div className="text-purple-700 dark:text-purple-300 text-sm space-y-1">
              <div>• <strong>User Feedback</strong> - Show that taps were registered</div>
              <div>• <strong>State Changes</strong> - Indicate what's happening in the app</div>
              <div>• <strong>Navigation</strong> - Show where users are going</div>
              <div>• <strong>Loading States</strong> - Keep users engaged while waiting</div>
              <div>• <strong>Professional Feel</strong> - Make apps feel polished</div>
            </div>
          </div>
        </div>

        <h3>Basic Animation with React Native's Built-in Animated API</h3>
        <p>
          Before we use advanced libraries, let's understand animations with React Native's built-in Animated API. 
          This will help you understand the concepts before moving to more powerful tools:
        </p>

        <CodeBlock
          code={`import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  Animated, 
  TouchableOpacity, 
  StyleSheet 
} from 'react-native';

export default function BasicAnimationDemo() {
  // Create animated values - these can be animated smoothly
  const fadeAnim = useRef(new Animated.Value(1)).current; // Starts at opacity 1
  const slideAnim = useRef(new Animated.Value(0)).current; // Starts at position 0
  const scaleAnim = useRef(new Animated.Value(1)).current; // Starts at scale 1
  
  const [isVisible, setIsVisible] = useState(true);

  // Fade animation - smooth opacity change
  const handleFade = () => {
    if (isVisible) {
      // Fade out over 500 milliseconds
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true, // Better performance
      }).start(() => {
        setIsVisible(false); // Hide completely after animation
      });
    } else {
      // Show and fade in
      setIsVisible(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  };

  // Slide animation - smooth position change
  const handleSlide = () => {
    // Slide to random position and back
    Animated.sequence([
      Animated.timing(slideAnim, {
        toValue: Math.random() * 100 - 50, // Random position
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0, // Back to original position
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Scale animation - smooth size change
  const handleScale = () => {
    // Scale up and down for button feedback
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.2, // 20% bigger
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1, // Back to normal size
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Basic Animation Examples</Text>
      <Text style={styles.subtitle}>
        Tap the buttons to see different types of animations
      </Text>
      
      {/* Animated Box that demonstrates all animations */}
      {isVisible && (
        <Animated.View 
          style={[
            styles.animatedBox,
            {
              opacity: fadeAnim,
              transform: [
                { translateX: slideAnim },
                { scale: scaleAnim }
              ]
            }
          ]}
        >
          <Text style={styles.boxText}>🎭</Text>
          <Text style={styles.boxLabel}>Animated Box</Text>
        </Animated.View>
      )}
      
      {/* Control buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleFade}>
          <Text style={styles.buttonText}>
            {isVisible ? 'Fade Out' : 'Fade In'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={handleSlide}>
          <Text style={styles.buttonText}>Slide</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={handleScale}>
          <Text style={styles.buttonText}>Scale</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.explanationBox}>
        <Text style={styles.explanationTitle}>What's Happening:</Text>
        <Text style={styles.explanationText}>
          • <strong>Fade:</strong> Changes opacity from 0 to 1 or vice versa
        </Text>
        <Text style={styles.explanationText}>
          • <strong>Slide:</strong> Changes translateX position smoothly
        </Text>
        <Text style={styles.explanationText}>
          • <strong>Scale:</strong> Changes size for button press feedback
        </Text>
      </View>
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
    marginBottom: 8,
    color: '#2c3e50',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    color: '#7f8c8d',
    textAlign: 'center',
    lineHeight: 22,
  },
  animatedBox: {
    width: 120,
    height: 120,
    backgroundColor: '#007AFF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  boxText: {
    fontSize: 32,
    marginBottom: 4,
  },
  boxLabel: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#34C759',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 80,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  explanationBox: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    width: '100%',
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
  explanationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#2c3e50',
  },
  explanationText: {
    fontSize: 14,
    color: '#495057',
    marginBottom: 4,
    lineHeight: 20,
  },
});`}
          language="typescript"
          filename="BasicAnimationDemo.tsx"
          title="Basic React Native Animations"
        />

        <div className="bg-green-50 dark:bg-green-950 p-6 rounded-lg border border-green-200 dark:border-green-800 mb-6">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-3 mt-0">
            🎯 Understanding Basic Animations
          </h4>
          <ul className="text-green-700 dark:text-green-300 text-sm space-y-1 mb-0">
            <li><strong>Animated.Value</strong> - A number that can be animated smoothly over time</li>
            <li><strong>Animated.timing</strong> - Changes a value over a specified duration</li>
            <li><strong>useNativeDriver</strong> - Runs animation on UI thread for better performance</li>
            <li><strong>transform</strong> - Apply animations to position, scale, rotation</li>
            <li><strong>Animated.sequence</strong> - Run multiple animations one after another</li>
          </ul>
        </div>

        <h3>Animation Performance: JavaScript Thread vs UI Thread</h3>
        <p>
          Understanding where animations run is crucial for creating smooth mobile experiences:
        </p>

        <div className="grid md:grid-cols-2 gap-4 my-6">
          <div className="p-4 bg-red-50 dark:bg-red-950 rounded-lg border border-red-200 dark:border-red-800">
            <h4 className="text-red-800 dark:text-red-200 font-semibold mb-2 mt-0">⚠️ JavaScript Thread:</h4>
            <div className="text-red-700 dark:text-red-300 text-sm space-y-1">
              <div>• Handles app logic, state updates, API calls</div>
              <div>• Can get busy and slow down animations</div>
              <div>• Results in choppy, laggy animations</div>
              <div>• Not ideal for smooth 60fps animations</div>
              <div>• Basic Animated API runs here by default</div>
            </div>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
            <h4 className="text-green-800 dark:text-green-200 font-semibold mb-2 mt-0">✅ UI Thread:</h4>
            <div className="text-green-700 dark:text-green-300 text-sm space-y-1">
              <div>• Dedicated to rendering and animations</div>
              <div>• Runs independently of JavaScript thread</div>
              <div>• Ensures smooth 60fps animations</div>
              <div>• Ideal for professional app feel</div>
              <div>• Reanimated library runs here</div>
            </div>
          </div>
        </div>

        <h2>3. Introduction to React Native Reanimated</h2>

        <h3>Why Reanimated Over Basic Animated API?</h3>
        <p>
          Now that you understand basic animations and performance concepts, let's see why React Native Reanimated 
          is the preferred choice for modern mobile apps. It's like upgrading from a bicycle to a motorcycle:
        </p>

        <div className="my-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
          <h4 className="text-blue-800 dark:text-blue-200 font-semibold mb-2 mt-0">
            🚀 Reanimated Advantages:
          </h4>
          <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1 mb-0">
            <li>
              <strong>UI Thread Performance:</strong> Animations run independently of JavaScript thread
            </li>
            <li>
              <strong>Gesture Integration:</strong> Seamless integration with react-native-gesture-handler
            </li>
            <li>
              <strong>Shared Values:</strong> Efficient state management for animated values
            </li>
            <li>
              <strong>Worklets:</strong> JavaScript functions that run on UI thread
            </li>
            <li>
              <strong>Layout Animations:</strong> Automatic animations for layout changes
            </li>
          </ul>
        </div>

        <h2>4. Installation and Setup</h2>
        <p>
          Let's set up react-native-reanimated in your project. The installation process varies slightly 
          between Expo and bare React Native projects.
        </p>

        <CodeBlock
          code={`# For Expo projects (recommended)
npx expo install react-native-reanimated

# For bare React Native projects
npm install react-native-reanimated
npx react-native link react-native-reanimated

# iOS additional setup (bare projects only)
cd ios && pod install

# Android additional setup (bare projects only)
# Add to MainApplication.java:
import com.swmansion.reanimated.ReanimatedJSIModulePackage;`}
          language="bash"
          filename="terminal"
          title="Installing React Native Reanimated"
        />

        <h3>Babel Configuration</h3>
        <CodeBlock
          code={`// babel.config.js
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin' // Must be listed last!
    ],
  };
};

// For bare React Native projects:
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin' // Must be listed last!
  ],
};`}
          language="javascript"
          filename="babel.config.js"
          title="Babel Configuration for Reanimated"
        />

        <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800 my-6">
          <h4 className="text-yellow-800 dark:text-yellow-200 font-semibold mb-2 mt-0">
            ⚠️ Important Setup Notes
          </h4>
          <div className="text-yellow-700 dark:text-yellow-300 text-sm space-y-2">
            <div><strong>Plugin Order:</strong> The reanimated plugin must be listed last in babel.config.js</div>
            <div><strong>Metro Reset:</strong> Clear Metro cache after installation: npx expo start --clear</div>
            <div><strong>Restart Required:</strong> Restart development server and rebuild app after setup</div>
            <div><strong>iOS Pods:</strong> Run pod install in ios/ directory for bare React Native projects</div>
          </div>
        </div>

        <h2>5. Core Concepts: Shared Values and Worklets</h2>
        <p>
          Understanding shared values and worklets is essential for effective use of Reanimated. 
          These concepts enable animations to run on the UI thread.
        </p>

        <CodeBlock
          code={`import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming,
  withSpring
} from 'react-native-reanimated';
import { View, TouchableOpacity } from 'react-native';

export default function BasicAnimationExample() {
  // Shared value - can be accessed from both JS and UI thread
  const offset = useSharedValue(0);
  const opacity = useSharedValue(1);
  const scale = useSharedValue(1);

  // Animated style - runs on UI thread (worklet)
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: offset.value },
        { scale: scale.value }
      ],
      opacity: opacity.value,
    };
  });

  const handlePress = () => {
    // Animate to new values
    offset.value = withSpring(offset.value === 0 ? 100 : 0);
    opacity.value = withTiming(opacity.value === 1 ? 0.5 : 1);
    scale.value = withSpring(scale.value === 1 ? 1.2 : 1);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Animated.View
        style={[
          {
            width: 100,
            height: 100,
            backgroundColor: '#007AFF',
            borderRadius: 20,
          },
          animatedStyle
        ]}
      />
      
      <TouchableOpacity
        onPress={handlePress}
        style={{
          marginTop: 50,
          padding: 15,
          backgroundColor: '#FF3B30',
          borderRadius: 8,
        }}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Animate!</Text>
      </TouchableOpacity>
    </View>
  );
}`}
          language="typescript"
          filename="BasicAnimation.tsx"
          title="Basic Reanimated Concepts"
        />

        <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg border border-green-200 dark:border-green-800 my-6">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-2 mt-0">
            🔧 Key Concepts Explained
          </h4>
          <div className="text-green-700 dark:text-green-300 text-sm space-y-2">
            <div><strong>useSharedValue:</strong> Creates a value that can be accessed from both threads</div>
            <div><strong>useAnimatedStyle:</strong> Creates styles that update on the UI thread</div>
            <div><strong>withTiming:</strong> Linear interpolation animation with customizable duration</div>
            <div><strong>withSpring:</strong> Spring-based animation with natural physics</div>
            <div><strong>Worklet:</strong> Functions that run on UI thread (useAnimatedStyle callback)</div>
          </div>
        </div>

        <h2>6. Transition Animations</h2>
        <p>
          Transitions help users understand interface changes by smoothly animating between states. 
          Let's explore different transition patterns.
        </p>

        <h3>State-Based Transitions</h3>
        <CodeBlock
          code={`import React, { useState } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withDelay,
  Easing
} from 'react-native-reanimated';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function TransitionExample() {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Shared values for different properties
  const height = useSharedValue(60);
  const backgroundColor = useSharedValue(0);
  const borderRadius = useSharedValue(8);
  
  // Animated styles
  const containerStyle = useAnimatedStyle(() => {
    return {
      height: height.value,
      backgroundColor: \`hsl(\${backgroundColor.value}, 70%, 50%)\`,
      borderRadius: borderRadius.value,
    };
  });

  const toggleExpansion = () => {
    const newExpanded = !isExpanded;
    setIsExpanded(newExpanded);

    if (newExpanded) {
      // Expand animation sequence
      height.value = withTiming(200, { duration: 300 });
      backgroundColor.value = withDelay(
        100,
        withTiming(120, { duration: 200 })
      );
      borderRadius.value = withTiming(20, { duration: 300 });
    } else {
      // Collapse animation sequence
      height.value = withTiming(60, { duration: 300 });
      backgroundColor.value = withTiming(220, { duration: 200 });
      borderRadius.value = withTiming(8, { duration: 300 });
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleExpansion}>
        <Animated.View style={[styles.animatedContainer, containerStyle]}>
          <Text style={styles.title}>
            {isExpanded ? 'Tap to Collapse' : 'Tap to Expand'}
          </Text>
          
          {isExpanded && (
            <View style={styles.content}>
              <Text style={styles.contentText}>
                This content appears when expanded! 
                The container smoothly transitions between states.
              </Text>
            </View>
          )}
        </Animated.View>
      </TouchableOpacity>
      
      <TransitionTabs />
    </View>
  );
}

// Tab switching with transitions
function TransitionTabs() {
  const [activeTab, setActiveTab] = useState(0);
  const indicatorPosition = useSharedValue(0);
  const tabWidth = 100;

  const indicatorStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: indicatorPosition.value }],
    };
  });

  const switchTab = (index: number) => {
    setActiveTab(index);
    indicatorPosition.value = withSpring(index * tabWidth, {
      damping: 20,
      stiffness: 300,
    });
  };

  return (
    <View style={styles.tabContainer}>
      <View style={styles.tabRow}>
        {['Tab 1', 'Tab 2', 'Tab 3'].map((tab, index) => (
          <TouchableOpacity
            key={index}
            style={styles.tab}
            onPress={() => switchTab(index)}
          >
            <Text style={[
              styles.tabText,
              activeTab === index && styles.activeTabText
            ]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
        
        <Animated.View style={[styles.indicator, indicatorStyle]} />
      </View>
      
      <View style={styles.tabContent}>
        <Text>Content for {['Tab 1', 'Tab 2', 'Tab 3'][activeTab]}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  animatedContainer: {
    padding: 20,
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  content: {
    marginTop: 20,
    padding: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
  },
  contentText: {
    color: 'white',
    textAlign: 'center',
    lineHeight: 20,
  },
  tabContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
  },
  tabRow: {
    flexDirection: 'row',
    position: 'relative',
  },
  tab: {
    width: 100,
    padding: 15,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
  },
  activeTabText: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    height: 3,
    width: 100,
    backgroundColor: '#007AFF',
    borderRadius: 2,
  },
  tabContent: {
    padding: 20,
    alignItems: 'center',
  },
});`}
          language="typescript"
          filename="TransitionAnimations.tsx"
          title="Advanced Transition Animations"
        />

        <h2>7. Opacity Animations</h2>
        <p>
          Opacity animations are perfect for creating fade effects, loading states, and smooth visibility changes.
        </p>

        <CodeBlock
          code={`import React, { useEffect, useState } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withRepeat,
  interpolate,
  useAnimatedProps,
  runOnJS
} from 'react-native-reanimated';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function OpacityAnimations() {
  return (
    <View style={styles.container}>
      <FadeInExample />
      <PulsingLoader />
      <SequentialFade />
      <CrossFadeExample />
    </View>
  );
}

// Basic fade in/out
function FadeInExample() {
  const opacity = useSharedValue(0);
  const [isVisible, setIsVisible] = useState(false);

  const fadeStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  const toggleVisibility = () => {
    if (isVisible) {
      opacity.value = withTiming(0, { duration: 300 }, () => {
        runOnJS(setIsVisible)(false);
      });
    } else {
      setIsVisible(true);
      opacity.value = withTiming(1, { duration: 300 });
    }
  };

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Fade In/Out</Text>
      <TouchableOpacity style={styles.button} onPress={toggleVisibility}>
        <Text style={styles.buttonText}>Toggle Visibility</Text>
      </TouchableOpacity>
      
      {isVisible && (
        <Animated.View style={[styles.box, fadeStyle]}>
          <Text style={styles.boxText}>I fade in and out!</Text>
        </Animated.View>
      )}
    </View>
  );
}

// Pulsing loading animation
function PulsingLoader() {
  const pulseOpacity = useSharedValue(1);

  useEffect(() => {
    // Start infinite pulsing animation
    pulseOpacity.value = withRepeat(
      withSequence(
        withTiming(0.3, { duration: 1000 }),
        withTiming(1, { duration: 1000 })
      ),
      -1, // Infinite repetitions
      false // Don't reverse
    );
  }, []);

  const pulseStyle = useAnimatedStyle(() => {
    return {
      opacity: pulseOpacity.value,
    };
  });

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Pulsing Loader</Text>
      <Animated.View style={[styles.loader, pulseStyle]}>
        <Text style={styles.loaderText}>Loading...</Text>
      </Animated.View>
    </View>
  );
}

// Sequential fade-in of multiple elements
function SequentialFade() {
  const [triggerAnimation, setTriggerAnimation] = useState(false);
  const opacities = [
    useSharedValue(0),
    useSharedValue(0),
    useSharedValue(0)
  ];

  const animatedStyles = opacities.map(opacity => 
    useAnimatedStyle(() => ({ opacity: opacity.value }))
  );

  const startSequentialAnimation = () => {
    setTriggerAnimation(true);
    
    // Reset all opacities
    opacities.forEach(opacity => {
      opacity.value = 0;
    });

    // Animate each element with delay
    opacities.forEach((opacity, index) => {
      opacity.value = withSequence(
        withTiming(0, { duration: 0 }), // Start at 0
        withTiming(1, { 
          duration: 500,
          delay: index * 200 // Stagger the animations
        })
      );
    });
  };

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Sequential Fade</Text>
      <TouchableOpacity style={styles.button} onPress={startSequentialAnimation}>
        <Text style={styles.buttonText}>Start Animation</Text>
      </TouchableOpacity>
      
      {triggerAnimation && (
        <View style={styles.sequentialContainer}>
          {['First', 'Second', 'Third'].map((text, index) => (
            <Animated.View 
              key={index}
              style={[styles.sequentialBox, animatedStyles[index]]}
            >
              <Text style={styles.boxText}>{text}</Text>
            </Animated.View>
          ))}
        </View>
      )}
    </View>
  );
}

// Cross-fade between two elements
function CrossFadeExample() {
  const [showFirst, setShowFirst] = useState(true);
  const firstOpacity = useSharedValue(1);
  const secondOpacity = useSharedValue(0);

  const firstStyle = useAnimatedStyle(() => ({
    opacity: firstOpacity.value,
  }));

  const secondStyle = useAnimatedStyle(() => ({
    opacity: secondOpacity.value,
  }));

  const crossFade = () => {
    const newShowFirst = !showFirst;
    setShowFirst(newShowFirst);

    if (newShowFirst) {
      firstOpacity.value = withTiming(1, { duration: 400 });
      secondOpacity.value = withTiming(0, { duration: 400 });
    } else {
      firstOpacity.value = withTiming(0, { duration: 400 });
      secondOpacity.value = withTiming(1, { duration: 400 });
    }
  };

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Cross Fade</Text>
      <TouchableOpacity style={styles.button} onPress={crossFade}>
        <Text style={styles.buttonText}>Switch Content</Text>
      </TouchableOpacity>
      
      <View style={styles.crossFadeContainer}>
        <Animated.View style={[styles.crossFadeBox, styles.firstBox, firstStyle]}>
          <Text style={styles.boxText}>Content A</Text>
        </Animated.View>
        
        <Animated.View style={[styles.crossFadeBox, styles.secondBox, secondStyle]}>
          <Text style={styles.boxText}>Content B</Text>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  section: {
    marginBottom: 40,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  box: {
    width: 150,
    height: 80,
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  boxText: {
    color: 'white',
    fontWeight: 'bold',
  },
  loader: {
    width: 100,
    height: 100,
    backgroundColor: '#34C759',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  loaderText: {
    color: 'white',
    fontWeight: 'bold',
  },
  sequentialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  sequentialBox: {
    width: 80,
    height: 60,
    backgroundColor: '#FF9500',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  crossFadeContainer: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  crossFadeBox: {
    position: 'absolute',
    width: 120,
    height: 80,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  firstBox: {
    backgroundColor: '#007AFF',
  },
  secondBox: {
    backgroundColor: '#34C759',
  },
});`}
          language="typescript"
          filename="OpacityAnimations.tsx"
          title="Comprehensive Opacity Animations"
        />

        <h2>8. Position Animations</h2>
        <p>
          Position animations create dynamic movement effects. We'll cover translation, scaling, rotation, 
          and complex transformations.
        </p>

        <CodeBlock
          code={`import React, { useState } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withSequence,
  interpolate,
  useAnimatedGestureHandler,
  runOnJS
} from 'react-native-reanimated';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function PositionAnimations() {
  return (
    <View style={styles.container}>
      <MovingBox />
      <BouncingBall />
      <RotatingLoader />
      <ScalingButton />
    </View>
  );
}

// Basic movement animation
function MovingBox() {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value }
      ],
    };
  });

  const moveToRandomPosition = () => {
    const newX = Math.random() * (screenWidth - 150) - (screenWidth - 150) / 2;
    const newY = Math.random() * 200 - 100;
    
    setPosition({ x: newX, y: newY });
    
    translateX.value = withSpring(newX, {
      damping: 20,
      stiffness: 300,
    });
    translateY.value = withSpring(newY, {
      damping: 20,
      stiffness: 300,
    });
  };

  const resetPosition = () => {
    translateX.value = withSpring(0);
    translateY.value = withSpring(0);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Moving Box</Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.smallButton} onPress={moveToRandomPosition}>
          <Text style={styles.buttonText}>Move Random</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.smallButton} onPress={resetPosition}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.animationArea}>
        <Animated.View style={[styles.movingBox, animatedStyle]}>
          <Text style={styles.boxText}>📦</Text>
        </Animated.View>
      </View>
    </View>
  );
}

// Bouncing ball animation
function BouncingBall() {
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const [isAnimating, setIsAnimating] = useState(false);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: translateY.value },
        { scale: scale.value }
      ],
    };
  });

  const startBouncing = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    // Create bouncing sequence
    const bounceSequence = () => {
      translateY.value = withSequence(
        withTiming(-100, { duration: 400 }),
        withTiming(0, { duration: 400 })
      );
      
      scale.value = withSequence(
        withTiming(1.2, { duration: 200 }),
        withTiming(1, { duration: 200 }),
        withTiming(0.8, { duration: 200 }),
        withTiming(1, { duration: 200 })
      );
    };

    // Repeat bouncing 3 times
    bounceSequence();
    setTimeout(() => {
      bounceSequence();
      setTimeout(() => {
        bounceSequence();
        setTimeout(() => {
          setIsAnimating(false);
        }, 800);
      }, 800);
    }, 800);
  };

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Bouncing Ball</Text>
      <TouchableOpacity 
        style={[styles.button, isAnimating && styles.disabledButton]} 
        onPress={startBouncing}
        disabled={isAnimating}
      >
        <Text style={styles.buttonText}>
          {isAnimating ? 'Bouncing...' : 'Start Bouncing'}
        </Text>
      </TouchableOpacity>
      
      <View style={styles.animationArea}>
        <Animated.View style={[styles.ball, animatedStyle]}>
          <Text style={styles.ballText}>⚽</Text>
        </Animated.View>
      </View>
    </View>
  );
}

// Rotating loader
function RotatingLoader() {
  const rotation = useSharedValue(0);
  const [isRotating, setIsRotating] = useState(false);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotate: \`\${rotation.value}deg\` }
      ],
    };
  });

  const toggleRotation = () => {
    if (isRotating) {
      setIsRotating(false);
      rotation.value = withTiming(0, { duration: 500 });
    } else {
      setIsRotating(true);
      rotation.value = withTiming(360, { duration: 2000 }, () => {
        if (isRotating) {
          rotation.value = 0;
          rotation.value = withTiming(360, { duration: 2000 });
        }
      });
    }
  };

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Rotating Loader</Text>
      <TouchableOpacity style={styles.button} onPress={toggleRotation}>
        <Text style={styles.buttonText}>
          {isRotating ? 'Stop Rotation' : 'Start Rotation'}
        </Text>
      </TouchableOpacity>
      
      <View style={styles.animationArea}>
        <Animated.View style={[styles.loader, animatedStyle]}>
          <Text style={styles.loaderText}>⚙️</Text>
        </Animated.View>
      </View>
    </View>
  );
}

// Interactive scaling button
function ScalingButton() {
  const scale = useSharedValue(1);
  const backgroundColor = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      backgroundColor: interpolate(
        backgroundColor.value,
        [0, 1],
        ['rgb(0, 122, 255)', 'rgb(255, 59, 48)']
      ),
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.9);
    backgroundColor.value = withTiming(1, { duration: 150 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
    backgroundColor.value = withTiming(0, { duration: 150 });
  };

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Interactive Scaling</Text>
      <Text style={styles.instruction}>Press and hold the button</Text>
      
      <View style={styles.animationArea}>
        <TouchableOpacity
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={1}
        >
          <Animated.View style={[styles.scalingButton, animatedStyle]}>
            <Text style={styles.buttonText}>Press Me!</Text>
          </Animated.View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  section: {
    marginBottom: 30,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  instruction: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  disabledButton: {
    backgroundColor: '#999',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  smallButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 6,
    minWidth: 100,
    alignItems: 'center',
  },
  animationArea: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
  },
  movingBox: {
    width: 60,
    height: 60,
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxText: {
    fontSize: 24,
  },
  ball: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ballText: {
    fontSize: 30,
  },
  loader: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderText: {
    fontSize: 40,
  },
  scalingButton: {
    paddingHorizontal: 40,
    paddingVertical: 20,
    borderRadius: 25,
    alignItems: 'center',
  },
});`}
          language="typescript"
          filename="PositionAnimations.tsx"
          title="Advanced Position Animations"
        />

        <h2>9. Using Animations with Gestures</h2>
        <p>
          Combining animations with gestures creates responsive, interactive experiences. 
          We'll explore basic gesture integration before diving deeper in the next session.
        </p>

        <CodeBlock
          code={`import React from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
  interpolate,
  Extrapolate,
  runOnJS
} from 'react-native-reanimated';
import { PanGestureHandler, TapGestureHandler } from 'react-native-gesture-handler';
import { View, StyleSheet, Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

export default function GestureAnimations() {
  return (
    <View style={styles.container}>
      <DraggableBox />
      <SwipeToDelete />
      <PinchToScale />
    </View>
  );
}

// Draggable box with spring back
function DraggableBox() {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const isDragging = useSharedValue(false);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: () => {
      isDragging.value = true;
    },
    onActive: (event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
    },
    onEnd: () => {
      isDragging.value = false;
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    const scale = isDragging.value ? 1.1 : 1;
    
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: withSpring(scale) }
      ],
    };
  });

  return (
    <View style={styles.section}>
      <View style={styles.gestureArea}>
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View style={[styles.draggableBox, animatedStyle]}>
            <Text style={styles.gestureText}>Drag Me!</Text>
          </Animated.View>
        </PanGestureHandler>
      </View>
    </View>
  );
}

// Swipe to delete interaction
function SwipeToDelete() {
  const translateX = useSharedValue(0);
  const opacity = useSharedValue(1);
  const scale = useSharedValue(1);

  const gestureHandler = useAnimatedGestureHandler({
    onActive: (event) => {
      translateX.value = event.translationX;
      
      // Fade out as we swipe
      const progress = Math.abs(event.translationX) / (screenWidth * 0.4);
      opacity.value = interpolate(
        progress,
        [0, 1],
        [1, 0],
        Extrapolate.CLAMP
      );
      
      scale.value = interpolate(
        progress,
        [0, 1],
        [1, 0.8],
        Extrapolate.CLAMP
      );
    },
    onEnd: (event) => {
      const shouldDelete = Math.abs(event.translationX) > screenWidth * 0.3;
      
      if (shouldDelete) {
        translateX.value = withSpring(event.translationX > 0 ? screenWidth : -screenWidth);
        opacity.value = withSpring(0);
        scale.value = withSpring(0);
      } else {
        translateX.value = withSpring(0);
        opacity.value = withSpring(1);
        scale.value = withSpring(1);
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { scale: scale.value }
      ],
      opacity: opacity.value,
    };
  });

  const reset = () => {
    translateX.value = withSpring(0);
    opacity.value = withSpring(1);
    scale.value = withSpring(1);
  };

  return (
    <View style={styles.section}>
      <TouchableOpacity style={styles.resetButton} onPress={reset}>
        <Text style={styles.resetButtonText}>Reset</Text>
      </TouchableOpacity>
      
      <View style={styles.gestureArea}>
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View style={[styles.swipeItem, animatedStyle]}>
            <Text style={styles.gestureText}>Swipe to Delete</Text>
          </Animated.View>
        </PanGestureHandler>
      </View>
    </View>
  );
}

// Double tap to scale
function PinchToScale() {
  const scale = useSharedValue(1);
  const isLarge = useSharedValue(false);

  const doubleTapHandler = useAnimatedGestureHandler({
    onEnd: () => {
      if (isLarge.value) {
        scale.value = withSpring(1);
        isLarge.value = false;
      } else {
        scale.value = withSpring(1.5);
        isLarge.value = true;
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <View style={styles.section}>
      <View style={styles.gestureArea}>
        <TapGestureHandler numberOfTaps={2} onGestureEvent={doubleTapHandler}>
          <Animated.View style={[styles.tapBox, animatedStyle]}>
            <Text style={styles.gestureText}>Double Tap</Text>
          </Animated.View>
        </TapGestureHandler>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  section: {
    marginBottom: 30,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  gestureArea: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
  },
  draggableBox: {
    width: 100,
    height: 100,
    backgroundColor: '#007AFF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  swipeItem: {
    width: 250,
    height: 80,
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tapBox: {
    width: 120,
    height: 120,
    backgroundColor: '#34C759',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gestureText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  resetButton: {
    backgroundColor: '#FF9500',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 15,
  },
  resetButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});`}
          language="typescript"
          filename="GestureAnimations.tsx"
          title="Basic Gesture + Animation Integration"
        />

        <h2>10. Performance Optimization</h2>
        <p>
          Reanimated animations run on the UI thread, but there are still best practices to ensure smooth performance.
        </p>

        <div className="grid md:grid-cols-2 gap-4 my-6">
          <div className="p-4 bg-green-50 dark:bg-green-900 rounded-lg border">
            <h4 className="font-semibold mb-2 mt-0">✅ Performance Best Practices:</h4>
            <div className="text-sm space-y-1">
              <div>• Use shared values instead of state for animations</div>
              <div>• Minimize JavaScript thread communication</div>
              <div>• Avoid complex calculations in worklets</div>
              <div>• Use useAnimatedStyle for style updates</div>
              <div>• Cache animated styles when possible</div>
            </div>
          </div>
          
          <div className="p-4 bg-red-50 dark:bg-red-900 rounded-lg border">
            <h4 className="font-semibold mb-2 mt-0">❌ Performance Pitfalls:</h4>
            <div className="text-sm space-y-1">
              <div>• Using setState in animation loops</div>
              <div>• Complex style calculations on every frame</div>
              <div>• Excessive runOnJS calls</div>
              <div>• Not memoizing animated components</div>
              <div>• Too many concurrent animations</div>
            </div>
          </div>
        </div>

        <CodeBlock
          code={`// Performance optimization examples
import React, { memo } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  useDerivedValue,
  interpolate
} from 'react-native-reanimated';

// ✅ Good: Memoized animated component
const OptimizedAnimatedBox = memo(({ progress }) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: interpolate(progress.value, [0, 1], [1, 1.2]) },
        { rotate: \`\${progress.value * 360}deg\` }
      ],
      opacity: interpolate(progress.value, [0, 1], [0.5, 1])
    };
  }, [progress]);

  return (
    <Animated.View style={[styles.box, animatedStyle]} />
  );
});

// ✅ Good: Using derived values for complex calculations
function PerformantAnimation() {
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  
  // Derive complex calculations once
  const distance = useDerivedValue(() => {
    return Math.sqrt(x.value * x.value + y.value * y.value);
  });
  
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: x.value },
        { translateY: y.value }
      ],
      opacity: interpolate(distance.value, [0, 200], [1, 0.3])
    };
  });

  return <Animated.View style={[styles.box, animatedStyle]} />;
}

// ✅ Good: Efficient gesture handling
function EfficientGestureHandler() {
  const translateX = useSharedValue(0);
  
  const gestureHandler = useAnimatedGestureHandler({
    onStart: () => {
      // Minimal start logic
    },
    onActive: (event) => {
      // Direct value assignment
      translateX.value = event.translationX;
    },
    onEnd: () => {
      // Spring back with single animation
      translateX.value = withSpring(0);
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }]
    };
  });

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={[styles.box, animatedStyle]} />
    </PanGestureHandler>
  );
}`}
          language="typescript"
          filename="performance-optimization.tsx"
          title="Animation Performance Optimization"
        />

        <h2>11. Hands-On Exercise: Interactive Animation Gallery</h2>
        <p>
          Create a comprehensive animation gallery that showcases all the techniques we've learned, 
          including transitions, opacity changes, position animations, and gesture integration.
        </p>

        <div className="bg-orange-50 dark:bg-orange-950 p-6 rounded-lg border border-orange-200 dark:border-orange-800 my-6">
          <h4 className="text-orange-800 dark:text-orange-200 font-semibold mb-3 mt-0">
            🎯 Exercise: Animation Gallery App
          </h4>
          <div className="text-orange-700 dark:text-orange-300 space-y-3">
            <div>
              <strong>Phase 1:</strong> Basic Animation Components
              <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                <li>Create fade-in/out toggle buttons</li>
                <li>Build sliding panel with position animation</li>
                <li>Implement rotating loader with start/stop</li>
                <li>Add scaling button with press interaction</li>
              </ul>
            </div>
            
            <div>
              <strong>Phase 2:</strong> Complex Interactions
              <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                <li>Create draggable elements with spring-back</li>
                <li>Build swipe-to-delete card system</li>
                <li>Implement tab switcher with animated indicator</li>
                <li>Add parallax scrolling effect</li>
              </ul>
            </div>

            <div>
              <strong>Phase 3:</strong> Advanced Features
              <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                <li>Combine multiple animations in sequences</li>
                <li>Create physics-based bouncing animations</li>
                <li>Implement gesture-driven navigation</li>
                <li>Add performance monitoring and optimization</li>
              </ul>
            </div>
          </div>
        </div>

        <CodeBlock
          code={`// Complete Animation Gallery Structure
import React, { useState } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  useAnimatedScrollHandler
} from 'react-native-reanimated';
import { ScrollView, View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function AnimationGallery() {
  const [activeDemo, setActiveDemo] = useState(0);
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const demos = [
    { title: 'Fade Animations', component: <FadeDemo /> },
    { title: 'Position & Scale', component: <PositionDemo /> },
    { title: 'Gesture Interactions', component: <GestureDemo /> },
    { title: 'Complex Sequences', component: <SequenceDemo /> }
  ];

  return (
    <View style={styles.container}>
      <Header scrollY={scrollY} />
      
      <TabSelector 
        demos={demos.map(d => d.title)}
        activeTab={activeDemo}
        onTabPress={setActiveDemo}
      />
      
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        style={styles.content}
      >
        {demos[activeDemo].component}
      </Animated.ScrollView>
    </View>
  );
}

// Animated header with parallax effect
function Header({ scrollY }) {
  const headerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: -scrollY.value * 0.5 }
      ],
      opacity: Math.max(0.3, 1 - scrollY.value / 200)
    };
  });

  return (
    <Animated.View style={[styles.header, headerStyle]}>
      <Text style={styles.headerTitle}>Animation Gallery</Text>
      <Text style={styles.headerSubtitle}>React Native Reanimated Showcase</Text>
    </Animated.View>
  );
}

// Animated tab selector
function TabSelector({ demos, activeTab, onTabPress }) {
  const indicatorPosition = useSharedValue(0);
  const tabWidth = 100;

  const indicatorStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: indicatorPosition.value }]
    };
  });

  const selectTab = (index) => {
    onTabPress(index);
    indicatorPosition.value = withSpring(index * tabWidth);
  };

  return (
    <View style={styles.tabContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {demos.map((demo, index) => (
          <TouchableOpacity
            key={index}
            style={styles.tab}
            onPress={() => selectTab(index)}
          >
            <Text style={[
              styles.tabText,
              activeTab === index && styles.activeTabText
            ]}>
              {demo}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      <Animated.View style={[styles.tabIndicator, indicatorStyle]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 40,
    backgroundColor: '#007AFF',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 8,
  },
  tabContainer: {
    backgroundColor: 'white',
    paddingVertical: 15,
    position: 'relative',
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    minWidth: 100,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
  },
  activeTabText: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
  tabIndicator: {
    position: 'absolute',
    bottom: 0,
    height: 3,
    width: 100,
    backgroundColor: '#007AFF',
  },
  content: {
    flex: 1,
  },
});

// Individual demo components would be implemented here
// FadeDemo, PositionDemo, GestureDemo, SequenceDemo`}
          language="typescript"
          filename="AnimationGallery.tsx"
          title="Complete Animation Gallery"
        />

        <div className="bg-green-50 dark:bg-green-950 p-6 rounded-lg border border-green-200 dark:border-green-800">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-3 mt-0">
            🎉 Session 1 Complete!
          </h4>
          <p className="text-green-700 dark:text-green-300 mb-3">
            You've mastered React Native Reanimated with transitions, opacity animations, position transformations, 
            and basic gesture integration. Your animations now run smoothly on the UI thread!
          </p>
          <p className="text-green-700 dark:text-green-300 mb-0">
            <strong>Next:</strong> Session 2 will dive deep into gesture handling with react-native-gesture-handler, 
            creating swipe cards, drag/drop interactions, and advanced gesture combinations.
          </p>
        </div>
      </div>
    </>
  );
}