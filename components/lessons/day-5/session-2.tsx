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
                <strong>expo-location Setup</strong> - Install and configure location services
              </li>
              <li>
                <strong>Location Permissions</strong> - Handle native location permissions properly
              </li>
              <li>
                <strong>Current Location</strong> - Get user's current coordinates
              </li>
              <li>
                <strong>Simple Maps</strong> - Display locations on basic maps
              </li>
            </ul>
          </div>
        </div>

        <h2>1. Why Location Matters</h2>
        <p>
          Most apps need location—weather, maps, delivery tracking. 
          Let's build simple location features with proper permissions and user privacy.
        </p>

        <div className="bg-green-50 dark:bg-green-950 p-6 rounded-lg border border-green-200 dark:border-green-800 mb-6">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-3 mt-0">
            ✅ Good Location Features:
          </h4>
          <ul className="text-green-700 dark:text-green-300 text-sm space-y-1 mb-0">
            <li><strong>Clear permissions</strong> - Explain why you need location</li>
            <li><strong>Respectful</strong> - Only ask when needed</li>
            <li><strong>Accurate</strong> - Use appropriate accuracy levels</li>
            <li><strong>Private</strong> - Store data locally when possible</li>
          </ul>
        </div>

        <h2>2. Setting Up expo-location</h2>
        <p>
          First, install expo-location for easy cross-platform location access.
        </p>

        <CodeBlock
          code={`# Install expo-location
npx expo install expo-location`}
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
        "expo-location",
        {
          "locationWhenInUsePermission": "Allow app to use your location for map features."
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

        <h2>3. Basic Location Detector</h2>
        <p>
          Let's create a simple app that asks for permission and gets the user's current location.
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

export default function LocationDetector() {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);

  const getCurrentLocation = async () => {
    try {
      setLoading(true);

      // Request permission
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Required', 'We need location access for this feature.');
        return;
      }

      // Check if location services are enabled
      const serviceEnabled = await Location.hasServicesEnabledAsync();
      if (!serviceEnabled) {
        Alert.alert('Location Disabled', 'Please enable location services.');
        return;
      }

      // Get current location
      const result = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
        timeout: 15000,
      });

      setLocation(result);
      Alert.alert('Success', 'Location found!');
    } catch (error) {
      Alert.alert('Error', 'Could not get your location. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Location Detector</Text>
      
      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={getCurrentLocation}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Getting Location...' : '📍 Get My Location'}
        </Text>
      </TouchableOpacity>

      {location && (
        <View style={styles.locationInfo}>
          <Text style={styles.locationTitle}>Current Location:</Text>
          <Text style={styles.coordinate}>
            Lat: {location.coords.latitude.toFixed(6)}
          </Text>
          <Text style={styles.coordinate}>
            Lng: {location.coords.longitude.toFixed(6)}
          </Text>
          <Text style={styles.accuracy}>
            Accuracy: ±{Math.round(location.coords.accuracy)}m
          </Text>
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    paddingHorizontal: 30,
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
  locationInfo: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  locationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  coordinate: {
    fontSize: 16,
    color: '#666',
    fontFamily: 'monospace',
    marginBottom: 5,
  },
  accuracy: {
    fontSize: 14,
    color: '#999',
    marginTop: 10,
  },
});`}
          language="jsx"
          filename="LocationDetector.jsx"
          title="Simple Location Detection"
        />

        <h2>4. Location with Map Display</h2>
        <p>
          Now let's add a simple map view using WebView to display the location visually.
        </p>

        <CodeBlock
          code={`import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { WebView } from 'react-native-webview';
import * as Location from 'expo-location';

const { width } = Dimensions.get('window');

export default function LocationWithMap() {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);

  const getCurrentLocation = async () => {
    try {
      setLoading(true);

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Required', 'We need location access.');
        return;
      }

      const result = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
        timeout: 15000,
      });

      setLocation(result);
    } catch (error) {
      Alert.alert('Error', 'Could not get your location.');
    } finally {
      setLoading(false);
    }
  };

  const generateMapHTML = () => {
    if (!location) return '<html><body><p>No location data</p></body></html>';

    const { latitude, longitude } = location.coords;
    
    return \`
<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body { margin: 0; padding: 0; }
        #map { height: 100vh; width: 100%; }
    </style>
</head>
<body>
    <div id="map"></div>
    <script>
        function initMap() {
            const location = { lat: \${latitude}, lng: \${longitude} };
            
            const map = new google.maps.Map(document.getElementById('map'), {
                zoom: 15,
                center: location,
            });
            
            const marker = new google.maps.Marker({
                position: location,
                map: map,
                title: 'Your Location'
            });
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
        <Text style={styles.title}>Location & Map</Text>
        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={getCurrentLocation}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Finding...' : '📍 Find Me'}
          </Text>
        </TouchableOpacity>
      </View>

      {location ? (
        <View style={styles.mapContainer}>
          <WebView
            source={{ html: generateMapHTML() }}
            style={styles.map}
            javaScriptEnabled={true}
            domStorageEnabled={true}
          />
          <View style={styles.locationInfo}>
            <Text style={styles.coordinates}>
              📍 {location.coords.latitude.toFixed(4)}, {location.coords.longitude.toFixed(4)}
            </Text>
          </View>
        </View>
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>Tap "Find Me" to see your location on the map</Text>
        </View>
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
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  mapContainer: {
    flex: 1,
    margin: 15,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  map: {
    flex: 1,
  },
  locationInfo: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  coordinates: {
    fontSize: 14,
    color: '#333',
    fontFamily: 'monospace',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});`}
          language="jsx"
          filename="LocationWithMap.jsx"
          title="Location with Simple Map"
        />

        <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800 my-6">
          <h4 className="text-yellow-800 dark:text-yellow-200 font-semibold mb-2 mt-0">
            🔑 Google Maps Setup
          </h4>
          <div className="text-yellow-700 dark:text-yellow-300 text-sm space-y-2">
            <div><strong>API Key:</strong> Replace "YOUR_API_KEY" with a real Google Maps API key</div>
            <div><strong>Free Tier:</strong> Google Maps has generous free usage limits</div>
            <div><strong>Enable:</strong> Maps JavaScript API in Google Cloud Console</div>
          </div>
        </div>

        <h2>5. Location Tracker</h2>
        <p>
          Let's build a simple location tracker that saves your locations with names.
        </p>

        <CodeBlock
          code={`import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  FlatList,
  TextInput,
  StyleSheet,
} from 'react-native';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SAVED_LOCATIONS_KEY = 'saved_locations';

export default function LocationTracker() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [savedLocations, setSavedLocations] = useState([]);
  const [locationName, setLocationName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadSavedLocations();
  }, []);

  const loadSavedLocations = async () => {
    try {
      const saved = await AsyncStorage.getItem(SAVED_LOCATIONS_KEY);
      if (saved) {
        setSavedLocations(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading locations:', error);
    }
  };

  const saveSavedLocations = async (locations) => {
    try {
      await AsyncStorage.setItem(SAVED_LOCATIONS_KEY, JSON.stringify(locations));
    } catch (error) {
      console.error('Error saving locations:', error);
    }
  };

  const getCurrentLocation = async () => {
    try {
      setLoading(true);

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Required', 'We need location access.');
        return;
      }

      const result = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      setCurrentLocation(result);
      Alert.alert('Success', 'Location found! Add a name to save it.');
    } catch (error) {
      Alert.alert('Error', 'Could not get your location.');
    } finally {
      setLoading(false);
    }
  };

  const saveCurrentLocation = () => {
    if (!currentLocation) {
      Alert.alert('No Location', 'Get your location first.');
      return;
    }

    if (!locationName.trim()) {
      Alert.alert('Name Required', 'Enter a name for this location.');
      return;
    }

    const newLocation = {
      id: Date.now().toString(),
      name: locationName.trim(),
      latitude: currentLocation.coords.latitude,
      longitude: currentLocation.coords.longitude,
      timestamp: new Date().toISOString(),
    };

    const updated = [newLocation, ...savedLocations];
    setSavedLocations(updated);
    saveSavedLocations(updated);
    setLocationName('');
    setCurrentLocation(null);
    
    Alert.alert('Saved!', 'Location added to your list.');
  };

  const deleteLocation = (id) => {
    Alert.alert(
      'Delete Location',
      'Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            const filtered = savedLocations.filter(loc => loc.id !== id);
            setSavedLocations(filtered);
            saveSavedLocations(filtered);
          },
        },
      ]
    );
  };

  const renderLocationItem = ({ item }) => (
    <View style={styles.locationItem}>
      <View style={styles.locationHeader}>
        <Text style={styles.locationName}>{item.name}</Text>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deleteLocation(item.id)}
        >
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.locationCoords}>
        {item.latitude.toFixed(6)}, {item.longitude.toFixed(6)}
      </Text>
      <Text style={styles.locationDate}>
        {new Date(item.timestamp).toLocaleDateString()}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Location Tracker</Text>

      <View style={styles.controls}>
        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={getCurrentLocation}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Finding...' : '📍 Get Location'}
          </Text>
        </TouchableOpacity>

        {currentLocation && (
          <View style={styles.saveSection}>
            <Text style={styles.currentLocationText}>
              Current: {currentLocation.coords.latitude.toFixed(4)}, {currentLocation.coords.longitude.toFixed(4)}
            </Text>
            <TextInput
              style={styles.nameInput}
              placeholder="Enter location name..."
              value={locationName}
              onChangeText={setLocationName}
            />
            <TouchableOpacity style={styles.saveButton} onPress={saveCurrentLocation}>
              <Text style={styles.saveButtonText}>💾 Save Location</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.listContainer}>
        <Text style={styles.listTitle}>
          Saved Locations ({savedLocations.length})
        </Text>
        
        {savedLocations.length === 0 ? (
          <Text style={styles.emptyText}>No saved locations yet</Text>
        ) : (
          <FlatList
            data={savedLocations}
            renderItem={renderLocationItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  controls: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveSection: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  currentLocationText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'monospace',
  },
  nameInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  listContainer: {
    flex: 1,
  },
  listTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 40,
  },
  locationItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  locationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  deleteButton: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: '#ff4444',
    borderRadius: 4,
  },
  deleteText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  locationCoords: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'monospace',
    marginBottom: 4,
  },
  locationDate: {
    fontSize: 12,
    color: '#999',
  },
});`}
          language="jsx"
          filename="LocationTracker.jsx"
          title="Location Tracker with Storage"
        />

        <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg border border-green-200 dark:border-green-800 my-6">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-2 mt-0">
            🎯 Key Features
          </h4>
          <div className="text-green-700 dark:text-green-300 text-sm space-y-2">
            <div><strong>Permission Handling:</strong> Ask for location access properly</div>
            <div><strong>Current Location:</strong> Get user's coordinates with good accuracy</div>
            <div><strong>Data Storage:</strong> Save locations locally with AsyncStorage</div>
            <div><strong>Simple UI:</strong> Easy-to-use interface for location management</div>
          </div>
        </div>

        <h2>6. Privacy & Best Practices</h2>

        <div className="grid md:grid-cols-2 gap-4 my-6">
          <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg border">
            <h4 className="font-semibold mb-3 mt-0">🔒 Privacy Tips</h4>
            <div className="text-sm space-y-2">
              <div>• Ask for permission only when needed</div>
              <div>• Explain why you need location</div>
              <div>• Store data locally when possible</div>
              <div>• Use minimum accuracy required</div>
              <div>• Respect user's choice to deny</div>
            </div>
          </div>
          
          <div className="p-4 bg-green-50 dark:bg-green-900 rounded-lg border">
            <h4 className="font-semibold mb-3 mt-0">⚡ Performance Tips</h4>
            <div className="text-sm space-y-2">
              <div>• Cache location when appropriate</div>
              <div>• Use timeout to prevent hanging</div>
              <div>• Check if services are enabled</div>
              <div>• Handle errors gracefully</div>
              <div>• Don't track continuously unless needed</div>
            </div>
          </div>
        </div>

        <h2>7. Key Takeaways</h2>
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 p-6 rounded-lg border border-blue-200 dark:border-blue-800 my-6">
          <ul className="space-y-2 mb-0 text-blue-800 dark:text-blue-200">
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span><strong>expo-location</strong> makes location services simple across platforms</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span><strong>Permissions</strong> are critical—always explain why you need location</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span><strong>WebView maps</strong> provide simple visualization without complex setup</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span><strong>Local storage</strong> with AsyncStorage keeps user data private</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span><strong>Error handling</strong> is essential for good user experience</span>
            </li>
          </ul>
        </div>

        <div className="bg-green-50 dark:bg-green-950 p-6 rounded-lg border border-green-200 dark:border-green-800">
          <h4 className="text-green-800 dark:text-green-200 font-semibold mb-3 mt-0">
            🚀 Next Steps
          </h4>
          <div className="text-green-700 dark:text-green-300 space-y-2">
            <div>
              <strong>Advanced features:</strong> Background tracking, geofencing, turn-by-turn directions
            </div>
            <div>
              <strong>Better maps:</strong> Native map libraries like react-native-maps
            </div>
            <div>
              <strong>API integration:</strong> Weather, places, or business location data
            </div>
            <div>
              <strong>Optimization:</strong> Battery-efficient location tracking
            </div>
          </div>
        </div>
      </div>
    </>
  );
}