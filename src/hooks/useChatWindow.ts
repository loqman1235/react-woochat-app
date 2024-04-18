import { ChatWindowContext } from "@/context/ChatWindowContext";
import { useContext } from "react";

const useChatWindow = () => {
  return useContext(ChatWindowContext);
};

export default useChatWindow;
