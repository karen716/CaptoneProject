import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Pressable, PanResponder, Animated } from 'react-native';

const LandingScreen = ({ navigation }) => {
  const [isHovered, setIsHovered] = useState(false);
  const pan = useRef(new Animated.ValueXY()).current;
  const opacity = useRef(new Animated.Value(1)).current; // Opacity for blinking effect

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: pan.x }], { useNativeDriver: false }),
      onPanResponderRelease: (e, gestureState) => {
        if (gestureState.dx < -100) { // Swiped left
          navigation.navigate('Emergency');
        } else {
          Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start();
        }
      },
    })
  ).current;

  // Blinking effect
  useEffect(() => {
    const blink = () => {
      Animated.sequence([
        Animated.timing(opacity, { toValue: 0, duration: 500, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 1, duration: 500, useNativeDriver: true }),
      ]).start(() => blink());
    };
    blink();
  }, [opacity]);

  return (
    <Animated.View
      style={[styles.container, { transform: [{ translateX: pan.x }] }]}
      {...panResponder.panHandlers}
    >
      <Image source={require('./logo1.png')} style={styles.logo} />
      <Text style={styles.title}>GuardianWatch</Text>
      <View style={styles.line} />
      <Text style={styles.subtitle1}>Nasugbu Municipal </Text>
      <Text style={styles.subtitle2}>Police Crime Reporting </Text>
      <Pressable
        style={[styles.button, isHovered && styles.buttonHover]}
        onPress={() => navigation.navigate('SignIn')}
        onPressIn={() => setIsHovered(true)}
        onPressOut={() => setIsHovered(false)}
      >
        <Text style={[styles.buttonText, isHovered && styles.buttonTextHover]}>Get Started</Text>
      </Pressable>
      <Animated.Text style={[styles.instruction, { opacity }]}>
        Slide left for Emergency
      </Animated.Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#184965',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 250,
    marginTop: 100,
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
    backgroundColor: '#ffffff',
    marginVertical: 5,
  },
  subtitle1: {
    fontSize: 20,
    color: '#ffffff',
    textAlign: 'justify',
  },
  subtitle2: {
    fontSize: 20,
    marginBottom: 20,
    color: '#ffffff',
    textAlign: 'justify',
  },
  button: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 30,
    marginTop: 50,
    marginBottom: 20,
  },
  buttonHover: {
    backgroundColor: '#184965',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#184965',
  },
  buttonTextHover: {
    color: 'white',
  },
  instruction: {
    marginTop: 25,
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
  },
});

export default LandingScreen;