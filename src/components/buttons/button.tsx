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
  transparentBGAdjust,
  transparentTextAdjust,
  isHighlightedAdjust,
  height,
  width,
}) => {
  return (
    <TouchableOpacity
      style={[
        ButtonStyle.button,
        defaultBG && ButtonStyle.buttonBG,
        transparentBG && ButtonStyle.buttonBG2,
        transparentBG2 && ButtonStyle.transparentBG2,
        transparentBGAdjust && ButtonStyle.transparentBGAdjust,
        isHighlighted && ButtonStyle.borderBottom,
        isHighlightedAdjust && ButtonStyle.borderBottomAdjust,
        disabled && ButtonStyle.disabledButton,
        style,
        largeSize && ButtonStyle.largeSize,
        { height, width },
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text
        style={[
          ButtonStyle.text,
          transparentText && ButtonStyle.transparentText,
          transparentText2 && ButtonStyle.transparentText2,
          transparentTextAdjust && ButtonStyle.transparentTextAdjust,
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};
export default Button;
