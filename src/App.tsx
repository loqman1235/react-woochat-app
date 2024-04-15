import Navbar from "@/components/Navbar";
import { MainMenu } from "./components/MainMenu";
import { UsersMenu } from "./components/UsersMenu";
import { ThemeProvider } from "./context/ThemeContext";
import { ChatArea } from "./components/ChatArea";

const App = () => {
  return (
    <>
      <ThemeProvider>
        <Navbar />
        <main className="relative top-[48px] h-[calc(100vh-48px)] w-full">
          <MainMenu />
          <ChatArea />
          <UsersMenu />
        </main>
      </ThemeProvider>
    </>
  );
};

export default App;
