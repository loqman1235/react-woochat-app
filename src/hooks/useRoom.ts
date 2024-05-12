import { RoomContext } from "@/context/RoomContext";
import { useContext } from "react";

const useRoom = () => {
  return useContext(RoomContext);
};

export default useRoom;
