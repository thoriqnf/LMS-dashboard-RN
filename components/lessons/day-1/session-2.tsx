"use client";

import { CodeBlock } from "@/components/ui/code-block-new";

export function Day1Session2Content() {
  return (
    <>
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">
            React Native Core Components - Session 2
          </h1>

          <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg border border-blue-200 dark:border-blue-800 mb-8">
            <h3 className="text-blue-800 dark:text-blue-200 font-semibold mb-4 mt-0">
              📱 Session Overview
            </h3>
            <ul className="text-blue-700 dark:text-blue-300 space-y-2 mb-0">
              <li>
                <strong>Core Components</strong> - View, Text, Image, TextInput, and Button fundamentals
              </li>
              <li>
                <strong>Mobile Styling</strong> - StyleSheet vs inline styles for mobile apps
              </li>
              <li>
                <strong>Flexbox Layout</strong> - Creating responsive mobile interfaces
              </li>
              <li>
                <strong>Hands-On Building</strong> - Create a complete profile card interface
              </li>
              <li>
                <strong>Real Device Testing</strong> - See your components come to life
              </li>
            </ul>
          </div>
        </div>

        <h2>1. Understanding React Native Components</h2>

        <h3>From Web to Mobile: Component Translation</h3>
        <p>
          React Native provides mobile-specific components that replace HTML elements. 
          Think of this like translating a language - the concepts are the same, but the words are different.
        </p>

        <div className="my-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
          <h4 className="text-blue-800 dark:text-blue-200 font-semibold mb-2 mt-0">
            🌐 Web to Mobile Translation:
          </h4>
          <div className="text-blue-700 dark:text-blue-300 text-sm space-y-1 mb-0">
            <div className="font-mono">
              <div>&lt;div&gt; → &lt;View&gt;</div>
              <div>&lt;p&gt;, &lt;span&gt;, &lt;h1&gt; → &lt;Text&gt;</div>
              <div>&lt;img&gt; → &lt;Image&gt;</div>
              <div>&lt;input&gt; → &lt;TextInput&gt;</div>
              <div>&lt;button&gt; → &lt;Button&gt; or &lt;TouchableOpacity&gt;</div>
            </div>
          </div>
        </div>

        <h3>Why Different Components?</h3>
        <p>
          Mobile apps need components specifically designed for touch interactions, 
          different screen sizes, and mobile performance. It's like the difference between 
          a car designed for city driving vs one designed for off-road adventures.
        </p>

        <div className="grid md:grid-cols-2 gap-4 my-6">
          <div className="p-4 bg-red-50 dark:bg-red-950 rounded-lg border border-red-200 dark:border-red-800">
            <h4 className="text-red-800 dark:text-red-200 font-semibold mb-2 mt-0">
              ❌ Web HTML Elements:
            </h4>
            <ul className="text-red-700 dark:text-red-300 text-sm space-y-1 mb-0">
              <li>Designed for mouse and keyboard</li>
              <li>Fixed screen sizes</li>
              <li>Browser-specific rendering</li>
              <li>Limited touch support</li>
            </ul>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
            <h4 className="text-green-800 dark:text-green-200 font-semibold mb-2 mt-0">
              ✅ React Native Components:
            </h4>
            <ul className="text-green-700 dark:text-green-300 text-sm space-y-1 mb-0">
              <li>Optimized for touch interactions</li>
              <li>Responsive to all screen sizes</li>
              <li>Native mobile performance</li>
              <li>Built-in accessibility features</li>
            </ul>
          </div>
        </div>

        <h2>2. View Component - Your Mobile Container</h2>

        <h3>The Foundation of All Layouts</h3>
        <p>
          The View component is like a box or container in mobile apps. Just like how you 
          organize items in boxes at home, View helps you organize other components on screen.
        </p>

        <CodeBlock
          code={`import { View, Text } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, backgroundColor: '#f0f0f0' }}>
      {/* This View acts like a container box */}
      <View style={{ 
        backgroundColor: 'white', 
        padding: 20, 
        margin: 10,
        borderRadius: 10 
      }}>
        <Text>This text is inside a styled View container!</Text>
      </View>
    </View>
  );
}`}
          language="javascript"
          filename="ViewExample.js"
          title="Basic View Usage"
        />

        <div className="my-6 p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-3 mt-0">
            📦 Think of View like a shipping box:
          </h4>
          <ul className="text-green-700 dark:text-green-300 text-sm space-y-1 mb-0">
            <li><strong>Container</strong> - Holds other components inside</li>
            <li><strong>Styling</strong> - Can have background color, borders, padding</li>
            <li><strong>Layout</strong> - Controls how children are arranged</li>
            <li><strong>Touch handling</strong> - Can respond to user touches</li>
          </ul>
        </div>

        <h3>View Properties You'll Use Most</h3>

        <CodeBlock
          code={`<View style={{
  // Layout properties
  flex: 1,                    // Takes available space
  width: '100%',              // Full width
  height: 200,                // Fixed height in pixels
  
  // Spacing
  padding: 20,                // Space inside the view
  margin: 10,                 // Space outside the view
  
  // Visual styling
  backgroundColor: '#e3f2fd', // Light blue background
  borderRadius: 15,           // Rounded corners
  borderWidth: 2,             // Border thickness
  borderColor: '#2196f3',     // Border color
  
  // Shadow (iOS) / Elevation (Android)
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
}}>
  {/* Your content goes here */}
</View>`}
          language="javascript"
          filename="ViewStyling.js"
          title="Common View Styling"
        />

        <h2>3. Text Component - Displaying All Text</h2>

        <h3>The Only Way to Show Text</h3>
        <p>
          In React Native, ALL text must be wrapped in a Text component. Unlike web development 
          where you can put text directly in a div, mobile apps require explicit text containers.
        </p>

        <div className="my-6 p-4 bg-red-50 dark:bg-red-950 rounded-lg border border-red-200 dark:border-red-800">
          <h4 className="text-red-800 dark:text-red-200 font-semibold mb-2 mt-0">
            ❌ This won't work in React Native:
          </h4>
          <CodeBlock
            code={`// This will cause an error!
<View>
  Hello World
</View>`}
            language="javascript"
            filename="Wrong.js"
            title="Incorrect Text Usage"
          />
        </div>

        <div className="my-6 p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-2 mt-0">
            ✅ This is the correct way:
          </h4>
          <CodeBlock
            code={`// All text must be wrapped in Text components
<View>
  <Text>Hello World</Text>
</View>`}
            language="javascript"
            filename="Correct.js"
            title="Correct Text Usage"
          />
        </div>

        <h3>Text Styling and Typography</h3>

        <CodeBlock
          code={`import { View, Text } from 'react-native';

export default function TextExamples() {
  return (
    <View style={{ padding: 20 }}>
      {/* Heading styles */}
      <Text style={{
        fontSize: 28,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: 10,
      }}>
        Main Heading
      </Text>
      
      {/* Subheading */}
      <Text style={{
        fontSize: 20,
        fontWeight: '600',
        color: '#34495e',
        marginBottom: 15,
      }}>
        Subheading Text
      </Text>
      
      {/* Body text with line height */}
      <Text style={{
        fontSize: 16,
        lineHeight: 24,
        color: '#7f8c8d',
        textAlign: 'justify',
      }}>
        This is body text with proper line spacing for mobile reading. 
        Notice how we can control spacing, color, and alignment.
      </Text>
      
      {/* Interactive text styles */}
      <Text style={{
        fontSize: 16,
        color: '#3498db',
        textDecorationLine: 'underline',
        marginTop: 10,
      }}>
        This looks like a clickable link
      </Text>
    </View>
  );
}`}
          language="javascript"
          filename="TextStyling.js"
          title="Text Styling Examples"
        />

        <div className="my-6 p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <h4 className="text-yellow-800 dark:text-yellow-200 font-semibold mb-2 mt-0">
            📱 Mobile Typography Tips:
          </h4>
          <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1 mb-0">
            <li><strong>Minimum font size</strong> - 14px for body text (accessibility)</li>
            <li><strong>Line height</strong> - 1.4-1.6x font size for readability</li>
            <li><strong>Contrast</strong> - Dark text on light backgrounds for clarity</li>
            <li><strong>Touch targets</strong> - Clickable text should be at least 44px tall</li>
          </ul>
        </div>

        <h2>4. Image Component - Visual Content</h2>

        <h3>Displaying Images in Mobile Apps</h3>
        <p>
          The Image component handles both local images (bundled with your app) and 
          remote images (downloaded from the internet). Think of it like a picture frame 
          that can hold photos from your phone or photos from the web.
        </p>

        <CodeBlock
          code={`import { View, Image } from 'react-native';

export default function ImageExamples() {
  return (
    <View style={{ padding: 20, alignItems: 'center' }}>
      {/* Local image (bundled with app) */}
      <Image
        source={require('./assets/profile-photo.jpg')}
        style={{
          width: 100,
          height: 100,
          borderRadius: 50,  // Makes it circular
          marginBottom: 20,
        }}
      />
      
      {/* Remote image (from internet) */}
      <Image
        source={{
          uri: 'https://example.com/user-avatar.jpg'
        }}
        style={{
          width: 120,
          height: 120,
          borderRadius: 10,
          marginBottom: 20,
        }}
      />
      
      {/* Image with fallback and loading */}
      <Image
        source={{
          uri: 'https://example.com/might-not-exist.jpg'
        }}
        style={{
          width: 200,
          height: 150,
          borderRadius: 8,
        }}
        resizeMode="cover"  // How image fits in container
        defaultSource={require('./assets/placeholder.jpg')}
      />
    </View>
  );
}`}
          language="javascript"
          filename="ImageExamples.js"
          title="Image Component Usage"
        />

        <div className="my-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
          <h4 className="text-blue-800 dark:text-blue-200 font-semibold mb-2 mt-0">
            📸 Image Resize Modes:
          </h4>
          <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1 mb-0">
            <li><strong>cover</strong> - Fill container, may crop image (like Instagram)</li>
            <li><strong>contain</strong> - Fit entire image, may have empty space</li>
            <li><strong>stretch</strong> - Stretch to fill exactly (may distort)</li>
            <li><strong>center</strong> - Center image at original size</li>
          </ul>
        </div>

        <h2>5. TextInput Component - User Input</h2>

        <h3>Getting Text from Users</h3>
        <p>
          TextInput is how users type information into your app. It's like a digital 
          notepad where users can write messages, enter their name, or provide feedback.
        </p>

        <CodeBlock
          code={`import { useState } from 'react';
import { View, Text, TextInput } from 'react-native';

export default function InputExamples() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  return (
    <View style={{ padding: 20 }}>
      {/* Basic text input */}
      <Text style={{ fontSize: 16, marginBottom: 5 }}>Your Name:</Text>
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: '#ddd',
          borderRadius: 8,
          padding: 12,
          fontSize: 16,
          marginBottom: 20,
        }}
        value={name}
        onChangeText={setName}
        placeholder="Enter your full name"
        placeholderTextColor="#999"
      />

      {/* Email input with specific keyboard */}
      <Text style={{ fontSize: 16, marginBottom: 5 }}>Email:</Text>
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: '#ddd',
          borderRadius: 8,
          padding: 12,
          fontSize: 16,
          marginBottom: 20,
        }}
        value={email}
        onChangeText={setEmail}
        placeholder="your.email@example.com"
        keyboardType="email-address"  // Shows @ symbol
        autoCapitalize="none"
        autoCorrect={false}
      />

      {/* Multi-line text input */}
      <Text style={{ fontSize: 16, marginBottom: 5 }}>Message:</Text>
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: '#ddd',
          borderRadius: 8,
          padding: 12,
          fontSize: 16,
          height: 100,
          textAlignVertical: 'top',  // Start typing at top
        }}
        value={message}
        onChangeText={setMessage}
        placeholder="Write your message here..."
        multiline={true}
        numberOfLines={4}
      />
    </View>
  );
}`}
          language="javascript"
          filename="TextInputExamples.js"
          title="TextInput Component Usage"
        />

        <div className="my-6 p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-2 mt-0">
            ⌨️ Mobile Keyboard Types:
          </h4>
          <ul className="text-green-700 dark:text-green-300 text-sm space-y-1 mb-0">
            <li><strong>default</strong> - Standard keyboard</li>
            <li><strong>numeric</strong> - Numbers only</li>
            <li><strong>email-address</strong> - @ and . easily accessible</li>
            <li><strong>phone-pad</strong> - Phone number layout</li>
            <li><strong>url</strong> - .com and / easily accessible</li>
          </ul>
        </div>

        <h2>6. Button Component - Touch Interactions</h2>

        <h3>Making Things Tappable</h3>
        <p>
          Buttons let users interact with your app. They're like light switches - 
          when pressed, something happens. React Native offers several ways to create buttons.
        </p>

        <CodeBlock
          code={`import { View, Text, Button, TouchableOpacity, Alert } from 'react-native';

export default function ButtonExamples() {
  const handlePress = () => {
    Alert.alert('Button Pressed!', 'You tapped the button.');
  };

  const handleCustomPress = () => {
    Alert.alert('Custom Button', 'This is a styled button!');
  };

  return (
    <View style={{ padding: 20 }}>
      {/* Basic Button component */}
      <Button
        title="Basic Button"
        onPress={handlePress}
        color="#2196f3"
      />

      <View style={{ height: 20 }} />

      {/* Custom styled button with TouchableOpacity */}
      <TouchableOpacity
        style={{
          backgroundColor: '#4caf50',
          padding: 15,
          borderRadius: 25,
          alignItems: 'center',
          marginBottom: 15,
        }}
        onPress={handleCustomPress}
      >
        <Text style={{
          color: 'white',
          fontSize: 16,
          fontWeight: 'bold',
        }}>
          Custom Green Button
        </Text>
      </TouchableOpacity>

      {/* Button with icon-like appearance */}
      <TouchableOpacity
        style={{
          backgroundColor: '#ff5722',
          padding: 12,
          borderRadius: 8,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={() => Alert.alert('Action', 'Secondary action triggered!')}
      >
        <Text style={{
          color: 'white',
          fontSize: 14,
          fontWeight: '600',
        }}>
          🚀 Launch Action
        </Text>
      </TouchableOpacity>
    </View>
  );
}`}
          language="javascript"
          filename="ButtonExamples.js"
          title="Button Component Usage"
        />

        <div className="my-6 p-4 bg-purple-50 dark:bg-purple-950 rounded-lg border border-purple-200 dark:border-purple-800">
          <h4 className="text-purple-800 dark:text-purple-200 font-semibold mb-2 mt-0">
            👆 Touch Components Comparison:
          </h4>
          <ul className="text-purple-700 dark:text-purple-300 text-sm space-y-1 mb-0">
            <li><strong>Button</strong> - Simple, platform-styled button</li>
            <li><strong>TouchableOpacity</strong> - Custom styled, fades when pressed</li>
            <li><strong>TouchableHighlight</strong> - Highlights when pressed</li>
            <li><strong>Pressable</strong> - Advanced touch handling (newer)</li>
          </ul>
        </div>

        <h2>7. Styling: StyleSheet vs Inline Styles</h2>

        <h3>Two Ways to Style Your Components</h3>
        <p>
          React Native offers two main approaches to styling: StyleSheet objects and inline styles. 
          Think of StyleSheet like having a wardrobe where you organize outfits, while inline styles 
          are like getting dressed on the spot.
        </p>

        <div className="grid md:grid-cols-2 gap-4 my-6">
          <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
            <h4 className="text-blue-800 dark:text-blue-200 font-semibold mb-3 mt-0">
              📋 StyleSheet Approach:
            </h4>
            <CodeBlock
              code={`import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  },
});

// Usage:
<View style={styles.container}>
  <Text style={styles.title}>Hello</Text>
  <TouchableOpacity style={styles.button}>
    <Text>Button</Text>
  </TouchableOpacity>
</View>`}
              language="javascript"
              filename="StyleSheet.js"
              title="StyleSheet Approach"
            />
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
            <h4 className="text-green-800 dark:text-green-200 font-semibold mb-3 mt-0">
              🎨 Inline Styles Approach:
            </h4>
            <CodeBlock
              code={`// Direct styling on components
<View style={{
  flex: 1,
  backgroundColor: '#f5f5f5',
  padding: 20,
}}>
  <Text style={{
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  }}>
    Hello
  </Text>
  <TouchableOpacity style={{
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  }}>
    <Text>Button</Text>
  </TouchableOpacity>
</View>`}
              language="javascript"
              filename="InlineStyles.js"
              title="Inline Styles Approach"
            />
          </div>
        </div>

        <h3>When to Use Each Approach</h3>

        <div className="my-6 p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <h4 className="text-yellow-800 dark:text-yellow-200 font-semibold mb-3 mt-0">
            📊 StyleSheet Benefits:
          </h4>
          <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1 mb-2">
            <li>✅ Better performance (styles are optimized)</li>
            <li>✅ Reusable across components</li>
            <li>✅ Cleaner, more organized code</li>
            <li>✅ Easier to maintain and update</li>
          </ul>
          <p className="text-yellow-700 dark:text-yellow-300 text-sm mb-0">
            <strong>Best for:</strong> Consistent styling, complex layouts, reusable components
          </p>
        </div>

        <div className="my-6 p-4 bg-orange-50 dark:bg-orange-950 rounded-lg border border-orange-200 dark:border-orange-800">
          <h4 className="text-orange-800 dark:text-orange-200 font-semibold mb-3 mt-0">
            🎯 Inline Styles Benefits:
          </h4>
          <ul className="text-orange-700 dark:text-orange-300 text-sm space-y-1 mb-2">
            <li>✅ Dynamic styling based on props/state</li>
            <li>✅ Quick prototyping and testing</li>
            <li>✅ One-off styling needs</li>
            <li>✅ Conditional styling logic</li>
          </ul>
          <p className="text-orange-700 dark:text-orange-300 text-sm mb-0">
            <strong>Best for:</strong> Dynamic colors, conditional styles, quick experiments
          </p>
        </div>

        <h3>Combining Both Approaches</h3>

        <CodeBlock
          code={`import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function CombinedStyling() {
  const [isPressed, setIsPressed] = useState(false);
  const [themeColor, setThemeColor] = useState('#2196f3');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My App</Text>
      
      {/* Combining StyleSheet + inline for dynamic styling */}
      <TouchableOpacity
        style={[
          styles.button,  // Base styles from StyleSheet
          { 
            backgroundColor: isPressed ? '#1976d2' : themeColor,  // Dynamic color
            transform: [{ scale: isPressed ? 0.95 : 1 }]  // Dynamic scale
          }
        ]}
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
        onPress={() => setThemeColor('#4caf50')}
      >
        <Text style={styles.buttonText}>Press Me!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  button: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});`}
          language="javascript"
          filename="CombinedStyling.js"
          title="Combining StyleSheet and Inline Styles"
        />

        <h2>8. Flexbox Layout in React Native</h2>

        <h3>Mobile-First Layout System</h3>
        <p>
          Flexbox in React Native is like organizing furniture in a room. You decide how 
          items are arranged, how much space they take up, and how they respond when the 
          room size changes (different screen sizes).
        </p>

        <div className="my-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
          <h4 className="text-blue-800 dark:text-blue-200 font-semibold mb-2 mt-0">
            🏠 Flexbox Container Analogy:
          </h4>
          <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1 mb-0">
            <li><strong>Container (Parent View)</strong> - The room that holds furniture</li>
            <li><strong>Items (Child Views)</strong> - The furniture pieces inside</li>
            <li><strong>Main Axis</strong> - Primary direction (vertical by default in RN)</li>
            <li><strong>Cross Axis</strong> - Secondary direction (horizontal)</li>
          </ul>
        </div>

        <h3>Key Flexbox Properties</h3>

        <CodeBlock
          code={`import { View, Text } from 'react-native';

export default function FlexboxExamples() {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      
      {/* Example 1: Basic flex distribution */}
      <View style={{
        flexDirection: 'row',    // Arrange children horizontally
        height: 100,
        backgroundColor: '#e3f2fd',
        marginBottom: 20,
      }}>
        <View style={{ 
          flex: 1,               // Takes 1/3 of available space
          backgroundColor: '#bbdefb' 
        }}>
          <Text>Box 1</Text>
        </View>
        <View style={{ 
          flex: 2,               // Takes 2/3 of available space
          backgroundColor: '#90caf9' 
        }}>
          <Text>Box 2 (bigger)</Text>
        </View>
      </View>

      {/* Example 2: Centering content */}
      <View style={{
        height: 120,
        backgroundColor: '#f3e5f5',
        justifyContent: 'center',    // Center along main axis (vertical)
        alignItems: 'center',        // Center along cross axis (horizontal)
        marginBottom: 20,
      }}>
        <Text style={{ fontSize: 18 }}>Perfectly Centered!</Text>
      </View>

      {/* Example 3: Space distribution */}
      <View style={{
        flexDirection: 'row',
        height: 80,
        backgroundColor: '#e8f5e8',
        justifyContent: 'space-between',  // Space items evenly
        alignItems: 'center',
      }}>
        <View style={{ width: 50, height: 50, backgroundColor: '#4caf50' }}>
          <Text>1</Text>
        </View>
        <View style={{ width: 50, height: 50, backgroundColor: '#66bb6a' }}>
          <Text>2</Text>
        </View>
        <View style={{ width: 50, height: 50, backgroundColor: '#81c784' }}>
          <Text>3</Text>
        </View>
      </View>
    </View>
  );
}`}
          language="javascript"
          filename="FlexboxBasics.js"
          title="Flexbox Layout Examples"
        />

        <h3>Common Mobile Layout Patterns</h3>

        <CodeBlock
          code={`// Pattern 1: Header, Content, Footer Layout
export default function AppLayout() {
  return (
    <View style={{ flex: 1 }}>
      {/* Header - Fixed height */}
      <View style={{
        height: 60,
        backgroundColor: '#2196f3',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
          My App Header
        </Text>
      </View>

      {/* Content - Takes remaining space */}
      <View style={{
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 20,
      }}>
        <Text>Main content area that grows to fill available space</Text>
      </View>

      {/* Footer - Fixed height */}
      <View style={{
        height: 80,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
      }}>
        <TouchableOpacity style={{ alignItems: 'center' }}>
          <Text>🏠</Text>
          <Text style={{ fontSize: 12 }}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ alignItems: 'center' }}>
          <Text>👤</Text>
          <Text style={{ fontSize: 12 }}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ alignItems: 'center' }}>
          <Text>⚙️</Text>
          <Text style={{ fontSize: 12 }}>Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}`}
          language="javascript"
          filename="MobileLayout.js"
          title="Common Mobile Layout Pattern"
        />

        <div className="my-6 p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-2 mt-0">
            📐 Flexbox Property Quick Reference:
          </h4>
          <div className="text-green-700 dark:text-green-300 text-sm font-mono space-y-1 mb-0">
            <div><strong>flexDirection:</strong> 'column' | 'row' | 'column-reverse' | 'row-reverse'</div>
            <div><strong>justifyContent:</strong> 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around'</div>
            <div><strong>alignItems:</strong> 'flex-start' | 'center' | 'flex-end' | 'stretch'</div>
            <div><strong>flex:</strong> number (how much space to take)</div>
          </div>
        </div>

        <h2>9. Hands-On Exercise: Build a Profile Card</h2>

        <div className="my-6 p-4 bg-orange-50 dark:bg-orange-950 rounded-lg border border-orange-200 dark:border-orange-800">
          <h4 className="text-orange-800 dark:text-orange-200 font-semibold mb-3 mt-0">
            🎯 Your Challenge: Create a Personal Profile Card
          </h4>
          <p className="text-orange-700 dark:text-orange-300 text-sm mb-2">
            Use all the components we've learned to build a complete profile card interface.
          </p>
          <h5 className="text-orange-800 dark:text-orange-200 font-semibold mb-2">
            Requirements:
          </h5>
          <ul className="text-orange-700 dark:text-orange-300 text-sm space-y-1 mb-0">
            <li>Use View for the card container with styling</li>
            <li>Add Text components for name, title, and bio</li>
            <li>Include an Image (use placeholder if needed)</li>
            <li>Add TextInput for editing the bio</li>
            <li>Include Button or TouchableOpacity for interactions</li>
            <li>Use Flexbox for responsive layout</li>
            <li>Combine StyleSheet and inline styles</li>
          </ul>
        </div>

        <CodeBlock
          code={`import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet,
  Alert 
} from 'react-native';

export default function ProfileCard() {
  const [bio, setBio] = useState('Mobile app developer passionate about creating amazing user experiences.');
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    Alert.alert('Saved!', 'Your bio has been updated.');
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Profile Image */}
        <Image
          source={{
            uri: 'https://via.placeholder.com/150/4caf50/ffffff?text=👤'
          }}
          style={styles.profileImage}
        />

        {/* Name and Title */}
        <Text style={styles.name}>Alex Johnson</Text>
        <Text style={styles.title}>React Native Developer</Text>

        {/* Bio Section */}
        <View style={styles.bioSection}>
          <Text style={styles.bioLabel}>About Me:</Text>
          {isEditing ? (
            <TextInput
              style={styles.bioInput}
              value={bio}
              onChangeText={setBio}
              multiline={true}
              numberOfLines={3}
              autoFocus={true}
            />
          ) : (
            <Text style={styles.bioText}>{bio}</Text>
          )}
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={isEditing ? handleSave : () => setIsEditing(true)}
          >
            <Text style={styles.primaryButtonText}>
              {isEditing ? 'Save Bio' : 'Edit Bio'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={() => Alert.alert('Contact', 'Feature coming soon!')}
          >
            <Text style={styles.secondaryButtonText}>Contact</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  title: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 20,
  },
  bioSection: {
    width: '100%',
    marginBottom: 25,
  },
  bioLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#34495e',
    marginBottom: 8,
  },
  bioText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#7f8c8d',
    textAlign: 'left',
  },
  bioInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    minHeight: 60,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  primaryButton: {
    backgroundColor: '#3498db',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#3498db',
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: '#3498db',
    fontSize: 14,
    fontWeight: '600',
  },
});`}
          language="javascript"
          filename="ProfileCard.js"
          title="Complete Profile Card Component"
        />

        <h3>Test Your Profile Card</h3>
        <p>
          Replace your App.js content with the ProfileCard component above and test it on your device:
        </p>
        <ol>
          <li>Save the file and watch it update on your phone</li>
          <li>Try tapping the "Edit Bio" button</li>
          <li>Modify the bio text and save</li>
          <li>Experiment with the styling and colors</li>
        </ol>

        <div className="my-6 p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-3 mt-0">
            🎊 What you've accomplished:
          </h4>
          <ul className="text-green-700 dark:text-green-300 text-sm space-y-1 mb-0">
            <li>✅ Used all 5 core React Native components</li>
            <li>✅ Combined StyleSheet and inline styling</li>
            <li>✅ Created responsive Flexbox layouts</li>
            <li>✅ Implemented interactive user input</li>
            <li>✅ Built a complete mobile interface</li>
          </ul>
        </div>

        <h2>10. Next Steps & Practice</h2>

        <div className="my-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
          <h4 className="text-blue-800 dark:text-blue-200 font-semibold mb-3 mt-0">
            🚀 Coming up in Session 3:
          </h4>
          <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1 mb-0">
            <li>State management in mobile apps</li>
            <li>Touch gestures and advanced interactions</li>
            <li>Navigation between screens</li>
            <li>Working with device features (camera, location)</li>
          </ul>
        </div>

        <div className="my-6 p-4 bg-orange-50 dark:bg-orange-950 rounded-lg border border-orange-200 dark:border-orange-800">
          <h4 className="text-orange-800 dark:text-orange-200 font-semibold mb-3 mt-0">
            🎯 Practice Challenges:
          </h4>
          <ul className="text-orange-700 dark:text-orange-300 text-sm space-y-1 mb-0">
            <li>Customize the ProfileCard colors and layout</li>
            <li>Add more TextInput fields (age, location, hobbies)</li>
            <li>Create a simple calculator using TextInput and Button</li>
            <li>Build a to-do list with multiple TextInput components</li>
            <li>Experiment with different Flexbox layouts</li>
          </ul>
        </div>

        <p className="text-lg font-semibold text-center mt-8 mb-4">
          You're building real mobile apps now! 🚀📱
        </p>
      </div>
    </>
  );
}