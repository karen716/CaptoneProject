import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importing FontAwesome icon
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const AccountSettings = () => {
  const navigation = useNavigation(); // Get the navigation prop

  const [username, setUsername] = useState('Lovely29');
  const [password, setPassword] = useState('********');
  const [emailAddress, setEmailAddress] = useState('abbyg@address.com');
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);
  const [isEmailChanged, setIsEmailChanged] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // State to handle loading

  const handlePasswordChange = () => {
    setIsPasswordChanged(true);
    setPassword(''); // Reset the password field
  };

  const handleEmailChange = () => {
    setIsEmailChanged(true);
    setEmailAddress(''); // Reset the email field
  };

  const handleSave = () => {
    setLoading(true);
    // Simulate a network request or save operation
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Success', 'Your changes have been saved.');
      navigation.goBack(); // Navigate back to the previous screen
    }, 2000); // 2 seconds delay to simulate loading
  };

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Edit your name, avatar etc.</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Your Username</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            value={password}
            secureTextEntry={!showPassword}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Icon name={showPassword ? 'eye' : 'eye-slash'} size={20} color="#000" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handlePasswordChange}>
          <Text style={styles.changeText}>Change</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email Address</Text>
        <TextInput
          style={styles.input}
          value={emailAddress}
          onChangeText={setEmailAddress}
        />
        <TouchableOpacity onPress={handleEmailChange}>
          <Text style={styles.changeText}>Change</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity>
        <Text style={styles.deleteAccountText}>Delete Your Account</Text>
      </TouchableOpacity>
      <Text style={styles.deleteAccountDescription}>
        You will receive an email to confirm your decision. Please note, that all boards you have created will be permanently erased.
      </Text>

      <View style={styles.buttonGroup}>
        <TouchableOpacity style={styles.cancelButton}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Save</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  subtitle: {
    marginTop: 20,
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 5,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 5,
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
  },
  changeText: {
    color: '#007BFF',
    fontSize: 14,
    alignSelf: 'flex-end',
  },
  deleteAccountText: {
    color: '#FF0000',
    fontSize: 16,
    marginTop: 20,
    marginBottom: 5,
  },
  deleteAccountDescription: {
    fontSize: 12,
    color: '#666',
    marginBottom: 20,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    backgroundColor: '#616161',
    padding: 15,
    borderRadius: 5,
    flex: 0.48,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    flex: 0.48,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default AccountSettings;
