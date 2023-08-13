import React, { useRef } from "react";
import { StyleSheet, View, TextInput, FlatList } from "react-native";
import SuggestionListItem from "./suggestionlistitems";
import {
  Colors,
  Styles,
  Viewport,
} from "../../styles/globalstyles/globalstyles";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import {
  SuggestionAddress,
  SuggestionAddressProps,
} from "../../interfaces/interfaces";

export function SuggestionsAddress(props: SuggestionAddressProps) {
  const searchInputRef = useRef<TextInput | null>(null);

  const handleOnPressItem = (item: SuggestionAddress) => {
    if (searchInputRef.current) {
      searchInputRef.current.blur();
    }
    props.onPressItem(item);
  };

  return (
    <View style={styles.suggestionListContainer}>
      <View style={[{}, Styles.flexRow]}>
        <TextInput
          ref={searchInputRef}
          style={styles.searchInput}
          placeholder={props.placeholder}
          onChangeText={props.handleSearchTextChange}
        />
        <FontAwesomeIcon style={styles.icon} icon={faCaretDown} />
      </View>

      {props.showList && (
        <FlatList
          style={styles.searchList}
          keyExtractor={(item, index) => index.toString()}
          keyboardShouldPersistTaps="always"
          initialNumToRender={5}
          data={props.suggestionListData}
          renderItem={({ item }) => (
            <SuggestionListItem onPressItem={handleOnPressItem} item={item} />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  searchInput: {
    height: Viewport.height * 0.07,
    width: Viewport.width * 0.6,
    padding: 10,
    borderBottomWidth: 1,
  },
  suggestionListContainer: {
    width: Viewport.width * 0.71,
  },
  searchList: {
    top: 5,
    right: 20,
    borderRadius: 10,
    backgroundColor: Colors.secondaryColor1,
  },
  icon: {
    position: "absolute",
    left: Viewport.width * 0.53,
  },
});

export default SuggestionsAddress;
