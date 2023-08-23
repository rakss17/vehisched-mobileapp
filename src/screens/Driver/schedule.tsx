import { useState, useEffect } from "react";
import { View, Text, ScrollView, Modal } from "react-native";
import {
  Viewport,
  Styles,
  FontSizes,
  Colors,
} from "../../styles/globalstyles/globalstyles";
import { BackgroundColor } from "../../styles/globalstyles/globalstyles";
import Header from "../../components/header/header";
import Button from "../../components/buttons/button";
import { todayMockData } from "../../components/mockdata/mockdata";
import { Schedule } from "../../interfaces/interfaces";
import QRCode from "react-native-qrcode-svg";

export default function Schedules() {
  const [scheduleData, setScheduleData] = useState<Schedule[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>("Today");
  const [showQRCodeIndex, setShowQRCodeIndex] = useState<number | null>(null);
  const [passengersModalVisible, setPassengersModalVisible] = useState(false);
  const [selectedPassengers, setSelectedPassengers] = useState<string[]>([]);

  const handleShowPassengersModal = (passengers: string[]) => {
    setSelectedPassengers(passengers);
    setPassengersModalVisible(true);
  };

  const handleClosePassengersModal = () => {
    setPassengersModalVisible(false);
  };

  const handleShowQRCode = (index: number) => {
    if (showQRCodeIndex === index) {
      setShowQRCodeIndex(null);
    } else {
      setShowQRCodeIndex(index);
    }
  };
  const handleHideQRCode = () => {
    setShowQRCodeIndex(null);
  };

  const handleButtonPress = (status: string) => {
    setSelectedStatus(status);
    switch (status) {
      case "Today":
        setScheduleData(todayMockData);
        break;
      case "In Progress":
        setScheduleData(todayMockData);
        break;
      case "Upcoming":
        setScheduleData(todayMockData);
        break;
      default:
        setScheduleData([]);
        break;
    }
    setSelectedStatus(status);
  };
  useEffect(() => {
    handleButtonPress("Today");
  }, []);
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
            text="In progress"
            transparentBG2
            transparentText2
            isHighlighted={selectedStatus === "In Progress"}
            onPress={() => handleButtonPress("In Progress")}
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
              paddingBottom: Viewport.height * 0.35,
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
                <View
                  key={index}
                  style={{
                    backgroundColor: Colors.primaryColor2,
                    marginTop: 20,
                    paddingLeft: 20,
                    width: Viewport.width * 0.95,
                    height: Viewport.height * 0.4,
                    elevation: 4,
                  }}
                >
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
                          color: Colors.secondaryColor2,
                          fontWeight: "bold",
                          marginTop: Viewport.height * 0.03,
                          marginLeft: Viewport.width * 0.05,
                        },
                      ]}
                    >
                      Trip {schedule.trip_number}
                    </Text>
                  </View>
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
                          fontSize: FontSizes.small,
                          color: Colors.secondaryColor2,
                          fontWeight: "bold",
                          marginLeft: Viewport.width * 0.05,
                          marginTop: Viewport.height * 0.03,
                        },
                      ]}
                    >
                      Date: {schedule.date}
                    </Text>
                    <Text
                      style={[
                        {
                          fontSize: FontSizes.small,
                          color: Colors.secondaryColor2,
                          fontWeight: "bold",
                          marginLeft: Viewport.width * 0.1,
                          marginTop: Viewport.height * 0.03,
                        },
                      ]}
                    >
                      Time: {schedule.time}
                    </Text>
                  </View>
                  <Text
                    style={[
                      {
                        fontSize: FontSizes.small,
                        color: Colors.secondaryColor2,
                        marginLeft: Viewport.width * 0.05,
                        marginTop: Viewport.height * 0.03,
                      },
                    ]}
                  >
                    <Text style={{ fontWeight: "bold" }}>Destination:</Text>{" "}
                    {schedule.destination}
                  </Text>
                  <View
                    style={{
                      marginTop: Viewport.height * 0.03,
                      height: Viewport.height * 0.09,
                    }}
                  >
                    <Text
                      style={[
                        {
                          fontSize: FontSizes.small,
                          color: Colors.secondaryColor2,
                          marginLeft: Viewport.width * 0.05,
                        },
                      ]}
                    >
                      <Text style={{ fontWeight: "bold" }}>Passengers: </Text>
                      {schedule.requester_name},{" "}
                      {schedule.passenger_name &&
                      schedule.passenger_name.length > 0 ? (
                        schedule.passenger_name.length > 1 ? (
                          <Text>
                            {schedule.passenger_name.slice(0, 4).join(", ")}
                            <Text
                              onPress={() =>
                                handleShowPassengersModal(
                                  schedule.passenger_name
                                )
                              }
                              style={{ fontWeight: "normal" }}
                            >
                              {" "}
                              and view more...
                            </Text>
                          </Text>
                        ) : (
                          schedule.passenger_name[0]
                        )
                      ) : (
                        "No passenger(s)"
                      )}
                    </Text>
                  </View>

                  <View
                    style={{
                      alignItems: "center",
                    }}
                  >
                    <Button
                      text={
                        selectedStatus === "Upcoming"
                          ? "Upcoming"
                          : selectedStatus === "In Progress"
                          ? "Completed?"
                          : "QR code"
                      }
                      defaultBG
                      onPress={() => handleShowQRCode(index)}
                      disabled={selectedStatus === "Upcoming"}
                      style={
                        selectedStatus === "In Progress"
                          ? { backgroundColor: "green" }
                          : null
                      }
                    />
                    {showQRCodeIndex === index && (
                      <Modal
                        animationType="fade"
                        transparent={true}
                        onRequestClose={handleHideQRCode}
                      >
                        <View
                          style={[
                            {
                              flex: 1,
                              backgroundColor: "rgba(0, 0, 0, 0.5)",
                            },
                            Styles.flexColumn,
                          ]}
                        >
                          <View
                            style={[
                              {
                                backgroundColor: Colors.primaryColor2,
                                width: Viewport.width * 0.9,
                                height: Viewport.height * 0.4,
                                gap: 20,
                                borderRadius: 10,
                              },
                              Styles.flexColumn,
                            ]}
                          >
                            <Text
                              style={[
                                {
                                  fontSize: FontSizes.normal,
                                  color: Colors.primaryColor1,
                                  fontWeight: "bold",
                                },
                              ]}
                            >
                              Trip Ticket
                            </Text>
                            <QRCode
                              value={JSON.stringify(schedule)}
                              size={200}
                            />
                          </View>
                        </View>
                      </Modal>
                    )}
                  </View>
                </View>
              ))
            )}
          </ScrollView>
        </View>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={passengersModalVisible}
        onRequestClose={handleClosePassengersModal}
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
              padding: 15,
              borderRadius: 10,
              width: Viewport.width * 0.8,
              height: Viewport.height * 0.3,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: FontSizes.normal,
                fontWeight: "bold",
                marginBottom: 10,
              }}
            >
              All Passengers
            </Text>
            <ScrollView>
              {selectedPassengers.map((passenger, index) => (
                <Text
                  key={index}
                  style={{
                    fontSize: FontSizes.small,
                    marginBottom: 5,
                  }}
                >
                  {passenger}
                </Text>
              ))}
            </ScrollView>
            <Button
              text="Close"
              defaultBG
              onPress={handleClosePassengersModal}
            />
          </View>
        </View>
      </Modal>
    </>
  );
}
