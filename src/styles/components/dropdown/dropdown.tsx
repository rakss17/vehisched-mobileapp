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
  showBG: {
    flexDirection: "row",
    alignItems: "center",
    width: Viewport.width * 0.6,
    height: Viewport.height * 0.07,
    backgroundColor: "transparent",
    borderColor: Colors.secondaryColor2,
    borderBottomWidth: 1,
  },
  dropdownDefault: {
    marginRight: 5,
  },
  dropdownIcon: {
    fontSize: FontSizes.normal,
    color: Colors.secondaryColor1,
  },
  dropdownIcon2: {
    fontSize: FontSizes.normal,
    color: Colors.secondaryColor2,
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
    zIndex: 1,
  },
  dropdownMenuAdjusted: {
    position: "absolute",
    top: 45,
    left: Viewport.width * 0.0,
    right: 0,
    width: Viewport.width * 0.6,
    borderWidth: 1,
    borderColor: Colors.primaryColor2,
    borderRadius: 4,
    backgroundColor: Colors.secondaryColor1,
    zIndex: 1,
  },
  dropdownMenuItem: {
    padding: 10,
  },
  dropdownText: {
    fontSize: FontSizes.small,
  },
  label: {
    fontSize: FontSizes.small,
  },
});
