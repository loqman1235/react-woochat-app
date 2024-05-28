import useFetch from "@/hooks/useFetch";
import api from "@/services/api";
// import useSocket from "@/hooks/useSocket";
import { NotificationType } from "@/types";
import { createContext, useEffect, useState } from "react";

interface NotificationProvider {
  children: React.ReactNode;
}

type NotificationContextType = {
  notifications: NotificationType[];
  setNotifications: React.Dispatch<React.SetStateAction<NotificationType[]>>;
  createNotification: (
    message: string,
    type: string,
    reveiverId: string,
  ) => Promise<void>;
};

const NotificationContext = createContext<NotificationContextType>({
  notifications: [],
  setNotifications: () => {},
  createNotification: async () => {},
});

const NotificationProvider = ({ children }: NotificationProvider) => {
  // const socket = useSocket();
  const { data: notificationsResult } = useFetch<{
    notifications: NotificationType[];
  }>("/notifications");
  const [notifications, setNotifications] = useState<NotificationType[]>([]);

  const createNotification = async (
    message: string,
    type: string,
    reveiverId: string,
  ) => {
    try {
      const response = await api.post("/notifications", {
        type,
        message,
        reveiverId,
      });

      if (response.status === 201) {
        console.log(response.data.notification);
        // setNotifications((prevNotifications) => [
        //   response.data.notification,
        //   ...prevNotifications,
        // ]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch notifications
  useEffect(() => {
    if (!notificationsResult) return;

    setNotifications(notificationsResult.notifications);
  }, [notificationsResult]);

  return (
    <NotificationContext.Provider
      value={{ notifications, setNotifications, createNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export { NotificationProvider, NotificationContext };
