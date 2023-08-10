import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  Styles,
  Colors,
  Viewport,
} from "../../styles/globalstyles/globalstyles";

interface BottomNavbarProps {
  items: {
    icon: any;
    label: string;
    onPress: () => void;
  }[];
}

export const BottomNavbar: React.FC<BottomNavbarProps> = ({ items }) => {
  return (
    <View
      style={[
        {
          elevation: 5,
          backgroundColor: Colors.secondaryColor1,
          width: Viewport.width * 1,
          height: Viewport.height * 0.1,
        },
        Styles.flexRow,
      ]}
    >
      {items.map((item, index) => (
        <TouchableOpacity key={index} onPress={item.onPress}>
          <FontAwesomeIcon icon={item.icon} />
          <Text style={{ color: Colors.secondaryColor2 }}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
