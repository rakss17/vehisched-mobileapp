import React from "react";
import { View, Modal, Text, StyleSheet, TextInput } from "react-native";
import { useState } from "react";
import {
  BackgroundColor,
  Styles,
  FontSizes,
  Colors,
  Viewport,
} from "../../styles/globalstyles/globalstyles";
import Button from "../../components/buttons/button";

interface SignupProps {
  onCloseSignup: () => void;
}

export default function Signup({ onCloseSignup }: SignupProps) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [region, setRegion] = useState("");
  const [idNo, setIdNo] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = () => {
    if (!region || !idNo || !firstName || !lastName || !email || !phoneNumber) {
      setErrorMessage("Please complete the form");
    } else {
      setErrorMessage(null);
      onCloseSignup();
    }
  };

  return (
    <Modal transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={{ fontSize: FontSizes.normal }}>Create Account</Text>
          {errorMessage && <Text style={{ color: "red" }}>{errorMessage}</Text>}
          <View style={styles.field}>
            <View style={styles.inputs}>
              <Text>Region of Residence:</Text>
              <TextInput
                style={styles.inputSelect}
                onChangeText={setRegion}
                value={region}
              />
            </View>
            <View style={styles.inputs}>
              <Text>ID Number:</Text>
              <TextInput
                style={styles.inputSelect}
                keyboardType="numeric"
                onChangeText={setIdNo}
                value={idNo}
              />
            </View>
            <View style={styles.inputs}>
              <Text>First Name:</Text>
              <TextInput
                style={styles.inputSelect}
                onChangeText={setFirstName}
                value={firstName}
              />
            </View>
            <View style={styles.inputs}>
              <Text>Last Name:</Text>
              <TextInput
                style={styles.inputSelect}
                onChangeText={setLastName}
                value={lastName}
              />
            </View>
            <View style={styles.inputs}>
              <Text>Email:</Text>
              <TextInput
                style={styles.inputSelect}
                onChangeText={setEmail}
                value={email}
              />
            </View>
            <View style={styles.inputs}>
              <Text>Phone Number:</Text>
              <TextInput
                style={styles.inputSelect}
                keyboardType="numeric"
                onChangeText={setPhoneNumber}
                value={phoneNumber}
              />
            </View>
          </View>
          <BackgroundColor
            style={{
              width: Viewport.width * 0.3,
              height: Viewport.height * 0.06,
              borderRadius: 10,
              alignSelf: "center",
            }}
          >
            <Button onPress={handleSubmit} text="Submit"></Button>
          </BackgroundColor>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust the opacity as needed
  },
  modalContent: {
    backgroundColor: "#d9d9d9",
    padding: 20,
    borderRadius: 10,
    width: 340,
    alignItems: "center",
  },
  field: {
    display: "flex",
    marginBottom: 20,
    marginTop: 15,
  },
  inputs: {
    flexDirection: "row",
    height: "auto",
    alignItems: "center",
    width: "100%",
    marginVertical: 8,
  },
  inputSelect: {
    width: "55%",
    left: "auto",
    marginLeft: "auto",
    padding: 2,
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
});
