import React, { useState, useMemo } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import {
  Colors,
  Viewport,
  FontSizes,
} from "../../styles/globalstyles/globalstyles";
import { EllipsisMenuProps } from "../../interfaces/interfaces";

const EllipsisMenu: React.FC<EllipsisMenuProps> = ({ options, handler }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const isCancelOption = options.includes("Cancel request");
  const isDeleteOption = options.includes("Delete request");

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleMenuOptionClick = (option: any) => {
    setModalVisible(false);
    handler(option);
  };
  const modalContainer2Height = useMemo(() => {
    const menuItemHeight = 70;
    const totalOptions = options.length;
    return totalOptions * menuItemHeight;
  }, [options]);

  return (
    <View style={styles.ellipsisContainer}>
      <TouchableOpacity onPress={toggleModal} style={styles.iconContainer}>
        <FontAwesomeIcon icon={faEllipsisV} size={20} color="black" />
      </TouchableOpacity>
      <Modal visible={isModalVisible} transparent animationType="slide">
        <TouchableWithoutFeedback onPress={toggleModal}>
          <View style={styles.modalContainer}>
            <View
              style={[
                styles.modalContainer2,
                { height: modalContainer2Height },
              ]}
            >
              {options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleMenuOptionClick(option)}
                  style={styles.menuItem}
                >
                  <Text
                    style={[
                      styles.contenttext,
                      isCancelOption &&
                        option === "Cancel request" &&
                        styles.selectedOptionText,
                      isDeleteOption &&
                        option === "Delete request" &&
                        styles.selectedOptionText,
                    ]}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  ellipsisContainer: {
    flex: 0.15,
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer2: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primaryColor2,
    width: Viewport.width * 1,
    height: Viewport.height * 0.1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  menuItem: {
    paddingVertical: 15,
    width: Viewport.width * 1,
    alignItems: "center",
  },
  contenttext: {
    fontSize: FontSizes.normal,
  },
  selectedOptionText: {
    color: "red",
  },
});

export default EllipsisMenu;
