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
      destination: "",
      date: "",
      time: "",
      purpose: "",
      urgent: false,
    });
  const [numberOfPassengers, setNumberOfPassengers] = useState(0);
  const [passengerData, setPassengerData] = useState(
    Array(numberOfPassengers).fill("")
  );
  const [distanceToUSTPFormatted, setDistanceToUSTPFormatted] =
    useState<any>("");
  const [selectedOffice, setSelectedOffice] = useState("Select office/dept");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<{
    hours: number | null;
    minutes: number | null;
    period: string | null;
  }>({
    hours: null,
    minutes: null,
    period: null,
  });

  const [isFirstFormShow, setIsFirstFormShow] = useState(true);
  const [isSecondFormShow, setIsSecondFormShow] = useState(false);
  const [isThirdFormShow, setIsThirdFormShow] = useState(false);
  const [showTextNote, setShowTextNote] = useState(false);
  const [isFourthFormShow, setIsFourthFormShow] = useState(false);
  const [isFifthFormShow, setIsFifthFormShow] = useState(false);
  const [isUrgentYes, setIsUrgentYes] = useState(false);
  const [isUrgentNo, setIsUrgentNo] = useState(false);
  const [isSixthFormShow, setIsSixthFormShow] = useState(false);
  const [isSeventhFormShow, setIsSeventhFormShow] = useState(false);
  const [isTextErrorShow, setIsTextErrorShow] = useState(false);
  const [isConfirmationShow, setIsConfirmationShow] = useState(false);

  const handleDistanceCalculated = (distance: any) => {
    setDistanceToUSTPFormatted(distance);
    if (distance > 50) {
      setShowTextNote(true);
    } else if (distance < 50) {
      setShowTextNote(false);
    }
  };

  const handleAddressCalculated = (address: string) => {
    setRequestFormatData((prevData) => ({
      ...prevData,
      destination: address,
    }));
  };

  const handleOfficeChange = (selectedOption: string) => {
    setSelectedOffice(selectedOption);
    setRequestFormatData((prevData) => ({
      ...prevData,
      office_dept: selectedOption,
    }));
  };
  const isCurrentStepValid = () => {
    if (isFirstFormShow) {
      if (!requestFormData.requester_name || !requestFormData.office_dept) {
        setIsTextErrorShow(true);
        return false;
      }
    } else if (isSecondFormShow) {
      if (
        !requestFormData.number_of_passenger ||
        !passengerData.every((passenger) => passenger.trim() !== "")
      ) {
        setIsTextErrorShow(true);
        return false;
      }
    } else if (isThirdFormShow) {
      if (!requestFormData.destination) {
        setIsTextErrorShow(true);
        return false;
      }
    } else if (isFourthFormShow) {
      if (!requestFormData.time || !requestFormData.date) {
        setIsTextErrorShow(true);
        return false;
      }
    } else if (isFifthFormShow) {
      if (!requestFormData.purpose) {
        setIsTextErrorShow(true);
        return false;
      }
      if (isUrgentYes && !showTextNote) {
        setIsTextErrorShow(true);
        return false;
      }
    } else if (isSixthFormShow || isSeventhFormShow) {
      // Add any additional validation logic for these steps
    }

    return true;
  };

  const handleButtonPress = (form: string) => {
    if (
      form !== "First" &&
      form !== "SecondBack" &&
      form !== "ThirdBack" &&
      form !== "FourthBack" &&
      form !== "FifthBack" &&
      !isCurrentStepValid()
    ) {
      return;
    }

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
      case "SecondBack":
        setIsFirstFormShow(false);
        setIsSecondFormShow(true);
        setIsThirdFormShow(false);
        break;
      case "Third":
        setIsSecondFormShow(false);
        setIsThirdFormShow(true);
        setIsFourthFormShow(false);
        break;
      case "ThirdBack":
        setIsSecondFormShow(false);
        setIsThirdFormShow(true);
        setIsFourthFormShow(false);
        break;
      case "Fourth":
        setIsThirdFormShow(false);
        setIsFourthFormShow(true);
        setIsFifthFormShow(false);
        break;
      case "FourthBack":
        setIsThirdFormShow(false);
        setIsFourthFormShow(true);
        setIsFifthFormShow(false);
        break;
      case "Fifth":
        setIsFourthFormShow(false);
        setIsFifthFormShow(true);
        setIsSixthFormShow(false);
        setIsSeventhFormShow(false);
        break;
      case "FifthBack":
        setIsFourthFormShow(false);
        setIsFifthFormShow(true);
        setIsSixthFormShow(false);
        setIsSeventhFormShow(false);
        break;
      case "Sixth":
        setIsFifthFormShow(false);
        if (distanceToUSTPFormatted > 50) {
          setIsSixthFormShow(true);
          setIsSeventhFormShow(false);
        } else if (distanceToUSTPFormatted < 50) {
          setIsSixthFormShow(false);
          setIsSeventhFormShow(true);
        }
        break;
      case "SeventhBack":
        if (distanceToUSTPFormatted < 50) {
          setIsFifthFormShow(true);
          setIsSeventhFormShow(false);
        } else if (distanceToUSTPFormatted > 50) {
          setIsSixthFormShow(true);
          setIsSeventhFormShow(false);
        }
        break;
      case "Seventh":
        setIsSixthFormShow(false);
        setIsSeventhFormShow(true);
        break;
      case "Submit":
        setRequestFormatData({
          requester_name: "",
          office_dept: "",
          number_of_passenger: 0,
          passenger_name: [],
          destination: "",
          date: "",
          time: "",
          purpose: "",
          urgent: false,
        });
        setSelectedDate(null);
        setSelectedTime({
          hours: null,
          minutes: null,
          period: null,
        });
        setShowTextNote(false);
        setDistanceToUSTPFormatted("");
        setSelectedOffice("Select office/dept");
        setNumberOfPassengers(0);
        setPassengerData([]);
        setIsSeventhFormShow(false);
        setIsFirstFormShow(true);
        onRequestClose();
        setIsConfirmationShow(true);
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

  const handleToDateSelected = (selectedDate: Date) => {
    const formattedDate = selectedDate.toLocaleDateString(undefined, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    setRequestFormatData((prevData) => ({
      ...prevData,
      date: formattedDate,
    }));
    setSelectedDate(selectedDate);
  };

  const handleTimeSelected = (
    hours: number,
    minutes: number,
    period: string
  ) => {
    const formatNumberToTwoDigits = (number: number) => {
      return number < 10 ? `0${number}` : `${number}`;
    };
    const formattedHours = formatNumberToTwoDigits(hours);
    const formattedMinutes = formatNumberToTwoDigits(minutes);

    setRequestFormatData((prevData) => ({
      ...prevData,
      time: `${formattedHours}:${formattedMinutes} ${period}`,
    }));
    setSelectedTime({
      hours,
      minutes,
      period,
    });
  };

  const [selectedFileName, setSelectedFileName] = useState<string>("");

  const handleFileSelected = (fileName: string) => {
    setSelectedFileName(fileName);
  };

  const downloadUrl =
    "https://docs.google.com/document/d/1HJ3MiD0j2Ef77Qcgmvl64JG1DKQxLHL5/edit?usp=drive_link&ouid=115657237309251643032&rtpof=true&sd=true";
  const buttonText = "Download Template";

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
                {isTextErrorShow && (
                  <Text style={{ color: "#F30F0F", fontSize: FontSizes.small }}>
                    Please fill-out the fields!
                  </Text>
                )}

                <InputField2
                  value={requestFormData.requester_name}
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
                {isTextErrorShow && (
                  <Text style={{ color: "#F30F0F", fontSize: FontSizes.small }}>
                    Please fill-out the fields!
                  </Text>
                )}
                <InputField2
                  value={requestFormData.number_of_passenger.toString()}
                  keyboardType="numeric"
                  onChangeText={handleNumberOfPassengersChange}
                  placeholderText="No. of passenger(s)"
                />
                <ScrollView>
                  {passengerData.map((passenger, index) => (
                    <View style={{ marginVertical: 15 }} key={index}>
                      <InputField2
                        value={passenger}
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
                {isTextErrorShow && (
                  <Text style={{ color: "#F30F0F", fontSize: FontSizes.small }}>
                    Please fill-out the field!
                  </Text>
                )}
                <View style={{ paddingLeft: 40 }}>
                  <AutoCompleteAddress
                    onDistanceCalculated={handleDistanceCalculated}
                    onAddressSelected={handleAddressCalculated}
                  />
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: FontSizes.small,
                      marginLeft: Viewport.width * 0.1,
                      marginTop: Viewport.height * 0.01,
                      fontWeight: "bold",
                    }}
                  >
                    Distance: {distanceToUSTPFormatted} km
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
                  {showTextNote && (
                    <Text
                      style={{
                        fontSize: FontSizes.small,
                        marginTop: Viewport.height * 0.04,
                        textAlign: "left",
                        fontWeight: "bold",
                      }}
                    >
                      Please provide the travel order document on the last part
                      of this form.
                    </Text>
                  )}
                </View>

                <View style={[{ gap: 60, marginTop: 0 }, Styles.flexRow]}>
                  <Button
                    onPress={() => handleButtonPress("SecondBack")}
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
            {isFourthFormShow && (
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
                    When is your preferred travel date and time?
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
                {isTextErrorShow && (
                  <Text style={{ color: "#F30F0F", fontSize: FontSizes.small }}>
                    Please fill-out the fields!
                  </Text>
                )}
                <DatePicker
                  button2
                  selectedDate={selectedDate}
                  onDateSelected={handleToDateSelected}
                />

                <TimePicker
                  secondBG
                  onTimeSelected={handleTimeSelected}
                  selectedHours={selectedTime.hours}
                  selectedMinutes={selectedTime.minutes}
                  selectedPeriod={selectedTime.period}
                />
                <View style={[{ gap: 60, marginTop: 0 }, Styles.flexRow]}>
                  <Button
                    onPress={() => handleButtonPress("ThirdBack")}
                    transparentBG
                    transparentText
                    text="Back"
                  />
                  <Button
                    onPress={() => handleButtonPress("Fifth")}
                    defaultBG
                    text="Next"
                  />
                </View>
              </View>
            )}
            {isFifthFormShow && (
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
                    Is it urgent? And what is your purpose?
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
                {isTextErrorShow && (
                  <Text style={{ color: "#F30F0F", fontSize: FontSizes.small }}>
                    Please fill-out the fields!
                  </Text>
                )}
                <View
                  style={[
                    {
                      gap: 10,
                      width: Viewport.width * 0.7,
                    },
                    Styles.flexRow,
                  ]}
                >
                  <Text
                    style={{
                      fontSize: FontSizes.small,
                      fontWeight: "bold",
                    }}
                  >
                    Urgent Request?
                  </Text>
                  <Checkbox
                    disabled={false}
                    value={isUrgentYes}
                    onValueChange={(newValue) => {
                      setIsUrgentYes(newValue);
                      setIsUrgentNo(!newValue);
                    }}
                  />
                  <Text
                    style={{
                      fontSize: FontSizes.small,
                      fontWeight: "bold",
                    }}
                  >
                    Yes
                  </Text>
                  <Checkbox
                    disabled={false}
                    value={isUrgentNo}
                    onValueChange={(newValue) => {
                      setIsUrgentNo(newValue);
                      setIsUrgentYes(!newValue);
                    }}
                  />
                  <Text
                    style={{
                      fontSize: FontSizes.small,
                      fontWeight: "bold",
                    }}
                  >
                    No
                  </Text>
                </View>
                {isUrgentYes && (
                  <Text
                    style={{
                      fontSize: FontSizes.small,
                      fontWeight: "bold",
                    }}
                  >
                    Please provide a brief statement explaining the urgency or
                    importance of your purpose for requesting the reservation.
                  </Text>
                )}
                <View style={{ marginTop: 20 }}>
                  <InputField2
                    value={requestFormData.purpose}
                    adjustedWidth
                    onChangeText={(text) =>
                      setRequestFormatData({
                        ...requestFormData,
                        purpose: text,
                      })
                    }
                    placeholderText="Purpose"
                  />
                </View>

                <View style={[{ gap: 60, marginTop: 0 }, Styles.flexRow]}>
                  <Button
                    onPress={() => handleButtonPress("FourthBack")}
                    transparentBG
                    transparentText
                    text="Back"
                  />
                  <Button
                    onPress={() => handleButtonPress("Sixth")}
                    defaultBG
                    text="Next"
                  />
                </View>
              </View>
            )}
            {isSixthFormShow && (
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
                    Download and Upload Travel Order Document
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

                <DownloadButton
                  downloadUrl={downloadUrl}
                  buttonText={buttonText}
                />
                <UploadButton
                  selectedFileName={selectedFileName}
                  onFileSelected={handleFileSelected}
                />
                <View style={[{ gap: 60, marginTop: 0 }, Styles.flexRow]}>
                  <Button
                    onPress={() => handleButtonPress("FifthBack")}
                    transparentBG
                    transparentText
                    text="Back"
                  />
                  <Button
                    onPress={() => handleButtonPress("Seventh")}
                    defaultBG
                    text="Next"
                  />
                </View>
              </View>
            )}
            {isSeventhFormShow && (
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
                    Please confirm your details before submitting. Thank you.
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

                <ScrollView
                  style={[
                    {
                      width: Viewport.width * 0.75,
                    },
                  ]}
                >
                  <View
                    style={[
                      {
                        width: Viewport.width * 0.75,
                      },
                      Styles.flexRow,
                    ]}
                  >
                    <Text style={{ fontSize: FontSizes.small }}>
                      <Text style={{ fontWeight: "bold" }}>
                        Requester's name:{" "}
                      </Text>
                      {requestFormData.requester_name}
                    </Text>
                  </View>
                  <View
                    style={[
                      {
                        width: Viewport.width * 0.75,
                        marginTop: 5,
                      },
                      Styles.flexRow,
                    ]}
                  >
                    <Text
                      style={{
                        fontSize: FontSizes.small,
                        fontWeight: "bold",
                      }}
                    >
                      Office/dept:
                    </Text>
                    <Text
                      style={{
                        fontSize: FontSizes.small,
                      }}
                    >
                      {" "}
                      {requestFormData.office_dept}
                    </Text>
                  </View>
                  <View
                    style={[
                      {
                        width: Viewport.width * 0.75,
                        marginTop: 5,
                      },
                      Styles.flexRow,
                    ]}
                  >
                    <Text
                      style={{
                        fontSize: FontSizes.small,
                        fontWeight: "bold",
                      }}
                    >
                      No. of Passenger{"("}s{")"}:
                    </Text>
                    <Text
                      style={{
                        fontSize: FontSizes.small,
                      }}
                    >
                      {" "}
                      {requestFormData.number_of_passenger}
                    </Text>
                  </View>
                  <View
                    style={[
                      {
                        width: Viewport.width * 0.75,
                        marginTop: 5,
                      },
                      Styles.flexRow,
                    ]}
                  >
                    <Text style={{ fontSize: FontSizes.small }}>
                      <Text style={{ fontWeight: "bold" }}>
                        Passenger's name{"("}s{")"}:{" "}
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
                      },
                      Styles.flexRow,
                    ]}
                  >
                    <Text style={{ fontSize: FontSizes.small, marginTop: 5 }}>
                      <Text style={{ fontWeight: "bold" }}>Destination: </Text>
                      {requestFormData.destination}
                    </Text>
                  </View>
                  <View
                    style={[
                      {
                        width: Viewport.width * 0.75,
                        marginTop: 5,
                      },
                      Styles.flexRow,
                    ]}
                  >
                    <Text
                      style={{
                        fontSize: FontSizes.small,
                        fontWeight: "bold",
                      }}
                    >
                      Distance:
                    </Text>
                    <Text
                      style={{
                        fontSize: FontSizes.small,
                      }}
                    >
                      {" "}
                      {distanceToUSTPFormatted}
                      {" km"}
                    </Text>
                  </View>
                  <View
                    style={[
                      {
                        width: Viewport.width * 0.75,
                        marginTop: 5,
                      },
                      Styles.flexRow,
                    ]}
                  >
                    <Text
                      style={{
                        fontSize: FontSizes.small,
                        fontWeight: "bold",
                      }}
                    >
                      Date:
                    </Text>
                    <Text
                      style={{
                        fontSize: FontSizes.small,
                      }}
                    >
                      {" "}
                      {requestFormData.date}
                    </Text>
                  </View>
                  <View
                    style={[
                      {
                        width: Viewport.width * 0.75,
                        marginTop: 5,
                      },
                      Styles.flexRow,
                    ]}
                  >
                    <Text
                      style={{
                        fontSize: FontSizes.small,
                        fontWeight: "bold",
                      }}
                    >
                      Time:
                    </Text>
                    <Text
                      style={{
                        fontSize: FontSizes.small,
                      }}
                    >
                      {" "}
                      {requestFormData.time}
                    </Text>
                  </View>
                  <View
                    style={[
                      {
                        width: Viewport.width * 0.75,
                        marginTop: 5,
                      },
                      Styles.flexRow,
                    ]}
                  >
                    <Text
                      style={{
                        fontSize: FontSizes.small,
                        fontWeight: "bold",
                      }}
                    >
                      Urgent:
                    </Text>
                    <Text
                      style={{
                        fontSize: FontSizes.small,
                      }}
                    >
                      {" "}
                      {isUrgentYes ? "Yes" : "No"}
                    </Text>
                  </View>
                  <View
                    style={[
                      {
                        width: Viewport.width * 0.75,
                        marginTop: 5,
                      },
                      Styles.flexRow,
                    ]}
                  >
                    <Text style={{ fontSize: FontSizes.small, marginTop: 5 }}>
                      <Text style={{ fontWeight: "bold" }}>Purpose: </Text>
                      {requestFormData.purpose}
                    </Text>
                  </View>
                </ScrollView>

                <View style={[{ gap: 60, marginTop: 0 }, Styles.flexRow]}>
                  <Button
                    onPress={() => handleButtonPress("SeventhBack")}
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
              </View>
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
      />
    </>
  );
};

export default RequestForm;
