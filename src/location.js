// LocationDetector.js

import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';

const LocationDetector = () => {
  const [location, setLocation] = useState(null);
  const [region, setRegion] = useState(null);
  const navigation = useNavigation();

  const handleDetectLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission to access location was denied');
      return;
    }

    try {
      let { coords } = await Location.getCurrentPositionAsync({});
      let { latitude, longitude } = coords;

      // Fetch address details using reverse geocoding
      let addressResponse = await Location.reverseGeocodeAsync({ latitude, longitude });

      if (addressResponse.length > 0) {
        let { street, name, neighborhood, city, region, country, postalCode } = addressResponse[0];

        // Format the address string
        let formattedAddress = `${street || name || ''}, ${city}, ${region}, ${country}, ${postalCode}`;

        // Set location state to formatted address
        setLocation(formattedAddress);

        // Set region state for the MapView
        setRegion({
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      } else {
        Alert.alert('Address not found');
      }
    } catch (error) {
      console.error('Error fetching location:', error);
      Alert.alert('Error fetching location', error.message);
    }
  };

  useEffect(() => {
    handleDetectLocation(); // Automatically detect location on component mount
  }, []);

  const handleProceed = () => {
    navigation.navigate('voice'); // Navigate to VoiceRecorder screen
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleDetectLocation}>
        <Text style={styles.buttonText}>Detect My Location</Text>
      </TouchableOpacity>
      {region && (
        <MapView
          style={styles.map}
          initialRegion={region}
          region={region}
          showsUserLocation={true}
          showsMyLocationButton={true}
        >
          <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
        </MapView>
      )}
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.textField}>{location || ''}</Text>
      </ScrollView>
      <TouchableOpacity style={styles.proceedButton} onPress={handleProceed}>
        <Text style={styles.buttonText}>Proceed</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    marginTop: 100,
  },
  proceedButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  scrollView: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    width: '100%',
    borderRadius: 5,
    minHeight: 50, // Minimum height of the scrollView
  },
  textField: {
    fontSize: 16,
  },
  map: {
    width: '100%',
    height: 300,
    marginTop: 20,
    borderRadius: 10,
  },
});

export default LocationDetector;
