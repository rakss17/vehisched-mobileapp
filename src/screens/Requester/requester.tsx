import { View, Text } from "react-native";
import {
  BackgroundColor,
  Styles,
  Viewport,
} from "../../styles/globalstyles/globalstyles";
import Header from "../../components/header/header";

export default function Requester() {
  return (
    <>
      <BackgroundColor
        style={{ width: Viewport.width * 1, height: Viewport.height * 0.04 }}
      />
      <Header />

      <View style={Styles.container}></View>
    </>
  );
}
