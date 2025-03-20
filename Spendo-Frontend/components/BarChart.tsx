import { View, StyleSheet, useWindowDimensions } from 'react-native';

type BarChartProps = {
  data: number[];
  color?: string;
  height?: number;
  barWidth?: number;
  barGap?: number;
  maxValue?: number;
};

export default function BarChart({
  data,
  color = '#3B82F6',
  height = 200, 
  barWidth,
  barGap,
  maxValue
}: BarChartProps) {
  const { width } = useWindowDimensions(); 

  // Calculate the maximum value from the data if not provided
  const calculatedMaxValue = maxValue || Math.max(...data);

  const totalBars = data.length;
  const maxBarWidth = 40; 
  // Use provided barWidth or calculate dynamically
  const dynamicBarWidth = barWidth || Math.min(width / (totalBars * 2), maxBarWidth);
  // Use provided barGap or calculate dynamically
  const calculatedBarGap = barGap || dynamicBarWidth * 0.8; // Increased gap for better spacing

  // Calculate total width of bars and gaps to ensure proper centering
  const totalContentWidth = totalBars * dynamicBarWidth + (totalBars - 1) * calculatedBarGap;
  const containerWidth = Math.max(totalContentWidth, width * 0.9);

  return (
    <View style={[styles.container, { height, width: containerWidth }]}>
      {data.map((value, index) => {
        const barHeight = (value / calculatedMaxValue) * height;
        return (
          <View
            key={index}
            style={[
              styles.bar,
              {
                height: barHeight,
                width: dynamicBarWidth,
                marginHorizontal: calculatedBarGap / 2,
                backgroundColor: color
              }
            ]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  bar: {
    borderRadius: 4,
  }
});