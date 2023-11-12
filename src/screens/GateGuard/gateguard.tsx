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
import { BarCodeScanner } from "expo-barcode-scanner";
import Confirmation from "../../components/modals/confirmation";
import { fetchOnTrips, tripScanned } from "../../components/api/api";

export default function GateGuard() {
  const [onTripsData, setOnTripsData] = useState<any[]>([]);
  const [selectedTrip, setSelectedTrip] = useState<Schedule[]>([]);
  const [isTripDetailsShow, setIsTripDetailsShow] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [scanButtonPressed, setScanButtonPressed] = useState(false);

  useEffect(() => {
    fetchOnTrips(setOnTripsData);
  }, []);

  const handleScanButtonPress = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === "granted");
    if (hasPermission) {
      setScanButtonPressed(true);
    }
  };

  const handleQRCodeScanned = ({
    type,
    data,
  }: {
    type: string;
    data: string;
  }) => {
    tripScanned(data, setScanned, fetchOnTrips, setOnTripsData);
  };
  const handleCloseScanner = () => {
    setScanButtonPressed(false);
    setScanned(false);
  };
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
      <View
        style={[
          {
            flex: 1,
            backgroundColor: Colors.secondaryColor1,
          },
          Styles.flexColumn,
        ]}
      >
        {!scanButtonPressed && !scanned && (
          <Button
            text="Scan Trip Ticket QR code"
            largeSize
            onPress={handleScanButtonPress}
            style={{ marginTop: Viewport.height * 0.03 }}
          />
        )}
        {scanButtonPressed && hasPermission && (
          <Modal
            animationType="fade"
            transparent={true}
            onRequestClose={handleCloseScanner}
          >
            <View
              style={[
                {
                  width: Viewport.width * 1,
                  height: Viewport.height * 1,
                  backgroundColor: Colors.secondaryColor2,
                },
                Styles.flexColumn,
              ]}
            >
              <BarCodeScanner
                style={StyleSheet.absoluteFillObject}
                onBarCodeScanned={scanned ? undefined : handleQRCodeScanned}
              />
            </View>
          </Modal>
        )}

        <View
          style={{
            height: Viewport.height * 0.43,
          }}
        >
          <Text
            style={[
              {
                fontSize: FontSizes.small,
                color: Colors.primaryColor1,
                fontWeight: "bold",
                marginTop: Viewport.height * 0.02,
                marginLeft: Viewport.width * 0.06,
              },
            ]}
          >
            Ongoing Trips
          </Text>
          <ScrollView>
            {onTripsData.length === 0 ? (
              <Text
                style={{
                  fontSize: FontSizes.small,
                  textAlign: "center",
                  marginTop: 15,
                }}
              >
                No ongoing trips for today
              </Text>
            ) : (
              onTripsData.map((inprogress, index) => (
                <TouchableOpacity
                  onPress={() => handleShowTripDetails(inprogress)}
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
                        width: Viewport.width * 0.4,
                        fontSize: FontSizes.small,
                        textAlign: "center",
                      }}
                    >
                      {inprogress.vehicle__plate_number}
                    </Text>
                    <Text
                      style={{
                        width: Viewport.width * 0.25,
                        fontSize: FontSizes.small,
                        textAlign: "center",
                      }}
                    >
                      {inprogress.departure_time_from_office}
                    </Text>
                    <Text
                      style={{
                        width: Viewport.width * 0.25,
                        fontSize: FontSizes.small,
                        textAlign: "center",
                      }}
                    >
                      {inprogress.destination}
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
      <Confirmation
        visible={scanned}
        animationType="fade"
        transparent={true}
        content="Trip Authorized!"
        onRequestClose={handleCloseScanner}
        showContent
        adjustedSize
      />
    </>
  );
}
