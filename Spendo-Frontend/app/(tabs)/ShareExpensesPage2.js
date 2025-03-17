import { 
    View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, Image, ScrollView
  } from 'react-native';
  
  const ShareExpensesPage2 = () => {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Group Expenses </Text>
            <Image 
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2331/2331943.png' }} 
              style={styles.expenseImage} 
            />
          </View>
  
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Group Name </Text>
            <TextInput 
              style={styles.input} 
              placeholder="Enter the Group Name " 
              placeholderTextColor="#A0A0A0"
            />
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('ChoosePerson')} style = {styles.addButton}>
            <Text style={styles.groupNameText}>Add Persons  Group</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
    
  };
  
  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: '#F7FBFF',
    },
    scrollContainer: {
      padding: 20,
      alignItems: 'center',
    },
    headerContainer: {
      alignItems: 'center',
      marginBottom: 30,
      backgroundColor: '#FFFFFF',
      padding: 20,
      borderRadius: 20,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 10,
      elevation: 5,
    },
    headerText: {
      fontSize: 30,
      fontWeight: 'bold',
      color: '#2874A6',
      marginBottom: 10,
    },
    expenseImage: {
      width: 100,
      height: 100,
      tintColor: '#2874A6',
      resizeMode: 'contain',
    },
    inputContainer: {
      width: '100%',
      marginBottom: 20,
    },
    label: {
      fontSize: 18,
      fontWeight: '600',
      color: '#2C3E50',
      marginBottom: 8,
    },
    input: {
      backgroundColor: '#FFFFFF',
      borderRadius: 15,
      padding: 16,
      fontSize: 16,
      color: '#2C3E50',
      marginBottom: 15,
      width: '100%',
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
    },
    addButton: {
      backgroundColor: '#2874A6',
      borderRadius: 20,
      paddingVertical: 16,
      width: '100%',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 5,
      marginBottom:20
    },
    
    groupNameText:{
      fontSize: 18,
      fontWeight: '600',
      color: 'white'
    }
  });
  
  export default ShareExpensesPage2;
  