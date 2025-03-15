import { View, Text, StyleSheet, SafeAreaView, useWindowDimensions } from 'react-native';
import { ChevronLeft, Bell } from 'lucide-react-native';
import TopExpenses from '../../components/TopExpenses';
import ExpenseCard from '../../components/ExpenseCard';

export default function HomeScreen() {
  const { width: screenWidth } = useWindowDimensions();
  // We'll use only the latest value from each category for the progress bars
  const expenses = {
    education: { value: 85, data: [40, 55, 70, 85, 65, 75, 90, 80] },
    rentals: { value: 65, data: [30, 45, 60, 75, 55, 65, 70, 60] },
    foods: { value: 45, data: [20, 30, 40, 35, 45, 30, 25, 35] },
    transport: { value: 25, data: [15, 20, 25, 30, 20, 15, 25, 20] }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <ChevronLeft size={24} color="#1F2937" />
        <Bell size={24} color="#1F2937" />
      </View>
      
      <TopExpenses />
      
      <View style={styles.expensesList}>
        <ExpenseCard
          icon="education"
          title="Education"
          percentage={expenses.education.value}
          color="#60A5FA"
          chartData={expenses.education.data}
        />
        <ExpenseCard
          icon="rentals"
          title="Rentals"
          percentage={expenses.rentals.value}
          color="#34D399"
          chartData={expenses.rentals.data}
        />
        <ExpenseCard
          icon="foods"
          title="Foods"
          percentage={expenses.foods.value}
          color="#F472B6"
          chartData={expenses.foods.data}
        />
        <ExpenseCard
          icon="transport"
          title="Transport"
          percentage={expenses.transport.value}
          color="#A78BFA"
          chartData={expenses.transport.data}
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
    borderRadius: 16
  },
});