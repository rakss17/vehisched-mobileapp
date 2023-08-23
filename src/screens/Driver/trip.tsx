import { useState, useEffect } from "react";
import { View, Text, ScrollView, Modal } from "react-native";
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
  const handleButtonPress = (status: string) => {
    setSelectedStatus(status);
    switch (status) {
      case "Reschedule":
        setTripData(todayMockData);
        break;
      case "Completed":
        setTripData(todayMockData);
        break;
      case "Canceled":
        setTripData(todayMockData);
        break;
      default:
        setTripData([]);
        break;
    }
    setSelectedStatus(status);
  };
  useEffect(() => {
    handleButtonPress("Reschedule");
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
              <View
                key={index}
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
                    width: Viewport.width * 0.03,
                    fontSize: FontSizes.small,
                    marginLeft: Viewport.width * 0.07,
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
                >
                  {trip.destination}
                </Text>
              </View>
            ))
          )}
        </ScrollView>
      </View>
    </>
  );
}
