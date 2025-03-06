import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TopExpenses from '../../components/TopExpenses';
import ExpenseCard from '../../components/ExpenseCard';

export default function HomeScreen() {
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
          chartData={[40, 55, 70, 85, 65, 75, 90, 80]}
        />
        <ExpenseCard
          icon="key-outline"
          title="Rentals"
          percentage={65}
          color="#34D399"
          chartData={[30, 45, 60, 75, 55, 65, 70, 60]}
        />
        <ExpenseCard
          icon="restaurant-outline"
          title="Foods"
          percentage={45}
          color="#F472B6"
          chartData={[20, 30, 40, 35, 45, 30, 25, 35]}
        />
        <ExpenseCard
          icon="airplane-outline"
          title="Transport"
          percentage={25}
          color="#A78BFA"
          chartData={[15, 20, 25, 30, 20, 15, 25, 20]}
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
  },
});