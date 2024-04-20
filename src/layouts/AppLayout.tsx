import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { ChatWindoProvider } from "@/context/ChatWindowContext";
import { SidebarToggleProvider } from "@/context/SidebarToggleContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <>
      <ThemeProvider>
        <SidebarToggleProvider>
          <ChatWindoProvider>
            <Navbar />
            <Outlet />
            <Footer />
          </ChatWindoProvider>
        </SidebarToggleProvider>
      </ThemeProvider>
    </>
  );
};

export default AppLayout;
