import { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import {
  BackgroundColor,
  Styles,
  Viewport,
  FontSizes,
  Colors,
} from "../../styles/globalstyles/globalstyles";
import Header from "../../components/header/header";
import Button from "../../components/buttons/button";
import { Vehicle } from "../../interfaces/interfaces";
import { vehiclesMockData } from "../../components/mockdata/mockdata";
import SetTripModal from "../../components/modals/settrip";
import RequestForm from "../../components/modals/requestform";
import PromptDialog from "../../components/modals/promptdialog";

export default function Requester() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isSetTripVisible, setIsSetTripVisible] = useState(false);
  const [isRequestFormVisible, setIsRequestFormVisible] = useState(false);
  const [isVehicleVip, setIsVehicleVip] = useState(false);
  const fetchedVehicleList = () => {
    setVehicles(vehiclesMockData);
  };

  useEffect(() => {
    fetchedVehicleList();
  }, []);

  const handleSetTripVisible = () => {
    setIsSetTripVisible(true);
  };

  const handleSetTripClose = () => {
    setIsSetTripVisible(false);
  };

  const handleRequestFormVisible = (vehicle: Vehicle) => {
    if (vehicle.isVip) {
      setIsVehicleVip(true);
    } else {
      setIsRequestFormVisible(true);
    }
  };

  const handleRequestFormClose = () => {
    setIsRequestFormVisible(false);
    setIsVehicleVip(false);
  };
  const handleOnNextPressed = () => {
    setIsVehicleVip(false);
    setIsRequestFormVisible(true);
  };
  return (
    <>
      <BackgroundColor
        style={{ width: Viewport.width * 1, height: Viewport.height * 0.04 }}
      />
      <Header />
      <View style={Styles.container}>
        <View style={[{ gap: Viewport.width * 0.2 }, Styles.flexRow]}>
          <Text
            style={{
              fontSize: FontSizes.normal,
              color: Colors.primaryColor1,
              fontWeight: "bold",
            }}
          >
            Available Vehicles
          </Text>
          <Button onPress={handleSetTripVisible} defaultBG text="Set Trip" />
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
              width: Viewport.width * 1,
              height: Viewport.height * 0.85,
            },
            Styles.flexColumn,
          ]}
        >
          <ScrollView
            contentContainerStyle={{
              gap: Viewport.height * 0.01,
              paddingTop: Viewport.width * 0.1,
              paddingBottom: Viewport.width * 0.45,
            }}
          >
            {vehicles.length === 0 ? (
              <Text>No vehicles available</Text>
            ) : (
              vehicles.map((vehicle) => (
                <TouchableOpacity
                  onPress={() => handleRequestFormVisible(vehicle)}
                  key={vehicle.id}
                  style={[
                    {
                      width: Viewport.width * 0.95,
                      height: Viewport.height * 0.2,
                      backgroundColor: Colors.primaryColor2,
                      borderRadius: 10,
                    },
                    Styles.flexRow,
                  ]}
                >
                  <View
                    style={[
                      {
                        width: Viewport.width * 0.45,
                        height: Viewport.height * 0.2,
                        paddingLeft: Viewport.height * 0.01,
                        gap: Viewport.height * 0.02,
                      },
                      Styles.flexColumn,
                    ]}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        textAlign: "center",
                        fontSize: FontSizes.normal,
                      }}
                    >
                      {vehicle.vehicle_name}
                    </Text>
                    <View>
                      <Text
                        style={{
                          fontSize: FontSizes.small,
                          textAlign: "left",
                        }}
                      >
                        Seating Capacity: {vehicle.capacity}
                      </Text>
                      <Text
                        style={{
                          fontSize: FontSizes.small,
                          textAlign: "left",
                        }}
                      >
                        Type: {vehicle.vehicle_type}
                      </Text>
                    </View>
                  </View>
                  <Image
                    style={{
                      width: Viewport.width * 0.47,
                      height: Viewport.height * 0.15,
                    }}
                    resizeMode="cover"
                    source={vehicle.vehicle_image}
                  />
                </TouchableOpacity>
              ))
            )}
          </ScrollView>
        </View>
      </View>
      <SetTripModal
        animationType="fade"
        visible={isSetTripVisible}
        transparent={true}
        onRequestClose={handleSetTripClose}
      />
      <RequestForm
        animationType="fade"
        visible={isRequestFormVisible}
        transparent={true}
        onRequestClose={handleRequestFormClose}
      />
      <PromptDialog
        animationType="fade"
        visible={isVehicleVip}
        transparent={true}
        onRequestClose={handleRequestFormClose}
        header="Disclaimer:"
        content="This vehicle is prioritized for the chancellor, and your reservation will be canceled once the chancellor 
        uses it during your trip."
        footer="Are you sure you want to use this vehicle?"
        onNextPressed={handleOnNextPressed}
      />
    </>
  );
}
