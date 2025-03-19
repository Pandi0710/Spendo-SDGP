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

      {/* All Expense Cards inside the same background */}
      <View style={styles.expensesContainer}>
        <ExpenseCard icon="school-outline" title="Education" color="#60A5FA" percentage={80} />
        <ExpenseCard icon="key-outline" title="Rentals" color="#34D399" percentage={65} />
        <ExpenseCard icon="restaurant-outline" title="Foods" color="#F472B6" percentage={45} />
        <ExpenseCard icon="airplane-outline" title="Transport" color="#A78BFA" percentage={25} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7e9279',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#F1FFF4',
  },
  expensesContainer: {
    backgroundColor: '#f1fff3',
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 16,
    margin: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
});