import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView, Platform, Dimensions, FlatList, Alert,  Modal, setModalVisible } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { LinearGradient } from 'expo-linear-gradient';
import { useNotifications } from './NotificationContext';

const images = [
  require('./mps.png'),
  require('./pic2.jpg'),
  require('./pic3.jpg'),
];

const HomeScreen = () => {
  const { unreadCount } = useNotifications();
  const navigation = useNavigation();
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const [location, setLocation] = useState(null);
  const [region, setRegion] = useState(null);
  const [modalVisible, setModalVisible] = useState(false); // Modal state

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

  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex = currentIndex + 1;
      if (nextIndex >= images.length) {
        nextIndex = 0;
      }
      flatListRef.current.scrollToIndex({ animated: true, index: nextIndex });
      setCurrentIndex(nextIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleDotPress = (index) => {
    flatListRef.current.scrollToIndex({ animated: true, index });
    setCurrentIndex(index);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <FlatList
          ref={flatListRef}
          data={images}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Image source={item} style={[styles.image, { width: windowWidth, height: windowHeight * 0.3 }]} />
          )}
          onScroll={(event) => {
            const slideIndex = Math.floor(event.nativeEvent.contentOffset.x / windowWidth);
            setCurrentIndex(slideIndex);
          }}
        />
        {region && (
          <MapView
            style={[styles.map, { height: windowHeight * 0.5 }]}
            initialRegion={region}
            region={region}
            showsUserLocation={true}
            showsMyLocationButton={true}
          >
            <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
          </MapView>
        )}
        <View style={[styles.overlayButtons, { zIndex: 1 }]}>
          <TouchableOpacity style={styles.overlayButton} onPress={() => navigation.navigate('Report')}>
            <LinearGradient
              colors={['#ADD8E6', '#5F9EA0']}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.gradient}
            >
              <Image source={require('./reports.png')} style={styles.overlayIcon1} />
              <Text style={styles.overlayButtonText}>Want to report {'\n'}a crime?</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.overlayButton1, { marginLeft: 10 }]} onPress={() => navigation.navigate('CaseHistory')}>
            <LinearGradient
              colors={['#ADD8E6', '#5F9EA0']} // Dark green to light green
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.gradient1}
            >
              <Image source={require('./history.png')} style={styles.overlayIcon} />
              <Text style={styles.overlayButtonText}>Your case {'\n'}history</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Report')}>
            <Image source={require('./reportnav.png')} style={styles.footerIcon} />
            <Text style={styles.footerButtonText}>Report</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Legal')}>
            <Image source={require('./legal.png')} style={styles.footerIcon} />
            <Text style={styles.footerButtonText}>Legal Info</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Home')}>
            <Image source={require('./home.png')} style={styles.footerIcon} />
            <Text style={styles.footerButtonText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Notification')}>
          <View style={styles.footerIconContainer}>
            <Image source={require('./notif.png')} style={styles.footerIcon} />
            {unreadCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{unreadCount}</Text>
              </View>
            )}
          </View>
          <Text style={styles.footerButtonText}>Notification</Text>
        </TouchableOpacity>
          <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('TrackCase')}>
            <Image source={require('./track.png')} style={styles.footerIcon} />
            <Text style={styles.footerButtonText}>Track Case</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 30,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerLogo: {
    width: 30,
    height: 30,
    marginRight: 5,
  },
  headerTitle: {
    fontWeight: 'bold',
    color: '#191970',
  },
  headerSubtitle: {
    color: '#191970',
    fontSize: 9,
  },
  profileIcon: {
    width: 35,
    height: 35,
    borderRadius: 15,
  },
  content: {
    flex: 1,
  },
  image: {
    resizeMode: 'cover',
  },
  overlayButtons: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ translateY: -150 }],
  },
  gradient: {
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  gradient1: {
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 25,
    alignItems: 'center',
  },
  overlayButton: {
    paddingHorizontal: 10,
    marginHorizontal: 5,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'column',
  },
  overlayButton1: {
    marginHorizontal: 5,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'column',
  },
  overlayIcon1: {
    width: 35,
    height: 45,
    marginBottom: 5,
  },
  overlayIcon: {
    width: 38,
    height: 40,
    marginBottom: 5,
  },
  overlayButtonText: {
    fontSize: 16,
    color: '#191970',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  map: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    overflow: 'hidden',
    paddingVertical: 180,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 5,
    backgroundColor: '#f8f8f8',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  footerButton: {
    alignItems: 'center',
  },
  footerIcon: {
    width: 25,
    height: 25,
    marginBottom: 5,
  },
  footerIconHome: {
    width: 30,
    height: 25,
  },
  footerButtonText: {
    fontSize: 10,
    textAlign: 'center',
  },
  badge: {
    position: 'absolute',
    right: -6,
    top: -3,
    backgroundColor: 'red',
    borderRadius: 6,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default HomeScreen;