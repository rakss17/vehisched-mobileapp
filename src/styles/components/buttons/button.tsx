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
  buttonBG2: {
    width: Viewport.width * 0.3,
    height: Viewport.height * 0.06,
    backgroundColor: "transparent",
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    borderWidth: 2,
    color: Colors.secondaryColor2,
    borderColor: Colors.primaryColor1,
  },
  text: {
    color: Colors.secondaryColor1,
    fontSize: FontSizes.small,
    textAlign: "center",
  },
  transparentText: {
    color: Colors.secondaryColor2,
    fontSize: FontSizes.small,
    textAlign: "center",
  },
  transparentBG2: {
    width: Viewport.width * 0.2,
    height: Viewport.height * 0.06,
    backgroundColor: "transparent",
    display: "flex",
    justifyContent: "center",
    color: Colors.secondaryColor2,
    borderColor: Colors.primaryColor1,
  },
  transparentText2: {
    color: Colors.primaryColor1,
    fontSize: FontSizes.small,
    textAlign: "center",
    fontWeight: "bold",
  },
  borderBottom: {
    width: Viewport.width * 0.2,
    height: Viewport.height * 0.06,
    backgroundColor: "transparent",
    display: "flex",
    justifyContent: "center",
    color: Colors.secondaryColor2,
    borderColor: Colors.primaryColor1,
    borderBottomWidth: 3,
  },
  disabledButton: {
    backgroundColor: "gray",
  },
});
