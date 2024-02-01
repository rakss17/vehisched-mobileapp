import React from "react";
import {
  TouchableOpacity,
  Text,
  View,
  Linking,
  StyleSheet,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import {
  Colors,
  FontSizes,
  Viewport,
} from "../../styles/globalstyles/globalstyles";
import { DownloadButtonProps } from "../../interfaces/interfaces";

const DownloadButton: React.FC<DownloadButtonProps> = ({
  downloadUrl,
  buttonText,
}) => {
  const handleDownloadPress = async () => {
    try {
      const supported = await Linking.canOpenURL(downloadUrl);

      if (supported) {
        await Linking.openURL(downloadUrl);
      } else {
        console.error("Don't know how to open URL: ", downloadUrl);
      }
    } catch (error) {
      console.error("Error opening URL: ", error);
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleDownloadPress}>
      <View style={{ width: Viewport.width * 0.55 }}>
        <Text style={styles.text}>{buttonText}</Text>
      </View>

      <FontAwesomeIcon
        size={20}
        color={Colors.primaryColor1}
        icon={faDownload}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: Viewport.width * 0.7,
    height: Viewport.height * 0.07,
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: FontSizes.small,
    textAlign: "center",
    marginRight: 10,
  },
});

export default DownloadButton;
