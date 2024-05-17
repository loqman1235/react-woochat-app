// import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { ProfileModal } from "@/components/Profile";
import { ChatWindoProvider } from "@/context/ChatWindowContext";
import { ProfileContextProvider } from "@/context/ProfileContext";
import { RoomProvider } from "@/context/RoomContext";
import { SidebarToggleProvider } from "@/context/SidebarToggleContext";
import { SocketProvider } from "@/context/SocketContext";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <>
      <SocketProvider>
        <ProfileContextProvider>
          <SidebarToggleProvider>
            <ChatWindoProvider>
              <RoomProvider>
                <Navbar />
                <Outlet />
                {/* <Footer /> */}
              </RoomProvider>
              <ProfileModal />
            </ChatWindoProvider>
          </SidebarToggleProvider>
        </ProfileContextProvider>
      </SocketProvider>
    </>
  );
};

export default AppLayout;
