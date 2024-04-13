import Navbar from "@/components/Navbar";
import { MainMenu } from "./components/MainMenu";
import { UsersMenu } from "./components/UsersMenu";
import { ThemeProvider } from "./context/ThemeContext";

const App = () => {
  return (
    <>
      <ThemeProvider>
        <Navbar />
        <main className="relative">
          <MainMenu />
          <div className="min-h-screen bg-background">Chat Area</div>
          <UsersMenu />
        </main>
      </ThemeProvider>
    </>
  );
};

export default App;
