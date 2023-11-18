import { StyleSheet, View } from "react-native";
import { Viewport, FontSizes, Colors } from "../../globalstyles/globalstyles";

export const AutoCompleteAddressGoogleStyle = StyleSheet.create({
  container: {
    width: Viewport.width * 0.5,
  },
  textInputContainer: {
    flexDirection: "row",
    position: "relative",
    width: Viewport.width * 0.6,
  },
  textInput: {
    backgroundColor: "#FFFFFF",
    height: 44,
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 15,
    flex: 1,
    borderBottomWidth: 1,
    width: Viewport.width * 0.09,
  },
  poweredContainer: {
    backgroundColor: Colors.primaryColor2,
  },
  listView: {
    position: "absolute",
    top: 50,
    zIndex: 99999,
    width: Viewport.width * 0.8,
  },
  row: {
    backgroundColor: Colors.primaryColor2,
    padding: 13,
    height: "auto",
    flexDirection: "row",
    width: Viewport.width * 0.8,
    zIndex: 99999,
  },
});
