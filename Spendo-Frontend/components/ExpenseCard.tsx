import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ProgressBar from './ProgressBar';

type ExpenseCardProps = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  color?: string;
  percentage: number;
};

export default function ExpenseCard({
  icon,
  title,
  color = '#60A5FA',
  percentage,
}: ExpenseCardProps) {
  const { width: screenWidth } = useWindowDimensions();
  const barWidth = screenWidth * 0.65; // Adjust to match the new image proportions

  return (
    <View style={styles.container}>
      {/* Icon */}
      <View style={[styles.iconContainer, { backgroundColor: color }]}>
        <Ionicons name={icon} size={24} color="white" />
      </View>

      {/* Expense Label and Progress Bar */}
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{title}</Text>

        {/* ProgressBar + Percentage in the same row */}
        <View style={styles.progressContainer}>
          <ProgressBar percentage={percentage} width={barWidth} />
          <Text style={styles.percentageText}>{percentage}%</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingVertical: 12,
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
    marginBottom: 5,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  percentageText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginLeft: 8,
  },
});