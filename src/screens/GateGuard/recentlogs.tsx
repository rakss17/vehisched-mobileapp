import { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
  Modal,
} from "react-native";
import {
  Viewport,
  Styles,
  FontSizes,
  Colors,
} from "../../styles/globalstyles/globalstyles";
import { BackgroundColor } from "../../styles/globalstyles/globalstyles";
import Header from "../../components/header/header";
import Button from "../../components/buttons/button";
import { Schedule } from "../../interfaces/interfaces";

export default function RecentLogs() {
  return (
    <>
      <BackgroundColor
        style={{ width: Viewport.width * 1, height: Viewport.height * 0.04 }}
      />
      <Header />
      <View style={Styles.container}>
        <BackgroundColor
          style={{
            width: Viewport.width * 1,
            height: Viewport.height * 0.01,
            marginTop: Viewport.width * 0.02,
          }}
        />
        <Text
          style={[
            {
              fontSize: FontSizes.normal,
              color: Colors.primaryColor1,
              fontWeight: "bold",
              marginTop: Viewport.height * 0.02,
            },
          ]}
        >
          Recent Logs
        </Text>
      </View>
    </>
  );
}
