import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { View, StyleSheet } from "react-native";

function CustomTabBarIcon({
  name,
  color,
  size,
  focused,
}: {
  name: keyof typeof Ionicons.glyphMap;
  color: string;
  size: number;
  focused: boolean;
}) {
  return (
    <View
      style={[
        styles.iconContainer,
        focused ? styles.activeIconContainer : null,
      ]}
    >
      <Ionicons name={name} size={size} color={color} />
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="dashboard"
        
        options={{
          title: "Dashboard",
          headerShown: false,
          tabBarIcon: ({ size, color, focused }) => (
            <CustomTabBarIcon
              name="cash-outline"
              size={size}
              color={color}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Account",
          headerShown: false,
          tabBarIcon: ({ size, color, focused }) => (
            <CustomTabBarIcon
              name="person-outline"
              size={size}
              color={color}
              focused={focused}
            />
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
    backgroundColor: "#E5E7EB",
  },
});
