import React, { useState, useEffect } from "react";
import {
  BackgroundColor,
  Styles,
  Viewport,
  FontSizes,
  Colors,
} from "../../styles/globalstyles/globalstyles";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Header from "../../components/header/header";
import Button from "../../components/buttons/button";
import {
  fetchedPendingData,
  fetchedApprovedData,
  fetchedCanceledData,
  fetchedDeclinedData,
} from "../../components/mockdata/mockdata";
import { Requests } from "../../interfaces/interfaces";
import EllipsisMenu from "../../components/ellipsismenu/ellipsismenu";
import PromptDialog from "../../components/modals/promptdialog";
import Confirmation from "../../components/modals/confirmation";

export default function Request() {
  const [requestData, setRequestData] = useState<Requests[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>("Pending");
  const [isCancelModalShow, setIsCancelModalShow] = useState(false);
  const [isConfirmationShow, setIsConfirmationShow] = useState(false);
  const handleButtonPress = (status: string) => {
    setSelectedStatus(status);
    switch (status) {
      case "Pending":
        setRequestData(fetchedPendingData);
        break;
      case "Approved":
        setRequestData(fetchedApprovedData);
        break;
      case "Canceled":
        setRequestData(fetchedCanceledData);
        break;
      case "Declined":
        setRequestData(fetchedDeclinedData);
        break;
      default:
        setRequestData([]);
        break;
    }
    setSelectedStatus(status);
  };
  useEffect(() => {
    handleButtonPress("Pending");
  }, []);

  const handleEllipsisMenu = (options: string) => {
    if (options === "Cancel request") {
      setIsCancelModalShow(true);
    }
  };
  const hanldeOnRequestClose = () => {
    setIsCancelModalShow(false);
    setIsConfirmationShow(false);
  };
  const handleNextPressed = () => {
    setIsCancelModalShow(false);
    setIsConfirmationShow(true);
  };

  return (
    <>
      <BackgroundColor
        style={{ width: Viewport.width * 1, height: Viewport.height * 0.04 }}
      />
      <Header />
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
              marginTop: 30,
              marginLeft: 30,
            },
          ]}
        >
          Requests
        </Text>
      </View>

      <View
        style={[
          {
            width: Viewport.width * 1,
            justifyContent: "space-around",
            marginTop: 10,
          },
          Styles.flexRow,
        ]}
      >
        <Button
          text="Pending"
          transparentBG2
          transparentText2
          isHighlighted={selectedStatus === "Pending"}
          onPress={() => handleButtonPress("Pending")}
        />
        <Button
          text="Approved"
          transparentBG2
          transparentText2
          isHighlighted={selectedStatus === "Approved"}
          onPress={() => handleButtonPress("Approved")}
        />
        <Button
          text="Canceled"
          transparentBG2
          transparentText2
          isHighlighted={selectedStatus === "Canceled"}
          onPress={() => handleButtonPress("Canceled")}
        />
        <Button
          text="Declined"
          transparentBG2
          transparentText2
          isHighlighted={selectedStatus === "Declined"}
          onPress={() => handleButtonPress("Declined")}
        />
      </View>
      <BackgroundColor
        style={{
          width: Viewport.width * 1,
          height: Viewport.height * 0.01,
          marginTop: Viewport.width * 0.02,
        }}
      />
      <View style={styles.tableContainer}>
        <Text style={styles.tableHeader1}>Request No.</Text>
        <Text style={styles.tableHeader2}>Travel Date</Text>
        <Text style={styles.tableHeader3}>Vehicle</Text>
      </View>
      <ScrollView>
        {requestData.length === 0 ? (
          <Text style={styles.noText}>No vehicles available</Text>
        ) : (
          requestData.map((request, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell1}>{request.request_number}</Text>
              <Text style={styles.tableCell2}>{request.travel_date}</Text>
              <Text style={styles.tableCell3}>{request.vehicle}</Text>
              {selectedStatus === "Pending" || selectedStatus === "Approved" ? (
                <View style={styles.tableCell4}>
                  <EllipsisMenu
                    options={["Cancel request"]}
                    handler={handleEllipsisMenu}
                  />
                </View>
              ) : null}
            </View>
          ))
        )}
      </ScrollView>
      <PromptDialog
        transparent={true}
        animationType="fade"
        visible={isCancelModalShow}
        onRequestClose={hanldeOnRequestClose}
        content="Are you sure you want to cancel your trip?"
        adjustedSize
        showContent
        onNextPressed={handleNextPressed}
      />
      <Confirmation
        visible={isConfirmationShow}
        animationType="fade"
        transparent={true}
        content="Trip Canceled Successfully!"
        onRequestClose={hanldeOnRequestClose}
        showContent
        adjustedSize
      />
    </>
  );
}

const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tableHeader1: {
    width: Viewport.width * 0.35,
    fontSize: FontSizes.small,
    paddingLeft: 20,
    fontWeight: "bold",
  },
  tableHeader2: {
    width: Viewport.width * 0.35,
    fontSize: FontSizes.small,
    paddingLeft: 10,
    fontWeight: "bold",
  },
  tableHeader3: {
    width: Viewport.width * 0.35,
    fontSize: FontSizes.small,
    paddingLeft: 5,
    fontWeight: "bold",
  },
  tableRow: {
    flexDirection: "row",
    backgroundColor: Colors.primaryColor2,
    marginTop: 10,
    paddingLeft: 20,
    height: Viewport.height * 0.08,
    alignItems: "center",
  },
  tableCell1: {
    width: Viewport.width * 0.1,
    fontSize: FontSizes.small,
    marginLeft: 23,
    textAlign: "center",
  },
  tableCell2: {
    width: Viewport.width * 0.25,
    fontSize: FontSizes.small,
    marginLeft: 55,
    textAlign: "center",
  },
  tableCell3: {
    width: Viewport.width * 0.25,

    fontSize: FontSizes.small,
    textAlign: "center",
    marginLeft: 20,
  },
  tableCell4: {
    width: Viewport.width * 0.01,
    marginLeft: 20,
  },
  noText: {
    fontSize: FontSizes.small,
    textAlign: "center",
    marginTop: 15,
  },
});
