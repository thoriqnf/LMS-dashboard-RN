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
                <strong>KeyboardAvoidingView</strong> - Handle keyboard behavior professionally
              </li>
              <li>
                <strong>TouchableWithoutFeedback</strong> - Dismiss keyboard with tap
              </li>
              <li>
                <strong>Form Navigation</strong> - Smooth input-to-input transitions
              </li>
              <li>
                <strong>Input UX</strong> - Professional form patterns
              </li>
            </ul>
          </div>
        </div>

        <h2>1. Why Keyboard UX Matters</h2>
        <p>
          Great forms aren't just about validation—they're about creating smooth, 
          frustration-free experiences. The keyboard should enhance, not hinder user interaction.
        </p>

        <div className="bg-green-50 dark:bg-green-950 p-6 rounded-lg border border-green-200 dark:border-green-800 mb-6">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-3 mt-0">
            ✅ Good Keyboard UX:
          </h4>
          <ul className="text-green-700 dark:text-green-300 text-sm space-y-1 mb-0">
            <li><strong>Smart avoidance</strong> - Keyboard doesn't cover inputs</li>
            <li><strong>Easy dismissal</strong> - Tap outside to close keyboard</li>
            <li><strong>Smooth navigation</strong> - Return key moves to next input</li>
            <li><strong>Proper keyboard types</strong> - Email, number, phone keyboards</li>
          </ul>
        </div>

        <h2>2. Basic Keyboard Management</h2>
        <p>
          Let's solve the most common problem: the keyboard covering your inputs. 
          KeyboardAvoidingView and TouchableWithoutFeedback create professional experiences.
        </p>

        <CodeBlock
          code={`import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  SafeAreaView,
} from 'react-native';

export default function KeyboardForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notes, setNotes] = useState('');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1, padding: 20, justifyContent: 'flex-start' }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 30 }}>
              Sign In
            </Text>
            
            <View style={{ marginBottom: 15 }}>
              <Text style={{ fontSize: 16, marginBottom: 8 }}>Email</Text>
              <TextInput
                style={{ backgroundColor: 'white', borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12 }}
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={{ marginBottom: 15 }}>
              <Text style={{ fontSize: 16, marginBottom: 8 }}>Password</Text>
              <TextInput
                style={{ backgroundColor: 'white', borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12 }}
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                secureTextEntry
              />
            </View>

            <View style={{ marginBottom: 20 }}>
              <Text style={{ fontSize: 16, marginBottom: 8 }}>Notes</Text>
              <TextInput
                style={{ backgroundColor: 'white', borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, height: 80 }}
                value={notes}
                onChangeText={setNotes}
                placeholder="Add any notes..."
                multiline
                textAlignVertical="top"
              />
            </View>

            {/* Spacer pushes content up when keyboard appears */}
            <View style={{ flex: 1 }} />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}`}
          language="jsx"
          filename="KeyboardForm.jsx"
          title="Basic Keyboard Management"
        />

        <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg border border-blue-200 dark:border-blue-800 mb-6">
          <h4 className="text-blue-800 dark:text-blue-200 font-semibold mb-3 mt-0">
            🔧 Key Components:
          </h4>
          <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1 mb-0">
            <li><strong>KeyboardAvoidingView</strong> - Adjusts content when keyboard appears</li>
            <li><strong>TouchableWithoutFeedback</strong> - Tap outside inputs to dismiss keyboard</li>
            <li><strong>Platform behavior</strong> - iOS uses 'padding', Android uses 'height'</li>
            <li><strong>keyboardVerticalOffset</strong> - Account for navigation bars</li>
          </ul>
        </div>

        <h2>3. Smart Form Navigation</h2>
        <p>
          For better UX, let users navigate between inputs using the Return key. 
          This creates smooth, professional form interactions.
        </p>

        <CodeBlock
          code={`import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

export default function SmartForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  // Refs for input navigation
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps="handled">
            <View style={{ padding: 20 }}>
              <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 30 }}>
                Create Account
              </Text>

              <View style={{ marginBottom: 15 }}>
                <Text style={{ fontSize: 16, marginBottom: 8 }}>First Name</Text>
                <TextInput
                  style={{ backgroundColor: 'white', borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12 }}
                  value={formData.firstName}
                  onChangeText={(value) => updateField('firstName', value)}
                  placeholder="John"
                  returnKeyType="next"
                  onSubmitEditing={() => lastNameRef.current?.focus()}
                />
              </View>

              <View style={{ marginBottom: 15 }}>
                <Text style={{ fontSize: 16, marginBottom: 8 }}>Last Name</Text>
                <TextInput
                  ref={lastNameRef}
                  style={{ backgroundColor: 'white', borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12 }}
                  value={formData.lastName}
                  onChangeText={(value) => updateField('lastName', value)}
                  placeholder="Doe"
                  returnKeyType="next"
                  onSubmitEditing={() => emailRef.current?.focus()}
                />
              </View>

              <View style={{ marginBottom: 15 }}>
                <Text style={{ fontSize: 16, marginBottom: 8 }}>Email</Text>
                <TextInput
                  ref={emailRef}
                  style={{ backgroundColor: 'white', borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12 }}
                  value={formData.email}
                  onChangeText={(value) => updateField('email', value)}
                  placeholder="john.doe@example.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  returnKeyType="next"
                  onSubmitEditing={() => phoneRef.current?.focus()}
                />
              </View>

              <View style={{ marginBottom: 30 }}>
                <Text style={{ fontSize: 16, marginBottom: 8 }}>Phone</Text>
                <TextInput
                  ref={phoneRef}
                  style={{ backgroundColor: 'white', borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12 }}
                  value={formData.phone}
                  onChangeText={(value) => updateField('phone', value)}
                  placeholder="(555) 123-4567"
                  keyboardType="phone-pad"
                  returnKeyType="done"
                />
              </View>

              <TouchableOpacity
                style={{ backgroundColor: '#007AFF', padding: 15, borderRadius: 8, alignItems: 'center' }}
                onPress={() => console.log('Submit:', formData)}
              >
                <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
                  Create Account
                </Text>
              </TouchableOpacity>

              {/* Extra space for keyboard */}
              <View style={{ height: 50 }} />
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}`}
          language="jsx"
          filename="SmartForm.jsx"
          title="Smart Form Navigation"
        />

        <div className="bg-yellow-50 dark:bg-yellow-950 p-6 rounded-lg border border-yellow-200 dark:border-yellow-800 mb-6">
          <h4 className="text-yellow-800 dark:text-yellow-200 font-semibold mb-3 mt-0">
            🚀 Navigation Features:
          </h4>
          <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1 mb-0">
            <li><strong>Input chaining</strong> - Return key moves to next input</li>
            <li><strong>Ref management</strong> - Programmatic focus control</li>
            <li><strong>Keyboard types</strong> - Email, phone, number keyboards</li>
            <li><strong>keyboardShouldPersistTaps</strong> - Allows tapping other inputs</li>
          </ul>
        </div>

        <h2>4. Essential Practice</h2>
        <p>
          Try building your own keyboard-aware form using these patterns. 
          Focus on smooth navigation and professional user experience.
        </p>

        <div className="bg-orange-50 dark:bg-orange-950 p-6 rounded-lg border border-orange-200 dark:border-orange-800 mb-6">
          <h4 className="text-orange-800 dark:text-orange-200 font-semibold mb-3 mt-0">
            🎯 Quick Practice:
          </h4>
          <ul className="text-orange-700 dark:text-orange-300 text-sm space-y-1 mb-0">
            <li>• Create a form with KeyboardAvoidingView</li>
            <li>• Add tap-to-dismiss keyboard functionality</li>
            <li>• Implement Return key navigation between inputs</li>
            <li>• Use appropriate keyboard types for each field</li>
          </ul>
        </div>

        <h2>5. Best Practices</h2>

        <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border mb-6">
          <h4 className="font-semibold mb-3 mt-0">📱 Platform Differences:</h4>
          <div className="space-y-2 text-sm">
            <div><strong>iOS:</strong> Use 'padding' behavior, account for safe areas</div>
            <div><strong>Android:</strong> Use 'height' behavior, test with different keyboards</div>
            <div><strong>Both:</strong> Always test on real devices for best results</div>
          </div>
        </div>

        <h2>6. Session Summary</h2>

        <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
          <h4 className="text-blue-800 dark:text-blue-200 font-semibold mb-3 mt-0">
            📚 Keyboard UX Essentials:
          </h4>
          <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1 mb-0">
            <li><strong>KeyboardAvoidingView</strong> - Prevent keyboard from covering inputs</li>
            <li><strong>Tap to dismiss</strong> - TouchableWithoutFeedback for better UX</li>
            <li><strong>Smart navigation</strong> - Return key moves between inputs</li>
            <li><strong>Proper keyboards</strong> - Use email, phone, number types</li>
            <li><strong>Platform awareness</strong> - iOS and Android behave differently</li>
          </ul>
        </div>
      </div>
    </>
  );
}