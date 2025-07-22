"use client";

import { CodeBlock } from "@/components/ui/code-block-new";

export function Day2Session4Content() {
  return (
    <>
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">
            Simple Reusable Components - Session 4
          </h1>

          <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg border border-blue-200 dark:border-blue-800 mb-8">
            <h3 className="text-blue-800 dark:text-blue-200 font-semibold mb-4 mt-0">
              📅 Session Overview
            </h3>
            <ul className="text-blue-700 dark:text-blue-300 space-y-2 mb-0">
              <li>
                <strong>Reusable Button</strong> - Create a simple custom button component
              </li>
              <li>
                <strong>ProductCard Component</strong> - Build a card to display product information
              </li>
              <li>
                <strong>Simple Colors</strong> - Use basic color constants across components
              </li>
              <li>
                <strong>Practice with Props</strong> - Learn to pass data between components
              </li>
              <li>
                <strong>Key Takeaways</strong> - Build foundation for bigger component libraries
              </li>
            </ul>
          </div>
        </div>

        <h2>1. Why Reusable Components?</h2>

        <div className="my-6 p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <h4 className="text-yellow-800 dark:text-yellow-200 font-semibold mb-3 mt-0">
            ❌ The Problem We're Solving:
          </h4>
          <div className="text-yellow-700 dark:text-yellow-300 text-sm">
            <p className="mb-2">Right now, if we want a button in different screens, we copy and paste:</p>
            <ul className="space-y-1 mb-0">
              <li>• Same TouchableOpacity code everywhere</li>
              <li>• Same styling repeated in every file</li>
              <li>• Hard to change colors or styles later</li>
              <li>• What if we want 10 buttons that look the same?</li>
            </ul>
          </div>
        </div>

        <div className="my-6 p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-3 mt-0">
            ✅ The Solution - Reusable Components:
          </h4>
          <div className="text-green-700 dark:text-green-300 text-sm">
            <p className="mb-2">Create once, use everywhere:</p>
            <ul className="space-y-1 mb-0">
              <li>• Write a &lt;Button&gt; component one time</li>
              <li>• Use it in any screen: &lt;Button title="Click me" /&gt;</li>
              <li>• Change colors in one place, updates everywhere</li>
              <li>• Much cleaner and easier to maintain</li>
            </ul>
          </div>
        </div>

        <h2>2. Let's Start Simple - Custom Button</h2>
        <p>
          Instead of writing TouchableOpacity and styling every time, let's create a simple Button component 
          that we can reuse everywhere.
        </p>

        <CodeBlock
          code={`// components/Button.js - Simple Custom Button
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

// Simple button component with just the basics
const Button = ({ title, onPress, color = 'blue' }) => {
  return (
    <TouchableOpacity 
      style={[styles.button, { backgroundColor: color }]} 
      onPress={onPress}
    >
      <Text style={styles.text}>\{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Button;`}
          language="jsx"
          filename="Button.js"
          title="Simple Custom Button Component"
        />

        <h3>How to Use Our Custom Button</h3>
        <p>
          Now instead of writing TouchableOpacity every time, we can just use our Button component!
        </p>

        <CodeBlock
          code={`// Using our custom Button in any screen
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Button from '../components/Button';

const HomeScreen = () => {
  const handlePress = () => {
    console.log('Button pressed!');
  };

  return (
    <View style={styles.container}>
      {/* Look how clean this is! */}
      <Button title="Press Me" onPress={handlePress} />
      <Button title="Blue Button" onPress={handlePress} color="blue" />
      <Button title="Red Button" onPress={handlePress} color="red" />
      <Button title="Green Button" onPress={handlePress} color="green" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
});

export default HomeScreen;`}
          language="jsx"
          filename="HomeScreen.js"
          title="Using Our Custom Button"
        />

        <h2>3. Building a ProductCard Component</h2>
        <p>
          Now let's build something more practical - a ProductCard that can display product information. 
          This is the type of component you'll use in real apps all the time!
        </p>

        <CodeBlock
          code={`// components/ProductCard.js - Card to display product info
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Button from './Button';

// ProductCard component that takes product information as props
const ProductCard = ({ product }) => {
  const handleBuyPress = () => {
    console.log('Buy pressed for:', product.name);
  };

  const handleViewPress = () => {
    console.log('View details for:', product.name);
  };

  return (
    <View style={styles.card}>
      {/* Product Info */}
      <View style={styles.productInfo}>
        <Text style={styles.productName}>\${product.name}</Text>
        <Text style={styles.productPrice}>\$\${product.price}</Text>
        <Text style={styles.productDescription}>\${product.description}</Text>
      </View>
      
      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <Button 
          title="View Details" 
          onPress={handleViewPress} 
          color="#007AFF" 
        />
        <Button 
          title="Buy Now" 
          onPress={handleBuyPress} 
          color="#28A745" 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productInfo: {
    marginBottom: 16,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#28A745',
    marginBottom: 8,
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ProductCard;`}
          language="jsx"
          filename="ProductCard.js"
          title="ProductCard Component for Displaying Products"
        />

        <h3>Using ProductCard in Your App</h3>
        <p>
          Here's how you would use the ProductCard component in a real screen to display a list of products:
        </p>

        <CodeBlock
          code={`// screens/ProductListScreen.js - Using ProductCard
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import ProductCard from '../components/ProductCard';

// Sample product data
const products = [
  {
    id: 1,
    name: 'iPhone 15',
    price: 999,
    description: 'The latest iPhone with amazing camera and performance',
  },
  {
    id: 2,
    name: 'Samsung Galaxy S24',
    price: 899,
    description: 'Premium Android phone with excellent display',
  },
  {
    id: 3,
    name: 'iPad Air',
    price: 599,
    description: 'Perfect tablet for work and entertainment',
  },
];

const ProductListScreen = () => {
  return (
    <ScrollView style={styles.container}>
      \{products.map(product => (
        <ProductCard 
          key=\{product.id} 
          product=\{product} 
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingVertical: 10,
  },
});

export default ProductListScreen;`}
          language="jsx"
          filename="ProductListScreen.js"
          title="Using ProductCard to Display Products"
        />

        <h2>4. Simple Color Constants (Beginner Approach)</h2>

        <p>
          For now, let's keep it simple! Instead of complex theme management, we'll create a basic colors file 
          that we can use across all our components.
        </p>

        <CodeBlock
          code={`// constants/colors.js - Simple color constants
// Define all your app colors in one place!

export const colors = {
  // Main brand colors
  primary: '#007AFF',
  success: '#28A745', 
  danger: '#DC3545',
  warning: '#FFC107',
  
  // Neutral colors
  white: '#FFFFFF',
  black: '#000000',
  gray: '#6C757D',
  lightGray: '#F8F9FA',
  
  // Text colors
  textDark: '#333333',
  textLight: '#666666',
};

// Now you can use these anywhere!
export default colors;`}
          language="javascript"
          filename="colors.js"
          title="Simple Color Constants"
        />

        <h3>Using Colors in Your Components</h3>
        <p>Now let's update our Button component to use our color constants instead of hardcoded colors:</p>

        <CodeBlock
          code={`// components/Button.js - Updated with color constants
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import colors from '../constants/colors'; // Import our colors

const Button = ({ title, onPress, type = 'primary' }) => {
  // Use different colors based on button type
  const getButtonColor = () => {
    switch (type) {
      case 'primary':
        return colors.primary;
      case 'success':
        return colors.success;
      case 'danger':
        return colors.danger;
      case 'warning':
        return colors.warning;
      default:
        return colors.primary;
    }
  };

  return (
    <TouchableOpacity 
      style={[styles.button, \{ backgroundColor: getButtonColor() }]} 
      onPress=\{onPress}
    >
      <Text style={styles.text}>\{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  },
  text: {
    color: colors.white, // Using our color constant!
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Button;`}
          language="jsx"
          filename="Button.js"
          title="Button Component Using Color Constants"
        />

        <h3>Testing Your Button Types</h3>
        <p>Now you can create buttons with different purposes using the type prop:</p>

        <CodeBlock
          code={`// Example of using different button types
import Button from '../components/Button';

const MyScreen = () => {
  return (
    <View>
      <Button title="Login" onPress={() => {}} type="primary" />
      <Button title="Success" onPress={() => {}} type="success" />
      <Button title="Delete" onPress={() => {}} type="danger" />
      <Button title="Warning" onPress={() => {}} type="warning" />
    </View>
  );
};`}
          language="jsx"
          filename="MyScreen.js"
          title="Using Different Button Types"
        />

        <div className="bg-green-50 dark:bg-green-950 p-6 rounded-lg border border-green-200 dark:border-green-800 mb-6">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-3 mt-0">
            ✅ Benefits of This Approach:
          </h4>
          <ul className="text-green-700 dark:text-green-300 text-sm space-y-1 mb-0">
            <li><strong>Simple to understand</strong> - Easy for beginners to learn and use</li>
            <li><strong>Consistent colors</strong> - All components use the same color scheme</li>
            <li><strong>Easy to change</strong> - Update colors.js to change your entire app</li>
            <li><strong>Reusable</strong> - Write once, use everywhere</li>
            <li><strong>Professional look</strong> - Consistent design across your app</li>
          </ul>
        </div>

        <h2>5. Your Turn - Hands-On Exercise</h2>

        <div className="bg-orange-50 dark:bg-orange-950 p-6 rounded-lg border border-orange-200 dark:border-orange-800 mb-6">
          <h4 className="text-orange-800 dark:text-orange-200 font-semibold mb-3 mt-0">
            🎯 Practice Challenge:
          </h4>
          <p className="text-orange-700 dark:text-orange-300 text-sm mb-4">
            Now it's time to practice! Create your own reusable components following the patterns we learned.
          </p>
          <ul className="text-orange-700 dark:text-orange-300 text-sm space-y-2 mb-0">
            <li>1. Create a colors.js file with your own color scheme</li>
            <li>2. Update the Button component to use your colors</li>
            <li>3. Build a ProductCard component for a different type of product (books, clothes, etc.)</li>
            <li>4. Create a screen that uses multiple ProductCards</li>
            <li>5. Try adding different button types to your ProductCard</li>
          </ul>
        </div>

        <h3>Example Solution (Try it yourself first!)</h3>
        <p>
          Here's an example of a different ProductCard for books that you could create:
        </p>

        <CodeBlock
          code={`// components/BookCard.js - A different type of ProductCard
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from './Button';
import colors from '../constants/colors';

const BookCard = ({ book }) => {
  const handleBorrow = () => {
    console.log('Borrowing book:', book.title);
  };

  const handlePreview = () => {
    console.log('Previewing book:', book.title);
  };

  return (
    <View style={styles.card}>
      <View style={styles.bookInfo}>
        <Text style={styles.title}>\{book.title}</Text>
        <Text style={styles.author}>by \{book.author}</Text>
        <Text style={styles.genre}>\{book.genre}</Text>
        <Text style={styles.description}>\{book.description}</Text>
      </View>
      
      <View style={styles.actions}>
        <Button 
          title="Preview" 
          onPress={handlePreview} 
          type="primary" 
        />
        <Button 
          title="Borrow" 
          onPress={handleBorrow} 
          type="success" 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bookInfo: {
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textDark,
    marginBottom: 4,
  },
  author: {
    fontSize: 14,
    color: colors.gray,
    marginBottom: 2,
  },
  genre: {
    fontSize: 12,
    color: colors.primary,
    marginBottom: 8,
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    color: colors.textLight,
    lineHeight: 20,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default BookCard;`}
          language="jsx"
          filename="BookCard.js"
          title="BookCard Example - Different Product Type"
        />

        <h2>6. Session Summary</h2>

        <div className="bg-green-50 dark:bg-green-950 p-6 rounded-lg border border-green-200 dark:border-green-800 mb-6">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-3 mt-0">
            🎉 What You've Learned:
          </h4>
          <ul className="text-green-700 dark:text-green-300 text-sm space-y-2 mb-0">
            <li>✅ <strong>Reusable Components</strong> - Created simple Button and ProductCard components</li>
            <li>✅ <strong>Component Props</strong> - Learned how to pass data between components</li>
            <li>✅ <strong>Color Constants</strong> - Organized colors in one place for consistency</li>
            <li>✅ <strong>Component Types</strong> - Made different button types (primary, success, danger)</li>
            <li>✅ <strong>Real-world Examples</strong> - Built ProductCard that displays product information</li>
            <li>✅ <strong>Code Organization</strong> - Kept components in separate files for better structure</li>
          </ul>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg border border-blue-200 dark:border-blue-800 mb-6">
          <h4 className="text-blue-800 dark:text-blue-200 font-semibold mb-3 mt-0">
            🔑 Key Takeaways:
          </h4>
          <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1 mb-0">
            <li><strong>Write once, use everywhere</strong> - Reusable components save time</li>
            <li><strong>Props make components flexible</strong> - Pass different data to the same component</li>
            <li><strong>Color constants keep things consistent</strong> - Change colors in one place</li>
            <li><strong>Start simple, then build up</strong> - Begin with basic components, add features later</li>
            <li><strong>Practice makes perfect</strong> - Build different types of cards to get comfortable</li>
          </ul>
        </div>

        <div className="bg-purple-50 dark:bg-purple-950 p-6 rounded-lg border border-purple-200 dark:border-purple-800">
          <h4 className="text-purple-800 dark:text-purple-200 font-semibold mb-3 mt-0">
            🚀 What's Next:
          </h4>
          <p className="text-purple-700 dark:text-purple-300 text-sm mb-4">
            Congratulations! You now know how to create reusable components. This is a foundational skill 
            that you'll use in every React Native app you build.
          </p>
          <p className="text-purple-700 dark:text-purple-300 text-sm mb-0">
            <strong>Keep practicing:</strong> Try creating different types of cards (UserCard, EventCard, etc.) 
            and experiment with different props and styling. The more you practice, the more comfortable you'll become!
          </p>
        </div>
      </div>
    </>
  );
}