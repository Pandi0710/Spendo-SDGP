import { View, StyleSheet } from 'react-native';

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
  height = 40,
  barWidth = 4,
  barGap = 2,
  maxValue = 100
}: BarChartProps) {
  return (
    <View style={[styles.container, { height }]}>
      {data.map((value, index) => {
        const barHeight = (value / maxValue) * height;
        return (
          <View
            key={index}
            style={[
              styles.bar,
              {
                height: barHeight,
                width: barWidth,
                marginHorizontal: barGap / 2,
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
    borderRadius: 2,
  }
});