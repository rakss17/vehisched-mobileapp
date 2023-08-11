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

const fetchedVehicles: Vehicle[] = [
  {
    id: 1,
    vehicle_name: "KDA 1368 Toyota Hilux",
    capacity: 5,
    vehicle_type: "Pickup Truck",
    vehicle_image: require("../../../assets/toyota-hilux.jpg"),
    status: "On Trip",
  },
  {
    id: 2,
    vehicle_name: "KCU 2522 Montero Sport",
    capacity: 7,
    vehicle_type: "SUV",
    vehicle_image: require("../../../assets/mitsubishi-montero.jpg"),
    status: "Available",
  },
  {
    id: 3,
    vehicle_name: "KAB 2855 Fortuner",
    capacity: 7,
    vehicle_type: "SUV",
    vehicle_image: require("../../../assets/fortuner.jpg"),
    status: "On Trip",
  },
  {
    id: 4,
    vehicle_name: "KYZ 2069 Toyota Hiace",
    capacity: 15,
    vehicle_type: "Van",
    vehicle_image: require("../../../assets/toyota-hiace.png"),
    status: "Available",
  },
  {
    id: 5,
    vehicle_name: "KDA 1368 Toyota Hilux",
    capacity: 5,
    vehicle_type: "Pickup Truck",
    vehicle_image: require("../../../assets/toyota-hilux.jpg"),
    status: "Unavailable",
  },
  {
    id: 6,
    vehicle_name: "KYZ 2069 Toyota Hiace",
    capacity: 15,
    vehicle_type: "Van",
    vehicle_image: require("../../../assets/toyota-hiace.png"),
    status: "Unavailable",
  },
];
export default function Requester() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const fetchedVehicleList = () => {
    setVehicles(fetchedVehicles);
  };

  useEffect(() => {
    fetchedVehicleList();
  }, []);
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
          <Button defaultBG text="Set Trip" />
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
    </>
  );
}
