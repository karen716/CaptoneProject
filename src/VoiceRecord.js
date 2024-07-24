import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import Voice from '@react-native-voice/voice';

export default function App() {
  const [text, setText] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    // Ensure Voice module is available
    console.log('Voice module:', Voice);

    // Setup event listener for speech results
    Voice.onSpeechResults = onSpeechResults;

    return () => {
      // Cleanup: Destroy Voice instance and remove listeners
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechResults = (event) => {
    setText(event.value[0]);
  };

  const startRecording = async () => {
    try {
      setIsRecording(true);
      await Voice.start('en-GB');
    } catch (error) {
      console.error('Failed to start recording', error);
    }
  };

  const stopRecording = async () => {
    try {
      setIsRecording(false);
      await Voice.stop();
    } catch (error) {
      console.error('Failed to stop recording', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.speechtxt}>Search</Text>
        <View style={styles.buttonsContainer}>
          <Button
            title={isRecording ? 'Recording...' : 'Start Recording'}
            onPress={isRecording ? null : startRecording}
            disabled={isRecording}
          />
          <Button
            title="Stop Recording"
            onPress={isRecording ? stopRecording : null}
            disabled={!isRecording}
          />
        </View>
        <TextInput
          style={styles.speak}
          placeholder="Spoken text will appear here..."
          value={text}
          onChangeText={setText}
          multiline
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  main: {
    width: '80%',
    alignItems: 'center',
  },
  speechtxt: {
    fontSize: 20,
    marginBottom: 20,
  },
  speak: {
    width: '100%',
    height: 100,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginTop: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
});
