import axios from "axios";
import { Platform } from "react-native";
import * as AuthSession from "expo-auth-session";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebaseconfig";
import AsyncStorage from "@react-native-async-storage/async-storage";


const API_URL =
  Platform.OS === "android"
    ? "http://10.0.2.2:3000/api/auth"
    : "http://localhost:3000/api/auth";

// Login API Call
export const loginUser = async (email: string, password: string) => {
  console.log(API_URL);
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data.user;
};

// Register API Call
export const registerUser = async (
  name: string,
  email: string,
  password: string,
  mobile: string
) => {
  const response = await axios.post(`${API_URL}/register`, {
    name,
    email,
    password,
    mobile,
  });
  return response.data;
};

//update profile API call
export const updateUser = async (
  id: string,
  name: string,
  email: string,
  mobile: string
) => {
  try {
    const response = await axios.put(`${API_URL}/update`, {
      id,
      name,
      email,
      mobile,
    });

    if (response.status === 200) {
      return response.data.user; // ✅ Ensure it returns updated user data
    } else {
      throw new Error("Failed to update profile.");
    }
  } catch (error) {
    console.error("Update Profile API Error:", error);
    throw error;
  }
};




