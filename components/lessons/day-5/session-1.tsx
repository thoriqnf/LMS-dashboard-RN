"use client";

import { CodeBlock } from "@/components/ui/code-block-new";

export function Day5Session1Content() {
  return (
    <>
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">
            Media Picker - Session 1
          </h1>

          <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg border border-blue-200 dark:border-blue-800 mb-8">
            <h3 className="text-blue-800 dark:text-blue-200 font-semibold mb-4 mt-0">
              📸 Session Overview
            </h3>
            <ul className="text-blue-700 dark:text-blue-300 space-y-2 mb-0">
              <li>
                <strong>expo-image-picker Installation</strong> - Set up and configure image picker functionality
              </li>
              <li>
                <strong>Camera & Gallery Permissions</strong> - Handle native permissions professionally
              </li>
              <li>
                <strong>Image Selection & Preview</strong> - Allow users to pick and preview images seamlessly
              </li>
              <li>
                <strong>Image Storage & Management</strong> - Store, display, and manage selected images effectively
              </li>
            </ul>
          </div>
        </div>

        <h2>1. Building Professional Image Experiences</h2>
        <p>
          Every modern mobile app needs image functionality—profile photos, document uploads, social sharing. 
          Let's build professional image picker experiences that handle permissions gracefully, provide smooth UX, 
          and work reliably across iOS and Android platforms.
        </p>

        <div className="grid md:grid-cols-2 gap-4 my-6">
          <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border">
            <h4 className="font-semibold mb-2 mt-0">📱 What We'll Build:</h4>
            <div className="text-sm space-y-1">
              <div>• Professional image picker interface</div>
              <div>• Camera and gallery access</div>
              <div>• Image preview and management</div>
              <div>• Permission handling and errors</div>
              <div>• Cross-platform compatibility</div>
            </div>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-900 rounded-lg border">
            <h4 className="font-semibold mb-2 mt-0">🚀 Key Features:</h4>
            <div className="text-sm space-y-1">
              <div>• Camera and gallery options</div>
              <div>• Image compression and resizing</div>
              <div>• Multiple image selection</div>
              <div>• Error handling and fallbacks</div>
              <div>• Accessibility support</div>
            </div>
          </div>
        </div>

        <h2>2. Setting Up expo-image-picker</h2>
        <p>
          First, let's install and configure expo-image-picker. This powerful library handles all the complexity 
          of native image picking while providing a simple JavaScript API.
        </p>

        <CodeBlock
          code={`# Install expo-image-picker
npx expo install expo-image-picker

# For development builds, you may also need:
npx expo install expo-media-library`}
          language="bash"
          filename="terminal"
          title="Installation"
        />

        <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800 my-6">
          <h4 className="text-yellow-800 dark:text-yellow-200 font-semibold mb-2 mt-0">
            📱 App Configuration
          </h4>
          <p className="text-yellow-700 dark:text-yellow-300 text-sm mb-2">
            Add permissions to your app.json or app.config.js for production builds:
          </p>
          <CodeBlock
            code={`{
  "expo": {
    "plugins": [
      [
        "expo-image-picker",
        {
          "photosPermission": "The app accesses your photos to let you share them.",
          "cameraPermission": "The app accesses your camera to let you take photos."
        }
      ]
    ]
  }
}`}
            language="json"
            filename="app.json"
            title="Permission Configuration"
          />
        </div>

        <h2>3. Example 1: Basic Image Picker</h2>
        <p>
          Let's start with a simple image picker that allows users to choose between camera and gallery, 
          handles permissions automatically, and displays the selected image.
        </p>

        <CodeBlock
          code={`import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function BasicImagePicker() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Request permissions and pick image from camera
  const pickImageFromCamera = async () => {
    try {
      setIsLoading(true);
      
      // Request camera permissions
      const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
      
      if (!cameraPermission.granted) {
        Alert.alert(
          'Permission Required',
          'Camera access is needed to take photos.',
          [{ text: 'OK' }]
        );
        return;
      }

      // Launch camera
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets[0]) {
        setSelectedImage(result.assets[0]);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to take photo. Please try again.');
      console.error('Camera error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Request permissions and pick image from gallery
  const pickImageFromGallery = async () => {
    try {
      setIsLoading(true);
      
      // Request media library permissions
      const libraryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (!libraryPermission.granted) {
        Alert.alert(
          'Permission Required',
          'Photo library access is needed to select images.',
          [{ text: 'OK' }]
        );
        return;
      }

      // Launch image library
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets[0]) {
        setSelectedImage(result.assets[0]);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to select image. Please try again.');
      console.error('Gallery error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Show action sheet for image source selection
  const showImagePicker = () => {
    Alert.alert(
      'Select Image',
      'Choose how you want to select an image',
      [
        { text: 'Camera', onPress: pickImageFromCamera },
        { text: 'Gallery', onPress: pickImageFromGallery },
        { text: 'Cancel', style: 'cancel' },
      ],
      { cancelable: true }
    );
  };

  const removeImage = () => {
    Alert.alert(
      'Remove Image',
      'Are you sure you want to remove this image?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Remove', style: 'destructive', onPress: () => setSelectedImage(null) },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Profile Photo</Text>
        
        <View style={styles.imageContainer}>
          {selectedImage ? (
            <View style={styles.imageWrapper}>
              <Image source={{ uri: selectedImage.uri }} style={styles.image} />
              <TouchableOpacity 
                style={styles.removeButton}
                onPress={removeImage}
                accessibilityLabel="Remove image"
              >
                <Text style={styles.removeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.placeholderContainer}>
              <Text style={styles.placeholderIcon}>📷</Text>
              <Text style={styles.placeholderText}>No image selected</Text>
            </View>
          )}
        </View>

        <TouchableOpacity
          style={[styles.button, isLoading && styles.buttonDisabled]}
          onPress={showImagePicker}
          disabled={isLoading}
          accessibilityLabel={selectedImage ? "Change image" : "Select image"}
        >
          <Text style={styles.buttonText}>
            {isLoading ? 'Loading...' : selectedImage ? 'Change Image' : 'Select Image'}
          </Text>
        </TouchableOpacity>

        {selectedImage && (
          <View style={styles.imageInfo}>
            <Text style={styles.infoTitle}>Image Details:</Text>
            <Text style={styles.infoText}>Width: {selectedImage.width}px</Text>
            <Text style={styles.infoText}>Height: {selectedImage.height}px</Text>
            <Text style={styles.infoText}>
              Size: {selectedImage.fileSize ? \`\${(selectedImage.fileSize / 1024 / 1024).toFixed(2)} MB\` : 'Unknown'}
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
    textAlign: 'center',
  },
  imageContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  imageWrapper: {
    position: 'relative',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#ddd',
  },
  removeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255, 0, 0, 0.8)',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  placeholderContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ccc',
    borderStyle: 'dashed',
  },
  placeholderIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  placeholderText: {
    color: '#666',
    fontSize: 16,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    marginBottom: 20,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  imageInfo: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
});`}
          language="jsx"
          filename="BasicImagePicker.jsx"
          title="Simple Image Picker with Permissions"
        />

        <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg border border-green-200 dark:border-green-800 my-6">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-2 mt-0">
            🔧 Key Features Explained
          </h4>
          <div className="text-green-700 dark:text-green-300 text-sm space-y-2">
            <div><strong>Permission Handling:</strong> Requests permissions before accessing camera/gallery</div>
            <div><strong>Error Handling:</strong> Graceful fallbacks when permissions are denied or operations fail</div>
            <div><strong>Image Editing:</strong> Built-in crop functionality with aspect ratio control</div>
            <div><strong>Quality Control:</strong> Configurable image quality for file size management</div>
            <div><strong>Accessibility:</strong> Proper labels and user feedback for screen readers</div>
          </div>
        </div>

        <h2>4. Example 2: Advanced Media Manager</h2>
        <p>
          Let's build a more sophisticated media manager that supports multiple images, compression options, 
          and provides a gallery-like interface for managing selected photos.
        </p>

        <CodeBlock
          code={`import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  SafeAreaView,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function AdvancedMediaManager() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Add new image to the collection
  const addImage = useCallback((newImage) => {
    setImages(prev => [...prev, {
      id: Date.now().toString(),
      ...newImage,
      addedAt: new Date().toISOString(),
    }]);
  }, []);

  // Remove image from collection
  const removeImage = useCallback((imageId) => {
    setImages(prev => prev.filter(img => img.id !== imageId));
  }, []);

  // Pick single image with options
  const pickSingleImage = async (sourceType) => {
    try {
      setIsLoading(true);
      
      let result;
      const options = {
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
        allowsMultipleSelection: false,
      };

      if (sourceType === 'camera') {
        const permission = await ImagePicker.requestCameraPermissionsAsync();
        if (!permission.granted) {
          Alert.alert('Permission Required', 'Camera access is needed.');
          return;
        }
        result = await ImagePicker.launchCameraAsync(options);
      } else {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) {
          Alert.alert('Permission Required', 'Photo library access is needed.');
          return;
        }
        result = await ImagePicker.launchImageLibraryAsync(options);
      }

      if (!result.canceled && result.assets[0]) {
        addImage(result.assets[0]);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to select image. Please try again.');
      console.error('Image picker error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Pick multiple images from gallery
  const pickMultipleImages = async () => {
    try {
      setIsLoading(true);
      
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        Alert.alert('Permission Required', 'Photo library access is needed.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 0.7,
        allowsMultipleSelection: true,
        selectionLimit: 5, // Limit to 5 images
      });

      if (!result.canceled && result.assets) {
        result.assets.forEach(asset => addImage(asset));
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to select images. Please try again.');
      console.error('Multiple image picker error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Show image source options
  const showImageOptions = () => {
    Alert.alert(
      'Add Photos',
      'How would you like to add photos?',
      [
        { text: 'Take Photo', onPress: () => pickSingleImage('camera') },
        { text: 'Choose from Gallery', onPress: () => pickSingleImage('gallery') },
        { text: 'Select Multiple', onPress: pickMultipleImages },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  // Clear all images
  const clearAllImages = () => {
    Alert.alert(
      'Clear All',
      'Are you sure you want to remove all images?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Clear All', style: 'destructive', onPress: () => setImages([]) },
      ]
    );
  };

  // Render individual image item
  const renderImageItem = ({ item }) => (
    <View style={styles.imageItem}>
      <Image source={{ uri: item.uri }} style={styles.gridImage} />
      <TouchableOpacity
        style={styles.removeImageButton}
        onPress={() => removeImage(item.id)}
        accessibilityLabel="Remove image"
      >
        <Text style={styles.removeImageText}>✕</Text>
      </TouchableOpacity>
      <View style={styles.imageItemInfo}>
        <Text style={styles.imageItemText} numberOfLines={1}>
          {item.width}×{item.height}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Photo Gallery</Text>
          <Text style={styles.subtitle}>
            {images.length} {images.length === 1 ? 'photo' : 'photos'} selected
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.actionButton, styles.primaryButton, isLoading && styles.buttonDisabled]}
            onPress={showImageOptions}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              <Text style={styles.actionButtonText}>Add Photos</Text>
            )}
          </TouchableOpacity>
          
          {images.length > 0 && (
            <TouchableOpacity
              style={[styles.actionButton, styles.secondaryButton]}
              onPress={clearAllImages}
            >
              <Text style={styles.secondaryButtonText}>Clear All</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Images Grid */}
        {images.length > 0 ? (
          <FlatList
            data={images}
            renderItem={renderImageItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
            contentContainerStyle={styles.imageGrid}
            columnWrapperStyle={styles.gridRow}
            scrollEnabled={false}
          />
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>📸</Text>
            <Text style={styles.emptyTitle}>No Photos Yet</Text>
            <Text style={styles.emptySubtitle}>
              Tap "Add Photos" to get started
            </Text>
          </View>
        )}

        {/* Summary Information */}
        {images.length > 0 && (
          <View style={styles.summaryContainer}>
            <Text style={styles.summaryTitle}>Collection Summary</Text>
            <Text style={styles.summaryText}>
              Total Images: {images.length}
            </Text>
            <Text style={styles.summaryText}>
              Average Size: {images.length > 0 ? 
                \`\${Math.round(images.reduce((sum, img) => sum + (img.fileSize || 0), 0) / images.length / 1024)} KB\` : 
                'N/A'
              }
            </Text>
          </View>
        )}
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
  header: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 10,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#007AFF',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imageGrid: {
    paddingHorizontal: 20,
  },
  gridRow: {
    justifyContent: 'space-between',
  },
  imageItem: {
    width: '48%',
    aspectRatio: 1,
    marginBottom: 15,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
  },
  gridImage: {
    width: '100%',
    height: '80%',
  },
  removeImageButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(255, 0, 0, 0.8)',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeImageText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  imageItemInfo: {
    padding: 8,
    backgroundColor: '#f8f8f8',
  },
  imageItemText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
    marginTop: 20,
  },
  emptyIcon: {
    fontSize: 60,
    marginBottom: 15,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  summaryContainer: {
    margin: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  summaryText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
});`}
          language="jsx"
          filename="AdvancedMediaManager.jsx"
          title="Multi-Image Gallery Manager"
        />

        <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg border border-purple-200 dark:border-purple-800 my-6">
          <h4 className="text-purple-800 dark:text-purple-200 font-semibold mb-2 mt-0">
            🎯 Advanced Features
          </h4>
          <div className="text-purple-700 dark:text-purple-300 text-sm space-y-2">
            <div><strong>Multiple Selection:</strong> Allow users to select up to 5 images at once</div>
            <div><strong>Image Compression:</strong> Automatic quality adjustment to balance file size and visual quality</div>
            <div><strong>Grid Layout:</strong> Professional gallery interface with FlatList optimization</div>
            <div><strong>State Management:</strong> Efficient handling of image collections with unique IDs</div>
            <div><strong>Memory Management:</strong> Proper cleanup and optimization for large image sets</div>
          </div>
        </div>

        <h2>5. Example 3: Profile Photo System</h2>
        <p>
          Let's create a complete profile photo system that combines image picking with AsyncStorage persistence, 
          user avatars, and professional UX patterns commonly used in production apps.
        </p>

        <CodeBlock
          code={`import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PROFILE_PHOTO_KEY = 'user_profile_photo';

export default function ProfilePhotoSystem() {
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [userName] = useState('John Doe'); // Mock user name

  // Load saved profile photo on component mount
  useEffect(() => {
    loadSavedProfilePhoto();
  }, []);

  const loadSavedProfilePhoto = async () => {
    try {
      const savedPhoto = await AsyncStorage.getItem(PROFILE_PHOTO_KEY);
      if (savedPhoto) {
        setProfilePhoto(JSON.parse(savedPhoto));
      }
    } catch (error) {
      console.error('Failed to load profile photo:', error);
    } finally {
      setIsLoadingProfile(false);
    }
  };

  const saveProfilePhoto = async (photo) => {
    try {
      await AsyncStorage.setItem(PROFILE_PHOTO_KEY, JSON.stringify(photo));
    } catch (error) {
      console.error('Failed to save profile photo:', error);
      Alert.alert('Error', 'Failed to save profile photo.');
    }
  };

  const updateProfilePhoto = async (sourceType) => {
    try {
      setIsLoading(true);
      
      let result;
      const options = {
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      };

      if (sourceType === 'camera') {
        const permission = await ImagePicker.requestCameraPermissionsAsync();
        if (!permission.granted) {
          Alert.alert(
            'Permission Required',
            'Camera access is needed to take your profile photo.',
            [{ text: 'OK' }]
          );
          return;
        }
        result = await ImagePicker.launchCameraAsync(options);
      } else {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) {
          Alert.alert(
            'Permission Required',
            'Photo library access is needed to select your profile photo.',
            [{ text: 'OK' }]
          );
          return;
        }
        result = await ImagePicker.launchImageLibraryAsync(options);
      }

      if (!result.canceled && result.assets[0]) {
        const newPhoto = {
          ...result.assets[0],
          updatedAt: new Date().toISOString(),
        };
        
        setProfilePhoto(newPhoto);
        await saveProfilePhoto(newPhoto);
        
        Alert.alert(
          'Success',
          'Profile photo updated successfully!',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile photo. Please try again.');
      console.error('Profile photo update error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const showPhotoOptions = () => {
    Alert.alert(
      'Profile Photo',
      'How would you like to update your profile photo?',
      [
        { text: 'Take Photo', onPress: () => updateProfilePhoto('camera') },
        { text: 'Choose from Gallery', onPress: () => updateProfilePhoto('gallery') },
        ...(profilePhoto ? [{ 
          text: 'Remove Photo', 
          style: 'destructive',
          onPress: removeProfilePhoto 
        }] : []),
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const removeProfilePhoto = async () => {
    Alert.alert(
      'Remove Profile Photo',
      'Are you sure you want to remove your profile photo?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: async () => {
            try {
              setProfilePhoto(null);
              await AsyncStorage.removeItem(PROFILE_PHOTO_KEY);
              Alert.alert('Success', 'Profile photo removed successfully.');
            } catch (error) {
              Alert.alert('Error', 'Failed to remove profile photo.');
            }
          },
        },
      ]
    );
  };

  const generateInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (isLoadingProfile) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Loading profile...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Profile</Text>
        
        {/* Profile Photo Section */}
        <View style={styles.profileSection}>
          <View style={styles.photoContainer}>
            {profilePhoto ? (
              <Image source={{ uri: profilePhoto.uri }} style={styles.profileImage} />
            ) : (
              <View style={styles.placeholderPhoto}>
                <Text style={styles.initialsText}>
                  {generateInitials(userName)}
                </Text>
              </View>
            )}
            
            <TouchableOpacity
              style={styles.editButton}
              onPress={showPhotoOptions}
              disabled={isLoading}
              accessibilityLabel="Edit profile photo"
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text style={styles.editButtonText}>✏️</Text>
              )}
            </TouchableOpacity>
          </View>
          
          <Text style={styles.userName}>{userName}</Text>
          <TouchableOpacity onPress={showPhotoOptions} disabled={isLoading}>
            <Text style={styles.changePhotoText}>
              {profilePhoto ? 'Change Profile Photo' : 'Add Profile Photo'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Profile Info */}
        <View style={styles.infoSection}>
          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>Account Settings</Text>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Profile Photo</Text>
              <Text style={styles.infoValue}>
                {profilePhoto ? 'Set' : 'Not set'}
              </Text>
            </View>
            
            {profilePhoto && (
              <>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Photo Size</Text>
                  <Text style={styles.infoValue}>
                    {profilePhoto.width}×{profilePhoto.height}
                  </Text>
                </View>
                
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Last Updated</Text>
                  <Text style={styles.infoValue}>
                    {new Date(profilePhoto.updatedAt).toLocaleDateString()}
                  </Text>
                </View>
              </>
            )}
          </View>
        </View>

        {/* Tips Section */}
        <View style={styles.tipsSection}>
          <Text style={styles.tipsTitle}>💡 Photo Tips</Text>
          <View style={styles.tipsList}>
            <Text style={styles.tipText}>• Use good lighting for best results</Text>
            <Text style={styles.tipText}>• Square photos work best for profiles</Text>
            <Text style={styles.tipText}>• Your photo is saved locally on your device</Text>
            <Text style={styles.tipText}>• Tap the edit button to change or remove</Text>
          </View>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  photoContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#ddd',
  },
  placeholderPhoto: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  initialsText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#007AFF',
    borderRadius: 18,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'white',
  },
  editButtonText: {
    fontSize: 16,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  changePhotoText: {
    fontSize: 16,
    color: '#007AFF',
    textDecorationLine: 'underline',
  },
  infoSection: {
    marginBottom: 20,
  },
  infoCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoLabel: {
    fontSize: 16,
    color: '#333',
  },
  infoValue: {
    fontSize: 16,
    color: '#666',
  },
  tipsSection: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  tipsList: {
    gap: 8,
  },
  tipText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});`}
          language="jsx"
          filename="ProfilePhotoSystem.jsx"
          title="Complete Profile Photo System"
        />

        <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800 my-6">
          <h4 className="text-blue-800 dark:text-blue-200 font-semibold mb-2 mt-0">
            💾 Production Features
          </h4>
          <div className="text-blue-700 dark:text-blue-300 text-sm space-y-2">
            <div><strong>AsyncStorage Integration:</strong> Persistent photo storage across app sessions</div>
            <div><strong>Fallback Avatars:</strong> Professional initials display when no photo is set</div>
            <div><strong>Loading States:</strong> Smooth user experience with proper loading indicators</div>
            <div><strong>Error Handling:</strong> Comprehensive error recovery and user feedback</div>
            <div><strong>Accessibility:</strong> Screen reader support and proper touch targets</div>
          </div>
        </div>

        <h2>6. Hands-On Exercise: Photo Gallery App</h2>
        <p>
          Now it's your turn! Create a complete photo gallery app that combines all the techniques we've learned. 
          Build an app that can capture photos, organize them into albums, and provide a smooth browsing experience.
        </p>

        <div className="bg-orange-50 dark:bg-orange-950 p-6 rounded-lg border border-orange-200 dark:border-orange-800 my-6">
          <h4 className="text-orange-800 dark:text-orange-200 font-semibold mb-3 mt-0">
            🎯 Exercise: Personal Photo Gallery
          </h4>
          <div className="text-orange-700 dark:text-orange-300 space-y-3">
            <div>
              <strong>Core Requirements:</strong>
              <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                <li>Camera and gallery image selection with permissions</li>
                <li>Photo organization into custom albums</li>
                <li>Grid view with touch-to-preview functionality</li>
                <li>Full-screen photo viewer with swipe navigation</li>
                <li>Delete and share functionality for individual photos</li>
                <li>AsyncStorage persistence for all data</li>
              </ul>
            </div>
            
            <div>
              <strong>Bonus Features:</strong>
              <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                <li>Photo search by date or metadata</li>
                <li>Batch selection and operations</li>
                <li>Export album as ZIP file</li>
                <li>Photo filters and basic editing</li>
                <li>Cloud backup integration</li>
              </ul>
            </div>
          </div>
        </div>

        <CodeBlock
          code={`// Starter template for your photo gallery app
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ALBUMS_KEY = 'photo_albums';
const PHOTOS_KEY = 'gallery_photos';

export default function PhotoGalleryApp() {
  const [albums, setAlbums] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  useEffect(() => {
    loadGalleryData();
  }, []);

  const loadGalleryData = async () => {
    try {
      // TODO: Load albums and photos from AsyncStorage
    } catch (error) {
      console.error('Failed to load gallery data:', error);
    }
  };

  const saveGalleryData = async () => {
    try {
      // TODO: Save albums and photos to AsyncStorage
    } catch (error) {
      console.error('Failed to save gallery data:', error);
    }
  };

  const createAlbum = async (albumName) => {
    // TODO: Create new album
  };

  const addPhotoToAlbum = async (albumId) => {
    // TODO: Pick image and add to album
  };

  const renderAlbumItem = ({ item }) => {
    // TODO: Render album with thumbnail and photo count
  };

  const renderPhotoItem = ({ item }) => {
    // TODO: Render individual photo in grid
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Photo Gallery</Text>
        {/* TODO: Add navigation and action buttons */}
      </View>

      {selectedAlbum ? (
        // Photo grid view
        <FlatList
          data={photos.filter(photo => photo.albumId === selectedAlbum.id)}
          renderItem={renderPhotoItem}
          numColumns={3}
          // TODO: Add grid styling and functionality
        />
      ) : (
        // Albums view
        <FlatList
          data={albums}
          renderItem={renderAlbumItem}
          // TODO: Add album list functionality
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  // Add your custom styles here
});`}
          language="jsx"
          filename="PhotoGalleryExercise.jsx"
          title="Exercise Starter Template"
        />

        <h2>7. Best Practices & Performance Tips</h2>

        <div className="grid md:grid-cols-2 gap-4 my-6">
          <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg border">
            <h4 className="font-semibold mb-3 mt-0">⚡ Performance Optimization</h4>
            <div className="text-sm space-y-2">
              <div>• Compress images appropriately (0.7-0.8 quality)</div>
              <div>• Use thumbnail generation for large galleries</div>
              <div>• Implement lazy loading for image lists</div>
              <div>• Cache processed images to avoid re-processing</div>
              <div>• Clean up temporary files after use</div>
            </div>
          </div>
          
          <div className="p-4 bg-green-50 dark:bg-green-900 rounded-lg border">
            <h4 className="font-semibold mb-3 mt-0">🔒 Security & Privacy</h4>
            <div className="text-sm space-y-2">
              <div>• Always request permissions before access</div>
              <div>• Provide clear explanations for permission requests</div>
              <div>• Handle permission denials gracefully</div>
              <div>• Don't store sensitive images in plain text</div>
              <div>• Respect user privacy and data policies</div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border my-6">
          <h4 className="font-semibold mb-3 mt-0">📱 Platform-Specific Considerations</h4>
          <div className="space-y-4">
            <div>
              <strong className="text-blue-600">iOS Specifics:</strong>
              <div className="text-sm mt-1 space-y-1">
                <div>• Photos permission required for library access</div>
                <div>• Camera permission required for photo capture</div>
                <div>• Support for Live Photos and HEIC format</div>
                <div>• Respect privacy indicators in iOS 14+</div>
              </div>
            </div>
            
            <div>
              <strong className="text-green-600">Android Specifics:</strong>
              <div className="text-sm mt-1 space-y-1">
                <div>• Handle different Android versions and permissions</div>
                <div>• Consider scoped storage in Android 10+</div>
                <div>• Test with different camera apps and file formats</div>
                <div>• Handle external storage availability</div>
              </div>
            </div>
          </div>
        </div>

        <h2>8. Key Takeaways</h2>
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 p-6 rounded-lg border border-blue-200 dark:border-blue-800 my-6">
          <ul className="space-y-2 mb-0 text-blue-800 dark:text-blue-200">
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span><strong>expo-image-picker</strong> provides a unified API for camera and gallery access across platforms</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span><strong>Permission handling</strong> is crucial for user trust and app store approval</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span><strong>Image compression</strong> balances quality and performance for mobile apps</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span><strong>AsyncStorage integration</strong> enables persistent photo management across app sessions</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span><strong>Error handling</strong> and loading states create professional user experiences</span>
            </li>
          </ul>
        </div>

        <div className="bg-green-50 dark:bg-green-950 p-6 rounded-lg border border-green-200 dark:border-green-800">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-3 mt-0">
            🚀 Next Steps
          </h4>
          <div className="text-green-700 dark:text-green-300 space-y-2">
            <div>
              <strong>Explore advanced features:</strong> Image editing, filters, and cloud storage integration
            </div>
            <div>
              <strong>Performance optimization:</strong> Implement image caching and memory management strategies
            </div>
            <div>
              <strong>User experience:</strong> Add smooth animations and gestures for gallery interactions
            </div>
            <div>
              <strong>Production readiness:</strong> Test extensively across devices and handle edge cases
            </div>
          </div>
        </div>
      </div>
    </>
  );
}