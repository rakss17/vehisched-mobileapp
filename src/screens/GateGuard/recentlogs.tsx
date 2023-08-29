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

export default function RecentLogs() {
  const [recentLogsData, setRecentLogsData] = useState<Schedule[]>([]);

  const fetchedRecentLogs = () => {
    let filteredStatus: Schedule[] = [];
    filteredStatus = todayMockData.filter(
      (completed) => completed.status === "Completed"
    );

    setRecentLogsData(filteredStatus);
  };

  useEffect(() => {
    fetchedRecentLogs();
  }, []);

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
              gap: 10,
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
                width: Viewport.width * 0.2,
                fontSize: FontSizes.small,
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Departure
            </Text>
            <Text
              style={{
                width: Viewport.width * 0.2,
                fontSize: FontSizes.small,
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Return
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
          </View>
          <ScrollView>
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
                  //   onPress={() => handleShowTripDetails(inprogress)}
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
                        width: Viewport.width * 0.1,
                        fontSize: FontSizes.small,
                        marginLeft: Viewport.width * 0.06,
                        textAlign: "center",
                      }}
                    >
                      {recent.trip_number}
                    </Text>
                    <Text
                      style={{
                        width: Viewport.width * 0.25,
                        fontSize: FontSizes.small,
                        marginLeft: Viewport.width * 0.1,
                        textAlign: "center",
                      }}
                    >
                      {recent.time}
                    </Text>
                    <Text
                      style={{
                        width: Viewport.width * 0.25,

                        fontSize: FontSizes.small,
                        textAlign: "center",
                        marginLeft: Viewport.width * 0.08,
                      }}
                    >
                      {recent.destination}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))
            )}
          </ScrollView>
        </View>
      </View>
    </>
  );
}
