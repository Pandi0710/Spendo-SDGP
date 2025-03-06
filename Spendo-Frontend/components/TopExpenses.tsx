import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type ExpenseCircleProps = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  color?: string;
};

function ExpenseCircle({ icon, title, color = '#60A5FA' }: ExpenseCircleProps) {
  return (
    <View style={styles.circleContainer}>
      <View style={[styles.circle, { backgroundColor: color }]}>
        <Ionicons name={icon} size={32} color="white" />
      </View>
      <Text style={styles.circleText}>{title}</Text>
    </View>
  );
}

export default function TopExpenses() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Biggest Expenses</Text>
      </View>
      <View style={styles.circlesContainer}>
        <ExpenseCircle 
          icon="school-outline" 
          title="Education"
          color="#60A5FA"
        />
        <ExpenseCircle 
          icon="key-outline" 
          title="Rentals"
          color="#34D399"
        />
        <ExpenseCircle 
          icon="restaurant-outline" 
          title="Foods"
          color="#F472B6"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 16,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    marginBottom: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  circlesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  circleContainer: {
    alignItems: 'center',
  },
  circle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  circleText: {
    fontSize: 14,
    color: '#4B5563',
    fontWeight: '500',
  },
});