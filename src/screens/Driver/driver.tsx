import { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import Header from "../../components/header/header";
import { BackgroundColor } from "../../styles/globalstyles/globalstyles";
import {
  Viewport,
  Styles,
  FontSizes,
  Colors,
} from "../../styles/globalstyles/globalstyles";
import { todayMockData } from "../../components/mockdata/mockdata";
import { Schedule } from "../../interfaces/interfaces";

export default function Driver() {
  const [scheduleData, setScheduleData] = useState<Schedule[]>([]);
  useEffect(() => {
    setScheduleData(todayMockData);
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
            Today's Trip
          </Text>
        </View>
        <BackgroundColor
          style={{
            width: Viewport.width * 1,
            height: Viewport.height * 0.01,
            marginTop: Viewport.width * 0.02,
          }}
        />
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <Text
            style={{
              width: Viewport.width * 0.35,
              fontSize: FontSizes.small,
              paddingLeft: 50,
              fontWeight: "bold",
            }}
          >
            Trip No.
          </Text>
          <Text
            style={{
              width: Viewport.width * 0.35,
              fontSize: FontSizes.small,
              paddingLeft: 40,
              fontWeight: "bold",
            }}
          >
            Time
          </Text>
          <Text
            style={{
              width: Viewport.width * 0.35,
              fontSize: FontSizes.small,
              paddingLeft: 5,
              fontWeight: "bold",
            }}
          >
            Destination
          </Text>
        </View>
        <ScrollView>
          {scheduleData.length === 0 ? (
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
            scheduleData.map((schedule, index) => (
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
                    width: Viewport.width * 0.1,
                    fontSize: FontSizes.small,
                    marginLeft: 25,
                    textAlign: "center",
                  }}
                >
                  {schedule.trip_number}
                </Text>
                <Text
                  style={{
                    width: Viewport.width * 0.25,
                    fontSize: FontSizes.small,
                    marginLeft: 55,
                    textAlign: "center",
                  }}
                >
                  {schedule.time}
                </Text>
                <Text
                  style={{
                    width: Viewport.width * 0.25,

                    fontSize: FontSizes.small,
                    textAlign: "center",
                    marginLeft: 20,
                  }}
                >
                  {schedule.destination}
                </Text>
              </View>
            ))
          )}
        </ScrollView>
      </View>
    </>
  );
}
