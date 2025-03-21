import React, { useState } from "react";
import { 
  View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Platform, Image 
} from "react-native";
import axios from "axios";

const PaymentScreen = ({ navigation }) => {  
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = Platform.OS === "web" 
    ? "http://localhost:5000/api/emergency-fund/pay-boarding-fees" 
    : "http://10.0.2.2:5000/api/emergency-fund/pay-boarding-fees";

  const handlePayment = async () => {
    const sanitizedAmount = amount.trim();

    if (!sanitizedAmount || isNaN(sanitizedAmount) || parseFloat(sanitizedAmount) <= 0) {
      Alert.alert("Invalid Input", "Please enter a valid amount.");
      return;
    }

    setLoading(true);
    try {
      await axios.post(API_URL, {
        userId: "12345", 
        amount: parseFloat(sanitizedAmount),
      });

      const allocatedAmount = (sanitizedAmount * 0.1).toFixed(2);
      navigation.navigate("Confirmation", { allocatedAmount });

      setAmount(""); 
    } catch (error) {
      console.error("Payment Error:", error);
      Alert.alert("Payment Failed", error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Boarding Fee Payment</Text>

      <Image source={{ uri: "https://cdn-icons-png.flaticon.com/512/456/456212.png" }} style={styles.icon} />

      <Text style={styles.label}>Enter Amount</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      <TouchableOpacity style={styles.button} onPress={handlePayment} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? "Processing..." : "Pay Now"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EDF7E1", 
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#285A34",
    marginBottom: 20,
  },
  icon: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#285A34",
    marginBottom: 5,
  },
  input: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 25,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#A3C18F",
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#4C9A2A",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    width: "90%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default PaymentScreen;






