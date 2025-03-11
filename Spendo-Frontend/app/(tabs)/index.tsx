import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TopExpenses from '../../components/TopExpenses';
import ExpenseCard from '../../components/ExpenseCard';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="chevron-back" size={24} color="#f1fff4" />
        <Ionicons name="notifications-outline" size={24} color="#f1fff4" />
      </View>
      
      <TopExpenses />
      
      <View style={styles.expensesList}>
        <ExpenseCard
          icon="school-outline"
          title="Education"
          percentage={35}
          color="#60A5FA"
          chartData={[65, 55, 70, 85, 80, 75, 90, 80]}
        />
        <ExpenseCard
          icon="key-outline"
          title="Rentals"
          percentage={25}
          color="#34D399"
          chartData={[30, 45, 60, 75, 55, 65, 70, 60]}
        />
        <ExpenseCard
          icon="restaurant-outline"
          title="Foods"
          percentage={20}
          color="#F472B6"
          chartData={[20, 30, 70, 35, 65, 30, 55, 35]}
        />
        <ExpenseCard
          icon="car-outline"
          title="Transport"
          percentage={12}
          color="#A78BFA"
          chartData={[15, 30, 45, 20, 35, 55, 45, 15]}
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
    padding: 20,
    backgroundColor: '#F1FFF4',
    borderRadius: 16,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
});