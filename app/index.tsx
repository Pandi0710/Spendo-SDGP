import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter, useFocusEffect } from "expo-router";
import { Link } from "expo-router";
import { Redirect } from "expo-router";

export default function SplashScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  //   useEffect(() => {
  //     const checkLoginStatus = async () => {
  //       try {
  //         const user = await AsyncStorage.getItem("user");
  //         if (user) {
  //           router.replace("/(tabs)/dashboard");
  //         } else {
  //           router.navigate("/(auth)/login");
  //         }
  //       } catch (error) {
  //         console.error("Error reading AsyncStorage:", error);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };

  //     setTimeout(checkLoginStatus, 2000); // Simulate splash screen delay
  //   }, []);

  useEffect(() => {
    const moveToMainPage = async () => {
      router.replace("/(auth)/main");
    };
    setTimeout(moveToMainPage, 2000);
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Image
          source={require("../assets/images/logo.jpeg")}
          style={styles.logo}
        />

        <Text style={styles.text}>Welcome to Spendo</Text>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return null; // This will be replaced once navigation happens
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
});
