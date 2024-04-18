import { UserProps } from "@/components/UsersMenu/User";
import { createContext, useState } from "react";

type ChatWindowContextType = {
  isChatWindowOpen: boolean;
  setIsChatWindowOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggleChatWindow: () => void;
  currentUser: UserProps;
  setCurrentUser: React.Dispatch<React.SetStateAction<UserProps>>;
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
    avatar: "",
    gender: "male",
    mood: "",
    role: "user",
    country: "",
  },
  setCurrentUser: () => {},
});

export const ChatWindoProvider = ({ children }: ChatWindowProviderProps) => {
  const [isChatWindowOpen, setIsChatWindowOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserProps>({
    id: "",
    username: "",
    avatar: "",
    gender: "male",
    mood: "",
    role: "user",
    country: "",
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
