"use client";

import { CodeBlock } from "@/components/ui/code-block-new";

export function Day1Session3Content() {
  return (
    <>
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">
            React Native State, Events & Input - Session 3
          </h1>

          <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg border border-blue-200 dark:border-blue-800 mb-8">
            <h3 className="text-blue-800 dark:text-blue-200 font-semibold mb-4 mt-0">
              📱 Session Overview
            </h3>
            <ul className="text-blue-700 dark:text-blue-300 space-y-2 mb-0">
              <li>
                <strong>useState in React Native</strong> - Managing mobile app state
              </li>
              <li>
                <strong>onPress vs onClick</strong> - Mobile touch events and interactions
              </li>
              <li>
                <strong>TouchableOpacity</strong> - The primary mobile button component
              </li>
              <li>
                <strong>TextInput Controls</strong> - Handling user input in mobile apps
              </li>
              <li>
                <strong>Pressable Component</strong> - Advanced touch handling and feedback
              </li>
              <li>
                <strong>Mobile Form Patterns</strong> - Building interactive mobile forms step-by-step
              </li>
            </ul>
          </div>
        </div>

        <h2>1. State Management in React Native</h2>

        <h3>Mobile Apps Need Memory Too!</h3>
        <p>
          Just like the mobile apps you use every day, React Native apps need to remember things. 
          Think about your favorite social media app - it remembers if you liked a post, what you 
          typed in a comment, and whether you're logged in.
        </p>

        <div className="my-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
          <h4 className="text-blue-800 dark:text-blue-200 font-semibold mb-2 mt-0">
            📱 Mobile App State Examples:
          </h4>
          <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1 mb-0">
            <li><strong>Instagram</strong> - Remembers which posts you've liked</li>
            <li><strong>WhatsApp</strong> - Remembers your message drafts</li>
            <li><strong>Calculator</strong> - Remembers the current number being displayed</li>
            <li><strong>Shopping Apps</strong> - Remember items in your cart</li>
            <li><strong>Music Apps</strong> - Remember if a song is playing or paused</li>
          </ul>
        </div>

        <h3>useState: The Same, But for Mobile</h3>
        <p>
          The useState hook works exactly the same in React Native as it does in regular React. 
          The difference is that we use React Native components like View, Text, and TouchableOpacity 
          instead of HTML elements.
        </p>

        <div className="grid md:grid-cols-2 gap-4 my-6">
          <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border">
            <h4 className="font-semibold mb-2 mt-0">🌐 React Web:</h4>
            <div className="text-sm font-mono">
              <div>&lt;div&gt;</div>
              <div>&nbsp;&nbsp;&lt;h2&gt;{`{count}`}&lt;/h2&gt;</div>
              <div>&nbsp;&nbsp;&lt;button onClick={`{...}`}&gt;</div>
              <div>&lt;/div&gt;</div>
            </div>
          </div>
          <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
            <h4 className="text-blue-800 dark:text-blue-200 font-semibold mb-2 mt-0">📱 React Native:</h4>
            <div className="text-blue-700 dark:text-blue-300 text-sm font-mono">
              <div>&lt;View&gt;</div>
              <div>&nbsp;&nbsp;&lt;Text&gt;{`{count}`}&lt;/Text&gt;</div>
              <div>&nbsp;&nbsp;&lt;TouchableOpacity onPress={`{...}`}&gt;</div>
              <div>&lt;/View&gt;</div>
            </div>
          </div>
        </div>

        <h2>2. Mobile Touch Events: onPress vs onClick</h2>

        <h3>Touch is Different from Clicking</h3>
        <p>
          On mobile devices, users touch the screen instead of clicking with a mouse. React Native 
          uses <code>onPress</code> instead of <code>onClick</code> to handle these touch interactions. 
          This gives us better performance and mobile-specific features like touch feedback.
        </p>

        <div className="my-6 p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <h4 className="text-yellow-800 dark:text-yellow-200 font-semibold mb-2 mt-0">
            🤔 Why onPress instead of onClick?
          </h4>
          <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1 mb-0">
            <li><strong>Better Performance</strong> - Optimized for touch screens</li>
            <li><strong>Touch Feedback</strong> - Visual response when touched</li>
            <li><strong>Accessibility</strong> - Works better with screen readers</li>
            <li><strong>Mobile Gestures</strong> - Can handle long press, double tap, etc.</li>
          </ul>
        </div>

        <h2>3. Progressive Example: Building a Mobile Counter App</h2>

        <h3>Example 1: Simple Mobile Counter (Foundation)</h3>
        <p>
          Let's start with a basic counter using React Native components. This will be our foundation 
          that we'll build upon in each example.
        </p>

        <CodeBlock
          code={`// 🏗️ Example 1: Simple Mobile Counter Foundation
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

function MobileCounter() {
  // Create state to remember the current count
  const [count, setCount] = useState(0);
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mobile Counter</Text>
      
      {/* Display the current count */}
      <Text style={styles.countText}>{count}</Text>
      
      {/* Mobile buttons using TouchableOpacity */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => setCount(count - 1)}
        >
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => setCount(count + 1)}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  countText: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#007AFF',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default MobileCounter;`}
          language="jsx"
          filename="MobileCounter.jsx"
          title="Example 1: Simple Mobile Counter"
        />

        <div className="my-6 p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-2 mt-0">
            🔑 Key React Native Concepts:
          </h4>
          <ul className="text-green-700 dark:text-green-300 text-sm space-y-1 mb-0">
            <li><strong>TouchableOpacity</strong> - Mobile button with touch feedback</li>
            <li><strong>onPress</strong> - Mobile touch event handler</li>
            <li><strong>StyleSheet.create()</strong> - Optimized styling for mobile</li>
            <li><strong>flexDirection: 'row'</strong> - Horizontal layout for buttons</li>
          </ul>
        </div>

        <h3>Example 2: Enhanced Counter with Step Input (Building on Example 1)</h3>
        <p>
          Now let's take our counter from Example 1 and make it more flexible. We'll add a TextInput 
          so users can control how much the counter increases or decreases with each press.
        </p>

        <CodeBlock
          code={`// 🔧 Example 2: Enhanced Counter with TextInput (builds on Example 1)
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

function EnhancedCounter() {
  // Keep the same count state from Example 1
  const [count, setCount] = useState(0);
  
  // NEW: Add state for the step amount
  const [stepSize, setStepSize] = useState('1');
  
  // Helper function to get step as number
  const getStep = () => {
    const step = parseInt(stepSize) || 1;
    return step;
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enhanced Counter</Text>
      
      {/* Same count display from Example 1 */}
      <Text style={styles.countText}>{count}</Text>
      
      {/* NEW: TextInput for step size */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Step Size:</Text>
        <TextInput
          style={styles.input}
          value={stepSize}
          onChangeText={setStepSize}
          keyboardType="numeric"
          placeholder="1"
        />
      </View>
      
      {/* Enhanced buttons from Example 1 - now use dynamic step */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => setCount(count - getStep())}
        >
          <Text style={styles.buttonText}>-{getStep()}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => setCount(count + getStep())}
        >
          <Text style={styles.buttonText}>+{getStep()}</Text>
        </TouchableOpacity>
      </View>
      
      {/* NEW: Reset button */}
      <TouchableOpacity 
        style={[styles.button, styles.resetButton]} 
        onPress={() => setCount(0)}
      >
        <Text style={styles.buttonText}>Reset</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  countText: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#007AFF',
  },
  // NEW: Input styling
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    marginRight: 10,
    fontWeight: '500',
  },
  input: {
    borderWidth: 2,
    borderColor: '#007AFF',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    width: 80,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
  },
  resetButton: {
    backgroundColor: '#FF6B6B',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default EnhancedCounter;`}
          language="jsx"
          filename="EnhancedCounter.jsx"
          title="Example 2: Enhanced Counter with TextInput"
        />

        <div className="my-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
          <h4 className="text-blue-800 dark:text-blue-200 font-semibold mb-2 mt-0">
            🆕 What's New in Example 2:
          </h4>
          <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1 mb-0">
            <li><strong>TextInput</strong> - Mobile text input component</li>
            <li><strong>onChangeText</strong> - Handle text changes (not onChange)</li>
            <li><strong>keyboardType="numeric"</strong> - Show number keyboard on mobile</li>
            <li><strong>Controlled Input</strong> - TextInput value controlled by state</li>
            <li><strong>Dynamic Button Labels</strong> - Show current step size on buttons</li>
          </ul>
        </div>

        <h3>Example 3: User Profile Builder (Evolving Example 2)</h3>
        <p>
          Let's transform our counter from Example 2 into something more practical - a user profile builder. 
          We'll keep the counter concept for age selection and add name input functionality.
        </p>

        <CodeBlock
          code={`// 👤 Example 3: User Profile Builder (evolves Example 2)
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

function UserProfileBuilder() {
  // NEW: User profile data
  const [name, setName] = useState('');
  const [age, setAge] = useState(18); // Use counter logic for age
  const [email, setEmail] = useState('');
  
  // Keep some logic from Example 2 - but simplified for age
  const changeAge = (direction) => {
    if (direction === 'up' && age < 100) {
      setAge(age + 1);
    } else if (direction === 'down' && age > 1) {
      setAge(age - 1);
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Your Profile</Text>
      
      {/* NEW: Name input (evolved from step input in Example 2) */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={styles.textInput}
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
          autoCapitalize="words"
        />
      </View>
      
      {/* NEW: Email input */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.textInput}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      
      {/* Age selector (evolved from counter in Examples 1-2) */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Age:</Text>
        <View style={styles.ageContainer}>
          <TouchableOpacity 
            style={styles.ageButton} 
            onPress={() => changeAge('down')}
          >
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          
          <Text style={styles.ageText}>{age}</Text>
          
          <TouchableOpacity 
            style={styles.ageButton} 
            onPress={() => changeAge('up')}
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {/* NEW: Profile preview */}
      {name && (
        <View style={styles.profileCard}>
          <Text style={styles.cardTitle}>Profile Preview:</Text>
          <Text style={styles.profileText}>Name: {name}</Text>
          <Text style={styles.profileText}>Age: {age} years old</Text>
          <Text style={styles.profileText}>Email: {email || 'Not provided'}</Text>
        </View>
      )}
      
      {/* NEW: Save button (evolved from reset in Example 2) */}
      <TouchableOpacity 
        style={[styles.button, name ? styles.activeButton : styles.disabledButton]} 
        onPress={() => console.log('Profile saved!', { name, age, email })}
        disabled={!name}
      >
        <Text style={styles.buttonText}>
          {name ? 'Save Profile' : 'Enter Name First'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  inputGroup: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  textInput: {
    borderWidth: 2,
    borderColor: '#007AFF',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: 'white',
  },
  ageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ageButton: {
    backgroundColor: '#007AFF',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ageText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 30,
    color: '#007AFF',
  },
  profileCard: {
    backgroundColor: '#F0F8FF',
    padding: 20,
    borderRadius: 15,
    marginVertical: 20,
    width: '100%',
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#007AFF',
  },
  profileText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  button: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  activeButton: {
    backgroundColor: '#28A745',
  },
  disabledButton: {
    backgroundColor: '#CCC',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UserProfileBuilder;`}
          language="jsx"
          filename="UserProfileBuilder.jsx"
          title="Example 3: User Profile Builder"
        />

        <div className="my-6 p-4 bg-purple-50 dark:bg-purple-950 rounded-lg border border-purple-200 dark:border-purple-800">
          <h4 className="text-purple-800 dark:text-purple-200 font-semibold mb-2 mt-0">
            🔄 Evolution from Example 2:
          </h4>
          <ul className="text-purple-700 dark:text-purple-300 text-sm space-y-1 mb-0">
            <li><strong>TextInput Evolution</strong> - From step size to name/email inputs</li>
            <li><strong>Counter Evolution</strong> - From general counter to age selector</li>
            <li><strong>Multiple State</strong> - Managing several related pieces of data</li>
            <li><strong>Conditional Rendering</strong> - Show profile preview when name exists</li>
            <li><strong>Button States</strong> - Disabled/enabled based on form completion</li>
          </ul>
        </div>

        <h3>Example 4: Complete Contact Form (Building on Example 3)</h3>
        <p>
          Now let's take our profile builder from Example 3 and transform it into a complete 
          contact form with advanced features like message input, form validation, and success feedback.
        </p>

        <CodeBlock
          code={`// 📞 Example 4: Complete Contact Form (builds on Example 3)
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import { Pressable } from 'react-native';

function ContactForm() {
  // Keep the user data concept from Example 3
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  
  // NEW: Contact-specific fields
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  
  // NEW: Form state management
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  
  // NEW: Form validation
  const validateForm = () => {
    const newErrors = {};
    
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!email.includes('@')) newErrors.email = 'Invalid email format';
    if (!subject.trim()) newErrors.subject = 'Subject is required';
    if (!message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // NEW: Form submission (evolved from save profile in Example 3)
  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      Alert.alert('Success!', 'Your message has been sent.');
      
      // Clear form
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      setErrors({});
    }, 2000);
  };
  
  // Helper to get input style with error state
  const getInputStyle = (fieldName) => [
    styles.textInput,
    errors[fieldName] && styles.errorInput
  ];
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contact Us</Text>
      
      {/* Name input (from Example 3, with validation) */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Name *</Text>
        <TextInput
          style={getInputStyle('name')}
          value={name}
          onChangeText={(text) => {
            setName(text);
            if (errors.name) setErrors({...errors, name: null});
          }}
          placeholder="Your full name"
          autoCapitalize="words"
        />
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
      </View>
      
      {/* Email input (from Example 3, with validation) */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email *</Text>
        <TextInput
          style={getInputStyle('email')}
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            if (errors.email) setErrors({...errors, email: null});
          }}
          placeholder="your.email@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
      </View>
      
      {/* NEW: Subject input */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Subject *</Text>
        <TextInput
          style={getInputStyle('subject')}
          value={subject}
          onChangeText={(text) => {
            setSubject(text);
            if (errors.subject) setErrors({...errors, subject: null});
          }}
          placeholder="What is this about?"
          autoCapitalize="sentences"
        />
        {errors.subject && <Text style={styles.errorText}>{errors.subject}</Text>}
      </View>
      
      {/* NEW: Message input (multiline) */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Message *</Text>
        <TextInput
          style={[getInputStyle('message'), styles.messageInput]}
          value={message}
          onChangeText={(text) => {
            setMessage(text);
            if (errors.message) setErrors({...errors, message: null});
          }}
          placeholder="Tell us more about your inquiry..."
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />
        {errors.message && <Text style={styles.errorText}>{errors.message}</Text>}
      </View>
      
      {/* NEW: Advanced submit button using Pressable */}
      <Pressable
        style={({ pressed }) => [
          styles.submitButton,
          pressed && styles.submitButtonPressed,
          isSubmitting && styles.submitButtonDisabled
        ]}
        onPress={handleSubmit}
        disabled={isSubmitting}
      >
        <Text style={styles.submitButtonText}>
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </Text>
      </Pressable>
      
      {/* NEW: Clear form button (evolved from reset concept) */}
      <TouchableOpacity 
        style={styles.clearButton} 
        onPress={() => {
          setName('');
          setEmail('');
          setSubject('');
          setMessage('');
          setErrors({});
        }}
      >
        <Text style={styles.clearButtonText}>Clear Form</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F8F9FA',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  textInput: {
    borderWidth: 2,
    borderColor: '#E1E5E9',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: 'white',
  },
  messageInput: {
    height: 100,
  },
  errorInput: {
    borderColor: '#FF6B6B',
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 14,
    marginTop: 5,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonPressed: {
    backgroundColor: '#0056CC',
    transform: [{ scale: 0.98 }],
  },
  submitButtonDisabled: {
    backgroundColor: '#CCC',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  clearButton: {
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  clearButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default ContactForm;`}
          language="jsx"
          filename="ContactForm.jsx"
          title="Example 4: Complete Contact Form"
        />

        <div className="my-6 p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-2 mt-0">
            🚀 Advanced Features in Example 4:
          </h4>
          <ul className="text-green-700 dark:text-green-300 text-sm space-y-1 mb-0">
            <li><strong>Pressable Component</strong> - Advanced touch handling with press states</li>
            <li><strong>Form Validation</strong> - Real-time error checking and display</li>
            <li><strong>Multiline TextInput</strong> - For longer message input</li>
            <li><strong>Loading States</strong> - Button shows "Sending..." during submission</li>
            <li><strong>Error Styling</strong> - Visual feedback for validation errors</li>
            <li><strong>Form Reset</strong> - Clear all fields functionality</li>
          </ul>
        </div>

        <h2>4. Key React Native Concepts Covered</h2>

        <h3>TouchableOpacity vs Pressable</h3>
        <p>
          Throughout our examples, we used two different types of touchable components. 
          Let's understand when to use each one.
        </p>

        <div className="grid md:grid-cols-2 gap-4 my-6">
          <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
            <h4 className="text-blue-800 dark:text-blue-200 font-semibold mb-2 mt-0">
              📱 TouchableOpacity
            </h4>
            <div className="text-blue-700 dark:text-blue-300 text-sm space-y-2">
              <p><strong>Best for:</strong> Simple buttons and basic interactions</p>
              <p><strong>Features:</strong> Automatic opacity feedback when pressed</p>
              <p><strong>Used in:</strong> Examples 1-3 for basic buttons</p>
            </div>
          </div>
          <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg border border-purple-200 dark:border-purple-800">
            <h4 className="text-purple-800 dark:text-purple-200 font-semibold mb-2 mt-0">
              🎯 Pressable
            </h4>
            <div className="text-purple-700 dark:text-purple-300 text-sm space-y-2">
              <p><strong>Best for:</strong> Advanced interactions and custom feedback</p>
              <p><strong>Features:</strong> Custom press states and animations</p>
              <p><strong>Used in:</strong> Example 4 for the submit button</p>
            </div>
          </div>
        </div>

        <h3>TextInput Properties for Mobile</h3>
        <p>
          TextInput in React Native has many mobile-specific properties that make forms 
          more user-friendly on mobile devices.
        </p>

        <CodeBlock
          code={`// 📱 Common TextInput properties for mobile optimization

<TextInput
  // Basic properties
  value={text}
  onChangeText={setText}
  placeholder="Enter text here"
  
  // Mobile keyboard optimization
  keyboardType="email-address"  // Shows @ and . for emails
  keyboardType="numeric"        // Shows number pad
  keyboardType="phone-pad"      // Shows phone number layout
  
  // Auto-capitalization
  autoCapitalize="words"        // Capitalize each word
  autoCapitalize="sentences"    // Capitalize first letter
  autoCapitalize="none"         // No auto-capitalization
  
  // Multiline for longer text
  multiline={true}
  numberOfLines={4}
  textAlignVertical="top"       // Start text at top
  
  // Auto-correction and suggestions
  autoCorrect={false}           // Disable spell check
  spellCheck={false}            // Disable spell check
  
  // Return key behavior
  returnKeyType="done"          // Show "Done" button
  returnKeyType="send"          // Show "Send" button
  returnKeyType="next"          // Show "Next" button
/>`}
          language="jsx"
          filename="TextInput-properties.jsx"
          title="Mobile TextInput Optimization"
        />

        <h2>5. Hands-On Exercise: Enhance the Contact Form</h2>

        <div className="my-6 p-4 bg-orange-50 dark:bg-orange-950 rounded-lg border border-orange-200 dark:border-orange-800">
          <h4 className="text-orange-800 dark:text-orange-200 font-semibold mb-3 mt-0">
            🎯 Your Challenge:
          </h4>
          <p className="text-orange-700 dark:text-orange-300 text-sm mb-3">
            Take the contact form from Example 4 and add these enhancements:
          </p>
          <ul className="text-orange-700 dark:text-orange-300 text-sm space-y-1 mb-0">
            <li><strong>Phone Number Field</strong> - Add a phone input with numeric keyboard</li>
            <li><strong>Priority Selector</strong> - Add buttons for Low, Medium, High priority</li>
            <li><strong>Character Counter</strong> - Show remaining characters for message (max 500)</li>
            <li><strong>Better Success Feedback</strong> - Show a success card instead of just an alert</li>
            <li><strong>Form Auto-Save</strong> - Remember form data if user navigates away</li>
          </ul>
        </div>

        <h3>🎉 What You've Accomplished</h3>
        <div className="my-6 p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
          <ul className="text-green-700 dark:text-green-300 text-sm space-y-2 mb-0">
            <li>
              <strong>Progressive Learning</strong> - Built 4 connected examples, each more advanced
            </li>
            <li>
              <strong>Mobile State Management</strong> - Used useState effectively in React Native
            </li>
            <li>
              <strong>Touch Interactions</strong> - Mastered onPress, TouchableOpacity, and Pressable
            </li>
            <li>
              <strong>Mobile Forms</strong> - Created complete forms with validation and feedback
            </li>
            <li>
              <strong>React Native Components</strong> - Used View, Text, TextInput, and Touchables
            </li>
            <li>
              <strong>Mobile UX Patterns</strong> - Applied mobile-specific user experience principles
            </li>
          </ul>
        </div>

        <div className="my-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
          <h4 className="text-blue-800 dark:text-blue-200 font-semibold mb-3 mt-0">
            🚀 Coming Next - Session 4:
          </h4>
          <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1 mb-0">
            <li>Navigation between screens in React Native</li>
            <li>Working with device features (camera, location)</li>
            <li>Advanced mobile interactions and gestures</li>
            <li>Building multi-screen mobile applications</li>
          </ul>
        </div>

        <p className="text-lg font-semibold text-center mt-8 mb-4">
          You're building real mobile apps with state and interactions! 🚀📱
        </p>
      </div>
    </>
  );
}