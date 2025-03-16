import { View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Transaction = {
  id: string;
  title: string;
  amount: number;
  date: string;
  category: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
};

const transactions: Transaction[] = [
  {
    id: '1',
    title: 'University Fee',
    amount: -1250,
    date: '15 Jun 2025',
    category: 'Education',
    icon: 'school-outline',
    color: '#60A5FA',
  },
  {
    id: '2',
    title: 'Apartment Rent',
    amount: -850,
    date: '10 Jun 2025',
    category: 'Rentals',
    icon: 'key-outline',
    color: '#34D399',
  },
  {
    id: '3',
    title: 'Grocery Shopping',
    amount: -125.50,
    date: '08 Jun 2025',
    category: 'Foods',
    icon: 'restaurant-outline',
    color: '#F472B6',
  },
  {
    id: '4',
    title: 'Uber Ride',
    amount: -28.75,
    date: '05 Jun 2025',
    category: 'Transport',
    icon: 'car-outline',
    color: '#A78BFA',
  },
  {
    id: '5',
    title: 'Income',
    amount: 3200,
    date: '01 Jun 2025',
    category: 'Income',
    icon: 'cash-outline',
    color: '#10B981',
  },
];

function TransactionItem({ item }: { item: Transaction }) {
  return (
    <View style={styles.transactionItem}>
      <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
        <Ionicons name={item.icon} size={24} color="white" />
      </View>
      <View style={styles.transactionDetails}>
        <Text style={styles.transactionTitle}>{item.title}</Text>
        <Text style={styles.transactionCategory}>{item.category} • {item.date}</Text>
      </View>
      <Text style={[
        styles.transactionAmount,
        { color: item.amount >= 0 ? '#10B981' : '#EF4444' }
      ]}>
        {item.amount >= 0 ? '+' : ''}LKR {Math.abs(item.amount).toFixed(2)}
      </Text>
    </View>
  );
}

export default function TransactionsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Transactions</Text>
        <Ionicons name="search-outline" size={24} color="#1F2937" />
      </View>
      
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Current Balance</Text>
        <Text style={styles.balanceAmount}>LKR 4,945.75</Text>
        <View style={styles.balanceActions}>
          <View style={styles.actionButton}>
            <Ionicons name="add-circle-outline" size={24} color="#10B981" />
            <Text style={styles.actionText}>Add</Text>
          </View>
          <View style={styles.actionButton}>
            <Ionicons name="arrow-down-outline" size={24} color="#EF4444" />
            <Text style={styles.actionText}>Spend</Text>
          </View>
          <View style={styles.actionButton}>
            <Ionicons name="swap-horizontal-outline" size={24} color="#3B82F6" />
            <Text style={styles.actionText}>Transfer</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.transactionsContainer}>
        <View style={styles.transactionsHeader}>
          <Text style={styles.transactionsTitle}>Recent Transactions</Text>
          <Text style={styles.viewAllText}>View All</Text>
        </View>
        
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TransactionItem item={item} />}
          showsVerticalScrollIndicator={false}
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
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#90a78b',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  balanceCard: {
    margin: 16,
    padding: 20,
    backgroundColor: '#f1fff4',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  balanceLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  balanceAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  balanceActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionText: {
    marginTop: 4,
    fontSize: 12,
    color: '#4B5563',
  },
  transactionsContainer: {
    flex: 1,
    margin: 16,
    padding: 20,
    backgroundColor: '#f1fff4',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  transactionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  transactionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  viewAllText: {
    fontSize: 14,
    color: '#3B82F6',
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 4,
  },
  transactionCategory: {
    fontSize: 12,
    color: '#6B7280',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '600',
  },
});