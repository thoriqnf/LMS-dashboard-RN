"use client";

import { CodeBlock } from "@/components/ui/code-block-new";
import { PasswordProtectedContent } from "@/components/ui/password-protected-content";

export function Day1ChallengeContent() {
  return (
    <>
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">
            Day 1 Challenge: My First Interactive Greeting Card
          </h1>

          <div className="bg-orange-50 dark:bg-orange-950 p-6 rounded-lg border border-orange-200 dark:border-orange-800 mb-8">
            <h3 className="text-orange-800 dark:text-orange-200 font-semibold mb-4 mt-0">
              🎯 Challenge Overview
            </h3>
            <p className="text-orange-700 dark:text-orange-300 mb-4">
              Build a <strong>Personal Greeting Card</strong> that gets more interactive 
              step by step. Perfect for React beginners! You&apos;ll start with a simple greeting 
              and gradually add user interaction, practicing exactly what you&apos;ve 
              learned in Day 1 sessions.
            </p>
            <div className="text-orange-700 dark:text-orange-300">
              <h4 className="font-semibold mb-2">Progressive Steps:</h4>
              <ul className="space-y-1 mb-0">
                <li><strong>Level 1 (Basic):</strong> Simple greeting with props and basic conditionals</li>
                <li><strong>Level 2 (Medium):</strong> Add button clicks and simple state</li>
                <li><strong>Level 3 (Advanced):</strong> User input and dynamic content</li>
              </ul>
            </div>
          </div>
        </div>

        <h2>Level 1: Simple Greeting Card</h2>

        <div className="my-6 p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-3 mt-0">
            🟢 Learning Goals:
          </h4>
          <ul className="text-green-700 dark:text-green-300 text-sm space-y-1 mb-0">
            <li>• Create a basic React component</li>
            <li>• Use props to personalize the greeting</li>
            <li>• Practice simple conditional rendering</li>
            <li>• Display different content based on props</li>
          </ul>
        </div>

        <h3>What You&apos;ll Build</h3>
        <div className="my-6 p-6 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg">
          <div className="max-w-sm mx-auto bg-white dark:bg-slate-800 rounded-lg shadow-md border border-slate-200 dark:border-slate-700 p-6">
            <div className="text-center space-y-4">
              {/* Simple emoji icon */}
              <div className="text-4xl">👋</div>
              
              {/* Greeting */}
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Hello, Sarah!</h2>
                <p className="text-slate-600 dark:text-slate-400">Welcome to React!</p>
              </div>
              
              {/* Time-based message */}
              <div className="pt-2 border-t border-slate-200 dark:border-slate-600">
                <p className="text-sm text-blue-600 dark:text-blue-400">
                  🌅 Good morning! Hope you have a great day!
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-sm text-slate-600 dark:text-slate-400 italic">
              ✨ A simple, personalized greeting card!
            </p>
          </div>
        </div>

        <h3>Requirements for Level 1</h3>
        <div className="my-6 p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-2 mb-0">
            <li>• Display a personalized greeting using the person's name</li>
            <li>• Show different emojis based on the time of day (morning/afternoon/evening)</li>
            <li>• Display a welcome message</li>
            <li>• Show an optional hobby message only if provided</li>
            <li>• Use basic styling to make it look nice</li>
          </ul>
        </div>

        <CodeBlock
          code={`// Level 1 Starter Code - Simple Greeting Card
import React from 'react';

function GreetingCard({ person }) {
  // TODO: Create a simple time check for different greetings
  const currentHour = new Date().getHours();
  
  return (
    <div style={{
      border: '2px solid #ddd',
      borderRadius: '12px',
      padding: '20px',
      maxWidth: '300px',
      textAlign: 'center',
      backgroundColor: '#f9f9f9'
    }}>
      {/* TODO: Show different emoji based on time */}
      <div style={{ fontSize: '48px', marginBottom: '15px' }}>
        {/* Show 🌅 for morning, ☀️ for afternoon, 🌙 for evening */}
      </div>
      
      {/* TODO: Personalized greeting */}
      <h2>Hello, {person.name}!</h2>
      
      {/* TODO: Welcome message */}
      <p>Welcome to React!</p>
      
      {/* TODO: Conditional hobby message */}
      {/* Only show if person.hobby exists */}
      
    </div>
  );
}

// Simple sample data
const samplePerson = {
  name: "Sarah",
  hobby: "painting" // Try with and without this!
};

export default function Level1Demo() {
  return (
    <div>
      <h2>Level 1: Simple Greeting Card</h2>
      <GreetingCard person={samplePerson} />
    </div>
  );
}`}
          language="jsx"
          filename="Level1-ProfileCard.jsx"
          title="Level 1 Challenge"
        />

        <h3>💡 Step-by-Step Tips</h3>
        <div className="my-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
          <ol className="text-blue-700 dark:text-blue-300 text-sm space-y-2 mb-0">
            <li><strong>Time Emoji:</strong> Use {`currentHour < 12 ? "🌅" : currentHour < 18 ? "☀️" : "🌙"`}</li>
            <li><strong>Personalized Greeting:</strong> Simply use {`{person.name}`} in your heading</li>
            <li><strong>Conditional Hobby:</strong> Use {`person.hobby && <p>I love {person.hobby}!</p>`}</li>
            <li><strong>Styling:</strong> The basic styles are already provided - just focus on the logic!</li>
          </ol>
        </div>

        <PasswordProtectedContent
          password="ilhamsipalingganteng"
          title="Level 1 Solution"
          description="Complete the Level 1 challenge first, then enter the password to see the solution!"
          buttonText="🔓 View Level 1 Solution"
          buttonVariant="outline"
        >
          <div className="mt-4">
            <CodeBlock
              code={`function GreetingCard({ person }) {
  // Get current hour for time-based greeting
  const currentHour = new Date().getHours();
  
  // Choose emoji based on time of day
  const getTimeEmoji = () => {
    if (currentHour < 12) return "🌅"; // Morning
    if (currentHour < 18) return "☀️"; // Afternoon
    return "🌙"; // Evening
  };
  
  return (
    <div style={{
      border: '2px solid #ddd',
      borderRadius: '12px',
      padding: '20px',
      maxWidth: '300px',
      textAlign: 'center',
      backgroundColor: '#f9f9f9'
    }}>
      {/* Time-based emoji */}
      <div style={{ fontSize: '48px', marginBottom: '15px' }}>
        {getTimeEmoji()}
      </div>
      
      {/* Personalized greeting */}
      <h2 style={{ margin: '10px 0', color: '#333' }}>
        Hello, {person.name}!
      </h2>
      
      {/* Welcome message */}
      <p style={{ color: '#666', margin: '15px 0' }}>
        Welcome to React!
      </p>
      
      {/* Conditional hobby message */}
      {person.hobby && (
        <p style={{ 
          color: '#0066cc', 
          fontStyle: 'italic',
          margin: '10px 0'
        }}>
          I love {person.hobby}! 🎨
        </p>
      )}
    </div>
  );
}`}
              language="jsx"
              filename="Level1-Solution.jsx"
              title="Level 1 Complete Solution"
            />
          </div>
        </PasswordProtectedContent>

        <h2>Level 2: Add Simple Interactivity</h2>

        <div className="my-6 p-4 bg-orange-50 dark:bg-orange-950 rounded-lg border border-orange-200 dark:border-orange-800">
          <h4 className="text-orange-800 dark:text-orange-200 font-semibold mb-3 mt-0">
            🟡 Learning Goals:
          </h4>
          <ul className="text-orange-700 dark:text-orange-300 text-sm space-y-1 mb-0">
            <li>• Add your first useState hook to the component</li>
            <li>• Handle basic button click events</li>
            <li>• Change the greeting message when clicked</li>
            <li>• Practice simple state updates</li>
          </ul>
        </div>

        <h3>New Features to Add</h3>
        <div className="my-6 p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-2 mb-0">
            <li>• A button that changes the greeting message when clicked</li>
            <li>• Show different messages each time the button is clicked</li>
            <li>• Add a simple click counter</li>
            <li>• Change button text based on current state</li>
          </ul>
        </div>

        <CodeBlock
          code={`// Level 2: Add useState for simple interactivity
import React, { useState } from 'react';

function InteractiveGreetingCard({ person }) {
  // TODO: Add state for the current message
  const [messageIndex, setMessageIndex] = useState(0);
  
  // TODO: Add state for click count
  const [clickCount, setClickCount] = useState(0);
  
  // Different messages to cycle through
  const messages = [
    "Welcome to React!",
    "You're doing great!",
    "Keep learning!",
    "React is awesome!",
    "You're a star! ⭐"
  ];
  
  // TODO: Create click handler function
  const handleButtonClick = () => {
    // Update click count
    // Move to next message (cycle back to start if at end)
  };
  
  // Get current hour for time-based emoji
  const currentHour = new Date().getHours();
  const getTimeEmoji = () => {
    if (currentHour < 12) return "🌅";
    if (currentHour < 18) return "☀️";
    return "🌙";
  };
  
  return (
    <div style={{
      border: '2px solid #ddd',
      borderRadius: '12px',
      padding: '20px',
      maxWidth: '300px',
      textAlign: 'center',
      backgroundColor: '#f9f9f9'
    }}>
      {/* Time-based emoji */}
      <div style={{ fontSize: '48px', marginBottom: '15px' }}>
        {getTimeEmoji()}
      </div>
      
      {/* Personalized greeting */}
      <h2 style={{ margin: '10px 0', color: '#333' }}>
        Hello, {person.name}!
      </h2>
      
      {/* Dynamic message based on state */}
      <p style={{ color: '#666', margin: '15px 0' }}>
        {messages[messageIndex]}
      </p>
      
      {/* Conditional hobby message */}
      {person.hobby && (
        <p style={{ color: '#0066cc', fontStyle: 'italic' }}>
          I love {person.hobby}! 🎨
        </p>
      )}
      
      {/* TODO: Add interactive button */}
      <button 
        onClick={handleButtonClick}
        style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginTop: '15px'
        }}
      >
        {/* TODO: Change button text based on clicks */}
        Change Message
      </button>
      
      {/* TODO: Show click count */}
      <p style={{ fontSize: '12px', color: '#888', marginTop: '10px' }}>
        Clicked {clickCount} times
      </p>
    </div>
  );
}

// Same simple data as Level 1
const samplePerson = {
  name: "Sarah",
  hobby: "painting"
};

export default function Level2Demo() {
  return (
    <div>
      <h2>Level 2: Interactive Greeting Card</h2>
      <InteractiveGreetingCard person={samplePerson} />
    </div>
  );
}`}
          language="jsx"
          filename="Level2-InteractiveCard.jsx"
          title="Level 2 Challenge"
        />

        <h3>💡 Implementation Hints</h3>
        <div className="my-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
          <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-2 mb-0">
            <li><strong>Click Handler:</strong> Use setClickCount(clickCount + 1) to update count</li>
            <li><strong>Message Cycling:</strong> Use setMessageIndex((messageIndex + 1) % messages.length)</li>
            <li><strong>Button Text:</strong> Change button text based on clickCount or messageIndex</li>
            <li><strong>State Updates:</strong> Remember to update both states in the same function!</li>
          </ul>
        </div>

        <PasswordProtectedContent
          password="ilhamsipalingganteng"
          title="Level 2 Solution"
          description="Complete the Level 2 challenge first, then enter the password to see the solution!"
          buttonText="🔓 View Level 2 Solution"
          buttonVariant="outline"
        >
          <div className="mt-4">
            <CodeBlock
              code={`function InteractiveGreetingCard({ person }) {
  // State for tracking current message and click count
  const [messageIndex, setMessageIndex] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  
  // Array of different messages to cycle through
  const messages = [
    "Welcome to React!",
    "You're doing great!",
    "Keep learning!",
    "React is awesome!",
    "You're a star! ⭐"
  ];
  
  // Click handler that updates both states
  const handleButtonClick = () => {
    setClickCount(clickCount + 1);
    setMessageIndex((messageIndex + 1) % messages.length);
  };
  
  // Time-based emoji logic
  const currentHour = new Date().getHours();
  const getTimeEmoji = () => {
    if (currentHour < 12) return "🌅";
    if (currentHour < 18) return "☀️";
    return "🌙";
  };
  
  return (
    <div style={{
      border: '2px solid #ddd',
      borderRadius: '12px',
      padding: '20px',
      maxWidth: '300px',
      textAlign: 'center',
      backgroundColor: '#f9f9f9'
    }}>
      {/* Time-based emoji */}
      <div style={{ fontSize: '48px', marginBottom: '15px' }}>
        {getTimeEmoji()}
      </div>
      
      {/* Personalized greeting */}
      <h2 style={{ margin: '10px 0', color: '#333' }}>
        Hello, {person.name}!
      </h2>
      
      {/* Dynamic message that changes with each click */}
      <p style={{ color: '#666', margin: '15px 0' }}>
        {messages[messageIndex]}
      </p>
      
      {/* Conditional hobby message */}
      {person.hobby && (
        <p style={{ color: '#0066cc', fontStyle: 'italic' }}>
          I love {person.hobby}! 🎨
        </p>
      )}
      
      {/* Interactive button with dynamic text */}
      <button 
        onClick={handleButtonClick}
        style={{
          padding: '10px 20px',
          backgroundColor: clickCount > 3 ? '#28a745' : '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginTop: '15px'
        }}
      >
        {clickCount === 0 ? 'Click me!' : \`Message \${messageIndex + 1}/\${messages.length}\`}
      </button>
      
      {/* Click counter */}
      <p style={{ fontSize: '12px', color: '#888', marginTop: '10px' }}>
        Clicked {clickCount} times
      </p>
    </div>
  );
}`}
              language="jsx"
              filename="Level2-Solution.jsx"
              title="Level 2 Complete Solution"
            />
          </div>
        </PasswordProtectedContent>

        <h2>Level 3: Add User Input & Dynamic Content</h2>

        <div className="my-6 p-4 bg-purple-50 dark:bg-purple-950 rounded-lg border border-purple-200 dark:border-purple-800">
          <h4 className="text-purple-800 dark:text-purple-200 font-semibold mb-3 mt-0">
            🟣 Learning Goals:
          </h4>
          <ul className="text-purple-700 dark:text-purple-300 text-sm space-y-1 mb-0">
            <li>• Add text input handling with onChange</li>
            <li>• Manage multiple pieces of state</li>
            <li>• Create dynamic, personalized content</li>
            <li>• Practice form input and state updates</li>
          </ul>
        </div>

        <h3>New Features to Add</h3>
        <div className="my-6 p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-2 mb-0">
            <li>• Input field to let users change their name</li>
            <li>• Input field to let users add/change their hobby</li>
            <li>• Show different background colors based on user input</li>
            <li>• Display a custom message when they update their info</li>
            <li>• Keep all the features from Level 2</li>
          </ul>
        </div>

        <CodeBlock
          code={`// Level 3: Add user input and dynamic personalization
import React, { useState } from 'react';

function PersonalizableGreetingCard() {
  // TODO: Add state for the editable name 
  const [userName, setUserName] = useState("Sarah");
  
  // TODO: Add state for the editable hobby
  const [userHobby, setUserHobby] = useState("painting");
  
  // Keep the interactive message features from Level 2
  const [messageIndex, setMessageIndex] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  
  const messages = [
    "Welcome to React!",
    "You're doing great!",
    "Keep learning!",
    "React is awesome!",
    "You're a star! ⭐"
  ];
  
  const handleButtonClick = () => {
    setClickCount(clickCount + 1);
    setMessageIndex((messageIndex + 1) % messages.length);
  };
  
  // TODO: Add handler for name input changes
  const handleNameChange = (event) => {
    // Update the userName state with event.target.value
  };
  
  // TODO: Add handler for hobby input changes  
  const handleHobbyChange = (event) => {
    // Update the userHobby state with event.target.value
  };
  
  // Get time-based emoji
  const currentHour = new Date().getHours();
  const getTimeEmoji = () => {
    if (currentHour < 12) return "🌅";
    if (currentHour < 18) return "☀️";
    return "🌙";
  };
  
  // TODO: Choose background color based on name length or hobby
  const getBackgroundColor = () => {
    // Try different colors based on userName.length or userHobby
    return '#f9f9f9'; // Default for now
  };
  
  return (
    <div style={{
      border: '2px solid #ddd',
      borderRadius: '12px',
      padding: '20px',
      maxWidth: '350px',
      textAlign: 'center',
      backgroundColor: getBackgroundColor()
    }}>
      {/* Time-based emoji */}
      <div style={{ fontSize: '48px', marginBottom: '15px' }}>
        {getTimeEmoji()}
      </div>
      
      {/* Editable name input */}
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Your Name:</label>
        <input 
          type="text"
          value={userName}
          onChange={handleNameChange}
          style={{
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ddd',
            textAlign: 'center'
          }}
        />
      </div>
      
      {/* Personalized greeting */}
      <h2 style={{ margin: '10px 0', color: '#333' }}>
        Hello, {userName}!
      </h2>
      
      {/* Dynamic message */}
      <p style={{ color: '#666', margin: '15px 0' }}>
        {messages[messageIndex]}
      </p>
      
      {/* Editable hobby input */}
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Your Hobby:</label>
        <input 
          type="text"
          value={userHobby}
          onChange={handleHobbyChange}
          style={{
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ddd',
            textAlign: 'center'
          }}
        />
      </div>
      
      {/* Hobby display */}
      {userHobby && (
        <p style={{ color: '#0066cc', fontStyle: 'italic' }}>
          I love {userHobby}! 🎨
        </p>
      )}
      
      {/* Interactive button from Level 2 */}
      <button 
        onClick={handleButtonClick}
        style={{
          padding: '10px 20px',
          backgroundColor: clickCount > 3 ? '#28a745' : '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginTop: '15px'
        }}
      >
        {clickCount === 0 ? 'Click me!' : \`Message \${messageIndex + 1}/\${messages.length}\`}
      </button>
      
      {/* Click counter */}
      <p style={{ fontSize: '12px', color: '#888', marginTop: '10px' }}>
        Clicked {clickCount} times
      </p>
      
      {/* TODO: Add a special message when user customizes their info */}
    </div>
  );
}

export default function Level3Demo() {
  return (
    <div>
      <h2>Level 3: Personalizable Greeting Card</h2>
      <PersonalizableGreetingCard />
    </div>
  );
}`}
          language="jsx"
          filename="Level3-PersonalizableCard.jsx"
          title="Level 3 Challenge"
        />

        <PasswordProtectedContent
          password="ilhamsipalingganteng"
          title="Level 3 Advanced Solution"
          description="Complete the Level 3 challenge first, then enter the password to see the advanced solution!"
          buttonText="🔓 View Level 3 Solution"
          buttonVariant="outline"
        >
          <div className="mt-4">
            <CodeBlock
              code={`function PersonalizableGreetingCard() {
  // State for editable user information
  const [userName, setUserName] = useState("Sarah");
  const [userHobby, setUserHobby] = useState("painting");
  
  // Keep interactive message features from Level 2
  const [messageIndex, setMessageIndex] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  
  const messages = [
    "Welcome to React!",
    "You're doing great!",
    "Keep learning!",
    "React is awesome!",
    "You're a star! ⭐"
  ];
  
  const handleButtonClick = () => {
    setClickCount(clickCount + 1);
    setMessageIndex((messageIndex + 1) % messages.length);
  };
  
  // Input change handlers
  const handleNameChange = (event) => {
    setUserName(event.target.value);
  };
  
  const handleHobbyChange = (event) => {
    setUserHobby(event.target.value);
  };
  
  // Time-based emoji
  const currentHour = new Date().getHours();
  const getTimeEmoji = () => {
    if (currentHour < 12) return "🌅";
    if (currentHour < 18) return "☀️";
    return "🌙";
  };
  
  // Dynamic background color based on user input
  const getBackgroundColor = () => {
    const colors = ['#f0f8ff', '#f0fff0', '#fff8dc', '#f5f5dc', '#ffe4e1'];
    const colorIndex = userName.length % colors.length;
    return colors[colorIndex];
  };
  
  // Check if user has customized their info
  const hasCustomInfo = userName !== "Sarah" || userHobby !== "painting";
  
  return (
    <div style={{
      border: '2px solid #ddd',
      borderRadius: '12px',
      padding: '20px',
      maxWidth: '350px',
      textAlign: 'center',
      backgroundColor: getBackgroundColor(),
      transition: 'background-color 0.3s ease'
    }}>
      {/* Time-based emoji */}
      <div style={{ fontSize: '48px', marginBottom: '15px' }}>
        {getTimeEmoji()}
      </div>
      
      {/* Editable name input */}
      <div style={{ marginBottom: '15px' }}>
        <label style={{ 
          display: 'block', 
          marginBottom: '5px', 
          fontSize: '14px',
          fontWeight: 'bold'
        }}>
          Your Name:
        </label>
        <input 
          type="text"
          value={userName}
          onChange={handleNameChange}
          style={{
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ddd',
            textAlign: 'center',
            width: '200px'
          }}
        />
      </div>
      
      {/* Personalized greeting */}
      <h2 style={{ margin: '10px 0', color: '#333' }}>
        Hello, {userName}!
      </h2>
      
      {/* Dynamic message */}
      <p style={{ color: '#666', margin: '15px 0' }}>
        {messages[messageIndex]}
      </p>
      
      {/* Editable hobby input */}
      <div style={{ marginBottom: '15px' }}>
        <label style={{ 
          display: 'block', 
          marginBottom: '5px', 
          fontSize: '14px',
          fontWeight: 'bold'
        }}>
          Your Hobby:
        </label>
        <input 
          type="text"
          value={userHobby}
          onChange={handleHobbyChange}
          style={{
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ddd',
            textAlign: 'center',
            width: '200px'
          }}
        />
      </div>
      
      {/* Hobby display */}
      {userHobby && (
        <p style={{ color: '#0066cc', fontStyle: 'italic', margin: '10px 0' }}>
          I love {userHobby}! 🎨
        </p>
      )}
      
      {/* Special message for customized info */}
      {hasCustomInfo && (
        <div style={{
          backgroundColor: '#e8f5e8',
          padding: '10px',
          borderRadius: '8px',
          margin: '15px 0',
          border: '1px solid #4caf50'
        }}>
          <p style={{ color: '#2e7d32', margin: '0', fontSize: '14px' }}>
            🎉 Thanks for personalizing your card, {userName}!
          </p>
        </div>
      )}
      
      {/* Interactive button from Level 2 */}
      <button 
        onClick={handleButtonClick}
        style={{
          padding: '10px 20px',
          backgroundColor: clickCount > 3 ? '#28a745' : '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginTop: '15px'
        }}
      >
        {clickCount === 0 ? 'Click me!' : \`Message \${messageIndex + 1}/\${messages.length}\`}
      </button>
      
      {/* Click counter */}
      <p style={{ fontSize: '12px', color: '#888', marginTop: '10px' }}>
        Clicked {clickCount} times
      </p>
      
      {/* Fun stats about their customization */}
      <div style={{ marginTop: '15px', fontSize: '12px', color: '#666' }}>
        <p>Your name has {userName.length} letters!</p>
        {userHobby && <p>Your hobby starts with "{userHobby.charAt(0).toUpperCase()}"</p>}
      </div>
    </div>
  );
}`}
              language="jsx"
              filename="Level3-AdvancedCard.jsx"
              title="Level 3 Complete Implementation"
            />
          </div>
        </PasswordProtectedContent>

        <h2>🎉 Congratulations!</h2>

        <h3>What You&apos;ve Accomplished</h3>
        <div className="my-6 p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
          <ul className="text-green-700 dark:text-green-300 text-sm space-y-2 mb-0">
            <li><strong>Component Creation:</strong> Built your first React components from scratch</li>
            <li><strong>Props Mastery:</strong> Learned to pass and use data between components</li>
            <li><strong>Conditional Rendering:</strong> Showed different content based on conditions</li>
            <li><strong>State with useState:</strong> Made components interactive and dynamic</li>
            <li><strong>Event Handling:</strong> Responded to button clicks and user input</li>
            <li><strong>Form Inputs:</strong> Handled user text input with onChange</li>
            <li><strong>Progressive Learning:</strong> Built complexity step by step, just like real developers</li>
          </ul>
        </div>

        <h3>Challenge Variations</h3>
        <div className="my-6 p-4 bg-purple-50 dark:bg-purple-950 rounded-lg border border-purple-200 dark:border-purple-800">
          <h4 className="text-purple-800 dark:text-purple-200 font-semibold mb-2 mt-0">
            🎯 Try These Extensions:
          </h4>
          <ul className="text-purple-700 dark:text-purple-300 text-sm space-y-1 mb-0">
            <li>• Add a favorite color picker that changes the card theme</li>
            <li>• Create multiple greeting cards for different people</li>
            <li>• Add an age input and show different messages based on age</li>
            <li>• Include a mood selector (happy, excited, calm, etc.)</li>
            <li>• Add fun facts that appear when users click a "Surprise Me!" button</li>
            <li>• Create a simple compliment generator with random nice messages</li>
          </ul>
        </div>

        <h3>Key Learning Takeaways</h3>
        <div className="my-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
          <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-2 mb-0">
            <li><strong>Start Simple:</strong> Level 1 built your confidence with basic props and conditions</li>
            <li><strong>Add Interaction Gradually:</strong> Level 2 introduced state and events step by step</li>
            <li><strong>User Input Mastery:</strong> Level 3 showed how to handle and respond to user input</li>
            <li><strong>Real React Fundamentals:</strong> You learned the core concepts every React developer uses</li>
            <li><strong>Progressive Complexity:</strong> Built features incrementally, just like real development</li>
          </ul>
        </div>

        <p>
          <strong>Fantastic work!</strong> You&apos;ve just built an interactive React greeting card that demonstrates 
          all the fundamental concepts from Day 1. This progressive approach - starting with basic props, 
          adding interactivity, then user input - is exactly how real applications are built. You&apos;re ready for Day 2! 🚀
        </p>
      </div>
    </>
  );
}
