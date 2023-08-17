import { useState } from "react";
import { View, Text } from "react-native";
import {
  BackgroundColor,
  Viewport,
  Styles,
  Colors,
  FontSizes,
} from "../../styles/globalstyles/globalstyles";
import Header from "../../components/header/header";
import Button from "../../components/buttons/button";

export default function Request() {
  const [highlightedButton, setHighlightedButton] = useState<string | null>(
    "Pending"
  );

  const handleButtonPress = (status: string) => {
    setHighlightedButton(status);
  };
  return (
    <>
      <BackgroundColor
        style={{ width: Viewport.width * 1, height: Viewport.height * 0.04 }}
      />
      <Header />
      <View style={Styles.container}>
        <View
          style={[
            {
              width: Viewport.width * 0.7,
            },
            Styles.flexRow,
          ]}
        >
          <Text
            style={[
              {
                fontSize: FontSizes.normal,
                color: Colors.primaryColor1,
                fontWeight: "bold",
              },
            ]}
          >
            Requests
          </Text>
        </View>
        <View
          style={[
            { width: Viewport.width * 1, justifyContent: "space-around" },
            Styles.flexRow,
          ]}
        >
          <Button
            text="Pending"
            transparentBG2
            transparentText2
            isHighlighted={highlightedButton === "Pending"}
            onPress={() => handleButtonPress("Pending")}
          />
          <Button
            text="Approved"
            transparentBG2
            transparentText2
            isHighlighted={highlightedButton === "Aprroved"}
            onPress={() => handleButtonPress("Aprroved")}
          />
          <Button
            text="Canceled"
            transparentBG2
            transparentText2
            isHighlighted={highlightedButton === "Canceled"}
            onPress={() => handleButtonPress("Canceled")}
          />
          <Button
            text="Declined"
            transparentBG2
            transparentText2
            isHighlighted={highlightedButton === "Declined"}
            onPress={() => handleButtonPress("Declined")}
          />
        </View>
      </View>
    </>
  );
}
