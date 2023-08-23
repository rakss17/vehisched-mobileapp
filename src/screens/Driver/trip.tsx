import { View, Text, ScrollView, Modal } from "react-native";
import Header from "../../components/header/header";
import {
  Viewport,
  FontSizes,
  Styles,
  Colors,
} from "../../styles/globalstyles/globalstyles";
import { BackgroundColor } from "../../styles/globalstyles/globalstyles";

export default function Trips() {
  return (
    <>
      <BackgroundColor
        style={{ width: Viewport.width * 1, height: Viewport.height * 0.04 }}
      />
      <Header />
    </>
  );
}
