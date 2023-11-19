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
  RefreshControl,
} from "react-native";
import Header from "../../components/header/header";
import Button from "../../components/buttons/button";
import { fetchedRequestData } from "../../components/mockdata/mockdata";
import { Requests } from "../../interfaces/interfaces";
import EllipsisMenu from "../../components/ellipsismenu/ellipsismenu";
import PromptDialog from "../../components/modals/promptdialog";
import Confirmation from "../../components/modals/confirmation";
import RequestDetails from "../../components/modals/requestdetails";
import { fetchRequestAPI } from "../../components/api/api";
import { formatDate } from "../../components/function/function";
import { useFocusEffect } from "@react-navigation/native";

export default function Request() {
  const [originalRequestData, setOriginalRequestData] = useState<any[]>([]);
  const [requestData, setRequestData] = useState<any[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<any | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>("Pending");
  const [isCancelModalShow, setIsCancelModalShow] = useState(false);
  const [isDeleteModalShow, setIsDeleteModalShow] = useState(false);
  const [isConfirmationShow, setIsConfirmationShow] = useState(false);
  const [isConfirmation2Show, setIsConfirmation2Show] = useState(false);
  const [isRequestDetailsShow, setIsRequestDetailsShow] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    fetchRequestAPI(setOriginalRequestData, setRefreshing);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchRequestAPI(setOriginalRequestData);
    }, [])
  );

  useEffect(() => {
    if (originalRequestData.length > 0) {
      handleButtonPress("Pending");
    }
  }, [originalRequestData]);

  const handleButtonPress = (status: string) => {
    setSelectedStatus(status);
    let filteredStatus: any[] = [];
    switch (status) {
      case "Pending":
        filteredStatus = originalRequestData.filter(
          (request) => request.status === "Pending"
        );
        break;
      case "Approved":
        filteredStatus = originalRequestData.filter(
          (request) => request.status === "Approved"
        );
        break;
      case "Completed":
        filteredStatus = originalRequestData.filter(
          (request) => request.status === "Completed"
        );
        break;
      case "Canceled":
        filteredStatus = originalRequestData.filter(
          (request) => request.status === "Canceled"
        );
        break;
      case "Declined":
        filteredStatus = originalRequestData.filter(
          (request) => request.status === "Declined"
        );
        break;
      default:
        filteredStatus = [];
        break;
    }
    setRequestData(filteredStatus);
  };
  useEffect(() => {
    handleButtonPress("Pending");
  }, []);

  const handleEllipsisMenu = (options: string, request: Requests) => {
    setSelectedRequest(request);
    if (options === "View request") {
      setIsRequestDetailsShow(true);
    } else if (options === "Cancel request") {
      setIsCancelModalShow(true);
    } else if (options === "Delete request") {
      setIsDeleteModalShow(true);
    }
  };
  const hanldeOnRequestClose = () => {
    setIsCancelModalShow(false);
    setIsConfirmationShow(false);
    setIsConfirmation2Show(false);
    setIsRequestDetailsShow(false);
    setIsDeleteModalShow(false);
  };
  const handleNextPressed = () => {
    setIsCancelModalShow(false);
    setIsConfirmationShow(true);
  };
  const handleNext2Pressed = () => {
    setIsDeleteModalShow(false);
    setIsConfirmation2Show(true);
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
          transparentBGAdjust
          transparentTextAdjust
          isHighlightedAdjust={selectedStatus === "Pending"}
          onPress={() => handleButtonPress("Pending")}
        />
        <Button
          text="Approved"
          transparentBGAdjust
          transparentTextAdjust
          isHighlightedAdjust={selectedStatus === "Approved"}
          onPress={() => handleButtonPress("Approved")}
        />
        <Button
          text="Completed"
          transparentBGAdjust
          transparentTextAdjust
          isHighlightedAdjust={selectedStatus === "Completed"}
          onPress={() => handleButtonPress("Completed")}
        />
        <Button
          text="Canceled"
          transparentBGAdjust
          transparentTextAdjust
          isHighlightedAdjust={selectedStatus === "Canceled"}
          onPress={() => handleButtonPress("Canceled")}
        />
        <Button
          text="Declined"
          transparentBGAdjust
          transparentTextAdjust
          isHighlightedAdjust={selectedStatus === "Declined"}
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
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {requestData.length === 0 ? (
          <Text style={styles.noText}>No request found</Text>
        ) : (
          requestData.map((request, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell1}>{request.request_id}</Text>
              <Text style={styles.tableCell2}>
                {formatDate(request.travel_date)}
              </Text>
              <Text style={styles.tableCell3}>{request.vehicle}</Text>

              <View style={styles.tableCell4}>
                <EllipsisMenu
                  options={
                    selectedStatus === "Pending" ||
                    selectedStatus === "Approved"
                      ? ["View request", "Cancel request"]
                      : ["View request", "Delete request"]
                  }
                  handler={(option: string) =>
                    handleEllipsisMenu(option, request)
                  }
                />
              </View>
            </View>
          ))
        )}
      </ScrollView>
      <RequestDetails
        transparent={true}
        animationType="fade"
        visible={isRequestDetailsShow}
        onRequestClose={hanldeOnRequestClose}
        requestData={selectedRequest}
      />
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
        content="Trip canceled successfully!"
        onRequestClose={hanldeOnRequestClose}
        showContent
        adjustedSize
      />
      <PromptDialog
        transparent={true}
        animationType="fade"
        visible={isDeleteModalShow}
        onRequestClose={hanldeOnRequestClose}
        content="Are you sure you want to delete this request?"
        adjustedSize
        showContent
        onNextPressed={handleNext2Pressed}
      />
      <Confirmation
        visible={isConfirmation2Show}
        animationType="fade"
        transparent={true}
        content="Request deleted successfully!"
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
    marginLeft: Viewport.width * 0.06,
    textAlign: "center",
  },
  tableCell2: {
    width: Viewport.width * 0.25,
    fontSize: FontSizes.small,
    marginLeft: Viewport.width * 0.14,
    textAlign: "center",
  },
  tableCell3: {
    width: Viewport.width * 0.25,

    fontSize: FontSizes.small,
    textAlign: "center",
    marginLeft: Viewport.width * 0.04,
  },
  tableCell4: {
    width: Viewport.width * 0.01,
    marginLeft: Viewport.width * 0.05,
  },
  noText: {
    fontSize: FontSizes.small,
    textAlign: "center",
    marginTop: 15,
  },
});
