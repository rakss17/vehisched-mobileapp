import React, { useState } from "react";
import { Modal, View, Text, ScrollView } from "react-native";
import Checkbox from "expo-checkbox";
import {
  Styles,
  Viewport,
  FontSizes,
  Colors,
} from "../../styles/globalstyles/globalstyles";
import InputField2 from "../inputfield/inputfield2";
import { RequestFormDataProps, ModalProps } from "../../interfaces/interfaces";
import Button from "../buttons/button";
import Dropdown from "../dropdown/dropdown";
import AutoCompleteAddress from "../autocompleteaddress/autocompleteaddress";
import DatePicker from "../datepicker/datepicker";
import TimePicker from "../timepicker/timepicker";
import UploadButton from "../buttons/upload";
import DownloadButton from "../buttons/download";
import Confirmation from "./confirmation";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  format12to24HourFormat,
  formatDate,
  formatTime,
} from "../function/function";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { postRequestFromAPI } from "../api/api";

const RequestForm: React.FC<ModalProps> = ({
  visible,
  transparent,
  animationType,
  onRequestClose,
  selectedVehicle,
  tripData,
  addressData,
  setVehicles,
  setTripData,
  setAddressData,
  setSelectedTravelCategory,
  setSelectedTravelType,
  setIsRequestSubmissionLoading,
}) => {
  const [numberOfPassengers, setNumberOfPassengers] = useState(0);
  const [passengerData, setPassengerData] = useState(
    Array(numberOfPassengers).fill("")
  );

  const [isFirstFormShow, setIsFirstFormShow] = useState(true);
  const [isSecondFormShow, setIsSecondFormShow] = useState(false);
  const [isThirdFormShow, setIsThirdFormShow] = useState(false);
  const [showTextNote, setShowTextNote] = useState(false);
  const [isTextErrorShow, setIsTextErrorShow] = useState(false);
  const [isConfirmationShow, setIsConfirmationShow] = useState(false);
  const [exceedsCapacity, setExceedsCapacity] = useState(false);
  const personalInfo = useSelector(
    (state: RootState) => state.personalInfo.data
  );
  const firstName = personalInfo?.first_name;
  const lastName = personalInfo?.last_name;
  const middleName = personalInfo?.middle_name;
  const userID = personalInfo?.id;
  const office = personalInfo?.office;
  const role = personalInfo?.role;

  const convertTravel12to24HourConverted = format12to24HourFormat(
    tripData.travel_time
  );
  const convertReturn12to24HourConverted = format12to24HourFormat(
    tripData.return_time
  );

  const [requestFormData, setRequestFormData] = useState<any>({
    requester_name: "",
    office: "",
    number_of_passenger: null,
    passenger_name: [],
    destination: "",
    distance: "",
    travel_date: "",
    travel_time: "",
    return_date: "",
    return_time: "",
    purpose: "",
    vehicle: "",
    type: "",
    role: "",
  });

  const isCurrentStepValid = () => {
    if (isFirstFormShow) {
      if (
        !requestFormData.purpose ||
        !requestFormData.number_of_passenger ||
        !passengerData.every((passenger) => passenger.trim() !== "")
      ) {
        setIsTextErrorShow(true);
        return false;
      }
    }

    return true;
  };

  const handleButtonPress = (form: string) => {
    if (
      form !== "Close" &&
      form !== "First" &&
      form !== "SecondBack" &&
      !isCurrentStepValid()
    ) {
      return;
    }
    setRequestFormData((prevData: any) => ({
      ...prevData,
      requester_name: userID,
      office: office,
      vehicle: selectedVehicle?.plate_number,
      travel_date: tripData.travel_date,
      return_date: tripData.return_date,
      travel_time: convertTravel12to24HourConverted,
      return_time: convertReturn12to24HourConverted,
      type: tripData.category,
      destination: addressData.destination,
      distance: addressData.distance,
      role: role,
    }));
    switch (form) {
      case "Close":
        setIsTextErrorShow(false);
        onRequestClose();
        break;
      case "First":
        setIsFirstFormShow(true);
        setIsSecondFormShow(false);
        break;
      case "Second":
        setIsFirstFormShow(false);
        setIsSecondFormShow(true);
        setIsThirdFormShow(false);
        break;
      case "SecondBack":
        setIsFirstFormShow(false);
        setIsSecondFormShow(true);
        setIsThirdFormShow(false);
        break;
      case "Submit":
        setIsRequestSubmissionLoading(true);
        postRequestFromAPI(
          requestFormData,
          setIsConfirmationShow,
          setRequestFormData,
          setVehicles,
          setTripData,
          setAddressData,
          setSelectedTravelCategory,
          setSelectedTravelType,
          setIsRequestSubmissionLoading
        );
        setShowTextNote(false);
        setNumberOfPassengers(0);
        setPassengerData([]);
        setIsFirstFormShow(true);
        onRequestClose();
        setIsSecondFormShow(false);

        console.log(requestFormData);

        break;
      default:
        break;
    }
    setIsTextErrorShow(false);
  };

  const updatePassengerData = (index: number, value: string) => {
    const updatedPassengerData = [...passengerData];
    updatedPassengerData[index] = value;
    setPassengerData(updatedPassengerData);

    setRequestFormData((prevData: any) => ({
      ...prevData,
      passenger_name: updatedPassengerData,
    }));
  };

  const handleNumberOfPassengersChange = (text: string) => {
    const parsedNumber = parseInt(text, 10);
    if (
      !isNaN(parsedNumber) &&
      parsedNumber >= 0 &&
      selectedVehicle &&
      parsedNumber <= selectedVehicle.capacity
    ) {
      setNumberOfPassengers(parsedNumber);
      setPassengerData(Array(parsedNumber).fill(""));
      setRequestFormData((prevData: any) => ({
        ...prevData,
        number_of_passenger: parsedNumber,
      }));
      setExceedsCapacity(false);
    } else {
      setNumberOfPassengers(0);
      setPassengerData([]);
      setRequestFormData((prevData: any) => ({
        ...prevData,
        number_of_passenger: 0,
      }));
      setExceedsCapacity(true);
    }
  };

  const handleRequestClose = () => {
    setIsConfirmationShow(false);
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
              height: Viewport.height * 1,
              width: Viewport.width * 1,
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
                height: Viewport.height * 0.7,
                paddingBottom: Viewport.height * 0.03,
                borderRadius: 10,
                gap: 5,
              },
              Styles.flexColumn,
            ]}
          >
            {isFirstFormShow && (
              <>
                <View
                  style={{
                    height: Viewport.height * 0.6,
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
                      Purpose and passenger
                    </Text>
                  </View>
                  {isTextErrorShow && (
                    <Text
                      style={{ color: "#F30F0F", fontSize: FontSizes.small }}
                    >
                      Please fill-out the fields
                    </Text>
                  )}
                  <View style={{ marginTop: 0 }}>
                    <InputField2
                      value={requestFormData.purpose}
                      adjustedWidth
                      onChangeText={(text) =>
                        setRequestFormData({
                          ...requestFormData,
                          purpose: text,
                        })
                      }
                      placeholderText="Type purpose here...."
                      capitalizeWords={false}
                    />
                  </View>

                  <Text
                    style={{
                      fontSize: FontSizes.small,

                      fontWeight: "bold",
                    }}
                  >
                    Maximum vehicle capacity: {selectedVehicle?.capacity}
                  </Text>
                  <InputField2
                    value={
                      requestFormData
                        ? requestFormData.number_of_passenger
                        : null
                    }
                    keyboardType="numeric"
                    onChangeText={handleNumberOfPassengersChange}
                    placeholderText="No. of passenger(s)"
                  />
                  {exceedsCapacity && (
                    <Text style={{ color: "red" }}>
                      Exceeds seating capacity of the vehicle
                    </Text>
                  )}
                  <KeyboardAwareScrollView
                    keyboardShouldPersistTaps="handled"
                    scrollEnabled={true}
                    enableAutomaticScroll={true}
                    enableOnAndroid={true}
                  >
                    {passengerData.map((passenger, index) => (
                      <View style={{ marginVertical: 15 }} key={index}>
                        <InputField2
                          value={passenger}
                          onChangeText={(text) =>
                            updatePassengerData(index, text)
                          }
                          placeholderText={`Type passenger ${
                            index + 1
                          } here...`}
                          capitalizeWords={true}
                        />
                      </View>
                    ))}
                  </KeyboardAwareScrollView>

                  <View style={[{ gap: 60, marginTop: 0 }, Styles.flexRow]}>
                    <Button
                      onPress={() => handleButtonPress("Close")}
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
              </>
            )}
            {isSecondFormShow && (
              <>
                <ScrollView>
                  <Text
                    style={{
                      fontSize: FontSizes.normal,
                      marginTop: Viewport.height * 0.02,
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    Request Form
                  </Text>
                  {/* {isTextErrorShow && (
                <Text
                  style={{ color: "#F30F0F", fontSize: FontSizes.small }}
                >
                  Please fill-out the fields!
                </Text>
              )} */}
                  <View
                    style={[
                      {
                        width: Viewport.width * 0.75,
                        marginTop: Viewport.height * 0.01,
                      },
                      Styles.flexRow,
                    ]}
                  >
                    <Text style={{ fontSize: FontSizes.small }}>
                      <Text style={{ fontWeight: "bold" }}>
                        Requester's name:{" "}
                      </Text>
                      {lastName}, {firstName} {middleName}
                    </Text>
                  </View>
                  <View
                    style={[
                      {
                        width: Viewport.width * 0.75,
                        marginTop: Viewport.height * 0.01,
                      },
                      Styles.flexRow,
                    ]}
                  >
                    <Text style={{ fontSize: FontSizes.small }}>
                      <Text style={{ fontWeight: "bold" }}>Office: {""}</Text>
                      {office}
                    </Text>
                  </View>

                  <View
                    style={[
                      {
                        width: Viewport.width * 0.75,
                        marginTop: Viewport.height * 0.01,
                      },
                      Styles.flexRow,
                    ]}
                  >
                    <Text style={{ fontSize: FontSizes.small }}>
                      <Text style={{ fontWeight: "bold" }}>
                        Number of passenger{"("}s{")"}: {""}
                      </Text>
                      {requestFormData.number_of_passenger}
                    </Text>
                  </View>
                  <View
                    style={[
                      {
                        width: Viewport.width * 0.75,
                        marginTop: Viewport.height * 0.01,
                      },
                      Styles.flexRow,
                    ]}
                  >
                    <Text style={{ fontSize: FontSizes.small }}>
                      <Text style={{ fontWeight: "bold" }}>
                        Passenger{"("}s{")"}: {""}
                      </Text>
                      {requestFormData.passenger_name.length > 1
                        ? requestFormData.passenger_name.join(", ")
                        : requestFormData.passenger_name[0]}
                    </Text>
                  </View>
                  <View
                    style={[
                      {
                        width: Viewport.width * 0.75,
                        marginTop: Viewport.height * 0.01,
                      },
                      Styles.flexRow,
                    ]}
                  >
                    <Text style={{ fontSize: FontSizes.small }}>
                      <Text style={{ fontWeight: "bold" }}>
                        Travel date: {""}
                      </Text>
                      {formatDate(tripData.travel_date)}
                    </Text>
                  </View>
                  <View
                    style={[
                      {
                        width: Viewport.width * 0.75,
                        marginTop: Viewport.height * 0.01,
                      },
                      Styles.flexRow,
                    ]}
                  >
                    <Text style={{ fontSize: FontSizes.small }}>
                      <Text style={{ fontWeight: "bold" }}>
                        Travel time: {""}
                      </Text>
                      {formatTime(tripData.travel_time)}
                    </Text>
                  </View>
                  <View
                    style={[
                      {
                        width: Viewport.width * 0.75,
                        marginTop: Viewport.height * 0.01,
                      },
                      Styles.flexRow,
                    ]}
                  >
                    <Text style={{ fontSize: FontSizes.small }}>
                      <Text style={{ fontWeight: "bold" }}>
                        Return date: {""}
                      </Text>
                      {formatDate(tripData.return_date)}
                    </Text>
                  </View>
                  <View
                    style={[
                      {
                        width: Viewport.width * 0.75,
                        marginTop: Viewport.height * 0.01,
                      },
                      Styles.flexRow,
                    ]}
                  >
                    <Text style={{ fontSize: FontSizes.small }}>
                      <Text style={{ fontWeight: "bold" }}>
                        Return time: {""}
                      </Text>
                      {formatTime(tripData.return_time)}
                    </Text>
                  </View>
                  <View
                    style={[
                      {
                        width: Viewport.width * 0.75,
                        marginTop: Viewport.height * 0.01,
                      },
                      Styles.flexRow,
                    ]}
                  >
                    <Text style={{ fontSize: FontSizes.small }}>
                      <Text style={{ fontWeight: "bold" }}>Vehicle: {""}</Text>
                      {selectedVehicle?.plate_number} {selectedVehicle?.model}
                    </Text>
                  </View>
                  <View
                    style={[
                      {
                        width: Viewport.width * 0.75,
                        marginTop: Viewport.height * 0.01,
                      },
                      Styles.flexRow,
                    ]}
                  >
                    <Text style={{ fontSize: FontSizes.small }}>
                      <Text style={{ fontWeight: "bold" }}>
                        Destination: {""}
                      </Text>
                      {addressData.destination}
                    </Text>
                  </View>
                  <View
                    style={[
                      {
                        width: Viewport.width * 0.75,
                        marginTop: Viewport.height * 0.01,
                      },
                      Styles.flexRow,
                    ]}
                  >
                    <Text style={{ fontSize: FontSizes.small }}>
                      <Text style={{ fontWeight: "bold" }}>Distance: {""}</Text>
                      {addressData.distance} km
                    </Text>
                  </View>
                  <View
                    style={[
                      {
                        width: Viewport.width * 0.75,
                        marginTop: Viewport.height * 0.01,
                      },
                      Styles.flexRow,
                    ]}
                  >
                    <Text style={{ fontSize: FontSizes.small }}>
                      <Text style={{ fontWeight: "bold" }}>
                        Travel type: {""}
                      </Text>
                      {tripData.category}
                    </Text>
                  </View>
                  <View
                    style={[
                      {
                        width: Viewport.width * 0.75,
                        marginTop: Viewport.height * 0.01,
                      },
                      Styles.flexRow,
                    ]}
                  >
                    <Text style={{ fontSize: FontSizes.small }}>
                      <Text style={{ fontWeight: "bold" }}>Purpose: {""}</Text>
                      {requestFormData.purpose}
                    </Text>
                  </View>
                </ScrollView>
                <View style={[{ gap: 60, marginTop: 20 }, Styles.flexRow]}>
                  <Button
                    onPress={() => handleButtonPress("First")}
                    transparentBG
                    transparentText
                    text="Back"
                  />
                  <Button
                    onPress={() => handleButtonPress("Submit")}
                    defaultBG
                    text="Submit"
                  />
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
      <Confirmation
        visible={isConfirmationShow}
        animationType="fade"
        transparent={true}
        header="Request Submitted!"
        content="We will send you a notification about your request ASAP."
        footer="Thank you!"
        onRequestClose={handleRequestClose}
        showContent
        showHeader
        showFooter
      />
    </>
  );
};

export default RequestForm;
