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
      case "Upcoming":
        setScheduleData([]);
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
              marginLeft: 30,
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
            paddingBottom: Viewport.height * 0.32,
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
                  gap: Viewport.height * 0.03,
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
                    },
                  ]}
                >
                  <Text style={{ fontWeight: "bold" }}>Destination:</Text>{" "}
                  {schedule.destination}
                </Text>
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
                  {schedule.passenger_name && schedule.passenger_name.length > 0
                    ? schedule.passenger_name.length > 1
                      ? schedule.passenger_name.join(", ")
                      : schedule.passenger_name[0]
                    : "No passenger(s)"}
                </Text>
                <View style={{ alignItems: "center" }}>
                  <Button
                    text="QR code"
                    defaultBG
                    onPress={() => handleShowQRCode(index)}
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
                          <QRCode value={JSON.stringify(schedule)} size={200} />
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
    </>
  );
}
