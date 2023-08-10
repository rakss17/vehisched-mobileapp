import { StyleSheet, View } from "react-native";
import { Viewport, FontSizes, Colors } from "../../globalstyles/globalstyles";

export const DropdownStyles = StyleSheet.create({
  dropdown: {
    position: "relative",
  },
  dropdownToggle: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 4,
  },
  dropdownDefault: {
    marginRight: 5,
  },
  dropdownIcon: {
    fontSize: FontSizes.normal,
    color: Colors.secondaryColor1,
  },
  dropdownMenu: {
    position: "absolute",
    top: 40,
    left: Viewport.width * -0.2,
    right: 0,
    width: Viewport.width * 0.3,
    borderWidth: 1,
    borderColor: Colors.primaryColor2,
    borderRadius: 4,
    backgroundColor: Colors.primaryColor2,
  },
  dropdownMenuItem: {
    padding: 10,
  },
  dropdownText: {
    fontSize: FontSizes.small,
  },
});
