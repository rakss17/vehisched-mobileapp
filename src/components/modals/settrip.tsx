import React from "react";
import { View, Modal } from "react-native";
import {
  Viewport,
  Styles,
  Colors,
} from "../../styles/globalstyles/globalstyles";
import { ModalProps } from "../../interfaces/interfaces";
import CustomCalendarPicker from "../datepicker/datepicker";

const SetTripModal: React.FC<ModalProps> = ({
  animationType,
  transparent,
  visible,
}) => {
  const handleDateSelected = (selectedDate: Date) => {
    console.log("Selected date:", selectedDate);
    // You can do whatever you want with the selected date here
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
            <CustomCalendarPicker onDateSelected={handleDateSelected} />
          </View>
        </View>
      </>
    </Modal>
  );
};

export default SetTripModal;
