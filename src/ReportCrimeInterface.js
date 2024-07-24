import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useNotifications } from './NotificationContext';


const ReportScreen = () => {
  const { unreadCount } = useNotifications();
  const navigation = useNavigation();
  const [isPressed, setIsPressed] = useState(false);

  const handleProceed = () => {
    console.log("Navigating to Category screen...");
    navigation.navigate('Category');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.inputContainer}>
          <Text style={styles.welcomeText}>Welcome to Guardian Watch</Text>
          <Text style={styles.welcomeText1}>Crime Reporting System</Text>
          <Image source={require('./nasugbuLogo.jpg')} style={styles.logo} />
          <Text style={styles.disclaimerText1}>Disclaimer</Text>
          <Text style={styles.disclaimerText}>
            Selecting the right crime category is vital for accurate reporting and prompt response from law enforcement.
          </Text>
          <Text style={styles.disclaimerText}>
            Choose the category that best matches your incident to streamline the reporting process and ensure effective handling. If unsure, provide a brief description in the next step, and our team will assist you further.
          </Text>
          <Text style={styles.disclaimerText}>
            Thank you for contributing to community safety and security.
          </Text>
          <TouchableWithoutFeedback
            onPress={handleProceed}
            onPressIn={() => setIsPressed(true)}
            onPressOut={() => setIsPressed(false)}
          >
            <View style={[
              styles.proceedButton,
              isPressed && styles.proceedButtonPressed
            ]}>
              <Text style={[
                styles.proceedButtonText,
                isPressed && styles.proceedButtonTextPressed
              ]}>Proceed</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </ScrollView>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flexGrow: 1,
    padding: 20,
    marginBottom: 70,
  },
  welcomeText: {
    fontSize: 22,
    marginBottom: 5,
    color: '#184965',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  welcomeText1: {
    fontSize: 22,
    marginBottom: 5,
    color: '#184965',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginBottom: 37,
    marginTop: 20,
  },
  disclaimerText1: {
    fontSize: 14,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#184965',
  },
  disclaimerText: {
    fontSize: 12,
    marginBottom: 4,
    textAlign: 'justify',
    color: '#184965',
  },
  inputContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  proceedButton: {
    backgroundColor: '#184965',
    width: 150,
    height: 35,
    borderRadius: 30,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  proceedButtonPressed: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#184965',
    opacity: 0.7,
  },
  proceedButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  proceedButtonTextPressed: {
    color: '#184965',
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

export default ReportScreen;