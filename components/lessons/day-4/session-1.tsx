"use client";

import { CodeBlock } from "@/components/ui/code-block-new";

export function Day4Session1Content() {
  return (
    <>
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">
            React Native Auth UI - Session 1
          </h1>

          <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg border border-blue-200 dark:border-blue-800 mb-8">
            <h3 className="text-blue-800 dark:text-blue-200 font-semibold mb-4 mt-0">
              🔐 Session Overview
            </h3>
            <ul className="text-blue-700 dark:text-blue-300 space-y-2 mb-0">
              <li>
                <strong>Login Forms</strong> - Build clean login and signup forms
              </li>
              <li>
                <strong>Input Validation</strong> - Validate email and password inputs
              </li>
              <li>
                <strong>Auth Screens</strong> - Create professional authentication screens
              </li>
              <li>
                <strong>Form States</strong> - Handle loading and error states
              </li>
            </ul>
          </div>
        </div>

        <h2>1. Why Good Auth UI Matters</h2>
        <p>
          Authentication is often the first thing users see in your app. A clean, simple 
          auth UI builds trust and makes users feel confident about using your app.
        </p>

        <div className="bg-green-50 dark:bg-green-950 p-6 rounded-lg border border-green-200 dark:border-green-800 mb-6">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-3 mt-0">
            ✅ Good Auth UI:
          </h4>
          <ul className="text-green-700 dark:text-green-300 text-sm space-y-1 mb-0">
            <li><strong>Simple</strong> - Clear forms without clutter</li>
            <li><strong>Helpful</strong> - Good validation messages</li>
            <li><strong>Responsive</strong> - Works on all screen sizes</li>
            <li><strong>Professional</strong> - Builds user confidence</li>
          </ul>
        </div>

        <h2>2. Basic Login Form</h2>
        <p>
          Let's start with a simple login form. We'll use the form knowledge from Day 3 
          to build a clean authentication interface.
        </p>

        <CodeBlock
          code={`import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    // Email validation
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!email.includes('@')) {
      newErrors.email = 'Please enter a valid email';
    }
    
    // Password validation
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      Alert.alert('Success', 'Logged in successfully!');
    } catch (error) {
      Alert.alert('Error', 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#f5f5f5' }}>
      <Text style={{ fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 40 }}>
        Welcome Back
      </Text>

      {/* Email Input */}
      <View style={{ marginBottom: 15 }}>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: errors.email ? 'red' : '#ddd',
            padding: 15,
            borderRadius: 8,
            backgroundColor: 'white',
            fontSize: 16,
          }}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {errors.email && (
          <Text style={{ color: 'red', fontSize: 12, marginTop: 5 }}>
            {errors.email}
          </Text>
        )}
      </View>

      {/* Password Input */}
      <View style={{ marginBottom: 30 }}>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: errors.password ? 'red' : '#ddd',
            padding: 15,
            borderRadius: 8,
            backgroundColor: 'white',
            fontSize: 16,
          }}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {errors.password && (
          <Text style={{ color: 'red', fontSize: 12, marginTop: 5 }}>
            {errors.password}
          </Text>
        )}
      </View>

      {/* Login Button */}
      <TouchableOpacity
        style={{
          backgroundColor: loading ? '#ccc' : '#007AFF',
          padding: 15,
          borderRadius: 8,
          alignItems: 'center',
          marginBottom: 20,
        }}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
          {loading ? 'Signing In...' : 'Sign In'}
        </Text>
      </TouchableOpacity>

      {/* Sign Up Link */}
      <TouchableOpacity onPress={() => Alert.alert('Info', 'Navigate to Sign Up')}>
        <Text style={{ textAlign: 'center', color: '#007AFF', fontSize: 16 }}>
          Don't have an account? Sign Up
        </Text>
      </TouchableOpacity>
    </View>
  );
}`}
          language="jsx"
          filename="LoginScreen.jsx"
          title="Simple Login Form"
        />

        <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg border border-blue-200 dark:border-blue-800 mb-6">
          <h4 className="text-blue-800 dark:text-blue-200 font-semibold mb-3 mt-0">
            🔧 Key Form Elements:
          </h4>
          <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1 mb-0">
            <li><strong>Controlled inputs</strong> - Email and password state</li>
            <li><strong>Validation</strong> - Check required fields and formats</li>
            <li><strong>Error display</strong> - Show helpful error messages</li>
            <li><strong>Loading states</strong> - Disable button during submission</li>
            <li><strong>Input types</strong> - Email keyboard and secure text entry</li>
          </ul>
        </div>

        <h2>3. Signup Form with Confirmation</h2>
        <p>
          Now let's create a signup form that includes password confirmation and 
          better validation feedback.
        </p>

        <CodeBlock
          code={`import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';

export default function SignupScreen() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!formData.email.includes('@')) {
      newErrors.email = 'Please enter a valid email';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    // Confirm password
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSignup = async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      Alert.alert('Success', 'Account created successfully!');
    } catch (error) {
      Alert.alert('Error', 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#f5f5f5' }}>
      <Text style={{ fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 40 }}>
        Create Account
      </Text>

      {/* Name Input */}
      <View style={{ marginBottom: 15 }}>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: errors.name ? 'red' : '#ddd',
            padding: 15,
            borderRadius: 8,
            backgroundColor: 'white',
            fontSize: 16,
          }}
          placeholder="Full Name"
          value={formData.name}
          onChangeText={(value) => updateField('name', value)}
        />
        {errors.name && <Text style={{ color: 'red', fontSize: 12, marginTop: 5 }}>{errors.name}</Text>}
      </View>

      {/* Email Input */}
      <View style={{ marginBottom: 15 }}>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: errors.email ? 'red' : '#ddd',
            padding: 15,
            borderRadius: 8,
            backgroundColor: 'white',
            fontSize: 16,
          }}
          placeholder="Email"
          value={formData.email}
          onChangeText={(value) => updateField('email', value)}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {errors.email && <Text style={{ color: 'red', fontSize: 12, marginTop: 5 }}>{errors.email}</Text>}
      </View>

      {/* Password Input */}
      <View style={{ marginBottom: 15 }}>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: errors.password ? 'red' : '#ddd',
            padding: 15,
            borderRadius: 8,
            backgroundColor: 'white',
            fontSize: 16,
          }}
          placeholder="Password"
          value={formData.password}
          onChangeText={(value) => updateField('password', value)}
          secureTextEntry
        />
        {errors.password && <Text style={{ color: 'red', fontSize: 12, marginTop: 5 }}>{errors.password}</Text>}
      </View>

      {/* Confirm Password Input */}
      <View style={{ marginBottom: 30 }}>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: errors.confirmPassword ? 'red' : '#ddd',
            padding: 15,
            borderRadius: 8,
            backgroundColor: 'white',
            fontSize: 16,
          }}
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChangeText={(value) => updateField('confirmPassword', value)}
          secureTextEntry
        />
        {errors.confirmPassword && <Text style={{ color: 'red', fontSize: 12, marginTop: 5 }}>{errors.confirmPassword}</Text>}
      </View>

      {/* Signup Button */}
      <TouchableOpacity
        style={{
          backgroundColor: loading ? '#ccc' : '#34C759',
          padding: 15,
          borderRadius: 8,
          alignItems: 'center',
          marginBottom: 20,
        }}
        onPress={handleSignup}
        disabled={loading}
      >
        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
          {loading ? 'Creating Account...' : 'Sign Up'}
        </Text>
      </TouchableOpacity>

      {/* Login Link */}
      <TouchableOpacity onPress={() => Alert.alert('Info', 'Navigate to Login')}>
        <Text style={{ textAlign: 'center', color: '#007AFF', fontSize: 16 }}>
          Already have an account? Sign In
        </Text>
      </TouchableOpacity>
    </View>
  );
}`}
          language="jsx"
          filename="SignupScreen.jsx"
          title="Signup Form with Validation"
        />

        <div className="bg-yellow-50 dark:bg-yellow-950 p-6 rounded-lg border border-yellow-200 dark:border-yellow-800 mb-6">
          <h4 className="text-yellow-800 dark:text-yellow-200 font-semibold mb-3 mt-0">
            💡 Validation Best Practices:
          </h4>
          <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1 mb-0">
            <li><strong>Real-time feedback</strong> - Clear errors as user types</li>
            <li><strong>Helpful messages</strong> - Tell users exactly what's wrong</li>
            <li><strong>Visual cues</strong> - Red borders for error fields</li>
            <li><strong>Password matching</strong> - Confirm password validation</li>
          </ul>
        </div>

        <h2>4. Essential Practice</h2>
        <p>
          Try building your own auth forms using these patterns. Focus on clean UI and helpful validation.
        </p>

        <div className="bg-orange-50 dark:bg-orange-950 p-6 rounded-lg border border-orange-200 dark:border-orange-800 mb-6">
          <h4 className="text-orange-800 dark:text-orange-200 font-semibold mb-3 mt-0">
            🎯 Quick Practice:
          </h4>
          <ul className="text-orange-700 dark:text-orange-300 text-sm space-y-1 mb-0">
            <li>• Create a login screen with email and password</li>
            <li>• Add proper validation with error messages</li>
            <li>• Include loading states for form submission</li>
            <li>• Test with different input combinations</li>
          </ul>
        </div>

        <h2>5. Session Summary</h2>

        <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
          <h4 className="text-blue-800 dark:text-blue-200 font-semibold mb-3 mt-0">
            📚 Auth UI Essentials:
          </h4>
          <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1 mb-0">
            <li><strong>Clean forms</strong> - Simple, focused input layouts</li>
            <li><strong>Input validation</strong> - Check required fields and formats</li>
            <li><strong>Error feedback</strong> - Show helpful validation messages</li>
            <li><strong>Loading states</strong> - Disable forms during submission</li>
            <li><strong>User experience</strong> - Clear navigation between login/signup</li>
          </ul>
        </div>
      </div>
    </>
  );
}