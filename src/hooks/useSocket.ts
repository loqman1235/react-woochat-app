import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const useSocket = (): Socket | null => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_BACKEND_URL as string, {
      autoConnect: false,
    });
    setSocket(newSocket);
    return () => {
      newSocket.close();
    };
  }, []);

  return socket;
};

export default useSocket;
