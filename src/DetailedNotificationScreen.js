import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Linking, ScrollView } from 'react-native';

const DetailedNotificationScreen = ({ route }) => {
  const { title, files = [], reportId, fullname, category, details, file_date, createdAt } = route.params;

  const baseURL = 'http://192.168.1.13:8000/new/uploads/';

  const handleFileDownload = async (fileName) => {
    try {
      const encodedFileName = encodeURIComponent(fileName);
      const fileUrl = `${baseURL}${encodedFileName}`;
      const supported = await Linking.canOpenURL(fileUrl);

      if (supported) {
        await Linking.openURL(fileUrl);
      } else {
        console.error('Unsupported URL:', fileUrl);
      }
    } catch (err) {
      console.error('Error opening file:', err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.timestamp}>{createdAt}</Text>

        <View style={styles.infoContainer}>
          {reportId && <Text style={styles.infoText}>Report ID: <Text style={styles.infoValue}>{reportId}</Text></Text>}
          {fullname && <Text style={styles.infoText}>Victim Name: <Text style={styles.infoValue}>{fullname}</Text></Text>}
          {category && <Text style={styles.infoText}>Crime Category: <Text style={styles.infoValue}>{category}</Text></Text>}
          {details && <Text style={styles.infoText}>Crime Description: <Text style={styles.infoValue}>{details}</Text></Text>}
          {file_date && <Text style={styles.infoText}>File Date: <Text style={styles.infoValue}>{file_date}</Text></Text>}
        </View>

        <View style={styles.filesContainer}>
          <Text style={styles.filesTitle}>Attached Files:</Text>
          {files.length > 0 ? (
            files.map((fileName, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleFileDownload(fileName)}
                style={styles.fileLink}
              >
                <Text style={styles.fileLinkText}>{fileName}</Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.noFilesText}>No files attached</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e9ecef',
    padding: 16,
  },
  content: {
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#212529',
    marginVertical: 20,
  },
  timestamp: {
    fontSize: 16,
    color: '#6c757d',
    marginBottom: 20,
  },
  infoContainer: {
    marginBottom: 20,
  },
  infoText: {
    fontSize: 16,
    color: '#495057',
    marginBottom: 8,
  },
  infoValue: {
    fontWeight: '500',
    color: '#343a40',
  },
  filesContainer: {
    marginTop: 10,
  },
  filesTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 10,
  },
  fileLink: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#007bff',
    marginBottom: 8,
  },
  fileLinkText: {
    fontSize: 16,
    color: '#007bff',
  },
  noFilesText: {
    fontSize: 16,
    color: '#6c757d',
  },
});

export default DetailedNotificationScreen;
