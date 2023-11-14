import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Modal, TouchableOpacity } from "react-native";
import {
  Viewport,
  Styles,
  FontSizes,
  Colors,
} from "../../styles/globalstyles/globalstyles";
import { BackgroundColor } from "../../styles/globalstyles/globalstyles";
import Header from "../../components/header/header";
import Button from "../../components/buttons/button";
import { useFocusEffect } from "@react-navigation/native";
import { fetchDriverOwnSchedule } from "../../components/api/api";
import {
  formatDate,
  formatTime,
  useAppState,
} from "../../components/function/function";

export default function Driver() {
  const [originalScheduleData, setOriginalScheduleData] = useState<any[]>([]);
  const [scheduleData, setScheduleData] = useState<any[]>([]);
  const [selectedTrip, setSelectedTrip] = useState<any[]>([]);
  const [isTripDetailsShow, setIsTripDetailsShow] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string>("Today");
  const currentDate = new Date().toISOString().split("T")[0];

  useAppState(fetchDriverOwnSchedule, setOriginalScheduleData);

  useFocusEffect(
    React.useCallback(() => {
      fetchDriverOwnSchedule(setOriginalScheduleData);
    }, [])
  );

  useEffect(() => {
    if (originalScheduleData.length > 0) {
      handleButtonPress("Today");
    }
  }, [originalScheduleData]);

  const handleCloseTripDetails = () => {
    setIsTripDetailsShow(false);
  };

  const handleShowTripDetails = (trip: any) => {
    setSelectedTrip([trip]);
    setIsTripDetailsShow(true);
  };

  const handleButtonPress = (status: string) => {
    setSelectedStatus(status);
    let filteredSchedule: any[] = [];
    switch (status) {
      case "Today":
        filteredSchedule = originalScheduleData.filter(
          (schedule) =>
            schedule.travel_date === currentDate &&
            schedule.vehicle_driver_status !== "On Trip"
        );
        break;
      case "Ongoing":
        filteredSchedule = originalScheduleData.filter(
          (schedule) => schedule.vehicle_driver_status === "On Trip"
        );
        break;
      case "Upcoming":
        filteredSchedule = originalScheduleData.filter(
          (schedule) => schedule.travel_date > currentDate
        );
        break;
      default:
        setScheduleData([]);
        break;
    }
    setScheduleData(filteredSchedule);
  };

  return (
    <>
      <BackgroundColor
        style={{ width: Viewport.width * 1, height: Viewport.height * 0.04 }}
      />
      <Header />
      <View style={Styles.container}>
        <View
          style={[
            {
              width: Viewport.width * 0.7,
            },
            Styles.flexRow,
          ]}
        >
          <Text
            style={[
              {
                fontSize: FontSizes.normal,
                color: Colors.primaryColor1,
                fontWeight: "bold",
                marginTop: Viewport.height * 0.2,
              },
            ]}
          >
            Schedules
          </Text>
        </View>
        <View
          style={[
            {
              width: Viewport.width * 1,
              justifyContent: "space-around",
              marginTop: 10,
            },
            Styles.flexRow,
          ]}
        >
          <Button
            text="Today"
            transparentBG2
            transparentText2
            isHighlighted={selectedStatus === "Today"}
            onPress={() => handleButtonPress("Today")}
          />
          <Button
            text="Ongoing"
            transparentBG2
            transparentText2
            isHighlighted={selectedStatus === "Ongoing"}
            onPress={() => handleButtonPress("Ongoing")}
          />
          <Button
            text="Upcoming"
            transparentBG2
            transparentText2
            isHighlighted={selectedStatus === "Upcoming"}
            onPress={() => handleButtonPress("Upcoming")}
          />
        </View>
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
              paddingBottom: Viewport.height * 0.38,
            },
            Styles.flexColumn,
          ]}
        >
          <ScrollView>
            {scheduleData.length === 0 ? (
              <Text
                style={{
                  fontSize: FontSizes.small,
                  textAlign: "center",
                  marginTop: 15,
                }}
              >
                No schedules available
              </Text>
            ) : (
              scheduleData.map((schedule, index) => (
                <TouchableOpacity
                  onPress={() => handleShowTripDetails(schedule)}
                  key={index}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      backgroundColor: Colors.primaryColor2,
                      marginTop: 10,
                      paddingLeft: 20,
                      width: Viewport.width * 1,
                      height: Viewport.height * 0.08,
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        width: Viewport.width * 0.2,
                        height: "auto",
                        fontSize: FontSizes.small,
                        marginLeft: 5,
                        textAlign: "center",
                      }}
                    >
                      {schedule.vehicle__plate_number} {schedule.vehicle__model}
                    </Text>
                    {selectedStatus === "Today" && (
                      <Text
                        style={{
                          width: Viewport.width * 0.2,
                          fontSize: FontSizes.small,
                          marginLeft: 55,
                          textAlign: "center",
                        }}
                      >
                        {formatTime(schedule.travel_time)}
                      </Text>
                    )}
                    {selectedStatus === "Upcoming" && (
                      <Text
                        style={{
                          width: Viewport.width * 0.25,
                          fontSize: FontSizes.small,
                          marginLeft: 40,
                          textAlign: "center",
                        }}
                      >
                        {formatDate(schedule.travel_date)},{" "}
                        {formatTime(schedule.travel_time)}
                      </Text>
                    )}

                    <Text
                      style={{
                        width: Viewport.width * 0.25,

                        fontSize: FontSizes.small,
                        textAlign: "center",
                        marginLeft: 30,
                      }}
                    >
                      {schedule.destination.split(",")[0].trim()}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))
            )}
          </ScrollView>
        </View>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isTripDetailsShow}
        onRequestClose={handleCloseTripDetails}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              paddingHorizontal: Viewport.width * 0.1,
              paddingVertical: Viewport.height * 0.05,
              borderRadius: 10,
              width: Viewport.width * 0.9,
              height: Viewport.height * 0.6,
            }}
          >
            <Text
              style={{
                fontSize: FontSizes.normal,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Trip details
            </Text>

            {selectedTrip.map((trip, index) => (
              <View key={index}>
                <ScrollView
                  style={{
                    height: Viewport.height * 0.43,
                  }}
                >
                  <Text
                    style={[
                      {
                        fontSize: FontSizes.small,
                        color: Colors.secondaryColor2,

                        marginTop: Viewport.height * 0.03,
                        fontWeight: "bold",
                      },
                    ]}
                  >
                    Trip no. {trip.trip_number}
                  </Text>
                  <Text
                    style={[
                      {
                        fontSize: FontSizes.small,
                        color: Colors.secondaryColor2,

                        marginTop: Viewport.height * 0.03,
                      },
                    ]}
                  >
                    <Text style={{ fontWeight: "bold" }}>
                      Requester's name:
                    </Text>{" "}
                    {trip.requester_name}
                  </Text>
                  <Text
                    style={[
                      {
                        fontSize: FontSizes.small,
                        color: Colors.secondaryColor2,

                        marginTop: Viewport.height * 0.03,
                      },
                    ]}
                  >
                    <Text style={{ fontWeight: "bold" }}>
                      Passenger's name(s):
                    </Text>{" "}
                    {trip.passenger_name
                      .match(/'([^']+)'/g)
                      .map((name: any) => name.slice(1, -1))
                      .join(", ")}
                  </Text>
                  <Text
                    style={[
                      {
                        fontSize: FontSizes.small,
                        color: Colors.secondaryColor2,

                        marginTop: Viewport.height * 0.03,
                      },
                    ]}
                  >
                    <Text style={{ fontWeight: "bold" }}>Date:</Text>{" "}
                    {trip.travel_date}
                  </Text>
                  <Text
                    style={[
                      {
                        fontSize: FontSizes.small,
                        color: Colors.secondaryColor2,

                        marginTop: Viewport.height * 0.03,
                      },
                    ]}
                  >
                    <Text style={{ fontWeight: "bold" }}>Time:</Text>{" "}
                    {trip.travel_time}
                  </Text>
                  <Text
                    style={[
                      {
                        fontSize: FontSizes.small,
                        color: Colors.secondaryColor2,

                        marginTop: Viewport.height * 0.03,
                      },
                    ]}
                  >
                    <Text style={{ fontWeight: "bold" }}>Destination:</Text>{" "}
                    {trip.destination}
                  </Text>
                </ScrollView>
                <View
                  style={{
                    alignItems: "flex-end",
                    marginTop: Viewport.height * 0.0,
                  }}
                >
                  <Button
                    text="Close"
                    transparentBG
                    transparentText2
                    onPress={handleCloseTripDetails}
                  />
                </View>
              </View>
            ))}
          </View>
        </View>
      </Modal>
    </>
  );
}
