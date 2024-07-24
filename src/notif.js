import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNotifications } from './NotificationContext'; // Corrected import


const NotifScreen = () => {
  const navigation = useNavigation();
  const [notes, setNotes] = useState([]);
  const [readNotes, setReadNotes] = useState([]);
  const [sortedNotes, setSortedNotes] = useState([]);
  const { unreadCount, setUnreadCount } = useNotifications(); // Use the context

  useEffect(() => {
    const fetchUserIdAndNotes = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        if (userId) {
          axios.get('http://192.168.1.13:8000/notifications', {
            params: { user_id: userId }
          })
          .then(async (response) => {
            const notesData = response.data;
            setNotes(notesData);

            const sortedData = notesData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            setSortedNotes(sortedData);

            const storedReadNotes = await AsyncStorage.getItem('readNotes');
            if (storedReadNotes) {
              setReadNotes(JSON.parse(storedReadNotes));
            }

            updateUnreadCount(notesData);
          })
          .catch(error => console.error(error));
        } else {
          console.error('User ID is not available');
        }
      } catch (error) {
        console.error('Error fetching user ID:', error);
      }
    };

    fetchUserIdAndNotes();
  }, []);

  // Function to update the unread count
  const updateUnreadCount = (notesData) => {
    const count = notesData.filter(note => !readNotes.includes(note.id) && isNewNote(note.time)).length;
    setUnreadCount(count); // Update context state
  };

  const markAsRead = async (noteId) => {
    const updatedReadNotes = [...readNotes, noteId];
    setReadNotes(updatedReadNotes);
    await AsyncStorage.setItem('readNotes', JSON.stringify(updatedReadNotes));
    updateUnreadCount(notes);
  };

  const isNewNote = (createdAt) => {
    const noteDate = new Date(createdAt);
    const currentDate = new Date();
    const timeDiff = Math.abs(currentDate - noteDate);
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays <= 2;
  };

  const handleNotePress = (item) => {
    markAsRead(item.id);
    navigation.navigate('Detail', {
      title: item.notes,
      files: [item.filename],
      createdAt: item.time,
      reportId: item.reportId,
      fullname: item.fullname,
      category: item.category,
      details: item.details,
      file_date: item.file_date,
      unreadCount: unreadCount
    });
  };

  const renderItem = ({ item }) => {
    const isRead = readNotes.includes(item.id);
    const isNew = isNewNote(item.time) && !isRead;

    return (
      <TouchableOpacity
        style={[
          styles.notificationItem,
          { backgroundColor: isRead ? '#f0f0f0' : '#E0F7FA' }
        ]}
        onPress={() => handleNotePress(item)}
      >
        <View style={styles.iconContainer}>
          <Image source={require('./notif.png')} style={styles.notificationIcon} />
          {isNew && <View style={styles.redDot} />}
        </View>
        <View style={styles.textContainer}>
          <View style={styles.notificationHeader}>
            <Text style={styles.notificationTitle}>{item.notes}</Text>
            {isNew && <Text style={styles.newLabel}>New</Text>}
          </View>
          <Text style={styles.notificationTime}>{new Date(item.time).toLocaleString()}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <FlatList
          data={sortedNotes}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 10,
  },
  notificationItem: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e7e7e7',
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 10,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  notificationIcon: {
    width: 40,
    height: 40,
  },
  redDot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'red',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
  },
  newLabel: {
    backgroundColor: '#ff6347',
    color: '#fff',
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 5,
    fontSize: 10,
    fontWeight: 'bold',
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
  footerButtonText: {
    fontSize: 10,
    textAlign: 'center',
  },
  footerIconContainer: {
    position: 'relative',
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

export default NotifScreen;
