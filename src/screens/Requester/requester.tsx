import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import {
  BackgroundColor,
  Styles,
  Viewport,
  FontSizes,
  Colors,
} from "../../styles/globalstyles/globalstyles";
import Header from "../../components/header/header";
import Button from "../../components/buttons/button";
import { Vehicle } from "../../interfaces/interfaces";
import { vehiclesMockData } from "../../components/mockdata/mockdata";
import SetTripModal from "../../components/modals/settrip";
import RequestForm from "../../components/modals/requestform";
import PromptDialog from "../../components/modals/promptdialog";
import Dropdown from "../../components/dropdown/dropdown";
import DatePicker from "../../components/datepicker/datepicker";
import TimePicker from "../../components/timepicker/timepicker";
import { useFocusEffect } from "@react-navigation/native";

export default function Requester() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isSetTripVisible, setIsSetTripVisible] = useState(false);
  const [isRequestFormVisible, setIsRequestFormVisible] = useState(false);
  const [isVehicleVip, setIsVehicleVip] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | undefined>(
    undefined
  );
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [tripData, setTripData] = useState<any>({
    fromDate: "",
    fromTime: "",
    toDate: "",
    toTime: "",
    noOfPassenger: 0,
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

  useFocusEffect(
    React.useCallback(() => {
      setSelectedCategory("Set Trip");
    }, [])
  );
  const handleFromDateSelected = (selectedDate: Date) => {
    const formattedDate = selectedDate.toLocaleDateString(undefined, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    setTripData((prevData: any) => ({
      ...prevData,
      fromDate: formattedDate,
    }));
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

    setTripData((prevData: any) => ({
      ...prevData,
      fromTime: `${formattedHours}:${formattedMinutes} ${period}`,
    }));
  };

  const handleToDateSelected = (selectedDate: Date) => {
    const formattedDate = selectedDate.toLocaleDateString(undefined, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    setTripData((prevData: any) => ({
      ...prevData,
      toDate: formattedDate,
    }));
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
      toTime: `${formattedHours}:${formattedMinutes} ${period}`,
    }));
  };

  const fetchedVehicleList = () => {
    setVehicles(vehiclesMockData);
  };

  useEffect(() => {
    fetchedVehicleList();
  }, []);

  const handleSetTrip = () => {
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

  const handleRequestFormClose = () => {
    setIsRequestFormVisible(false);
    setIsVehicleVip(false);
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
              <View
                style={[
                  {
                    backgroundColor: Colors.secondaryColor1,
                    width: Viewport.width * 1,
                    height: Viewport.height * 0.75,
                    gap: 20,
                    marginBottom: Viewport.height * 0.1,
                    paddingBottom: Viewport.height * 0.15,
                  },
                  Styles.flexColumn,
                ]}
              >
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
                      button2
                      onDateSelected={handleFromDateSelected}
                    />
                    <TimePicker
                      secondBG
                      onTimeSelected={handleFromTimeSelected}
                      selectedHours={selectedTime.hours}
                      selectedMinutes={selectedTime.minutes}
                      selectedPeriod={selectedTime.period}
                    />
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
                    <TimePicker
                      secondBG
                      onTimeSelected={handleToTimeSelected}
                      selectedHours={selectedTime.hours}
                      selectedMinutes={selectedTime.minutes}
                      selectedPeriod={selectedTime.period}
                    />
                  </View>
                </View>
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
                  <TextInput
                    keyboardType="numeric"
                    value={tripData.noOfPassenger.toString()}
                    style={{
                      backgroundColor: Colors.secondaryColor1,
                      width: Viewport.width * 0.2,
                      height: Viewport.height * 0.06,
                      borderRadius: 0,
                      padding: 10,
                      fontSize: FontSizes.normal,
                      borderBottomWidth: 2,
                    }}
                    onChangeText={(text) =>
                      setTripData({
                        ...tripData,
                        noOfPassenger: parseInt(text, 10) || 0,
                      })
                    }
                  />
                </View>
                <View style={[{ gap: 50 }, Styles.flexRow]}>
                  <Button onPress={handleSetTrip} text="Set Trip" defaultBG />
                </View>
              </View>
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
                  vehicles.map((vehicle) => (
                    <TouchableOpacity
                      onPress={() => handleRequestFormVisible(vehicle)}
                      key={vehicle.id}
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
                          {vehicle.vehicle_name}
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
                            Type: {vehicle.vehicle_type}
                          </Text>
                        </View>
                      </View>
                      <Image
                        style={{
                          width: Viewport.width * 0.47,
                          height: Viewport.height * 0.15,
                        }}
                        resizeMode="cover"
                        source={vehicle.vehicle_image}
                      />
                    </TouchableOpacity>
                  ))
                )}
              </ScrollView>
            </>
          )}
        </View>
      </View>
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
    </>
  );
}
