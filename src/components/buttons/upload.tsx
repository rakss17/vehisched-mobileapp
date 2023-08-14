import React, { useState } from "react";
import { TouchableOpacity, Text } from "react-native";
import * as DocumentPicker from "expo-document-picker";

const UploadButton = () => {
  const [selectedFileName, setSelectedFileName] = useState<string>("");

  const pickFile = async () => {
    try {
      let doc = await DocumentPicker.getDocumentAsync({
        type: "application/pdf", // Filter for PDF files
      });

      if (!doc.canceled && doc.assets && doc.assets.length > 0) {
        setSelectedFileName(doc.assets[0].name);
      }
    } catch (err) {
      console.error("Error picking document:", err);
    }
  };

  return (
    <TouchableOpacity onPress={pickFile}>
      <Text>{selectedFileName || "Select PDF File"}</Text>
    </TouchableOpacity>
  );
};

export default UploadButton;
