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
                <strong>expo-image-picker Setup</strong> - Install and configure image picker
              </li>
              <li>
                <strong>Camera & Gallery Access</strong> - Handle permissions and image selection
              </li>
              <li>
                <strong>Image Preview</strong> - Display and manage selected images
              </li>
              <li>
                <strong>Essential Patterns</strong> - Simple, reliable image handling
              </li>
            </ul>
          </div>
        </div>

        <h2>1. Why Image Picker Matters</h2>
        <p>
          Most apps need image functionality—profile photos, uploads, sharing. 
          Let's build simple, reliable image pickers with proper permissions.
        </p>

        <h2>2. Setting Up expo-image-picker</h2>
        <p>
          First, install expo-image-picker for camera and gallery access.
        </p>

        <CodeBlock
          code={`# Install expo-image-picker
npx expo install expo-image-picker`}
          language="bash"
          filename="terminal"
          title="Installation"
        />

        <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800 my-6">
          <h4 className="text-yellow-800 dark:text-yellow-200 font-semibold mb-2 mt-0">
            📱 Permissions Setup
          </h4>
          <p className="text-yellow-700 dark:text-yellow-300 text-sm mb-2">
            For production builds, add to app.json:
          </p>
          <CodeBlock
            code={`{
  "expo": {
    "plugins": [
      [
        "expo-image-picker",
        {
          "photosPermission": "Access photos to upload images",
          "cameraPermission": "Access camera to take photos"
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

        <h2>3. Basic Image Picker</h2>
        <p>
          Let's create a simple image picker with camera and gallery options.
        </p>

        <CodeBlock
          code={`import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  SafeAreaView,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function BasicImagePicker() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const pickImageFromCamera = async () => {
    try {
      setIsLoading(true);
      
      const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
      if (!cameraPermission.granted) {
        Alert.alert('Permission Required', 'Camera access needed.');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setSelectedImage(result.assets[0]);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to take photo.');
    } finally {
      setIsLoading(false);
    }
  };

  const pickImageFromGallery = async () => {
    try {
      setIsLoading(true);
      
      const libraryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!libraryPermission.granted) {
        Alert.alert('Permission Required', 'Gallery access needed.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setSelectedImage(result.assets[0]);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to select image.');
    } finally {
      setIsLoading(false);
    }
  };

  const showImagePicker = () => {
    Alert.alert(
      'Select Image',
      'Choose image source',
      [
        { text: 'Camera', onPress: pickImageFromCamera },
        { text: 'Gallery', onPress: pickImageFromGallery },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 20, alignItems: 'center' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 30 }}>
        Profile Photo
      </Text>
      
      <View style={{ marginBottom: 30 }}>
        {selectedImage ? (
          <Image 
            source={{ uri: selectedImage.uri }} 
            style={{ width: 200, height: 200, borderRadius: 100 }} 
          />
        ) : (
          <View style={{ 
            width: 200, 
            height: 200, 
            borderRadius: 100, 
            backgroundColor: '#e0e0e0',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Text style={{ fontSize: 40 }}>📷</Text>
            <Text style={{ color: '#666' }}>No image</Text>
          </View>
        )}
      </View>

      <TouchableOpacity
        style={{ 
          backgroundColor: '#007AFF', 
          padding: 15, 
          borderRadius: 25,
          opacity: isLoading ? 0.5 : 1
        }}
        onPress={showImagePicker}
        disabled={isLoading}
      >
        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
          {isLoading ? 'Loading...' : 'Select Image'}
        </Text>
      </TouchableOpacity>

      {selectedImage && (
        <View style={{ 
          backgroundColor: 'white', 
          padding: 15, 
          borderRadius: 10, 
          marginTop: 20,
          width: '100%'
        }}>
          <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Image Info:</Text>
          <Text>Size: {selectedImage.width} x {selectedImage.height}</Text>
        </View>
      )}
    </SafeAreaView>
  );
}`}
          language="jsx"
          filename="BasicImagePicker.jsx"
          title="Simple Image Picker"
        />

        <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg border border-green-200 dark:border-green-800 my-6">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-2 mt-0">
            🔧 Key Features
          </h4>
          <div className="text-green-700 dark:text-green-300 text-sm space-y-1">
            <div>• Permission handling for camera and gallery</div>
            <div>• Image cropping with aspect ratio control</div>
            <div>• Quality setting for file size management</div>
            <div>• Error handling with user-friendly alerts</div>
          </div>
        </div>

        <h2>4. Multiple Image Selection</h2>
        <p>
          Now let's create a simple gallery that supports multiple image selection.
        </p>

        <CodeBlock
          code={`import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  SafeAreaView,
  FlatList,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function MultipleImagePicker() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const addImage = (newImage) => {
    setImages(prev => [...prev, {
      id: Date.now().toString(),
      ...newImage,
    }]);
  };

  const removeImage = (imageId) => {
    setImages(prev => prev.filter(img => img.id !== imageId));
  };

  const pickMultipleImages = async () => {
    try {
      setIsLoading(true);
      
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        Alert.alert('Permission Required', 'Gallery access needed.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        selectionLimit: 5,
        quality: 0.7,
      });

      if (!result.canceled && result.assets) {
        result.assets.forEach(asset => addImage(asset));
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to select images.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderImageItem = ({ item }) => (
    <View style={{ 
      width: '48%', 
      aspectRatio: 1, 
      marginBottom: 10, 
      borderRadius: 8,
      overflow: 'hidden'
    }}>
      <Image source={{ uri: item.uri }} style={{ width: '100%', height: '100%' }} />
      <TouchableOpacity
        style={{
          position: 'absolute',
          top: 5,
          right: 5,
          backgroundColor: 'rgba(255, 0, 0, 0.8)',
          borderRadius: 15,
          width: 30,
          height: 30,
          justifyContent: 'center',
          alignItems: 'center'
        }}
        onPress={() => removeImage(item.id)}
      >
        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>×</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 }}>
        Photo Gallery
      </Text>
      
      <Text style={{ textAlign: 'center', marginBottom: 20, color: '#666' }}>
        {images.length} photos selected
      </Text>

      <TouchableOpacity
        style={{
          backgroundColor: '#007AFF',
          padding: 15,
          borderRadius: 8,
          alignItems: 'center',
          marginBottom: 20,
          opacity: isLoading ? 0.5 : 1
        }}
        onPress={pickMultipleImages}
        disabled={isLoading}
      >
        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
          {isLoading ? 'Loading...' : 'Add Photos'}
        </Text>
      </TouchableOpacity>

      {images.length > 0 ? (
        <FlatList
          data={images}
          renderItem={renderImageItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
        />
      ) : (
        <View style={{ alignItems: 'center', padding: 40 }}>
          <Text style={{ fontSize: 40, marginBottom: 15 }}>📸</Text>
          <Text style={{ fontSize: 18, color: '#666' }}>No photos yet</Text>
          <Text style={{ color: '#999', marginTop: 5 }}>Tap "Add Photos" to start</Text>
        </View>
      )}
    </SafeAreaView>
  );
}`}
          language="jsx"
          filename="MultipleImagePicker.jsx"
          title="Multiple Image Selection"
        />

        <h2>5. Essential Practice</h2>
        <p>
          Try building your own image picker using the patterns above. 
          Focus on permissions, error handling, and simple UX.
        </p>

        <div className="bg-orange-50 dark:bg-orange-950 p-6 rounded-lg border border-orange-200 dark:border-orange-800 mb-6">
          <h4 className="text-orange-800 dark:text-orange-200 font-semibold mb-3 mt-0">
            🎯 Quick Practice:
          </h4>
          <ul className="text-orange-700 dark:text-orange-300 text-sm space-y-1 mb-0">
            <li>• Create a simple profile photo picker</li>
            <li>• Add camera and gallery options</li>
            <li>• Handle permissions properly</li>
            <li>• Display selected image with remove option</li>
          </ul>
        </div>

        <h2>6. Session Summary</h2>

        <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
          <h4 className="text-blue-800 dark:text-blue-200 font-semibold mb-3 mt-0">
            📚 Image Picker Essentials:
          </h4>
          <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1 mb-0">
            <li><strong>expo-image-picker</strong> - Cross-platform image selection</li>
            <li><strong>Permissions</strong> - Camera and gallery access handling</li>
            <li><strong>Image cropping</strong> - Built-in editing with aspect ratios</li>
            <li><strong>Quality control</strong> - Balance file size and image quality</li>
            <li><strong>Multiple selection</strong> - Gallery-style image picking</li>
          </ul>
        </div>
      </div>
    </>
  );
}