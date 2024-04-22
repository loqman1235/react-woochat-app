import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { ProfileModal } from "@/components/shared/Modal";
import { ChatWindoProvider } from "@/context/ChatWindowContext";
import { ProfileContextProvider } from "@/context/ProfileContext";
import { SidebarToggleProvider } from "@/context/SidebarToggleContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <>
      <ThemeProvider>
        <ProfileContextProvider>
          <SidebarToggleProvider>
            <ChatWindoProvider>
              <Navbar />
              <Outlet />
              <Footer />
              <ProfileModal />
            </ChatWindoProvider>
          </SidebarToggleProvider>
        </ProfileContextProvider>
      </ThemeProvider>
    </>
  );
};

export default AppLayout;
