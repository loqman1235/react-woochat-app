import useAuth from "@/hooks/useAuth";
import React, { createContext, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

type SocketContextType = Socket | null;

type SocketProviderProps = {
  children: React.ReactNode;
};

const SocketContext = createContext<SocketContextType>(null);

const SocketProvider = ({ children }: SocketProviderProps) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_BACKEND_URL);
    setSocket(newSocket);

    const connectHandler = () => {
      newSocket.emit("connect_user", { user });
    };

    newSocket.on("connect", connectHandler);

    return () => {
      newSocket.off("connect", connectHandler);
      newSocket.emit("disconnect_user", { user });
      newSocket.close();
    };
  }, [user, setSocket]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export { SocketContext, SocketProvider };
