import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { Entypo } from '@expo/vector-icons'; 

const SignInScreen = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleUserNameChange = (text) => {
    setUserName(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.container}>
        <Image source={require('./assets/icon1.jpg')} style={styles.profileImage} />
      <Text style={styles.title}>Sign In</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter User Name"
        value={userName}
        onChangeText={handleUserNameChange}
      />
      <View style={styles.passwordInput}>
        <TextInput
          style={styles.inputField}
          placeholder="Password"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={handlePasswordChange}
        />
        <TouchableOpacity onPress={togglePasswordVisibility}>
          <Entypo name={showPassword ? 'eye' : 'eye-with-line'} size={24} color="#000" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => console.log('Sign In pressed')}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => console.log('Sign Up pressed')}>
        <Text style={styles.signupText}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6495ed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: 200,
    height: 200,
    marginBottom: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginRight: 200,
    color:'#000000',
  },
  input: {
    width: '75%',
    height: 40,
    borderWidth: 2,
    borderColor: '#000000',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  passwordInput: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '75%',
    height: 40,
    borderWidth: 2,
    borderColor: '#000000',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 90,
    backgroundColor: '#fff',
  },
  inputField: {
    flex: 1,
  },
  button: {
    backgroundColor: '#3366FF',
    padding: 10,
    borderRadius: 20,
    marginBottom: 15,
    width: '40%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupText: {
    color: '#fff',
    textDecorationLine: 'underline',
  },
});

export default SignInScreen;