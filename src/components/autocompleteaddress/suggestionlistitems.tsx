import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { Colors, Viewport } from "../../styles/globalstyles/globalstyles";
import { SuggestionListItemProps } from "../../interfaces/interfaces";

export function SuggestionListItem(props: SuggestionListItemProps) {
  return (
    <TouchableOpacity onPress={() => props.onPressItem(props.item)}>
      <View style={styles.searchListItem}>
        <View style={styles.searchListItemIcon}>
          <FontAwesomeIcon
            color={Colors.primaryColor1}
            size={23}
            icon={faMapMarkerAlt}
          />
        </View>

        <View>
          <Text style={styles.searchListItemTitle}>{props.item.p1}</Text>
          <Text>{props.item.name}</Text>
          {props.item.p2 && props.item.p3 ? (
            <Text>
              {props.item.p2} {props.item.p3} {props.item.p4}
            </Text>
          ) : null}

          {props.item.p2 && !props.item.p3 ? (
            <Text>{props.item.p2}</Text>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  searchListItemIcon: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
  },
  searchListItem: {
    marginTop: 5,
    marginBottom: 5,
    flexDirection: "row",
  },
  searchListItemTitle: {
    fontWeight: "bold",
  },
});

export default SuggestionListItem;
