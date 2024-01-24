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
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Header() {
  const navigation = useNavigation<NavigationProp>();
  const handleDropdown = (options: string) => {
    if (options === "Sign Out") {
      AsyncStorage.removeItem("token");
      navigation.navigate("Landing");
    } else if (options === "Profile") {
      navigation.navigate("Profile");
    }
  };
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
            options={["Profile", "Sign Out"]}
            onCategoryChange={handleDropdown}
          />
        </View>
      </BackgroundColor>
    </>
  );
}
