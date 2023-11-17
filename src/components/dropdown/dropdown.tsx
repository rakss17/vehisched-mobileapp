import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { DropdownStyles } from "../../styles/components/dropdown/dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUser, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { DropdownProps } from "../../interfaces/interfaces";
import { Viewport } from "../../styles/globalstyles/globalstyles";

export default function Dropdown(props: DropdownProps) {
  const [selectedOption, setSelectedOption] = useState(
    props.selectedCategory || props.options[0]
  );
  const [isOpen, setIsOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    props.onCategoryChange(option);
  };

  return (
    <View style={DropdownStyles.dropdown}>
      <TouchableOpacity
        style={[
          DropdownStyles.dropdownToggle,
          props.showBG && DropdownStyles.showBG,
        ]}
        onPress={handleMenuToggle}
      >
        {props.showText && (
          <>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: Viewport.width * 0.35,
              }}
            >
              <View>
                <Text style={DropdownStyles.label}>{selectedOption}</Text>
              </View>

              <View>
                <FontAwesomeIcon
                  style={DropdownStyles.dropdownIcon2}
                  icon={faCaretDown}
                />
              </View>
            </View>
          </>
        )}
        {props.showIcon && (
          <>
            <FontAwesomeIcon
              style={DropdownStyles.dropdownIcon}
              icon={faUser}
            />
            <FontAwesomeIcon
              style={DropdownStyles.dropdownIcon}
              icon={faCaretDown}
            />
          </>
        )}
      </TouchableOpacity>
      {isOpen && (
        <FlatList
          style={[
            DropdownStyles.dropdownMenu,
            props.menuAdjusted && DropdownStyles.dropdownMenuAdjusted,
          ]}
          data={props.options}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={DropdownStyles.dropdownMenuItem}
              onPress={() => handleMenuOptionClick(item)}
            >
              <Text
                style={[
                  DropdownStyles.dropdownText,
                  props.dropdownText2 && DropdownStyles.dropdownText2,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}
