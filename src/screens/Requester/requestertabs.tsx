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
import { Animated } from "react-native";

const Tab = createBottomTabNavigator();

type RequesterTabsScreenRouteProp = RouteProp<
  RootStackParamList,
  "RequesterTabs"
>;

export function RequesterTabs() {
  const route = useRoute<RequesterTabsScreenRouteProp>();
  const notifLength = route.params?.notifLength;
  const [isScrolled, setIsScrolled] = React.useState(false);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primaryColor1,
        tabBarInactiveTintColor: Colors.secondaryColor4,
        tabBarStyle: {
          display: isScrolled ? "none" : "flex",
          height: isScrolled ? 0 : Viewport.height * 0.08,
          borderTopWidth: isScrolled ? 0 : 5,
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
        children={(props) => (
          <Requester {...props} setIsScrolled={setIsScrolled} />
        )}
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
        children={(props) => (
          <Request {...props} setIsScrolled={setIsScrolled} />
        )}
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
