import { View, StyleSheet, Text } from 'react-native';

type ProgressBarProps = {
  value: number;
  color?: string;
  height?: number;
  maxValue?: number;
  showPercentage?: boolean;
  showNaN?: boolean;
};

export default function ProgressBar({
  value,
  color = '#3B82F6',
  height = 520,
  maxValue = 100,
  showPercentage = true,
  showNaN = true
}: ProgressBarProps) {
  const percentage = Math.min((value / maxValue) * 100, 100);
  const barHeight = (percentage / 100) * height;

  return (
    <View style={styles.container}>
      <View style={[styles.progressContainer, { height }]}>
        <View style={[styles.track, { height }]}>
          <View
            style={[
              styles.fill,
              {
                height: barHeight,
                backgroundColor: color
              }
            ]}
          />
        </View>
      </View>
      {showPercentage && (
        <Text style={[styles.percentageText, { color }]}>
          {Math.round(percentage)}%
        </Text>
      )}
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: 60,
  },
  progressContainer: {
    width: '100%',
    justifyContent: 'flex-end',
  },
  track: {
    width: 40,
    backgroundColor: '#e5e7eb',
    borderRadius: 20,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  fill: {
    width: '100%',
    borderRadius: 20,
    position: 'absolute',
    bottom: 0,
  },
  percentageText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
  },
 
});