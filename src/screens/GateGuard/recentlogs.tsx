import React, { useState } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Modal,
  RefreshControl,
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
import { fetchRecentTrips } from "../../components/api/api";
import { useFocusEffect } from "@react-navigation/native";
import {
  formatDateTime,
  formatDate,
  formatTime,
  useAppState,
} from "../../components/function/function";

export default function RecentLogs() {
  const [recentLogsData, setRecentLogsData] = useState<any[]>([]);
  const [selectedTrip, setSelectedTrip] = useState<any[]>([]);
  const [isTripDetailsShow, setIsTripDetailsShow] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    fetchRecentTrips(setRecentLogsData, setRefreshing);
  }, []);

  useAppState(fetchRecentTrips, setRecentLogsData);

  useFocusEffect(
    React.useCallback(() => {
      fetchRecentTrips(setRecentLogsData);
    }, [])
  );

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
              gap: Viewport.width * 0.1,
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
            <Text
              style={{
                width: Viewport.width * 0.25,
                fontSize: FontSizes.small,
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Arrival
            </Text>
          </View>
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
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
                      width: Viewport.width * 1,
                      height: Viewport.height * 0.08,
                      alignItems: "center",
                      justifyContent: "space-around",
                    }}
                  >
                    <Text
                      style={{
                        width: Viewport.width * 0.3,
                        fontSize: FontSizes.small,

                        textAlign: "center",
                      }}
                    >
                      {recent.vehicle__plate_number} {recent.vehicle__model}
                    </Text>

                    <Text
                      style={{
                        width: Viewport.width * 0.3,
                        fontSize: FontSizes.small,
                        textAlign: "center",
                      }}
                    >
                      {recent.destination.split(",")[0].trim()}
                    </Text>
                    <Text
                      style={{
                        width: Viewport.width * 0.3,
                        fontSize: FontSizes.small,
                        textAlign: "center",
                      }}
                    >
                      {formatDateTime(recent.arrival_time_to_office)}
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
                    <Text style={{ fontWeight: "bold" }}>Vehicle:</Text>{" "}
                    {trip.vehicle__plate_number} {trip.vehicle__model}
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
                    <Text style={{ fontWeight: "bold" }}>Driver's name:</Text>{" "}
                    {trip.driver_name__first_name}
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
                      Scheduled return date:
                    </Text>{" "}
                    {formatDate(trip.return_date)},{" "}
                    {formatTime(trip.return_time)}
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
                    {formatDateTime(trip.departure_time_from_office)}
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
                    <Text style={{ fontWeight: "bold" }}>Arrival:</Text>{" "}
                    {formatDateTime(trip.arrival_time_to_office)}
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
