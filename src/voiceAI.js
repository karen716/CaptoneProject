// VoiceToText.js
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, ActivityIndicator, ScrollView } from 'react-native';
import { AssemblyAI } from 'assemblyai';

// Initialize the AssemblyAI client with your API key
const client = new AssemblyAI({
  apiKey: '760b68420d1648ca9b829450bef722ae', // Replace with your own API key
});

// Define the URL of the audio file you want to transcribe
const FILE_URL = 'https://storage.googleapis.com/aai-web-samples/5_common_sports_injuries.mp3';

const VoiceToText = () => {
  const [loading, setLoading] = useState(false);
  const [transcript, setTranscript] = useState('');

  const transcribeAudio = async () => {
    setLoading(true);
    try {
      const data = {
        audio_url: FILE_URL,
      };

      const response = await client.transcripts.transcribe(data);
      setTranscript(response.text);
    } catch (error) {
      console.error('Error transcribing audio:', error);
      setTranscript('Error transcribing audio. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Voice to Text</Text>
      <Button title="Transcribe Audio" onPress={transcribeAudio} />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ScrollView style={styles.transcriptContainer}>
          <Text style={styles.transcript}>{transcript}</Text>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  transcriptContainer: {
    marginTop: 20,
    width: '100%',
    paddingHorizontal: 10,
  },
  transcript: {
    fontSize: 16,
  },
});

export default VoiceToText;
