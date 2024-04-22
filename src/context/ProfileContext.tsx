import { createContext, useState } from "react";

interface ProfileContextType {
  isProfileOpen: boolean;
  toggleProfile: () => void;
  setIsProfileOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ProfileProviderProps {
  children: React.ReactNode;
}

export const ProfileContext = createContext<ProfileContextType>({
  isProfileOpen: false,
  toggleProfile: () => {},
  setIsProfileOpen: () => {},
});

export const ProfileContextProvider = ({ children }: ProfileProviderProps) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <ProfileContext.Provider
      value={{ isProfileOpen, toggleProfile, setIsProfileOpen }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
