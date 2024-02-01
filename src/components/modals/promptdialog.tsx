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

const PromptDialog: React.FC<ModalProps> = ({
  animationType,
  transparent,
  visible,
  header,
  content,
  footer,
  onRequestClose,
  onNextPressed,
  adjustedSize,
  showHeader,
  showContent,
  showFooter,
  style,
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
              height: Viewport.height * 0.45,
              gap: 20,
              borderRadius: 10,
              padding: 15,
            },
            Styles.flexColumn,
            adjustedSize && {
              backgroundColor: Colors.primaryColor2,
              width: Viewport.width * 0.9,
              height: Viewport.height * 0.25,
              gap: 20,
              borderRadius: 10,
              padding: 20,
            },
            style,
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

          <View style={[{ gap: 35 }, Styles.flexRow]}>
            <Button
              text="Cancel"
              transparentBG
              transparentText
              onPress={onRequestClose}
            />
            <Button text="Yes" defaultBG onPress={onNextPressed} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default PromptDialog;
