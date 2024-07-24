import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, Dimensions, KeyboardAvoidingView, Platform, Modal, Pressable, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNotifications } from './NotificationContext';
import DateTimePicker from '@react-native-community/datetimepicker';

const { height } = Dimensions.get('window');

const EvidenceInfo = ({ route }) => {
    const { unreadCount } = useNotifications();
    const [location, setLocation] = useState('');
    const [file, setFile] = useState('');
    const [showModal, setShowModal] = useState(false); // State for modal visibility
    const [userId, setUserId] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [victimName, setVictimName] = useState('');
    const [victimAddress, setVictimAddress] = useState('');
    const [victimContact, setVictimContact] = useState('');
    const [witnessName, setWitnessName] = useState('');
    const [witnessContact, setWitnessContact] = useState('');
    const [crimeDate, setCrimeDate] = useState('');
    const [crimeTime, setCrimeTime] = useState('');
    const [descriptionInfo, setDescriptionInfo] = useState('');
    const [injuriesDamages, setInjuriesDamages] = useState('');
    const [isHovered, setIsHovered] = useState(false);
    const [isPressed, setIsPressed] = useState(false);

    const navigation = useNavigation();
    // Fetching data from previous screens

    useEffect(() => {
        const fetchReportData = async () => {
            try {
                const name = await AsyncStorage.getItem('victimName');
                const address = await AsyncStorage.getItem('victimAddress');
                const contact = await AsyncStorage.getItem('victimContact');
                const witness_name = await AsyncStorage.getItem('witnessName');
                const witness_contact = await AsyncStorage.getItem('witnessContact');
                const file_path = await AsyncStorage.getItem('file');
                const crime_date = await AsyncStorage.getItem('crimeDate');
                const crime_time = await AsyncStorage.getItem('crimeTime');
                const description_info = await AsyncStorage.getItem('descriptionInfo');
                const injuries_damages = await AsyncStorage.getItem('injuriesDamages');

                setVictimName(name);
                setVictimAddress(address);
                setVictimContact(contact);
                setWitnessName(witness_name);
                setWitnessContact(witness_contact);
                setFile(file_path);
                setCrimeDate(crime_date);
                setCrimeTime(crime_time);
                setDescriptionInfo(description_info);
                setInjuriesDamages(injuries_damages);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchReportData();
    }, []);

    useEffect(() => {
        const fetchUserIdAndCategory = async () => {
            const id = await AsyncStorage.getItem('userId');
            const selectedCat = await AsyncStorage.getItem('selectedCategory');
            setUserId(id);
            setSelectedCategory(selectedCat);
        };
        fetchUserIdAndCategory();
    }, []);

    const handleProceed = () => {
        // Show modal confirmation
        setShowModal(true);
    };

    const handleFileUpload = () => {
        console.log(`Attach File: ${file}`);
        // Handle file upload logic
    };

    const handleConfirmSubmit = () => {
        // Prepare data to send
        const reportData = {
            userId: userId,
            category: selectedCategory, // Use selected category from AsyncStorage
            victimName: victimName,
            victimAddress: victimAddress,
            victimContact: victimContact,
            file: file,
            witnessName: witnessName,
            witnessContact: witnessContact,
            crimeDate: crimeDate,
            crimeTime: crimeTime,
            crimeDescription: descriptionInfo,
            injuryOrDamages: injuriesDamages,
            location: location,
            evidenceFile: file
        };

        axios.post('http://192.168.1.13:8000/submitReport', reportData)
            .then(response => {
                console.log(response.data);
                // Handle success, maybe navigate to the next screen
                setShowModal(false); // Close modal after submission
                navigation.navigate('Submit'); // Navigate to the next screen after submission
            })
            .catch(error => {
                console.error('Error submitting report:', error);
                // Handle error, show an alert or retry logic
            });
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
                        <Text style={styles.stepText}>Select {'\n'}Crime</Text>
                    </TouchableOpacity>
                    <View style={styles.step}>
                        <TouchableOpacity style={styles.step} onPress={() => navigation.navigate('Personal')}>
                            <View style={styles.stepCircle2}>
                                <Icon name="check" size={16} color="#fff" />
                            </View>
                            <Text style={styles.stepText}>Personal {'\n'}Crime</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.step}>
                        <TouchableOpacity style={styles.step} onPress={() => navigation.navigate('CrimeInfo')}>
                            <View style={styles.stepCircle3}>
                                <Icon name="check" size={16} color="#fff" />
                            </View>
                            <Text style={styles.stepText}>Crime {'\n'}Information</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.step}>
                        <View style={styles.stepCircle4}>
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
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Detect Location"
                        value={location}
                        onChangeText={setLocation}
                    />
                    <View style={styles.inputGroup}>
                        <TextInput
                            style={styles.input}
                            placeholder="Attach File for Evidence"
                            value={file}
                            onChangeText={setFile}
                        />
                        <TouchableOpacity onPress={handleFileUpload} style={styles.uploadIcon}>
                            <Icon name="upload" size={24} color="#808080" />
                        </TouchableOpacity>
                    </View>
                    <Pressable
                            style={({ pressed }) => [
                                styles.proceedButton,
                                isHovered && styles.proceedButtonHovered,
                                pressed && styles.proceedButtonPressed
                            ]}
                            onPress={handleProceed}
                            onPressIn={() => setIsPressed(true)}
                            onPressOut={() => setIsPressed(false)}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            <Text style={[
                                styles.proceedButtonText,
                                isPressed && styles.proceedButtonTextPressed
                            ]}>
                                Proceed
                            </Text>
                        </Pressable>
                </View>
                {/* Confirmation Modal */}
                <Modal
                    visible={showModal}
                    animationType="slide"
                    transparent={true}
                    onRequestClose={() => setShowModal(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalText}>Are you sure you want to submit the report?</Text>
                            <View style={styles.modalButtons}>
                                <TouchableOpacity onPress={handleConfirmSubmit} style={[styles.modalButton, styles.modalConfirmButton]}>
                                    <Text style={styles.modalButtonText}>YES</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setShowModal(false)} style={[styles.modalButton, styles.modalCancelButton]}>
                                    <Text style={styles.modalButtonText}>NO</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
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
        padding: 5,
        paddingBottom: 150, // Add some bottom padding to avoid overlap with the button
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
    stepCircle3: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#184965',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    stepCircle4: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#184965',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    stepText: {
        fontSize: 12,
        textAlign: 'center',
        flexShrink: 1,
        marginLeft: 5,
        marginRight: 5,
    },
    stepNumber: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
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
    inputContainer: {
        padding: 20,
        flexGrow: 1,
    },
    inputGroup: {
        marginBottom: 15,
        position: 'relative',
    },
    inputLabel: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#184965',
        borderRadius: 5,
        padding: 10,
        height: 40,
        backgroundColor: '#fff',
        marginBottom: 20,
    },
    uploadIcon: {
        position: 'absolute',
        top: 5,
        right: 10,
    },
    proceedButton: {
        backgroundColor: '#184965',
        width: 150,
        height: 35,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 260,
        alignSelf: 'center',
    },
    proceedButtonHovered: {
        backgroundColor: '#156080',
    },
    proceedButtonPressed: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#184965',
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
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
    modalText: {
        paddingVertical: 5,
        marginTop: 10,
        fontSize: 16,
        marginBottom: 30,
        textAlign: 'center',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    modalButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    modalConfirmButton: {
        backgroundColor: '#184965',
    },
    modalCancelButton: {
        backgroundColor: '#708090',
    },
    modalButtonText: {
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
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

export default EvidenceInfo;
