import React, { useRef } from "react";
import { StyleSheet, View, TextInput, FlatList } from "react-native";
import SuggestionListItem from "./suggestionlistitems"; // Assuming SuggestionListItem component is defined

interface Suggestion {
  name: string | null;
  p1: string | null;
  p2: string | null;
  p3: string | null;
  p4: string | null;
  address: string;
  lat: number;
  lon: number;
}

interface SuggestionsProps {
  placeholder: string;
  showList: boolean;
  suggestionListData: Suggestion[];
  onPressItem: (item: Suggestion) => void;
  handleSearchTextChange: (text: string) => void;
}

export function Suggestions(props: SuggestionsProps) {
  const searchInputRef = useRef<TextInput | null>(null);

  const handleOnPressItem = (item: Suggestion) => {
    if (searchInputRef.current) {
      searchInputRef.current.blur();
    }
    props.onPressItem(item);
  };

  return (
    <View style={styles.suggestionListContainer}>
      <TextInput
        ref={searchInputRef}
        style={styles.searchInput}
        placeholder={props.placeholder}
        onChangeText={props.handleSearchTextChange}
      />

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
    height: 40,
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 1,
  },
  suggestionListContainer: {
    width: "90%",
    marginLeft: "5%",
  },
  searchList: {
    width: "95%",
    marginTop: 10,
  },
});

export default Suggestions;
