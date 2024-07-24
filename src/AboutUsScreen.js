import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Linking } from 'react-native';

const AboutUsScreen = () => {
    const handleEmailPress = () => {
        Linking.openURL('mailto:guardianwatch@gmail.com');
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Image source={require('../assets/logoUpdated.png')} style={styles.logo} />
                <Text style={styles.title}>GuardianWatch</Text>
                <Text style={styles.subtitle}>"Together for a Safer Tomorrow"</Text>
            </View>
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Our Mission</Text>
                <Text style={styles.sectionText}>
                    GuardianWatch is dedicated to providing a secure and reliable system for monitoring and protecting your loved ones. Our mission is to leverage advanced technology to create a safer environment for families and communities.
                </Text>
            </View>
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>What We Do</Text>
                <Text style={styles.sectionText}>
                    We offer a comprehensive solution that integrates real-time monitoring, alert notifications, and emergency response services. Our system ensures that you are always informed and prepared to take action in any situation.
                </Text>
            </View>
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Our Team</Text>
                <Text style={styles.sectionText}>
                    Our team is composed of dedicated professionals with expertise in security, technology, and customer service. We are committed to continuous improvement and innovation to provide the best possible service to our users.
                </Text>
            </View>
            <View style={styles.contactContainer}>
                <Text style={styles.contactTitle}>Contact Us</Text>
                <Text style={styles.contactText}>
                    If you have any questions, feedback, or need support, please do not hesitate to contact us at
                    <Text style={styles.emailLink} onPress={handleEmailPress}> guardianwatch@gmail.com</Text>.
                </Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        marginTop: 10,
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 5,
        textAlign: 'center',
    },
    sectionContainer: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
        elevation: 2, // Adds shadow effect on Android
        shadowColor: '#000', // Adds shadow effect on iOS
        shadowOffset: { width: 0, height: 2 }, // Adds shadow effect on iOS
        shadowOpacity: 0.1, // Adds shadow effect on iOS
        shadowRadius: 4, // Adds shadow effect on iOS
        marginHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    sectionText: {
        fontSize: 14,
        textAlign: 'justify',
    },
    contactContainer: {
        backgroundColor: '#184965',
        paddingVertical: 20,
        paddingHorizontal: 40,
        marginTop: 10,
        marginHorizontal: -20, // To negate the padding effect and make it full-width
    },
    contactTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
        color: '#fff',
    },
    contactText: {
        fontSize: 14,
        textAlign: 'justify',
        color: '#fff',
    },
    emailLink: {
        fontSize: 14,
        color: '#ADD8E6', // Light blue color for the email link
        textDecorationLine: 'underline',
    },
    subtitle: {
        fontSize: 15,
        fontWeight: 'normal',
        color: '#666', // Optional: adjust color for subtitle
        textAlign: 'center',
    },
});

export default AboutUsScreen;

