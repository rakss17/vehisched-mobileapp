import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { handlePlaceSelect } from "../api/api";
import { useEffect, useState, useRef } from "react";
import { AutoCompleteAddressGoogleStyle } from "../../styles/components/googleaddressinput/googleaddressinput";
import { View, TouchableOpacity, Modal, Text, ActivityIndicator } from "react-native";
import {
  Colors,
  FontSizes,
  Styles,
  Viewport,
} from "../../styles/globalstyles/globalstyles";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

interface AutoCompleteAddressGoogleProps {
  travel_date?: any;
  travel_time?: any;
  setData: (data: any) => void;
  setAddressData: (addressData: any) => void;
  isDisabled?: boolean;
  category?: any;
  isAutoCompleteAddressPressed?: any;
  setIsAutoCompleteAddressPressed?: any;
  //   removeDestinationError: () => void;
}

export default function AutoCompleteAddressGoogle({
  travel_date: travelDateProp,
  travel_time: travelTimeProp,
  setData,
  setAddressData,
  isDisabled,
  category,
  isAutoCompleteAddressPressed,
  setIsAutoCompleteAddressPressed,
}: //   removeDestinationError,
AutoCompleteAddressGoogleProps) {
  const [travel_date, setTravelDate] = useState(travelDateProp);
  const [travel_time, setTravelTime] = useState(travelTimeProp);
  const [labelData, setLabelData] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const apiKey = process.env.EXPO_PUBLIC_GOOGLE_MAP_API_KEY;

  const onPlaceSelectedRef = useRef<(data: any, details: any | null) => void>(
    () => {}
  );

  useEffect(() => {
    onPlaceSelectedRef.current = (data, details) => {
      
      handlePlaceSelect(
        details,
        travel_date,
        travel_time,
        setData,
        setAddressData,
        category,
        setLabelData
      );
      //   removeDestinationError();
    };
  }, [
    travel_date,
    travel_time,
    setData,
    setAddressData,
    category,
    setLabelData,
    // removeDestinationError,
  ]);

  useEffect(() => {
    if(labelData) {
      setIsLoading(false)
    }
  }, [labelData])

  useEffect(() => {
    setTravelDate(travelDateProp);
    setTravelTime(travelTimeProp);
  }, [travelDateProp, travelTimeProp]);

  return (
    <>
      <TouchableOpacity
        disabled={isDisabled}
        style={{
          backgroundColor: "#FFFFFF",
          height: 44,
          paddingVertical: 10,
          paddingHorizontal: 0,
          borderBottomWidth: 1,
          marginLeft: Viewport.width * 0.1,
          width: Viewport.width * 0.57,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}
        onPress={() => setIsAutoCompleteAddressPressed(true)}
      >
        <Text>{labelData !== "" ? labelData : "Search here....."}</Text>
        {isLoading && (
          <ActivityIndicator
          size={FontSizes.normal}
          color={Colors.primaryColor1}
        />
        )}
        
      </TouchableOpacity>
      <Modal
        visible={isAutoCompleteAddressPressed}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setIsAutoCompleteAddressPressed(false)}
      >
        <View
          style={[
            {
              flex: 1,
              backgroundColor: Colors.primaryColor2,
            },
            Styles.flexColumn,
          ]}
        >
          <View
            style={{
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "row",
              marginLeft: Viewport.width * 0.04,
              marginTop: Viewport.height * 0.02,
              flex: 1,
              gap: Viewport.width * 0.01,
            }}
          >
            <TouchableOpacity
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: Viewport.width * 0.09,
                height: Viewport.height * 0.055,
              }}
              onPress={() => setIsAutoCompleteAddressPressed(false)}
            >
              <FontAwesomeIcon size={23} color="red" icon={faXmark} />
            </TouchableOpacity>
            <GooglePlacesAutocomplete
              styles={AutoCompleteAddressGoogleStyle}
              placeholder="Search destination....."
              onPress={(data, details = null) => {
                onPlaceSelectedRef.current(data, details);
                setIsAutoCompleteAddressPressed(false);
                setIsLoading(true)
              }}
              query={{
                key: apiKey,
                language: "en",
                types: ["establishment", "geocode"],
                components: "country:PH",
              }}
              onFail={(error) => console.error(error)}
              textInputProps={{ autoFocus: true }}
            />
          </View>
        </View>
      </Modal>
    </>
  );
}
