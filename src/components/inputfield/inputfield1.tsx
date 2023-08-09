import React, { useState } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { InputField1Styles } from "../../styles/components/inputfield1/inputfield1";

interface InputFieldProps {
  value: string;
  placeholder: string;
  secureTextEntry?: boolean;
  icon: any;
  onChangeText?: (text: string) => void;
}

export default function InputField1({
  value,
  placeholder,
  secureTextEntry = false,
  icon,
  onChangeText,
}: InputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <View style={InputField1Styles.container}>
      <FontAwesomeIcon icon={icon} style={InputField1Styles.icon1} />
      <TextInput
        value={value}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry && !showPassword}
        style={[
          InputField1Styles.input,
          secureTextEntry && InputField1Styles.inputWithIcon,
        ]}
        onChangeText={onChangeText}
      />
      {secureTextEntry && (
        <TouchableOpacity
          onPress={togglePasswordVisibility}
          style={InputField1Styles.icon2}
        >
          <FontAwesomeIcon
            icon={showPassword ? faEyeSlash : faEye}
            size={20}
            color="black"
          />
        </TouchableOpacity>
      )}
    </View>
  );
}
