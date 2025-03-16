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
  maxValue = 100
}: BarChartProps) {
  const { width } = useWindowDimensions(); 

 
  const totalBars = data.length;
  const maxBarWidth = 40; 
  const dynamicBarWidth = Math.min(width / (totalBars * 2), maxBarWidth);
  const barGap = dynamicBarWidth * 0.5; 

  return (
    <View style={[styles.container, { height, width: width * 0.9 }]}>
      {data.map((value, index) => {
        const barHeight = (value / maxValue) * height;
        return (
          <View
            key={index}
            style={[
              styles.bar,
              {
                height: barHeight,
                width: dynamicBarWidth,
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
const BarGraph = ({ percentage, color }: { percentage: number; color: string }) => (
  <div className="flex items-center h-3">
    <div 
      className="h-2 rounded"
      style={{ 
        width: `${percentage}%`,
        backgroundColor: color,
        marginRight: '8px'
      }} 
    />
    <span className="text-sm font-semibold" style={{ color }}>{percentage}%</span>
  </div>
);
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
