import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function DashboardScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
        
          <TouchableOpacity onPress={() => router.push("/notification")}>
            <Ionicons name="notifications-outline" size={28} color="black" />
          </TouchableOpacity>
        </View>

        {/* Welcome Message */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>Hi, Welcome Back</Text>
          <Text style={styles.subText}>Good Morning</Text>
        </View>

        {/* Balance & Expense Section */}
        <View style={styles.balanceContainer}>
          <View style={styles.balanceBox}>
            <Ionicons name="wallet-outline" size={18} color="black" />
            <Text style={styles.balanceLabel}>Total Balance</Text>
            <Text style={styles.balanceAmount}>$7,783.00</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.expenseBox}>
            <Ionicons name="card-outline" size={18} color="black" />
            <Text style={styles.expenseLabel}>Total Expense</Text>
            <Text style={styles.expenseAmount}>-$1,187.40</Text>
          </View>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBarBackground}>
            <View style={[styles.progressBarFill, { width: "30%" }]} />
          </View>
          <Text style={styles.progressText}>
            30% Of Your Expenses, Looks Good.
          </Text>
        </View>

        {/* Savings & Revenue Section */}
        <View style={styles.savingsContainer}>
          <View style={styles.savingsBox}>
            <Ionicons name="car-outline" size={24} color="black" />
            <Text style={styles.savingsLabel}>Savings On Goals</Text>
          </View>
          <View style={styles.savingsDivider} />
          <View style={styles.savingsData}>
            <Text style={styles.revenueLabel}>Revenue Last Week</Text>
            <Text style={styles.revenueAmount}>$4,000.00</Text>
            <Text style={styles.foodLabel}>Food Last Week</Text>
            <Text style={styles.foodAmount}>-$100.00</Text>
          </View>
        </View>

        {/* Bottom Tab (Daily, Weekly, Monthly) */}
        <View style={styles.tabContainer}>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.tabText}>Daily</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.tabText}>Weekly</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tab, styles.activeTab]}>
            <Text style={[styles.tabText, styles.activeTabText]}>Monthly</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#e1e8df", padding: 16 },
  header: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
  },
  welcomeSection: { marginVertical: 20 },
  welcomeText: { fontSize: 24, fontWeight: "bold", color: "#1F2937" },
  subText: { fontSize: 16, color: "#6B7280" },
  balanceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#f1fff4",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  balanceBox: { alignItems: "center", flex: 1 },
  expenseBox: { alignItems: "center", flex: 1 },
  divider: { width: 1, height: "100%", backgroundColor: "#E5E7EB" },
  balanceLabel: { fontSize: 14, color: "#6B7280" },
  expenseLabel: { fontSize: 14, color: "#6B7280" },
  balanceAmount: { fontSize: 20, fontWeight: "bold", color: "black" },
  expenseAmount: { fontSize: 20, fontWeight: "bold", color: "#F59E0B" },
  progressContainer: { marginVertical: 20 },
  progressBarBackground: {
    width: "100%",
    height: 8,
    backgroundColor: "#E5E7EB",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBarFill: { height: "100%", backgroundColor: "#90a78b" },
  progressText: { fontSize: 14, color: "#6B7280", marginTop: 5 },
  savingsContainer: {
    flexDirection: "row",
    backgroundColor: "#d3dfc8",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  savingsBox: { flex: 1, alignItems: "center" },
  savingsLabel: { fontSize: 14, color: "black", marginTop: 5 },
  savingsDivider: { width: 1, height: "100%", backgroundColor: "#E5E7EB" },
  savingsData: { flex: 1, paddingLeft: 16 },
  revenueLabel: { fontSize: 14, color: "#1F2937" },
  revenueAmount: { fontSize: 18, fontWeight: "bold", color: "black" },
  foodLabel: { fontSize: 14, color: "#1F2937", marginTop: 10 },
  foodAmount: { fontSize: 18, fontWeight: "bold", color: "#F59E0B" },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  tab: { flex: 1, padding: 12, alignItems: "center", borderRadius: 8 },
  tabText: { fontSize: 16, color: "black" },
  activeTab: { backgroundColor: "#7e9279" },
  activeTabText: { color: "white" },
});
