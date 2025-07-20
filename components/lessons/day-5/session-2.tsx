"use client";

import { CodeBlock } from "@/components/ui/code-block-new";

export function Day5Session2Content() {
  return (
    <>
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">
            Location & Maps - Session 2
          </h1>

          <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg border border-blue-200 dark:border-blue-800 mb-8">
            <h3 className="text-blue-800 dark:text-blue-200 font-semibold mb-4 mt-0">
              🗺️ Session Overview
            </h3>
            <ul className="text-blue-700 dark:text-blue-300 space-y-2 mb-0">
              <li>
                <strong>expo-location Setup</strong> - Install and configure location services for coordinates
              </li>
              <li>
                <strong>Location Permissions</strong> - Handle native location permissions professionally
              </li>
              <li>
                <strong>Coordinate Retrieval</strong> - Get current location with accuracy options
              </li>
              <li>
                <strong>Static Map Display</strong> - Show locations on Google Maps via WebView integration
              </li>
            </ul>
          </div>
        </div>

        <h2>1. Building Location-Aware Applications</h2>
        <p>
          Location services are essential for modern mobile apps—from ride-sharing to weather to social check-ins. 
          Let's build professional location experiences that respect user privacy, handle permissions gracefully, 
          and provide accurate positioning with beautiful map visualizations.
        </p>

        <div className="grid md:grid-cols-2 gap-4 my-6">
          <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border">
            <h4 className="font-semibold mb-2 mt-0">📍 What We'll Build:</h4>
            <div className="text-sm space-y-1">
              <div>• Current location detection</div>
              <div>• Location permission handling</div>
              <div>• Coordinate display and formatting</div>
              <div>• Interactive map integration</div>
              <div>• Location tracking and storage</div>
            </div>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-900 rounded-lg border">
            <h4 className="font-semibold mb-2 mt-0">🎯 Key Features:</h4>
            <div className="text-sm space-y-1">
              <div>• Real-time location updates</div>
              <div>• Multiple accuracy levels</div>
              <div>• Privacy-first approach</div>
              <div>• Offline coordinate storage</div>
              <div>• Cross-platform compatibility</div>
            </div>
          </div>
        </div>

        <h2>2. Setting Up expo-location</h2>
        <p>
          First, let's install and configure expo-location. This powerful library provides access to device 
          location services with a simple, consistent API across iOS and Android.
        </p>

        <CodeBlock
          code={`# Install expo-location
npx expo install expo-location

# Optional: For development builds with additional features
npx expo install expo-location-background`}
          language="bash"
          filename="terminal"
          title="Installation"
        />

        <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800 my-6">
          <h4 className="text-yellow-800 dark:text-yellow-200 font-semibold mb-2 mt-0">
            📱 App Configuration
          </h4>
          <p className="text-yellow-700 dark:text-yellow-300 text-sm mb-2">
            Add location permissions to your app.json or app.config.js:
          </p>
          <CodeBlock
            code={`{
  "expo": {
    "plugins": [
      [
        "expo-location",
        {
          "locationAlwaysAndWhenInUsePermission": "Allow $(PRODUCT_NAME) to use your location to show nearby places and provide location-based features.",
          "locationWhenInUsePermission": "Allow $(PRODUCT_NAME) to use your location to show your current position on the map."
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

        <h2>3. Example 1: Basic Location Detection</h2>
        <p>
          Let's start with a simple location detector that requests permissions, gets the current location, 
          and displays coordinates with accuracy information.
        </p>

        <CodeBlock
          code={`import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import * as Location from 'expo-location';

export default function BasicLocationDetector() {
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [permissionStatus, setPermissionStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  // Check permission status on component mount
  useEffect(() => {
    checkLocationPermission();
  }, []);

  const checkLocationPermission = async () => {
    try {
      const { status } = await Location.getForegroundPermissionsAsync();
      setPermissionStatus(status);
    } catch (error) {
      console.error('Error checking location permission:', error);
    }
  };

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setPermissionStatus(status);
      
      if (status !== 'granted') {
        Alert.alert(
          'Permission Denied',
          'Location access is required to use this feature. Please enable location permissions in your device settings.',
          [{ text: 'OK' }]
        );
        return false;
      }
      return true;
    } catch (error) {
      Alert.alert('Error', 'Failed to request location permission.');
      return false;
    }
  };

  const getCurrentLocation = async () => {
    try {
      setIsLoading(true);
      setErrorMessage(null);

      // Check if location services are enabled
      const serviceEnabled = await Location.hasServicesEnabledAsync();
      if (!serviceEnabled) {
        Alert.alert(
          'Location Services Disabled',
          'Please enable location services in your device settings to use this feature.',
          [{ text: 'OK' }]
        );
        return;
      }

      // Request permission if not granted
      if (permissionStatus !== 'granted') {
        const granted = await requestLocationPermission();
        if (!granted) return;
      }

      // Get current location
      const locationResult = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
        maximumAge: 10000, // Use cached location if less than 10 seconds old
        timeout: 15000, // Timeout after 15 seconds
      });

      setLocation(locationResult);
    } catch (error) {
      console.error('Location error:', error);
      setErrorMessage(error.message || 'Failed to get location');
      Alert.alert(
        'Location Error',
        'Unable to get your current location. Please try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  const formatCoordinate = (coordinate, type) => {
    if (!coordinate) return 'N/A';
    const direction = type === 'latitude' 
      ? (coordinate >= 0 ? 'N' : 'S')
      : (coordinate >= 0 ? 'E' : 'W');
    return \`\${Math.abs(coordinate).toFixed(6)}° \${direction}\`;
  };

  const formatAccuracy = (accuracy) => {
    if (!accuracy) return 'Unknown';
    return accuracy < 1000 ? \`\${Math.round(accuracy)}m\` : \`\${(accuracy / 1000).toFixed(1)}km\`;
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  const getPermissionStatusColor = () => {
    switch (permissionStatus) {
      case 'granted': return '#4CAF50';
      case 'denied': return '#F44336';
      case 'undetermined': return '#FF9800';
      default: return '#9E9E9E';
    }
  };

  const getPermissionStatusText = () => {
    switch (permissionStatus) {
      case 'granted': return 'Granted';
      case 'denied': return 'Denied';
      case 'undetermined': return 'Not Requested';
      default: return 'Unknown';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Location Detector</Text>
        
        {/* Permission Status */}
        <View style={styles.statusContainer}>
          <Text style={styles.statusLabel}>Permission Status:</Text>
          <View style={[styles.statusBadge, { backgroundColor: getPermissionStatusColor() }]}>
            <Text style={styles.statusText}>{getPermissionStatusText()}</Text>
          </View>
        </View>

        {/* Action Button */}
        <TouchableOpacity
          style={[styles.button, isLoading && styles.buttonDisabled]}
          onPress={getCurrentLocation}
          disabled={isLoading}
          accessibilityLabel="Get current location"
        >
          {isLoading ? (
            <ActivityIndicator color="white" size="small" />
          ) : (
            <Text style={styles.buttonText}>📍 Get My Location</Text>
          )}
        </TouchableOpacity>

        {/* Error Message */}
        {errorMessage && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>❌ {errorMessage}</Text>
          </View>
        )}

        {/* Location Information */}
        {location && (
          <View style={styles.locationContainer}>
            <Text style={styles.sectionTitle}>📍 Current Location</Text>
            
            <View style={styles.infoCard}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Latitude:</Text>
                <Text style={styles.infoValue}>
                  {formatCoordinate(location.coords.latitude, 'latitude')}
                </Text>
              </View>
              
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Longitude:</Text>
                <Text style={styles.infoValue}>
                  {formatCoordinate(location.coords.longitude, 'longitude')}
                </Text>
              </View>
              
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Accuracy:</Text>
                <Text style={styles.infoValue}>
                  {formatAccuracy(location.coords.accuracy)}
                </Text>
              </View>
              
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Altitude:</Text>
                <Text style={styles.infoValue}>
                  {location.coords.altitude 
                    ? \`\${Math.round(location.coords.altitude)}m\` 
                    : 'Not available'
                  }
                </Text>
              </View>
              
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Speed:</Text>
                <Text style={styles.infoValue}>
                  {location.coords.speed 
                    ? \`\${Math.round(location.coords.speed * 3.6)} km/h\` 
                    : 'Not available'
                  }
                </Text>
              </View>
              
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Timestamp:</Text>
                <Text style={[styles.infoValue, styles.timestampText]}>
                  {formatTimestamp(location.timestamp)}
                </Text>
              </View>
            </View>

            {/* Raw Coordinates for Developers */}
            <View style={styles.rawContainer}>
              <Text style={styles.rawTitle}>🛠️ Raw Coordinates</Text>
              <Text style={styles.rawText}>
                {location.coords.latitude.toFixed(8)}, {location.coords.longitude.toFixed(8)}
              </Text>
            </View>
          </View>
        )}

        {/* Tips Section */}
        <View style={styles.tipsContainer}>
          <Text style={styles.tipsTitle}>💡 Location Tips</Text>
          <Text style={styles.tipText}>• Higher accuracy uses more battery</Text>
          <Text style={styles.tipText}>• GPS works best outdoors with clear sky</Text>
          <Text style={styles.tipText}>• Indoor locations may be less accurate</Text>
          <Text style={styles.tipText}>• Location services must be enabled</Text>
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
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  statusLabel: {
    fontSize: 16,
    color: '#666',
    marginRight: 10,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  statusText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorContainer: {
    backgroundColor: '#ffebee',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#f44336',
  },
  errorText: {
    color: '#c62828',
    fontSize: 14,
  },
  locationContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  infoCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 16,
    color: '#666',
    textAlign: 'right',
    flex: 1,
    marginLeft: 10,
  },
  timestampText: {
    fontSize: 14,
  },
  rawContainer: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  rawTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  rawText: {
    fontFamily: 'monospace',
    fontSize: 14,
    color: '#666',
  },
  tipsContainer: {
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
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  tipText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
    lineHeight: 20,
  },
});`}
          language="jsx"
          filename="BasicLocationDetector.jsx"
          title="Location Detection with Permissions"
        />

        <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg border border-green-200 dark:border-green-800 my-6">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-2 mt-0">
            🔧 Key Features Explained
          </h4>
          <div className="text-green-700 dark:text-green-300 text-sm space-y-2">
            <div><strong>Permission Management:</strong> Check and request location permissions with clear user messaging</div>
            <div><strong>Service Detection:</strong> Verify location services are enabled before attempting access</div>
            <div><strong>Accuracy Control:</strong> Configure location accuracy based on app requirements</div>
            <div><strong>Error Handling:</strong> Comprehensive error recovery with user-friendly messages</div>
            <div><strong>Data Formatting:</strong> Professional coordinate display with proper formatting</div>
          </div>
        </div>

        <h2>4. Example 2: Interactive Map Integration</h2>
        <p>
          Now let's integrate Google Maps to display locations visually. We'll use WebView to show static maps 
          with markers, providing a rich visual experience without requiring complex native map libraries.
        </p>

        <CodeBlock
          code={`import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { WebView } from 'react-native-webview';
import * as Location from 'expo-location';

const { width: screenWidth } = Dimensions.get('window');

export default function InteractiveLocationMap() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [savedLocations, setSavedLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [mapKey, setMapKey] = useState(0); // Force WebView reload
  const webViewRef = useRef(null);

  const getCurrentLocation = async () => {
    try {
      setIsLoading(true);

      // Request permission
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission Required',
          'Location access is needed to show your position on the map.',
          [{ text: 'OK' }]
        );
        return;
      }

      // Check if location services are enabled
      const serviceEnabled = await Location.hasServicesEnabledAsync();
      if (!serviceEnabled) {
        Alert.alert(
          'Location Services Disabled',
          'Please enable location services in your device settings.',
          [{ text: 'OK' }]
        );
        return;
      }

      // Get location
      const locationResult = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
        maximumAge: 10000,
        timeout: 15000,
      });

      setCurrentLocation(locationResult);
      setMapKey(prev => prev + 1); // Reload map with new location
    } catch (error) {
      console.error('Location error:', error);
      Alert.alert(
        'Location Error',
        'Unable to get your current location. Please try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  const saveCurrentLocation = () => {
    if (!currentLocation) {
      Alert.alert('No Location', 'Please get your current location first.');
      return;
    }

    Alert.prompt(
      'Save Location',
      'Enter a name for this location:',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Save',
          onPress: (name) => {
            if (name && name.trim()) {
              const newLocation = {
                id: Date.now().toString(),
                name: name.trim(),
                latitude: currentLocation.coords.latitude,
                longitude: currentLocation.coords.longitude,
                timestamp: new Date().toISOString(),
              };
              setSavedLocations(prev => [...prev, newLocation]);
              setMapKey(prev => prev + 1); // Reload map with new markers
              Alert.alert('Success', 'Location saved successfully!');
            }
          },
        },
      ],
      'plain-text'
    );
  };

  const clearSavedLocations = () => {
    Alert.alert(
      'Clear Locations',
      'Are you sure you want to clear all saved locations?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: () => {
            setSavedLocations([]);
            setMapKey(prev => prev + 1); // Reload map
          },
        },
      ]
    );
  };

  const generateMapHTML = () => {
    const center = currentLocation 
      ? { lat: currentLocation.coords.latitude, lng: currentLocation.coords.longitude }
      : { lat: 40.7128, lng: -74.0060 }; // Default to NYC

    const markers = [
      ...(currentLocation ? [{
        lat: currentLocation.coords.latitude,
        lng: currentLocation.coords.longitude,
        title: 'Current Location',
        color: 'red',
        isCurrentLocation: true,
      }] : []),
      ...savedLocations.map(loc => ({
        lat: loc.latitude,
        lng: loc.longitude,
        title: loc.name,
        color: 'blue',
        isCurrentLocation: false,
      }))
    ];

    return \`
<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body { margin: 0; padding: 0; font-family: Arial, sans-serif; }
        #map { height: 100vh; width: 100%; }
        .info-window { max-width: 200px; }
        .current-location { font-weight: bold; color: #d73527; }
        .saved-location { font-weight: bold; color: #1976d2; }
    </style>
</head>
<body>
    <div id="map"></div>
    
    <script>
        function initMap() {
            const map = new google.maps.Map(document.getElementById('map'), {
                zoom: 15,
                center: { lat: \${center.lat}, lng: \${center.lng} },
                mapTypeControl: true,
                streetViewControl: false,
                fullscreenControl: false,
            });

            const markers = \${JSON.stringify(markers)};
            
            markers.forEach(marker => {
                const mapMarker = new google.maps.Marker({
                    position: { lat: marker.lat, lng: marker.lng },
                    map: map,
                    title: marker.title,
                    icon: {
                        url: \`http://maps.google.com/mapfiles/ms/icons/\${marker.color}-dot.png\`,
                        scaledSize: new google.maps.Size(32, 32)
                    }
                });

                const infoWindow = new google.maps.InfoWindow({
                    content: \`
                        <div class="info-window">
                            <div class="\${marker.isCurrentLocation ? 'current-location' : 'saved-location'}">
                                \${marker.title}
                            </div>
                            <div style="font-size: 12px; color: #666; margin-top: 5px;">
                                \${marker.lat.toFixed(6)}, \${marker.lng.toFixed(6)}
                            </div>
                        </div>
                    \`
                });

                mapMarker.addListener('click', () => {
                    infoWindow.open(map, mapMarker);
                });
            });

            // Auto-fit bounds if we have markers
            if (markers.length > 1) {
                const bounds = new google.maps.LatLngBounds();
                markers.forEach(marker => {
                    bounds.extend({ lat: marker.lat, lng: marker.lng });
                });
                map.fitBounds(bounds);
            }
        }
    </script>
    <script async defer 
        src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap">
    </script>
</body>
</html>
    \`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Location Map</Text>
        <Text style={styles.subtitle}>
          {savedLocations.length} saved location{savedLocations.length !== 1 ? 's' : ''}
        </Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.actionButton, styles.primaryButton, isLoading && styles.buttonDisabled]}
          onPress={getCurrentLocation}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="white" size="small" />
          ) : (
            <Text style={styles.actionButtonText}>📍 Get Location</Text>
          )}
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.actionButton, styles.secondaryButton]}
          onPress={saveCurrentLocation}
          disabled={!currentLocation}
        >
          <Text style={[styles.secondaryButtonText, !currentLocation && styles.disabledText]}>
            💾 Save Location
          </Text>
        </TouchableOpacity>
      </View>

      {/* Map */}
      <View style={styles.mapContainer}>
        <WebView
          key={mapKey}
          ref={webViewRef}
          source={{ html: generateMapHTML() }}
          style={styles.map}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          renderLoading={() => (
            <View style={styles.mapLoading}>
              <ActivityIndicator size="large" color="#007AFF" />
              <Text style={styles.mapLoadingText}>Loading Map...</Text>
            </View>
          )}
        />
      </View>

      {/* Location Info */}
      {currentLocation && (
        <View style={styles.locationInfo}>
          <Text style={styles.locationInfoText}>
            📍 Current: {currentLocation.coords.latitude.toFixed(4)}, {currentLocation.coords.longitude.toFixed(4)}
          </Text>
        </View>
      )}

      {/* Saved Locations List */}
      <ScrollView style={styles.locationsList}>
        <View style={styles.locationsHeader}>
          <Text style={styles.locationsTitle}>Saved Locations</Text>
          {savedLocations.length > 0 && (
            <TouchableOpacity onPress={clearSavedLocations}>
              <Text style={styles.clearButton}>Clear All</Text>
            </TouchableOpacity>
          )}
        </View>
        
        {savedLocations.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No saved locations yet</Text>
            <Text style={styles.emptySubtext}>Get your location and tap "Save Location"</Text>
          </View>
        ) : (
          savedLocations.map((location) => (
            <View key={location.id} style={styles.locationItem}>
              <View style={styles.locationItemHeader}>
                <Text style={styles.locationName}>{location.name}</Text>
                <Text style={styles.locationDate}>
                  {new Date(location.timestamp).toLocaleDateString()}
                </Text>
              </View>
              <Text style={styles.locationCoords}>
                {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
              </Text>
            </View>
          ))
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
  header: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: 15,
    gap: 10,
    backgroundColor: 'white',
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
  disabledText: {
    color: '#ccc',
  },
  mapContainer: {
    height: 250,
    margin: 15,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  map: {
    flex: 1,
  },
  mapLoading: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  mapLoadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  locationInfo: {
    backgroundColor: '#e3f2fd',
    padding: 12,
    marginHorizontal: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  locationInfoText: {
    fontSize: 14,
    color: '#1976d2',
    textAlign: 'center',
    fontWeight: '500',
  },
  locationsList: {
    flex: 1,
    marginHorizontal: 15,
  },
  locationsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  locationsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  clearButton: {
    color: '#f44336',
    fontSize: 14,
    fontWeight: '500',
  },
  emptyState: {
    alignItems: 'center',
    padding: 30,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
    textAlign: 'center',
  },
  locationItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  locationItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  locationName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  locationDate: {
    fontSize: 12,
    color: '#666',
  },
  locationCoords: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'monospace',
  },
});`}
          language="jsx"
          filename="InteractiveLocationMap.jsx"
          title="Google Maps Integration with WebView"
        />

        <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800 my-6">
          <h4 className="text-yellow-800 dark:text-yellow-200 font-semibold mb-2 mt-0">
            🔑 Google Maps API Setup
          </h4>
          <div className="text-yellow-700 dark:text-yellow-300 text-sm space-y-2">
            <div><strong>API Key Required:</strong> Replace "YOUR_API_KEY" with a valid Google Maps JavaScript API key</div>
            <div><strong>Enable APIs:</strong> Maps JavaScript API and Geocoding API in Google Cloud Console</div>
            <div><strong>Billing:</strong> Google Maps requires billing setup even for free tier usage</div>
            <div><strong>Security:</strong> Restrict API key to specific domains/apps in production</div>
          </div>
        </div>

        <h2>5. Example 3: Location Tracking System</h2>
        <p>
          Let's create a comprehensive location tracking system that monitors location changes, 
          stores location history, and provides analytics about movement patterns.
        </p>

        <CodeBlock
          code={`import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  ScrollView,
  Switch,
  FlatList,
} from 'react-native';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LOCATION_HISTORY_KEY = 'location_history';
const TRACKING_SETTINGS_KEY = 'tracking_settings';

export default function LocationTrackingSystem() {
  const [isTracking, setIsTracking] = useState(false);
  const [locationHistory, setLocationHistory] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [trackingSettings, setTrackingSettings] = useState({
    accuracy: Location.Accuracy.Balanced,
    interval: 30000, // 30 seconds
    distanceInterval: 50, // 50 meters
  });
  
  const locationSubscription = useRef(null);
  const trackingInterval = useRef(null);

  useEffect(() => {
    loadTrackingData();
    
    return () => {
      stopTracking();
    };
  }, []);

  const loadTrackingData = async () => {
    try {
      // Load location history
      const historyData = await AsyncStorage.getItem(LOCATION_HISTORY_KEY);
      if (historyData) {
        setLocationHistory(JSON.parse(historyData));
      }

      // Load tracking settings
      const settingsData = await AsyncStorage.getItem(TRACKING_SETTINGS_KEY);
      if (settingsData) {
        setTrackingSettings(JSON.parse(settingsData));
      }
    } catch (error) {
      console.error('Failed to load tracking data:', error);
    }
  };

  const saveLocationHistory = async (history) => {
    try {
      await AsyncStorage.setItem(LOCATION_HISTORY_KEY, JSON.stringify(history));
    } catch (error) {
      console.error('Failed to save location history:', error);
    }
  };

  const addLocationToHistory = (location) => {
    const locationEntry = {
      id: Date.now().toString(),
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      accuracy: location.coords.accuracy,
      timestamp: location.timestamp,
      speed: location.coords.speed,
      altitude: location.coords.altitude,
    };

    setLocationHistory(prev => {
      const newHistory = [locationEntry, ...prev].slice(0, 100); // Keep last 100 locations
      saveLocationHistory(newHistory);
      return newHistory;
    });
  };

  const startTracking = async () => {
    try {
      // Request permissions
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission Required',
          'Location tracking requires location permissions.',
          [{ text: 'OK' }]
        );
        return;
      }

      // Check if location services are enabled
      const serviceEnabled = await Location.hasServicesEnabledAsync();
      if (!serviceEnabled) {
        Alert.alert(
          'Location Services Disabled',
          'Please enable location services to use tracking.',
          [{ text: 'OK' }]
        );
        return;
      }

      setIsTracking(true);

      // Start location subscription
      locationSubscription.current = await Location.watchPositionAsync(
        {
          accuracy: trackingSettings.accuracy,
          timeInterval: trackingSettings.interval,
          distanceInterval: trackingSettings.distanceInterval,
        },
        (location) => {
          setCurrentLocation(location);
          addLocationToHistory(location);
        }
      );

      Alert.alert('Tracking Started', 'Location tracking is now active.');
    } catch (error) {
      console.error('Failed to start tracking:', error);
      Alert.alert('Error', 'Failed to start location tracking.');
      setIsTracking(false);
    }
  };

  const stopTracking = () => {
    if (locationSubscription.current) {
      locationSubscription.current.remove();
      locationSubscription.current = null;
    }
    
    if (trackingInterval.current) {
      clearInterval(trackingInterval.current);
      trackingInterval.current = null;
    }
    
    setIsTracking(false);
    Alert.alert('Tracking Stopped', 'Location tracking has been disabled.');
  };

  const clearHistory = () => {
    Alert.alert(
      'Clear History',
      'Are you sure you want to clear all location history?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            setLocationHistory([]);
            await AsyncStorage.removeItem(LOCATION_HISTORY_KEY);
            Alert.alert('Success', 'Location history cleared.');
          },
        },
      ]
    );
  };

  const exportHistory = () => {
    if (locationHistory.length === 0) {
      Alert.alert('No Data', 'No location history to export.');
      return;
    }

    const csvData = [
      'Timestamp,Latitude,Longitude,Accuracy,Speed,Altitude',
      ...locationHistory.map(loc => 
        \`\${new Date(loc.timestamp).toISOString()},\${loc.latitude},\${loc.longitude},\${loc.accuracy || 'N/A'},\${loc.speed || 'N/A'},\${loc.altitude || 'N/A'}\`
      )
    ].join('\\n');

    Alert.alert(
      'Export Data',
      \`Ready to export \${locationHistory.length} location entries.\\n\\nData format: CSV\`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Copy to Clipboard', onPress: () => {
          // In a real app, you'd use Clipboard.setString(csvData)
          Alert.alert('Success', 'Location data copied to clipboard.');
        }},
      ]
    );
  };

  const getTrackingStats = () => {
    if (locationHistory.length === 0) return null;

    const distances = [];
    let totalDistance = 0;

    for (let i = 1; i < locationHistory.length; i++) {
      const prev = locationHistory[i];
      const curr = locationHistory[i - 1];
      
      // Simple distance calculation (Haversine formula would be more accurate)
      const distance = Math.sqrt(
        Math.pow(curr.latitude - prev.latitude, 2) + 
        Math.pow(curr.longitude - prev.longitude, 2)
      ) * 111000; // Rough conversion to meters
      
      distances.push(distance);
      totalDistance += distance;
    }

    const avgSpeed = locationHistory
      .filter(loc => loc.speed && loc.speed > 0)
      .reduce((sum, loc) => sum + loc.speed, 0) / 
      locationHistory.filter(loc => loc.speed && loc.speed > 0).length;

    return {
      totalPoints: locationHistory.length,
      totalDistance: Math.round(totalDistance),
      averageSpeed: avgSpeed ? Math.round(avgSpeed * 3.6) : 0, // Convert m/s to km/h
      timeSpan: locationHistory.length > 0 ? 
        new Date(locationHistory[0].timestamp).getTime() - 
        new Date(locationHistory[locationHistory.length - 1].timestamp).getTime() : 0,
    };
  };

  const renderLocationItem = ({ item }) => (
    <View style={styles.locationItem}>
      <View style={styles.locationHeader}>
        <Text style={styles.locationTime}>
          {new Date(item.timestamp).toLocaleTimeString()}
        </Text>
        <Text style={styles.locationAccuracy}>
          ±{Math.round(item.accuracy || 0)}m
        </Text>
      </View>
      <Text style={styles.locationCoords}>
        {item.latitude.toFixed(6)}, {item.longitude.toFixed(6)}
      </Text>
      {item.speed && (
        <Text style={styles.locationSpeed}>
          Speed: {Math.round(item.speed * 3.6)} km/h
        </Text>
      )}
    </View>
  );

  const stats = getTrackingStats();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Location Tracker</Text>
          <Text style={styles.subtitle}>
            {isTracking ? '🟢 Active' : '🔴 Inactive'}
          </Text>
        </View>

        {/* Tracking Control */}
        <View style={styles.controlSection}>
          <View style={styles.controlRow}>
            <Text style={styles.controlLabel}>Location Tracking</Text>
            <Switch
              value={isTracking}
              onValueChange={isTracking ? stopTracking : startTracking}
              trackColor={{ false: '#ccc', true: '#4CAF50' }}
              thumbColor={isTracking ? '#fff' : '#f4f3f4'}
            />
          </View>
        </View>

        {/* Current Location */}
        {currentLocation && (
          <View style={styles.currentLocationSection}>
            <Text style={styles.sectionTitle}>📍 Current Location</Text>
            <View style={styles.infoCard}>
              <Text style={styles.currentLocationText}>
                {currentLocation.coords.latitude.toFixed(6)}, {currentLocation.coords.longitude.toFixed(6)}
              </Text>
              <Text style={styles.currentLocationTime}>
                Updated: {new Date(currentLocation.timestamp).toLocaleTimeString()}
              </Text>
            </View>
          </View>
        )}

        {/* Statistics */}
        {stats && (
          <View style={styles.statsSection}>
            <Text style={styles.sectionTitle}>📊 Tracking Statistics</Text>
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{stats.totalPoints}</Text>
                <Text style={styles.statLabel}>Points</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{stats.totalDistance}m</Text>
                <Text style={styles.statLabel}>Distance</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{stats.averageSpeed}</Text>
                <Text style={styles.statLabel}>Avg Speed (km/h)</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>
                  {Math.round(stats.timeSpan / 1000 / 60)}
                </Text>
                <Text style={styles.statLabel}>Minutes</Text>
              </View>
            </View>
          </View>
        )}

        {/* Action Buttons */}
        <View style={styles.actionSection}>
          <TouchableOpacity style={styles.actionButton} onPress={exportHistory}>
            <Text style={styles.actionButtonText}>📤 Export Data</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.actionButton, styles.dangerButton]} 
            onPress={clearHistory}
          >
            <Text style={styles.actionButtonText}>🗑️ Clear History</Text>
          </TouchableOpacity>
        </View>

        {/* Location History */}
        <View style={styles.historySection}>
          <Text style={styles.sectionTitle}>
            📝 Recent Locations ({locationHistory.length})
          </Text>
          {locationHistory.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No location history yet</Text>
              <Text style={styles.emptySubtext}>
                Enable tracking to start recording your location
              </Text>
            </View>
          ) : (
            <FlatList
              data={locationHistory.slice(0, 20)} // Show recent 20
              renderItem={renderLocationItem}
              keyExtractor={(item) => item.id}
              style={styles.historyList}
              scrollEnabled={false}
            />
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
  header: {
    padding: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  controlSection: {
    backgroundColor: 'white',
    margin: 15,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  controlRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  controlLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  currentLocationSection: {
    margin: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  infoCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  currentLocationText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'monospace',
  },
  currentLocationTime: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  statsSection: {
    margin: 15,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    textAlign: 'center',
  },
  actionSection: {
    flexDirection: 'row',
    margin: 15,
    gap: 10,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  dangerButton: {
    backgroundColor: '#f44336',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  historySection: {
    margin: 15,
  },
  emptyState: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 8,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
    textAlign: 'center',
  },
  historyList: {
    maxHeight: 400,
  },
  locationItem: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  locationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  locationTime: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  locationAccuracy: {
    fontSize: 12,
    color: '#666',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  locationCoords: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'monospace',
  },
  locationSpeed: {
    fontSize: 12,
    color: '#007AFF',
    marginTop: 2,
  },
});`}
          language="jsx"
          filename="LocationTrackingSystem.jsx"
          title="Complete Location Tracking System"
        />

        <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg border border-purple-200 dark:border-purple-800 my-6">
          <h4 className="text-purple-800 dark:text-purple-200 font-semibold mb-2 mt-0">
            🎯 Advanced Tracking Features
          </h4>
          <div className="text-purple-700 dark:text-purple-300 text-sm space-y-2">
            <div><strong>Live Tracking:</strong> Real-time location updates with configurable intervals</div>
            <div><strong>Data Persistence:</strong> AsyncStorage integration for location history</div>
            <div><strong>Statistics:</strong> Distance, speed, and movement analytics</div>
            <div><strong>Data Export:</strong> CSV export functionality for external analysis</div>
            <div><strong>Battery Optimization:</strong> Configurable accuracy and update intervals</div>
          </div>
        </div>

        <h2>6. Hands-On Exercise: Location-Based App</h2>
        <p>
          Now it's your turn! Create a location-based app that combines current location detection, 
          map visualization, and location history tracking into a cohesive experience.
        </p>

        <div className="bg-orange-50 dark:bg-orange-950 p-6 rounded-lg border border-orange-200 dark:border-orange-800 my-6">
          <h4 className="text-orange-800 dark:text-orange-200 font-semibold mb-3 mt-0">
            🎯 Exercise: Personal Location Journal
          </h4>
          <div className="text-orange-700 dark:text-orange-300 space-y-3">
            <div>
              <strong>Core Requirements:</strong>
              <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                <li>Get current location with proper permission handling</li>
                <li>Save locations with custom names and notes</li>
                <li>Display all saved locations on an interactive map</li>
                <li>Location history with timestamps and details</li>
                <li>Search and filter saved locations</li>
                <li>Export location data as JSON or CSV</li>
              </ul>
            </div>
            
            <div>
              <strong>Bonus Features:</strong>
              <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                <li>Photo attachments for saved locations</li>
                <li>Weather information for each location</li>
                <li>Distance calculations between locations</li>
                <li>Location sharing with friends</li>
                <li>Geofencing alerts for favorite locations</li>
              </ul>
            </div>
          </div>
        </div>

        <CodeBlock
          code={`// Starter template for your location journal app
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LOCATIONS_KEY = 'saved_locations';

export default function LocationJournalApp() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [savedLocations, setSavedLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadSavedLocations();
  }, []);

  const loadSavedLocations = async () => {
    try {
      // TODO: Load saved locations from AsyncStorage
    } catch (error) {
      console.error('Failed to load locations:', error);
    }
  };

  const saveLocation = async (locationData) => {
    try {
      // TODO: Save location with name and notes
    } catch (error) {
      console.error('Failed to save location:', error);
    }
  };

  const getCurrentLocation = async () => {
    try {
      // TODO: Get current location with permissions
    } catch (error) {
      console.error('Failed to get location:', error);
    }
  };

  const renderLocationItem = ({ item }) => {
    // TODO: Render saved location with details
    return (
      <View style={styles.locationItem}>
        <Text style={styles.locationName}>{item.name}</Text>
        <Text style={styles.locationCoords}>
          {item.latitude.toFixed(6)}, {item.longitude.toFixed(6)}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Location Journal</Text>
        {/* TODO: Add action buttons */}
      </View>

      <FlatList
        data={savedLocations}
        renderItem={renderLocationItem}
        keyExtractor={(item) => item.id}
        // TODO: Add empty state and styling
      />
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
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  locationItem: {
    backgroundColor: 'white',
    padding: 15,
    marginHorizontal: 15,
    marginBottom: 10,
    borderRadius: 8,
  },
  locationName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  locationCoords: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'monospace',
  },
  // Add your custom styles here
});`}
          language="jsx"
          filename="LocationJournalExercise.jsx"
          title="Exercise Starter Template"
        />

        <h2>7. Privacy & Best Practices</h2>

        <div className="grid md:grid-cols-2 gap-4 my-6">
          <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg border">
            <h4 className="font-semibold mb-3 mt-0">🔒 Privacy Best Practices</h4>
            <div className="text-sm space-y-2">
              <div>• Request permissions with clear explanations</div>
              <div>• Use minimum required accuracy for your use case</div>
              <div>• Provide opt-out mechanisms for tracking</div>
              <div>• Store location data securely and locally</div>
              <div>• Be transparent about data usage</div>
            </div>
          </div>
          
          <div className="p-4 bg-green-50 dark:bg-green-900 rounded-lg border">
            <h4 className="font-semibold mb-3 mt-0">⚡ Performance Optimization</h4>
            <div className="text-sm space-y-2">
              <div>• Use appropriate accuracy levels</div>
              <div>• Implement location caching</div>
              <div>• Stop tracking when app is backgrounded</div>
              <div>• Use distance intervals to reduce updates</div>
              <div>• Handle location services being disabled</div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border my-6">
          <h4 className="font-semibold mb-3 mt-0">📱 Platform-Specific Considerations</h4>
          <div className="space-y-4">
            <div>
              <strong className="text-blue-600">iOS Specifics:</strong>
              <div className="text-sm mt-1 space-y-1">
                <div>• "When in Use" vs "Always" permissions</div>
                <div>• Background location requires additional setup</div>
                <div>• Location accuracy affected by Low Power Mode</div>
                <div>• App Store review guidelines for location usage</div>
              </div>
            </div>
            
            <div>
              <strong className="text-green-600">Android Specifics:</strong>
              <div className="text-sm mt-1 space-y-1">
                <div>• Fine vs coarse location permissions</div>
                <div>• Background location requires special permission</div>
                <div>• Doze mode and battery optimization affects tracking</div>
                <div>• Different GPS providers and accuracy</div>
              </div>
            </div>
          </div>
        </div>

        <h2>8. Key Takeaways</h2>
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 p-6 rounded-lg border border-blue-200 dark:border-blue-800 my-6">
          <ul className="space-y-2 mb-0 text-blue-800 dark:text-blue-200">
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span><strong>expo-location</strong> provides cross-platform location services with a unified API</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span><strong>Permission handling</strong> is critical for user trust and regulatory compliance</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span><strong>Static maps</strong> via WebView provide rich visualization without complex native dependencies</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span><strong>Location tracking</strong> requires careful balance between accuracy and battery usage</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span><strong>Privacy considerations</strong> are essential for user trust and app store approval</span>
            </li>
          </ul>
        </div>

        <div className="bg-green-50 dark:bg-green-950 p-6 rounded-lg border border-green-200 dark:border-green-800">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-3 mt-0">
            🚀 Next Steps
          </h4>
          <div className="text-green-700 dark:text-green-300 space-y-2">
            <div>
              <strong>Advanced features:</strong> Geofencing, background location tracking, and turn-by-turn navigation
            </div>
            <div>
              <strong>Map enhancements:</strong> Native map libraries (react-native-maps) for better performance
            </div>
            <div>
              <strong>Data analysis:</strong> Location analytics, heat maps, and movement pattern recognition
            </div>
            <div>
              <strong>Integration:</strong> Combine with other APIs like weather, places, or social features
            </div>
          </div>
        </div>
      </div>
    </>
  );
}