import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNotifications } from './NotificationContext';

const TrackScreen = () => {
  const { unreadCount } = useNotifications();
  const navigation = useNavigation();
  const [reports, setReports] = useState([]);
  const [expandedReportId, setExpandedReportId] = useState(null);
  const [showCurrentStatus, setShowCurrentStatus] = useState(false);
  const [showAssignedOfficer, setShowAssignedOfficer] = useState(false);
  const [showImportantDates, setShowImportantDates] = useState(false);
  const [showCaseDocuments, setShowCaseDocuments] = useState(false);

  // Fetching data from the database
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        if (userId) {
          const response = await axios.get('http://192.168.1.13:8000/reports', {
            params: { user_id: userId }
          });

          // Assuming response.data is an array of reports
          setReports(response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const toggleDetails = (id) => {
    setExpandedReportId(expandedReportId === id ? null : id);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {reports.map((report) => (
          <View key={report.id} style={styles.reportContainer}>
            <View style={styles.inputContainer}>
              <View style={styles.labelValueContainer}>
                <Text style={styles.label}>Victim's Name: </Text>
                <Text style={styles.value}>{report.name}</Text>
              </View>

              <View style={styles.labelValueContainer}>
                <Text style={styles.label}>Crime Report Type: </Text>
                <Text style={styles.value}>{report.category}</Text>
              </View>

              <View style={styles.labelValueContainer}>
                <Text style={styles.label}>Case No: </Text>
                <Text style={styles.value}>{report.id}</Text>
              </View>

              <Button
                title={expandedReportId === report.id ? "Hide Details" : "Show Details"}
                onPress={() => toggleDetails(report.id)}
                color="#184965"
              />
            </View>

            {expandedReportId === report.id && (
              <>
                <View style={styles.statusContainer}>
                  <Image source={require('./current.png')} style={styles.statusIcon} />
                  <Text style={styles.statusText}>Current Status of Case</Text>
                  <TouchableOpacity onPress={() => setShowCurrentStatus(!showCurrentStatus)}>
                    <Image source={require('./arrow.png')} style={[styles.arrowIcon, { width: 40 }]} />
                  </TouchableOpacity>
                </View>
                {showCurrentStatus && (
                  <View style={styles.additionalInfoContainer}>
                    <Text style={styles.additionalInfoText}>Current Status: {report.finish}</Text>
                  </View>
                )}
                <View style={styles.statusContainer}>
                  <Image source={require('./details.png')} style={styles.statusIcon} />
                  <Text style={styles.statusText}>Assigned Police Officer for the Case</Text>
                  <TouchableOpacity onPress={() => setShowAssignedOfficer(!showAssignedOfficer)}>
                    <Image source={require('./arrow.png')} style={[styles.arrowIcon, { width: 40 }]} />
                  </TouchableOpacity>
                </View>
                {showAssignedOfficer && (
                  <View style={styles.additionalInfoContainer}>
                    <Text style={styles.additionalInfoText}>Officer Assigned: {report.police_assign}</Text>
                  </View>
                )}
                <View style={styles.statusContainer}>
                  <Image source={require('./dates.png')} style={styles.statusIcon} />
                  <Text style={styles.statusText}>Important Dates</Text>
                  <TouchableOpacity onPress={() => setShowImportantDates(!showImportantDates)}>
                    <Image source={require('./arrow.png')} style={[styles.arrowIcon, { width: 40 }]} />
                  </TouchableOpacity>
                </View>
                {showImportantDates && (
                  <View style={styles.additionalInfoContainer}>
                    <Text style={styles.additionalInfoText}>Next Court Date: {report.nextCourtDate || 'N/A'}</Text>
                  </View>
                )}
                <View style={styles.statusContainer}>
                  <Image source={require('./folders.png')} style={styles.statusIcon} />
                  <Text style={styles.statusText}>Case Documents</Text>
                  <TouchableOpacity onPress={() => setShowCaseDocuments(!showCaseDocuments)}>
                    <Image source={require('./arrow.png')} style={[styles.arrowIcon, { width: 40 }]} />
                  </TouchableOpacity>
                </View>
                {showCaseDocuments && (
                  <View style={styles.additionalInfoContainer}>
                  <Text style={styles.additionalInfoText}>Document 1: Sample FIR Report.pdf</Text>
                  <Text style={styles.additionalInfoText}>Document 2: Sample Charge Sheet.pdf</Text>
                </View>
                )}
              </>
            )}
          </View>
        ))}
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 70, // Ensure space for footer
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: -10,
  },
  reportContainer: {
    marginBottom: -10,
  },
  inputContainer: {
    backgroundColor: '#add8e6',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  labelValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 16,
    marginRight: 10,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#add8e6',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e7e7e7',
    marginBottom: 10,
  },
  statusIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  statusText: {
    flex: 1,
    fontSize: 12,
    fontWeight: 'bold',
  },
  additionalInfoContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#d3d3d3',
    borderRadius: 10,
    marginBottom: 10,
  },
  additionalInfoText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#f8f8f8',
    borderTopWidth: 1,
    borderTopColor: '#e7e7e7',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  footerButton: {
    flex: 1,
    alignItems: 'center',
  },
  footerIcon: {
    width: 24,
    height: 24,
    marginBottom: 5,
  },
  footerIconHome: {
    width: 28,
    height: 28,
    marginBottom: 5,
  },
  footerButtonText: {
    fontSize: 10,
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

export default TrackScreen;
