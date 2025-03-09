import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import PaymentScreen from "./PaymentScreen";  
import ConfirmationScreen from "./ConfirmationScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
        <Stack.Screen name="ConfirmationScreen" component={ConfirmationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
