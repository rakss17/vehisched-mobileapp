import { useState, useEffect } from "react";
import { View, Text, ScrollView, Modal, TouchableOpacity } from "react-native";
import Header from "../../components/header/header";
import { BackgroundColor } from "../../styles/globalstyles/globalstyles";
import {
  Viewport,
  Styles,
  FontSizes,
  Colors,
} from "../../styles/globalstyles/globalstyles";
import { todayMockData } from "../../components/mockdata/mockdata";
import { Schedule } from "../../interfaces/interfaces";

export default function Driver() {
  const [scheduleData, setScheduleData] = useState<Schedule[]>([]);
  const [isTripDetailsShow, setIsTripDetailsShow] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<Schedule[]>([]);

  useEffect(() => {
    const todayTrips = todayMockData.filter((trip) => trip.status === "Today");
    setScheduleData(todayTrips);
  }, []);

  const handleShowTripDetails = (trip: Schedule) => {
    setSelectedTrip([trip]);
    setIsTripDetailsShow(true);
  };

  const handleCloseTripDetails = () => {
    setIsTripDetailsShow(false);
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
                marginTop: 30,
              },
            ]}
          >
            Today's Trip
          </Text>
        </View>
        <BackgroundColor
          style={{
            width: Viewport.width * 1,
            height: Viewport.height * 0.01,
            marginTop: Viewport.width * 0.02,
          }}
        />
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <Text
            style={{
              width: Viewport.width * 0.35,
              fontSize: FontSizes.small,
              paddingLeft: 50,
              fontWeight: "bold",
            }}
          >
            Trip No.
          </Text>
          <Text
            style={{
              width: Viewport.width * 0.35,
              fontSize: FontSizes.small,
              paddingLeft: 40,
              fontWeight: "bold",
            }}
          >
            Time
          </Text>
          <Text
            style={{
              width: Viewport.width * 0.35,
              fontSize: FontSizes.small,
              paddingLeft: 5,
              fontWeight: "bold",
            }}
          >
            Destination
          </Text>
        </View>
        <ScrollView>
          {scheduleData.length === 0 ? (
            <Text
              style={{
                fontSize: FontSizes.small,
                textAlign: "center",
                marginTop: 15,
              }}
            >
              No trips for today
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
                      width: Viewport.width * 0.1,
                      fontSize: FontSizes.small,
                      marginLeft: 25,
                      textAlign: "center",
                    }}
                  >
                    {schedule.trip_number}
                  </Text>
                  <Text
                    style={{
                      width: Viewport.width * 0.25,
                      fontSize: FontSizes.small,
                      marginLeft: 55,
                      textAlign: "center",
                    }}
                  >
                    {schedule.time}
                  </Text>
                  <Text
                    style={{
                      width: Viewport.width * 0.25,

                      fontSize: FontSizes.small,
                      textAlign: "center",
                      marginLeft: 20,
                    }}
                  >
                    {schedule.destination}
                  </Text>
                </View>
              </TouchableOpacity>
            ))
          )}
        </ScrollView>
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
              height: Viewport.height * 0.5,
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
            <ScrollView>
              {selectedTrip.map((trip, index) => (
                <View key={index}>
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
                    {trip.passenger_name.join(", ")}
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
                    {trip.date}
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
                    {trip.time}
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
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
}
