import useFetch from "@/hooks/useFetch";
// import useSocket from "@/hooks/useSocket";
import { NotificationType } from "@/types";
import { createContext, useEffect, useState } from "react";

interface NotificationProvider {
  children: React.ReactNode;
}

type NotificationContextType = {
  notifications: NotificationType[];
  setNotifications: React.Dispatch<React.SetStateAction<NotificationType[]>>;
};

const NotificationContext = createContext<NotificationContextType>({
  notifications: [],
  setNotifications: () => {},
});

const NotificationProvider = ({ children }: NotificationProvider) => {
  // const socket = useSocket();
  const { data: notificationsResult } = useFetch<{
    notifications: NotificationType[];
  }>("/notifications");
  const [notifications, setNotifications] = useState<NotificationType[]>([]);

  // useEffect(() => {
  //   if (!socket) return;

  //   socket.on("role_updated", (notification) => {
  //     setNotifications((prevNotifications) => [
  //       notification,
  //       ...prevNotifications,
  //     ]);
  //   });

  //   return () => {
  //     socket?.off("role_updated");
  //   };
  // }, [socket]);

  // Fetch notifications
  useEffect(() => {
    if (!notificationsResult) return;

    setNotifications(notificationsResult.notifications);
  }, [notificationsResult]);

  return (
    <NotificationContext.Provider value={{ notifications, setNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};

export { NotificationProvider, NotificationContext };
