import { View, Text } from "react-native";
import {
  BackgroundColor,
  Styles,
  Viewport,
  FontSizes,
  Colors,
} from "../../styles/globalstyles/globalstyles";
import Header from "../../components/header/header";
import Button from "../../components/buttons/button";

export default function Requester() {
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
        ></View>
      </View>
    </>
  );
}
