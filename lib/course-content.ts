"use client"

import type React from "react"

export interface SessionContent {
  title: string
  description: string
  content: React.ReactNode
}

export interface DayContent {
  title: string
  description: string
  sessions: SessionContent[]
  challenge: {
    title: string
    description: string
    tasks: string[]
    codeTemplate: string
  }
}

export const courseContent: Record<number, DayContent> = {
  1: {
    title: "React Native Foundation",
    description: "Learn React Native fundamentals including Expo setup, mobile components, and building your first mobile app",
    sessions: [
      {
        title: "React Native Introduction",
        description: "What is React Native, Expo vs CLI, development setup, and creating your first mobile app",
        content: null, // Will be loaded from separate files
      },
      {
        title: "Mobile Components & Styling",
        description: "Understanding React Native components, mobile-specific styling, and creating responsive interfaces",
        content: null,
      },
      {
        title: "State & Mobile Interactions",
        description: "Managing state in mobile apps, touch interactions, and user input handling",
        content: null,
      },
      {
        title: "Intro to Expo Router",
        description: "File-based routing, navigation components, and building multi-screen mobile apps",
        content: null,
      },
    ],
    challenge: {
      title: "React Native Mobile App Challenge",
      description: "Build a personal profile mobile app that demonstrates mastery of React Native components, styling, and mobile interactions",
      tasks: [
        "Step 1 (Basic): Create a ProfileCard component with your personal information",
        "Step 2 (Medium): Add interactive buttons and navigation between screens",
        "Step 3 (Hard): Implement a contact form with validation and mobile-friendly input",
        "Bonus: Add device features like camera access or location services",
        "Apply mobile-specific styling and touch interactions throughout",
      ],
      codeTemplate: `// Challenge: Three-Step Mobile App Challenge
// Start with Step 1 and progress through each level

// Step 1: Profile Card with Mobile Styling
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ProfileCard = ({ user }) => {
  const [showDetails, setShowDetails] = useState(false);
  
  // TODO: Implement mobile-specific features
  // - Profile image with fallback
  // - Touch interactions for expanding details
  // - Mobile-friendly styling with proper spacing
  // - Status indicators with conditional rendering
  // - Social media links as touchable buttons
  
  return (
    <View style={styles.container}>
      {/* Your implementation here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // Add your mobile styles here
  },
});

// Progress to Step 2: Navigation and Screens
// Then Step 3: Contact Form with Validation
// See full challenge details in the lesson content`,
    },
  },
  2: {
    title: "Advanced React Native",
    description: "Master advanced navigation patterns, optimized lists, professional fonts & images, and global UI components",
    sessions: [
      {
        title: "Expo Router Deep Dive",
        description: "Advanced navigation patterns, modal routes, complex parameter handling, and programmatic navigation",
        content: null,
      },
      {
        title: "List & Scroll Optimization",
        description: "FlatList optimization, ScrollView patterns, SectionList with headers, and pull-to-refresh functionality",
        content: null,
      },
      {
        title: "Fonts & Images Management",
        description: "Custom font loading, image optimization, loading states, and error handling for media assets",
        content: null,
      },
      {
        title: "Global UI Components",
        description: "Building reusable component library, theme management, responsive design, and React Context patterns",
        content: null,
      },
    ],
    challenge: {
      title: "Professional Mobile Portfolio App",
      description: "Build a professional portfolio app showcasing advanced navigation, optimized lists, custom fonts & images, and complete UI component system",
      tasks: [
        "🎯 Beginner Mode: Step-by-step guided implementation with code templates",
        "Step 1 (Core): Tab navigation with Projects, About, Skills screens",
        "Step 2 (Medium): Optimized FlatList with pull-to-refresh for project listings",
        "Step 3 (Advanced): Project detail modals with image galleries and custom fonts",
        "🚀 Extra Miles Mode: Advanced features and professional polish",
        "Bonus 1: Search & filtering system with category and status filters",
        "Bonus 2: Theme system with dark/light mode and AsyncStorage persistence",
        "Bonus 3: Favorites system with heart animations and local storage",
        "Bonus 4: Advanced animations, infinite scroll, and skeleton loading",
      ],
      codeTemplate: `// Day 2 Challenge: Professional Portfolio App
// Choose your mode: Beginner (guided) or Extra Miles (advanced)

// Beginner Mode: Core Implementation
import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

// TODO: Implement portfolio app features
// Core Features (Beginner Mode):
// - Tab navigation (Projects, About, Skills)
// - Optimized project list with FlatList
// - Project detail modals
// - Custom fonts and professional styling
// - Basic image handling with loading states

// Extra Miles Features (Advanced Mode):
// - Search and filtering system
// - Dark/light theme with persistence
// - Favorites with AsyncStorage
// - Advanced animations and transitions
// - Infinite scroll and skeleton loading
// - Performance optimizations

const PortfolioApp = () => {
  // Your implementation here
  // Start with navigation structure, then build up features
  
  return (
    <View style={{ flex: 1 }}>
      {/* Your portfolio app implementation */}
    </View>
  );
};

// See full challenge details with step-by-step instructions
// and code examples in the lesson content`,
    },
  },
  3: {
    title: "Data Management & APIs",
    description: "Master forms, API integration, data persistence, theming, and modern data fetching with React Query",
    sessions: [
      {
        title: "Form Handling",
        description: "Controlled components, form validation, and user input management with React Native",
        content: null,
      },
      {
        title: "Fetching API Data",
        description: "HTTP requests with fetch and axios, loading states, error handling, and data display",
        content: null,
      },
      {
        title: "AsyncStorage & Secure Store",
        description: "Local data persistence, user preferences, secure token storage, and data management",
        content: null,
      },
      {
        title: "App State & Theming",
        description: "React Context for global state, theming systems, and system appearance integration",
        content: null,
      },
      {
        title: "React Query Basics",
        description: "Modern data fetching with automatic caching, background updates, and optimized UX",
        content: null,
      },
    ],
    challenge: {
      title: "Complete Data-Driven Mobile App",
      description: "Build a full-featured data-driven app that demonstrates forms, API integration, persistence, theming, and React Query",
      tasks: [
        "Step 1: User registration form with validation and AsyncStorage",
        "Step 2: API integration for fetching and displaying user data",
        "Step 3: Dark/light theme system with user preferences",
        "Step 4: React Query implementation for optimized data fetching",
        "Bonus: Secure authentication flow with token storage",
        "Apply consistent theming and smooth user experience",
      ],
      codeTemplate: `// Day 3 Challenge: Data-Driven Mobile App
// Build a complete app with forms, APIs, storage, and theming

import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';

// TODO: Implement complete data-driven app
// Features to include:
// - User registration/login forms with validation
// - API integration for user data and content
// - Theme system with AsyncStorage persistence
// - React Query for optimized data fetching and caching
// - Secure storage for authentication tokens
// - Smooth UX with loading states and error handling

const queryClient = new QueryClient();

const DataDrivenApp = () => {
  // Your implementation here
  // Start with basic structure, then add each feature
  
  return (
    <QueryClientProvider client={queryClient}>
      <ScrollView style={{ flex: 1 }}>
        {/* Your app implementation */}
      </ScrollView>
    </QueryClientProvider>
  );
};

// Challenge includes step-by-step instructions and examples
// See full details in the lesson content`,
    },
  },
}
