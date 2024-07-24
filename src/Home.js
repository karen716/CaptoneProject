import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={require('./logo1.png')} style={styles.logo} />
      <Text style={styles.title}>GuardianWatch</Text>
      <View style={styles.line} />
      <Text style={styles.subtitle1}>Nasugbu Municipal</Text>
      <Text style={styles.subtitle2}>Police Crime Reporting</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignIn')}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6495ed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 250,
    marginTop: 80,
    marginBottom: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 3,
    marginTop: 20,
    color: '#ffffff',
  },
  line: {
    width: '70%',
    height: 5,
    backgroundColor: '#000000',
    marginVertical: 5,
  },
  subtitle1: {
    fontSize: 20,
    color: '#000000',
    textAlign: 'justify',
  },
  subtitle2: {
    fontSize: 20,
    marginBottom: 20,
    color: '#000000',
    textAlign: 'justify',
  },
  button: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 30,
    marginTop: 60,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default HomeScreen;