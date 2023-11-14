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
import { BarCodeScanner } from "expo-barcode-scanner";
import Confirmation from "../../components/modals/confirmation";
import { fetchOnTrips, tripScanned } from "../../components/api/api";
import { formatDateTime, formatTime } from "../../components/function/function";

export default function GateGuard() {
  const [onTripsData, setOnTripsData] = useState<any[]>([]);
  const [selectedTrip, setSelectedTrip] = useState<any[]>([]);
  const [isTripDetailsShow, setIsTripDetailsShow] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scannedAuthorized, setScannedAuthorized] = useState(false);
  const [scannedCompleted, setScannedCompleted] = useState(false);
  const [scannedAlreadyCompleted, setScannedAlreadyCompleted] = useState(false);
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
    setScanButtonPressed(false);
    tripScanned(
      data,
      setScannedAuthorized,
      setScannedCompleted,
      setScannedAlreadyCompleted,
      fetchOnTrips,
      setOnTripsData,
      setScanButtonPressed
    );
  };
  const handleCloseScanner = () => {
    setScanButtonPressed(false);
    setScannedAuthorized(false);
    setScannedCompleted(false);
    setScannedAlreadyCompleted(false);
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
        {!scanButtonPressed &&
          !scannedAuthorized &&
          !scannedCompleted &&
          !scannedAlreadyCompleted && (
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
                onBarCodeScanned={
                  scannedAuthorized && scannedCompleted
                    ? undefined
                    : handleQRCodeScanned
                }
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
                      paddingLeft: Viewport.width * 0.01,
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
                      {inprogress.vehicle__plate_number}{" "}
                      {inprogress.vehicle__model}
                    </Text>
                    <Text
                      style={{
                        width: Viewport.width * 0.25,
                        fontSize: FontSizes.small,
                        textAlign: "center",
                      }}
                    >
                      {formatDateTime(inprogress.departure_time_from_office)}
                    </Text>
                    <Text
                      style={{
                        width: Viewport.width * 0.3,
                        fontSize: FontSizes.small,
                        textAlign: "center",
                      }}
                    >
                      {inprogress.destination.split(",")[0].trim()}
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
                    {trip.travel_date}, {formatTime(trip.travel_time)}
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
                    {trip.return_date}, {formatTime(trip.return_time)}
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
                    <Text style={{ fontWeight: "bold" }}>Arrival:</Text> Not yet
                    arrived
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
        visible={scannedAuthorized}
        animationType="fade"
        transparent={true}
        content="Trip Authorized!"
        onRequestClose={handleCloseScanner}
        showContent
        adjustedSize
      />
      <Confirmation
        visible={scannedCompleted}
        animationType="fade"
        transparent={true}
        content="Trip Completed!"
        onRequestClose={handleCloseScanner}
        showContent
        adjustedSize
      />
      <Confirmation
        visible={scannedAlreadyCompleted}
        animationType="fade"
        transparent={true}
        content="Trip Already Completed!"
        onRequestClose={handleCloseScanner}
        showContent
        adjustedSize
      />
    </>
  );
}
