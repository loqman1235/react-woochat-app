import { createContext, useState } from "react";

export type SidebarToggleContextType = {
  mainMenuOpen: boolean;
  usersMenuOpen: boolean;
  toggleMainMenu: () => void;
  toggleUsersMenu: () => void;
  setMainMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setUsersMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type SidebarToggleProviderProps = {
  children: React.ReactNode;
};

export const SidebarToggleContext = createContext<SidebarToggleContextType>({
  mainMenuOpen: true,
  usersMenuOpen: true,
  toggleMainMenu: () => {},
  toggleUsersMenu: () => {},
  setMainMenuOpen: () => {},
  setUsersMenuOpen: () => {},
});

export const SidebarToggleProvider = ({
  children,
}: SidebarToggleProviderProps) => {
  const [mainMenuOpen, setMainMenuOpen] = useState(true);
  const [usersMenuOpen, setUsersMenuOpen] = useState(true);

  const toggleMainMenu = () => {
    setMainMenuOpen(!mainMenuOpen);
  };

  const toggleUsersMenu = () => {
    setUsersMenuOpen(!usersMenuOpen);
  };

  return (
    <SidebarToggleContext.Provider
      value={{
        mainMenuOpen,
        usersMenuOpen,
        toggleMainMenu,
        toggleUsersMenu,
        setMainMenuOpen,
        setUsersMenuOpen,
      }}
    >
      {children}
    </SidebarToggleContext.Provider>
  );
};
