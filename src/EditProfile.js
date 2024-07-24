import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';

const EditProfileScreen = () => {
  const [fullName, setFullName] = useState('Anna Avetisyan');
  const [birthDate, setBirthDate] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('818 123 4567');
  const [emailAddress, setEmailAddress] = useState('info@aplusdesign.co');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false); // State to handle loading

  const handleProfilePicUpdate = () => {
    // Logic for updating profile picture
    console.log('Profile picture update');
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (event.type === 'set' && selectedDate) {
      // Update birthDate state if a date is selected
      const formattedDate = selectedDate.toISOString().split('T')[0]; // Format date as yyyy-mm-dd
      setBirthDate(formattedDate);
    } else {
      // User canceled the picker or didn't select a date
      // You may choose to handle this case if needed
    }
  };

  const handleSave = () => {
    setLoading(true);
    // Simulate a network request or save operation
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Success', 'Your changes have been saved.');
    }, 2000); // 2 seconds delay to simulate loading
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0} // Adjust offset as needed
    >
      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <View style={styles.avatarContainer}>
            <Image style={styles.avatar} source={{ uri: 'https://via.placeholder.com/150?text=User' }} />
            <TouchableOpacity style={styles.cameraIconContainer} onPress={handleProfilePicUpdate}>
              <Icon name="photo-camera" size={24} color="#184965" />
            </TouchableOpacity>
          </View>
          <Text style={styles.title}>{fullName}</Text>
          <View style={styles.infoContainer}>
            <View style={styles.infoItem}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Anna Avetisyan"
                value={fullName}
                onChangeText={setFullName}
              />
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.label}>Birthday</Text>
              <TouchableOpacity style={styles.input} onPress={() => setShowDatePicker(true)}>
                <Text style={styles.inputText}>{birthDate ? birthDate : 'yyyy-mm-dd'}</Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={birthDate ? new Date(birthDate) : new Date()}
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                />
              )}
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.label}>Phone</Text>
              <TextInput
                style={styles.input}
                placeholder="818 123 4567"
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
              />
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="info@aplusdesign.co"
                keyboardType="email-address"
                value={emailAddress}
                onChangeText={setEmailAddress}
              />
            </View>
          </View>
          <TouchableOpacity style={styles.editButton} onPress={handleSave}>
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.editButtonText}>Edit profile</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#184965',
    marginBottom: 50,
    textAlign: 'center',
  },
  avatarContainer: {
    alignSelf: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75, // Make the image circular
    borderWidth: 5, // Set the border width
    borderColor: '#fff', // Set the border color
  },
  cameraIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 5,
  },
  infoContainer: {
    flex: 1,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    flex: 1,
    fontSize: 18,
    color: '#184965',
  },
  input: {
    flex: 2,
    borderBottomWidth: 1,
    borderBottomColor: '#184965',
    fontSize: 18,
    color: '#6a1b9a',
    paddingVertical: 8,
    justifyContent: 'center',
  },
  inputText: {
    fontSize: 18,
    color: '#6a1b9a',
  },
  editButton: {
    backgroundColor: '#184965',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EditProfileScreen;