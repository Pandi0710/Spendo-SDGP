import { Stack } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { AuthProvider } from '../context/AuthContext'; // Import AuthProvider

export default function RootLayout() {
  return (
    <AuthProvider>
      <View style={styles.container}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="+not-found" />
          <Stack.Screen name="(tabs)" />
          
        </Stack>
      </View>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#90a78b', 
  },
});
