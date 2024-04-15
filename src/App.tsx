import Navbar from "@/components/Navbar";
import { MainMenu } from "./components/MainMenu";
import { UsersMenu } from "./components/UsersMenu";
import { ChatArea } from "./components/ChatArea";
import { ThemeProvider } from "./context/ThemeContext";

const App = () => {
  return (
    <>
      <ThemeProvider>
        <Navbar />
        <main className="relative top-[48px] h-[calc(100vh-48px)] w-full overflow-hidden">
          <MainMenu />
          <ChatArea />
          <UsersMenu />
        </main>
      </ThemeProvider>
    </>
  );
};

export default App;
