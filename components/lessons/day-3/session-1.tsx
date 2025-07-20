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

        <h2>1. What You Need to Know First</h2>

        <div className="bg-yellow-50 dark:bg-yellow-950 p-6 rounded-lg border border-yellow-200 dark:border-yellow-800 mb-6">
          <h4 className="text-yellow-800 dark:text-yellow-200 font-semibold mb-3 mt-0">
            📋 Prerequisites from Previous Days
          </h4>
          <p className="text-yellow-700 dark:text-yellow-300 text-sm mb-3">
            This session builds on forms you created in Day 1 Session 3. Make sure you understand:
          </p>
          <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1 mb-0">
            <li>• Basic React Native components (View, Text, TextInput, TouchableOpacity)</li>
            <li>• useState hook for managing component state</li>
            <li>• Basic form submission with onPress handlers</li>
            <li>• Component styling with StyleSheet</li>
          </ul>
        </div>

        <h2>2. Form Fundamentals: Understanding the Basics</h2>

        <h3>Web Forms vs Mobile Forms</h3>
        <p>
          Before diving into advanced form handling, let's understand how mobile forms differ from web forms. 
          Think of forms like order sheets at a restaurant:
        </p>

        <div className="my-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
          <h4 className="text-blue-800 dark:text-blue-200 font-semibold mb-2 mt-0">
            📋 Forms are like restaurant order sheets:
          </h4>
          <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1 mb-0">
            <li>
              <strong>Web Forms = Paper Order Sheets</strong> - Submit all at once, like handing in a completed paper
            </li>
            <li>
              <strong>Mobile Forms = Digital Tablets</strong> - Real-time feedback as you fill each field
            </li>
            <li>
              <strong>Validation = Quality Check</strong> - Making sure the order is complete and correct
            </li>
            <li>
              <strong>User Experience = Customer Service</strong> - Help users succeed, don't frustrate them
            </li>
          </ul>
        </div>

        <h3>The Two Types of Form Components</h3>
        <p>
          In React Native, there are two main ways to handle form inputs. Let's understand both approaches 
          with simple examples:
        </p>

        <div className="grid md:grid-cols-2 gap-4 my-6">
          <div className="p-4 bg-red-50 dark:bg-red-950 rounded-lg border border-red-200 dark:border-red-800">
            <h4 className="text-red-800 dark:text-red-200 font-semibold mb-2 mt-0">❌ Uncontrolled Components:</h4>
            <div className="text-red-700 dark:text-red-300 text-sm space-y-1">
              <div>• React doesn't control the input value</div>
              <div>• Value lives in the component itself</div>
              <div>• Hard to validate in real-time</div>
              <div>• Difficult to clear or preset values</div>
              <div>• Not recommended for React Native</div>
            </div>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
            <h4 className="text-green-800 dark:text-green-200 font-semibold mb-2 mt-0">✅ Controlled Components:</h4>
            <div className="text-green-700 dark:text-green-300 text-sm space-y-1">
              <div>• React controls the input value through state</div>
              <div>• Value always matches your component state</div>
              <div>• Easy to validate as user types</div>
              <div>• Simple to clear, preset, or transform values</div>
              <div>• Best practice for React Native</div>
            </div>
          </div>
        </div>

        <h3>Simple Form Example: Uncontrolled vs Controlled</h3>
        <p>
          Let's see the difference between uncontrolled and controlled components with a simple example:
        </p>

        <CodeBlock
          code={`import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

// ❌ Uncontrolled Component Example (NOT recommended)
function UncontrolledForm() {
  const nameInputRef = useRef(null);
  const emailInputRef = useRef(null);

  const handleSubmit = () => {
    // We have to manually get values from the inputs
    // This is difficult and not reliable
    Alert.alert('Form Submitted', 'Check console for values');
    console.log('Name:', nameInputRef.current?.value || 'Unknown');
    console.log('Email:', emailInputRef.current?.value || 'Unknown');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>❌ Uncontrolled Form (Don't Use)</Text>
      
      <TextInput
        ref={nameInputRef}
        style={styles.input}
        placeholder="Enter your name"
        // No value prop, no onChangeText - React doesn't control this
      />
      
      <TextInput
        ref={emailInputRef}
        style={styles.input}
        placeholder="Enter your email"
        keyboardType="email-address"
        // No value prop, no onChangeText - React doesn't control this
      />
      
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit (Hard to Control)</Text>
      </TouchableOpacity>
    </View>
  );
}

// ✅ Controlled Component Example (RECOMMENDED)
function ControlledForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    // We always know the current values because they're in state
    Alert.alert('Form Submitted', \`Name: \${name}, Email: \${email}\`);
    console.log('Name:', name);
    console.log('Email:', email);
    
    // Easy to clear the form after submission
    setName('');
    setEmail('');
  };

  const clearForm = () => {
    // Easy to clear because we control the values
    setName('');
    setEmail('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>✅ Controlled Form (Best Practice)</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name} // React controls this value
        onChangeText={setName} // React updates state when user types
      />
      
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        keyboardType="email-address"
        value={email} // React controls this value
        onChangeText={setEmail} // React updates state when user types
      />
      
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.button, styles.clearButton]} onPress={clearForm}>
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableOpacity>
      </View>
      
      {/* Show current values in real-time */}
      <View style={styles.debugBox}>
        <Text style={styles.debugTitle}>Current Values:</Text>
        <Text style={styles.debugText}>Name: "{name}"</Text>
        <Text style={styles.debugText}>Email: "{email}"</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#2c3e50',
  },
  input: {
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#ffffff',
    marginBottom: 15,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    flex: 0.48,
    alignItems: 'center',
  },
  clearButton: {
    backgroundColor: '#FF3B30',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  debugBox: {
    backgroundColor: '#e9ecef',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  debugTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#495057',
  },
  debugText: {
    fontSize: 12,
    color: '#6c757d',
    fontFamily: 'monospace',
  },
});

// Export the controlled form as the main example
export default ControlledForm;`}
          language="typescript"
          filename="BasicFormComparison.tsx"
          title="Uncontrolled vs Controlled Components"
        />

        <div className="bg-green-50 dark:bg-green-950 p-6 rounded-lg border border-green-200 dark:border-green-800 mb-6">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-3 mt-0">
            🎯 Why Controlled Components Are Better
          </h4>
          <ul className="text-green-700 dark:text-green-300 text-sm space-y-1 mb-0">
            <li><strong>Predictable</strong> - You always know what the current value is</li>
            <li><strong>Testable</strong> - Easy to test because state is visible</li>
            <li><strong>Validatable</strong> - Check values as user types</li>
            <li><strong>Clearable</strong> - Reset form with simple state updates</li>
            <li><strong>Transformable</strong> - Format or modify input as user types</li>
            <li><strong>Debugging-friendly</strong> - See current state in React DevTools</li>
          </ul>
        </div>

        <h2>3. Building on Your Form Foundation</h2>
        <p>
          Now that you understand controlled components, let's connect this to the contact form you built in Day 1 Session 3. 
          We'll take that foundation and create professional forms with validation, secure password fields, and error handling.
        </p>

        <div className="grid md:grid-cols-2 gap-4 my-6">
          <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border">
            <h4 className="font-semibold mb-2 mt-0">📱 Day 1 Basic Forms:</h4>
            <div className="text-sm space-y-1">
              <div>• Basic TextInput components</div>
              <div>• Simple state management</div>
              <div>• Basic form submission</div>
              <div>• No validation or error handling</div>
            </div>
          </div>
          <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
            <h4 className="text-blue-800 dark:text-blue-200 font-semibold mb-2 mt-0">✨ Day 3 Professional Forms:</h4>
            <div className="text-blue-700 dark:text-blue-300 text-sm space-y-1">
              <div>• Controlled form fields</div>
              <div>• Real-time validation</div>
              <div>• Secure password inputs</div>
              <div>• Professional error handling</div>
            </div>
          </div>
        </div>

        <h2>4. Controlled Form Fields</h2>

        <h3>What Are Controlled Components?</h3>
        <p>
          Controlled components are form elements where React controls the input's value through state. 
          This means the input value is always synchronized with your component's state, giving you complete 
          control over user input.
        </p>

        <div className="bg-green-50 dark:bg-green-950 p-6 rounded-lg border border-green-200 dark:border-green-800 mb-6">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-2 mt-0">
            🎯 Controlled Components Benefits:
          </h4>
          <ul className="text-green-700 dark:text-green-300 text-sm space-y-1 mb-0">
            <li><strong>Predictable behavior</strong> - Value is always in sync with state</li>
            <li><strong>Real-time validation</strong> - Validate as user types</li>
            <li><strong>Easy testing</strong> - State-driven components are easier to test</li>
            <li><strong>Form manipulation</strong> - Clear, preset, or transform values programmatically</li>
            <li><strong>Consistent data flow</strong> - Single source of truth for form data</li>
          </ul>
        </div>

        <h3>Example 1: Registration Form with Controlled Fields</h3>
        <p>
          Let's build a complete registration form using controlled components. We'll manage all form state 
          and create a foundation for validation and error handling.
        </p>

        <CodeBlock
          code={`import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView,
  Alert 
} from 'react-native';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
}

export default function RegistrationForm() {
  // Controlled form state - single source of truth
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });

  // Loading state for form submission
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Helper function to update form fields
  const updateField = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Form submission handler
  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      Alert.alert('Success', 'Account created successfully!');
      
      // Reset form after successful submission
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to create account. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Fill in your details to get started</Text>

        {/* First Name - Controlled Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={styles.input}
            value={formData.firstName}
            onChangeText={(text) => updateField('firstName', text)}
            placeholder="Enter your first name"
            autoCapitalize="words"
            autoCorrect={false}
          />
        </View>

        {/* Last Name - Controlled Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={styles.input}
            value={formData.lastName}
            onChangeText={(text) => updateField('lastName', text)}
            placeholder="Enter your last name"
            autoCapitalize="words"
            autoCorrect={false}
          />
        </View>

        {/* Email - Controlled Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.input}
            value={formData.email}
            onChangeText={(text) => updateField('email', text)}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        {/* Phone - Controlled Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            value={formData.phone}
            onChangeText={(text) => updateField('phone', text)}
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
            autoCorrect={false}
          />
        </View>

        {/* Password - Controlled Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            value={formData.password}
            onChangeText={(text) => updateField('password', text)}
            placeholder="Create a strong password"
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        {/* Confirm Password - Controlled Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            value={formData.confirmPassword}
            onChangeText={(text) => updateField('confirmPassword', text)}
            placeholder="Confirm your password"
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          <Text style={styles.submitButtonText}>
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
          </Text>
        </TouchableOpacity>

        {/* Form State Debug (for learning purposes) */}
        <View style={styles.debugContainer}>
          <Text style={styles.debugTitle}>Form State (Debug):</Text>
          <Text style={styles.debugText}>
            {JSON.stringify(formData, null, 2)}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  formContainer: {
    padding: 20,
    maxWidth: 400,
    alignSelf: 'center',
    width: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#2c3e50',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
    color: '#7f8c8d',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#ffffff',
    color: '#495057',
  },
  submitButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonDisabled: {
    backgroundColor: '#adb5bd',
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  debugContainer: {
    marginTop: 30,
    padding: 16,
    backgroundColor: '#e9ecef',
    borderRadius: 8,
  },
  debugTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#495057',
  },
  debugText: {
    fontSize: 12,
    fontFamily: 'monospace',
    color: '#6c757d',
  },
});`}
          language="typescript"
          filename="RegistrationForm.tsx"
          title="Controlled Registration Form"
        />

        <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg border border-blue-200 dark:border-blue-800 mb-6">
          <h4 className="text-blue-800 dark:text-blue-200 font-semibold mb-3 mt-0">
            🔧 Controlled Component Principles:
          </h4>
          <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1 mb-0">
            <li><strong>Single state object</strong> - All form data in one place</li>
            <li><strong>value prop</strong> - Always controlled by React state</li>
            <li><strong>onChangeText</strong> - Updates state on every keystroke</li>
            <li><strong>Helper functions</strong> - Clean, reusable field update logic</li>
            <li><strong>Type safety</strong> - TypeScript interfaces for form data</li>
          </ul>
        </div>

        <h2>5. Manual Validation Logic</h2>

        <h3>Real-Time Form Validation</h3>
        <p>
          Professional forms validate user input as they type, providing immediate feedback. 
          Let's add comprehensive validation to our registration form with real-time error messages.
        </p>

        <h3>Example 2: Form with Real-Time Validation</h3>
        <p>
          Building on our controlled form, let's add validation logic that checks fields in real-time 
          and provides helpful error messages to guide users.
        </p>

        <CodeBlock
          code={`import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView 
} from 'react-native';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  phone?: string;
}

export default function ValidatedRegistrationForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation rules
  const validateField = (field: keyof FormData, value: string): string | undefined => {
    switch (field) {
      case 'firstName':
        if (!value.trim()) return 'First name is required';
        if (value.trim().length < 2) return 'First name must be at least 2 characters';
        return undefined;

      case 'lastName':
        if (!value.trim()) return 'Last name is required';
        if (value.trim().length < 2) return 'Last name must be at least 2 characters';
        return undefined;

      case 'email':
        if (!value.trim()) return 'Email is required';
        const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
        if (!emailRegex.test(value)) return 'Please enter a valid email address';
        return undefined;

      case 'phone':
        if (!value.trim()) return 'Phone number is required';
        const phoneRegex = /^[\\d\\s\\-\\+\\(\\)]+$/;
        if (!phoneRegex.test(value)) return 'Please enter a valid phone number';
        if (value.replace(/\\D/g, '').length < 10) return 'Phone number must be at least 10 digits';
        return undefined;

      case 'password':
        if (!value) return 'Password is required';
        if (value.length < 8) return 'Password must be at least 8 characters';
        if (!/(?=.*[a-z])/.test(value)) return 'Password must contain at least one lowercase letter';
        if (!/(?=.*[A-Z])/.test(value)) return 'Password must contain at least one uppercase letter';
        if (!/(?=.*\\d)/.test(value)) return 'Password must contain at least one number';
        return undefined;

      case 'confirmPassword':
        if (!value) return 'Please confirm your password';
        if (value !== formData.password) return 'Passwords do not match';
        return undefined;

      default:
        return undefined;
    }
  };

  // Validate all fields
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    (Object.keys(formData) as Array<keyof FormData>).forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  // Update field with validation
  const updateField = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Validate field if it has been touched
    if (touched[field]) {
      const error = validateField(field, value);
      setErrors(prev => ({
        ...prev,
        [field]: error
      }));
    }
  };

  // Handle field blur (when user leaves field)
  const handleBlur = (field: keyof FormData) => {
    setTouched(prev => ({
      ...prev,
      [field]: true
    }));

    // Validate field on blur
    const error = validateField(field, formData[field]);
    setErrors(prev => ({
      ...prev,
      [field]: error
    }));
  };

  // Re-validate confirm password when password changes
  useEffect(() => {
    if (touched.confirmPassword && formData.confirmPassword) {
      const error = validateField('confirmPassword', formData.confirmPassword);
      setErrors(prev => ({
        ...prev,
        confirmPassword: error
      }));
    }
  }, [formData.password, formData.confirmPassword, touched.confirmPassword]);

  // Form submission
  const handleSubmit = async () => {
    // Mark all fields as touched to show validation errors
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {} as { [key: string]: boolean });
    setTouched(allTouched);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Form submitted successfully:', formData);
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
      });
      setErrors({});
      setTouched({});
      
    } catch (error) {
      console.error('Form submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Check if form is valid
  const isFormValid = Object.keys(errors).length === 0 && 
                     Object.keys(formData).every(key => 
                       formData[key as keyof FormData].trim() !== '');

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>All fields are required</Text>

        {/* First Name */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={[
              styles.input,
              errors.firstName && touched.firstName && styles.inputError
            ]}
            value={formData.firstName}
            onChangeText={(text) => updateField('firstName', text)}
            onBlur={() => handleBlur('firstName')}
            placeholder="Enter your first name"
            autoCapitalize="words"
            autoCorrect={false}
          />
          {errors.firstName && touched.firstName && (
            <Text style={styles.errorText}>{errors.firstName}</Text>
          )}
        </View>

        {/* Last Name */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={[
              styles.input,
              errors.lastName && touched.lastName && styles.inputError
            ]}
            value={formData.lastName}
            onChangeText={(text) => updateField('lastName', text)}
            onBlur={() => handleBlur('lastName')}
            placeholder="Enter your last name"
            autoCapitalize="words"
            autoCorrect={false}
          />
          {errors.lastName && touched.lastName && (
            <Text style={styles.errorText}>{errors.lastName}</Text>
          )}
        </View>

        {/* Email */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={[
              styles.input,
              errors.email && touched.email && styles.inputError
            ]}
            value={formData.email}
            onChangeText={(text) => updateField('email', text)}
            onBlur={() => handleBlur('email')}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
          {errors.email && touched.email && (
            <Text style={styles.errorText}>{errors.email}</Text>
          )}
        </View>

        {/* Phone */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={[
              styles.input,
              errors.phone && touched.phone && styles.inputError
            ]}
            value={formData.phone}
            onChangeText={(text) => updateField('phone', text)}
            onBlur={() => handleBlur('phone')}
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
            autoCorrect={false}
          />
          {errors.phone && touched.phone && (
            <Text style={styles.errorText}>{errors.phone}</Text>
          )}
        </View>

        {/* Password */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={[
              styles.input,
              errors.password && touched.password && styles.inputError
            ]}
            value={formData.password}
            onChangeText={(text) => updateField('password', text)}
            onBlur={() => handleBlur('password')}
            placeholder="Create a strong password"
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
          />
          {errors.password && touched.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}
          {/* Password strength indicator */}
          {formData.password && (
            <View style={styles.passwordStrength}>
              <Text style={styles.passwordStrengthText}>
                Password Requirements:
              </Text>
              <Text style={[
                styles.requirementText,
                formData.password.length >= 8 && styles.requirementMet
              ]}>
                • At least 8 characters
              </Text>
              <Text style={[
                styles.requirementText,
                /(?=.*[a-z])/.test(formData.password) && styles.requirementMet
              ]}>
                • One lowercase letter
              </Text>
              <Text style={[
                styles.requirementText,
                /(?=.*[A-Z])/.test(formData.password) && styles.requirementMet
              ]}>
                • One uppercase letter
              </Text>
              <Text style={[
                styles.requirementText,
                /(?=.*\\d)/.test(formData.password) && styles.requirementMet
              ]}>
                • One number
              </Text>
            </View>
          )}
        </View>

        {/* Confirm Password */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            style={[
              styles.input,
              errors.confirmPassword && touched.confirmPassword && styles.inputError
            ]}
            value={formData.confirmPassword}
            onChangeText={(text) => updateField('confirmPassword', text)}
            onBlur={() => handleBlur('confirmPassword')}
            placeholder="Confirm your password"
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
          />
          {errors.confirmPassword && touched.confirmPassword && (
            <Text style={styles.errorText}>{errors.confirmPassword}</Text>
          )}
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={[
            styles.submitButton,
            !isFormValid && styles.submitButtonDisabled,
            isSubmitting && styles.submitButtonDisabled
          ]}
          onPress={handleSubmit}
          disabled={!isFormValid || isSubmitting}
        >
          <Text style={styles.submitButtonText}>
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
          </Text>
        </TouchableOpacity>

        {/* Form validation status */}
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>
            Form Status: {isFormValid ? '✅ Valid' : '❌ Invalid'}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  formContainer: {
    padding: 20,
    maxWidth: 400,
    alignSelf: 'center',
    width: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#2c3e50',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
    color: '#7f8c8d',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#ffffff',
    color: '#495057',
  },
  inputError: {
    borderColor: '#dc3545',
    borderWidth: 2,
  },
  errorText: {
    color: '#dc3545',
    fontSize: 14,
    marginTop: 4,
  },
  passwordStrength: {
    marginTop: 8,
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 6,
  },
  passwordStrengthText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#495057',
    marginBottom: 4,
  },
  requirementText: {
    fontSize: 12,
    color: '#6c757d',
    marginBottom: 2,
  },
  requirementMet: {
    color: '#28a745',
  },
  submitButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonDisabled: {
    backgroundColor: '#adb5bd',
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  statusContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#e9ecef',
    borderRadius: 8,
    alignItems: 'center',
  },
  statusText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#495057',
  },
});`}
          language="typescript"
          filename="ValidatedRegistrationForm.tsx"
          title="Form with Real-Time Validation"
        />

        <div className="bg-yellow-50 dark:bg-yellow-950 p-6 rounded-lg border border-yellow-200 dark:border-yellow-800 mb-6">
          <h4 className="text-yellow-800 dark:text-yellow-200 font-semibold mb-3 mt-0">
            💡 Validation Best Practices:
          </h4>
          <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1 mb-0">
            <li><strong>Real-time feedback</strong> - Validate as users type for better UX</li>
            <li><strong>Touched state</strong> - Only show errors after user interacts with field</li>
            <li><strong>Clear error messages</strong> - Tell users exactly what's wrong and how to fix it</li>
            <li><strong>Visual indicators</strong> - Use colors and icons to show validation status</li>
            <li><strong>Disabled submission</strong> - Prevent form submission until all fields are valid</li>
          </ul>
        </div>

        <h2>6. Secure Password Input with Show/Hide Toggle</h2>

        <h3>Building Professional Password Fields</h3>
        <p>
          Password fields need special handling - they should be secure by default but allow users to verify 
          their input. Let's create a password input with show/hide functionality and strength indicators.
        </p>

        <h3>Example 3: Advanced Password Input Component</h3>
        <p>
          Let's create a reusable password input component with show/hide toggle, strength meter, 
          and comprehensive validation that you can use throughout your app.
        </p>

        <CodeBlock
          code={`import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet 
} from 'react-native';

interface PasswordInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  label?: string;
  error?: string;
  showStrengthMeter?: boolean;
  style?: any;
}

interface PasswordStrength {
  score: number;
  feedback: string;
  color: string;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  value,
  onChangeText,
  onBlur,
  placeholder = "Enter password",
  label = "Password",
  error,
  showStrengthMeter = true,
  style
}) => {
  const [isVisible, setIsVisible] = useState(false);

  // Calculate password strength
  const calculateStrength = (password: string): PasswordStrength => {
    let score = 0;
    let feedback = '';

    if (password.length === 0) {
      return { score: 0, feedback: 'Enter a password', color: '#6c757d' };
    }

    // Length check
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;

    // Character variety checks
    if (/[a-z]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^a-zA-Z0-9]/.test(password)) score += 1;

    // Determine feedback and color
    if (score <= 2) {
      feedback = 'Weak';
      return { score, feedback, color: '#dc3545' };
    } else if (score <= 4) {
      feedback = 'Fair';
      return { score, feedback, color: '#ffc107' };
    } else if (score <= 5) {
      feedback = 'Good';
      return { score, feedback, color: '#28a745' };
    } else {
      feedback = 'Strong';
      return { score, feedback, color: '#007AFF' };
    }
  };

  const strength = calculateStrength(value);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      
      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.input,
            error && styles.inputError
          ]}
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
          placeholder={placeholder}
          secureTextEntry={!isVisible}
          autoCapitalize="none"
          autoCorrect={false}
        />
        
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={toggleVisibility}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.toggleButtonText}>
            {isVisible ? '🙈' : '👁️'}
          </Text>
        </TouchableOpacity>
      </View>

      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}

      {showStrengthMeter && value.length > 0 && (
        <View style={styles.strengthContainer}>
          <View style={styles.strengthBar}>
            <View 
              style={[
                styles.strengthFill,
                { 
                  width: \`\${(strength.score / 6) * 100}%\`,
                  backgroundColor: strength.color
                }
              ]}
            />
          </View>
          <Text style={[styles.strengthText, { color: strength.color }]}>
            {strength.feedback}
          </Text>
        </View>
      )}

      {showStrengthMeter && value.length > 0 && (
        <View style={styles.requirementsContainer}>
          <Text style={styles.requirementsTitle}>Password Requirements:</Text>
          
          <View style={styles.requirement}>
            <Text style={[
              styles.requirementText,
              value.length >= 8 && styles.requirementMet
            ]}>
              {value.length >= 8 ? '✅' : '❌'} At least 8 characters
            </Text>
          </View>
          
          <View style={styles.requirement}>
            <Text style={[
              styles.requirementText,
              /[a-z]/.test(value) && styles.requirementMet
            ]}>
              {/[a-z]/.test(value) ? '✅' : '❌'} One lowercase letter
            </Text>
          </View>
          
          <View style={styles.requirement}>
            <Text style={[
              styles.requirementText,
              /[A-Z]/.test(value) && styles.requirementMet
            ]}>
              {/[A-Z]/.test(value) ? '✅' : '❌'} One uppercase letter
            </Text>
          </View>
          
          <View style={styles.requirement}>
            <Text style={[
              styles.requirementText,
              /[0-9]/.test(value) && styles.requirementMet
            ]}>
              {/[0-9]/.test(value) ? '✅' : '❌'} One number
            </Text>
          </View>
          
          <View style={styles.requirement}>
            <Text style={[
              styles.requirementText,
              /[^a-zA-Z0-9]/.test(value) && styles.requirementMet
            ]}>
              {/[^a-zA-Z0-9]/.test(value) ? '✅' : '❌'} One special character
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

// Example usage in a login form
export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const handleLogin = () => {
    const newErrors: { email?: string; password?: string } = {};

    // Validate email
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    // Validate password
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log('Login successful:', { email, password });
    }
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Sign in to your account</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={[styles.input, errors.email && styles.inputError]}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
        {errors.email && (
          <Text style={styles.errorText}>{errors.email}</Text>
        )}
      </View>

      <PasswordInput
        value={password}
        onChangeText={setPassword}
        label="Password"
        placeholder="Enter your password"
        error={errors.password}
        showStrengthMeter={false} // Don't show strength meter for login
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleLogin}>
        <Text style={styles.submitButtonText}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.forgotPassword}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
  },
  inputContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#ffffff',
    color: '#495057',
    paddingRight: 50, // Make room for toggle button
  },
  inputError: {
    borderColor: '#dc3545',
    borderWidth: 2,
  },
  toggleButton: {
    position: 'absolute',
    right: 12,
    padding: 8,
  },
  toggleButtonText: {
    fontSize: 18,
  },
  errorText: {
    color: '#dc3545',
    fontSize: 14,
    marginTop: 4,
  },
  strengthContainer: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  strengthBar: {
    flex: 1,
    height: 4,
    backgroundColor: '#e9ecef',
    borderRadius: 2,
    marginRight: 12,
  },
  strengthFill: {
    height: '100%',
    borderRadius: 2,
  },
  strengthText: {
    fontSize: 14,
    fontWeight: '600',
    minWidth: 60,
  },
  requirementsContainer: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  requirementsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#495057',
    marginBottom: 8,
  },
  requirement: {
    marginBottom: 4,
  },
  requirementText: {
    fontSize: 12,
    color: '#6c757d',
  },
  requirementMet: {
    color: '#28a745',
  },
  
  // Login form styles
  formContainer: {
    padding: 20,
    maxWidth: 400,
    alignSelf: 'center',
    width: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#2c3e50',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
    color: '#7f8c8d',
  },
  inputGroup: {
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotPassword: {
    alignItems: 'center',
    marginTop: 16,
  },
  forgotPasswordText: {
    color: '#007AFF',
    fontSize: 16,
  },
});`}
          language="typescript"
          filename="PasswordInput.tsx"
          title="Advanced Password Input Component"
        />

        <div className="bg-green-50 dark:bg-green-950 p-6 rounded-lg border border-green-200 dark:border-green-800 mb-6">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-3 mt-0">
            ✨ What's New in Password Input:
          </h4>
          <ul className="text-green-700 dark:text-green-300 text-sm space-y-1 mb-0">
            <li><strong>Show/Hide Toggle</strong> - Users can verify their password input</li>
            <li><strong>Strength Meter</strong> - Visual indicator of password strength</li>
            <li><strong>Real-time Requirements</strong> - Live feedback on password criteria</li>
            <li><strong>Reusable Component</strong> - Can be used in any form</li>
            <li><strong>Accessibility</strong> - Proper hit targets and visual feedback</li>
            <li><strong>Security</strong> - Secure by default with optional visibility</li>
          </ul>
        </div>

        <h2>7. Hands-On Exercise: Complete Form System</h2>

        <div className="bg-orange-50 dark:bg-orange-950 p-6 rounded-lg border border-orange-200 dark:border-orange-800 mb-6">
          <h4 className="text-orange-800 dark:text-orange-200 font-semibold mb-3 mt-0">
            🎯 Challenge: Build a Complete Registration System
          </h4>
          <p className="text-orange-700 dark:text-orange-300 text-sm mb-4">
            Create a full registration form with all the professional features we've learned.
          </p>
          <ul className="text-orange-700 dark:text-orange-300 text-sm space-y-1 mb-0">
            <li>• Use controlled components for all form fields</li>
            <li>• Implement real-time validation with helpful error messages</li>
            <li>• Add a password field with show/hide toggle and strength meter</li>
            <li>• Include password confirmation validation</li>
            <li>• Add form submission with loading states</li>
            <li>• Test all validation scenarios and edge cases</li>
          </ul>
        </div>

        <h3>Step-by-Step Implementation Guide</h3>

        <CodeBlock
          code={`// Your complete registration form implementation
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { PasswordInput } from './PasswordInput';
import { TextInput } from './TextInput';

export default function CompleteRegistrationForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Your validation logic here
  const validateField = (field, value) => {
    // Add your validation rules
    switch (field) {
      case 'firstName':
        return !value.trim() ? 'First name is required' : undefined;
      case 'email':
        return !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value) ? 'Invalid email' : undefined;
      case 'password':
        return value.length < 8 ? 'Password must be at least 8 characters' : undefined;
      case 'confirmPassword':
        return value !== formData.password ? 'Passwords do not match' : undefined;
      default:
        return undefined;
    }
  };

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Validate if field has been touched
    if (touched[field]) {
      const error = validateField(field, value);
      setErrors(prev => ({ ...prev, [field]: error }));
    }
  };

  const handleSubmit = async () => {
    // Validate all fields
    // Submit form data
    // Handle success/error states
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Join Us Today</Text>
        
        {/* Add your form fields here */}
        <TextInput
          label="First Name"
          value={formData.firstName}
          onChangeText={(text) => updateField('firstName', text)}
          error={errors.firstName}
          // ... other props
        />

        <PasswordInput
          label="Password"
          value={formData.password}
          onChangeText={(text) => updateField('password', text)}
          error={errors.password}
          showStrengthMeter={true}
        />

        <PasswordInput
          label="Confirm Password"
          value={formData.confirmPassword}
          onChangeText={(text) => updateField('confirmPassword', text)}
          error={errors.confirmPassword}
          showStrengthMeter={false}
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  formContainer: {
    padding: 20,
    maxWidth: 400,
    alignSelf: 'center',
    width: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 32,
    color: '#2c3e50',
  },
  submitButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});`}
          language="typescript"
          filename="CompleteRegistrationForm.tsx"
          title="Your Complete Registration Form"
        />

        <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg border border-blue-200 dark:border-blue-800 mb-6">
          <h4 className="text-blue-800 dark:text-blue-200 font-semibold mb-3 mt-0">
            🔧 Pro Tips for Professional Forms:
          </h4>
          <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1 mb-0">
            <li><strong>User experience first</strong> - Make forms easy and intuitive to use</li>
            <li><strong>Clear error messages</strong> - Tell users exactly what's wrong and how to fix it</li>
            <li><strong>Progressive disclosure</strong> - Show relevant information at the right time</li>
            <li><strong>Accessibility</strong> - Ensure forms work with screen readers</li>
            <li><strong>Mobile optimization</strong> - Use appropriate keyboard types and input modes</li>
            <li><strong>Performance</strong> - Optimize validation to avoid blocking the UI</li>
          </ul>
        </div>

        <h2>8. Session Summary</h2>

        <div className="bg-green-50 dark:bg-green-950 p-6 rounded-lg border border-green-200 dark:border-green-800 mb-6">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-3 mt-0">
            🎉 What You've Accomplished:
          </h4>
          <ul className="text-green-700 dark:text-green-300 text-sm space-y-1 mb-0">
            <li>✅ <strong>Controlled Components</strong> - Mastered controlled form fields with React state</li>
            <li>✅ <strong>Real-Time Validation</strong> - Implemented comprehensive form validation</li>
            <li>✅ <strong>Password Security</strong> - Created secure password inputs with show/hide toggle</li>
            <li>✅ <strong>User Experience</strong> - Built forms with excellent UX and error handling</li>
            <li>✅ <strong>Professional Components</strong> - Created reusable form components</li>
            <li>✅ <strong>Form States</strong> - Managed complex form states and submission flows</li>
          </ul>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
          <h4 className="text-blue-800 dark:text-blue-200 font-semibold mb-3 mt-0">
            📚 Key Takeaways:
          </h4>
          <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1 mb-0">
            <li><strong>Controlled components</strong> provide predictable and testable form behavior</li>
            <li><strong>Real-time validation</strong> improves user experience and reduces errors</li>
            <li><strong>Password security</strong> requires both security and usability considerations</li>
            <li><strong>Form state management</strong> is crucial for complex forms</li>
            <li><strong>Error handling</strong> should be helpful and guide users to success</li>
            <li><strong>Mobile optimization</strong> makes forms easier to use on touch devices</li>
          </ul>
        </div>

        <div className="bg-purple-50 dark:bg-purple-950 p-6 rounded-lg border border-purple-200 dark:border-purple-800 mt-6">
          <h4 className="text-purple-800 dark:text-purple-200 font-semibold mb-3 mt-0">
            🚀 Next Steps:
          </h4>
          <p className="text-purple-700 dark:text-purple-300 text-sm mb-2">
            You now have the skills to build professional, user-friendly forms with comprehensive validation. 
            These form handling patterns are essential for any app that collects user data.
          </p>
          <p className="text-purple-700 dark:text-purple-300 text-sm">
            In the next session, we'll explore custom hooks to extract and reuse form logic across different components!
          </p>
        </div>
      </div>
    </>
  );
}