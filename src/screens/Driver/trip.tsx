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
      </View>
    </>
  );
}
