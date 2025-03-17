import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet,SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


const contacts = [
  { id: '1', name: 'Nanthakumar Senthuran' },
  {id:'2', name:"Dumini Bandara"},
  {id:'3',name:"Sankaja Pandiperuma"},
  {id:'4',name:"Kalana Disanaka"},
  {id:'5',name:'Aflal Ahamed'},
  {id:'6',name:'Isuri Imasha'}
]
;

const ChoosePerson = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredContacts = contacts.filter(contact => {
  const searchText = searchTerm.toLowerCase();
  return contact.name.toLowerCase().includes(searchText);
});

const renderContactItem = ({ item }) => (
    <View style={styles.contactItem}>
      <View style={styles.avatarPlaceholder}>
        <Text style={styles.nameFirstLetter}>{item.name.charAt(0)}</Text>
      </View>
      <Text style={styles.contactName}>{item.name}</Text>
    </View>
  );

  return (
    <SafeAreaView style = {styles.safeArea}>
    <View >
    <Text style = {styles.title}> Choose a Person  </Text>
      <View style={styles.searchContainer}>
      <Ionicons name="search" size={24} color="#fff" style={styles.searchIcon} />
        <TextInput
          style={styles.searchBox}
          placeholder="Enter the name to Search"
          onChangeText={setSearchTerm}
          value={searchTerm}
        />
      </View>
      <FlatList
        data={filteredContacts}
        renderItem={renderContactItem}
        keyExtractor={item => item.id}
      />
    </View>
    </SafeAreaView>
  );
};



const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f1f5f9'
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    paddingTop:40,
    textAlign: 'center',
    color: '#1c4e80', 
  },
  searchContainer: {
    flexDirection: 'row', 
    backgroundColor: '#1c4e80', 
    borderRadius: 15,
    padding: 10,
    alignItems: 'center', 
    marginBottom: 20,
    marginHorizontal:15
  },
  searchIcon: {
    marginRight: 10, 
  },
  searchBox: {
    flex: 1,
    fontSize: 18,
    color: '#fff',
  },
  contactItem: {
    flexDirection: 'row', 
    alignItems: 'center',
    backgroundColor: '#fff', 
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000', 
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginHorizontal:15
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1c4e80', 
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  nameFirstLetter: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  contactName: {
    fontSize: 18, 
  },
});

export default ChoosePerson;