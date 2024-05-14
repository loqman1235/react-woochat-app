import { User } from "@/types";
import { createContext, useState } from "react";

type ChatWindowContextType = {
  isChatWindowOpen: boolean;
  setIsChatWindowOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggleChatWindow: () => void;
  currentUser: User;
  setCurrentUser: React.Dispatch<React.SetStateAction<User>>;
};

interface ChatWindowProviderProps {
  children: React.ReactNode;
}

export const ChatWindowContext = createContext<ChatWindowContextType>({
  isChatWindowOpen: true,
  setIsChatWindowOpen: () => {},
  toggleChatWindow: () => {},
  currentUser: {
    id: "",
    username: "",
    avatar: {
      secure_url: "",
    },
    email: "",
    gender: "male",
    mood: "",
    role: "USER",
    location: {
      city: "",
      country: "",
      region: "",
      timezone: "",
    },
  },
  setCurrentUser: () => {},
});

export const ChatWindoProvider = ({ children }: ChatWindowProviderProps) => {
  const [isChatWindowOpen, setIsChatWindowOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User>({
    id: "",
    username: "",
    avatar: {
      secure_url: "",
    },
    email: "",
    gender: "male",
    mood: "",
    role: "USER",
    location: {
      city: "",
      country: "",
      region: "",
      timezone: "",
    },
  });

  const toggleChatWindow = () => {
    setIsChatWindowOpen((prev) => !prev);
  };

  return (
    <ChatWindowContext.Provider
      value={{
        isChatWindowOpen,
        setIsChatWindowOpen,
        toggleChatWindow,
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </ChatWindowContext.Provider>
  );
};
