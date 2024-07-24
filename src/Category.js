import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Dimensions, KeyboardAvoidingView, Platform, Image, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { useNotifications } from './NotificationContext';

const { width, height } = Dimensions.get('window');

const CategorySelection = () => {
  const { unreadCount } = useNotifications();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [otherCategoryInput, setOtherCategoryInput] = useState('');
  const [buttonPressed, setButtonPressed] = useState(false);
  const [isCategorySelected, setIsCategorySelected] = useState(true);

  const [isHovered, setIsHovered] = useState(false);

  const navigation = useNavigation();

  const handleCategoryChange = (itemValue) => {
    setSelectedCategory(itemValue);
    // Save selected category to AsyncStorage
    AsyncStorage.setItem('selectedCategory', itemValue);

    if (itemValue) {
      setIsCategorySelected(true);
    }
  };

  const handleOtherInput = (text) => {
    setOtherCategoryInput(text);
  };

  const handleProceed = () => {
    if (!selectedCategory) {
      setIsCategorySelected(false);
      return;
    }
    console.log(`Selected category: ${selectedCategory}`);
    console.log(`Other category input: ${otherCategoryInput}`);
    navigation.navigate('Personal');
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
            <View style={styles.stepCircle1}>
              <Text style={styles.stepNumber}>1</Text>
            </View>
            <Text style={styles.stepText}>Select{'\n'}Crime</Text>
          </View>
          <View style={styles.step}>
            <View style={styles.stepCircle}>
              <Text style={styles.stepNumber}>2</Text>
            </View>
            <Text style={styles.stepText}>Personal{'\n'}Crime</Text>
          </View>
          <View style={styles.step}>
            <View style={styles.stepCircle}>
              <Text style={styles.stepNumber}>3</Text>
            </View>
            <Text style={styles.stepText}>Crime{'\n'}Information</Text>
          </View>
          <View style={styles.step}>
            <View style={styles.stepCircle}>
              <Text style={styles.stepNumber}>4</Text>
            </View>
            <Text style={styles.stepText}>Evidence{'\n'}Information</Text>
          </View>
          <View style={styles.step}>
            <View style={styles.stepCircle}>
              <Text style={styles.stepNumber}>5</Text>
            </View>
            <Text style={styles.stepText}>Submitted{'\n'}Information</Text>
          </View>
        </View>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.content}>
            {/* Input container including Picker and conditional input */}
            <View style={styles.inputContainer}>
            <View style={[styles.pickerContainer, !isCategorySelected && styles.pickerContainerError]}>
                <Picker
                  selectedValue={selectedCategory}
                  onValueChange={handleCategoryChange}
                  style={styles.picker}
                >
                  <Picker.Item label="Select Category" value="" />
                  <Picker.Item label="Theft" value="Theft" />
                  <Picker.Item label="Rape" value="Rape" />
                  <Picker.Item label="Other" value="other" />
                </Picker>
              </View>
              {/* Conditional input for 'Other' category */}
              {!isCategorySelected && <Text style={styles.errorText}>Please select a category</Text>}
              {selectedCategory === 'other' && (
                <View style={styles.explanationContainer}>
                  <Text style={styles.explanationLabel}>Other, please explain briefly:</Text>
                  <TextInput
                    placeholder="Enter details"
                    style={styles.explanationInput}
                    value={otherCategoryInput}
                    onChangeText={handleOtherInput}
                    multiline
                  />
                </View>
              )}

              {/* Proceed button */}
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
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  stepContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    marginTop: 40, // Added marginTop for spacing
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
    top: 50, // Adjusted top position to align correctly
    marginLeft: 30,
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
    color: '#184965', // Updated text color
  },
  content: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  inputContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  pickerContainer: {
    borderColor: '#184965',
    borderWidth: 1,
    marginTop: 10,
    borderRadius: 5,
    height: 50,
    paddingHorizontal: 10,
  },
  pickerContainerError: {
    borderColor: 'red',
  },
  picker: {
    width: '100%',
    height: '100%',
  },
  errorText: {
    color: 'red',
    marginTop: 2,
    marginBottom: 280,
    marginLeft: 5,
    fontSize: 12, 
  },
  explanationContainer: {
    marginTop: 5,
  },
  explanationLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  explanationInput: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    padding: 10,
    minHeight: 200,
    textAlignVertical: 'top',
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
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#184965', // Ensure border color matches the background
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

export default CategorySelection;