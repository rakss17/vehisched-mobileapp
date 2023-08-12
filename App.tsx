import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import Landing from "./src/screens/Landing/landing";
import { RequesterTabs } from "./src/screens/Requester/requestertabs";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Landing" component={Landing} />
        <Stack.Screen name="Requester" component={RequesterTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
