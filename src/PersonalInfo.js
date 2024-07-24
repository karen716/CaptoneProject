import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, Image, ScrollView, TextInput, Dimensions, KeyboardAvoidingView, Platform, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RadioButton } from 'react-native-paper';
import { CheckBox } from 'react-native-elements';
import { useNotifications } from './NotificationContext';

const PersonalInfo = () => {
  const { unreadCount } = useNotifications();
  const { height } = Dimensions.get('window');
  const [victimName, setVictimName] = useState('');
  const [victimAddress, setVictimAddress] = useState('');
  const [victimContact, setVictimContact] = useState('');
  const [witnessName, setWitnessName] = useState([]);
  const [witnessContact, setWitnessContact] = useState([]);
  const [file, setFile] = useState('');
  const [buttonPressed, setButtonPressed] = useState(false);

  const [isHovered, setIsHovered] = useState(false);
  const [hasWitness, setHasWitness] = useState(false);
  const [gender, setGender] = useState('');
  const [errors, setErrors] = useState({
    victimName: false,
    victimAddress: false,
    victimContact: false,
    file: false,
    gender: false,
  });

  const navigation = useNavigation();

  const validateForm = () => {
    const newErrors = {
      victimName: !victimName,
      victimAddress: !victimAddress,
      victimContact: !victimContact,
      file: !file,
      gender: !gender,
    };

    setErrors(newErrors);

    if (Object.values(newErrors).includes(true)) {
      Alert.alert('Validation Error', 'Please fill out all required fields.');
      return false;
    }
    return true;
  };

  const handleProceed = async () => {
    if (!validateForm()) return;

    console.log(`Victim Name: ${victimName}`);
    console.log(`Victim Address: ${victimAddress}`);
    console.log(`Victim Contact: ${victimContact}`);
    
    // Convert witnessName and witnessContact arrays to comma-separated strings
    const witnessNamesString = witnessName.join(', ');
    const witnessContactsString = witnessContact.join(', ');
  
    console.log(`Witness Names: ${witnessNamesString}`);
    console.log(`Witness Contacts: ${witnessContactsString}`);
    console.log(`Attach File: ${file}`);
    console.log(`Gender: ${gender}`);
    
    // Save data to AsyncStorage
    try {
      await AsyncStorage.setItem('victimName', victimName);
      await AsyncStorage.setItem('victimAddress', victimAddress);
      await AsyncStorage.setItem('victimContact', victimContact);
      await AsyncStorage.setItem('witnessName', witnessNamesString); // Convert to comma-separated string
      await AsyncStorage.setItem('witnessContact', witnessContactsString); // Convert to comma-separated string
      await AsyncStorage.setItem('file', file);
      await AsyncStorage.setItem('gender', gender);
      console.log('Data saved successfully');
    } catch (error) {
      console.error('Error saving data:', error);
    }
    
    navigation.navigate('CrimeInfo');
  };

  const handleFileUpload = () => {
    console.log(`Attach File: ${file}`);
  }

  const addWitness = () => {
    setWitnessName([...witnessName, '']);
    setWitnessContact([...witnessContact, '']);
  };

  const updateWitness = (index, field, value) => {
    if (field === 'name') {
      const updatedWitnessNames = [...witnessName];
      updatedWitnessNames[index] = value;
      setWitnessName(updatedWitnessNames);
    } else if (field === 'contact') {
      const updatedWitnessContacts = [...witnessContact];
      updatedWitnessContacts[index] = value;
      setWitnessContact(updatedWitnessContacts);
    }
  };

  const handleWitnessCheck = () => {
    setHasWitness(!hasWitness);
    if (!hasWitness) {
      setWitnessName(['']);
      setWitnessContact(['']);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <View style={styles.stepLineHorizontal} />
        <View style={styles.stepContainer}>
          <View style={styles.step}>
            <Pressable
              style={styles.step}
              onPress={() => navigation.navigate('Category')}
              onPressIn={() => setIsHovered(true)}
              onPressOut={() => setIsHovered(false)}
            >
              <View style={styles.stepCircle1}>
                <Icon name="check" size={16} color="#fff" />
              </View>
              <Text style={isHovered ? styles.stepTextHovered : styles.stepText}>Select {'\n'}Crime</Text>
            </Pressable>
          </View>
          <View style={styles.step}>
            <View style={styles.stepCircle2}>
              <Text style={styles.stepNumber}>2</Text>
            </View>
            <Text style={styles.stepText}>Personal {'\n'}Info</Text>
          </View>
          <View style={styles.step}>
            <View style={styles.stepCircle}>
              <Text style={styles.stepNumber}>3</Text>
            </View>
            <Text style={styles.stepText}>Crime {'\n'}Information</Text>
          </View>
          <View style={styles.step}>
            <View style={styles.stepCircle}>
              <Text style={styles.stepNumber}>4</Text>
            </View>
            <Text style={styles.stepText}>Evidence {'\n'}Information</Text>
          </View>
          <View style={styles.step}>
            <View style={styles.stepCircle}>
              <Text style={styles.stepNumber}>5</Text>
            </View>
            <Text style={styles.stepText}>Submitted {'\n'}Information</Text>
          </View>
        </View>
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.inputContainer}>
            <TextInput
              style={[
                styles.input,
                errors.victimName && styles.errorInput
              ]}
              placeholder='Name of Victim'
              value={victimName}
              onChangeText={setVictimName}
            />
          </View>
          <View style={styles.genderContainer}>
            <View style={styles.radioGroup}>
              <RadioButton
                value="male"
                status={gender === 'male' ? 'checked' : 'unchecked'}
                onPress={() => setGender(gender === 'male' ? '' : 'male')}
                color={gender === 'male' ? '#184965' : '#000'}
              />
              <Text style={styles.radioLabel}>Male</Text>
              <RadioButton
                value="female"
                status={gender === 'female' ? 'checked' : 'unchecked'}
                onPress={() => setGender(gender === 'female' ? '' : 'female')}
                color={gender === 'female' ? '#184965' : '#000'}
              />
              <Text style={styles.radioLabel}>Female</Text>
              <RadioButton
                value="other"
                status={gender === 'other' ? 'checked' : 'unchecked'}
                onPress={() => setGender(gender === 'other' ? '' : 'other')}
                color={gender === 'other' ? '#184965' : '#000'}
              />
              <Text style={styles.radioLabel}>Other</Text>
            </View>
            {errors.gender && <Text style={styles.errorText}>Please select this field</Text>}
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={[
                styles.input,
                errors.victimAddress && styles.errorInput
              ]}
              placeholder='Address of Victim'
              value={victimAddress}
              onChangeText={setVictimAddress}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={[
                styles.input,
                errors.victimContact && styles.errorInput
              ]}
              placeholder='Contact of Victim'
              value={victimContact}
              onChangeText={setVictimContact}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={[
                styles.input,
                errors.file && styles.errorInput
              ]}
              placeholder="Attach File (Valid id, Birth certificate)"
              value={file}
              onChangeText={setFile}
            />
            <Pressable onPress={handleFileUpload} style={styles.uploadIcon}>
              <Icon name="upload" size={24} color="#808080" />
            </Pressable>
          </View>
          <CheckBox
            title="Do you have a witness?"
            checked={hasWitness}
            onPress={handleWitnessCheck}
          />
          {hasWitness && (
            <>
              {witnessName.map((witness, index) => (
                <View key={index} style={styles.witnessContainer}>
                  <Text style={styles.witnessTitle}>Witness {index + 1}:</Text>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.input}
                      placeholder='Name of Witness'
                      value={witness}
                      onChangeText={(value) => updateWitness(index, 'name', value)}
                    />
                  </View>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.input}
                      placeholder='Contact of Witness'
                      value={witnessContact[index]}
                      onChangeText={(value) => updateWitness(index, 'contact', value)}
                    />
                  </View>
                </View>
              ))}
              <Pressable style={styles.addWitnessButton} onPress={addWitness}>
                <Icon name="plus" size={16} color="#184965" />
                <Text style={styles.addWitnessText}>Add Another Witness</Text>
              </Pressable>
            </>
          )}
          <View style={styles.inputContainer}>
            <TouchableOpacity
              style={[
                styles.proceedButton,
                buttonPressed && styles.proceedButtonPressed,
              ]}
              onPress={handleProceed}
              onPressIn={() => setButtonPressed(true)}
              onPressOut={() => setButtonPressed(false)}
            >
              <Text
                style={[
                  styles.proceedButtonText,
                  buttonPressed && styles.proceedButtonTextPressed,
                ]}
              >
                Proceed
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
    </KeyboardAvoidingView>
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
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    marginRight: 10,
  },
  headerText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 150, // Increased bottom padding to avoid overlap with footer and button
  },
  proceedButton: {
    backgroundColor: '#184965',
    width: 150,
    height: 35,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#184965',
  },
  proceedButtonPressed: {
    backgroundColor: '#fff',
    borderColor: '#184965',
    borderWidth: 1,
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
  stepContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    marginTop: 40,
    paddingHorizontal: 15,
  },
  step: {
    alignItems: 'center',
  },
  stepCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#184965',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  stepCircle1: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#184965',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  stepCircle2: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#184965',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  stepLineHorizontal: {
    width: '80%',
    height: 5,
    backgroundColor: '#184965',
    position: 'absolute',
    top: 50,
    marginLeft: 25,
    zIndex: 0,
  },
  stepNumber: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  stepText: {
    fontSize: 12,
    textAlign: 'center',
    flexShrink: 1,
    marginLeft: 5,
    marginRight: 5,
    color: '#184965',
  },
  stepTextHovered: {
    fontSize: 12,
    textAlign: 'center',
    flexShrink: 1,
    marginLeft: 5,
    marginRight: 5,
    color: '#fff',
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#184965',
    borderRadius: 5,
    padding: 10,
    height: 40,
    backgroundColor: '#fff',
  },
  errorInput: {
    borderColor: 'red',
  },
  uploadIcon: {
    position: 'absolute',
    top: 8,
    right: 10,
  },
  subText: {
    marginTop: 5,
    color: 'gray',
    fontSize: 12,
  },
  addWitnessButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  addWitnessText: {
    color: '#184965',
    marginLeft: 5,
    fontSize: 16,
  },
  witnessContainer: {
    marginBottom: 10,
  },
  witnessTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  genderContainer: {
    marginBottom: 15,
  },
  genderTitle: {
    fontSize: 16,
    marginBottom: 5,
  },
  radioGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    color: '#808080',
  },
  radioLabel: {
    marginLeft: 5,
    marginRight: 10,
    fontSize: 14,
    color: '#808080',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
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

export default PersonalInfo;