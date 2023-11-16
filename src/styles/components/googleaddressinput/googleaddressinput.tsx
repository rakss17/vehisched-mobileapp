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
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 15,
    flex: 1,
    borderBottomWidth: 2,
    width: Viewport.width * 0.09,
  },
  //   poweredContainer: {
  //     justifyContent: "flex-end",
  //     alignItems: "center",
  //     borderBottomRightRadius: 5,
  //     borderBottomLeftRadius: 5,
  //     borderColor: "#c8c7cc",
  //     borderTopWidth: 0.5,
  //   },
  //   powered: { color: "white" },
  listView: {
    position: "absolute",
    top: 50,
    zIndex: 10,
    elevation: 10,
  },
  row: {
    backgroundColor: Colors.primaryColor2,
    padding: 13,
    height: 44,
    flexDirection: "row",
    zIndex: 10,
    elevation: 10,
    width: Viewport.width * 0.6,
  },
  //   separator: {},
  //   description: {},
  //   loader: {
  //     flexDirection: "row",
  //     justifyContent: "flex-end",
  //     height: 20,
  //   },
});
