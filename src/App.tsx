import Navbar from "@/components/Navbar";
import { MainMenu } from "./components/MainMenu";
import { UsersMenu } from "./components/UsersMenu";
import { ChatArea } from "./components/ChatArea";
import Footer from "./components/Footer";
import { ThemeProvider } from "./context/ThemeContext";
import { SidebarToggleProvider } from "./context/SidebarToggleContext";
import { ChatWindow } from "./components/ChatWindow";
import { ChatWindoProvider } from "./context/ChatWindowContext";

const App = () => {
  return (
    <>
      <ThemeProvider>
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
      </ThemeProvider>
    </>
  );
};

export default App;
