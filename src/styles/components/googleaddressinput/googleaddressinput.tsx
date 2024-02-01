import { StyleSheet, View } from "react-native";
import { Viewport, FontSizes, Colors } from "../../globalstyles/globalstyles";

export const AutoCompleteAddressGoogleStyle = StyleSheet.create({
  container: {
    width: Viewport.width * 0.8,
  },
  textInputContainer: {
    flexDirection: "row",

    width: Viewport.width * 0.8,
  },
  textInput: {
    backgroundColor: "#FFFFFF",
    height: 44,
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 15,
    flex: 1,
    borderBottomWidth: 0,
    width: Viewport.width * 0.8,
  },
  poweredContainer: {
    backgroundColor: Colors.primaryColor2,
  },
  listView: {
    right: 0,
    width: Viewport.width * 0.8,
  },
  row: {
    backgroundColor: "white",
    padding: 13,

    flexDirection: "row",
    width: Viewport.width * 0.8,
  },
});
