import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { ButtonStyle } from "../../styles/components/buttons/button";
import { ButtonProps } from "../../interfaces/interfaces";

const Button: React.FC<ButtonProps> = ({
  text,
  defaultBG,
  onPress,
  transparentBG,
  transparentText,
}) => {
  return (
    <TouchableOpacity
      style={[
        ButtonStyle.button,
        defaultBG && ButtonStyle.buttonBG,
        transparentBG && ButtonStyle.buttonBG2,
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          ButtonStyle.text,
          ,
          transparentText && ButtonStyle.transparentText,
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};
export default Button;
