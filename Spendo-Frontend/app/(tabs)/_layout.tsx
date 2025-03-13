import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet } from 'react-native';

function CustomTabBarIcon({ name, color, size, focused }: { name: keyof typeof Ionicons.glyphMap, color: string, size: number, focused: boolean }) {
  return (
    <View style={[styles.iconContainer, focused ? styles.activeIconContainer : null]}>
      <Ionicons name={name} size={size} color={color} />
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#f5f5f5',
          borderTopWidth: 0,
          elevation: 0,
          height: 80
          ,
          paddingBottom: 5,
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#6B7280',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Biggest-Expenses',
          tabBarIcon: ({ size, color, focused }) => (
            <CustomTabBarIcon name="cash-outline" size={size} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: 'Statistics',
          tabBarIcon: ({ size, color, focused }) => (
            <CustomTabBarIcon name="stats-chart-outline" size={size} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          title: 'Transactions',
          tabBarIcon: ({ size, color, focused }) => (
            <CustomTabBarIcon name="swap-horizontal-outline" size={size} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Account',
          tabBarIcon: ({ size, color, focused }) => (
            <CustomTabBarIcon name="person-outline" size={size} color={color} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    padding: 8,
    borderRadius: 8,
  },
  activeIconContainer: {
    backgroundColor: '#E5E7EB',
  },
});