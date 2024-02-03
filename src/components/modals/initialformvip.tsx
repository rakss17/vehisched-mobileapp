import React, { useState, useEffect } from "react";
import { View, Modal, Text } from "react-native";
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
  isTravelDateSelected,
  setIsTravelDateSelected,
  isAutocompleteNotPressable,
  setIsAutocompleteNotPressable,
}) => {
  const [arrivalDisableDaysBefore, setArrivalDisableDaysBefore] = useState(62);

  const [selectedTravelType, setSelectedTravelType] = useState<string | null>();
  const [errorMessages, setErrorMessages] = useState<any[]>([]);
  const [isAutoCompleteAddressPressed, setIsAutoCompleteAddressPressed] =
    useState(false);

  const [selectedTravelCategory, setSelectedTravelCategory] = useState<
    string | null
  >("Round Trip");

  const checkAutocompleteDisability = () => {
    if (tripData.travel_date !== "" && tripData.travel_time !== "") {
      setIsAutocompleteNotPressable(false);
      setIsTravelDateSelected(false);
    }
  };
  useEffect(() => {
    checkAutocompleteDisability();
  }, [checkAutocompleteDisability]);

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
      if (formattedDate) {
        let dateObject = new Date(formattedDate);
        let currentDate = new Date();

        if (dateObject > currentDate) {
          [currentDate, dateObject] = [dateObject, currentDate];
        }

        const diffInTime = currentDate.getTime() - dateObject.getTime();
        const diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24));
        setArrivalDisableDaysBefore(diffInDays);
      }
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

  const handleNext = () => {
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

  const handleInitialFormVIPClose = () => {
    onRequestClose();
    setIsAutocompleteNotPressable(true);
    setIsTravelDateSelected(true);
    setSelectedTravelCategory("Round Trip");
    setSelectedTravelType("");
    setTripData((prevData: any) => ({
      ...prevData,
      travel_date: "",
      travel_time: "",
      return_date: "",
      return_time: "",
      capacity: null,
      category: "Round Trip",
    }));
    setAddressData((prevData: any) => ({
      ...prevData,
      destination: "",
      distance: null,
    }));
    const updatedErrors = { ...errorMessages };
    delete updatedErrors[0];
    setErrorMessages(updatedErrors);
  };

  //   const handleNextClose = () => {
  //     setIsNextVisible(false);
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
                    setIsAutocompleteNotPressable(true);
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
                    setIsAutocompleteNotPressable(true);
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
                    setIsAutocompleteNotPressable(true);
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
                    setIsAutocompleteNotPressable(true);
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
              <View style={[{ gap: 0, marginTop: 20 }, Styles.flexColumn]}>
                <Text
                  style={{
                    fontSize: FontSizes.normal,
                    color: Colors.primaryColor1,
                    fontWeight: "bold",
                  }}
                >
                  Departure
                </Text>
                <View style={[{ gap: 30 }, Styles.flexRow]}>
                  <Text
                    style={{
                      fontSize: FontSizes.small,
                      color: Colors.primaryColor1,
                      fontWeight: "bold",
                      marginBottom: Viewport.height * 0.08,
                    }}
                  >
                    Date & Time:{" "}
                  </Text>
                  <View style={[{ gap: 10 }, Styles.flexColumn]}>
                    <DatePicker
                      button2
                      onDateSelected={handleFromDateSelected}
                      disableDaysBefore={3}
                    />
                    {errorMessages[0]?.travelDateError && (
                      <Text style={Styles.textError}>
                        {errorMessages[0]?.travelDateError}
                      </Text>
                    )}

                    <TimePicker
                      secondBG
                      onTimeSelected={handleFromTimeSelected}
                      selectedHours={null}
                      selectedMinutes={null}
                      selectedPeriod={null}
                    />
                    {errorMessages[0]?.travelTimeError && (
                      <Text style={Styles.textError}>
                        {errorMessages[0]?.travelTimeError}
                      </Text>
                    )}
                  </View>
                </View>
              </View>
              <View style={[{ gap: 0, marginTop: 20 }, Styles.flexColumn]}>
                <Text
                  style={{
                    fontSize: FontSizes.normal,
                    color: Colors.primaryColor1,
                    fontWeight: "bold",
                  }}
                >
                  Arrival
                </Text>
                <View style={[{ gap: 35 }, Styles.flexRow]}>
                  <Text
                    style={{
                      fontSize: FontSizes.small,
                      color: Colors.primaryColor1,
                      fontWeight: "bold",
                      marginBottom: Viewport.height * 0.08,
                    }}
                  >
                    Date & Time:{" "}
                  </Text>
                  <View style={[{ gap: 10 }, Styles.flexColumn]}>
                    <DatePicker
                      button2
                      onDateSelected={handleToDateSelected}
                      disableDaysBefore={arrivalDisableDaysBefore}
                    />
                    {errorMessages[0]?.returnDateError && (
                      <Text style={Styles.textError}>
                        {errorMessages[0]?.returnDateError}
                      </Text>
                    )}
                    <TimePicker
                      secondBG
                      onTimeSelected={handleToTimeSelected}
                      selectedHours={null}
                      selectedMinutes={null}
                      selectedPeriod={null}
                    />
                    {errorMessages[0]?.returnTimeError && (
                      <Text style={Styles.textError}>
                        {errorMessages[0]?.returnTimeError}
                      </Text>
                    )}
                  </View>
                </View>
              </View>
              <View
                style={[
                  {
                    width: Viewport.width * 1,
                    gap: Viewport.width * 0.03,
                  },
                  Styles.flexRow,
                ]}
              >
                <Text
                  style={{
                    fontSize: FontSizes.small,
                    color: Colors.primaryColor1,
                    fontWeight: "bold",
                    marginBottom: Viewport.height * 0.05,
                    paddingLeft: Viewport.width * 0.05,
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
                    isDisabled={isAutocompleteNotPressable}
                    category={tripData.category}
                    isAutoCompleteAddressPressed={isAutoCompleteAddressPressed}
                    setIsAutoCompleteAddressPressed={
                      setIsAutoCompleteAddressPressed
                    }
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

              <View style={[{ gap: 50 }, Styles.flexRow]}>
                <Text
                  style={{
                    fontSize: FontSizes.small,
                    color: Colors.primaryColor1,
                    fontWeight: "bold",
                    marginBottom: Viewport.height * 0.08,
                    marginRight: Viewport.width * -0.09,
                  }}
                >
                  Date & Time:{" "}
                </Text>
                <View style={[{ gap: 10 }, Styles.flexColumn]}>
                  <DatePicker
                    button2
                    onDateSelected={handleFromDateSelected}
                    disableDaysBefore={3}
                  />
                  {errorMessages[0]?.travelDateOnewayError && (
                    <Text style={Styles.textError}>
                      {errorMessages[0]?.travelDateOnewayError}
                    </Text>
                  )}
                  <TimePicker
                    secondBG
                    onTimeSelected={handleFromTimeSelected}
                    selectedHours={null}
                    selectedMinutes={null}
                    selectedPeriod={null}
                  />
                  {errorMessages[0]?.travelTimeOnewayError && (
                    <Text style={Styles.textError}>
                      {errorMessages[0]?.travelTimeOnewayError}
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
                {selectedTravelType?.includes("Fetch") ? (
                  <Text
                    style={{
                      fontSize: FontSizes.small,
                      color: Colors.primaryColor1,
                      fontWeight: "bold",
                      marginBottom: Viewport.height * 0.05,
                      paddingLeft: Viewport.width * 0.04,
                    }}
                  >
                    Your Location:{" "}
                  </Text>
                ) : (
                  <Text
                    style={{
                      fontSize: FontSizes.small,
                      color: Colors.primaryColor1,
                      fontWeight: "bold",
                      marginBottom: Viewport.height * 0.05,
                      paddingLeft: Viewport.width * 0.08,
                    }}
                  >
                    Destination:{" "}
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
                    isDisabled={isAutocompleteNotPressable}
                    category={tripData.category}
                    isAutoCompleteAddressPressed={isAutoCompleteAddressPressed}
                    setIsAutoCompleteAddressPressed={
                      setIsAutoCompleteAddressPressed
                    }
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
            </>
          )}

          <View style={[{ gap: 50 }, Styles.flexRow]}>
            <Button
              onPress={handleInitialFormVIPClose}
              text="Cancel"
              transparentBG
              transparentText
            />
            <Button onPress={handleNext} text="Next" defaultBG />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default InitialFormVip;
