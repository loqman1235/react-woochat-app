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
  unreadNotificationsCount: number;
  setNotifications: React.Dispatch<React.SetStateAction<NotificationType[]>>;
  setUnreadNotificationsCount: React.Dispatch<React.SetStateAction<number>>;
  createNotification: (
    message: string,
    type: string,
    reveiverId: string,
  ) => Promise<void>;
  markNotificationsAsRead: () => Promise<void>;
};

const NotificationContext = createContext<NotificationContextType>({
  notifications: [],
  unreadNotificationsCount: 0,
  setNotifications: () => {},
  setUnreadNotificationsCount: () => {},
  createNotification: async () => {},
  markNotificationsAsRead: async () => {},
});

const NotificationProvider = ({ children }: NotificationProvider) => {
  // const socket = useSocket();
  const { data: notificationsResult } = useFetch<{
    notifications: NotificationType[];
  }>("/notifications");
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [unreadNotificationsCount, setUnreadNotificationsCount] = useState(0);

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

  // Mark notifications as read
  const markNotificationsAsRead = async () => {
    try {
      await api.patch("/notifications/mark-as-read");
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) => ({
          ...notification,
          isRead: true,
        })),
      );
      setUnreadNotificationsCount(0);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch notifications
  useEffect(() => {
    if (!notificationsResult) return;

    setNotifications(notificationsResult.notifications);
    setUnreadNotificationsCount(
      notificationsResult.notifications.filter(
        (notification) => !notification.isRead,
      ).length,
    );
  }, [notificationsResult]);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadNotificationsCount,
        setNotifications,
        createNotification,
        markNotificationsAsRead,
        setUnreadNotificationsCount,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export { NotificationProvider, NotificationContext };
