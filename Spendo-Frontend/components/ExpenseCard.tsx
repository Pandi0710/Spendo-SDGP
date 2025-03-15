import { View, Text, StyleSheet } from 'react-native';
import { GraduationCap, Key, UtensilsCrossed, Plane } from 'lucide-react-native';
import ProgressBar from './ProgressBar';

type ExpenseCardProps = {
  icon: 'education' | 'rentals' | 'foods' | 'transport';
  title: string;
  percentage: number;
  color: string;
  chartData: number[];
};

const IconMap = {
  education: GraduationCap,
  rentals: Key,
  foods: UtensilsCrossed,
  transport: Plane,
};

export default function ExpenseCard({ icon, title, percentage, color, chartData }: ExpenseCardProps) {
  const Icon = IconMap[icon];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={[styles.iconContainer, { backgroundColor: color }]}>
          <Icon size={24} color="white" />
        </View>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.content}>
        <ProgressBar
          value={percentage}
          color={color}
          height={120}
          showPercentage={true}
         
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  content: {
    alignItems: 'center',
  },
});