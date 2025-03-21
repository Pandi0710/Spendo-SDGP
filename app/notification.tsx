import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function NotificationScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={28} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>Notifications</Text>
      
      <View style={styles.notificationCard}>
        <Text style={styles.notificationText}>You spent $50 on food.</Text>
      </View>
      
      <View style={styles.notificationCard}>
        <Text style={styles.notificationText}>Your savings goal is 75% complete!</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#ffffff" },
  backButton: { marginBottom: 16 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  notificationCard: { padding: 12, backgroundColor: "#f1fff4", borderRadius: 8, marginBottom: 10 },
  notificationText: { fontSize: 16 },
});


