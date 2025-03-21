import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../../context/AuthContext";
import { Ionicons } from "@expo/vector-icons"; // Import for eye icon

export default function RegisterScreen() {
  const router = useRouter();
  const authContext = useAuth();
  if (!authContext) {
    Alert.alert("Error", "Auth context is not available. Please restart the app.");
    return null;
  }
  const registerUser = authContext.register;

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // Added state for error messages

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email); // Basic email validation
  };

  const validatePassword = (password: string) => {
    return password.length >= 6; // Ensures password is at least 6 characters
  };

  const validatePasswordStrength = (password: string) => {
    return /[A-Z]/.test(password) && /[0-9]/.test(password); // Checks for at least one uppercase letter and one number
  };

  const handleRegister = async () => {
    if (!email || !phone || !password || !confirmPassword) {
      setErrorMessage("Please fill in all fields");
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage("Please enter a valid email address");
      return;
    }

    if (!validatePassword(password)) {
      setErrorMessage("Password must be at least 6 characters");
      return;
    }

    if (!validatePasswordStrength(password)) {
      setErrorMessage("Password must contain at least one uppercase letter and one number");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      if (registerUser) {
        await registerUser(name, email, password, phone);
        setErrorMessage(""); // Clear error message on successful registration
      } else {
        setErrorMessage("Register function is not available");
      }
    } catch (error: any) {
      setErrorMessage(error.message || "Failed to register");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.title}>Create Account</Text>

        {/* Name Input */}
        <TextInput
          style={styles.input}
          placeholder="Please enter your name"
          value={name}
          onChangeText={setName}
          keyboardType="default"
          autoCapitalize="none"
        />

        {/* Email Input */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/* Phone Input */}
        <TextInput
          style={styles.input}
          placeholder="Phone"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />

        {/* Password Input with Eye Icon */}
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!passwordVisible}
          />
          <TouchableOpacity
            onPress={() => setPasswordVisible(!passwordVisible)}
          >
            <Ionicons
              name={passwordVisible ? "eye-off" : "eye"}
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        </View>

        {/* Confirm Password Input with Eye Icon */}
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!confirmPasswordVisible}
          />
          <TouchableOpacity
            onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
          >
            <Ionicons
              name={confirmPasswordVisible ? "eye-off" : "eye"}
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        </View>

        {/* Error Message */}
        {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}

        {/* Terms and Conditions */}
        <Text style={styles.termsText}>
          By signing up, you agree to Spendo's{" "}
          <Text style={styles.link}>Terms of Service</Text> and{" "}
          <Text style={styles.link}>Privacy Policy</Text>.
        </Text>

        {/* Register Button */}
        <TouchableOpacity
          style={[styles.button, loading && styles.disabledButton]}
          onPress={handleRegister}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "REGISTERING..." : "REGISTER"}
          </Text>
        </TouchableOpacity>

        {/* Login Option */}
        <View style={styles.loginContainer}>
          <Text>Already have an account? </Text>
          <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

// Updated Styles
const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    padding: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 80,
    marginBottom: 30,
    alignSelf: "flex-start",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#F5F5F5",
  },
  passwordContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 15,
    backgroundColor: "#F5F5F5",
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
  },
  errorMessage: {
    color: "red",
    marginVertical: 10,
  },
  termsText: {
    marginVertical: 20,
    textAlign: "center",
  },
  link: {
    color: "#007BFF",
    fontWeight: "bold",
  },
  button: {
    width: "100%",
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 15,
  },
  disabledButton: {
    backgroundColor: "#666",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  loginContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  loginText: {
    color: "#007BFF",
    fontWeight: "bold",
  },
});
