import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { ButtonStyle } from "../../styles/components/buttons/button";

interface ButtonProps {
  defaultBG?: boolean;
  text: string;
  onPress?: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, defaultBG, onPress }) => {
  return (
    <TouchableOpacity
      style={[ButtonStyle.button, defaultBG && ButtonStyle.buttonBG]}
      onPress={onPress}
    >
      <Text style={ButtonStyle.text}>{text}</Text>
    </TouchableOpacity>
  );
};
export default Button;
