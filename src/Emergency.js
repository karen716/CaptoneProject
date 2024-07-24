import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Image,
  Modal,
  Linking,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';

const EmergencyButton = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [location, setLocation] = useState(null);
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const startAnimation = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scale, {
            toValue: 1.1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(scale, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };
    startAnimation();
  }, [scale]);

  const handlePress = () => {
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const handleLanding = () => {
    navigation.navigate('Landing');
  };

  const handleCallHotline = async (number) => {
    const hotlineNumber = `tel:${number}`;
    Linking.openURL(hotlineNumber);
    setModalVisible(false);
  
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission to access location was denied');
      return;
    }
  
    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  
    if (location) {
      const reverseGeocode = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
  
      const combinedLocation = `${reverseGeocode[0].street || reverseGeocode[0].name || ''}, ${reverseGeocode[0].city}, ${reverseGeocode[0].subregion}, ${reverseGeocode[0].region}, ${reverseGeocode[0].country}, ${reverseGeocode[0].postalCode}`;
  
      try {
        const response = await fetch('http://192.168.1.13:8000/submitEmergency', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            combinedLocation: combinedLocation,
          }),
        });
  
        if (!response.ok) {
          throw new Error('Failed to save data');
        }
  
        Alert.alert('Emergency reported successfully');
      } catch (error) {
        console.error(error);
        Alert.alert('Failed to report emergency');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Having an Emergency?</Text>
      <Text style={styles.subtitle}>Press the button below</Text>
      <Text style={styles.subtitle}>Help will arrive soon.</Text>

      <View style={styles.overlayContainer}>
        <Animated.View style={[styles.button3, { transform: [{ scale }] }]} />
        <Animated.View style={[styles.button2, { transform: [{ scale }] }]} />
        <Animated.View style={[styles.button1, { transform: [{ scale }] }]} />
        <Animated.View style={[styles.button, { transform: [{ scale }] }]}>
          <TouchableOpacity onPress={handlePress}>
            <Image source={require('./hand.png')} style={styles.icon} />
            <Text style={styles.Text1}>Click Me!</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>

      <TouchableOpacity onPress={handleLanding}>
        <Text style={styles.cancelText}>CANCEL</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCancel}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Hotline Nasugbu MPS</Text>
            <Text style={[styles.modalSubtitle, { fontSize: 12 }]}>Press a button below to call the hotline:</Text>
            <TouchableOpacity style={styles.callButton} onPress={() => handleCallHotline('09275001199')}>
              <Text style={styles.callButtonText}>Call Globe Hotline:</Text>
              <Text style={styles.callButtonText}>09275001199</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.callButton} onPress={() => handleCallHotline('09985985697')}>
              <Text style={styles.callButtonText}>Call Smart Hotline:</Text>
              <Text style={styles.callButtonText}>09985985697</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.callButton1} onPress={() => handleCallHotline('0434162027')}>
              <Text style={styles.callButtonText}>Call Landline Hotline:</Text>
              <Text style={styles.callButtonText}>(043) 4162027</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCancel} style={styles.cancelModalButton}>
              <Text style={styles.cancelModalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    marginTop: 50,
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#184965',
  },
  subtitle: {
    fontSize: 22,
    marginBottom: 5,
    fontWeight: 'bold',
    color: '#696969',
  },
  overlayContainer: {
    marginTop: 50,
    marginBottom: 80,
    position: 'relative',
    width: 250,
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    position: 'absolute',
    zIndex: 3,
    backgroundColor: '#ff4c4c',
    padding: 20,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
    height: 120,
    shadowColor: 'rgba(255, 76, 76, 0.5)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 5,
    elevation: 6,
  },
  button1: {
    position: 'absolute',
    zIndex: 2,
    backgroundColor: '#E57373',
    padding: 20,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    width: 180,
    height: 180,
    shadowColor: 'rgba(255, 76, 76, 0.5)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 5,
    elevation: 6,
  },
  button2: {
    position: 'absolute',
    zIndex: 1,
    backgroundColor: '#EF9A9A',
    padding: 20,
    borderRadius: 150,
    alignItems: 'center',
    justifyContent: 'center',
    width: 250,
    height: 250,
    shadowColor: 'rgba(255, 76, 76, 0.5)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 5,
    elevation: 6,
  },
  button3: {
    position: 'absolute',
    zIndex: 1,
    backgroundColor: '#FFCDD2',
    padding: 20,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 200,
    shadowColor: 'rgba(255, 76, 76, 0.5)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 5,
    elevation: 6,
  },
  buttonText: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  cancelText: {
    fontSize: 18,
    color: '#ff4c4c',
    marginTop: 20,
    fontWeight: 'bold',
  },
  Text1: {
    fontSize: 12,
    color: '#fff',
    marginTop: 10,
    fontWeight: 'bold',
  },
  icon: {
    width: 50,
    height: 50,
    alignSelf: 'center',
    tintColor: '#FFFFFF', // Set the icon color to white
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#184965',
  },
  modalSubtitle: {
    fontSize: 20,
    marginBottom: 20,
    color: '#696969',
    textAlign: 'center',
  },
  callButton: {
    backgroundColor: '#184965',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  callButton1: {
    backgroundColor: '#184965',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  callButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cancelModalButton: {
    marginTop: 10,
  },
  cancelModalButtonText: {
    color: '#ff4c4c',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default EmergencyButton;