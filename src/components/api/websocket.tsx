import { Platform } from "react-native";
import React, { useEffect } from "react";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import { api } from "./api";
import { useFocusEffect } from "@react-navigation/native";

const serverSideUrl = "192.168.1.15:8000";

export function NotificationApprovalScheduleReminderWebsocket(userName: any) {
  useFocusEffect(
    React.useCallback(() => {
      const newSocket = new WebSocket(
        `ws://${serverSideUrl}/ws/notification/approval_schedule-reminder/?requester_name=${userName}`
      );

      newSocket.onopen = async (event) => {
        console.log(
          "Notification approval and schedule reminder connection opened"
        );
        newSocket.send(
          JSON.stringify({
            action: ["approve", "reminder", "reject"],
          })
        );
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== "granted") {
          alert("No notification permissions!");
          return;
        }

        if (Platform.OS === "android") {
          Notifications.setNotificationChannelAsync("default", {
            name: "default",
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: "#FF231F7C",
          });
        }
      };

      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: true,
        }),
      });

      newSocket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (
          data.type === "approve.notification" &&
          data.status === "Approved" &&
          data.message != "Notification message goes here"
        ) {
          Notifications.scheduleNotificationAsync({
            content: {
              title: "Approval",
              body: data.message,
            },
            trigger: null,
          });
        } else if (
          data.type === "reject.notification" &&
          data.status === "Rejected" &&
          data.message != "Notification message goes here"
        ) {
          Notifications.scheduleNotificationAsync({
            content: {
              title: "Rejection",
              body: data.message,
            },
            trigger: null,
          });
        } else if (
          data.type === "schedule.reminder" &&
          data.status === "Reminder" &&
          data.message != "Notification message goes here"
        ) {
          Notifications.scheduleNotificationAsync({
            content: {
              title: "Schedule Reminder",
              body: data.message,
            },
            trigger: null,
          });
        } else if (
          data.type === "recommend.notification" &&
          data.status === "Recommend" &&
          data.message != "Notification message goes here" &&
          data.message.includes("unexpected maintenance")
        ) {
          Notifications.scheduleNotificationAsync({
            content: {
              title: "Vehicle Maintenance",
              body: data.message + " Press here to see alternative vehicles.",
            },
            trigger: null,
          });
        } else if (
          data.type === "recommend.notification" &&
          data.status === "Recommend" &&
          data.message != "Notification message goes here" &&
          data.message.includes("is used by the higher official")
        ) {
          Notifications.scheduleNotificationAsync({
            content: {
              title: "Vehicle Prioritization",
              body: data.message + " Press here to see alternative vehicles.",
            },
            trigger: null,
          });
        }
      };

      newSocket.onclose = (event) => {
        console.log(
          "Notification approval and schedule reminder connection closed"
        );
      };

      return () => {
        newSocket.close();
      };
    }, [])
  );

  return null;
}

export function useFetchNotification(setNotifList: any) {
  useFocusEffect(
    React.useCallback(() => {
      const fetchNotification = async () => {
        const token = await AsyncStorage.getItem("token");

        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== "granted") {
          alert("No notification permissions!");
          return;
        }

        if (Platform.OS === "android") {
          Notifications.setNotificationChannelAsync("default", {
            name: "default",
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: "#FF231F7C",
          });
        }
        Notifications.setNotificationHandler({
          handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: true,
          }),
        });

        api
          .get("api/v1/notification/fetch/", {
            headers: {
              Authorization: `Token ${token}`,
              "Content-Type": "application/json",
            },
          })
          .then((response: any) => {
            setNotifList(response.data);
            const unreadNotifications = response.data.filter(
              (notification: any) => !notification.read_status
            );
            unreadNotifications.forEach((notification: any) => {
              if (notification.subject.includes("has been approved")) {
                let message = `${notification.subject} `;
                Notifications.scheduleNotificationAsync({
                  content: {
                    title: "Approval",
                    body: message,
                  },
                  trigger: null,
                });
              } else if (
                notification.subject.includes("Your travel will commence now")
              ) {
                let message = `${notification.subject} `;
                Notifications.scheduleNotificationAsync({
                  content: {
                    title: "Schedule Reminder",
                    body: message,
                  },
                  trigger: null,
                });
              } else if (notification.subject.includes("1 hour")) {
                let message = `${notification.subject} `;
                Notifications.scheduleNotificationAsync({
                  content: {
                    title: "Schedule Reminder",
                    body: message,
                  },
                  trigger: null,
                });
              } else if (notification.subject.includes("12 hours")) {
                let message = `${notification.subject} `;
                Notifications.scheduleNotificationAsync({
                  content: {
                    title: "Schedule Reminder",
                    body: message,
                  },
                  trigger: null,
                });
              } else if (notification.subject.includes("24 hours")) {
                let message = `${notification.subject} `;
                Notifications.scheduleNotificationAsync({
                  content: {
                    title: "Schedule Reminder",
                    body: message,
                  },
                  trigger: null,
                });
              } else if (
                notification.subject.includes("unexpected maintenance")
              ) {
                let message = `${notification.subject} `;
                Notifications.scheduleNotificationAsync({
                  content: {
                    title: "Vehicle Maintenance",
                    body: message + " Press here to see alternative vehicles.",
                  },
                  trigger: null,
                });
              } else if (
                notification.subject.includes("used by the higher official")
              ) {
                let message = `${notification.subject} `;
                Notifications.scheduleNotificationAsync({
                  content: {
                    title: "Vehicle Prioritization",
                    body: message + " Press here to see alternative vehicles.",
                  },
                  trigger: null,
                });
              }
            });
          })
          .catch((error: any) => {
            console.error("Error fetching notif list:", error);
          });
      };

      fetchNotification();
    }, [])
  );
}
