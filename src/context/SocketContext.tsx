import React, { createContext, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

type SocketContextType = Socket | null;

type SocketProviderProps = {
  children: React.ReactNode;
};

const SocketContext = createContext<SocketContextType>(null);

const SocketProvider = ({ children }: SocketProviderProps) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_BACKEND_URL);
    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export { SocketContext, SocketProvider };
