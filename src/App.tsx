import Navbar from "@/components/Navbar";
import { MainMenu } from "./components/MainMenu";
import { UsersMenu } from "./components/UsersMenu";

const App = () => {
  return (
    <>
      <Navbar />
      <main className="relative">
        <MainMenu />
        <div className="min-h-screen bg-background">Chat Area</div>
        <UsersMenu />
      </main>
    </>
  );
};

export default App;
