import React from "react";
import { View, Modal, Text, TouchableOpacity } from "react-native";
import {
  Styles,
  Viewport,
  Colors,
  FontSizes,
} from "../../styles/globalstyles/globalstyles";
import { ConfirmationProps } from "../../interfaces/interfaces";
import Button from "../buttons/button";

const Confirmation: React.FC<ConfirmationProps> = ({
  animationType,
  transparent,
  visible,
  header,
  content,
  footer,
  onRequestClose,
}) => {
  return (
    <Modal
      animationType={animationType}
      transparent={transparent}
      visible={visible}
      onRequestClose={onRequestClose}
    >
      <View
        style={[
          {
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          Styles.flexColumn,
        ]}
      >
        <View
          style={[
            {
              backgroundColor: Colors.primaryColor2,
              width: Viewport.width * 0.9,
              height: Viewport.height * 0.35,
              gap: 20,
              borderRadius: 10,
            },
            Styles.flexColumn,
          ]}
        >
          <Text
            style={{
              fontSize: FontSizes.normal,
              color: Colors.primaryColor1,
              fontWeight: "bold",
            }}
          >
            {header}
          </Text>
          <Text
            style={{
              fontSize: FontSizes.normal,
              color: Colors.primaryColor1,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {content}
          </Text>
          <Text
            style={{
              fontSize: FontSizes.normal,
              color: Colors.primaryColor1,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {footer}
          </Text>
          <Button onPress={onRequestClose} text="Close" defaultBG />
        </View>
      </View>
    </Modal>
  );
};

export default Confirmation;
