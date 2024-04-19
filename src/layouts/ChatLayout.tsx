import { ChatArea } from "@/components/ChatArea";
import { ChatWindow } from "@/components/ChatWindow";
import Footer from "@/components/Footer";
import { MainMenu } from "@/components/MainMenu";
import Navbar from "@/components/Navbar";
import { UsersMenu } from "@/components/UsersMenu";
import { ChatWindoProvider } from "@/context/ChatWindowContext";
import { SidebarToggleProvider } from "@/context/SidebarToggleContext";

const ChatLayout = () => {
  return (
    <SidebarToggleProvider>
      <ChatWindoProvider>
        <Navbar />
        <main className="relative top-[48px] flex h-[calc(100vh-48px-48px)] w-full items-center overflow-hidden">
          <MainMenu />
          <ChatArea />
          <UsersMenu />
          <ChatWindow />
        </main>
        <Footer />
      </ChatWindoProvider>
    </SidebarToggleProvider>
  );
};

export default ChatLayout;
