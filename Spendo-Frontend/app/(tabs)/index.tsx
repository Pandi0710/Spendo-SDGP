import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TopExpenses from '../../components/TopExpenses';
import ExpenseCard from '../../components/ExpenseCard';
import ProgressBar from '../../components/ProgressBar'; // Imported ProgressBar

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="chevron-back" size={24} color="#1F2937" />
        <Ionicons name="notifications-outline" size={24} color="#1F2937" />
      </View>
      
      <TopExpenses />
      
      <View style={styles.expensesList}>
      <ProgressBar percentage={80} />
        <ExpenseCard
          icon="school-outline"
          title="Education"
          
          color="#60A5FA"
        />
        <ProgressBar percentage={65} />
        <ExpenseCard
          icon="key-outline"
          title="Rentals"
          
          color="#34D399"
        />
          <ProgressBar percentage={45} />
        <ExpenseCard
          icon="restaurant-outline"
          title="Foods"
          
          color="#F472B6"
        />
         <ProgressBar percentage={25} />
        <ExpenseCard
          icon="airplane-outline"
          title="Transport"
          
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
    margin: 20,
    borderRadius: 16,
  },
});