import { createContext, useState, useContext, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginUser, registerUser, updateUser } from "../services/Authservice";
import { useRouter } from "expo-router";
import { Alert } from "react-native";

// Define User Type
interface User {
  id: string;
  name: string;
  email: string;
  mobile: string;
  token: string;
}

// Define Context Type
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
    mobile: string
  ) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (
    id: string,
    name: string,
    email: string,
    mobile: string
  ) => Promise<void>;
}

// Create Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom Hook
export function useAuth() {
  return useContext(AuthContext);
}

// Provider Component
export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  // Login Function
  const login = async (email: string, password: string) => {
    try {
      const userData = await loginUser(email, password);
      console.log(userData);
      if (userData == null || userData == undefined) {
        Alert.alert("Error", "Invalid email or password");
        return;
      }
      await AsyncStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      router.replace("/(tabs)/dashboard"); // Navigate to dashboard
    } catch (error) {
      Alert.alert("Error", "Invalid email or password");
    }
  };

  // Register Function (Fixed)
  const register = async (
    name: string,
    email: string,
    password: string,
    mobile: string
  ) => {
    try {
      const userData = await registerUser(name, email, password, mobile); // Ensure `registerUser` accepts email, phone, password
      await AsyncStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      router.replace("/login"); // Redirect to login screen after successful registration
    } catch (error) {
      console.error("Register Error:", error);
    }
  };

  // Logout Function
  const logout = async () => {
    await AsyncStorage.removeItem("user");
    setUser(null);
    router.replace("/login");
  };
  // Update Profile Function
  const updateProfile = async (
    id: string,
    name: string,
    email: string,
    mobile: string
  ) => {
    try {
      const userData = await updateUser(id, name, email, mobile); // Ensure `updateProfileService` returns updated user data

      if (userData != null && userData != undefined) {
        setUser(userData);
        await AsyncStorage.setItem("user", JSON.stringify(userData));
      }
    } catch (error) {
      console.error("Update Profile Error:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
}
