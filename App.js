import React, { useState, useRef } from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet, Modal, TouchableWithoutFeedback, Animated} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { CardStyleInterpolators } from '@react-navigation/stack';
import { NotificationProvider } from './src/NotificationContext';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import LandingScreen from './src/LandingScreen';
import SignInScreen from './src/SignIn';
import SignUpScreen from './src/SignUp';
import ReportScreen from './src/ReportCrimeInterface';
import CategorySelection from './src/Category';
import PersonalInfo from './src/PersonalInfo';
import CrimeInfo from './src/CrimeInfo';
import EvidenceInfo from './src/EvidenceInfo';
import SubmitInfo from './src/Submit';
import TrackScreen from './src/track';
import HomeScreen from './src/homes';
import EmergencyButton from './src/Emergency';
import NotifScreen from './src/notif';
import LegalScreen from './src/legalInfo';
import DetailedNotificationScreen from './src/DetailedNotificationScreen';
import AboutUsScreen from './src/AboutUsScreen';
import TermsAndConditionsScreen from './src/TermCondition';
import AccountSettings from './src/Account';
import EditProfileScreen from './src/EditProfile';


const Stack = createStackNavigator();


const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleLogout = () => {
    setShowConfirmation(true); // Show confirmation modal
  };

  const handleConfirmLogout = () => {
    setShowConfirmation(false); // Hide confirmation 
    navigation.navigate('SignIn'); // Navigate to SignIn screen

    // Perform logout action here if needed
  };

  const handleCancelLogout = () => {
    setShowConfirmation(false); // Hide confirmation modal
  };

  return (
    <NotificationProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen
          name="Landing"
          component={LandingScreen}
          options={{ headerShown: false }} // Hide header for Landing screen
        />
        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={{ headerShown: false }} // Hide header for SignIn screen
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{
            headerStyle: {
              backgroundColor: '#184965', // Background color for the header
            },
            headerTitleStyle: {
              flex: 1, // Ensures the title takes up the available space
              textAlign: 'center', // Centers the text horizontally
              alignSelf: 'center', // Centers the text vertically
              marginTop: 15, // Adjust as needed for vertical alignment
              color: '#fff', // Color of the header title text
              fontWeight: 'bold',
            },
            headerTitle: 'Sign Up',
            headerLeft: null, // Remove the back button
          }}
        />
        <Stack.Screen
          name="About Us"
          component={AboutUsScreen}
          options={{
            headerStyle: {
              backgroundColor: '#184965', // Background color for the header
            },
            headerTitleStyle: {
              flex: 1, // Ensures the title takes up the available space
              textAlign: 'center', // Centers the text horizontally
              alignSelf: 'center', // Centers the text vertically
              marginTop: 15, // Adjust as needed for vertical alignment
              color: '#fff', // Color of the header title text
              fontWeight: 'bold',
            },
            headerTitle: 'About Us',
            headerLeft: null, // Remove the back button
          }}
        />
        <Stack.Screen
          name="Account Settings"
          component={AccountSettings}
          options={{
            headerStyle: {
              backgroundColor: '#184965', // Background color for the header
            },
            headerTitleStyle: {
              flex: 1, // Ensures the title takes up the available space
              textAlign: 'center', // Centers the text horizontally
              alignSelf: 'center', // Centers the text vertically
              marginTop: 15, // Adjust as needed for vertical alignment
              color: '#fff', // Color of the header title text
              fontWeight: 'bold',
            },
            headerTitle: 'Account Settings',
          }}
        />
        <Stack.Screen
          name="TermCondition"
          component={TermsAndConditionsScreen}
          options={{
            headerStyle: {
              backgroundColor: '#184965', // Background color for the header
            },
            headerTitleStyle: {
              color: '#fff', // Color of the header title text
              fontWeight: 'bold',
            },
            headerTitleAlign: 'center', // Center the title horizontally
            headerTitle: 'Terms and Conditions',
            headerLeft: () => null, // Remove the back button
          }}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfileScreen}
          options={{
            headerStyle: {
              backgroundColor: '#184965', // Background color for the header
            },
            headerTitleStyle: {
              flex: 1, // Ensures the title takes up the available space
              textAlign: 'center', // Centers the text horizontally
              alignSelf: 'center', // Centers the text vertically
              marginTop: 15, // Adjust as needed for vertical alignment
              color: '#fff', // Color of the header title text
              fontWeight: 'bold',
            },
            headerTitle: 'Edit Profile',

          }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            headerStyle: {
              backgroundColor: '#184965', // Background color for the header
            },
            headerTitleStyle: {
              flex: 1, // Ensures the title takes up the available space
              marginTop: 15, // Adjust as needed for vertical alignment
              marginBottom: 10,
              color: '#fff', // Color of the header title text
              fontWeight: 'bold',
            },
            headerLeft: () => (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  source={require('./assets/Guardianlogo.png')}
                  style={{ width: 50, height: 40 }}
                  resizeMode="contain"
                />
                <View style={{ marginLeft: 10 }}>
                  <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>GuardianWatch</Text>
                  <Text style={{ color: '#fff', fontSize: 10 }}>Nasugbu Municipal Police Crime Reporting</Text>
                </View>
              </View>
            ),
            headerTitle: '', // Set an empty string to avoid duplicating the title
            headerRight: () => (
              <TouchableOpacity
                style={{ marginRight: 10 }}
                onPress={() => setModalVisible(true)} // Open the modal on press
              >
                <Image
                  source={require('./assets/icon2.png')}
                  style={{ width: 35, height: 35, tintColor: '#fff' }}
                />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="Detail"
          component={DetailedNotificationScreen}
          options={{
            headerStyle: {
              backgroundColor: '#184965', // Background color for the header
            },
            headerTitleStyle: {
              flex: 1, // Ensures the title takes up the available space
              textAlign: 'center', // Centers the text horizontally
              alignSelf: 'center', // Centers the text vertically
              marginTop: 15, // Adjust as needed for vertical alignment
              color: '#fff', // Color of the header title text
              fontWeight: 'bold',
            },
            headerTintColor: '#fff', // Color of the back arrow button
            headerTitle: 'Notification Detail', // Title text for the header
          }}
        />
        <Stack.Screen
    name="Emergency"
    component={EmergencyButton}
    options={{
      headerStyle: {
        backgroundColor: '#184965', // Background color for the header
      },
      headerTitleStyle: {
        flex: 1, // Ensures the title takes up the available space
        textAlign: 'center', // Centers the text horizontally
        alignSelf: 'center', // Centers the text vertically
        marginTop: 15, // Adjust as needed for vertical alignment
        color: '#fff', // Color of the header title text
        fontWeight: 'bold',
      },
      headerTintColor: '#fff', // Color of the back arrow button
      headerTitle: 'Emergency', // Title text for the header
    }}
  />
  <Stack.Screen
    name="Report"
    component={ReportScreen}
    options={{
      headerStyle: {
        backgroundColor: '#184965', // Background color for the header
      },
      headerTitleStyle: {
        flex: 1, // Ensures the title takes up the available space
        textAlign: 'center', // Centers the text horizontally
        alignSelf: 'center', // Centers the text vertically
        marginTop: 15, // Adjust as needed for vertical alignment
        color: '#fff', // Color of the header title text
        fontWeight: 'bold',
      },
      headerTintColor: '#fff', // Color of the back arrow button
      headerTitle: 'Report', // Title text for the header
    }}
  />
  <Stack.Screen
    name="Category"
    component={CategorySelection}
    options={{
      headerStyle: {
        backgroundColor: '#184965', // Background color for the header
      },
      headerTitleStyle: {
        flex: 1, // Ensures the title takes up the available space
        textAlign: 'center', // Centers the text horizontally
        alignSelf: 'center', // Centers the text vertically
        marginTop: 15, // Adjust as needed for vertical alignment
        color: '#fff', // Color of the header title text
        fontWeight: 'bold',
      },
      headerTintColor: '#fff', // Color of the back arrow button
      headerTitle: 'Category Selection', // Title text for the header
    }}
  />
  <Stack.Screen
    name="Personal"
    component={PersonalInfo}
    options={{
      headerStyle: {
        backgroundColor: '#184965', // Background color for the header
      },
      headerTitleStyle: {
        flex: 1, // Ensures the title takes up the available space
        textAlign: 'center', // Centers the text horizontally
        alignSelf: 'center', // Centers the text vertically
        marginTop: 15, // Adjust as needed for vertical alignment
        color: '#fff', // Color of the header title text
        fontWeight: 'bold',
      },
      headerTintColor: '#fff', // Color of the back arrow button
      headerTitle: 'Personal Information', // Title text for the header
    }}
  />
  <Stack.Screen
    name="CrimeInfo"
    component={CrimeInfo}
    options={{
      headerStyle: {
        backgroundColor: '#184965', // Background color for the header
      },
      headerTitleStyle: {
        flex: 1, // Ensures the title takes up the available space
        textAlign: 'center', // Centers the text horizontally
        alignSelf: 'center', // Centers the text vertically
        marginTop: 15, // Adjust as needed for vertical alignment
        color: '#fff', // Color of the header title text
        fontWeight: 'bold',
      },
      headerTintColor: '#fff', // Color of the back arrow button
      headerTitle: 'Crime Information', // Title text for the header
    }}
  />
  <Stack.Screen
    name="Evidence"
    component={EvidenceInfo}
    options={{
      headerStyle: {
        backgroundColor: '#184965', // Background color for the header
      },
      headerTitleStyle: {
        flex: 1, // Ensures the title takes up the available space
        textAlign: 'center', // Centers the text horizontally
        alignSelf: 'center', // Centers the text vertically
        marginTop: 15, // Adjust as needed for vertical alignment
        color: '#fff', // Color of the header title text
        fontWeight: 'bold',
      },
      headerTintColor: '#fff', // Color of the back arrow button
      headerTitle: 'Evidence Information', // Title text for the header
    }}
  />
  <Stack.Screen
    name="Submit"
    component={SubmitInfo}
    options={{
      headerStyle: {
        backgroundColor: '#184965', // Background color for the header
      },
      headerTitleStyle: {
        flex: 1, // Ensures the title takes up the available space
        textAlign: 'center', // Centers the text horizontally
        alignSelf: 'center', // Centers the text vertically
        marginTop: 15, // Adjust as needed for vertical alignment
        color: '#fff', // Color of the header title text
        fontWeight: 'bold',
      },
      headerTintColor: '#fff', // Color of the back arrow button
      headerTitle: 'Submit', // Title text for the header
    }}
  />
  <Stack.Screen
    name="TrackCase"
    component={TrackScreen}
    options={{
      headerStyle: {
        backgroundColor: '#184965', // Background color for the header
      },
      headerTitleStyle: {
        flex: 1, // Ensures the title takes up the available space
        textAlign: 'center', // Centers the text horizontally
        alignSelf: 'center', // Centers the text vertically
        marginTop: 15, // Adjust as needed for vertical alignment
        color: '#fff', // Color of the header title text
        fontWeight: 'bold',
      },
      headerTintColor: '#fff', // Color of the back arrow button
      headerTitle: 'Track Crime', // Title text for the header
    }}
  />
  <Stack.Screen
    name="Legal"
    component={LegalScreen}
    options={{
      headerStyle: {
        backgroundColor: '#184965', // Background color for the header
      },
      headerTitleStyle: {
        flex: 1, // Ensures the title takes up the available space
        textAlign: 'center', // Centers the text horizontally
        alignSelf: 'center', // Centers the text vertically
        marginTop: 15, // Adjust as needed for vertical alignment
        color: '#fff', // Color of the header title text
        fontWeight: 'bold',
      },
      headerTintColor: '#fff', // Color of the back arrow button
      headerTitle: 'Legal Information', // Title text for the header
    }}
  />
  <Stack.Screen
    name="Notification"
    component={NotifScreen}
    options={{
      headerStyle: {
        backgroundColor: '#184965', // Background color for the header
      },
      headerTitleStyle: {
        flex: 1, // Ensures the title takes up the available space
        textAlign: 'center', // Centers the text horizontally
        alignSelf: 'center', // Centers the text vertically
        marginTop: 15, // Adjust as needed for vertical alignment
        color: '#fff', // Color of the header title text
        fontWeight: 'bold',
      },
      headerTintColor: '#fff', // Color of the back arrow button
      headerTitle: 'Notifications', // Title text for the header
    }}
  />
      </Stack.Navigator>

      {/* Modal for Logout */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <ModalContent
          setModalVisible={setModalVisible}
          handleLogout={handleLogout}
        />
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showConfirmation}
        onRequestClose={() => {
          setShowConfirmation(false);
        }}
      >
        <View style={styles.confirmationModalContainer}>
          <View style={styles.confirmationModalContent}>
            <Text style={styles.confirmationText}>Are you sure you want to logout?</Text>
            <View style={styles.confirmationButtons}>
              <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmLogout}>
                <Text style={styles.confirmButtonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={handleCancelLogout}>
                <Text style={styles.cancelButtonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </NavigationContainer>
    </NotificationProvider>
  );
};

const AnimatedTouchable = ({ onPress, children, style }) => {
  const scaleValue = useRef(new Animated.Value(1)).current;
  const [isPressed, setIsPressed] = useState(false);


  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
    onPress();
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
      <TouchableOpacity
        style={style}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        {children}
      </TouchableOpacity>
    </Animated.View>
  );
};

const ModalContent = ({ setModalVisible, handleLogout }) => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('Lovely29');

  const activeStyle = {
    backgroundColor: '#003c56', // Change this to any color you like for the active state
  };

  return (
    <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
      <View style={styles.modalContainer}>
        <TouchableWithoutFeedback onPress={() => { }}>
          <View style={styles.modalContent}>
            <View style={styles.profileHeader}>
              <View style={styles.profileIcon}>
                <Icon name="person" size={48} color="#fff" />
                <TouchableWithoutFeedback
                  onPress={() => {
                    setModalVisible(false); // Close the modal
                    navigation.navigate('EditProfile');
                  }}
                >
                  <View style={styles.pencilIconContainer}>
                    <Icon name="pencil" size={24} color="#6a1b9a" />
                  </View>
                </TouchableWithoutFeedback>
              </View>
              <Text style={styles.userName}>{username}</Text>
            </View>
            <View style={styles.sectionContainer}>
              <AnimatedTouchable
                style={styles.personalDetails}
                activeStyle={activeStyle}
                onPress={() => {
                  setModalVisible(false); // Close the modal
                  navigation.navigate('Account Settings');
                }}
              >
                <View style={styles.iconAndText}>
                  <Image source={require('./assets/setting.png')} style={[styles.iconImage1, styles.whiteImage]} />
                  <Text style={styles.detailsText}>Account Settings</Text>
                </View>
              </AnimatedTouchable>
              <AnimatedTouchable
                style={styles.AboutUs}
                activeStyle={activeStyle}
                onPress={() => {
                  setModalVisible(false); // Close the modal
                  navigation.navigate('About Us');
                }}
              >
                <View style={styles.iconAndText}>
                  <Image source={require('./assets/aboutUs.png')} style={[styles.iconImage, styles.whiteImage]} />
                  <Text style={styles.detailsText}>About Us</Text>
                </View>
              </AnimatedTouchable>
              <AnimatedTouchable
                style={styles.Terms}
                activeStyle={activeStyle}
                onPress={() => {
                  setModalVisible(false); // Close the modal
                  navigation.navigate('TermCondition');
                }}
              >
                <View style={styles.iconAndText}>
                  <Image source={require('./assets/Term.png')} style={[styles.iconTerm, styles.whiteImage]} />
                  <Text style={styles.detailsText}>Terms of Service</Text>
                </View>
              </AnimatedTouchable>
              <AnimatedTouchable
                style={styles.logout}
                activeStyle={activeStyle}
                onPress={handleLogout} // Use handleLogout for sign out
              >
                <View style={styles.iconAndText}>
                  <Image source={require('./assets/logout.png')} style={[styles.iconImage, styles.whiteImage]} />
                  <Text style={styles.detailsText}>Sign Out</Text>
                </View>
              </AnimatedTouchable>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    paddingHorizontal: 5,
    width: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 10,
  },
  profileHeader: {
    paddingVertical: 15,
    alignItems: 'center',
  },
  profileIcon: {
    width: 120,
    height: 120,
    borderWidth: 3,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#184965',
    borderRadius: 60,
    marginBottom: 10,
    position: 'relative', // Add this
  },
  pencilIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 5,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  sectionContainer: {
    marginTop: 5,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingVertical: 30,
    paddingHorizontal: 30,
    backgroundColor: '#184965', // Optional: to differentiate the section container visually
  },
  personalDetails: {
    paddingVertical: 10,
    borderRadius: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    marginBottom: 10,
  },
  AboutUs: {
    paddingVertical: 10,
    borderRadius: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    marginBottom: 10,
  },
  Terms: {
    paddingVertical: 10,
    borderRadius: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    marginBottom: 10,
  },
  logout: {
    paddingVertical: 5,
    borderRadius: 10,
  },
  detailsText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    elevation: 2,
    alignItems: 'center',
  },
  buttonLogout: {
    backgroundColor: '#FF6347',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  iconAndText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconImage: {
    width: 30, // Adjust the size as needed
    height: 30, // Adjust the size as needed
    marginRight: 20, // Adjust the space between the icon and text as needed
    marginLeft: 5,
    tintColor: '#fff', // Set the image color to white
  },
  iconImage1: {
    width: 35, // Adjust the size as needed
    height: 35, // Adjust the size as needed
    marginRight: 18, // Adjust the space between the icon and text as needed
    marginLeft: 3,
    tintColor: '#fff', // Set the image color to white
  },
  iconTerm: {
    width: 40, // Adjust the size as needed
    height: 40, // Adjust the size as needed
    marginRight: 8, // Adjust the space between the icon and text as needed
    marginLeft: 5,
    tintColor: '#fff', // Set the image color to white
  },
  whiteImage: {
    tintColor: '#fff', // Ensure images are white
  },
  confirmationModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  confirmationModalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  confirmationText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  confirmationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  confirmButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: '#dc3545',
    padding: 15,
    borderRadius: 5,
  },
  confirmButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cancelButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default App;