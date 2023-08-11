import React from "react";
import { View, Modal } from "react-native";
import {
  Viewport,
  Styles,
  Colors,
} from "../../styles/globalstyles/globalstyles";
import { ModalProps } from "../../interfaces/interfaces";
import DatePicker from "../datepicker/datepicker";

const SetTripModal: React.FC<ModalProps> = ({
  animationType,
  transparent,
  visible,
}) => {
  const handleDateSelected = (selectedDate: Date) => {
    alert(
      selectedDate.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    );
  };
  return (
    <Modal
      animationType={animationType}
      transparent={transparent}
      visible={visible}
    >
      <>
        <View
          style={[
            {
              flex: 1,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 1,
            },
            Styles.flexColumn,
          ]}
        >
          <View
            style={[
              {
                backgroundColor: Colors.primaryColor2,
                width: Viewport.width * 1,
                height: Viewport.height * 0.6,
                elevation: 10,
              },
              Styles.flexColumn,
            ]}
          >
            <DatePicker onDateSelected={handleDateSelected} />
          </View>
        </View>
      </>
    </Modal>
  );
};

export default SetTripModal;
