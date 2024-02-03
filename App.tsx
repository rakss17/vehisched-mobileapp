import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import Landing from "./src/screens/Landing/landing";
import { RequesterTabs } from "./src/screens/Requester/requestertabs";
import { DriverTabs } from "./src/screens/Driver/drivertabs";
import { GateGuardTabs } from "./src/screens/GateGuard/gateguardtabs";
import LoadingScreen from "./src/components/loadingscreen/loadingscreen";
import { Props } from "./src/components/loadingscreen/loadingscreen";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./src/redux/store";
import Profile from "./src/screens/Profile/profile";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <StatusBar style="light" />
          <Stack.Navigator
            initialRouteName="Landing"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Landing" component={Landing} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Requester" component={RequesterTabs} />
            <Stack.Screen name="Driver" component={DriverTabs} />
            <Stack.Screen name="GateGuard" component={GateGuardTabs} />
            <Stack.Screen name="LoadingScreen">
              {(props) => <LoadingScreen {...(props as Props)} />}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
