import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ProgressBar from './ProgressBar';

type ExpenseCardProps = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  
  color?: string;
  chartData?: number[];
};

export default function ExpenseCard({ 
  icon, 
  title, 
  
  color = '#60A5FA',
  chartData = [30, 45, 60, 75, 45, 60, 75, 90]
}: ExpenseCardProps) {
  const { width: screenWidth } = useWindowDimensions();
  const chartHeight = Math.min(screenWidth * 0.1, 40);

  return (
    <View style={styles.container}>
      <View style={[styles.iconContainer, { backgroundColor: color }]}>
        <Ionicons name={icon} size={30} color="white" />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.chartContainer}>
  
  
</View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  chartContainer: {
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  percentageText: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  }
});