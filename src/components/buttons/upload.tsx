import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUpload, faTimes } from "@fortawesome/free-solid-svg-icons";
import {
  Viewport,
  FontSizes,
  Colors,
} from "../../styles/globalstyles/globalstyles";

interface UploadButtonProps {
  selectedFileName: string;
  onFileSelected: (fileName: string) => void;
}

const UploadButton: React.FC<UploadButtonProps> = ({
  selectedFileName,
  onFileSelected,
}) => {
  const pickFile = async () => {
    try {
      let doc = await DocumentPicker.getDocumentAsync({
        type: "application/pdf", // Filter for PDF files
      });

      if (!doc.canceled && doc.assets && doc.assets.length > 0) {
        const fileName = doc.assets[0].name;
        onFileSelected(fileName); // Notify the parent component
      }
    } catch (err) {
      console.error("Error picking document:", err);
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={pickFile}>
      <View style={{ width: Viewport.width * 0.6 }}>
        <Text style={styles.text}>
          {selectedFileName || "Upload Travel Order"}
        </Text>
      </View>

      <View>
        {selectedFileName ? (
          <TouchableOpacity onPress={() => onFileSelected("")}>
            <FontAwesomeIcon color="#B00A0A" size={23} icon={faTimes} />
          </TouchableOpacity>
        ) : (
          <FontAwesomeIcon
            color={Colors.primaryColor1}
            size={20}
            icon={faUpload}
          />
        )}
      </View>
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
  },
  text: {
    fontSize: FontSizes.small,
    textAlign: "center",
    marginRight: 10,
  },
});

export default UploadButton;
