import React, { useState, useEffect } from "react";
import {
  RefreshControl,
  View,
  Text,
  ScrollView,
  Modal,
  TouchableOpacity,
} from "react-native";
import Header from "../../components/header/header";
import Button from "../../components/buttons/button";
import {
  Viewport,
  FontSizes,
  Styles,
  Colors,
} from "../../styles/globalstyles/globalstyles";
import { BackgroundColor } from "../../styles/globalstyles/globalstyles";
import { Schedule } from "../../interfaces/interfaces";
import { fetchDriverTrips } from "../../components/api/api";
import { useFocusEffect } from "@react-navigation/native";
import {
  formatDate,
  formatTime,
  formatDateTime,
  useAppState,
} from "../../components/function/function";

export default function Trips() {
  const [originalTripData, setOriginalTripData] = useState<any[]>([]);
  const [tripData, setTripData] = useState<any[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>("Rescheduled");
  const [isTripDetailsShow, setIsTripDetailsShow] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<any[]>([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    fetchDriverTrips(setOriginalTripData, setRefreshing);
  }, []);

  useAppState(fetchDriverTrips, setOriginalTripData);

  useFocusEffect(
    React.useCallback(() => {
      fetchDriverTrips(setOriginalTripData);
    }, [])
  );

  useEffect(() => {
    if (originalTripData.length > 0) {
      handleButtonPress("Rescheduled");
    }
  }, [originalTripData]);

  const handleButtonPress = (status: string) => {
    setSelectedStatus(status);
    let filteredTrips: any[] = [];

    switch (status) {
      case "Rescheduled":
        filteredTrips = originalTripData.filter(
          (trip) => trip.status === "Rescheduled"
        );
        break;
      case "Completed":
        filteredTrips = originalTripData.filter(
          (trip) => trip.status === "Completed"
        );
        break;
      case "Canceled":
        filteredTrips = originalTripData.filter(
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
    handleButtonPress("Rescheduled");
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
            text="Rescheduled"
            transparentBG2
            transparentText2
            isHighlighted={selectedStatus === "Rescheduled"}
            onPress={() => handleButtonPress("Rescheduled")}
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
              width: Viewport.width * 0.2,
              height: "auto",
              fontSize: FontSizes.small,
              marginLeft: 25,
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Vehicle
          </Text>

          <>
            <Text
              style={{
                width: Viewport.width * 0.3,
                fontSize: FontSizes.small,
                marginLeft: 30,
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Date & Time
            </Text>
            <Text
              style={{
                fontSize: FontSizes.small,
                width: Viewport.width * 0.23,
                textAlign: "center",
                fontWeight: "bold",
                marginLeft: 25,
              }}
            >
              Destination
            </Text>
          </>
        </View>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {tripData.length === 0 ? (
            <Text
              style={{
                fontSize: FontSizes.small,
                textAlign: "center",
                marginTop: 15,
              }}
            >
              No trips available
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
                      width: Viewport.width * 0.2,
                      height: "auto",
                      fontSize: FontSizes.small,
                      marginLeft: 5,
                      textAlign: "center",
                    }}
                  >
                    {trip.vehicle__plate_number} {trip.vehicle__model}
                  </Text>

                  <>
                    <Text
                      style={{
                        width: Viewport.width * 0.25,
                        fontSize: FontSizes.small,
                        marginLeft: 40,
                        textAlign: "center",
                      }}
                    >
                      {formatDate(trip.travel_date)},{" "}
                      {formatTime(trip.travel_time)}
                    </Text>
                    <Text
                      style={{
                        width: Viewport.width * 0.25,

                        fontSize: FontSizes.small,
                        textAlign: "center",
                        marginLeft: 30,
                      }}
                    >
                      {trip.destination.split(",")[0].trim()}
                    </Text>
                  </>
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
                    Trip no. {trip.id}
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
                    {trip.requester_name__first_name}
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
                    <Text style={{ fontWeight: "bold" }}>
                      Scheduled travel date:
                    </Text>{" "}
                    {formatDate(trip.travel_date)},{" "}
                    {formatTime(trip.travel_time)}
                  </Text>

                  <>
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
                      {formatDateTime(trip.departure_time_from_office)}
                    </Text>
                  </>

                  <Text
                    style={[
                      {
                        fontSize: FontSizes.small,
                        color: Colors.secondaryColor2,

                        marginTop: Viewport.height * 0.03,
                      },
                    ]}
                  >
                    <Text style={{ fontWeight: "bold" }}>Travel type:</Text>{" "}
                    {trip.type__name}
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
