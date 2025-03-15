import { View, StyleSheet, Text } from 'react-native';

type ProgressBarProps = {
  percentage: number;
  height?: number;
};

export default function ProgressBar({
  percentage,
  height = 100, 
}: ProgressBarProps) {
  const barHeight = (percentage / 100) * height;

  // Dynamically set color based on percentage
  const getColor = () => {
    if (percentage >= 80) return '#EF4444';  
    if (percentage >= 50) return '#FACC15'; 
    return '#22C55E';  
  };
  
  return (
    <View style={[styles.container, { height }]}>
      {/* Background Track */}
      <View style={styles.track}>
        {/* Filled Progress */}
        <View style={[styles.fill, { height: barHeight, backgroundColor: getColor() }]} />
      </View>
      
      {/* Percentage Label */}
      <Text style={[styles.percentageText, { color: getColor() }]}>{percentage}%</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 2,
    marginBottom:10,
    flexDirection:'row',
    justifyContent: 'space-between',
  },
  track: {
    width: 24,  
    height: '100%',
    backgroundColor: '#E5E7EB',
    borderRadius: 12,
    overflow: 'hidden',
    flexDirection:'column-reverse',
    justifyContent: 'center',
  },
  fill: {
    width: '100%',
    borderRadius: 12,
    position: 'absolute',
    bottom: 0,
  },
  percentageText: {
    marginTop: 4,
    marginLeft: 20,
    fontSize: 14,
    fontWeight: '600',
  },
});
