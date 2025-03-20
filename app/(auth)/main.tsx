import React from "react";
import { View, Image, StyleSheet, TouchableOpacity, Text } from "react-native";
import { useRouter } from "expo-router";

export default function LandingPage() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={require("../../assets/images/logo.jpeg")} style={styles.logo} />

      {/* Buttons Section */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => router.push("/(auth)/login")}>
          <Text style={styles.buttonText}>LOG IN</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.darkButton]} onPress={() => router.push("/(auth)/register")}>
          <Text style={[styles.buttonText, styles.darkButtonText]}>REGISTER</Text>
        </TouchableOpacity>
      </View>

      {/* Guest Login Option */}
      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => router.push("/(tabs)/dashboard")}>
          <Text style={styles.continueText}>Continue as guest</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Updated Styling with #90A78B (Sage Green) and Black
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e1e8df", // Soft background
    padding: 20,
  },
  logo: {
    width: 160,
    height: 160,
    marginBottom: 40,
  },
  buttonContainer: {
    width: "90%",
    alignItems: "center",
  },
  button: {
    width: "100%",
    paddingVertical: 15,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#90A78B", // Sage Green Border
    backgroundColor: "#FFFFFF",
    marginVertical: 8,
    alignItems: "center",
    elevation: 3, // Shadow effect
  },
  darkButton: {
    backgroundColor: "#000000", // Black button
    borderColor: "#000000",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#90A78B", // Sage Green text
  },
  darkButtonText: {
    color: "#FFFFFF",
  },
  registerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  registerText: {
    fontSize: 16,
    color: "#333",
  },
  continueText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#90A78B",
    textDecorationLine: "underline",
  },
});


