import React, { useState, useEffect } from "react";
import axios from "axios";
import { Suggestions } from "./suggestions"; // Assuming you have a Suggestions component
import * as Location from "expo-location";
import { AutoCompleteAddressProps } from "../../interfaces/interfaces";

interface Address {
  name: string | null;
  p1: string | null;
  p2: string | null;
  p3: string | null;
  p4: string | null;
  address: string;
  lat: number;
  lon: number;
}

function haversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance; // Distance in kilometers
}

const AutoCompleteAddress: React.FC<AutoCompleteAddressProps> = ({
  onDistanceCalculated,
}) => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") return;

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    };

    getLocation();
  }, []);

  const tomtomKey = "GVQpGM8LZWojxAKYq2GJpnZKX5jfcwJ2";

  const [placeholder, setPlaceholder] = useState<string>(
    "Search your destination..."
  );
  const [showList, setShowList] = useState<boolean>(false);
  const [suggestionListData, setSuggestionListData] = useState<Address[]>([]);

  const handleSearchTextChange = (changedSearchText: string) => {
    if (!changedSearchText || changedSearchText.length < 5) return;

    let baseUrl = `https://api.tomtom.com/search/2/poiSearch/${changedSearchText}.json?`;
    let searchUrl = baseUrl + `key=${tomtomKey}`;

    const countrySet = "PH";

    if (location) {
      searchUrl = searchUrl + `&lon=${location.coords.longitude}`;
      searchUrl = searchUrl + `&lat=${location.coords.latitude}`;
    }

    searchUrl = searchUrl + `&countrySet=${countrySet}`;
    axios
      .get(searchUrl)
      .then((response) => {
        let addresses: Address[] = response.data.results.map((v: any) => {
          let parts = v.address.freeformAddress.split(",");
          return {
            name: v.poi.name,
            p1: parts.length > 0 ? parts[0] : null,
            p2: parts.length > 1 ? parts[1] : null,
            p3: parts.length > 2 ? parts[2] : null,
            p4: parts.length > 3 ? parts[3] : null,
            address: v.address.freeformAddress,
            lat: v.position.lat,
            lon: v.position.lon,
          };
        });

        setSuggestionListData(addresses);
        setShowList(true);
      })
      .catch(function (error) {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            // Request made and server responded
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            console.log("giatay");
          } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
          }
        }
      });
  };

  const ustpCoordinates = {
    lat: 8.484771052817331, // USTP's latitude
    lon: 124.65672733061609, // USTP's longitude
  };

  const onPressItem = (item: Address) => {
    const distanceToUSTP = haversineDistance(
      ustpCoordinates.lat,
      ustpCoordinates.lon,
      item.lat,
      item.lon
    );

    const distanceToUSTPFormatted = distanceToUSTP.toFixed(2);

    setPlaceholder(item.address);
    setShowList(false);

    onDistanceCalculated(distanceToUSTPFormatted);
  };
  return (
    <Suggestions
      placeholder={placeholder}
      showList={showList}
      suggestionListData={suggestionListData}
      onPressItem={onPressItem}
      handleSearchTextChange={handleSearchTextChange}
    />
  );
};

export default AutoCompleteAddress;
