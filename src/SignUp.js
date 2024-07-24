import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Dimensions, Alert, Platform, TouchableWithoutFeedback } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Entypo } from '@expo/vector-icons';
import { RadioButton } from 'react-native-paper';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const SignUpScreen = () => {
  const [fullName, setFullName] = useState('');
  const [birthDate, setBirthDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [barangayList, setBarangayList] = useState([]);
  const [barangay, setBarangay] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('+63');
  const [proofOfResidency, setProofOfResidency] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [gender, setGender] = useState('');

  const [fullNameError, setFullNameError] = useState(false);
  const [birthDateError, setBirthDateError] = useState(false);
  const [barangayError, setBarangayError] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const [proofOfResidencyError, setProofOfResidencyError] = useState(false);
  const [emailAddressError, setEmailAddressError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [genderError, setGenderError] = useState(false);

  const navigation = useNavigation();
  const [isButtonPressed, setIsButtonPressed] = useState(false);

  const validatePhoneNumber = (number) => {
    const regex = /^\+63\d{10}$/; // Validate number with +63 country code
    return regex.test(number);
  };
  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || birthDate;
    setShowDatePicker(Platform.OS === 'ios');
    setBirthDate(currentDate);
    setBirthDateError(false);
  };
  const formatDate = (date) => {
    if (!date) return '';
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    axios.get('http://192.168.1.13:8000/barangays')
      .then(response => {
        setBarangayList(response.data);
      })
      .catch(error => {
        console.error('Error fetching barangay list:', error);
        Alert.alert('Error', 'Failed to fetch barangay list');
      });
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = () => {
    // Validate all fields
    if (!fullName || !birthDate || !barangay || !phoneNumber || !proofOfResidency || !emailAddress || !username || !password || !gender) {
      Alert.alert('Incomplete Form', 'Please fill out all fields before submitting.');
      // Set error states for empty fields
      setFullNameError(!fullName);
      setBirthDateError(!birthDate);
      setBarangayError(!barangay);
      setPhoneNumberError(!phoneNumber);
      setProofOfResidencyError(!proofOfResidency);
      setEmailAddressError(!emailAddress);
      setUsernameError(!username);
      setPasswordError(!password);
      setGenderError(!gender);
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      Alert.alert('Invalid Phone Number', 'Please enter a valid 10-digit phone number after the +63.');
      setPhoneNumberError(true);
      return;
    }

    // Send data to server using Axios
    axios.post('http://192.168.1.13:8000/signup', {
      fullName,
      birthDate: formatDate(birthDate), // Format date as needed
      barangay, // Send barangay name instead of id
      phoneNumber,
      proofOfResidency,
      emailAddress,
      username,
      password,
    })
      .then(response => {
        console.log('Sign Up successful:', response.data);
        Alert.alert('Sign Up Successful', 'You have successfully signed up.');
        navigation.navigate('SignIn');
      })
      .catch(error => {
        console.error('Error:', error);
        Alert.alert('Sign Up Failed', 'Failed to sign up. Please try again later.');
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Full Name:</Text>
            <TextInput
              style={[styles.input, fullNameError && styles.inputError]}
              placeholder="Enter Full Name"
              placeholderTextColor="#A9A9A9"
              value={fullName}
              onChangeText={setFullName}
              onBlur={() => setFullNameError(!fullName)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Birth Date:</Text>
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <Text style={[styles.dateInput, birthDateError && styles.inputError]}>
                {birthDate ? formatDate(birthDate) : 'YYYY-MM-DD'}
              </Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={birthDate || new Date()}
                mode="date"
                display="spinner"
                onChange={handleDateChange}
                maximumDate={new Date()}
                minimumDate={new Date(1900, 0, 1)}
              />
            )}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Gender:</Text>
            <View style={styles.genderContainer}>
              <View style={styles.radioOption}>
                <RadioButton
                  value={gender}
                  status={gender === 'male' ? 'checked' : 'unchecked'}
                  onPress={() => setGender('male')}
                  color="#ffffff"
                  uncheckedColor="#f0f8ff"
                />
                <Text style={styles.radioLabel}>Male</Text>
              </View>
              <View style={styles.radioOption}>
                <RadioButton
                  value={gender}
                  status={gender === 'female' ? 'checked' : 'unchecked'}
                  onPress={() => setGender('female')}
                  color="#ffffff"
                  uncheckedColor="#f0f8ff"
                />
                <Text style={styles.radioLabel}>Female</Text>
              </View>
            </View>
            {genderError && <Text style={styles.errorText}>Please select this field</Text>}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Barangay:</Text>
            <View style={[styles.pickerContainer, barangayError && styles.inputError]}>
              <Picker
                style={styles.picker}
                selectedValue={barangay}
                onValueChange={(itemValue) => setBarangay(itemValue)} 
                itemStyle={styles.pickerItem}
              >
                <Picker.Item label="Select a Barangay" value="" />
                {barangayList.map((barangayItem) => (
                  <Picker.Item key={barangayItem.id} label={barangayItem.barangay || 'Unknown Barangay'} value={barangayItem.barangay || ''} /> 
                ))}
              </Picker>
            </View>
            {barangayError && <Text style={styles.errorText}>Please select your barangay.</Text>}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Phone Number:</Text>
            <View style={[styles.phoneContainer, phoneNumberError && styles.inputError]}>
              <TextInput
                style={[styles.phoneInput, phoneNumberError && styles.inputError]}
                placeholder="+63"
                placeholderTextColor="#A9A9A9"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
                maxLength={13} // Allow for +63 and 10 digits
              />
            </View>
            {phoneNumberError && <Text style={styles.errorText}>Please enter a valid 10-digit phone number.</Text>}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Proof of Residency:</Text>
            <TextInput
              style={[styles.input, proofOfResidencyError && styles.inputError]}
              placeholder="Attach File"
              placeholderTextColor="#A9A9A9"
              value={proofOfResidency}
              onChangeText={setProofOfResidency}
            />
          </View>

          <View style={styles.line}></View> 

          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, emailAddressError && styles.inputError]}
              placeholder="Enter Email Address"
              placeholderTextColor="#A9A9A9"
              value={emailAddress}
              onChangeText={setEmailAddress}
              keyboardType="email-address"
            />
            {emailAddressError && <Text style={styles.errorText}>Please enter a valid email address.</Text>}
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, usernameError && styles.inputError]}
              placeholder="Enter Username"
              placeholderTextColor="#A9A9A9"
              value={username}
              onChangeText={setUsername}
            />
            {usernameError && <Text style={styles.errorText}>Please enter a username.</Text>}
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.passwordContainer}>
              <TextInput
                style={[styles.passwordInput, passwordError && styles.inputError]}
                placeholder="Enter Password"
                placeholderTextColor="#A9A9A9"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity style={styles.passwordToggle} onPress={togglePasswordVisibility}>
                <Entypo name={showPassword ? 'eye' : 'eye-with-line'} size={24} color="gray" />
              </TouchableOpacity>
            </View>
            {passwordError && <Text style={styles.errorText}>Please enter a password.</Text>}
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
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
    paddingHorizontal: 10,
  },
  formContainer: {
    width: '100%',
    paddingTop: 30,
    alignItems: 'center',
  },
  inputContainer: {
    width: '100%',
    alignItems: 'flex-start',
  },
  label: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#ffffff',
    marginLeft: 30,
  },
  input: {
    width: '80%',
    height: height * 0.05,
    borderWidth: 1,
    borderColor: '#ffffff',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 5,
    backgroundColor: '#ffffff',
    fontSize: 12,
    marginLeft: 30,
  },
  dateInput: {
    width: '80%',
    height: height * 0.05,
    borderWidth: 1,
    borderColor: '#ffffff',
    borderRadius: 5,
    paddingHorizontal: 100,
    marginBottom: 10,
    backgroundColor: '#ffffff',
    fontSize: 12,
    paddingVertical: 8,
    marginLeft: 30,
  },
  pickerContainer: {
    width: '80%',
    height: height * 0.05,
    borderWidth: 1,
    borderColor: '#ffffff',
    borderRadius: 5,
    marginBottom: 10,
    marginLeft: 30,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
  },
  picker: {
    width: '100%',
    height: '100%',
  },
  pickerItem: {
    height: height * 0.05,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ffffff',
    borderRadius: 5,
    fontSize: 10,
  },
  phoneContainer: {
    height: height * 0.05,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    width: '81%',
    left: 30,
  },
  phonePrefix: {
    fontSize: width * 0.040,
    color: '#ffffff',
    marginRight: 5,
  },
  phoneInput: {
    flex: 1,
    height: height * 0.05,
    borderWidth: 1,
    borderColor: '#ffffff',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 6,
    backgroundColor: '#ffffff',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    height: height * 0.05,
    borderWidth: 1,
    borderColor: '#ffffff',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#ffffff',
    left: 30,
  },
  passwordInput: {
    flex: 1,
    fontSize: 12,
    paddingVertical: 0,
  },
  button: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 20,
    marginTop: 20,
    width: '50%',
    marginBottom: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ffffff',
  },
  buttonPressed: {
    backgroundColor: '#184965',
    borderColor: '#000',
  },
  buttonText: {
    color: '#184965',
    fontSize: width * 0.045,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#ff0000',
    fontSize: 12,
    marginLeft: 30,
    marginBottom: 3,
  },
  inputError: {
    borderColor: '#ff0000',
  },
  genderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    alignSelf: 'center',
    marginBottom: 5,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 60,
  },
  radioLabel: {
    color: '#ffffff',
    fontSize: width * 0.04,
  },
  line: {
    width: '80%',
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff',
    marginTop: 5,
    marginRight: 10,
    marginBottom: 10,
  },
});

export default SignUpScreen;