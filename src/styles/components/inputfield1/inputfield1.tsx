import { StyleSheet } from "react-native";
import { Viewport } from "../../globalstyles/globalstyles";
export const InputField1Styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    padding: 8,
    elevation: 3,
  },
  input: {
    paddingLeft: 10,
    width: Viewport.width * 0.7,
    height: Viewport.height * 0.05,
    paddingRight: 10,
  },
  inputWithIcon: {
    paddingRight: 0, // Reduce space when icon is showing
  },
  icon1: {
    padding: 0,
  },
  icon2: {
    paddingHorizontal: 8,
  },
});
