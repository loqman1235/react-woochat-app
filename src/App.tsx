import Navbar from "@/components/Navbar";
import { MainMenu } from "./components/MainMenu";
import { UsersMenu } from "./components/UsersMenu";
import { ChatArea } from "./components/ChatArea";
import { ThemeProvider } from "./context/ThemeContext";
import Footer from "./components/Footer";

const App = () => {
  return (
    <>
      <ThemeProvider>
        <Navbar />
        <main className="relative top-[48px] h-[calc(100vh-48px-48px)] w-full overflow-hidden">
          <MainMenu />
          <ChatArea />
          <UsersMenu />
        </main>
        <Footer />
      </ThemeProvider>
    </>
  );
};

export default App;
