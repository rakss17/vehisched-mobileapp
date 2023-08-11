import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";

interface CalendarData {
  key: string;
  day?: number;
  isToday: boolean;
  isSelected: boolean | null;
}

interface CustomCalendarPickerProps {
  onDateSelected: (date: Date) => void;
}

const CustomCalendarPicker: React.FC<CustomCalendarPickerProps> = ({
  onDateSelected,
}) => {
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

  return (
    <View style={styles.container}>
      <View style={styles.dropdownContainer}>
        <TouchableOpacity onPress={toggleDropdown} style={styles.button}>
          <Text style={styles.buttonText}>
            {selectedDate ? selectedDate.toDateString() : "Select Date"}
          </Text>
        </TouchableOpacity>
        {isDropdownVisible && (
          <View style={styles.dropdown}>
            <View style={styles.monthHeader}>
              <TouchableOpacity onPress={() => handleMonthChange(-1)}>
                <Text>{"<"}</Text>
              </TouchableOpacity>
              <Text style={styles.monthHeaderText}>{monthLabel}</Text>
              <TouchableOpacity onPress={() => handleMonthChange(1)}>
                <Text>{">"}</Text>
              </TouchableOpacity>
            </View>
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
    top: 40,
    left: -100,
    right: 0,
    width: "100%",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 4,
    zIndex: 1,
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 4,
  },
  buttonText: {
    fontSize: 16,
  },
  monthHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  monthHeaderText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  dayCell: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "lightgray",
  },
  today: {
    backgroundColor: "lightblue",
  },
  todayText: {
    color: "blue",
  },
  selected: {
    backgroundColor: "lightgreen",
  },
  selectedText: {
    color: "green",
  },
});

export default CustomCalendarPicker;
