import { View, StyleSheet, Text } from 'react-native';

type ProgressBarProps = {
  percentage: number;
  width?: number; 
  height?: number;
  label?: string; 
};

export default function ProgressBar({
  percentage,
  width = 700,  
  height = 10,  
  label = '',   
}: ProgressBarProps) {
  const barWidth = (percentage / 100) * width;  

  
  const getColor = () => {
    if (percentage >= 80) return '#EF4444';  
    if (percentage >= 50) return '#FACC15';  
    return '#22C55E';  
  };
  
  return (
    <View style={styles.container}>
      {}
      <Text style={styles.labelText}>{label}</Text>

      {}
      <View style={[styles.track, { width, height }]}>
        <View style={[styles.fill, { width: barWidth, backgroundColor: getColor(), height }]} />
      </View>

      {}
      <Text style={[styles.percentageText, { color: getColor() }]}>{percentage}%</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'space-between', 
    paddingVertical: 9, 
    marginBottom: 16, 
  },
  labelText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1F2937', 
    marginRight: 80,
  },
  track: {
    backgroundColor: '#E5E7EB',
    borderRadius: 4,  
    overflow: 'hidden', 
    flex: 1, 
    marginRight: 30, 
  },
  fill: {
    height: '100%',  
    borderRadius: 4,  
  },
  percentageText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937', 
    marginRight: 30,
  },
});