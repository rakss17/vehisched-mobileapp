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
import { inProgressMockData } from "../../components/mockdata/mockdata";
import { BarCodeScanner } from "expo-barcode-scanner";
import Confirmation from "../../components/modals/confirmation";

export default function GateGuard() {
  const [inProgressData, setInProgressData] = useState<Schedule[]>([]);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [scanButtonPressed, setScanButtonPressed] = useState(false);

  useEffect(() => {
    setInProgressData(inProgressMockData);
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
    setScanned(true);
    console.log(`Data: ${data}`);
    console.log(`Type: ${type}`);
  };
  const handleCloseScanner = () => {
    setScanButtonPressed(false);
    setScanned(false);
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
            marginBottom: Viewport.height * 0.02,
          }}
        />
        {!scanButtonPressed && !scanned && (
          <Button
            text="Scan Trip Ticket QR code"
            largeSize
            onPress={handleScanButtonPress}
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
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
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
            height: Viewport.height * 0.55,
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
            In progress trips
          </Text>
          {inProgressData.length === 0 ? (
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
            inProgressData.map((inprogress, index) => (
              <TouchableOpacity
                // onPress={() => handleShowTripDetails(schedule)}
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
                      width: Viewport.width * 0.1,
                      fontSize: FontSizes.small,
                      marginLeft: 25,
                      textAlign: "center",
                    }}
                  >
                    {inprogress.trip_number}
                  </Text>
                  <Text
                    style={{
                      width: Viewport.width * 0.25,
                      fontSize: FontSizes.small,
                      marginLeft: 55,
                      textAlign: "center",
                    }}
                  >
                    {inprogress.time}
                  </Text>
                  <Text
                    style={{
                      width: Viewport.width * 0.25,

                      fontSize: FontSizes.small,
                      textAlign: "center",
                      marginLeft: 20,
                    }}
                  >
                    {inprogress.destination}
                  </Text>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>
      </View>
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
