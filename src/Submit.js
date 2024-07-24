import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNotifications } from './NotificationContext';

const SubmitInfo = () => {
    const { unreadCount } = useNotifications();
    const navigation = useNavigation();

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.stepLineHorizontal} />
                <View style={styles.stepContainer}>
                    <TouchableOpacity style={styles.step} onPress={() => navigation.navigate('Category')}>
                        <View style={styles.stepCircle}>
                            <Icon name="check" size={16} color="#fff" />
                        </View>
                        <Text style={styles.stepText}>Select{'\n'}Crime</Text>
                    </TouchableOpacity>
                    <View style={styles.step}>
                        <TouchableOpacity style={styles.step} onPress={() => navigation.navigate('Personal')}>
                            <View style={styles.stepCircle}>
                                <Icon name="check" size={16} color="#fff" />
                            </View>
                            <Text style={styles.stepText}>Personal{'\n'}Crime</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.step}>
                    <TouchableOpacity style={styles.step} onPress={() => navigation.navigate('CrimeInfo')}>
                        <View style={styles.stepCircle}>
                            <Icon name="check" size={16} color="#fff" />
                        </View>
                        <Text style={styles.stepText}>Crime{'\n'}Information</Text>
                    </TouchableOpacity>
                    </View>
                    <View style={styles.step}>
                    <TouchableOpacity style={styles.step} onPress={() => navigation.navigate('Evidence')}>
                        <View style={styles.stepCircle}>
                            <Icon name="check" size={16} color="#fff" />
                        </View>
                        <Text style={styles.stepText}>Evidence{'\n'}Information</Text>
                    </TouchableOpacity>
                    </View>
                    <View style={styles.step}>
                        <View style={styles.stepCircle}>
                            <Icon name="check" size={16} color="#fff" />
                        </View>
                        <Text style={styles.stepText}>Submitted{'\n'}Information</Text>
                    </View>
                </View>

                <View style={styles.MessageContainer}>
                    <Image source={require('./submit-data.png')} style={styles.successImage} />
                    <Text style={styles.successMessage}>
                        Your report has been submitted successfully!
                        Wait for further updates regarding your report. We will notify you.
                    </Text>
                    <TouchableOpacity style={styles.okButton}>
                        <Text style={styles.okButtonText}>OK</Text>
                    </TouchableOpacity>
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
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#fff',
        paddingBottom: 100, // Adjust according to your footer height
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
    },
    MessageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    successImage: {
        width: 150,
        height: 150,
        marginBottom: 20,
    },
    successMessage: {
        fontSize: 16,
        textAlign: 'center',
        marginHorizontal: 20,
        marginBottom: 20,
        marginVertical: 10,
    },
    okButton: {
        backgroundColor: '#184965',
        padding: 10,
        paddingHorizontal: 50,
        borderRadius: 5,
    },
    okButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 5,
        backgroundColor: '#f8f8f8',
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
        position: 'absolute',
        bottom: 0,
        width: '100%',
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

export default SubmitInfo;