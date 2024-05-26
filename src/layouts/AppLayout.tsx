import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { ProfileModal } from "@/components/Profile";
import { ChatWindoProvider } from "@/context/ChatWindowContext";
import { NotificationProvider } from "@/context/NotificationContext";
import { ProfileContextProvider } from "@/context/ProfileContext";
import { RoomProvider } from "@/context/RoomContext";
import { SidebarToggleProvider } from "@/context/SidebarToggleContext";
import { SocketProvider } from "@/context/SocketContext";
import { SoundProvider } from "@/context/SoundContext";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <>
      <SocketProvider>
        <SoundProvider>
          <ProfileContextProvider>
            <SidebarToggleProvider>
              <ChatWindoProvider>
                <RoomProvider>
                  <NotificationProvider>
                    <Navbar />
                  </NotificationProvider>
                  <Outlet />
                  <Footer />
                </RoomProvider>
                <ProfileModal />
              </ChatWindoProvider>
            </SidebarToggleProvider>
          </ProfileContextProvider>
        </SoundProvider>
      </SocketProvider>
    </>
  );
};

export default AppLayout;
