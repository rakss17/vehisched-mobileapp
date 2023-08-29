import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Viewport,
  FontSizes,
  Colors,
} from "../../styles/globalstyles/globalstyles";
import { faHome, faClipboard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import GateGuard from "./gateguard";
import RecentLogs from "./recentlogs";

const Tab = createBottomTabNavigator();

export function GateGuardTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primaryColor1,
        tabBarInactiveTintColor: Colors.secondaryColor4,
        tabBarStyle: {
          height: Viewport.height * 0.1,
          borderTopWidth: 5,
        },
        tabBarLabelStyle: {
          fontSize: FontSizes.small,
          fontWeight: "bold",
          marginBottom: 10,
        },
        tabBarIconStyle: {
          marginBottom: -10,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={GateGuard}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon icon={faHome} color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="Recent logs"
        component={RecentLogs}
        options={{
          tabBarLabel: "Recent logs",
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon icon={faClipboard} color={color} size={25} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
