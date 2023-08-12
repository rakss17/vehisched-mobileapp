import React, { useState } from "react";
import { Modal, View, Text } from "react-native";
import { ModalProps } from "../../interfaces/interfaces";
import {
  Styles,
  Viewport,
  FontSizes,
  Colors,
} from "../../styles/globalstyles/globalstyles";
import InputField2 from "../inputfield/inputfield2";
import { RequestFormDataProps } from "../../interfaces/interfaces";
import Button from "../buttons/button";
import Dropdown from "../dropdown/dropdown";
const RequestForm: React.FC<ModalProps> = ({
  visible,
  transparent,
  animationType,
  onRequestClose,
}) => {
  const [requestFormData, setRequestFormatData] =
    useState<RequestFormDataProps>({
      requester_name: "",
      office_dept: "",
    });
  const [selectedOffice, setSelectedOffice] = useState("Select office/dept");
  const handleOfficeChange = (selectedOption: string) => {
    setSelectedOffice(selectedOption);
    setRequestFormatData((prevData) => ({
      ...prevData,
      office_dept: selectedOption, // Set selected office in office_dept
    }));
  };
  const handleTest = () => {
    console.log(requestFormData);
  };
  return (
    <>
      <Modal
        visible={visible}
        transparent={transparent}
        animationType={animationType}
        onRequestClose={onRequestClose}
      >
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
                width: Viewport.width * 0.9,
                height: Viewport.height * 0.65,
                gap: 20,
                borderRadius: 10,
              },
              Styles.flexColumn,
            ]}
          >
            <InputField2
              onChangeText={(text) =>
                setRequestFormatData({
                  ...requestFormData,
                  requester_name: text,
                })
              }
              placeholderText="Requester's name"
            />
            <Dropdown
              showBG
              menuAdjusted
              showText
              text={selectedOffice}
              onCategoryChange={handleOfficeChange}
              options={["CITC", "COT", "CEA", "CSM", "CSTE", "SHS"]}
            />
            <Button onPress={handleTest} defaultBG text="Next" />
          </View>
        </View>
      </Modal>
    </>
  );
};

export default RequestForm;
