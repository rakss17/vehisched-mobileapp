import React, { useState } from "react";
import { View, Modal, Text, TextInput } from "react-native";
import AutoCompleteAddressGoogle from "../autocompleteaddress/googleaddressinput";
import DatePicker from "../datepicker/datepicker";
import TimePicker from "../timepicker/timepicker";
import { format } from "date-fns";
import {
  Colors,
  FontSizes,
  Styles,
  Viewport,
} from "../../styles/globalstyles/globalstyles";
import Button from "../buttons/button";
import { InitialFormVipProps } from "../../interfaces/interfaces";

const InitialFormVip: React.FC<InitialFormVipProps> = ({
  visible,
  onRequestClose,
  animationType,
  transparent,
  setAddressData,
  setTripData,
  addressData,
  tripData,
  handleRequestFormVisible,
  selectedVehicle,
}) => {
  const [isOneWayClick, setIsOneWayClick] = useState(false);
  const [isFetchSelect, setIsFetchSelect] = useState(false);
  const [isAutocompleteDisabled, setIsAutocompleteDisabled] = useState(true);
  const [isTravelDateSelected, setIsTravelDateSelected] = useState(true);
  const [selectedTravelType, setSelectedTravelType] = useState<string | null>();
  const [errorMessages, setErrorMessages] = useState<any[]>([]);
  const [selectedTravelCategory, setSelectedTravelCategory] = useState<
    string | null
  >("Round Trip");
  const [isAutocompleteEditable, setIsAutocompleteEditable] = useState(false);
  const [selectedTime, setSelectedTime] = useState<{
    hours: number | null;
    minutes: number | null;
    period: string | null;
  }>({
    hours: null,
    minutes: null,
    period: null,
  });

  const handleKeyDown = (event: React.KeyboardEvent) => {
    const key = event.key;

    if (key !== "Backspace" && isNaN(Number(key))) {
      event.preventDefault();
    }
  };
  const checkAutocompleteDisability = () => {
    if (tripData.travel_date !== "" && tripData.travel_time !== "") {
      setIsAutocompleteEditable(true);
      setIsTravelDateSelected(false);
    }
  };

  const handleFromDateSelected = (selectedDate: Date) => {
    const formattedDate = selectedDate
      ? format(selectedDate, "yyyy-MM-dd")
      : null;
    setTripData((prevData: any) => ({
      ...prevData,
      travel_date: formattedDate,
    }));
    if (tripData.category === "Round Trip") {
      const updatedErrors = { ...errorMessages };
      delete updatedErrors[0]?.travelDateError;
      setErrorMessages(updatedErrors);
      checkAutocompleteDisability();
    } else if (
      tripData.category === "One-way" ||
      tripData.category === "One-way - Fetch" ||
      tripData.category === "One-way - Drop"
    ) {
      const updatedErrors = { ...errorMessages };
      delete updatedErrors[0]?.travelDateOnewayError;
      setErrorMessages(updatedErrors);
      checkAutocompleteDisability();
    }
  };

  const handleFromTimeSelected = (
    hours: number,
    minutes: number,
    period: string
  ) => {
    const formatNumberToTwoDigits = (number: number) => {
      return number < 10 ? `0${number}` : `${number}`;
    };
    const formattedHours = formatNumberToTwoDigits(hours);
    const formattedMinutes = formatNumberToTwoDigits(minutes);

    checkAutocompleteDisability();
    setTripData((prevData: any) => ({
      ...prevData,
      travel_time: `${formattedHours}:${formattedMinutes} ${period}`,
    }));
    if (tripData.category === "Round Trip") {
      const updatedErrors = { ...errorMessages };
      delete updatedErrors[0]?.travelTimeError;
      setErrorMessages(updatedErrors);
    } else if (
      tripData.category === "One-way" ||
      tripData.category === "One-way - Fetch" ||
      tripData.category === "One-way - Drop"
    ) {
      const updatedErrors = { ...errorMessages };
      delete updatedErrors[0]?.travelTimeOnewayError;
      setErrorMessages(updatedErrors);
    }
  };

  const handleToDateSelected = (selectedDate: Date) => {
    // const formattedDate = selectedDate.toLocaleDateString(undefined, {
    //   year: "numeric",
    //   month: "2-digit",
    //   day: "2-digit",
    // });
    const formattedDate = selectedDate
      ? format(selectedDate, "yyyy-MM-dd")
      : null;
    setTripData((prevData: any) => ({
      ...prevData,
      return_date: formattedDate,
    }));
    const updatedErrors = { ...errorMessages };
    delete updatedErrors[0]?.returnDateError;
    setErrorMessages(updatedErrors);
  };

  const handleToTimeSelected = (
    hours: number,
    minutes: number,
    period: string
  ) => {
    const formatNumberToTwoDigits = (number: number) => {
      return number < 10 ? `0${number}` : `${number}`;
    };
    const formattedHours = formatNumberToTwoDigits(hours);
    const formattedMinutes = formatNumberToTwoDigits(minutes);

    setTripData((prevData: any) => ({
      ...prevData,
      return_time: `${formattedHours}:${formattedMinutes} ${period}`,
    }));
    const updatedErrors = { ...errorMessages };
    delete updatedErrors[0]?.returnTimeError;
    setErrorMessages(updatedErrors);
  };

  const handleSetTrip = () => {
    let validationErrors: { [key: string]: string } = {};
    if (tripData.category === "Round Trip") {
      const allFieldsBlank =
        !tripData.travel_date &&
        !tripData.travel_time &&
        !tripData.return_date &&
        !tripData.return_time &&
        !addressData.destination;

      if (allFieldsBlank) {
        validationErrors.all = "Required all fields!";
      } else {
        if (!tripData.travel_date) {
          validationErrors.travelDateError = "This field is required";
        }
        if (!tripData.travel_time) {
          validationErrors.travelTimeError = "This field is required";
        }

        if (!tripData.return_date) {
          validationErrors.returnDateError = "This field is required";
        }

        if (!tripData.return_time) {
          validationErrors.returnTimeError = "This field is required";
        }
        if (!addressData.destination) {
          validationErrors.destinationError = "This field is required";
        }
      }
    } else if (
      tripData.category === "One-way" ||
      tripData.category === "One-way - Fetch" ||
      tripData.category === "One-way - Drop"
    ) {
      const allFieldsBlank =
        !tripData.travel_date &&
        !tripData.travel_time &&
        tripData.category !== "One-way - Fetch" &&
        tripData.category !== "One-way - Drop" &&
        !tripData.category &&
        !addressData.destination;

      if (allFieldsBlank) {
        validationErrors.all = "Required all fields!";
      } else {
        if (!tripData.travel_date) {
          validationErrors.travelDateOnewayError = "This field is required";
        }
        if (!tripData.travel_time) {
          validationErrors.travelTimeOnewayError = "This field is required";
        }
        if (
          tripData.category !== "One-way - Fetch" &&
          tripData.category !== "One-way - Drop"
        ) {
          validationErrors.categoryError = "Please select a travel type";
        }

        if (!addressData.destination) {
          validationErrors.destinationError = "This field is required";
        }
      }
    }

    const errorArray = [validationErrors];
    console.log(errorMessages);
    setErrorMessages(errorArray);
    if (Object.keys(validationErrors).length === 0) {
      handleRequestFormVisible(selectedVehicle);

      console.log(tripData);
      console.log(addressData);
      console.log("pressed");
    }
  };

  //   const handleSetTripClose = () => {
  //     setIsSetTripVisible(false);
  //   };
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
              backgroundColor: Colors.secondaryColor1,
              gap: 10,
              paddingTop: Viewport.height * 0.03,
              paddingBottom: Viewport.height * 0.03,
            },
            Styles.flexColumn,
          ]}
        >
          {errorMessages[0]?.all && (
            <Text style={Styles.textError}>{errorMessages[0]?.all}</Text>
          )}
          <View style={[{ gap: 20 }, Styles.flexRow]}>
            <Text
              style={{
                fontSize: 18,
                color: Colors.primaryColor1,
                fontWeight: "bold",
              }}
            >
              Category:{" "}
            </Text>
            <View style={[{ gap: 20, paddingRight: 10 }, Styles.flexRow]}>
              {selectedTravelCategory === "Round Trip" ? (
                <Button
                  onPress={() => {
                    setTripData({
                      ...tripData,
                      category: "Round Trip",
                    });
                    setSelectedTravelCategory("Round Trip");
                    setSelectedTravelType("");
                    const updatedErrors = { ...errorMessages };
                    delete updatedErrors[0];
                    setErrorMessages(updatedErrors);
                    setTripData({
                      travel_date: "",
                      travel_time: "",
                      return_date: "",
                      return_time: "",
                      category: "Round Trip",
                    });
                    setAddressData({
                      destination: "",
                      distance: null,
                    });
                    setIsAutocompleteEditable(false);
                    setIsTravelDateSelected(true);
                  }}
                  style={{
                    width: Viewport.width * 0.26,
                    height: Viewport.height * 0.055,
                  }}
                  text="Round Trip"
                  defaultBG
                />
              ) : (
                <Button
                  onPress={() => {
                    setTripData({
                      ...tripData,
                      category: "Round Trip",
                    });
                    setSelectedTravelCategory("Round Trip");
                    setSelectedTravelType("");
                    const updatedErrors = { ...errorMessages };
                    delete updatedErrors[0];
                    setErrorMessages(updatedErrors);
                    setTripData({
                      travel_date: "",
                      travel_time: "",
                      return_date: "",
                      return_time: "",
                      category: "Round Trip",
                    });
                    setAddressData({
                      destination: "",
                      distance: null,
                    });
                    setIsAutocompleteEditable(false);
                    setIsTravelDateSelected(true);
                  }}
                  style={{
                    width: Viewport.width * 0.26,
                    height: Viewport.height * 0.055,
                  }}
                  text="Round Trip"
                  transparentBG
                  transparentText
                />
              )}
              {selectedTravelCategory === "One-way" ? (
                <Button
                  onPress={() => {
                    setTripData({
                      ...tripData,
                      category: "One-way",
                    });
                    setSelectedTravelCategory("One-way");
                    const updatedErrors = { ...errorMessages };
                    delete updatedErrors[0];
                    setErrorMessages(updatedErrors);
                    setTripData({
                      travel_date: "",
                      travel_time: "",
                      return_date: "",
                      return_time: "",
                      category: "One-way",
                    });
                    setAddressData({
                      destination: "",
                      distance: null,
                    });
                    setIsAutocompleteEditable(false);
                    setIsTravelDateSelected(true);
                  }}
                  style={{
                    width: Viewport.width * 0.26,
                    height: Viewport.height * 0.055,
                  }}
                  text="One-way"
                  defaultBG
                />
              ) : (
                <Button
                  onPress={() => {
                    setTripData({
                      ...tripData,
                      category: "One-way",
                    });
                    setSelectedTravelCategory("One-way");
                    const updatedErrors = { ...errorMessages };
                    delete updatedErrors[0];
                    setErrorMessages(updatedErrors);
                    setTripData({
                      travel_date: "",
                      travel_time: "",
                      return_date: "",
                      return_time: "",
                      category: "One-way",
                    });
                    setAddressData({
                      destination: "",
                      distance: null,
                    });
                    setIsAutocompleteEditable(false);
                    setIsTravelDateSelected(true);
                  }}
                  style={{
                    width: Viewport.width * 0.26,
                    height: Viewport.height * 0.055,
                  }}
                  text="One-way"
                  transparentBG
                  transparentText
                />
              )}
            </View>
          </View>

          {selectedTravelCategory === "Round Trip" && (
            <>
              <View
                style={[
                  {
                    width: Viewport.width * 1,
                  },
                  Styles.flexRow,
                ]}
              >
                <Text
                  style={{
                    fontSize: 18,
                    color: Colors.primaryColor1,
                    fontWeight: "bold",
                    marginBottom: Viewport.height * 0.05,
                    paddingLeft: Viewport.width * 0.02,
                  }}
                >
                  Destination:{" "}
                </Text>
                <View
                  style={[
                    {
                      gap: 10,
                      width: Viewport.width * 0.6,
                    },
                    Styles.flexColumn,
                  ]}
                >
                  <AutoCompleteAddressGoogle
                    travel_date={tripData.travel_date}
                    travel_time={tripData.travel_time}
                    setData={setTripData}
                    setAddressData={setAddressData}
                    isDisabled={isAutocompleteEditable}
                    category={tripData.category}
                  />
                  {isTravelDateSelected ? (
                    <Text
                      style={[
                        { paddingLeft: Viewport.width * 0.08 },
                        Styles.textError,
                      ]}
                    >
                      Select travel date and time first
                    </Text>
                  ) : (
                    <Text style={[{ paddingLeft: 30 }, Styles.textError]}>
                      {errorMessages[0]?.destinationError}
                    </Text>
                  )}
                </View>
              </View>

              <View style={[{ gap: 30 }, Styles.flexRow]}>
                <Text
                  style={{
                    fontSize: FontSizes.normal,
                    color: Colors.primaryColor1,
                    fontWeight: "bold",
                    marginBottom: Viewport.height * 0.08,
                  }}
                >
                  From:{" "}
                </Text>
                <View style={[{ gap: 10 }, Styles.flexColumn]}>
                  <DatePicker button2 onDateSelected={handleFromDateSelected} />
                  {errorMessages[0]?.travelDateError && (
                    <Text style={Styles.textError}>
                      {errorMessages[0]?.travelDateError}
                    </Text>
                  )}

                  <TimePicker
                    secondBG
                    onTimeSelected={handleFromTimeSelected}
                    selectedHours={selectedTime.hours}
                    selectedMinutes={selectedTime.minutes}
                    selectedPeriod={selectedTime.period}
                  />
                  {errorMessages[0]?.travelTimeError && (
                    <Text style={Styles.textError}>
                      {errorMessages[0]?.travelTimeError}
                    </Text>
                  )}
                </View>
              </View>
              <View style={[{ gap: 35 }, Styles.flexRow]}>
                <Text
                  style={{
                    fontSize: FontSizes.normal,
                    color: Colors.primaryColor1,
                    fontWeight: "bold",
                    marginBottom: Viewport.height * 0.08,
                    marginLeft: Viewport.width * 0.064,
                  }}
                >
                  To:{" "}
                </Text>
                <View style={[{ gap: 10 }, Styles.flexColumn]}>
                  <DatePicker button2 onDateSelected={handleToDateSelected} />
                  {errorMessages[0]?.returnDateError && (
                    <Text style={Styles.textError}>
                      {errorMessages[0]?.returnDateError}
                    </Text>
                  )}
                  <TimePicker
                    secondBG
                    onTimeSelected={handleToTimeSelected}
                    selectedHours={selectedTime.hours}
                    selectedMinutes={selectedTime.minutes}
                    selectedPeriod={selectedTime.period}
                  />
                  {errorMessages[0]?.returnTimeError && (
                    <Text style={Styles.textError}>
                      {errorMessages[0]?.returnTimeError}
                    </Text>
                  )}
                </View>
              </View>
            </>
          )}
          {selectedTravelCategory === "One-way" && (
            <>
              <View
                style={[
                  { gap: 20, justifyContent: "flex-start" },
                  Styles.flexRow,
                ]}
              >
                <Text
                  style={{
                    fontSize: 18,
                    color: Colors.primaryColor1,
                    fontWeight: "bold",
                    marginLeft: Viewport.width * 0.08,
                  }}
                >
                  Type:{" "}
                </Text>
                <View style={[{ gap: 5 }, Styles.flexColumn]}>
                  <View style={[{ gap: 20, paddingRight: 10 }, Styles.flexRow]}>
                    {selectedTravelType === "Drop" ? (
                      <Button
                        onPress={() => {
                          setTripData((prevData: any) => ({
                            ...prevData,

                            category: "One-way - Drop",
                          }));
                          setSelectedTravelType("Drop");
                          const updatedErrors = { ...errorMessages };
                          delete updatedErrors[0]?.categoryError;
                          setErrorMessages(updatedErrors);
                        }}
                        style={{
                          width: Viewport.width * 0.26,
                          height: Viewport.height * 0.055,
                        }}
                        text="Drop"
                        defaultBG
                      />
                    ) : (
                      <Button
                        onPress={() => {
                          setTripData((prevData: any) => ({
                            ...prevData,

                            category: "One-way - Drop",
                          }));
                          setSelectedTravelType("Drop");
                          const updatedErrors = { ...errorMessages };
                          delete updatedErrors[0]?.categoryError;
                          setErrorMessages(updatedErrors);
                        }}
                        style={{
                          width: Viewport.width * 0.26,
                          height: Viewport.height * 0.055,
                        }}
                        text="Drop"
                        transparentBG
                        transparentText
                      />
                    )}
                    {selectedTravelType === "Fetch" ? (
                      <Button
                        onPress={() => {
                          setTripData((prevData: any) => ({
                            ...prevData,

                            category: "One-way - Fetch",
                          }));
                          setSelectedTravelType("Fetch");
                          const updatedErrors = { ...errorMessages };
                          delete updatedErrors[0]?.categoryError;
                          setErrorMessages(updatedErrors);
                        }}
                        style={{
                          width: Viewport.width * 0.26,
                          height: Viewport.height * 0.055,
                        }}
                        text="Fetch"
                        defaultBG
                      />
                    ) : (
                      <Button
                        onPress={() => {
                          setTripData((prevData: any) => ({
                            ...prevData,

                            category: "One-way - Fetch",
                          }));
                          setSelectedTravelType("Fetch");
                          const updatedErrors = { ...errorMessages };
                          delete updatedErrors[0]?.categoryError;
                          setErrorMessages(updatedErrors);
                        }}
                        style={{
                          width: Viewport.width * 0.26,
                          height: Viewport.height * 0.055,
                        }}
                        text="Fetch"
                        transparentBG
                        transparentText
                      />
                    )}
                  </View>
                  {errorMessages[0]?.categoryError && (
                    <Text style={Styles.textError}>
                      {errorMessages[0]?.categoryError}
                    </Text>
                  )}
                </View>
              </View>
              <View
                style={[
                  {
                    width: Viewport.width * 1,
                  },
                  Styles.flexRow,
                ]}
              >
                {selectedTravelType?.includes("Drop") ? (
                  <Text
                    style={{
                      fontSize: 18,
                      color: Colors.primaryColor1,
                      fontWeight: "bold",
                      marginBottom: Viewport.height * 0.05,
                      paddingLeft: Viewport.width * 0.02,
                    }}
                  >
                    Destination:{" "}
                  </Text>
                ) : (
                  <Text
                    style={{
                      fontSize: 18,
                      color: Colors.primaryColor1,
                      fontWeight: "bold",
                      marginBottom: Viewport.height * 0.05,
                      paddingLeft: Viewport.width * 0.01,
                    }}
                  >
                    Your Location:{" "}
                  </Text>
                )}

                <View
                  style={[
                    {
                      gap: 10,
                      width: Viewport.width * 0.6,
                    },
                    Styles.flexColumn,
                  ]}
                >
                  <AutoCompleteAddressGoogle
                    travel_date={tripData.travel_date}
                    travel_time={tripData.travel_time}
                    setData={setTripData}
                    setAddressData={setAddressData}
                    isDisabled={isAutocompleteEditable}
                    category={tripData.category}
                  />
                  {isTravelDateSelected ? (
                    <Text
                      style={[
                        { paddingLeft: Viewport.width * 0.08 },
                        Styles.textError,
                      ]}
                    >
                      Select travel date and time first
                    </Text>
                  ) : (
                    <Text style={[{ paddingLeft: 30 }, Styles.textError]}>
                      {errorMessages[0]?.destinationError}
                    </Text>
                  )}
                </View>
              </View>
              <View style={[{ gap: 40 }, Styles.flexRow]}>
                <Text
                  style={{
                    fontSize: FontSizes.normal,
                    color: Colors.primaryColor1,
                    fontWeight: "bold",
                    marginBottom: Viewport.height * 0.08,
                    marginRight: Viewport.width * -0.09,
                  }}
                >
                  Travel Date:{" "}
                </Text>
                <View style={[{ gap: 10 }, Styles.flexColumn]}>
                  <DatePicker button2 onDateSelected={handleFromDateSelected} />
                  {errorMessages[0]?.travelDateOnewayError && (
                    <Text style={Styles.textError}>
                      {errorMessages[0]?.travelDateOnewayError}
                    </Text>
                  )}
                  <TimePicker
                    secondBG
                    onTimeSelected={handleFromTimeSelected}
                    selectedHours={selectedTime.hours}
                    selectedMinutes={selectedTime.minutes}
                    selectedPeriod={selectedTime.period}
                  />
                  {errorMessages[0]?.travelTimeOnewayError && (
                    <Text style={Styles.textError}>
                      {errorMessages[0]?.travelTimeOnewayError}
                    </Text>
                  )}
                </View>
              </View>
            </>
          )}

          <View style={[{ gap: 50 }, Styles.flexRow]}>
            <Button
              onPress={onRequestClose}
              text="Cancel"
              transparentBG
              transparentText
            />
            <Button onPress={handleSetTrip} text="Next" defaultBG />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default InitialFormVip;
