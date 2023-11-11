import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { ButtonStyle } from "../../styles/components/buttons/button";
import { ButtonProps } from "../../interfaces/interfaces";

const Button: React.FC<ButtonProps> = ({
  text,
  defaultBG,
  onPress,
  disabled,
  transparentBG,
  transparentText,
  transparentBG2,
  transparentText2,
  isHighlighted,
  style,
  largeSize,
}) => {
  return (
    <TouchableOpacity
      style={[
        ButtonStyle.button,
        defaultBG && ButtonStyle.buttonBG,
        transparentBG && ButtonStyle.buttonBG2,
        transparentBG2 && ButtonStyle.transparentBG2,
        isHighlighted && ButtonStyle.borderBottom,
        disabled && ButtonStyle.disabledButton,
        style,
        largeSize && ButtonStyle.largeSize,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text
        style={[
          ButtonStyle.text,
          transparentText && ButtonStyle.transparentText,
          transparentText2 && ButtonStyle.transparentText2,
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};
export default Button;
