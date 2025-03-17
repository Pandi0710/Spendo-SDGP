import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ExpenseGroupScreen = () => {
  const groupData = {
    id: '1',
    name: 'Group1',
    expenses: [
      { id: '1', title: 'Rent', amount: 500, dueDate: '2025-03-01', status: 'unpaid', userShare: 100 },
      { id: '2', title: 'Groceries', amount: 150, dueDate: '2025-02-20', status: 'paid', userShare: 50 },
    ],
  };

  const eachExpense = ({ item }) => (
    <View
      style={[
        styles.expenseContainer,
        { borderColor: item.status === 'paid' ? '#4CAF50' : '#F44336' },
      ]}
    >
      <View style={styles.expenseDetails}>
        <Text style={styles.expenseTitle}>{item.title}</Text>
        <Text style={styles.expenseTitle}>Total: ${item.amount}</Text> {/* Display Total Amount */}
      </View>
      
      <View style={styles.expenseDetails}>
        <Text style={styles.dueDate}>Due: {item.dueDate}</Text>
        <Text style={[styles.status, { color: item.status === 'paid' ? '#4CAF50' : '#F44336' }]}>
          {item.status === 'paid' ? 'Paid' : 'Unpaid'}
        </Text>
      </View>

      <View style={styles.userContribution}>
        <Text style={styles.userContributionText}>
          Your Contribution: ${item.userShare} 
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.groupName}>{groupData.name}</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity>
            <Ionicons name="add-circle" size={40} style={styles.designIcon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="notifications" size={30} color="#FF6F61" style={styles.designIcon} />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={groupData.expenses}
        renderItem={eachExpense}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F7FBFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  groupName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2874A6',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  designIcon: {
    marginLeft: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: '#FFF',
    padding: 5,
    borderRadius: 20,
  },
  expenseContainer: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#F44336',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  expenseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dueDate: {
    fontSize: 18,
    marginTop: 5,
  },
  status: {
    fontSize: 16,
    marginTop: 5,
  },
  expenseDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  userContribution: {
    marginTop: 10,
  },
  userContributionText: {
    fontSize: 18,
    color: '#2874A6',
    fontWeight: 'bold',
  },
});

export default ExpenseGroupScreen;
