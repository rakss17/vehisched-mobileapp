import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const serverSideUrl = "http://192.168.1.6:8000/media/";

const api = axios.create({
  baseURL: "http://192.168.1.6:8000/",
});

export async function SigninAPI(
  data: any,
  navigation: any
  //   dispatch: any,
  //   setLoadingBarProgress: (progress: number) => void,
  //   setError: any
) {
  try {
    // setLoadingBarProgress(20);
    const response = await api.post("api/v1/accounts/token/login", data);
    const token = response.data.auth_token;

    await AsyncStorage.setItem("token", token);

    const res = await api.get("api/v1/accounts/me/", {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    });
    // setLoadingBarProgress(40);

    // setLoadingBarProgress(70);
    if (res.data.role === "requester" || res.data.role === "vip") {
      navigation.navigate("Requester");
    } else if (res.data.role === "driver") {
      navigation.navigate("Driver");
    } else if (res.data.role === "gate guard") {
      navigation.navigate("GateGuard");
    }
    // setLoadingBarProgress(100);
  } catch (error: any) {
    // setLoadingBarProgress(20);
    // setLoadingBarProgress(50);
    // setLoadingBarProgress(100);
    // setError(true);
    console.log(error.response);
  }
}

export async function tripScanned(
  requestId: any,
  setScanned: any,
  fetchOnTrips: (onTripsData: any) => void,
  setOnTripsData: any
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
      setScanned(true);
      fetchOnTrips(setOnTripsData);
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

    setOnTripsData(response.data);

    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
}
