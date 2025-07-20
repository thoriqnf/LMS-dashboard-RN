"use client";

import { CodeBlock } from "@/components/ui/code-block-new";

export function Day7Session2Content() {
  return (
    <>
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">
            Gesture Handling - Session 2
          </h1>

          <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg border border-blue-200 dark:border-blue-800 mb-8">
            <h3 className="text-blue-800 dark:text-blue-200 font-semibold mb-4 mt-0">
              👆 Session Overview
            </h3>
            <ul className="text-blue-700 dark:text-blue-300 space-y-2 mb-0">
              <li>
                <strong>react-native-gesture-handler</strong> - Professional gesture recognition library setup
              </li>
              <li>
                <strong>Swipe Cards</strong> - Build Tinder-style card swiping with physics
              </li>
              <li>
                <strong>Drag/Drop Basics</strong> - Create interactive drag and drop interfaces
              </li>
              <li>
                <strong>Combine with Reanimated</strong> - Seamless gesture + animation integration
              </li>
              <li>
                <strong>Advanced Gestures</strong> - Multi-touch, pinch, rotation, and long press
              </li>
              <li>
                <strong>Gesture Composition</strong> - Combine multiple gestures for complex interactions
              </li>
            </ul>
          </div>
        </div>

        <h2>1. Introduction to Gesture Handler</h2>

        <h3>Why Gesture Handler Over TouchableOpacity?</h3>
        <p>
          React Native's built-in gesture components like TouchableOpacity run on the JavaScript thread, 
          causing delays and inconsistent behavior. React Native Gesture Handler provides native gesture recognition 
          that works seamlessly with Reanimated's UI thread animations.
        </p>

        <div className="my-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
          <h4 className="text-blue-800 dark:text-blue-200 font-semibold mb-2 mt-0">
            🎯 Gesture Handler Benefits:
          </h4>
          <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1 mb-0">
            <li>
              <strong>Native Performance:</strong> Gestures processed on native thread for 60fps responsiveness
            </li>
            <li>
              <strong>Reanimated Integration:</strong> Direct integration with UI thread animations
            </li>
            <li>
              <strong>Rich Gesture Set:</strong> Pan, pinch, rotation, tap, long press, and more
            </li>
            <li>
              <strong>Gesture Composition:</strong> Combine multiple gestures with simultaneous and exclusive modes
            </li>
            <li>
              <strong>State Management:</strong> Comprehensive gesture state tracking and events
            </li>
          </ul>
        </div>

        <h2>2. Installation and Setup</h2>
        <p>
          Gesture Handler requires both JavaScript and native setup. For Expo projects, 
          it's included by default. For bare React Native, additional configuration is needed.
        </p>

        <CodeBlock
          code={`# For Expo projects (already included)
npx expo install react-native-gesture-handler

# For bare React Native projects
npm install react-native-gesture-handler
npx react-native link react-native-gesture-handler

# iOS setup (bare projects)
cd ios && pod install

# Android setup (bare projects)
# Add to MainActivity.java:
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;

# Additional Android configuration in MainApplication.java:
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;`}
          language="bash"
          filename="terminal"
          title="Installing React Native Gesture Handler"
        />

        <h3>Root Component Setup</h3>
        <CodeBlock
          code={`// App.js or index.js - Wrap your app with GestureHandlerRootView
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        {/* Your app content */}
        <MainNavigator />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

// For Expo Router projects - app/_layout.tsx
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </GestureHandlerRootView>
  );
}`}
          language="typescript"
          filename="App.tsx"
          title="Gesture Handler Root Setup"
        />

        <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800 my-6">
          <h4 className="text-yellow-800 dark:text-yellow-200 font-semibold mb-2 mt-0">
            ⚠️ Setup Requirements
          </h4>
          <div className="text-yellow-700 dark:text-yellow-300 text-sm space-y-2">
            <div><strong>Root Wrapper:</strong> GestureHandlerRootView must wrap your entire app</div>
            <div><strong>Native Linking:</strong> Ensure proper native module linking for bare RN projects</div>
            <div><strong>Android Proguard:</strong> Add gesture handler rules to proguard if using</div>
            <div><strong>Metro Reset:</strong> Clear Metro cache after installation</div>
          </div>
        </div>

        <h2>3. Basic Gesture Components</h2>
        <p>
          Let's start with fundamental gesture recognizers and understand their event system 
          before building complex interactions.
        </p>

        <CodeBlock
          code={`import React from 'react';
import {
  PanGestureHandler,
  TapGestureHandler,
  LongPressGestureHandler,
  State
} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
  runOnJS
} from 'react-native-reanimated';
import { View, Text, StyleSheet, Alert } from 'react-native';

export default function BasicGesturesExample() {
  return (
    <View style={styles.container}>
      <PanExample />
      <TapExample />
      <LongPressExample />
    </View>
  );
}

// Pan gesture with position tracking
function PanExample() {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);

  const panGestureHandler = useAnimatedGestureHandler({
    onStart: () => {
      scale.value = withSpring(1.1);
    },
    onActive: (event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
    },
    onEnd: (event) => {
      // Spring back to center
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
      scale.value = withSpring(1);
      
      // Log gesture info
      runOnJS(console.log)('Pan ended:', {
        velocity: { x: event.velocityX, y: event.velocityY },
        translation: { x: event.translationX, y: event.translationY }
      });
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: scale.value }
      ],
    };
  });

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Pan Gesture</Text>
      <Text style={styles.instruction}>Drag the box around</Text>
      
      <View style={styles.gestureArea}>
        <PanGestureHandler onGestureEvent={panGestureHandler}>
          <Animated.View style={[styles.panBox, animatedStyle]}>
            <Text style={styles.gestureText}>Drag Me</Text>
          </Animated.View>
        </PanGestureHandler>
      </View>
    </View>
  );
}

// Tap gesture with different tap counts
function TapExample() {
  const scale = useSharedValue(1);
  const backgroundColor = useSharedValue(0);

  const singleTapHandler = useAnimatedGestureHandler({
    onEnd: () => {
      scale.value = withSpring(1.2, undefined, () => {
        scale.value = withSpring(1);
      });
      backgroundColor.value = withSpring(backgroundColor.value === 0 ? 1 : 0);
    },
  });

  const doubleTapHandler = useAnimatedGestureHandler({
    onEnd: () => {
      runOnJS(Alert.alert)('Double Tap!', 'You double tapped the box');
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      backgroundColor: backgroundColor.value === 0 ? '#007AFF' : '#FF3B30',
    };
  });

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Tap Gestures</Text>
      <Text style={styles.instruction}>Single tap to scale, double tap for alert</Text>
      
      <View style={styles.gestureArea}>
        <TapGestureHandler onGestureEvent={singleTapHandler}>
          <TapGestureHandler numberOfTaps={2} onGestureEvent={doubleTapHandler}>
            <Animated.View style={[styles.tapBox, animatedStyle]}>
              <Text style={styles.gestureText}>Tap Me</Text>
            </Animated.View>
          </TapGestureHandler>
        </TapGestureHandler>
      </View>
    </View>
  );
}

// Long press gesture with progress indicator
function LongPressExample() {
  const progress = useSharedValue(0);
  const scale = useSharedValue(1);

  const longPressHandler = useAnimatedGestureHandler({
    onStart: () => {
      scale.value = withSpring(0.95);
    },
    onActive: () => {
      // You can track long press progress here
      progress.value = withSpring(1);
    },
    onEnd: (event) => {
      if (event.state === State.ACTIVE) {
        runOnJS(Alert.alert)('Long Press!', 'Long press completed successfully');
      }
      progress.value = withSpring(0);
      scale.value = withSpring(1);
    },
    onFail: () => {
      progress.value = withSpring(0);
      scale.value = withSpring(1);
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const progressStyle = useAnimatedStyle(() => {
    return {
      width: \`\${progress.value * 100}%\`,
    };
  });

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Long Press Gesture</Text>
      <Text style={styles.instruction}>Hold the box for 1 second</Text>
      
      <View style={styles.gestureArea}>
        <LongPressGestureHandler 
          minDurationMs={1000}
          onGestureEvent={longPressHandler}
        >
          <Animated.View style={[styles.longPressBox, animatedStyle]}>
            <Text style={styles.gestureText}>Hold Me</Text>
            <View style={styles.progressBar}>
              <Animated.View style={[styles.progressFill, progressStyle]} />
            </View>
          </Animated.View>
        </LongPressGestureHandler>
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
    marginBottom: 5,
    color: '#333',
  },
  instruction: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  gestureArea: {
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
  },
  panBox: {
    width: 80,
    height: 80,
    backgroundColor: '#007AFF',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tapBox: {
    width: 100,
    height: 100,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  longPressBox: {
    width: 120,
    height: 120,
    backgroundColor: '#34C759',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  gestureText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  progressBar: {
    width: '100%',
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
    marginTop: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 2,
  },
});`}
          language="typescript"
          filename="BasicGestures.tsx"
          title="Basic Gesture Recognition"
        />

        <h2>4. Swipe Cards Implementation</h2>
        <p>
          Swipe cards are perfect for showcasing gesture + animation integration. 
          We'll build a Tinder-style card stack with physics-based swiping.
        </p>

        <CodeBlock
          code={`import React, { useState } from 'react';
import {
  PanGestureHandler,
  State
} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
  withTiming,
  interpolate,
  Extrapolate,
  runOnJS
} from 'react-native-reanimated';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const CARD_WIDTH = screenWidth * 0.8;
const CARD_HEIGHT = screenHeight * 0.6;
const SWIPE_THRESHOLD = screenWidth * 0.3;

// Sample card data
const SAMPLE_CARDS = [
  { id: 1, title: 'Card 1', color: '#FF6B6B', emoji: '🎨' },
  { id: 2, title: 'Card 2', color: '#4ECDC4', emoji: '🎵' },
  { id: 3, title: 'Card 3', color: '#45B7D1', emoji: '🎯' },
  { id: 4, title: 'Card 4', color: '#96CEB4', emoji: '🎪' },
  { id: 5, title: 'Card 5', color: '#FECA57', emoji: '🎭' },
];

export default function SwipeCards() {
  const [cards, setCards] = useState(SAMPLE_CARDS);
  const [currentIndex, setCurrentIndex] = useState(0);

  const removeCard = (direction: 'left' | 'right') => {
    console.log(\`Card swiped \${direction}\`);
    setCurrentIndex(prev => prev + 1);
  };

  const resetCards = () => {
    setCurrentIndex(0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Swipe Cards Demo</Text>
      
      <View style={styles.cardContainer}>
        {cards.map((card, index) => {
          if (index < currentIndex) return null;
          
          return (
            <SwipeCard
              key={card.id}
              card={card}
              index={index}
              currentIndex={currentIndex}
              onSwipe={removeCard}
            />
          );
        })}
        
        {currentIndex >= cards.length && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>All cards swiped!</Text>
            <TouchableOpacity style={styles.resetButton} onPress={resetCards}>
              <Text style={styles.resetButtonText}>Reset Cards</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      
      <SwipeIndicators />
    </View>
  );
}

function SwipeCard({ card, index, currentIndex, onSwipe }) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const rotate = useSharedValue(0);
  const scale = useSharedValue(1);

  const isActive = index === currentIndex;
  const isNext = index === currentIndex + 1;

  const panGestureHandler = useAnimatedGestureHandler({
    onStart: () => {
      if (!isActive) return;
      scale.value = withSpring(1.05);
    },
    onActive: (event) => {
      if (!isActive) return;
      
      translateX.value = event.translationX;
      translateY.value = event.translationY;
      
      // Rotate based on horizontal movement
      rotate.value = interpolate(
        event.translationX,
        [-screenWidth, screenWidth],
        [-30, 30],
        Extrapolate.CLAMP
      );
    },
    onEnd: (event) => {
      if (!isActive) return;
      
      const shouldSwipe = Math.abs(event.translationX) > SWIPE_THRESHOLD;
      const swipeDirection = event.translationX > 0 ? 'right' : 'left';
      
      if (shouldSwipe) {
        // Swipe off screen
        const targetX = event.translationX > 0 ? screenWidth * 1.5 : -screenWidth * 1.5;
        
        translateX.value = withTiming(targetX, { duration: 300 });
        translateY.value = withTiming(event.translationY + event.velocityY * 0.1, { duration: 300 });
        rotate.value = withTiming(swipeDirection === 'right' ? 45 : -45, { duration: 300 });
        scale.value = withTiming(0.8, { duration: 300 });
        
        // Remove card after animation
        runOnJS(onSwipe)(swipeDirection);
      } else {
        // Spring back to center
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
        rotate.value = withSpring(0);
        scale.value = withSpring(1);
      }
    },
  });

  const cardStyle = useAnimatedStyle(() => {
    const zIndex = cards.length - index;
    const inputRange = [currentIndex, currentIndex + 1];
    const outputRange = [1, 0.95];
    
    const cardScale = isActive ? scale.value : 
                     isNext ? interpolate(currentIndex, inputRange, outputRange, Extrapolate.CLAMP) : 0.9;
    
    const opacity = isActive ? 1 : isNext ? 0.8 : 0.6;
    
    return {
      transform: [
        { translateX: isActive ? translateX.value : 0 },
        { translateY: isActive ? translateY.value : (index - currentIndex) * 10 },
        { rotate: isActive ? \`\${rotate.value}deg\` : '0deg' },
        { scale: cardScale }
      ],
      opacity,
      zIndex,
    };
  });

  const likeStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      [0, SWIPE_THRESHOLD],
      [0, 1],
      Extrapolate.CLAMP
    );
    
    return {
      opacity,
      transform: [
        { rotate: '-30deg' },
        { scale: interpolate(opacity, [0, 1], [0.8, 1.2]) }
      ]
    };
  });

  const nopeStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      [-SWIPE_THRESHOLD, 0],
      [1, 0],
      Extrapolate.CLAMP
    );
    
    return {
      opacity,
      transform: [
        { rotate: '30deg' },
        { scale: interpolate(opacity, [0, 1], [0.8, 1.2]) }
      ]
    };
  });

  return (
    <PanGestureHandler onGestureEvent={panGestureHandler}>
      <Animated.View style={[styles.card, { backgroundColor: card.color }, cardStyle]}>
        <Animated.View style={[styles.likeLabel, likeStyle]}>
          <Text style={styles.labelText}>LIKE</Text>
        </Animated.View>
        
        <Animated.View style={[styles.nopeLabel, nopeStyle]}>
          <Text style={styles.labelText}>NOPE</Text>
        </Animated.View>
        
        <View style={styles.cardContent}>
          <Text style={styles.emoji}>{card.emoji}</Text>
          <Text style={styles.cardTitle}>{card.title}</Text>
          <Text style={styles.cardDescription}>
            Swipe right to like, left to pass
          </Text>
        </View>
      </Animated.View>
    </PanGestureHandler>
  );
}

function SwipeIndicators() {
  return (
    <View style={styles.indicators}>
      <View style={styles.indicatorRow}>
        <View style={[styles.indicator, { backgroundColor: '#FF4458' }]}>
          <Text style={styles.indicatorText}>👎 NOPE</Text>
        </View>
        <View style={[styles.indicator, { backgroundColor: '#66D7A2' }]}>
          <Text style={styles.indicatorText}>👍 LIKE</Text>
        </View>
      </View>
      <Text style={styles.instructionText}>
        Swipe cards left or right, or drag them around
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  cardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    position: 'absolute',
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  cardContent: {
    alignItems: 'center',
  },
  emoji: {
    fontSize: 80,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  likeLabel: {
    position: 'absolute',
    top: 50,
    right: 30,
    backgroundColor: 'rgba(102, 215, 162, 0.9)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 3,
    borderColor: '#66D7A2',
  },
  nopeLabel: {
    position: 'absolute',
    top: 50,
    left: 30,
    backgroundColor: 'rgba(255, 68, 88, 0.9)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 3,
    borderColor: '#FF4458',
  },
  labelText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  emptyState: {
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 20,
    color: '#666',
    marginBottom: 20,
  },
  resetButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  resetButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  indicators: {
    padding: 20,
    paddingBottom: 40,
  },
  indicatorRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  indicator: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    minWidth: 100,
    alignItems: 'center',
  },
  indicatorText: {
    color: 'white',
    fontWeight: 'bold',
  },
  instructionText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
  },
});`}
          language="typescript"
          filename="SwipeCards.tsx"
          title="Professional Swipe Cards Implementation"
        />

        <h2>5. Drag and Drop Basics</h2>
        <p>
          Drag and drop interactions are essential for reorderable lists, kanban boards, 
          and interactive layouts. Let's build a comprehensive drag and drop system.
        </p>

        <CodeBlock
          code={`import React, { useState } from 'react';
import {
  PanGestureHandler,
  State
} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
  withTiming,
  runOnJS,
  interpolate
} from 'react-native-reanimated';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');
const ITEM_HEIGHT = 80;
const ITEM_MARGIN = 10;

export default function DragDropExample() {
  return (
    <View style={styles.container}>
      <ReorderableList />
      <DragToDelete />
    </View>
  );
}

// Reorderable list with drag and drop
function ReorderableList() {
  const [items, setItems] = useState([
    { id: 1, title: 'Item 1', color: '#FF6B6B' },
    { id: 2, title: 'Item 2', color: '#4ECDC4' },
    { id: 3, title: 'Item 3', color: '#45B7D1' },
    { id: 4, title: 'Item 4', color: '#96CEB4' },
    { id: 5, title: 'Item 5', color: '#FECA57' },
  ]);

  const moveItem = (fromIndex: number, toIndex: number) => {
    const newItems = [...items];
    const [movedItem] = newItems.splice(fromIndex, 1);
    newItems.splice(toIndex, 0, movedItem);
    setItems(newItems);
  };

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Reorderable List</Text>
      <Text style={styles.instruction}>Long press and drag to reorder items</Text>
      
      <View style={styles.listContainer}>
        {items.map((item, index) => (
          <DraggableListItem
            key={item.id}
            item={item}
            index={index}
            onMove={moveItem}
            totalItems={items.length}
          />
        ))}
      </View>
    </View>
  );
}

function DraggableListItem({ item, index, onMove, totalItems }) {
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const zIndex = useSharedValue(1);
  const isDragging = useSharedValue(false);

  const panGestureHandler = useAnimatedGestureHandler({
    onStart: () => {
      isDragging.value = true;
      scale.value = withSpring(1.05);
      zIndex.value = 1000;
    },
    onActive: (event) => {
      translateY.value = event.translationY;
      
      // Calculate target index based on position
      const newIndex = Math.round(index + event.translationY / (ITEM_HEIGHT + ITEM_MARGIN));
      const clampedIndex = Math.max(0, Math.min(totalItems - 1, newIndex));
      
      if (clampedIndex !== index) {
        runOnJS(onMove)(index, clampedIndex);
      }
    },
    onEnd: () => {
      isDragging.value = false;
      translateY.value = withSpring(0);
      scale.value = withSpring(1);
      zIndex.value = withSpring(1);
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: translateY.value },
        { scale: scale.value }
      ],
      zIndex: zIndex.value,
      elevation: isDragging.value ? 10 : 1,
    };
  });

  const shadowStyle = useAnimatedStyle(() => {
    return {
      shadowOpacity: isDragging.value ? 0.3 : 0.1,
      shadowRadius: isDragging.value ? 10 : 3,
    };
  });

  return (
    <PanGestureHandler onGestureEvent={panGestureHandler} minPointers={1}>
      <Animated.View style={[styles.listItem, { backgroundColor: item.color }, animatedStyle, shadowStyle]}>
        <View style={styles.dragHandle}>
          <Text style={styles.handleText}>⋮⋮</Text>
        </View>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemSubtitle}>Drag to reorder</Text>
      </Animated.View>
    </PanGestureHandler>
  );
}

// Drag to delete with trash zone
function DragToDelete() {
  const [items, setItems] = useState([
    { id: 1, title: 'Swipe or drag me to delete', color: '#FF6B6B' },
    { id: 2, title: 'I can also be deleted', color: '#4ECDC4' },
    { id: 3, title: 'Try dragging me to trash', color: '#45B7D1' },
  ]);

  const deleteItem = (id: number) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const resetItems = () => {
    setItems([
      { id: Date.now() + 1, title: 'Swipe or drag me to delete', color: '#FF6B6B' },
      { id: Date.now() + 2, title: 'I can also be deleted', color: '#4ECDC4' },
      { id: Date.now() + 3, title: 'Try dragging me to trash', color: '#45B7D1' },
    ]);
  };

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Drag to Delete</Text>
      <Text style={styles.instruction}>Drag items to the trash zone or swipe left</Text>
      
      <TrashZone />
      
      <View style={styles.deleteContainer}>
        {items.map((item) => (
          <DeletableItem
            key={item.id}
            item={item}
            onDelete={deleteItem}
          />
        ))}
        
        {items.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>All items deleted!</Text>
            <TouchableOpacity style={styles.resetButton} onPress={resetItems}>
              <Text style={styles.resetButtonText}>Reset Items</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

function TrashZone() {
  const scale = useSharedValue(1);
  const backgroundColor = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      backgroundColor: backgroundColor.value === 0 ? '#FF4444' : '#FF0000',
    };
  });

  return (
    <Animated.View style={[styles.trashZone, animatedStyle]}>
      <Text style={styles.trashText}>🗑️ Drop here to delete</Text>
    </Animated.View>
  );
}

function DeletableItem({ item, onDelete }) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(1);
  const scale = useSharedValue(1);

  const panGestureHandler = useAnimatedGestureHandler({
    onStart: () => {
      scale.value = withSpring(1.05);
    },
    onActive: (event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
      
      // Check if over trash zone (simple approximation)
      const isOverTrash = event.absoluteY < 150 && Math.abs(event.translationY) > 50;
      
      if (isOverTrash) {
        opacity.value = withTiming(0.5);
        scale.value = withTiming(0.8);
      } else {
        opacity.value = withTiming(1);
        scale.value = withTiming(1.05);
      }
    },
    onEnd: (event) => {
      const shouldDelete = event.absoluteY < 150 && Math.abs(event.translationY) > 50;
      const swipeDelete = Math.abs(event.translationX) > screenWidth * 0.3;
      
      if (shouldDelete || swipeDelete) {
        // Animate out and delete
        opacity.value = withTiming(0, { duration: 300 });
        scale.value = withTiming(0, { duration: 300 });
        translateX.value = withTiming(swipeDelete ? (event.translationX > 0 ? screenWidth : -screenWidth) : 0, { duration: 300 });
        
        runOnJS(onDelete)(item.id);
      } else {
        // Spring back
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
        opacity.value = withSpring(1);
        scale.value = withSpring(1);
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: scale.value }
      ],
      opacity: opacity.value,
    };
  });

  return (
    <PanGestureHandler onGestureEvent={panGestureHandler}>
      <Animated.View style={[styles.deletableItem, { backgroundColor: item.color }, animatedStyle]}>
        <Text style={styles.deletableText}>{item.title}</Text>
      </Animated.View>
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  section: {
    marginBottom: 30,
    backgroundColor: 'white',
    margin: 20,
    padding: 20,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  instruction: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  listContainer: {
    minHeight: 300,
  },
  listItem: {
    height: ITEM_HEIGHT,
    marginBottom: ITEM_MARGIN,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  dragHandle: {
    marginRight: 15,
    padding: 5,
  },
  handleText: {
    fontSize: 18,
    color: 'white',
    opacity: 0.7,
  },
  itemTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  itemSubtitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  trashZone: {
    height: 80,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FF6666',
    borderStyle: 'dashed',
  },
  trashText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteContainer: {
    minHeight: 200,
  },
  deletableItem: {
    height: 60,
    marginBottom: 10,
    borderRadius: 8,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  deletableText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  resetButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  resetButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});`}
          language="typescript"
          filename="DragDropSystem.tsx"
          title="Advanced Drag and Drop System"
        />

        <h2>6. Advanced Gesture Combinations</h2>
        <p>
          Real apps often need multiple gestures working together. Let's explore pinch-to-zoom, 
          rotation, and multi-touch interactions.
        </p>

        <CodeBlock
          code={`import React from 'react';
import {
  PanGestureHandler,
  PinchGestureHandler,
  RotationGestureHandler,
  State
} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
  interpolate
} from 'react-native-reanimated';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function AdvancedGestures() {
  return (
    <View style={styles.container}>
      <MultiTouchImage />
      <GestureComposition />
    </View>
  );
}

// Multi-touch image manipulation
function MultiTouchImage() {
  // Base transform values
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  
  // Pinch gesture for scaling
  const pinchGestureHandler = useAnimatedGestureHandler({
    onStart: () => {
      // Store initial scale when pinch starts
    },
    onActive: (event) => {
      scale.value = Math.max(0.5, Math.min(3, event.scale));
    },
    onEnd: () => {
      // Optional: snap to specific scale values
      if (scale.value < 0.8) {
        scale.value = withSpring(0.5);
      } else if (scale.value > 2.5) {
        scale.value = withSpring(3);
      }
    },
  });

  // Rotation gesture
  const rotationGestureHandler = useAnimatedGestureHandler({
    onActive: (event) => {
      rotation.value = event.rotation;
    },
    onEnd: () => {
      // Optional: snap to 90-degree increments
      const snapAngle = Math.round(rotation.value / (Math.PI / 2)) * (Math.PI / 2);
      rotation.value = withSpring(snapAngle);
    },
  });

  // Pan gesture for translation
  const panGestureHandler = useAnimatedGestureHandler({
    onActive: (event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
    },
    onEnd: () => {
      // Spring back to center if dragged too far
      const maxDistance = 100;
      const distance = Math.sqrt(translateX.value ** 2 + translateY.value ** 2);
      
      if (distance > maxDistance) {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    },
  });

  // Combined animated style
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: scale.value },
        { rotate: \`\${rotation.value}rad\` },
      ],
    };
  });

  const resetTransforms = () => {
    'worklet';
    scale.value = withSpring(1);
    rotation.value = withSpring(0);
    translateX.value = withSpring(0);
    translateY.value = withSpring(0);
  };

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Multi-Touch Image</Text>
      <Text style={styles.instruction}>
        Pinch to scale, rotate with two fingers, drag to move
      </Text>
      
      <View style={styles.imageContainer}>
        <PanGestureHandler onGestureEvent={panGestureHandler}>
          <PinchGestureHandler onGestureEvent={pinchGestureHandler}>
            <RotationGestureHandler onGestureEvent={rotationGestureHandler}>
              <Animated.View style={[styles.imageWrapper, animatedStyle]}>
                <View style={styles.imagePlaceholder}>
                  <Text style={styles.imageText}>🖼️</Text>
                  <Text style={styles.imageSubtext}>Multi-touch me!</Text>
                </View>
              </Animated.View>
            </RotationGestureHandler>
          </PinchGestureHandler>
        </PanGestureHandler>
      </View>
      
      <TouchableOpacity style={styles.resetButton} onPress={resetTransforms}>
        <Text style={styles.resetButtonText}>Reset</Text>
      </TouchableOpacity>
    </View>
  );
}

// Gesture composition with simultaneous handling
function GestureComposition() {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const backgroundColor = useSharedValue(0);

  // Primary pan gesture
  const panGestureHandler = useAnimatedGestureHandler({
    onStart: () => {
      scale.value = withSpring(1.1);
    },
    onActive: (event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
      
      // Change color based on position
      const distance = Math.sqrt(translateX.value ** 2 + translateY.value ** 2);
      backgroundColor.value = interpolate(distance, [0, 150], [0, 1]);
    },
    onEnd: () => {
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
      scale.value = withSpring(1);
      backgroundColor.value = withSpring(0);
    },
  });

  // Secondary pinch gesture (simultaneous)
  const pinchGestureHandler = useAnimatedGestureHandler({
    onActive: (event) => {
      scale.value = Math.max(0.5, Math.min(2, event.scale));
    },
    onEnd: () => {
      scale.value = withSpring(1);
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    const bgColor = interpolate(
      backgroundColor.value,
      [0, 1],
      [0x007AFF, 0xFF3B30] // Blue to Red
    );
    
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: scale.value }
      ],
      backgroundColor: \`#\${bgColor.toString(16).padStart(6, '0')}\`,
    };
  });

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Gesture Composition</Text>
      <Text style={styles.instruction}>
        Drag to move and change color, pinch while dragging to scale
      </Text>
      
      <View style={styles.gestureArea}>
        <PanGestureHandler onGestureEvent={panGestureHandler}>
          <PinchGestureHandler onGestureEvent={pinchGestureHandler}>
            <Animated.View style={[styles.compositionBox, animatedStyle]}>
              <Text style={styles.gestureText}>Multi-Gesture</Text>
            </Animated.View>
          </PinchGestureHandler>
        </PanGestureHandler>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  section: {
    marginBottom: 30,
    backgroundColor: 'white',
    margin: 20,
    padding: 20,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  instruction: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    lineHeight: 20,
  },
  imageContainer: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    marginBottom: 15,
  },
  imageWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePlaceholder: {
    width: 150,
    height: 150,
    backgroundColor: '#007AFF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageText: {
    fontSize: 40,
    marginBottom: 10,
  },
  imageSubtext: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  gestureArea: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
  },
  compositionBox: {
    width: 120,
    height: 120,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gestureText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  resetButton: {
    backgroundColor: '#FF9500',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  resetButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});`}
          language="typescript"
          filename="AdvancedGestures.tsx"
          title="Advanced Multi-Touch Gestures"
        />

        <h2>7. Hands-On Exercise: Interactive Photo Gallery</h2>
        <p>
          Build a comprehensive photo gallery that combines all gesture techniques: 
          swipe navigation, pinch-to-zoom, drag to reorder, and swipe to delete.
        </p>

        <div className="bg-orange-50 dark:bg-orange-950 p-6 rounded-lg border border-orange-200 dark:border-orange-800 my-6">
          <h4 className="text-orange-800 dark:text-orange-200 font-semibold mb-3 mt-0">
            🎯 Exercise: Interactive Photo Gallery
          </h4>
          <div className="text-orange-700 dark:text-orange-300 space-y-3">
            <div>
              <strong>Phase 1:</strong> Gallery Navigation
              <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                <li>Create horizontal swipe navigation between photos</li>
                <li>Add page indicators and smooth transitions</li>
                <li>Implement snap-to-page behavior</li>
                <li>Add momentum-based swiping</li>
              </ul>
            </div>
            
            <div>
              <strong>Phase 2:</strong> Photo Manipulation
              <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                <li>Add pinch-to-zoom with min/max constraints</li>
                <li>Implement pan gesture when zoomed in</li>
                <li>Create double-tap to zoom behavior</li>
                <li>Add rotation support for landscape photos</li>
              </ul>
            </div>

            <div>
              <strong>Phase 3:</strong> Advanced Features
              <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                <li>Build thumbnail reordering with drag and drop</li>
                <li>Add swipe-to-delete from gallery</li>
                <li>Create gesture combination modes</li>
                <li>Implement physics-based animations</li>
              </ul>
            </div>
          </div>
        </div>

        <CodeBlock
          code={`// Complete Interactive Photo Gallery
import React, { useState } from 'react';
import {
  PanGestureHandler,
  PinchGestureHandler,
  TapGestureHandler,
  State
} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
  withTiming,
  interpolate,
  runOnJS
} from 'react-native-reanimated';
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Sample photos data
const SAMPLE_PHOTOS = [
  { id: 1, title: 'Sunset', emoji: '🌅', color: '#FF6B6B' },
  { id: 2, title: 'Mountain', emoji: '🏔️', color: '#4ECDC4' },
  { id: 3, title: 'Ocean', emoji: '🌊', color: '#45B7D1' },
  { id: 4, title: 'Forest', emoji: '🌲', color: '#96CEB4' },
  { id: 5, title: 'City', emoji: '🏙️', color: '#FECA57' },
];

export default function PhotoGallery() {
  const [photos, setPhotos] = useState(SAMPLE_PHOTOS);
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <View style={styles.container}>
      <GalleryViewer 
        photos={photos}
        currentIndex={currentIndex}
        onIndexChange={setCurrentIndex}
      />
      
      <ThumbnailStrip
        photos={photos}
        currentIndex={currentIndex}
        onPhotoSelect={setCurrentIndex}
        onReorder={setPhotos}
        onDelete={(id) => {
          setPhotos(prev => prev.filter(p => p.id !== id));
          if (currentIndex >= photos.length - 1) {
            setCurrentIndex(Math.max(0, photos.length - 2));
          }
        }}
      />
    </View>
  );
}

// Main photo viewer with zoom and pan
function GalleryViewer({ photos, currentIndex, onIndexChange }) {
  const scrollX = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
      const newIndex = Math.round(event.contentOffset.x / screenWidth);
      if (newIndex !== currentIndex) {
        runOnJS(onIndexChange)(newIndex);
      }
    },
  });

  return (
    <View style={styles.viewerContainer}>
      <Animated.ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
      >
        {photos.map((photo, index) => (
          <ZoomablePhoto
            key={photo.id}
            photo={photo}
            index={index}
            scrollX={scrollX}
          />
        ))}
      </Animated.ScrollView>
      
      <PageIndicator
        photos={photos}
        currentIndex={currentIndex}
        scrollX={scrollX}
      />
    </View>
  );
}

// Individual photo with zoom and pan capabilities
function ZoomablePhoto({ photo, index, scrollX }) {
  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const lastScale = useSharedValue(1);

  // Pinch to zoom
  const pinchGestureHandler = useAnimatedGestureHandler({
    onStart: () => {
      lastScale.value = scale.value;
    },
    onActive: (event) => {
      scale.value = Math.max(1, Math.min(3, lastScale.value * event.scale));
    },
    onEnd: () => {
      lastScale.value = scale.value;
      if (scale.value < 1.2) {
        scale.value = withSpring(1);
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    },
  });

  // Pan when zoomed
  const panGestureHandler = useAnimatedGestureHandler({
    onActive: (event) => {
      if (scale.value > 1) {
        translateX.value = event.translationX;
        translateY.value = event.translationY;
      }
    },
    onEnd: () => {
      if (scale.value <= 1) {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    },
  });

  // Double tap to zoom
  const doubleTapHandler = useAnimatedGestureHandler({
    onEnd: () => {
      if (scale.value > 1) {
        scale.value = withSpring(1);
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      } else {
        scale.value = withSpring(2);
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: scale.value }
      ],
    };
  });

  return (
    <View style={styles.photoContainer}>
      <PanGestureHandler onGestureEvent={panGestureHandler}>
        <PinchGestureHandler onGestureEvent={pinchGestureHandler}>
          <TapGestureHandler numberOfTaps={2} onGestureEvent={doubleTapHandler}>
            <Animated.View style={[styles.photo, { backgroundColor: photo.color }, animatedStyle]}>
              <Text style={styles.photoEmoji}>{photo.emoji}</Text>
              <Text style={styles.photoTitle}>{photo.title}</Text>
            </Animated.View>
          </TapGestureHandler>
        </PinchGestureHandler>
      </PanGestureHandler>
    </View>
  );
}

// Page indicator
function PageIndicator({ photos, currentIndex, scrollX }) {
  return (
    <View style={styles.indicatorContainer}>
      {photos.map((_, index) => {
        const animatedStyle = useAnimatedStyle(() => {
          const inputRange = [
            (index - 1) * screenWidth,
            index * screenWidth,
            (index + 1) * screenWidth,
          ];
          
          const opacity = interpolate(scrollX.value, inputRange, [0.3, 1, 0.3]);
          const scale = interpolate(scrollX.value, inputRange, [0.8, 1.2, 0.8]);
          
          return {
            opacity,
            transform: [{ scale }],
          };
        });

        return (
          <Animated.View
            key={index}
            style={[styles.indicator, animatedStyle]}
          />
        );
      })}
    </View>
  );
}

// Reorderable thumbnail strip
function ThumbnailStrip({ photos, currentIndex, onPhotoSelect, onReorder, onDelete }) {
  return (
    <View style={styles.thumbnailContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {photos.map((photo, index) => (
          <DraggableThumbnail
            key={photo.id}
            photo={photo}
            index={index}
            isActive={index === currentIndex}
            onSelect={() => onPhotoSelect(index)}
            onReorder={onReorder}
            onDelete={onDelete}
          />
        ))}
      </ScrollView>
    </View>
  );
}

function DraggableThumbnail({ photo, index, isActive, onSelect, onReorder, onDelete }) {
  const scale = useSharedValue(1);
  const translateY = useSharedValue(0);

  const panGestureHandler = useAnimatedGestureHandler({
    onStart: () => {
      scale.value = withSpring(1.1);
    },
    onActive: (event) => {
      translateY.value = event.translationY;
      
      // Check if dragging to delete zone
      if (event.translationY < -50) {
        scale.value = withTiming(0.8);
      } else {
        scale.value = withTiming(1.1);
      }
    },
    onEnd: (event) => {
      if (event.translationY < -80) {
        // Delete photo
        runOnJS(onDelete)(photo.id);
      } else {
        // Spring back
        translateY.value = withSpring(0);
        scale.value = withSpring(1);
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: translateY.value },
        { scale: scale.value }
      ],
    };
  });

  return (
    <PanGestureHandler onGestureEvent={panGestureHandler}>
      <Animated.View style={[styles.thumbnail, animatedStyle]}>
        <TouchableOpacity onPress={onSelect}>
          <View style={[
            styles.thumbnailContent,
            { backgroundColor: photo.color },
            isActive && styles.activeThumbnail
          ]}>
            <Text style={styles.thumbnailEmoji}>{photo.emoji}</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  viewerContainer: {
    flex: 1,
  },
  photoContainer: {
    width: screenWidth,
    height: screenHeight * 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photo: {
    width: screenWidth * 0.9,
    height: screenWidth * 0.9,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoEmoji: {
    fontSize: 80,
    marginBottom: 20,
  },
  photoTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'white',
    marginHorizontal: 4,
  },
  thumbnailContainer: {
    height: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 10,
  },
  thumbnail: {
    marginHorizontal: 5,
  },
  thumbnailContent: {
    width: 60,
    height: 60,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeThumbnail: {
    borderWidth: 3,
    borderColor: 'white',
  },
  thumbnailEmoji: {
    fontSize: 24,
  },
});`}
          language="typescript"
          filename="PhotoGallery.tsx"
          title="Complete Interactive Photo Gallery"
        />

        <div className="bg-green-50 dark:bg-green-950 p-6 rounded-lg border border-green-200 dark:border-green-800">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-3 mt-0">
            🎉 Session 2 Complete!
          </h4>
          <p className="text-green-700 dark:text-green-300 mb-3">
            You've mastered react-native-gesture-handler with swipe cards, drag/drop systems, 
            and advanced multi-touch interactions. Your gestures now work seamlessly with Reanimated!
          </p>
          <p className="text-green-700 dark:text-green-300 mb-0">
            <strong>Next:</strong> Session 3 will cover debugging techniques, React Native Debugger, 
            network monitoring, and effective troubleshooting strategies.
          </p>
        </div>
      </div>
    </>
  );
}