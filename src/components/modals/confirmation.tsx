import React from "react";
import { View, Modal, Text } from "react-native";
import {
  Styles,
  Viewport,
  Colors,
  FontSizes,
} from "../../styles/globalstyles/globalstyles";
import { ModalProps } from "../../interfaces/interfaces";
import Button from "../buttons/button";

const Confirmation: React.FC<ModalProps> = ({
  animationType,
  transparent,
  visible,
  header,
  content,
  footer,
  onRequestClose,
  adjustedSize,
  showHeader,
  showContent,
  showFooter,
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
            adjustedSize && {
              backgroundColor: Colors.primaryColor2,
              width: Viewport.width * 0.9,
              height: Viewport.height * 0.25,
              gap: 30,
              borderRadius: 10,
              padding: 0,
            },
          ]}
        >
          {showHeader && (
            <Text
              style={{
                fontSize: FontSizes.normal,
                color: Colors.primaryColor1,
                fontWeight: "bold",
              }}
            >
              {header}
            </Text>
          )}
          {showContent && (
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
          )}
          {showFooter && (
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
          )}
          <Button onPress={onRequestClose} text="Close" defaultBG />
        </View>
      </View>
    </Modal>
  );
};

export default Confirmation;
