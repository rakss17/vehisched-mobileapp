import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BackgroundColorProps } from "../../interfaces/interfaces";

export const BackgroundColor: React.FC<BackgroundColorProps> = ({
  children,
  style,
}) => {
  return (
    <LinearGradient
      colors={["#060E57", "#CD931E"]}
      start={{ x: 1, y: 0.5 }}
      end={{ x: 0, y: 0 }}
      style={style}
    >
      {children}
    </LinearGradient>
  );
};

export const Viewport = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height,
};
export const pageMargin = Viewport.width * 0.05;
export const Colors = {
  primaryColor1: "#060E57",
  primaryColor2: "#D9D9D9",
  primaryColor3: "#AEAEAE",
  primaryColor4: "#E8A51C",
  secondaryColor1: "#FFFFFF",
  secondaryColor2: "black",
  secondaryColor3: "#1F78FF",
  secondaryColor4: "#616161",
  errorColor: "red",
};
export const FontSizes = {
  tiny: Viewport.width * 0.03,
  small: Viewport.width * 0.04,
  normal: Viewport.width * 0.05,
  medium: Viewport.width * 0.06,
  large: Viewport.width * 0.08,
  extraLarge: Viewport.width * 0.1,
};
export const Styles = StyleSheet.create({
  containerr: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: Viewport.width * 1.0,
    height: Viewport.height * 1.0,
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: Viewport.width * 1.0,
    height: Viewport.height * 1.0,
    backgroundColor: Colors.secondaryColor1,
  },
  flexColumn: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  textError: {
    color: "red",
    fontSize: FontSizes.tiny,
  },
});
