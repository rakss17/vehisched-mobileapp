import React from "react";
import { View, Text, Modal, ScrollView } from "react-native";
import { ModalProps } from "../../interfaces/interfaces";
import {
  Viewport,
  FontSizes,
  Colors,
  Styles,
} from "../../styles/globalstyles/globalstyles";
import Button from "../buttons/button";
import { formatDate, formatTime } from "../function/function";

const RequestDetails: React.FC<ModalProps & { requestData: any | null }> = ({
  animationType,
  visible,
  onRequestClose,
  transparent,
  requestData,
}) => {
  return (
    <>
      <Modal
        visible={visible}
        transparent={transparent}
        animationType={animationType}
        onRequestClose={onRequestClose}
      >
        <View
          style={[
            {
              height: Viewport.height * 1,
              width: Viewport.width * 1,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 1,
            },
            Styles.flexColumn,
          ]}
        >
          <View
            style={[
              {
                backgroundColor: Colors.primaryColor2,
                width: Viewport.width * 0.9,
                height: Viewport.height * 0.65,
                paddingBottom: Viewport.height * 0.03,
                borderRadius: 10,
                gap: Viewport.height * 0.02,
              },
              Styles.flexColumn,
            ]}
          >
            <ScrollView>
              <Text
                style={{
                  fontSize: FontSizes.normal,
                  marginTop: Viewport.height * 0.02,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Request details
              </Text>
              <View style={{ gap: Viewport.height * 0.01 }}>
                <View
                  style={[
                    {
                      width: Viewport.width * 0.75,
                      marginTop: Viewport.height * 0.02,
                    },
                    Styles.flexRow,
                  ]}
                >
                  <Text style={{ fontSize: FontSizes.small }}>
                    <Text style={{ fontWeight: "bold" }}>Request number: </Text>
                    {requestData?.request_id}
                  </Text>
                </View>
                {/* <View
                  style={[
                    {
                      width: Viewport.width * 0.75,
                    },
                    Styles.flexRow,
                  ]}
                >
                  <Text style={{ fontSize: FontSizes.small }}>
                    <Text style={{ fontWeight: "bold" }}>Request name: </Text>
                    {requestData?.requester_name}
                  </Text>
                </View> */}
                <View
                  style={[
                    {
                      width: Viewport.width * 0.75,
                    },
                    Styles.flexRow,
                  ]}
                >
                  <Text style={{ fontSize: FontSizes.small }}>
                    <Text style={{ fontWeight: "bold" }}>Office/dept: </Text>
                    {requestData?.office}
                  </Text>
                </View>
                <View
                  style={[
                    {
                      width: Viewport.width * 0.75,
                    },
                    Styles.flexRow,
                  ]}
                >
                  <Text style={{ fontSize: FontSizes.small }}>
                    <Text style={{ fontWeight: "bold" }}>Destination: </Text>
                    {requestData?.destination}
                  </Text>
                </View>
                <View
                  style={[
                    {
                      width: Viewport.width * 0.75,
                    },
                    Styles.flexRow,
                  ]}
                >
                  <Text style={{ fontSize: FontSizes.small }}>
                    <Text style={{ fontWeight: "bold" }}>Distance: </Text>
                    {requestData?.distance} km
                  </Text>
                </View>
                <View
                  style={[
                    {
                      width: Viewport.width * 0.75,
                    },
                    Styles.flexRow,
                  ]}
                >
                  <Text style={{ fontSize: FontSizes.small }}>
                    <Text style={{ fontWeight: "bold" }}>
                      No. of passenger{"("}s{")"}:{" "}
                    </Text>
                    {requestData?.number_of_passenger}
                  </Text>
                </View>
                <View
                  style={[
                    {
                      width: Viewport.width * 0.75,
                    },
                    Styles.flexRow,
                  ]}
                >
                  <Text style={{ fontSize: FontSizes.small }}>
                    <Text style={{ fontWeight: "bold" }}>
                      Passenger name{"("}s{")"}:{" "}
                    </Text>

                    {requestData?.passenger_name}
                  </Text>
                </View>
                <View
                  style={[
                    {
                      width: Viewport.width * 0.75,
                    },
                    Styles.flexRow,
                  ]}
                >
                  <Text style={{ fontSize: FontSizes.small }}>
                    <Text style={{ fontWeight: "bold" }}>Travel date: </Text>
                    {formatDate(requestData?.travel_date)}
                  </Text>
                </View>
                <View
                  style={[
                    {
                      width: Viewport.width * 0.75,
                    },
                    Styles.flexRow,
                  ]}
                >
                  <Text style={{ fontSize: FontSizes.small }}>
                    <Text style={{ fontWeight: "bold" }}>Travel time: </Text>
                    {formatTime(requestData?.travel_time)}
                  </Text>
                </View>
                <View
                  style={[
                    {
                      width: Viewport.width * 0.75,
                    },
                    Styles.flexRow,
                  ]}
                >
                  <Text style={{ fontSize: FontSizes.small }}>
                    <Text style={{ fontWeight: "bold" }}>Return date: </Text>
                    {formatDate(requestData?.return_date)}
                  </Text>
                </View>
                <View
                  style={[
                    {
                      width: Viewport.width * 0.75,
                    },
                    Styles.flexRow,
                  ]}
                >
                  <Text style={{ fontSize: FontSizes.small }}>
                    <Text style={{ fontWeight: "bold" }}>Return time: </Text>
                    {formatTime(requestData?.return_time)}
                  </Text>
                </View>
                <View
                  style={[
                    {
                      width: Viewport.width * 0.75,
                    },
                    Styles.flexRow,
                  ]}
                >
                  <Text style={{ fontSize: FontSizes.small }}>
                    <Text style={{ fontWeight: "bold" }}>Vehicle: </Text>
                    {requestData?.vehicle}
                  </Text>
                </View>
                <View
                  style={[
                    {
                      width: Viewport.width * 0.75,
                    },
                    Styles.flexRow,
                  ]}
                >
                  <Text style={{ fontSize: FontSizes.small }}>
                    <Text style={{ fontWeight: "bold" }}>Travel type: </Text>
                    {requestData?.type}
                  </Text>
                </View>
                <View
                  style={[
                    {
                      width: Viewport.width * 0.75,
                    },
                    Styles.flexRow,
                  ]}
                >
                  <Text style={{ fontSize: FontSizes.small }}>
                    <Text style={{ fontWeight: "bold" }}>Purpose: </Text>
                    {requestData?.purpose}
                  </Text>
                </View>
                <View
                  style={[
                    {
                      width: Viewport.width * 0.75,
                    },
                    Styles.flexRow,
                  ]}
                >
                  <Text style={{ fontSize: FontSizes.small }}>
                    <Text style={{ fontWeight: "bold" }}>Status: </Text>
                    {requestData?.status}
                  </Text>
                </View>
              </View>
            </ScrollView>
            <View>
              <Button onPress={onRequestClose} text="Close" defaultBG />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default RequestDetails;
