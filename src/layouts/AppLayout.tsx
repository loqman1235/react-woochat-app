import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { ProfileModal } from "@/components/Profile";
import { ChatWindoProvider } from "@/context/ChatWindowContext";
import { ProfileContextProvider } from "@/context/ProfileContext";
import { RoomProvider } from "@/context/RoomContext";
import { SidebarToggleProvider } from "@/context/SidebarToggleContext";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <>
      <ProfileContextProvider>
        <SidebarToggleProvider>
          <ChatWindoProvider>
            <RoomProvider>
              <Navbar />
              <Outlet />
              <Footer />
            </RoomProvider>
            <ProfileModal />
          </ChatWindoProvider>
        </SidebarToggleProvider>
      </ProfileContextProvider>
    </>
  );
};

export default AppLayout;
