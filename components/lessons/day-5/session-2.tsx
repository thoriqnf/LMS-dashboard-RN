"use client";

import { CodeBlock } from "@/components/ui/code-block-new";

export function Day5Session2Content() {
  return (
    <>
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">
            Location Essentials - Session 2
          </h1>

          <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg border border-blue-200 dark:border-blue-800 mb-8">
            <h3 className="text-blue-800 dark:text-blue-200 font-semibold mb-4 mt-0">
              🗺️ Session Overview
            </h3>
            <ul className="text-blue-700 dark:text-blue-300 space-y-2 mb-0">
              <li>
                <strong>Location Setup</strong> - Install expo-location and basic configuration
              </li>
              <li>
                <strong>Permission Handling</strong> - Request location access properly
              </li>
              <li>
                <strong>Get Coordinates</strong> - Retrieve user's current position
              </li>
            </ul>
          </div>
        </div>

        <h2>1. Why Learn Location Services?</h2>
        <p>
          Many apps need to know where users are—weather apps, delivery tracking, finding nearby places. 
          Today we'll learn the basics: getting permission and finding the user's location coordinates.
        </p>

        <div className="bg-green-50 dark:bg-green-950 p-6 rounded-lg border border-green-200 dark:border-green-800 mb-6">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-3 mt-0">
            ✅ Location Best Practices:
          </h4>
          <ul className="text-green-700 dark:text-green-300 text-sm space-y-1 mb-0">
            <li><strong>Ask permission first</strong> - Always request before accessing location</li>
            <li><strong>Explain why</strong> - Tell users why you need their location</li>
            <li><strong>Handle errors</strong> - What if location is disabled or unavailable?</li>
            <li><strong>Respect privacy</strong> - Only use location when necessary</li>
          </ul>
        </div>

        <h2>2. Installing Location Services</h2>
        <p>
          First, we need to install expo-location which handles location access across iOS and Android.
        </p>

        <CodeBlock
          code={`# Install location services
npx expo install expo-location`}
          language="bash"
          filename="terminal"
          title="Installation Command"
        />

        <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800 my-6">
          <h4 className="text-yellow-800 dark:text-yellow-200 font-semibold mb-2 mt-0">
            📱 Development Note
          </h4>
          <p className="text-yellow-700 dark:text-yellow-300 text-sm mb-2">
            For development, expo-location works automatically. For production apps, you'll need to configure permissions in app.config.js:
          </p>
          <CodeBlock
            code={`// app.config.js - Production configuration
export default {
  expo: {
    plugins: [
      [
        "expo-location",
        {
          locationWhenInUsePermission: "This app uses location to show nearby places."
        }
      ]
    ]
  }
};`}
            language="javascript"
            filename="app.config.js"
            title="Production Setup (Optional)"
          />
        </div>

        <h2>3. Example 1: Location Detector</h2>
        <p>
          Let's start with a simple component that gets the user's current location coordinates.
        </p>

        <CodeBlock
          code={`import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import * as Location from 'expo-location';

// Define the shape of location data
interface LocationCoords {
  latitude: number;
  longitude: number;
  accuracy: number | null;
}

interface LocationData {
  coords: LocationCoords;
  timestamp: number;
}

export default function LocationDetector(): JSX.Element {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const findMyLocation = async (): Promise<void> => {
    try {
      setIsLoading(true);

      // Step 1: Request permission
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission Needed', 
          'We need location permission to find your position.'
        );
        return;
      }

      // Step 2: Check if location services are on
      const servicesEnabled = await Location.hasServicesEnabledAsync();
      if (!servicesEnabled) {
        Alert.alert(
          'Location Services Off', 
          'Please turn on location services in your device settings.'
        );
        return;
      }

      // Step 3: Get current position
      const result = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced, // Good balance of speed and accuracy
        timeout: 10000, // 10 second timeout
      });

      setLocation(result);
      Alert.alert('Success!', 'Found your location');
      
    } catch (error) {
      console.error('Location error:', error);
      Alert.alert('Oops!', 'Could not find your location. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Find My Location</Text>
      <Text style={styles.subtitle}>Get your current coordinates</Text>
      
      <TouchableOpacity
        style={[styles.button, isLoading && styles.buttonDisabled]}
        onPress={findMyLocation}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading ? 'Finding...' : '📍 Find Me'}
        </Text>
      </TouchableOpacity>

      {location && (
        <View style={styles.locationCard}>
          <Text style={styles.cardTitle}>Your Location</Text>
          
          <View style={styles.coordinateRow}>
            <Text style={styles.label}>Latitude:</Text>
            <Text style={styles.value}>
              {location.coords.latitude.toFixed(6)}
            </Text>
          </View>
          
          <View style={styles.coordinateRow}>
            <Text style={styles.label}>Longitude:</Text>
            <Text style={styles.value}>
              {location.coords.longitude.toFixed(6)}
            </Text>
          </View>
          
          {location.coords.accuracy && (
            <View style={styles.accuracyRow}>
              <Text style={styles.accuracyText}>
                Accuracy: ±{Math.round(location.coords.accuracy)} meters
              </Text>
            </View>
          )}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 25,
    marginBottom: 30,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  locationCard: {
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 16,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  coordinateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  value: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'monospace',
    fontWeight: 'bold',
  },
  accuracyRow: {
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  accuracyText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
});`}
          language="tsx"
          filename="LocationDetector.tsx"
          title="Basic Location Detection Component"
        />

        <h2>4. Example 2: Location Display</h2>
        <p>
          Let's create a component that nicely displays location information and shows the address.
        </p>

        <CodeBlock
          code={`import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from 'react-native';

interface LocationCoords {
  latitude: number;
  longitude: number;
  accuracy: number | null;
}

interface LocationDisplayProps {
  location: {
    coords: LocationCoords;
    timestamp: number;
  } | null;
  onRefresh: () => void;
  isLoading: boolean;
}

export default function LocationDisplay({ 
  location, 
  onRefresh, 
  isLoading 
}: LocationDisplayProps): JSX.Element {
  const openInMaps = (): void => {
    if (!location) return;
    
    const { latitude, longitude } = location.coords;
    const url = \`https://maps.apple.com/?q=\${latitude},\${longitude}\`;
    
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      }
    });
  };

  const formatCoordinate = (coord: number): string => {
    return coord.toFixed(6);
  };

  const getLocationAge = (): string => {
    if (!location) return '';
    
    const ageMinutes = Math.floor((Date.now() - location.timestamp) / 60000);
    if (ageMinutes < 1) return 'Just now';
    if (ageMinutes === 1) return '1 minute ago';
    return \`\${ageMinutes} minutes ago\`;
  };

  if (!location) {
    return (
      <View style={styles.container}>
        <View style={styles.emptyCard}>
          <Text style={styles.emptyIcon}>📍</Text>
          <Text style={styles.emptyTitle}>No Location Yet</Text>
          <Text style={styles.emptyText}>
            Tap the button above to find your current location
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.locationCard}>
        <View style={styles.header}>
          <Text style={styles.title}>📍 Your Location</Text>
          <TouchableOpacity 
            style={styles.refreshButton} 
            onPress={onRefresh}
            disabled={isLoading}
          >
            <Text style={styles.refreshText}>
              {isLoading ? '🔄' : '↻'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.coordinatesSection}>
          <View style={styles.coordinateRow}>
            <Text style={styles.label}>Latitude</Text>
            <Text style={styles.coordinate}>
              {formatCoordinate(location.coords.latitude)}
            </Text>
          </View>
          
          <View style={styles.coordinateRow}>
            <Text style={styles.label}>Longitude</Text>
            <Text style={styles.coordinate}>
              {formatCoordinate(location.coords.longitude)}
            </Text>
          </View>
        </View>

        <View style={styles.metaSection}>
          {location.coords.accuracy && (
            <Text style={styles.accuracy}>
              Accuracy: ±{Math.round(location.coords.accuracy)}m
            </Text>
          )}
          <Text style={styles.timestamp}>
            Updated {getLocationAge()}
          </Text>
        </View>

        <TouchableOpacity style={styles.mapsButton} onPress={openInMaps}>
          <Text style={styles.mapsButtonText}>🗺️ Open in Maps</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  locationCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  emptyCard: {
    backgroundColor: '#f8f8f8',
    borderRadius: 16,
    padding: 40,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderStyle: 'dashed',
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    lineHeight: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  refreshButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  refreshText: {
    fontSize: 16,
  },
  coordinatesSection: {
    marginBottom: 16,
  },
  coordinateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  label: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  coordinate: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'monospace',
    fontWeight: 'bold',
  },
  metaSection: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    marginBottom: 16,
  },
  accuracy: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
  },
  mapsButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  mapsButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});`}
          language="tsx"
          filename="LocationDisplay.tsx"
          title="Location Information Display Component"
        />

        <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg border border-green-200 dark:border-green-800 my-6">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-2 mt-0">
            🔧 Key Learning Points
          </h4>
          <div className="text-green-700 dark:text-green-300 text-sm space-y-1">
            <div>• <strong>Props interface</strong> defines component inputs with TypeScript</div>
            <div>• <strong>Linking API</strong> opens external apps like Maps from your app</div>
            <div>• <strong>Conditional rendering</strong> shows different content based on state</div>
            <div>• <strong>Date formatting</strong> makes timestamps user-friendly</div>
          </div>
        </div>

        <h2>5. Example 3: Location App</h2>
        <p>
          Let's combine our components to create a complete location app.
        </p>

        <CodeBlock
          code={`import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
} from 'react-native';
import * as Location from 'expo-location';
import LocationDetector from './LocationDetector';
import LocationDisplay from './LocationDisplay';

interface LocationData {
  coords: {
    latitude: number;
    longitude: number;
    accuracy: number | null;
  };
  timestamp: number;
}

export default function LocationApp(): JSX.Element {
  const [currentLocation, setCurrentLocation] = useState<LocationData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lastUpdate, setLastUpdate] = useState<string>('');

  const handleLocationFound = (location: LocationData): void => {
    setCurrentLocation(location);
    setLastUpdate(new Date().toLocaleTimeString());
  };

  const refreshLocation = async (): Promise<void> => {
    try {
      setIsLoading(true);
      
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      const result = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
        timeout: 10000,
      });

      handleLocationFound(result);
    } catch (error) {
      console.error('Refresh location error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getLocationSummary = (): string => {
    if (!currentLocation) return 'No location data';
    
    const { latitude, longitude } = currentLocation.coords;
    
    // Simple region detection based on coordinates
    if (latitude > 40 && latitude < 50 && longitude > -125 && longitude < -65) {
      return 'Somewhere in the United States';
    } else if (latitude > 35 && latitude < 70 && longitude > -10 && longitude < 40) {
      return 'Somewhere in Europe';
    } else if (latitude > -40 && latitude < 40 && longitude > 95 && longitude < 180) {
      return 'Somewhere in Asia';
    }
    
    return 'Somewhere on Earth';
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>My Location</Text>
          <Text style={styles.subtitle}>{getLocationSummary()}</Text>
          {lastUpdate && (
            <Text style={styles.lastUpdate}>Last updated: {lastUpdate}</Text>
          )}
        </View>

        {/* Location Detection Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Find Current Location</Text>
          <LocationDetector onLocationFound={handleLocationFound} />
        </View>

        {/* Location Display Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location Details</Text>
          <LocationDisplay 
            location={currentLocation}
            onRefresh={refreshLocation}
            isLoading={isLoading}
          />
        </View>

        {/* Info Section */}
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>💡 Did You Know?</Text>
          <Text style={styles.infoText}>
            GPS accuracy depends on many factors including weather, 
            buildings, and how many satellites your device can see.
          </Text>
          <Text style={styles.infoText}>
            Location services use a combination of GPS, WiFi networks, 
            and cell towers to determine your position.
          </Text>
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
  header: {
    padding: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 4,
  },
  lastUpdate: {
    fontSize: 14,
    color: '#999',
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  infoSection: {
    margin: 20,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 8,
  },
});`}
          language="tsx"
          filename="LocationApp.tsx"
          title="Complete Location App"
        />

        <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800 my-6">
          <h4 className="text-blue-800 dark:text-blue-200 font-semibold mb-2 mt-0">
            🎯 App Architecture
          </h4>
          <div className="text-blue-700 dark:text-blue-300 text-sm space-y-2">
            <div><strong>Component Composition:</strong> Multiple smaller components working together</div>
            <div><strong>State Management:</strong> Parent component manages shared state</div>
            <div><strong>Props Flow:</strong> Data flows down, events flow up</div>
            <div><strong>Reusable Components:</strong> Components can be used in other apps</div>
          </div>
        </div>

        <h2>6. Practice Exercise</h2>
        <p>
          Now build your own location feature using what you've learned!
        </p>

        <div className="bg-orange-50 dark:bg-orange-950 p-6 rounded-lg border border-orange-200 dark:border-orange-800 mb-6">
          <h4 className="text-orange-800 dark:text-orange-200 font-semibold mb-3 mt-0">
            🎯 Build a Weather Location Finder
          </h4>
          <div className="text-orange-700 dark:text-orange-300 space-y-2">
            <div><strong>Goal:</strong> Create an app that gets your location and shows basic weather info</div>
            <div className="text-sm space-y-1 mt-2">
              <div>• Use LocationDetector to get current coordinates</div>
              <div>• Use LocationDisplay to show the location nicely</div>
              <div>• Add a simple weather estimate based on coordinates</div>
              <div>• Show if you're in a warm or cool climate zone</div>
              <div>• Handle all permissions and errors properly</div>
            </div>
          </div>
        </div>

        <h2>7. Session Summary</h2>
        <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg border border-blue-200 dark:border-blue-800 my-6">
          <h4 className="text-blue-800 dark:text-blue-200 font-semibold mb-3 mt-0">
            📚 What You Learned:
          </h4>
          <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1 mb-0">
            <li><strong>expo-location</strong> - Simple location services across iOS and Android</li>
            <li><strong>Permission patterns</strong> - How to request and handle location permissions</li>
            <li><strong>Component composition</strong> - Building larger apps from smaller components</li>
            <li><strong>Error handling</strong> - Graceful handling of location failures</li>
            <li><strong>External app integration</strong> - Opening Maps app with coordinates</li>
          </ul>
        </div>

        <div className="bg-green-50 dark:bg-green-950 p-6 rounded-lg border border-green-200 dark:border-green-800">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-3 mt-0">
            🚀 Next Steps
          </h4>
          <div className="text-green-700 dark:text-green-300 space-y-2">
            <div>
              <strong>Session 3:</strong> Simple notifications and user alerts
            </div>
            <div>
              <strong>Bonus Session:</strong> Device storage and user preferences
            </div>
            <div>
              <strong>Challenge:</strong> Combine location, images, and notifications in one app
            </div>
          </div>
        </div>
      </div>
    </>
  );
}