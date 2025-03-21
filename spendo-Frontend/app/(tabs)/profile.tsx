import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

type MenuItemProps = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  onPress: () => void;
};

function MenuItem({ icon, title, onPress }: MenuItemProps) {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuIconContainer}>
        <Ionicons name={icon} size={24} color="white" />
      </View>
      <Text style={styles.menuTitle}>{title}</Text>
      <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
    </TouchableOpacity>
  );
}

export default function ProfileScreen() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null
  );

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await AsyncStorage.getItem("user");
      if (userData) {
        setUser(JSON.parse(userData));
      }
    };
    fetchUser();
  }, [user]);

  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await AsyncStorage.removeItem("user");
          router.replace("/(auth)/login");
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <Ionicons name="settings-outline" size={24} color="#1F2937" />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* User Profile */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <Ionicons name="person-circle-outline" size={80} color="white" />
          </View>
          <Text style={styles.profileName}>{user?.name || "User Name"}</Text>
          <Text style={styles.profileEmail}>
            {user?.email || "user@example.com"}
          </Text>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          <Text style={styles.menuSectionTitle}>Settings</Text>

          <MenuItem
            icon="person-outline"
            title="Edit Profile"
            onPress={() => router.push("/editProfile")}
          />
          <MenuItem
            icon="settings-outline"
            title="App Settings"
            onPress={() => Alert.alert("App Settings")}
          />
          <MenuItem
            icon="help-circle-outline"
            title="Help & Support"
            onPress={() => Alert.alert("Help & Support")}
          />

          {/* Logout Button */}
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={24} color="white" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e1e8df",
  },
  header: {
    flexDirection: "row",
    textAlign: "center",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#e1e8df",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1F2937",
  },
  profileCard: {
    margin: 16,
    padding: 20,
    backgroundColor: "#f1fff4",
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#7e9279",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 20,
  },
  menuContainer: {
    margin: 16,
    backgroundColor: "#f1fff4",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  menuSectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 12,
    paddingLeft: 8,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#7e9279",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  menuTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
    color: "#000", // Black text
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#7e9279",
    padding: 12,
    borderRadius: 8,
    justifyContent: "center",
    marginTop: 20,
  },
  logoutText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
    marginLeft: 8,
  },
});
