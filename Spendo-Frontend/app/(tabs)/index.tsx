import { View, Text, StyleSheet, SafeAreaView, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TopExpenses from '../../components/TopExpenses';
import ExpenseCard from '../../components/ExpenseCard';
import ProgressBar from '../../components/ProgressBar';

export default function HomeScreen() {
  ;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="chevron-back" size={24} color="#1F2937" />
        <Ionicons name="notifications-outline" size={24} color="#1F2937" />
      </View>
      
      <TopExpenses />
      
      <View style={styles.expensesList}>
      
        <ExpenseCard
          icon="school-outline"
          title="Education"
          percentage={85}
          color="#60A5FA"
          
        />
        <ExpenseCard
          icon="key-outline"
          title="Rentals"
          percentage={65}
          color="#34D399"
         
        />
        <ExpenseCard
          icon="restaurant-outline"
          title="Foods"
          percentage={45}
          color="#F472B6"
         
        />
        <ExpenseCard
          icon="airplane-outline"
          title="Transport"
          percentage={25}
          color="#A78BFA"
          
        />
       
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#90a78b',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#90a78b',
  },
  expensesList: {
    flex: 1,
    paddingTop: 16,
    backgroundColor: '#f1fff4',
    margin:20,
    borderRadius: 16
  },
});