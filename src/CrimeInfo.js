import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, Dimensions, KeyboardAvoidingView, Platform, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNotifications } from './NotificationContext';

const CrimeInfo = () => {
    const { unreadCount } = useNotifications();
    const { height } = Dimensions.get('window');
    const [crimeDate, setCrimeDate] = useState(null);
    const [crimeTime, setCrimeTime] = useState(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [descriptionInfo, setDescriptionInfo] = useState('');
    const [injuriesDamages, setInjuriesDamages] = useState('');
    const [buttonPressed, setButtonPressed] = useState(false);


    const navigation = useNavigation();

    

    const handleDateChange = (event, selectedDate) => {
        if (selectedDate) {
            setShowDatePicker(false);
            setCrimeDate(selectedDate);
        } else {
            setShowDatePicker(false);
            setCrimeDate(null); // Reset crimeDate to null
        }
    };

    const handleTimeChange = (event, selectedTime) => {
        if (selectedTime) {
            setShowTimePicker(false);
            setCrimeTime(selectedTime);
        } else {
            setShowTimePicker(false);
            setCrimeTime(null); // Reset crimeTime to null
        }
    };
    const [errors, setErrors] = useState({
        dateError: false,
        timeError: false,
        descriptionError: false,
        injuriesError: false,
    });

    const validateFields = () => {
        const newErrors = {
            dateError: !crimeDate,
            timeError: !crimeTime,
            descriptionError: !descriptionInfo.trim(),
            injuriesError: !injuriesDamages,
        };

        setErrors(newErrors);

        if (Object.values(newErrors).includes(true)) {
            Alert.alert('Validation Error', 'Please fill out all required fields.');
            return false;
        }
        return true;
    };

    const handleProceed = async () => {
        if (validateFields()) {
            console.log(`Date of Crime: ${crimeDate}`);
            console.log(`Time of Crime: ${crimeTime}`);
            console.log(`Description: ${descriptionInfo}`);
            console.log(`Injuries/Damages: ${injuriesDamages}`);


        // Save data to AsyncStorage
        try {
            await AsyncStorage.setItem('crimeDate', crimeDate ? crimeDate.toISOString() : '');
            await AsyncStorage.setItem('crimeTime', crimeTime ? crimeTime.toISOString() : '');
            await AsyncStorage.setItem('descriptionInfo', descriptionInfo);
            await AsyncStorage.setItem('injuriesDamages', injuriesDamages);
            console.log('Crime data saved successfully');
        } catch (error) {
            console.error('Error saving crime data:', error);
        }

        navigation.navigate('Evidence');
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
                    <TouchableOpacity style={styles.step} onPress={() => navigation.navigate('Category')}>
                        <View style={styles.stepCircle1}>
                            <Icon name="check" size={16} color="#fff" />
                        </View>
                        <Text style={styles.stepText}>Select {'\n'}Crime </Text>
                    </TouchableOpacity>
                    <View style={styles.step}>
                        <TouchableOpacity style={styles.step} onPress={() => navigation.navigate('Personal')}>
                            <View style={styles.stepCircle2}>
                                <Icon name="check" size={16} color="#fff" />
                            </View>
                            <Text style={styles.stepText}>Personal {'\n'}Crime </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.step}>
                        <View style={styles.stepCircle3}>
                            <Text style={styles.stepNumber}>3</Text>
                        </View>
                        <Text style={styles.stepText}>Crime {'\n'}Information </Text>
                    </View>
                    <View style={styles.step}>
                        <View style={styles.stepCircle}>
                            <Text style={styles.stepNumber}>4</Text>
                        </View>
                        <Text style={styles.stepText}>Evidence {'\n'}Information  </Text>
                    </View>
                    <View style={styles.step}>
                        <View style={styles.stepCircle}>
                            <Text style={styles.stepNumber}>5</Text>
                        </View>
                        <Text style={styles.stepText}>Submitted {'\n'}Information </Text>
                    </View>
                </View>
                <ScrollView style={styles.content}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.pickerLabel}>Select Date </Text>
                        <TouchableOpacity
                            style={[
                                styles.datePicker,
                                errors.dateError && styles.datePickerError,
                            ]}
                            onPress={() => setShowDatePicker(true)}
                        >
                            <Text style={styles.dateTimeText}>
                                {crimeDate ? crimeDate.toLocaleDateString() : 'Date of Crime'}
                            </Text>
                            <Icon name="calendar" size={18} color="#808080" style={styles.dateIcon} />
                        </TouchableOpacity>
                        {showDatePicker && (
                            <DateTimePicker
                                value={crimeDate || new Date()}
                                mode="date"
                                display="default"
                                onChange={handleDateChange}
                            />
                        )}
                        <Text style={styles.pickerLabel}>Select Time </Text>
                        <TouchableOpacity
                            style={[
                                styles.datePicker,
                                errors.timeError && styles.datePickerError,
                            ]}
                            onPress={() => setShowTimePicker(true)}
                        >
                            <Text style={styles.dateTimeText}>
                                {crimeTime ? crimeTime.toLocaleTimeString() : 'Time of Crime'}
                            </Text>
                            <Icon name="clock-o" size={18} color="#808080" style={styles.dateIcon} />
                        </TouchableOpacity>
                        {showTimePicker && (
                            <DateTimePicker
                                value={crimeTime || new Date()}
                                mode="time"
                                display="default"
                                onChange={handleTimeChange}
                            />
                        )}
                        <ScrollView style={styles.textInputWrapper}>
                            <TextInput
                                style={[
                                    styles.input1,
                                    errors.descriptionError && styles.inputError,
                                ]}
                                placeholder='Description'
                                value={descriptionInfo}
                                onChangeText={setDescriptionInfo}
                                multiline={true}
                                textAlignVertical="top"
                            />
                        </ScrollView>
                        <Text style={styles.pickerLabel1}>Write 2-3 lines</Text>
                        <View style={[
                            styles.pickerContainer,
                            errors.injuriesError && styles.pickerError,
                        ]}>
                            <Picker
                                selectedValue={injuriesDamages}
                                onValueChange={(itemValue) => setInjuriesDamages(itemValue)}
                                style={[
                                    styles.picker,
                                    errors.injuriesError && styles.pickerErrorInner,
                                ]}
                            >
                                <Picker.Item label="Any Injuries/Damages" value="" />
                                <Picker.Item label="Minor" value="minor" />
                                <Picker.Item label="Severe" value="severe" />
                            </Picker>
                        </View>
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
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        padding: 20,
        paddingBottom: 150, // Add some bottom padding to avoid overlap with the button
    },
    textInputWrapper: {
        flex: 1,
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#184965',
        borderRadius: 5,
        height: 40,
        backgroundColor: '#fff', // Set the background color to white
        marginTop: 10,
        marginBottom: 20,
        justifyContent: 'center',
    },
    pickerError: {
        borderColor: 'red',
    },
    picker: {
        width: '100%',
        height: 40,
    },
    pickerErrorInner: {
        borderColor: 'red',
    },
    pickerLabel: {
        fontSize: 12,
        color: '#184965',
    },
    pickerLabel1: {
        fontSize: 12,
        color: '#184965',
        marginBottom: 10,
    },
    proceedButton: {
        backgroundColor: '#184965',
        width: 150,
        height: 35,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        alignSelf: 'center',
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
    stepContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 5,
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
    stepCircle3: {
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
        color: '#184965', // Updated text color
    },
    inputContainer: {
        marginBottom: 15,
    },
    input1: {
        borderWidth: 1,
        borderColor: '#184965',
        borderRadius: 5,
        padding: 10,
        height: 100,
        backgroundColor: '#fff',
        marginTop: 10,
        marginBottom: 10,
        textAlignVertical: 'top',
    },
    inputError: {
        borderColor: 'red',
    },
    datePicker: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#184965',
        borderRadius: 5,
        padding: 10,
        height: 40,
        backgroundColor: '#fff',
        marginTop: 10,
        marginBottom: 20,
    },
    datePickerError: {
        borderColor: 'red',
    },

    dateTimeText: {
        color: '#184965',
        fontSize: 16,
    },
    dateIcon: {
        marginLeft: 10,
    },
});

export default CrimeInfo;