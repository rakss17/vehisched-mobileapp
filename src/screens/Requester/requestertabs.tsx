import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Viewport,
  FontSizes,
  Colors,
} from "../../styles/globalstyles/globalstyles";
import { faHome, faClipboardList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import Requester from "./requester";
import Request from "./request";
import { useRoute, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../interfaces/interfaces";

const Tab = createBottomTabNavigator();

type RequesterTabsScreenRouteProp = RouteProp<
  RootStackParamList,
  "RequesterTabs"
>;

export function RequesterTabs() {
  const route = useRoute<RequesterTabsScreenRouteProp>();
  const notifLength = route.params?.notifLength;
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primaryColor1,
        tabBarInactiveTintColor: Colors.secondaryColor4,
        tabBarStyle: {
          height: Viewport.height * 0.08,
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
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Requester}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon icon={faHome} color={color} size={20} />
          ),
          tabBarBadge: notifLength > 0 ? notifLength : undefined,
        }}
      />
      <Tab.Screen
        name="Request"
        component={Request}
        options={{
          tabBarLabel: "Your request",
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon icon={faClipboardList} color={color} size={20} />
          ),
          tabBarBadge: notifLength > 0 ? notifLength : undefined,
        }}
      />
    </Tab.Navigator>
  );
}
