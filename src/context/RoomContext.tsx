import api from "@/services/api";
import { Room } from "@/types";
import { AxiosError } from "axios";
import { createContext, useEffect, useState } from "react";

type RoomContextType = {
  rooms: Room[];
  isLoading: boolean;
  error: string | null;
  addRoom: (newRoom: Room) => void;
  setRooms: React.Dispatch<React.SetStateAction<Room[]>>;
  setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>;
  setError?: React.Dispatch<React.SetStateAction<string | null>>;
};

type RoomProviderProps = {
  children: React.ReactNode;
};

export const RoomContext = createContext<RoomContextType>({
  rooms: [],
  setRooms: () => {},
  addRoom: () => {},
  isLoading: true,
  error: null,
});

export const RoomProvider = ({ children }: RoomProviderProps) => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const addRoom = (newRoom: Room) => {
    setRooms((prevRooms) => [newRoom, ...prevRooms]);
  };

  // Fetch rooms
  useEffect(() => {
    // Fetch rooms
    const fetchRooms = async () => {
      try {
        const response = await api.get<{ rooms: Room[] }>("/rooms");
        if (response.status === 200) setRooms(response.data.rooms);
      } catch (error) {
        if (error instanceof AxiosError) {
          setError(error.response?.data.message);
        }
      } finally {
        setIsLoading(false);
      }
    };
    if (rooms.length === 0) fetchRooms();
  }, [rooms]);

  return (
    <RoomContext.Provider
      value={{
        rooms,
        setRooms,
        isLoading,
        error,
        setIsLoading,
        setError,
        addRoom,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};
