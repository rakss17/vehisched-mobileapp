import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { handlePlaceSelect } from "../api/api";
import { useEffect, useState, useRef } from "react";
import { AutoCompleteAddressGoogleStyle } from "../../styles/components/googleaddressinput/googleaddressinput";

interface AutoCompleteAddressGoogleProps {
  travel_date?: any;
  travel_time?: any;
  setData: (data: any) => void;
  setAddressData: (addressData: any) => void;
  isDisabled?: boolean;
  category?: any;
  //   removeDestinationError: () => void;
}

export default function AutoCompleteAddressGoogle({
  travel_date: travelDateProp,
  travel_time: travelTimeProp,
  setData,
  setAddressData,
  isDisabled,
  category,
}: //   removeDestinationError,
AutoCompleteAddressGoogleProps) {
  const [travel_date, setTravelDate] = useState(travelDateProp);
  const [travel_time, setTravelTime] = useState(travelTimeProp);
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
        category
      );
      //   removeDestinationError();
    };
  }, [
    travel_date,
    travel_time,
    setData,
    setAddressData,
    category,
    // removeDestinationError,
  ]);

  useEffect(() => {
    setTravelDate(travelDateProp);
    setTravelTime(travelTimeProp);
  }, [travelDateProp, travelTimeProp]);

  return (
    <GooglePlacesAutocomplete
      styles={AutoCompleteAddressGoogleStyle}
      placeholder="Search here....."
      onPress={(data, details = null) =>
        onPlaceSelectedRef.current(data, details)
      }
      disableScroll={true}
      query={{
        key: apiKey,
        language: "en",
        types: ["establishment", "geocode"],
        components: "country:PH",
      }}
      onFail={(error) => console.error(error)}
      textInputProps={{
        editable: isDisabled,
      }}
    />
  );
}
