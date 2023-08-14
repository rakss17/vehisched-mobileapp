import React, { useState, useRef } from "react";
import { View, TextInput, StyleSheet, Text, Animated } from "react-native";
import {
  Viewport,
  Colors,
  FontSizes,
} from "../../styles/globalstyles/globalstyles";
import { InputField2Props } from "../../interfaces/interfaces";

const InputField2: React.FC<InputField2Props> = ({
  placeholderText,
  onChangeText,
  keyboardType,
  adjustedWidth,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const labelPosition = useRef(new Animated.Value(inputValue ? 1 : 0)).current;

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(labelPosition, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (!inputValue) {
      Animated.timing(labelPosition, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  };
  const handleTextChange = (text: string) => {
    setInputValue(text);
    if (onChangeText) {
      onChangeText(text);
    }
  };

  const labelTranslateY = labelPosition.interpolate({
    inputRange: [0, 1],
    outputRange: [15, -25],
  });

  const labelFontSize = labelPosition.interpolate({
    inputRange: [0, 1],
    outputRange: [FontSizes.small, FontSizes.small],
  });

  const labelColor = labelPosition.interpolate({
    inputRange: [0, 1],
    outputRange: ["#888", "black"],
  });

  return (
    <View style={styles.inputContainer}>
      <TextInput
        keyboardType={keyboardType}
        style={[styles.input, adjustedWidth && styles.input2]}
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={inputValue}
        onChangeText={handleTextChange}
      />
      <View style={styles.labelContainer}>
        <Animated.Text
          style={[
            styles.label,
            {
              transform: [{ translateY: labelTranslateY }],
              fontSize: labelFontSize,
              color: labelColor,
            },
          ]}
        >
          {placeholderText}
        </Animated.Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    position: "relative",
    marginVertical: 0,

    height: Viewport.height * 0.07,
  },
  input: {
    width: Viewport.width * 0.6,
    height: Viewport.height * 0.07,
    padding: 10,
    fontSize: FontSizes.normal,
    borderBottomWidth: 1,
    borderColor: Colors.secondaryColor2,
    borderRadius: 0,
    zIndex: 1,
  },
  input2: {
    width: Viewport.width * 0.7,
    height: Viewport.height * 0.07,
    padding: 10,
    fontSize: FontSizes.normal,
    borderBottomWidth: 1,
    borderColor: Colors.secondaryColor2,
    borderRadius: 0,
    zIndex: 1,
  },
  labelContainer: {
    position: "absolute",
    top: 10,
    left: 0,

    backgroundColor: "transparent",
    paddingHorizontal: 5,
  },
  label: {
    fontSize: FontSizes.small,
  },
});

export default InputField2;
