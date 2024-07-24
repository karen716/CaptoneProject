import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, TextInput, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useNotifications } from './NotificationContext';

const { width, height } = Dimensions.get('window');

const LegalScreen = () => {
  const { unreadCount } = useNotifications();
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);

  const results = [
    {
      title: 'Theft',
      description: 'Theft is the act of stealing property or money from someone else.',
      details: [
        'Definition: Taking someone else\'s property without permission.',
        'Types: Petty theft, grand theft, etc.',
        'Legal Consequences: Fines, imprisonment, or both.',
        'Prevention: Secure belongings, be vigilant in public spaces.',
      ],
    },
    // Add more results here as needed
  ];

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query && !recentSearches.includes(query)) {
      setRecentSearches([query, ...recentSearches.slice(0, 4)]); // Keep only the last 5 searches
    }
  };

  const renderSearchResults = () => {
    if (!searchQuery) {
      return null;
    }

    const filteredResults = results.filter(result =>
      result.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filteredResults.length === 0) {
      return (
        <View style={styles.resultsContainer}>
          <Text style={styles.resultText}>No results found for "{searchQuery}"</Text>
        </View>
      );
    }

    return (
      <View style={styles.resultsContainer}>
        <Text style={styles.resultText}>Search results for "{searchQuery}"</Text>
        {filteredResults.map((result, index) => (
          <TouchableOpacity key={index} style={styles.resultItem} onPress={() => handleSearch(result.title)}>
            <Text style={styles.resultItemTitle}>{result.title}</Text>
            <Text style={styles.resultItemDescription}>{result.description}</Text>
            {result.details.map((detail, idx) => (
              <Text key={idx} style={styles.resultItemDetail}>{detail}</Text>
            ))}
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderRecentSearches = () => {
    if (recentSearches.length === 0) {
      return null;
    }

    return (
      <View style={styles.recentSearchesContainer}>
        <Text style={styles.recentSearchesTitle}>Recent Searches</Text>
        {recentSearches.map((search, index) => (
          <TouchableOpacity key={index} style={styles.recentSearchItem} onPress={() => handleSearch(search)}>
            <Text style={styles.recentSearchText}>{search}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
      <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.searchContainer} onPress={() => handleSearch(searchQuery)}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search legal info..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <View style={styles.searchIconContainer}>
              <Image source={require('./search.png')} style={styles.searchIcon} />
            </View>
          </TouchableOpacity>
        </View>
        {renderRecentSearches()}
        {renderSearchResults()}
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Report')}>
          <Image source={require('./reportnav.png')} style={styles.footerIcon} />
          <Text style={styles.footerButtonText}>Report</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('LegalInfo')}>
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
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inputContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 30,
    marginTop: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 20,
  },
  searchIconContainer: {
    backgroundColor: '#f0f0f0', // Gray background color for icon
    borderRadius: 5,
    padding: 8,
  },
  searchIcon: {
    width: 20,
    height: 25,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 2,
    borderColor: '#4682b4',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  resultsContainer: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    marginTop: 10,
  },
  resultText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  resultItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  resultItemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  resultItemDescription: {
    fontSize: 14,
    marginBottom: 5,
  },
  resultItemDetail: {
    fontSize: 12,
    marginLeft: 10,
    marginBottom: 2,
  },
  recentSearchesContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#e0e0e0',
    marginTop: 20,
  },
  recentSearchesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  recentSearchItem: {
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  recentSearchText: {
    fontSize: 14,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#f8f8f8',
    borderTopWidth: 1,
    borderTopColor: '#e7e7e7',
  },
  footerButton: {
    alignItems: 'center',
  },
  footerIcon: {
    width: 24,
    height: 24,
    marginBottom: 5,
  },
  footerIconHome: {
    width: 35,
    height: 35,
  },
  footerButtonText: {
    fontSize: 12,
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

export default LegalScreen;