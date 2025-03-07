import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

export default function App() {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState("");
  const [newTarget, setNewTarget] = useState("");
  const [amountToAdd, setAmountToAdd] = useState({});
  const [completedGoals, setCompletedGoals] = useState(0);

  const addGoal = () => {
    if (newGoal && newTarget) {
      setGoals([
        ...goals,
        {
          id: Date.now(),
          name: newGoal,
          progress: 0,
          target: Number(newTarget),
          completed: false,
          icon: getGoalIcon(newGoal),
        },
      ]);
      setNewGoal("");
      setNewTarget("");
    }
  };

  const addMoney = (id) => {
    const amount = Number(amountToAdd[id]) || 0;
    setGoals((prevGoals) =>
      prevGoals.map((goal) => {
        if (goal.id === id) {
          const newProgress = Math.min(goal.progress + amount, goal.target);
          const isCompleted = newProgress >= goal.target && !goal.completed;

          if (isCompleted) {
            setCompletedGoals((prev) => prev + 1);
          }

          return { ...goal, progress: newProgress, completed: isCompleted };
        }
        return goal;
      })
    );
    setAmountToAdd({ ...amountToAdd, [id]: "" });
  };

  const getBadge = () => {
    if (completedGoals >= 100) return "🏆 Champion";
    if (completedGoals >= 10) return "🎖️ Achiever";
    if (completedGoals >= 1) return "🏅 Beginner";
    return "🔰 No Badge";
  };

  const getGoalIcon = (goal) => {
    if (goal.toLowerCase().includes("save")) return "piggy-bank";
    if (goal.toLowerCase().includes("invest")) return "chart-line";
    if (goal.toLowerCase().includes("exercise")) return "running";
    if (goal.toLowerCase().includes("study")) return "book";
    return "star";
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎯 Goal Tracker</Text>

      <View style={styles.badgeContainer}>
        <Text style={styles.badgeText}>Completed Goals: {completedGoals}</Text>
        <Text style={styles.badgeText}>Badge: {getBadge()}</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter goal"
          value={newGoal}
          onChangeText={setNewGoal}
          placeholderTextColor="#8DA18D"
        />
        <TextInput
          style={styles.input}
          placeholder="Target amount"
          keyboardType="numeric"
          value={newTarget}
          onChangeText={setNewTarget}
          placeholderTextColor="#8DA18D"
        />
        <TouchableOpacity style={styles.addButton} onPress={addGoal}>
          <FontAwesome5 name="plus-circle" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={[...goals].sort((a, b) => Number(a.completed) - Number(b.completed))}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={[styles.card, item.completed && styles.completedCard]}>
            <View style={styles.goalHeader}>
              <FontAwesome5 name={item.icon} size={20} color="#4A90E2" style={styles.goalIcon} />
              <Text style={styles.goalText}>{item.name}</Text>
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${(item.progress / item.target) * 100}%` }]} />
            </View>
            <Text style={styles.progressText}>{item.progress} / {item.target}</Text>

            {!item.completed && (
              <View style={styles.addMoneyContainer}>
                <TextInput
                  style={styles.moneyInput}
                  placeholder="Amount"
                  keyboardType="numeric"
                  value={amountToAdd[item.id] || ""}
                  onChangeText={(value) => setAmountToAdd({ ...amountToAdd, [item.id]: value })}
                  placeholderTextColor="#8DA18D"
                />
                <TouchableOpacity style={styles.moneyButton} onPress={() => addMoney(item.id)}>
                  <Text style={styles.moneyButtonText}>Add</Text>
                </TouchableOpacity>
              </View>
            )}

            <Text style={styles.goalMessage}>{item.completed ? "🎉 Goal Completed!" : "Keep pushing towards success! 💪"}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, backgroundColor: "#ECF4E7" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 15, textAlign: "center", color: "#285430" },

  badgeContainer: { backgroundColor: "#A6CF98", padding: 15, borderRadius: 10, marginBottom: 15 },
  badgeText: { fontSize: 16, fontWeight: "bold", textAlign: "center", color: "#285430" },

  inputContainer: { flexDirection: "row", alignItems: "center", marginBottom: 15, gap: 10 },
  input: { borderWidth: 1, borderColor: "#A6CF98", padding: 10, flex: 1, borderRadius: 15, backgroundColor: "#D6E8C8", color: "#285430" },
  addButton: { backgroundColor: "#4A90E2", padding: 10, borderRadius: 15, justifyContent: "center", alignItems: "center" },

  card: { padding: 15, backgroundColor: "#A6CF98", marginBottom: 10, borderRadius: 15 },
  completedCard: { backgroundColor: "#4A90E2" }, 
  goalText: { fontSize: 16, fontWeight: "bold", color: "#285430" },

  progressBar: { height: 10, backgroundColor: "#D6E8C8", borderRadius: 5, overflow: "hidden", marginVertical: 5 },
  progressFill: { height: 10, backgroundColor: "#4A90E2" },

  goalMessage: { fontSize: 14, fontStyle: "italic", marginTop: 5, color: "#285430", textAlign: "center" },

  addMoneyContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    backgroundColor: "#D6E8C8",
    padding: 10,
    borderRadius: 15,
  },

  moneyInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#A6CF98",
    padding: 8,
    borderRadius: 10,
    backgroundColor: "#ffffff",
    color: "#285430",
    marginRight: 10,
    textAlign: "center",
  },

  moneyButton: {
    backgroundColor: "#4A90E2",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  moneyButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
