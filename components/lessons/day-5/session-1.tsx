"use client";

import { CodeBlock } from "@/components/ui/code-block-new";

export function Day5Session1Content() {
  return (
    <>
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">
            Camera & Image Basics - Session 1
          </h1>

          <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg border border-blue-200 dark:border-blue-800 mb-8">
            <h3 className="text-blue-800 dark:text-blue-200 font-semibold mb-4 mt-0">
              📸 Session Overview
            </h3>
            <ul className="text-blue-700 dark:text-blue-300 space-y-2 mb-0">
              <li>
                <strong>Image Picker Setup</strong> - Install expo-image-picker and basic configuration
              </li>
              <li>
                <strong>Simple Image Selection</strong> - Choose between camera and gallery with permissions
              </li>
              <li>
                <strong>Image Display</strong> - Show selected images with basic management
              </li>
            </ul>
          </div>
        </div>

        <h2>1. Why Learn Image Handling?</h2>
        <p>
          Almost every mobile app needs image functionality—profile photos, social posts, document uploads. 
          Today we'll build simple, practical image pickers that work reliably on both iOS and Android.
        </p>

        <h2>2. Setting Up Image Picker</h2>
        <p>
          Install expo-image-picker, which provides simple access to camera and photo gallery on both platforms.
        </p>

        <CodeBlock
          code={`# Install the image picker library
npx expo install expo-image-picker`}
          language="bash"
          filename="terminal"
          title="Installation Command"
        />

        <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800 my-6">
          <h4 className="text-yellow-800 dark:text-yellow-200 font-semibold mb-2 mt-0">
            📱 Development vs Production
          </h4>
          <p className="text-yellow-700 dark:text-yellow-300 text-sm mb-2">
            For development, permissions are handled automatically. For production builds, you'd add configuration to app.config.js:
          </p>
          <CodeBlock
            code={`// app.config.js - Only needed for production builds
export default {
  expo: {
    plugins: [
      [
        "expo-image-picker",
        {
          photosPermission: "Allow photos for profile pictures",
          cameraPermission: "Take photos for your profile"
        }
      ]
    ]
  }
};`}
            language="javascript"
            filename="app.config.js"
            title="Production Configuration (Optional)"
          />
        </div>

        <h2>3. Example 1: Basic Image Picker</h2>
        <p>
          Let's start with a simple image picker that lets users choose between camera and gallery.
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
  StyleSheet,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

// Define the shape of our image data
interface ImageAsset {
  uri: string;
  width: number;
  height: number;
}

export default function BasicImagePicker(): JSX.Element {
  const [selectedImage, setSelectedImage] = useState<ImageAsset | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const selectImage = async (useCamera: boolean): Promise<void> => {
    try {
      setIsLoading(true);
      
      // Request appropriate permission
      const permission = useCamera 
        ? await ImagePicker.requestCameraPermissionsAsync()
        : await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (!permission.granted) {
        Alert.alert('Permission needed', 'Please allow access to continue');
        return;
      }

      // Launch the appropriate picker
      const result = useCamera
        ? await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
          })
        : await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
          });

      if (!result.canceled && result.assets[0]) {
        setSelectedImage(result.assets[0]);
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const showOptions = (): void => {
    Alert.alert(
      'Select Photo',
      'Choose how to select your photo',
      [
        { text: 'Camera', onPress: () => selectImage(true) },
        { text: 'Gallery', onPress: () => selectImage(false) },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Profile Photo</Text>
      
      <View style={styles.imageContainer}>
        {selectedImage ? (
          <Image source={{ uri: selectedImage.uri }} style={styles.image} />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderIcon}>📷</Text>
            <Text style={styles.placeholderText}>No photo selected</Text>
          </View>
        )}
      </View>

      <TouchableOpacity
        style={[styles.button, isLoading && styles.buttonDisabled]}
        onPress={showOptions}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading ? 'Loading...' : 'Choose Photo'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  imageContainer: {
    marginBottom: 30,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  placeholder: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  placeholderText: {
    color: '#666',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});`}
          language="tsx"
          filename="BasicImagePicker.tsx"
          title="Simple Image Picker Component"
        />

        <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg border border-green-200 dark:border-green-800 my-6">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-2 mt-0">
            🔧 Key Learning Points
          </h4>
          <div className="text-green-700 dark:text-green-300 text-sm space-y-1">
            <div>• <strong>TypeScript interfaces</strong> help us define image data structure</div>
            <div>• <strong>Permission handling</strong> is required before accessing camera/gallery</div>
            <div>• <strong>Async/await</strong> pattern for handling image picker operations</div>
            <div>• <strong>Error handling</strong> with try/catch and user-friendly messages</div>
          </div>
        </div>

        <h2>4. Example 2: Image Display Component</h2>
        <p>
          Let's create a reusable component for displaying images with basic management features.
        </p>

        <CodeBlock
          code={`import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';

interface ImageAsset {
  uri: string;
  width: number;
  height: number;
}

interface ImageDisplayProps {
  image: ImageAsset | null;
  onRemove: () => void;
  onReplace: () => void;
}

export default function ImageDisplay({ image, onRemove, onReplace }: ImageDisplayProps): JSX.Element {
  const handleRemove = (): void => {
    Alert.alert(
      'Remove Image',
      'Are you sure you want to remove this image?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Remove', style: 'destructive', onPress: onRemove },
      ]
    );
  };

  if (!image) {
    return (
      <View style={styles.container}>
        <View style={styles.placeholder}>
          <Text style={styles.placeholderIcon}>🖼️</Text>
          <Text style={styles.placeholderText}>No image selected</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: image.uri }} style={styles.image} />
        
        {/* Action buttons overlay */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton} onPress={onReplace}>
            <Text style={styles.actionButtonText}>📷</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.removeButton} onPress={handleRemove}>
            <Text style={styles.actionButtonText}>✕</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Image info */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          Size: {image.width} × {image.height}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 12,
  },
  placeholder: {
    width: 250,
    height: 250,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ddd',
    borderStyle: 'dashed',
  },
  placeholderIcon: {
    fontSize: 48,
    marginBottom: 10,
  },
  placeholderText: {
    color: '#666',
    fontSize: 16,
  },
  actionButtons: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    backgroundColor: 'rgba(0, 122, 255, 0.9)',
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButton: {
    backgroundColor: 'rgba(255, 59, 48, 0.9)',
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoContainer: {
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  infoText: {
    color: '#666',
    fontSize: 14,
    fontFamily: 'monospace',
  },
});`}
          language="tsx"
          filename="ImageDisplay.tsx"
          title="Reusable Image Display Component"
        />

        <h2>5. Example 3: Simple Gallery</h2>
        <p>
          Now let's build a simple gallery that can hold multiple photos with basic management.
        </p>

        <CodeBlock
          code={`import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import ImageDisplay from './ImageDisplay';

interface ImageAsset {
  uri: string;
  width: number;
  height: number;
}

interface GalleryImage extends ImageAsset {
  id: string;
}

export default function SimpleGallery(): JSX.Element {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const addImage = async (): Promise<void> => {
    try {
      setIsLoading(true);
      
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        Alert.alert('Permission needed', 'Please allow gallery access');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        const newImage: GalleryImage = {
          id: Date.now().toString(),
          ...result.assets[0],
        };
        setImages(prev => [...prev, newImage]);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to select image');
    } finally {
      setIsLoading(false);
    }
  };

  const removeImage = (imageId: string): void => {
    setImages(prev => prev.filter(img => img.id !== imageId));
  };

  const renderImageItem = ({ item }: { item: GalleryImage }) => (
    <View style={styles.imageItem}>
      <ImageDisplay
        image={item}
        onRemove={() => removeImage(item.id)}
        onReplace={addImage}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Gallery</Text>
        <Text style={styles.subtitle}>{images.length} photos</Text>
      </View>

      <TouchableOpacity
        style={[styles.addButton, isLoading && styles.addButtonDisabled]}
        onPress={addImage}
        disabled={isLoading}
      >
        <Text style={styles.addButtonText}>
          {isLoading ? 'Adding...' : '+ Add Photo'}
        </Text>
      </TouchableOpacity>

      {images.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>📸</Text>
          <Text style={styles.emptyText}>No photos yet</Text>
          <Text style={styles.emptySubtext}>Tap "Add Photo" to get started</Text>
        </View>
      ) : (
        <FlatList
          data={images}
          renderItem={renderImageItem}
          keyExtractor={(item) => item.id}
          style={styles.list}
          showsVerticalScrollIndicator={false}
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
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  addButton: {
    backgroundColor: '#007AFF',
    marginHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonDisabled: {
    opacity: 0.5,
  },
  addButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  list: {
    flex: 1,
  },
  imageItem: {
    padding: 20,
    alignItems: 'center',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
});`}
          language="tsx"
          filename="SimpleGallery.tsx"
          title="Simple Photo Gallery Component"
        />

        <h2>6. Practice Exercise</h2>
        <p>
          Now it's your turn! Combine the patterns you've learned to build your own image picker.
        </p>

        <div className="bg-orange-50 dark:bg-orange-950 p-6 rounded-lg border border-orange-200 dark:border-orange-800 mb-6">
          <h4 className="text-orange-800 dark:text-orange-200 font-semibold mb-3 mt-0">
            🎯 Build a Profile Manager
          </h4>
          <div className="text-orange-700 dark:text-orange-300 space-y-2">
            <div><strong>Goal:</strong> Create a simple profile photo manager for a user account</div>
            <div className="text-sm space-y-1 mt-2">
              <div>• Use BasicImagePicker to select a profile photo</div>
              <div>• Use ImageDisplay to show the current profile photo</div>
              <div>• Add a "Remove Photo" button that resets to placeholder</div>
              <div>• Show image dimensions when a photo is selected</div>
              <div>• Handle loading states and permissions properly</div>
            </div>
          </div>
        </div>

        <h2>7. Session Summary</h2>

        <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
          <h4 className="text-blue-800 dark:text-blue-200 font-semibold mb-3 mt-0">
            📚 What You Learned:
          </h4>
          <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1 mb-0">
            <li><strong>expo-image-picker</strong> - Cross-platform image selection made simple</li>
            <li><strong>TypeScript interfaces</strong> - Define data structures for type safety</li>
            <li><strong>Permission handling</strong> - Request camera and gallery access properly</li>
            <li><strong>Reusable components</strong> - Build components that can be used anywhere</li>
            <li><strong>Error handling</strong> - Graceful error handling with try/catch and alerts</li>
          </ul>
        </div>
        
        <div className="bg-green-50 dark:bg-green-950 p-6 rounded-lg border border-green-200 dark:border-green-800 mt-6">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-3 mt-0">
            🚀 Next Steps
          </h4>
          <div className="text-green-700 dark:text-green-300 space-y-2">
            <div>
              <strong>Session 2:</strong> Location services and getting user coordinates
            </div>
            <div>
              <strong>Session 3:</strong> Simple notifications and user alerts
            </div>
            <div>
              <strong>Challenge:</strong> Build a complete app combining all device features
            </div>
          </div>
        </div>
      </div>
    </>
  );
}