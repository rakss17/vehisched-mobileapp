import React, { useState } from "react";
import { View, Modal, Text, TextInput } from "react-native";
import {
  Viewport,
  Styles,
  Colors,
  FontSizes,
} from "../../styles/globalstyles/globalstyles";
import { ModalProps, TripData } from "../../interfaces/interfaces";
import DatePicker from "../datepicker/datepicker";
import TimePicker from "../timepicker/timepicker";
import Button from "../buttons/button";

const SetTripModal: React.FC<ModalProps> = ({
  animationType,
  transparent,
  visible,
  onRequestClose,
}) => {
  const [tripData, setTripData] = useState<TripData>({
    fromDate: "",
    fromTime: "",
    toDate: "",
    toTime: "",
    noOfPassenger: 0,
  });

  const handleFromDateSelected = (selectedDate: Date) => {
    const formattedDate = selectedDate.toLocaleDateString(undefined, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    setTripData((prevData) => ({
      ...prevData,
      fromDate: formattedDate,
    }));
  };

  const handleFromTimeSelected = (
    hours: number,
    minutes: number,
    period: string
  ) => {
    const formatNumberToTwoDigits = (number: number) => {
      return number < 10 ? `0${number}` : `${number}`;
    };
    const formattedHours = formatNumberToTwoDigits(hours);
    const formattedMinutes = formatNumberToTwoDigits(minutes);

    setTripData((prevData) => ({
      ...prevData,
      fromTime: `${formattedHours}:${formattedMinutes} ${period}`,
    }));
  };

  const handleToDateSelected = (selectedDate: Date) => {
    const formattedDate = selectedDate.toLocaleDateString(undefined, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    setTripData((prevData) => ({
      ...prevData,
      toDate: formattedDate,
    }));
  };

  const handleToTimeSelected = (
    hours: number,
    minutes: number,
    period: string
  ) => {
    const formatNumberToTwoDigits = (number: number) => {
      return number < 10 ? `0${number}` : `${number}`;
    };
    const formattedHours = formatNumberToTwoDigits(hours);
    const formattedMinutes = formatNumberToTwoDigits(minutes);

    setTripData((prevData) => ({
      ...prevData,
      toTime: `${formattedHours}:${formattedMinutes} ${period}`,
    }));
  };

  const handleSetTrip = () => {
    console.log(tripData);
  };
  return (
    <Modal
      animationType={animationType}
      transparent={transparent}
      visible={visible}
      onRequestClose={onRequestClose}
    >
      <>
        <View
          style={[
            {
              flex: 1,
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
                width: Viewport.width * 1,
                height: Viewport.height * 0.65,
                gap: 20,
              },
              Styles.flexColumn,
            ]}
          >
            <Text
              style={{
                fontSize: FontSizes.medium,
                color: Colors.primaryColor1,
                fontWeight: "bold",
              }}
            >
              Set Trip Date
            </Text>

            <View style={[{ gap: 30 }, Styles.flexRow]}>
              <Text
                style={{
                  fontSize: FontSizes.normal,
                  color: Colors.primaryColor1,
                  fontWeight: "bold",
                  marginBottom: Viewport.height * 0.08,
                }}
              >
                From:{" "}
              </Text>
              <View style={[{ gap: 10 }, Styles.flexColumn]}>
                <DatePicker onDateSelected={handleFromDateSelected} />
                <TimePicker onTimeSelected={handleFromTimeSelected} />
              </View>
            </View>
            <View style={[{ gap: 35 }, Styles.flexRow]}>
              <Text
                style={{
                  fontSize: FontSizes.normal,
                  color: Colors.primaryColor1,
                  fontWeight: "bold",
                  marginBottom: Viewport.height * 0.08,
                  marginLeft: Viewport.width * 0.064,
                }}
              >
                To:{" "}
              </Text>
              <View style={[{ gap: 10 }, Styles.flexColumn]}>
                <DatePicker onDateSelected={handleToDateSelected} />
                <TimePicker onTimeSelected={handleToTimeSelected} />
              </View>
            </View>
            <View style={[{ gap: 22 }, Styles.flexRow]}>
              <Text
                style={{
                  fontSize: FontSizes.normal,
                  color: Colors.primaryColor1,
                  fontWeight: "bold",
                }}
              >
                No. of Passenger{"("}s{"):"}
              </Text>
              <TextInput
                keyboardType="numeric"
                value={tripData.noOfPassenger.toString()}
                style={{
                  backgroundColor: Colors.secondaryColor1,
                  width: Viewport.width * 0.2,
                  height: Viewport.height * 0.06,
                  borderRadius: 10,
                  padding: 10,
                  fontSize: FontSizes.normal,
                }}
                onChangeText={(text) =>
                  setTripData({
                    ...tripData,
                    noOfPassenger: parseInt(text, 10) || 0,
                  })
                }
              />
            </View>
            <View style={[{ gap: 50 }, Styles.flexRow]}>
              <Button
                onPress={onRequestClose}
                text="Close"
                transparentBG
                transparentText
              />
              <Button onPress={handleSetTrip} text="Set Trip" defaultBG />
            </View>
          </View>
        </View>
      </>
    </Modal>
  );
};

export default SetTripModal;
