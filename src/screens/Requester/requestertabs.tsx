import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Viewport,
  FontSizes,
  Colors,
} from "../../styles/globalstyles/globalstyles";
import { faCar, faClipboardList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import Requester from "./requester";
import Request from "./request";

const Tab = createBottomTabNavigator();

export function RequesterTabs() {
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
        name="Vehicles"
        component={Requester}
        options={{
          tabBarLabel: "Vehicles",
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon icon={faCar} color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="Request"
        component={Request}
        options={{
          tabBarLabel: "Your request",
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon icon={faClipboardList} color={color} size={25} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
