import React, { useState } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { InputFieldProps } from "../../interfaces/interfaces";
import { Viewport } from "../../styles/globalstyles/globalstyles";

export default function InputField3({
  value,
  onChangeText,
  style,
  secureTextEntry = false,
}: InputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  return (
    <View
      style={{ display: "flex", flexDirection: "row", position: "relative" }}
    >
      <TextInput
        value={value}
        secureTextEntry={secureTextEntry && !showPassword}
        placeholder="type here..."
        autoCapitalize="none"
        style={style}
        onChangeText={onChangeText}
      />
      {secureTextEntry && (
        <TouchableOpacity
          onPress={togglePasswordVisibility}
          style={{
            position: "absolute",
            left: Viewport.width * 0.435,
            top: Viewport.height * 0.013,
          }}
        >
          <FontAwesomeIcon
            icon={showPassword ? faEyeSlash : faEye}
            size={18}
            color="black"
          />
        </TouchableOpacity>
      )}
    </View>
  );
}
