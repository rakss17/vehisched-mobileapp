import React, { ReactNode } from "react";
import { Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface BackgroundColorProps {
  children: ReactNode;
}

export const BackgroundColor: React.FC<BackgroundColorProps> = ({
  children,
}) => {
  return (
    <LinearGradient
      colors={["#060E57", "#CD931E"]}
      start={{ x: 1, y: 0.5 }}
      end={{ x: 0, y: 0 }}
      style={{ flex: 1 }}
    >
      {children}
    </LinearGradient>
  );
};

export const Viewport = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height,
};
