import React, { useState } from "react";
import { Modal, View, Text, ScrollView } from "react-native";
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
      number_of_passenger: 0,
      passenger_name: [],
    });
  const [numberOfPassengers, setNumberOfPassengers] = useState(0);
  const [passengerData, setPassengerData] = useState(
    Array(numberOfPassengers).fill("")
  );
  const [selectedOffice, setSelectedOffice] = useState("Select office/dept");
  const [isFirstFormShow, setIsFirstFormShow] = useState(true);
  const [isSecondFormShow, setIsSecondFormShow] = useState(false);
  const [isThirdFormShow, setIsThirdFormShow] = useState(false);

  const handleOfficeChange = (selectedOption: string) => {
    setSelectedOffice(selectedOption);
    setRequestFormatData((prevData) => ({
      ...prevData,
      office_dept: selectedOption,
    }));
  };
  const handleButtonPress = (form: string) => {
    switch (form) {
      case "First":
        setIsFirstFormShow(true);
        setIsSecondFormShow(false);
        break;
      case "Second":
        setIsFirstFormShow(false);
        setIsSecondFormShow(true);
        setIsThirdFormShow(false);
        break;
      case "Third":
        setIsSecondFormShow(false);
        setIsThirdFormShow(true);
      default:
        break;
    }
  };

  const updatePassengerData = (index: number, value: string) => {
    const updatedPassengerData = [...passengerData];
    updatedPassengerData[index] = value;
    setPassengerData(updatedPassengerData);

    setRequestFormatData((prevData) => ({
      ...prevData,
      passenger_name: updatedPassengerData,
    }));
  };

  const handleNumberOfPassengersChange = (text: string) => {
    const parsedNumber = parseInt(text, 10);
    if (!isNaN(parsedNumber) && parsedNumber >= 0) {
      setNumberOfPassengers(parsedNumber);
      setPassengerData(Array(parsedNumber).fill(""));
      setRequestFormatData((prevData) => ({
        ...prevData,
        number_of_passenger: parsedNumber,
      }));
    } else {
      setNumberOfPassengers(0);
      setPassengerData([]);

      setRequestFormatData((prevData) => ({
        ...prevData,
        number_of_passenger: 0,
      }));
    }
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
            {isFirstFormShow && (
              <View
                style={{
                  height: Viewport.height * 0.5,
                  alignItems: "center",
                  gap: 20,
                }}
              >
                <View style={{}}>
                  <Text
                    style={{
                      fontSize: FontSizes.normal,

                      fontWeight: "bold",
                    }}
                  >
                    What's your name and office/dept?
                  </Text>
                  <Text
                    style={{
                      fontSize: FontSizes.small,

                      fontWeight: "bold",
                    }}
                  >
                    Selected Vehicle:{" "}
                  </Text>
                </View>
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
                <View style={[{ gap: 60, marginTop: 20 }, Styles.flexRow]}>
                  <Button
                    onPress={onRequestClose}
                    transparentBG
                    transparentText
                    text="Close"
                  />
                  <Button
                    onPress={() => handleButtonPress("Second")}
                    defaultBG
                    text="Next"
                  />
                </View>
              </View>
            )}
            {isSecondFormShow && (
              <View
                style={{
                  height: Viewport.height * 0.5,
                  width: Viewport.width * 0.8,
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <View style={{}}>
                  <Text
                    style={{
                      fontSize: FontSizes.normal,

                      fontWeight: "bold",
                    }}
                  >
                    What is the number of passengers? And who are they?
                  </Text>
                  <Text
                    style={{
                      fontSize: FontSizes.small,

                      fontWeight: "bold",
                    }}
                  >
                    Selected Vehicle:{" "}
                  </Text>
                </View>
                <InputField2
                  keyboardType="numeric"
                  onChangeText={handleNumberOfPassengersChange}
                  placeholderText="No. of passenger(s)"
                />
                <ScrollView>
                  {passengerData.map((passenger, index) => (
                    <View style={{ marginVertical: 15 }} key={index}>
                      <InputField2
                        onChangeText={(text) =>
                          updatePassengerData(index, text)
                        }
                        placeholderText={`Passenger ${index + 1}`}
                      />
                    </View>
                  ))}
                </ScrollView>

                <View style={[{ gap: 60, marginTop: 0 }, Styles.flexRow]}>
                  <Button
                    onPress={() => handleButtonPress("First")}
                    transparentBG
                    transparentText
                    text="Back"
                  />
                  <Button
                    onPress={() => handleButtonPress("Third")}
                    defaultBG
                    text="Next"
                  />
                </View>
              </View>
            )}
            {isThirdFormShow && (
              <View
                style={{
                  height: Viewport.height * 0.5,
                  width: Viewport.width * 0.8,
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <View
                  style={{
                    width: Viewport.width * 0.8,
                  }}
                >
                  <Text
                    style={{
                      fontSize: FontSizes.normal,

                      fontWeight: "bold",
                    }}
                  >
                    What is your destination?
                  </Text>
                  <Text
                    style={{
                      fontSize: FontSizes.small,

                      fontWeight: "bold",
                    }}
                  >
                    Selected Vehicle:{" "}
                  </Text>
                </View>
                <InputField2
                  keyboardType="numeric"
                  onChangeText={handleNumberOfPassengersChange}
                  placeholderText="No. of passenger(s)"
                />
                <View>
                  <Text
                    style={{
                      fontSize: FontSizes.small,
                      marginLeft: Viewport.width * 0.1,
                      marginTop: Viewport.height * 0.01,
                      fontWeight: "bold",
                    }}
                  >
                    Distance: 1500 Kilometers
                  </Text>
                  <Text
                    style={{
                      fontSize: FontSizes.small,
                      marginTop: Viewport.height * 0.04,
                      textAlign: "left",
                      fontWeight: "bold",
                    }}
                  >
                    Requesters traveling to destinations that exceed 50
                    kilometers are required to provide a travel order for the
                    vehicle's fuel and the driver's per diem.
                  </Text>
                </View>

                <View style={[{ gap: 60, marginTop: 0 }, Styles.flexRow]}>
                  <Button
                    onPress={() => handleButtonPress("Second")}
                    transparentBG
                    transparentText
                    text="Back"
                  />
                  <Button
                    onPress={() => handleButtonPress("Fourth")}
                    defaultBG
                    text="Next"
                  />
                </View>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </>
  );
};

export default RequestForm;
