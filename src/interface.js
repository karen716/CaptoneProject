import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ReportScreen = () => {
  const navigation = useNavigation();

  const handleProceed = () => {
    navigation.navigate('Category');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          {/* Back Button content */}
        </TouchableOpacity>
        <Text style={styles.headerText}>Report a Crime</Text>
      </View>
      <ScrollView style={styles.content}>
        <Text style={styles.welcomeText}>Welcome to Guardian Watch</Text>
        <Text style={styles.welcomeText1}>Crime Reporting System</Text>
        <Image source={require('./logo1.png')} style={styles.logo} />
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
      </ScrollView>
      <TouchableOpacity style={styles.proceedButton} onPress={handleProceed}>
        <Text style={styles.proceedButtonText}>Proceed</Text>
      </TouchableOpacity>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton}>
          <Image source={require('./reportnav.png')} style={styles.footerIcon} />
          <Text style={styles.footerButtonText}>Report</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Image source={require('./legal.png')} style={styles.footerIcon} />
          <Text style={styles.footerButtonText}>Legal Info</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButtonHome}>
          <Image source={require('./home.png')} style={styles.footerIconHome} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Image source={require('./notif.png')} style={styles.footerIcon} />
          <Text style={styles.footerButtonText}>Notification</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
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
  header: {
    backgroundColor: '#4682b4',
    padding: 20,
    marginTop: 40,
    marginBottom: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 10,
  },
  headerText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  content: {
    flex: 1,
    padding: 20,
    marginBottom: 70, // Add some bottom margin to avoid overlap with the button
  },
  welcomeText: {
    fontSize: 22,
    marginBottom: 5,
    color: '#6495ed',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  welcomeText1: {
    fontSize: 22,
    marginBottom: 5,
    color: '#6495ed',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logo: {
    width: 150,
    height: 200,
    alignSelf: 'center',
    marginBottom: 37,
    marginTop: 20,
  },
  disclaimerText1: {
    fontSize: 14,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'left', // Centered the disclaimer header text
  },
  disclaimerText: {
    fontSize: 12,
    marginBottom: 4, // Added some margin bottom for better spacing
    textAlign: 'left', // Centered the disclaimer text
  },
  proceedButton: {
    backgroundColor: '#007bff',
    width: 150,
    height: 35,
    borderRadius: 30,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 85, // Adjust the position above the footer
  },
  proceedButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderTopWidth: 1,
    borderTopColor: '#e7e7e7',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  footerButton: {
    alignItems: 'center',
  },
  footerIcon: {
    width: 24,
    height: 24,
    marginBottom: 5,
  },
  footerIconHome: {
    width: 35,
    height: 35,
  },
  footerButtonText: {
    fontSize: 12,
    textAlign: 'center',
  },
});

export default ReportScreen;
