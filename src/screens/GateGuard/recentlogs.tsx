import { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
  Modal,
} from "react-native";
import {
  Viewport,
  Styles,
  FontSizes,
  Colors,
} from "../../styles/globalstyles/globalstyles";
import { BackgroundColor } from "../../styles/globalstyles/globalstyles";
import Header from "../../components/header/header";
import Button from "../../components/buttons/button";
import { Schedule } from "../../interfaces/interfaces";
import { todayMockData } from "../../components/mockdata/mockdata";

export default function RecentLogs() {
  const [recentLogsData, setRecentLogsData] = useState<Schedule[]>([]);
  const [selectedTrip, setSelectedTrip] = useState<Schedule[]>([]);
  const [isTripDetailsShow, setIsTripDetailsShow] = useState(false);

  const fetchedRecentLogs = () => {
    let filteredStatus: Schedule[] = [];

    filteredStatus = todayMockData.filter(
      (completed) => completed.status === "Completed"
    );

    setRecentLogsData(filteredStatus);
  };

  useEffect(() => {
    fetchedRecentLogs();
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
        <BackgroundColor
          style={{
            width: Viewport.width * 1,
            height: Viewport.height * 0.01,
            marginTop: Viewport.width * 0.02,
          }}
        />
        <Text
          style={[
            {
              fontSize: FontSizes.normal,
              color: Colors.primaryColor1,
              fontWeight: "bold",
              marginTop: Viewport.height * 0.02,
            },
          ]}
        >
          Recent Logs
        </Text>
        <View
          style={[
            {
              backgroundColor: Colors.primaryColor2,
              width: Viewport.width * 1,
              height: Viewport.height * 0.65,
              marginTop: Viewport.height * 0.02,
              marginBottom: Viewport.height * 0.1,
            },
            Styles.flexColumn,
          ]}
        >
          <View
            style={{
              flexDirection: "row",
              width: Viewport.width * 1,
              justifyContent: "center",
              gap: Viewport.width * 0.25,
              marginTop: Viewport.height * 0.02,
            }}
          >
            <Text
              style={{
                width: Viewport.width * 0.2,
                fontSize: FontSizes.small,
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Vehicle
            </Text>
            <Text
              style={{
                width: Viewport.width * 0.25,
                fontSize: FontSizes.small,
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Destination
            </Text>
          </View>
          <ScrollView>
            {recentLogsData.length === 0 ? (
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
              recentLogsData.map((recent, index) => (
                <TouchableOpacity
                  onPress={() => handleShowTripDetails(recent)}
                  key={index}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      backgroundColor: Colors.primaryColor2,
                      marginTop: Viewport.height * 0.01,
                      paddingLeft: Viewport.width * 0.05,
                      width: Viewport.width * 1,
                      height: Viewport.height * 0.08,
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        width: Viewport.width * 0.3,
                        fontSize: FontSizes.small,
                        marginLeft: Viewport.width * 0.06,
                        textAlign: "center",
                      }}
                    >
                      {recent.vehicle}
                    </Text>

                    <Text
                      style={{
                        width: Viewport.width * 0.5,
                        fontSize: FontSizes.small,
                        textAlign: "center",
                        marginLeft: Viewport.width * 0.08,
                      }}
                    >
                      {recent.destination}
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
              paddingVertical: Viewport.height * 0.03,
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
                    <Text style={{ fontWeight: "bold" }}>Vehicle:</Text>{" "}
                    {trip.vehicle}
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
                    <Text style={{ fontWeight: "bold" }}>Departure:</Text>{" "}
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
                    <Text style={{ fontWeight: "bold" }}>Return:</Text>{" "}
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
