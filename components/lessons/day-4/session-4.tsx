"use client";

import { CodeBlock } from "@/components/ui/code-block-new";

export function Day4Session4Content() {
  return (
    <>
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">
            Keyboard & Input UX - Session 4
          </h1>

          <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg border border-blue-200 dark:border-blue-800 mb-8">
            <h3 className="text-blue-800 dark:text-blue-200 font-semibold mb-4 mt-0">
              ⌨️ Session Overview
            </h3>
            <ul className="text-blue-700 dark:text-blue-300 space-y-2 mb-0">
              <li>
                <strong>KeyboardAvoidingView & TouchableWithoutFeedback</strong> - Handle keyboard behavior professionally
              </li>
              <li>
                <strong>Long Forms & Scroll Management</strong> - Optimize forms with multiple sections and smooth scrolling
              </li>
              <li>
                <strong>Form Usability Best Practices</strong> - Implement professional input patterns and accessibility
              </li>
              <li>
                <strong>Performance & UX Optimization</strong> - Create smooth, responsive form interactions
              </li>
              <li>
                <strong>Professional Input System</strong> - Build production-ready input components
              </li>
              <li>
                <strong>Complete Registration Flow</strong> - Multi-step form with validation and persistence
              </li>
            </ul>
          </div>
        </div>

        <h2>1. Building Professional Input Experiences</h2>
        <p>
          Remember the auth forms from Session 1 and form handling from Day 3? Great forms aren't just about validation—they're about creating smooth, 
          frustration-free experiences. Let's transform basic forms into professional, keyboard-aware interfaces that users love.
        </p>

        <div className="grid md:grid-cols-2 gap-4 my-6">
          <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border">
            <h4 className="font-semibold mb-2 mt-0">😓 Common Form Problems:</h4>
            <div className="text-sm space-y-1">
              <div>• Keyboard covers input fields</div>
              <div>• No way to dismiss keyboard</div>
              <div>• Inputs not visible when focused</div>
              <div>• Poor scrolling experience</div>
              <div>• Awkward navigation between fields</div>
            </div>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-900 rounded-lg border">
            <h4 className="font-semibold mb-2 mt-0">✨ Professional Solutions:</h4>
            <div className="text-sm space-y-1">
              <div>• Smart keyboard avoidance</div>
              <div>• Tap-to-dismiss functionality</div>
              <div>• Auto-scroll to focused inputs</div>
              <div>• Smooth form navigation</div>
              <div>• Accessible input patterns</div>
            </div>
          </div>
        </div>

        <h2>2. Example 1: Basic Keyboard Management</h2>
        <p>
          Let's start by solving the most common problem: the keyboard covering your inputs. We'll use KeyboardAvoidingView 
          and TouchableWithoutFeedback to create a professional keyboard experience.
        </p>

        <CodeBlock
          code={`import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  SafeAreaView,
} from 'react-native';

export default function KeyboardBasics() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notes, setNotes] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <Text style={styles.title}>Sign In</Text>
            
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                secureTextEntry
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Notes (optional)</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={notes}
                onChangeText={setNotes}
                placeholder="Add any notes..."
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>

            {/* This view pushes content up when keyboard appears */}
            <View style={styles.spacer} />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  keyboardContainer: {
    flex: 1,
  },
  inner: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
  },
  textArea: {
    height: 100,
    paddingTop: 12,
  },
  spacer: {
    flex: 1,
  },
});`}
          language="jsx"
          filename="KeyboardBasics.jsx"
          title="Professional Keyboard Handling"
        />

        <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800 my-6">
          <h4 className="text-yellow-800 dark:text-yellow-200 font-semibold mb-2 mt-0">
            🔧 Key Components Explained
          </h4>
          <div className="text-yellow-700 dark:text-yellow-300 text-sm space-y-2">
            <div><strong>KeyboardAvoidingView:</strong> Automatically adjusts content when keyboard appears</div>
            <div><strong>TouchableWithoutFeedback:</strong> Allows users to tap outside inputs to dismiss keyboard</div>
            <div><strong>Platform-specific behavior:</strong> iOS uses 'padding', Android uses 'height'</div>
            <div><strong>keyboardVerticalOffset:</strong> Accounts for navigation bars and safe areas</div>
          </div>
        </div>

        <h2>3. Example 2: Advanced Form UX with ScrollView</h2>
        <p>
          For longer forms, we need intelligent scrolling that automatically brings focused inputs into view. 
          Let's create a registration form that handles multiple sections smoothly.
        </p>

        <CodeBlock
          code={`import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

export default function AdvancedFormUX() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    bio: '',
  });

  const scrollViewRef = useRef(null);
  const inputRefs = useRef({});

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Automatically scroll to input when focused
  const handleInputFocus = (inputName, yOffset = 0) => {
    setTimeout(() => {
      scrollViewRef.current?.scrollTo({
        y: yOffset,
        animated: true,
      });
    }, 100);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <Text style={styles.title}>Create Account</Text>
            
            <ScrollView
              ref={scrollViewRef}
              style={styles.scrollView}
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              {/* Personal Information Section */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Personal Information</Text>
                
                <View style={styles.row}>
                  <View style={styles.halfInput}>
                    <Text style={styles.label}>First Name</Text>
                    <TextInput
                      ref={ref => inputRefs.current.firstName = ref}
                      style={styles.input}
                      value={formData.firstName}
                      onChangeText={(value) => updateField('firstName', value)}
                      placeholder="John"
                      autoCapitalize="words"
                      onFocus={() => handleInputFocus('firstName', 0)}
                      returnKeyType="next"
                      onSubmitEditing={() => inputRefs.current.lastName?.focus()}
                    />
                  </View>
                  
                  <View style={styles.halfInput}>
                    <Text style={styles.label}>Last Name</Text>
                    <TextInput
                      ref={ref => inputRefs.current.lastName = ref}
                      style={styles.input}
                      value={formData.lastName}
                      onChangeText={(value) => updateField('lastName', value)}
                      placeholder="Doe"
                      autoCapitalize="words"
                      onFocus={() => handleInputFocus('lastName', 0)}
                      returnKeyType="next"
                      onSubmitEditing={() => inputRefs.current.email?.focus()}
                    />
                  </View>
                </View>

                <FormInput
                  ref={ref => inputRefs.current.email = ref}
                  label="Email Address"
                  value={formData.email}
                  onChangeText={(value) => updateField('email', value)}
                  placeholder="john.doe@example.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onFocus={() => handleInputFocus('email', 100)}
                  returnKeyType="next"
                  onSubmitEditing={() => inputRefs.current.phone?.focus()}
                />

                <FormInput
                  ref={ref => inputRefs.current.phone = ref}
                  label="Phone Number"
                  value={formData.phone}
                  onChangeText={(value) => updateField('phone', value)}
                  placeholder="(555) 123-4567"
                  keyboardType="phone-pad"
                  onFocus={() => handleInputFocus('phone', 180)}
                  returnKeyType="next"
                  onSubmitEditing={() => inputRefs.current.address?.focus()}
                />
              </View>

              {/* Address Section */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Address</Text>
                
                <FormInput
                  ref={ref => inputRefs.current.address = ref}
                  label="Street Address"
                  value={formData.address}
                  onChangeText={(value) => updateField('address', value)}
                  placeholder="123 Main St"
                  onFocus={() => handleInputFocus('address', 320)}
                  returnKeyType="next"
                  onSubmitEditing={() => inputRefs.current.city?.focus()}
                />

                <View style={styles.row}>
                  <View style={[styles.halfInput, { marginRight: 10 }]}>
                    <Text style={styles.label}>City</Text>
                    <TextInput
                      ref={ref => inputRefs.current.city = ref}
                      style={styles.input}
                      value={formData.city}
                      onChangeText={(value) => updateField('city', value)}
                      placeholder="New York"
                      autoCapitalize="words"
                      onFocus={() => handleInputFocus('city', 420)}
                      returnKeyType="next"
                      onSubmitEditing={() => inputRefs.current.zipCode?.focus()}
                    />
                  </View>
                  
                  <View style={styles.halfInput}>
                    <Text style={styles.label}>ZIP Code</Text>
                    <TextInput
                      ref={ref => inputRefs.current.zipCode = ref}
                      style={styles.input}
                      value={formData.zipCode}
                      onChangeText={(value) => updateField('zipCode', value)}
                      placeholder="10001"
                      keyboardType="numeric"
                      onFocus={() => handleInputFocus('zipCode', 420)}
                      returnKeyType="next"
                      onSubmitEditing={() => inputRefs.current.bio?.focus()}
                    />
                  </View>
                </View>
              </View>

              {/* Bio Section */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>About You</Text>
                
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Bio (Optional)</Text>
                  <TextInput
                    ref={ref => inputRefs.current.bio = ref}
                    style={[styles.input, styles.textArea]}
                    value={formData.bio}
                    onChangeText={(value) => updateField('bio', value)}
                    placeholder="Tell us about yourself..."
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                    onFocus={() => handleInputFocus('bio', 550)}
                    returnKeyType="done"
                  />
                </View>
              </View>

              <TouchableOpacity style={styles.submitButton}>
                <Text style={styles.submitButtonText}>Create Account</Text>
              </TouchableOpacity>

              {/* Extra space for keyboard */}
              <View style={{ height: 100 }} />
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// Reusable Form Input Component
const FormInput = React.forwardRef(({
  label,
  style,
  onFocus,
  ...props
}, ref) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      ref={ref}
      style={[styles.input, style]}
      onFocus={onFocus}
      {...props}
    />
  </View>
));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  keyboardContainer: {
    flex: 1,
  },
  inner: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 20,
    color: '#333',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    backgroundColor: '#f8f8f8',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
  },
  textArea: {
    height: 100,
    paddingTop: 12,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});`}
          language="jsx"
          filename="AdvancedFormUX.jsx"
          title="Long Form with Smart Scrolling"
        />

        <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg border border-green-200 dark:border-green-800 my-6">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-2 mt-0">
            🚀 Advanced UX Features
          </h4>
          <div className="text-green-700 dark:text-green-300 text-sm space-y-2">
            <div><strong>Smart Scrolling:</strong> Automatically scrolls to focused inputs with custom offsets</div>
            <div><strong>Input Chaining:</strong> Return key navigates to next input smoothly</div>
            <div><strong>Sectioned Layout:</strong> Organizes long forms into digestible sections</div>
            <div><strong>keyboardShouldPersistTaps:</strong> Allows tapping other inputs without dismissing keyboard</div>
            <div><strong>Ref Management:</strong> Programmatic focus control for better UX</div>
          </div>
        </div>

        <h2>4. Example 3: Professional Input Patterns with Accessibility</h2>
        <p>
          Let's create a production-ready input system with accessibility features, validation feedback, 
          and smooth animations that work great with keyboards and screen readers.
        </p>

        <CodeBlock
          code={`import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Animated,
  AccessibilityInfo,
} from 'react-native';

export default function ProfessionalInputSystem() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  const [errors, setErrors] = useState({});
  const [focusedInput, setFocusedInput] = useState(null);
  const scrollViewRef = useRef(null);
  const inputRefs = useRef({});

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Form is valid
      console.log('Form submitted:', formData);
    } else {
      // Focus first error field and announce error
      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField && inputRefs.current[firstErrorField]) {
        inputRefs.current[firstErrorField].focus();
        AccessibilityInfo.announceForAccessibility(
          \`Error in \${firstErrorField}: \${errors[firstErrorField]}\`
        );
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <Text style={styles.title}>Professional Sign Up</Text>
            
            <ScrollView
              ref={scrollViewRef}
              style={styles.scrollView}
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              <AccessibleInput
                ref={ref => inputRefs.current.email = ref}
                label="Email Address"
                value={formData.email}
                onChangeText={(value) => updateField('email', value)}
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                error={errors.email}
                focused={focusedInput === 'email'}
                onFocus={() => setFocusedInput('email')}
                onBlur={() => setFocusedInput(null)}
                returnKeyType="next"
                onSubmitEditing={() => inputRefs.current.password?.focus()}
                accessibilityLabel="Email address"
                accessibilityHint="Enter your email address for account creation"
              />

              <AccessibleInput
                ref={ref => inputRefs.current.password = ref}
                label="Password"
                value={formData.password}
                onChangeText={(value) => updateField('password', value)}
                placeholder="Enter your password"
                secureTextEntry
                error={errors.password}
                focused={focusedInput === 'password'}
                onFocus={() => setFocusedInput('password')}
                onBlur={() => setFocusedInput(null)}
                returnKeyType="next"
                onSubmitEditing={() => inputRefs.current.confirmPassword?.focus()}
                accessibilityLabel="Password"
                accessibilityHint="Enter a password with at least 8 characters"
              />

              <AccessibleInput
                ref={ref => inputRefs.current.confirmPassword = ref}
                label="Confirm Password"
                value={formData.confirmPassword}
                onChangeText={(value) => updateField('confirmPassword', value)}
                placeholder="Confirm your password"
                secureTextEntry
                error={errors.confirmPassword}
                focused={focusedInput === 'confirmPassword'}
                onFocus={() => setFocusedInput('confirmPassword')}
                onBlur={() => setFocusedInput(null)}
                returnKeyType="done"
                onSubmitEditing={handleSubmit}
                accessibilityLabel="Confirm password"
                accessibilityHint="Re-enter your password to confirm"
              />

              <TouchableOpacity 
                style={styles.submitButton}
                onPress={handleSubmit}
                accessibilityRole="button"
                accessibilityLabel="Create account"
                accessibilityHint="Tap to create your account with the provided information"
              >
                <Text style={styles.submitButtonText}>Create Account</Text>
              </TouchableOpacity>

              <View style={{ height: 50 }} />
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// Professional Accessible Input Component
const AccessibleInput = React.forwardRef(({
  label,
  error,
  focused,
  style,
  ...props
}, ref) => {
  const borderAnimation = useRef(new Animated.Value(0)).current;
  const errorAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(borderAnimation, {
      toValue: focused ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [focused]);

  useEffect(() => {
    Animated.timing(errorAnimation, {
      toValue: error ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [error]);

  const borderColor = borderAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['#ddd', '#007AFF'],
  });

  const errorHeight = errorAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 20],
  });

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <Animated.View style={[styles.inputWrapper, { borderColor }]}>
        <TextInput
          ref={ref}
          style={[styles.input, style]}
          accessible={true}
          accessibilityState={{ 
            selected: focused,
            invalid: !!error 
          }}
          {...props}
        />
      </Animated.View>
      
      <Animated.View style={[styles.errorContainer, { height: errorHeight }]}>
        {error && (
          <Text 
            style={styles.errorText}
            accessibilityRole="alert"
            accessibilityLiveRegion="polite"
          >
            {error}
          </Text>
        )}
      </Animated.View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  keyboardContainer: {
    flex: 1,
  },
  inner: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 20,
    color: '#333',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  inputContainer: {
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  inputWrapper: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderRadius: 8,
    overflow: 'hidden',
  },
  input: {
    padding: 12,
    fontSize: 16,
    color: '#333',
    minHeight: 48, // Accessibility minimum touch target
  },
  errorContainer: {
    overflow: 'hidden',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 14,
    marginTop: 4,
    marginLeft: 4,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 30,
    minHeight: 48, // Accessibility minimum touch target
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});`}
          language="jsx"
          filename="ProfessionalInputSystem.jsx"
          title="Production-Ready Input System"
        />

        <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg border border-purple-200 dark:border-purple-800 my-6">
          <h4 className="text-purple-800 dark:text-purple-200 font-semibold mb-2 mt-0">
            ♿ Accessibility Excellence
          </h4>
          <div className="text-purple-700 dark:text-purple-300 text-sm space-y-2">
            <div><strong>Screen Reader Support:</strong> Proper labels, hints, and state announcements</div>
            <div><strong>Touch Targets:</strong> Minimum 48px height for easy interaction</div>
            <div><strong>Error Announcements:</strong> Automatic error reading for screen readers</div>
            <div><strong>Focus Management:</strong> Logical tab order and focus indicators</div>
            <div><strong>State Communication:</strong> Clear indication of input states and validation</div>
          </div>
        </div>

        <h2>5. Hands-On Exercise: Complete Registration Flow</h2>
        <p>
          Now it's your turn! Create a comprehensive registration form that combines all the techniques we've learned. 
          Build a multi-step form with professional keyboard handling, validation, and accessibility.
        </p>

        <div className="bg-orange-50 dark:bg-orange-950 p-6 rounded-lg border border-orange-200 dark:border-orange-800 my-6">
          <h4 className="text-orange-800 dark:text-orange-200 font-semibold mb-3 mt-0">
            🎯 Exercise: Professional Registration Form
          </h4>
          <div className="text-orange-700 dark:text-orange-300 space-y-3">
            <div>
              <strong>Requirements:</strong>
              <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                <li>Multi-step form (Personal Info → Preferences → Review)</li>
                <li>Smart keyboard avoidance with smooth scrolling</li>
                <li>Real-time validation with accessible error messages</li>
                <li>Progress indicator showing current step</li>
                <li>Smooth transitions between steps</li>
                <li>Touch-to-dismiss keyboard functionality</li>
              </ul>
            </div>
            
            <div>
              <strong>Bonus Features:</strong>
              <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                <li>Auto-format phone numbers as user types</li>
                <li>Email validation with suggestions (e.g., "Did you mean gmail.com?")</li>
                <li>Password strength indicator</li>
                <li>Form data persistence across app restarts</li>
              </ul>
            </div>
          </div>
        </div>

        <CodeBlock
          code={`// Starter template for your registration form
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  SafeAreaView,
} from 'react-native';

export default function RegistrationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Personal Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    
    // Step 2: Preferences
    notifications: true,
    newsletter: false,
    theme: 'light',
    
    // Step 3: Security
    password: '',
    confirmPassword: '',
  });

  const scrollViewRef = useRef(null);
  const [errors, setErrors] = useState({});

  const renderStepIndicator = () => {
    // TODO: Create a progress indicator
  };

  const renderPersonalInfo = () => {
    // TODO: Implement step 1 with name, email, phone
  };

  const renderPreferences = () => {
    // TODO: Implement step 2 with user preferences
  };

  const renderSecurity = () => {
    // TODO: Implement step 3 with password setup
  };

  const renderReview = () => {
    // TODO: Implement step 4 with form review
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        {renderStepIndicator()}
        
        <ScrollView
          ref={scrollViewRef}
          style={styles.scrollView}
          keyboardShouldPersistTaps="handled"
        >
          {currentStep === 1 && renderPersonalInfo()}
          {currentStep === 2 && renderPreferences()}
          {currentStep === 3 && renderSecurity()}
          {currentStep === 4 && renderReview()}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  // Add your custom styles here
});`}
          language="jsx"
          filename="RegistrationFormExercise.jsx"
          title="Exercise Starter Template"
        />

        <h2>6. Best Practices & Performance Tips</h2>

        <div className="grid md:grid-cols-2 gap-4 my-6">
          <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg border">
            <h4 className="font-semibold mb-3 mt-0">⚡ Performance Optimization</h4>
            <div className="text-sm space-y-2">
              <div>• Use TextInput refs instead of finding by ID</div>
              <div>• Implement lazy loading for long forms</div>
              <div>• Debounce validation functions</div>
              <div>• Optimize scroll performance with getItemLayout</div>
              <div>• Cache form data to reduce re-renders</div>
            </div>
          </div>
          
          <div className="p-4 bg-green-50 dark:bg-green-900 rounded-lg border">
            <h4 className="font-semibold mb-3 mt-0">🎨 UX Excellence</h4>
            <div className="text-sm space-y-2">
              <div>• Provide immediate feedback on interactions</div>
              <div>• Use appropriate keyboard types for each input</div>
              <div>• Implement smart auto-complete suggestions</div>
              <div>• Add helpful placeholder text and examples</div>
              <div>• Create smooth focus transitions</div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border my-6">
          <h4 className="font-semibold mb-3 mt-0">📱 Platform-Specific Considerations</h4>
          <div className="space-y-4">
            <div>
              <strong className="text-blue-600">iOS Specifics:</strong>
              <div className="text-sm mt-1 space-y-1">
                <div>• Use 'padding' behavior for KeyboardAvoidingView</div>
                <div>• Account for safe area and navigation bar heights</div>
                <div>• Implement smooth keyboard animations</div>
                <div>• Support Dynamic Type for text scaling</div>
              </div>
            </div>
            
            <div>
              <strong className="text-green-600">Android Specifics:</strong>
              <div className="text-sm mt-1 space-y-1">
                <div>• Use 'height' behavior for KeyboardAvoidingView</div>
                <div>• Handle different keyboard types and sizes</div>
                <div>• Test with gesture navigation and button navigation</div>
                <div>• Consider windowSoftInputMode in android manifest</div>
              </div>
            </div>
          </div>
        </div>

        <h2>7. Key Takeaways</h2>
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 p-6 rounded-lg border border-blue-200 dark:border-blue-800 my-6">
          <ul className="space-y-2 mb-0 text-blue-800 dark:text-blue-200">
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span><strong>KeyboardAvoidingView</strong> is essential for professional forms, but requires platform-specific configuration</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span><strong>TouchableWithoutFeedback</strong> provides intuitive keyboard dismissal for better UX</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span><strong>Smart scrolling</strong> with refs and automatic positioning creates seamless form interactions</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span><strong>Accessibility features</strong> make your app inclusive and provide better UX for all users</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span><strong>Performance optimization</strong> ensures smooth interactions even with complex forms</span>
            </li>
          </ul>
        </div>

        <div className="bg-green-50 dark:bg-green-950 p-6 rounded-lg border border-green-200 dark:border-green-800">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-3 mt-0">
            🎉 Session 4 Complete!
          </h4>
          <p className="text-green-700 dark:text-green-300 mb-3">
            You've mastered professional keyboard handling, form optimization, and accessibility patterns. 
            These skills enable you to create smooth, frustration-free user experiences.
          </p>
          <p className="text-green-700 dark:text-green-300 mb-0">
            <strong>Next:</strong> Day 4 Challenge will combine all authentication concepts 
            into a comprehensive project with advanced features and real-world patterns.
          </p>
        </div>
      </div>
    </>
  );
}