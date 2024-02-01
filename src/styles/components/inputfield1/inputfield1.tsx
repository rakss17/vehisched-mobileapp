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
    width: Viewport.width * 0.61,
    height: Viewport.height * 0.05,
  },
  icon1: {
    marginLeft: 5,
  },
  icon2: {
    paddingHorizontal: 8,
  },
});
