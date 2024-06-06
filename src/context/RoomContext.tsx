import useSocket from "@/hooks/useSocket";
import api from "@/services/api";
import { Room } from "@/types";
import { AxiosError } from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

type RoomContextType = {
  rooms: Room[];
  isLoading: boolean;
  error: string | null;
  addRoom: (newRoom: Room) => void;
  setRooms: React.Dispatch<React.SetStateAction<Room[]>>;
  deleteRoom: (roomId: string) => void;
  toggleRoomPin: (roomId: string) => void;
  getRoom: (roomId: string) => Room | undefined;
  setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>;
  setError?: React.Dispatch<React.SetStateAction<string | null>>;
};

type RoomProviderProps = {
  children: React.ReactNode;
};

export const RoomContext = createContext<RoomContextType>({
  rooms: [],
  setRooms: () => {},
  deleteRoom: () => {},
  toggleRoomPin: () => {},
  addRoom: () => {},
  getRoom: () => undefined,
  isLoading: true,
  error: null,
});

export const RoomProvider = ({ children }: RoomProviderProps) => {
  const socket = useSocket();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const addRoom = (newRoom: Room) => {
    setRooms((prevRooms) => [newRoom, ...prevRooms]);
  };

  // Delete room
  const deleteRoom = async (roomId: string) => {
    try {
      const response = await api.delete(`/rooms/${roomId}`);
      if (response.status === 200) {
        setRooms((prevRooms) => prevRooms.filter((room) => room.id !== roomId));
        toast.success(response.data.message);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.response?.data.message);
      }
    }
  };

  // Pin room
  const toggleRoomPin = async (roomId: string) => {
    try {
      const response = await api.patch(`/rooms/${roomId}/pin`);
      if (response.status === 200) {
        socket?.emit("pin_unpin_room", response.data.room);
        setRooms((prevRooms) =>
          prevRooms.map((room) =>
            room.id === roomId ? { ...room, isPinned: !room.isPinned } : room,
          ),
        );
        toast.success(response.data.message);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.response?.data.message);
      }
    }
  };

  const getRoom = (roomId: string) => rooms.find((room) => room.id === roomId);

  // Fetch rooms
  useEffect(() => {
    // Fetch rooms
    const fetchRooms = async () => {
      try {
        const response = await api.get<{ rooms: Room[] }>("/rooms");
        if (response.status === 200) {
          console.log("Fetched rooms:", response.data.rooms); // Log the fetched rooms
          setRooms(response.data.rooms);
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          setError(error.response?.data.message);
        }
      } finally {
        setIsLoading(false);
      }
    };
    if (rooms.length === 0) fetchRooms();
  }, [rooms, setRooms]);

  useEffect(() => {
    if (!socket) return;
    const handlePinUnpinRoom = (room: Room) => {
      const roomId = room.id;

      setRooms((prevRooms) =>
        prevRooms.map((prevRoom) =>
          prevRoom.id === roomId
            ? { ...prevRoom, isPinned: room.isPinned }
            : prevRoom,
        ),
      );
    };

    socket.on("pin_unpin_room", handlePinUnpinRoom);

    return () => {
      socket.off("pin_unpin_room", handlePinUnpinRoom);
    };
  }, [socket]);

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
        deleteRoom,
        toggleRoomPin,
        getRoom,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};
