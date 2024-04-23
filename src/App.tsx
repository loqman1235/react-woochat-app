import { Route, Routes } from "react-router-dom";
import ChatLayout from "./layouts/ChatLayout";
import { LoginPage, RegisterPage } from "./pages/Auth";
import AppLayout from "./layouts/AppLayout";
import { RoomsPage } from "./pages/Rooms";
import { ProfilePage } from "./pages/Profile";
import { ThemeProvider } from "./context/ThemeContext";

const App = () => {
  return (
    <>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<RoomsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/chat" element={<ChatLayout />} />
          </Route>
          <Route path="/sign-in" element={<LoginPage />} />
          <Route path="/sign-up" element={<RegisterPage />} />
        </Routes>
      </ThemeProvider>
    </>
  );
};

export default App;
