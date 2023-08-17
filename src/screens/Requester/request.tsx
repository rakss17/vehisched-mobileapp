import { View, Text } from "react-native";
import {
  BackgroundColor,
  Viewport,
  Colors,
  FontSizes,
} from "../../styles/globalstyles/globalstyles";
import Header from "../../components/header/header";

export default function Request() {
  return (
    <>
      <BackgroundColor
        style={{ width: Viewport.width * 1, height: Viewport.height * 0.04 }}
      />
      <Header />
      <View></View>
    </>
  );
}
