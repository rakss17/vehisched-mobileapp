import React from "react";
import { View, Modal, Text, ActivityIndicator } from "react-native";
import {
  Styles,
  Viewport,
  Colors,
  FontSizes,
} from "../../styles/globalstyles/globalstyles";
import { ModalProps } from "../../interfaces/interfaces";

const Loading: React.FC<ModalProps> = ({
  animationType,
  transparent,
  visible,
  content,
  onRequestClose,
  showContent,
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
              width: Viewport.width * 0.5,
              height: Viewport.height * 0.2,
              gap: 10,
              borderRadius: 10,
            },
            Styles.flexColumn,
          ]}
        >
          <ActivityIndicator
            size={FontSizes.extraLarge}
            color={Colors.primaryColor1}
          />
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
        </View>
      </View>
    </Modal>
  );
};

export default Loading;
