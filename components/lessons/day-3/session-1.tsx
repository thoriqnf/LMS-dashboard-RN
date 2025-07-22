"use client";

import { CodeBlock } from "@/components/ui/code-block-new";

export function Day3Session1Content() {
  return (
    <>
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">
            Form Handling - Session 1
          </h1>

          <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg border border-blue-200 dark:border-blue-800 mb-8">
            <h3 className="text-blue-800 dark:text-blue-200 font-semibold mb-4 mt-0">
              📝 Session Overview
            </h3>
            <ul className="text-blue-700 dark:text-blue-300 space-y-2 mb-0">
              <li>
                <strong>Controlled Form Fields</strong> - Master controlled components with useState
              </li>
              <li>
                <strong>Manual Validation</strong> - Implement real-time validation logic
              </li>
              <li>
                <strong>Password Input</strong> - Build secure password fields with show/hide toggle
              </li>
              <li>
                <strong>Form Submission</strong> - Handle form data and validation states
              </li>
            </ul>
          </div>
        </div>

        <h2>1. Controlled Components - The Foundation</h2>
        <p>
          Controlled components are the best practice for React Native forms. The key idea is simple: 
          React controls the input value through state, giving you complete control over user input.
        </p>

        <div className="bg-green-50 dark:bg-green-950 p-6 rounded-lg border border-green-200 dark:border-green-800 mb-6">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-3 mt-0">
            ✅ Why Controlled Components:
          </h4>
          <ul className="text-green-700 dark:text-green-300 text-sm space-y-1 mb-0">
            <li><strong>Predictable</strong> - You always know what the current value is</li>
            <li><strong>Validatable</strong> - Check values as user types</li>
            <li><strong>Clearable</strong> - Reset form with simple state updates</li>
            <li><strong>Testable</strong> - Easy to test because state is visible</li>
          </ul>
        </div>

        <h3>Basic Controlled Form Example</h3>
        <p>
          Let's start with a simple controlled form that focuses on the core logic without complex styling:
        </p>

        <CodeBlock
          code={`import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';

// ✅ Controlled Component - The Right Way
function ControlledForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    // We always know the current values because they're in state
    Alert.alert('Form Submitted', \`Name: \${name}, Email: \${email}\`);
    
    // Easy to clear the form after submission
    setName('');
    setEmail('');
  };

  return (
    <View style=\{{ padding: 20 }}>
      <Text style=\{{ fontSize: 18, fontWeight: 'bold', marginBottom: 20 }}>
        Controlled Form Example
      </Text>
      
      <TextInput
        style=\{{ borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10 }}
        placeholder="Enter your name"
        value={name} // React controls this value
        onChangeText={setName} // React updates state when user types
      />
      
      <TextInput
        style=\{{ borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10 }}
        placeholder="Enter your email"
        keyboardType="email-address"
        value={email} // React controls this value
        onChangeText={setEmail} // React updates state when user types
      />
      
      <TouchableOpacity 
        style=\{{ backgroundColor: '#007AFF', padding: 15, borderRadius: 5 }}
        onPress={handleSubmit}
      >
        <Text style=\{{ color: 'white', textAlign: 'center' }}>Submit</Text>
      </TouchableOpacity>
      
      {/* Show current values in real-time */}
      <View style=\{{ marginTop: 20, padding: 10, backgroundColor: '#f0f0f0' }}>
        <Text>Current Values:</Text>
        <Text>Name: "{name}"</Text>
        <Text>Email: "{email}"</Text>
      </View>
    </View>
  );
}

export default ControlledForm;`}
          language="typescript"
          filename="ControlledForm.tsx"
          title="Simple Controlled Form Example"
        />

        <h2>2. Form Validation Logic</h2>
        <p>
          Now let's add validation to our forms. The key is to validate as users type, giving them 
          immediate feedback to help them succeed.
        </p>

        <h3>Simple Form with Validation</h3>
        <p>
          Here's a registration form with basic validation logic, focusing on the core concepts:
        </p>

        <CodeBlock
          code={`import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';

export default function ValidatedForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState({});

  // Simple validation logic
  const validateField = (field, value) => {
    switch (field) {
      case 'email':
        return !value.includes('@') ? 'Please enter a valid email' : '';
      case 'password':
        return value.length < 6 ? 'Password must be at least 6 characters' : '';
      case 'confirmPassword':
        return value !== formData.password ? 'Passwords do not match' : '';
      default:
        return '';
    }
  };

  // Update field and validate
  const updateField = (field, value) => {
    setFormData(prev => (\{ ...prev, [field]: value }));
    
    // Validate as user types
    const error = validateField(field, value);
    setErrors(prev => (\{ ...prev, [field]: error }));
  };

  const handleSubmit = () => {
    // Check if form is valid
    const hasErrors = Object.values(errors).some(error => error);
    const isEmpty = Object.values(formData).some(value => !value);
    
    if (hasErrors || isEmpty) {
      Alert.alert('Error', 'Please fix the errors and fill all fields');
      return;
    }
    
    Alert.alert('Success', 'Form submitted successfully!');
  };

  return (
    <View style=\{{ padding: 20 }}>
      <Text style=\{{ fontSize: 18, fontWeight: 'bold', marginBottom: 20 }}>
        Registration Form
      </Text>
      
      <TextInput
        style=\{{ 
          borderWidth: 1, 
          borderColor: errors.email ? 'red' : '#ccc', 
          padding: 10, 
          marginBottom: 5 
        }}
        placeholder="Email"
        value={formData.email}
        onChangeText={(text) => updateField('email', text)}
        keyboardType="email-address"
      />
      {errors.email ? <Text style=\{{ color: 'red', marginBottom: 10 }}>{errors.email}</Text> : null}
      
      <TextInput
        style=\{{ 
          borderWidth: 1, 
          borderColor: errors.password ? 'red' : '#ccc', 
          padding: 10, 
          marginBottom: 5 
        }}
        placeholder="Password"
        value={formData.password}
        onChangeText={(text) => updateField('password', text)}
        secureTextEntry
      />
      {errors.password ? <Text style=\{{ color: 'red', marginBottom: 10 }}>{errors.password}</Text> : null}
      
      <TextInput
        style=\{{ 
          borderWidth: 1, 
          borderColor: errors.confirmPassword ? 'red' : '#ccc', 
          padding: 10, 
          marginBottom: 5 
        }}
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChangeText={(text) => updateField('confirmPassword', text)}
        secureTextEntry
      />
      {errors.confirmPassword ? <Text style=\{{ color: 'red', marginBottom: 10 }}>{errors.confirmPassword}</Text> : null}
      
      <TouchableOpacity 
        style=\{{ backgroundColor: '#007AFF', padding: 15, borderRadius: 5, marginTop: 10 }}
        onPress={handleSubmit}
      >
        <Text style=\{{ color: 'white', textAlign: 'center' }}>Register</Text>
      </TouchableOpacity>
    </View>
  );
}`}
          language="typescript"
          filename="ValidatedForm.tsx"
          title="Simple Form with Validation Logic"
        />

        <h2>3. Password Input with Show/Hide Toggle</h2>
        <p>
          Password fields need special handling. Let's create a simple password input with 
          show/hide functionality, focusing on the core logic:
        </p>

        <CodeBlock
          code={`import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

export default function PasswordInput() {
  const [password, setPassword] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <View style=\{{ padding: 20 }}>
      <Text style=\{{ fontSize: 18, fontWeight: 'bold', marginBottom: 20 }}>
        Password with Show/Hide
      </Text>
      
      <View style=\{{ position: 'relative' }}>
        <TextInput
          style=\{{ 
            borderWidth: 1, 
            borderColor: '#ccc', 
            padding: 10, 
            paddingRight: 50 
          }}
          placeholder="Enter password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!isVisible} // Toggle based on state
        />
        
        <TouchableOpacity
          style=\{{ 
            position: 'absolute', 
            right: 10, 
            top: 10 
          }}
          onPress={toggleVisibility}
        >
          <Text style=\{{ fontSize: 16 }}>
            {isVisible ? '🙈' : '👁️'}
          </Text>
        </TouchableOpacity>
      </View>
      
      {/* Show current state for learning */}
      <View style=\{{ marginTop: 20, padding: 10, backgroundColor: '#f0f0f0' }}>
        <Text>Password: "{password}"</Text>
        <Text>Visible: {isVisible ? 'Yes' : 'No'}</Text>
        <Text>Length: {password.length} characters</Text>
      </View>
    </View>
  );
}`}
          language="typescript"
          filename="PasswordInput.tsx"
          title="Simple Password Input with Show/Hide Toggle"
        />

        <h2>4. Hands-On Exercise</h2>
        <p>
          Now it's time to practice! Try building your own form that combines all the concepts we've learned.
        </p>

        <div className="bg-orange-50 dark:bg-orange-950 p-6 rounded-lg border border-orange-200 dark:border-orange-800 mb-6">
          <h4 className="text-orange-800 dark:text-orange-200 font-semibold mb-3 mt-0">
            🎯 Practice Exercise:
          </h4>
          <p className="text-orange-700 dark:text-orange-300 text-sm mb-4">
            Try building your own form that combines all the concepts:
          </p>
          <ul className="text-orange-700 dark:text-orange-300 text-sm space-y-1 mb-0">
            <li>• Create a form with controlled components (useState)</li>
            <li>• Add simple validation logic for each field</li>
            <li>• Include a password field with show/hide toggle</li>
            <li>• Display error messages when validation fails</li>
            <li>• Handle form submission and success/error states</li>
          </ul>
        </div>

        <h2>5. Session Summary</h2>

        <div className="bg-green-50 dark:bg-green-950 p-6 rounded-lg border border-green-200 dark:border-green-800 mb-6">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-3 mt-0">
            🎉 What You've Learned:
          </h4>
          <ul className="text-green-700 dark:text-green-300 text-sm space-y-1 mb-0">
            <li>✅ <strong>Controlled Components</strong> - Using useState to manage form inputs</li>
            <li>✅ <strong>Form Validation</strong> - Simple validation logic with real-time feedback</li>
            <li>✅ <strong>Password Input</strong> - Show/hide toggle functionality</li>
            <li>✅ <strong>Form Submission</strong> - Handling form data and validation states</li>
          </ul>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
          <h4 className="text-blue-800 dark:text-blue-200 font-semibold mb-3 mt-0">
            📚 Key Concepts:
          </h4>
          <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1 mb-0">
            <li><strong>Controlled components</strong> keep form data in React state</li>
            <li><strong>Real-time validation</strong> helps users fix errors as they type</li>
            <li><strong>Form state management</strong> makes forms predictable and testable</li>
            <li><strong>Simple styling</strong> with inline styles keeps code focused on logic</li>
          </ul>
        </div>
      </div>
    </>
  );
}