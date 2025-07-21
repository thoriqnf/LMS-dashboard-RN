"use client";

import { CodeBlock } from "@/components/ui/code-block-new";

export function Day2Session3Content() {
  return (
    <>
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">
            Fonts & Images - Session 3
          </h1>

          <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg border border-blue-200 dark:border-blue-800 mb-8">
            <h3 className="text-blue-800 dark:text-blue-200 font-semibold mb-4 mt-0">
              🎨 Session Overview
            </h3>
            <ul className="text-blue-700 dark:text-blue-300 space-y-2 mb-0">
              <li>
                <strong>Custom Fonts</strong> - Load and use custom fonts with expo-font
              </li>
              <li>
                <strong>Image Optimization</strong> - Local and remote image handling with best practices
              </li>
              <li>
                <strong>Performance</strong> - Font loading states and image caching strategies
              </li>
              <li>
                <strong>Professional UI</strong> - Combine fonts and images for polished interfaces
              </li>
            </ul>
          </div>
        </div>

        <h2>1. Building on Visual Foundation</h2>
        <p>
          Remember the profile card from Day 1 Session 2? We used basic images and default fonts. 
          Now let's transform that into a professional interface with custom fonts and optimized images.
        </p>

        <div className="grid md:grid-cols-2 gap-4 my-6">
          <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border">
            <h4 className="font-semibold mb-2 mt-0">📱 Day 1 Profile Card:</h4>
            <div className="text-sm space-y-1">
              <div>• Default system fonts</div>
              <div>• Basic Image component</div>
              <div>• Placeholder image URLs</div>
              <div>• Simple styling</div>
            </div>
          </div>
          <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
            <h4 className="font-semibold mb-2 mt-0">✨ Professional Enhancement:</h4>
            <div className="text-sm space-y-1">
              <div>• Custom font families</div>
              <div>• Optimized image loading</div>
              <div>• Local image bundling</div>
              <div>• Loading states & error handling</div>
            </div>
          </div>
        </div>

        <h2>2. Loading Custom Fonts with expo-font</h2>

        <h3>Why Custom Fonts Matter</h3>
        <p>
          Custom fonts give your app a unique personality and professional appearance. 
          Think of fonts like the "voice" of your app - they communicate style and brand identity.
        </p>

        <div className="bg-green-50 dark:bg-green-950 p-6 rounded-lg border border-green-200 dark:border-green-800 mb-6">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-2 mt-0">
            🎯 Font Loading Strategy:
          </h4>
          <ul className="text-green-700 dark:text-green-300 text-sm space-y-1 mb-0">
            <li><strong>Load fonts early</strong> - Use expo-font's useFonts hook</li>
            <li><strong>Show loading states</strong> - Handle font loading gracefully</li>
            <li><strong>Fallback fonts</strong> - Provide system font fallbacks</li>
            <li><strong>Performance optimization</strong> - Only load fonts you actually use</li>
          </ul>
        </div>

        <h3>Example 1: Custom Font Loading</h3>
        <p>
          Let's start with loading custom fonts and handling the loading state. This is the foundation 
          for professional typography in your app.
        </p>

        <CodeBlock
          code={`// First, install expo-font
// npm install expo-font

import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { View, Text, StyleSheet } from 'react-native';

// Keep the splash screen visible while fonts load
SplashScreen.preventAutoHideAsync();

export default function CustomFontExample() {
  const [fontsLoaded, fontError] = useFonts({
    'Inter-Regular': require('../assets/fonts/Inter-Regular.ttf'),
    'Inter-Bold': require('../assets/fonts/Inter-Bold.ttf'),
    'Roboto-Light': require('../assets/fonts/Roboto-Light.ttf'),
    'Roboto-Medium': require('../assets/fonts/Roboto-Medium.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      // Hide splash screen when fonts are loaded
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Show loading state while fonts are loading
  if (!fontsLoaded && !fontError) {
    return null; // or a loading spinner
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Custom Fonts in Action</Text>
      <Text style={styles.subtitle}>Professional Typography</Text>
      <Text style={styles.body}>
        This text uses custom fonts loaded with expo-font. 
        Notice how it gives the app a more polished, branded feel.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontFamily: 'Roboto-Medium',
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 20,
  },
  body: {
    fontSize: 16,
    fontFamily: 'Roboto-Light',
    lineHeight: 24,
    color: '#34495e',
    textAlign: 'center',
  },
});`}
          language="javascript"
          filename="CustomFontExample.js"
          title="Loading Custom Fonts with expo-font"
        />

        <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg border border-blue-200 dark:border-blue-800 mb-6">
          <h4 className="text-blue-800 dark:text-blue-200 font-semibold mb-3 mt-0">
            🔧 Font Loading Process:
          </h4>
          <div className="text-blue-700 dark:text-blue-300 text-sm space-y-2">
            <div><strong>1. Install expo-font</strong> - Add font loading capabilities</div>
            <div><strong>2. Add font files</strong> - Place .ttf/.otf files in assets/fonts/</div>
            <div><strong>3. Use useFonts hook</strong> - Load fonts with descriptive names</div>
            <div><strong>4. Handle loading states</strong> - Show loading while fonts download</div>
            <div><strong>5. Apply fonts</strong> - Use fontFamily in StyleSheet</div>
          </div>
        </div>

        <h2>3. Local and Remote Images</h2>

        <h3>Smart Image Management</h3>
        <p>
          Images can make or break your app's performance. Let's explore both local bundled images 
          and remote images with proper loading states and optimization.
        </p>

        <h3>Example 2: Professional Image Gallery</h3>
        <p>
          Building on your image knowledge, let's create a gallery that handles both local and 
          remote images with loading states and error handling.
        </p>

        <CodeBlock
          code={`import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  ScrollView, 
  StyleSheet, 
  ActivityIndicator,
  TouchableOpacity 
} from 'react-native';

export default function ImageGallery() {
  const [imageErrors, setImageErrors] = useState(new Set());
  const [loadingImages, setLoadingImages] = useState(new Set());

  const galleryImages = [
    {
      id: 1,
      type: 'local',
      source: require('../assets/images/profile-1.jpg'),
      title: 'Local Profile Image',
      description: 'Bundled with app, loads instantly'
    },
    {
      id: 2,
      type: 'remote',
      source: { uri: 'https://picsum.photos/300/200?random=1' },
      title: 'Remote Landscape',
      description: 'Downloaded from internet with caching'
    },
    {
      id: 3,
      type: 'remote',
      source: { uri: 'https://picsum.photos/300/200?random=2' },
      title: 'Remote Portrait',
      description: 'Optimized loading with fallback'
    },
    {
      id: 4,
      type: 'local',
      source: require('../assets/images/gallery-2.jpg'),
      title: 'Local Gallery Image',
      description: 'High-quality bundled image'
    },
  ];

  const handleImageLoad = (imageId) => {
    setLoadingImages(prev => {
      const newSet = new Set(prev);
      newSet.delete(imageId);
      return newSet;
    });
  };

  const handleImageError = (imageId) => {
    setImageErrors(prev => new Set(prev).add(imageId));
    setLoadingImages(prev => {
      const newSet = new Set(prev);
      newSet.delete(imageId);
      return newSet;
    });
  };

  const handleImageLoadStart = (imageId) => {
    setLoadingImages(prev => new Set(prev).add(imageId));
  };

  const renderImage = (item) => {
    const isLoading = loadingImages.has(item.id);
    const hasError = imageErrors.has(item.id);

    return (
      <TouchableOpacity key={item.id} style={styles.imageCard}>
        <View style={styles.imageContainer}>
          {!hasError ? (
            <>
              <Image
                source={item.source}
                style={styles.image}
                onLoadStart={() => handleImageLoadStart(item.id)}
                onLoad={() => handleImageLoad(item.id)}
                onError={() => handleImageError(item.id)}
                resizeMode="cover"
              />
              {isLoading && (
                <View style={styles.loadingOverlay}>
                  <ActivityIndicator size="small" color="#007AFF" />
                </View>
              )}
            </>
          ) : (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>⚠️</Text>
              <Text style={styles.errorMessage}>Failed to load</Text>
            </View>
          )}
        </View>
        
        <View style={styles.imageInfo}>
          <Text style={styles.imageTitle}>{item.title}</Text>
          <Text style={styles.imageDescription}>{item.description}</Text>
          <View style={styles.imageBadge}>
            <Text style={styles.badgeText}>
              {item.type === 'local' ? '📱 Local' : '🌐 Remote'}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Image Gallery</Text>
      <Text style={styles.subtitle}>Local & Remote Images with Loading States</Text>
      
      <View style={styles.gallery}>
        {galleryImages.map(renderImage)}
      </View>

      <View style={styles.info}>
        <Text style={styles.infoTitle}>Image Loading Strategy:</Text>
        <Text style={styles.infoText}>
          • Local images load instantly (bundled with app)
        </Text>
        <Text style={styles.infoText}>
          • Remote images show loading states and handle errors
        </Text>
        <Text style={styles.infoText}>
          • All images use proper resize modes and optimization
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 8,
    color: '#2c3e50',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#7f8c8d',
  },
  gallery: {
    padding: 20,
  },
  imageCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  imageContainer: {
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  errorText: {
    fontSize: 32,
    marginBottom: 8,
  },
  errorMessage: {
    fontSize: 14,
    color: '#e74c3c',
  },
  imageInfo: {
    padding: 15,
  },
  imageTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#2c3e50',
  },
  imageDescription: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 8,
  },
  imageBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#e8f4f8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 12,
    color: '#2980b9',
    fontWeight: '500',
  },
  info: {
    margin: 20,
    padding: 20,
    backgroundColor: '#e8f4f8',
    borderRadius: 12,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#2980b9',
  },
  infoText: {
    fontSize: 14,
    color: '#34495e',
    marginBottom: 6,
  },
});`}
          language="javascript"
          filename="ImageGallery.js"
          title="Professional Image Gallery with Loading States"
        />

        <div className="bg-yellow-50 dark:bg-yellow-950 p-6 rounded-lg border border-yellow-200 dark:border-yellow-800 mb-6">
          <h4 className="text-yellow-800 dark:text-yellow-200 font-semibold mb-3 mt-0">
            💡 Image Performance Tips:
          </h4>
          <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-1 mb-0">
            <li><strong>Local images</strong> - Bundle small, frequently used images</li>
            <li><strong>Remote images</strong> - Use CDN with proper caching headers</li>
            <li><strong>Resize modes</strong> - Choose appropriate resizeMode (cover, contain, stretch)</li>
            <li><strong>Loading states</strong> - Always show feedback during image loading</li>
            <li><strong>Error handling</strong> - Provide fallback when images fail to load</li>
            <li><strong>Optimization</strong> - Use appropriate image formats and sizes</li>
          </ul>
        </div>

        <h2>4. Image Best Practices</h2>

        <h3>Optimization Techniques</h3>
        <p>
          Great images are about more than just looking good - they need to load fast, 
          work on all devices, and be accessible to all users.
        </p>

        <div className="grid md:grid-cols-2 gap-4 my-6">
          <div className="p-4 bg-red-50 dark:bg-red-950 rounded-lg border border-red-200 dark:border-red-800">
            <h4 className="text-red-800 dark:text-red-200 font-semibold mb-2 mt-0">
              ❌ Common Image Mistakes:
            </h4>
            <ul className="text-red-700 dark:text-red-300 text-sm space-y-1 mb-0">
              <li>Using huge images without optimization</li>
              <li>No loading states or error handling</li>
              <li>Missing accessibility descriptions</li>
              <li>Wrong resize modes for containers</li>
              <li>Not caching remote images</li>
            </ul>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
            <h4 className="text-green-800 dark:text-green-200 font-semibold mb-2 mt-0">
              ✅ Professional Image Practices:
            </h4>
            <ul className="text-green-700 dark:text-green-300 text-sm space-y-1 mb-0">
              <li>Optimize image sizes for mobile screens</li>
              <li>Always handle loading and error states</li>
              <li>Include accessibility labels</li>
              <li>Use appropriate aspect ratios</li>
              <li>Implement proper image caching</li>
            </ul>
          </div>
        </div>

        <h3>Example 3: Professional Profile Component</h3>
        <p>
          Let's combine everything we've learned - custom fonts, optimized images, loading states, 
          and error handling - into a professional profile component.
        </p>

        <CodeBlock
          code={`import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  ActivityIndicator,
  TouchableOpacity 
} from 'react-native';
import { useFonts } from 'expo-font';

export default function ProfessionalProfile() {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const [fontsLoaded] = useFonts({
    'Inter-Regular': require('../assets/fonts/Inter-Regular.ttf'),
    'Inter-Bold': require('../assets/fonts/Inter-Bold.ttf'),
    'Inter-Light': require('../assets/fonts/Inter-Light.ttf'),
  });

  const profileData = {
    name: "Sarah Johnson",
    title: "Senior Mobile Developer",
    company: "Tech Innovations Inc.",
    bio: "Passionate about creating beautiful, performant mobile experiences. 5+ years building React Native apps.",
    avatar: "https://i.pravatar.cc/300?img=1",
    badges: ["React Native", "JavaScript", "Mobile Design"],
    stats: {
      projects: 24,
      followers: 1240,
      following: 180
    }
  };

  // Show loading if fonts aren't loaded
  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading fonts...</Text>
      </View>
    );
  }

  const renderAvatar = () => {
    if (imageError) {
      return (
        <View style={styles.avatarPlaceholder}>
          <Text style={styles.avatarPlaceholderText}>
            {profileData.name.split(' ').map(n => n[0]).join('')}
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.avatarContainer}>
        <Image
          source={{ uri: profileData.avatar }}
          style={styles.avatar}
          onLoadStart={() => setImageLoading(true)}
          onLoad={() => setImageLoading(false)}
          onError={() => {
            setImageLoading(false);
            setImageError(true);
          }}
          accessibilityLabel={\`Profile photo of \${profileData.name}\`}
        />
        {imageLoading && (
          <View style={styles.avatarLoader}>
            <ActivityIndicator size="small" color="#007AFF" />
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Avatar Section */}
        <View style={styles.avatarSection}>
          {renderAvatar()}
          <View style={styles.onlineIndicator} />
        </View>

        {/* Profile Info */}
        <View style={styles.profileInfo}>
          <Text style={styles.name}>{profileData.name}</Text>
          <Text style={styles.title}>{profileData.title}</Text>
          <Text style={styles.company}>{profileData.company}</Text>
          <Text style={styles.bio}>{profileData.bio}</Text>
        </View>

        {/* Skills Badges */}
        <View style={styles.badgesContainer}>
          {profileData.badges.map((badge, index) => (
            <View key={index} style={styles.badge}>
              <Text style={styles.badgeText}>{badge}</Text>
            </View>
          ))}
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>{profileData.stats.projects}</Text>
            <Text style={styles.statLabel}>Projects</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>{profileData.stats.followers}</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>{profileData.stats.following}</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Follow</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Message</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
    justifyContent: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#7f8c8d',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#007AFF',
  },
  avatarLoader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#007AFF',
  },
  avatarPlaceholderText: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: 'white',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#2ecc71',
    borderWidth: 3,
    borderColor: 'white',
  },
  profileInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  name: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Inter-Regular',
    color: '#3498db',
    marginBottom: 2,
  },
  company: {
    fontSize: 16,
    fontFamily: 'Inter-Light',
    color: '#7f8c8d',
    marginBottom: 12,
  },
  bio: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#34495e',
    textAlign: 'center',
    lineHeight: 20,
  },
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  badge: {
    backgroundColor: '#e8f4f8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    margin: 4,
  },
  badgeText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#2980b9',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#ecf0f1',
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#2c3e50',
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#7f8c8d',
    marginTop: 4,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 12,
    marginRight: 8,
    alignItems: 'center',
  },
  primaryButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: 'white',
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingVertical: 14,
    borderRadius: 12,
    marginLeft: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#007AFF',
  },
});`}
          language="javascript"
          filename="ProfessionalProfile.js"
          title="Complete Profile Component with Fonts and Images"
        />

        <div className="bg-green-50 dark:bg-green-950 p-6 rounded-lg border border-green-200 dark:border-green-800 mb-6">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-3 mt-0">
            ✨ What's New in This Example:
          </h4>
          <ul className="text-green-700 dark:text-green-300 text-sm space-y-1 mb-0">
            <li><strong>Custom fonts</strong> - Inter font family for professional typography</li>
            <li><strong>Image loading states</strong> - Activity indicators while images load</li>
            <li><strong>Error handling</strong> - Fallback initials when avatar fails to load</li>
            <li><strong>Accessibility</strong> - Screen reader support with accessibilityLabel</li>
            <li><strong>Professional design</strong> - Proper spacing, shadows, and visual hierarchy</li>
            <li><strong>Loading management</strong> - Handle font loading before showing content</li>
          </ul>
        </div>

        <h2>5. Hands-On Exercise: Font & Image Optimization</h2>

        <div className="bg-orange-50 dark:bg-orange-950 p-6 rounded-lg border border-orange-200 dark:border-orange-800 mb-6">
          <h4 className="text-orange-800 dark:text-orange-200 font-semibold mb-3 mt-0">
            🎯 Challenge: Build Your Own Enhanced Profile
          </h4>
          <p className="text-orange-700 dark:text-orange-300 text-sm mb-4">
            Take your existing profile card and enhance it with custom fonts and optimized images.
          </p>
          <ul className="text-orange-700 dark:text-orange-300 text-sm space-y-1 mb-0">
            <li>• Add custom fonts using expo-font (try Google Fonts)</li>
            <li>• Implement image loading states with ActivityIndicator</li>
            <li>• Add error handling for failed image loads</li>
            <li>• Include accessibility labels for screen readers</li>
            <li>• Use appropriate aspect ratios for different image types</li>
            <li>• Test with both local and remote images</li>
          </ul>
        </div>

        <h3>Step-by-Step Implementation</h3>

        <CodeBlock
          code={`// Step 1: Install expo-font
npm install expo-font

// Step 2: Add fonts to your project
// Create: assets/fonts/YourFont-Regular.ttf
// Create: assets/fonts/YourFont-Bold.ttf

// Step 3: Add images to your project
// Create: assets/images/profile-placeholder.png
// Create: assets/images/background.jpg

// Step 4: Implement your enhanced profile component
import { useFonts } from 'expo-font';
import { useState } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet } from 'react-native';

export default function MyEnhancedProfile() {
  const [fontsLoaded] = useFonts({
    'YourFont-Regular': require('../assets/fonts/YourFont-Regular.ttf'),
    'YourFont-Bold': require('../assets/fonts/YourFont-Bold.ttf'),
  });

  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text>Loading fonts...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Your enhanced profile implementation here */}
      <Text style={styles.title}>Enhanced Profile</Text>
      
      {/* Add your image with loading states */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: 'https://your-profile-image.jpg' }}
          style={styles.profileImage}
          onLoadStart={() => setImageLoading(true)}
          onLoad={() => setImageLoading(false)}
          onError={() => {
            setImageLoading(false);
            setImageError(true);
          }}
          accessibilityLabel="Profile photo"
        />
        {imageLoading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="small" color="#007AFF" />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontFamily: 'YourFont-Bold', // Use your custom font
    textAlign: 'center',
    marginBottom: 20,
    color: '#2c3e50',
  },
  imageContainer: {
    alignItems: 'center',
    position: 'relative',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});`}
          language="javascript"
          filename="MyEnhancedProfile.js"
          title="Your Enhanced Profile Implementation"
        />

        <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg border border-blue-200 dark:border-blue-800 mb-6">
          <h4 className="text-blue-800 dark:text-blue-200 font-semibold mb-3 mt-0">
            🔧 Pro Tips for Font & Image Optimization:
          </h4>
          <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1 mb-0">
            <li><strong>Font Selection</strong> - Choose fonts that support your target languages</li>
            <li><strong>Font Loading</strong> - Always handle loading states to prevent layout shifts</li>
            <li><strong>Image Sizes</strong> - Use appropriate dimensions for mobile screens (avoid huge images)</li>
            <li><strong>Caching</strong> - Remote images are automatically cached by React Native</li>
            <li><strong>Accessibility</strong> - Always provide meaningful accessibility labels</li>
            <li><strong>Performance</strong> - Monitor image loading times in development</li>
          </ul>
        </div>

        <h2>6. Session Summary</h2>

        <div className="bg-green-50 dark:bg-green-950 p-6 rounded-lg border border-green-200 dark:border-green-800 mb-6">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-3 mt-0">
            🎉 What You've Accomplished:
          </h4>
          <ul className="text-green-700 dark:text-green-300 text-sm space-y-1 mb-0">
            <li>✅ <strong>Custom Font Loading</strong> - Implemented expo-font with proper loading states</li>
            <li>✅ <strong>Image Optimization</strong> - Handled local and remote images professionally</li>
            <li>✅ <strong>Loading States</strong> - Added activity indicators and error handling</li>
            <li>✅ <strong>Accessibility</strong> - Included screen reader support for images</li>
            <li>✅ <strong>Professional UI</strong> - Created a polished profile component</li>
            <li>✅ <strong>Performance</strong> - Optimized font and image loading strategies</li>
          </ul>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
          <h4 className="text-blue-800 dark:text-blue-200 font-semibold mb-3 mt-0">
            📚 Key Takeaways:
          </h4>
          <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1 mb-0">
            <li><strong>expo-font</strong> is the standard way to load custom fonts in Expo apps</li>
            <li><strong>Loading states</strong> are crucial for good user experience</li>
            <li><strong>Error handling</strong> prevents app crashes and provides better UX</li>
            <li><strong>Accessibility</strong> makes your app usable by everyone</li>
            <li><strong>Performance</strong> matters - optimize images and fonts appropriately</li>
            <li><strong>Professional design</strong> combines typography, images, and layout effectively</li>
          </ul>
        </div>

        <div className="bg-purple-50 dark:bg-purple-950 p-6 rounded-lg border border-purple-200 dark:border-purple-800 mt-6">
          <h4 className="text-purple-800 dark:text-purple-200 font-semibold mb-3 mt-0">
            🚀 Next Steps:
          </h4>
          <p className="text-purple-700 dark:text-purple-300 text-sm mb-2">
            You now have the skills to create professional, visually appealing mobile interfaces. 
            In the next session, we'll explore advanced form handling and user input patterns.
          </p>
          <p className="text-purple-700 dark:text-purple-300 text-sm">
            Keep practicing with different fonts and image optimization techniques - 
            great visual design is what separates good apps from great apps!
          </p>
        </div>
      </div>
    </>
  );
}