import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  RefreshControl,
  ActivityIndicator,
  Pressable,
} from "react-native";
import {
  BackgroundColor,
  Styles,
  Viewport,
  FontSizes,
  Colors,
  pageMargin,
} from "../../styles/globalstyles/globalstyles";
import Header from "../../components/header/header";
import Button from "../../components/buttons/button";
import { Vehicle } from "../../interfaces/interfaces";
import { todayMockData } from "../../components/mockdata/mockdata";
import SetTripModal from "../../components/modals/settrip";
import RequestForm from "../../components/modals/requestform";
import PromptDialog from "../../components/modals/promptdialog";
import Dropdown from "../../components/dropdown/dropdown";
import DatePicker from "../../components/datepicker/datepicker";
import TimePicker from "../../components/timepicker/timepicker";
import AutoCompleteAddressGoogle from "../../components/autocompleteaddress/googleaddressinput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import PagerView from "react-native-pager-view";
import Carousel from "react-native-reanimated-carousel";
import {
  acceptVehicleAPI,
  cancelRequestAPI,
  checkVehicleAvailability,
  fetchRequestAPI,
  fetchSchedule,
  serverSideUrl,
} from "../../components/api/api";
import { format, parse } from "date-fns";
import {
  formatDate,
  formatTime,
  getTimeFormat,
  useAppState,
} from "../../components/function/function";
import Loading from "../../components/modals/loading";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  NotificationApprovalScheduleReminderWebsocket,
  useFetchNotification,
} from "../../components/api/websocket";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import Countdown from "../../components/countdown/countdown";
import Confirmation from "../../components/modals/confirmation";

export default function Requester() {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [isSetTripVisible, setIsSetTripVisible] = useState(false);
  const [isRequestFormVisible, setIsRequestFormVisible] = useState(false);

  const [isConfirmationAcceptedShow, setIsConfirmationAcceptedShow] =
    useState(false);
  const [isConfirmationCanceledShow, setIsConfirmationCanceledShow] =
    useState(false);
  const [isVehicleVip, setIsVehicleVip] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<any | undefined>(
    undefined
  );
  const [isAutocompleteEditable, setIsAutocompleteEditable] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTravelCategory, setSelectedTravelCategory] = useState<
    string | null
  >("Round Trip");
  const [selectedTravelType, setSelectedTravelType] = useState<string | null>();
  const [errorMessages, setErrorMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [schedule, setSchedule] = useState<any[]>([]);
  const [nextSchedule, setNextSchedule] = useState<any[]>([]);
  const [vehicleRecommendation, setVehicleRecommendation] = useState<any[]>([]);
  const [tripData, setTripData] = useState<any>({
    travel_date: "",
    travel_time: "",
    return_date: "",
    return_time: "",
    capacity: null,
    category: "Round Trip",
  });
  const [isTravelDateSelected, setIsTravelDateSelected] = useState(true);
  const [addressData, setAddressData] = useState<any>({
    destination: "",
    distance: null,
  });
  const [selectedTime, setSelectedTime] = useState<{
    hours: number | null;
    minutes: number | null;
    period: string | null;
  }>({
    hours: null,
    minutes: null,
    period: null,
  });
  const [datePickerKeyFrom, setDatePickerKeyFrom] = useState(0);
  const [datePickerKeyTo, setDatePickerKeyTo] = useState(1);
  const [timePickerKeyFrom, setTimePickerKeyFrom] = useState(2);
  const [timePickerKeyTo, setTimePickerKeyTo] = useState(3);
  const [datePickerKeyFromOneWay, setDatePickerKeyFromOneWay] = useState(4);
  const [datePickerKeyToOneWay, setDatePickerKeyToOneWay] = useState(5);
  const [pendingSchedule, setPendingSchedule] = useState<any[]>([]);
  const [notifList, setNotifList] = useState<any[]>([]);
  const notifLength = notifList.filter((notif) => !notif.read_status).length;
  const [refreshing, setRefreshing] = React.useState(false);
  const [refreshingSchedule, setRefreshingSchedule] = React.useState(false);
  const [selectedVehicleRecommendation, setSelectedVehicleRecommendation] =
    useState<string>("");
  const [selectedTrip, setSelectedTrip] = useState<string>("");
  const personalInfo = useSelector(
    (state: RootState) => state.personalInfo.data
  );
  const userName = personalInfo?.username;

  const navigation = useNavigation() as any;

  useEffect(() => {
    navigation.navigate("Requester", { notifLength } as {
      notifLength: number;
    });
  }, [notifList]);

  NotificationApprovalScheduleReminderWebsocket(userName);
  useFetchNotification(setNotifList);

  useAppState(
    fetchSchedule,
    setSchedule,
    setNextSchedule,
    setVehicleRecommendation,
    fetchRequestAPI,
    setPendingSchedule
  );

  useFocusEffect(
    React.useCallback(() => {
      fetchRequestAPI(
        () => {},
        undefined,
        setPendingSchedule,
        setSelectedCategory
      );
    }, [])
  );

  useFocusEffect(
    React.useCallback(() => {
      fetchSchedule(
        setSchedule,
        setNextSchedule,
        setVehicleRecommendation,
        setSelectedCategory
      );
    }, [])
  );

  const onRefreshSchedule = React.useCallback(() => {
    setRefreshingSchedule(true);
    setTimeout(() => {
      fetchRequestAPI(
        () => {},
        setRefreshingSchedule,
        setPendingSchedule,
        setSelectedCategory
      );
      fetchSchedule(
        setSchedule,
        setNextSchedule,
        setVehicleRecommendation,
        setSelectedCategory,
        setRefreshingSchedule
      );
    });
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      setErrorMessages([]);
      setVehicles([]);
      if (tripData.category === "Round Trip") {
        setDatePickerKeyFrom((prevKey) => prevKey + 1);
        setDatePickerKeyTo((prevKey) => prevKey + 1);
        setTimePickerKeyFrom((prevKey) => prevKey + 1);
        setTimePickerKeyTo((prevKey) => prevKey + 1);
        setDatePickerKeyFromOneWay((prevKey) => prevKey - 1);
        setDatePickerKeyToOneWay((prevKey) => prevKey - 1);
      } else if (tripData.category === "One-way") {
        setDatePickerKeyFrom((prevKey) => prevKey - 1);
        setDatePickerKeyTo((prevKey) => prevKey - 1);
        setTimePickerKeyFrom((prevKey) => prevKey - 1);
        setTimePickerKeyTo((prevKey) => prevKey - 1);
        setDatePickerKeyFromOneWay((prevKey) => prevKey + 1);
        setDatePickerKeyToOneWay((prevKey) => prevKey + 1);
      }
      setIsAutocompleteEditable(false);
      setIsTravelDateSelected(true);
      setSelectedTravelCategory("Round Trip");
      setSelectedTravelType("");
      setTripData({
        travel_date: "",
        travel_time: "",
        return_date: "",
        return_time: "",
        capacity: null,
        category: "Round Trip",
      });
      setAddressData({
        destination: "",
        distance: null,
      });
    }, 1000);
  }, []);

  

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
        !tripData.capacity &&
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
        if (!tripData.capacity) {
          validationErrors.capacityError = "This field is required";
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
        !tripData.capacity &&
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
        if (!tripData.capacity) {
          validationErrors.capacityError = "This field is required";
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

    setErrorMessages(errorArray);
    if (Object.keys(validationErrors).length === 0) {
      setIsLoading(true);
      checkVehicleAvailability(
        setVehicles,
        tripData.travel_date,
        tripData.travel_time,
        tripData.return_date,
        tripData.return_time,
        tripData.capacity,
        setSelectedCategory,
        setIsLoading
      );
    }
    console.log(tripData);
  };

  const handleSetTripClose = () => {
    setIsSetTripVisible(false);
  };

  const handleRequestFormVisible = (vehicle: Vehicle) => {
    if (vehicle.isVip) {
      setIsVehicleVip(true);
    } else {
      setIsRequestFormVisible(true);
    }

    setSelectedVehicle(vehicle);
  };

  const handleAccept = (recommend_request_id: any, recommend_trip_id: any) => {
    setSelectedTrip(recommend_trip_id);
    let validationErrors: { [key: string]: string } = {};

    if (!selectedVehicleRecommendation) {
      validationErrors.selectedVehicleRecommendationError =
        "Please select vehicle";
    }

    const errorArray = [validationErrors];

    setErrorMessages(errorArray);

    if (Object.keys(validationErrors).length === 0) {
      setIsLoading(true);
      acceptVehicleAPI(
        recommend_request_id,
        selectedVehicleRecommendation,
        setSelectedVehicleRecommendation,
        setIsLoading,
        fetchSchedule,
        setSchedule,
        setNextSchedule,
        setVehicleRecommendation,
        setSelectedCategory,
        fetchRequestAPI,
        setPendingSchedule,
        setIsConfirmationAcceptedShow
      );
    }
  };

  const handleCancel = (recommend_request_id: any) => {
    console.log("giatay");
    console.log("naa?", selectedVehicleRecommendation);
    setIsLoading(true);
    cancelRequestAPI(
      recommend_request_id,
      setIsLoading,
      fetchSchedule,
      setSchedule,
      setNextSchedule,
      setVehicleRecommendation,
      setSelectedCategory,
      fetchRequestAPI,
      setPendingSchedule,
      setIsConfirmationCanceledShow
    );
  };

  const handleRequestFormClose = () => {
    setIsRequestFormVisible(false);
    setIsVehicleVip(false);
    setIsConfirmationAcceptedShow(false);
    setIsConfirmationCanceledShow(false);
  };
  const handleOnNextPressed = () => {
    setIsVehicleVip(false);
    setIsRequestFormVisible(true);
  };

  const handleOnCategoryChange = (options: string) => {
    setSelectedCategory(options);
  };
  return (
    <>
      <BackgroundColor
        style={{ width: Viewport.width * 1, height: Viewport.height * 0.04 }}
      />
      <Header />

      {/* <ScrollView> */}
      <View style={Styles.container}>
        {selectedCategory === "Set Trip" && (
          <View style={[{ gap: Viewport.width * 0.26 }, Styles.flexRow]}>
            <Text
              style={{
                fontSize: FontSizes.normal,
                color: Colors.primaryColor1,
                fontWeight: "bold",
                marginLeft: 20,
              }}
            >
              Set Trip
            </Text>
            <Dropdown
              selectedCategory={selectedCategory}
              onCategoryChange={handleOnCategoryChange}
              options={["Set Trip", "Available Vehicle", "Ongoing Schedule"]}
              showText
              showBG
              menuAdjusted
              dropdownText2
            />
          </View>
        )}
        {selectedCategory === "Available Vehicle" && (
          <View style={[{ gap: Viewport.width * 0.1 }, Styles.flexRow]}>
            <Text
              style={{
                fontSize: FontSizes.normal,
                color: Colors.primaryColor1,
                fontWeight: "bold",
              }}
            >
              Available Vehicle
            </Text>
            <Dropdown
              selectedCategory={selectedCategory}
              onCategoryChange={handleOnCategoryChange}
              options={["Set Trip", "Available Vehicle", "Ongoing Schedule"]}
              showText
              showBG
              menuAdjusted
              dropdownText2
            />
          </View>
        )}
        {selectedCategory === "Ongoing Schedule" && (
          <View style={[{ gap: Viewport.width * 0.08 }, Styles.flexRow]}>
            <Text
              style={{
                fontSize: FontSizes.normal,
                color: Colors.primaryColor1,
                fontWeight: "bold",
              }}
            >
              Ongoing Schedule
            </Text>
            <Dropdown
              selectedCategory={selectedCategory}
              onCategoryChange={handleOnCategoryChange}
              options={["Set Trip", "Available Vehicle", "Ongoing Schedule"]}
              showText
              showBG
              menuAdjusted
              dropdownText2
            />
          </View>
        )}

        <BackgroundColor
          style={{
            width: Viewport.width * 1,
            height: Viewport.height * 0.01,
            marginTop: Viewport.width * 0.02,
          }}
        />

        <View
          style={[
            {
              width: Viewport.width * 1,
              height: Viewport.height * 0.85,
            },
            Styles.flexColumn,
          ]}
        >
          {selectedCategory === "Set Trip" && (
            <>
              <KeyboardAwareScrollView
                // resetScrollToCoords={{ x: 0, y: 0 }}
                contentContainerStyle={{
                  width: Viewport.width * 1.0,
                  height: Viewport.height * 1.0,
                }}
                keyboardShouldPersistTaps="handled"
                scrollEnabled={true}
                enableAutomaticScroll={true}
                enableOnAndroid={true}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
              >
                <View
                  style={[
                    {
                      backgroundColor: Colors.secondaryColor1,

                      gap: 10,
                      paddingTop: Viewport.height * 0.01,
                      marginBottom: Viewport.height * 0.0,
                      paddingBottom: Viewport.height * 0.1,
                    },
                    Styles.flexColumn,
                  ]}
                >
                  {errorMessages[0]?.all && (
                    <Text style={Styles.textError}>
                      {errorMessages[0]?.all}
                    </Text>
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
                    <View
                      style={[{ gap: 20, paddingRight: 10 }, Styles.flexRow]}
                    >
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
                            <Text
                              style={[{ paddingLeft: 30 }, Styles.textError]}
                            >
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
                          <DatePicker
                            key={datePickerKeyFrom}
                            button2
                            onDateSelected={handleFromDateSelected}
                          />
                          {errorMessages[0]?.travelDateError && (
                            <Text style={Styles.textError}>
                              {errorMessages[0]?.travelDateError}
                            </Text>
                          )}

                          <TimePicker
                            key={timePickerKeyFrom}
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
                          <DatePicker
                            key={datePickerKeyTo}
                            button2
                            onDateSelected={handleToDateSelected}
                          />
                          {errorMessages[0]?.returnDateError && (
                            <Text style={Styles.textError}>
                              {errorMessages[0]?.returnDateError}
                            </Text>
                          )}
                          <TimePicker
                            key={timePickerKeyTo}
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
                          <View
                            style={[
                              { gap: 20, paddingRight: 10 },
                              Styles.flexRow,
                            ]}
                          >
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
                            <Text
                              style={[{ paddingLeft: 30 }, Styles.textError]}
                            >
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
                          <DatePicker
                            key={datePickerKeyFromOneWay}
                            button2
                            onDateSelected={handleFromDateSelected}
                          />
                          {errorMessages[0]?.travelDateOnewayError && (
                            <Text style={Styles.textError}>
                              {errorMessages[0]?.travelDateOnewayError}
                            </Text>
                          )}
                          <TimePicker
                            key={datePickerKeyToOneWay}
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
                  <View style={[{ gap: 22 }, Styles.flexRow]}>
                    <Text
                      style={{
                        fontSize: FontSizes.normal,
                        color: Colors.primaryColor1,
                        fontWeight: "bold",
                      }}
                    >
                      No. of Passenger{"("}s{"):"}
                    </Text>
                    <View style={Styles.flexColumn}>
                      <TextInput
                        keyboardType="numeric"
                        placeholder="Type here..."
                        value={tripData ? tripData.capacity : null}
                        style={{
                          backgroundColor: Colors.secondaryColor1,
                          width: Viewport.width * 0.3,
                          height: Viewport.height * 0.06,
                          borderRadius: 0,
                          padding: 10,
                          fontSize: FontSizes.small,
                          borderBottomWidth: 1,
                        }}
                        onChangeText={(text) => {
                          setTripData({
                            ...tripData,
                            capacity: text,
                          });
                          if (text) {
                            const updatedErrors = { ...errorMessages };
                            delete updatedErrors[0]?.capacityError;
                            setErrorMessages(updatedErrors);
                          }
                        }}
                      />
                      {errorMessages[0]?.capacityError && (
                        <Text style={Styles.textError}>
                          {errorMessages[0]?.capacityError}
                        </Text>
                      )}
                    </View>
                  </View>
                  <View style={[{ gap: 50 }, Styles.flexRow]}>
                    <Button onPress={handleSetTrip} text="Set Trip" defaultBG />
                  </View>
                </View>
              </KeyboardAwareScrollView>
            </>
          )}
          {selectedCategory === "Available Vehicle" && (
            <>
              <ScrollView
                contentContainerStyle={{
                  gap: Viewport.height * 0.01,
                  paddingTop: Viewport.width * 0.1,
                  paddingBottom: Viewport.width * 0.45,
                }}
              >
                {vehicles.length === 0 ? (
                  <Text>No vehicles available</Text>
                ) : (
                  <>
                    <Text
                      style={{
                        fontSize: FontSizes.small,
                        color: Colors.primaryColor1,
                      }}
                    >
                      Available vehicles from{" "}
                      <Text style={{ fontWeight: "bold" }}>
                        {formatDate(tripData.travel_date)},{" "}
                        {formatTime(tripData.travel_time)}
                      </Text>{" "}
                      to{" "}
                      <Text style={{ fontWeight: "bold" }}>
                        {formatDate(tripData.return_date)},{" "}
                        {formatTime(tripData.return_time)}
                      </Text>
                      . Preferred capacity:{" "}
                      <Text style={{ fontWeight: "bold" }}>
                        {tripData.capacity}
                      </Text>
                    </Text>
                    {vehicles.map((vehicle, index) => (
                      <TouchableOpacity
                        onPress={() => handleRequestFormVisible(vehicle)}
                        key={index}
                        style={[
                          {
                            width: Viewport.width * 0.95,
                            height: Viewport.height * 0.2,
                            backgroundColor: Colors.primaryColor2,
                            borderRadius: 10,
                          },
                          Styles.flexRow,
                        ]}
                      >
                        <View
                          style={[
                            {
                              width: Viewport.width * 0.45,
                              height: Viewport.height * 0.2,
                              paddingLeft: Viewport.height * 0.01,
                              gap: Viewport.height * 0.02,
                            },
                            Styles.flexColumn,
                          ]}
                        >
                          <Text
                            style={{
                              fontWeight: "bold",
                              textAlign: "center",
                              fontSize: FontSizes.normal,
                            }}
                          >
                            {vehicle.plate_number} {vehicle.model}
                          </Text>
                          <View>
                            <Text
                              style={{
                                fontSize: FontSizes.small,
                                textAlign: "left",
                              }}
                            >
                              Seating Capacity: {vehicle.capacity}
                            </Text>
                            <Text
                              style={{
                                fontSize: FontSizes.small,
                                textAlign: "left",
                              }}
                            >
                              Type: {vehicle.type}
                            </Text>
                          </View>
                        </View>
                        <Image
                          style={{
                            width: Viewport.width * 0.47,
                            height: Viewport.height * 0.15,
                          }}
                          resizeMode="cover"
                          source={{ uri: serverSideUrl + vehicle.image }}
                        />
                      </TouchableOpacity>
                    ))}
                  </>
                )}
              </ScrollView>
            </>
          )}
          {selectedCategory === "Ongoing Schedule" && (
            <>
              <ScrollView
                contentContainerStyle={{
                  gap: Viewport.height * 0.03,
                  paddingTop: Viewport.width * 0.05,
                  paddingBottom: Viewport.width * 0.45,
                }}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshingSchedule}
                    onRefresh={onRefreshSchedule}
                  />
                }
              >
                {vehicleRecommendation.map((recommend, index) => (
                  <View
                    // onPress={() => handleRequestFormVisible(vehicle)}
                    key={index}
                    style={[
                      {
                        width: Viewport.width * 0.95,
                        height: "auto",
                        backgroundColor: Colors.primaryColor2,
                        borderRadius: 10,
                      },
                      Styles.flexColumn,
                    ]}
                  >
                    <View
                      style={[
                        {
                          width: Viewport.width * 0.85,
                          height: "auto",
                          paddingTop: Viewport.height * 0.02,
                          paddingBottom: Viewport.height * 0.02,
                          gap: Viewport.height * 0.01,
                          alignItems: "flex-start",
                        },
                      ]}
                    >
                      <Text
                        style={{
                          fontWeight: "bold",
                          textAlign: "center",
                          fontSize: FontSizes.normal,
                        }}
                      >
                        Schedule no. {recommend.trip_id}
                      </Text>
                      <View style={[{}, Styles.flexRow]}>
                        <Text style={{ fontSize: FontSizes.small }}>
                          <Text style={{ fontWeight: "bold" }}>
                            We regret to inform you that the vehicle you
                            reserved for the date{" "}
                            <Text style={{ color: Colors.primaryColor1 }}>
                              {formatDate(recommend.travel_date)},{" "}
                              {formatTime(recommend.travel_time)}
                            </Text>{" "}
                            to{" "}
                            <Text style={{ color: Colors.primaryColor1 }}>
                              {formatDate(recommend.return_date)},{" "}
                              {formatTime(recommend.return_time)}{" "}
                            </Text>
                            is currently undergoing unexpected maintenance. We
                            apologize for any inconvenience this may cause.{" "}
                            {recommend.message}
                          </Text>
                        </Text>
                      </View>
                      {!recommend.vehicle_data_recommendation ||
                        (recommend.vehicle_data_recommendation.length === 0 && (
                          <Button
                            onPress={() => handleCancel(recommend.request_id)}
                            text="Cancel"
                            transparentBG
                            transparentText
                          />
                        ))}
                      {recommend.vehicle_data_recommendation &&
                      recommend.vehicle_data_recommendation.length > 0 ? (
                        <>
                          <Carousel
                            loop={false}
                            width={Viewport.width * 0.85}
                            height={Viewport.height * 0.2}
                            autoPlay={false}
                            data={recommend.vehicle_data_recommendation}
                            scrollAnimationDuration={1000}
                            mode="parallax"
                            renderItem={({ item }: { item: any }) => (
                              <Pressable
                                key={item.vehicle_recommendation_plate_number}
                                style={
                                  selectedVehicleRecommendation ===
                                    item.vehicle_recommendation_plate_number &&
                                  selectedTrip === recommend.trip_id
                                    ? {
                                        backgroundColor: "white",
                                        width: Viewport.width * 0.65,
                                        height: Viewport.height * 0.2,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        borderWidth: 5,
                                        borderColor: Colors.primaryColor1,
                                      }
                                    : {
                                        backgroundColor: "white",
                                        width: Viewport.width * 0.65,
                                        height: Viewport.height * 0.2,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                      }
                                }
                                onPress={() => {
                                  setSelectedVehicleRecommendation(
                                    item.vehicle_recommendation_plate_number
                                  );
                                  if (
                                    selectedVehicleRecommendation ===
                                    item.vehicle_recommendation_plate_number
                                  ) {
                                    setSelectedVehicleRecommendation("");
                                  }

                                  setSelectedTrip(recommend.trip_id);
                                  const updatedErrors = { ...errorMessages };
                                  delete updatedErrors[0]
                                    ?.selectedVehicleRecommendationError;
                                  setErrorMessages(updatedErrors);
                                }}
                              >
                                <Image
                                  style={{
                                    width: Viewport.width * 0.3,
                                    height: Viewport.height * 0.1,
                                  }}
                                  resizeMode="cover"
                                  source={{
                                    uri:
                                      serverSideUrl +
                                      item.vehicle_recommendation_image,
                                  }}
                                />

                                <Text>
                                  {item.vehicle_recommendation_plate_number}{" "}
                                  {item.vehicle_recommendation_model}
                                </Text>

                                <Text>
                                  Seating Capacity:{" "}
                                  {item.vehicle_recommendation_capacity}
                                </Text>
                                <Text>
                                  Type: {item.vehicle_recommendation_type}
                                </Text>
                              </Pressable>
                            )}
                          />
                          {errorMessages[0]
                            ?.selectedVehicleRecommendationError && (
                            <Text
                              style={[
                                {
                                  width: Viewport.width * 0.85,
                                  textAlign: "center",
                                },
                                Styles.textError,
                              ]}
                            >
                              {
                                errorMessages[0]
                                  ?.selectedVehicleRecommendationError
                              }
                            </Text>
                          )}
                          <View
                            style={[
                              {
                                justifyContent: "space-around",

                                width: Viewport.width * 0.85,
                              },
                              Styles.flexRow,
                            ]}
                          >
                            <Button
                              onPress={() => handleCancel(recommend.request_id)}
                              text="Cancel"
                              transparentBG
                              transparentText
                            />
                            <Button
                              onPress={() =>
                                handleAccept(
                                  recommend.request_id,
                                  recommend.trip_id
                                )
                              }
                              text="Accept"
                              defaultBG
                            />
                          </View>
                        </>
                      ) : null}
                    </View>
                  </View>
                ))}

                {pendingSchedule.length === 0 ? (
                  <Text>No pending schedule available</Text>
                ) : (
                  <>
                    {pendingSchedule.map((schedule, index) => (
                      <TouchableOpacity
                        // onPress={() => handleRequestFormVisible(vehicle)}
                        key={index}
                        style={[
                          {
                            width: Viewport.width * 0.95,
                            height: "auto",
                            backgroundColor: Colors.primaryColor2,
                            borderRadius: 10,
                          },
                          Styles.flexColumn,
                        ]}
                      >
                        <View
                          style={[
                            {
                              width: Viewport.width * 0.85,
                              height: "auto",
                              paddingTop: Viewport.height * 0.02,
                              paddingBottom: Viewport.height * 0.02,
                              gap: Viewport.height * 0.01,
                              alignItems: "flex-start",
                            },
                          ]}
                        >
                          <Text
                            style={{
                              fontWeight: "bold",
                              textAlign: "center",
                              fontSize: FontSizes.normal,
                            }}
                          >
                            Schedule no. {schedule.request_id}
                          </Text>
                          <View style={[{}, Styles.flexRow]}>
                            <Text style={{ fontSize: FontSizes.small }}>
                              <Text style={{ fontWeight: "bold" }}>
                                Travel date and time:{" "}
                              </Text>
                              {formatDate(schedule.travel_date)},{" "}
                              {formatTime(schedule.travel_time)}
                            </Text>
                          </View>
                          <View style={[{}, Styles.flexRow]}>
                            <Text style={{ fontSize: FontSizes.small }}>
                              <Text style={{ fontWeight: "bold" }}>
                                Destination:{" "}
                              </Text>
                              {schedule.destination}
                            </Text>
                          </View>
                          <View
                            style={[
                              {
                                width: Viewport.width * 0.85,
                                alignItems: "flex-end",
                                justifyContent: "flex-end",
                              },
                              Styles.flexRow,
                            ]}
                          >
                            <Text
                              style={{
                                fontSize: FontSizes.small,
                                textAlign: "left",
                                fontWeight: "bold",
                              }}
                            >
                              Waiting for approval{" "}
                              <ActivityIndicator
                                size={FontSizes.normal}
                                color={Colors.primaryColor1}
                              />
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </>
                )}
                {schedule.length === 0 ? (
                  <Text>No schedule available</Text>
                ) : (
                  <>
                    {schedule.map((schedule, index) => (
                      <TouchableOpacity
                        // onPress={() => handleRequestFormVisible(vehicle)}
                        key={index}
                        style={[
                          {
                            width: Viewport.width * 0.95,
                            height: "auto",
                            backgroundColor: Colors.primaryColor2,
                            borderRadius: 10,
                          },
                          Styles.flexColumn,
                        ]}
                      >
                        <View
                          style={[
                            {
                              width: Viewport.width * 0.85,
                              height: "auto",
                              paddingTop: Viewport.height * 0.02,
                              paddingBottom: Viewport.height * 0.02,
                              gap: Viewport.height * 0.01,
                              alignItems: "flex-start",
                            },
                          ]}
                        >
                          <View
                            style={[
                              {
                                justifyContent: "space-between",

                                width: Viewport.width * 0.85,
                              },
                              Styles.flexRow,
                            ]}
                          >
                            <Text
                              style={{
                                fontWeight: "bold",
                                textAlign: "center",
                                fontSize: FontSizes.normal,
                              }}
                            >
                              Schedule no. {schedule.trip_id}
                            </Text>
                            <Text style={{ fontSize: FontSizes.small }}>
                              <Text
                                style={{
                                  fontWeight: "bold",
                                  color: Colors.primaryColor1,
                                }}
                              >
                                {schedule.status}
                              </Text>
                            </Text>
                          </View>

                          <View style={[{}, Styles.flexRow]}>
                            <Text style={{ fontSize: FontSizes.small }}>
                              <Text style={{ fontWeight: "bold" }}>
                                Travel date and time:{" "}
                              </Text>
                              {formatDate(schedule.travel_date)},{" "}
                              {formatTime(schedule.travel_time)}
                              <Text style={{ fontWeight: "bold" }}> to </Text>
                              {formatDate(schedule.return_date)},{" "}
                              {formatTime(schedule.return_time)}
                            </Text>
                          </View>
                          <View style={[{}, Styles.flexRow]}>
                            <Text style={{ fontSize: FontSizes.small }}>
                              <Text style={{ fontWeight: "bold" }}>
                                Driver:{" "}
                              </Text>
                              {schedule.driver}{" "}
                              <Text style={{ fontWeight: "bold" }}> - </Text> 0
                              {schedule.contact_no_of_driver}
                            </Text>
                          </View>
                          <View style={[{}, Styles.flexRow]}>
                            <Text style={{ fontSize: FontSizes.small }}>
                              <Text style={{ fontWeight: "bold" }}>
                                Destination:{" "}
                              </Text>
                              {schedule.destination}
                            </Text>
                          </View>
                          <View style={[{}, Styles.flexRow]}>
                            <Text style={{ fontSize: FontSizes.small }}>
                              <Text style={{ fontWeight: "bold" }}>
                                Vehicle:{" "}
                              </Text>
                              {schedule.vehicle}
                            </Text>
                          </View>

                          <View
                            style={[
                              {
                                width: Viewport.width * 0.85,
                                alignItems: "flex-end",
                                justifyContent: "flex-end",
                              },
                              Styles.flexRow,
                            ]}
                          >
                            <Text
                              style={{
                                fontWeight: "bold",
                                textAlign: "center",
                                fontSize: FontSizes.small,
                              }}
                            >
                              <Countdown
                                travelDate={schedule.travel_date}
                                travelTime={schedule.travel_time}
                              />
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </>
                )}
              </ScrollView>
            </>
          )}
        </View>
      </View>
      {/* </ScrollView> */}
      <Confirmation
        visible={isConfirmationAcceptedShow}
        animationType="fade"
        transparent={true}
        content="Accepted Successfully"
        onRequestClose={handleRequestFormClose}
        showContent
        adjustedSize
      />
      <Confirmation
        visible={isConfirmationCanceledShow}
        animationType="fade"
        transparent={true}
        content="Canceled Successfully"
        onRequestClose={handleRequestFormClose}
        showContent
        adjustedSize
      />
      <SetTripModal
        animationType="fade"
        visible={isSetTripVisible}
        transparent={true}
        onRequestClose={handleSetTripClose}
      />
      <RequestForm
        animationType="fade"
        visible={isRequestFormVisible}
        transparent={true}
        onRequestClose={handleRequestFormClose}
        selectedVehicle={selectedVehicle}
        tripData={tripData}
        addressData={addressData}
        setVehicles={setVehicles}
        setTripData={setTripData}
        setAddressData={setAddressData}
        setSelectedTravelCategory={setSelectedTravelCategory}
        setSelectedTravelType={setSelectedTravelType}
        setIsRequestSubmissionLoading={setIsLoading}
      />
      <PromptDialog
        animationType="fade"
        visible={isVehicleVip}
        transparent={true}
        onRequestClose={handleRequestFormClose}
        header="Disclaimer:"
        content="This vehicle is prioritized for the chancellor, and your reservation will be canceled once the chancellor 
        uses it during your trip."
        footer="Are you sure you want to use this vehicle?"
        onNextPressed={handleOnNextPressed}
        showHeader
        showContent
        showFooter
      />
      <Loading
        animationType="fade"
        visible={isLoading}
        transparent={true}
        onRequestClose={handleRequestFormClose}
        content="Processing..."
        showContent
      />
    </>
  );
}
