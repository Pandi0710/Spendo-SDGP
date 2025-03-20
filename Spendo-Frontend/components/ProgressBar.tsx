import { View, StyleSheet, useWindowDimensions } from 'react-native';

type ProgressBarProps = {
  percentage: number;
  width?: number;
  height?: number;
  label?: string;
};

export default function ProgressBar({
  percentage,
  height = 10,
}: ProgressBarProps) {
  const { width } = useWindowDimensions();
  const barWidth = (percentage / 100) * (width * 0.65); // Adjust width to fit within the card

  const getColor = () => {
    if (percentage >= 80) return '#EF4444'; // Red
    if (percentage >= 50) return '#FACC15'; // Yellow
    return '#22C55E'; // Green
  };

  return (
    <View style={styles.container}>
      <View style={[styles.track, { height }]}>
        <View style={[styles.fill, { width: barWidth, backgroundColor: getColor(), height }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingVertical: 0, // Remove extra padding
    marginBottom: 0, // Remove extra margin
    marginHorizontal: 0, // Remove extra margin
    flex: 1, // Allow the progress bar to take available space
  },
  track: {
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
    width: '100%', // Full width of the container
    height: 10,
  },
  fill: {
    height: '100%',
    borderRadius: 4,
  },
});