import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Viewport,
  FontSizes,
  Colors,
} from "../../styles/globalstyles/globalstyles";
import { faHome, faClock, faCarAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import Driver from "./driver";
import Schedules from "./schedule";

const Tab = createBottomTabNavigator();

export function DriverTabs() {
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
        component={Driver}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon icon={faHome} color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="Schedule"
        component={Schedules}
        options={{
          tabBarLabel: "Schedule",
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon icon={faClock} color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="Trip"
        component={Driver}
        options={{
          tabBarLabel: "Trip",
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon icon={faCarAlt} color={color} size={25} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
