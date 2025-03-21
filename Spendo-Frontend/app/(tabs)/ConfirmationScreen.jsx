import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const ConfirmationScreen = ({ route, navigation }) => {
  const amount = route?.params?.amount || 0;
  const emergencyFund = (amount * 0.1).toFixed(2);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment Confirmation</Text>
      <View style={styles.box}>
        <Text style={styles.label}>Boarding Fee Paid:</Text>
        <Text style={styles.value}>${amount}</Text>

        <Text style={styles.label}>Allocated to Emergency Fund (10%):</Text>
        <Text style={styles.value}>${emergencyFund}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("PaymentScreen")}>
        <Text style={styles.buttonText}>Back to Payment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F8E5", 
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#2D6A4F", 
  },
  box: {
    width: "90%",
    backgroundColor: "#D9EDBF", 
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    alignItems: "center",
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 10,
    color: "#2D6A4F", 
  },
  value: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1B4332", 
    marginTop: 5,
  },
  button: {
    marginTop: 30,
    backgroundColor: "#74C69D", 
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ConfirmationScreen;

