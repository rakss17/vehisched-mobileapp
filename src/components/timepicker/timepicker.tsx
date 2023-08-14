import React, { useState, useEffect } from "react";
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
import { TimePickerProps } from "../../interfaces/interfaces";

const TimePicker: React.FC<TimePickerProps> = ({
  onTimeSelected,
  secondBG,
}) => {
  const [selectedHours, setSelectedHours] = useState<number | null>(null);
  const [selectedMinutes, setSelectedMinutes] = useState<number | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<"AM" | "PM" | null>(
    null
  );
  useEffect(() => {
    if (
      selectedHours !== null &&
      selectedMinutes !== null &&
      selectedPeriod !== null
    ) {
      onTimeSelected(selectedHours, selectedMinutes, selectedPeriod);
    }
  }, [selectedHours, selectedMinutes, selectedPeriod]);

  const formatNumberToTwoDigits = (number: number) => {
    return number < 10 ? `0${number}` : `${number}`;
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
    setSelectedPeriod((prevPeriod) => {
      const newPeriod = prevPeriod === "AM" ? "PM" : "AM";
      return newPeriod;
    });
  };

  return (
    <View style={[styles.container, secondBG && styles.container2]}>
      <View
        style={[styles.pickerContainer, secondBG && styles.pickerContainer2]}
      >
        <View style={styles.timePicker}>
          <TextInput
            style={[styles.input, secondBG && styles.input2]}
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
            style={[styles.input, secondBG && styles.input2]}
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
            {selectedPeriod !== null ? selectedPeriod : "- -"}
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

  container2: {
    height: Viewport.height * 0.06,
    width: Viewport.width * 0.6,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primaryColor2,
    borderRadius: 10,
    gap: 10,
    borderBottomWidth: 1,
  },

  pickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  pickerContainer2: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
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
  input2: {
    fontSize: FontSizes.normal,
    height: Viewport.height * 0.06,
    width: Viewport.width * 0.085,
  },
  arrowContainer: {
    gap: 0.05,
  },
});

export default TimePicker;
