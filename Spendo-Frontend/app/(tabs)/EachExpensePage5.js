import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const eachExpensePage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rent</Text>
      <View style={styles.Centercard}>
        <View style={styles.details}>
          <Text style={styles.lineText}>Amount:</Text>
          <Text style={styles.value}>$500</Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.lineText}>Due Date:</Text>
          <Text style={styles.value}>2025-03-01</Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.lineText}>Status:</Text>
          <Text style={styles.statusUnpaid}>Unpaid</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>SET REMINDER</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6F7FF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  title: {
    padding:20,
    color: '#333',
    fontSize:40,
    fontWeight: 'bold'
  },
  Centercard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  lineText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#333',
  },
  value: {
    fontSize: 16,
    color: '#333'
  },
  statusUnpaid: {
    color: '#FF6347', 
    fontWeight: 'bold',
    fontSize:18
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default eachExpensePage;
