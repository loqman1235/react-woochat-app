import Navbar from "@/components/Navbar";
import { MainMenu } from "./components/MainMenu";
import { UsersMenu } from "./components/UsersMenu";
import { ThemeProvider } from "./context/ThemeContext";

const App = () => {
  return (
    <>
      <ThemeProvider>
        <Navbar />
        <main className="relative top-[48px] h-[calc(100vh-48px)] w-full bg-red-600">
          <MainMenu />
          <div className="absolute right-[--users-area-width] min-h-full w-[--chat-area-width] bg-background p-5">
            Chat Area
          </div>
          <UsersMenu />
        </main>
      </ThemeProvider>
    </>
  );
};

export default App;
