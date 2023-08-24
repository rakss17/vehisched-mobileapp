import { useState, useEffect } from "react";
import { View, Text, ScrollView, Modal, TouchableOpacity } from "react-native";
import Header from "../../components/header/header";
import Button from "../../components/buttons/button";
import {
  Viewport,
  FontSizes,
  Styles,
  Colors,
} from "../../styles/globalstyles/globalstyles";
import { BackgroundColor } from "../../styles/globalstyles/globalstyles";
import { todayMockData } from "../../components/mockdata/mockdata";
import { Schedule } from "../../interfaces/interfaces";

export default function Trips() {
  const [tripData, setTripData] = useState<Schedule[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>("Reschedule");
  const [isTripDetailsShow, setIsTripDetailsShow] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<Schedule[]>([]);

  const handleButtonPress = (status: string) => {
    setSelectedStatus(status);
    let filteredTrips: Schedule[] = [];

    switch (status) {
      case "Reschedule":
        filteredTrips = todayMockData.filter(
          (trip) => trip.status === "Reschedule"
        );
        break;
      case "Completed":
        filteredTrips = todayMockData.filter(
          (trip) => trip.status === "Completed"
        );
        break;
      case "Canceled":
        filteredTrips = todayMockData.filter(
          (trip) => trip.status === "Canceled"
        );
        break;
      default:
        filteredTrips = [];
        break;
    }

    setTripData(filteredTrips);
  };
  useEffect(() => {
    handleButtonPress("Reschedule");
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
            Trips
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
            text="Reschedule"
            transparentBG2
            transparentText2
            isHighlighted={selectedStatus === "Reschedule"}
            onPress={() => handleButtonPress("Reschedule")}
          />
          <Button
            text="Completed"
            transparentBG2
            transparentText2
            isHighlighted={selectedStatus === "Completed"}
            onPress={() => handleButtonPress("Completed")}
          />
          <Button
            text="Canceled"
            transparentBG2
            transparentText2
            isHighlighted={selectedStatus === "Canceled"}
            onPress={() => handleButtonPress("Canceled")}
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
          style={{
            flexDirection: "row",
            marginTop: 10,
            width: Viewport.width * 1,
          }}
        >
          <Text
            style={{
              fontSize: FontSizes.small,
              width: Viewport.width * 0.15,
              textAlign: "center",
              fontWeight: "bold",
              marginLeft: Viewport.width * 0.06,
            }}
          >
            Trip No.
          </Text>
          <Text
            style={{
              fontSize: FontSizes.small,
              width: Viewport.width * 0.15,
              textAlign: "center",
              fontWeight: "bold",
              marginLeft: Viewport.width * 0.05,
            }}
          >
            Time
          </Text>
          <Text
            style={{
              fontSize: FontSizes.small,
              width: Viewport.width * 0.15,
              textAlign: "center",
              fontWeight: "bold",
              marginLeft: Viewport.width * 0.12,
            }}
          >
            Date
          </Text>
          <Text
            style={{
              fontSize: FontSizes.small,
              width: Viewport.width * 0.23,
              textAlign: "center",
              fontWeight: "bold",
              marginLeft: Viewport.width * 0.06,
            }}
          >
            Destination
          </Text>
        </View>
        <ScrollView>
          {tripData.length === 0 ? (
            <Text
              style={{
                fontSize: FontSizes.small,
                textAlign: "center",
                marginTop: 15,
              }}
            >
              No vehicles available
            </Text>
          ) : (
            tripData.map((trip, index) => (
              <TouchableOpacity
                onPress={() => handleShowTripDetails(trip)}
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
                      width: Viewport.width * 0.06,
                      fontSize: FontSizes.small,
                      marginLeft: Viewport.width * 0.05,
                      textAlign: "center",
                    }}
                  >
                    {trip.trip_number}
                  </Text>
                  <Text
                    style={{
                      width: Viewport.width * 0.25,
                      fontSize: FontSizes.small,
                      marginLeft: Viewport.width * 0.07,
                      textAlign: "center",
                    }}
                  >
                    {trip.time}
                  </Text>
                  <Text
                    style={{
                      width: Viewport.width * 0.25,
                      fontSize: FontSizes.small,
                      marginLeft: Viewport.width * 0.02,
                      textAlign: "center",
                    }}
                  >
                    {trip.date}
                  </Text>
                  <Text
                    style={{
                      width: Viewport.width * 0.2,
                      fontSize: FontSizes.small,
                      textAlign: "center",
                      marginLeft: Viewport.width * 0.02,
                    }}
                    numberOfLines={2}
                    ellipsizeMode="tail"
                  >
                    {trip.destination}
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
              paddingVertical: Viewport.height * 0.0,
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
                      Passenger's name{"("}s{")"}:
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
