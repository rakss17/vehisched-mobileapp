import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { DropdownStyles } from "../../styles/components/dropdown/dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUser, faCaretDown } from "@fortawesome/free-solid-svg-icons";

type DropdownProps = {
  options: string[];
  onCategoryChange: (category: string) => void;
};

export default function Dropdown(props: DropdownProps) {
  const [selectedOption, setSelectedOption] = useState(props.options[0]);
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
        style={DropdownStyles.dropdownToggle}
        onPress={handleMenuToggle}
      >
        <FontAwesomeIcon style={DropdownStyles.dropdownIcon} icon={faUser} />
        <FontAwesomeIcon
          style={DropdownStyles.dropdownIcon}
          icon={faCaretDown}
        />
      </TouchableOpacity>
      {isOpen && (
        <FlatList
          style={DropdownStyles.dropdownMenu}
          data={props.options}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={DropdownStyles.dropdownMenuItem}
              onPress={() => handleMenuOptionClick(item)}
            >
              <Text style={DropdownStyles.dropdownText}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}
