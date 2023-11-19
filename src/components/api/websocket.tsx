import { Platform } from "react-native";
import { useEffect } from "react";
// import { toast } from "react-toastify";
import moment from "moment";
// import ToastContent from "../toastcontent/toastcontent";
import * as Notifications from "expo-notifications";

const serverSideUrl = "192.168.1.8:8000";

export function NotificationApprovalScheduleReminderWebsocket(userName: any) {
  useEffect(() => {
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
    // let date = new Date();
    // date.setSeconds(date.getSeconds() + 30);

    newSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (
        data.type === "approve.notification" &&
        data.status === "Approved" &&
        data.message != "Notification message goes here"
      ) {
        const justnow = "Just Now";
        Notifications.scheduleNotificationAsync({
          content: {
            title: "Approval",
            body: data.message,
          },
          trigger: null,
        });
        // toast.success(
        //   <ToastContent message={data.message} timeago={justnow} />,
        //   {
        //     position: toast.POSITION.TOP_CENTER,
        //     autoClose: false,
        //   }
        // );
      } else if (
        data.type === "reject.notification" &&
        data.status === "Rejected" &&
        data.message != "Notification message goes here"
      ) {
        const justnow = "Just Now";
        Notifications.scheduleNotificationAsync({
          content: {
            title: "Rejection",
            body: data.message,
          },
          trigger: null,
        });
        // toast.error(<ToastContent message={data.message} timeago={justnow} />, {
        //   position: toast.POSITION.TOP_CENTER,
        //   autoClose: false,
        // });
      } else if (
        data.type === "schedule.reminder" &&
        data.status === "Reminder" &&
        data.message != "Notification message goes here"
      ) {
        const justnow = "Just Now";
        Notifications.scheduleNotificationAsync({
          content: {
            title: "Schedule Rimender",
            body: data.message,
          },
          trigger: null,
        });
        // toast.info(<ToastContent message={data.message} timeago={justnow} />, {
        //   position: toast.POSITION.TOP_CENTER,
        //   autoClose: false,
        // });
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
  }, []);

  return null;
}
