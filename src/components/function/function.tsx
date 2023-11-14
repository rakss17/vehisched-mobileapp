import { useEffect } from "react";
import { AppState, BackHandler } from "react-native";

export const useAppState = (
  fetchDriverOwnSchedule: Function,
  setOriginalScheduleData: Function
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
      fetchDriverOwnSchedule(setOriginalScheduleData);
    }
  };
};
