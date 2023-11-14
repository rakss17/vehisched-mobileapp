import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchPersonalInfo } from "../../redux/slices/personalInfoSlices";

export const serverSideUrl = "http://192.168.1.6:8000/media/";

const api = axios.create({
  baseURL: "http://192.168.1.6:8000/",
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
    });
}

export async function fetchOnTrips(setOnTripsData: any) {
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
    } else {
      setOnTripsData([]);
    }
  } catch (error) {
    console.log(error);
  }
}

export async function fetchRecentTrips(setRecentLogsData: any) {
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
    } else {
      setRecentLogsData([]);
    }
  } catch (error) {
    console.log(error);
  }
}

export async function fetchDriverOwnSchedule(setScheduleData: any) {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await api.get("api/v1/trip/driver-own-schedule/", {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (Array.isArray(response.data)) {
      // console.log(response.data);
      setScheduleData(response.data);
    } else {
      setScheduleData([]);
    }
  } catch (error) {
    console.log(error);
  }
}
