// import { useState, useEffect } from "react";
// import { View, Text, ScrollView, Modal, TouchableOpacity } from "react-native";
// import Header from "../../components/header/header";
// import { BackgroundColor } from "../../styles/globalstyles/globalstyles";
// import {
//   Viewport,
//   Styles,
//   FontSizes,
//   Colors,
// } from "../../styles/globalstyles/globalstyles";
// import { todayMockData } from "../../components/mockdata/mockdata";
// import { Schedule } from "../../interfaces/interfaces";
// import Button from "../../components/buttons/button";

// export default function DriverOld() {
//   const [scheduleData, setScheduleData] = useState<Schedule[]>([]);
//   const [isTripDetailsShow, setIsTripDetailsShow] = useState(false);
//   const [selectedTrip, setSelectedTrip] = useState<Schedule[]>([]);

//   useEffect(() => {
//     const todayTrips = todayMockData.filter((trip) => trip.status === "Today");
//     setScheduleData(todayTrips);
//   }, []);

//   const handleShowTripDetails = (trip: Schedule) => {
//     setSelectedTrip([trip]);
//     setIsTripDetailsShow(true);
//   };

//   const handleCloseTripDetails = () => {
//     setIsTripDetailsShow(false);
//   };

//   return (
//     <>
//       <BackgroundColor
//         style={{ width: Viewport.width * 1, height: Viewport.height * 0.04 }}
//       />
//       <Header />
//       <View style={Styles.container}>
//         <View
//           style={[
//             {
//               width: Viewport.width * 0.7,
//             },
//             Styles.flexRow,
//           ]}
//         >
//           <Text
//             style={[
//               {
//                 fontSize: FontSizes.normal,
//                 color: Colors.primaryColor1,
//                 fontWeight: "bold",
//                 marginTop: 30,
//               },
//             ]}
//           >
//             Today's Trip
//           </Text>
//         </View>
//         <BackgroundColor
//           style={{
//             width: Viewport.width * 1,
//             height: Viewport.height * 0.01,
//             marginTop: Viewport.width * 0.02,
//           }}
//         />
//         <View style={{ flexDirection: "row", marginTop: 10 }}>
//           <Text
//             style={{
//               width: Viewport.width * 0.35,
//               fontSize: FontSizes.small,
//               paddingLeft: 50,
//               fontWeight: "bold",
//             }}
//           >
//             Trip No.
//           </Text>
//           <Text
//             style={{
//               width: Viewport.width * 0.35,
//               fontSize: FontSizes.small,
//               paddingLeft: 40,
//               fontWeight: "bold",
//             }}
//           >
//             Time
//           </Text>
//           <Text
//             style={{
//               width: Viewport.width * 0.35,
//               fontSize: FontSizes.small,
//               paddingLeft: 5,
//               fontWeight: "bold",
//             }}
//           >
//             Destination
//           </Text>
//         </View>
//         <ScrollView>
//           {scheduleData.length === 0 ? (
//             <Text
//               style={{
//                 fontSize: FontSizes.small,
//                 textAlign: "center",
//                 marginTop: 15,
//               }}
//             >
//               No trips for today
//             </Text>
//           ) : (
//             scheduleData.map((schedule, index) => (
//               <TouchableOpacity
//                 onPress={() => handleShowTripDetails(schedule)}
//                 key={index}
//               >
//                 <View
//                   style={{
//                     flexDirection: "row",
//                     backgroundColor: Colors.primaryColor2,
//                     marginTop: 10,
//                     paddingLeft: 20,
//                     width: Viewport.width * 1,
//                     height: Viewport.height * 0.08,
//                     alignItems: "center",
//                   }}
//                 >
//                   <Text
//                     style={{
//                       width: Viewport.width * 0.1,
//                       fontSize: FontSizes.small,
//                       marginLeft: 25,
//                       textAlign: "center",
//                     }}
//                   >
//                     {schedule.trip_number}
//                   </Text>
//                   <Text
//                     style={{
//                       width: Viewport.width * 0.25,
//                       fontSize: FontSizes.small,
//                       marginLeft: 55,
//                       textAlign: "center",
//                     }}
//                   >
//                     {schedule.time}
//                   </Text>
//                   <Text
//                     style={{
//                       width: Viewport.width * 0.25,

//                       fontSize: FontSizes.small,
//                       textAlign: "center",
//                       marginLeft: 20,
//                     }}
//                   >
//                     {schedule.destination}
//                   </Text>
//                 </View>
//               </TouchableOpacity>
//             ))
//           )}
//         </ScrollView>
//       </View>
//       <Modal
//         animationType="fade"
//         transparent={true}
//         visible={isTripDetailsShow}
//         onRequestClose={handleCloseTripDetails}
//       >
//         <View
//           style={{
//             flex: 1,
//             backgroundColor: "rgba(0, 0, 0, 0.5)",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           <View
//             style={{
//               backgroundColor: "white",
//               paddingHorizontal: Viewport.width * 0.1,
//               paddingVertical: Viewport.height * 0.05,
//               borderRadius: 10,
//               width: Viewport.width * 0.9,
//               height: Viewport.height * 0.6,
//             }}
//           >
//             <Text
//               style={{
//                 fontSize: FontSizes.normal,
//                 fontWeight: "bold",
//                 textAlign: "center",
//               }}
//             >
//               Trip details
//             </Text>

//             {selectedTrip.map((trip, index) => (
//               <View key={index}>
//                 <ScrollView
//                   style={{
//                     height: Viewport.height * 0.43,
//                   }}
//                 >
//                   <Text
//                     style={[
//                       {
//                         fontSize: FontSizes.small,
//                         color: Colors.secondaryColor2,

//                         marginTop: Viewport.height * 0.03,
//                         fontWeight: "bold",
//                       },
//                     ]}
//                   >
//                     Trip no. {trip.trip_number}
//                   </Text>
//                   <Text
//                     style={[
//                       {
//                         fontSize: FontSizes.small,
//                         color: Colors.secondaryColor2,

//                         marginTop: Viewport.height * 0.03,
//                       },
//                     ]}
//                   >
//                     <Text style={{ fontWeight: "bold" }}>
//                       Requester's name:
//                     </Text>{" "}
//                     {trip.requester_name}
//                   </Text>
//                   <Text
//                     style={[
//                       {
//                         fontSize: FontSizes.small,
//                         color: Colors.secondaryColor2,

//                         marginTop: Viewport.height * 0.03,
//                       },
//                     ]}
//                   >
//                     <Text style={{ fontWeight: "bold" }}>
//                       Passenger's name(s):
//                     </Text>{" "}
//                     {trip.passenger_name.join(", ")}
//                   </Text>
//                   <Text
//                     style={[
//                       {
//                         fontSize: FontSizes.small,
//                         color: Colors.secondaryColor2,

//                         marginTop: Viewport.height * 0.03,
//                       },
//                     ]}
//                   >
//                     <Text style={{ fontWeight: "bold" }}>Date:</Text>{" "}
//                     {trip.date}
//                   </Text>
//                   <Text
//                     style={[
//                       {
//                         fontSize: FontSizes.small,
//                         color: Colors.secondaryColor2,

//                         marginTop: Viewport.height * 0.03,
//                       },
//                     ]}
//                   >
//                     <Text style={{ fontWeight: "bold" }}>Time:</Text>{" "}
//                     {trip.time}
//                   </Text>
//                   <Text
//                     style={[
//                       {
//                         fontSize: FontSizes.small,
//                         color: Colors.secondaryColor2,

//                         marginTop: Viewport.height * 0.03,
//                       },
//                     ]}
//                   >
//                     <Text style={{ fontWeight: "bold" }}>Destination:</Text>{" "}
//                     {trip.destination}
//                   </Text>
//                 </ScrollView>
//                 <View
//                   style={{
//                     alignItems: "flex-end",
//                     marginTop: Viewport.height * 0.0,
//                   }}
//                 >
//                   <Button
//                     text="Close"
//                     transparentBG
//                     transparentText2
//                     onPress={handleCloseTripDetails}
//                   />
//                 </View>
//               </View>
//             ))}
//           </View>
//         </View>
//       </Modal>
//     </>
//   );
// }

// const [showQRCodeIndex, setShowQRCodeIndex] = useState<number | null>(null);
// const handleShowQRCode = (index: number) => {
//   if (showQRCodeIndex === index) {
//     setShowQRCodeIndex(null);
//   } else {
//     setShowQRCodeIndex(index);
//   }
// };
// const handleHideQRCode = () => {
//   setShowQRCodeIndex(null);
// };

{
  /* <View
                    key={index}
                    style={{
                      backgroundColor: Colors.primaryColor2,
                      marginTop: 20,
                      paddingLeft: 20,
                      paddingRight: 20,
                      width: Viewport.width * 0.95,
                      height: Viewport.height * 0.4,
                      elevation: 4,
                    }}
                  >
                    <View
                      style={{
                        height: Viewport.height * 0.3,
                      }}
                    >
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
                              color: Colors.secondaryColor2,
                              fontWeight: "bold",
                              marginTop: Viewport.height * 0.03,
                              marginLeft: Viewport.width * 0.05,
                            },
                          ]}
                        >
                          Trip {schedule.trip_number}
                        </Text>
                      </View>
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
                              fontSize: FontSizes.small,
                              color: Colors.secondaryColor2,
                              fontWeight: "bold",
                              marginLeft: Viewport.width * 0.05,
                              marginTop: Viewport.height * 0.03,
                            },
                          ]}
                        >
                          Date: {schedule.date}
                        </Text>
                        <Text
                          style={[
                            {
                              fontSize: FontSizes.small,
                              color: Colors.secondaryColor2,
                              fontWeight: "bold",
                              marginLeft: Viewport.width * 0.1,
                              marginTop: Viewport.height * 0.03,
                            },
                          ]}
                        >
                          Time: {schedule.time}
                        </Text>
                      </View>
                      <Text
                        style={{
                          fontSize: FontSizes.small,
                          color: Colors.secondaryColor2,
                          marginLeft: Viewport.width * 0.05,
                          marginTop: Viewport.height * 0.03,
                        }}
                        numberOfLines={2}
                        ellipsizeMode="tail"
                      >
                        <Text style={{ fontWeight: "bold" }}>Destination:</Text>{" "}
                        {schedule.destination}
                      </Text>
  
                      <View
                        style={{
                          marginTop: Viewport.height * 0.03,
                          height: Viewport.height * 0.08,
                        }}
                      >
                        <Text
                          style={[
                            {
                              fontSize: FontSizes.small,
                              color: Colors.secondaryColor2,
                              marginLeft: Viewport.width * 0.05,
                            },
                          ]}
                        >
                          <Text style={{ fontWeight: "bold" }}>Passengers: </Text>
                          {schedule.requester_name},{" "}
                          {schedule.passenger_name &&
                          schedule.passenger_name.length > 0 ? (
                            schedule.passenger_name.length > 1 ? (
                              <Text>
                                {schedule.passenger_name.slice(0, 4).join(", ")}
                                <Text
                                  onPress={() =>
                                    handleShowPassengersModal(
                                      schedule.passenger_name
                                    )
                                  }
                                  style={{ fontWeight: "normal" }}
                                >
                                  {" "}
                                  and view more...
                                </Text>
                              </Text>
                            ) : (
                              schedule.passenger_name[0]
                            )
                          ) : (
                            "No passenger(s)"
                          )}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        alignItems: "center",
                        marginTop: Viewport.height * 0.01,
                      }}
                    >
                      <Button
                        text={
                          selectedStatus === "Upcoming"
                            ? "Upcoming"
                            : selectedStatus === "In Progress"
                            ? "Completed?"
                            : "QR code"
                        }
                        defaultBG
                        onPress={() => handleShowQRCode(index)}
                        disabled={selectedStatus === "Upcoming"}
                        style={
                          selectedStatus === "In Progress"
                            ? { backgroundColor: "green" }
                            : null
                        }
                      />
                      {showQRCodeIndex === index && (
                        <Modal
                          animationType="fade"
                          transparent={true}
                          onRequestClose={handleHideQRCode}
                        >
                          <View
                            style={[
                              {
                                flex: 1,
                                backgroundColor: "rgba(0, 0, 0, 0.5)",
                              },
                              Styles.flexColumn,
                            ]}
                          >
                            <View
                              style={[
                                {
                                  backgroundColor: Colors.primaryColor2,
                                  width: Viewport.width * 0.9,
                                  height: Viewport.height * 0.4,
                                  gap: 20,
                                  borderRadius: 10,
                                },
                                Styles.flexColumn,
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
                                {selectedStatus === "In Progress"
                                  ? "Trip completed?"
                                  : "Trip Ticket"}
                              </Text>
                              <QRCode
                                value={JSON.stringify(schedule)}
                                size={200}
                              />
                            </View>
                          </View>
                        </Modal>
                      )}
                    </View>
                  </View> */
}

{
  /* <Modal
        animationType="fade"
        transparent={true}
        visible={passengersModalVisible}
        onRequestClose={handleClosePassengersModal}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              padding: 15,
              borderRadius: 10,
              width: Viewport.width * 0.8,
              height: Viewport.height * 0.3,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: FontSizes.normal,
                fontWeight: "bold",
                marginBottom: 10,
              }}
            >
              All Passengers
            </Text>
            <ScrollView>
              {selectedPassengers.map((passenger, index) => (
                <Text
                  key={index}
                  style={{
                    fontSize: FontSizes.small,
                    marginBottom: 5,
                  }}
                >
                  {passenger}
                </Text>
              ))}
            </ScrollView>
            <View
              style={{
                marginTop: Viewport.height * 0.0,
              }}
            >
              <Button
                text="Close"
                transparentBG
                transparentText2
                onPress={handleClosePassengersModal}
              />
            </View>
          </View>
        </View>
      </Modal> */
}

// import QRCode from "react-native-qrcode-svg";
// const [passengersModalVisible, setPassengersModalVisible] = useState(false);
//   const [selectedPassengers, setSelectedPassengers] = useState<string[]>([]);

// const handleShowPassengersModal = (passengers: string[]) => {
//   setSelectedPassengers(passengers);
//   setPassengersModalVisible(true);
// };

// const handleClosePassengersModal = () => {
//   setPassengersModalVisible(false);
// };
