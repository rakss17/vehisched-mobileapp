import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchPersonalInfo } from "../../redux/slices/personalInfoSlices";
import { parse, format, isValid } from "date-fns";
import { getTimeFormat } from "../function/function";

export const serverSideUrl = "http://192.168.1.115:8000/media/";

export const api = axios.create({
  baseURL: "http://192.168.1.115:8000/",
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

export async function SignoutAPI(navigation: any, setIsLoading: any) {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await api.post(
      "api/v1/accounts/token/logout",
      {},
      {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    setIsLoading(false);
    navigation.navigate("Landing");
    AsyncStorage.removeItem("token");
  } catch (error: any) {
    // if (error.message.includes("400")) {
    // setErrorMessage("Server Error");
    //   setIsLoading(false);
    // } else {
    //   navigation.navigate("Landing");
    //   setIsLoading(false);
    // }
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
  travel_timee: any,
  setTripData: (data: any) => void,
  setAddressData: (addressData: any) => void,
  category: any
) {
  const date = parse(travel_timee, "hh:mm aa", new Date());

  const travel_time = format(date, "HH:mm");
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
      setTripData((prevData: any) => ({
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

export async function fetchRequestAPI(
  setRequestFilteredData?: any,
  setRefreshing?: any,
  setPendingSchedule?: any,
  setSelectedCategory?: any
) {
  const token = await AsyncStorage.getItem("token");
  api
    .get("api/v1/request/fetch-post/", {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      const responseData = Array.isArray(response.data)
        ? response.data
        : [response.data];

      const updatedData = responseData.map((item) => {
        if (item.passenger_name) {
          const validJson = item.passenger_name.replace(/'/g, '"');
          const passengerNamesArray = JSON.parse(validJson);
          item.passenger_name = passengerNamesArray.join(", ");
        }
        return item;
      });

      if (updatedData) {
        setRequestFilteredData(updatedData);
      }

      const pendingScheduleTrips = response.data.filter(
        (trip: any) => trip.status === "Pending"
      );
      if (pendingScheduleTrips && pendingScheduleTrips.length > 0) {
        setPendingSchedule(pendingScheduleTrips);
        setSelectedCategory("Ongoing Schedule");
      }

      if (setRefreshing) {
        setRefreshing(false);
      }
    })
    .catch((error) => {
      console.error("Error fetching request list:", error);
    });
}

export async function checkVehicleAvailability(
  setVehicles: any,
  preferred_start_travel_date: any,
  preferred_start_travel_timee: any,
  preferred_end_travel_date: any,
  preferred_end_travel_timee: any,
  preferred_capacity: any,
  setSelectedCategory: any,
  setIsSetTripLoading: any
) {
  const start_time_format = getTimeFormat(preferred_start_travel_timee);

  let preferred_start_travel_time = preferred_start_travel_timee;
  if (start_time_format) {
    const date = parse(
      preferred_start_travel_timee,
      start_time_format,
      new Date()
    );
    if (!isValid(date)) {
      throw new Error("Invalid date for preferred_start_travel_timee");
    }
    preferred_start_travel_time = format(date, "HH:mm");
  }

  let preferred_end_travel_time = preferred_end_travel_timee;
  const end_time_format = getTimeFormat(preferred_end_travel_timee);
  if (end_time_format) {
    const datee = parse(
      preferred_end_travel_timee,
      end_time_format,
      new Date()
    );
    if (!isValid(datee)) {
      throw new Error("Invalid date for preferred_end_travel_timee");
    }
    preferred_end_travel_time = format(datee, "HH:mm");
  }
  const token = await AsyncStorage.getItem("token");
  api
    .get("/api/v1/trip/check-vehicle-availability/", {
      params: {
        preferred_start_travel_date: preferred_start_travel_date,
        preferred_start_travel_time: preferred_start_travel_time,
        preferred_end_travel_date: preferred_end_travel_date,
        preferred_end_travel_time: preferred_end_travel_time,
        preferred_capacity: preferred_capacity,
      },
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      setIsSetTripLoading(false);
      setVehicles(response.data);

      setSelectedCategory("Available Vehicle");
    })
    .catch((error) => {
      setIsSetTripLoading(false);
      // if (error.response && error.response.data) {
      //   setLoadingBarProgress(50);
      //   setLoadingBarProgress(100);
      //   const errorMessage = error.response.data.error || "An error occurred.";
      //   toast.error(errorMessage, {
      //     position: toast.POSITION.TOP_CENTER,
      //     autoClose: false,
      //   });
      // } else {
      //   toast.error("An unknown error occurred.", {
      //     position: toast.POSITION.TOP_CENTER,
      //     autoClose: false,
      //   });
      // }
      // console.log("Error fetching vehicle list:", error);
    });
}

export async function postRequestFromAPI(
  data: any,
  setIsConfirmationShow: any,
  setRequestFormData: any,
  setVehicles: any,
  setTripData: any,
  setAddressData: any,
  setSelectedTravelCategory: any,
  setSelectedTravelType: any,
  setIsRequestSubmissionLoading: any
) {
  const token = await AsyncStorage.getItem("token");
  const requestData = {
    ...data,
    passenger_name: JSON.stringify(data.passenger_name),
  };
  api
    .post("api/v1/request/fetch-post/", requestData, {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      setIsRequestSubmissionLoading(false);
      setIsConfirmationShow(true);
      setRequestFormData({
        requester_name: "",
        office: "",
        number_of_passenger: null,
        passenger_name: [],
        destination: "",
        distance: "",
        travel_date: "",
        travel_time: "",
        return_date: "",
        return_time: "",
        purpose: "",
        vehicle: "",
        type: "",
      });
      setVehicles([]);
      setTripData({
        travel_date: "",
        travel_time: "",
        return_date: "",
        return_time: "",
        capacity: null,
        category: "Round Trip",
      });
      setAddressData({
        destination: "",
        distance: null,
      });
      setSelectedTravelCategory("Round Trip");
      setSelectedTravelType("");
    })
    .catch((error) => {
      setIsRequestSubmissionLoading(false);
      console.log(error.response);
      // if (error.response && error.response.data) {
      //   setLoadingBarProgress(50);
      //   setLoadingBarProgress(100);
      //   const errorMessage = error.response.data.error || "An error occurred.";
      //   toast.error(errorMessage, {
      //     position: toast.POSITION.TOP_CENTER,
      //     autoClose: false,
      //   });
      // } else {
      //   toast.error("An unknown error occurred.", {
      //     position: toast.POSITION.TOP_CENTER,
      //     autoClose: false,
      //   });
      // }
    });
}

export async function fetchSchedule(
  setSchedule: any,
  setNextSchedule: any,
  setVehicleRecommendation: any,
  setSelectedCategory: any,
  setRefreshingSchedule?: any
) {
  const token = await AsyncStorage.getItem("token");
  api
    .get("api/v1/trip/fetch-requester/", {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      const tripData = response.data.trip_data || [];
      const scheduleData = tripData.filter(
        (item: any) => !item.next_schedule_travel_date
      );

      const nextScheduleData = tripData.filter(
        (item: any) => item.next_schedule_travel_date
      );
      const vehicleRecommendation = response.data.vehicle_recommendation || [];
      setVehicleRecommendation(vehicleRecommendation);
      if (
        scheduleData ||
        nextScheduleData ||
        vehicleRecommendation
      ) {
      setSchedule(scheduleData);
      setNextSchedule(nextScheduleData);
        setSelectedCategory("Ongoing Schedule");
     
    } else {
      setSelectedCategory("Set Trip");
    }
    
    
      
      
      if (setRefreshingSchedule) {
        setRefreshingSchedule(false);
      }
    })
    .catch((error) => {
      console.error("Error fetching schedule list:", error);
    });
}

export async function acceptVehicleAPI(
  requestId: any,
  selectedVehicleRecommendation: any,
  setSelectedVehicleRecommendation: any,
  setIsLoading: any,
  fetchSchedule: any,
  setSchedule: any,
  setNextSchedule: any,
  setVehicleRecommendation: any,
  setSelectedCategory: any,
  fetchRequestAPI: any,
  setPendingSchedule: any,
  setIsConfirmationAcceptedShow: any
) {
  const token = await AsyncStorage.getItem("token");
  api
    .patch(
      `/api/v1/trip/accept-vehicle/${requestId}/`,
      {
        plate_number: selectedVehicleRecommendation,
      },
      {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      fetchSchedule(
        setSchedule,
        setNextSchedule,
        setVehicleRecommendation,
        setSelectedCategory,
        undefined
      );
      fetchRequestAPI(
        () => {},
        undefined,
        setPendingSchedule,
        () => {}
      );
      setSelectedVehicleRecommendation("");
      setIsLoading(false);
      setIsConfirmationAcceptedShow(true);
    })
    .catch((error) => {
      setIsLoading(false);
      console.log(error);
    });
}

export async function cancelRequestAPI(
  requestId: any,
  setIsLoading: any,
  fetchSchedule?: any,
  setSchedule?: any,
  setNextSchedule?: any,
  setVehicleRecommendation?: any,
  setSelectedCategory?: any,
  fetchRequestAPI?: any,
  setPendingSchedule?: any,
  setIsConfirmationCanceledShow?: any,
  setOriginalRequestData?: any
) {
  const token = await AsyncStorage.getItem("token");

  api
    .patch(
      `/api/v1/request/cancel/${requestId}/`,
      {
        status: "Canceled",
      },
      {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      fetchSchedule(
        setSchedule,
        setNextSchedule,
        setVehicleRecommendation,
        setSelectedCategory,
        undefined
      );
      fetchRequestAPI(
        setOriginalRequestData,
        undefined,
        setPendingSchedule,
        () => {}
      );
      setIsLoading(false);
      setIsConfirmationCanceledShow(true);
    })
    .catch((error) => {
      setIsLoading(false);
      console.log(error);
    });
}

export async function fetchVehicleVIPAPI(
  setVehicles: any,
  setSelectedCategory: any
) {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await api.get("api/v1/vehicles/fetch-vehicle-vip/", {
      params: {
        role: "vip",
      },
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    });

    setVehicles(response.data);
    setSelectedCategory("Available Vehicle");
  } catch (error) {
    console.log(error);
  }
}


