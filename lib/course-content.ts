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
}
