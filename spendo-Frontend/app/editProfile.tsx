import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function EditProfileScreen() {
  const router = useRouter();
  const authContext = useAuth();
  const updateUser = authContext?.updateProfile;
  const [user, setUser] = useState<{
    _id: string;
    name: string;
    email: string;
    mobile: string;
  } | null>(null);
  const [updatedUser, setUpdatedUser] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await AsyncStorage.getItem("user");
      if (userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setUpdatedUser({
          name: parsedUser.name,
          email: parsedUser.email,
          mobile: parsedUser.mobile,
        });
      }
    };
    fetchUser();
  }, []);

  // Handle Profile Update
  const handleUpdateProfile = async () => {
    if (!updatedUser.name || !updatedUser.email || !updatedUser.mobile) {
      Alert.alert("Error", "All fields are required!");
      return;
    }
    try {
      if (updateUser && user) {
        await updateUser(user._id, updatedUser.name, updatedUser.email, updatedUser.mobile);
        Alert.alert("Success", "Profile updated successfully");
        router.back();
      } else {
        Alert.alert("Error", "Update function is not available");
      }
    } catch (error: any) {
      Alert.alert("Update Failed", error.message || "Failed to update profile");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>Edit Profile</Text>
      <View style={styles.profileCard}>
        <View style={styles.avatarContainer}>
          <Ionicons name="person-circle-outline" size={80} color="white" />
        </View>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={updatedUser.name}
        onChangeText={(text) => setUpdatedUser({ ...updatedUser, name: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={updatedUser.email}
        onChangeText={(text) => setUpdatedUser({ ...updatedUser, email: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Mobile"
        value={updatedUser.mobile}
        onChangeText={(text) =>
          setUpdatedUser({ ...updatedUser, mobile: text })
        }
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleUpdateProfile}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f1fff4" },
  backButton: { marginBottom: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: {
    width: "100%",
    padding: 15,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  saveButton: {
    backgroundColor: "#7e9279",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  saveButtonText: { color: "white", fontSize: 16, fontWeight: "bold" },
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
});
