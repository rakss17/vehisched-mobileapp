import { useEffect, useState } from "react";
import { View, Image, Text } from "react-native";
import {
  Viewport,
  Styles,
  BackgroundColor,
  FontSizes,
  Colors,
} from "../../styles/globalstyles/globalstyles";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "../../interfaces/interfaces";
import Dropdown from "../dropdown/dropdown";
import { SignoutAPI } from "../api/api";

export default function Header() {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation<NavigationProp>();
  const handleDropdown = (options: string) => {
    if (options === "Sign Out") {
      setIsLoading(true);
      SignoutAPI(navigation, setIsLoading);
    } else {
      alert("Under Development");
    }
  };

  useEffect(() => {
    if (isLoading) {
      navigation.navigate("LoadingScreen", { message: "Signing out" });
    }
  }, [isLoading]);
  return (
    <>
      <BackgroundColor
        style={{
          width: Viewport.width * 1,
          height: Viewport.height * 0.1,
        }}
      >
        <View
          style={[
            {
              width: Viewport.width * 1,
              height: Viewport.height * 0.1,
              paddingLeft: Viewport.width * 0.05,
              gap: Viewport.width * 0.42,
            },
            Styles.flexRow,
          ]}
        >
          <View style={Styles.flexRow}>
            <Image
              style={{
                width: Viewport.width * 0.1,
                height: Viewport.height * 0.1,
                resizeMode: "contain",
              }}
              source={require("../../../assets/logo.png")}
            />
            <Text
              style={{
                fontSize: FontSizes.normal,
                color: Colors.secondaryColor1,
              }}
            >
              Vehi-Sched
            </Text>
          </View>

          <Dropdown
            showIcon
            options={["Profile", "Settings", "Sign Out"]}
            onCategoryChange={handleDropdown}
          />
        </View>
      </BackgroundColor>
    </>
  );
}
