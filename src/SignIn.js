import React, { useState, useCallback, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, TouchableHighlight, Modal, Pressable, Alert, ScrollView, Image } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignInScreen = () => {
  const navigation = useNavigation();
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [buttonColor, setButtonColor] = useState('#FFFFFF');
  const [buttonTextColor, setButtonTextColor] = useState('#184965');
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [modalTitle, setModalTitle] = useState('Forgot Password?');
  const verificationCodeInputs = Array(6).fill(null);
  const inputRefs = useRef(verificationCodeInputs.map(() => React.createRef()));


const handleForgotPassword = () => {
    setModalTitle('Forgot Password?');
    setModalVisible(true);
  };
  const handleUserNameChange = (text) => {
    setUserName(text);
  };
  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setVerificationCode(['', '', '', '', '', '']);
  };

  const handleEmailSubmit = () => {
    console.log('Email submitted:', email);
    setModalTitle('Enter Verification Code');
  };

  const handleVerificationSubmit = () => {
    console.log('Verification code submitted:', verificationCode.join(''));
    setModalVisible(false);
  };

 const handleButtonPressIn = () => {
    setButtonColor('#184965');
    setButtonTextColor('#ffffff');
  };

  const handleButtonPressOut = () => {
    setButtonColor('#FFFFFF');
    setButtonTextColor('#184965');
  };

  const handleVerificationCodeChange = (text, index) => {
    if (text.length === 0 && index > 0) {
      // Handle backspacing: move focus to the previous input
      inputRefs.current[index - 1].focus();
    }
    if (text.length > 0 && index < verificationCodeInputs.length - 1) {
      inputRefs.current[index + 1].focus();
    }

    const updatedCode = [...verificationCode];
    updatedCode[index] = text;
    setVerificationCode(updatedCode);
  };


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignIn = async () => {
    try {
      const response = await axios.post('http://192.168.1.13:8000/login', { username, password });
      if (response.data.success) {
        const userId = response.data.userId;
        await AsyncStorage.setItem('userId', userId.toString());
        navigation.navigate('Home', { userId });
      } else {
        Alert.alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      if (error.response && error.response.status === 401) {
        Alert.alert('Invalid Credentials', 'Username or password is incorrect.');
      } else {
        Alert.alert('Login Error', 'An error occurred during login. Please try again later.');
      }
    }
  };

  const navigateToSignUp = () => {
    navigation.navigate('SignUp');
  };

  useFocusEffect(
    useCallback(() => {
      setUserName('');
      setPassword('');
    }, [])
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Image source={require('./logoUpdated.png')} style={styles.profileImage} />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#696969"
            value={username}
            onChangeText={handleUserNameChange}
          />
          <View style={styles.passwordInput}>
            <TextInput
              style={styles.inputField}
              placeholder="Password"
              placeholderTextColor="#696969"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={handlePasswordChange}
            />
            <TouchableHighlight onPress={togglePasswordVisibility}>
              <Entypo name={showPassword ? 'eye' : 'eye-with-line'} size={20} color="#000000" />
            </TouchableHighlight>
          </View>
          <TouchableHighlight onPress={handleForgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot password?</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={[styles.button, { backgroundColor: buttonColor }]}
            onPressIn={handleButtonPressIn}
            onPressOut={handleButtonPressOut}
            onPress={handleSignIn}
            underlayColor="#184965"
          >
            <Text style={[styles.buttonText, { color: buttonTextColor }]}>Sign In</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={navigateToSignUp}>
            <Text style={styles.signupText}>Don't have an account? Sign up </Text>
          </TouchableHighlight>
        </View>
  
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={handleModalClose}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{modalTitle}</Text>
              {modalTitle === 'Forgot Password?' && (
                <TextInput
                  style={[styles.input, styles.modalInput]}
                  placeholder="Enter your email"
                  placeholderTextColor="#696969"
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                />
              )}
              {modalTitle === 'Enter Verification Code' && (
                <View style={styles.verificationContainer}>
                  <Text style={styles.verificationText}>
                    Enter verification code sent to your email address.
                  </Text>
                  <View style={styles.verificationCodeInput}>
                    {verificationCodeInputs.map((_, index) => (
                      <TextInput
                        key={index}
                        ref={(ref) => (inputRefs.current[index] = ref)}
                        style={styles.verificationDigitInput}
                        placeholder="_"
                        placeholderTextColor="#696969"
                        value={verificationCode[index]}
                        onChangeText={(text) => handleVerificationCodeChange(text, index)}
                        keyboardType="numeric"
                        maxLength={1}
                      />
                    ))}
                  </View>
                  <TouchableHighlight onPress={() => console.log('Resend code')}>
                    <Text style={styles.resendText}>Didn't Get a Code? Resend</Text>
                  </TouchableHighlight>
                </View>
              )}
              <View style={styles.modalButtons}>
                <Pressable style={styles.modalButton} onPress={modalTitle === 'Forgot Password?' ? handleEmailSubmit : handleVerificationSubmit}>
                  <Text style={styles.modalButtonText}>Submit</Text>
                </Pressable>
                <Pressable style={styles.modalButton} onPress={handleModalClose}>
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
    );
  };
  
  const styles = StyleSheet.create({
    scrollContainer: {
      flexGrow: 1,
    },
    container: {
      flex: 1,
      backgroundColor: '#184965',
      alignItems: 'center',
      justifyContent: 'center',
    },
    profileImage: {
      marginTop: 50,
      width: 150,
      height: 150,
      marginBottom: 50,
    },
    inputContainer: {
      width: '75%',
      marginBottom: 30,
      alignItems: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#FFFFFF',
      textAlign: 'center',
    },
    input: {
      width: '100%',
      height: 40,
      borderWidth: 2,
      borderColor: '#FFFFFF',
      backgroundColor: '#FFFFFF',
      borderRadius: 20,
      paddingHorizontal: 20,
      marginBottom: 20,
      fontSize: 18,
      color: '#000',
    },
    passwordInput: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      height: 40,
      borderWidth: 2,
      borderColor: '#ffffff',
      backgroundColor: '#FFFFFF',
      borderRadius: 20,
      paddingHorizontal: 20,
      marginBottom: 20,
    },
    inputField: {
      flex: 1,
      fontSize: 18,
      color: '#000',
    },
    button: {
      backgroundColor: '#FFFFFF',
      padding: 10,
      borderRadius: 20,
      marginBottom: 15,
      width: '40%',
      alignItems: 'center',
      marginTop: 100,
    },
    buttonText: {
      color: '#184965',
      fontSize: 20,
      fontWeight: 'bold',
    },
    signupText: {
      color: '#ffffff',
      textDecorationLine: 'underline',
    },
    forgotPasswordText: {
      color: '#ffffff',
      textDecorationLine: 'underline',
    },
    modalContainer: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: '#FFFFFF',
      padding: 20,
      borderRadius: 10,
      width: '80%',
      alignItems: 'center',
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    modalButtons: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
      marginTop: 20,
    },
    modalButton: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 20,
      backgroundColor: '#184965',
    },
    modalButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalInput: {
      width: '100%',
      height: 40,
      borderWidth: 2,
      borderColor: '#184965',
      backgroundColor: '#FFFFFF',
      borderRadius: 5,
      paddingHorizontal: 20,
      marginBottom: 5,
      fontSize: 18,
      color: '#000',
    },
    verificationContainer: {
      alignItems: 'center',
    },
    verificationText: {
      marginBottom: 10,
      fontSize: 16,
      textAlign: 'center',
      color: '#000',
    },
    verificationCodeInput: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 10,
    },
    verificationDigitInput: {
      width: 40,
      height: 40,
      backgroundColor: '#FFFFFF',
      paddingHorizontal: 5,
      fontSize: 18,
      textAlign: 'center',
      marginBottom: 10,
    },
    resendText: {
      color: '#184965',
      textDecorationLine: 'underline',
    },
  });
  
  export default SignInScreen;
  