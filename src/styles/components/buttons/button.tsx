import { StyleSheet } from "react-native";
import { Viewport, Colors, FontSizes } from "../../globalstyles/globalstyles";

export const ButtonStyle = StyleSheet.create({
  button: {
    width: Viewport.width * 0.3,
    height: Viewport.height * 0.06,
    display: "flex",
    justifyContent: "center",
  },
  buttonBG: {
    width: Viewport.width * 0.3,
    height: Viewport.height * 0.06,
    backgroundColor: Colors.primaryColor1,
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
  },
  text: {
    color: Colors.secondaryColor1,
    fontSize: FontSizes.small,
    textAlign: "center",
  },
});
