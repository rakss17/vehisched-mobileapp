import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  Colors,
  FontSizes,
  Viewport,
} from "../../styles/globalstyles/globalstyles";

interface TimePickerProps {
  onTimeSelected: (hours: number, minutes: number, period: string) => void;
}

const TimePicker: React.FC<TimePickerProps> = ({ onTimeSelected }) => {
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [selectedHours, setSelectedHours] = useState<number | null>(null);
  const [selectedMinutes, setSelectedMinutes] = useState<number | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<"AM" | "PM" | null>(
    null
  );

  const togglePicker = () => {
    setIsPickerVisible(!isPickerVisible);
  };

  const formatNumberToTwoDigits = (number: number) => {
    return number < 10 ? `0${number}` : `${number}`;
  };

  const handleTimeSelected = () => {
    if (
      selectedHours !== null &&
      selectedMinutes !== null &&
      selectedPeriod !== null
    ) {
      onTimeSelected(selectedHours, selectedMinutes, selectedPeriod);
      togglePicker();
    }
  };

  const renderArrowButton = (
    type: "hours" | "minutes",
    direction: "up" | "down"
  ) => (
    <TouchableOpacity
      onPress={() => {
        if (type === "hours") {
          setSelectedHours((prevHours) => {
            let newHours =
              prevHours !== null
                ? prevHours + (direction === "up" ? 1 : -1)
                : 0;
            if (newHours > 12) newHours = 1;
            if (newHours < 1) newHours = 12;
            return newHours;
          });
        } else {
          setSelectedMinutes((prevMinutes) => {
            const newMinutes =
              prevMinutes !== null
                ? prevMinutes + (direction === "up" ? 1 : -1)
                : 0;
            if (newMinutes > 59) return 0;
            if (newMinutes < 0) return 59;
            return newMinutes;
          });
        }
      }}
    >
      <Ionicons
        name={direction === "up" ? "chevron-up" : "chevron-down"}
        size={20}
        color={Colors.primaryColor1}
      />
    </TouchableOpacity>
  );

  const togglePeriod = () => {
    setSelectedPeriod((prevPeriod) => (prevPeriod === "AM" ? "PM" : "AM"));
  };

  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <View style={styles.timePicker}>
          <TextInput
            style={styles.input}
            value={
              selectedHours !== null
                ? formatNumberToTwoDigits(selectedHours)
                : ""
            }
            placeholder="HH"
            keyboardType="number-pad"
            onChangeText={(text) => {
              const newHours = parseInt(text, 10);
              if (!isNaN(newHours) && newHours >= 0 && newHours <= 12) {
                setSelectedHours(newHours);
              }
            }}
          />
        </View>
        <View style={styles.arrowContainer}>
          {renderArrowButton("hours", "up")}
          {renderArrowButton("hours", "down")}
        </View>

        <View style={styles.timePicker}>
          <TextInput
            style={styles.input}
            value={
              selectedMinutes !== null
                ? formatNumberToTwoDigits(selectedMinutes)
                : ""
            }
            placeholder="MM"
            keyboardType="number-pad"
            onChangeText={(text) => {
              const newMinutes = parseInt(text, 10);
              if (!isNaN(newMinutes) && newMinutes >= 0 && newMinutes <= 59) {
                setSelectedMinutes(newMinutes);
              }
            }}
          />
        </View>
        <View style={styles.arrowContainer}>
          {renderArrowButton("minutes", "up")}
          {renderArrowButton("minutes", "down")}
        </View>
        <View style={styles.timePicker}>
          <Text style={styles.pickerText}>
            {selectedPeriod !== null ? selectedPeriod : "AM"}
          </Text>

          <View style={styles.arrowContainer}>
            <TouchableOpacity
              onPress={() => {
                togglePeriod();
              }}
            >
              <Ionicons
                name="chevron-up"
                size={20}
                color={Colors.primaryColor1}
              />
              <TouchableOpacity
                onPress={() => {
                  togglePeriod();
                }}
              >
                <Ionicons
                  name="chevron-down"
                  size={20}
                  color={Colors.primaryColor1}
                />
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        </View>
        {/* {selectedHours !== null &&
          selectedMinutes !== null &&
          selectedPeriod !== null && (
            <TouchableOpacity
              onPress={handleTimeSelected}
              style={styles.doneButton}
            >
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
          )} */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Viewport.height * 0.06,
    width: Viewport.width * 0.5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.secondaryColor1,
    borderRadius: 10,
    gap: 10,
  },
  //   button: {
  //     backgroundColor: "blue",
  //     padding: 10,
  //     borderRadius: 5,
  //     marginBottom: 10,
  //   },
  //   buttonText: {
  //     color: "white",
  //     fontSize: 18,
  //   },
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  timePicker: {
    height: Viewport.height * 0.06,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    gap: 10,
    display: "flex",
  },
  pickerText: {
    fontSize: FontSizes.normal,
  },
  doneButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },
  doneButtonText: {
    color: "white",
    fontSize: 18,
  },
  input: {
    fontSize: FontSizes.normal,
    height: Viewport.height * 0.06,
    width: Viewport.width * 0.06,
  },
  arrowContainer: {
    gap: 0.05,
  },
});

export default TimePicker;
