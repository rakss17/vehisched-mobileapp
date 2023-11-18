import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchPersonalInfo } from "../../redux/slices/personalInfoSlices";

export const serverSideUrl = "http://192.168.1.8:8000/media/";

const api = axios.create({
  baseURL: "http://192.168.1.8:8000/",
});

export async function SigninAPI(
  data: any,
  navigation: any,
  setData: any,
  setErrorMessage: any,
  setIsLoading: any,
  dispatch: any
) {
  try {
    const response = await api.post("api/v1/accounts/token/login", data);
    const token = response.data.auth_token;

    await AsyncStorage.setItem("token", token);

    const res = await api.get("api/v1/accounts/me/", {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    });
    dispatch(fetchPersonalInfo(res.data));
    setData("");
    setErrorMessage("");
    setIsLoading(false);
    if (res.data.role === "requester" || res.data.role === "vip") {
      navigation.navigate("Requester");
      setIsLoading(false);
    } else if (res.data.role === "driver") {
      navigation.navigate("Driver");
      setIsLoading(false);
    } else if (res.data.role === "gate guard") {
      navigation.navigate("GateGuard");
      setIsLoading(false);
    }
  } catch (error: any) {
    if (error.message.includes("400")) {
      setErrorMessage("Invalid Credentials");
      navigation.navigate("Landing");
      setIsLoading(false);
    } else {
      navigation.navigate("Landing");
      setIsLoading(false);
      setErrorMessage("Server Error");
    }
  }
}

export async function tripScanned(
  requestId: any,
  setScannedAuthorized: any,
  setScannedCompleted: any,
  setScannedAlreadyCompleted: any,
  setScannedTripNotFound: any,
  fetchOnTrips: (onTripsData: any) => void,
  setOnTripsData: any,
  setScanButtonPressed: any
) {
  const token = await AsyncStorage.getItem("token");

  api
    .patch(
      `/api/v1/trip/trip-scanned/${requestId}/`,
      {},
      {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      if (response.data.type === "Authorized") {
        setScanButtonPressed(false);
        setScannedAuthorized(true);
        fetchOnTrips(setOnTripsData);
      } else if (response.data.type === "Completed") {
        setScanButtonPressed(false);
        setScannedCompleted(true);
        fetchOnTrips(setOnTripsData);
      } else if (response.data.type === "Already Completed") {
        setScanButtonPressed(false);
        setScannedAlreadyCompleted(true);
        fetchOnTrips(setOnTripsData);
      }
    })
    .catch((error) => {
      console.log(error.response);
      if (error.response.status === 404) {
        setScanButtonPressed(false);
        setScannedTripNotFound(true);
        fetchOnTrips(setOnTripsData);
      }
    });
}

export async function fetchOnTrips(setOnTripsData: any, setRefreshing?: any) {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await api.get("api/v1/trip/on-trips-gateguard/", {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (Array.isArray(response.data)) {
      setOnTripsData(response.data);
      if (setRefreshing) {
        setRefreshing(false);
      }
    } else {
      setOnTripsData([]);
      if (setRefreshing) {
        setRefreshing(false);
      }
    }
  } catch (error) {
    console.log(error);
  }
}

export async function fetchRecentTrips(
  setRecentLogsData: any,
  setRefreshing?: any
) {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await api.get("api/v1/trip/recent-trips-gateguard/", {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (Array.isArray(response.data)) {
      setRecentLogsData(response.data);
      if (setRefreshing) {
        setRefreshing(false);
      }
    } else {
      setRecentLogsData([]);
      if (setRefreshing) {
        setRefreshing(false);
      }
    }
  } catch (error) {
    console.log(error);
  }
}

export async function fetchDriverOwnSchedule(
  setScheduleData: any,
  setRefreshing?: any
) {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await api.get("api/v1/trip/driver-own-schedule/", {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (Array.isArray(response.data)) {
      setScheduleData(response.data);
      if (setRefreshing) {
        setRefreshing(false);
      }
    } else {
      setScheduleData([]);
      if (setRefreshing) {
        setRefreshing(false);
      }
    }
  } catch (error) {
    console.log(error);
  }
}

export async function fetchDriverTrips(
  setOriginalTripData: any,
  setRefreshing?: any
) {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await api.get("api/v1/trip/driver-trips-schedule/", {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (Array.isArray(response.data)) {
      setOriginalTripData(response.data);
      if (setRefreshing) {
        setRefreshing(false);
      }
    } else {
      setOriginalTripData([]);
      if (setRefreshing) {
        setRefreshing(false);
      }
    }
  } catch (error) {
    console.log(error);
  }
}

export async function handlePlaceSelect(
  place: any,
  travel_date: any,
  travel_time: any,
  setData: (data: any) => void,
  setAddressData: (addressData: any) => void,
  category: any
) {
  try {
    const response = await api.get("api/v1/request/place-details/", {
      params: {
        place_id: place.place_id,
        travel_date: travel_date,
        travel_time: travel_time,
      },
    });
    if (category === "Round Trip") {
      const distanceString = response.data.distance;
      const distance = parseFloat(distanceString);
      const addressComponents = response.data.result.address_components.map(
        (component: any) => ({
          short_name: component.short_name,
        })
      );
      const addressName = response.data.result.name;
      const fullAddress =
        addressName +
        ", " +
        addressComponents
          .map((component: any) => component.short_name)
          .join(", ");
      setAddressData((prevData: any) => ({
        ...prevData,
        distance: distance,
        destination: fullAddress,
      }));
    } else if (
      category === "One-way - Drop" ||
      category === "One-way - Fetch" ||
      category === "One-way"
    ) {
      const [return_date, return_time] =
        response.data.estimated_return_time.split("T");
      setData((prevData: any) => ({
        ...prevData,
        return_date: return_date,
        return_time: return_time,
      }));
      const distanceString = response.data.distance;
      const distance = parseFloat(distanceString);
      const addressComponents = response.data.result.address_components.map(
        (component: any) => ({
          short_name: component.short_name,
        })
      );
      const addressName = response.data.result.name;
      const fullAddress =
        addressName +
        ", " +
        addressComponents
          .map((component: any) => component.short_name)
          .join(", ");
      setAddressData((prevData: any) => ({
        ...prevData,
        distance: distance,
        destination: fullAddress,
      }));
    }
  } catch (error) {
    console.log("Error:", error);
  }
}
