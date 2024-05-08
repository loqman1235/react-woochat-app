import { User } from "@/types";
import { createContext, useState } from "react";

interface ProfileContextType {
  isProfileOpen: boolean;
  currentUser?: User;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  toggleProfile: () => void;
  setIsProfileOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ProfileProviderProps {
  children: React.ReactNode;
}

export const ProfileContext = createContext<ProfileContextType>({
  isProfileOpen: false,
  currentUser: undefined,
  setCurrentUser: () => {},
  toggleProfile: () => {},
  setIsProfileOpen: () => {},
});

export const ProfileContextProvider = ({ children }: ProfileProviderProps) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User>();

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <ProfileContext.Provider
      value={{
        isProfileOpen,
        toggleProfile,
        setIsProfileOpen,
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
