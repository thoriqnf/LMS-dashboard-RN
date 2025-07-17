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
    title: "React Foundation",
    description: "Learn the fundamentals of React including components, JSX, and basic concepts",
    sessions: [
      {
        title: "React Introduction",
        description: "What is React, Virtual DOM, and setting up your first project",
        content: null, // Will be loaded from separate files
      },
      {
        title: "React Component Hierarchy",
        description: "Understanding component structure and organization",
        content: null,
      },
      {
        title: "State & Events",
        description: "Managing component state and handling user interactions",
        content: null,
      },
    ],
    challenge: {
      title: "React Conditional & List Rendering Challenge",
      description: "Build a dynamic user management dashboard that demonstrates mastery of conditional rendering and list rendering in React",
      tasks: [
        "Step 1 (Basic): Create a UserCard component with conditional status display",
        "Step 2 (Medium): Build a UserList with filtering, search, and sorting capabilities",
        "Step 3 (Hard): Implement a role-based dashboard with advanced features",
        "Bonus: Add Web Walled security features with clearance-based access control",
        "Apply performance optimizations and handle edge cases throughout",
      ],
      codeTemplate: `// Challenge: Three-Step Progressive Challenge
// Start with Step 1 and progress through each level

// Step 1: User Card with Conditional Rendering
import React, { useState } from 'react';

const UserCard = ({ user }) => {
  const [showDetails, setShowDetails] = useState(false);
  
  // TODO: Implement conditional rendering patterns
  // - Status badges based on user.status
  // - Premium indicators for user.isPremium
  // - Admin actions for user.role === 'admin'
  // - Default avatars when user.avatar is null
  // - Time-based greetings
  
  return (
    <div className="user-card">
      {/* Your implementation here */}
    </div>
  );
};

// Progress to Step 2: User List with Filtering
// Then Step 3: Role-Based Dashboard
// See full challenge details in the lesson content`,
    },
  },
}
