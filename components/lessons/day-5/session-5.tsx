"use client";

import { CodeBlock } from "@/components/ui/code-block-new";

export function Day5Session5Content() {
  return (
    <>
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">
            Firebase Backend & Cloud Storage - Session 5
          </h1>

          <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg border border-blue-200 dark:border-blue-800 mb-8">
            <h3 className="text-blue-800 dark:text-blue-200 font-semibold mb-4 mt-0">
              🔥 Session Overview
            </h3>
            <ul className="text-blue-700 dark:text-blue-300 space-y-2 mb-0">
              <li>
                <strong>Firebase Project Setup</strong> - Create and configure a complete Firebase backend
              </li>
              <li>
                <strong>Cloud Storage</strong> - Upload photos from camera/gallery to Firebase Storage
              </li>
              <li>
                <strong>Firestore Database</strong> - Real-time data storage and synchronization
              </li>
              <li>
                <strong>Firebase Authentication</strong> - User login and secure data access
              </li>
            </ul>
          </div>
        </div>

        <h2>1. Why Firebase for Mobile Apps?</h2>
        <p>
          Firebase is Google's mobile and web development platform that provides a complete backend solution. 
          Unlike local storage or expo-notifications, Firebase offers production-ready cloud services that scale with your app.
        </p>

        <div className="bg-green-50 dark:bg-green-950 p-6 rounded-lg border border-green-200 dark:border-green-800 mb-6">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-3 mt-0">
            ✅ Firebase Advantages:
          </h4>
          <ul className="text-green-700 dark:text-green-300 text-sm space-y-1 mb-0">
            <li><strong>No SDK limitations</strong> - Works everywhere, unlike expo-notifications in SDK 53+</li>
            <li><strong>Real-time updates</strong> - Data syncs instantly across all devices</li>
            <li><strong>Cloud storage</strong> - Photos and files stored securely in the cloud</li>
            <li><strong>Built-in authentication</strong> - Professional user management system</li>
            <li><strong>Offline support</strong> - Apps work even without internet connection</li>
          </ul>
        </div>

        <h2>2. Firebase Project Setup</h2>
        <p>
          Let's create a Firebase project from scratch. This process sets up your cloud backend that will power your mobile app.
        </p>

        <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800 my-6">
          <h4 className="text-yellow-800 dark:text-yellow-200 font-semibold mb-2 mt-0">
            🌐 Step 1: Create Firebase Project
          </h4>
          <div className="text-yellow-700 dark:text-yellow-300 text-sm space-y-2">
            <div>1. Go to <strong>https://console.firebase.google.com</strong></div>
            <div>2. Click <strong>"Create a project"</strong> or <strong>"Add project"</strong></div>
            <div>3. Enter project name: <strong>"MyMobileApp"</strong> (or your choice)</div>
            <div>4. Enable Google Analytics (recommended)</div>
            <div>5. Click <strong>"Create project"</strong> and wait for setup</div>
          </div>
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800 my-6">
          <h4 className="text-yellow-800 dark:text-yellow-200 font-semibold mb-2 mt-0">
            📱 Step 2: Add Mobile App
          </h4>
          <div className="text-yellow-700 dark:text-yellow-300 text-sm space-y-2">
            <div>1. In your Firebase project, click <strong>"Add app"</strong></div>
            <div>2. Choose <strong>iOS</strong> and <strong>Android</strong> icons</div>
            <div>3. Package name: <strong>com.yourname.mymobileapp</strong></div>
            <div>4. Download <strong>google-services.json</strong> (Android) and <strong>GoogleService-Info.plist</strong> (iOS)</div>
            <div>5. Skip the SDK setup steps (we'll do this differently)</div>
          </div>
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800 my-6">
          <h4 className="text-yellow-800 dark:text-yellow-200 font-semibold mb-2 mt-0">
            🔧 Step 3: Enable Services
          </h4>
          <div className="text-yellow-700 dark:text-yellow-300 text-sm space-y-2">
            <div>1. Go to <strong>Authentication</strong> → <strong>Sign-in method</strong> → Enable <strong>Email/Password</strong></div>
            <div>2. Go to <strong>Firestore Database</strong> → <strong>Create database</strong> → Start in <strong>test mode</strong></div>
            <div>3. Go to <strong>Storage</strong> → <strong>Get started</strong> → Start in <strong>test mode</strong></div>
            <div>4. Your Firebase backend is now ready!</div>
          </div>
        </div>

        <h2>3. React Native Firebase Installation</h2>
        <p>
          Now let's install React Native Firebase in your Expo project. This provides native Firebase integration that works reliably.
        </p>

        <CodeBlock
          code={`# Install React Native Firebase core
npm install @react-native-firebase/app

# Install specific Firebase services
npm install @react-native-firebase/auth
npm install @react-native-firebase/firestore  
npm install @react-native-firebase/storage

# For Expo projects, also install config plugin
npx expo install expo-build-properties`}
          language="bash"
          filename="terminal"
          title="Firebase Installation"
        />

        <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800 my-6">
          <h4 className="text-blue-800 dark:text-blue-200 font-semibold mb-2 mt-0">
            📋 What Gets Installed
          </h4>
          <div className="text-blue-700 dark:text-blue-300 text-sm space-y-2">
            <div>• <strong>@react-native-firebase/app:</strong> Core Firebase functionality</div>
            <div>• <strong>@react-native-firebase/auth:</strong> User authentication (login/signup)</div>
            <div>• <strong>@react-native-firebase/firestore:</strong> Real-time database</div>
            <div>• <strong>@react-native-firebase/storage:</strong> File and photo uploads</div>
          </div>
        </div>

        <h2>4. Firebase Configuration</h2>
        <p>
          Configure your Expo app to connect to your Firebase project. This step links your mobile app to your cloud backend.
        </p>

        <CodeBlock
          code={`// app.config.js - Add Firebase configuration
export default {
  expo: {
    name: "My Mobile App",
    slug: "my-mobile-app",
    version: "1.0.0",
    platforms: ["ios", "android"],
    
    // Add Firebase plugin configuration
    plugins: [
      "@react-native-firebase/app",
      [
        "expo-build-properties",
        {
          ios: {
            useFrameworks: "static"
          }
        }
      ]
    ],
    
    // Add your Firebase config
    android: {
      googleServicesFile: "./google-services.json"
    },
    ios: {
      googleServicesFile: "./GoogleService-Info.plist"
    }
  }
};`}
          language="javascript"
          filename="app.config.js"
          title="Expo Firebase Configuration"
        />

        <div className="bg-red-50 dark:bg-red-950 p-4 rounded-lg border border-red-200 dark:border-red-800 my-6">
          <h4 className="text-red-800 dark:text-red-200 font-semibold mb-2 mt-0">
            🚨 Important Configuration Steps
          </h4>
          <div className="text-red-700 dark:text-red-300 text-sm space-y-2">
            <div>1. <strong>Place config files:</strong> Copy google-services.json and GoogleService-Info.plist to your project root</div>
            <div>2. <strong>Rebuild app:</strong> After configuration changes, run `expo run:ios` or `expo run:android`</div>
            <div>3. <strong>Development build required:</strong> Firebase requires custom development build, not Expo Go</div>
            <div>4. <strong>Test connection:</strong> We'll verify Firebase connection in the next examples</div>
          </div>
        </div>

        <h2>5. Firebase Authentication Setup</h2>
        <p>
          Let's implement user authentication with Firebase. This provides secure login/signup functionality for your app.
        </p>

        <CodeBlock
          code={`import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import auth from '@react-native-firebase/auth';

interface User {
  uid: string;
  email: string | null;
}

export default function FirebaseAuthExample(): JSX.Element {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState<string>('test@example.com');
  const [password, setPassword] = useState<string>('password123');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [initializing, setInitializing] = useState<boolean>(true);

  // Handle user state changes
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
        });
      } else {
        setUser(null);
      }
      
      if (initializing) setInitializing(false);
    });

    return unsubscribe; // Cleanup subscription
  }, [initializing]);

  const signUp = async (): Promise<void> => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }

    try {
      setIsLoading(true);
      await auth().createUserWithEmailAndPassword(email, password);
      Alert.alert('Success!', 'Account created successfully');
    } catch (error: any) {
      console.error('Signup error:', error);
      
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('Error', 'Email is already in use');
      } else if (error.code === 'auth/weak-password') {
        Alert.alert('Error', 'Password is too weak');
      } else if (error.code === 'auth/invalid-email') {
        Alert.alert('Error', 'Invalid email address');
      } else {
        Alert.alert('Error', 'Failed to create account');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (): Promise<void> => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }

    try {
      setIsLoading(true);
      await auth().signInWithEmailAndPassword(email, password);
      Alert.alert('Success!', 'Signed in successfully');
    } catch (error: any) {
      console.error('Signin error:', error);
      
      if (error.code === 'auth/user-not-found') {
        Alert.alert('Error', 'No account found with this email');
      } else if (error.code === 'auth/wrong-password') {
        Alert.alert('Error', 'Incorrect password');
      } else if (error.code === 'auth/invalid-email') {
        Alert.alert('Error', 'Invalid email address');
      } else {
        Alert.alert('Error', 'Failed to sign in');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      await auth().signOut();
      Alert.alert('Success!', 'Signed out successfully');
    } catch (error) {
      console.error('Signout error:', error);
      Alert.alert('Error', 'Failed to sign out');
    }
  };

  if (initializing) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>🔥 Connecting to Firebase...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (user) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Welcome!</Text>
          
          <View style={styles.userInfo}>
            <Text style={styles.userInfoTitle}>👤 User Information</Text>
            <Text style={styles.userInfoText}>
              <Text style={styles.label}>Email:</Text> {user.email}
            </Text>
            <Text style={styles.userInfoText}>
              <Text style={styles.label}>User ID:</Text> {user.uid.substring(0, 8)}...
            </Text>
          </View>

          <TouchableOpacity
            style={styles.signOutButton}
            onPress={signOut}
          >
            <Text style={styles.buttonText}>🚪 Sign Out</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>🔥 Firebase Auth</Text>
        <Text style={styles.subtitle}>Sign up or sign in to continue</Text>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
          
          <Text style={styles.label}>Password:</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            secureTextEntry
            autoCapitalize="none"
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.signInButton, isLoading && styles.buttonDisabled]}
            onPress={signIn}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? 'Signing In...' : '🔑 Sign In'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.signUpButton, isLoading && styles.buttonDisabled]}
            onPress={signUp}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? 'Creating Account...' : '✨ Create Account'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#666',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
  },
  inputContainer: {
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    marginBottom: 16,
  },
  buttonContainer: {
    gap: 12,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  signInButton: {
    backgroundColor: '#007AFF',
  },
  signUpButton: {
    backgroundColor: '#34C759',
  },
  signOutButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  userInfo: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginBottom: 30,
  },
  userInfoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  userInfoText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
});`}
          language="tsx"
          filename="FirebaseAuthExample.tsx"
          title="Complete Firebase Authentication"
        />

        <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg border border-green-200 dark:border-green-800 my-6">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-2 mt-0">
            🔐 Authentication Features
          </h4>
          <div className="text-green-700 dark:text-green-300 text-sm space-y-2">
            <div>• <strong>User state management</strong> - Automatic login state tracking</div>
            <div>• <strong>Email/password auth</strong> - Secure account creation and login</div>
            <div>• <strong>Error handling</strong> - User-friendly error messages</div>
            <div>• <strong>Persistent sessions</strong> - Users stay logged in between app opens</div>
          </div>
        </div>

        <h2>6. Firebase Storage for Photos</h2>
        <p>
          Now let's upload photos from your camera/gallery to Firebase Storage. This gives you unlimited cloud storage for user photos.
        </p>

        <CodeBlock
          code={`import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  ScrollView,
} from 'react-native';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import * as ImagePicker from 'expo-image-picker';

interface UploadedPhoto {
  url: string;
  name: string;
  uploadedAt: string;
}

export default function FirebaseStorageExample(): JSX.Element {
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [photos, setPhotos] = useState<UploadedPhoto[]>([]);

  const selectAndUploadPhoto = async (): Promise<void> => {
    // Request permission
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission needed', 'Please allow access to your photos');
      return;
    }

    // Check if user is logged in
    const currentUser = auth().currentUser;
    if (!currentUser) {
      Alert.alert('Authentication required', 'Please sign in first');
      return;
    }

    try {
      // Pick image
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (result.canceled) return;

      const imageUri = result.assets[0].uri;
      await uploadPhotoToFirebase(imageUri, currentUser.uid);
      
    } catch (error) {
      console.error('Image picker error:', error);
      Alert.alert('Error', 'Failed to select image');
    }
  };

  const uploadPhotoToFirebase = async (imageUri: string, userId: string): Promise<void> => {
    try {
      setUploading(true);
      setUploadProgress(0);

      // Create unique filename
      const filename = \`photo_\${Date.now()}.jpg\`;
      const reference = storage().ref(\`users/\${userId}/photos/\${filename}\`);

      // Upload file with progress tracking
      const uploadTask = reference.putFile(imageUri);

      // Monitor upload progress
      uploadTask.on('state_changed', (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(Math.round(progress));
        console.log(\`Upload progress: \${progress}%\`);
      });

      // Wait for upload to complete
      await uploadTask;

      // Get download URL
      const downloadURL = await reference.getDownloadURL();
      
      // Add to photos list
      const newPhoto: UploadedPhoto = {
        url: downloadURL,
        name: filename,
        uploadedAt: new Date().toLocaleString(),
      };
      
      setPhotos(prevPhotos => [newPhoto, ...prevPhotos]);
      
      Alert.alert('Success!', 'Photo uploaded to Firebase Storage');
      
    } catch (error) {
      console.error('Upload error:', error);
      Alert.alert('Error', 'Failed to upload photo');
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const takeCameraPhoto = async (): Promise<void> => {
    // Request camera permission
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission needed', 'Please allow camera access');
      return;
    }

    // Check authentication
    const currentUser = auth().currentUser;
    if (!currentUser) {
      Alert.alert('Authentication required', 'Please sign in first');
      return;
    }

    try {
      // Launch camera
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (result.canceled) return;

      const imageUri = result.assets[0].uri;
      await uploadPhotoToFirebase(imageUri, currentUser.uid);
      
    } catch (error) {
      console.error('Camera error:', error);
      Alert.alert('Error', 'Failed to take photo');
    }
  };

  const deletePhoto = async (photoUrl: string): Promise<void> => {
    try {
      // Get reference from URL
      const reference = storage().refFromURL(photoUrl);
      
      // Delete from Firebase Storage
      await reference.delete();
      
      // Remove from local state
      setPhotos(prevPhotos => 
        prevPhotos.filter(photo => photo.url !== photoUrl)
      );
      
      Alert.alert('Deleted!', 'Photo removed from cloud storage');
      
    } catch (error) {
      console.error('Delete error:', error);
      Alert.alert('Error', 'Failed to delete photo');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>🔥 Firebase Storage</Text>
        <Text style={styles.subtitle}>Upload photos to the cloud</Text>

        <View style={styles.buttonSection}>
          <TouchableOpacity
            style={[styles.button, styles.primaryButton, uploading && styles.buttonDisabled]}
            onPress={selectAndUploadPhoto}
            disabled={uploading}
          >
            <Text style={styles.buttonText}>
              {uploading ? \`Uploading \${uploadProgress}%\` : '📱 Choose from Gallery'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.secondaryButton, uploading && styles.buttonDisabled]}
            onPress={takeCameraPhoto}
            disabled={uploading}
          >
            <Text style={styles.buttonText}>
              {uploading ? \`Uploading \${uploadProgress}%\` : '📷 Take Photo'}
            </Text>
          </TouchableOpacity>
        </View>

        {uploading && (
          <View style={styles.progressContainer}>
            <Text style={styles.progressText}>Uploading to Firebase...</Text>
            <View style={styles.progressBar}>
              <View 
                style={[styles.progressFill, { width: \`\${uploadProgress}%\` }]} 
              />
            </View>
            <Text style={styles.progressPercent}>{uploadProgress}%</Text>
          </View>
        )}

        <View style={styles.photosSection}>
          <Text style={styles.sectionTitle}>
            📸 Your Photos ({photos.length})
          </Text>
          
          {photos.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>
                No photos uploaded yet. Take your first photo!
              </Text>
            </View>
          ) : (
            <View style={styles.photoGrid}>
              {photos.map((photo, index) => (
                <View key={index} style={styles.photoItem}>
                  <Image source={{ uri: photo.url }} style={styles.photoImage} />
                  <View style={styles.photoInfo}>
                    <Text style={styles.photoName}>{photo.name}</Text>
                    <Text style={styles.photoDate}>{photo.uploadedAt}</Text>
                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => deletePhoto(photo.url)}
                    >
                      <Text style={styles.deleteButtonText}>🗑️ Delete</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  buttonSection: {
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 20,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#007AFF',
  },
  secondaryButton: {
    backgroundColor: '#34C759',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  progressContainer: {
    backgroundColor: 'white',
    margin: 20,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  progressText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 12,
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 4,
  },
  progressPercent: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: 'bold',
  },
  photosSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  emptyState: {
    backgroundColor: 'white',
    padding: 40,
    borderRadius: 12,
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  photoGrid: {
    gap: 16,
  },
  photoItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  photoImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  photoInfo: {
    flex: 1,
  },
  photoName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  photoDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});`}
          language="tsx"
          filename="FirebaseStorageExample.tsx"
          title="Firebase Cloud Storage for Photos"
        />

        <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800 my-6">
          <h4 className="text-blue-800 dark:text-blue-200 font-semibold mb-2 mt-0">
            ☁️ Cloud Storage Features
          </h4>
          <div className="text-blue-700 dark:text-blue-300 text-sm space-y-2">
            <div>• <strong>Upload progress</strong> - Real-time progress tracking during uploads</div>
            <div>• <strong>Secure storage</strong> - Photos stored in user-specific folders</div>
            <div>• <strong>Auto URLs</strong> - Get shareable links for uploaded photos</div>
            <div>• <strong>Delete functionality</strong> - Remove photos from cloud storage</div>
          </div>
        </div>

        <h2>7. Firestore Real-time Database</h2>
        <p>
          Let's store app data in Firestore, Firebase's real-time database. Data syncs instantly across all devices and works offline too.
        </p>

        <CodeBlock
          code={`import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  StyleSheet,
  FlatList,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

interface Note {
  id: string;
  text: string;
  createdAt: Date;
  userId: string;
}

export default function FirestoreExample(): JSX.Element {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNoteText, setNewNoteText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  useEffect(() => {
    const currentUser = auth().currentUser;
    if (!currentUser) {
      Alert.alert('Authentication required', 'Please sign in first');
      return;
    }

    // Set up real-time listener for user's notes
    const unsubscribe = firestore()
      .collection('notes')
      .where('userId', '==', currentUser.uid)
      .orderBy('createdAt', 'desc')
      .onSnapshot(
        (querySnapshot) => {
          const notesData: Note[] = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            notesData.push({
              id: doc.id,
              text: data.text,
              createdAt: data.createdAt.toDate(),
              userId: data.userId,
            });
          });
          
          setNotes(notesData);
          setIsLoading(false);
          console.log(\`📊 Loaded \${notesData.length} notes from Firestore\`);
        },
        (error) => {
          console.error('Firestore error:', error);
          Alert.alert('Error', 'Failed to load notes');
          setIsLoading(false);
        }
      );

    // Cleanup listener when component unmounts
    return () => unsubscribe();
  }, []);

  const addNote = async (): Promise<void> => {
    if (!newNoteText.trim()) {
      Alert.alert('Error', 'Please enter some text');
      return;
    }

    const currentUser = auth().currentUser;
    if (!currentUser) {
      Alert.alert('Authentication required', 'Please sign in first');
      return;
    }

    try {
      setIsSaving(true);
      
      // Add new note to Firestore
      await firestore().collection('notes').add({
        text: newNoteText.trim(),
        createdAt: firestore.FieldValue.serverTimestamp(),
        userId: currentUser.uid,
      });

      setNewNoteText('');
      Alert.alert('Success!', 'Note saved to Firestore');
      
    } catch (error) {
      console.error('Add note error:', error);
      Alert.alert('Error', 'Failed to save note');
    } finally {
      setIsSaving(false);
    }
  };

  const deleteNote = async (noteId: string): Promise<void> => {
    try {
      await firestore().collection('notes').doc(noteId).delete();
      Alert.alert('Deleted!', 'Note removed from database');
    } catch (error) {
      console.error('Delete note error:', error);
      Alert.alert('Error', 'Failed to delete note');
    }
  };

  const updateNote = async (noteId: string, newText: string): Promise<void> => {
    try {
      await firestore().collection('notes').doc(noteId).update({
        text: newText,
        updatedAt: firestore.FieldValue.serverTimestamp(),
      });
      Alert.alert('Updated!', 'Note updated in database');
    } catch (error) {
      console.error('Update note error:', error);
      Alert.alert('Error', 'Failed to update note');
    }
  };

  const renderNote = ({ item }: { item: Note }) => (
    <View style={styles.noteItem}>
      <View style={styles.noteHeader}>
        <Text style={styles.noteDate}>
          {item.createdAt.toLocaleDateString()} at {item.createdAt.toLocaleTimeString()}
        </Text>
        <TouchableOpacity
          style={styles.deleteNoteButton}
          onPress={() => deleteNote(item.id)}
        >
          <Text style={styles.deleteNoteButtonText}>🗑️</Text>
        </TouchableOpacity>
      </View>
      
      <Text style={styles.noteText}>{item.text}</Text>
      
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => {
          Alert.prompt(
            'Edit Note',
            'Update your note:',
            [
              { text: 'Cancel', style: 'cancel' },
              {
                text: 'Update',
                onPress: (text) => {
                  if (text && text.trim()) {
                    updateNote(item.id, text.trim());
                  }
                },
              },
            ],
            'plain-text',
            item.text
          );
        }}
      >
        <Text style={styles.editButtonText}>✏️ Edit</Text>
      </TouchableOpacity>
    </View>
  );

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>🔥 Loading notes from Firestore...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>🔥 Firestore Database</Text>
        <Text style={styles.subtitle}>Real-time notes that sync everywhere</Text>

        <View style={styles.inputSection}>
          <TextInput
            style={styles.textInput}
            value={newNoteText}
            onChangeText={setNewNoteText}
            placeholder="Write your note here..."
            multiline
            numberOfLines={3}
          />
          
          <TouchableOpacity
            style={[styles.addButton, isSaving && styles.buttonDisabled]}
            onPress={addNote}
            disabled={isSaving}
          >
            <Text style={styles.addButtonText}>
              {isSaving ? '💾 Saving...' : '➕ Add Note'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.notesSection}>
          <Text style={styles.sectionTitle}>
            📝 Your Notes ({notes.length})
          </Text>
          
          {notes.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>
                No notes yet. Add your first note above!
              </Text>
            </View>
          ) : (
            <FlatList
              data={notes}
              renderItem={renderNote}
              keyExtractor={(item) => item.id}
              style={styles.notesList}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#666',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  inputSection: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    textAlignVertical: 'top',
    marginBottom: 16,
    minHeight: 80,
  },
  addButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  notesSection: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  emptyState: {
    backgroundColor: 'white',
    padding: 40,
    borderRadius: 12,
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  notesList: {
    flex: 1,
  },
  noteItem: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  noteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  noteDate: {
    fontSize: 12,
    color: '#999',
  },
  deleteNoteButton: {
    padding: 4,
  },
  deleteNoteButtonText: {
    fontSize: 16,
  },
  noteText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
    marginBottom: 12,
  },
  editButton: {
    backgroundColor: '#34C759',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  editButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});`}
          language="tsx"
          filename="FirestoreExample.tsx"
          title="Firestore Real-time Database"
        />

        <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg border border-purple-200 dark:border-purple-800 my-6">
          <h4 className="text-purple-800 dark:text-purple-200 font-semibold mb-2 mt-0">
            🗄️ Firestore Database Features
          </h4>
          <div className="text-purple-700 dark:text-purple-300 text-sm space-y-2">
            <div>• <strong>Real-time sync</strong> - Data updates instantly across all devices</div>
            <div>• <strong>Offline support</strong> - Works without internet, syncs when connected</div>
            <div>• <strong>User-specific data</strong> - Each user sees only their own notes</div>
            <div>• <strong>CRUD operations</strong> - Create, read, update, and delete data</div>
          </div>
        </div>

        <h2>8. Complete Firebase App Example</h2>
        <p>
          Let's combine everything - authentication, storage, and database - into one complete app.
        </p>

        <CodeBlock
          code={`import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  StyleSheet,
  ScrollView,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import * as ImagePicker from 'expo-image-picker';

interface UserProfile {
  name: string;
  email: string;
  photoCount: number;
  joinedAt: string;
}

export default function CompleteFirebaseApp(): JSX.Element {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        await loadUserProfile(user.uid);
      } else {
        setUser(null);
        setUserProfile(null);
      }
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  const loadUserProfile = async (userId: string): Promise<void> => {
    try {
      const userDoc = await firestore()
        .collection('userProfiles')
        .doc(userId)
        .get();

      if (userDoc.exists) {
        const data = userDoc.data();
        setUserProfile({
          name: data?.name || 'Unknown',
          email: data?.email || '',
          photoCount: data?.photoCount || 0,
          joinedAt: data?.joinedAt?.toDate().toLocaleDateString() || 'Unknown',
        });
      } else {
        // Create new user profile
        const newProfile = {
          name: user?.displayName || 'New User',
          email: user?.email || '',
          photoCount: 0,
          joinedAt: firestore.FieldValue.serverTimestamp(),
        };
        
        await firestore()
          .collection('userProfiles')
          .doc(userId)
          .set(newProfile);
      }
    } catch (error) {
      console.error('Profile load error:', error);
    }
  };

  const uploadPhotoAndUpdateProfile = async (): Promise<void> => {
    if (!user) return;

    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) return;

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.8,
      });

      if (result.canceled) return;

      // Upload to Firebase Storage
      const filename = \`photo_\${Date.now()}.jpg\`;
      const reference = storage().ref(\`users/\${user.uid}/photos/\${filename}\`);
      
      await reference.putFile(result.assets[0].uri);
      const downloadURL = await reference.getDownloadURL();

      // Update photo count in Firestore
      await firestore()
        .collection('userProfiles')
        .doc(user.uid)
        .update({
          photoCount: firestore.FieldValue.increment(1),
        });

      // Add photo record
      await firestore()
        .collection('photos')
        .add({
          userId: user.uid,
          url: downloadURL,
          filename: filename,
          uploadedAt: firestore.FieldValue.serverTimestamp(),
        });

      Alert.alert('Success!', 'Photo uploaded and profile updated');
      
      // Reload profile to get updated count
      await loadUserProfile(user.uid);
      
    } catch (error) {
      console.error('Upload error:', error);
      Alert.alert('Error', 'Failed to upload photo');
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      await auth().signOut();
    } catch (error) {
      Alert.alert('Error', 'Failed to sign out');
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>🔥 Loading Firebase App...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.authContainer}>
          <Text style={styles.title}>🔥 Complete Firebase App</Text>
          <Text style={styles.subtitle}>Please sign in to continue</Text>
          <Text style={styles.note}>
            Use the Authentication example above to sign in first
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>🔥 Firebase Dashboard</Text>
        
        {userProfile && (
          <View style={styles.profileCard}>
            <Text style={styles.profileTitle}>👤 Your Profile</Text>
            <Text style={styles.profileText}>
              <Text style={styles.label}>Name:</Text> {userProfile.name}
            </Text>
            <Text style={styles.profileText}>
              <Text style={styles.label}>Email:</Text> {userProfile.email}
            </Text>
            <Text style={styles.profileText}>
              <Text style={styles.label}>Photos:</Text> {userProfile.photoCount} uploaded
            </Text>
            <Text style={styles.profileText}>
              <Text style={styles.label}>Joined:</Text> {userProfile.joinedAt}
            </Text>
          </View>
        )}

        <View style={styles.featuresCard}>
          <Text style={styles.featuresTitle}>🚀 Firebase Features</Text>
          
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>🔐</Text>
            <View style={styles.featureContent}>
              <Text style={styles.featureName}>Authentication</Text>
              <Text style={styles.featureDescription}>
                Secure login system with user management
              </Text>
            </View>
            <Text style={styles.featureStatus}>✅</Text>
          </View>

          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>🗄️</Text>
            <View style={styles.featureContent}>
              <Text style={styles.featureName}>Firestore Database</Text>
              <Text style={styles.featureDescription}>
                Real-time data storage and synchronization
              </Text>
            </View>
            <Text style={styles.featureStatus}>✅</Text>
          </View>

          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>☁️</Text>
            <View style={styles.featureContent}>
              <Text style={styles.featureName}>Cloud Storage</Text>
              <Text style={styles.featureDescription}>
                Unlimited photo and file storage
              </Text>
            </View>
            <Text style={styles.featureStatus}>✅</Text>
          </View>
        </View>

        <View style={styles.actionSection}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={uploadPhotoAndUpdateProfile}
          >
            <Text style={styles.buttonText}>📸 Upload Photo & Update Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={signOut}
          >
            <Text style={styles.buttonText}>🚪 Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#666',
  },
  authContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  note: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  profileCard: {
    backgroundColor: 'white',
    margin: 20,
    padding: 20,
    borderRadius: 12,
  },
  profileTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  profileText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  label: {
    fontWeight: 'bold',
    color: '#333',
  },
  featuresCard: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 12,
  },
  featuresTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  featureIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
  },
  featureName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#666',
  },
  featureStatus: {
    fontSize: 16,
  },
  actionSection: {
    padding: 20,
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});`}
          language="tsx"
          filename="CompleteFirebaseApp.tsx"
          title="Complete Firebase Integration App"
        />

        <h2>9. Session Summary</h2>

        <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
          <h4 className="text-blue-800 dark:text-blue-200 font-semibold mb-3 mt-0">
            📚 What You Learned:
          </h4>
          <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1 mb-0">
            <li><strong>Firebase setup</strong> - Complete project configuration from scratch</li>
            <li><strong>Authentication</strong> - Secure user login and session management</li>
            <li><strong>Cloud Storage</strong> - Upload photos and files to Firebase Storage</li>
            <li><strong>Firestore Database</strong> - Real-time data storage and synchronization</li>
            <li><strong>Production skills</strong> - Industry-standard backend integration</li>
          </ul>
        </div>
        
        <div className="bg-green-50 dark:bg-green-950 p-6 rounded-lg border border-green-200 dark:border-green-800 mt-6">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-3 mt-0">
            🎯 Firebase vs Other Solutions
          </h4>
          <div className="text-green-700 dark:text-green-300 space-y-2">
            <div>
              <strong>✅ Firebase Benefits:</strong> No SDK limitations, real cloud backend, scales automatically
            </div>
            <div>
              <strong>❌ expo-notifications issues:</strong> SDK 53+ limitations, development build requirements
            </div>
            <div>
              <strong>🚀 Next level:</strong> You now have production-ready backend skills for mobile apps
            </div>
          </div>
        </div>

        <div className="bg-orange-50 dark:bg-orange-950 p-6 rounded-lg border border-orange-200 dark:border-orange-800 mt-6">
          <h4 className="text-orange-800 dark:text-orange-200 font-semibold mb-3 mt-0">
            🛠️ Development Setup Reminder
          </h4>
          <div className="text-orange-700 dark:text-orange-300 space-y-2">
            <div>
              <strong>Important:</strong> Firebase requires a development build, not Expo Go
            </div>
            <div>
              <strong>Setup required:</strong> Run `expo run:ios` or `expo run:android` after configuration
            </div>
            <div>
              <strong>Config files:</strong> Ensure google-services.json and GoogleService-Info.plist are in project root
            </div>
            <div>
              <strong>Testing:</strong> Use Firebase Console to verify data uploads and user authentication
            </div>
          </div>
        </div>
      </div>
    </>
  );
}