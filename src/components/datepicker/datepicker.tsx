import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import {
  Colors,
  Viewport,
  FontSizes,
} from "../../styles/globalstyles/globalstyles";
import { CalendarData, DatePickerProps } from "../../interfaces/interfaces";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

const DatePicker: React.FC<DatePickerProps> = ({ onDateSelected }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [displayedMonth, setDisplayedMonth] = useState(new Date());
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleDatePress = (date: Date) => {
    setSelectedDate(date);
    onDateSelected(date);
    setIsDropdownVisible(false);
  };

  const handleMonthChange = (numMonths: number) => {
    setDisplayedMonth((prevMonth) => {
      const newMonth = new Date(prevMonth);
      newMonth.setMonth(prevMonth.getMonth() + numMonths);
      return newMonth;
    });
  };

  const toggleDropdown = () => {
    setIsDropdownVisible((prevState) => !prevState);
  };

  const generateCalendar = () => {
    const calendarData: CalendarData[] = [];

    const today = new Date();
    const daysInMonth = new Date(
      displayedMonth.getFullYear(),
      displayedMonth.getMonth() + 1,
      0
    ).getDate();
    const firstDayIndex = new Date(
      displayedMonth.getFullYear(),
      displayedMonth.getMonth(),
      1
    ).getDay();

    for (let i = 0; i < firstDayIndex; i++) {
      calendarData.push({
        key: `blank-${i}`,
        isToday: false,
        isSelected: null,
      });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(
        displayedMonth.getFullYear(),
        displayedMonth.getMonth(),
        i
      );
      const isToday = currentDate.toDateString() === today.toDateString();
      const isSelected =
        selectedDate &&
        currentDate.toDateString() === selectedDate.toDateString();

      calendarData.push({ key: i.toString(), day: i, isToday, isSelected });
    }

    return calendarData;
  };

  const monthLabel = displayedMonth.toLocaleDateString(undefined, {
    month: "long",
    year: "numeric",
  });

  const renderDayNamesRow = () => {
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return (
      <View style={styles.dayNamesRow}>
        {dayNames.map((dayName) => (
          <Text key={dayName} style={styles.dayNameText}>
            {dayName}
          </Text>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.dropdownContainer}>
        <TouchableOpacity onPress={toggleDropdown} style={styles.button}>
          <Text style={styles.buttonText}>
            {selectedDate
              ? selectedDate
                  .toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })
                  .replace(/\d{4}-/, "")
              : "mm/dd/yyyy"}
          </Text>
          <FontAwesomeIcon style={styles.icon} icon={faCalendarAlt} size={23} />
        </TouchableOpacity>
        {isDropdownVisible && (
          <View style={styles.dropdown}>
            <View style={styles.monthHeader}>
              <TouchableOpacity onPress={() => handleMonthChange(-1)}>
                <Text style={styles.arrow}>{"<"}</Text>
              </TouchableOpacity>
              <Text style={styles.monthHeaderText}>{monthLabel}</Text>
              <TouchableOpacity onPress={() => handleMonthChange(1)}>
                <Text style={styles.arrow}>{">"}</Text>
              </TouchableOpacity>
            </View>
            {renderDayNamesRow()}
            <FlatList
              data={generateCalendar()}
              keyExtractor={(item) => item.key}
              numColumns={7}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() =>
                    item.day &&
                    handleDatePress(
                      new Date(
                        displayedMonth.getFullYear(),
                        displayedMonth.getMonth(),
                        item.day
                      )
                    )
                  }
                  style={[
                    styles.dayCell,
                    item.isToday && styles.today,
                    item.isSelected && styles.selected,
                  ]}
                >
                  <Text
                    style={[
                      item.isToday && styles.todayText,
                      item.isSelected && styles.selectedText,
                    ]}
                  >
                    {item.day && item.day > 0 ? item.day.toString() : ""}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  dropdownContainer: {
    position: "relative",
    marginBottom: 10,
  },
  dropdown: {
    position: "absolute",
    top: Viewport.height * 0.07,
    left: Viewport.width * -0.15,
    right: 0,
    width: Viewport.width * 0.8,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 10,
    zIndex: 1,
  },
  button: {
    width: Viewport.width * 0.5,
    height: Viewport.height * 0.06,
    backgroundColor: Colors.secondaryColor1,
    gap: 15,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  buttonText: {
    fontSize: FontSizes.normal,
    color: Colors.secondaryColor2,
  },
  icon: {
    color: Colors.primaryColor1,
  },
  monthHeader: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginBottom: 10,
  },
  monthHeaderText: {
    fontSize: FontSizes.small,
    fontWeight: "bold",
  },
  arrow: {
    fontSize: FontSizes.normal,
  },
  dayCell: {
    width: Viewport.width * 0.115,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "white",
  },
  today: {
    backgroundColor: Colors.primaryColor2,
    borderRadius: 10,
  },
  todayText: {
    color: Colors.secondaryColor2,
  },
  selected: {
    backgroundColor: Colors.primaryColor1,
    borderRadius: 10,
  },
  selectedText: {
    color: Colors.secondaryColor1,
  },
  dayNamesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  dayNameText: {
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default DatePicker;
