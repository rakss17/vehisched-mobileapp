import { View, Text } from "react-native";
import {
  BackgroundColor,
  Styles,
  Viewport,
} from "../../styles/globalstyles/globalstyles";
import Header from "../../components/header/header";
import { BottomNavbar } from "../../components/bottomnavbar/bottomnavbar";

import { faCar, faClipboardList } from "@fortawesome/free-solid-svg-icons";
export default function Requester() {
  const bottomNavItems = [
    {
      icon: faCar,
      label: "Label 1",
      onPress: () => console.log("Pressed 1"),
    },
    {
      icon: faClipboardList,
      label: "Label 2",
      onPress: () => console.log("Pressed 2"),
    },
  ];
  return (
    <>
      <BackgroundColor
        style={{ width: Viewport.width * 1, height: Viewport.height * 0.04 }}
      />
      <Header />

      <View style={Styles.container}></View>
      <BottomNavbar items={bottomNavItems} />
    </>
  );
}
