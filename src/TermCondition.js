import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { CheckBox } from 'react-native-elements';

const { height: screenHeight } = Dimensions.get('window');

const TermsAndConditionsScreen = ({ navigation }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (newValue) => {
    console.log('Checkbox value:', newValue); // Debugging line
    setIsChecked(newValue);
  };

  const handleContinuePress = () => {
    if (isChecked) {
      navigation.navigate('Home'); // Navigate to the home screen or wherever needed
    } else {
      Alert.alert('Terms and Conditions', 'You must accept the terms and conditions to continue.');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.content}>
          <Text style={styles.text1}>
            Welcome to GuardianWatch. By using our service, you agree to the following terms and conditions. Please read them carefully.
          </Text>
          <Text style={styles.heading}>1. Introduction</Text>
          <Text style={styles.text}>
            Welcome to GuardianWatch. By accessing or using our service, you agree to comply with and be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our service.
          </Text>
          
          <Text style={styles.heading}>2. Acceptance of Terms</Text>
          <Text style={styles.text}>
            By using our Service, you agree to these Terms and Conditions and our Privacy Policy. We reserve the right to update or modify these terms at any time without prior notice. Your continued use of the Service after such changes constitutes your acceptance of the new terms.
          </Text>
          
          <Text style={styles.heading}>3. User Responsibilities</Text>
          <Text style={styles.text}>
            You are responsible for maintaining the confidentiality of your account and password and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account or any other breach of security. We are not liable for any loss or damage arising from your failure to protect your account.
          </Text>
          
          <Text style={styles.heading}>4. Limitation of Liability</Text>
          <Text style={styles.text}>
            To the fullest extent permitted by law, GuardianWatch will not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from (a) your use or inability to use the Service; (b) any unauthorized access to or use of our servers and/or any personal information stored therein.
          </Text>
          
          <Text style={styles.heading}>5. Termination</Text>
          <Text style={styles.text}>
            We reserve the right to terminate or suspend your account and access to the Service immediately, without prior notice or liability, if you breach any terms of this Agreement. Upon termination, your right to use the Service will immediately cease.
          </Text>
          
          <Text style={styles.heading}>6. Governing Law</Text>
          <Text style={styles.text}>
            These Terms and Conditions shall be governed and construed in accordance with the laws of the state or country in which GuardianWatch operates, without regard to its conflict of law principles. Any disputes arising under or in connection with these Terms and Conditions shall be subject to the exclusive jurisdiction of the courts located in the relevant jurisdiction.
          </Text>
          
          <Text style={styles.heading}>7. Contact Information</Text>
          <Text style={styles.text}>
            For any questions or concerns regarding these Terms and Conditions, please contact us at support@guardianwatch.com.
          </Text>
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <View style={styles.checkboxContainer}>
          <CheckBox
            checked={isChecked}
            onPress={() => handleCheckboxChange(!isChecked)}
            containerStyle={styles.checkbox}
          />
          <Text style={styles.checkboxLabel}>
            I have read and agree to the {' '}
            <Text style={styles.link} onPress={() => Alert.alert('Link to Terms and Conditions')}>Terms and Conditions</Text>
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.button, !isChecked && styles.buttonDisabled]}
          onPress={handleContinuePress}
          disabled={!isChecked}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollViewContent: {
    padding: 10,
    paddingBottom: 150, // Ensure there's enough padding at the bottom for the footer
  },
  content: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  text: {
    fontSize: 14,
    marginBottom: 15,
    textAlign: 'justify',
  },
  text1: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'justify',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    flexWrap: 'wrap', // Allows the text to wrap if needed
  },
  checkbox: {
    marginRight: 10,
    marginLeft: 0, // Aligns checkbox to the start
  },
  checkboxLabel: {
    fontSize: 16,
    flex: 1, // Allows label text to take up remaining space
  },
  link: {
    color: '#007bff',
    textDecorationLine: 'underline',
  },
  button: {
    backgroundColor: '#184965',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: '#a0a0a0',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    justifyContent: 'center', // Center footer content vertically
  },
});

export default TermsAndConditionsScreen;
