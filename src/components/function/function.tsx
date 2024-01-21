import { useEffect } from "react";
import { AppState, BackHandler } from "react-native";
import { parse, format } from "date-fns";

export const useAppState = (
  fetchAPI?: Function,
  setAPIData?: Function,
  setAPIData12?: Function,
  setAPIData13?: Function,
  fetchAPI2?: Function,
  setAPIData2?: Function,
  setDataBoolean?: Function
) => {
  useEffect(() => {
    const handleBackPress = () => {
      AppState.currentState !== "background" &&
        AppState.currentState !== "inactive" &&
        BackHandler.exitApp();
      return true;
    };

    BackHandler.addEventListener("hardwareBackPress", handleBackPress);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
    };
  }, []);

  useEffect(() => {
    const appStateSubscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    return () => {
      appStateSubscription.remove();
    };
  }, []);

  const handleAppStateChange = (nextAppState: any) => {
    if (nextAppState === "active") {
      if (fetchAPI && setAPIData && undefined && undefined) {
        fetchAPI(setAPIData);
      }
      if (fetchAPI && setAPIData && setAPIData12 && setAPIData13) {
        fetchAPI(
          setAPIData,
          setAPIData12,
          setAPIData13,
          () => {},
          () => {}
        );
      }
      if (fetchAPI2 && setAPIData2) {
        fetchAPI2(
          () => {},
          undefined,
          setAPIData2,
          () => {}
        );
      }
    } else if (nextAppState === "background" || nextAppState === "inactive") {
      if (setDataBoolean) {
        setDataBoolean(false);
      }
    }
  };
};

export const format12to24HourFormat = (timeString: any) => {
  if (timeString) {
    if (timeString.split(":").length < 3) {
      const time = parse(timeString, "hh:mm aa", new Date());
      return format(time, "HH:mm");
    } else {
      return timeString;
    }
  } else {
    return "";
  }
};

export const formatTime = (timeString: any) => {
  if (timeString) {
    if (timeString.split(":").length < 3 ? "hh:mm aa" : null) {
      return timeString;
    } else {
      const time = new Date(`1970-01-01T${timeString}`);
      return time.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      });
    }
  } else {
    return "";
  }
};

export const formatDate = (inputDate: any) => {
  if (inputDate) {
    const datePart = inputDate.split("-");
    return `${datePart[1]}/${datePart[2]}/${datePart[0]}`;
  } else {
    return "";
  }
};

export const formatDateTime = (dateTimeString: any) => {
  const dateTime = new Date(dateTimeString);
  return dateTime.toLocaleString([], {
    dateStyle: "short",
    timeStyle: "short",
  });
};

export const getTimeFormat = (timeString: any) => {
  return timeString.split(":").length < 3 ? "hh:mm aa" : null;
};
