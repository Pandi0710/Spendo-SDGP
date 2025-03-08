import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BarChart from '../../components/BarChart';

type CategoryData = {
  name: string;
  percentage: number;
  amount: number;
  color: string;
  icon: keyof typeof Ionicons.glyphMap;
};

const categories: CategoryData[] = [
  { name: 'Education', percentage: 35, amount: 1250, color: '#60A5FA', icon: 'school-outline' },
  { name: 'Rentals', percentage: 25, amount: 850, color: '#34D399', icon: 'key-outline' },
  { name: 'Foods', percentage: 20, amount: 650, color: '#F472B6', icon: 'restaurant-outline' },
  { name: 'Transport', percentage: 12, amount: 400, color: '#A78BFA', icon: 'car-outline' },
  { name: 'Entertainment', percentage: 8, amount: 250, color: '#FBBF24', icon: 'film-outline' },
];

function CategoryItem({ item }: { item: CategoryData }) {
  return (
    <View style={styles.categoryItem}>
      <View style={styles.categoryHeader}>
        <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
          <Ionicons name={item.icon} size={20} color="yellow" />
        </View>
        <View style={styles.categoryDetails}>
          <Text style={styles.categoryName}>{item.name}</Text>
          <Text style={styles.categoryAmount}>LKR {item.amount}</Text>
        </View>
        <Text style={styles.categoryPercentage}>{item.percentage}%</Text>
      </View>
      <View style={styles.progressBarContainer}>
        <View 
          style={[
            styles.progressBar, 
            { 
              width: `${item.percentage}%`,
              backgroundColor: item.color
            }
          ]} 
        />
      </View>
    </View>
  );
}

export default function StatsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Statistics</Text>
        <Ionicons name="calendar-outline" size={24} color="#1F2937" />
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.periodSelector}>
          <Text style={styles.periodActive}>Week</Text>
          <Text style={styles.period}>Month</Text>
          <Text style={styles.period}>Year</Text>
        </View>
        
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Spending</Text>
          <Text style={styles.totalAmount}>LKR 3,400</Text>
          
          <View style={styles.chartContainer}>
            <BarChart 
              data={[30, 45, 60, 75, 90, 60, 45]} 
              color="#3B82F6" 
              height={150}
              barWidth={30}
              barGap={10}
            />
          </View>
          
          <View style={styles.chartLabels}>
            <Text style={styles.chartLabel}>Mon</Text>
            <Text style={styles.chartLabel}>Tue</Text>
            <Text style={styles.chartLabel}>Wed</Text>
            <Text style={styles.chartLabel}>Thu</Text>
            <Text style={styles.chartLabel}>Fri</Text>
            <Text style={styles.chartLabel}>Sat</Text>
            <Text style={styles.chartLabel}>Sun</Text>
          </View>
        </View>
        
        <View style={styles.categoriesContainer}>
          <Text style={styles.categoriesTitle}>Top Spending Categories</Text>
          
          {categories.map((category, index) => (
            <CategoryItem key={index} item={category} />
          ))}
        </View>
      </ScrollView>
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
  periodSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 16,
  },
  period: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 20,
    color: '#6B7280',
  },
  periodActive: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 20,
    backgroundColor: '#3B82F6',
    color: 'white',
  },
  chartCard: {
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
  chartTitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  totalAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 24,
  },
  chartContainer: {
    marginBottom: 16,
  },
  chartLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  chartLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  categoriesContainer: {
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
  categoriesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  categoryItem: {
    marginBottom: 16,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  categoryDetails: {
    flex: 1,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
  },
  categoryAmount: {
    fontSize: 14,
    color: '#6B7280',
  },
  categoryPercentage: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
});